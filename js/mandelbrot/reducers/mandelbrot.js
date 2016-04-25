import Window from '../models/core/Window';
import Palette from '../models/core/Palette';
import VertexShader from '../shaders/vertex.glsl';
import FragmentShader from '../shaders/fragment.glsl';
import ShaderProgram from '../models/ShaderProgram';

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

const renderGL = (state) => {
  const canvas = document.getElementById(state.canvasId);
  const gl = canvas.getContext('webgl');
  if (gl === null) {
    return;
  }
  const { width, height } = canvas;

  const program = new ShaderProgram();
  program.create(gl, VertexShader, FragmentShader);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const verts = [
    1.0, 1.0,
    -1.0, 1.0,
    -1.0, -1.0,
    1.0, -1.0,
    1.0, 1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
  positionBuffer.itemSize = 2;
  positionBuffer.numItems = verts.length / 2;

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const iters = Math.pow(2, state.iterations);
  program.setUniform1i('iterations', iters);

  program.setUniform2f('iResolution', {
    x: width,
    y: height,
  });

  program.setUniform4f('window', {
    x: state.window.x,
    y: state.window.y,
    z: state.window.width,
    w: state.window.height,
  });

  program.setUniform4f('redChannel', {
    x: state.palette.getChannelComponent(0, 0),
    y: state.palette.getChannelComponent(0, 1),
    z: state.palette.getChannelComponent(0, 2),
    w: state.palette.getChannelComponent(0, 3),
  });

  program.setUniform4f('greenChannel', {
    x: state.palette.getChannelComponent(1, 0),
    y: state.palette.getChannelComponent(1, 1),
    z: state.palette.getChannelComponent(1, 2),
    w: state.palette.getChannelComponent(1, 3),
  });

  program.setUniform4f('blueChannel', {
    x: state.palette.getChannelComponent(2, 0),
    y: state.palette.getChannelComponent(2, 1),
    z: state.palette.getChannelComponent(2, 2),
    w: state.palette.getChannelComponent(2, 3),
  });

  program.vertexAttribPointer('aVertexPosition', positionBuffer);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, positionBuffer.numItems);

  gl.deleteBuffer(positionBuffer);
  program.destroy();
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
