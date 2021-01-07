import { BaseServiceRequest, PostServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'
import AlertUtil from "../../Util/AlertUtil";

export class LoginRequest extends PostServiceRequest{
    phone: string
    //password: string
    latitude = 0
    longitude = 0
    device_type:string
    device_token:string
    timestamp=0
    signature:string

    constructor(phone: string, 
               // password: string, 
                device_type:string,
                device_token:string,
                timestamp:number,
                signature:string,
                latitude: number,
                longitude: number){
        super()
        this.phone = phone
       // this.password = password
        this.device_type = device_type
        this.device_token = device_token
        this.timestamp = timestamp
        this.signature = signature
       // this.latitude = 22.3106 
        //this.longitude = 73.1926 
        this.latitude = latitude 
        this.longitude = longitude
    }

    serviceRequest(): string{
        var jsonRequest = super.jsonRequest()
        jsonRequest.phone = this.phone
       // jsonRequest.password = this.password
        jsonRequest.device_type = this.device_type
        jsonRequest.device_token =this.device_token 
        jsonRequest.timestamp =this.timestamp
        jsonRequest.signature =this.signature 
        jsonRequest.latitude = this.latitude
        jsonRequest.longitude = this.longitude
        return qs.stringify(jsonRequest, { encode: true })
    }
}