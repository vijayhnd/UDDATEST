import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";

export default class GetProfileRequest extends GetServiceRequest{

    constructor(){
        super()
    }

    jsonRequest():any{
        
    }

    serviceRequest(): string{
        return ''
    }
}