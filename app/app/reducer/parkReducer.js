let initState = {
    isLoading: false,
    isError: false,
    city: '北京',
    // mayType: MapTypes.NORMAL,
    zoom: 15,
    center: {
        longitude: 113.981718,
        latitude: 22.542449
    },
    trafficEnabled: false,
    baiduHeatMapEnabled: false,
    markers: [{
        longitude: 113.981718,
        latitude: 22.542449,
        title: "Window of the world"
    }, {
        longitude: 113.995516,
        latitude: 22.537642,
        title: ""
    }]
}

export function parkReducer(oldState = initState, action) {
    switch (action.type) {
        case 'getCurrentPosition_Send':
            var obj = Object.assign({}, oldState, {
                isLoading: true,
                isError: false
            })
            return obj
        case 'getCurrentPosition_Success':
            var obj = Object.assign({}, oldState, {
                city:action.position.data.city,
                zoom: 18,
                markers: [{
                    latitude: action.position.data.latitude,
                    longitude: action.position.data.longitude,
                    title: '我的位置'
                }],
                center: {
                    latitude: action.position.data.latitude,
                    longitude: action.position.data.longitude,
                },
                isLoading: true,
                isError: false
            })
            return obj
        case 'getCurrentPosition_Error':
            var obj = Object.assign({}, oldState, {
                isLoading: false,
                isError: true
            })
            return obj
    }
    return oldState
}