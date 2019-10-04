<template>
  <div v-if="show" class="ql-container feedback">
    <div class="form-label">{{ title }}</div>
    <div
      v-for="({ prefix, content }, index) in feedbacks"
      :key="index"
      class="ql-editor feedback-content">
      <span v-if="prefix" class="prefix">{{ prefix }}.</span>
      <span v-html="content" class="content-row"></span>
    </div>
  </div>
</template>

<script>
import { ASSESSMENT_TYPE } from '../../types';
import camelCase from 'lodash/camelCase';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import { rules } from '../../util/listingType';

const toArray = arg => isArray(arg) ? arg : [arg];

const noFeedback = ['TR', 'NR'];
const defaults = {
  multipleChoice: { type: 'upper-latin' },
  numericalResponse: { type: 'none' },
  singleChoice: { type: 'upper-latin' },
  textResponse: { type: 'none' },
  trueFalse: { type: 'upper-latin' }
};

export default {
  props: {
    correct: { type: [Number, Array, Object, String, Boolean], required: true },
    feedback: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => ({}) },
    type: { type: String, required: true },
    userAnswer: { type: [Number, String, Array, Object, Boolean], required: true }
  },
  computed: {
    assessmentType: vm => camelCase(ASSESSMENT_TYPE[vm.type]),
    config: vm => ({
      ...defaults[vm.assessmentType],
      ...vm.options[vm.assessmentType]
    }),
    title() {
      return this.type === 'TR' ? 'Suggested Solution' : 'Solution';
    },
    feedbacks() {
      if (includes(noFeedback, this.type)) return [{ content: this.correct }];

      if (!this.feedback) return [];
      return toArray(this.userAnswer)
        .reduce((acc, it) => {
          const feedback = this.getData(it);
          if (feedback.content) acc.push(feedback);
          return acc;
        }, []);
    },
    show() {
      return !!this.feedbacks.length;
    }
  },
  methods: {
    order(index) {
      return rules[this.config.type](index);
    },
    getData(answer) {
      answer = isBoolean(answer) ? Number(!answer) : answer;
      const prefix = this.order(answer);
      return { prefix, content: this.feedback[answer] };
    }
  }
};
</script>

<style lang="scss">
.assessment .feedback {
  position:relative;
  border: 1px dotted #ccc;

  .form-label {
    color: #000;
    margin-top: 10px;
  }

  .form-label, .feedback-content {
    padding-left: 15px;
    margin-bottom: 10px;
  }

  .content-row {
    white-space: pre-wrap;
  }

  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    border: 9px dotted #ccc;
    border-color: #ccc transparent transparent transparent;
    top: 0;
    left: 50%;
  }

  &:after {
    content: "";
    display: inline-block;
    position: absolute;
    border: 9px dotted #ccc;
    border-color:  white transparent transparent transparent;
    top: -1px;
    left: 50%;
  }
}
</style>
