<template>
  <div class="home">
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
import { fbx } from "@/shaders";
// import { gltf } from "@/shaders";
export default {
  name: "",

  data() {
    return {
      options: {
        showAxesHeleper: true,
        isCreateCamera: true
      },
      gltfLoader: null,
      curName: "single",
      geometry: null,
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
      let vm = this;
      vm.T = threeObj;
      vm.gltfLoader = new GLTFLoader().setPath("models/glTF/");
      vm.gltfLoader.load("cottage_obj.gltf", gltf => {
        gltf.scene.traverse(function(child) {
          if (child.isMesh) {
            let geometry = vm.toBufferGeometry(child.geometry);
            let m = vm.getShaderMaterial();
            let particleSystem = new THREE.Points(geometry, m);
            console.log(particleSystem);
            vm.T.scene.add(particleSystem);
          }
        });
      });
      this.renderer();
    },

    getShaderMaterial() {
      // let i = Math.random();
      let uniforms = {
        // 传递的颜色属性
        color: {
          type: "v3", // 指定变量类型为三维向量
          value: new THREE.Color(0.5, 1.0, 1.0)
        }
      };
      // 创建着色器材料
      let shaderMaterial = new THREE.ShaderMaterial({
        // 传递给shader的属性
        uniforms: uniforms,
        // 获取顶点着色器代码
        vertexShader: fbx.vertex,
        // 获取片元着色器代码
        fragmentShader: fbx.fragment,
        // 渲染粒子时的融合模式
        blending: THREE.AdditiveBlending,
        // 关闭深度测试
        depthTest: false,
        // 开启透明度
        transparent: true
      });
      return shaderMaterial;
    },
    toBufferGeometry(geometry) {
      if (geometry.type === "BufferGeometry") return geometry;
      return new THREE.BufferGeometry().fromGeometry(geometry);
    },
    // 模型转化成粒子
    addPartice(obj) {
      obj = this.toBufferGeometry(obj);
      // 传递给shader的属性
      let uniforms = {
        // 传递的颜色属性
        color: {
          type: "v3", // 指定变量类型为三维向量
          value: new THREE.Color(0xffffff)
        }
      };
      // 创建着色器材料
      let shaderMaterial = new THREE.ShaderMaterial({
        // 传递给shader的属性
        uniforms,
        // 获取顶点着色器代码
        vertexShader: fbx.vertex,
        // 获取片元着色器代码
        fragmentShader: fbx.fragment,
        // 渲染粒子时的融合模式
        blending: THREE.AdditiveBlending,
        // 关闭深度测试
        depthTest: false,
        // 开启透明度
        transparent: true
      });
      let particleSystem = new Points(obj, shaderMaterial);
      this.scene.add(particleSystem);
    },

    doRender(name) {
      this.curName = name;
      if (name == "single") {
        this.renderByMaterial();
      } else {
        this.renderByFaceVertex();
      }
    },

    renderer() {
      requestAnimationFrame(this.renderer);
      this.T.renderer.render(this.T.scene, this.T.camera);
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

