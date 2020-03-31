<template>
  <div role="dialog" class="te-modal-preview modal in">
    <div role="document" class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="$emit('close')" aria-label="Close">
            <slot name="modalCloseIcon">
              <span aria-hidden="true" class="mdi mdi-close"></span>
            </slot>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <primitive
              v-for="{ id, data, type } in elements"
              :key="id"
              :type="type"
              v-bind="data" />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="$emit('close')" class="btn btn-default">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Primitive from '../Primitive.vue';

export default {
  name: 'te-modal-preview',
  props: {
    elements: { type: Array, required: true }
  },
  components: { Primitive }
};
</script>

<style lang="scss">
.te-modal-preview.modal {
  display: block;

  .modal-header {
    border-bottom: none;
    text-align: right;

    button {
      background: transparent;
      border: none;
      outline: none;
    }
  }
}
</style>
