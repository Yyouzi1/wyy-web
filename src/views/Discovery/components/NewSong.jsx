import React from 'react'
import bus from '../../../utils/bus'
const Index = ({ newsong }) => {
    const playMusic = (id) => {
        bus.emit('playMusic', id)
    }
    return (
        <div className="news">
            <h3 className="title">最新音乐</h3>
            <div className="items">
                {newsong.map((item) => {
                    return (
                        <div className="item" key={item.id}>
                            <div className="img-wrap">
                                <img src={item.picUrl} alt="" />
                                <span
                                    onClick={() => playMusic(item.id)}
                                    className="iconfont icon-play"
                                ></span>
                            </div>
                            <div className="song-wrap">
                                <div className="song-name">{item.name}</div>
                                <div className="singer">{item.song.artists[0].name}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Index;