<template>
  <figure class="te-image">
    <img :src="url" :alt="alt" :title="alt">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <figcaption v-if="caption" :style="captionStyle" v-html="caption"></figcaption>
  </figure>
</template>

<script>
export default {
  name: 'te-image',
  props: {
    url: { type: String, required: true },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' },
    meta: { type: Object, required: true }
  },
  computed: {
    captionStyle: vm => ({ width: `${vm.meta.width}px` })
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
    margin: 0 auto;
    text-align: end;
    font-size: 0.875rem;
  }
}
</style>
