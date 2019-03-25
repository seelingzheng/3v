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
import { fbx } from "@/shaders";
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
      }
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
      this.doRender();
    },

    doRender() {
      this.T.stats.update();
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

