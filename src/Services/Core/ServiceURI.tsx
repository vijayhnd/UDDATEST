export default class ServiceURI{

   //private static BASEURI = 'https://bet.udda.com/betting-app/index.php/' // live url 
   //static CONSTURI = 'https://bet.udda.com/betting-app/'



  // stagging url:http://uddastaging.triazinesoft.com/'     
  //dev url :http://uddadev.triazinesoft.com  new stagging url : 'https://staging.udda.com/'
 //private static BASEURI = 'https://staging.udda.com/index.php/'
// static CONSTURI = 'https://staging.udda.com/'

 //private static BASEURI = 'http://uddadev.triazinesoft.com/index.php/' 
//static CONSTURI = 'http://uddadev.triazinesoft.com/'
//   private static BASEURI = 'https://staging.udda.com/index.php/' 
//   static CONSTURI = 'https://staging.udda.com/'

private static BASEURI = 'http://uddadev.triazinesoft.com/index.php/'
static CONSTURI = 'http://uddadev.triazinesoft.com/'
 
//     private static BASEURI = 'https://staging.udda.com/index.php/'
//  static CONSTURI = 'https://staging.udda.com/'


   static OVERLAY = 0
  static APIVERSION3 = 'v2_8_1'
 // static APIVERSION3 = 'v5'

  static APPVERSION_iOS = 2.8
  static APPVERSION_ANDROID = 2.8

  static Side_APPVERSION_iOS = 'S_2.8'
  static Side_APPVERSION_ANDROID = 'S_2.8'

  private static APIVERSION = 'v2_8_1'
  private static APIVERSION2 = 'v2_8_1'
   static isLiveApp = '0'

//   private static APIVERSION = 'v5'
//  private static APIVERSION2 = 'v5'

 static RegistrationURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/email_signup'
 static LoginURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/email_login'
 static GuestLoginURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/GuestUser/guest_user'
 static FacebookRegistrationURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/facebook_signup'
 static GoogleRegistrationURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/google_signup'
 static TwitterRegistrationURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/twitter_signup'
 static SendOTPURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/send_otp'
 static VerifyOTPURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/verify_otp'
 static UpdateProfileURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/api/update_user_profile'
 static GetProfileURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/api/user_info'

 static CreateContestURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/apiGaming/create_private_contest'
 static FeedbackURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/api/feedback'    
 static SubscriptionURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/apiGaming/transaction'    
 static AcceptRejectContestURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/apiGaming/accept_private_contest'    
 static SendMsgURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/api/privatebet_msg'    
 static AcceptBetURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/apiGaming/accept_bet'    
 static PlaceBetURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/apiGaming/place_bet'    
 static BetFriendURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/apiGaming/prop_place_bet'   
 static SubscribeContestURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/PublicContest/subscribe_public_contest' 
 // static SubscribeContestURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/apiGaming/subscribe_contest' 
 static ResetPasswordURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/GuestUser/reset_password' 
 static CustomBetFriendURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/apiGaming/custom_bet_place' // Custom bet
 static CustomPoolBetFriendURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/Custom_PoolGaming/custom_pool_bet_place' // Custom bet
static CustomSquareURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/Custom_SquareGaming/custom_square_bet_place' // custom square
static CounterCustomBet = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/apiGaming/counter_custom_bet_place' // Counter Custom bet
static PhoneSignUpURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/phone_signup'  // signup with mobile number and display name
static VerifyPhoneOTPURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/verify_phone_signup_otp'  // signup with mobile number and display name
static phoneLoginURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/phone_login'  // signup with mobile number and display name
static VerifyPhoneLoginOTPURI = ServiceURI.BASEURI + ServiceURI.APIVERSION + '/auth/verify_phone_login_otp'  // signup with mobile number and display name
 //http://uddadev.triazinesoft.com/index.php/v5/Custom_PoolGaming/custom_pool_bet_place
}