<template>
  <div>
    <h3 class="group-title">{{ group.group }}</h3>
    <div class="group">
      <draggable
        v-model="localAnswers"
        :class="{ drop: dragging }"
        :options="draggableOptions"
        element="div"
        class="box">
        <response
          v-for="response in localAnswers"
          :response="response"
          :key="response.id"
          :groupId="group.id"
          :disabled="disabled"
          :dragDrop="dragDrop"
          @removeFromBox="removeFromBox(response)">
        </response>
      </draggable>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import Response from './Response.vue';

export default {
  model: {
    prop: 'answers',
    event: 'change'
  },
  props: {
    group: { type: Object, required: true },
    dragging: { type: Boolean, required: true },
    disabled: { type: Boolean, required: true },
    dragDrop: { type: Boolean, default: false },
    draggableOptions: { type: Object, required: true },
    answers: { type: Array, default: () => [] }
  },
  computed: {
    localAnswers: {
      get() {
        return this.answers;
      },
      set(answers) {
        this.$emit('change', answers);
      }
    }
  },
  methods: {
    removeFromBox(response) {
      this.localAnswers = this.localAnswers.filter(({ id }) => id !== response.id);
      this.$emit('removeFromBox', { response });
    }
  },
  components: {
    Draggable,
    Response
  }
};
</script>

<style lang="scss">
.ghost {
  opacity: .5;
}

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
</style>
