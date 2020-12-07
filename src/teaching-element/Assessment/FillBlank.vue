<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <div
      v-for="index in blankCount"
      :key="index"
      class="answer-group">
      <ul>
        <li>
          <div class="input-group">
            <div class="input-group-addon">{{ index }}</div>
            <input
              v-model="userAnswer[index - 1]"
              :disabled="disabled"
              type="text"
              class="form-control">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    submission: { type: Array, default: () => ([]) },
    retake: { type: Boolean, default: false }
  },
  data() {
    return { userAnswer: this.submission || [] };
  },
  computed: {
    blankCount() {
      return this.question.reduce((total, { count = 0 }) => total + count, 0);
    }
  },
  methods: {
    update() {
      let userAnswer = this.userAnswer.filter(it => !!it.trim());
      if (userAnswer.length !== this.blankCount) userAnswer = null;
      this.$emit('update', { userAnswer });
    }
  },
  watch: {
    retake(val) {
      if (val) this.userAnswer = [];
    },
    submission(val) {
      this.userAnswer = val || [];
    },
    userAnswer: 'update'
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
