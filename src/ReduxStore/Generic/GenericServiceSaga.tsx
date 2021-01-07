import { put, takeEvery } from 'redux-saga/effects'
import ServiceAction from './GenericeServiceAction';
import { ServiceRequest } from '../ActionKeys';
import { ServiceActionType } from './GenericServiceActionType';
import { UDDAError } from '../../Entities';
import AlertUtil from '../../Util/AlertUtil';
import ServiceFactory from '../../Services/Core/ServiceFactory';

function* serviceWatch(action: ServiceActionType){
    if (action.type === ServiceRequest){
        try {
            var service = ServiceFactory.createService(action.serviceType)
            const response = yield service!.execute(action.serviceKey,action.request!)
            var serviceAction = new ServiceAction()
            if(action.parser){
                const parsedResponse = action.parser.parse(response)
                yield put(serviceAction.response(parsedResponse,action.listeners!,action.serviceKey))
            }else{
                yield put(serviceAction.response(response,action.listeners!,action.serviceKey))
            }
        } catch (error) {
            var serviceAction = new ServiceAction()
            yield put(serviceAction.error(new UDDAError(0,error.message), action.listeners!,action.serviceKey))
        }
    }
}
export function* serviceSaga(){
    yield takeEvery(ServiceRequest, serviceWatch)
}