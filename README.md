# Tailor teaching elements
[![circleci build status](https://badgen.net/circleci/github/ExtensionEngine/tailor-teaching-elements/develop?icon)](https://circleci.com/gh/extensionengine/tailor-teaching-elements) [![bundlephobia minified size](https://badgen.net/bundlephobia/min/tailor-teaching-elements)](https://bundlephobia.com/result?p=tailor-teaching-elements) [![npm package version](https://badgen.net/npm/v/tailor-teaching-elements)](https://npm.im/tailor-teaching-elements) [![github license](https://badgen.net/github/license/extensionengine/tailor-teaching-elements)](https://github.com/extensionengine/tailor-teaching-elements/blob/develop/LICENSE) [![js @extensionengine style](https://badgen.net/badge/code%20style/@extensionengine/pink)](https://github.com/extensionengine/eslint-config) [![open source love](https://badgen.net/badge/Open%20Source/%E2%9D%A4/3eaf8e)](https://github.com/ellerbrock/open-source-badge/)

Vue.js library for [Tailor](https://github.com/ExtensionEngine/tailor)'s teaching elements presentation

## Usage

### Install via npm
`npm i tailor-teaching-elements`

### Register component
#### As global component
```js
import Vue from 'vue';
import tailorTeachingElements from 'tailor-teaching-elements';

Vue.component('tailor-teaching-elements', tailorTeachingElements);
```
##### OR

#### Import locally in components
```html
<script>
import tailorTeachingElements from 'tailor-teaching-elements';

export default {
  // ...
  components: {
    tailorTeachingElements
  }
};
</script>
```
