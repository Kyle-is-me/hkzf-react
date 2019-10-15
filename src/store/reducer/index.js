
// 根管理员  负责合并所有的管理员

// 引入一个合并管理员的方法
import  {combineReducers} from 'redux'

// 引入其他管理员
import mapReducer from './mapReducer'


// 合并管理员

export default combineReducers({mapReducer})