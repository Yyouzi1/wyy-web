import React from 'react'
import moment from 'moment'
// 渲染评价内容
const Index = ({ hotComments=[], newComments=[], total }) => {
    console.log(newComments);
    return (
        <div>
            {hotComments.length > 0 && (
                <div className="comment-wrap">
                    <p className="title">
                        热门评论<span className="number">({hotComments.length})</span>
                    </p>
                    {hotComments.map((item) => {
                        return (
                            <div className="comments-wrap" key={item.commentId}>
                                <div className="item">
                                    <div className="icon-wrap">
                                        <img src={item.user.avatarUrl} alt="" />
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content">
                                            <span className="name">{item.user.nickname}：</span>
                                            <span className="comment">{item.content}</span>
                                        </div>
                                        {item.beReplied.length > 0 && (
                                            <div className="re-content">
                                                <span className="name">
                                                    {item.beReplied[0].user.nickname}：
                          </span>
                                                <span className="comment">
                                                    {item.beReplied[0].content}
                                                </span>
                                            </div>
                                        )}

                                        <div className="date">
                                            {moment(item.time).format('YYYY-MM-DD')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {/* 最新评论 */}
            {newComments.length > 0 && (
                <div className="comment-wrap">
                    <p className="title">
                        最新评论<span className="number">({total})</span>
                    </p>
                    <div className="comments-wrap">
                        {newComments.map((item) => {
                            return (
                                <div className="item" key={item.commentId}>
                                    <div className="icon-wrap">
                                        <img src={item.user.avatarUrl} alt="" />
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content">
                                            <span className="name">{item.user.nickname}：</span>
                                            <span className="comment">{item.content}</span>
                                        </div>
                                        {item.beReplied.length > 0 && (
                                            <div className="re-content">
                                                <span className="name">
                                                    {item.beReplied[0].user.nickname}：
                          </span>
                                                <span className="comment">
                                                    {item.beReplied[0].content}
                                                </span>
                                            </div>
                                        )}

                                        <div className="date">
                                            {moment(item.time).format('YYYY-MM-DD')}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Index;