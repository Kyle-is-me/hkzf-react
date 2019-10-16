import React, { Component } from 'react'

import { NavBar, Icon } from 'antd-mobile';

import store from '../../store'
import axios from '../../utils/request'

import { List } from 'react-virtualized';
import indexCss from './index.module.scss'
/*
1.发送请求拿到数据
    1.获取当前城市 redux
    2.获取热门城市  接口有
    3.获取 所有城市
2.获取当前城市的时间的区别
    1.先打开首页
        1.在首页打开期间，已经获取到了真实的城市数据并修改到redux中
    2.先打开城市选择
        1.触发了constructor中的对store的订阅 =》订阅的回调不会触发
        (订阅中的回调函数 只有在store发生了改变的时候才会触发)
3.总结：
    1.如果先在首页中打开
        直接城市选择页面直接获取 当前城市
    2.如果先开打城市选择 需要开启订阅

*/
// List data as an array of strings






export default class index extends Component {
    state = {
        // 界面要显示的城市数组
        totalCity: [], //[{'当前城市':[]},{"热门城市":["北京"，"广州"]}......]
        letterList:[], //右边要用的字母数组
        currentIndex:0 //当前索引
    }

    constructor() {

        super()
        //创建一个长列表的ref
        this.MainListRef = React.createRef()

        // 1.获取当前城市
        let cityName = store.getState().cityName
        if (cityName) {
            // redux中已经存在值，说明从首页打开
            // console.log(cityName)
            this.getAllCity(cityName)
        } else {
            store.subscribe(() => {
                cityName = store.getState().cityName
                this.getAllCity(cityName)
            })
        }
    }


    // 获取和设置城市的方法
    async getAllCity(cityName) {
        // 0 定义字母数组
        let letterList = ["#","热"]

        // 1.获取所有城市
        let allCtiy = (await axios.get('/area/city?level=1')).data.body
        // 2.获取热门城市
        let hotCity = (await axios.get('/area/hot')).data.body
        // console.log(hotCity)
        // 3.获取当前城市
        // console.log(cityName)
        // 4.最终城市数组
        let finallCity = [
            { "当前城市": [cityName] },
            { "热门城市": hotCity.map(v => v.label) }
        ]
        // console.log(finallCity)

        // 5.所有城市排序
        allCtiy = allCtiy.sort((a, b) => {
            return a.short.localeCompare(b.short)
        })
        
        // 6.结合所有数据
        allCtiy.forEach((v, i) => {
            const firstLetter = v.short[0].toUpperCase()
            // 判断里面最终数组里面是否含有相应的key
            const index = finallCity.findIndex(vv => vv[firstLetter])
            if (index === -1) {
                //没有对应的键名
                finallCity.push({ [firstLetter]: [v.label] })
                // 将字母推进字母数组
                letterList.push(firstLetter)
            } else {
                //已经存在
                finallCity[index][firstLetter].push(v.label)
            }
        })
        // console.log(finallCity)
        this.setState({
            totalCity: finallCity,
            letterList
        })

    }

    //城市列表插件===每一行城市如何渲染
    rowRenderer = ({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
    }) => {
        const title = Object.keys(this.state.totalCity[index])[0]
        const item = this.state.totalCity[index] //每一行的城市数组
        return (
            <div
                key={key}
                style={style}
            >
                <div className={indexCss.cityList_item}>
                    <div className={indexCss.item_name}>
                        {title}
                    </div>
                    <div className={indexCss.city_item_content}>
                        {item[title].map((v,i) => <div className={indexCss.city_name} key={v}>{v}</div>)}
                    </div>
                </div>
            </div>
        )
    }

    // 设置每一行的高度
    rowHeight=({ index})=>{
        // 每行的高度 = 标题的高度 + 标题下的数组的长度*每一个的高度
        // 标题的高度 = 每一个的高度
        //  （标题下的数组长度+1）*每个高度
        let item  = this.state.totalCity[index]
        // ['热门城市'] keyList = '热门城市'
        let keyList = Object.keys(item)[0]
        
        return (item[keyList].length+1)*40
    }

    //右侧滚动到事件
    onRowsRendered=({  startIndex })=>{
        if(this.state.currentIndex !== startIndex){
            this.setState({
                currentIndex:startIndex
            })
        }
    }

    // 右侧鼠标点击事件，传递索引
    handleClick=(index)=>{
       
        this.setState({
            currentIndex:index
        })
        this.MainListRef.current.scrollToRow (index)
    }

    render() {

        return (
            <div>
                {/* 导航栏开始 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}

                >城市选择</NavBar>
                {/* 导航栏结束 */}

                {/* 城市列表开始 */}
                <div className={indexCss.city_list}>
                    {/* 右侧字母列表开始 */}
                    <div className={indexCss.letter_list}>
                        {this.state.letterList.map((v,i)=><div key={v} className={(this.state.currentIndex===i)? (indexCss.letter_item + "  " +indexCss.active) : (indexCss.letter_item)}
                        onClick={this.handleClick.bind(this,i)}
                        >{v}</div>)}
                    </div>
                    {/* 右侧字母列表结束 */}
                    <List
                        ref={this.MainListRef}
                        width={document.body.offsetWidth}
                        height={window.screen.availHeight-45}
                        rowCount={this.state.totalCity.length}
                        rowHeight={this.rowHeight}
                        rowRenderer={this.rowRenderer} 
                        onRowsRendered={this.onRowsRendered}
                        // scrollToIndex={this.state.currentIndex}
                        scrollToAlignment={'start'}
                    />
                </div>
                {/* 城市列表结束 */}
            </div>
        )
    }
}
