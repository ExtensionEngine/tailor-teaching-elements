<template>
  <div class="hint">
    <button @click="show = !show" class="btn btn-hint">
      <span :class="`mdi mdi-chevron-${icon}`"></span>
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
  },
  computed: {
    icon() {
      return this.show ? 'up' : 'down';
    }
  }
};
</script>

<style lang="scss">
.assessment .hint-content {
  margin: 10px 0;
}
</style>
