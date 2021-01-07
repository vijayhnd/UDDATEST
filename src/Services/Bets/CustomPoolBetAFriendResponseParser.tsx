import AlertUtil from "../../Util/AlertUtil";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import CustomPoolBetAFriendResponse from "./CustomPoolBetAFriendResponse";

export default class CustomPoolBetAFriendResponseParser implements IServiceResponseParser {
    parse(response: any): CustomPoolBetAFriendResponse {
            console.log("BetAFriendResponseParser "+JSON.stringify(response))

            return new CustomPoolBetAFriendResponse(response)
        
    }
}