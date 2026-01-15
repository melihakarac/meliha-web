import { renderHook, act } from '@testing-library/react';
import useSmoothScroll from './useSmoothScroll';

describe('useSmoothScroll', () => {
  beforeEach(() => {
    // Mock getElementById
    document.getElementById = jest.fn();

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return scrollToSection and handleScrollClick functions', () => {
    const { result } = renderHook(() => useSmoothScroll());

    expect(result.current).toHaveProperty('scrollToSection');
    expect(result.current).toHaveProperty('handleScrollClick');
    expect(typeof result.current.scrollToSection).toBe('function');
    expect(typeof result.current.handleScrollClick).toBe('function');
  });

  it('should scroll to section when element exists', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.getElementById.mockReturnValue(mockElement);

    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      const success = result.current.scrollToSection('test-section');
      expect(success).toBe(true);
    });

    expect(document.getElementById).toHaveBeenCalledWith('test-section');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('should return false when element does not exist', () => {
    document.getElementById.mockReturnValue(null);

    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      const success = result.current.scrollToSection('non-existent');
      expect(success).toBe(false);
    });

    expect(document.getElementById).toHaveBeenCalledWith('non-existent');
  });

  it('should use custom scroll options', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.getElementById.mockReturnValue(mockElement);

    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      result.current.scrollToSection('test-section', {
        behavior: 'auto',
        block: 'center',
      });
    });

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'center',
    });
  });

  it('should handle scroll click event', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.getElementById.mockReturnValue(mockElement);

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      result.current.handleScrollClick(mockEvent, 'test-section');
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });

  it('should call callback after scroll click', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.getElementById.mockReturnValue(mockElement);

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const callback = jest.fn();

    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      result.current.handleScrollClick(mockEvent, 'test-section', callback);
    });

    expect(callback).toHaveBeenCalled();
  });

  it('should work without callback', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.getElementById.mockReturnValue(mockElement);

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      result.current.handleScrollClick(mockEvent, 'test-section');
    });

    expect(mockElement.scrollIntoView).toHaveBeenCalled();
  });

  it('should maintain function references across renders', () => {
    const { result, rerender } = renderHook(() => useSmoothScroll());

    const firstScrollToSection = result.current.scrollToSection;
    const firstHandleScrollClick = result.current.handleScrollClick;

    rerender();

    expect(result.current.scrollToSection).toBe(firstScrollToSection);
    expect(result.current.handleScrollClick).toBe(firstHandleScrollClick);
  });
});
