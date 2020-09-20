<template>
  <div class="te-brightcove-video">
    <div v-if="error" class="error">
      <div class="message">
        <span class="alert-icon"></span>
        <p>Error loading media: {{ error }}</p>
      </div>
    </div>
    <div v-else ref="videoWrapper"></div>
  </div>
</template>

<script>
import brightcovePlayerLoader from '@brightcove/player-loader';

export default {
  name: 'te-brightcove-video',
  props: {
    accountId: { type: String, required: true },
    playerId: { type: String, required: true },
    videoId: { type: String, required: true }
  },
  data() {
    return {
      error: null
    };
  },
  methods: {
    createPlayer() {
      brightcovePlayerLoader({
        refNode: this.$refs.videoWrapper,
        accountId: this.accountId,
        playerId: this.playerId,
        videoId: this.videoId,
        onFailure: err => (this.error = err.message)
      });
    }
  },
  watch: {
    videoId() {
      brightcovePlayerLoader.reset();
      this.createPlayer();
    }
  },
  mounted() {
    this.createPlayer();
  },
  beforeDestroy() {
    brightcovePlayerLoader.reset();
  }
};
</script>

<style lang="scss" scoped>
.te-brightcove-video {
  .error {
    position: relative;
    height: 100%;
    background: rgba(0,0,0,0.9);
  }

  .error .message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 18px;
    font-weight: 500;

    .alert-icon {
      font-size: 42px;
    }
  }
}
</style>
