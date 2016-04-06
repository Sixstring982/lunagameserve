import Mandelbrot from './mandelbrot.js';
import Image2d from './image2d.js';

const getScale = () => document.getElementById('scaleRange').value;

const getContrast = () => document.getElementById('contrastRange').value;

const getCanvas = () => document.getElementById('buddhabrotCanvas');

const getPpr = () => document.getElementById('pointsPerRenderRange').value;

const getRedLimit = () => Math.pow(2, document.getElementById('redLimitRange').value);

const getGreenLimit = () => Math.pow(2, document.getElementById('greenLimitRange').value);

const getBlueLimit = () => Math.pow(2, document.getElementById('blueLimitRange').value);

const isAnti = () => document.getElementById('antiCheckbox').checked;

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
    inputs[i].style.opacity = opacity;
  }
};

class Generator {
  static init(ppr, iters, contrast, anti) {
    this.ppr = ppr;
    this.iters = iters;
    this.logLevel = contrast;
    this.running = false;
    this.anti = anti;
  }

  static set pointsPerRender(ppr) {
    this.ppr = ppr;
  }

  static set contrast(contrast) {
    this.logLevel = contrast;
  }

  static isRunning() {
    return this.running;
  }

  static generateBins(image) {
    const bins = [];
    for (let x = 0; x < image.width; x++) {
      const bin = [];
      for (let y = 0; y < image.height; y++) {
        bin.push([0, 0, 0]);
      }
      bins.push(bin);
    }
    return bins;
  }

  static renderBins(image, bins) {
    const maxBin = [0, 0, 0];
    for (let x = 0; x < image.width; x++) {
      for (let y = 0; y < image.height; y++) {
        for (let i = 0; i < 3; i++) {
          maxBin[i] = Math.max(maxBin[i], bins[x][y][i]);
        }
      }
    }

    const logLevel = Generator.logLevel;
    const px = [0, 0, 0];
    for (let x = 0; x < image.width; x++) {
      for (let y = 0; y < image.height; y++) {
        for (let i = 0; i < 3; i++) {
          px[i] = 255.0 *
            (Math.log2(1.0 + ((bins[x][y][i] / maxBin[i]) *
                              (Math.pow(2, logLevel) - 1.0))) / logLevel);
        }
        image.setPixel(x, y, px[0], px[1], px[2]);
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

    for (let color = 0; color < 3; color++) {
      const trail = Mandelbrot.getBuddhaTrail(Generator.anti, c, Generator.iters[color]);

      for (let i = 0; i < trail.length; i++) {
        const tx = Math.round(((trail[i].r + 2.0) / 3.0) * image.width);
        const ty = Math.round(((trail[i].i + 1.0) / 2.0) * image.height);
        const otherY = image.height - ty - 1;
        if (tx >= 0 && ty >= 0 && tx < image.width && ty < image.height) {
          bins[tx][ty][color]++;
          bins[tx][otherY][color]++;
        }
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
    Generator.init(getPpr(), [getRedLimit(), getGreenLimit(), getBlueLimit()],
                   getContrast(), isAnti());
    Generator.start();
    button.innerHTML = 'Stop';
  }
});
