export const changeXResolution = (xRes) => ({
  type: 'CHANGE_X_RESOLUTION',
  xRes,
});

export const changeYResolution = (yRes) => ({
  type: 'CHANGE_Y_RESOLUTION',
  yRes,
});

export const attachCanvas = (canvas) => ({
  type: 'ATTACH_CANVAS',
  canvas,
});
