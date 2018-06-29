<template>
  <div :class="`col-xs-${width}`" class="te-container">
    <div class="teaching-element">
      <component
        :is="resolveElement(type)"
        :assessmentType="assessmentType"
        :content="content"
        :url="url">
      </component>
    </div>
  </div>
</template>

<script>
import TeHtml from './Html.vue';
import TeImage from './Image.vue';
import { TE_TYPE } from '../types';

export default {
  name: 'te-primitive',
  props: {
    type: { type: String, required: true },
    content: { type: String, default: '' },
    url: { type: String, default: '' },
    assessmentType: { type: String, default: '' },
    width: { type: Number, default: 12 }
  },
  methods: {
    resolveElement(type) {
      return TE_TYPE[type];
    }
  },
  components: {
    TeHtml,
    TeImage
  }
};
</script>
