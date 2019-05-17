const path = require('path');

const visualizer = {
  // open: true, - the build process hangs if option is set
  sourcemap: true
};

module.exports = {
  babel: { babelrc: false },
  plugins: {
    vue: true,
    'node-builtins': true,
    alias: { '@': path.resolve(__dirname, '../src') },
    visualizer
  },
  output: {
    extractCSS: false,
    format: ['esm', 'esm-min', 'umd', 'umd-min'],
    fileName: 'tailor-teaching-elements[min].[format][ext]',
    moduleName: 'TailorTeachingElements',
    sourceMap: true
  }
};
