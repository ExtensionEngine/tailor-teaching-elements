<template>
  <div class="ql-container te-html">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="ql-editor content" v-html="content"></div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';

export default {
  name: 'te-html',
  props: {
    content: { type: String, required: true }
  }
};
</script>

<style lang="scss">
@import './stylesheets/common';

.te-html {
  @extend %blank;

  .content {
    padding: 12px 15px;
  }
}
</style>
