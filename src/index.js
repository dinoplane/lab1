/**
 * With codesandbox we import our functions from the files they live in
 * rather than import that file in the HTML file like we usually do
 *
 * ALSO NOTE that there is NO main function being called.
 * index.js IS your main function and the code written in it is run
 * on page load.
 */
import "./styles.css";
import { initShaders } from "../lib/cuon-utils";
import { Matrix4, Vector3 } from "../lib/cuon-matrix-cse160";

// HelloCube.js (c) 2012 matsuda
// Vertex shader program
// Vertex shader program
const VSHADER_SOURCE = `
  attribute vec2 aPosition;
  uniform mat4 uModelMatrix;
  void main() {
    gl_Position = uModelMatrix * vec4(aPosition, 0.0, 1.0);
  }
  `;

// Fragment shader program
const FSHADER_SOURCE = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
  `;

// Retrieve <canvas> element
var canvas = document.getElementById("webgl");

// Get the rendering context for WebGL
var gl = canvas.getContext("webgl");
if (!gl) {
  console.log("Failed to get the rendering context for WebGL");
}

// Initialize shaders
if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
  console.log("Failed to intialize shaders.");
}

// Set clear color
gl.clearColor(0.2, 0.2, 0.2, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);

// My code here
// let v1 = [-0.5, -0.5];
// let v2 = [+0.5, -0.5];
// let v3 = [-0.5, +0.5];

//const vertices = new Float32Array([...v1, ...v2, ...v3]);
const vertices = new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5]);

const vertexBuffer = gl.createBuffer();
if (!vertexBuffer) {
  console.log("failed to create the buffer object");
}

// Bind to buffer object to target
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

//Write data into the buffer object
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const aPosPtr = gl.getAttribLocation(gl.program, "aPosition");
if (aPosPtr < 0) {
  console.error("Could not find aPosition ptr");
}

gl.vertexAttribPointer(aPosPtr, 2, gl.FlOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosPtr);

const M = new Matrix4();

drawSpaceship(gl, M);

function drawSpaceship(gl, matrix) {
  const M1 = new Matrix4();
  const uModelMatrixPtr = gl.getUniformLocation(gl.program, "uModelMatrix");
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
