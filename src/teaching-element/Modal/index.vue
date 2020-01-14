<template>
  <div class="te-modal">
    <button @click="showDialog = true" class="btn btn-primary btn-open">
      {{ buttonLabel }}
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

const DEFAULT_LABEL = 'Open modal';

export default {
  name: 'te-modal',
  inheritAttrs: false,
  props: {
    title: { type: String, default: '' },
    embeds: { type: Object, default: () => ({}) }
  },
  data() {
    return { showDialog: false };
  },
  computed: {
    elements: ({ embeds }) => sortBy(embeds, 'position'),
    buttonLabel: ({ title }) => title || DEFAULT_LABEL
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
