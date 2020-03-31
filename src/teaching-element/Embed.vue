<template>
  <div :class="{ expanded }" class="te-embed">
    <iframe
      :src="url"
      :style="{ height: embedHeight }"
      class="content"
      frameborder="0">
    </iframe>
    <div
      v-show="showOverlay"
      @click="showOverlay = false"
      class="interactive">
    </div>
    <div class="te-embed-toolbar">
      <button @click="toggleExpand" class="btn tes-icon">
        <slot v-if="expanded" name="embedCloseIcon">
          <span class="mdi mdi-close"></span>
        </slot>
        <slot v-else name="embedExpandIcon">
          <span class="mdi mdi-arrow-expand-all"></span>
        </slot>
      </button>
    </div>
  </div>
</template>

<script>
const EXPANDED_HEIGHT = '98vh';

export default {
  name: 'te-embed',
  props: {
    height: { type: [Number, String], default: 600 },
    url: { type: String, required: true }
  },
  data() {
    return {
      expanded: false,
      showOverlay: true
    };
  },
  computed: {
    embedHeight() {
      return this.expanded ? EXPANDED_HEIGHT : `${this.height}px`;
    }
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
      if (this.showOverlay) this.showOverlay = false;
    }
  }
};
</script>

<style lang="scss">
.te-embed {
  position: relative;
  overflow: auto;

  .content {
    width: 100%;
  }

  .te-embed-toolbar {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 7px 0 0 7px;
    font-size: 16px;
    transition: opacity 0.7s;

    .btn.tes-icon {
      padding: 3px 6px;
      background-color: #e0e0e0;
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.87);
      transition: background-color 0.5s;

      &:hover {
        background-color: #d0d0d0;
      }
    }

    .mdi-close {
      font-size: 18px;
    }
  }

  &:hover {
    .te-embed-toolbar {
      opacity: 1;
    }
  }

  &.expanded {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10000;
    transform: translate(-50%, -50%);
    width: 98%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.87);
  }
}

.interactive {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
