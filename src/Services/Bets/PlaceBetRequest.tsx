import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class PlaceBetRequest extends PostServiceRequest {

    contest_id:any;
    contest_type:any;
    event_id: any
    league_id: any
    bet_odds_type: any
    bet_type: any
    bet_amount: any
    amount_to_win: any
    bet_team_type: any
    bet_team_id: any
    wining_rate_favored: any
    wining_rate_underdog: any
    odds: any

    constructor(
        contest_id:any,
        contest_type:any,
        event_id: any,
        league_id: any,
        bet_odds_type: any,
        bet_type: any,
        bet_amount: any,
        amount_to_win: any,
        bet_team_type: any,
        bet_team_id: any,
        wining_rate_favored: any,
        wining_rate_underdog: any,
        odds: any,
    ) {
        super()
        this.contest_id = contest_id
        this.contest_type = contest_type
        this.event_id = event_id
        this.league_id = league_id
        this.bet_odds_type = bet_odds_type
        this.bet_type = bet_type
        this.bet_amount = bet_amount
        this.amount_to_win = amount_to_win
        this.bet_team_type = bet_team_type
        this.bet_team_id = bet_team_id
        this.wining_rate_favored = wining_rate_favored
        this.wining_rate_underdog = wining_rate_underdog
        this.odds = odds



    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.contest_id = this.contest_id,
        jsonRequest.contest_type = this.contest_type,
        jsonRequest.event_id = this.event_id 
        jsonRequest.league_id = this.league_id 
        jsonRequest.bet_odds_type = this.bet_odds_type 
        jsonRequest.bet_type = this.bet_type 
        jsonRequest.bet_amount = this.bet_amount 
        jsonRequest.amount_to_win = this.amount_to_win 
        jsonRequest.bet_team_type = this.bet_team_type 
        jsonRequest.bet_team_id = this.bet_team_id 
        jsonRequest.wining_rate_favored = this.wining_rate_favored 
        jsonRequest.wining_rate_underdog= this.wining_rate_underdog 
        jsonRequest.odds = this.odds 

        return qs.stringify(jsonRequest, { encode: true })
    }
}