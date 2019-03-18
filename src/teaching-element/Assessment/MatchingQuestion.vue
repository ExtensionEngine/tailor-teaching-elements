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
          :options="dragOptions"
          @start="onDragStart($event)"
          @end="onDragEnd">
          <div
            v-for="({ dragged, value }, index) in source"
            :key="index"
            class="drag-spot">
            <span :class="{ dragged }" class="item">{{ value }}</span>
          </div>
        </draggable>
      </div>
      <div class="col-xs-6">
        <draggable
          v-for="(item, index) in target"
          :key="index"
          :list="item.answers"
          :options="getOptions(item)"
          :class="[{ 'drop-area': isDragging }, answerClasses(item)]"
          @add="onAdd"
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
    answerClasses(item) {
      if (!this.disabled) return;
      return item.key === this.correct[item.answers[0].key]
        ? 'te-correct'
        : 'te-incorrect';
    },
    remove(item) {
      let premise = item.answers[0];
      premise.dragged = false;
      item.answers = [];
    },
    draggable(item) {
      return get(item.answers, '0.value', '');
    },
    update() {
      const reducer = (acc, it) => {
        if (it.answers.length) acc[it.answers[0].key] = it.key;
        return acc;
      };
      this.$emit('update', { userAnswer: reduce(this.target, reducer, {}) });
    },
    initialize() {
      let { premises, responses } = this;
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
  created() {
    this.initialize();
    this.initializeSubmission(this.submission);
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.initialize();
      this.update();
    },
    isValid(val) {
      this.$emit('validateAnswer', { isValid: val });
    },
    submission: 'initializeSubmission'
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

  .drop-spot {
    margin-bottom: 10px;
    padding: 5px 0;
    border: 1px solid grey;

    .item {
      position: relative;
      display: block;
      padding: 10px 35px 10px 20px;
      margin: 5px 0;
      background-color: transparent;
      border: none;

      .mdi-close {
        position: absolute;
        top: 11px;
        right: 17px;
        pointer-events: all;
        cursor: pointer;
      }
    }
  }

  .item {
    display: inline-block;
    padding: 10px 20px 10px 20px;
    border: 1px solid grey;
    background-color: #f5f5f5;
  }

  .dragged {
     visibility: hidden;
  }

  .sortable-drag {
    display: inline-block;

    .item {
      background-color: white;
    }
  }

  .drag-container .sortable-ghost .item, .cloned .item {
    border: 1px dashed #cccccc;
  }

  .drop-area {
    background-color: #f4eef3;
    border: 1px dashed #72246c;
  }
}
</style>
