<template>
  <div class="te-embed">
    <iframe
      :src="url"
      :style="{ height: `${height}px` }"
      class="content"
      frameborder="0">
    </iframe>
    <div v-show="showOverlay" @click="showOverlay = false" class="interactive"></div>
  </div>
</template>

<script>
export default {
  name: 'te-embed',
  props: {
    height: { type: [Number, String], default: 600 },
    url: { type: String, required: true }
  },
  data() {
    return { showOverlay: true };
  }
};
</script>

<style lang="scss">
.te-embed {
  position: relative;
  overflow: auto;

  .content {
    width: 100%;
  }
}

.interactive {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
