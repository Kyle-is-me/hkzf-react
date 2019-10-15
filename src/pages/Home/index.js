import React, { Component } from 'react'
//引入自己封装的axios
import axios from '../../utils/request'
import { baseURL } from '../../utils/url'
// 引入轮播图组件
import { Carousel } from 'antd-mobile';

// 引入局部样式
import indexCss from './index.module.scss'

// 引入本地图片
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

// 引入自定义搜索框
import SearchLocation from '../../component/searchLocation'

export default class index extends Component {
    state = {
        swiperList: [],
        imgHeight: 176,
        //导航数组
        navList: [
            { id: 1, imgSrc: nav1, text: '整租' },
            { id: 2, imgSrc: nav2, text: '合租' },
            { id: 3, imgSrc: nav3, text: '地图找房' },
            { id: 4, imgSrc: nav4, text: '去出租' }
        ],
        //租房小组
        rendList: [],
        //最新资讯
        newsList: []
    }

    componentDidMount() {
        //vue  mounted
        axios.get('/home/swiper')
            .then(res => {
                this.setState({
                    swiperList: res.data.body
                })
            })

        axios.get('/home/groups')
            .then(res => {

                this.setState({
                    rendList: res.data.body
                })
            })
        axios.get('/home/news')
            .then(res => {
                this.setState({
                    newsList: res.data.body
                })
            })
    }
    render() {
        return (
            <div>
                {/* 首页轮播图开始 */}
                {/* 有时候轮播图不会自动轮播，解决方法：让轮播图有数据的时候才渲染 */}
                <div className={indexCss.index_carousel}>
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
                    <div className={indexCss.index_search}>
                        <SearchLocation />
                    </div>
                </div>
                {/* 首页轮播图结束 */}

                {/* 导航栏开始 */}
                <nav className={indexCss.navbar}>
                    {this.state.navList.map(v =>
                        <div className={indexCss.navbar_item} key={v.id}>
                            <div className={indexCss.nav_img_wrap}>
                                <img src={v.imgSrc} alt='' />
                            </div>
                            <div className={indexCss.nav_text}>{v.text}</div>
                        </div>
                    )}
                </nav>

                {/* 导航栏结束 */}

                {/* 租房小组开始 */}
                <div className={indexCss.rend_team}>
                    <div className={indexCss.rend_team_title}>
                        <span>租房小组</span>
                        <span>更多</span>
                    </div>
                    <div className={indexCss.rend_team_content}>
                        {this.state.rendList.map(v =>
                            <div className={indexCss.rend_team_item} key={v.id}>
                                <div className={indexCss.rend_item_info}>
                                    <div className={indexCss.item_info_name}>{v.title}</div>
                                    <div className={indexCss.item_info_desc}>{v.desc}</div>
                                </div>
                                <div className={indexCss.rend_item_img_wrap}>
                                    <img src={baseURL + v.imgSrc} alt="" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* 租房小组结束 */}

                {/* 最新资讯开始 */}
                <div className={indexCss.current_news}>
                    <div className={indexCss.news_title}>
                        最新资讯
                    </div>
                    <div className={indexCss.news_content}>
                        {this.state.newsList.map(v =>
                            <div className={indexCss.news_item} key={v.id}>
                                <div className={indexCss.news_item_img_wrap}>
                                    <img src={baseURL + v.imgSrc} alt="" />
                                </div>
                                <div className={indexCss.news_item_info}>
                                    <div className={indexCss.news_item_desc}>{v.title}</div>
                                    <div className={indexCss.news_item_tool}>
                                        <span>{v.from}</span>
                                        <span>{v.date}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 最新资讯结束 */}
            </div>
        )
    }
}
