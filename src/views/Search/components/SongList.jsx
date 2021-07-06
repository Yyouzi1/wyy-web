import React from 'react'
import { formatDuration } from '../../../utils/format'
import bus from '../../../utils/bus'
// 渲染歌曲列表
const Index = ({ songList, rowDbclick, toMV }) => {
  const playMusic = (id) => {
    bus.emit('playMusic', id)
  }
  return (
    <table className="el-table">
      <thead>
        <tr>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </tr>
      </thead>
      <tbody>
        {songList.map((item, index) => {
          return (
            <tr
              className="el-table__row"
              key={item.id}
              onDoubleClick={() => rowDbclick(item.id)}
            >
              <td>{index + 1}</td>
              <td>
                <div className="song-wrap">
                  <div className="name-wrap">
                    
                    <span className="name" onClick={() => playMusic(item.id)}>{item.name}</span>

                    {item.mvid !== 0 && (
                      <span
                        className="iconfont icon-mv"
                        onClick={() => toMV(item.mvid)}
                      ></span>
                    )}
                  </div>
                  {item.alias.length !== 0 && (
                    <span className="sub-name">{item.alias[0]}</span>
                  )}
                </div>
              </td>
              <td>{item.artists[0].name}</td>
              <td>{item.album.name}</td>
              <td>{formatDuration(item.duration)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default Index;