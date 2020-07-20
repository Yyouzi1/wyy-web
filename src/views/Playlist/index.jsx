import React, { useState, useEffect } from 'react'
import Pagination from '../../components/Pagination'
import Comments from '../../components/Comments'
import { Tabs } from 'antd'
import moment from 'moment'
import { playlistDetail, hotComments, newComments } from '../../api/playlist'
import { formatDuration } from '../../utils/format'
import bus from '../../utils/bus'
const { TabPane } = Tabs
const Index = (props) => {
    const id = props.match.params.id
    const limit = 5
    const [title, setTitle] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [coverImgUrl, setCoverImgUrl] = useState('')
    const [signature, setSignature] = useState('')
    const [nickname, setNickname] = useState('')
    const [createTime, setCreateTime] = useState('')
    const [tags, setTags] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [HotComments, setHotComments] = useState([])
    const [NewComments, setNewComments] = useState([])
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        getPlaylistDetailData()
        getHotCommentsData()
        getNewCommentsData()
    }, [])
    const getPlaylistDetailData = async () => {
        const res = await playlistDetail({ id })

        if (res.data.code === 200) {
            setTableData(res.data.playlist.tracks)
            setTitle(res.data.playlist.name)
            setAvatarUrl(res.data.playlist.creator.avatarUrl)
            setCoverImgUrl(res.data.playlist.coverImgUrl)
            setSignature(res.data.playlist.creator.signature)
            setNickname(res.data.playlist.creator.nickname)
            setTags(res.data.playlist.tags)
            setCreateTime(moment(res.data.playlist.createTime).format('YYYY-MM-DD'))
        }
    }

    // 获取热门评论
    const getHotCommentsData = async () => {
        const res = await hotComments({ id })

        if (res.data.code === 200) {
            setHotComments(res.data.hotComments)
        }
    }

    // 获取最新评论
    const getNewCommentsData = async () => {
        const res = await newComments({
            id,
            offset: (page - 1) * limit,
        })

        if (res.data.code === 200) {
            setNewComments(res.data.comments)
            setTotal(res.data.total)
        }
    }

    const PlaylistDetail = () => {
        return (
            <div>
                <div className="top-wrap">
                    <div className="img-wrap">
                        <img src={coverImgUrl} alt="" />
                    </div>
                    <div className="info-wrap">
                        <p className="title">{title}</p>
                        <div className="author-wrap">
                            <img className="avatar" src={avatarUrl} alt="" />
                            <span className="name">{nickname}</span>
                            <span className="time">{createTime} 创建</span>
                        </div>
                        <div className="tag-wrap">
                            <span className="title">标签:</span>
                            <ul>
                                {tags.map((item) => {
                                    return <li key={item}>{item}</li>
                                })}
                            </ul>
                        </div>
                        <div className="desc-wrap">
                            <span className="title">简介:</span>
                            <span className="desc">{signature}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const playMusic = (id) => {
        bus.emit('playMusic', id)
    }

    const toMV = (id) => {
        props.history.push(`/mv/${id}`)
    }

    const onChange = (page) => {
        setPage(page)
        getNewCommentsData()

    }
    // 渲染播放列表  
    const PlaylistTable = () => {
        return (
            <table className="el-table playlit-table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>音乐标题</th>
                        <th>歌手</th>
                        <th>专辑</th>
                        <th>时长</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => {
                        return (
                            <tr className="el-table__row" key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div
                                        className="img-wrap"
                                        onClick={() => playMusic(item.id)}
                                    >
                                        <img src={item.al.picUrl} alt="" />
                                        <span className="iconfont icon-play"></span>
                                    </div>
                                </td>
                                <td>
                                    <div className="song-wrap">
                                        <div className="name-wrap">
                                            <span>{item.name}</span>
                                            {item.mv !== 0 && (
                                                <span
                                                    onClick={() => toMV(item.mv)}
                                                    className="iconfont icon-mv"
                                                ></span>
                                            )}
                                        </div>
                                        <span>{item.subTitle}</span>
                                    </div>
                                </td>
                                <td>{item.ar[0].name}</td>
                                <td>{item.al.name}</td>
                                <td>{formatDuration(item.dt)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
    return (
        <div className="playlist-container">
            {/* 渲染歌单信息 */}
            <PlaylistDetail />
            {/* 渲染Tab */}
            <Tabs defaultActiveKey="1">
                <TabPane tab="歌曲列表" key="1">
                    <PlaylistTable />
                </TabPane>
                <TabPane tab={`评论(${HotComments.length + total})`} key="2">
                    {/* 渲染评价信息 */}
                    <Comments hotComments={HotComments} newComments={NewComments} total={total} />
                    {/* 分页条 */}
                    <Pagination onChange={onChange} page={page} total={total} limit={limit} />
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Index;