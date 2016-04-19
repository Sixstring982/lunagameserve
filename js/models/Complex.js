export default class Complex {
  constructor(r, i) {
    this.r = Number(r);
    this.i = Number(i);
  }

  add(other) {
    this.r += other.r;
    this.i += other.i;
  }

  square() {
    const r = this.r * this.r - this.i * this.i;
    this.i = 2 * this.r * this.i;
    this.r = r;
  }

  get modulusSquared() {
    return this.r * this.r + this.i * this.i;
  }
}
