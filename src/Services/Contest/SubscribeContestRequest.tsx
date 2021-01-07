import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class SubscribeContestRequest extends PostServiceRequest {

    contest_id: string

    constructor(contest_id: string) {
        super()
        this.contest_id = contest_id     

    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.contest_id = this.contest_id
        return qs.stringify(jsonRequest, { encode: true })
    }
}