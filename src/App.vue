<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <v-img
        :lazy-src="require('./assets/rtrd2.png')"
        contain
        max-height="50"
        max-width="200"
        :src="require('./assets/rtrd2.png')"
      ></v-img> 
    
      <v-spacer/>

      <upload-control/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import UploadControl from './components/UploadControl.vue';

export default {
  name: 'RTRDSHR',

  components: {
    UploadControl
  },

  data: () => ({
  }),
};
</script>
