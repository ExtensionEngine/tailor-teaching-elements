<template>
  <assessment v-bind="$attrs" v-on="$listeners" isReflection/>
</template>

<script>
import Assessment from './Assessment/index.vue';

export default {
  name: 'te-reflection',
  components: { Assessment }
};
</script>
