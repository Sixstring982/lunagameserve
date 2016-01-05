/* Calculate distance from model
   (which is a sphere centered at
    the origin of radius 2)
   given a position.
*/
float map(in vec3 position) {
  return length(position) - 2.0;
}
