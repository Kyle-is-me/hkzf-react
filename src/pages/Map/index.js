import React, { Component } from 'react'
import { NavBar, Icon,Toast } from 'antd-mobile';
import store from '../../store'
import axios from '../../utils/request'
// 引入样式
import mapCss from './map.module.scss'
import { BMap } from '../../utils/map'


/* 
1 根据城市定位 写好
2 根据城市 获取 城市下的房源信息 
  1 先获取该城市下的id /area/info?name=上海 => "AREA|dbf46d32-7e76-1196"
  2 根据 id 去获取该城市下的  房源数据  /area/map?id=AREA%7Cdbf46d32-7e76-1196
    返回数组 
3 找一下百度地图 画 自定义（标签，控件 组件 覆盖物 。。。） 等。。功能
 */



// 4.分析点击逻辑，最多三成数据
// [
//     {id:0,level:1,zoom:11,className:'circle',last:false},
//     {id:1,level:2,zoom:14,className:'circle',last:false},
//     {id:2,level:3,zoom:17,className:'rect',last:true}
// ]

// 5闭包的实现---自调用函数
// const ZoomFunc = (() => {
//     let list = [
//         { id: 0, level: 1, zoom: 11, className: 'circle', last: false },
//         { id: 1, level: 2, zoom: 14, className: 'circle', last: false },
//         { id: 2, level: 3, zoom: 17, className: 'rect', last: true }
//     ]
//     let index = -1;
//     let getZoom = ()=>{
//         index ++;
//         if(index>2){
//             index = 0
//         }
//         return list[index]
//     }
//     return getZoom
// })()





export default class index extends Component {

    Map = null

    // ZoomFunc = (() => {
    //     let list = [
    //         { id: 0, level: 1, zoom: 11, className: 'circle', last: false },
    //         { id: 1, level: 2, zoom: 14, className: 'circle', last: false },
    //         { id: 2, level: 3, zoom: 17, className: 'rect', last: true }
    //     ]
    //     let index = -1;
    //     let getZoom = () => {
    //         index++;
    //         if (index > 2) {
    //             index = 0
    //         }
    //         return list[index]
    //     }
    //     return getZoom
    // })()
    ZoomList = [
        { id: 0, level: 1, zoom: 13, className: 'circle', last: false },
        { id: 1, level: 2, zoom: 16, className: 'circle', last: false },
        { id: 2, level: 3, zoom: 19, className: 'rect', last: true }
    ]
    cityIndex = 0

    constructor() {
        super()

        let cityName = store.getState().cityName

        if (!cityName) {
            store.subscribe(() => {
                cityName = store.getState().mapReducer.cityName
                // console.log(cityName)
                this.renderMain(cityName)
            })
        }
    }


    componentDidMount() {
        let cityName = store.getState().mapReducer.cityName
        if (cityName) {

            this.renderMain(cityName)
        }
    }

    // 页面要加载的地图内容
    renderMain = (cityName) => {
        
        // 百度地图API功能
        let map = new BMap.Map("allmap");    // 创建Map实例
        this.Map = map
        map.centerAndZoom(cityName);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件   
        //  比例尺
        map.addControl(new BMap.ScaleControl());
        //  放大缩小的组件
        map.addControl(new BMap.NavigationControl());
        //渲染城市房源
        this.renderCity({ label: cityName, value: null })


    }

    // 渲染城市房源
    renderCity = async (cityObj) => {


        // 发送请求获取数据
        // 1获取城市的id
        let id = cityObj.value
        // 如果id不存，就要获取id,第一次没有id，需要获取，第二三层都有id
        if (!id) {
            id = (await axios.get('/area/info?name=' + cityObj.label)).data.body.value
        }

        // console.log(id)
        //2 获取房源信息
        let houseList = (await axios.get('/area/map?id=' + id)).data.body
        console.log(houseList)
        //3 遍历房源数组，画每一个小区的房源信息
        houseList.forEach(v => {
            const point = new BMap.Point(v.coord.longitude, v.coord.latitude)
            // label标签是支持html个的字符串
            const htmlStr = `<div class="${mapCss.house_box + " " + mapCss[this.ZoomList[this.cityIndex].className]}"><span>${v.label}</span>  <span>${v.count}套</span></div>`
            const label = this.addTextLabel(point, htmlStr)
            //4 绑定点击事件
            label.addEventListener('click', () => {
                if (this.ZoomList[this.cityIndex].last) {
                    // 最后一层  ，加载被点击的房源
                    console.log('加载被点击的房源')
                } else {
                    this.Map.centerAndZoom(point, this.ZoomList[this.cityIndex].zoom)
                    this.cityIndex ++;
                    this.renderCity(v)
                    setTimeout(() => {
                        this.Map.clearOverlays()
                    }, 10)
                }

            })
            //4 把文本描绘到地图上
            this.Map.addOverlay(label);
            
        });

    }

    // 添加文字标签
    addTextLabel = (point, content) => {
        var opts = {
            position: point,    // 指定文本标注所在的地理位置
            offset: new BMap.Size(30, -30)    //设置文本偏移量
        }
        var label = new BMap.Label(content, opts);  // 创建文本标注对象
        label.setStyle({
            background: "rgba(0,0,0,0)",
            border: "none"
        });

        return label
    }

    render() {
        return (
            <div>
                {/* 导航栏开始 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >地图选房</NavBar>
                {/* 导航栏结束 */}
                {/* 地图开始 */}
                <div id="allmap" className={mapCss.allmap}></div>
                {/* 地图结束 */}
            </div>
        )
    }
}
