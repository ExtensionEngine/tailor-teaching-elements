
import App from './App';
import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  components: { App }
});
