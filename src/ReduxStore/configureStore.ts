import { createStore, applyMiddleware, compose } from 'redux';
const {logger} = require('redux-logger');
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './index';
import { serviceSaga } from './Generic/GenericServiceSaga';

const middlewares:any[] = [];

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);
    if (process.env.NODE_ENV === 'development') {
        middlewares.push(logger);
    }

    const middlewareEnhancer = applyMiddleware(...middlewares)
  
    const store = createStore(rootReducer,middlewareEnhancer);
    sagaMiddleware.run(serviceSaga);

    return store
  }