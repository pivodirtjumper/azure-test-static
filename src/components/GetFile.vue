<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col cols="8" sm="2" v-if="this.loading == true && this.error == false" >
                <v-progress-circular
                :size="150"
                :width="10"
                color="primary"
                indeterminate
                v-if="this.loading == true && this.error == false"
                >
                </v-progress-circular>
            </v-col>
            
            <v-col cols="8" sm="4" v-if="this.error">
                <v-alert v-if="this.error"
                    dark
                    border="top"
                    type="error"
                    transition="slide-x-transition"
                    >
                    Something went wrong, we cannot find the forementioned file.
                    </v-alert>
            </v-col>

            <v-col cols="8" sm="4" v-if="this.loading == false && this.error == false">
                  <v-card
                        class="mx-auto"
                        max-width="344"
                    >
                    

                        <v-card-title>
                            {{this.fileData.name}}
                        </v-card-title>

                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                color="secondary"
                                tile
                                @click="initiateDownload"
                            >
                                <v-icon>mdi-download</v-icon>
                                Download
                            </v-btn>
                        </v-card-actions>
                  </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "../plugins/axios"

export default {
    name: "get-file",
    props: ['id'],
    data: () => ({
        loading: false,
        error: false,
        fileData: {}
    }),
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.error = false;
            axios.get(
                'getFile', {
                    params: { id: this.$props['id']}
                }
            )
            .then(response => {
                this.loading = false;
                this.error = false;
                console.log(response);
                this.fileData = {
                    name: response.data.name,
                    url: response.data.url
                }
            })
            .catch(error => {
                this.loading = false;
                this.error = true;
                console.log(error)
            })
        },
        initiateDownload() {
            if (!this.loading && ! this.error) {
                window.location = this.fileData.url;
            }
        }
    }
}
</script>