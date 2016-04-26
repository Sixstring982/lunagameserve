import ShaderProgram from './ShaderProgram';

export default class ShaderToy {
  static render(id, fragSrc, vertSrc, uniformCallback) {
    const canvas = document.getElementById(id);
    const gl = canvas.getContext('webgl');
    if (gl === null) {
      return;
    }
    const { width, height } = canvas;

    const program = new ShaderProgram();
    program.create(gl, vertSrc, fragSrc);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const verts = [
      1.0, 1.0,
      -1.0, 1.0,
      -1.0, -1.0,
      1.0, -1.0,
      1.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    positionBuffer.itemSize = 2;
    positionBuffer.numItems = 5;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    program.setUniform2f('iResolution', {
      x: width,
      y: height,
    });

    uniformCallback(program);

    program.vertexAttribPointer('aVertexPosition', positionBuffer);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, positionBuffer.numItems);

    gl.deleteBuffer(positionBuffer);
    program.destroy();
  }
}
