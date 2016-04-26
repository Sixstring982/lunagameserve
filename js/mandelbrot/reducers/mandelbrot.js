import Window from '../models/core/Window';
import Palette from '../models/core/Palette';
import VertexShader from '../shaders/vertex.glsl';
import FragmentShader from '../shaders/fragment.glsl';
import ShaderToy from '../models/ShaderToy';

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
  gaussianBlur: false,
  originalLayer: true,
  pointTrapLayer: false,
};

const renderGL = (state) => {
  ShaderToy.render(
    state.canvasId,
    FragmentShader,
    VertexShader,
    program => {
      const iters = Math.pow(2, state.iterations);
      program.setUniform1i('iterations', iters);

      program.setUniform4f('window', {
        x: state.window.x,
        y: state.window.y,
        z: state.window.width,
        w: state.window.height,
      });

      program.setUniform1i('gaussianBlur', state.gaussianBlur);
      program.setUniform1i('originalLayer', state.originalLayer);
      program.setUniform1i('pointTrapLayer', state.pointTrapLayer);

      const NAMES = ['redChannel', 'greenChannel', 'blueChannel'];
      const buildVector = (x, y, z, w) => ({
        x, y, z, w,
      });
      for (let i = 0; i < 3; i++) {
        program.setUniform4f(NAMES[i], buildVector(
          state.palette.getChannelComponent(i, 0),
          state.palette.getChannelComponent(i, 1),
          state.palette.getChannelComponent(i, 2),
          state.palette.getChannelComponent(i, 3)
        ));
      }
    }
  );
};

const renderReturn = (state) => {
  renderGL(state);
  return state;
};

const renderWithPaletteReturn = (state) => {
  renderGL(state);
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
    case 'TOGGLE_GAUSSIAN_BLUR':
      return renderReturn(Object.assign({}, state, {
        gaussianBlur: !state.gaussianBlur,
      }));
    case 'TOGGLE_ORIGINAL_LAYER':
      return renderReturn(Object.assign({}, state, {
        originalLayer: !state.originalLayer,
      }));
    case 'TOGGLE_POINT_TRAP_LAYER':
      return renderReturn(Object.assign({}, state, {
        pointTrapLayer: !state.pointTrapLayer,
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
      return renderReturn(state);
    }
    case 'SET_ITERATIONS':
      return renderReturn(Object.assign({}, state, {
        iterations: action.iterations,
      }));
    case 'INITIALIZE':
      return renderWithPaletteReturn(state);
    default:
      return state;
  }
};

export default mandelbrot;
