<template>
  <div class="te-video">
    <plyr ref="plyr" :options="playerOptions">
      <video v-if="type.isNative">
        <source :src="url" :type="type.name"/>
      </video>
      <div v-else class="plyr__video-embed">
        <iframe :src="url" allowfullscreen></iframe>
      </div>
    </plyr>
  </div>
</template>

<script>
import { extname } from 'path';
import { Plyr } from 'vue-plyr';

const NOT_NATIVE = [
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'drive.google.com'
]

const CUSTOM_TYPE_MAPPING = {
  ogv: 'ogg'
};

const defaultPlayerOptions = {
  controls: [
    'play-large',
    'play',
    'progress',
    'volume',
    'settings',
    'fullscreen'
  ]
}

export default {
  name: 'te-video',
  props: {
    url: { type: String, required: true },
    playerOptions: { type: Object, default: () => defaultPlayerOptions }
  },
  computed: {
    type() {
      const url = new URL(this.url);

      if (url.host === 'drive.google.com' && url.search.includes('export=download')) {
        return { isNative: true };
      }

      if (NOT_NATIVE.includes(url.host)) return { isNative: false };

      const ext = extname(this.url).substring(1);
      const name = `video/${CUSTOM_TYPE_MAPPING[ext] || ext}`;
      return { isNative: true, name };
    }
  },
  components: {
    Plyr
  }
};
</script>
