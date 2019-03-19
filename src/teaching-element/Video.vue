<template>
  <div class="te-video">
    <plyrue ref="plyr" :options="options">
      <video v-if="type.isNative">
        <source :src="url" :type="type.name"/>
      </video>
      <div v-else class="plyr__video-embed">
        <iframe :src="url" allowfullscreen></iframe>
      </div>
    </plyrue>
  </div>
</template>

<script>
import { extname } from 'path';
import { Plyrue } from 'plyrue';

const EMBEDED = /youtu\.?be|vimeo|drive.google/;

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
};

export default {
  name: 'te-video',
  props: {
    url: { type: String, required: true },
    playerOptions: { type: Object, default: () => defaultPlayerOptions }
  },
  computed: {
    type() {
      const url = parseUrl(this.url);

      if (EMBEDED.test(url.host)) return { isNative: false };

      const ext = extname(this.url).substring(1);
      const name = `video/${CUSTOM_TYPE_MAPPING[ext] || ext}`;
      return { isNative: true, name };
    },
    options() {
      return {
        ...defaultPlayerOptions,
        ...this.playerOptions
      };
    }
  },
  components: {
    Plyrue
  }
};

const isRemote = url => /^https?:\/\//.test(url);

function parseUrl(url) {
  if (isRemote(url)) return new URL(url);
  const parsedUrl = new URL(location);
  parsedUrl.pathname = url;
  parsedUrl.hash = '';
  return parsedUrl;
}
</script>
