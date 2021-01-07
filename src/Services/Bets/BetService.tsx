

import { BaseService } from "../Core/IService";
import { IServiceRequest } from "../Core/IServiceRequest";
import ServiceKeys from "../Core/ServiceKeys";
import RequestManager from "../Core/RequestManager";
import ServiceURI from "../Core/ServiceURI";
import AcceptBetRequest from "./AcceptBetRequest";
import SendMsgRequest from "./SendMsgRequest";
import PlaceBetRequest from "./PlaceBetRequest";
import BetAFriendRequest from "./BetAFriendRequest";
import CustomBetAFriendRequest from "./CustomBetAFriendRequest";
import CustomPoolBetAFriendRequest from "./CustomPoolBetAFriendRequest";
import CustomSquareRequest from "./CustomSquareRequest";

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
        }else if(serviceKey === ServiceKeys.CustomBetaFriendName){
            return this.custombetfriendplacebet(request as CustomBetAFriendRequest)
        }
        else if(serviceKey === ServiceKeys.CustomPoolBetaFriendName){
            return this.customPoolbetfriendplacebet(request as CustomPoolBetAFriendRequest)
        }
        else if (serviceKey === ServiceKeys.CustomSquareName) {
            return this.customSquarePlacebet(request as CustomSquareRequest)
        }
		else if (serviceKey === ServiceKeys.CounterCustomBet) {
            return this.counterCustomPlacebet(request as CustomSquareRequest)
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
	custombetfriendplacebet(request: CustomBetAFriendRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.CustomBetFriendURI, request.serviceRequest())
    }
    customPoolbetfriendplacebet(request: CustomPoolBetAFriendRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.CustomPoolBetFriendURI, request.serviceRequest())
    }
    customSquarePlacebet(request: CustomSquareRequest) {
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.CustomSquareURI, request.serviceRequest())
    }
	counterCustomPlacebet(request: CustomBetAFriendRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.CounterCustomBet, request.serviceRequest())
    }
}