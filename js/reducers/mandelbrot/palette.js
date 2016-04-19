const INITIAL_STATE = {
  canvasId: 'paletteCanvas',
  channel: 0,
  components: [
    [0.5, 0.5, 1.0, 0.00],
    [0.5, 0.5, 1.0, 0.33],
    [0.5, 0.5, 1.0, 0.67],
  ],
  cfunc: (t, components) => {
    const cs = components;
    const cArr = [];
    for (let i = 0; i < cs.length; i++) {
      cArr.push(
        255 * (cs[i][0] + cs[i][1] * Math.cos(
          2 * Math.PI * (cs[i][2] * t + cs[i][3])
        ))
      );
    }
    return {
      r: cArr[0],
      g: cArr[1],
      b: cArr[2],
    };
  },
};

const buildNewComponents = (state, channel, component, value) => {
  const cs = [];
  for (let i = 0; i < state.components.length; i++) {
    if (i !== channel) {
      cs.push(state.components[i]);
    } else {
      const ccs = [];
      for (let j = 0; j < state.components[i].length; j++) {
        if (j === component) {
          ccs.push(value);
        } else {
          ccs.push(state.components[i][j]);
        }
      }
      cs.push(ccs);
    }
  }
  return Object.assign({}, state, {
    components: cs,
  });
};

const renderPalette = (state) => {
  const canvas = document.getElementById(state.canvasId);
  const g = canvas.getContext('2d');
  const { width, height } = canvas;
  const img = g.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    const t = y / height;
    const color = state.cfunc(t, state.components);
    for (let x = 0; x < width; x++) {
      const idx = (x + y * width) * 4;
      img.data[idx] = color.r;
      img.data[idx + 1] = color.g;
      img.data[idx + 2] = color.b;
      img.data[idx + 3] = 255;
    }
  }

  g.putImageData(img, 0, 0);
};

const palette = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PALETTE_CHANNEL':
      return Object.assign({}, state, {
        channel: action.channel,
      });
    case 'INITIALIZE':
      renderPalette(state);
      return state;
    case 'SET_PALETTE_COMPONENT': {
      const newState = buildNewComponents(state,
        action.channel, action.component, action.value);
      renderPalette(newState);
      return newState;
    }
    default:
      return state;
  }
};

export default palette;
