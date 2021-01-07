import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class AcceptContestRequest extends PostServiceRequest {

    private_contest_id: string
    private_contest_join_status: string

    constructor(private_contest_id: string,
        private_contest_join_status: string) {
        super()
        this.private_contest_id = private_contest_id
        this.private_contest_join_status = private_contest_join_status
      

    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.private_contest_id = this.private_contest_id
        jsonRequest.private_contest_join_status = this.private_contest_join_status
            return qs.stringify(jsonRequest, { encode: true })
    }
}