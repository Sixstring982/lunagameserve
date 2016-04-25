export default class ShaderProgram {
  create(gl, vertex, fragment) {
    this.gl = gl;
    this.programId = gl.createProgram();

    const vertShader = this.processShader(gl, gl.VERTEX_SHADER, vertex);
    const fragShader = this.processShader(gl, gl.FRAGMENT_SHADER, fragment);

    gl.attachShader(this.programId, vertShader);
    gl.attachShader(this.programId, fragShader);
    gl.linkProgram(this.programId);

    if (!gl.getProgramParameter(this.programId, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.programId));
    }

    gl.useProgram(this.programId);
  }

  destroy() {
    this.gl.deleteProgram(this.programId);
  }

  processShader(gl, type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  setUniform1i(name, value) {
    const pos = this.gl.getUniformLocation(this.programId, name);
    this.gl.uniform1i(pos, value);
  }

  setUniform2f(name, vec) {
    const pos = this.gl.getUniformLocation(this.programId, name);
    this.gl.uniform2f(pos, vec.x, vec.y);
  }

  setUniform4f(name, vec) {
    const pos = this.gl.getUniformLocation(this.programId, name);
    this.gl.uniform4f(pos, vec.x, vec.y, vec.z, vec.w);
  }

  vertexAttribPointer(name, buffer) {
    const gl = this.gl;
    const pos = gl.getAttribLocation(this.programId, name);
    gl.enableVertexAttribArray(pos);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, buffer.itemSize, gl.FLOAT, false, 0, 0);
  }
}
