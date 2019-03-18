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
      <div
        v-for="{ id, group } in groupsCollection"
        :key="id"
        :class="`col-xs-${colWidth}`"
        class="group-container">
        <h3 class="group-title">{{ group }}</h3>
        <div class="group">
          <draggable
            v-model="userAnswer[id]"
            :class="{ drop: dragging }"
            :options="draggableOptions"
            element="div"
            class="box">
            <div
              v-for="response in userAnswer[id]"
              :key="response.id"
              :class="answerClasses(id, response.id)"
              class="response">
              {{ response.answer }}
              <button
                v-if="!disabled"
                @click="removeFromBox(id, response)"
                class="btn btn-close">
                <span :class="removeClass"></span>
              </button>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import get from 'lodash/get';
import includes from 'lodash/includes';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import shuffle from 'lodash/shuffle';

const formatAnswers = answers => {
  const grouped = map(answers, (answer, id) => ({ id, answer }));
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
      answersCollection: formatAnswers(this.answers)
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
        group: `tesDragDrop-${this._uid}`
      };
    },
    groupsCollection() {
      return map(this.groups, (group, id) => ({ id, group }));
    },
    isBoxFull() {
      return this.answersCollection.length === 0;
    },
    removeClass() {
      return get(this.options.dragDrop, 'removeClass', 'mdi mdi-close');
    }
  },
  methods: {
    getResponses(id) {
      return this.userAnswer[id];
    },
    answerClasses(groupId, answerId) {
      const { correct, disabled } = this;
      if (!disabled) return;
      return includes(correct[groupId], answerId)
        ? 'te-correct'
        : 'te-incorrect';
    },
    removeFromBox(id, answer) {
      if (this.disabled) return;
      // Remove from box and add to answers array
      this.userAnswer[id] = this.userAnswer[id].filter(a => a.id !== answer.id);
      this.answersCollection.push(answer);
    },
    update(userAnswer) {
      this.$emit('update', { userAnswer });
    },
    initializeSubmission(submission) {
      if (!submission) return;

      this.answersCollection = formatAnswers(this.answers);
      this.userAnswer = mapValues(this.groups, () => []);
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
      this.answersCollection = formatAnswers(this.answers);
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
    Draggable
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

.group > .box {
  .ghost, .response {
    cursor: default;
    display: inline-block;
    padding: 5px 20px;
    margin: 5px;
  }

  .response {
    position: relative;

    .btn-close {
      position: absolute;
      right: 0;
      top: 0;
      margin: 0;
      padding: 0;
      font-size: 12px;
      background-color: transparent;
      outline: none;
      box-shadow: none;

      &:active {
        box-shadow: none;
      }
    }
  }
}

.ghost {
  opacity: .5;
}

.row.groups {
 display: flex;
 flex-wrap: wrap;

  .group-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .group-title {
      display: flex;
      flex-grow: 2;
      flex-direction: column;
      justify-content: center;
    }

    .group {
      height: 250px;

      .box {
        height: 100%;
        overflow: scroll;
      }
    }
  }
}
</style>
