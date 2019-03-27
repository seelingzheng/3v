<template>
  <div class="home">
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";

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
      isGray: false,
      curName: "ball",
      material: null,
      geometry: null,
      cloudsTexture: null,
      group: null
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
      let textureLoader = new THREE.TextureLoader();
      this.group = new THREE.Group();
      let earthGeometry = new THREE.SphereBufferGeometry(100, 30, 30);
      let earthMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load("images/world.jpg"),
        transparent: true,
        opacity: 0.9
      });
      let earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      this.group.add(earthMesh);

      let cloudsGeometry = new THREE.SphereBufferGeometry(100.4, 30, 30);
      this.cloudsTexture = textureLoader.load("images/clouds.jpg");
      // 设置重复的作用是：能够让一个效果虚幻
      this.cloudsTexture.wrapS = THREE.RepeatWrapping;
      this.cloudsTexture.wrapT = THREE.RepeatWrapping;
      let material = new THREE.MeshPhongMaterial({
        map: this.cloudsTexture,
        transparent: true,
        opacity: 0.5
      });
      let cloudsMesh = new THREE.Mesh(cloudsGeometry, material);
      this.group.add(cloudsMesh);
      this.T.scene.add(this.group);
      this.doRender();
    },

    doRender() {
      this.T.stats.update();

      // 添加动画
      this.cloudsTexture.offset.x -= 0.001;
      this.cloudsTexture.offset.y += 0.001;
      this.group.rotateY(-0.001);

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

