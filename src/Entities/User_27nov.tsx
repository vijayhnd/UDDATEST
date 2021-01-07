import UpdateProfileResponse from "../Services/Profile/UpdateProfileResponse";

type email = string
interface IUserProfile{
    firstName: string
    lastName?: string
    email?: email
    phone?: string
    profilePic?: string
    balance?: string
    chip_balance?: string
    openPlayCount?:string
    coveredPlayCount?:string
    GamingBetCount?:string
    total_contest?:string
    verified: boolean
    userType:string 
    my_referral_code:string    //garima
    total_earn_by_referral:string //garima
    dashboard_number_of_matches:string //ashish
	fav_team_notification:string
	high_lighted_match_notification:string
	game_result_notification:string
	private_bet_notification:string
    private_contest_notification:string
    total_unread_push_notification:string
    level_array:any
    shipping_address:any
	displayName: string
    referral_popup_show: string
    versionData:any
    defaultSelection:any
    promotional_notification_flag:any
    favourite_teams_notification:any
    bets_notification:any
    contest_notification:any
    allNotifications:any
    noNotifications:any
    oneNotification:any
    
    
}

export class UserProfile implements IUserProfile{
    firstName = ''
    lastName = ''
    email = ''
    phone = ''
    profilePic = ''
    balance = '0.00'
    chip_balance = '0.00'
    verified = false
    openPlayCount = '0'
    coveredPlayCount = '0'
    GamingBetCount='0'
    total_contest='0'
    userType=''
    my_referral_code =''
    total_earn_by_referral ='0'
    dashboard_number_of_matches='20'
	fav_team_notification='0'
	high_lighted_match_notification='0'
	game_result_notification='0'
	private_bet_notification='0'
    private_contest_notification='0'
    total_unread_push_notification=''
    level_array={}
    shipping_address={}
	displayName=''
    referral_popup_show='0'
    versionData ={} 
    defaultSelection=''
    promotional_notification_flag =false
    favourite_teams_notification =false
    bets_notification =false
    contest_notification =false
    allNotifications =false
    noNotifications =false
    oneNotification =false
    constructor(){

    }
}

export interface IUser {
    id: string
    authenticationToken: string
    profile: IUserProfile

    update(withResponse: UpdateProfileResponse): void
}

export class User implements IUser{
    id: string
    profile: IUserProfile
    authenticationToken = ''

    constructor(id: string, profile: IUserProfile){
        this.id = id
        this.profile = profile
    }

    update(withResponse: UpdateProfileResponse){
        this.profile!.firstName = withResponse.userProfile!.firstName
        this.profile!.lastName = withResponse.userProfile!.lastName
        this.profile!.profilePic = withResponse.userProfile!.profilePic
        this.profile!.email = withResponse.userProfile!.email
        this.profile!.phone = withResponse.userProfile!.phone
        this.profile!.verified = withResponse.userProfile!.verified
        this.profile!.balance = withResponse.userProfile!.balance
        this.profile!.chip_balance = withResponse.userProfile!.chip_balance
        this.profile!.openPlayCount = withResponse.userProfile!.openPlayCount
        this.profile!.coveredPlayCount = withResponse.userProfile!.coveredPlayCount
        this.profile!.GamingBetCount = withResponse.userProfile!.GamingBetCount
        this.profile!.total_contest = withResponse.userProfile!.total_contest
        this.profile!.userType = withResponse.userProfile!.userType
        this.profile!.my_referral_code = withResponse.userProfile!.my_referral_code
        this.profile!.total_earn_by_referral = withResponse.userProfile!.total_earn_by_referral
        this.profile!.dashboard_number_of_matches = withResponse.userProfile!.dashboard_number_of_matches
        this.profile!.fav_team_notification = withResponse.userProfile!.fav_team_notification
        this.profile!.high_lighted_match_notification = withResponse.userProfile!.high_lighted_match_notification
        this.profile!.game_result_notification = withResponse.userProfile!.game_result_notification
        this.profile!.private_bet_notification = withResponse.userProfile!.private_bet_notification
        this.profile!.private_contest_notification = withResponse.userProfile!.private_contest_notification
        this.profile!.total_unread_push_notification = withResponse.userProfile!.total_unread_push_notification
        this.profile!.level_array = withResponse.userProfile!.level_array
		this.profile!.displayName = withResponse.userProfile!.displayName
		this.profile!.shipping_address = withResponse.userProfile!.shipping_address
        this.profile!.referral_popup_show = withResponse.userProfile!.referral_popup_show
        this.profile!.versionData = withResponse.userProfile!.versionData
        this.profile!.defaultSelection = withResponse.userProfile!.defaultSelection
        this.profile!.promotional_notification_flag = withResponse.userProfile!.promotional_notification_flag
        this.profile!.favourite_teams_notification = withResponse.userProfile!.favourite_teams_notification
        this.profile!.bets_notification = withResponse.userProfile!.bets_notification
        this.profile!.contest_notification = withResponse.userProfile!.contest_notification
        this.profile!.allNotifications = withResponse.userProfile!.allNotifications
        this.profile!.noNotifications = withResponse.userProfile!.noNotifications
        this.profile!.oneNotification = withResponse.userProfile!.oneNotification
    }
}