<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col cols="8" sm="4">
                <v-alert 
                    border="bottom"
                    color="accent"
                    transition="slide-x-transition"
                    >
                    <p>Hi!</p>
                    <p>This is a simple demo project for my Azure applications development course. Azure functions (aka serverless compurations), Azure Blob storage And Azure Static Web Apps have been used for this project implementation.</p>
                    <p><strong>Why?</strong> Cause it's more innovative approach and therefore, fun.</p>
                    </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "main-content",
    data: () => ({

    }),
}
</script>