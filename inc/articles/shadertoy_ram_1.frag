vec2 cellFromIndex(float idx) {
  return vec2(floor(idx / RAM_SIZE), floor(mod(idx, RAM_SIZE))) /
         iChannelResolution[0].xy;
}
