<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="(answer, index) in answers"
        :key="`${index}-${camelCase(answer)}`"
        :class="setAnswerClass(index)">
        <input
          v-model="userAnswer"
          :disabled="disabled"
          :value="index"
          @change="update"
          id="id"
          class="answers-checkbox"
          type="checkbox">
        <label :for="id">{{ transform(index) }}. {{ answer }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
import camelCase from 'lodash/camelCase';
import { rules } from '../../util/listingType';

const defaults = { type: 'upper-latin' };

export default {
  props: {
    answers: { type: Array, required: true },
    correct: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Array, default: () => ([]) }
  },
  data: () => ({ userAnswer: this.submission }),
  computed: {
    type() {
      const options = this.options.multipleChoice || defaults;
      return options.type;
    }
  },
  methods: {
    camelCase,
    setAnswerClass(index) {
      const selected = this.userAnswer.includes(index) ? 'selected' : '';
      if (!this.disabled || !this.options.setCorrectnessClass) return [selected];

      return [
        selected,
        this.isAnswerCorrect(index) ? 'te-correct' : 'te-incorrect'
      ];
    },
    isAnswerCorrect(index) {
      const { correct, userAnswer } = this;
      return !(userAnswer.includes(index) ^ correct.includes(index));
    },
    transform(index) {
      return rules[this.type](index);
    },
    update() {
      let { userAnswer } = this;
      userAnswer = userAnswer.length > 0 ? userAnswer.sort() : null;
      this.$emit('update', { userAnswer });
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.userAnswer = [];
      this.update();
    },
    submission(val) {
      this.userAnswer = val || [];
    }
  }
};
</script>

<style lang="scss">
.assessment.multiple-choice {
  .answers {
    padding-left: 0;
    font-size: 17px;
    list-style-type: none;

    li {
      position: relative;
      padding: 10px 0 10px 60px;
    }

    .answers-checkbox {
      position: absolute;
      left: 31px;
      top: 10px;
    }
  }
}
</style>
