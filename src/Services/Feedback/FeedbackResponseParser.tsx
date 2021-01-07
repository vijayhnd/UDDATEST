import AlertUtil from "../../Util/AlertUtil";
import FeedbackResponse from "./FeedbackResponse";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";

export default class FeedbackResponseParser implements IServiceResponseParser {
    parse(response: any): FeedbackResponse {
            console.log("FeedbackResponseParser "+JSON.stringify(response))

            return new FeedbackResponse(response)
        
    }
}