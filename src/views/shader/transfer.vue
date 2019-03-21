<template>
  <div class="home">
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { transfer } from "@/shaders";
export default {
  name: "",

  data() {
    return {
      options: {
        showAxesHeleper: true,
        isCreateCamera: true
      },

      T: { camera: null, scene: null, renderer: null, orbitControl: null }
    };
  },
  components: {
    three
  },
  beforeMount() {},
  mounted() {},
  methods: {
    tLoaded(threeObj) {
      this.T = threeObj;

      var geometry = new THREE.BoxGeometry(100, 100, 100);

      var material = new THREE.ShaderMaterial({
        vertexShader: transfer.vertex,
        fragmentShader: transfer.fragment
      });

      var mesh = new THREE.Mesh(geometry, material);
      this.T.scene.add(mesh);
      mesh.rotateX(Math.PI / 6);
      mesh.rotateY(Math.PI / 6);

      // 相机设置

      console.log(this.T.camera.projectionMatrix);
      console.log(this.T.camera.matrixWorldInverse);
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

