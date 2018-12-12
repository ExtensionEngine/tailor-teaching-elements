<template>
  <div :class="answerClasses(response.groupId === groupId)" class="response">
    <div>{{ response.answer }}</div>
    <button v-if="!disabled" @click="$emit('removeFromBox')" class="btn btn-close">
      <span :class="removeClass"></span>
    </button>
  </div>
</template>

<script>
import get from 'lodash/get';

export default {
  props: {
    response: { type: Object, required: true },
    groupId: { type: String, required: true },
    disabled: { type: Boolean, required: true },
    dragDrop: { type: Boolean, default: false }
  },
  computed: {
    removeClass() {
      return get(this.dragDrop, 'removeClass', 'mdi mdi-close');
    }
  },
  methods: {
    answerClasses(matchingGroup) {
      if (!this.disabled) return;
      return matchingGroup ? 'te-correct' : 'te-incorrect';
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
