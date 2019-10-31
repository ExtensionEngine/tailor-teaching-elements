<template>
  <div class="row">
    <div class="col-md-12">
      <div class="presentation">
        <select-assessment
          v-if="showSubtypes"
          @select="select" />
        <teaching-element
          v-else-if="element"
          :element="element"
          :options="options" />
        <div v-else>Pick an element from the navbar</div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectAssessment from './SelectAssessment';
import TeachingElement from '../../src/teaching-element';

const TYPES = { ASSESSMENT: 'ASSESSMENT', REFLECTION: 'REFLECTION' };
const HAS_SUBTYPE = [TYPES.ASSESSMENT, TYPES.REFLECTION];

const isAssessment = ({ type }) => HAS_SUBTYPE.includes(type) || !type;
const data = importAll(require.context('../data/', true, /\.json$/));

export default {
  props: {
    elementType: { type: String, default: null },
    elementSubType: { type: String, default: null }
  },
  data() {
    return {
      options: { assessmentType: 'formative', enableHighlighting: true }
    };
  },
  computed: {
    isReflection() {
      return this.elementType === TYPES.REFLECTION;
    },
    element() {
      const { elementType: type, elementSubType: subType, isReflection } = this;
      const el = data[subType || type];
      if (subType) el.type = isReflection ? TYPES.REFLECTION : TYPES.ASSESSMENT;
      return el;
    },
    showSubtypes() {
      const { elementType: type, elementSubType: subtype } = this;
      return HAS_SUBTYPE.includes(type) && !subtype;
    }
  },
  methods: {
    save(element) {
      console.log('Saved element: ', element);
    },
    select(subType) {
      const elementType = this.isReflection ? TYPES.REFLECTION : TYPES.ASSESSMENT;
      const data = { elementType, elementSubType: subType };
      this.$emit('select', data);
    }
  },
  components: {
    SelectAssessment,
    TeachingElement
  }
};

function importAll(r) {
  return r.keys().reduce((acc, key) => {
    const data = r(key);
    const type = !isAssessment(data) ? data.type : data.data.type;
    acc[type] = data;
    return acc;
  }, {});
}
</script>

<style lang="scss">
.presentation {
  padding: 20px 40px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .87);
  min-height: 350px;
  overflow: hidden;
}

.teaching-element {
  border: 1px dotted #ccc;
  padding: 10px 10px;
  margin: 7px 15px;
}
</style>
