import React from 'react'
import { formatCount } from '../../../utils/format'
// 渲染歌单列表
const Index = ({ playList, toPlaylist }) => {
    return (
        <div className="items">
            {playList.map((item) => {
                return (
                    <div
                        className="item"
                        key={item.id}
                        onClick={() => toPlaylist(item.id)}
                    >
                        <div className="img-wrap">
                            <div className="num-wrap">
                                播放量:
                  <span className="num">{formatCount(item.playCount)}</span>
                            </div>
                            <img src={item.coverImgUrl} alt="" />
                            <span className="iconfont icon-play"></span>
                        </div>
                        <p className="name">{item.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default Index;