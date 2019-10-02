<template>
  <div class="jodit_container">
    <div class="jodit_wysiwyg" v-html="content"></div>
  </div>
</template>

<script>
import 'jodit/build/jodit.min.css';

export default {
  name: 'te-passage',
  props: {
    content: { type: String, required: true }
  }
};
</script>
