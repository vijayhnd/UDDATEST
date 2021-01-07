import AlertUtil from "../../Util/AlertUtil";
import AcceptBetResponse from "./AcceptBetResponse";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";

export default class AcceptBetResponseParser implements IServiceResponseParser {
    parse(response: any): AcceptBetResponse {
            console.log("AcceptBetResponseParser "+JSON.stringify(response))

            return new AcceptBetResponse(response)
        
    }
}