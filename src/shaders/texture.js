export default {
  vertex: ` 
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.0); 
  }
`,
  fragment: `
  uniform sampler2D texture;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D( texture,vUv);
  }
`
}