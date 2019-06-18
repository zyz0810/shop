'use strict'
import {baseUrl} from './env'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
    // loading
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

function checkStatus(response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    console.log(response)
    Vue.$vux.toast.show({
        type: 'text',
        position: 'middle',
        text: '服务器错误'
    })
}

function checkCode(res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        // alert(res.msg)
    }
    if (res.data && (res.data.message.type !== 'success')) {
        Vue.$vux.toast.show({
            type: 'text',
            position: 'middle',
            text: res.data.message.content
        })
    }
    return res.data
}

export const service = {
    post(url, data) {
        return axios({
            method: 'post',
            baseURL: baseUrl,
            url,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get(url, params) {
      debugger
        return axios({
            method: 'get',
            baseURL: baseUrl,
            url:url,
            params:params, // get 请求时带的参数
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}
