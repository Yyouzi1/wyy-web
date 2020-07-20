import * as constants from './constants'
import { fromJS } from 'immutable';

// immutable库
// immutable对象
const defaultState = fromJS({
    // 轮播图
    banners: [],
    // 推荐歌单
    recommendList: [],
    // 新歌
    newsong: [],
    // mv
    mv: [],
})
export default (state = defaultState, action) => {
    switch (action.type) {
        // immutable对象的set方法,会结合之前immutable对象的值
        // 和设置的值,返回一个全新的对象
        case constants.GET_BANNER_DATA:
            return state.set('banners', action.data)
        case constants.GET_RECOMMEND_DATA:
            return state.set('recommendList', action.data)
        case constants.GET_NEWSONG_DATA:
            return state.set('newsong', action.data)
        case constants.GET_MV_DATA:
            return state.set('mv', action.data)
        default:
            return state
    }
}