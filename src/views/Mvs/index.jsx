import React, { useState, useEffect } from 'react'
import { allMvs } from '../../api/mvs'
import Pagination from '../../components/Pagination'
import { formatCount } from '../../utils/format'
const Index = (props) => {
    // 区域列表
    const areas = ['全部', '内地', '港台', '欧美', '日本', '韩国']
    // 类型列表
    const types = ['全部', '官方版', '原声', '现场版', '网易出品']
    // 排序列表
    const orders = ['上升最快', '最热', '最新']
    // 每页数据
    const limit = 12
    const [areaIndex, setAreaIndex] = useState(0)
    const [typeIndex, setTypeIndex] = useState(0)
    const [orderIndex, setOrderIndex] = useState(0)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [mvList, setMvList] = useState([])

    const getMvListData = async () => {

        const res = await allMvs({
            area: areas[areaIndex],
            type: types[typeIndex],
            order: orders[orderIndex],
            offset: (page - 1) * 12,
            limit: 12,
        })

        if (res.data.code === 200) {
            setMvList(res.data.data)
            setTotal(res.data.count || total)
        }
    }
    useEffect(() => {
        getMvListData()
    }, [])


    const RenderCondition = () => {
        const changeArea = (index) => {
            setPage(1)
            setAreaIndex(index)
            getMvListData()
        }

        const changeType = (index) => {
            setTypeIndex(index)
            setPage(1)
            getMvListData()
        }

        const changeOrder = (index) => {
            setOrderIndex(index)
            setPage(1)
            getMvListData()
        }
        return (
            <div className="filter-wrap">
                <div className="seciton-wrap">
                    <span className="section-type">地区:</span>
                    <ul className="tabs-wrap">
                        {areas.map((item, index) => {
                            return (
                                <li className="tab" key={item}>
                                    <span
                                        className={index === areaIndex ? 'title active' : 'title'}
                                        onClick={() => changeArea(index)}
                                    >
                                        {item}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="type-wrap">
                    <span className="type-type">类型:</span>
                    <ul className="tabs-wrap">
                        {types.map((item, index) => {
                            return (
                                <li className="tab" key={item}>
                                    <span
                                        className={index === typeIndex ? 'title active' : 'title'}
                                        onClick={() => changeType(index)}
                                    >
                                        {item}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="order-wrap">
                    <span className="order-type">排序:</span>
                    <ul className="tabs-wrap">
                        {orders.map((item, index) => {
                            return (
                                <li className="tab" key={item}>
                                    <span
                                        className={index === orderIndex ? 'title active' : 'title'}
                                        onClick={() => changeOrder(index)}
                                    >
                                        {item}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
    const onChange = (page) => {
        setPage(page)
        getMvListData()
    }
    // mv列表渲染
    const MvList = () => {
        const toMv = (id) => {
            props.history.push(`/mv/${id}`)
        }
        return (
            <div className="items">
                {mvList.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="item"
                            onClick={() => toMv(item.id)}
                        >
                            <div className="img-wrap">
                                <img src={item.cover} alt="" />
                                <div className="num-wrap">
                                    <div className="iconfont icon-play"></div>
                                    <div className="num">{formatCount(item.playCount)}</div>
                                </div>
                            </div>
                            <div className="info-wrap">
                                <div className="name">{item.name}</div>
                                <div className="singer">{item.artisetName}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
        <div className="mvs-container">
            {/* 渲染条件 */}
            <RenderCondition />
            {/* 渲染列表内容和分页条 */}
            <div className="mvs">
                {/* mv列表 */}
                <MvList />
                {/* 分页条 */}
                <Pagination onChange={onChange} page={page} total={total} limit={limit} />
            </div>
        </div>
    )
}
export default Index;