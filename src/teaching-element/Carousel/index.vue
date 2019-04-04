<template>
  <div :style="{ height: `${height}px` }" class="carousel">
    <button
      @click="previous"
      :disabled="!hasPrevious"
      aria-label="Previous slide"
      class="btn btn-link btn-slide previous">
      <span class="icon"></span>
    </button>
    <ul :style="{ height: `${itemsHeight}px` }" class="carousel-items">
      <carousel-item
        v-for="({ elements, id }, index) in embeddedItems"
        :key="id"
        :elements="elements"
        :is-active="index === activeIndex" />
    </ul>
    <button
      @click="next"
      :disabled="!hasNext"
      aria-label="Next slide"
      class="btn btn-link btn-slide next">
      <span class="icon"></span>
    </button>
    <ul class="indicators">
      <li
        v-for="({ id }, index) in embeddedItems"
        :key="id"
        @click="activeIndex = index"
        :class="{ active: index === activeIndex }"
        class="indicator-item">
      </li>
    </ul>
  </div>
</template>

<script>
import CarouselItem from './Item.vue';
import embedHost from '@/mixin/embedHost';

export default {
  name: 'te-carousel',
  mixins: [embedHost],
  props: {
    height: { type: [Number, String], default: 600 }
  },
  data() {
    return { activeIndex: 0 };
  },
  computed: {
    itemsHeight() {
      return this.height - 40;
    },
    hasNext() {
      return this.activeIndex < this.embeddedItems.length - 1;
    },
    hasPrevious() {
      return this.activeIndex > 0;
    }
  },
  methods: {
    next() {
      if (this.hasNext) this.activeIndex += 1;
    },
    previous() {
      if (this.hasPrevious) this.activeIndex -= 1;
    }
  },
  components: { CarouselItem }
};
</script>

<style lang="scss">
.carousel {
  position: relative;
  padding: 0 75px;

  .carousel-items {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .indicators {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 22px;
    margin: 0;
    padding-left: 0;
    text-align: center;
    list-style-type: none;

    .indicator-item {
      display: inline-block;
      position: relative;
      width: 16px;
      height: 16px;
      margin: 0 12px;
      background-color: #ddd;
      cursor: pointer;
      transition: background-color 0.3s;
      border-radius: 50%;

      &.active {
        background-color: #444;
      }
    }
  }

  .btn-slide {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 75px;
    height: 100%;
    z-index: 10;

    &:hover, &:focus, &:active {
      background: none;
      box-shadow: none;
      outline: 0;
    }

    &[disabled] {
      color: #444;
      cursor: default;
      pointer-events: none;
    }

    &.next {
      right: 0;
    }

    &.previous {
      left: 0;
    }

    .icon {
      font-size: 40px;
    }
  }
}
</style>
