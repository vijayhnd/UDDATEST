import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class CreateContestRequest extends PostServiceRequest {
    league_id: string
    contest_name: string
    join_fee: string
    contest_type: string
    registration_end_date: string
    contest_start_date: string
    contest_end_date: string
    is_share: string
    min_bet_amount:string
    max_bet_amount: string
    price_type:string
    timezone:string

    constructor(
        league_id: string,
        contest_name: string,
        join_fee: string,
        contest_type: string,
        registration_end_date: string,
        contest_start_date: string,
        contest_end_date: string,
        is_share: string,
        min_bet_amount:string,
        max_bet_amount: string,
        price_type:string, timezone:string) {
        super()
        this.league_id = league_id
        this.contest_name = contest_name
        this.join_fee = join_fee
        this.contest_type = contest_type
        this.registration_end_date = registration_end_date
        this.contest_start_date = contest_start_date
        this.contest_end_date = contest_end_date
        this.is_share = is_share
        this.min_bet_amount = min_bet_amount
        this.max_bet_amount = max_bet_amount
        this.price_type = price_type
        this.timezone = timezone

    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.league_id = this.league_id
        jsonRequest.contest_name = this.contest_name
        jsonRequest.join_fee = this.join_fee
        jsonRequest.contest_type = this.contest_type
        jsonRequest.registration_end_date = this.registration_end_date
        jsonRequest.contest_start_date = this.contest_start_date
        jsonRequest.contest_end_date = this.contest_end_date
        jsonRequest.is_share = this.is_share
        jsonRequest.min_bet_amount = this.min_bet_amount
        jsonRequest.max_bet_amount = this.max_bet_amount
        jsonRequest.price_type = this.price_type
        jsonRequest.timezone = this.timezone
        return qs.stringify(jsonRequest, { encode: true })
    }
}