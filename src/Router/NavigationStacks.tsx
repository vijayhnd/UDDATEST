import { NavigationContainer } from "react-navigation";
import RouterBuilder from ".";
import G_AgeConfirmation from "../Modules/Onboarding/GamblingView/Splash/AgeConfirmation";
import G_LocationConfirmation from "../Modules/Onboarding/GamblingView/Splash/LocationConfimation";
import G_VerifyOTPView from "../Modules/Onboarding/GamblingView/OTP";
import G_LoginView from "../Modules/Onboarding/GamblingView/Login";
import G_RegistrationView from "../Modules/Onboarding/GamblingView/Registration";
import G_ForgotPassword from "../Modules/Onboarding/GamblingView/ForgotPassword/ForgotPassword";
import G_DashboardView from "../Modules/Onboarding/GamblingView/Dashboard";
import G_SettingsView from "../Modules/Onboarding/GamblingView/Settings/Settings";
import G_Highlighted_Matchups_View from "../Modules/Onboarding/GamblingView/Highlighted_Matchups";
import G_HistoryView from "../Modules/Onboarding/GamblingView/History";
import G_MostOpenActionView from "../Modules/Onboarding/GamblingView/MostOpenAction";
import G_CoveredPlaysView from "../Modules/Onboarding/GamblingView/CoveredPlays";
import G_FAQView from "../Modules/Onboarding/GamblingView/FAQ";
import G_ReferEarnView from "../Modules/Onboarding/GamblingView/ReferEarn"; //garima
import G_ProfileView from "../Modules/Onboarding/GamblingView/Profile";
import G_GameCastView from "../Modules/Onboarding/GamblingView/MatchDetails/GameCast";
import G_OpenPlaysView from "../Modules/Onboarding/GamblingView/OpenPlays/OpenPlays";
import G_PrivacyPolicyView from "../Modules/Onboarding/GamblingView/PrivacyPolicy/PrivacyPolicyView";
import G_PrivateBetView from "../Modules/Onboarding/GamblingView/PrivateBet/PrivateBetView";
import G_PrivateBetMessgesView from "../Modules/Onboarding/GamblingView/PrivateBetMesseges/PrivateBetMessgesView";
import G_SplashMain from "../Modules/Onboarding/GamblingView/Splash/SplashActivity/SplashMain";
import G_SplashView from "../Modules/Onboarding/GamblingView/Splash/SplashView";
import G_TermsOfUseView from "../Modules/Onboarding/GamblingView/TermsOfUse/TermsOfUseView";
import G_AddMoneyView from "../Modules/Onboarding/GamblingView/Wallet/AddMoney/AddMoneyView";
import G_WithdrawMoneyView from "../Modules/Onboarding/GamblingView/Wallet/WithdrawMoney/WithdrawMoneyView";
import G_MyFavoriteView from "../Modules/Onboarding/GamblingView/Favorite";
import G_GamingBetView from "../Modules/Onboarding/GamblingView/GamingBet";
import G_Settings_2_View from "../Modules/Onboarding/GamblingView/Settings_2";
import G_RedeemUddaBucks from "../Modules/Onboarding/GamblingView/RedeemUddaBucks";
import G_QuickGuide from "../Modules/Onboarding/GamblingView/QuickGuide";
import G_UddaContests from "../Modules/Onboarding/GamblingView/UddaContests";
import G_StandingList from "../Modules/Onboarding/GamblingView/StandingsList";
import G_PrivateContest from "../Modules/Onboarding/GamblingView/PrivateContest";
import G_ContestDashboardView from "../Modules/Onboarding/GamblingView/Contest_dashboard";
// import G_YourPrivateContest from "../Modules/Onboarding/GamblingView/YourPrivateContest";
import G_RedeemHistory from "../Modules/Onboarding/GamblingView/RedeemHistory";
import G_InvitationToJoin from "../Modules/Onboarding/GamblingView/InvitationToJoin";
import G_PrivateContestUserView from "../Modules/Onboarding/GamblingView/PrivateContestUser";
import G_TransactionHistoryView from "../Modules/Onboarding/GamblingView/TransactionHistory";
import G_InAPPPurchaseView from "../Modules/Onboarding/GamblingView/InAPPPurchase";
import G_InAPPSubscriptionView from "../Modules/Onboarding/GamblingView/InAPPSubscription";
import G_OnlyPrivacyPolicyView from "../Modules/Onboarding/GamblingView/OnlyPrivacyPolicy";
import G_OnlyTermsOfUseView from "../Modules/Onboarding/GamblingView/OnlyTermsOfUse";
import G_FAQ_QuickGuide from "../Modules/Onboarding/GamblingView/FAQ_QuickGuide";
import G_ResetPassword from "../Modules/Onboarding/GamblingView/ResetPassword";
import G_InfochartView from "../Modules/Onboarding/GamblingView/InfoChart";
import LandingView from "../LandingView";
import SplashLandingView from "../Splash_LandingView";
/* ADD by vijay */ 
import G_InAPPSubscriptionViewIOS from "../Modules/Onboarding/GamblingView/InAPPSubscriptionIOS";
import G_InAPPPurchaseViewIOS from "../Modules/Onboarding/GamblingView/InAPPPurchaseIOS";
import G_VerifyForgotOTPView from "../Modules/Onboarding/GamblingView/ForgotOTP";
import G_MyLeagueOrderView from "../Modules/Onboarding/GamblingView/MyLeagueOrder"; 
import G_CreateSquareView from "../Modules/Onboarding/GamblingView/Square";
import G_SelectGameView from "../Modules/Onboarding/GamblingView/Square/selectgame";
import G_AcceptSquare from "../Modules/Onboarding/GamblingView/Square/AcceptSquare";
import G_SquareBoard from "../Modules/Onboarding/GamblingView/Square/SquareBoard";
import G_SettleSquare from "../Modules/Onboarding/GamblingView/Square/SquareSettle";
// Add by ashish 

import G_CustomBet from "../Modules/Onboarding/GamblingView/Custom_Bet/Custom_Bet";
import G_CustomBetResult from "../Modules/Onboarding/GamblingView/Custom_Bet/Custom_result";
import G_Createpool from "../Modules/Onboarding/GamblingView/CreatePool/Createpool";
import G_Settlepool from "../Modules/Onboarding/GamblingView/CreatePool/Settlepool";
import G_ImageZoom from "../Modules/Onboarding/GamblingView/CreatePool/ImageZoom";
// import G_SettleSquare from "../Modules/Onboarding/GamblingView/Square/SquareSettle";
// import G_SquareBoard from "../Modules/Onboarding/GamblingView/Square/SquareBoard";
// import G_AcceptSquare from "../Modules/Onboarding/GamblingView/Square/AcceptSquare";
import G_ZoomSquare from "../Modules/Onboarding/GamblingView/Square/ZoomSquare";
import G_ContestviewSquare from "../Modules/Onboarding/GamblingView/Square/ContestviewSquare";
import G_SettlePoolInfoView from "../Modules/Onboarding/GamblingView/CreatePool/settlepoolinfo";
import G_AgreeDisagreeInfoView from "../Modules/Onboarding/GamblingView/CreatePool/agreedisagreeinfo";

import G_NotificationView from "../Modules/Onboarding/GamblingView/Push_notification";
import G_InAppPurchaseUpdateIOS from "../Modules/Onboarding/GamblingView/InAPPPurchaseIOS/InAPPurchaseUpdateIOS";
import G_MyRefereesView from "../Modules/Onboarding/GamblingView/MyReferees";
import G_ParticipantList from "../Modules/Onboarding/GamblingView/Participants/Participants";

import G_CounterCustomBet from "../Modules/Onboarding/GamblingView/Custom_Bet/Counter_Custom_Bet";


 import G_CreateBingo from "../Modules/Onboarding/GamblingView/Bingo/createBingo";
import G_SquareGift from "../Modules/Onboarding/GamblingView/Bingo/SquareGift"; 

import G_AcceptBingo from "../Modules/Onboarding/GamblingView/Bingo/AcceptBingo";
import G_ShareBingo from "../Modules/Onboarding/GamblingView/Bingo/ShareBingo";
import G_contestBingo from "../Modules/Onboarding/GamblingView/Bingo/ContestBingo";
import G_Spinner from "../Modules/Onboarding/GamblingView/Spinner/Spinner";
import G_VideoList from "../Modules/Onboarding/GamblingView/VideoList/Video_List";
import G_Yotube from "../Components/CustomComponents/Youtube/YotubePlayer";
import G_Notify from "../Modules/Onboarding/GamblingView/Notify/Notify";
import G_BetInfo from "../Modules/Onboarding/GamblingView/BetInfo/BetInfo";
import G_Scaner from "../Modules/Onboarding/GamblingView/BetInfo/Scanner";
import G_SummaryNotificationView from "../Modules/Onboarding/GamblingView/SummaryNotification/SummaryNotificationView";
import G_FtpContestDashboard from "../Modules/Onboarding/GamblingView/Ftpcontest/FtpContestDashboard";
import G_FtpCurrentStanding from "../Modules/Onboarding/GamblingView/Ftpcontest/FtpCurrentStanding";
import G_SpinnerPurchase from "../Modules/Onboarding/GamblingView/Spinner/Spinner_purchase";
export default class NavigationStacks {

    Gambling_OnboardingStack?: NavigationContainer
    Gambling_ApplicationStack?: NavigationContainer
    authenticationStack?: NavigationContainer
    applicationContainer?: NavigationContainer
    loggedOutStack?: NavigationContainer

    createNavigationStacks() {


        this.Gambling_OnboardingStack = RouterBuilder.createStackNavigator({

            G_AgeConfirmation: G_AgeConfirmation,
            G_LocationConfirmation: G_LocationConfirmation,
            G_VerifyOTPView: G_VerifyOTPView,
            G_VerifyForgotOTPView: G_VerifyForgotOTPView,
            G_LoginPage: G_LoginView,
            G_RegistrationView: G_RegistrationView,
            G_ForgotPassword: G_ForgotPassword,
            G_OnlyTermsOfUseView : G_OnlyTermsOfUseView,
            G_OnlyPrivacyPolicyView : G_OnlyPrivacyPolicyView,
            G_QuickGuide:G_QuickGuide,
            G_ResetPassword: G_ResetPassword,
            G_DashboardView: {
                screen: G_DashboardView,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
        })
this.loggedOutStack = RouterBuilder.createStackNavigator({
   
            G_LoginPage: {
                screen: G_LoginView,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            G_OnlyTermsOfUseView : G_OnlyTermsOfUseView,
            G_OnlyPrivacyPolicyView : G_OnlyPrivacyPolicyView,
        })

        this.Gambling_ApplicationStack = RouterBuilder.createStackNavigator({
            G_DashboardView: {
                screen: G_DashboardView,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            G_ProfileView: G_ProfileView,
            G_SettingsView: G_SettingsView,
            G_Settings_2_View: G_Settings_2_View,
            G_Highlighted_Matchups_View: G_Highlighted_Matchups_View,
            G_HistoryView: G_HistoryView,
            G_GameCastView: G_GameCastView,
            G_MostOpenActionView: G_MostOpenActionView,
            G_CoveredPlaysView: G_CoveredPlaysView,
            G_FAQView: G_FAQView,
            G_ReferEarnView :G_ReferEarnView, //garima
            G_CustomBet: G_CustomBet,//add by ashish
            G_CustomBetResult: G_CustomBetResult,//add by ashish
            G_Createpool: G_Createpool,//add by ashish
            G_Settlepool: G_Settlepool,//add by ashish
            G_ImageZoom: G_ImageZoom,//add by ashish
            // G_SettleSquare: G_SettleSquare,//add by ashish
            // G_SquareBoard: G_SquareBoard,//add by ashish
            // G_AcceptSquare: G_AcceptSquare,//add by ashish
            G_ZoomSquare: G_ZoomSquare,//add by ashish
            G_ContestviewSquare: G_ContestviewSquare,//add by ashish
            G_InAppPurchaseUpdateIOS: G_InAppPurchaseUpdateIOS,//add by ashish
            G_ParticipantList: G_ParticipantList,//add by ashish
            G_OpenPlaysView: G_OpenPlaysView,
            G_PrivacyPolicyView: G_PrivacyPolicyView,
            G_PrivateBetView: G_PrivateBetView,
            G_PrivateBetMessgesView: G_PrivateBetMessgesView,
            G_SplashMain: G_SplashMain,
            G_SplashView: G_SplashView,
            G_TermsOfUseView: G_TermsOfUseView,
            G_AddMoneyView: G_AddMoneyView,
            G_WithdrawMoneyView: G_WithdrawMoneyView,
            G_MyFavoriteView: G_MyFavoriteView,
            G_GamingBetView: G_GamingBetView,
            G_RedeemUddaBucks: G_RedeemUddaBucks,
            G_UddaContests: G_UddaContests,
            G_StandingList: G_StandingList,
            G_PrivateContest: G_PrivateContest,
            G_QuickGuide: G_QuickGuide,
            G_FAQ_QuickGuide: G_FAQ_QuickGuide,
            G_ContestDashboardView: G_ContestDashboardView,
            // G_YourPrivateContest: G_YourPrivateContest,
            G_RedeemHistory: G_RedeemHistory,
            G_InvitationToJoin: G_InvitationToJoin,
            G_PrivateContestUserView: G_PrivateContestUserView,
            G_TransactionHistoryView: G_TransactionHistoryView,
            G_InAPPPurchaseView: G_InAPPPurchaseView,
            G_InAPPSubscriptionView: G_InAPPSubscriptionView,
            G_InAPPSubscriptionViewIOS: G_InAPPSubscriptionViewIOS,
            G_InAPPPurchaseViewIOS: G_InAPPPurchaseViewIOS,
            G_InfochartView: G_InfochartView,
            G_MyLeagueOrderView: G_MyLeagueOrderView,
            G_CreateSquareView: G_CreateSquareView,
            G_SelectGameView: G_SelectGameView,
            G_AcceptSquare: G_AcceptSquare,
            G_SquareBoard: G_SquareBoard,
            G_SettleSquare: G_SettleSquare,
            G_SettlePoolInfoView: G_SettlePoolInfoView,
            G_AgreeDisagreeInfoView: G_AgreeDisagreeInfoView,
			G_NotificationView: G_NotificationView,
            G_MyRefereesView: G_MyRefereesView,            
            G_CreateBingo: G_CreateBingo,//ashish
            G_ShareBingo: G_ShareBingo,//ashish
			G_SquareGift: G_SquareGift,
			G_AcceptBingo: G_AcceptBingo,
			G_contestBingo: G_contestBingo,

			//G_MyRefereesView: G_MyRefereesView,
			G_CounterCustomBet: G_CounterCustomBet,           
			G_Spinner: G_Spinner,       //ashish    
			G_VideoList: G_VideoList,       //ashish    
			G_Yotube: G_Yotube,       //ashish    
			G_Notify: G_Notify,       //ashish    
            G_BetInfo: G_BetInfo,       //ashish    
            G_Scaner:G_Scaner,
            G_SummaryNotificationView:G_SummaryNotificationView,
            G_FtpContestDashboard:G_FtpContestDashboard,
            G_FtpCurrentStanding:G_FtpCurrentStanding,
            G_SpinnerPurchase:G_SpinnerPurchase,
			
        

        })

        this.applicationContainer = RouterBuilder.createSwitchNavigator({
            SplashLandingView: SplashLandingView,
            LandingView: LandingView,
            Gambling_OnboardingStack: this.Gambling_OnboardingStack,
            Gambling_ApplicationStack: this.Gambling_ApplicationStack,
            loggedOutStack: this.loggedOutStack,
        })
    }
}
