import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class CustomProbBetRequest extends PostServiceRequest {

    


    event_id: any
    question: any
    my_answer: any
    other_answer:  any
    odds:any
    odds_type:  any
    bet_expired_on:any
    bet_amount:any
    amount_to_win:any
    contest_id: any
    contest_type: any
    bet_type:any
    bet_on: any

    constructor(
        event_id: any,
        question: any,
        my_answer: any,
        other_answer:  any,
        odds:any,
        odds_type:  any,
        bet_expired_on:any,
        bet_amount:any,
        amount_to_win:any,
        contest_id: any,
        contest_type: any,
        bet_type:any,
        bet_on: any,
    ) {
        super()

            this.event_id =  event_id 
            this.question= question 
            this.my_answer=  my_answer 
            this.other_answer= other_answer 
            this.odds =  odds 
            this.odds_type =  odds_type 
            this.bet_expired_on= bet_expired_on  
            this.bet_amount= bet_amount 
            this.amount_to_win= amount_to_win 
            this.contest_id =  contest_id 
            this.contest_type =  contest_type 
            this.bet_type =  bet_type 
            this.bet_on =  bet_on 



       


    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()

        jsonRequest.event_id =  this.event_id 
        jsonRequest.question= this.question 
        jsonRequest.my_answer=  this.my_answer 
        jsonRequest.other_answer= this.other_answer 
        jsonRequest.odds =  this.odds 
        jsonRequest.odds_type =  this.odds_type 
        jsonRequest.bet_expired_on= this.bet_expired_on  
        jsonRequest.bet_amount= this.bet_amount 
        jsonRequest.amount_to_win= this.amount_to_win 
        jsonRequest.contest_id =  this.contest_id 
        jsonRequest.contest_type =  this.contest_type 
        jsonRequest.bet_type =  this.bet_type 
        jsonRequest.bet_on =  this.bet_on 



 

        return qs.stringify(jsonRequest, { encode: true })
    }
}