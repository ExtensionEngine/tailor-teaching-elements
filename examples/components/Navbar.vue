<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Tailor TES</a>
      </div>

      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              {{ selected }} <span class="mdi mdi-chevron-down"></span>
            </a>
            <ul class="dropdown-menu">
              <li v-for="{ title, value } in elementTypes" :key="value">
                <a @click="select(value)" href="#">
                  {{ title }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import 'bootstrap-sass/assets/javascripts/bootstrap/dropdown';
import keys from 'lodash/keys';
import toTitleCase from 'to-title-case';
import { TE_TYPE } from '../../src/types';

export default {
  props: {
    elementType: { type: String, default: '' }
  },
  computed: {
    elementTypes() {
      return keys(TE_TYPE).map(key => ({
        title: toTitleCase(TE_TYPE[key]),
        value: key
      }));
    },
    selected() {
      const title = TE_TYPE[this.elementType] || 'Pick element';
      return toTitleCase(title);
    }
  },
  methods: {
    select(type) {
      this.$emit('select', type);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #fff;
}

.navbar-nav {
  padding: 0;

  .dropdown {
    margin: 0;
  }
}
</style>
