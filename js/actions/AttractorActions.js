export const setResolution = (resolution) => ({
  type: 'SET_RESOLUTION',
  resolution,
});

export const setCanvasContext = (g) => ({
  type: 'SET_CANVAS_CONTEXT',
  g,
});

export const renderOnContext = (cfunc) => ({
  type: 'RENDER_ON_CONTEXT',
  cfunc,
});

export const setWindowX = (x) => ({
  type: 'SET_WINDOW_X',
  x,
});

export const setWindowY = (y) => ({
  type: 'SET_WINDOW_Y',
  y,
});

export const setWindowWidth = (width) => ({
  type: 'SET_WINDOW_WIDTH',
  width,
});

export const setWindowHeight = (height) => ({
  type: 'SET_WINDOW_HEIGHT',
  height,
});
