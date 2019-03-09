<template>
  <div class="home">
    <three @threeLoaded="tLoaded($event)"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";
export default {
  name: "home",

  data() {
    return {};
  },
  components: {
    three
  },
  mounted() {},
  methods: {
    tLoaded(threeObj) {
      let { camera, scene, renderer, orbitControl } = threeObj;

      //点光源
      var point = new THREE.PointLight(0xcccccc);
      point.position.set(400, 200, 300); //点光源位置
      scene.add(point); //点光源添加到场景中
      //环境光
      var ambient = new THREE.AmbientLight(0xffffff);
      scene.add(ambient);

      // 立方体网格模型
      var geometry1 = new THREE.BoxGeometry(100, 100, 100);
      var material1 = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      }); //材质对象Material
      var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
      scene.add(mesh1); //网格模型添加到场景中

      renderer.render(scene, camera);
    }
  }
};
</script>
