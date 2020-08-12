import globalThis from '@ungap/global-this';
import TeachingElement from './teaching-element/index.vue';

export const install = Vue => Vue.component('TeachingElement', TeachingElement);
export default install;

if (globalThis.Vue) globalThis.Vue.use({ install });

export { TeachingElement };
