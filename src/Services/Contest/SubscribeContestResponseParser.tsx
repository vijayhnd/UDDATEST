import AlertUtil from "../../Util/AlertUtil";
import SubscribeContestResponse from "./SubscribeContestResponse";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";

export default class SubscribeContestResponseParser implements IServiceResponseParser {
    parse(response: any): SubscribeContestResponse {
            console.log("SubscribeContestResponseParser "+JSON.stringify(response))

            return new SubscribeContestResponse(response)
        
    }
}