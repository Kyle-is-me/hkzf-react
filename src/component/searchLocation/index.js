import React, { Component } from 'react'
import searchCss from './index.module.scss'
// 引入redux仓库
import store from '../../store'

import { withRouter } from 'react-router-dom'

class index extends Component {
    state = {
        cityName: ''
    }
    constructor() {
        super()
        // console.log(store.getState())
        // 可能由bug =》异步代码和同步的关系
        // this.setState({
        //     cityName:store.getState().cityName
        // })
        this.state.cityName = store.getState().mapReducer.cityName
        // 开启一个订阅
        store.subscribe(() => {
            // 这个代码会在store发生修改的时候触发
            // console.log(store.getState())
            //    this.setState({
            //        cityName:store.getState().cityName
            //    }) 
            this.state.cityName = store.getState().mapReducer.cityName
        })
    }

    render() {

        return (
            <div>
                <div className={searchCss.search_bar}>
                    <div className={searchCss.search_input}>
                        <div className={searchCss.city_name} onClick={() => this.props.history.push('/citylist')}>
                            <span>{this.state.cityName === '' ? '获取中' : this.state.cityName}</span>
                            <i className="iconfont icon-arrow"></i>
                        </div>
                        <div className={searchCss.search_location}>
                            <i className="iconfont icon-seach"></i>
                            <span>请输入校区或地址</span>
                        </div>
                    </div>
                    <div className={searchCss.search_map} >
                        <div onClick={()=>this.props.history.push('/map')}>
                            <i className="iconfont icon-map"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(index)