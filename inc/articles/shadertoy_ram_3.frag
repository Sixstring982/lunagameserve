float read(in float index) {
    return texture2D(iChannel0, cellFromIndex(index)).r;
}
