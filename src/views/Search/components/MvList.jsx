import React from 'react'
import { formatDuration, formatCount } from '../../../utils/format'
const Index = ({mvList,toMV}) => {
    return (
        <div className="items mv">
          {mvList.map((item) => {
            return (
              <div
                className="item"
                key={item.id}
                onClick={() => toMV(item.id)}
              >
                <div className="img-wrap">
                  <img src={item.cover} alt="" />
                  <span className="iconfont icon-play"></span>
                  <div className="num-wrap">
                    <div className="iconfont icon-play"></div>
                    <div className="num">{formatCount(item.playCount)}</div>
                  </div>
                  <span className="time">{formatDuration(item.duration)}</span>
                </div>
                <div className="info-wrap">
                  <div className="name">{item.name}</div>
                  <div className="singer">{item.artistName}</div>
                </div>
              </div>
            )
          })}
        </div>
      )
}
export default Index;