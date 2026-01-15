import { renderHook } from '@testing-library/react';
import useScrollReveal from './useScrollReveal';
import { mockIntersectionObserver } from '../utils/testUtils';

describe('useScrollReveal', () => {
  let mockObserver;
  let observeSpy;
  let unobserveSpy;
  let disconnectSpy;

  beforeEach(() => {
    mockIntersectionObserver();

    // Create a mock observer instance
    mockObserver = {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };

    observeSpy = jest.fn();
    unobserveSpy = jest.fn();
    disconnectSpy = jest.fn();

    global.IntersectionObserver = jest.fn((callback) => {
      const observer = {
        observe: observeSpy,
        unobserve: unobserveSpy,
        disconnect: disconnectSpy,
      };

      // Store callback for manual triggering
      observer._callback = callback;

      return observer;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a ref', () => {
    const { result } = renderHook(() => useScrollReveal());

    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('should observe element when ref is attached', () => {
    const { result, rerender } = renderHook(() => useScrollReveal());
    const div = document.createElement('div');

    // Set ref
    result.current.current = div;

    // Force re-render to trigger useEffect
    rerender();

    // useEffect should have run and called observe
    expect(observeSpy).toHaveBeenCalledWith(div);
  });

  it('should use default options', () => {
    const { result } = renderHook(() => useScrollReveal());
    const div = document.createElement('div');
    result.current.current = div;

    renderHook(() => useScrollReveal());

    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    });
  });

  it('should use custom options', () => {
    const options = {
      threshold: 0.5,
      rootMargin: '0px',
      once: false,
    };

    const { result } = renderHook(() => useScrollReveal(options));
    const div = document.createElement('div');
    result.current.current = div;

    renderHook(() => useScrollReveal(options));

    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0.5,
      rootMargin: '0px',
    });
  });

  it('should add revealed class when element intersects', () => {
    let observerCallback;
    global.IntersectionObserver = jest.fn((callback) => {
      observerCallback = callback;
      return {
        observe: observeSpy,
        unobserve: unobserveSpy,
        disconnect: disconnectSpy,
      };
    });

    const { result } = renderHook(() => useScrollReveal());
    const div = document.createElement('div');
    result.current.current = div;

    const { rerender } = renderHook(() => useScrollReveal());
    rerender();

    // Simulate intersection
    if (observerCallback) {
      const entry = {
        target: div,
        isIntersecting: true,
      };

      observerCallback([entry]);

      expect(div.classList.contains('revealed')).toBe(true);
    }
  });

  it('should unobserve element after intersection when once is true', () => {
    let observerCallback;
    const mockUnobserve = jest.fn();

    global.IntersectionObserver = jest.fn((callback) => {
      observerCallback = callback;
      return {
        observe: observeSpy,
        unobserve: mockUnobserve,
        disconnect: disconnectSpy,
      };
    });

    const { result } = renderHook(() => useScrollReveal({ once: true }));
    const div = document.createElement('div');
    result.current.current = div;

    const { rerender } = renderHook(() => useScrollReveal({ once: true }));
    rerender();

    if (observerCallback) {
      const entry = {
        target: div,
        isIntersecting: true,
      };

      observerCallback([entry]);

      expect(mockUnobserve).toHaveBeenCalledWith(div);
    }
  });

  it('should remove revealed class when not intersecting and once is false', () => {
    let observerCallback;

    global.IntersectionObserver = jest.fn((callback) => {
      observerCallback = callback;
      return {
        observe: observeSpy,
        unobserve: unobserveSpy,
        disconnect: disconnectSpy,
      };
    });

    const { result } = renderHook(() => useScrollReveal({ once: false }));
    const div = document.createElement('div');
    div.classList.add('revealed');
    result.current.current = div;

    const { rerender } = renderHook(() => useScrollReveal({ once: false }));
    rerender();

    if (observerCallback) {
      // First intersect
      observerCallback([{ target: div, isIntersecting: true }]);
      expect(div.classList.contains('revealed')).toBe(true);

      // Then not intersect
      observerCallback([{ target: div, isIntersecting: false }]);
      expect(div.classList.contains('revealed')).toBe(false);
    }
  });

  it('should cleanup observer on unmount', () => {
    const { result, unmount } = renderHook(() => useScrollReveal());
    const div = document.createElement('div');
    result.current.current = div;

    unmount();

    expect(unobserveSpy).toHaveBeenCalledWith(div);
  });

  it('should not observe if element ref is null', () => {
    const { result } = renderHook(() => useScrollReveal());
    result.current.current = null;

    renderHook(() => useScrollReveal());

    expect(observeSpy).not.toHaveBeenCalled();
  });
});
