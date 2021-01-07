
import { BaseService } from "../Core/IService";
import { IServiceRequest } from "../Core/IServiceRequest";
import ServiceKeys from "../Core/ServiceKeys";
import RequestManager from "../Core/RequestManager";
import ServiceURI from "../Core/ServiceURI";
import SubscriptionRequest from "./SubscriptionRequest";

export default class SubscriptionService extends BaseService{
    execute(serviceKey: string, request: IServiceRequest){
        if(serviceKey === ServiceKeys.SubscriptionServiceName){
            return this.Subscription(request as SubscriptionRequest)
        }
    }


    Subscription(request: SubscriptionRequest){
        return RequestManager.sharedManager(). postWithoutMulti(ServiceURI.SubscriptionURI, request.serviceRequest())
    }
}