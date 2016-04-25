import Math2 from './Math2';
import Color from './Color';
import Image2D from './Image2D';

export default class Palette {
  constructor(components, selectedChannel) {
    this.components = components;
    this.selectedChannel = selectedChannel;
  }

  getSelectedChannel() {
    return this.selectedChannel;
  }

  getSelectedComponent() {
    return this.components[this.selectedChannel];
  }

  getChannelComponent(channel, component) {
    return this.components[channel][component];
  }

  getComponents() {
    return this.components;
  }

  computeChannel(channel, t) {
    const a = this.components[channel][0];
    const b = this.components[channel][1];
    const c = this.components[channel][2];
    const d = this.components[channel][3];

    return a + b * Math.cos(Math.PI * 2 * (c * t + d));
  }

  computeColor(t) {
    return new Color(
      255 * this.computeChannel(0, t),
      255 * this.computeChannel(1, t),
      255 * this.computeChannel(2, t)
    );
  }

  computeColorAndInverse(t) {
    const red = 255 * this.computeChannel(0, t);
    const green = 255 * this.computeChannel(1, t);
    const blue = 255 * this.computeChannel(2, t);
    return {
      color: new Color(red, green, blue),
      inverse: new Color(255 - red, 255 - green, 255 - blue),
    };
  }

  canvasFromId(id) {
    return document.getElementById(id);
  }

  renderPalette(id) {
    const canvas = this.canvasFromId(id);
    const img = new Image2D(canvas);
    const { width, height } = canvas;
    img.clear(0, 0, 0);

    for (let y = 0; y < height; y++) {
      const t = y / height;
      const color = this.computeColor(t);
      for (let x = 0; x < width; x++) {
        img.setPixel(x, y, color.getR(), color.getG(), color.getB());
      }
    }

    img.flip();
  }

  renderWaves(id) {
    const canvas = this.canvasFromId(id);
    const img = new Image2D(canvas);
    const { width, height } = canvas;
    img.clear(0, 0, 0);

    for (let y = 0; y < height; y++) {
      const t = y / height;
      const axis = Math.floor(width / 2);
      const color = new Color(
        Math2.clamp(((this.computeChannel(0, t) + 1) / 2), 0, 1),
        Math2.clamp(((this.computeChannel(1, t) + 1) / 2), 0, 1),
        Math2.clamp(((this.computeChannel(2, t) + 1) / 2), 0, 1)
      );
      color.scale(width - 1);
      img.setPixel(axis, y, 0x40, 0x40, 0x40);
      img.setPixel(Math.floor(color.r), y, 0xff, 0, 0);
      img.setPixel(Math.floor(color.g), y, 0, 0xff, 0);
      img.setPixel(Math.floor(color.b), y, 0, 0, 0xff);
    }

    img.flip();
  }
}
