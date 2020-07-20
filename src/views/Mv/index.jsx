import React, { useState, useEffect } from 'react'
import {
    getmvUrl,
    getsimiMV,
    getmvDetail,
    getartistInfo,
    gethotComments,
    getnewComments,
} from '../../api/mv'
import { formatCount,formatDuration } from '../../utils/format'
import Pagination from '../../components/Pagination'
import Comments from '../../components/Comments'
import bus from '../../utils/bus'
const Index = (props) => {
    // 每页数据
    const mvId = props.match.params.id
    const limit = 12
    const [mvUrl, setMvUrl] = useState('')
    const [simiMV, setSimiMV] = useState([])
    const [hotComments, setHotComments] = useState([])
    const [newComments, setNewComments] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [mvName, setMvName] = useState('')
    const [playCount, setPlayCount] = useState('')
    const [publishTime, setPublishTime] = useState('')
    const [desc, setDesc] = useState('')
    const [artistName, setArtistName] = useState('')
    const [artistCover, setArtistCover] = useState('')

    useEffect(() => {
        bus.emit('pauseMusic')
    }, [])

    useEffect(() => {
        getData()
    }, [mvId])

    const getData = () => {
        getMvUrlData()
        getSimiMVData()
        getMvDetailData()
        getHotCommentsData()
        getNewCommentsData()
    }
    // 获取MV的url
    const getMvUrlData = async () => {
        const res = await getmvUrl({
            id: mvId,
        })

        if (res.data.code === 200) {
            setMvUrl(res.data.data.url)
        }
    }

    // 获取相关推荐的MV列表数据
    const getSimiMVData = async () => {
        const res = await getsimiMV({
            mvid: mvId,
        })

        if (res.data.code === 200) {
            setSimiMV(res.data.mvs)
        }
    }

    // 获取MV详情数据
    const getMvDetailData = async () => {
        const res = await getmvDetail({
            mvid: mvId,
        })

        if (res.data.code === 200) {
            setMvName(res.data.data.name)
            setPlayCount(res.data.data.playCount)
            setPublishTime(res.data.data.publishTime)
            setDesc(res.data.data.desc)
            getArtistInfoData(res.data.data.artistId)
        }
    }

    // 获取艺术家信息
    const getArtistInfoData = async (artistId) => {
        const res = await getartistInfo({
            artistId,
        })

        if (res.data.code === 200) {
            setArtistName(res.data.artist.name)
            setArtistCover(res.data.artist.picUrl)
        }
    }

    // 获取热门评价数据
    const getHotCommentsData = async () => {
        const res = await gethotComments({
            id: mvId,
        })

        if (res.data.code === 200) {
            setHotComments(res.data.hotComments)
        }
    }

    // 获取最新评价数据
    const getNewCommentsData = async () => {
        const res = await getnewComments({
            id: mvId,
            offset: (page - 1) * limit,
            limit,
        })

        if (res.data.code === 200) {
            setNewComments(res.data.comments)
            setTotal(res.data.total)
        }
    }

    // 渲染MV详情信息
    const RenderMvInfo = () => {
        return (
            <div className="info-wrap">
                <div className="singer-info">
                    <div className="avatar-wrap">
                        <img src={artistCover} alt="" />
                    </div>
                    <span className="name">{artistName}</span>
                </div>
                <div className="mv-info">
                    <h2 className="title">{mvName}</h2>
                    <span className="date">发布：{publishTime}</span>
                    <span className="number">播放：{formatCount(playCount)}次</span>
                    <p className="desc">{desc}</p>
                </div>
            </div>
        )
    }
    // 渲染Mv视频播放器
    const MvVideo = () => {
        return (
            <div>
                <h3 className="title">mv详情</h3>
                <div className="video-wrap">
                    <video autoPlay controls src={mvUrl}></video>
                </div>
            </div>
        )
    }
    const toMV = (id) => {
        props.history.push(`/mv/${id}`)
    }
    // 渲染相关推荐
const Recommend = () => {
    return (
        <div>
            <h3 className="title">相关推荐</h3>
            <div className="mvs">
                {simiMV.map((item) => {
                    return (
                        <div className="items" key={item.id}>
                            <div className="item" onClick={() => toMV(item.id)}>
                                <div className="img-wrap">
                                    <img src={item.cover} alt="" />
                                    <span className="iconfont icon-play"></span>
                                    <div className="num-wrap">
                                        <div className="iconfont icon-play"></div>
                                        <div className="num">{formatCount(item.playCount)}</div>
                                    </div>
                                    <span className="time">
                                        {formatDuration(item.duration)}
                                    </span>
                                </div>
                                <div className="info-wrap">
                                    <div className="name">{item.name}</div>
                                    <div className="singer">{item.artistName}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
    const onChange = (page) => {
        setPage(page)
        getNewCommentsData()
    }

    return (
        <div className="mv-container">
            <div className="mv-wrap">
                {/* 渲染MV视频播放器 */}
                <MvVideo />
                {/* 渲染MV详情信息 */}
                <RenderMvInfo />
                {/* 渲染评价信息 */}
                <Comments hotComments={hotComments} newComments={newComments} total={total} />
                {/* 分页条 */}
                <Pagination onChange={onChange} page={page} total={total} limit={limit} />
            </div>
            <div className="mv-recommend">
                {/* 渲染相关推荐 */}
                <Recommend />
            </div>
        </div>
    )
}
export default Index;