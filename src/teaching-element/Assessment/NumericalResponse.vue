<template>
  <div class="form-group">
    <span class="form-label">Solution</span>
    <ul class="answer-group">
      <li
        v-for="(it, index) in items"
        :key="index"
        class="input-group">
        <div v-if="it.prefix" class="input-group-addon">{{ it.prefix }}</div>
        <input
          v-model="it.answer"
          :disabled="disabled"
          @input="update"
          type="text"
          class="form-control"
          placeholder="Solution...">
        <div v-if="it.suffix" class="input-group-addon">{{ it.suffix }}</div>
      </li>
    </ul>
    <span class="help-block">
      Only numerical input allowed, if decimal number is needed please
      use '.' to separate numbers (e.g. '3.14').
    </span>
  </div>
</template>

<script>
import map from 'lodash/map';
import toNumber from 'lodash/toNumber';
import zipWith from 'lodash/zipWith';

export default {
  props: {
    answer: { type: Array, default: () => ([]) },
    disabled: { type: Boolean, default: false },
    prefixes: { type: Array, required: true },
    retake: { type: Boolean, default: false },
    suffixes: { type: Array, required: true }
  },
  data() {
    return { items: [] };
  },
  methods: {
    update() {
      const userAnswer = map(this.items, it => it.answer && toNumber(it.answer));
      this.$emit('update', { userAnswer });
    }
  },
  created() {
    this.items = zipWith(this.prefixes, this.suffixes,
      (prefix, suffix) => ({ prefix, suffix }));
  },
  watch: {
    answer(val) {
      this.items = this.items.map((item, index) => {
        item.answer = val[index];
        return item;
      });
    },
    retake(val) {
      if (val) this.items.forEach(it => (it.answer = null));
    }
  }
};
</script>

<style lang="scss">
.assessment.numerical-response {
  .answer-group {
    margin-top: 10px;
  }

  ul {
    padding: 0 0 0 10px;
    list-style: none;

    li {
      padding: 5px 0;
    }
  }
}
</style>
