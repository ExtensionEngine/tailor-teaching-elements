'use strict';

const path = require('path');

const filename = 'tailor-teaching-elements';
const moduleName = 'TailorTeachingElements';
const sourceDir = path.resolve(__dirname, '../src');
const sourceMap = true;

const babel = {
  babelrc: false,
  runtimeHelpers: true,
  sourceMap
};

const alias = {
  '@': sourceDir
};

// NOTE: ``--open'' flag blocks build process
// https://github.com/btd/rollup-plugin-visualizer/issues/27
const visualizer = {
  sourcemap: sourceMap
};

/** @type {import('bili').Config} */
module.exports = {
  input: { [filename]: sourceDir },
  plugins: {
    'node-builtins': true,
    vue: true,
    babel,
    alias,
    visualizer
  },
  output: {
    extractCSS: false,
    format: ['esm', 'umd', 'umd-min'],
    moduleName,
    sourceMap
  }
};
