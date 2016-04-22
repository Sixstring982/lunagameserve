export default class Elementary {
  constructor(rule, width, height, randomInit, wrap) {
    this.rule = rule;
    this.width = width;
    this.height = height;
    this.bins = this.generateBins(width, height);
    this.randomInit = randomInit;
    this.wrap = wrap;
  }

  generateBins(width, height) {
    const INITIAL_BIN_VALUE = 0;
    const bins = [];
    for (let x = 0; x < width; x++) {
      const row = [];
      for (let y = 0; y < height; y++) {
        row.push(INITIAL_BIN_VALUE);
      }
      bins.push(row);
    }
    return bins;
  }

  compute() {
    if (this.randomInit) {
      for (let x = 0; x < this.width; x++) {
        this.bins[x][0] = (Math.random() > 0.5) ? 1 : 0;
      }
    } else {
      this.bins[Math.floor(this.width / 2)][0] = 1;
    }

    for (let y = 1; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let ruleIdx = 0;
        if (!this.wrap) {
          if (x === 0 || x === this.width - 1) {
            continue;
          }
          ruleIdx = (this.bins[x - 1][y - 1] << 2) |
            (this.bins[x][y - 1] << 1) |
            (this.bins[x + 1][y - 1]);
        } else {
          const left = (x === 0) ? this.width - 1 : x - 1;
          const right = (x === this.width - 1) ? 0 : x + 1;
          ruleIdx = (this.bins[left][y - 1] << 2) |
            (this.bins[x][y - 1] << 1) |
            (this.bins[right][y - 1]);
        }
        if ((this.rule & (1 << ruleIdx)) > 0) {
          this.bins[x][y] = 1;
        } else {
          this.bins[x][y] = 0;
        }
      }
    }
  }

  getBin(x, y) {
    if (x >= 0 && y >= 0 &&
      x < this.width && y < this.height) {
      return this.bins[x][y];
    }
    return 0;
  }
}
