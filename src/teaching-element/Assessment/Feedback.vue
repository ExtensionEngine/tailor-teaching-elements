<template>
  <div v-if="show" class="ql-container feedback">
    <div class="form-label">{{ title }}</div>
    <div
      v-for="({ prefix, content }, index) in feedbacks"
      :key="index"
      class="ql-editor feedback-content">
      <span v-if="prefix" class="prefix">{{ prefix }}.</span>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span class="content-row" v-html="content"></span>
    </div>
  </div>
</template>

<script>
import { TYPES as LISTING_TYPES, rules } from '@/util/listingType';
import { ASSESSMENT_TYPE } from '@/types';
import camelCase from 'lodash/camelCase';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';

const toArray = arg => isArray(arg) ? arg : [arg];

const noFeedback = ['TR', 'NR'];
const defaults = {
  multipleChoice: { type: LISTING_TYPES.LATIN.UPPER },
  numericalResponse: { type: LISTING_TYPES.NONE },
  singleChoice: { type: LISTING_TYPES.LATIN.UPPER },
  textResponse: { type: LISTING_TYPES.NONE },
  trueFalse: { type: LISTING_TYPES.LATIN.UPPER }
};

export default {
  props: {
    correct: { type: [Number, Array, Object, String, Boolean], required: true },
    feedback: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => ({}) },
    type: { type: String, required: true },
    userAnswer: { type: [Number, String, Array, Object, Boolean], required: true },
    isRandomizable: { type: Boolean, required: true }
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
    getPrefix(answer) {
      const index = this.isRandomizable ? answer.index : answer;
      return rules[this.config.type](index);
    },
    getContent(answer) {
      const index = this.isRandomizable ? answer.key : answer;
      return this.feedback[index];
    },
    getData(answer) {
      answer = isBoolean(answer) ? Number(!answer) : answer;
      const prefix = this.getPrefix(answer);
      const content = this.getContent(answer);
      return { prefix, content };
    }
  }
};
</script>

<style lang="scss">
.assessment .feedback {
  position: relative;
  border: 1px dotted #ccc;

  .form-label {
    margin-top: 10px;
    color: #000;
  }

  .form-label, .feedback-content {
    margin-bottom: 10px;
    padding-left: 15px;
  }

  .content-row {
    white-space: pre-wrap;
  }

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 50%;
    border: 9px dotted #ccc;
    border-color: #ccc transparent transparent transparent;
  }

  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: -1px;
    left: 50%;
    border: 9px dotted #ccc;
    border-color: white transparent transparent transparent;
  }
}
</style>
