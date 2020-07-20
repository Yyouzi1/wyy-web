import React from 'react'
import { Pagination } from 'antd'
// 分页条渲染
const Index = ({ page, onChange, total, limit }) => {
    const handleChange = (page) => {
        onChange(page)
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <Pagination
                current={page}
                onChange={handleChange}
                total={total}
                pageSize={limit}
                showSizeChanger={false}
            />
        </div>
    )
}
export default Index;