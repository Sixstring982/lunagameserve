const generatePixelArray = (width, height) => {
  const pixels = [];
  for (let x = 0; x < width; x++) {
    const bin = [];
    for (let y = 0; y < height; y++) {
      bin.push([0, 0, 0]);
    }
    pixels.push(bin);
  }
  return pixels;
};

const INITIAL_WIDTH = 640;
const INITIAL_HEIGHT = 480;
const INITIAL_STATE = {
  xRes: INITIAL_WIDTH,
  yRes: INITIAL_HEIGHT,
  pixels: generatePixelArray(INITIAL_WIDTH, INITIAL_HEIGHT),
};

const AttractorReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_X_RESOLUTION':
      return Object.assign({}, state, {
        xRes: action.xRes,
        pixels: generatePixelArray(action.xRes, state.yRes),
      });
    case 'CHANGE_Y_RESOLUTION':
      return Object.assign({}, state, {
        yRes: action.yRes,
        pixels: generatePixelArray(state.xRes, action.yRes),
      });
    default:
      return state;
  }
};

export default AttractorReducers;
