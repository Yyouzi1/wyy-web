import React, { useState, useEffect } from 'react'
import { highquality, topList } from '../../api/playlists'
import { formatCount } from '../../utils/format'
import Pagination from '../../components/Pagination'
const Index = (props) => {
    const cats = ['全部',
        '欧美',
        '华语',
        '流行',
        '说唱',
        '摇滚',
        '民谣',
        '电子',
        '轻音乐',
        '影视原声',
        'ACG',
        '怀旧',
        '治愈',
        '旅行',]
    const limit = 12
    const [topName, setTopName] = useState('')
    const [topDesc, setTopDesc] = useState('')
    const [topCover, setTopCover] = useState('')
    const [selectIndex, setSelectIndex] = useState(0)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [topPlayLists, setTopPlayLists] = useState([])
    useEffect(() => {
        getHighqualityData()
        getTopPlayListsData()
    }, [])
    const getHighqualityData = async () => {
        const res = await highquality({
            cat: cats[selectIndex],
        })

        if (res.data.code === 200) {
            setTopName(res.data.playlists[0].name)
            setTopDesc(res.data.playlists[0].description)
            setTopCover(res.data.playlists[0].coverImgUrl)
        }
    }

    const getTopPlayListsData = async () => {
        const res = await topList({
            cat: cats[selectIndex],
            offset: (page - 1) * 10,
        })

        if (res.data.code === 200) {
            setTopPlayLists(res.data.playlists)
            setTotal(res.data.total)
        }
    }
    // 头部

    const TopCard = () => {
        return (
            <div className="top-card">
                <div className="icon-wrap">
                    <img src={topCover} alt="" />
                </div>
                <div className="content-wrap">
                    <div className="tag">精品歌单</div>
                    <div className="title">{topName}</div>
                    <div className="info">{topDesc}</div>
                </div>
                <img src={topCover} alt="" className="bg" />
                <div className="bg-mask"></div>
            </div>
        )
    }

    // 分类
    const Categories = () => {
        return (
            <div className="tab-bar">
                {cats.map((item, index) => {
                    return (
                        <span
                            className={index === selectIndex ? 'item active' : 'item'}
                            key={index}
                            onClick={() => changeCat(index)}
                        >
                            {item}
                        </span>
                    )
                })}
            </div>
        )
    }

    const TopPlayList = () => {

        return (
            <div className="tab-content">
                <div className="items">
                    {topPlayLists.map((item) => {
                        return (
                            <div
                                className="item"
                                key={item.id}
                                onClick={() => toPlayList(item.id)}
                            >
                                <div className="img-wrap">
                                    <div className="num-wrap">
                                        播放量:
                    <span className="num">{formatCount(item.playCount)}</span>
                                    </div>
                                    <img src={item.coverImgUrl} alt="" />
                                    <span className="iconfont icon-play"></span>
                                </div>
                                <p className="name">{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    const changeCat = (index) => {
        setSelectIndex(index)
        setPage(1)
        getTopPlayListsData()
    }

    const toPlayList = (id) => {
        props.history.push(`/playlist/${id}`)
    }

    const onChange = (page) => {
        setPage(page)
        getTopPlayListsData()

    }
    return (
        <div className="playlists-container">
            {/* 渲染头部 */}
            <TopCard />
            <div className="tab-container">
                {/* 渲染分类 */}
                <Categories />
                {/* 渲染列表 */}
                <TopPlayList />
                {/* 分页条 */}
                <Pagination onChange={onChange} page={page} total={total} limit={limit} />
            </div>
        </div>
    )
}
export default Index;