import * as constants from './constants'
import { fromJS } from 'immutable';

// immutable库
// immutable对象
const defaultState = fromJS({
    // 用户数据
    userInfo: {},    
})
export default (state = defaultState, action) => {    
    switch (action.type) {
        // immutable对象的set方法,会结合之前immutable对象的值
        // 和设置的值,返回一个全新的对象
        case constants.GET_USERINFO:
            return state.set('userInfo', action.data)        
        default:
            return state
    }
}