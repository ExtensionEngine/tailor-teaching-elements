<template>
  <div class="te-image">
    <img :src="url">
  </div>
</template>

<script>
export default {
  name: 'te-image',
  props: {
    url: { type: String, required: true }
  }
};
</script>

<style lang="scss">
.te-image img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>
