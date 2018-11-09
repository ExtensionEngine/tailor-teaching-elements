<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="(answer, index) in answers"
        :key="index"
        :class="getAnswerClass(index)">
        <input
          v-model="userAnswer"
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
    getAnswerClass(index) {
      const selected = this.isSelected(index) ? 'selected' : '';
      if (!this.disabled || !this.options.setCorrectnessClass) return [selected];
      return [selected, this.isCorrect(index) ? 'te-correct' : 'te-incorrect'];
    },
    isCorrect(index) {
      const isCorrect = index === this.correct;
      const isAnswered = index === this.userAnswer;
      return !(isCorrect^isAnswered);
    },
    isSelected(index) {
      return index === this.userAnswer;
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
