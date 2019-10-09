<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answers">
      <li
        v-for="(value, index) in values"
        :key="index"
        :class="{ selected: isSelected(value) }">
        <input
          v-model="userAnswer"
          @change="update"
          :value="value"
          :disabled="disabled"
          class="answers-radio"
          type="radio">
        <span class="order">{{ transform(index) }}.</span>
        <span>{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { rules } from '../../util/listingType';

const defaults = { type: 'upper-latin' };

export default {
  props: {
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Boolean, default: null }
  },
  data() {
    return {
      values: [true, false],
      userAnswer: this.submission
    };
  },
  computed: {
    config: vm => ({ ...defaults, ...vm.options.trueFalse })
  },
  methods: {
    update() {
      this.$emit('update', { userAnswer: this.userAnswer });
    },
    isSelected(val) {
      return val === this.userAnswer;
    },
    transform(index) {
      return rules[this.config.type](index);
    }
  },
  watch: {
    retake(val) {
      if (val) {
        this.userAnswer = null;
        this.update();
      }
    },
    submission(val) {
      this.userAnswer = val;
    }
  }
};
</script>

<style lang="scss">
.assessment.true-false {
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
