const path = require('path');

const aliases = {
  examples: path.join(__dirname, '../examples')
};

const rules = [{
  test: /bootstrap-sass[/\\]assets[/\\]javascripts[/\\]/,
  use: 'imports-loader?jQuery=jquery'
}];

module.exports = (options, req) => ({
  entry: 'examples/main.js',
  html: {
    title: 'Tailor TES Example Showcase'
  },
  webpack(config) {
    config.module.rules.push(...rules);
    return config;
  },
  extendWebpack(config) {
    config.resolve.alias.merge(aliases);
  },
  port: 10080
});
