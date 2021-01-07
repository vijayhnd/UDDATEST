import { BaseServiceRequest, PostServiceRequest, GetServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'


export default class CustomSquareRequest extends PostServiceRequest {

    game_name: any;
    league_id: any;
    event_id: any
    per_square_cost: any
    square_limit_per_player: any
    select_quarter_type: any
    win_per_q1: any
    win_per_q2: any
    win_per_q3: any
    win_per_q4: any
    square_random_number: any
    button_type: any
    square_boxes: any
    bet_amount: any
    bet_share_type: any
    square_on:any;
    constructor(
        game_name: any,
        league_id: any,
        event_id: any,
        per_square_cost: any,
        square_limit_per_player: any,
        select_quarter_type: any,
        win_per_q1: any,
        win_per_q2: any,
        win_per_q3: any,
        win_per_q4: any,
        square_random_number: any,
        button_type: any,
        square_boxes: any,
        bet_amount: any,
        bet_share_type: any,
        square_on: any
    ) {
        super()
        this.game_name = game_name
        this.league_id = league_id
        this.event_id = event_id
        this.per_square_cost = per_square_cost
        this.square_limit_per_player = square_limit_per_player
        this.select_quarter_type = select_quarter_type
        this.win_per_q1 = win_per_q1
        this.win_per_q2 = win_per_q2
        this.win_per_q3 = win_per_q3
        this.win_per_q4 = win_per_q4
        this.square_random_number = square_random_number
        this.button_type = button_type
        this.square_boxes = square_boxes
        this.bet_amount = bet_amount

        this.bet_share_type = bet_share_type
        this.square_on = square_on



    }

    serviceRequest(): string {
        var jsonRequest = super.jsonRequest()
        jsonRequest.game_name = this.game_name,
            jsonRequest.league_id = this.league_id,
            jsonRequest.event_id = this.event_id
        jsonRequest.per_square_cost = this.per_square_cost
        jsonRequest.square_limit_per_player = this.square_limit_per_player
        jsonRequest.select_quarter_type = this.select_quarter_type
        jsonRequest.win_per_q1 = this.win_per_q1
        jsonRequest.win_per_q2 = this.win_per_q2
        jsonRequest.win_per_q3 = this.win_per_q3
        jsonRequest.win_per_q4 = this.win_per_q4
        jsonRequest.square_random_number = this.square_random_number
        jsonRequest.button_type = this.button_type
        jsonRequest.square_boxes = this.square_boxes
        jsonRequest.bet_amount = this.bet_amount
        jsonRequest.bet_share_type = this.bet_share_type
        jsonRequest.square_on = this.square_on

        return qs.stringify(jsonRequest, { encode: true })
    }
}