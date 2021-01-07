import { BaseServiceRequest, PostServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'
import AlertUtil from "../../Util/AlertUtil";

export class GuestLoginRequest extends PostServiceRequest{
    device_type:string
    device_token:string
    timestamp=0
    signature:string
    constructor(device_type:string,
        device_token:string,
        timestamp:number,
        signature:string,){
        super()
        this.device_type = device_type
        this.device_token = device_token
        this.timestamp = timestamp
        this.signature = signature
    } 


    serviceRequest(): string{
        var jsonRequest = super.jsonRequest()
       
        jsonRequest.device_type = this.device_type
        jsonRequest.device_token =this.device_token 
        jsonRequest.timestamp =this.timestamp
        jsonRequest.signature =this.signature 
        
        return qs.stringify(jsonRequest, { encode: true })
    }
}