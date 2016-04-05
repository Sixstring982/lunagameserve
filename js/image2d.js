export default class Image2d {
  constructor(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.g = canvas.getContext('2d');
    this.image = this.g.createImageData(this.width, this.height);
  }

  setPixel(x, y, r, g, b) {
    this.setRed(x, y, r);
    this.setGreen(x, y, g);
    this.setBlue(x, y, b);
    this.setAlpha(x, y, 255);
  }

  setRed(x, y, r) {
    this.image.data[this.coordToIndex(x, y)] = r;
  }

  setGreen(x, y, g) {
    this.image.data[this.coordToIndex(x, y) + 1] = g;
  }

  setBlue(x, y, b) {
    this.image.data[this.coordToIndex(x, y) + 2] = b;
  }

  setAlpha(x, y, a) {
    this.image.data[this.coordToIndex(x, y) + 3] = a;
  }

  clear(r, g, b) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.setPixel(x, y, r, g, b);
      }
    }
  }

  coordToIndex(x, y) {
    return (x + y * this.width) * 4;
  }

  flip() {
    this.g.putImageData(this.image, 0, 0);
  }
}
