let initState = {
    isWeatherLoading: false,
    isWeatherError: false,
    city: '昆明',
    weatherData:''
}

export function weatherReducer(oldState = initState, action) {
    switch (action.type) {
        case 'getCurrentPosition_Send':
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
    }
    return oldState
}