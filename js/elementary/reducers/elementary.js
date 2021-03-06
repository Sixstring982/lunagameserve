import Elementary from '../models/Elementary';
import Palette from '../models/core/Palette';
import Image2D from '../models/core/Image2D';

const CANVAS_ID = 'elementaryCanvas';
const PALETTE_COLOR_ID = 'elementaryPaletteColor';
const PALETTE_WAVE_ID = 'elementaryPaletteWave';
const INITIAL_RULE = 30;
const INITIAL_X_CELLS = 32;
const INITIAL_Y_CELLS = 32;
const INITIAL_CELL_SIZE = 8;
const INITIAL_RANDOM_INIT = false;
const INITIAL_SHOULD_RENDER = false;
const INITIAL_WRAP = false;
const INITIAL_PALETTE = new Palette([[0.5, 0.5, 1.0, 0.0],
  [0.5, 0.5, 0.7, 0.15],
  [0.5, 0.5, 0.4, 0.2]], 0);
const INITIAL_STATE = {
  canvasId: CANVAS_ID,
  colorPaletteId: PALETTE_COLOR_ID,
  wavePaletteId: PALETTE_WAVE_ID,
  xCells: INITIAL_X_CELLS,
  yCells: INITIAL_Y_CELLS,
  cellSize: INITIAL_CELL_SIZE,
  rule: INITIAL_RULE,
  randomInit: INITIAL_RANDOM_INIT,
  shouldRender: INITIAL_SHOULD_RENDER,
  wrap: INITIAL_WRAP,
  palette: INITIAL_PALETTE,
};

const render = (state) => {
  const canvas = document.getElementById(state.canvasId);
  const img = new Image2D(canvas);

  const elem = new Elementary(
    state.rule, state.xCells, state.yCells, state.randomInit, state.wrap
  );

  elem.compute();

  for (let y = 0; y < state.yCells; y++) {
    const t = y / state.yCells;
    const { color, inverse } = state.palette.computeColorAndInverse(t);
    inverse.scale(0.25);
    for (let x = 0; x < state.xCells; x++) {
      const on = elem.getBin(x, y);
      const c = on ? color : inverse;
      for (let xx = 0; xx < state.cellSize; xx++) {
        for (let yy = 0; yy < state.cellSize; yy++) {
          img.setPixel(
            x * state.cellSize + xx, y * state.cellSize + yy,
            c.r, c.g, c.b
          );
        }
      }
    }
  }

  img.flip();
};

const setAndRender = (state) => {
  render(state);
  return state;
};

const setAndRenderWithPalette = (state) => {
  render(state);
  state.palette.renderPalette(state.colorPaletteId);
  state.palette.renderWaves(state.wavePaletteId);
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

const elementary = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_RULE':
      return setAndRender(Object.assign({}, state, {
        rule: action.rule,
      }));
    case 'SET_X_CELLS':
      return Object.assign({}, state, {
        xCells: action.xCells,
        shouldRender: true,
      });
    case 'SET_Y_CELLS':
      return Object.assign({}, state, {
        yCells: action.yCells,
        shouldRender: true,
      });
    case 'SET_CELL_SIZE':
      return Object.assign({}, state, {
        cellSize: action.cellSize,
        shouldRender: true,
      });
    case 'RENDER_TO_CANVAS':
      return setAndRender(Object.assign({}, state, {
        shouldRender: false,
      }));
    case 'TOGGLE_RANDOM_INIT':
      return setAndRender(Object.assign({}, state, {
        randomInit: !state.randomInit,
      }));
    case 'TOGGLE_WRAP':
      return setAndRender(Object.assign({}, state, {
        wrap: !state.wrap,
      }));
    case 'SET_CHANNEL':
      return setAndRenderWithPalette(Object.assign({}, state, {
        palette: new Palette(state.palette.getComponents(), action.channel),
      }));
    case 'SET_COMPONENT':
      return setAndRenderWithPalette(
        makeNewStateWithComponent(state, action)
      );
    case 'INITIALIZE':
      setAndRenderWithPalette(state);
      return state;
    default:
      return state;
  }
};

export default elementary;
