/**
 * Particle background configuration
 */
export const PARTICLE_CONFIG = {
  // Particle density (area per particle)
  DENSITY: 15000,

  // Connection distances
  CONNECTION_DISTANCE: 150,
  MOUSE_DISTANCE: 200,

  // Particle properties
  VELOCITY_MULTIPLIER: 0.5,
  MIN_RADIUS: 1,
  MAX_RADIUS: 3,
  FRICTION: 0.99,
  MAX_SPEED: 2,
  MOUSE_FORCE: 0.02,

  // Connection opacity
  CONNECTION_OPACITY_MULTIPLIER: 0.3,
  MOUSE_CONNECTION_OPACITY_MULTIPLIER: 0.5,

  // Mouse gradient
  MOUSE_GRADIENT_RADIUS: 100,
  MOUSE_GRADIENT_MAX_OPACITY: 0.1,

  // Line widths
  CONNECTION_LINE_WIDTH: 0.5,
  MOUSE_LINE_WIDTH: 1,

  // Colors (using theme colors in rgba format)
  COLORS: [
    'rgba(93, 109, 55, 0.6)',
    'rgba(221, 162, 95, 0.6)',
    'rgba(187, 107, 37, 0.5)',
    'rgba(40, 53, 24, 0.4)',
  ],
  // Base RGB values for connection colors
  CONNECTION_COLOR_RGB: '93, 109, 55',
  MOUSE_CONNECTION_COLOR_RGB: '221, 162, 95',
  MOUSE_GRADIENT_COLOR_RGB: '221, 162, 95',
};
