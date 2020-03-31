<template>
  <div class="hint">
    <button @click="show = !show" class="btn btn-hint">
      <slot v-if="show" name="hintCloseIcon">
        <span class="mdi mdi-chevron-up"></span>
      </slot>
      <slot v-else name="hintShowIcon">
        <span class="mdi mdi-chevron-down"></span>
      </slot>
      Hint
    </button>
    <p v-show="show" class="hint-content">{{ content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: String, required: true }
  },
  data() {
    return { show: false };
  }
};
</script>

<style lang="scss">
.assessment .hint-content {
  margin: 10px 0;
}
</style>
