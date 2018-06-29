<template>
  <div class="ql-container te-html">
    <div v-html="html" class="ql-editor content"></div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';

export default {
  name: 'te-html',
  props: {
    assessmentType: { type: String, default: '' },
    content: { type: String, required: true }
  },
  data() {
    return {
      counter: 1
    };
  },
  computed: {
    html() {
      if (this.assessmentType !== 'FB') return this.content;
      return this.content.replace(/@blank/g, this.insertBlankLine);
    }
  },
  methods: {
    insertBlankLine() {
      return `<span class='blank'>
                <span>${this.counter++}</span>
                <span class="blank-line"></span>
              </span>`;
    }
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
