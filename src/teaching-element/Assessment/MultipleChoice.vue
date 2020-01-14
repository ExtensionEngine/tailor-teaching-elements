<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="{ id, key, index, value } in choices"
        :key="id"
        :class="getAnswerClass(index)">
        <input
          v-model="userAnswer"
          @change="update"
          :id="id"
          :value="key"
          :disabled="disabled"
          class="answers-checkbox"
          type="checkbox">
        <label :for="id">
          <span class="order">{{ transform(index) }}.</span>
          <span>{{ value }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import getUniqueId from '@/util/getUniqueId';
import includes from 'lodash/includes';
import { rules } from '@/util/listingType';
import shuffle from 'lodash/shuffle';
import sortBy from 'lodash/sortBy';

const defaults = { type: 'upper-latin', randomize: false };

export default {
  props: {
    answers: { type: Array, required: true },
    correct: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Array, default: () => ([]) }
  },
  data: vm => ({ userAnswer: vm.submission || [] }),
  computed: {
    config: vm => ({ ...defaults, ...vm.options.multipleChoice }),
    choices() {
      const { answers, config } = this;
      const choices = answers.map((value, key) => this.buildChoices(value, key));
      if (!config.randomize) return choices;
      return shuffle(choices).map((it, index) => ({ ...it, index }));
    },
    isValid() {
      return this.userAnswer.length;
    }
  },
  methods: {
    update() {
      const userAnswer = sortBy(this.userAnswer, 'index');
      this.$emit('update', { userAnswer });
    },
    buildChoices(value, key) {
      const id = getUniqueId();
      const correct = this.correct.includes(key);
      return { id, key, index: key, value, correct };
    },
    getAnswerClass(index) {
      const { disabled, config, userAnswer, isAnswerCorrect } = this;
      const classes = [includes(userAnswer, index) ? 'selected' : ''];
      if (!disabled || !config.enableHighlighting) return classes;
      classes.push(isAnswerCorrect(index) ? 'te-correct' : 'te-incorrect');
      return classes;
    },
    isAnswerCorrect(index) {
      const { userAnswer, mappedAnswers } = this;
      return !(includes(userAnswer, index) ^ mappedAnswers[index].correct);
    },
    transform(index) {
      return rules[this.config.type](index);
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.userAnswer = [];
      this.update();
    },
    isValid(val) {
      this.$emit('validateAnswer', { isValid: val });
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
      top: 10px;
      left: 31px;
    }
  }
}
</style>
