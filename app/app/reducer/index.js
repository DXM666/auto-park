import { combineReducers } from 'redux';

import { parkReducer } from './parkReducer';
import { weatherReducer } from './weatherReducer';

export const Reducer = combineReducers({
    parkReducer,
    weatherReducer
})