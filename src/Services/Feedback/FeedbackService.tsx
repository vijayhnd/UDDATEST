
import { BaseService } from "../Core/IService";
import { IServiceRequest } from "../Core/IServiceRequest";
import ServiceKeys from "../Core/ServiceKeys";
import RequestManager from "../Core/RequestManager";
import ServiceURI from "../Core/ServiceURI";
import FeedbackRequest from "./FeedbackRequest";

export default class FeedBackService extends BaseService{
    execute(serviceKey: string, request: IServiceRequest){
        if(serviceKey === ServiceKeys.FeedbackServiceName){
            return this.Feedback(request as FeedbackRequest)
        }
    }


    Feedback(request: FeedbackRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.FeedbackURI, request.serviceRequest())
    }
}