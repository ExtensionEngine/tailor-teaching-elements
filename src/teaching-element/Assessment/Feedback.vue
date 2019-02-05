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
  imageMultipleChoice: { type: 'none' },
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
    title() {
      return this.type === 'TR' ? 'Suggested Solution' : 'Solution';
    },
    feedbacks() {
      if (includes(noFeedback, this.type)) return [{ content: this.correct }];

      if (!this.feedback) return [];
      return toArray(this.userAnswer)
        .reduce((acc, it, index) => {
          const feedback = this.getData(it, index);
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
      const assessmentType = camelCase(ASSESSMENT_TYPE[this.type]);
      const order = this.options[assessmentType];
      const orderType = order ? order.type : defaults[assessmentType].type;
      return rules[orderType](index);
    },
    getData(answer, index) {
      let answerIndex = isBoolean(answer) ? Number(!answer) : answer;
      if (answer.id) answerIndex = answer.id;
      const prefix = !(answer.data && answer.data.url)
        ? this.order(answerIndex)
        : `Image Selection ${index + 1}`;
      return { prefix, content: this.getFeedbackValue(answerIndex) };
    },
    getFeedbackValue(answerIndex) {
      return this.feedback[answerIndex] ||
        (includes(this.correct, answerIndex) ? 'Correct' : 'Incorrect');
    }
  }
};
</script>

<style lang="scss">
$img-container-dimension: 10rem;
$light-gray: #ccc;

.assessment .feedback {
  position: relative;
  border: 1px dotted $light-gray;

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
    border: 9px dotted $light-gray;
    border-color: $light-gray transparent transparent transparent;
  }

  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: -1px;
    left: 50%;
    border: 9px dotted $light-gray;
    border-color: white transparent transparent transparent;
  }

  .image-container {
    display: inline-block;
    position: relative;
    width: $img-container-dimension;
    height: $img-container-dimension;
    vertical-align: middle;
    margin-right: 1rem;
    border: 1px solid $light-gray;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
