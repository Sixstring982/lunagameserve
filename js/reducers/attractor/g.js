const renderOnContext = (g, cfunc) => {
  const width = g.canvas.width;
  const height = g.canvas.height;
  const img = g.createImageData(width, height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const idx = (x + y * width) * 4;
      const color = cfunc(x, y);
      img.data[idx] = color.r;
      img.data[idx + 1] = color.g;
      img.data[idx + 2] = color.b;
      img.data[idx + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
};

const clearContext = (g) => {
  renderOnContext(g, (_x, _y) => 0);
};

const renderPixels = (g, pixels) => {
  renderOnContext(g, (x, y) => pixels[x][y]);
};

const g = (state = null, action) => {
  switch (action.type) {
    case 'SET_CANVAS_CONTEXT':
      clearContext(action.g);
      return action.g;
    case 'RENDER_PIXELS':
      renderPixels(state.g, action.pixels);
      return state;
    default:
      return state;
  }
};

export default g;
