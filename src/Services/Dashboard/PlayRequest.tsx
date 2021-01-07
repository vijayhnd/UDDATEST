import { BaseServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'
import AlertUtil from "../../Util/AlertUtil";

export class PlayRequest extends BaseServiceRequest{
    league_id:string
  
    constructor(league_id: string){
        super()
        this.league_id = league_id
    }

    serviceRequest(): string{
        var jsonRequest = super.jsonRequest()
        jsonRequest.league_id = this.league_id
        // AlertUtil.show('dashboard request from playrequest: '+JSON.stringify(jsonRequest))
        return qs.stringify(jsonRequest, { encode: true })
    }
}