<template>
  <div class="te-modal">
    <modal v-show="showDialog" @close="toggleDialog" :elements="elements">
      <template v-for="(_, slot) in $slots">
        <template :slot="slot">
          <slot :name="slot"></slot>
        </template>
      </template>
    </modal>
    <button @click="toggleDialog" class="btn btn-primary btn-open">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import sortBy from 'lodash/sortBy';

const DEFAULT_BUTTON_TEXT = 'Open modal';
const MODAL_OPEN_CLASS = 'modal-open';

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
    toggleDialog(state = !this.showDialog) {
      document.body.classList.toggle(MODAL_OPEN_CLASS, state);
      this.showDialog = state;
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
