<template>
  <div class="home">
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";
export default {
  name: "home",

  data() {
    return {
      options: {
        showAxesHeleper: true,
        pointlight: {},
        ambientlight: null
      },
      geometries: null,
      curMesh: null,
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
      this.addLight();
    },
    renderAnimate() {
      if (this.curMesh) {
        this.curMesh.rotateY(0.01);
        this.curMesh.rotateX(-0.01);
      }
      this.T.renderer.render(this.T.scene, this.T.camera);

      requestAnimationFrame(this.renderAnimate);
    },
    addLight() {
      var lights = [];
      lights[0] = new THREE.PointLight(0xffffff, 1, 0);
      lights[1] = new THREE.PointLight(0xffffff, 1, 0);
      lights[2] = new THREE.PointLight(0xffffff, 1, 0);

      lights[0].position.set(0, 200, 0);
      lights[1].position.set(100, 200, 100);
      lights[2].position.set(-100, -200, -100);

      this.T.scene.add(lights[0]);
      this.T.scene.add(lights[1]);
      this.T.scene.add(lights[2]);
    },
    addCube() {}
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

