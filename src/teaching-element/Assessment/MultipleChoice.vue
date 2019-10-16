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
          @change="update"
          :value="choice"
          :disabled="disabled"
          class="answers-checkbox"
          type="checkbox">
        <span class="order">{{ transform(choice.index) }}.</span>
        <span>{{ choice.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import includes from 'lodash/includes';
import { rules } from '../../util/listingType';
import shuffle from 'lodash/shuffle';

const defaults = { type: 'upper-latin', randomize: false };

export default {
  props: {
    answers: { type: Array, required: true },
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
      const choices = answers.map((value, key) => ({ value, key, index: key }));
      if (!config.randomize) return choices;
      return shuffle(choices).map((it, index) => ({ ...it, index }));
    },
    isValid() {
      return this.userAnswer.length;
    }
  },
  methods: {
    update() {
      this.$emit('update', { userAnswer: this.userAnswer });
    },
    isSelected(index) {
      return includes(this.userAnswer, index);
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
