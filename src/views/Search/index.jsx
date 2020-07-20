import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import Pagination from '../../components/Pagination'
import { search } from '../../api/search'
import { SongList, PlayList, MvList } from './components'
import bus from '../../utils/bus'
const { TabPane } = Tabs
const Index = (props) => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(15)
    const [total, setTotal] = useState(0)
    const [type, setType] = useState('1')
    const [songList, setSongList] = useState([])
    const [playList, setPlayList] = useState([])
    const [mvList, setMvList] = useState([])
    const keyword = props.match.params.keyword

    useEffect(() => {
        getSearchResultData()
    }, [keyword])
    const getSearchResultData = async () => {
        const res = await search({
            keywords: keyword,
            type,
            limit,
            offset: (page - 1) * limit,
        })

        if (res.data.code === 200) {
            switch (type) {
                case '1': // 歌曲
                    setSongList(res.data.result.songs)
                    setTotal(res.data.result.songCount)
                    break
                case '1000': // 歌单
                    setPlayList(res.data.result.playlists)
                    setTotal(res.data.result.playlistCount)
                    break
                case '1004': // MV
                    setMvList(res.data.result && res.data.result.mvs)
                    setTotal(res.data.result.mvCount)
                    break
                default:
                    break
            }
        }
    }
    const changeType = (key) => {
        setType(key)
        setPage(1)
        setLimit(key === '1004' ? 12 : 15)
        getSearchResultData()

    }
    const onChange = (page) => {
        setPage(page)
        getSearchResultData()
    }
    const toPlaylist = (id) => {
        props.history.push(`/playlist/${id}`)
    }

    const rowDbclick = (id) => {
        bus.emit('playMusic', id)
    }
    const toMV = (id) => {
        props.history.push(`/mv/${id}`)
    }
    return (
        <div className="result-container">
            <div className="title-wrap">
                <h2
                    style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '1.5em' }}
                    className="title"
                >
                    {keyword}
                </h2>
                <span className="sub-title">找到{total}个结果</span>
            </div>
            <Tabs defaultActiveKey="1" onChange={changeType}>
                <TabPane tab="歌曲" key="1">
                    {songList.length > 0 && <SongList songList={songList} rowDbclick={rowDbclick} toMV={toMV} />}
                </TabPane>
                <TabPane tab="歌单" key="1000">
                    {playList.length > 0 && <PlayList playList={playList} toPlaylist={toPlaylist} />}
                </TabPane>
                <TabPane tab="MV" key="1004">
                    {mvList && mvList.length > 0 && <MvList mvList={mvList} toMV={toMV} />}
                </TabPane>
            </Tabs>
            {/* 分页条 */}
            <Pagination onChange={onChange} page={page} total={total} limit={limit} />

        </div>
    )
}
export default Index;