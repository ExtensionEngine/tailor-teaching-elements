import Vue from 'vue';
import App from './App';
import VuePlyr from 'vue-plyr';
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);
Vue.use(VuePlyr);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  components: { App }
});
