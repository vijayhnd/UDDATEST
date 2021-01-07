import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class ResetPasswordRequest extends PostServiceRequest {

    email: string
    password: string


    constructor(email: string,
        password: string) {
        super()
        this.email = email
        this.password = password
      

    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.email = this.email
        jsonRequest.password = this.password
            return qs.stringify(jsonRequest, { encode: true })
    }
}