import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class AcceptBetRequest extends PostServiceRequest {

    contest_id:any
    contest_type:any
    bet_on: string
    event_id: string
    bet_amount: string
    amount_to_win: string
    league_id: string
    bet_odds_type: string
    bet_type: string
    wining_rate_favored: string
    wining_rate_underdog: string
    oppsite_odd_line: string

    constructor(
        contest_id:any,
        contest_type:any,
        bet_on: string,
        event_id: string,
        bet_amount: string,
        amount_to_win: string,
        league_id: string,
        bet_odds_type: string,
        bet_type: string,
        wining_rate_favored: string,
        wining_rate_underdog: string,
        oppsite_odd_line:string,
    ) {
        super()
        this.contest_id = contest_id
        this.contest_type = contest_type
        this.bet_on = bet_on
        this.event_id = event_id
        this.bet_amount = bet_amount
        this.amount_to_win = amount_to_win
        this.league_id = league_id
        this.bet_odds_type = bet_odds_type
        this.bet_type = bet_type
        this.wining_rate_favored = wining_rate_favored
        this.wining_rate_underdog = wining_rate_underdog
        this.oppsite_odd_line = oppsite_odd_line



    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.contest_id = this.contest_id
        jsonRequest.contest_type = this.contest_type
        jsonRequest.bet_on  = this.bet_on 
        jsonRequest.event_id  = this.event_id 
        jsonRequest.bet_amount  = this.bet_amount 
        jsonRequest.amount_to_win  = this.amount_to_win 
        jsonRequest.league_id  = this.league_id 
        jsonRequest.bet_odds_type  = this.bet_odds_type 
        jsonRequest.bet_type  = this.bet_type 
        jsonRequest.wining_rate_favored  = this.wining_rate_favored 
        jsonRequest.wining_rate_underdog = this.wining_rate_underdog 
        jsonRequest.oppsite_odd_line = this.oppsite_odd_line 

        return qs.stringify(jsonRequest, { encode: true })
    }
}