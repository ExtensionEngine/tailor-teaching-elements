<template>
  <assessment v-on="$listeners" v-bind="$attrs" is-reflection />
</template>

<script>
import Assessment from './Assessment/index.vue';

export default {
  name: 'te-reflection',
  components: { Assessment }
};
</script>
