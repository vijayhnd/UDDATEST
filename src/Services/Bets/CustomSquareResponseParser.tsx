import AlertUtil from "../../Util/AlertUtil";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import CustomSquareResponse from "./CustomSquareResponse";

export default class CustomSquareResponseParser implements IServiceResponseParser {
    parse(response: any): CustomSquareResponse {
            console.log("BetAFriendResponseParser "+JSON.stringify(response))

        return new CustomSquareResponse(response)
        
    }
}