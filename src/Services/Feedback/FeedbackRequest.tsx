import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class FeedbackRequest extends PostServiceRequest {

    subject: string
    message: string
    image: string


    constructor(subject: string,
        message: string,
        image: string, ) {
        super()
        this.subject = subject,
        this.message = message,
        this.image = image
    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.subject = this.subject
        jsonRequest.message = this.message
        jsonRequest.image = this.image
      
        return qs.stringify(jsonRequest, { encode: true })
    }
}