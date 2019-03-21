export default {
  vertex: `
 
  void main() {
    gl_PointSize = 20.0 ;
    gl_Position = vec4(position,1.0);
  }
  `,
  fragment: `
   void main() {
     gl_FragColor = vec4(1.0, .5, 1.0, 1.0);
   }
   `


}