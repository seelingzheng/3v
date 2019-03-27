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
`,
  fragmentGray: `
  uniform sampler2D texture;
  varying vec2 vUv;
  void main() {
    vec4 tColor = texture2D(texture, vUv);
    float  luminance = 0.299*tColor.r+0.587*tColor.g+0.114*tColor.b;
    gl_FragColor = vec4(luminance, luminance, luminance,1.0);
  }
`
}