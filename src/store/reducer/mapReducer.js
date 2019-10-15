
import {MAP_CITY_NAME_SET} from '../actionTypes/index'

//设置默认值
let defaultValue = {
    cityName:''
}

//暴露函数
export default  (state=defaultValue,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case MAP_CITY_NAME_SET:
        return newState.cityName = action.value
        break
        default:
            return state
    }
    return newState
}