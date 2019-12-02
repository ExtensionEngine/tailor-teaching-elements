'use strict';

const { config } = require('./package.json');
const path = require('path');

/** @type {import('bili').Config} */
module.exports = {
  input: {
    'tailor-teaching-elements': 'src/index.js'
  },
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: config.moduleName,
    extractCSS: false
  },
  bundleNodeModules: ['style-inject', 'vue-runtime-helpers'],
  plugins: {
    vue: true,
    babel: {
      runtimeHelpers: true,
      sourceMap: true,
      extensions: ['.js', '.vue']
    },
    alias: {
      resolve: ['.vue', '.js'],
      entries: [
        { find: '@', replacement: path.resolve(__dirname, './src') }
      ]
    },
    'node-builtins': true,
    visualizer: {
      sourceMap: true,
      open: false
    }
  },
  resolvePlugins: {
    alias: require('@rollup/plugin-alias')
  }
};
