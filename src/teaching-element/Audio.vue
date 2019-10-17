<template>
  <div class="te-audio">
    <a-player
      v-if="url"
      v-bind="playerOptions"
      :music="audio" />
  </div>
</template>

<script>
import APlayer from 'vue-aplayer';

APlayer.disableVersionBadge = true;
const defaultAudioOptions = () => ({
  title: 'Audio track',
  artist: ' ',
  pic: ' '
});

export default {
  name: 'te-audio',
  inheritAttrs: false,
  props: {
    url: { type: String, required: true },
    audioOptions: { type: Object, default: defaultAudioOptions },
    playerOptions: { type: Object, default: () => ({}) }
  },
  computed: {
    audio: vm => ({ src: vm.url, ...vm.audioOptions })
  },
  components: {
    APlayer
  }
};
</script>
