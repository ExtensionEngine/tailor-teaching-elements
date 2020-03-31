<template>
  <div class="te-file">
    <button
      v-if="url"
      @click="download"
      class="btn btn-primary download-button">
      <slot name="fileDownloadIcon">
        <span class="mdi mdi-file-download download-icon"></span>
      </slot>
      <span class="file-name">{{ label || name }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'te-file',
  props: {
    url: { type: String, default: null },
    name: { type: String, default: null },
    label: { type: String, default: null }
  },
  methods: {
    download() {
      const { name, url } = this;
      const a = document.createElement('a');
      a.target = '_blank';
      a.download = name;
      a.href = url;
      a.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.download-button {
  display: flex;
  align-items: center;
  text-transform: none;
}

.download-icon {
  padding-right: 5px;
  font-size: 20px;
  line-height: 20px;
}
</style>
