<template>
  <div id="app">
    <navbar @select="select" :element-type="elementType" />
    <div class="container-fluid">
      <showcase
        @select="select"
        :element-type="elementType"
        :element-sub-type="elementSubType" />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Showcase from './components/Showcase';

export default {
  data() {
    return {
      elementType: '',
      elementSubType: ''
    };
  },
  methods: {
    select(data) {
      if (data.elementSubType) return Object.assign(this, data);
      Object.assign(this, { elementType: data, elementSubType: '' });
    }
  },
  components: {
    Navbar,
    Showcase
  }
};
</script>

<style lang="scss">
@import './assets/stylesheets/main';

#app {
  color: rgba(0, 0, 0, .87);
  font-family: 'Roboto', 'Georgia', sans-serif;
  height: 100%;
  padding: 100px 200px;
  text-align: center;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  background-color: #e0e0e0;
}
</style>
