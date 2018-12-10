<template>
  <div class="form-group">
    <label :for="uniqueId" class="form-label">Solution</label>
    <span class="answer">
      <textarea
        v-model="userAnswer"
        :disabled="disabled"
        :id="uniqueId"
        class="form-control"
        rows="6"
        type="text">
      </textarea>
    </span>
  </div>
</template>

<script>
import uniqueId from 'lodash/uniqueId';

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
  computed: {
    uniqueId() {
      return uniqueId('text-response');
    }
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
