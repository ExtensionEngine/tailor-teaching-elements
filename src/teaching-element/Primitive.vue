<template>
  <div :class="`col-xs-${width}`" class="te-container">
    <div class="teaching-element">
      <component :is="resolveElement(type)" v-bind="$attrs" />
    </div>
  </div>
</template>

<script>
import { TE_TYPE } from '../types';
import TeEmbed from './Embed.vue';
import TeHtml from './Html.vue';
import TeImage from './Image.vue';

const resolveElement = type => TE_TYPE[type];

export default {
  name: 'te-primitive',
  inheritAttrs: false,
  props: {
    type: { type: String, required: true },
    width: { type: Number, default: 12 }
  },
  methods: { resolveElement },
  components: {
    TeEmbed,
    TeHtml,
    TeImage
  }
};
</script>
