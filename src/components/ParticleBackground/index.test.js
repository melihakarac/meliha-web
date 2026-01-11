import React from 'react';
import { render } from '@testing-library/react';
import ParticleBackground from './index';

// Mock canvas context
const mockContext = {
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  clearRect: jest.fn(),
  createRadialGradient: jest.fn(() => ({
    addColorStop: jest.fn(),
  })),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
};

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 0);
  return 1;
});

global.cancelAnimationFrame = jest.fn();

describe('ParticleBackground', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock getContext to return our mock context
    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
    }));

    // Mock offsetWidth and offsetHeight
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 100,
    });

    // Mock parentElement
    Object.defineProperty(HTMLElement.prototype, 'parentElement', {
      configurable: true,
      get() {
        return {
          offsetWidth: 100,
          offsetHeight: 100,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        };
      },
    });
  });

  it('renders canvas element', () => {
    const { container } = render(<ParticleBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('particle-background');
  });

  it('sets up canvas context', () => {
    render(<ParticleBackground />);
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
  });
});
