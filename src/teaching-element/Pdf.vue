<template>
  <div class="te-pdf">
    <embed :src="url" type="application/pdf">
  </div>
</template>

<script>
export default {
  name: 'te-pdf',
  props: {
    url: { type: String, required: true }
  }
};
</script>

<style lang="scss" scoped>
.te-pdf embed {
  display: block;
  width: 100%;
  height: 600px;
  margin: 0 auto;
}
</style>
