<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="(answer, index) in shuffledAnswers"
        :key="index"
        :class="{ selected: isSelected(index) }">
        <input
          v-model="unorderedAnswer"
          :value="index"
          :disabled="disabled"
          @change="update"
          class="answers-radio"
          type="radio">
        <span class="order">{{ transform(index) }}.</span>
        <span>{{ answer }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { rules } from '../../util/listingType';
import shuffle from 'lodash/shuffle';
const defaults = { type: 'upper-latin' };

export default {
  props: {
    answers: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Number, default: null }
  },
  data() {
    return {
      userAnswer: this.submission,
      unorderedAnswer: this.submission
    };
  },
  computed: {
    type() {
      const options = this.options.singleChoice || defaults;
      return options.type;
    },
    shuffledAnswers() {
      return shuffle(this.answers);
    }
  },
  methods: {
    update() {
      let { shuffledAnswers, unorderedAnswer, answers } = this;
      this.userAnswer = answers.indexOf(shuffledAnswers[unorderedAnswer]);
      this.$emit('update', { userAnswer: this.userAnswer });
    },
    isSelected(index) {
      return index === this.unorderedAnswer;
    },
    transform(index) {
      return rules[this.type](index);
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.unorderedAnswer = null;
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
