<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="(answer, index) in answers"
        :key="index"
        :class="{ selected: isSelected(index) }">
        <input
          v-model="userAnswer"
          @change="update"
          :value="index"
          :disabled="disabled"
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
    return { userAnswer: this.submission || [] };
  },
  computed: {
    type() {
      const options = this.options.multipleChoice || defaults;
      return options.type;
    }
  },
  methods: {
    update() {
      let { userAnswer } = this;
      userAnswer = isEmpty(userAnswer) ? null : userAnswer.sort();
      this.$emit('update', { userAnswer });
    },
    isSelected(index) {
      return includes(this.userAnswer, index);
    },
    transform(index) {
      return rules[this.type](index);
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.userAnswer = [];
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
      top: 10px;
      left: 31px;
    }
  }
}
</style>
