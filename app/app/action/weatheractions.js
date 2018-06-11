import { createAction } from 'redux-actions';

export function requestWeatherByName_Send(dispatch, name) {
    //获取城市天气情况
    fetch("https://free-api.heweather.com/v5/weather?key=19713447578c4afe8c12a351d46ea922&city=" + name, { timeout: 3000 })
        .then((response) => {//数据解析方式
            if (response.ok) {
                return response.json();
            }
        })
        .then((jsonData) => {
            dispatch(requestWeatherByName_Success(jsonData))
        })
        .catch((error) => {//错误信息处理
            dispatch(requestWeatherByName_Error(error))
        })

    return {
        type: 'requestWeatherByName_Send'
    }
}

export function requestWeatherByName_Success(data){
    //获取城市天气情况成功
    return {
        type: 'requestWeatherByName_Success',
        weatherdata:{
            weatherData:data.HeWeather5[0]
        }
    }
}

export function requestWeatherByName_Error(error){
    //获取城市天气情况失败
    return {
        type: 'requestWeatherByName_Error',
        error:error
    }
}