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
.te-html {
  .content {
    padding: 12px 15px;
  }

  .blank {
    display: inline-block;
    margin: 0 5px;

    .blank-line {
      display: inline-block;
      width: 50px;
      border-bottom: 1px solid black;
    }
  }
}
</style>
