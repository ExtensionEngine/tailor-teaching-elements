<template>
  <ul class="accordion">
    <accordion-item
      v-for="item in embeddedItems"
      :key="item.id"
      :options="options"
      v-bind="item" />
  </ul>
</template>

<script>
import AccordionItem from './Item.vue';
import embedHost from '@/mixin/embedHost';

export default {
  name: 'te-accordion',
  mixins: [embedHost],
  props: {
    options: { type: Object, default: () => ({}) }
  },
  components: { AccordionItem }
};
</script>

<style lang="scss">
.accordion {
  margin: 0;
  padding-left: 0;
  list-style-type: none;
}
</style>
