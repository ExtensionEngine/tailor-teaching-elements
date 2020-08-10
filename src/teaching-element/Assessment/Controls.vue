<template>
  <div class="controls">
    <div v-if="showMessage && noAnswerMessage" class="no-answer-message">
      {{ noAnswerMessage }}
    </div>
    <button
      @click="onClick"
      :class="{ disabled: disabled && !retake, retake }"
      :disabled="!noAnswerMessage && disabled && !retake"
      class="btn btn-submit">
      {{ btnLabel }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
    retake: { type: Boolean, default: false },
    noAnswerMessage: { type: String, default: null },
    showMessage: { type: Boolean, default: false }
  },
  computed: {
    btnLabel() {
      return this.retake ? 'Retake' : 'Submit';
    }
  },
  methods: {
    onClick() {
      setTimeout(() => this.$emit(this.retake ? 'reset' : 'submit'), 0);
    }
  }
};
</script>

<style lang="scss">
.assessment .controls {
  width: 50%;
  float: right;
  text-align: right;
  cursor: auto;

  .no-answer-message {
    float: left;
  }

  .btn-submit {
    min-width: 85px;
    padding: 7px 15px;
  }

  .btn-submit.retake {
    pointer-events: all;
  }
}
</style>
