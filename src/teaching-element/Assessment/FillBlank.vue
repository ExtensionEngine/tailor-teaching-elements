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
    answer: { type: Array, default: () => ([]) },
    correct: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    retake: { type: Boolean, default: false }
  },
  data() {
    return { userAnswer: [] };
  },
  methods: {
    update() {
      let userAnswer = this.userAnswer.map(it => it.trim()).filter(it => !!it);
      if (userAnswer.length !== this.correct.length) userAnswer = null;
      this.$emit('update', { userAnswer });
    }
  },
  watch: {
    answer(val) {
      if (val) this.userAnswer = val;
    },
    retake(val) {
      if (val) this.userAnswer = [];
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
