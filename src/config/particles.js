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
  // Primary: #8ea1d8 (142, 161, 216), Secondary: #492d82 (73, 45, 130), Accent: #8f53c4 (143, 83, 196)
  // Text: #ebedf8 (235, 237, 248)
  COLORS: [
    'rgba(142, 161, 216, 0.7)', // Primary blue
    'rgba(73, 45, 130, 0.7)', // Secondary purple
    'rgba(143, 83, 196, 0.6)', // Accent purple
    'rgba(142, 161, 216, 0.5)', // Primary blue lighter
    'rgba(235, 237, 248, 0.4)', // Text color (light)
  ],
  // Base RGB values for connection colors - using palette colors
  CONNECTION_COLOR_RGB: '142, 161, 216', // Primary blue
  MOUSE_CONNECTION_COLOR_RGB: '143, 83, 196', // Accent purple
  MOUSE_GRADIENT_COLOR_RGB: '143, 83, 196', // Accent purple
};
