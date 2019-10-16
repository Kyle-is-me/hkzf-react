import React, { Component } from 'react'

// 引入自己封装的tabbar组件
import HKLayout from './component/HKLayout'

// 引入路由
import {HashRouter as Router,Route} from 'react-router-dom'

// 引入页面组件
import Home from './pages/Home'
import List from './pages/List'
import News from './pages/News'
import My from './pages/My'
import CityList from './pages/cityList'

//引入封装的获取定位的方法
import {getLocalCity} from './utils/map'
// 引入store
import store  from './store'
import {mapCityName} from './store/actionCreator'



export default class App extends Component {
  componentDidMount(){

    //获取城市定位
     getLocalCity()
    .then((res)=>{
      // console.log(res.name)
      // 派发dispatch  修改store的数据
      store.dispatch(mapCityName(res.name==='全国'? '北京' : res.name))
    })
  }
  render() {
    return (
      <div>
        <Router>
          <Route render={()=><HKLayout ><Home/></HKLayout>} exact path="/"/>
          <Route render={()=><HKLayout ><List/></HKLayout>} exact path="/list"/>
          <Route render={()=><HKLayout ><News/></HKLayout>} exact path="/news"/>
          <Route render={()=><HKLayout ><My/></HKLayout>} exact path="/my"/>
          <Route component={CityList} path="/citylist"/>
        </Router>
      </div>
    )
  }
}

