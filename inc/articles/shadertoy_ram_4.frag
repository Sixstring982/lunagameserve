void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = fragCoord.xy / iResolution.xy;

  // This picks the cell that we are dealing with. Multiple fragments
  // may enter this code block, so it is important that the code in
  // this block is independent of fragCoord.
  if (isCell(uv, 345.0)) {

    // Initialize variable. This should only be done on the first
    // frame.
    if (iFrame == 0) {
      fragColor = vec4(0.5);
    } else {
      // Propogate the old value to the next frame. This is the real
      // trick, because RAM values don't change over time unless they
      // are written to.
      fragColor = vec4(read(345.0));
    }
  }
}
