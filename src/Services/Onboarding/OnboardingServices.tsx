import RequestManager from "../Core/RequestManager";
import ServiceURI from "../Core/ServiceURI";
import RegistrationRequest, { FacebookRegistrationRequest, GoogleRegistrationRequest, TwitterRegistrationRequest } from "./RegistrationRequest";
import SignupRequest from "./SignupRequest";

import { IServiceRequest } from "../Core/IServiceRequest";
import ServiceKeys from "../Core/ServiceKeys";
import { LoginRequest } from "./LoginRequest";
import AlertUtil from "../../Util/AlertUtil";
import { BaseService } from "../Core/IService";
import { GuestLoginRequest } from "./GuestLoginRequest";
import ResetPasswordRequest from "./ResetPasswordRequest";

export default class OnboardingServices extends BaseService {

    execute(serviceName: string, request?: IServiceRequest) {
        if (serviceName === ServiceKeys.RegisterServiceName) {
            return this.register(request as RegistrationRequest)
        } else if (serviceName === ServiceKeys.EmailLoginServiceName) {
            return this.login(request as LoginRequest)

        } else if (serviceName === ServiceKeys.GuestLoginServiceName) {
            return this.guestlogin(request as GuestLoginRequest)
        }
        else if (serviceName === ServiceKeys.FacebookRegistrationServiceName) {
            return this.facebookRegister(request as FacebookRegistrationRequest)
        } else if (serviceName === ServiceKeys.GoogleRegistrationServiceName) {
            return this.googleRegister(request as GoogleRegistrationRequest)
        } else if (serviceName === ServiceKeys.TwitterRegistrationServiceName) {
            return this.twitterRegister(request as TwitterRegistrationRequest)
        }
        else if(serviceName === ServiceKeys.ResetPasswordServiceName){
            return this.ResetPassword(request as ResetPasswordRequest)
        }
        else if(serviceName === ServiceKeys.PhoneSignUp){
            return this.phoneSignUp(request as SignupRequest)
        }else if(serviceName === ServiceKeys.phoneLoginURI){
            return this.phonelogin(request as LoginRequest)
        }

    }

    ResetPassword(request:ResetPasswordRequest)
    {
        return RequestManager.sharedManager(). postWithoutMulti(ServiceURI.ResetPasswordURI, request.serviceRequest())
    }

    register(request: RegistrationRequest) {
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.RegistrationURI, request.serviceRequest())
    }

    googleRegister(request: GoogleRegistrationRequest) {
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.GoogleRegistrationURI, request.serviceRequest())
    }

    twitterRegister(request: TwitterRegistrationRequest) {
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.TwitterRegistrationURI, request.serviceRequest())
    }

    facebookRegister(request: FacebookRegistrationRequest) {
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.FacebookRegistrationURI, request.serviceRequest())
    }

    login(request: LoginRequest) {
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.LoginURI, request.serviceRequest())
    }
    guestlogin(request:GuestLoginRequest)
    {
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.GuestLoginURI, request.serviceRequest())
    }
    phoneSignUp(request: SignupRequest) {
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.PhoneSignUpURI, request.serviceRequest())
    }
    phonelogin(request: LoginRequest) {
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.phoneLoginURI, request.serviceRequest())
    }


}