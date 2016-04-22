export default class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  getR() {
    return this.r;
  }

  getG() {
    return this.g;
  }

  getB() {
    return this.b;
  }

  scale(amount) {
    this.r *= amount;
    this.g *= amount;
    this.b *= amount;
    return this;
  }

  invert() {
    this.r = 255 - this.r;
    this.g = 255 - this.g;
    this.b = 255 - this.b;
    return this;
  }
}
