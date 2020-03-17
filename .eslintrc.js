'use strict';

module.exports = {
  root: true,
  extends: '@extensionengine',
  overrides: [{
    files: ['src/**', 'examples/**'],
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module'
    }
  }]
};
