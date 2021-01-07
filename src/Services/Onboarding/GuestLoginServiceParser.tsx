import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import LoginResponse from "./LoginResponse";
import { UserProfile, User } from "../../Entities/User";
import AlertUtil from "../../Util/AlertUtil";
import GuestLoginResponse from "./GuestLoginResponse";

export default class GuestLoginServiceParser implements IServiceResponseParser{
       

    parse(response:any): GuestLoginResponse{
        var firstName: string = response.data.name
        var lastName: string = ''
        var authenticationToken: string = response.data.access_token
        var profilePic: string = ''
        var email: string = ''
        var phone: string = ''
        var verified: boolean = true
        var type: string = 'Guest'
        var userProfile = new UserProfile()
        userProfile.firstName = firstName
        
        userProfile.lastName = lastName
        userProfile.profilePic = profilePic
        userProfile.email = email
        userProfile.phone = phone
        userProfile.verified = verified
        userProfile.userType = type
        var user = new User('',userProfile)
        user.authenticationToken = authenticationToken
        
        return new GuestLoginResponse(user)
    }
}