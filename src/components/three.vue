<template>
  <div id="base"></div>
</template>
<script>
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import Stats from "../../public/libs/stats.js";

export default {
  props: ["options"],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      stats: null,
      HEIGHT: window.innerHeight,
      WIDTH: window.innerWidth
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
        this.WIDTH / this.HEIGHT,
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
    this.initStats();
    this.initRenderer();

    this.$emit("threeLoaded", {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      orbitControl,
      stats: this.stats
    });

    // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
    // window.addEventListener(
    //   "resize",
    //   this.handleWindowResize.bind(this),
    //   false
    // );
  },
  methods: {
    initRenderer() {
      if (this.camera) this.renderer.render(this.scene, this.camera);
    },
    handleWindowResize() {
      // 更新渲染器的高度和宽度以及相机的纵横比
      this.HEIGHT = window.innerHeight;
      this.WIDTH = window.innerWidth;
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      this.camera.aspect = this.WIDTH / this.HEIGHT;
      this.camera.updateProjectionMatrix();
      // 作者：youngdro
      // 链接：https://juejin.im/post/5b0ace63f265da0db479270a
    },
    initStats() {
      this.stats = Stats();
      // 将性能监控屏区显示在左上角
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.left = "220px";
      this.stats.domElement.style.width = "100px";
      this.stats.domElement.style.zIndex = 100;
      this.container = document.getElementById("base");
      this.container.appendChild(this.stats.domElement);
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
