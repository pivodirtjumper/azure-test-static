import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter);

import MainContent from '../components/MainContent.vue'
import UploadInfo from '../components/UploadInfo.vue'
import GetFile from '../components/GetFile.vue'

const routes = [
    {
        path: '/', component: MainContent
    }, {
        path: '/upload/:id', component: UploadInfo, props: true
    }, {
        path: '/upload', component: UploadInfo
    }, {
        path: '/get/:id', component: GetFile, props: true
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})