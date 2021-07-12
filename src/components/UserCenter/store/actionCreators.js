import * as constants from './constants'

import { loginPhone, loginStatus, logout, dailySignin } from '../../../api/user'
import { message } from 'antd'
import md5 from 'js-md5'

export const getUserData = (data) => ({
    type: constants.GET_USERINFO,
    data
})

export const login = ({ phone, password }) => {
    return async (dispatch) => {
        const params = {
            phone,
            md5_password: md5(password)
        }
        const res = await loginPhone(params)
        if (res.code !== 200) {
            message.error(res.message)
            return Promise.reject(res)
        }
        if (res.cookie) {
            localStorage.setItem('cookie', res.cookie)
            message.success('登录成功');
            dispatch(getUserData(res.profile))
        }
    }
}

export const loginstatus = () => {
    return async (dispatch) => {
        const {data} = await loginStatus()
        const { profile } = data 
        dispatch(getUserData(profile))        
    }
}

export const logoutPatch = () => {
    return async (dispatch) => {
        const res = await logout()
        if(res){
            localStorage.removeItem('cookie')
            message.success('登出成功')
            dispatch(getUserData(null))
        }   
    }    
}

export const dailySigninPatch = () => {
    return async () => {
        const res = await dailySignin()
        if(res){
            message.success('签到成功')
        }           
    }    
}