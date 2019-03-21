<template>
  <div id="base"></div>
</template>
<script>
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
export default {
  props: ["options"],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null
    };
  },
  mounted() {
    let opt = Object.assign(
      {
        cameraPostion: [200, 300, 200],
        showAxesHeleper: false,
        bgColor: 0xb9d3ff,
        pointlight: { color: 0xcccccc, position: [400, 200, 300] },
        ambientlight: 0xffffff,
        isCreateCamera: true
      },
      this.options
    );

    var baseDom = document.getElementById("base");
    this.scene = new THREE.Scene();

    if (opt.isCreateCamera) {
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(...opt.cameraPostion); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

      var orbitControl = new OrbitControls(this.camera);
      orbitControl.addEventListener("change", this.initRenderer);
    }
    //点光源
    if (opt.pointlight.color) {
      var point = new THREE.PointLight(opt.pointlight.color);
      point.position.set(...opt.pointlight.position); //点光源位置
      this.scene.add(point); //点光源添加到场景中
    }
    //环境光
    if (opt.ambientlight) {
      var ambient = new THREE.AmbientLight(opt.ambientlight);
      this.scene.add(ambient);
    }
    if (opt.showAxesHeleper) {
      // 辅助坐标系
      var axesHelper = new THREE.AxesHelper(250);
      this.scene.add(axesHelper);
    }

    this.renderer = new THREE.WebGLRenderer();
    if (opt.bgColor) {
      this.renderer.setClearColor(opt.bgColor, 1); //设置背景颜色
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    baseDom.appendChild(this.renderer.domElement);
    this.initRenderer();

    this.$emit("threeLoaded", {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      orbitControl
    });
  },
  methods: {
    initRenderer() {
      if (this.camera) this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style lang="scss"  scoped>
.base {
  width: 100%;
  height: calc(100vh);
}
</style>
