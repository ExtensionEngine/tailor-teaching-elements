<template>
  <div id="app">
    <navbar @select="select" :elementType="elementType"></navbar>
    <div class="container-fluid">
      <showcase
        @select="select"
        :elementType="elementType"
        :elementSubType="elementSubType">
      </showcase>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Showcase from './components/Showcase';

export default {
  data() {
    return {
      elementType: null,
      elementSubType: null
    };
  },
  methods: {
    select(data) {
      if (data.elementSubType) {
        this.elementSubType = data.elementSubType;
        this.elementType = 'ASSESSMENT';
      } else {
        this.elementType = data;
        this.elementSubType = null;
      }
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
