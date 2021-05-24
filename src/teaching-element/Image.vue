<template>
  <figure class="te-image">
    <img :src="url" :alt="alt" :title="alt">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <figcaption v-if="caption" v-html="caption"></figcaption>
  </figure>
</template>

<script>
export default {
  name: 'te-image',
  props: {
    url: { type: String, required: true },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' }
  }
};
</script>

<style lang="scss">
.te-image {
  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }

  figcaption {
    text-align: center;
  }
}
</style>
