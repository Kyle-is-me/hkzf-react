
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


export const BMap = window.BMap

export const BMAP_NORMAL_MAP = window.BMAP_NORMAL_MAP
export const BMAP_HYBRID_MAP = window.BMAP_HYBRID_MAP