<template>
  <ul class="accordion">
    <accordion-item
      v-for="item in embeddedItems"
      :key="item.id"
      v-bind="item" />
  </ul>
</template>

<script>
import AccordionItem from './Item.vue';
import embedHost from '@/mixin/embedHost';

export default {
  name: 'te-accordion',
  mixins: [embedHost],
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
