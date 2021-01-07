import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import SendOTPResponse from "./SendOTPResponse";
import AlertUtil from "../../Util/AlertUtil";

export default class SendOTPResponseParser implements IServiceResponseParser{

    parse(response: any): SendOTPResponse{
        return new SendOTPResponse()
    }
} 