<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <div class="row answers">
      <draggable
        v-model="answersCollection"
        :options="draggableOptions"
        @start="dragging = true"
        @end="dragging = false"
        class="col-xs-12">
        <span
          v-for="{ id, answer } in answersCollection"
          :key="id"
          class="answer">
          {{ answer }}
        </span>
      </draggable>
    </div>
    <div class="row groups">
      <group
        v-for="group in groupsCollection"
        v-model="userAnswer[group.id]"
        :key="group.id"
        :group="group"
        :dragging="dragging"
        :disabled="disabled"
        :dragDrop="options.dragDrop"
        :draggableOptions="draggableOptions"
        :class="`col-xs-${colWidth}`"
        @removeFromBox="removeFromBox"
        class="group-container">
      </group>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import findKey from 'lodash/findKey';
import get from 'lodash/get';
import Group from './Group.vue';
import includes from 'lodash/includes';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import shuffle from 'lodash/shuffle';

const formatAnswers = (answers, correct) => {
  const grouped = map(answers, (answer, id) => {
    let groupId = findKey(correct, it => includes(it, id));
    return { id, answer, groupId };
  });
  return shuffle(grouped);
};

const DEFAULT_GROUPS_PER_ROW = 3;

export default {
  props: {
    answers: { type: Object, required: true },
    correct: { type: Object, required: true },
    disabled: { type: Boolean, default: false },
    groups: { type: Object, required: true },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false },
    submission: { type: Object, default: () => ({}) }
  },
  data() {
    const { dragDrop } = this.options;

    return {
      dragging: false,
      groupsPerRow: get(dragDrop, 'groupsPerRow', DEFAULT_GROUPS_PER_ROW),
      userAnswer: mapValues(this.groups, () => []),
      answersCollection: formatAnswers(this.answers, this.correct)
    };
  },
  computed: {
    colWidth() {
      return 12 / this.groupsPerRow;
    },
    draggableOptions() {
      return {
        animation: 150,
        disabled: this.disabled,
        chosenClass: 'chosen',
        dragClass: 'drag',
        ghostClass: 'ghost',
        group: 'tesDragDrop'
      };
    },
    groupsCollection() {
      return map(this.groups, (group, id) => ({ id, group }));
    },
    isBoxFull() {
      return this.answersCollection.length === 0;
    }
  },
  methods: {
    removeFromBox({ response }) {
      if (this.disabled) return;
      const { groupId: id } = response;
      this.userAnswer[id] = this.userAnswer[id].filter(a => a.id !== response.id);
      this.answersCollection.push(response);
    },
    update(userAnswer) {
      this.$emit('update', { userAnswer });
    },
    initializeSubmission(submission) {
      if (!submission) return;
      Object.keys(submission).forEach(groupId => {
        submission[groupId].forEach(answerId => {
          const findAnswer = it => it.id === answerId;
          const answer = this.answersCollection.find(findAnswer);
          const answerIndex = this.answersCollection.findIndex(findAnswer);
          this.userAnswer[groupId].push(answer);
          this.answersCollection.splice(answerIndex, 1);
        });
      });
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.answersCollection = formatAnswers(this.answers, this.correct);
      this.userAnswer = mapValues(this.groups, () => []);
    },
    submission: {
      handler: 'initializeSubmission',
      immediate: true
    },
    userAnswer: {
      handler() {
        const { isBoxFull, update, userAnswer } = this;
        if (!isBoxFull) return;
        update(mapValues(userAnswer, answer => map(answer, 'id')));
      },
      deep: true
    },
    isBoxFull(val, oldVal) {
      if (!val && oldVal) this.update(null);
    }
  },
  components: {
    Draggable,
    Group
  }
};
</script>

<style lang="scss">
.answers {
  min-height: 100px;

  .answer {
    cursor: default;
    display: inline-block;
    padding: 10px 20px;
    margin: 0 10px 10px 0;
  }
}

.group-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ghost {
  opacity: .5;
}
</style>
