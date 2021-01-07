import AlertUtil from "../../Util/AlertUtil";
import SubscriptionResponse from "./SubscriptionResponse";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";

export default class SubscriptionResponseParser implements IServiceResponseParser {
    parse(response: any): SubscriptionResponse {
            console.log("SubscriptionResponseParser "+JSON.stringify(response))

            return new SubscriptionResponse(response)
        
    }
}