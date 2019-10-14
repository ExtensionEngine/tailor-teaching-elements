<template>
  <div class="assessment-container">
    <div :class="assessmentClasses" class="assessment">
      <div v-if="isFormative" class="formative-notification">
        <span>
          Knowledge check
        </span>
      </div>
      <div class="type-helper-text"><i>{{ typeInfo.helperText }}</i></div>
      <div class="type-title">
        <span>{{ typeInfo.title }}</span>
      </div>
      <div class="exam-order">
        <span>Question {{ position }} of {{ count }}</span>
      </div>
      <question :question="question" :assessmentType="type"/>
      <component
        :is="component"
        v-bind="$attrs"
        :correct="correct"
        :disabled="isSaved"
        :options="options"
        :retake="retake"
        :submission="submission"
        :isSubmitting="isSubmitting"
        @matchAnswers="matchAnswers"
        @validateAnswer="validateAnswer"
        @update="update"/>
      <hint v-if="showHint" :content="hint"/>
      <div class="assessment-footer clearfix">
        <div v-if="showCorrect" :class="answerStatus.type" class="answer-status">
          <span></span>
          {{ answerStatus.note }}
        </div>
        <controls
          :retake="canRetake"
          :disabled="!isEditing || !isValidAnswer"
          @reset="reset"
          @submit="submit">
        </controls>
      </div>
      <feedback
        v-if="hasFeedback"
        :type="type"
        :correct="correct"
        :feedback="feedback"
        :sortedResponse="sortedResponse"
        :userAnswer="userAnswer"
        :options="options">
      </feedback>
    </div>
  </div>
</template>

<script>
import Controls from './Controls.vue';
import DragDrop from './DragDrop.vue';
import Feedback from './Feedback.vue';
import FillBlank from './FillBlank.vue';
import Hint from './Hint.vue';
import isArray from 'lodash/isArray';
import MultipleChoice from './MultipleChoice.vue';
import MatchingQuestion from './MatchingQuestion.vue';
import NumericalResponse from './NumericalResponse.vue';
import Question from './Question.vue';
import SingleChoice from './SingleChoice.vue';
import sortBy from 'lodash/sortBy';
import strategies from '@/util/strategies';
import TextResponse from './TextResponse.vue';
import TrueFalse from './TrueFalse.vue';
import { subTypeInfo, ASSESSMENT_TYPE } from '@/types';

const answer = {
  correct: {
    type: 'correct',
    note: 'Correct answer'
  },
  incorrect: {
    type: 'incorrect',
    note: 'Incorrect answer'
  }
};

const toArray = arg => isArray(arg) ? arg : [arg];

const CONTEXT_TYPE = {
  FORMATIVE_ASSESSMENT: 'formative',
  GOAL: 'goal'
};

export default {
  name: 'te-assessment',
  inheritAttrs: false,
  props: {
    id: { type: Number, required: true },
    correct: { type: [Number, Array, Object, String, Boolean], default: false },
    count: { type: Number, default: 0 },
    feedback: { type: Object, default: () => ({}) },
    hint: { type: String, default: '' },
    options: { type: Object, default: () => ({}) },
    position: { type: Number, default: 0 },
    question: { type: Array, required: true },
    submission: { type: [Array, Boolean, Number, Object, String], default: null },
    isReflection: { type: Boolean, default: false },
    type: { type: String, required: true }
  },
  data() {
    return {
      userAnswer: null,
      sortedResponse: [],
      retake: false,
      isSubmitting: false,
      isSaved: false,
      isCorrect: false,
      // TODO: Rename assessmentType prop to context
      context: this.options.assessmentType,
      isValidAnswer: true
    };
  },
  computed: {
    component(type) {
      return ASSESSMENT_TYPE[this.type];
    },
    answerStatus() {
      return this.isCorrect ? answer.correct : answer.incorrect;
    },
    assessmentClasses() {
      return [this.typeInfo.class, this.context, this.isSaved ? 'saved' : ''];
    },
    hasCorrect() {
      return !(this.type === 'TR' || this.isReflection);
    },
    showCorrect() {
      const { context, hasCorrect, isSaved } = this;
      return hasCorrect && context !== CONTEXT_TYPE.GOAL && isSaved;
    },
    typeInfo() {
      return subTypeInfo[this.type] || {};
    },
    isEditing() {
      return this.hasUserAnswer && !this.isSaved;
    },
    showHint() {
      const { hint, options, isSaved, isCorrect } = this;
      return hint && (!options.hintOnSubmit || (isSaved && !isCorrect));
    },
    hasUserAnswer() {
      return this.userAnswer !== null;
    },
    hasFeedback() {
      return this.isFormative && this.typeInfo.feedback && this.isSaved;
    },
    isFormative() {
      return this.context === CONTEXT_TYPE.FORMATIVE_ASSESSMENT;
    },
    canRetake() {
      const { isFormative, isCorrect, typeInfo, isSaved } = this;
      const { allowRetake = true } = typeInfo;
      return allowRetake && isFormative && isSaved && !isCorrect;
    },
    submissionPayload() {
      const { id, userAnswer: answer, isReflection, isCorrect: correct } = this;
      return { data: { id, answer }, isReflection, correct };
    }
  },
  methods: {
    checkAnswer() {
      if (this.isReflection) return Object.assign(this, { isCorrect: false });
      const strategy = strategies[this.type] || strategies.default;
      this.isCorrect = strategy(this.userAnswer, this.correct);
    },
    reset() {
      Object.assign(this, {
        isSaved: false,
        retake: true,
        userAnswer: null,
        sortedResponse: []
      });
    },
    update({ userAnswer }) {
      Object.assign(this, { userAnswer, retake: false });
    },
    validateAnswer({ isValid }) {
      this.isValidAnswer = isValid;
    },
    matchAnswers(choices) {
      if (!this.hasFeedback) return;
      toArray(this.userAnswer).forEach(answer => {
        this.sortedResponse.push({
          answer: answer,
          index: choices.findIndex(c => { return (c.key === answer); })
        });
      });
      Object.assign(this, {
        sortedResponse: sortBy(this.sortedResponse, ['index']),
        isSubmitting: false
      });
    },
    submit() {
      this.isSubmitting = true;
      this.checkAnswer();
      this.$emit('assessmentSubmit', this.submissionPayload);
      Object.assign(this, { retake: this.canRetake, isSaved: true });
    }
  },
  components: {
    Controls,
    DragDrop,
    Feedback,
    FillBlank,
    Hint,
    MultipleChoice,
    MatchingQuestion,
    NumericalResponse,
    Question,
    SingleChoice,
    TextResponse,
    TrueFalse
  }
};
</script>

<style lang="scss">
.assessment {
  position: relative;
  margin: 20px 30px 40px 30px;
  overflow: hidden;

  &:not(.formative) {
    .formative-notification {
      display: none;
    }
  }

  &:not(.topic) {
    .type-title {
      display: none;
    }
  }

  &:not(.goal) {
    .exam-order {
      display: none;
    }
  }

  .assessment-footer {
    margin-top: 20px;
    padding: 10px 20px;

    .answer-status {
      width: 50%;
      float: left;
    }
  }
}
</style>
