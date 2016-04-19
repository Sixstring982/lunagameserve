export const setResolution = (resolution) => ({
  type: 'SET_RESOLUTION',
  resolution,
});

export const setCanvasContext = (g) => ({
  type: 'SET_CANVAS_CONTEXT',
  g,
});

export const zoomWindow = ({ x, y }, cfunc) => ({
  type: 'ZOOM_WINDOW',
  x,
  y,
  cfunc,
});

export const resetWindow = (cfunc) => ({
  type: 'RESET_WINDOW',
  cfunc,
});

export const renderMandelbrot = (cfunc) => ({
  type: 'RENDER_MANDELBROT',
  cfunc,
});

export const setIterations = (iterations) => ({
  type: 'SET_ITERATIONS',
  iterations,
});

export const setGenerator = (generator) => ({
  type: 'SET_GENERATOR',
  generator,
});

export const renderGenerator = (window, generator) => ({
  type: 'RENDER_GENERATOR',
  window,
  generator,
});

export const setPaletteChannel = (channel) => ({
  type: 'SET_PALETTE_CHANNEL',
  channel,
});

export const setPaletteComponent = (channel, component, value) => ({
  type: 'SET_PALETTE_COMPONENT',
  channel,
  component,
  value,
});

export const initialize = () => ({
  type: 'INITIALIZE',
});
