import {  PostServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'

export default class VerifyLoginOTPRequest extends PostServiceRequest{
    otp = ''
    phone = ''
    device_type=''
    device_token=''
    timestamp=0
    signature=''
    latitude = 0
    longitude = 0

    constructor(
				otp: string,
                phone: string,
                device_type:string,
                device_token:string,
                timestamp:number,
                signature:string,
                latitude: number,
                longitude: number){
        super()
        this.otp = otp
        this.phone = phone
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
         jsonRequest.otp = this.otp
        jsonRequest.phone = this.phone
        jsonRequest.device_type = this.device_type
        jsonRequest.device_token =this.device_token 
        jsonRequest.timestamp =this.timestamp
        jsonRequest.signature =this.signature 
        jsonRequest.latitude = this.latitude
        jsonRequest.longitude = this.longitude
        
        return qs.stringify(jsonRequest, { encode: true })
    }
}