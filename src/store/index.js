import { createStore } from "redux";
import reducer from './reducer/mapReducer'

// 创建仓库，并设置谷歌浏览器插件
let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



export default store