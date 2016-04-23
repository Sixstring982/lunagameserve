export default class Math2 {
  static clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
}
