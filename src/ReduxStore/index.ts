
import {combineReducers} from 'redux';
import GenericServiceReducer from './Generic/GenericeServiceReducer';


var servicReducer = new GenericServiceReducer()
export const rootReducer = combineReducers({
    serviceReducer: servicReducer.reducer
})

export type GlobalAppState = ReturnType<typeof rootReducer>;