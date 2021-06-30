import axios from 'axios'
import {
    stringify
} from 'qs'
import vue from 'vue'
import {
    getHeader
} from './header'

// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 60000
})

// request 拦截器
service.interceptors.request.use(
    config => {
        // 让每个请求带上签名
        console.log(config, 'config')
        let url = config.url.replace(config.baseURL, '')
        let code = config.code
        config.headers = getHeader(url, code)
        if (sessionStorage.token) {
            config.headers.token = 'brear ' + sessionStorage.getItem('token')
        }
        // console.log(config, 'service.interceptors.request')
        return config
    },
    error => {
        console.log(error, 'pppp')
        Promise.reject(error)
    }
)

// response拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data
        }
    }, err => {
        const code = String(err).split(' ')
        if (code[code.length - 1]) {
            window.location.hash = '#/login'
        }
        vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
)


export default {
    post(url, sourceData, contentType, timeout) {
        const type = contentType || 'application/json; charset=UTF-8'
        const data = sourceData
        return service({
            method: 'post',
            url,
            data,
            timeout: timeout || 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequested',
                'Content-Type': type
            }
        }).then(response => {
            return response
        })
    },
    get(url, params, timeout) {
        return service({
            method: 'get',
            url,
            params,
            timeout: timeout || 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequested'
            }
        }).then(response => {
            return response
        })
    },
    put(url, sourceData, contentType, timeout) {
        const type = contentType || 'application/json; charset=UTF-8'
        const data = sourceData
        return service({
            method: 'put',
            url,
            data,
            timeout: timeout || 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequested',
                'Content-Type': type
            }
        }).then(response => {
            return response
        })
    },
    delete(url, data, params, contentType) {
        const type = contentType || 'application/json; charset=UTF-8'
        return service({
            method: 'delete',
            url,
            data,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequested',
                'Content-Type': type
            }
        }).then(response => {
            return response
        })
    },
}