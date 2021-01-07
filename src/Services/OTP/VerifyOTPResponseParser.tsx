import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import VerifyOTPResponse from "./VerifyOTPResponse";

export default class VerifyOTPResponseParser implements IServiceResponseParser{
    parse(response: any): VerifyOTPResponse{
        return new VerifyOTPResponse()
    }
}