<template>
  <div class="te-modal">
    <button @click="showDialog = true" class="btn btn-primary btn-open">
      {{ title }}
    </button>
    <modal
      v-show="showDialog"
      :elements="elements"
      @close="showDialog = false">
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import sortBy from 'lodash/sortBy';

export default {
  name: 'te-modal',
  props: {
    title: { type: String, default: 'Open modal' },
    embeds: { type: Object, default: () => ({}) }
  },
  data() {
    return { showDialog: false };
  },
  computed: {
    elements() {
      return sortBy(this.embeds, 'position');
    }
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
