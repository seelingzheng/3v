<template>
  <div class="home">
    <div class="btn-box">
      <!-- <div
        class="btn-box-item"
        :class="{'btn-box-item-selected':curName=='single'}"
        @click="getTerrain('single')"
      >单图渲染</div>-->
      <!-- <div
        class="btn-box-item"
        :class="{'btn-box-item-selected':curName=='all'}"
        @click="getTerrain('all')"
      >整图渲染</div>-->
    </div>
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";

import { fbx } from "@/shaders";
export default {
  name: "",

  data() {
    return {
      options: {
        showAxesHeleper: true,
        isCreateCamera: true
      },
      loader: null,
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
      this.T = threeObj;
      // this.fbxLoader = new THREE.FBXLoader();
      // // //设置模型文件夹路径
      // // DRACOLoader.setDecoderPath("models/fbx/");
      // // this.loader.setDRACOLoader(new DRACOLoader());

      // this.fbxLoader.load("models/fbx/Samba Dancing.fbx", result => {
      //   // 提取出其几何模型
      //   let robotObj = result[0].children[1].geometry;
      //   // 适当变换使其完整在屏幕显示
      //   robotObj.scale(0.08, 0.08, 0.08);
      //   robotObj.rotateX(-Math.PI / 2);
      //   robotObj.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));
      //   // 把它变成粒子
      //   this.addPartice(robotObj);
      // });

      // // 作者：youngdro
      // // 链接：https://juejin.im/post/5b0ace63f265da0db479270a

      // this.renderer();
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

