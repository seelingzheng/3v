//投影矩阵 projectionMatrix  -- 相机对象的投影矩阵属性 .projectionMatrix

//视图矩阵 viewMatrix --相机对象得世界矩阵逆矩阵属性.matrixWorldInverse

//模型矩阵 modelMatrix --模型对象世界矩阵属性 .matrixWorld


export default {
  vertex: `  
 void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`,
  fragment: `
 void main() {
  gl_FragColor = vec4(1.0,0.5,0.5,1.0);
}
`
}