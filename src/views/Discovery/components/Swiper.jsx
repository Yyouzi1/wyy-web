import React from 'react'
import Slider from 'react-slick'
const Index = ({ banners }) => {
    const settings = {
        className: 'center',
        // centerMode: true,
        infinite: true,
        speed: 500,
        autoplay: true,
    }
    return (
        <Slider {...settings}>
            {banners.map((item) => {
                return (
                    <div key={item.targetId}>
                        <img src={item.imageUrl} alt="" />
                    </div>
                )
            })}
        </Slider>
    )
}
export default Index;