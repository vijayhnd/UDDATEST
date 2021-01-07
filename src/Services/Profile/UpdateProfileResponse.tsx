import { BaseServiceResponse } from "../Core/IServiceResponse";
import { UserProfile } from "../../Entities/User";

export default class UpdateProfileResponse extends BaseServiceResponse{
    userProfile?: UserProfile
}