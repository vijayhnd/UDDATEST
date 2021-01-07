import { IState } from "../Components/IState";
import { IServiceResponse } from "../Services/Core/IServiceResponse";
import { UDDAError } from "../Entities";

export enum ServiceRequestStatus{
    NotStarted = 0,
    Started = 1,
    InProgress,
    FinishedWithSuccess,
    FinishedWithError
}
export interface ServiceState extends IState{
    requestStatus?: ServiceRequestStatus
    response?: IServiceResponse
    error?: UDDAError
    listeners?: [string]
    serviceKey?: string
}