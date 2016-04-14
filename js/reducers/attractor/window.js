const INITIAL_WINDOW = {
  x: -1.0,
  y: -1.0,
  width: 2.0,
  height: 2.0,
};

const window = (state = INITIAL_WINDOW, action) => {
  switch (action.type) {
    case 'SET_WINDOW_X':
      return Object.assign({}, state, {
        x: action.x,
      });
    case 'SET_WINDOW_Y':
      return Object.assign({}, state, {
        y: action.y,
      });
    case 'SET_WINDOW_WIDTH':
      return Object.assign({}, state, {
        width: action.width,
      });
    case 'SET_WINDOW_HEIGHT':
      return Object.assign({}, state, {
        height: action.height,
      });
    default:
      return state;
  }
};

export default window;
