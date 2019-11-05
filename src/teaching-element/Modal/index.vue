<template>
  <div class="te-modal">
    <button @click="showDialog = true" class="btn btn-primary btn-open">
      {{ title }}
    </button>
    <modal
      v-show="showDialog"
      @close="showDialog = false"
      :elements="elements" />
  </div>
</template>

<script>
import Modal from './Modal.vue';
import sortBy from 'lodash/sortBy';

const DEFAULT_TITLE = 'Open modal';

export default {
  name: 'te-modal',
  inheritAttrs: false,
  props: {
    embeds: { type: Object, default: () => ({}) }
  },
  data() {
    return { showDialog: false };
  },
  computed: {
    elements() {
      return sortBy(this.embeds, 'position');
    },
    title: vm => vm.$attrs.title || DEFAULT_TITLE
  },
  watch: {
    showDialog(val) {
      if (val) return document.body.classList.add('modal-open');
      return document.body.classList.remove('modal-open');
    }
  },
  components: { Modal }
};
</script>

<style lang="scss">
.te-modal {
  text-align: center;

  .btn-open {
    max-width: 90%;
    padding: 9px 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
