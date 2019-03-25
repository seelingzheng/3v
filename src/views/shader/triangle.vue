<template>
  <div class="home">
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";
import { hello } from "@/shaders";
export default {
  data() {
    return {
      options: {
        showAxesHeleper: true
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
      this.T = threeObj;

      var geometry = new THREE.BufferGeometry();

      var vertices = new Float32Array([
        0.0,
        0.5,
        0,
        -0.5,
        -0.5,
        0,
        0.5,
        -0.5,
        0
      ]);
      var attribue = new THREE.BufferAttribute(vertices, 3);
      geometry.addAttribute("position", attribue);

      var material = new THREE.ShaderMaterial({
        vertexShader: hello.vertex,
        fragmentShader: hello.fragment
      });

      var point = new THREE.Points(geometry, material);
      var line = new THREE.Line(geometry, material);
      this.mesh = new THREE.Mesh(geometry, material);
      this.T.scene.add(this.mesh);
      this.doRender();
    },
    doRender() {
      this.T.stats.update();

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

