<template>
  <div class="question-container">
    <h4>Question</h4>
    <div class="question">
      <div class="row">
        <primitive
          v-for="{ id, data, type } in question"
          :key="id"
          v-bind="data"
          :assessmentType="assessmentType"
          :type="type">
        </primitive>
      </div>
    </div>
  </div>
</template>

<script>
import Primitive from '../Primitive.vue';

export default {
  name: 'te-question',
  props: {
    assessmentType: { type: String, required: true },
    question: { type: Array, required: true }
  },
  components: { Primitive }
};
</script>

<style lang="scss">
.assessment .question-container {
  width: 100%;
  text-align: left;

  .question {
    font-size: 22px;
    text-align: center;
    padding: 10px;
  }
}
</style>
