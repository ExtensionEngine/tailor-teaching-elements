<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="choice in choices"
        :key="choice.key"
        :class="{ selected: isSelected(choice.key) }">
        <input
          v-model="userAnswer"
          :value="choice"
          :disabled="disabled"
          @change="update"
          class="answers-radio"
          type="radio">
        <span class="order">{{ transform(choice.index) }}.</span>
        <span>{{ choice.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { rules } from '../../util/listingType';
import shuffle from 'lodash/shuffle';

const defaults = { type: 'upper-latin', randomize: false };

export default {
  props: {
    answers: { type: Array, required: true },
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
      const choices = answers.map((value, key) => ({ value, key, index: key }));
      if (!config.randomize) return choices;
      return shuffle(choices).map((it, index) => ({ ...it, index }));
    }
  },
  methods: {
    update() {
      this.$emit('update', { userAnswer: this.userAnswer });
    },
    isSelected(index) {
      return index === this.userAnswer;
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
      left: 31px;
      top: 10px;
    }
  }
}
</style>
