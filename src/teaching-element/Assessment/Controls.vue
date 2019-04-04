<template>
  <div class="controls">
    <button
      :class="{ disabled: disabled && !retake, retake }"
      :disabled="disabled && !retake"
      @click="onClick"
      class="btn btn-submit">
      {{ btnLabel }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
    retake: { type: Boolean, default: false }
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

  .btn-submit {
    min-width: 85px;
    padding: 7px 15px;
  }

  .btn-submit.retake {
    pointer-events: all;
  }
}
</style>
