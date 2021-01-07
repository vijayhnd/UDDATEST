import AlertUtil from "../../Util/AlertUtil";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import ResetPasswordResponse from "./ResetPasswordResponse";

export default class ResetPasswordResponseParser implements IServiceResponseParser {
    parse(response: any): ResetPasswordResponse {
            console.log("ResetPasswordResponseResponseParser "+JSON.stringify(response))

            return new ResetPasswordResponse(response)
        
    }
}