<template>
  <div>
    <video ref="videoPlayer" controls>
      <source :src="videoSrc" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  props: {
    videoSrc: {
      type: String,

      required: true,
    },
  },

  mounted() {
    this.$refs.videoPlayer.play();
  },
};
</script>
