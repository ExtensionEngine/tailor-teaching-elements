<template>
  <div class="te-modal">
    <modal v-show="showDialog" @close="toggleDialog" :elements="elements" />
    <button @click="toggleDialog" class="btn btn-primary btn-open">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import sortBy from 'lodash/sortBy';

const CLASS_ACTIONS = { ADD: 'add', REMOVE: 'remove' };
const DEFAULT_BUTTON_TEXT = 'Open modal';
const MODAL_OPEN_CLASS = 'modal-open';

const bodyClassList = document.body.classList;

export default {
  name: 'te-modal',
  inheritAttrs: false,
  props: {
    title: { type: String, default: '' },
    embeds: { type: Object, default: () => ({}) }
  },
  data: () => ({ showDialog: false }),
  computed: {
    elements: ({ embeds }) => sortBy(embeds, 'position'),
    buttonText: ({ title }) => title || DEFAULT_BUTTON_TEXT
  },
  methods: {
    toggleDialog() {
      this.showDialog = !this.showDialog;
      const action = this.showDialog ? CLASS_ACTIONS.ADD : CLASS_ACTIONS.REMOVE;
      bodyClassList[action](MODAL_OPEN_CLASS);
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
