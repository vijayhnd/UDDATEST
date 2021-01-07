import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import UpdateProfileResponse from "./UpdateProfileResponse";
import Application from "../../Entities/Application";
import { UserRepository } from "../../Infrastructure/Repository/UserRespository";
import { UserProfile } from "../../Entities/User";

export default class UpdateProfileResponseParser implements IServiceResponseParser{
    parse(response: any): UpdateProfileResponse {
        var profileResponse = new UpdateProfileResponse()
        var userProfile = new UserProfile()
        userProfile!.firstName = response.data.firstname
        userProfile!.lastName = response.data.lastname
        userProfile!.profilePic = response.data.photo
        userProfile!.email = response.data.email
        userProfile!.phone = response.data.phone
        userProfile!.verified = response.data.verified
        userProfile!.balance = response.data.balance
        userProfile!.openPlayCount = response.data.open_plays
        userProfile!.coveredPlayCount = response.data.colvered_plays
        userProfile!.total_contest = response.data.total_contest
        userProfile!.chip_balance = response.data.chip_balance
        userProfile!.GamingBetCount = response.data.your_bets 
        userProfile!.my_referral_code = response.data.my_referral_code  //garima
        userProfile!.total_earn_by_referral = response.data.total_earn_by_referral  //garima
        userProfile!.dashboard_number_of_matches = response.data.dashboard_number_of_matches  //garima
        userProfile!.total_unread_push_notification = response.data.total_unread_push_notification  //ashish
        userProfile!.userType = response.data.type     
		userProfile!.fav_team_notification = response.data.fav_team_notification  //vijay
		userProfile!.high_lighted_match_notification = response.data.high_lighted_match_notification  //vijay
		userProfile!.game_result_notification = response.data.game_result_notification  //vijay
		userProfile!.private_bet_notification = response.data.private_bet_notification  //vijay
        userProfile!.private_contest_notification = response.data.private_contest_notification  //vijay
        userProfile!.level_array = response.data.level_array
        userProfile!.versionData = response.data.versionData
        userProfile!.shipping_address = response.data.shipping_address
		 userProfile!.displayName = response.data.displayname
		 userProfile!.defaultSelection = response.data.defaultSelection
		 userProfile!.promotional_notification_flag = response.data.promotional_notification_flag
		 userProfile!.favourite_teams_notification = response.data.favourite_teams_notification
		 userProfile!.bets_notification = response.data.bets_notification
		 userProfile!.contest_notification = response.data.contest_notification
		 userProfile!.allNotifications = response.data.allNotifications
		 userProfile!.noNotifications = response.data.noNotifications
		 userProfile!.oneNotification = response.data.oneNotification
        profileResponse.userProfile = userProfile
        Application.sharedApplication().user!.id = response.data.id
        Application.sharedApplication().user!.update(profileResponse)
        UserRepository.sharedRepository().saveUser(Application.sharedApplication().user!)
        return profileResponse
    }
}