<template>
  <li @scroll="scroll" :class="{ 'accordion-active': expanded }">
    <div @click="toggle" class="accordion-header">
      <div class="contents">
        <span class="title">{{ heading }}</span>
      </div>
      <span class="icon"></span>
    </div>
    <transition name="slide-fade">
      <div v-show="expanded" class="accordion-body">
        <div class="row">
          <primitive
            v-for="{ id, type, data } in elements"
            :key="id"
            :type="type"
            v-bind="data" />
        </div>
      </div>
    </transition>
  </li>
</template>

<script>
import Primitive from '../Primitive.vue';
import scrollTo from 'vue-scrollto';

const options = {
  container: 'body',
  easing: 'ease',
  cancelable: true,
  offset: 0,
  onDone: false,
  onCancel: false
};

export default {
  name: 'te-accordion-item',
  props: {
    elements: { type: Array, required: true },
    heading: { type: String, required: true }
  },
  data() {
    return { expanded: false };
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
      if (this.expanded) this.scroll();
    },
    scroll() {
      scrollTo(this.$el, 500, options);
    }
  },
  components: { Primitive }
};
</script>

<style lang="scss">
.accordion-header {
  height: 60px;
  font-size: 16px;
  text-align: justify;
  cursor: pointer;
  position: relative;

  .accordion-active & { font-weight: 500; }

  .contents {
    line-height: 34px;
    padding: 12px;

    .title {
      display: inline-block;
      width: 90%;
      max-width: 90%;
      padding-top: 1px;
      vertical-align: middle;
      line-height: 1em;
    }
  }

  .icon {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
  }
}

.accordion-body {
  height: auto;
  padding: 32px 8px;
}

// HINT: Add transition rules in the project accordion stylesheet
// for transition effect
.slide-fade-enter-active, .slide-fade-leave-active {
  overflow: hidden;
  margin-top: 0;
  margin-bottom: 0;
  transition: all 500ms cubic-bezier(0.165, 0.84, 0.44, 1); // "easeOutQuart"
}

.slide-fade-enter, .slide-fade-leave-to {
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
