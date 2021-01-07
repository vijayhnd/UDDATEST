import { BaseService } from "../Core/IService";
import { IServiceRequest } from "../Core/IServiceRequest";
import SendOTPRequest from "./SendOTPRequest";
import VerifyOTPRequest from "./VerifyOTPRequest";
import VerifyPhoneOTPRequest from "./VerifyPhoneOTPRequest";
import VerifyLoginOTPRequest from "./VerifyLoginOTPRequest";
import ServiceKeys from "../Core/ServiceKeys";
import RequestManager from "../Core/RequestManager";
import ServiceURI from "../Core/ServiceURI";

export default class OTPService extends BaseService{
    execute(serviceKey: string, request: IServiceRequest){
        if(serviceKey === ServiceKeys.SendOTPServiceName){
            return this.sendOTP(request as SendOTPRequest)
        }else if(serviceKey === ServiceKeys.VerifyOTPServiceName){
            return this.verifyOTP(request as VerifyOTPRequest)
        }else if(serviceKey === ServiceKeys.VerifyPhoneOTPURI){
            return this.verifyPhoneOTP(request as VerifyPhoneOTPRequest)
        }else if(serviceKey === ServiceKeys.VerifyPhoneLoginOTPURI){
            return this.VerifyLoginOTP(request as VerifyLoginOTPRequest)
        }
    }

    sendOTP(request: SendOTPRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.SendOTPURI, request.serviceRequest())
    }

    verifyOTP(request: VerifyOTPRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.VerifyOTPURI, request.serviceRequest())
    } 
	verifyPhoneOTP(request: VerifyPhoneOTPRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.VerifyPhoneOTPURI, request.serviceRequest())
    }
	VerifyLoginOTP(request: VerifyPhoneOTPRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.VerifyPhoneLoginOTPURI, request.serviceRequest())
    }
}