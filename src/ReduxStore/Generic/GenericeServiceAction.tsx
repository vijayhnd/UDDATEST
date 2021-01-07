import { IServiceRequest } from "../../Services/Core/IServiceRequest";
import { ServiceActionType } from "./GenericServiceActionType";
import { ServiceRequest, ServiceResponse, ServiceError, ServiceReset } from "../ActionKeys";
import { UDDAError } from "../../Entities";
import { IServiceResponseParser } from "../../Services/Core/IServiceResponseParser";
import { ServiceType } from "../../Services/Core/ServiceFactory";
import { string } from "prop-types";

export default class ServiceAction{

    request(service: ServiceType, 
            serviceName: string,
            request?: IServiceRequest, 
            listeners?: [string],
            parser?: IServiceResponseParser): ServiceActionType{
        return {type: ServiceRequest, 
                request:request, 
                serviceType: service, 
                serviceKey: serviceName,
                listeners: listeners,
                parser: parser}
    }

    response(response: any, listeners: [string], serviceKey?: string): ServiceActionType{
        return {type: ServiceResponse, response: response, listeners: listeners, serviceKey: serviceKey}
    }

    error(error: UDDAError, listeners: [string], serviceKey?: string): ServiceActionType{
        return {type: ServiceError, error:error, listeners: listeners, serviceKey: serviceKey}
    }

    reset(): ServiceActionType{
        return {type: ServiceReset}
    }

}