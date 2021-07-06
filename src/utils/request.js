import axios from 'axios'
import { message } from 'antd';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASEURL
})

request.interceptors.request.use(    
    config => {        
        const cookie = localStorage.getItem('cookie') || ''
        if(config.method === 'get') {
            if(!config.params) config.params = {}
            cookie && Object.assign(config.params,{cookie})   
        }
        if(config.method === 'post'){
            if(!config.data) config.data = {}
            cookie && Object.assign(config.data,{cookie})
        }        
        // 防止缓存
        if(!config.params) config.params = {}
        const timestamp = new Date().getTime()
        Object.assign(config.params,{timestamp})        
        return config
    },
    error => {
        return Promise.reject(error)
    })
request.interceptors.response.use(
    res => {
        const { data } = res        

        return Promise.resolve(data)
    },
    error => {        
        const { data } = error.response
        message.error(data.msg)
        return Promise.reject(error.response)
    }
)

export default request