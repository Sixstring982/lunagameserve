
import Color from './Color';

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
}
