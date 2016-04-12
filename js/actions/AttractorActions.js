export const changeWidth = (width) => ({
  type: 'CHANGE_WIDTH',
  width,
});

export const changeHeight = (height) => ({
  type: 'CHANGE_HEIGHT',
  height,
});

export const setCanvasContext = (g) => ({
  type: 'SET_CANVAS_CONTEXT',
  g,
});
