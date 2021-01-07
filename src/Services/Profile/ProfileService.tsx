
import { BaseService } from "../Core/IService";
import { IServiceRequest } from "../Core/IServiceRequest";
import ServiceKeys from "../Core/ServiceKeys";
import RequestManager from "../Core/RequestManager";
import ServiceURI from "../Core/ServiceURI";
import UpdateProfileRequest from "./UpdateProfileRequest";
import GetProfileRequest from "./GetProfileRequest";

export default class ProfileService extends BaseService{
    execute(serviceKey: string, request: IServiceRequest){
        if(serviceKey === ServiceKeys.UpdateProfileServiceName){
            return this.updateProfile(request as UpdateProfileRequest)
        }else if(serviceKey === ServiceKeys.GetProfileServiceName){
            return this.getProfile(request as GetProfileRequest)
        }
    }

    updateProfile(request: UpdateProfileRequest){
        return RequestManager.sharedManager().postWithoutMulti(ServiceURI.UpdateProfileURI, request.serviceRequest())
    }

    getProfile(request: GetProfileRequest){
        return RequestManager.sharedManager().get(ServiceURI.GetProfileURI, request.serviceRequest())
    }
}