<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="choice in choices"
        :key="choice.id"
        :class="getAnswerClass(index)">
        <input
          v-model="userAnswer"
          @change="update"
          :id="id"
          :value="choice"
          :disabled="disabled"
          class="answers-radio"
          type="radio">
        <label :for="id">
          <span class="order">{{ transform(choice.index) }}.</span>
          <span>{{ choice.value }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import cuid from 'cuid';
import { rules } from '../../util/listingType';
import shuffle from 'lodash/shuffle';

const defaults = { type: 'upper-latin', randomize: false };

export default {
  props: {
    answers: { type: Array, required: true },
    correct: { type: Number, required: true },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Number, default: null }
  },
  data: vm => ({ userAnswer: vm.submission || [] }),
  computed: {
    config: vm => ({ ...defaults, ...vm.options.singleChoice }),
    choices() {
      const { answers, config } = this;
      const choices = answers.map(this.buildChoices);
      if (!config.randomize) return choices;
      return shuffle(choices).map((it, index) => ({ ...it, index }));
    }
  },
  methods: {
    update() {
      this.$emit('update', { userAnswer: this.userAnswer });
    },
    getAnswerClass(index) {
      const { correct, userAnswer, disabled, options } = this;
      const selected = index === userAnswer ? 'selected' : '';
      if (!disabled || !options.enableHighlighting) return [selected];
      const isAnswerCorrect = !(index === correct ^ index === userAnswer);
      return [selected, isAnswerCorrect ? 'te-correct' : 'te-incorrect'];
    },
    buildChoices(value, key) {
      const id = cuid();
      return { id, key, index: key, value };
    },
    transform(index) {
      return rules[this.config.type](index);
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
      top: 10px;
      left: 31px;
    }
  }
}
</style>
