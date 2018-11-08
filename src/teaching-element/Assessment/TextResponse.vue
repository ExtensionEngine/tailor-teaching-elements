<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <span class="answer">
      <textarea
        v-model="userAnswer"
        :disabled="disabled"
        class="form-control"
        rows="6"
        type="text">
      </textarea>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
    retake: { type: Boolean, default: false },
    submission: { type: String, default: null }
  },
  data() {
    return {
      userAnswer: this.submission
    };
  },
  methods: {
    update() {
      this.$emit('update', { userAnswer: this.userAnswer || null });
    }
  },
  watch: {
    retake(val) {
      if (val) this.userAnswer = null;
    },
    submission(val) {
      this.userAnswer = val;
    },
    userAnswer() {
      this.update();
    }
  }
};
</script>

<style lang="scss">
.assessment.text-response {
  .answer {
    padding: 10px 0 0 50px;
    font-size: 16px;
    margin: 10px 0;
  }
}
</style>
