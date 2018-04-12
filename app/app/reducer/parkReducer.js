let initState = {
    isParkLoading: false,
    isParkError: false,
    city: '北京',
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
        case 'getCurrentPosition_Send':
            var obj = Object.assign({}, oldState, {
                isParkLoading: true,
                isParkError: false
            })
            return obj
        case 'getCurrentPosition_Success':
            var obj = Object.assign({}, oldState, {
                city: action.position.data.city,
                zoom: 15,
                marker:{
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
        case 'getCurrentPosition_Error':
            var obj = Object.assign({}, oldState, {
                isParkLoading: false,
                isParkError: true
            })
            return obj
    }
    return oldState
}