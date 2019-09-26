<template>
  <div class="select-assessment">
    <div v-for="(row, index) in rows" :key="index" class="row">
      <div
        v-for="assessment in row"
        :key="assessment.type"
        @click="select(assessment.type)"
        :class="calculateWidth(row)"
        class="btn-base assessment-type">
        <span>{{ assessment.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import chunk from 'lodash/chunk';
import { subTypeInfo } from '../../src/types';
import toArray from 'lodash/toArray';

const ASSESSMENTS_PER_ROW = 6;

export default {
  name: 'select-assessment',
  data() {
    return { assessments: subTypeInfo };
  },
  computed: {
    rows() {
      return chunk(toArray(this.assessments), ASSESSMENTS_PER_ROW);
    }
  },
  methods: {
    calculateWidth(row) {
      return `col-xs-${12 / row.length}`;
    },
    select(subType) {
      this.$emit('select', subType);
    }
  }
};
</script>

<style lang="scss" scoped>
.select-assessment {
  max-width: 970px;
  margin: 20px auto;
  color: #444;

  .row {
    padding-bottom: 65px;
  }

  .btn-base {
    display: inline-block;
    vertical-align: middle;

    &:hover {
      color: #42b983;
      cursor: pointer;
    }
  }

  .assessment-type {
    font-size: 16px;
    line-height: 16px;
  }
}
</style>
