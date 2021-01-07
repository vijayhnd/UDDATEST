import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class CustomBetAFriendRequest extends PostServiceRequest {

    contest_id:any;
    contest_type:any;
    event_id : any
    question : any
    my_answer : any
	other_answer : any
    odds : any
    odds_type : any
    bet_type : any
    bet_amount : any
    amount_to_win : any
    bet_expired_on : any
    bet_on : any
    season_expired_on : any
    // bet_type_settle : any
    // bet_settle : any

    constructor(
        contest_id:any,
        contest_type:any,
        event_id : any,
        
        question : any,
        my_answer : any,
		other_answer : any,
        odds : any,
        odds_type : any,
        bet_type : any,
        bet_amount : any,
        amount_to_win : any,
        bet_expired_on : any,
        bet_on : any,
        season_expired_on : any,

        // bet_type_settle : any,
        // bet_settle : any,
    ) {
        super()
        this.contest_id = contest_id
        this.contest_type = contest_type
        this.event_id = event_id 
        this.other_answer = other_answer 
        this.question = question 
        this.my_answer = my_answer 
        this.odds = odds 
        this.odds_type = odds_type 
        this.bet_type = bet_type 
        this.bet_amount = bet_amount 
        this.amount_to_win = amount_to_win 
        this.bet_expired_on = bet_expired_on 
        
        this.bet_on = bet_on 
        this.season_expired_on = season_expired_on 
        // // this.bet_type_settle = bet_type_settle 
        // // this.bet_settle = bet_settle 



    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.contest_id = this.contest_id,
        jsonRequest.contest_type = this.contest_type,
        jsonRequest.event_id = this.event_id 
        jsonRequest.question = this.question 
        jsonRequest.my_answer = this.my_answer 
		jsonRequest.other_answer = this.other_answer 
        jsonRequest.odds = this.odds 
        jsonRequest.odds_type = this.odds_type 
        jsonRequest.bet_type = this.bet_type 
        jsonRequest.bet_amount  = this.bet_amount  
        jsonRequest.amount_to_win = this.amount_to_win 
        jsonRequest.bet_expired_on = this.bet_expired_on 
        jsonRequest.bet_on = this.bet_on 
        jsonRequest.season_expired_on = this.season_expired_on 
        // // jsonRequest.bet_type_settle = this.bet_type_settle 
        // jsonRequest.bet_settle = this.bet_settle 

        return qs.stringify(jsonRequest, { encode: true })
    }
}