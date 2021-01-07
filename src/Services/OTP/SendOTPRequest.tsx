import {  PostServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'

export default class SendOTPRequest extends PostServiceRequest{
    phone = ''

    constructor(phone: string){
        super()
        this.phone = phone
    }

    serviceRequest(): string{
        console.log("phone number"+JSON.stringify(this.phone));
        var jsonRequest = super.jsonRequest()
        jsonRequest.phone = this.phone
        return qs.stringify(jsonRequest, { encode: true })
    }
}