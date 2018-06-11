let initState = {
    isWeatherLoading: false,
    isWeatherError: false,
    isCityLoading: false,
    isCityError: false,
    city: '北京',
    weatherData: '',
    info: true,
    parkname: '',
    park1: false,
    park2: false,
    time: '',
    purse: 0
}

export function weatherReducer(oldState = initState, action) {
    switch (action.type) {
        case 'requestWeatherByName_Send':
            var obj = Object.assign({}, oldState, {
                isWeatherLoading: true,
                isWeatherError: false
            })
            return obj
        case 'requestWeatherByName_Success':
            var obj = Object.assign({}, oldState, {
                weatherData: action.weatherdata.weatherData,
                isWeatherLoading: true,
                isWeatherError: false
            })
            return obj
        case 'requestWeatherByName_Error':
            var obj = Object.assign({}, oldState, {
                isWeatherLoading: false,
                isWeatherError: true
            })
            return obj
        case 'getCurrentCity_Send':
            var obj = Object.assign({}, oldState, {
                isCityLoading: true,
                isCityError: false
            })
            return obj
        case 'getCurrentCity_Success':
            var obj = Object.assign({}, oldState, {
                city: action.city,
                isCityLoading: true,
                isCityError: false
            })
            return obj
        case 'getCurrentCity_Error':
            var obj = Object.assign({}, oldState, {
                isCityLoading: false,
                isCityError: true
            })
            return obj
        case 'closeMenu':
            var obj = Object.assign({}, oldState, {
                info: action.info
            })
            return obj
        case 'orderInfo':
            var obj = Object.assign({}, oldState, {
                parkname: action.info.parkname,
                park1: action.info.park1,
                park2: action.info.park2,
                time: action.info.time
            })
            return obj
        case 'purseBalance':
            var obj = Object.assign({}, oldState, {
                purse: action.data
            })
            return obj
    }
    return oldState
}