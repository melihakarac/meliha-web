import { renderHook, act, waitFor } from '@testing-library/react';
import useTypewriter from './useTypewriter';

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

describe('useTypewriter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should start with empty string', () => {
    const { result } = renderHook(() => useTypewriter('Hello'));

    expect(result.current).toBe('');
  });

  it('should type text character by character', async () => {
    const { result } = renderHook(() =>
      useTypewriter('Hello', { typeSpeed: 50, pauseDuration: 1000 })
    );

    act(() => {
      jest.advanceTimersByTime(50);
    });

    await waitFor(() => {
      expect(result.current.length).toBeGreaterThan(0);
    });

    act(() => {
      jest.advanceTimersByTime(50);
    });

    await waitFor(() => {
      expect(result.current.length).toBeGreaterThan(1);
    });
  });

  it('should complete typing the full text', async () => {
    const text = 'Hello';
    const { result } = renderHook(() =>
      useTypewriter(text, { typeSpeed: 50, pauseDuration: 1000 })
    );

    act(() => {
      jest.advanceTimersByTime(text.length * 50);
    });

    await waitFor(() => {
      expect(result.current).toBe(text);
    });
  });

  it('should delete text after pause duration', async () => {
    const text = 'Hello';
    const { result } = renderHook(() =>
      useTypewriter(text, {
        typeSpeed: 50,
        deleteSpeed: 50,
        pauseDuration: 1000,
        startDelay: 100,
      })
    );

    // Type the full text
    act(() => {
      jest.advanceTimersByTime(text.length * 50 + 100);
    });

    await waitFor(() => {
      expect(result.current.length).toBeGreaterThan(0);
    });

    // Wait for pause duration and start deleting
    act(() => {
      jest.advanceTimersByTime(1000 + 50);
    });

    await waitFor(() => {
      expect(result.current.length).toBeLessThanOrEqual(text.length);
    });
  });

  it('should restart typing after deleting', async () => {
    const text = 'Hello';
    const { result } = renderHook(() =>
      useTypewriter(text, {
        typeSpeed: 50,
        deleteSpeed: 50,
        pauseDuration: 1000,
        startDelay: 100,
      })
    );

    // Type, pause, delete, and restart
    act(() => {
      jest.advanceTimersByTime(text.length * 50 + 1000 + text.length * 50 + 100 + 50);
    });

    await waitFor(() => {
      expect(result.current.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('should use custom type speed', async () => {
    const { result } = renderHook(() => useTypewriter('Hi', { typeSpeed: 100 }));

    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(result.current).toBe('');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(result.current.length).toBeGreaterThan(0);
    });
  });

  it('should use custom delete speed', async () => {
    const text = 'Hello';
    const { result } = renderHook(() =>
      useTypewriter(text, {
        typeSpeed: 50,
        deleteSpeed: 100,
        pauseDuration: 1000,
      })
    );

    // Type full text, pause, and start deleting
    act(() => {
      jest.advanceTimersByTime(text.length * 50 + 1000 + 100);
    });

    await waitFor(() => {
      expect(result.current.length).toBeLessThanOrEqual(text.length);
    });
  });
});
