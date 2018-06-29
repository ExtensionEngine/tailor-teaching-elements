<template>
  <li :class="{ active: isActive }" class="carousel-item">
    <div class="row">
      <primitive
        v-for="{ id, data, type } in elements"
        :key="id"
        :type="type"
        v-bind="data">
      </primitive>
    </div>
  </li>
</template>

<script>
import Primitive from '../Primitive.vue';

// TODO: Support for image caption, when such field will be known in the db
export default {
  name: 'te-carousel-item',
  props: {
    elements: { type: Array, required: true },
    isActive: { type: Boolean, default: false }
  },
  components: { Primitive }
};
</script>

<style lang="scss">
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  opacity: 0;
  z-index: 1;
  padding: 0 75px;
  transition: opacity 300ms cubic-bezier(0.165, 0.84, 0.44, 1);

  .row {
    height: 100%;
    margin: 0;
    overflow: auto;
  }

  // Scale image height and width
  .te-container {
    height: 100%;
  }

  .teaching-element {
    height: 100%;
  }
}

.carousel-item.active {
  opacity: 1;
  z-index: 2;
}
</style>
