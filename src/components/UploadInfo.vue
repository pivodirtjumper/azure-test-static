<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="2" v-if="$props.id == undefined">
                <v-progress-circular
                :rotate="360"
                :size="150"
                :width="30"
                :value="$store.state.uploadProgress"
                color="accent"
                >
                    <v-fade-transition >
                        <v-icon
                            v-if="$store.state.uploadProgress == 100"
                            color="success">
                            mdi-check
                        </v-icon>
                    </v-fade-transition>
                </v-progress-circular>
            </v-col>
            <v-col cols="12" sm="4" v-else>
                    <v-text-field
                        append-outer-icon="mdi-content-copy"
                        type="text"
                        ref="target"
                        filled
                        readonly
                        :value="targetLink"
                        @click:append-outer="copyToClipboard"
                    >
                    </v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'upload-info',
    props: ['id'],
    data: () => ({

    }),
    computed: {
        targetLink: function () {
            let portname = '';
            if (window.location.port) {
                portname = ':' + window.location.port;
            }
            return window.location.protocol + '//' + window.location.hostname + portname + '/get/' + this.id;
        }
    },
    methods: {
        copyToClipboard() {
            let toCopy = this.$refs.target.$el.querySelector('input')
            toCopy.select()
            document.execCommand("copy");
        }
    }
}
</script>
