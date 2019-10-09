<template>
  <div class="te-audio">
    <aplayer
      v-if="url"
      v-bind="playerOptions"
      :music="music" />
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer';
Aplayer.disableVersionBadge = true;

const defaultAudioOptions = {
  title: 'Audio track',
  artist: ' ',
  pic: ' '
};

export default {
  name: 'te-file',
  inheritAttrs: false,
  props: {
    url: { type: String, required: true },
    audioOptions: { type: Object, default: () => defaultAudioOptions },
    playerOptions: { type: Object, default: () => ({}) }
  },
  computed: {
    music() {
      return {
        url: this.url,
        ...this.audioOptions
      };
    }
  },
  components: {
    Aplayer
  }
};
</script>
