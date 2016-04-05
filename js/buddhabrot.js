import Mandelbrot from './mandelbrot.js';
import Image2d from './image2d.js';

const getScale = () => document.getElementById('scaleRange').value;

const getIters = () => document.getElementById('iterRange').value;

const getContrast = () => document.getElementById('contrastRange').value;

const getCanvas = () => document.getElementById('buddhabrotCanvas');

const getPpr = () => document.getElementById('pointsPerRenderRange').value;

const getRedLimit = () => Math.pow(2, document.getElementById('redLimitRange').value);

const getGreenLimit = () => Math.pow(2, document.getElementById('greenLimitRange').value);

const getBlueLimit = () => Math.pow(2, document.getElementById('blueLimitRange').value);

const getDimensions = () => {
  const INITIAL_WIDTH = 300;
  const INITIAL_HEIGHT = 200;

  const scale = getScale();
  return {
    width: INITIAL_WIDTH * scale,
    height: INITIAL_HEIGHT * scale,
  };
};

const setFormEnabled = (formId, enabled) => {
  const form = document.getElementById(formId);
  const inputs = form.getElementsByTagName('input');
  const opacity = enabled ? 1.0 : 0.5;
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].readOnly = !enabled;
    inputs[i].style = `opacity: ${opacity}`;
  }
};

class Generator {
  static init(ppr, iters, contrast, red, green, blue) {
    this.ppr = ppr;
    this.iters = iters;
    this.logLevel = contrast;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.running = false;
  }

  static set pointsPerRender(ppr) {
    this.ppr = ppr;
  }

  static set contrast(contrast) {
    this.logLevel = contrast;
  }

  static set redLimit(redLimit) {
    this.red = redLimit;
  }

  static set greenLimit(greenLimit) {
    this.green = greenLimit;
  }

  static set blueLimit(blueLimit) {
    this.blue = blueLimit;
  }

  static isRunning() {
    return this.running;
  }

  static generateBins(image) {
    const bins = [];
    for (let x = 0; x < image.width; x++) {
      const bin = [];
      for (let y = 0; y < image.height; y++) {
        bin.push(0);
      }
      bins.push(bin);
    }
    return bins;
  }

  static renderBins(image, bins) {
    for (let x = 0; x < image.width; x++) {
      for (let y = 0; y < image.height; y++) {
        let red = 0;
        let green = 0;
        let blue = 0;
        if (Generator.red > 0) {
          red = (bins[x][y] > Generator.red) ? 255 :
            Math.round(255.0 * (bins[x][y] / Generator.red));
        }
        if (Generator.green > 0) {
          green = (bins[x][y] > Generator.green) ? 255 :
            Math.round(255.0 * (bins[x][y] / Generator.green));
        }
        if (Generator.blue > 0) {
          blue = (bins[x][y] > Generator.blue) ? 255 :
            Math.round(255.0 * (bins[x][y] / Generator.blue));
        }
        image.setPixel(x, y, red, green, blue);
      }
    }

    image.flip();
  }

  static runIteration(image, ticks, binsIn) {
    const bins = binsIn;
    if ((ticks % Generator.ppr) === 0) {
      this.renderBins(image, bins);
    }

    const c = {
      r: Math.random() * 3.0 - 2.0,
      i: Math.random() * 2.0 - 1.0,
    };

    const trail = Mandelbrot.getBuddhaTrail(c, Generator.iters);

    for (let i = 0; i < trail.length; i++) {
      const tx = Math.round(((trail[i].r + 2.0) / 3.0) * image.width);
      const ty = Math.round(((trail[i].i + 1.0) / 2.0) * image.height);
      const otherY = image.height - ty;
      if (tx >= 0 && ty >= 0 && tx < image.width && ty < image.height) {
        bins[tx][ty]++;
        bins[tx][otherY]++;
      }
    }

    if (Generator.running) {
      setTimeout(() => this.runIteration(image, ticks + 1, bins), 1);
    } else {
      this.renderBins(image, bins);
    }
  }

  static start() {
    if (!this.running) {
      this.running = true;
      setFormEnabled('generatorForm', false);

      this.image = new Image2d(getCanvas());
      this.image.clear(0, 0, 0);
      this.image.flip();

      setTimeout(() => this.runIteration(this.image, 0, this.generateBins(this.image)), 1);
    }
  }

  static stop() {
    if (this.running) {
      this.running = false;
      setFormEnabled('generatorForm', true);
    }
  }
}

/* Scale slider change event */
document.getElementById('scaleRange').addEventListener('input', () => {
  const label = document.getElementById('scaleRangeLabel');
  const { width, height } = getDimensions();

  label.innerHTML = `Scale (${width}x${height})`;
});

document.getElementById('iterRange').addEventListener('input', () => {
  const label = document.getElementById('iterRangeLabel');
  const iters = getIters();

  label.innerHTML = `Iterations (${iters})`;
});

document.getElementById('redLimitRange').addEventListener('input', () => {
  const label = document.getElementById('redLimitRangeLabel');
  const limit = getRedLimit();

  label.innerHTML = `Red Limit (${limit})`;
  Generator.redLimit = limit;
});

document.getElementById('greenLimitRange').addEventListener('input', () => {
  const label = document.getElementById('greenLimitRangeLabel');
  const limit = getGreenLimit();

  label.innerHTML = `Green Limit (${limit})`;
  Generator.greenLimit = limit;
});

document.getElementById('blueLimitRange').addEventListener('input', () => {
  const label = document.getElementById('blueLimitRangeLabel');
  const limit = getBlueLimit();

  label.innerHTML = `Blue Limit (${limit})`;
  Generator.blueLimit = limit;
});

document.getElementById('pointsPerRenderRange').addEventListener('input', () => {
  const label = document.getElementById('pointsPerRenderRangeLabel');
  const ppr = getPpr();

  label.innerHTML = `Points per render (${ppr})`;
  Generator.pointsPerRender = ppr;
});

document.getElementById('contrastRange').addEventListener('input', () => {
  const label = document.getElementById('contrastRangeLabel');
  const contrast = getContrast();

  label.innerHTML = `Contrast Level (${contrast})`;
  Generator.contrast = contrast;
});

document.getElementById('generateButton').addEventListener('click', () => {
  const { width, height } = getDimensions();
  const canvas = document.getElementById('buddhabrotCanvas');
  const button = document.getElementById('generateButton');

  canvas.width = width;
  canvas.height = height;

  if (Generator.isRunning()) {
    Generator.stop();
    button.innerHTML = 'Generate';
  } else {
    Generator.start();
    button.innerHTML = 'Stop';
  }
});

Generator.init(getPpr(), getIters(), getContrast(), getRedLimit(), getGreenLimit(), getBlueLimit());
