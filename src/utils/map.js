
/**
 *  获取本地城市
 * 
 */ 
export const getLocalCity = () => {
    return new Promise((resolve, reject) => {
     
        var myCity = new window.BMap.LocalCity();

        myCity.get(function (result) {
          
            resolve(result)
        });
    })
}