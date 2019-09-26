<template>
  <div
    :class="containerClasses"
    @mousedown="$emit('elementInteraction', element)"
    class="te-container">
    <div class="teaching-element">
      <!-- TODO: Cleanup when element props get sorted-->
      <component
        :is="type"
        v-bind="Object.assign({}, element, element.data)"
        :type="element.data.type"
        :position="position"
        :count="count"
        :options="options"
        @enablePageBreak="$emit('enablePageBreak')"
        @assessmentSubmit="data => $emit('assessmentSubmit', data)"
        @pageBreakClick="$emit('pageBreakClick')">
      </component>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';
import TeAssessment from './Assessment/index.vue';
import TeAccordion from './Accordion/index.vue';
import TeBreak from './PageBreak.vue';
import TeBrightcoveVideo from './BrightcoveVideo.vue';
import TeCarousel from './Carousel/index.vue';
import TeEmbed from './Embed.vue';
import TeHtml from './Html.vue';
import TeImage from './Image.vue';
import TeModal from './Modal/index.vue';
import TeJoditHtml from './JoditHtml.vue';
import TePdf from './Pdf.vue';
import TeTable from './Table.vue';
import TeVideo from './Video.vue';
import { TE_TYPE } from '../types';

export default {
  name: 'teaching-element',
  props: {
    count: { type: Number, default: 0 },
    element: { type: Object, required: true },
    options: { type: Object, default: () => ({}) },
    position: { type: Number, default: 0 }
  },
  computed: {
    columnWidth() {
      return get(this.element, 'data.width', 12);
    },
    containerClasses() {
      return [`col-xs-${this.columnWidth}`, `${this.type}-container`];
    },
    type() {
      return TE_TYPE[this.element.type];
    }
  },
  components: {
    TeAssessment,
    TeAccordion,
    TeBreak,
    TeBrightcoveVideo,
    TeCarousel,
    TeEmbed,
    TeHtml,
    TeImage,
    TeModal,
    TeJoditHtml,
    TePdf,
    TeTable,
    TeVideo
  }
};
</script>

<style lang="scss">
.teaching-element {
  text-align: left;
}

 div[class*="col-xs-"].te-container {
   padding: 0;
 }

 .noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
