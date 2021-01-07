//ashish by comment ok
import React, { Component } from "react";
import { View, Text, BackHandler, AsyncStorage, FlatList, Image, TouchableWithoutFeedback, Platform, Linking, Alert, TextInput, TouchableOpacity } from "react-native";
import Container from "../../../../Components/Container";
import {AppEventsLogger} from 'react-native-fbsdk'; 
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import SettingsStyles from "./SettingsStyles";
import BigButton from "../../../../Components/Button/BigButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Application from "../../../../Entities/Application";
import { SettingTable } from "./Setting_table";
import { AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { AppValidationComponentState } from "../../../../Util/AppValidationComponent";
import CustomToggleButton from "../../../../Components/CustomToggleButton";
import AlertUtil from "../../../../Util/AlertUtil";
import UrlService from '../../../../Services/Core/ServiceURI'
import LogoutUtill from "../../../../Util/LogoutUtill";
import { Dialog } from 'react-native-simple-dialogs';
import { Dropdown } from 'react-native-material-dropdown';
import ReferralService from "../../../../Services/Referral/ReferralService";
import ProgressLoader from 'rn-progress-loader';
import Rate, { AndroidMarket } from 'react-native-rate';
import ImagePicker from "react-native-image-picker";
import { UDDAError } from "../../../../Entities";
import { connect } from 'react-redux';
import { ServiceType } from "../../../../Services/Core/ServiceFactory";

import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import FeedbackRequest from "../../../../Services/Feedback/FeedbackRequest";
import FeedbackResponseParser from "../../../../Services/Feedback/FeedbackResponseParser";
import FeedbackResponse from "../../../../Services/Feedback/FeedbackResponse";
import Messgae from "../../../../Services/Core/Messages"
import Message from "../../../../Services/Core/Messages";
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";
import G_LoginView from '../Login/index';
const CleverTap = require('clevertap-react-native');
interface G_Settings_2_ViewProps extends AppValidationComponentProps {
    feedbackRequestStatus?: ServiceRequestStatus
    feedbackResponse?: FeedbackResponse
    feedbackError?: UDDAError
    serviceKey?: string
    listeners?: any
}

interface G_Settings_2_ViewState extends AppValidationComponentState {
    SettingData: any;
    guestUserDialog: any,
    data: any;
    loader: any;
    isFontSize:any;
    rated:any;
    count:any;
    Feedbackphoto: any;
    FeedbackimageFilePath: any;
    FeedbackphotoName: any;
    FeedbackSubject: any;
    FeedbackMsg: any;
    FeedbackDialogue: any;
    thanksDialog: any;
    userStatusDialog:any;
}


class G_Settings_2_View extends Component<G_Settings_2_ViewProps, G_Settings_2_ViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {

    private screenTitle = "SETTINGS"
    public favorite_notification = Application.sharedApplication().user!.profile!.fav_team_notification 
    public upcoming_notification = Application.sharedApplication().user!.profile!.high_lighted_match_notification
    public matchup_result_notification = Application.sharedApplication().user!.profile!.game_result_notification
    public private_bet_notification = Application.sharedApplication().user!.profile!.private_bet_notification
    public private_contest_notification = Application.sharedApplication().user!.profile!.private_contest_notification
    public authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private referralservice = new ReferralService(); //Vijay    
    private photoFieldName = 'Photo';
    private serviceRequestInProgress = false

    constructor(props: G_Settings_2_ViewProps) {
        super(props);
console.log('test notify',Application.sharedApplication().user.profile)
        this.state = {
            SettingData: SettingTable.settingData,
            guestUserDialog: false,
            data: Application.sharedApplication().user!.profile.dashboard_number_of_matches!,
            loader: false,
            isFontSize:'',
            rated:'',
            count:5,
            FeedbackSubject: '',
            FeedbackMsg: '',
            FeedbackDialogue: false,
            thanksDialog: false,
            Feedbackphoto: { name: this.photoFieldName, value: '' },
            FeedbackimageFilePath: '',
            FeedbackphotoName: 'Photo',
            userStatusDialog:false,
        }
    }

    componentWillMount() {
        this.setState({ data: Application.sharedApplication().user!.profile.dashboard_number_of_matches! })
        BackHandler.addEventListener('hardwareBackPress', () => {
           if (this.props) {
                RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
                return true;
            }
            return false;
        });
    }
   async componentDidMount() {
    let isFontsize = await AsyncStorage.getItem('isfontSize');
  
    await this.setState({ isFontSize: isFontsize});
        //this.getnotificationstate();
        console.log(this.props);
       // console.log(Application.sharedApplication().user!.profile);
      

    }

    getnotificationstate() {

        for (let i = 0; i < this.state.SettingData.length; i++) {
            if (i == 6) {
                for (let j = 0; j < this.state.SettingData[i].SubTitle.length; j++) {
                    if (this.state.SettingData[i].SubTitle[j].isToggle == true) {
                        if (j == 0) {
                            if (this.favorite_notification == '0') {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = false
                            }
                            else {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = true
                            }
                        }
                        else if (j == 1) {
                            if (this.upcoming_notification == '0') {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = false
                            }
                            else {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = true
                            }
                        }
                        else if (j == 2) {
                            if (this.matchup_result_notification == '0') {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = false
                            }
                            else {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = true
                            }
                        }
                        else if (j == 3) {
                            if (this.private_bet_notification == '0') {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = false
                            }
                            else {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = true
                            }
                        }
                        else if (j == 4) {
                            if (this.private_contest_notification == '0') {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = false
                            }
                            else {
                                this.state.SettingData[i].SubTitle[j].isToggleOn = true
                            }
                        }
                    }

                }
            }

        }
        this.setState({ SettingData: this.state.SettingData });
        console.log("settings table " + JSON.stringify(this.state.SettingData));
    }


    notification_state_change() {
        if (this.state.SettingData[6].SubTitle[0].isToggleOn == 1) {
            this.state.SettingData[6].SubTitle[0].isToggleOn = 1
        }
        else {
            this.state.SettingData[6].SubTitle[0].isToggleOn = 0
        }

        if (this.state.SettingData[6].SubTitle[1].isToggleOn == 1) {
            this.state.SettingData[6].SubTitle[1].isToggleOn = 1
        }
        else {
            this.state.SettingData[6].SubTitle[1].isToggleOn = 0
        }

        if (this.state.SettingData[6].SubTitle[2].isToggleOn == 1) {
            this.state.SettingData[6].SubTitle[2].isToggleOn = 1
        }
        else {
            this.state.SettingData[6].SubTitle[2].isToggleOn = 0
        }

        if (this.state.SettingData[6].SubTitle[3].isToggleOn == 1) {
            this.state.SettingData[6].SubTitle[3].isToggleOn = 1
        }
        else {
            this.state.SettingData[6].SubTitle[3].isToggleOn = 0
        }

        if (this.state.SettingData[6].SubTitle[4].isToggleOn == 1) {
            this.state.SettingData[6].SubTitle[4].isToggleOn = 1
        }
        else {
            this.state.SettingData[6].SubTitle[4].isToggleOn = 0
        }


        var params: any = {
            "fav_team_notification": this.state.SettingData[6].SubTitle[0].isToggleOn,
            "high_lighted_match_notification": this.state.SettingData[6].SubTitle[1].isToggleOn,
            "game_result_notification": this.state.SettingData[6].SubTitle[2].isToggleOn,
            "private_bet_notification": this.state.SettingData[6].SubTitle[3].isToggleOn,
            "private_contest_notification": this.state.SettingData[6].SubTitle[4].isToggleOn
        };

        console.log('notification_state_change body param ' + JSON.stringify(params));
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        /* fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/update_notification_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorisation': this.authorisationToken
            },
            body: formData,

        }).then(
		(response) => {
			console.log(response);
			 return response.json()
		}).then((responseJson) => {
                console.log('update_notification_status response ' + JSON.stringify(responseJson))
                //   {"error":0,"version":"1.0","message":"success","data":"Notification setting updated successfully..!"}
                if (responseJson.message == "success"){
                    AlertUtil.show(responseJson.data);
                } else{
                    AlertUtil.show(JSON.stringify(responseJson.message)); 
                }  
            })
   */
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/update_notification_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken
            },
            body: formData,

        }).then((response) => {
            console.log(response);
            return response.json()
        })
            .then((responseJson) => {

                console.log('Dashboard Data ' + JSON.stringify(responseJson));
                if (responseJson.message == "success") {
                    this.referralservice.getProfile().then((res: any) => {
                        if (res) {
                           
                        }
    
                    });
                    AlertUtil.show(responseJson.data);
                } else {
                    AlertUtil.show(JSON.stringify(responseJson.message));
                }

            })
            .catch(error => {
                console.log(error);
            })
    }



    iconDidTapped() {
        this.props.navigation!.goBack(null);
        return true;
    }

    LogoiconDidTapped() {
        //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
		RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
    }

    accountNameTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_ProfileView, this.props)
    }

    availableBalanceTapped() {

    }

    openPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }

    logoutButtonPressed() {
        AsyncStorage.setItem('isLoggedIn','true');
        AsyncStorage.setItem('FingerPopup','true');
        Application.sharedApplication().logout()
        AsyncStorage.removeItem("FromGame");
        AsyncStorage.removeItem("FromGambling");
        Application.sharedApplication().FromGame = false;
        Application.sharedApplication().FromGame = false;
        //RouterBuilder.resetRouteTo(AppScreens.SplashLandingView, this.props)
        RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
    }
    loginButtonPressed() {
        this.setState({ guestUserDialog: false });
        RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
    }


    clickHeader(index: any, item: any) {
       
        for (let i = 1; i < this.state.SettingData.length; i++) {
            if (i == index) {
                if (index == 4 || index == 5) {
                    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                        this.setState({ guestUserDialog: true });
                    } else {
                        this.state.SettingData[i].isSelected = !this.state.SettingData[i].isSelected
                    }
                } else {
                    this.state.SettingData[i].isSelected = !this.state.SettingData[i].isSelected
                }

            }

            else {
                this.state.SettingData[i].isSelected = false;
            }
        }
        this.setState({ SettingData: this.state.SettingData });
        if (index == 0) {
            if(UrlService.isLiveApp == '1'){
            this.referralservice.logEvent('AvailableContests_Menu_Click', {});
            AppEventsLogger.logEvent('AvailableContests_Menu_Click');
            CleverTap.recordEvent('AvailableContests_Menu_Click');
            
            }
           
            // this.props.navigation!.navigate(AppScreens.G_YourPrivateContest);
            this.props.navigation!.replace(AppScreens.G_UddaContests,{params:{bet_id:'ashish'}});
        }
        else if (index == 2) {
            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                this.setState({ guestUserDialog: true });
            } else {

                // this.props.navigation!.navigate(AppScreens.G_Spinner);
                this.getSpinData()
        }
           
        }
        else if (index == 3) {
            if(UrlService.isLiveApp == '1'){
                
            this.referralservice.logEvent('Profile_Menu_Click', {});
            AppEventsLogger.logEvent('Profile_Menu_Click');
            CleverTap.recordEvent('Profile_Menu_Click');
            }
            this.props.navigation!.navigate(AppScreens.G_ProfileView);
        }
        else if (index == 4) {
            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                this.setState({ guestUserDialog: true });
            } else {
                
                //  this.props.navigation!.navigate(AppScreens.G_CustomBetResult);
            }
        }
        else if (index == 6) {
            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                this.setState({ guestUserDialog: true });
            } else {

               // RouterBuilder.replaceRouteTo(AppScreens.G_Notify, this.props);
               this.props.navigation!.navigate(AppScreens.G_Notify);
        }
           
        }
        else if (index == 7) {
            if(UrlService.isLiveApp == '1'){
            this.referralservice.logEvent('Faq_Menu_Click', {});
            AppEventsLogger.logEvent('Faq_Menu_Click');
            CleverTap.recordEvent('Faq_Menu_Click');
            }
            this.props.navigation!.navigate(AppScreens.G_FAQView);
        }
        //garima
        else if (index == 8) {
            if(UrlService.isLiveApp == '1'){
            this.referralservice.logEvent('ReferAndEarn_Menu_Click', {});
            AppEventsLogger.logEvent('ReferAndEarn_Menu_Click');
            CleverTap.recordEvent('ReferAndEarn_Menu_Click');
            }
            this.props.navigation!.navigate(AppScreens.G_ReferEarnView);
        }
        else if (index == 9) {
            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                this.setState({ guestUserDialog: true });
            } else {
            Alert.alert(
                'Like it?',
                'Are you enjoying UDDA app?.',
                [
                    { text: 'Yes', onPress: () => this.startRatingCounter() },
                    {
                        text: 'No',
                        onPress: () => { console.log('No Thanks Pressed'); this.feedbackDialogOpen();},
                        style: 'cancel',
                    },
                ],
                { cancelable: false }
            );
        }
           
        }else if (index == 10) {
            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                this.setState({ guestUserDialog: true });
            } else {
            this.props.navigation!.push(AppScreens.G_Scaner)
            }
           
        }

    }

    getSpinData() {

        if(this.checkUserStatus("spin"))
        {
            
        }
        else
        {
            return;
        }
        this.props.navigation!.navigate(AppScreens.G_Spinner);
     
    // this.setState({loader:true})
    //     fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Spin/spin_info', {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         'authorisation': this.authorisationToken
    //       },
    //     }).then((response) => response.json())
    //       .then((responseJson) => {
    //         var that=this;
           
    // if (responseJson.message == "Access Expired.") {
    //     console.log("Footer comp ---->" + responseJson.message);
    //     //this.logoutButtonPressed();
    //     that.setState({loader:false})
    //   }
    //   else{

    //    console.log('spinData>>' +JSON.stringify(responseJson));
      

       
    //         that.setState({loader:false});
    //         var a = []
    //         responseJson.data.boardData.map((item)=>{
    //             a.push(item.product_title)
    //         })
    //         console.log('spinData product title >>' , a);
    //            this.props.navigation!.navigate(AppScreens.G_Spinner, { params: { spinner_data: a,spinner_alldata: responseJson.data,popup:responseJson.show_plan_pop_up } });
     
    //     }
    
    //       })
    //       .catch(error => {
    //        // AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
    //         console.log(error);
    //       })
      }

      checkUserStatus(betName:any)
{
 // this.updateAppNotice();
 // return;
  console.log('bet name'+betName);
//  alert(betName)
  var that = this;
  //that.setState({ userStatusDialog: true });

 console.log(Application.sharedApplication().user!.profile.level_array.restricted_bets);
 //if( Application.sharedApplication().user.level_array.restricted_bets)
var status = true;
 for(let i = 0; i < Application.sharedApplication().user!.profile.level_array.restricted_bets.length; i++){
  if(Application.sharedApplication().user!.profile.level_array.restricted_bets[i].type == betName)
  {
    status = false;
  that.setState({ userStatusDialog: true });
  }

 }

  return status;
}

      goToInappPage() {
        this.setState({ userStatusDialog: false });
    
        // this.props.navigation!.navigate(AppScreens.G_LoginPage);
    
       // this.props.navigation!.navigate(AppScreens.G_InAppPurchaseUpdateIOS);
       // this.props.navigation!.replace(AppScreens.G_InAPPPurchaseViewIOS,{params:{callFrom:'userLevel'}});
        this.props.navigation!.navigate(AppScreens.G_InAPPPurchaseViewIOS,{params:{callFrom:'userLevel'}});
      }

    startRatingCounter = () => {
        //Initialize count by 5 to start counter for 5 sec
        this.setState({ count: 1 });
     /*    let t = setInterval(() => {
            this.setState({ count: this.state.count - 1 });
            if (this.state.count == 0) {
                clearInterval(t); */
                //After 5 second ask for the rate this app
                Alert.alert(
                    'Rate App',
                    'Would you like to share your review with us? This will help and motivate us a lot.',
                    [
                        { text: 'Sure', onPress: () => this.openStore() },
                        {
                            text: 'No Thanks!',
                            onPress: () => { console.log('No Thanks Pressed');},
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false }
                );
        /*     }
        }, 1000); */
    };
    openStore = () => {
       /*  //This is the main trick
        const APP_STORE_LINK = 'https://apps.apple.com/in/app/dominos-pizza/id523106486';
        // const APP_STORE_LINK = 'itms://apps.apple.com/us/app/apple-store/id1484047531?mt=8';
       // const APP_STORE_LINK = 'https://apps.apple.com/us/app/udda-sports/id1484047531';
        const PLAY_STORE_LINK = 'market://details?id=com.risl.jansoochna'; 
        if (Platform.OS != 'ios') {
            Linking.openURL(PLAY_STORE_LINK).catch(err =>
                console.log('Please check for the Google Play Store')
            );
        } else {
            Linking.openURL(
                APP_STORE_LINK
            ).catch(err => console.log('Please check for the App Store'));
        } */
        let options = {
            AppleAppID: "1484047531",
            GooglePackageName: "com.uddaapp.gaming",
            OtherAndroidURL: "http://www.randomappstore.com/app/47172391",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: false,
            openAppStoreIfInAppFails: true,
            fallbackPlatformURL: "http://www.mywebsite.com/myapp.html",
        }
        Rate.rate(options, (success) => {
            if (success) {
                // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                this.setState({ rated: true })
            }
        }) 
    };

    switchValueChanged(item: any, subindex: any, mainindex: any) {
        for (let i = 0; i < this.state.SettingData.length; i++) {
            if (i == 2 && mainindex == i) {
                for (let j = 0; j < this.state.SettingData[i].SubTitle.length; j++) {
                    if (this.state.SettingData[i].SubTitle[j].isToggle == true) {
                        if (j == subindex) {
                            this.state.SettingData[i].SubTitle[j].isToggleOn = !this.state.SettingData[i].SubTitle[j].isToggleOn
                        }
                        else {
                            this.state.SettingData[i].SubTitle[j].isToggleOn = false;
                        }
                    }

                }
            }
            //garima to diable Preferences Gaming Toggle
            // else if (i == 3 && mainindex == i) {
            //     for (let j = 0; j < this.state.SettingData[i].SubTitle.length; j++) {
            //         if (this.state.SettingData[i].SubTitle[j].isToggle == true) {
            //             if (j == subindex) {
            //                 this.state.SettingData[i].SubTitle[j].isToggleOn = !this.state.SettingData[i].SubTitle[j].isToggleOn
            //             }
            //         }

            //     }
            // }
            else if (i == 6 && mainindex == i) {
                for (let j = 0; j < this.state.SettingData[i].SubTitle.length; j++) {
                    if (this.state.SettingData[i].SubTitle[j].isToggle == true) {
                        if (j == subindex) {
                            this.state.SettingData[i].SubTitle[j].isToggleOn = (this.state.SettingData[i].SubTitle[j].isToggleOn == 0) ? 1 : 0
                        }
                    }

                }
                this.setState({ SettingData: this.state.SettingData });
                this.notification_state_change();
            }

        }
        this.setState({ SettingData: this.state.SettingData });
    }

    labelclick(item: any, subindex: any, mainindex: any) {
    
        for (let i = 0; i < this.state.SettingData.length; i++) {
            if (i == 4 && mainindex == i) {
                for (let j = 0; j < this.state.SettingData[i].SubTitle.length; j++) {

                    if (j == 0 && subindex == j) {
                       // alert('subscription')
                        if (Platform.OS === 'ios') {
                            this.props.navigation!.navigate(AppScreens.G_InAPPSubscriptionViewIOS);
                        }
                        else {
                            this.props.navigation!.navigate(AppScreens.G_InAPPSubscriptionView);
                        }


                    }
                    else if (j == 1 && subindex == j) {
                        if(UrlService.isLiveApp == '1'){
                        this.referralservice.logEvent('BuyUddaBucks_Menu_Click', {});
                        AppEventsLogger.logEvent('BuyUddaBucks_Menu_Click');
                        CleverTap.recordEvent('BuyUddaBucks_Menu_Click');
                        }
                        if (Platform.OS === 'ios') {
                          //  this.props.navigation!.navigate(AppScreens.G_InAPPPurchaseViewIOS);
                          this.props.navigation!.navigate(AppScreens.G_InAPPPurchaseViewIOS ,{params:{callFrom:'sideMenu'}});
                           
                            //// pradeep 
                        }
                        else {

                            this.props.navigation!.navigate(AppScreens.G_InAPPPurchaseViewIOS ,{params:{callFrom:'sideMenu'}});
                            // this.props.navigation!.navigate(AppScreens.G_InAPPPurchaseView);
                        }
                    }
                    else if (j == 2 && subindex == j) {
                        //alert('Redeem UDDA Bucks')
                        this.props.navigation!.navigate(AppScreens.G_RedeemUddaBucks);
                    }
                    else if (j == 3 && subindex == j) {
                        if(UrlService.isLiveApp == '1'){
                        this.referralservice.logEvent('TransactionHistory_Menu_Click', {});
                        AppEventsLogger.logEvent('TransactionHistory_Menu_Click');
                        CleverTap.recordEvent('TransactionHistory_Menu_Click');
                        }
                        if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                            this.setState({ guestUserDialog: true });
                        }
                        else {
                            this.props.navigation!.navigate(AppScreens.G_TransactionHistoryView);
                        }
                    }
                    else if (j == 4 && subindex == j) {
                      //  alert('Redeem History');
                        if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                            this.setState({ guestUserDialog: true });
                        }
                        else {
                            this.props.navigation!.navigate(AppScreens.G_RedeemHistory);
                        }
                    }

                }
            } else if (i == 1 && mainindex == i) {
                for (let j = 0; j < this.state.SettingData[i].SubTitle.length; j++) {
                    if (this.state.SettingData[i].SubTitle[j].isToggle == false) {
                        if (j == 0 && subindex == j) {
                            if(UrlService.isLiveApp == '1'){
                            this.referralservice.logEvent('SettleCustomBet_Menu_Click', {});
                            AppEventsLogger.logEvent('SettleCustomBet_Menu_Click');
                            CleverTap.recordEvent('SettleCustomBet_Menu_Click');
                            }
                            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                                this.setState({ guestUserDialog: true });
                            } else {
                                this.props.navigation!.navigate(AppScreens.G_CustomBetResult,{params:{bet_id:''}});
                                // this.props.navigation!.navigate(AppScreens.G_CustomBetResult);
                            }
                            
                        } else if (j == 1 && subindex == j) {
                            if(UrlService.isLiveApp == '1'){
                            this.referralservice.logEvent('SettlePool_Menu_Click', {});
                            AppEventsLogger.logEvent('SettlePool_Menu_Click');
                            CleverTap.recordEvent('SettlePool_Menu_Click');
                            }
                            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                                this.setState({ guestUserDialog: true });
                            } else {
                                this.props.navigation!.navigate(AppScreens.G_Settlepool,{params:{bet_id:''}});
                                // this.props.navigation!.navigate(AppScreens.G_Settlepool);
                            }
                            
                        } else if (j == 2 && subindex == j) {
                            
                        //   //  alert('Football Squares navigation')
                        //    this.props.navigation!.navigate(AppScreens.G_SquareBoard);
                        //     // this.props.navigation!.navigate(AppScreens.G_AcceptSquare);
                        //    // this.props.navigation!.navigate(AppScreens.G_ZoomSquare);
                        } else if (j == 3 && subindex == j) {
                            alert('Brackets navigation')
                            // this.props.navigation!.navigate(AppScreens.G_Createpool);
                        }
                    }
                }
            }
            else if (i == 5 && mainindex == i) {
                for (let j = 0; j < this.state.SettingData[i].SubTitle.length; j++) {
                    if (this.state.SettingData[i].SubTitle[j].isToggle == false) {
                        if (j == 2 && subindex == j) {
                            if(UrlService.isLiveApp == '1'){
                            this.referralservice.logEvent('MyFavorites_Menu_Click', {});
                            AppEventsLogger.logEvent('MyFavorites_Menu_Click');
                            CleverTap.recordEvent('MyFavorites_Menu_Click');
                            }
                            this.props.navigation!.navigate(AppScreens.G_MyFavoriteView);
                        } else if (j == 3 && subindex == j) {
                            if(UrlService.isLiveApp == '1'){
                            this.referralservice.logEvent('MyLeagueOrder_Menu_Click', {});
                            AppEventsLogger.logEvent('MyLeagueOrder_Menu_Click');
                            CleverTap.recordEvent('MyLeagueOrder_Menu_Click');
                            }
                            this.props.navigation!.navigate(AppScreens.G_MyLeagueOrderView);
                        }
                    }
                }
            }
        }
    }
    setlabel(id: any) {
        // alert(this.state.data)
        this.setState({ loader: true });
        // console.log(this.props.navigation?.state.params.dashboard); return;
        this.setState({ data: id });
        console.log('drodown value', id)
        if (id == 'Select') {
            var params: any = {
                'number_of_matches': '0'
            };
        } else {
            var params: any = {
                'number_of_matches': id
            };
        }
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }


        fetch(UrlService.CONSTURI+'index.php/'+ UrlService.APIVERSION3 + '/api/dashboard_number_of_matches', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log('no of matches ', responseJson);
                this.referralservice.getProfile().then((res: any) => {
                    if (res) {
                        this.setState({ loader: false });
                        console.log(this.props.navigation?.state);
                        if (this.props.navigation.state.params) {
                            if (this.props.navigation?.state.params.dashboard) {
                                this.props.navigation!.navigate(AppScreens.G_DashboardView, { setting: true });
                            } else if (this.props.navigation?.state.params.contest) {
                                if(this.props.navigation?.state.params.version>2.7)
                                {
                                    this.props.navigation!.navigate(AppScreens.G_FtpContestDashboard, { setting: true });
                                }else{
                                    this.props.navigation!.navigate(AppScreens.G_ContestDashboardView, { setting: true });
                                }
                                // this.props.navigation!.navigate(AppScreens.G_ContestDashboardView, { setting: true });
                            }
                        }
                    }

                });
                //   this.setState({ loader: false });
                //   this.setState({ customProbBetList: responseJson.data });
                //   console.log('Success openplay' + JSON.stringify(this.state.customProbBetList));
                // this.setState({ dialogVisible: true });
                if (responseJson.message == "Access Expired.") {
                    this.setState({ loader: false });
                    AlertUtil.show("Session Expired ! Please login again");
                    //     console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => {
                this.setState({ loader: false });
                //  this.setState({ loader: false });
                console.log(error);
            })
    }

    setcustom() {
        //  alert('hello setcustom function')
        this.props.navigation!.navigate(AppScreens.G_CustomBetResult);
    }
    isFontChange(fontSize:any){
        AsyncStorage.setItem('isfontSize', fontSize);
        this.setState({ isFontSize: fontSize });
        console.log('yes',this.props.navigation.state.params)
      
        if (this.props.navigation.state.params) {
            let navigation = this.props.navigation;
            let dashboard = navigation.getParam('dashboard');
            let contest = navigation.getParam('contest');
            let highlighted = navigation.getParam('highlighted');
            let gameList = navigation.getParam('gameList');

            if (dashboard) {
                setTimeout(()=>{
                    this.props.navigation!.navigate(AppScreens.G_DashboardView, { setting: true });
                },500)
               
            } else if (contest) {
                setTimeout(() => {
                    if(this.props.navigation?.state.params.version>2.7)
                                {
                                    this.props.navigation!.navigate(AppScreens.G_FtpContestDashboard, { setting: true });
                                }else{
                                    this.props.navigation!.navigate(AppScreens.G_ContestDashboardView, { setting: true });
                                }
                    // this.props.navigation!.navigate(AppScreens.G_ContestDashboardView, { setting: true });
                }, 500)
               
            } else if(highlighted) {
                setTimeout(() => {
                    this.props.navigation!.navigate(AppScreens.G_Highlighted_Matchups_View, { setting: true });
                }, 500)
            } else if(gameList) {
                setTimeout(() => {
                    this.props.navigation!.navigate(AppScreens.G_CreateSquareView, { setting: true });
                }, 500)
            }
           
        }
    }

    /* Feedback */
    submitFeedbackAPI() {

        if (this.state.FeedbackSubject == '') {
            AlertUtil.show('Please Enter Subject');
            return false;
        }
        else if (this.state.FeedbackMsg == '') {
            AlertUtil.show('Please Enter Message');
            return false;
        }
        else {

            var FeedbackRequset = new FeedbackRequest(
                this.state.FeedbackSubject,
                this.state.FeedbackMsg,
                this.state.Feedbackphoto!.value
            )
            var serviceAction = new ServiceAction()
            var responseParser = new FeedbackResponseParser()
            this.props.dispatch!(serviceAction.request(ServiceType.Feedback,
                ServiceKeys.FeedbackServiceName,
                FeedbackRequset,
                [this.constructor.name],
                responseParser))


        }
    }

    feedbackDialogOpen() {
        console.log('voc click ');
        if (Application.sharedApplication().user!.profile.userType == 'Guest') {
            this.setState({ guestUserDialog: true });
            this.setState({ FeedbackDialogue: false });
            this.setState({ thanksDialog: false });
            this.setState({ FeedbackSubject: '' });
            this.setState({ FeedbackMsg: '' });
            this.setState({ FeedbackphotoName: 'Photo' });
            this.setState({ Feedbackphoto: '' });
        }
        else {
            this.setState({ FeedbackDialogue: true });
            this.setState({ thanksDialog: false });
            this.setState({ FeedbackSubject: '' });
            this.setState({ FeedbackMsg: '' });
            this.setState({ FeedbackphotoName: 'Photo' });
            this.setState({ Feedbackphoto: '' });
        }

    }

    feedbackDialogClose() {
        this.setState({ FeedbackDialogue: false });
    }
    thanksDialogClose() {
        this.setState({ thanksDialog: false });
    }
    Clickonbrowse() {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                let localTime = new Date().getTime();
                this.setState({ Feedbackphoto: { name: this.photoFieldName, value: response.data }, FeedbackimageFilePath: source.uri });
                this.setState({ FeedbackphotoName: localTime + '.jpg' });
            }
        });

    }

    ClickonRemove() {
        this.setState({ Feedbackphoto: '' });
        this.setState({ FeedbackphotoName: 'Photo' });
    }
    componentWillReceiveProps(nextProps: G_Settings_2_ViewProps) {
        if (nextProps.listeners!.includes(this.constructor.name)) {
             if (nextProps.serviceKey === ServiceKeys.FeedbackServiceName) {
                switch (nextProps.requestStatus) {
                    case ServiceRequestStatus.FinishedWithSuccess:
                        this.serviceRequestInProgress = false;
                        console.log("feedbackResponse  from yes and no" + JSON.stringify(nextProps.feedbackResponse));
                        var response = nextProps.feedbackResponse!.response;
                        if (response.message == "success") {
                            this.setState({ FeedbackDialogue: false });
                            this.setState({ thanksDialog: true });
                        }
                        var serviceAction = new ServiceAction()
                        nextProps.dispatch!(serviceAction.reset())
                        break
                    case ServiceRequestStatus.FinishedWithError:
                        this.serviceRequestInProgress = false
                        var errorMessage = nextProps.error!.message
                        AlertUtil.show(errorMessage)
                        var serviceAction = new ServiceAction()
                        nextProps.dispatch!(serviceAction.reset())
                        break
                    case ServiceRequestStatus.Started:
                    case ServiceRequestStatus.InProgress:
                        this.serviceRequestInProgress = true
                        break
                }

            }
        }
    }
    closeModal() {
        this.setState({ guestUserDialog: !this.state.guestUserDialog });
      }
    render() {
        let data = [{
            value: 'All',
        },{
            value: '10',
        }, {
            value: '20',
        }, {
            value: '30',
        }, {
            value: '40',
        }, {
            value: '50',
        }];
        let fontData = [{ 'label': 'Small', 'value': '1.4' },
            { 'label': 'Medium', 'value': '1.8' },
            { 'label': 'Large', 'value': '2.2' }]
        return (
            <Container
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                showIndicator={this.serviceRequestInProgress}
                menuIconListener={this}
                isSetting={true}
                LogoIconListener={this}
                accountNameListener={this}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}>
                    {this.state.guestUserDialog?<Guestdialog detailmodel={this.state.guestUserDialog} onDismiss={() => {
                  this.closeModal();
                }} onClick={() => {
                    this.loginButtonPressed();
                  }}/>:null}
                 
                <ProgressLoader
                    visible={this.state.loader}
                    isModal={true} isHUD={true}
                    hudColor={"#68bcbc"}
                    color={"#FFFFFF"} />
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={SettingsStyles.scrollContent}
                    automaticallyAdjustContentInsets={false}
                    contentInset={{ top: 0, bottom: 0 }}
                    scrollEnabled={true}
                    bounces={false}>

                    <View style={[SettingsStyles.mainContent]}>
                        <View style={[SettingsStyles.titleContainer]}>
                            <View style={{ width: '100%', height: 'auto', justifyContent: 'center' }}>
                                <Text style={[SettingsStyles.titleText, { textAlign: 'center' }]}>SETTINGS</Text>
                            </View>
                        </View>

                        <View style={[SettingsStyles.settingsContainer]}>


                            <FlatList
                                extraData={this.state}
                                data={this.state.SettingData}
                                keyExtractor={(item: any, index) => index.toString()}
                                bounces={false}
                                renderItem={({ item, index }: any) => {
                                    var mainindex = index;
                                    return (
                                        <View>
                                            <TouchableWithoutFeedback onPress={() => { this.clickHeader(mainindex, item) }}>
                                                <View style={{ flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 5, width: '100%', backgroundColor: item.isSelected == true ? '#dddddd' : 'white' }}>
                                                    <View style={{ flexDirection: 'row', width: '92%', }}>
                                                        <Image source={item.isSelected == true ? item.selected_image : item.unselected_image} style={{ width: 40, height: 40, marginHorizontal: 10, }} resizeMode='contain' />
                                                        <Text style={[SettingsStyles.headerTitle, { color: item.isSelected == true ? '#68bcbc' : 'black' }]}>{item.title}</Text>
                                                    </View>
                                                    <View style={{ justifyContent: 'center', width: '8%' }}>
                                                        <Image source={require('../../../../images/next_icon_transparent.png')} style={[SettingsStyles.nextIcon, { transform: item.isSelected == true ? [{ rotate: '90deg' }] : [{ rotate: '0deg' }] }]} resizeMode='contain' />
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            {item.SubTitle && item.isSelected == true ?
                                                <FlatList
                                                    data={item.SubTitle}
                                                    extraData={this.state}
                                                    keyExtractor={(item: any, index) => index.toString()}
                                                    renderItem={({ item, index }: any) => {
                                                        var subindex = index;
                                                        return (

                                                            <View>

                                                                <View style={{ paddingLeft: hp(8), flexDirection: 'row', width: '100%' }}>
                                                                    {item.sub_title != '' ? <TouchableWithoutFeedback onPress={() => { this.labelclick(item, subindex, mainindex) }}>
                                                                        <Text style={[SettingsStyles.subTitle,
                                                                        {
                                                                            color: item.isHeader == true ? '#6a6a6a' : '#666666',
                                                                            fontFamily: item.isHeader == true ? 'Montserrat-SemiBold' : 'Montserrat-Regular',
                                                                        }
                                                                        ]}>
                                                                            {item.sub_title}
                                                                        </Text>
                                                                    </TouchableWithoutFeedback> : null}

                                                                    {item.isToggle == true ?
                                                                        <View style={{ alignSelf: 'center' }}>
                                                                            <CustomToggleButton
                                                                                isChecked={item.isToggleOn}
                                                                                buttonStyle={[{ height: hp(3), width: hp(5) }]}
                                                                                listener={(isOn) => this.switchValueChanged(item, subindex, mainindex)} />
                                                                        </View>

                                                                        : item.input == true ? <View style={{ width: '33%',paddingRight:5}}>
                                                                            <Dropdown
                                                                                itemTextStyle={[ { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}

                                                                               dropdownOffset={{ top: 0, left: 0 }}
                                                                                 dropdownMargins={{ min: 20, max: 20 }}
                                                                                 dropdownPosition={-5.2}
                                                                                value={this.state.data}
                                                                                data={data}
                                                                                onChangeText={value => this.setlabel(value)}
                                                                            />
                                                                          
                                                                        </View>
                                                                            : item.isdropown == true ? <View style={{ width: '33%', paddingRight: 5 }}>
                                                                              
                                                                        <Dropdown
                                                                            itemTextStyle={[{ padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.1), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                                                                            dropdownOffset={{ top: 0, left: 0 }}
                                                                            dropdownMargins={{ min: 0, max: 0 }}
                                                                            dropdownPosition={-4.2}
                                                                                    data={fontData}
                                                                                     value={this.state.isFontSize ?this.state.isFontSize :'1.4'}
                                                                            onChangeText={value => this.isFontChange(value)}
                                                                        />

                                                                    </View>
                                                                         :
                                                                            null}
                                                                </View>
                                                            </View>
                                                        )
                                                    }} />
                                                : null}
                                        </View>
                                    )
                                }} />

                        </View>
                        {Application.sharedApplication().user!.profile.userType != 'Guest' ?
                            <View style={[SettingsStyles.logoutContainer]}>
                                <BigButton title='LOG OUT'
                                    style={[SettingsStyles.logoutButtonStyle]}
                                    textStyle={[SettingsStyles.logoutButtonTextStyle]}
                                    listener={this.logoutButtonPressed.bind(this)}>
                                </BigButton>
                            </View> : <View style={[SettingsStyles.logoutContainer]}>
                                <BigButton title='REGISTER'
                                    style={[SettingsStyles.logoutButtonStyle]}
                                    textStyle={[SettingsStyles.logoutButtonTextStyle]}
                                    listener={this.loginButtonPressed.bind(this)}>
                                </BigButton>
                            </View>
                        }
                        <View style={{padding:10}}>
                        <Text style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',textAlign: 'center',color:'#b9b7b7'}]}>App Version {Platform.OS === 'ios' ? UrlService.Side_APPVERSION_iOS : UrlService.Side_APPVERSION_ANDROID}</Text>
                        </View>

                        {/* <Text>Version {UrlService.APIVERSION3}</Text> */}
                    </View>
                    
                    {/* -------------------------------- Guest User Dialogue --------------------------------*/}
                    <Dialog
                        //visible={this.state.guestUserDialog}
                        title=""
                        onTouchOutside={() => this.setState({ guestUserDialog: false })} >

                        <View style={{ backgroundColor: "white" }}>

                            <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
                                    {Message.Guest_Msg}
                  </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                                <View style={{ width: '46%' }}>
                                    <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={SettingsStyles.verify_button_text_style}
                                        listener={() => { this.setState({ guestUserDialog: false }) }} />
                                </View>
                                <View style={{ width: '4%' }}></View>
                                <View style={{ width: '46%' }}>
                                    <BigButton title="OK" style={{ backgroundColor: '#68bcbc' }} textStyle={SettingsStyles.verify_button_text_style}
                                        listener={() => { this.loginButtonPressed() }} />
                                </View>
                            </View>
                        </View>
                    </Dialog>
                    {/* <Dialog
                        visible={this.state.guestUserDialog}
                        title=""
                        onTouchOutside={() => this.setState({ guestUserDialog: false })} >

                        <View style={{ backgroundColor: "white" }}>

                            <View style={{ justifyContent: "center", padding: 15,paddingTop:0, alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(3.6), marginTop: 0, color: 'black',textAlign:'center' }}>
                    Register now <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(3.6), marginTop: 10, color: '#68bcbc' }}>{'(FREE)'}</Text> {'\n'}& receive
                                 </Text>
                                 <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(2.4), marginTop: 10, color: 'black',textAlign:'center' }}>
                                 <Image source={require('../../../../images/buck_dark.png')} style={{height:15,width:15 }}></Image> <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), marginTop: 10, color: 'black' }}>{'10,000'}</Text> UDDA Bucks to play with <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.8), marginTop: 10, color: '#68bcbc' }}>{'FREE'}</Text>
                                 </Text>
                                 <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.8), marginTop: 10, color: 'grey',textAlign:'center' }}>
                                {'(no credit card necessary)'}
                                 </Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                                <View style={{ width: '46%' }}>
                                    <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={SettingsStyles.verify_button_text_style}
                                        listener={() => { this.setState({ guestUserDialog: false }) }} />
                                </View>
                                <View style={{ width: '4%' }}></View>
                                <View style={{ width: '46%' }}>
                                    <BigButton title="OK" style={{ backgroundColor: '#68bcbc' }} textStyle={SettingsStyles.verify_button_text_style}
                                        listener={() => { this.loginButtonPressed() }} />
                                </View>
                            </View>
                        </View>
                    </Dialog> */}
 {/* -------------------------------- Bet Placed user Status check Dialogue --------------------------------*/}


       

 <Dialog
          visible={this.state.userStatusDialog}
          title=""
          onTouchOutside={() => this.setState({ userStatusDialog: false })} >

          <View style={{ backgroundColor: "white" }}>
          <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '88%', alignItems: 'center', marginTop: '2%' }}>
                    <Image source={require('../../../../images/udda_logo_white.png')} style={{ width: wp(30), height: wp(7), margin: 10, alignSelf: 'center' }} resizeMode='contain' />
                  </View>
               
                </View>
            <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' ,borderColor: '#cccccc', borderTopWidth: 1,margin:3}}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
              You do not have enough UDDA bucks to access this feature. Please upgrade. 

                  </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <View style={{ width: '46%' }}>
                 <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} 
                  listener={() => {this.setState({ userStatusDialog: false })}} />
              </View>
              <View style={{ width: '4%' }}></View>
              <View style={{ width: '46%' }}>
                 <BigButton title="Upgrade" style={{ backgroundColor: '#68bcbc' }} 
                  listener={() => { this.goToInappPage()  }} />
              </View>
            </View>
          </View>
        </Dialog>
                    {/* -------------------------------- Feedback Dialogue --------------------------------*/}
                    <Dialog
                        visible={this.state.FeedbackDialogue}
                        title=""
                        onTouchOutside={() => this.setState({ FeedbackDialogue: false })} >
                        <View style={{ backgroundColor: "transparent" }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '85%' }}>
                                    <Text style={{ padding: 5, paddingHorizontal: 13, fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0), marginTop: 3, color: '#68bcbc' }}>FEEDBACK</Text>
                                </View>
                                <View style={{ width: '15%' }}>
                                    <TouchableWithoutFeedback onPress={() => { this.setState({ FeedbackDialogue: false }) }}>
                                        <View>
                                            <Image source={require('../../../../images/close.png')} style={{ height: 13, width: 13, alignSelf: 'flex-end', marginRight: 8, marginTop: 10 }}></Image>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{ justifyContent: "center", backgroundColor: "#FFF" }} >
                                <View style={{ justifyContent: "center", padding: 8, paddingHorizontal: 15 }}>
                                    <View style={{ padding: 1, borderColor: '#dddddd', borderWidth: 1, marginTop: 5, }}>
                                        <TextInput
                                            value={this.state.FeedbackSubject}
                                            onChangeText={(text) => this.setState({ FeedbackSubject: text })}
                                            placeholder='Subject'
                                            placeholderTextColor={'#666666'}
                                            style={{ padding: 6, fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), width: '100%', height: 'auto' }}
                                            multiline={true}
                                        />
                                    </View>
                                    <View style={{ padding: 1, borderColor: '#dddddd', borderWidth: 1, marginTop: 10, height: 80 }}>
                                        <TextInput
                                            value={this.state.FeedbackMsg}
                                            onChangeText={(text) => this.setState({ FeedbackMsg: text })}
                                            placeholder='Message'
                                            placeholderTextColor={'#666666'}
                                            style={{ fontFamily: 'Montserrat-Regular', height: 80, fontSize: hp(1.4) }}
                                            multiline={true}
                                        />
                                    </View>


                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, }}>
                                        <View style={{ width: '80%', justifyContent: 'center', flexDirection: 'row', borderColor: '#dddddd', borderWidth: 1 }}>
                                            <View style={{ width: '65%', padding: 5, justifyContent: 'center' }}>
                                                <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>{this.state.FeedbackphotoName}</Text>
                                            </View>
                                            <View style={{ width: '35%', backgroundColor: '#dddddd', padding: 5, justifyContent: 'center', alignItems: "center" }}>
                                                <TouchableOpacity onPress={() => { this.Clickonbrowse() }}>
                                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: 'black', fontSize: 12 }}>Browse</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                        <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => { this.ClickonRemove() }}>
                                                <Text style={{ color: 'black', textAlign: 'center', fontSize: 10, fontFamily: 'Montserrat-Medium', textDecorationLine: 'underline' }}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>



                                    <BigButton title="SUBMIT"
                                        style={{ width: '100%', marginTop: 10, paddingTop: hp(0.4), paddingBottom: hp(0.4), paddingLeft: hp(2.0), paddingRight: hp(2.0), backgroundColor: '#68bcbc', alignSelf: 'flex-end' }}
                                        textStyle={{ fontSize: hp(2.0), textAlign: 'center', color: 'white', padding: 5 }}
                                        listener={() => { this.submitFeedbackAPI() }} />
                                </View>
                            </View>
                        </View>
                    </Dialog>

                    {/* -------------------------------- Thanks Dialogue --------------------------------*/}
                    <Dialog
                        visible={this.state.thanksDialog}
                        title=""
                        onTouchOutside={() => this.setState({ thanksDialog: false })} >

                        <View style={{ backgroundColor: "white" }}>

                            <TouchableWithoutFeedback onPress={() => { this.setState({ thanksDialog: false }) }} >
                                <View>
                                    <Image source={require('../../../../images/close.png')} style={{ height: 13, width: 13, alignSelf: 'flex-end', marginRight: 8, marginTop: 10 }}></Image>
                                </View>
                            </TouchableWithoutFeedback>




                            <View style={{ justifyContent: "center" }} >
                                <Text style={{ paddingVertical: 4, textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0), marginTop: 25, color: '#666666' }}>
                                    We have received your feedback.
              </Text>
                                <Text style={{ paddingVertical: 2, textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0), color: '#666666' }}>
                                    Thank you!
              </Text>

                                <Text style={{ paddingVertical: 12, textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), marginTop: 15, color: '#68bcbc' }}>
                                    UDDA BEST!
              </Text>
                            </View>
                        </View>
                    </Dialog>

                </KeyboardAwareScrollView>



            </Container>
        )
    }
}

const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
   
    error: state.serviceReducer.error,
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners,
    feedbackRequestStatus: state.serviceReducer.requestStatus,
    feedbackResponse: state.serviceReducer.response as FeedbackResponse,
    feedbackError: state.serviceReducer.error,

})



export default connect(mapStateToProps)(G_Settings_2_View);