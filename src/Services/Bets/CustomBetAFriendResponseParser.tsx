import AlertUtil from "../../Util/AlertUtil";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import CustomBetAFriendResponse from "./CustomBetAFriendResponse";

export default class CustomBetAFriendResponseParser implements IServiceResponseParser {
    parse(response: any): CustomBetAFriendResponse {
            console.log("BetAFriendResponseParser "+JSON.stringify(response))

            return new CustomBetAFriendResponse(response)
        
    }
}