
import { BaseService } from "../Core/IService";
import { IServiceRequest } from "../Core/IServiceRequest";
import ServiceKeys from "../Core/ServiceKeys";
import RequestManager from "../Core/RequestManager";
import ServiceURI from "../Core/ServiceURI";
import CreateContestRequest from "./CreateContestRequest";
import AcceptContestRequest from "./AcceptContestRequest";

export default class ContestService extends BaseService{
    execute(serviceKey: string, request: IServiceRequest){
        if(serviceKey === ServiceKeys.CreateContestServiceName){
            return this.createContest(request as CreateContestRequest)
        }
        else if(serviceKey === ServiceKeys.AcceptRejectContestName){
            return this.AcceptRejectContest(request as AcceptContestRequest)
        }
        else if(serviceKey === ServiceKeys.SubscribeContestName){
            return this.SubscribeContest(request as AcceptContestRequest)
        }
    }


    createContest(request: CreateContestRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.CreateContestURI, request.serviceRequest())
    }

    AcceptRejectContest(request: AcceptContestRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.AcceptRejectContestURI, request.serviceRequest())
    }

    SubscribeContest(request: AcceptContestRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.SubscribeContestURI, request.serviceRequest())
    }
}