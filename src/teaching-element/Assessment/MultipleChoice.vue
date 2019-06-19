<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="(answer, index) in randomAnswers"
        :key="index"
        :class="{ selected: isSelected(answer) }">
        <input
          v-model="unorderedAnswer"
          :value="answer"
          :disabled="disabled"
          @change="update"
          class="answers-checkbox"
          type="checkbox">
        <span class="order">{{ transform(index) }}.</span>
        <span>{{ answer }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import shuffle from 'lodash/shuffle';
import { rules } from '../../util/listingType';

const defaults = { type: 'upper-latin' };

export default {
  props: {
    answers: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Array, default: () => ([]) }
  },
  data() {
    return {
      userAnswer: this.submission || [],
      unorderedAnswer: this.submission || []
    };
  },
  computed: {
    type() {
      const options = this.options.multipleChoice || defaults;
      return options.type;
    },
    randomAnswers() {
      return shuffle(this.answers);
    }
  },
  methods: {
    update() {
      this.userAnswer = [];
      this.unorderedAnswer.forEach(a => {
        this.userAnswer.push(this.answers.indexOf(a));
      });
      let { userAnswer } = this;
      userAnswer = isEmpty(userAnswer) ? null : userAnswer.sort();
      this.$emit('update', { userAnswer });
    },
    isSelected(answer) {
      return includes(this.unorderedAnswer, answer);
    },
    transform(index) {
      return rules[this.type](index);
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.userAnswer = [];
      this.unorderedAnswer = [];
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
