<template>
  <div class="jodit_container">
    <div v-html="content" class="jodit_wysiwyg"></div>
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
