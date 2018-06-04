export function getCurrentCity_Send(dispatch, longitude, latitude) {
    let url = "http://restapi.amap.com/v3/geocode/regeo?output=JSON&location=" + `${longitude},${latitude}` + "&key=a83dc06f627f2c8a9adf5bc046883497&radius=1000&extensions=all";
    fetch(url)
        .then(
            (resp) => {
                return resp.json()
            }
        )
        .then(
            (response) => {
                dispatch(getCurrentCity_Success(response))
            }
        )
        .catch(
            (error) => {
                dispatch(getCurrentCity_Error(error))
            }
        )

    return {
        type: 'getCurrentCity_Send'    //定义action的类型
    }
}

export function getCurrentCity_Success(data) {
    return {
        type: 'getCurrentCity_Success',
        city: data.regeocode.addressComponent.city
    }
}

export function getCurrentCity_Error(error) {
    return {
        type: 'getCurrentCity_Error',
        error: error
    }
}

export function closeMenu(data) {
    return {
        type: 'closeMenu',
        info: data
    }
}

export function orderInfo(parkname, park1, park2, park3, park4, park5, time) {
    return {
        type: 'orderInfo',
        info: { parkname, park1, park2, park3, park4, park5, time }
    }
}