<template>
  <div class="home">
    <div class="btn-box">
      <div
        class="btn-box-item"
        :class="{'btn-box-item-selected':curName=='ball'}"
        @click="showTextur('ball')"
      >3D</div>
      <div
        class="btn-box-item"
        :class="{'btn-box-item-selected':curName=='plane'}"
        @click="showTextur('plane')"
      >平面</div>
    </div>
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";
import { texture } from "@/shaders";
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
      curName: "ball",
      material: null,
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

      this.material = new THREE.ShaderMaterial({
        uniforms: {
          texture: {
            value: new THREE.TextureLoader().load("images/world.jpg")
          }
        },
        vertexShader: texture.vertex,
        fragmentShader: texture.fragment,
        side: THREE.DoubleSide
      });
      this.showTextur(this.curName);
      this.doRender();
    },

    showTextur(name) {
      let geometry = null;
      if (name != "ball") {
        geometry = new THREE.PlaneBufferGeometry(204, 102);
      } else {
        geometry = new THREE.SphereBufferGeometry(60, 25, 25);
      }
      this.T.scene.remove(this.mesh);

      this.mesh = new THREE.Mesh(geometry, this.material);
      this.T.scene.add(this.mesh);
      this.curName = name;
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

