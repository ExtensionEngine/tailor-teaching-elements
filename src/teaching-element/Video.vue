<template>
  <div class="te-video">
    <plyr>
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

const NOT_NATIVE = /youtu\.?be|vimeo/;

const CUSTOM_TYPE_MAPPING = {
  ogv: 'ogg'
};

export default {
  name: 'te-video',
  props: {
    url: { type: String, required: true }
  },
  computed: {
    type() {
      if (NOT_NATIVE.test(this.url)) return { isNative: false };
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
