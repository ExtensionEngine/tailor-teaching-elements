<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <div
      v-for="(_, index) in correct"
      :key="index"
      class="answer-group">
      <ul>
        <li>
          <div class="input-group">
            <div class="input-group-addon">{{ index + 1 }}</div>
            <input
              v-model="userAnswer[index]"
              :disabled="disabled"
              type="text"
              class="form-control"
              placeholder="Solution...">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    correct: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    submission: { type: Array, default: () => ([]) },
    retake: { type: Boolean, default: false }
  },
  data() {
    return { userAnswer: this.submission };
  },
  methods: {
    update() {
      let userAnswer = this.userAnswer.map(it => it.trim()).filter(it => !!it);
      if (userAnswer.length !== this.correct.length) userAnswer = null;
      this.$emit('update', { userAnswer });
    }
  },
  watch: {
    retake(val) {
      if (val) this.userAnswer = [];
    },
    submission(val) {
      if (val) this.userAnswer = val;
    },
    userAnswer() {
      this.update();
    }
  }
};
</script>

<style lang="scss" >
.assessment.fill-blank {
  .answer-group {
    margin-top: 10px;
  }

  ul {
    padding: 0 0 0 10px;
    list-style: none;

    li {
      padding: 5px 0;
    }
  }
}
</style>
