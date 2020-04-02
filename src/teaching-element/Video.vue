<template>
  <div class="te-video">
    <plyrue :options="options">
      <video v-if="video.native" crossorigin>
        <source :src="video.url" :type="video.mime">
        <track
          v-for="caption in captions"
          :key="caption.srclang"
          :label="caption.label"
          :srclang="caption.srclang"
          :src="caption.src"
          :default="caption.default"
          kind="captions">
      </video>
      <div v-else class="plyr__video-embed">
        <iframe :src="url" allowfullscreen></iframe>
      </div>
    </plyrue>
  </div>
</template>

<script>
import { extname } from 'path';
import { PlyrueComponent as Plyrue } from 'plyrue';

const MIMETYPE = {
  m4v: 'video/mp4',
  ogv: 'video/ogg'
};

const VIDEO_HOSTING = [
  /youtu(?:\.be|be\.com)$/,
  /vimeo\.com$/,
  /drive\.google\.com$/
];

const defaultPlayerOptions = {
  controls: [
    'play-large',
    'play',
    'progress',
    'volume',
    'captions',
    'settings',
    'fullscreen'
  ]
};

export default {
  name: 'te-video',
  props: {
    url: { type: String, required: true },
    playerOptions: { type: Object, default: () => defaultPlayerOptions },
    captions: { type: Array, default: () => ([]) }
  },
  computed: {
    video: ({ url }) => {
      url = new URL(url);
      if (isDownloadLink(url)) return { url: url.href, native: true, mime: 'video/*' };
      if (isShareLink(url)) return { url: url.href, native: false };
      return { url: url.href, native: true, mime: mimetype(url) };
    },
    options: ({ playerOptions }) => ({ ...defaultPlayerOptions, ...playerOptions })
  },
  components: { Plyrue }
};

function isDownloadLink({ hostname, searchParams }) {
  return hostname === 'drive.google.com' && searchParams.get('export') === 'download';
}

function isShareLink({ hostname }) {
  return VIDEO_HOSTING.some(re => re.test(hostname));
}

function mimetype({ pathname }) {
  const ext = extname(pathname).replace(/^\./, '');
  if (MIMETYPE[ext]) return MIMETYPE[ext];
  return `video/${ext}`;
}
</script>
