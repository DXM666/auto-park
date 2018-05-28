let initState = {
    isParkLoading: false,
    isParkError: false,
    city: '昆明 ',
    // mayType: MapTypes.NORMAL,
    zoom: 15,
    center: {
        longitude: 113.981718,
        latitude: 22.542449
    },
    marker:null,
}

export function parkReducer(oldState = initState, action) {
    switch (action.type) {
        case 'getCurrentPosition_Send':    //发送获取位置请求
            var obj = Object.assign({}, oldState, {
                isParkLoading: true,    //数据正在请求
                isParkError: false    //数据请求失败
            })
            return obj
        case 'getCurrentPosition_Success':    //发送请求成功
            var obj = Object.assign({}, oldState, {
                city: action.position.data.city,
                zoom: 15,
                marker:{    //用户位置
                    latitude: action.position.data.latitude,
                    longitude: action.position.data.longitude,
                    title: '我的位置'
                },
                center: {
                    latitude: action.position.data.latitude,
                    longitude: action.position.data.longitude,
                },
                isParkLoading: true,
                isParkError: false
            })
            return obj
        case 'getCurrentPosition_Error':    //发送求情失败
            var obj = Object.assign({}, oldState, {
                isParkLoading: false,
                isParkError: true
            })
            return obj
    }
    return oldState
}