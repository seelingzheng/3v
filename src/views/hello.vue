<template>
  <div class="home">
    <three @threeLoaded="tLoaded($event)" :options="options"></three>
    <div class="list">
      <Dropdown trigger="click" style="margin-left: 20px;" @on-click="onChange($event)">
        <a href="javascript:void(0)">
          Geometry
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem
            :name="item"
            v-for="(item, index) in Object.keys(geometries)"
            :key="index"
          >{{item}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
import three from "@/components/three";
import * as THREE from "three";
export default {
  name: "home",

  data() {
    return {
      options: {
        showAxesHeleper: true,
        pointlight: {},
        ambientlight: null
      },
      geometries: null,
      curMesh: null,
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
  beforeMount() {
    this.geometries = {
      BoxBufferGeometry: {},
      BoxGeometry: {},
      CircleBufferGeometry: {},
      CircleGeometry: {},
      ConeBufferGeometry: {},
      ConeGeometry: {},
      CylinderBufferGeometry: {},
      CylinderGeometry: {},
      TextBufferGeometry: {
        text: "TextBufferGeometry",
        option: {
          size: 80,
          height: 5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5
        }
      },
      TextGeometry: {
        text: "TextGeometry",
        option: {
          size: 80,
          height: 5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5
        }
      },
      DodecahedronBufferGeometry: {},
      DodecahedronGeometry: {},
      EdgesGeometry: {},
      ExtrudeBufferGeometry: {},
      ExtrudeGeometry: {},
      IcosahedronBufferGeometry: {},
      IcosahedronGeometry: {},
      LatheBufferGeometry: {},
      LatheGeometry: {},
      OctahedronBufferGeometry: {},
      OctahedronGeometry: {},
      ParametricBufferGeometry: {},
      ParametricGeometry: {},
      PlaneBufferGeometry: {},
      PlaneGeometry: {},
      PolyhedronBufferGeometry: {},
      PolyhedronGeometry: {},
      RingBufferGeometry: {},
      RingGeometry: {},
      ShapeBufferGeometry: {},
      ShapeGeometry: {},
      SphereBufferGeometry: {},
      SphereGeometry: {},
      TetrahedronBufferGeometry: {},
      TetrahedronGeometry: {},

      TorusBufferGeometry: {},
      TorusGeometry: {},
      TorusKnotBufferGeometry: {},
      TorusKnotGeometry: {},
      TubeBufferGeometry: {},
      TubeGeometry: {}
    };
  },
  mounted() {},
  methods: {
    tLoaded(threeObj) {
      this.T = threeObj;
      this.addLight();
      this.renderAnimate();
    },
    renderAnimate() {
      if (this.curMesh) {
        this.curMesh.rotateY(0.01);
        this.curMesh.rotateX(-0.01);
      }
      if (this.T.renderer) this.T.renderer.render(this.T.scene, this.T.camera);
      this.T.stats.update();
      requestAnimationFrame(this.renderAnimate);
    },
    addLight() {
      var lights = [];
      lights[0] = new THREE.PointLight(0xffffff, 1, 0);
      lights[1] = new THREE.PointLight(0xffffff, 1, 0);
      lights[2] = new THREE.PointLight(0xffffff, 1, 0);

      lights[0].position.set(0, 200, 0);
      lights[1].position.set(100, 200, 100);
      lights[2].position.set(-100, -200, -100);

      this.T.scene.add(lights[0]);
      this.T.scene.add(lights[1]);
      this.T.scene.add(lights[2]);
    },
    createGeometry(name) {
      let op = this.geometries[name];

      return new Promise((resolve, recte) => {
        let geometry;
        if (JSON.stringify(op) == "{}") {
          geometry = new THREE[name](100, 100, 100);
          resolve(geometry);
        } else {
          let fontLoader = new THREE.FontLoader();
          fontLoader.load(
            "/fonts/gentilis_bold.typeface.json",
            font => {
              //textgeometry
              op.option["font"] = font;
              geometry = new THREE[name](op.text, op.option);
              resolve(geometry);
            },
            proess => {
              console.log((proess.loaded / proess.total) * 100 + "% loaded");
            },
            err => {
              console.log("An error happened");
            }
          );
        }
      });
    },
    createMaterial() {
      return new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
        specular: 0x444444,
        shininess: 30,
        transparent: true, //开启透明度
        opacity: 0.5 //设置透明度具体值
      });
    },
    createLineBasicMaterial() {
      return new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
      });
    },

    onChange(name) {
      if (this.curMesh) {
        this.T.scene.remove(this.curMesh);
      }
      this.curMesh = new THREE.Group();
      this.createGeometry(name).then(g => {
        let m = this.createMaterial();
        let lineM = this.createLineBasicMaterial();
        let mesh = new THREE.Mesh(g, m);
        let lineSegment = new THREE.LineSegments(g, lineM);
        this.curMesh.add(mesh);
        // this.curMesh.add(lineSegment);
        this.T.scene.add(this.curMesh);
        this.T.renderer.render(this.T.scene, this.T.camera);
      });
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

