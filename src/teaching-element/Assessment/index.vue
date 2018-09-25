<template>
  <div class="assessment-container">
    <div :class="assessmentClasses" class="assessment">
      <div v-if="context === 'formative'" class="formative-notification">
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
      <question :question="question" :assessmentType="type"></question>
      <component
        :is="component"
        v-bind="$attrs"
        :correct="correct"
        :disabled="isSaved"
        :options="options"
        :retake="retake"
        @validateAnswer="validateAnswer"
        @update="update">
      </component>
      <hint v-if="hint && showHint" :content="hint"></hint>
      <div class="assessment-footer clearfix">
        <div v-if="showCorrect" :class="answerStatus.type" class="answer-status">
          <span></span>
          {{ answerStatus.note }}
        </div>
        <controls
          :retake="canRetake"
          :disabled="!isEditing || !validAnswerFormat"
          @reset="reset"
          @submit="submit">
        </controls>
      </div>
      <feedback
        v-if="hasFeedback"
        :type="type"
        :correct="correct"
        :feedback="feedback"
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
import isUndefined from 'lodash/isUndefined';
import MultipleChoice from './MultipleChoice.vue';
import MatchingQuestion from './MatchingQuestion.vue';
import NumericalResponse from './NumericalResponse.vue';
import Question from './Question.vue';
import SingleChoice from './SingleChoice.vue';
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

const CONTEXT_TYPE = {
  FORMATIVE_ASSESSMENT: 'formative',
  GOAL: 'goal'
};

export default {
  name: 'te-assessment',
  inheritAttrs: false,
  props: {
    id: { type: Number, required: true },
    correct: { type: [Number, Array, Object, String, Boolean], required: true },
    count: { type: Number, default: 0 },
    feedback: { type: Object, default: () => ({}) },
    hint: { type: String, default: '' },
    options: { type: Object, default: () => ({}) },
    position: { type: Number, default: 0 },
    question: { type: Array, required: true },
    type: { type: String, required: true }
  },
  data() {
    return {
      userAnswer: null,
      retake: false,
      isSaved: false,
      isCorrect: false,
      // TODO: Rename assessmentType prop to context
      context: this.options.assessmentType,
      validAnswerFormat: true
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
    showCorrect() {
      return this.context !== CONTEXT_TYPE.GOAL &&
        this.type !== 'TR' &&
        this.isSaved;
    },
    typeInfo() {
      return subTypeInfo[this.type] || {};
    },
    isEditing() {
      return this.hasUserAnswer && !this.isSaved;
    },
    showHint() {
      return !this.options.hintOnSubmit || (this.isSaved && !this.isCorrect);
    },
    hasUserAnswer() {
      return this.userAnswer !== null;
    },
    hasFeedback() {
      return this.context === CONTEXT_TYPE.FORMATIVE_ASSESSMENT &&
        this.typeInfo.feedback &&
        this.isSaved;
    },
    canRetake() {
      const { allowRetake } = this.typeInfo;
      const componentCanRetake = isUndefined(allowRetake) || allowRetake;
      const isFormative = this.context === 'formative';
      return isFormative && componentCanRetake && !this.isCorrect && this.isSaved;
    }
  },
  methods: {
    checkAnswer() {
      const strategy = strategies[this.type] || strategies.default;
      this.isCorrect = strategy(this.userAnswer, this.correct);
    },
    reset() {
      this.isSaved = false;
      this.retake = true;
      this.userAnswer = null;
    },
    update(data) {
      this.retake = false;
      this.userAnswer = data.userAnswer;
    },
    validateAnswer({ isAnswerValid }) {
      this.validAnswerFormat = isAnswerValid;
    },
    submit() {
      this.checkAnswer();
      this.retake = this.canRetake;
      const data = { id: this.id, answer: this.userAnswer };
      this.$emit('assessmentSubmit', { data, correct: this.isCorrect });
      this.isSaved = true;
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
