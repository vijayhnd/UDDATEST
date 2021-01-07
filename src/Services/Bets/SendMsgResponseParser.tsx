import AlertUtil from "../../Util/AlertUtil";
import SendMsgResponse from "./AcceptBetResponse";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";

export default class SendMsgResponseParser implements IServiceResponseParser {
    parse(response: any): SendMsgResponse {
            console.log("SendMsgResponseParser "+JSON.stringify(response))

            return new SendMsgResponse(response)
        
    }
}