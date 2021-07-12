import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { Swiper, Recommend, Mv, NewSong } from './components'
/* eslint-disable react-hooks/exhaustive-deps */
const Index = (props) => {
    const { getBannerList, getRecommendList, getNewSong, getMV } = props
    const { banners, mv, recommendList, newsong } = props
    useEffect(() => {
        getBannerList()
        getRecommendList()
        getNewSong()
        getMV()
    }, [])

    return (
        <div className="discovery-container">
            {/* 渲染轮播图 */}
            <Swiper banners={banners} />
            {/* 渲染推荐歌单 */}
            <Recommend recommendList={recommendList} history={props.history} />
            {/* 渲染最新音乐 */}
            <NewSong newsong={newsong} />
            {/* 渲染推荐MV */}
            <Mv mv={mv} history={props.history} />
        </div>
    )
}
const mapStateToProps = state => ({
    banners: state.getIn(['discovery', 'banners']),
    mv: state.getIn(['discovery', 'mv']),
    recommendList: state.getIn(['discovery', 'recommendList']),
    newsong: state.getIn(['discovery', 'newsong']),
})
const mapDispatchToProps = dispatch => {
    return {
        getBannerList() {
            dispatch(actionCreators.getBannerInfo())
        },
        getRecommendList() {
            dispatch(actionCreators.getRecommendInfo())
        },
        getNewSong() {
            dispatch(actionCreators.getNewsongInfo())
        },
        getMV() {
            dispatch(actionCreators.getMvInfo())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);