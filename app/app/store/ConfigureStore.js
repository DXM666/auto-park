import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { parkReducer } from '../reducer/parkReducer';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store;
}
