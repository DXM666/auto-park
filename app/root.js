import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { AutoApp } from './App';
import { Reducer } from '../app/app/reducer/index'
import { configureStore } from './app/store/ConfigureStore'

const store = createStore(Reducer);    //根据已有reducer创建store

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AutoApp />
            </Provider>
        )
    }
}