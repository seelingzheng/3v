import Vue from 'vue'
import Router from 'vue-router'
import Hello from './views/hello.vue'

Vue.use(Router)

var routes = [{
  path: '/',
  name: 'hello',
  component: Hello
}, {
  path: '*',
  redirect: '/',
}]
let files = require.context('./views', false, /\.vue$/)

files.keys().forEach(key => {
  let name = key.split('/').pop().split('.').shift();
  if (name !== 'hello') {
    let component = files(key).default
    let p = {
      path: `/${name}`,
      name,
      component
    }
    routes.push(p);
  }
});
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})