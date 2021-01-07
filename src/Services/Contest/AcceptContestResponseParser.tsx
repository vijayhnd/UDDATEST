import AlertUtil from "../../Util/AlertUtil";
import AcceptContestResponse from "./AcceptContestResponse";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";

export default class AcceptContestResponseParser implements IServiceResponseParser {
    parse(response: any): AcceptContestResponse {
            console.log("AcceptContestResponseParser "+JSON.stringify(response))

            return new AcceptContestResponse(response)
        
    }
}