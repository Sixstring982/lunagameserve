import Window from '../models/core/Window';
import Image2D from '../models/core/Image2D';
import Complex from '../models/core/Complex';
import Palette from '../models/core/Palette';

const INITIAL_WINDOW = new Window(-2, -1, 3, 2);

const INITIAL_STATE = {
  canvasId: 'mandelbrotCanvas',
  paletteColorId: 'paletteColorCanvas',
  paletteWaveId: 'paleteWaveCanvas',
  palette: new Palette(
    [[0.5, 0.5, 1.0, 0.0],
      [0.5, 0.5, 0.7, 0.15],
      [0.5, 0.5, 0.4, 0.2]], 0),
  window: INITIAL_WINDOW,
  iterations: 5,
};

const renderState = (state) => {
  const canvas = document.getElementById(state.canvasId);
  const img = new Image2D(canvas);
  const window = state.window;
  const { width, height } = canvas;

  const dx = window.width / width;
  const dy = window.height / height;
  const iters = Math.pow(2, state.iterations);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const c = new Complex(
        window.x + x * dx,
        window.y + y * dy
      );
      const z = c.clone();

      let i;
      for (i = 0; i < iters; i++) {
        if (z.modulusSquared > 4) {
          break;
        }
        z.square();
        z.add(c);
      }
      if (i === 0 || i === iters) {
        img.setPixel(x, y, 0, 0, 0);
      } else {
        const t = i / iters;
        const color = state.palette.computeColor(t);
        img.setPixel(x, y, color.r, color.g, color.b);
      }
    }
  }

  img.flip();
};

const renderReturn = (state) => {
  renderState(state);
  return state;
};

const renderWithPaletteReturn = (state) => {
  renderState(state);
  state.palette.renderPalette(state.paletteColorId);
  state.palette.renderWaves(state.paletteWaveId);
  return state;
};

const makeNewStateWithComponent = (state, action) => {
  const palette = state.palette;
  const oldC = palette.getComponents();
  const newC = [];
  for (let i = 0; i < oldC.length; i++) {
    if (i !== palette.getSelectedChannel()) {
      newC.push(oldC[i]);
    } else {
      const channel = [];
      for (let j = 0; j < oldC[i].length; j++) {
        if (j === action.component) {
          channel.push(action.value);
        } else {
          channel.push(oldC[i][j]);
        }
      }
      newC.push(channel);
    }
  }
  return Object.assign({}, state, {
    palette: new Palette(newC, palette.getSelectedChannel()),
  });
};

const mandelbrot = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ZOOM_WINDOW':
      return renderReturn(Object.assign({}, state, {
        window: state.window.zoom({
          x: action.x,
          y: action.y,
        }),
      }));
    case 'RESET_WINDOW':
      return renderReturn(Object.assign({}, state, {
        window: INITIAL_WINDOW,
      }));
    case 'SET_PALETTE_CHANNEL':
      return renderWithPaletteReturn(Object.assign({}, state, {
        palette: new Palette(state.palette.getComponents(), action.channel),
      }));
    case 'SET_PALETTE_COMPONENT':
      return renderWithPaletteReturn(
        makeNewStateWithComponent(state, action)
      );
    case 'RENDER_MANDELBROT': {
      renderState(state);
      return state;
    }
    case 'SET_ITERATIONS':
      return Object.assign({}, state, {
        iterations: action.iterations,
      });
    case 'INITIALIZE':
      return renderWithPaletteReturn(state);
    default:
      return state;
  }
};

export default mandelbrot;
