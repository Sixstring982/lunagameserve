export default class Window {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  zoom({ x, y }) {
    return new Window(
      x - this.width / 4,
      y - this.height / 4,
      this.width / 2,
      this.height / 2
    );
  }
}
