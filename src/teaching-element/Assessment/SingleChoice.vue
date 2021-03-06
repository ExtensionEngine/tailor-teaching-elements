<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="{ id, key, index, value } in choices"
        :key="id"
        :class="getAnswerClass(key)">
        <input
          v-model="userAnswer"
          @change="update"
          :id="id"
          :value="{ key, index }"
          :disabled="disabled"
          class="answers-radio"
          type="radio">
        <label :for="id">
          <span class="order">{{ transform(index) }}.</span>
          <span>{{ value }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { TYPES as LISTING_TYPES, rules } from '@/util/listingType';
import get from 'lodash/get';
import getUniqueId from '@/util/getUniqueId';
import isNumber from 'lodash/isNumber';
import shuffle from 'lodash/shuffle';

const defaults = {
  highlighting: { enabled: false, all: false },
  type: LISTING_TYPES.LATIN.UPPER,
  randomize: false
};

const buildUserAnswer = val => isNumber(val) ? { key: val, index: val } : {};

export default {
  props: {
    answers: { type: Array, required: true },
    isReflection: { type: Boolean, required: true },
    correct: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Number, default: null }
  },
  data: vm => ({ userAnswer: buildUserAnswer(vm.submission) }),
  computed: {
    config: vm => ({ ...defaults, ...vm.options.singleChoice }),
    choices() {
      const { answers, buildChoices, config } = this;
      const choices = answers.map(buildChoices);
      if (!config.randomize) return choices;
      return shuffle(choices).map((it, index) => ({ ...it, index }));
    }
  },
  methods: {
    update() {
      this.$emit('update', { userAnswer: this.userAnswer });
    },
    isSelected(key) {
      return get(this.userAnswer, 'key') === key;
    },
    getAnswerClass(index) {
      const { highlighting } = this.config;
      const { correct, disabled, isReflection } = this;
      const selected = this.isSelected(index) ? 'selected' : '';
      if (!disabled || isReflection || !highlighting.enabled) return selected;
      const statusClass = index === correct ? 'te-correct' : 'te-incorrect';
      if (selected || highlighting.all) return [selected, statusClass];
    },
    buildChoices(value, key) {
      const id = getUniqueId();
      return { id, key, index: key, value };
    },
    transform(index) {
      return rules[this.config.type](index);
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.userAnswer = buildUserAnswer();
      this.update();
    },
    submission(val) {
      this.userAnswer = buildUserAnswer(val);
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
