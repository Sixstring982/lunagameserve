const RESOLUTIONS = [
  { width: 320, height: 240 },
  { width: 640, height: 480 },
  { width: 1280, height: 720 },
  { width: 1680, height: 1050 },
  { width: 1920, height: 1080 },
];

export const getResolution = (idx) => RESOLUTIONS[idx];

export const getResolutionCount = () => RESOLUTIONS.length;
