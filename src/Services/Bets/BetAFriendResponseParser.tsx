import AlertUtil from "../../Util/AlertUtil";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import BetAFriendResponse from "./BetAFriendResponse";

export default class BetAFriendResponseParser implements IServiceResponseParser {
    parse(response: any): BetAFriendResponse {
            console.log("BetAFriendResponseParser "+JSON.stringify(response))

            return new BetAFriendResponse(response)
        
    }
}