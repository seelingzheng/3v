//gl_PointSize = 4.0;
export default {
  vertex: ` 
    void main() { 
      gl_PointSize = 4.0;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`,
  fragment: `
  uniform vec3 color;
  void main() {
    gl_FragColor = vec4(0.5,0.5,0.5,1.0);
  }
`
}