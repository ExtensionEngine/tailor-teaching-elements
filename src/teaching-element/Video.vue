<template>
  <div class="te-video">
    <plyrue :options="options">
      <video v-if="video.native">
        <source :src="video.url" :type="video.mime">
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
