import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class SendMsgRequest extends PostServiceRequest {

    reply_to: string
    msg: string
    bet_id:string  //garima
    bet_type:string //@pky

    constructor(reply_to: string,
        msg: string,
        bet_id:string,
        bet_type:string
    ) {
        super()
        this.reply_to = reply_to,
        this.msg = msg,
        this.bet_id = bet_id,
        this.bet_type = bet_type



    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.reply_to = this.reply_to
        jsonRequest.msg = this.msg
        jsonRequest.bet_id = this.bet_id
        jsonRequest.bet_type = this.bet_type
    
        return qs.stringify(jsonRequest, { encode: true })
    }
}