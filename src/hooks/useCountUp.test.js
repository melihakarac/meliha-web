import { renderHook, act, waitFor } from '@testing-library/react';
import useCountUp from './useCountUp';
import { mockIntersectionObserver } from '../utils/testUtils';

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// Suppress act warnings for timer-based updates
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('not wrapped in act')) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('useCountUp', () => {
  beforeEach(() => {
    mockIntersectionObserver();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should initialize with count 0', () => {
    const { result } = renderHook(() => useCountUp(100));

    expect(result.current.count).toBe(0);
    expect(result.current.displayValue).toBe('0');
  });

  it('should start counting immediately when startOnView is false', () => {
    const { result } = renderHook(() => useCountUp(100, { startOnView: false, duration: 100 }));

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.count).toBeGreaterThan(0);
  });

  it('should parse numeric value from string with suffix', () => {
    const { result } = renderHook(() => useCountUp('100+', { startOnView: false, duration: 100 }));

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.count).toBeGreaterThan(0);
    expect(result.current.displayValue).toContain('+');
  });

  it('should handle delay option', () => {
    const { result } = renderHook(() =>
      useCountUp(100, { startOnView: false, duration: 100, delay: 50 })
    );

    act(() => {
      jest.advanceTimersByTime(30);
    });

    expect(result.current.count).toBe(0);

    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(result.current.count).toBeGreaterThan(0);
  });

  it('should return ref for element observation', () => {
    const { result } = renderHook(() => useCountUp(100));

    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBeNull();
  });

  it('should handle non-numeric values gracefully', () => {
    const { result } = renderHook(() => useCountUp('abc', { startOnView: false, duration: 100 }));

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.count).toBe(0);
    expect(result.current.displayValue).toBe('0abc');
  });

  it('should complete animation after duration', async () => {
    const { result } = renderHook(() => useCountUp(100, { startOnView: false, duration: 100 }));

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(result.current.count).toBe(100);
    });
  });
});
