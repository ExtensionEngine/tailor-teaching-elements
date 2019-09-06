<template>
  <assessment
    v-bind="$attrs"
    @assessmentSubmit="data => $emit('assessmentSubmit', data)"
    @reflectionSubmit="data => $emit('reflectionSubmit', data)"
    isReflection/>
</template>

<script>
import Assessment from './Assessment';

export default {
  name: 'te-reflection',
  components: { Assessment }
};
</script>
