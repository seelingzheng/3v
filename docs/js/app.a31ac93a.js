(function(e){function t(t){for(var r,i,s=t[0],c=t[1],u=t[2],d=0,h=[];d<s.length;d++)i=s[d],o[i]&&h.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(h.length)h.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},2365:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"base"}})},o=[],a=n("75fc"),i=n("5176"),s=n.n(i),c=n("5a89"),u=n("6397"),l=n.n(u),d={props:["options"],data:function(){return{camera:null,scene:null,renderer:null}},mounted:function(){var e,t,n=s()({cameraPostion:[200,300,200],showAxesHeleper:!1,bgColor:"0xb9d3ff",pointlight:{color:13421772,position:[400,200,300]},ambientlight:16777215},this.options),r=document.getElementById("base");this.scene=new c["Scene"],this.camera=new c["PerspectiveCamera"](75,window.innerWidth/window.innerHeight,.1,1e3),(e=this.camera.position).set.apply(e,Object(a["a"])(n.cameraPostion)),this.camera.lookAt(this.scene.position);var o=new l.a(this.camera),i=new c["PointLight"](n.pointlight.color);(t=i.position).set.apply(t,Object(a["a"])(n.pointlight.position)),this.scene.add(i);var u=new c["AmbientLight"](n.ambientlight);if(this.scene.add(u),n.showAxesHeleper){var d=new c["AxesHelper"](250);this.scene.add(d)}this.renderer=new c["WebGLRenderer"],n.bgColor&&this.renderer.setClearColor(n.bgColor,1),this.renderer.setSize(window.innerWidth,window.innerHeight),r.appendChild(this.renderer.domElement),this.initRenderer(),o.addEventListener("change",this.initRenderer),this.$emit("threeLoaded",{scene:this.scene,camera:this.camera,renderer:this.renderer,orbitControl:o})},methods:{initRenderer:function(){this.renderer.render(this.scene,this.camera)}}},h=d,f=(n("ea7a"),n("2877")),p=Object(f["a"])(h,r,o,!1,null,"9100d9fa",null);t["a"]=p.exports},"28e8":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("three",{attrs:{options:e.options},on:{threeLoaded:function(t){return e.tLoaded(t)}}})],1)},o=[],a=n("2365"),i=n("5a89"),s={name:"home",data:function(){return{options:{showAxesHeleper:!0}}},components:{three:a["a"]},mounted:function(){},methods:{tLoaded:function(e){var t=e.camera,n=e.scene,r=e.renderer,o=(e.orbitControl,new i["BoxGeometry"](100,100,100)),a=new i["MeshLambertMaterial"]({color:255}),s=new i["Mesh"](o,a);n.add(s),r.render(n,t)}}},c=s,u=n("2877"),l=Object(u["a"])(c,r,o,!1,null,null,null);t["default"]=l.exports},"4c8c":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("three",{on:{threeLoaded:function(t){return e.tLoaded(t)}}})],1)},o=[],a=n("2365"),i=n("5a89"),s={name:"home",data:function(){return{}},components:{three:a["a"]},mounted:function(){},methods:{tLoaded:function(e){var t=e.camera,n=e.scene,r=e.renderer,o=(e.orbitControl,new i["PointLight"](13421772));o.position.set(400,200,300),n.add(o);var a=new i["AmbientLight"](16777215);n.add(a);var s=new i["BoxGeometry"](100,100,100),c=new i["MeshLambertMaterial"]({color:255}),u=new i["Mesh"](s,c);n.add(u),r.render(n,t)}}},c=s,u=n("2877"),l=Object(u["a"])(c,r,o,!1,null,null,null);t["default"]=l.exports},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("a026"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Layout",{style:{minHeight:"100vh"}},[n("Sider",{attrs:{"hide-trigger":"",collapsible:"","collapsed-width":78}},[n("Menu",{attrs:{theme:"dark",width:"auto",accordion:""},on:{"on-select":function(t){return e.onSelect(t)}}},[n("Submenu",{attrs:{name:"1"}},[n("template",{slot:"title"},[n("Icon",{attrs:{type:"ios-navigate"}}),n("span",[e._v("ThreeJS API 案例")])],1),n("MenuItem",{attrs:{name:"hello"}},[e._v("Hello")]),n("MenuItem",{attrs:{name:"graphic"}},[e._v("图形")]),n("MenuItem",{attrs:{name:"1-3"}},[e._v("举报管理")])],2)],1)],1),n("Layout",[n("Content",[n("router-view")],1)],1)],1)],1)},a=[],i={methods:{onSelect:function(e){this.$router.push({name:e})}}},s=i,c=(n("034f"),n("2877")),u=Object(c["a"])(s,o,a,!1,null,null,null),l=u.exports,d=(n("28a5"),n("ac6a"),n("8c4f")),h=n("28e8");r["default"].use(d["a"]);var f=[{path:"/",name:"hello",component:h["default"]},{path:"*",redirect:"/"}],p=n("e1b5");p.keys().forEach(function(e){var t=e.split("/").pop().split(".").shift();if("hello"!==t){var n=p(e).default,r={path:"/".concat(t),name:t,component:n};f.push(r)}});var m=new d["a"]({mode:"history",base:"",routes:f}),v=n("2f62");r["default"].use(v["a"]);var b=new v["a"].Store({state:{},mutations:{},actions:{}}),w=n("e069"),g=n.n(w);n("dcad");r["default"].use(g.a),r["default"].config.productionTip=!1,new r["default"]({router:m,store:b,render:function(e){return e(l)}}).$mount("#app")},"64a9":function(e,t,n){},"800f":function(e,t,n){},e1b5:function(e,t,n){var r={"./graphic.vue":"4c8c","./hello.vue":"28e8"};function o(e){var t=a(e);return n(t)}function a(e){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="e1b5"},ea7a:function(e,t,n){"use strict";var r=n("800f"),o=n.n(r);o.a}});
//# sourceMappingURL=app.a31ac93a.js.map