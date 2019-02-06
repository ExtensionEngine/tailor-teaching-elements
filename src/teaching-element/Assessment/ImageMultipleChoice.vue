<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <div class="answers">
      <div
        v-for="answer in answers"
        :key="answer.id"
        class="answer-container">
        <div
          :class="{ selected: isSelected(answer) }"
          @click="toggleAnswerSelection(answer)"
          class="img-container">
          <img :src="answer.data.url"/>
        </div>
        <div>
          <input
            :checked="isSelected(answer)"
            :disabled="disabled"
            @change="toggleAnswerSelection(answer)"
            class="answers-checkbox"
            type="checkbox">
          <span>{{ answer.data.caption }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filter from 'lodash/filter';

export default {
  props: {
    answers: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Array, default: () => ([]) }
  },
  data() {
    const submission = this.submission;
    return { selectedAnswerIds: submission ? submission.map(it => it.id) : [] };
  },
  methods: {
    isSelected({ id }) {
      return this.selectedAnswerIds.includes(id);
    },
    update() {
      this.$emit('update', { userAnswer: filter(this.answers, this.isSelected) });
    },
    toggleAnswerSelection(answer) {
      if (this.disabled) return;
      const { id } = answer;
      if (!this.isSelected(answer)) return this.selectedAnswerIds.push(id);
      const index = this.selectedAnswerIds.indexOf(id);
      if (index !== -1) this.selectedAnswerIds.splice(index, 1);
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.selectedAnswerIds = [];
      this.update();
    },
    selectedAnswerIds() {
      this.update();
    },
    submission(answers) {
      this.selectedAnswerIds = answers.map(it => it.id) || [];
    }
  }
};
</script>

<style lang="scss" scoped>
.assessment.image-multiple-choice {
  .answers {
    text-align: center;

    .answer-container {
      display: inline-block;
      vertical-align: top;
      width: 40%;
    }

    .img-container {
      display: inline-block;
      margin: 1rem;
      padding: 5px;

      &.selected {
        padding: 0;
        border: 5px solid #337ab7;
      }

      img {
        width: auto;
        height: 20rem;
      }
    }
  }
}
</style>
