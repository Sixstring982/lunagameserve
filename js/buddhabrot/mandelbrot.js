export default class Mandelbrot {
  static getBuddhaTrail(anti, c, iters) {
    const trail = [];
    const z = {
      r: c.r,
      i: c.i,
    };

    for (let i = 0; i < iters; i++) {
      if (z.r * z.r + z.i * z.i > 4.0) {
        return trail;
      }
      trail.push({ r: z.r, i: z.i });

      const tr = z.r * z.r - z.i * z.i + c.r;
      z.i = 2 * z.r * z.i + c.i;
      z.r = tr;
    }
    return anti ? trail : [];
  }
}
