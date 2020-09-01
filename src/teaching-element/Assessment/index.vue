<template>
  <div class="assessment-container">
    <div :class="assessmentClasses" class="assessment">
      <div v-if="isFormative" class="formative-notification">
        <span>
          Knowledge check
        </span>
      </div>
      <div class="type-title">
        <span>{{ typeInfo.title }}</span>
      </div>
      <div class="exam-order">
        <span>Question {{ position }} of {{ count }}</span>
      </div>
      <question :question="parsedQuestion" :assessment-type="type" />
      <div class="type-helper-text"><i>{{ typeInfo.helperText }}</i></div>
      <component
        :is="component"
        @validateAnswer="validateAnswer"
        @update="update"
        v-bind="$attrs"
        :correct="correct"
        :disabled="isSaved"
        :options="options"
        :retake="retake"
        :is-reflection="isReflection"
        :submission="submission"
        :question="parsedQuestion">
        <template v-for="(_, slot) in $slots">
          <template :slot="slot">
            <slot :name="slot"></slot>
          </template>
        </template>
      </component>
      <hint v-if="showHint" :content="hint">
        <template v-for="(_, slot) in $slots">
          <template :slot="slot">
            <slot :name="slot"></slot>
          </template>
        </template>
      </hint>
      <div class="assessment-footer clearfix">
        <div v-if="showCorrect" :class="answerStatus.type" class="answer-status">
          <slot name="assessmentAnswerIcon">
            <span></span>
          </slot>
          <span class="answer-status">{{ answerStatus.note }}</span>
        </div>
        <controls
          @reset="reset"
          @submit="submit"
          :retake="canRetake"
          :disabled="!isEditing || !isValidAnswer" />
      </div>
      <feedback
        v-if="isFeedbackVisible"
        :type="type"
        :correct="correct"
        :feedback="feedback"
        :user-answer="userAnswer"
        :status="answerStatus"
        :is-randomizable="isRandomizable"
        :options="options" />
    </div>
  </div>
</template>

<script>
import { ASSESSMENT_TYPE, subTypeInfo } from '@/types';
import buildBlankReplacer from '@/util/buildBlankReplacer';
import Controls from './Controls.vue';
import DragDrop from './DragDrop.vue';
import Feedback from './Feedback.vue';
import FillBlank from './FillBlank.vue';
import Hint from './Hint.vue';
import MatchingQuestion from './MatchingQuestion.vue';
import MultipleChoice from './MultipleChoice.vue';
import NumericalResponse from './NumericalResponse.vue';
import Question from './Question.vue';
import SingleChoice from './SingleChoice.vue';
import strategies from '@/util/strategies';
import TextResponse from './TextResponse.vue';
import TrueFalse from './TrueFalse.vue';

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

const RANDOMIZABLE_TYPES = ['MC', 'SC'];
const CONTEXT_TYPE = {
  FORMATIVE_ASSESSMENT: 'formative',
  GOAL: 'goal'
};

export default {
  name: 'te-assessment',
  inheritAttrs: false,
  props: {
    id: { type: Number, required: true },
    correct: { type: [Number, Array, Object, String, Boolean], default: null },
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
      retake: false,
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
    isRandomizable() {
      return RANDOMIZABLE_TYPES.includes(this.type);
    },
    parsedUserAnswer() {
      const { hasUserAnswer, userAnswer, isRandomizable } = this;
      if (!hasUserAnswer || !isRandomizable) return userAnswer;
      if (!Array.isArray(userAnswer)) return userAnswer.key;
      return userAnswer.map(({ key }) => key);
    },
    isFeedbackVisible() {
      const { isFormative, typeInfo, options, isSaved } = this;
      if (!isFormative || !typeInfo.feedback) return false;
      return options.showFeedback || isSaved;
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
      const { id, parsedUserAnswer: answer, isReflection, isCorrect: correct } = this;
      return { data: { id, answer }, isReflection, correct };
    },
    parsedQuestion() {
      if (this.type !== 'FB') return this.question;
      const counter = { val: 0 };
      const blankReplacer = buildBlankReplacer(counter);
      return this.question.map(({ id, data, type }) => {
        if (!type.includes('HTML')) return { id, data, type };
        const prevTotal = counter.val;
        const content = data.content.replace(/@blank/g, blankReplacer);
        const count = counter.val - prevTotal;
        return { id, count, data: { ...data, content }, type };
      });
    }
  },
  methods: {
    checkAnswer() {
      if (this.isReflection) return Object.assign(this, { isCorrect: false });
      const strategy = strategies[this.type] || strategies.default;
      this.isCorrect = strategy(this.parsedUserAnswer, this.correct);
    },
    reset() {
      Object.assign(this, { isSaved: false, retake: true, userAnswer: null });
    },
    update({ userAnswer }) {
      Object.assign(this, { userAnswer, retake: false });
    },
    validateAnswer({ isValid }) {
      this.isValidAnswer = isValid;
    },
    submit() {
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
