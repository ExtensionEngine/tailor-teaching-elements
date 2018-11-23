<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <div class="answers">
      <div
        v-for="({ id, data }) in answers"
        :key="id"
        :class="{ selected: isSelected(id) }"
        @click="toggleAnswerSelection(id)"
        class="img-container">
        <img :src="data.url"/>
      </div>
    </div>
  </div>
</template>

<script>
import filter from 'lodash/filter';
import includes from 'lodash/includes';

export default {
  props: {
    answers: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    options: { type: Object, default: () => ({}) },
    retake: { type: Boolean, default: false }
  },
  data() {
    return { selectedAnswerIds: [] };
  },
  methods: {
    isSelected(id) {
      return includes(this.selectedAnswerIds, id);
    },
    update() {
      const selectedAnswers = filter(this.answers, ({ id }) => {
        return this.selectedAnswerIds.includes(id);
      });
      this.$emit('update', { userAnswer: selectedAnswers });
    },
    toggleAnswerSelection(id) {
      if (!this.selectedAnswerIds.includes(id)) return this.selectedAnswerIds.push(id);
      const index = this.selectedAnswerIds.indexOf(id);
      if (index !== -1) this.selectedAnswerIds.splice(index, 1);
    }
  },
  watch: {
    retake(val) {
      if (!val) return;
      this.selectedAnswerIds = [];
      this.update();
    },
    selectedAnswerIds() {
      this.update();
    }
  }
};
</script>

<style lang="scss" scoped>
.assessment.image-multiple-choice {
  .answers {
    text-align: center;

    .img-container {
      display: inline-block;
      margin: 1rem;
      padding: 5px;

      &.selected {
        padding: 0;
        border: 5px solid;
      }

      img {
        max-height: 20rem;
      }
    }
  }
}
</style>
