const KD_A = -0.966918;
const KD_B = 2.879879;
const KD_C = 0.765145;
const KD_D = 0.744728;

const GENERATORS = [
  {
    name: 'King\'s Dream',
    next: (x, y) => ({
      x: Math.sin(y * KD_B) + KD_C * Math.sin(x * KD_B),
      y: Math.sin(x * KD_A) + KD_D * Math.sin(y * KD_A),
    }),
    initialPoint: { x: 0.1, y: 0.1 },
  }, {
    name: 'Gingerbread',
    next: (x, y) => ({
      x: 1 - y + Math.abs(x),
      y: x,
    }),
    initialPoint: { x: -0.1, y: 0 },
  },
];

export const getGenerator = (idx) => GENERATORS[idx];

export const getGeneratorCount = () => GENERATORS.length;
