// 自定义模型加载器
export function loader(pathArr) {
  // 各类loader实例
  let jsonLoader = new THREE.JSONLoader();
  let fbxLoader = new THREE.FBXLoader();
  let mtlLoader = new THREE.MTLLoader();
  let objLoader = new THREE.OBJLoader();
  let basePath, pathName, pathFomat;
  if (Object.prototype.toString.call(pathArr) !== '[object Array]') {
    pathArr = new Array(1).fill(pathArr.toString());
  }
  let promiseArr = pathArr.map((path) => {
    // 模型基础路径
    basePath = path.substring(0, path.lastIndexOf('/') + 1);
    // 模型名称
    pathName = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
    // 后缀为js或json的文件统一当做js格式处理
    pathName = pathName === 'json' ? 'js' : pathName;
    // 模型格式
    pathFomat = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
    switch (pathFomat) {
      case 'js':
        return new Promise(function (resolve) {
          jsonLoader.load(path, (geometry, material) => {
            resolve({
              // 对于js文件，加载到的模型与材质分开放置
              geometry: geometry,
              material: material
            })
          });
        });
        break;
      case 'fbx':
        return new Promise(function (resolve) {
          fbxLoader.load(path, (object) => {
            resolve(object);
          });
        });
        break;
      case 'obj':
        return new Promise(function (resolve) {
          objLoader.load(path, (object) => {
            resolve(object);
          });
        });
        break;
      case 'mtl':
        return new Promise(function (resolve) {
          mtlLoader.setPath(basePath);
          mtlLoader.load(pathName + '.mtl', (mtl) => {
            resolve(mtl);
          });
        });
        break;
      case 'objmtl':
        return new Promise(function (resolve, reject) {
          mtlLoader.setPath(basePath);
          mtlLoader.load(`${pathName}.mtl`, (mtl) => {
            mtl.preload();
            objLoader.setMaterials(mtl);
            objLoader.setPath(basePath);
            objLoader.load(pathName + '.obj', resolve, undefined, reject);
          });
        });
        break;
      default:
        return '';
    }
  });
  return Promise.all(promiseArr);
}