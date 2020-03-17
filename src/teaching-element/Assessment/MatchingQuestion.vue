<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <div class="row titles">
      <div class="col-xs-6">{{ premiseHeading }}</div>
      <div class="col-xs-6">{{ responseHeading }}</div>
    </div>
    <div class="row">
      <div class="col-xs-6 drag-container">
        <draggable
          v-model="source"
          @start="onDragStart($event)"
          @end="onDragEnd"
          :options="dragOptions">
          <div
            v-for="({ dragged, value }, index) in source"
            :key="index"
            class="drag-spot">
            <span v-if="!dragged" class="item">{{ value }}</span>
          </div>
        </draggable>
      </div>
      <div class="col-xs-6">
        <draggable
          v-for="(item, index) in target"
          :key="index"
          @add="onAdd"
          :list="item.answers"
          :options="getOptions(item)"
          :class="[{ 'drop-area': isDragging }, answerClasses(item)]"
          class="drop-spot">
          <div class="item disabled">{{ item.value }}</div>
          <span v-show="item.answers[0]" class="item disabled">
            {{ draggable(item) }}
            <span v-if="!disabled" @click="remove(item)" class="mdi mdi-close">
            </span>
          </span>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import reduce from 'lodash/reduce';
import shuffle from 'lodash/shuffle';
import sortBy from 'lodash/sortBy';

export default {
  props: {
    correct: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
    headings: { type: Object, required: true },
    options: { type: Object, default: () => ({}) },
    premises: { type: Array, required: true },
    responses: { type: Array, required: true },
    retake: { type: Boolean, default: false },
    submission: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      dragOptions: {
        group: { name: `match-${this._uid}`, pull: 'clone', put: false, revertClone: true },
        sort: false
      },
      source: [],
      target: [],
      draggingItem: null
    };
  },
  computed: {
    premiseHeading() {
      return get(this.headings, 'premise', 'Premise');
    },
    responseHeading() {
      return get(this.headings, 'response', 'Response');
    },
    isDragging() {
      return isNumber(this.draggingItem);
    },
    isValid() {
      return this.source.every(({ dragged }) => dragged);
    },
    canPartiallyRetake() {
      return get(this.options.matchingQuestions, 'partialRetake', false);
    }
  },
  methods: {
    getOptions(item) {
      return {
        group: { name: `match-${this._uid}`, put: item.answers.length < 1 },
        sort: false,
        filter: '.disabled'
      };
    },
    onDragStart(e) {
      e.clone.className += ' cloned';
      this.draggingItem = e.oldIndex;
    },
    onDragEnd() {
      this.draggingItem = null;
    },
    onAdd() {
      this.source[this.draggingItem].dragged = true;
      this.update();
    },
    answerClasses({ key, answers }) {
      const { disabled, correct } = this;
      if (!disabled) return;
      const isCorrect = key === correct[answers[0].key];
      return isCorrect ? 'te-correct' : 'te-incorrect';
    },
    remove(item) {
      const premise = item.answers[0];
      premise.dragged = false;
      item.answers = [];
    },
    draggable(item) {
      return get(item.answers, '0.value', '');
    },
    partiallyRetake() {
      const { correct, target } = this;
      target.forEach(response => {
        const key = response.answers[0].key;
        if (correct[key] !== response.key) this.remove(response);
      });
    },
    update() {
      const reducer = (acc, { answers, key }) => {
        if (answers.length) acc[answers[0].key] = key;
        return acc;
      };
      this.$emit('update', { userAnswer: reduce(this.target, reducer, {}) });
    },
    initialize() {
      const { premises, responses } = this;
      this.source = shuffle(premises.map(it => ({ ...it, dragged: false })));
      this.target = sortBy(responses.map(it => ({ ...it, answers: [] })), 'key');
    },
    initializeSubmission(submission) {
      if (!submission) return;
      Object.keys(submission).forEach(key => {
        const source = this.source.find(it => it.key === key);
        const target = this.target.find(it => it.key === submission[key]);
        target.answers.push(source);
        source.dragged = true;
      });
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      if (this.canPartiallyRetake) return this.partiallyRetake();
      this.initialize();
      this.update();
    },
    isValid(val) {
      this.$emit('validateAnswer', { isValid: val });
    },
    submission: 'initializeSubmission'
  },
  created() {
    this.initialize();
    this.initializeSubmission(this.submission);
  },
  components: { Draggable }
};
</script>

<style lang="scss">
.assessment.matching-question {
  .drag-spot {
    margin-bottom: 10px;
    cursor: move;
  }

  .item {
    display: inline-block;
    padding: 10px 20px 10px 20px;
    background-color: #f5f5f5;
    border: 1px solid grey;
  }

  .dragged {
    visibility: hidden;
  }

  .drop-spot {
    margin-bottom: 10px;
    padding: 5px 0;
    border: 1px solid grey;

    .item {
      display: block;
      position: relative;
      margin: 5px 0;
      padding: 10px 35px 10px 20px;
      background-color: transparent;
      border: none;

      .mdi-close {
        position: absolute;
        top: 11px;
        right: 17px;
        cursor: pointer;
        pointer-events: all;
      }
    }
  }

  .sortable-drag {
    display: inline-block;

    .item {
      background-color: white;
    }
  }

  .cloned .item, .drag-container .sortable-ghost .item {
    border: 1px dashed #ccc;
  }

  .drop-area {
    background-color: #f4eef3;
    border: 1px dashed #72246c;
  }
}
</style>
