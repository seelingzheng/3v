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
      loader: null,
      curName: "single",
      geometry: null,
      T: {
        camera: null,
        scene: null,
        renderer: null,
        orbitControl: null,
        stats: null
      },
      particleSystems: []
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
      vm.fbxLoader = new FBXLoader();
      // //设置模型文件夹路径
      // DRACOLoader.setDecoderPath("models/fbx/");
      // this.loader.setDRACOLoader(new DRACOLoader());

      vm.particleSystems = [];
      vm.fbxLoader.load(
        "models/fbx/Samba Dancing.fbx",
        // "models/fbx/stanford-bunny.fbx",
        result => {
          // 提取出其几何模型
          result.children.forEach(element => {
            let robotObj = element.geometry;
            if (robotObj) {
              // 适当变换使其完整在屏幕显示
              robotObj.scale(0.08, 0.08, 0.08);
              // robotObj.rotateX(-Math.PI / 2);
              // robotObj.rotateZ(0);
              robotObj.applyMatrix(
                new THREE.Matrix4().makeTranslation(0, 0, 0)
              );
              // 把它变成粒子
              vm.addPartice(robotObj);
            }
          });
        },
        process => {
          console.log(process);
        },
        err => {
          console.log(err);
        }
      );

      // // 作者：youngdro
      // // 链接：https://juejin.im/post/5b0ace63f265da0db479270a

      this.doRender();
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
          value: new THREE.Color(0xff00ff)
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
      let particleSystem = new THREE.Points(obj, shaderMaterial);
      this.T.scene.add(particleSystem);
      this.particleSystems.push(particleSystem);
    },

    transform() {
      if (this.particleSystems.length > 0)
        this.particleSystems.forEach(p => {
          p.rotation.y += 0.01;
        });
    },
    doRender() {
      this.T.stats.update();
      this.transform();
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

