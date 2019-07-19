<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="(answer, index) in availableAnswers"
        :key="index"
        :class="{ selected: isSelected(index) }">
        <input
          v-model="unorderedAnswer"
          :value="index"
          :disabled="disabled"
          @change="update"
          class="answers-checkbox"
          type="checkbox">
        <span class="order">{{ transform(index) }}.</span>
        <span>{{ answer.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { rules } from '../../util/listingType';

import get from 'lodash/get';
import includes from 'lodash/includes';
import shuffle from 'lodash/shuffle';

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
      unorderedAnswer: this.submission || [],
      availableAnswers: []
    };
  },
  computed: {
    type() {
      const type = this.options.multipleChoice.type || defaults.type;
      return type;
    },
    isRandom() {
      return get(this.options.multipleChoice, 'isRandom', false);
    },
    sortedAnswers() {
      let answers = [];
      this.unorderedAnswer.forEach(val => {
        answers.push(this.availableAnswers[val].key);
      });
      return !answers.length ? null : answers.sort();
    }
  },
  methods: {
    update() {
      this.$emit('update', { userAnswer: this.sortedAnswers });
    },
    isSelected(index) {
      return includes(this.unorderedAnswer, index);
    },
    transform(index) {
      return rules[this.type](index);
    }
  },
  created() {
    this.answers.forEach((value, key) => {
      this.availableAnswers.push({ value: value, key: key });
    });
    if (this.isRandom) this.availableAnswers = shuffle(this.availableAnswers);
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
