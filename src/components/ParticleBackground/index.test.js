import React from 'react';
import { render, screen } from '@testing-library/react';
import ParticleBackground from './index';

// Mock canvas context
const mockContext = {
  beginPath: jest.fn(),
  arc: jest.fn(),
  fillStyle: '',
  fill: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  strokeStyle: '',
  lineWidth: 0,
  stroke: jest.fn(),
  clearRect: jest.fn(),
  createRadialGradient: jest.fn(),
  getContext: jest.fn(() => mockContext),
};

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 16);
  return 1;
});
global.cancelAnimationFrame = jest.fn();

describe('ParticleBackground', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock canvas element
    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);
    HTMLCanvasElement.prototype.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 800,
      height: 600,
    }));

    // Mock parent element
    Object.defineProperty(HTMLElement.prototype, 'parentElement', {
      get: function () {
        return {
          offsetWidth: 800,
          offsetHeight: 600,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        };
      },
    });
  });

  it('should render canvas element', () => {
    const { container } = render(<ParticleBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('particle-background');
  });

  it('should initialize canvas context', () => {
    render(<ParticleBackground />);
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
  });

  it('should set up resize listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    render(<ParticleBackground />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    addEventListenerSpy.mockRestore();
  });

  it('should start animation loop', () => {
    render(<ParticleBackground />);
    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should cleanup on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ParticleBackground />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
    expect(global.cancelAnimationFrame).toHaveBeenCalled();

    removeEventListenerSpy.mockRestore();
  });

  it('should handle mouse move events', () => {
    const parent = {
      offsetWidth: 800,
      offsetHeight: 600,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    Object.defineProperty(HTMLElement.prototype, 'parentElement', {
      get: function () {
        return parent;
      },
    });

    render(<ParticleBackground />);

    expect(parent.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(parent.addEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
  });

  it('should cleanup mouse event listeners on unmount', () => {
    const parent = {
      offsetWidth: 800,
      offsetHeight: 600,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    Object.defineProperty(HTMLElement.prototype, 'parentElement', {
      get: function () {
        return parent;
      },
    });

    const { unmount } = render(<ParticleBackground />);
    unmount();

    expect(parent.removeEventListener).toHaveBeenCalled();
  });
});
