const path = require('path');
const visualizer = require('rollup-plugin-visualizer');

module.exports = {
  name: 'tailor-tes',
  moduleName: 'TailorTes',
  format: ['umd', 'umd-min', 'es'],
  plugins: ['vue', 'node-builtins', visualizer({
    // TODO: try `sourcemap` & `open` options once we migrate to latest version
    //       of rollup-plugin-visualizer which is currently locked due to older
    //       rollup version used by bili
    // sourcemap: true,
    // open: true
  })],
  postcss: {
    extract: false
  },
  babel: {
    babelrc: false
  },
  alias: {
    '@': path.resolve(__dirname, '../src')
  }
};
