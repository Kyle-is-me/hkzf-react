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

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route render={()=><HKLayout ><Home/></HKLayout>} exact path="/"/>
          <Route render={()=><HKLayout ><List/></HKLayout>} exact path="/list"/>
          <Route render={()=><HKLayout ><News/></HKLayout>} exact path="/news"/>
          <Route render={()=><HKLayout ><My/></HKLayout>} exact path="/my"/>
          
        </Router>
      </div>
    )
  }
}

