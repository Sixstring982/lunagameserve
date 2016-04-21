export const setRule = (rule) => ({
  type: 'SET_RULE',
  rule,
});

export const renderToCanvas = () => ({
  type: 'RENDER_TO_CANVAS',
});

export const setXCells = (xCells) => ({
  type: 'SET_X_CELLS',
  xCells,
});

export const setYCells = (yCells) => ({
  type: 'SET_Y_CELLS',
  yCells,
});

export const setCellSize = (cellSize) => ({
  type: 'SET_CELL_SIZE',
  cellSize,
});

export const toggleRandomInit = () => ({
  type: 'TOGGLE_RANDOM_INIT',
});

export const toggleWrap = () => ({
  type: 'TOGGLE_WRAP',
});

export const setChannel = (channel) => ({
  type: 'SET_CHANNEL',
  channel,
});

export const setComponent = (component, value) => ({
  type: 'SET_COMPONENT',
  component,
  value,
});

export const initialize = () => ({
  type: 'INITIALIZE',
});
