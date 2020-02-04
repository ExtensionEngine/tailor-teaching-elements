<template>
  <div class="question-container">
    <h4>Question</h4>
    <div class="question">
      <div class="row">
        <primitive
          v-for="{ id, data, type } in parsedQuestion"
          :key="id"
          v-bind="data"
          :type="type" />
      </div>
    </div>
  </div>
</template>

<script>
import Primitive from '../Primitive.vue';

function buildBlankReplacer() {
  let counter = 1;
  return () => `<span class='blank'>
                  <span>${counter++}</span>
                  <span class="blank-line"></span>
                </span>`;
}

export default {
  name: 'te-question',
  props: {
    assessmentType: { type: String, required: true },
    question: { type: Array, required: true }
  },
  computed: {
    parsedQuestion() {
      if (this.assessmentType !== 'FB') return this.question;
      const blankReplacer = buildBlankReplacer();
      return this.question.map(({ id, data, type }) => {
        if (!type.includes('HTML')) return { id, data, type };
        const content = data.content.replace(/@blank/g, blankReplacer);
        return { id, data: { ...data, content }, type };
      });
    }
  },
  components: { Primitive }
};
</script>

<style lang="scss">
.assessment .question-container {
  width: 100%;
  text-align: left;

  .question {
    padding: 10px;
    font-size: 22px;
    text-align: center;

    .blank {
      white-space: initial;
    }
  }
}
</style>
