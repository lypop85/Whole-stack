import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.mixin({
    methods: {
        getAuthHeadersMixin() {
            return {
                token: 'brear ' + sessionStorage.getItem('token')
            }
        }

    },
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')