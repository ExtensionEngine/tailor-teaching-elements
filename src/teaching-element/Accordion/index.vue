<template>
  <ul class="accordion">
    <accordion-item
      v-for="item in embeddedItems"
      :key="item.id"
      :options="itemOptions"
      v-bind="item">
      <template v-for="(_, slot) in $slots">
        <template :slot="slot">
          <slot :name="slot"></slot>
        </template>
      </template>
    </accordion-item>
  </ul>
</template>

<script>
import AccordionItem from './Item.vue';
import embedHost from '@/mixin/embedHost';
import get from 'lodash/get';

export default {
  name: 'te-accordion',
  mixins: [embedHost],
  props: {
    options: { type: Object, default: () => ({}) }
  },
  computed: {
    itemOptions() {
      return get(this.options, 'accordion.item');
    }
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
