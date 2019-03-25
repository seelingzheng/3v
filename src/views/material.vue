<template>
  <div>
    <div class="btn-box">
      <div
        class="btn-box-item"
        :class="{'btn-box-item-selected':curName=='single'}"
        @click="doRender('single')"
      >单图渲染</div>
      <div
        class="btn-box-item"
        :class="{'btn-box-item-selected':curName=='all'}"
        @click="doRender('all')"
      >整图渲染</div>
    </div>
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { transfer } from "@/shaders";
export default {
  name: "",

  data() {
    return {
      options: {
        showAxesHeleper: true,
        isCreateCamera: true
      },
      curName: "single",
      geometry: null,
      T: {
        camera: null,
        scene: null,
        renderer: null,
        orbitControl: null,
        stats: null
      },
      curMesh: null
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

      this.geometry = new THREE.BoxGeometry(100, 100, 100);
      this.doRender("single");
    },

    doRender(name) {
      this.curName = name;
      this.T.scene.remove(this.curMesh);
      if (name == "single") {
        this.renderByMaterial();
      } else {
        this.renderByFaceVertex();
      }
    },
    renderByMaterial() {
      var cubeMaterials = [
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load("images/face/bricks.jpg"),
          side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load("images/face/clouds.jpg"),
          side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load("images/face/crate.jpg"),
          side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load("images/face/stone-wall.jpg"),
          side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load("images/face/water.jpg"),
          side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load("images/face/wood-floor.jpg"),
          side: THREE.DoubleSide
        })
      ];
      this.curMesh = new THREE.Mesh(this.geometry, cubeMaterials);
      this.T.scene.add(this.curMesh);
      this.renderer();
    },
    renderByFaceVertex() {
      var bricks = [
        new THREE.Vector2(0, 0.666),
        new THREE.Vector2(0.5, 0.666),
        new THREE.Vector2(0.5, 1),
        new THREE.Vector2(0, 1)
      ];
      var clouds = [
        new THREE.Vector2(0.5, 0.666),
        new THREE.Vector2(1, 0.666),
        new THREE.Vector2(1, 1),
        new THREE.Vector2(0.5, 1)
      ];
      var crate = [
        new THREE.Vector2(0, 0.333),
        new THREE.Vector2(0.5, 0.333),
        new THREE.Vector2(0.5, 0.666),
        new THREE.Vector2(0, 0.666)
      ];
      var stone = [
        new THREE.Vector2(0.5, 0.333),
        new THREE.Vector2(1, 0.333),
        new THREE.Vector2(1, 0.666),
        new THREE.Vector2(0.5, 0.666)
      ];
      var water = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.5, 0),
        new THREE.Vector2(0.5, 0.333),
        new THREE.Vector2(0, 0.333)
      ];
      var wood = [
        new THREE.Vector2(0.5, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 0.333),
        new THREE.Vector2(0.5, 0.333)
      ];

      this.geometry.faceVertexUvs[0][0] = [bricks[0], bricks[1], bricks[3]];
      this.geometry.faceVertexUvs[0][1] = [bricks[1], bricks[2], bricks[3]];

      this.geometry.faceVertexUvs[0][2] = [clouds[0], clouds[1], clouds[3]];
      this.geometry.faceVertexUvs[0][3] = [clouds[1], clouds[2], clouds[3]];

      this.geometry.faceVertexUvs[0][4] = [crate[0], crate[1], crate[3]];
      this.geometry.faceVertexUvs[0][5] = [crate[1], crate[2], crate[3]];

      this.geometry.faceVertexUvs[0][6] = [stone[0], stone[1], stone[3]];
      this.geometry.faceVertexUvs[0][7] = [stone[1], stone[2], stone[3]];

      this.geometry.faceVertexUvs[0][8] = [water[0], water[1], water[3]];
      this.geometry.faceVertexUvs[0][9] = [water[1], water[2], water[3]];

      this.geometry.faceVertexUvs[0][10] = [wood[0], wood[1], wood[3]];
      this.geometry.faceVertexUvs[0][11] = [wood[1], wood[2], wood[3]];
      var material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load("images/face/texture-atlas.jpg"),
        side: THREE.DoubleSide
      });
      this.curMesh = new THREE.Mesh(this.geometry, material);
      this.T.scene.add(this.curMesh);
      this.renderer();
    },

    renderer() {
      this.T.renderer.render(this.T.scene, this.T.camera);
      this.curMesh.rotateY(0.01);
      this.curMesh.rotateX(0.01);
      this.T.stats.update();
      requestAnimationFrame(this.renderer);
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

