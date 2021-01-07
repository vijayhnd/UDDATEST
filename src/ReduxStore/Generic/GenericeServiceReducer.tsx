import { IReducer } from "../IReducer";
import { ServiceState, ServiceRequestStatus } from "../ServiceState";
import { ServiceActionType } from "./GenericServiceActionType";
import { ServiceRequest, ServiceResponse, ServiceError, ServiceReset } from "../ActionKeys";
import AlertUtil from "../../Util/AlertUtil";

export default class GenericServiceReducer implements IReducer{

    reducer(state: ServiceState = {requestStatus: ServiceRequestStatus.Started}, action: ServiceActionType): ServiceState{
        switch(action.type){
            case ServiceRequest:
                return {requestStatus: ServiceRequestStatus.InProgress, 
                        listeners: action.listeners,
                        serviceKey: action.serviceKey}
            case ServiceResponse:
                return {requestStatus: ServiceRequestStatus.FinishedWithSuccess, 
                        response: action.response,
                        listeners: action.listeners,
                        serviceKey: action.serviceKey}
            case ServiceError:
                return {requestStatus: ServiceRequestStatus.FinishedWithError, 
                        error: action.error,
                        listeners: action.listeners,
                        serviceKey: action.serviceKey}
            case ServiceReset:
                return {requestStatus: ServiceRequestStatus.NotStarted, 
                        listeners: [''],
                        serviceKey: action.serviceKey}
            default:
                return state
        }
    }
}