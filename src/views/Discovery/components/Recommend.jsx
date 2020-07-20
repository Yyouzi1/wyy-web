import React from 'react'
const Index = ({ recommendList,history }) => {
    const toPlayList = (id) => {
        history.push(`/playlist/${id}`)
    }
    return (
        <div className="recommend">
            <h3 className="title">推荐歌单</h3>
            <div className="items">
                {recommendList.map((item) => {
                    return (
                        <div key={item.id} className="item">
                            <div
                                className="img-wrap"
                                onClick={() => toPlayList(item.id)}
                            >
                                <div className="desc-wrap">
                                    <span className="desc">{item.copywriter}</span>
                                </div>
                                <img src={item.picUrl} alt="" />
                                <span className="iconfont icon-play"></span>
                            </div>
                            <p className="name">{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Index;