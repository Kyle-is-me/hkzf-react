import React, { Component } from 'react'
import searchCss from './index.module.scss'
// 引入redux仓库
import store from '../../store'

export default class index extends Component {
    state={
        cityName:''
    }
    constructor(){
        super()
        // console.log(store.getState())
        // 可能由bug =》异步代码和同步的关系
        // this.state.cityName = store.getState().cityName
        // 开启一个订阅
        store.subscribe(()=>{
            // 这个代码会在store发生修改的时候触发
            console.log(store.getState())
           this.setState({
               cityName:store.getState()
           }) 
            
        })
    }

    render() {
        
        return (
            <div>
                <div className={searchCss.search_bar}>
                    <div className={searchCss.search_input}>
                        <div className={searchCss.city_name}>
                            <span>{this.state.cityName}</span>
                            <i className="iconfont icon-arrow"></i>
                        </div>
                        <div className={searchCss.search_location}>
                            <i className="iconfont icon-seach"></i>
                            <span>请输入校区或地址</span>
                        </div>
                    </div>
                    <div className={searchCss.search_map}>
                        <i className="iconfont icon-map"></i>
                    </div>
                </div>
            </div>
        )
    }
}
