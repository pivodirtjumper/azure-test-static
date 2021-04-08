import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import router from "../router"
import axios from "../plugins/axios"

export default new Vuex.Store({
    state: {
        uploadProgress: -1
    },
    getters: {},
    mutations: {
        updateUploadProgress(state, percent) {
            state.uploadProgress = percent;
        }
    },
    actions: {
        startFileUpload(context, payload) {
            context.commit('updateUploadProgress', 0)
            let prog = 0
            let formData = new FormData();
            formData.append('file', payload, payload.name)

            axios.post( '/uploadFile',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function( progressEvent ) {
                    prog = parseInt(Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ))
                    context.commit('updateUploadProgress', Math.min(prog, 100));
                }.bind(this)
                }
            ).then(function(resp){
                console.log(resp)
                console.log("NOT A FAILURE!");
                router.push('/upload/' + resp.data.fileKey);
              })
              .catch(function(){
                console.log('FAILURE!!');
              });
        }
    }
});