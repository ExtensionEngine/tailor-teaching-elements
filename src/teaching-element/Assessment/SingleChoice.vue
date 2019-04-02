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
          :value="index"
          :disabled="disabled"
          @change="update"
          id="id"
          class="answers-radio"
          type="radio">
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
    correct: { type: Number, required: true },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Number, default: null }
  },
  data() {
    return { userAnswer: this.submission };
  },
  computed: {
    type() {
      const options = this.options.singleChoice || defaults;
      return options.type;
    }
  },
  methods: {
    camelCase,
    setAnswerClass(index) {
      const { correct, userAnswer } = this;
      const selected = index === userAnswer ? 'selected' : '';
      if (!this.disabled || !this.options.enableHighlighting) return [selected];
      const isAnswerCorrect = !(index === correct ^ index === userAnswer);
      return [selected, isAnswerCorrect ? 'te-correct' : 'te-incorrect'];
    },
    transform(index) {
      return rules[this.type](index);
    },
    update() {
      this.$emit('update', { userAnswer: this.userAnswer });
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.userAnswer = null;
      this.update();
    },
    submission(val) {
      this.userAnswer = val;
    }
  }
};
</script>

<style lang="scss">
.assessment.single-choice {
  .answers {
    padding-left: 0;
    font-size: 17px;
    list-style-type: none;

    li {
      position: relative;
      padding: 10px 0 10px 60px;
    }

    .answers-radio {
      position: absolute;
      left: 31px;
      top: 10px;
    }
  }
}
</style>
