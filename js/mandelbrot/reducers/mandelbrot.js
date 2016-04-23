import Window from '../models/core/Window';
import Complex from '../models/core/Complex';
import Palette from '../models/core/Palette';

const INITIAL_WINDOW = new Window(-2, -1, 3, 2);

const INITIAL_STATE = {
  canvasId: 'mandelbrotCanvas',
  paletteColorId: 'paletteColorCanvas',
  paletteWaveId: 'paleteWaveCanvas',
  window: INITIAL_WINDOW,
  iterations: 5,
};

const renderState = (state, cfunc) => {
  const canvas = document.getElementById(state.canvasId);
  const g = canvas.getContext('2d');
  const { width, height } = canvas;
  const img = g.createImageData(width, height);

  const dx = state.window.width / width;
  const dy = state.window.height / height;

  const iters = Math.pow(2, state.iterations);
  const COLOR_LOOP = 256;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const c = new Complex(
        x * dx + state.window.x,
        y * dy + state.window.y
      );

      const z = new Complex(
        x * dx + state.window.x,
        y * dy + state.window.y
      );

      let i;
      for (i = 0; i < iters; i++) {
        if (z.modulusSquared > 4) {
          break;
        } else {
          z.square();
          z.add(c);
        }
      }
      let color;
      if (i === 0 || i === iters) {
        color = { r: 0, g: 0, b: 0 };
      } else {
        color = cfunc((i % COLOR_LOOP) / COLOR_LOOP);
      }

      const idx = (x + y * width) * 4;
      img.data[idx] = color.r;
      img.data[idx + 1] = color.g;
      img.data[idx + 2] = color.b;
      img.data[idx + 3] = 255;
    }
  }

  g.putImageData(img, 0, 0);
};

const window = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ZOOM_WINDOW': {
      const newState = Object.assign({}, state, {
        window: state.window.zoom({
          x: action.x,
          y: action.y,
        }),
      });
      renderState(newState, action.cfunc);
      return newState;
    }
    case 'RESET_WINDOW': {
      const newState = Object.assign({}, state, {
        window: INITIAL_WINDOW,
      });
      renderState(newState, action.cfunc);
      return newState;
    }
    case 'RENDER_MANDELBROT': {
      renderState(state, action.cfunc);
      return state;
    }
    case 'SET_ITERATIONS':
      return Object.assign({}, state, {
        iterations: action.iterations,
      });
    default:
      return state;
  }
};

export default window;
