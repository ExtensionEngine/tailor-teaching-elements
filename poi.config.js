const path = require('path');

const aliases = {
  examples: path.join(__dirname, './examples')
};

/** @type {import('poi').Config} */
module.exports = {
  plugins: [
    '@poi/eslint'
  ],
  entry: 'examples/main.js',
  output: {
    html: {
      title: 'Tailor Teaching Elements Example Showcase'
    }
  },
  chainWebpack(config) {
    config.resolve.alias.merge(aliases);
    config.resolve.extensions.merge(['.vue']);
    config.module.rule('bootstrap')
      .test(/bootstrap-sass[/\\]assets[/\\]javascripts[/\\]/)
      .post()
      .use('imports-loader')
      .loader(require.resolve('imports-loader'))
      .options({ jQuery: 'jquery' });
  },
  devServer: {
    port: 10080
  }
};
