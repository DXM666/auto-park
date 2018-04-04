import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { AutoApp } from './App';
import { parkReducer } from '../app/app/reducer/parkReducer'
import { configureStore } from './app/store/ConfigureStore'

const store = createStore(parkReducer);

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AutoApp />
            </Provider>
        )
    }
}