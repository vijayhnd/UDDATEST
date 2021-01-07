import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class BetAFriendRequest extends PostServiceRequest {

    contest_id:any;
    contest_type:any;
    event_id : any
    line_lookup : any
    question : any
    answer : any
    type : any
    bet_type : any
    bet_amount : any
    amount_to_win : any
    total : any
    over : any
    under : any
    wining_rate_over : any
    wining_rate_under : any
    player_props_id : any
    bet_on : any

    constructor(
        contest_id:any,
        contest_type:any,
        event_id : any,
        line_lookup : any,
        question : any,
        answer : any,
        type : any,
        bet_type : any,
        bet_amount : any,
        amount_to_win : any,
        total : any,
        over : any,
        under : any,
        wining_rate_over : any,
        wining_rate_under : any,
        player_props_id : any,
        bet_on : any,
    ) {
        super()
        this.contest_id = contest_id
        this.contest_type = contest_type
        this.event_id = event_id 
        this.line_lookup = line_lookup 
        this.question = question 
        this.answer = answer 
        this.type = type 
        this.bet_type = bet_type 
        this.bet_amount = bet_amount 
        this.amount_to_win = amount_to_win 
        this.total = total 
        this.over = over 
        this.under = under 
        this.wining_rate_over = wining_rate_over 
        this.wining_rate_under = wining_rate_under 
        this.player_props_id = player_props_id 
        this.bet_on = bet_on 



    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.contest_id = this.contest_id,
        jsonRequest.contest_type = this.contest_type,
        jsonRequest.event_id = this.event_id 
        jsonRequest.line_lookup = this.line_lookup 
        jsonRequest.question = this.question 
        jsonRequest.answer = this.answer 
        jsonRequest.type = this.type 
        jsonRequest.bet_type = this.bet_type 
        jsonRequest.bet_amount  = this.bet_amount  
        jsonRequest.amount_to_win = this.amount_to_win 
        jsonRequest.total = this.total 
        jsonRequest.over = this.over 
        jsonRequest.under = this.under 
        jsonRequest.wining_rate_over = this.wining_rate_over 
        jsonRequest.wining_rate_under = this.wining_rate_under 
        jsonRequest.player_props_id = this.player_props_id 
        jsonRequest.bet_on = this.bet_on 

        return qs.stringify(jsonRequest, { encode: true })
    }
}