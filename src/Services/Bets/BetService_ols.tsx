
import { BaseService } from "../Core/IService";
import { IServiceRequest } from "../Core/IServiceRequest";
import ServiceKeys from "../Core/ServiceKeys";
import RequestManager from "../Core/RequestManager";
import ServiceURI from "../Core/ServiceURI";
import AcceptBetRequest from "./AcceptBetRequest";
import SendMsgRequest from "./SendMsgRequest";
import PlaceBetRequest from "./PlaceBetRequest";
import BetAFriendRequest from "./BetAFriendRequest";

export default class BetService extends BaseService{
    execute(serviceKey: string, request: IServiceRequest){
        if(serviceKey === ServiceKeys.AcceptBetName){
            return this.acceptbet(request as AcceptBetRequest)
        }
        else if(serviceKey === ServiceKeys.SendMsgName){
            return this.sendmsg(request as SendMsgRequest)
        }
        else if(serviceKey === ServiceKeys.PlaceBetName){
            return this.placebet(request as PlaceBetRequest)
        }
        else if(serviceKey === ServiceKeys.BetaFriendName){
            return this.betfriendplacebet(request as BetAFriendRequest)
        }
    }


    acceptbet(request: AcceptBetRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.AcceptBetURI, request.serviceRequest())
    }

    sendmsg(request: SendMsgRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.SendMsgURI, request.serviceRequest())
    }

    placebet(request: PlaceBetRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.PlaceBetURI, request.serviceRequest())
    }

    betfriendplacebet(request: BetAFriendRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.BetFriendURI, request.serviceRequest())
    }
}