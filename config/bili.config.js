const path = require('path');

const sourcemap = true;

// open flag blocks build process
// https://github.com/btd/rollup-plugin-visualizer/issues/27
const visualizer = { sourcemap };
const alias = { '@': path.resolve(__dirname, '../src') };

module.exports = {
  babel: { babelrc: false },
  plugins: { vue: true, 'node-builtins': true, alias, visualizer },
  output: {
    extractCSS: false,
    format: ['esm', 'esm-min', 'umd', 'umd-min'],
    fileName: 'tailor-teaching-elements[min].[format][ext]',
    moduleName: 'TailorTeachingElements',
    sourceMap: sourcemap
  }
};
