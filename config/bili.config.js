const path = require('path');

// TODO: try `sourcemap` & `open` options once we migrate to latest version
//       of rollup-plugin-visualizer which is currently locked due to older
//       rollup version used by bili
const visualizer = {
  // sourcemap: true,
  // open: true
};

module.exports = {
  name: 'tailor-teaching-elements',
  moduleName: 'TailorTeachingElements',
  format: ['umd', 'umd-min', 'es'],
  plugins: ['vue', 'node-builtins', 'visualizer'],
  postcss: {
    extract: false
  },
  babel: {
    babelrc: false,
    extensions: [ 'js', '.vue' ]
  },
  visualizer,
  alias: {
    '@': path.resolve(__dirname, '../src')
  }
};
