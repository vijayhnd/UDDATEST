import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import LoginResponse from "./LoginResponse";
import { UserProfile, User } from "../../Entities/User";
import AlertUtil from "../../Util/AlertUtil";

export default class LoginServiceParser implements IServiceResponseParser{

    parse(response:any): LoginResponse{
        var firstName: string = response.data.firstname
        var lastName: string = response.data.lastname
        var authenticationToken: string = response.data.token
        var profilePic: string = response.data.profile_pic
        var email: string = response.data.email
        var phone: string = response.data.phone
        var verified: boolean = response.data.verified
		 var referral_popup_show: string = response.data.referral_popup_show
        var userProfile = new UserProfile()
        userProfile.firstName = firstName
        
        userProfile.lastName = lastName
        userProfile.profilePic = profilePic
        userProfile.email = email
        userProfile.phone = phone
        userProfile.verified = verified
        userProfile.referral_popup_show = referral_popup_show

        var user = new User('',userProfile)
        user.authenticationToken = authenticationToken
        
        return new LoginResponse(user)
    }
}