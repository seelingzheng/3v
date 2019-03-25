export default {
  vertex: ` 
    attribute vec3 color;
    varying vec3 vColor; 
    void main() {
      vColor = color;
      gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.0);
    }
`,
  fragment: `
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor,1.0);
  }
`
}