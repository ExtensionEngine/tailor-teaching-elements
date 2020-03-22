<template>
  <div
    @click="click"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :class="{ 'break-hidden': hidden, disabled, last: end }"
    class="te-break noselect">
    <div :class="{ show: showTooltip }" class="te-break-tooltip">
      {{ tooltip }}
    </div>
    <span>
      <slot name="pageBreakIcon">
        <span class="mdi mdi-chevron-down"></span>
      </slot>
      <span>{{ btnLabel }}</span>
    </span>
  </div>
</template>

<script>
import get from 'lodash/get';

export default {
  name: 'te-break',
  props: {
    end: { type: Boolean, default: false },
    knowledge: { type: Number, default: 0 },
    btnLabel: { type: String, default: 'Next' },
    options: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      clicked: false,
      hover: false
    };
  },
  computed: {
    hidden() {
      return get(this.options, 'pageBreak.hidden', false);
    },
    disabled() {
      return get(this.options, 'pageBreak.disabled', false);
    },
    tooltip() {
      return get(this.options, 'pageBreak.tooltip', null);
    },
    showTooltip() {
      return this.disabled && this.hover && this.tooltip;
    }
  },
  methods: {
    click() {
      if (this.disabled || this.clicked) return;
      this.clicked = true;
      this.$emit('pageBreakClick');
    }
  }
};
</script>

<style lang="scss">
.te-break {
  position: relative;
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
  }

  &:not(.last) {
    > span {
      display: inline-block;
    }

    &.break-hidden {
      height: 1px;
      cursor: default;

      > span {
        display: none;
      }
    }

    .mdi-arrow-right {
      display: none;
    }
  }

  &.last {
    .mdi-chevron-down {
      display: none;
    }

    &.disabled {
      cursor: not-allowed;
      pointer-events: auto;
    }
  }
}

.te-break-tooltip {
  position: absolute;
  opacity: 0;
  transition: opacity 0.25s ease-in;
  z-index: 1000;
  cursor: default;

  &.show {
    opacity: 1;
  }
}
</style>
