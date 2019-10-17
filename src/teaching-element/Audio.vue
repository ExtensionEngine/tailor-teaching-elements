<template>
  <div class="te-audio">
    <a-player
      v-if="url"
      v-bind="audioPlayerOptions"
      :music="audio" />
  </div>
</template>

<script>
import APlayer from 'vue-aplayer';

APlayer.disableVersionBadge = true;
const defaultAudioOptions = {
  title: 'Audio track',
  artist: ' ',
  pic: ' '
};

export default {
  name: 'te-audio',
  inheritAttrs: false,
  props: {
    url: { type: String, required: true },
    audioPlayerOptions: { type: Object, default: () => ({}) }
  },
  computed: {
    audio: vm => ({ src: vm.url, ...defaultAudioOptions, ...vm.$attrs })
  },
  components: {
    APlayer
  }
};
</script>
