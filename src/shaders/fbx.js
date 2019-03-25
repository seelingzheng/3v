//gl_PointSize = 4.0;
export default {
  vertex: ` 
    void main() { 
      gl_PointSize = 4. + 2. * sin(position.y / 4.);
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`,
  fragment: `
  uniform vec3 color;
  void main() {
    gl_FragColor = vec4(color,1.0);
  }
`
}