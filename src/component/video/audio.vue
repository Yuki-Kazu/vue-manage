<template>
  <div>
    <audio ref="audioPlayer" controls>
      <source :src="audioSrc" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    audioSrc: {
      type: String,

      required: true,
    },
  },

  mounted() {
    this.$refs.audioPlayer.play();
  },
};
</script>
