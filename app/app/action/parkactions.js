import { createAction } from 'redux-actions';
import { Geolocation } from 'react-native-baidu-map';

export function getCurrentPosition_Send(dispatch) {
    Geolocation.getCurrentPosition().then(
        (data) => {
            dispatch(getCurrentPosition_Success(data))
        }
    ).catch(error => {
        getCurrentPosition_Error(error)
    })

    return {
        type: 'getCurrentPosition_Send'
    }
}

export function getCurrentPosition_Success(data) {
    return {
        type: 'getCurrentPosition_Success',
        position: data
    }
}

export function getCurrentPosition_Error(error) {
    return {
        type: 'getCurrentPosition_Error',
        error: error
    }
}