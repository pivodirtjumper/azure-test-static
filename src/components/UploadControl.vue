<template>
    <v-file-input
        hide-input
        class="flex-grow-0"
        max-width="100"
        v-on:change="startUpload"
    />
</template>

<script>

export default {
  name: 'upload-control',
  data: () => ({
      
  }),
  methods: {
      /* File[] */
      startUpload(files) {
        //   console.log(files);
          this.$router.push('/upload')
          this.$store.dispatch("startFileUpload", files)
      }
  }
};
</script>
