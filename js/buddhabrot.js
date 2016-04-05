document.getElementById('generateButton').addEventListener('click', () => {
  const INITIAL_WIDTH = 300;
  const INITIAL_HEIGHT = 200;
  const scale = document.getElementById('scaleRange').value;
  const width = scale * INITIAL_WIDTH;
  const height = scale * INITIAL_HEIGHT;
  const canvas = document.getElementById('buddhabrotCanvas');

  canvas.width = width;
  canvas.height = height;
});
