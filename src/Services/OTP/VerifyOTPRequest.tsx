import {  PostServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'

export default class VerifyOTPRequest extends PostServiceRequest{
    phone = ''
    otp = ''

    constructor(phone: string, otp: string){
        super()
        this.phone = phone
        this.otp = otp
    }

    serviceRequest(): string{
        var jsonRequest = super.jsonRequest()
        jsonRequest.phone = this.phone
        jsonRequest.otp = this.otp
        return qs.stringify(jsonRequest, { encode: true })
    }
}