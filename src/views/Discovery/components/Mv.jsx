import React from 'react'
const Index = ({ mv,history }) => {
    const toMv = (id) => {
        history.push(`/mv/${id}`)
    }
    return (
        <div className="mvs">
            <h3 className="title">推荐MV</h3>
            <div className="items">
                {mv.map((item) => {
                    return (
                        <div className="item" key={item.id}>
                            <div className="img-wrap" onClick={() => toMv(item.id)}>
                                <img src={item.picUrl} alt="" />
                                <span className="iconfont icon-play"></span>
                                <div className="num-wrap">
                                    <div className="iconfont icon-play"></div>
                                    <div className="num">{item.playCount}</div>
                                </div>
                            </div>
                            <div className="info-wrap">
                                <div className="name">{item.copywriter}</div>
                                <div className="singer">{item.artistName}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Index;