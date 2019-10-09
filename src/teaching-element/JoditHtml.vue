<template>
  <div class="jodit_container">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="jodit_wysiwyg" v-html="content"></div>
  </div>
</template>

<script>
import 'jodit/build/jodit.min.css';

export default {
  name: 'te-passage',
  props: {
    content: { type: String, required: true }
  }
};
</script>

<style lang="scss">
$borderSize: 6px;
$tooltipColor: #455a64;

.jodit_wysiwyg {
  overflow: visible !important;
}

.tce-jodit-tooltip {
  display: inline-block;
  position: relative;
  background: rgba(205, 215, 220, 0.7);
  text-decoration: underline dotted $tooltipColor;
  cursor: help;

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    border-left: $borderSize solid transparent;
    border-right: $borderSize solid transparent;
    border-top: $borderSize solid $tooltipColor;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + #{$borderSize} - 1px);
    left: -10px;
    min-width: 150px;
    max-width: 300px;
    padding: 5px;
    text-align: center;
    color: #fff;
    font-size: 0.9em;
    background: $tooltipColor;
    border-radius: 2px;
  }

  &::before, &::after {
    visibility: hidden;
    transition:
      opacity 0.1s ease-out,
      margin 0.1s ease-out;
    opacity: 0;
  }

  &:hover::after, &:hover::before {
    visibility: visible;
    margin-bottom: 3px;
    opacity: 1;
  }
}
</style>
