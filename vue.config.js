const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const debug = process.env.NODE_ENV !== 'production'
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'
// let cesiumWorkers = 'Workers'
module.exports = {
  // baseUrl: '',
  publicPath: '',
  devServer: {
    open: false,
    https: false,
    port: 8090
  },
  outputDir: 'docs',
  configureWebpack: {
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        'cesium': path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [

    ],
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false

    }
  }
}