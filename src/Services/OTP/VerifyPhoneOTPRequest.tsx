import {  PostServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'

export default class VerifyPhoneOTPRequest extends PostServiceRequest{
    displayName = ''
    otp = ''
    mobileNumber = ''
    device_type=''
    device_token=''
    timestamp=0
    signature=''
    latitude = 0
    longitude = 0
guest_access_token =''
    constructor(displayName: string, 
				otp: string,
                mobileNumber: string,
                device_type:string,
                device_token:string,
                timestamp:number,
                signature:string,
                latitude: number,
                longitude: number, guest_access_token:string,){
        super()
        this.displayName = displayName
        this.otp = otp
        this.mobileNumber = mobileNumber
        this.device_type = device_type
        this.device_token = device_token
        this.timestamp = timestamp
        this.signature = signature
         // this.latitude = 22.3106 
        //this.longitude = 73.1926 
        this.latitude = latitude 
        this.longitude = longitude 
        this.guest_access_token = guest_access_token 
    }

    serviceRequest(): string{
        var jsonRequest = super.jsonRequest()
        jsonRequest.displayname = this.displayName
        jsonRequest.otp = this.otp
        jsonRequest.phone = this.mobileNumber
        jsonRequest.device_type = this.device_type
        jsonRequest.device_token =this.device_token 
        jsonRequest.timestamp =this.timestamp
        jsonRequest.signature =this.signature 
        jsonRequest.latitude = this.latitude
        jsonRequest.longitude = this.longitude
        jsonRequest.guest_access_token = this.guest_access_token
        return qs.stringify(jsonRequest, { encode: true })
    }
}