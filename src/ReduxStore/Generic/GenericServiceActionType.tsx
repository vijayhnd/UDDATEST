import { IAction } from "../IAction";
import { ServiceRequest, ServiceResponse, ServiceError, ServiceReset } from "../ActionKeys";
import { IServiceRequest } from "../../Services/Core/IServiceRequest";
import { IServiceResponse } from "../../Services/Core/IServiceResponse";
import { UDDAError } from "../../Entities";
import { IServiceResponseParser } from "../../Services/Core/IServiceResponseParser";
import { ServiceType } from "../../Services/Core/ServiceFactory";

interface ServiceRequestActionType extends IAction{
    type: typeof ServiceRequest
    request?: IServiceRequest
    serviceType: ServiceType
    serviceKey: string
    parser?: IServiceResponseParser
    listeners?: [string]
}

interface ServiceResponseActionType extends IAction{
    type: typeof ServiceResponse
    response: IServiceResponse
    listeners: [string]
    serviceKey?: string
}

interface ServiceErrorActionType extends IAction{
    type: typeof ServiceError
    error: UDDAError
    listeners: [string]
    serviceKey?: string
}

interface ServiceResetActionType extends IAction{
    type: typeof ServiceReset
    serviceKey?: string
}

export type ServiceActionType = ServiceRequestActionType | ServiceResponseActionType | ServiceErrorActionType | ServiceResetActionType