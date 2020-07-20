import * as constants from './constants'
import {
    getBannerList,
    getRecommendlist,
    getNewsong,
    getMv,
} from '../../../api/discovery'

const getBannerData = (data) => ({
    type: constants.GET_BANNER_DATA,
    data
})
const getRecommendData = (data) => ({
    type: constants.GET_RECOMMEND_DATA,
    data
})
const getNewsongData = (data) => ({
    type: constants.GET_NEWSONG_DATA,
    data
})
const getMvData = (data) => ({
    type: constants.GET_MV_DATA,
    data
})

export const getBannerInfo = () => {
    return async (dispatch) => {
        const res = await getBannerList()
        if (res.data.code === 200) {
            dispatch(getBannerData(res.data.banners))
        }

    }
}
export const getRecommendInfo = () => {
    return async (dispatch) => {
        const res = await getRecommendlist()
        if (res.data.code === 200) {
            dispatch(getRecommendData(res.data.result))
        }

    }
}
export const getNewsongInfo = () => {
    return async (dispatch) => {
        const res = await getNewsong()
        if (res.data.code === 200) {
            dispatch(getNewsongData(res.data.result))
        }

    }
}
export const getMvInfo = () => {
    return async (dispatch) => {
        const res = await getMv()
        if (res.data.code === 200) {
            dispatch(getMvData(res.data.result))
        }

    }
}