import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class CustomPoolBetAFriendRequest extends PostServiceRequest {

    // contest_id:any;
    // contest_type:any;
    // event_id : any
    question : any
    my_answer_text : any
	my_answer_date : any
    // odds : any
    // odds_type : any
    // bet_type : any
    bet_amount : any
    //amount_to_win : any
    //bet_expired_on : any
    bet_on : any

    constructor(
        // contest_id:any,
        // contest_type:any,
        // event_id : any,
        
        question : any,
        my_answer_text : any,
        my_answer_date : any,
        bet_amount : any,
        bet_on : any,
        // odds : any,
        // odds_type : any,
        // bet_type : any,
       
        // amount_to_win : any,
        // bet_expired_on : any,
       
    ) {
        super()
        // this.contest_id = contest_id
        // this.contest_type = contest_type
        // this.event_id = event_id 
        // this.other_answer = other_answer 
        this.question = question 
        this.my_answer_text = my_answer_text 
        this.my_answer_date = my_answer_date 
        this.bet_amount = bet_amount 
        this.bet_on = bet_on 
        // this.odds_type = odds_type 
        // this.bet_type = bet_type 
       
        // this.amount_to_win = amount_to_win 
        // this.bet_expired_on = bet_expired_on 
        
        



    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        // jsonRequest.contest_id = this.contest_id,
        // jsonRequest.contest_type = this.contest_type,
        // jsonRequest.event_id = this.event_id 
        jsonRequest.question = this.question 
        jsonRequest.my_answer_text = this.my_answer_text 
        jsonRequest.my_answer_date = this.my_answer_date 
        jsonRequest.bet_amount  = this.bet_amount 
        jsonRequest.bet_on = this.bet_on 

        // jsonRequest.odds = this.odds 
        // jsonRequest.odds_type = this.odds_type 
        // jsonRequest.bet_type = this.bet_type 
        
        // jsonRequest.amount_to_win = this.amount_to_win 
        // jsonRequest.bet_expired_on = this.bet_expired_on 
      
        return qs.stringify(jsonRequest, { encode: true })
    }
}