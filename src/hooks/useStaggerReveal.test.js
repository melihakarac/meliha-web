import { renderHook, act } from '@testing-library/react';
import useStaggerReveal from './useStaggerReveal';
import { mockIntersectionObserver } from '../utils/testUtils';

describe('useStaggerReveal', () => {
  let observeSpy;
  let unobserveSpy;

  beforeEach(() => {
    mockIntersectionObserver();
    jest.useFakeTimers();

    observeSpy = jest.fn();
    unobserveSpy = jest.fn();

    global.IntersectionObserver = jest.fn((callback) => {
      const observer = {
        observe: observeSpy,
        unobserve: unobserveSpy,
        disconnect: jest.fn(),
        _callback: callback,
      };
      return observer;
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should return a ref', () => {
    const { result } = renderHook(() => useStaggerReveal());

    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('should observe items after timeout', () => {
    const { result } = renderHook(() => useStaggerReveal());
    const container = document.createElement('div');
    const item1 = document.createElement('div');
    item1.className = 'stagger-item';
    const item2 = document.createElement('div');
    item2.className = 'stagger-item';
    container.appendChild(item1);
    container.appendChild(item2);
    result.current.current = container;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(observeSpy).toHaveBeenCalledTimes(2);
    expect(observeSpy).toHaveBeenCalledWith(item1);
    expect(observeSpy).toHaveBeenCalledWith(item2);
  });

  it('should use default options', () => {
    const { result } = renderHook(() => useStaggerReveal());
    const container = document.createElement('div');
    result.current.current = container;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    });
  });

  it('should use custom options', () => {
    const options = {
      threshold: 0.3,
      rootMargin: '0px',
      staggerDelay: 200,
    };

    const { result } = renderHook(() => useStaggerReveal(options));
    const container = document.createElement('div');
    result.current.current = container;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0.3,
      rootMargin: '0px',
    });
  });

  it('should add revealed class with stagger delay', () => {
    const { result } = renderHook(() => useStaggerReveal({ staggerDelay: 100 }));
    const container = document.createElement('div');
    const item1 = document.createElement('div');
    item1.className = 'stagger-item';
    const item2 = document.createElement('div');
    item2.className = 'stagger-item';
    container.appendChild(item1);
    container.appendChild(item2);
    result.current.current = container;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const observerCall = global.IntersectionObserver.mock.calls[0];
    const callback = observerCall[0];

    // Simulate first item intersecting
    act(() => {
      callback([{ target: item1, isIntersecting: true }]);
      jest.advanceTimersByTime(0); // First item should reveal immediately (delay 0)
    });

    expect(item1.classList.contains('revealed')).toBe(true);

    // Simulate second item intersecting
    act(() => {
      callback([{ target: item2, isIntersecting: true }]);
      jest.advanceTimersByTime(99); // Before stagger delay
    });

    expect(item2.classList.contains('revealed')).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1); // Complete stagger delay
    });

    expect(item2.classList.contains('revealed')).toBe(true);
  });

  it('should not reveal item that is already revealed', () => {
    const { result } = renderHook(() => useStaggerReveal());
    const container = document.createElement('div');
    const item = document.createElement('div');
    item.className = 'stagger-item revealed';
    container.appendChild(item);
    result.current.current = container;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const observerCall = global.IntersectionObserver.mock.calls[0];
    const callback = observerCall[0];

    act(() => {
      callback([{ target: item, isIntersecting: true }]);
    });

    // Should not add another revealed class or trigger timeout
    expect(item.classList.contains('revealed')).toBe(true);
  });

  it('should unobserve item after revealing', () => {
    const { result } = renderHook(() => useStaggerReveal());
    const container = document.createElement('div');
    const item = document.createElement('div');
    item.className = 'stagger-item';
    container.appendChild(item);
    result.current.current = container;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const observerCall = global.IntersectionObserver.mock.calls[0];
    const callback = observerCall[0];
    const observerInstance = global.IntersectionObserver.mock.results[0].value;

    act(() => {
      callback([{ target: item, isIntersecting: true }]);
      jest.advanceTimersByTime(0);
    });

    expect(observerInstance.unobserve).toHaveBeenCalledWith(item);
  });

  it('should cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => useStaggerReveal());
    const container = document.createElement('div');
    const item = document.createElement('div');
    item.className = 'stagger-item';
    container.appendChild(item);
    result.current.current = container;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Get the cleanup function from observeItems
    const observerInstance = global.IntersectionObserver.mock.results[0].value;

    unmount();

    // The cleanup should have been called
    expect(observerInstance.unobserve).toHaveBeenCalled();
  });

  it('should not observe if container is null', () => {
    const { result } = renderHook(() => useStaggerReveal());
    result.current.current = null;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(observeSpy).not.toHaveBeenCalled();
  });

  it('should handle items without stagger-item class', () => {
    const { result } = renderHook(() => useStaggerReveal());
    const container = document.createElement('div');
    const regularDiv = document.createElement('div');
    container.appendChild(regularDiv);
    result.current.current = container;

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(observeSpy).not.toHaveBeenCalled();
  });
});
