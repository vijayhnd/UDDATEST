import UpdateProfileResponseParser from "./UpdateProfileResponseParser";
import GetProfileResponse from "./GetProfileResponse";
import AlertUtil from "../../Util/AlertUtil";

export default class GetProfileResponseParser extends UpdateProfileResponseParser{
    parse(response: any): GetProfileResponse {
        return super.parse(response)
    }
}