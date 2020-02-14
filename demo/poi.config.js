/** @type {import('poi').Config} */
module.exports = {
  plugins: [
    '@poi/eslint'
  ],
  entry: 'demo/index.js',
  chainWebpack(config) {
    config.resolve.extensions.merge(['.vue']);
  },
  devServer: {
    port: 10082
  }
};
