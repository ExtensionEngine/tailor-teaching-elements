# Tailor teaching elements
[![GitHub package version](https://img.shields.io/npm/v/tailor-teaching-elements.svg)](https://www.npmjs.com/package/tailor-teaching-elements)
[![GitHub license](https://img.shields.io/github/license/ExtensionEngine/tailor-teaching-elements.svg)](https://github.com/ExtensionEngine/tailor-teaching-elements/blob/master/LICENSE)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

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
