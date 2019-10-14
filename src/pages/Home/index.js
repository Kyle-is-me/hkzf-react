import React, { Component } from 'react'
//引入自己封装的axios
import axios from '../../utils/request'
import { baseURL } from '../../utils/url'
// 引入轮播图组件
import { Carousel } from 'antd-mobile';


// 引入本地图片
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'


export default class index extends Component {

    state = {
        swiperList: [],
        imgHeight: 176,
    }

    componentDidMount() {
        //vue  mounted
        axios.get('/home/swiper')
            .then(res => {
                this.setState({
                    swiperList: res.data.body
                })
            })
    }

    render() {
        return (
            <div>
                {/* 首页轮播图开始 */}
                {/* 有时候轮播图不会自动轮播，解决方法：让轮播图有数据的时候才渲染 */}
                {this.state.swiperList.length && <Carousel
                    autoplay
                    infinite
                // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                // afterChange={index => console.log('slide to', index)}
                >
                    {this.state.swiperList.map(val => (
                        <a
                            key={val.id}
                            href="http://www.alipay.com"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={baseURL + val.imgSrc}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                }

                {/* 首页轮播图结束 */}
            </div>
        )
    }
}
