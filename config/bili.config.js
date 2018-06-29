const path = require('path');

module.exports = {
  name: 'tailor-tes',
  moduleName: 'TailorTes',
  format: ['umd', 'umd-min', 'es'],
  plugins: ['vue', 'node-builtins'],
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
