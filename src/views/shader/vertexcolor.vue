<template>
  <div class="home">
    <div class="btn-box"></div>
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";
import FBXLoader from "three-fbx-loader";
import { vertexcolor } from "@/shaders";
export default {
  name: "",

  data() {
    return {
      options: {
        showAxesHeleper: true,
        isCreateCamera: true
      },
      T: {
        camera: null,
        scene: null,
        renderer: null,
        orbitControl: null,
        stats: null
      },
      mesh: null
    };
  },
  components: {
    three
  },
  beforeMount() {},
  mounted() {},
  methods: {
    tLoaded(threeObj) {
      let vm = this;
      vm.T = threeObj;

      //创建 缓冲几何对象 自定义顶点位置和颜色数据
      var geometry = new THREE.BufferGeometry();

      var vertices = new Float32Array([
        0,
        0,
        0,

        50,
        0,
        0,

        0,
        100,
        0,

        0,
        0,
        10,

        0,
        0,
        100,

        50,
        0,
        10
      ]);
      var attribue = new THREE.BufferAttribute(vertices, 3);
      geometry.attributes.position = attribue;

      // 定点颜色数据
      var colors = new Float32Array([
        1.0,
        0.0,
        0.0,

        0.0,
        1.0,
        0.0,

        0.0,
        0.0,
        1.0,

        1.0,
        1.0,
        0.0,

        0.0,
        1.0,
        1.0,

        1.0,
        0.0,
        1.0
      ]);
      geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

      var material = new THREE.ShaderMaterial({
        fragmentShader: vertexcolor.fragment,
        vertexShader: vertexcolor.vertex,
        // vertexColors: THREE.VertexColors, //以定点着色器为准进行渲染
        side: THREE.DoubleSide
      });

      // var material = new THREE.MeshBasicMaterial({
      //   side: THREE.DoubleSide
      // });
      var mesh = (this.mesh = new THREE.Mesh(geometry, material));
      this.T.scene.add(mesh);
      this.doRender();
    },

    doRender() {
      this.T.stats.update();
      // this.mesh.rotateY(0.01);
      // this.mesh.rotateX(0.01);
      this.T.renderer.render(this.T.scene, this.T.camera);
      requestAnimationFrame(this.doRender);
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  position: absolute;
  top: 30px;
  left: 290px;
  z-index: 2;
}
</style>

