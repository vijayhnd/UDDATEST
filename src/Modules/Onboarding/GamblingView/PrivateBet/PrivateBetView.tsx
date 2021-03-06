import React from "react";
import { View, Text, FlatList, TextInput, TouchableWithoutFeedback, Image, TouchableOpacity, ScrollView, BackHandler, Keyboard, Dimensions, Animated, UIManager } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";

import AppScreens from "../../../../Util/AppScreens";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { UDDAError } from "../../../../Entities";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { Dialog } from 'react-native-simple-dialogs';
import AlertUtil from "../../../../Util/AlertUtil";
import { GlobalAppState } from "../../../../ReduxStore";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import ProgressLoader from 'rn-progress-loader';
import Application from "../../../../Entities/Application";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import RouterBuilder from "../../../../Router";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import { connect } from 'react-redux';
import BigButton from "../../../../Components/Button/BigButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';
import AcceptBetResponse from "../../../../Services/Bets/AcceptBetResponse";
import SendMsgResponse from "../../../../Services/Bets/SendMsgResponse";
import AcceptBetRequest from "../../../../Services/Bets/AcceptBetRequest";
import AcceptContestResponseParser from "../../../../Services/Contest/AcceptContestResponseParser";
import SendMsgRequest from "../../../../Services/Bets/SendMsgRequest";
import SendMsgResponseParser from "../../../../Services/Bets/SendMsgResponseParser";
import BetAFriendRequest from "../../../../Services/Bets/BetAFriendRequest";
import BetAFriendResponseParser from "../../../../Services/Bets/BetAFriendResponseParser";
import BetAFriendResponse from "../../../../Services/Bets/BetAFriendResponse";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
import CustomBetAFriendRequest from "../../../../Services/Bets/CustomBetAFriendRequest";
import CustomBetAFriendResponseParser from "../../../../Services/Bets/CustomBetAFriendResponseParser";
import CustomBetAFriendResponse from "../../../../Services/Bets/CustomBetAFriendResponse";
import CustomPoolBetAFriendRequest from "../../../../Services/Bets/CustomPoolBetAFriendRequest";
import CustomPoolBetAFriendResponseParser from "../../../../Services/Bets/CustomPoolBetAFriendResponseParser";
import CustomPoolBetAFriendResponse from "../../../../Services/Bets/CustomPoolBetAFriendResponse";
import DateTimePicker from "react-native-modal-datetime-picker";
import Popover from 'react-native-popover-view';
import PopoverMode from 'react-native-popover-view';
import Icons from 'react-native-vector-icons/MaterialIcons';

var update = require('immutability-helper');
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;


const ProfilePageContent = {
   key: 'somethun',
   page_title: 'PRIVATE BET',
}


interface G_PrivateBetViewProps extends AppValidationComponentProps {
   getProfileRequestStatus?: ServiceRequestStatus
   getProfileResponse?: GetProfileResponse
   getProfileError?: UDDAError
   acceptBetRequestStatus?: ServiceRequestStatus
   acceptBetResponse?: AcceptBetResponse
   acceptBetError?: UDDAError

   sendMsgRequestStatus?: ServiceRequestStatus
   sendMsgResponse?: SendMsgResponse
   sendMsgError?: UDDAError

   betaFriendRequestStatus?: ServiceRequestStatus
   betaFriendResponse?: BetAFriendResponse
   betaFriendError?: UDDAError
   customBetaFriendRequestStatus?: ServiceRequestStatus
   customBetaFriendResponse?: CustomBetAFriendResponse
   customBetaFriendError?: UDDAError

   customPoolBetaFriendRequestStatus?: ServiceRequestStatus
   customPoolBetaFriendResponse?: CustomPoolBetAFriendResponse
   customPoolBetaFriendError?: UDDAError

   serviceKey?: string
   listeners?: any
}

interface G_PrivateBetViewState extends AppValidationComponentState {
   showOverlayGameSelectionFlag: boolean
   Accepted: any
   BlackDialog: any
   Dialog: any
   DataList: any;
   bet_detail: any;
   bet_id: any   //garima
   bet_type: any;//@pky
   bet_user_info: any;
   people_list: any;
   opposite: any;
   loader: any;
   betammount: any;
   focuseBet: any;
   valueofDialog: any;
   valueofDialogShow: any;
   dialogVisible: any;
   OddsBet: any;
   HeaderValue: any;
   NoData: any;
   Message: any;
   FlagTotal: any;
   TeamName1: any;
   TeamName2: any;
   betTime: any;
   betDate: any;
   participants: any;
   BetDialog: boolean;
   isCustom: boolean;
   isPool: boolean;
   betTimeExpr: any;
   betDateExpr: any;
   shift: any;
   customBetDate: any;
   customPooltext: any;
   isDateTimePickerVisible: any;
   minimumDate: any;
   textlength: any;
   poolInfo: any;
   userStatusDialog: any;
   actionName: any;
}

enum ProfileScreenComponents {
   FirstNameInput = 1,
   LastNameInput,
   EmailInput,
   MobileInput
}

class G_PrivateBetView extends AppValidationComponent<G_PrivateBetViewProps, G_PrivateBetViewState>
   implements MenuIconListener, ISubheaderListener, LogoIconListener {
   public UserID = Application.sharedApplication().user!.id;
   private authorisationToken = Application.sharedApplication().user!.authenticationToken;
   private playtable: any;
   private NewAnswer: any;
   private New: any;
   private Answer: any;
   private NewAnswerShow: any;
   private NewShow: any;
   private AnswerShow: any;
   public DeeplinkName = Application.sharedApplication().DeeplinkName;
   public LinkId = Application.sharedApplication().EncId;


   private serviceRequestInProgress = false
   public keyboardDidShowSub: any;
   public keyboardDidHideSub: any;
   constructor(props: any) {
      super(props);
      this.state = {
         showOverlayGameSelectionFlag: false,
         Dialog: false,
         Accepted: 'A',
         BlackDialog: false,
         DataList: [],
         bet_detail: [],
         bet_id: '',  //garima
         bet_type: '',//@pky
         bet_user_info: [],
         people_list: [],
         opposite: [],
         loader: false,
         betammount: '',
         focuseBet: '',
         valueofDialog: '0.00',
         valueofDialogShow: '0.00',
         dialogVisible: '',
         OddsBet: '',
         HeaderValue: '',
         NoData: '',
         Message: '',
         FlagTotal: '',
         TeamName1: '',
         TeamName2: '',
         betTime: '',
         betDate: '',
         participants: [],
         BetDialog: false,
         isCustom: false,
         isPool: false,
         betTimeExpr: '',
         betDateExpr: '',
         shift: new Animated.Value(0),
         isDateTimePickerVisible: false,
         minimumDate: new Date(),
         customBetDate: '',
         customPooltext: '',
         textlength: 0,
         poolInfo: [],
         userStatusDialog: false,
         actionName: function () { }
      }
   }

   // ------------------------------------------------------- API calling ----------------------------------------------------------------------
   async componentDidMount() {
      Application.sharedApplication().DeeplinkName = this.DeeplinkName;
      Application.sharedApplication().EncId = this.LinkId;
      this.LinkId = Application.sharedApplication().EncId;
      console.log("Deeplink  privatebet " + Application.sharedApplication().DeeplinkName)
      console.log("Deeplink  link " + Application.sharedApplication().EncId)
      if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
         var DeeplinkName = Application.sharedApplication().DeeplinkName;
         this.DeeplinkName = Application.sharedApplication().DeeplinkName;
         this.LinkId = Application.sharedApplication().EncId;
         console.log("bet DeeplinkName " + JSON.stringify(DeeplinkName));
         if (DeeplinkName == 'index.php?custombet/' || DeeplinkName == 'custombet/') {
            ProfilePageContent.page_title = 'PRIVATE CUSTOM BET'
         }

         if (DeeplinkName == 'index.php?poolbet/' || DeeplinkName == 'poolbet/') {
            ProfilePageContent.page_title = 'CUSTOM POOL'
         }

         if (DeeplinkName == 'index.php?poolbet/' || DeeplinkName == 'poolbet/' || DeeplinkName == 'index.php?custombet/' || DeeplinkName == 'custombet/' || DeeplinkName == 'propsbet/' || DeeplinkName == 'oddsbet/' || DeeplinkName == 'index.php?propsbet/' || DeeplinkName == 'index.php?oddsbet/') {
            this.callMethod();
         } else if (DeeplinkName == 'propsbet/public/' || DeeplinkName == 'oddsbet/public/' ||
            DeeplinkName == 'propsbet/private' || DeeplinkName == 'oddsbet/private' || DeeplinkName == 'index.php?propsbet/public' || DeeplinkName == 'index.php?oddsbet/public' ||
            DeeplinkName == 'index.php?propsbet/private' || DeeplinkName == 'index.php?oddsbet/private') {
            this.callContestMethod();
         }
      }
      else { }
      BackHandler.addEventListener('hardwareBackPress', () => {
         if (this.props) {
           // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
		   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
            return true;
         }
         return false;
      });
   }


   componentWillUnmount() {
      //     AppState.removeEventListener('change', this._handleAppStateChange);
      //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      Application.sharedApplication().DeeplinkName = '';
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
   }


   componentWillMount() {
      console.log("componentwillmount");
      this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
      this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
   }

   handleKeyboardDidShow = (event: any) => {
      const { height: windowHeight } = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
      UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
         const fieldHeight = height;
         const fieldTop = pageY;
         const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight + fieldHeight + fieldHeight + fieldHeight) || 0;
         if (gap >= 0) {
            return;
         }
         Animated.timing(
            this.state.shift,
            {
               toValue: gap,
               duration: 300,
               useNativeDriver: true,
            }
         ).start();
      });
   }

   handleKeyboardDidHide = () => {
      Animated.timing(
         this.state.shift,
         {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
         }
      ).start();
   }

   callMethod = () => {
      Application.sharedApplication().DeeplinkName = this.DeeplinkName;
      Application.sharedApplication().EncId = this.LinkId;
      console.log("Deeplink callMethod privatebet " + Application.sharedApplication().DeeplinkName)
      console.log("Deeplink callContestMethod link" + Application.sharedApplication().EncId)

      if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
         var DeeplinkName = Application.sharedApplication().DeeplinkName;
         var LinkId = Application.sharedApplication().EncId;
         console.log('DeeplinkName:' + JSON.stringify(DeeplinkName))
         console.log('ENC Id:' + JSON.stringify(LinkId))
         //index.php?index.php??
         var url: any;
         if (DeeplinkName == 'propsbet/' || DeeplinkName == 'index.php?propsbet/') {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/share_propbet_info/' + LinkId;
         } else if (DeeplinkName == 'custombet/' || DeeplinkName == 'index.php?custombet/') {
            //this.state.isCustom = true;
            this.setState({ isCustom: true });
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/share_custom_propbet_info/' + LinkId + '/custom_prop';
         } else if (DeeplinkName == 'poolbet/' || DeeplinkName == 'index.php?poolbet/') {
            //this.state.isCustom = true;
            this.setState({ isPool: true });
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/Custom_PoolGaming/share_custom_pool_info/' + LinkId;
            // url = UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/share_custom_propbet_info/' + LinkId + '/custom_prop';
         } else if (DeeplinkName == 'oddsbet/' || DeeplinkName == 'index.php?oddsbet/') {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/share_propbet_info/' + LinkId + '/odds';
         }
         this.setState({ loader: true });
         console.log('url' + JSON.stringify(url));
         fetch(url, {
            method: 'GET',
            headers: {
               'authorisation': this.authorisationToken
            },
         }).then((response) => response.json())
            .then((responseJson) => {
               var that = this;
               console.log('OddsBet: ' + JSON.stringify(responseJson));
console.log('>>>nm>>>'+responseJson.data.user_status )
               if (responseJson.data.user_status == '0') {
                  that.setState({ loader: false });
                  this.checkUserStatus('show', function () { that.setState({ loader: false }); });
               }
               else {
                  that.setState({ loader: false });
               }

               that.setState({ DataList: responseJson.data });
               if (this.state.isPool) {
                  this.setState({ poolInfo: responseJson.data.custom_pool_info });
                  that.setState({ OddsBet: true });
                  responseJson.data.bet_detail.amount_to_win = responseJson.data.bet_detail.bet_amount
                  that.setState({ OddsBet: true });
               }
               that.setState({ bet_detail: responseJson.data.bet_detail });
               that.setState({ bet_id: responseJson.data.bet_detail.bet_id }) //garima
               that.setState({ bet_type: responseJson.data.bet_detail.bet_reject_type }) // @pky
               that.setState({ bet_user_info: responseJson.data.bet_user_info });
               that.setState({ people_list: responseJson.data.people_list });
               that.setState({ opposite: responseJson.data.opposite });

               var new_time_stamp = this.state.bet_detail.created_timestamp * 1000;
               var formated_time = moment(new_time_stamp).format('LT');
               var batdate: any = moment(new_time_stamp).format('LL');
               console.log(formated_time + 'pradeep' + batdate)
               var Match_date: any = new Date(new_time_stamp).toString().split(' ');
               console.log(formated_time + 'pradeep' + batdate + ' >>>' + Match_date)
               var zonevalue: any = Match_date[6].toString();
               var zone: any = zonevalue.substr(1, zonevalue.length - 2);

               this.setState({ betTime: formated_time + " " + zone });
               this.setState({ betDate: batdate });
try{
               var new_time_stampExp = this.state.opposite.expired_timestamp * 1000;
               if (this.state.isPool) {
                  new_time_stampExp = this.state.opposite.pool_expired_timestamp * 1000;
               }
               var formated_timeExp = moment(new_time_stampExp).format('LT');
               var batdateExp: any = moment(new_time_stampExp).format('LL');
               var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
               var zonevalueExp: any = Match_dateExp[6].toString();
               var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);

               this.setState({ betTimeExpr: formated_timeExp + " " + zoneExp });
               this.setState({ betDateExpr: batdateExp });
               console.log('bet close at ', this.state.betTimeExpr);
               console.log(moment('04-19-2020 11:08 PM').format('LT') + " " + new Date('04-19-2020 11:08 PM').toString().split(' ')[6].toString().substr(1, zonevalueExp.length - 2));
               console.log(moment('04-19-2020 11:08 PM').format('LT') + " " + new Date('04-19-2020 11:08 PM').toString().split(' ')[6].toString().substr(1, zonevalueExp.length - 2));
            }catch(e){}

               if (responseJson.data.bet_detail.total_people_amount == null) {
                  responseJson.data.bet_detail.total_people_amount = '0';
               }
               if (responseJson.data.bet_detail.bet_odds_type) {
                  that.setState({ OddsBet: true });
                  let TeamName = responseJson.data.bet_detail.event_name.split(" Vs ");;
                  this.setState({ TeamName1: TeamName[0] })
                  this.setState({ TeamName2: TeamName[1] })
                  that.setState({ HeaderValue: responseJson.data.opposite.bet_odd_line })
                  //responseJson.data.bet_detail.amount_to_win = responseJson.data.bet_detail.bet_amount
                  // if (responseJson.data.bet_detail.bet_team_type == 'underdog') {
                  //    if (responseJson.data.bet_detail.bet_odds_type == '1') {
                  //       that.setState({ HeaderValue: responseJson.data.bet_detail.ml_home_price })
                  //    } else if (responseJson.data.bet_detail.bet_odds_type == '2') {
                  //       that.setState({ HeaderValue: responseJson.data.bet_detail.total })
                  //    } else if (responseJson.data.bet_detail.bet_odds_type == '3') {
                  //       that.setState({ HeaderValue: responseJson.data.bet_detail.ps_home_spread })
                  //    }
                  // } else {
                  //    if (responseJson.data.bet_detail.bet_odds_type == '1') {
                  //       that.setState({ HeaderValue: responseJson.data.bet_detail.ml_away_price })
                  //    } else if (responseJson.data.bet_detail.bet_odds_type == '2') {
                  //       that.setState({ HeaderValue: responseJson.data.bet_detail.total })
                  //    } else if (responseJson.data.bet_detail.bet_odds_type == '3') {
                  //       that.setState({ HeaderValue: responseJson.data.bet_detail.ps_away_price })
                  //    }
                  // }
                  console.log('header value', this.state.HeaderValue);
               } else {
                  if (!this.state.isPool) {
                     that.setState({ OddsBet: false });
                  }
               }
               console.log('bet ' + JSON.stringify(that.state.OddsBet));
               console.log('Success Private bet' + JSON.stringify(that.state.DataList));

               // that.setState({ loader: false });
               if (responseJson.message == "Access Expired.") {
                  // AlertUtil.show("Session Expired ! Please login again");
                  console.log("Footer comp ---->" + responseJson.message);
                  LogoutUtill.logoutButtonPressed(this.props);
               }
               if (responseJson.message == "Access Expired.") {
                  // AlertUtil.show("Session Expired ! Please login again");
                  console.log("Footer comp ---->" + responseJson.message);
                  LogoutUtill.logoutButtonPressed(this.props);
               }
            })
            .catch(error => {
               this.setState({ loader: false });
               Application.sharedApplication().DeeplinkName = '';
               Application.sharedApplication().EncId = '';
               Application.sharedApplication().DeeplinkStatus = false;
               console.log('Private bet error ' + JSON.stringify(error));
            })
      } else {
         Application.sharedApplication().DeeplinkName = '';
         Application.sharedApplication().EncId = '';
         Application.sharedApplication().DeeplinkStatus = false;
         this.props.navigation!.navigate(AppScreens.G_DashboardView);
      }
   }
   goToInappPage() {
      this.setState({ loader: false });
      this.setState({ userStatusDialog: false });

      // this.props.navigation!.navigate(AppScreens.G_LoginPage);

      //this.props.navigation!.navigate(AppScreens.G_InAppPurchaseUpdateIOS);
      this.props.navigation!.replace(AppScreens.G_InAPPPurchaseViewIOS, { params: { callFrom: 'userLevel' } });
   }

   checkUserStatus(betName: any, callback) {
      var that = this;
      //that.setState({ userStatusDialog: true });

      //console.log(Application.sharedApplication().user!.profile.level_array.restricted_bets);
      //if( Application.sharedApplication().user.level_array.restricted_bets)
      var status = true;
      //  for(let i = 0; i < Application.sharedApplication().user!.profile.level_array.restricted_bets.length; i++){
      //   if(Application.sharedApplication().user!.profile.level_array.restricted_bets[i].type == betName)
      //   {
      //     status = false;
      //   that.setState({ userStatusDialog: true });
      //   }

      //  }
      //this.actionName = callback; 
      that.setState({ actionName: callback });
     // callback;
      setTimeout(function () {
         that.setState({ userStatusDialog: true });
       }, 10000);
      
      return status;
   }


   callContestMethod = () => {
      Application.sharedApplication().DeeplinkName = this.DeeplinkName;
      Application.sharedApplication().EncId = this.LinkId;

      console.log("Deeplink callContestMethod privatebet " + Application.sharedApplication().DeeplinkName)
      console.log("Deeplink callContestMethod link" + Application.sharedApplication().EncId)

      if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
         var DeeplinkName = Application.sharedApplication().DeeplinkName;
         var LinkId = Application.sharedApplication().EncId;
         console.log('DeeplinkName:' + JSON.stringify(DeeplinkName))
         console.log('ENC Id:' + JSON.stringify(LinkId))
         var url: any;
         if (DeeplinkName == 'index.php?propsbet/private' || DeeplinkName == 'propsbet/private') {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/share_contest_propbet_info/private/prop/' + LinkId;
         } else if (DeeplinkName == 'index.php?propsbet/public' || DeeplinkName == 'propsbet/public') {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/share_contest_propbet_info/public/prop/' + LinkId;
         }
         if (DeeplinkName == 'index.php?oddsbet/private/' || DeeplinkName == 'oddsbet/private/') {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/share_contest_propbet_info/private/odds/' + LinkId;
         } else if (DeeplinkName == 'index.php?oddsbet/public/' || DeeplinkName == 'oddsbet/public/') {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/share_contest_propbet_info/public/odds/' + LinkId;
         }
         console.log("URL Pricate bet " + JSON.stringify(url));
         this.setState({ loader: true });
         fetch(url, {
            method: 'GET',
            headers: {
               'authorisation': this.authorisationToken
            },
         }).then((response) => response.json())
            .then((responseJson) => {
               var that = this;
               console.log('OddsBet: ' + JSON.stringify(responseJson));
              
               console.log('pky user>>>'+responseJson.data.user_status);
               if (responseJson.data.user_status == '0') {
                  that.setState({ loader: false });
                  that.checkUserStatus('show', function () { that.setState({ loader: false }); });
                   
               }
               else {
                  that.setState({ loader: false });
               }
               
               that.setState({ DataList: responseJson.data });
               that.setState({ bet_detail: responseJson.data.bet_detail });
               that.setState({ bet_user_info: responseJson.data.bet_user_info });
               that.setState({ people_list: responseJson.data.people_list });
               that.setState({ opposite: responseJson.data.opposite });
               this.setState({ participants: responseJson.data.participants });
            
               if (responseJson.data.bet_detail.total_people_amount == null) {
                  responseJson.data.bet_detail.total_people_amount = '0';
               }
               if (responseJson.data.bet_detail.bet_odds_type) {
                  that.setState({ OddsBet: true });
                  let teamsname = responseJson.data.bet_detail.event_name.split(" Vs ");
                  that.setState({ TeamName1: teamsname[0] });
                  that.setState({ TeamName2: teamsname[1] });
                  that.setState({ HeaderValue: responseJson.data.opposite.bet_odd_line })
                  if (responseJson.data.bet_detail.bet_team_type == 'underdog') {
                     if (responseJson.data.bet_detail.bet_odds_type == '1') {
                        that.setState({ HeaderValue: responseJson.data.bet_detail.ml_home_price })
                     } else if (responseJson.data.bet_detail.bet_odds_type == '2') {
                        that.setState({ HeaderValue: responseJson.data.bet_detail.total_under_price })
                        this.setState({ FlagTotal: 'U' });
                     } else if (responseJson.data.bet_detail.bet_odds_type == '3') {
                        that.setState({ HeaderValue: responseJson.data.opposite.other_value })
                     }
                  } else {
                     if (responseJson.data.bet_detail.bet_odds_type == '1') {
                        that.setState({ HeaderValue: responseJson.data.bet_detail.ml_away_price })
                     } else if (responseJson.data.bet_detail.bet_odds_type == '2') {
                        that.setState({ HeaderValue: responseJson.data.bet_detail.total_over_price })
                        this.setState({ FlagTotal: 'U' });
                     } else if (responseJson.data.bet_detail.bet_odds_type == '3') {
                        that.setState({ HeaderValue: responseJson.data.opposite.other_value })
                     }
                  }
                  that.setState({ HeaderValue: responseJson.data.opposite.bet_odd_line })
               } else {
                  that.setState({ OddsBet: false });
               }
               console.log('bet ' + JSON.stringify(that.state.OddsBet));
               console.log('Success Private bet' + JSON.stringify(that.state.DataList));
               Application.sharedApplication().DeeplinkName = ''
               Application.sharedApplication().EncId = ''
               Application.sharedApplication().DeeplinkStatus = false;
               var new_time_stamp = this.state.bet_detail.created_timestamp * 1000;
               var formated_time = moment(new_time_stamp).format('LT');
               var batdate: any = moment(new_time_stamp).format('LL');
               var Match_date: any = new Date(new_time_stamp).toString().split(' ');
               var zonevalue: any = Match_date[6].toString();
               var zone: any = zonevalue.substr(1, zonevalue.length - 2);

               this.setState({ betTime: formated_time + " " + zone });
               this.setState({ betDate: batdate });

               if (responseJson.message == "Access Expired.") {
                  // AlertUtil.show("Session Expired ! Please login again");
                  console.log("Footer comp ---->" + responseJson.message);
                  LogoutUtill.logoutButtonPressed(this.props);
               }
               if (responseJson.message == "Access Expired.") {
                  // AlertUtil.show("Session Expired ! Please login again");
                  console.log("Footer comp ---->" + responseJson.message);
                  LogoutUtill.logoutButtonPressed(this.props);
               }
               if (responseJson.message == "Access Expired.") {
                  // AlertUtil.show("Session Expired ! Please login again");
                  console.log("Footer comp ---->" + responseJson.message);
                  LogoutUtill.logoutButtonPressed(this.props);
               }
               if (responseJson.message == "Access Expired.") {
                  // AlertUtil.show("Session Expired ! Please login again");
                  console.log("Footer comp ---->" + responseJson.message);
                  LogoutUtill.logoutButtonPressed(this.props);
               }
            })
            .catch(error => {
               console.log('Private bet error ' + JSON.stringify(error));
               Application.sharedApplication().DeeplinkName = ''
               Application.sharedApplication().EncId = ''
               Application.sharedApplication().DeeplinkStatus = false;
            })
      } else {
         Application.sharedApplication().DeeplinkName = '';
         Application.sharedApplication().EncId = '';
         Application.sharedApplication().DeeplinkStatus = false;
         this.props.navigation!.navigate(AppScreens.G_DashboardView);
      }
   }

   getProfile() {
      var profileRequest = new GetProfileRequest()
      var serviceAction = new ServiceAction()
      var responseParser = new GetProfileResponseParser()
      this.props.dispatch!(serviceAction.request(ServiceType.User,
         ServiceKeys.GetProfileServiceName,
         profileRequest,
         [this.constructor.name],
         responseParser))
   }

   componentWillReceiveProps(nextProps: G_PrivateBetViewProps) {
      if (nextProps.listeners!.includes(this.constructor.name)) {
         if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
            switch (nextProps.requestStatus) {
               case ServiceRequestStatus.FinishedWithSuccess:
                  this.serviceRequestInProgress = false
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
         } else if (nextProps.serviceKey === ServiceKeys.AcceptBetName) {
            switch (nextProps.requestStatus) {
               case ServiceRequestStatus.FinishedWithSuccess:
                  this.serviceRequestInProgress = false;
                  console.log("acceptBetResponse " + JSON.stringify(nextProps.acceptBetResponse));
                  var response = nextProps.acceptBetResponse!.response;

                  if (response.message == 'success') {
                     this.getProfile();
                     RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
                     this.setState({ betammount: '' });
                     this.setState({ valueofDialog: '0.00' });
                     this.setState({ valueofDialogShow: '0.00' });
                  } else {
                     AlertUtil.show('Unsuccesful :' + response.message);
                     this.setState({ betammount: '' });
                     this.setState({ valueofDialog: '0.00' });
                     this.setState({ valueofDialogShow: '0.00' });
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
         } else if (nextProps.serviceKey === ServiceKeys.SendMsgName) {
            switch (nextProps.requestStatus) {
               case ServiceRequestStatus.FinishedWithSuccess:
                  this.serviceRequestInProgress = false;
                  console.log("sendMsgResponse " + JSON.stringify(nextProps.sendMsgResponse));
                  var response = nextProps.sendMsgResponse!.response;
                  if (response.message == 'success') {
                     RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
                  } else {
                     AlertUtil.show(JSON.stringify(response.message));
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
         } else if (nextProps.serviceKey === ServiceKeys.BetaFriendName) {
            switch (nextProps.requestStatus) {
               case ServiceRequestStatus.FinishedWithSuccess:
                  this.serviceRequestInProgress = false;
                  console.log("betaFriendResponse " + JSON.stringify(nextProps.betaFriendResponse));
                  var response = nextProps.betaFriendResponse!.response;

                  if (response.message == 'success') {
                     RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
                     this.setState({ betammount: '' });
                     this.setState({ valueofDialog: '0.00' });
                     this.setState({ valueofDialogShow: '0.00' });
                  } else {
                     AlertUtil.show(JSON.stringify(response.message));
                     this.setState({ betammount: '' });
                     this.setState({ valueofDialog: '0.00' });
                     this.setState({ valueofDialogShow: '0.00' });
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
         } else if (nextProps.serviceKey === ServiceKeys.CustomBetaFriendName) {  // Custom bet response 
            switch (nextProps.requestStatus) {
               case ServiceRequestStatus.FinishedWithSuccess:
                  this.serviceRequestInProgress = false;
                  console.log("betaFriendResponse " + JSON.stringify(nextProps.customBetaFriendResponse));
                  var response = nextProps.customBetaFriendResponse!.response;
                  if (response.message == 'success') {
                     RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
                     this.setState({ betammount: '' });
                     this.setState({ valueofDialog: '0.00' });
                     this.setState({ valueofDialogShow: '0.00' });
                     console.log("custom bet success");
                  } else {
                     AlertUtil.show(JSON.stringify(response.message));
                     this.setState({ betammount: '' });
                     this.setState({ valueofDialog: '0.00' });
                     this.setState({ valueofDialogShow: '0.00' });
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
         } else if (nextProps.serviceKey === ServiceKeys.CustomPoolBetaFriendName) {  // Custom pool bet response 
            switch (nextProps.requestStatus) {
               case ServiceRequestStatus.FinishedWithSuccess:
                  this.serviceRequestInProgress = false;
                  console.log("betaFriendResponse " + JSON.stringify(nextProps.customPoolBetaFriendResponse));
                  var response = nextProps.customPoolBetaFriendResponse!.response;
                  if (response.message == 'success') {
                     RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
                     this.setState({ betammount: '' });
                     this.setState({ valueofDialog: '0.00' });
                     this.setState({ valueofDialogShow: '0.00' });
                     console.log("custom bet success");
                  } else {
                     AlertUtil.show(JSON.stringify(response.message));
                     this.setState({ betammount: '' });
                     this.setState({ valueofDialog: '0.00' });
                     this.setState({ valueofDialogShow: '0.00' });
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
         // end
      }
   }

   props_place_bet_API() {
      console.log('props_place_bet_API' + this.state.betammount);
      this.setState({ dialogVisible: false });
      var bet_amount: any;
      bet_amount = this.state.betammount;
      bet_amount = bet_amount;

      var betRequset: any;
      if (this.DeeplinkName == 'index.php?propsbet/' || this.DeeplinkName == 'propsbet/') {
         betRequset = new BetAFriendRequest(
            null,
            null,
            this.state.bet_detail.event_id,
            this.state.bet_detail.line_lookup,
            this.state.bet_detail.question,
            // this.state.bet_detail.answer,
            this.state.DataList.opposite.bet_odd_line,
            this.state.bet_detail.type == 'under' ? 'over' : 'under',
            this.state.bet_detail.bet_type,
            bet_amount,
            //this.state.valueofDialog, to bifer bet + win amount
            this.state.valueofDialogShow,
            this.state.bet_detail.total,
            this.state.bet_detail.over,
            this.state.bet_detail.under,
            this.state.bet_detail.wining_rate_over,
            this.state.bet_detail.wining_rate_under,
            this.state.bet_detail.bet_id,
            this.state.bet_detail.bet_id
         )
      } else if (this.DeeplinkName == 'index.php?propsbet/public' || this.DeeplinkName == 'index.php?propsbet/private' || this.DeeplinkName == 'propsbet/public' || this.DeeplinkName == 'propsbet/private') {
         var contest_type = this.DeeplinkName.split('/');
         var bet_on: any;
         var contest_id: any;
         if (contest_type[1] == "public") {
            bet_on = this.state.bet_detail.bet_id;
            contest_id = this.state.bet_detail.contest_id;
         } else if (contest_type[1] == "private") {
            bet_on = this.state.bet_detail.bet_id;
            contest_id = this.state.bet_detail.private_contest_id;
         }
         betRequset = new BetAFriendRequest(
            contest_id,
            contest_type[1],
            this.state.bet_detail.event_id,
            this.state.bet_detail.line_lookup,
            this.state.bet_detail.question,
            // this.state.bet_detail.answer,
            this.state.DataList.opposite.bet_odd_line,
            this.state.bet_detail.type == 'under' ? 'over' : 'under',
            this.state.bet_detail.bet_type,
            bet_amount,
            //this.state.valueofDialog, to bifer bet + win amount
            this.state.valueofDialogShow,
            this.state.bet_detail.total,
            this.state.bet_detail.over,
            this.state.bet_detail.under,
            this.state.bet_detail.wining_rate_over,
            this.state.bet_detail.wining_rate_under,
            bet_on,
            bet_on
         )
      }
      console.log("Input place props Bet" + JSON.stringify(betRequset));

      var serviceAction = new ServiceAction()
      var responseParser = new BetAFriendResponseParser()
      this.props.dispatch!(serviceAction.request(ServiceType.Bets,
         ServiceKeys.BetaFriendName,
         betRequset,
         [this.constructor.name],
         responseParser))
   }

   acceptPoolBetCall() {
      console.log('acceptPoolBetCall')
      // if((this.state.customPooltext.trim()=='' && this.state.customBetDate.trim() == '') || (!this.state.customPooltext && !this.state.customBetDate )){
      //    // alert('Please enter valid details')
      // } else {
      this.setState({ dialogVisible: false });
      var bet_amount;
      var amount_to_win;
      bet_amount = this.state.betammount;
      amount_to_win = this.state.valueofDialogShow;
      amount_to_win = amount_to_win;
      var answerDate = ''
      var myAnswerText = ''
      if (this.state.bet_detail.my_answer_type == '2') {
         answerDate = ''
         myAnswerText = this.state.customPooltext
      } else {
         answerDate = this.state.customBetDate
         myAnswerText = ''
      }
      var customPoolBetRequset: any;
      console.log('custom bet function');
      customPoolBetRequset = new CustomPoolBetAFriendRequest(
         // null,
         // null,
         // this.state.bet_detail.event_id,
         this.state.bet_detail.question,
         myAnswerText,//myanswer
         answerDate, //date                       
         bet_amount,
         this.state.bet_id
      )
      var serviceAction = new ServiceAction()
      var responseParser = new CustomPoolBetAFriendResponseParser()
      this.props.dispatch!(serviceAction.request(ServiceType.Bets,
         ServiceKeys.CustomPoolBetaFriendName,
         customPoolBetRequset,
         [this.constructor.name],
         responseParser))
      //}
   }

   acceptCustomCetCall() {
      console.log('acceptCustomCetCall');
      // var d = new Date();
      // var n = d.getTime();
      // var n = new Date(new Date().toISOString()).getTime()

      // if(this.state.opposite.expired_timestamp*1000 > n)
      // {
      //       AlertUtil.show("Bet has expired.");
      //       return;
      // }

      this.setState({ dialogVisible: false });
      var bet_amount;
      var amount_to_win;
      bet_amount = this.state.betammount;
      amount_to_win = this.state.valueofDialogShow;
      amount_to_win = amount_to_win;

      var customBetRequset: any;
      console.log('custom bet function');
      customBetRequset = new CustomBetAFriendRequest(
         null,
         null,
         this.state.bet_detail.event_id,
         this.state.bet_detail.question,
         this.state.opposite.answer,
         '', //this.state.bet_detail.other_answer,
         this.state.opposite.odds,
         this.state.opposite.odds_type, //'odd type  selected/custom (when create custom props)'
         this.state.bet_detail.bet_type,
         bet_amount,
         amount_to_win,
         this.state.opposite.bet_expired_on, //bet_expired_on
         this.state.bet_id
      )
      var serviceAction = new ServiceAction()
      var responseParser = new CustomBetAFriendResponseParser()
      this.props.dispatch!(serviceAction.request(ServiceType.Bets,
         ServiceKeys.CustomBetaFriendName,
         customBetRequset,
         [this.constructor.name],
         responseParser))
      //@pky for the custom prob bet 
   }

   AcceptBetCall() {
      console.log('AcceptBetCall');
      this.setState({ dialogVisible: false })
      if (this.state.betammount != '') {
         var acceptbetRequset: any;
         if (this.DeeplinkName == 'oddsbet/' || this.DeeplinkName == 'index.php?oddsbet/') {
            acceptbetRequset = new AcceptBetRequest(
               null,
               null,
               this.state.bet_detail.bet_id,
               this.state.bet_detail.event_id,
               this.state.betammount,
               //this.state.valueofDialog, to bifer bet + win amount
               this.state.valueofDialogShow,

               this.state.bet_detail.league_id,
               this.state.bet_detail.bet_odds_type,
               this.state.bet_detail.bet_type,
               this.state.bet_detail.wining_rate_favored,
               this.state.bet_detail.wining_rate_underdog,
               this.state.HeaderValue,

            )
         } else if (this.DeeplinkName == 'index.php?oddsbet/public/' || this.DeeplinkName == 'index.php?oddsbet/private/' || this.DeeplinkName == 'oddsbet/public/' || this.DeeplinkName == 'oddsbet/private/') {
            var contest_type = this.DeeplinkName.split('/');
            var bet_on: any;
            var contest_id: any;
            if (contest_type[1] == "public") {
               bet_on = this.state.bet_detail.placebet_contest_id;
               contest_id = this.state.bet_detail.contest_id;
            } else if (contest_type[1] == "private") {
               bet_on = this.state.bet_detail.placebet_private_contest_id;
               contest_id = this.state.bet_detail.private_contest_id;
            }
            console.log("params " + contest_type + " " + bet_on + " " + contest_id)
            acceptbetRequset = new AcceptBetRequest(
               contest_id,
               contest_type[1],
               bet_on,
               this.state.bet_detail.event_id,
               this.state.betammount,
               //this.state.valueofDialog, to bifer bet + win amount
               this.state.valueofDialogShow,
               this.state.bet_detail.league_id,
               this.state.bet_detail.bet_odds_type,
               this.state.bet_detail.bet_type,
               this.state.bet_detail.wining_rate_favored,
               this.state.bet_detail.wining_rate_underdog,
               this.state.HeaderValue,
            )
         }
         console.log("Input place Odds Bet" + JSON.stringify(acceptbetRequset));

         var serviceAction = new ServiceAction()
         var responseParser = new AcceptContestResponseParser()
         this.props.dispatch!(serviceAction.request(ServiceType.Bets,
            ServiceKeys.AcceptBetName,
            acceptbetRequset,
            [this.constructor.name],
            responseParser))
      } else {
         AlertUtil.show('Not entered any amount,please try agian');
      }
   }

   // garima pass bet id
   sendMessege() {
      var sendMsgRequest = new SendMsgRequest(
         this.state.bet_user_info.id,
         this.state.Message,
         this.state.bet_id,
         this.state.bet_type
      )
      var serviceAction = new ServiceAction()
      var responseParser = new SendMsgResponseParser()
      this.props.dispatch!(serviceAction.request(ServiceType.Bets,
         ServiceKeys.SendMsgName,
         sendMsgRequest,
         [this.constructor.name],
         responseParser))
   }

   AcceptContestBetCall() {
      console.log('AcceptContestBetCall');
      console.log(this.UserID);
      this.setState({ dialogVisible: false })

      var placebet: any = false;
      for (let i = 0; i < this.state.participants.length; i++) {
         if (this.state.participants[i].user_id == this.UserID) {
            placebet = true;
         }
         else { }
      }

      if (placebet == false) {
         this.setState({ dialogVisible: false })
         this.setState({ BetDialog: true })
      } else {
         this.AcceptBetCall();
      }
   }

   AcceptContestPropBetCall() {
      console.log('AcceptContestPropBetCall')
      console.log(this.UserID);
      this.setState({ dialogVisible: false })
      var placebet: any = false;
      for (let i = 0; i < this.state.participants.length; i++) {
         if (this.state.participants[i].user_id == this.UserID) {
            placebet = true;
         } else { }
      }
      if (placebet == false) {
         this.setState({ dialogVisible: false });
         this.setState({ BetDialog: true });
      } else {
         this.props_place_bet_API();
      }
   }

   // ------------------------------------------------------- Methods ----------------------------------------------------------------------
   LogoiconDidTapped() {
      Application.sharedApplication().DeeplinkName = '';
      //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
	  RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
   }

   showMoreDialog(isShow: any) {
      this.setState({ Dialog: isShow });
      this.setState({ BlackDialog: false });
   }

   accountNameTapped() {
      this.props.navigation!.navigate(AppScreens.G_ProfileView);
   }

   iconDidTapped() {
      this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
   }

   availableBalanceTapped() { }

   openPlaysTapped() { }

   coveredPlaysTapped() {
      RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
   }

   getDialogue(Accepted: any) {
      // var n = new Date(new Date().toISOString()).getTime()

      // if(this.state.opposite.expired_timestamp*1000 > n)
      // {
      //       AlertUtil.show("Bet has expired.");
      //       return;
      // }

      this.setState({ Accepted: Accepted });
      this.setState({ BlackDialog: false });
   }

   getDialogue2() {
      if (this.state.bet_detail.total_people != 0) {
         //  this.setState({ BlackDialog: !this.state.BlackDialog });
         //this.getblackDialog();
         this.showMoreDialog(true);
      }
      else {
         AlertUtil.show('No data');
      }
   }

   handleFocusBA = () => {
      this.setState({ focuseBet: true });
      this.setState({ valueofDialog: '0.00' });
      this.setState({ valueofDialogShow: '0.00' });
      this.setState({ betammount: '' });
   }

   handleKeyDown = (e: any, Flag: any) => {
      if (this.state.textlength > e.nativeEvent.text.length) {
         // alert('delete')
         this.setState({ textlength: 0 })
         this.handleBackSpace("BA")
      } else {
         var n = e.nativeEvent.text
         var res = n.length - 1
         // alert(n[res])
         if (n[res] == "." || n[res] == "1" || n[res] == "2" || n[res] == "3" || n[res] == "4" || n[res] == "5" || n[res] == "6" || n[res] == "7" || n[res] == "8" || n[res] == "9" || n[res] == "0") {
            this.setState({ textlength: e.nativeEvent.text.length })
            if (Flag == "BA") {
               var betamm = '';
               var betamms;
               if (this.state.betammount.length == 0) {
                  betamm = this.state.betammount + n[res];
                  this.endEditing(betamm);
                  this.setState({ betammount: betamm });
               }
               else {
                  betamm = this.state.betammount + n[res];
                  this.endEditing(betamm);
                  this.setState({ betammount: betamm });
               }
            }
         }
      }
   }


   endEditing(value: any) {
      if (this.state.OddsBet == true) {
         // if (this.state.bet_detail.bet_odds_type == '1') {
         console.log('value ' + JSON.stringify(value));
         console.log('state.HeaderValueue ' + JSON.stringify(this.state.HeaderValue));
         var posneg = Math.sign(this.state.HeaderValue)
         if (posneg == -1) {
            this.Answer = 1 + (100 / Math.abs(this.state.HeaderValue));
            this.AnswerShow = (100 / Math.abs(this.state.HeaderValue));
         }
         else {
            this.Answer = 1 + (this.state.HeaderValue / 100);
            this.AnswerShow = (this.state.HeaderValue / 100);
         }
         this.NewAnswer = (value * (this.Answer))
         this.NewAnswerShow = (value * (this.AnswerShow))
         // }
         // else {
         //    this.NewAnswer = (value * 2)
         //    this.NewAnswerShow = (value);
         // }
      } else if (this.state.isCustom) {
         var oddsArr;
         this.NewAnswerShow = 0;
         if (this.state.opposite.odds.indexOf('/') != -1) {
            oddsArr = this.state.opposite.odds.split('/');
            this.NewAnswerShow = ((value * parseInt(oddsArr[0])) / oddsArr[1]);
            this.NewAnswer = ((value * parseInt(oddsArr[0])) / oddsArr[1]);
            console.log(this.NewAnswerShow);
         }
      } else {
         var valueofans: any;
         // if (this.state.bet_detail.type == 'under') {
         //    valueofans = this.state.bet_detail.over;
         // }
         // else {
         //    valueofans = this.state.bet_detail.under;
         // }
         valueofans = this.state.DataList.opposite.bet_odd_line
         console.log('pky odds contest' + valueofans)
         // that.setState({ HeaderValue: responseJson.data.opposite.bet_odd_line })
         var posneg = Math.sign(valueofans)
         if (posneg == -1) {
            this.Answer = 1 + (100 / Math.abs(valueofans));
            this.AnswerShow = (100 / Math.abs(valueofans));
         }
         else {
            this.Answer = 1 + (valueofans / 100);
            this.AnswerShow = (valueofans / 100);
         }
         this.NewAnswer = (value * (this.Answer))
         this.NewAnswerShow = (value * (this.AnswerShow))
      }

      this.NewShow = parseFloat(this.NewAnswerShow).toFixed(2);
      this.setState({ valueofDialogShow: this.NewShow });
      this.New = parseFloat(this.NewAnswer).toFixed(2);
      this.setState({ valueofDialog: this.New });
   }


   // endEditing(value: any) {
   //    if (this.state.OddsBet == true) {
   //       if (this.state.bet_detail.bet_odds_type == '1') {
   //          console.log('value ' + JSON.stringify(value));
   //          console.log('state.HeaderValueue ' + JSON.stringify(this.state.HeaderValue));
   //          var posneg = Math.sign(this.state.HeaderValue)
   //          if (posneg == -1) {
   //             this.Answer = 1 + (100 / Math.abs(this.state.HeaderValue));
   //             this.AnswerShow = (100 / Math.abs(this.state.HeaderValue));
   //          }
   //          else {
   //             this.Answer = 1 + (this.state.HeaderValue / 100);
   //             this.AnswerShow = (this.state.HeaderValue / 100);
   //          }
   //          this.NewAnswer = (value * (this.Answer))
   //          this.NewAnswerShow = (value * (this.AnswerShow))
   //       }
   //       else {
   //          this.NewAnswer = (value * 2)
   //          this.NewAnswerShow = (value);
   //       }
   //    } else if (this.state.isCustom) {
   //       var oddsArr;
   //       this.NewAnswerShow = 0;
   //       if (this.state.opposite.odds.indexOf('/') != -1) {
   //          oddsArr = this.state.opposite.odds.split('/');
   //          this.NewAnswerShow = ((value * parseInt(oddsArr[0])) / oddsArr[1]);
   //          this.NewAnswer = ((value * parseInt(oddsArr[0])) / oddsArr[1]);
   //          console.log(this.NewAnswerShow);
   //       }
   //    } else {
   //       var valueofans: any;
   //       if (this.state.bet_detail.type == 'under') {
   //          valueofans = this.state.bet_detail.over;
   //       }
   //       else {
   //          valueofans = this.state.bet_detail.under;
   //       }
   //       var posneg = Math.sign(valueofans)
   //       if (posneg == -1) {
   //          this.Answer = 1 + (100 / Math.abs(valueofans));
   //          this.AnswerShow = (100 / Math.abs(valueofans));
   //       }
   //       else {
   //          this.Answer = 1 + (valueofans / 100);
   //          this.AnswerShow = (valueofans / 100);
   //       }
   //       this.NewAnswer = (value * (this.Answer))
   //       this.NewAnswerShow = (value * (this.AnswerShow))
   //    }

   //    this.NewShow = parseFloat(this.NewAnswerShow).toFixed(2);
   //    this.setState({ valueofDialogShow: this.NewShow });
   //    this.New = parseFloat(this.NewAnswer).toFixed(2);
   //    this.setState({ valueofDialog: this.New });
   // }

   handleBackSpace = (Flag: any) => {
      if (Flag == "BA") {
         this.setState({ betammount: '' });
         this.setState({ valueofDialog: '0.00' });
         this.setState({ valueofDialogShow: '0.00' });
      }
   }
   goToCustomCounterBet(){
      this.props.navigation!.navigate(AppScreens.G_CounterCustomBet, { encrypted_bet_id: this.state.bet_detail.encrypted_bet_id}); 
   }

   showDialog(isShow: any) {
      // this.setState({ dialogVisible: isShow });
      var openAmount = this.state.bet_detail.amount_to_win - this.state.bet_detail.total_people_amount;
      console.log("Opne amount " + openAmount + " value " + this.state.valueofDialogShow);

      if (this.DeeplinkName == 'index.php?poolbet/' || this.DeeplinkName == 'poolbet/') {
         if (!this.state.customPooltext && !this.state.customBetDate) {
            AlertUtil.show("Please enter your answer.");
         }
         else if (this.state.betammount != parseInt(this.state.bet_detail.bet_amount)) {
            AlertUtil.show("Bet amount must be equal to " + this.state.bet_detail.bet_amount + " UDDA bucks.");
         }
         else {
            this.setState({ dialogVisible: isShow });

         }
      }
      else {


         if (this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/' || this.DeeplinkName == 'propsbet/' || this.DeeplinkName == 'oddsbet/' || this.DeeplinkName == 'index.php?propsbet/' || this.DeeplinkName == 'index.php?oddsbet/') {
            // this.setState({ dialogVisible: isShow });
            if (this.state.betammount < 1 || this.state.betammount < "1") {
              // AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
               AlertUtil.show("Please enter valid bet amount.");
            }
            if ((this.state.betammount == '' || this.state.betammount == null)) {
               AlertUtil.show("Please enter bet amount.");
               // } else if (this.state.betammount > openAmount) {
               //    AlertUtil.show("Bet amount must be less than open amount.");
               // } 
            }
            else {

               this.setState({ dialogVisible: isShow });
               // if (this.state.betammount <= openAmount ) {
               //    this.setState({ dialogVisible: isShow });
               // }
               //       else if(((this.state.customPooltext.trim()=='' && this.state.customBetDate.trim() == '') || (!this.state.customPooltext && !this.state.customBetDate )) && this.state.isPool)
               // {
               //       AlertUtil.show('Please enter valid details')
               // }
               // else if(this.state.isPool) {
               //    this.setState({ dialogVisible: isShow }); 
               // }
               // else if (this.state.betammount > openAmount) {
               //    AlertUtil.show("Please enter amount below the Open Amount.");
               // }
            }
         } else if (this.DeeplinkName == 'index.php?propsbet/public' || this.DeeplinkName == 'index.php?oddsbet/public' ||
            this.DeeplinkName == 'index.php?propsbet/private' || this.DeeplinkName == 'index.php?oddsbet/private' || this.DeeplinkName == 'propsbet/public' || this.DeeplinkName == 'oddsbet/public/' ||
            this.DeeplinkName == 'propsbet/private' || this.DeeplinkName == 'oddsbet/private/') {
            //if ((this.state.betammount < parseInt(this.state.DataList.min_bet_amount)) && openAmount >= 1000) {

            if (this.state.betammount < parseInt(this.state.DataList.min_bet_amount)) {
               AlertUtil.show("The minimum amount to bet is " + this.state.DataList.min_bet_amount + " UDDA bucks");
            }
            else {
               this.setState({ dialogVisible: isShow });
               // if (this.state.betammount <= openAmount) {
               //    this.setState({ dialogVisible: isShow });
               // }
               // else if (this.state.betammount > openAmount) {
               //    AlertUtil.show("Please enter amount below the Open Amount.");
               // }
            }
         }
      }
   }

   gotoDashboard() {
      RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
   }

   gotoDashboardFromDialog() {
      this.setState({ BetDialog: false });
      RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
   }

   showDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: true });
   };

   handleStartDatePicked = (date: any) => {
      var formated_date = moment(date).format('MM-DD-YYYY');
      this.setState({ customBetDate: formated_date });
      // this.customBetDateTime = formated_date;
      this.hideDateTimePicker();
   }

   hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false });
   };

   closePopover() {
      this.setState({ BlackDialog: false });
   }
   getblackDialog() {
      alert('hi')
      return (
         <Popover
            isVisible={true}
            // fromView={touchableRef}
            // backgroundStyle={{position:'absolute', top:100, paddingTop:hp(20), backgroundColor: '#fff' }}
            //   mode={'rn-modal'}
            // // mode={{'js-modal'
            popoverStyle={{ marginLeft: -10, marginTop: hp(8) }}
            onRequestClose={() => this.closePopover()}>

            <View style={{ height: hp(87), margin: 0, backgroundColor: '#fff', padding: 10, width: '100%', maxHeight: '100%', }}>
               <TouchableOpacity onPress={() => { this.closePopover() }} style={{ width: 50 }}>
                  <View >
                     {/* <Image source={require('../../../../images/back_icon.png')} style={{ height: 10, width: 10, alignSelf: 'flex-start', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image> */}
                     <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 2 }}
                        onPress={() => { this.closePopover() }}
                     />
                  </View>
               </TouchableOpacity>
               <View style={{ position: 'absolute', top: 5, right: 0, justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                  <Text style={{ width: '100%', color: '#68bcbc', fontSize: 18, marginTop: 5, fontFamily: 'Montserrat-Bold', textAlign: 'left', paddingLeft: '6%' }}>PARTICIPANTS </Text>
               </View>
               {/* <TouchableWithoutFeedback onPress={() => { this.closePopover() }} >
                  <View>
                      <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10, alignSelf: 'flex-end', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image>
                  </View>
              </TouchableWithoutFeedback> */}


               <View style={{ width: '100%', flexDirection: 'row' }}>
                  <Text style={{ width: '40%', fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Bet Date:</Text>

                  <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                     {/* <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.blackdialogDate}</Text> */}
                  </View>
               </View>

               <View style={{ width: '100%', flexDirection: 'row' }}>
                  <Text style={{ width: '40%', fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Creator</Text>

                  <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                     {/* <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.betDetailData.creator}</Text> */}
                  </View>
               </View>

               <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#777777', marginVertical: 5, width: '95%', height: 2, alignItems: 'center' }}>
                  </View>
               </View>

               {/* {this.state.people_list.length > 0 ?
                      <FlatList
                          extraData={this.state}
                          data={this.state.people_list}
                          keyExtractor={(item: any, index) => index.toString()}
                          bounces={false}
                          renderItem={({ item, index }: any) => {
                              return (
                                  item.status == 1 ? <View>
                                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' ,height:40,alignContent:'center',alignItems:'center'}}>
                                          <View style={{ width: '50%' }}><Text style={{ fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center' }}>{item.username}</Text></View>

                                          <View style={{ flexDirection: 'row', height: 20, width: '30%' }}>
                                              <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{item.amount}</Text>
                                          </View>
                                          <View style={{ width: '20%' }}><Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textAlign: "right" }}>{item.settled_status}</Text></View>
                                      </View>
                                      <View style={styles.hrline1} />
                                  </View> : <View >
                                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between',height:40,alignContent:'center',alignItems:'center' }}>
                                              <View style={{ width: '50%' }}> <Text style={{ color: '#808080', fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.username}</Text></View>

                                              <View style={{ flexDirection: 'row', height: 20, width: '30%' }}>
                                                  <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                                  <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.amount}</Text>
                                              </View>
                                              <View style={{ width: '20%', }}> <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textAlign: "right" }}>{item.settled_status}</Text></View>
                                          </View>
                                          <View style={styles.hrline1} />
                                      </View>
                              )
                          }}
                      />
                      :
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ width: '100%', fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, textAlign: 'center' }}>No record found</Text>
                      </View>

                  } */}
               {/* {this.state.betDetailData.settlement_status == 'Settlement In-Progress' ? this.state.betDetailData.bet_type == 2 && this.state.betDetailData.creator_index == '0' ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.betDetailData) }}>
                          <View style={{ backgroundColor: '#68bcbc', paddingVertical: 7, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                              <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, alignItems: 'center' }}> Invite More Friends</Text>
                          </View>
                      </TouchableWithoutFeedback>
                  </View> : this.state.betDetailData.bet_type == 1 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.betDetailData) }}>
                          <View style={{ backgroundColor: '#68bcbc', paddingVertical: 7, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                              <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, alignItems: 'center' }}> Invite More Friends</Text>
                          </View>
                      </TouchableWithoutFeedback>
                      </View> : null : <View />
                  } */}


            </View>
         </Popover>

      )
   }




   // ------------------------------------------------------- Design and Design Methods  ---------------------------------------------------------
   render() {
      return (
         <Container
            title={ProfilePageContent.page_title}
            isHeader={true}
            isSubHeader={true}
            isTitle={true}
            showIndicator={this.serviceRequestInProgress}
            LogoIconListener={this}
            menuIconListener={this}
            accountNameListener={this}
            availableBalanceListener={this}
            openPlaysListener={this}
            coveredPlaysListener={this}
            showOverlay={this.state.showOverlayGameSelectionFlag}>
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
                        <View style={{ justifyContent: "center", padding: 15, alignItems: 'center', borderColor: '#cccccc', borderTopWidth: 1, margin: 3 }}>
                           <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
                              You do not have enough UDDA bucks to access this feature. Please upgrade.

                  </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                           <View style={{ width: '46%' }}>
                              <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                 listener={() => { this.setState({ userStatusDialog: false }); this.state.actionName }} />
                           </View>
                           <View style={{ width: '4%' }}></View>
                           <View style={{ width: '46%' }}>
                              <BigButton title="Upgrade" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                 listener={() => { this.goToInappPage() }} />
                           </View>
                        </View>
                     </View>
                  </Dialog>
            <View style={styles.scrollContent}>
               <ProgressLoader
                  visible={this.state.loader}
                  isModal={true} isHUD={true}
                  hudColor={"#68bcbc"}
                  color={"#FFFFFF"}
               />
               <ScrollView bounces={false} style={styles.scrollviewstyle}>
                  {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
                  <Dialog
                     visible={this.state.dialogVisible}
                     title=""
                     onTouchOutside={() => this.setState({ dialogVisible: false })}
                  >
                     <View style={{ backgroundColor: "white", padding: 10 }}>
                        <TouchableOpacity onPress={() => { this.setState({ dialogVisible: false }) }}>
                           <View style={{ alignItems: 'flex-end', width: '100%' }}>

                              <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                           </View>
                        </TouchableOpacity>

                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} >
                           <Text style={{ padding: 1, fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: hp(2.2), color: 'black' }}>
                              Are you sure you want to place this bet?
                           </Text>
                           <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                              listener={() => {
                                 this.setState({ dialogVisible: false });
                                 if (this.state.OddsBet == true) {
                                    this.setState({ dialogVisible: false })
                                    if (this.DeeplinkName == 'oddsbet/' || this.DeeplinkName == 'index.php?oddsbet/') {
                                       this.AcceptBetCall()
                                    }
                                    else if (this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/') {
                                       this.acceptCustomCetCall()
                                    }
                                    else if (this.DeeplinkName == 'index.php?poolbet/' || this.DeeplinkName == 'poolbet/') {
                                       this.acceptPoolBetCall()
                                    }
                                    else if (this.DeeplinkName == 'oddsbet/public/' || this.DeeplinkName == 'oddsbet/private/' || this.DeeplinkName == 'index.php?oddsbet/public/' || this.DeeplinkName == 'index.php?oddsbet/private/') {
                                       this.AcceptContestBetCall()
                                    }
                                 }
                                 else {
                                    this.setState({ dialogVisible: false });
                                    if (this.DeeplinkName == 'propsbet/' || this.DeeplinkName == 'index.php?propsbet/') {
                                       this.props_place_bet_API()
                                    } else if (this.DeeplinkName == 'propsbet/public' || this.DeeplinkName == 'propsbet/private' || this.DeeplinkName == 'index.php?propsbet/public' || this.DeeplinkName == 'index.php?propsbet/private') {
                                       this.AcceptContestPropBetCall()
                                    } else if (this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/') {
                                       this.acceptCustomCetCall()
                                    }
                                 }
                              }} />
                        </View>
                     </View>
                  </Dialog>
                  {/* -------------------------------- Bet Placed user Status check Dialogue --------------------------------*/}




                 
                  {/* -------------------------------- Can't Place bet confirm Dialogue --------------------------------*/}
                  <Dialog
                     visible={this.state.BetDialog}
                     title=""
                     onTouchOutside=""
                  >
                     <View style={{ backgroundColor: "white", padding: 10 }}>
                        <TouchableOpacity onPress={() => { this.setState({ BetDialog: false }); this.gotoDashboardFromDialog(); }}>
                           <View style={{ alignItems: 'flex-end', width: '100%' }}>
                              <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                           </View>
                        </TouchableOpacity>

                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} >
                           <Text style={{ padding: 1, fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: hp(2.2), color: 'black' }}>
                              Can't Place Bet
                           </Text>
                           <BigButton title="Ok" style={styles.verify_button} textStyle={styles.verify_button_text_style}
                              listener={() => {
                                 this.setState({ dialogVisible: false });
                                 this.gotoDashboardFromDialog();
                              }}
                           />
                        </View>
                     </View>
                  </Dialog>

                  {/* ---------View all dialog design-------------------------------------------------------------------- */}
                  <Dialog
                     visible={this.state.Dialog}
                     dialogStyle={{ position: 'absolute', top: hp(15), width: wp(100), maxHeight: '90%', backgroundColor: 'white' }}
                     contentStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
                     onTouchOutside={() => this.setState({ Dialog: false })}
                  >
                     <TouchableOpacity onPress={() => this.setState({ Dialog: false })} style={{ width: 50 }}>
                        <View >
                           {/* <Image source={require('../../../../images/back_icon.png')} style={{ height: 10, width: 10, alignSelf: 'flex-start', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image> */}
                           <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 2 }}
                              onPress={() => this.setState({ Dialog: false })}
                           />
                        </View>
                     </TouchableOpacity>
                     <View style={{ padding: 0, height: hp(98) }}>

                        <View style={{ height: hp(60) }}>
                           <FlatList
                              extraData={this.state}
                              data={this.state.people_list}
                              keyExtractor={(item: any, index) => index.toString()}
                              bounces={false}
                              renderItem={({ item, index }: any) => {
                                 return (
                                    <View style={{ width: '100%', padding: 5, flexDirection: 'row', height: 'auto' }}>
                                       {this.state.isPool ?




                                          <View style={{ borderBottomColor: '#EEEEEE', borderBottomWidth: hp(.2), width: '100%', flexDirection: 'row', height: 40, alignContent: 'center', alignItems: 'center' }}>
                                             <View style={{ width: '40%', height: 'auto' }}>
                                                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>{item.username}</Text>
                                             </View>
                                             <View style={{ width: '38%' }}>
                                                <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>

                                                   {this.state.poolInfo.bet_play_type == '1' && this.state.isPool ? item.my_answer : null}</Text>

                                             </View>
                                             <View style={{ width: '22%', justifyContent: 'flex-end', height: 'auto', flexDirection: 'row' }}>
                                                <Image
                                                   resizeMode="contain"
                                                   style={{ height: hp(1.3), width: hp(1.5) }}
                                                   source={require('../../../../images/BucksDark.png')}>
                                                </Image>
                                                <Text style={{ color: '#000000', fontFamily: 'Montserrat-Bold', fontSize: 12 }}>{item.bet_amount}</Text>
                                             </View>
                                          </View>




                                          :
                                          // <View style={{ width: '100%', padding: 5, flexDirection: 'row', height: 'auto' }}>
                                          <View style={{ borderBottomColor: '#EEEEEE', borderBottomWidth: hp(.2), width: '100%', flexDirection: 'row', height: 40, alignContent: 'center', alignItems: 'center' }}>
                                             <View style={{ width: '60%', height: 'auto' }}>
                                                <Text style={{ color: '#000000', fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>{item.username}</Text>
                                             </View>

                                             <View style={{ width: '40%', justifyContent: 'flex-end', height: 'auto', flexDirection: 'row' }}>
                                                <Image
                                                   resizeMode="contain"
                                                   style={{ height: hp(1.3), width: hp(1.5) }}
                                                   source={require('../../../../images/BucksDark.png')}>
                                                </Image>
                                                <Text style={{ color: '#000000', fontFamily: 'Montserrat-Bold', fontSize: 12 }}>{item.bet_amount}</Text>
                                             </View>
                                          </View>

                                       }
                                    </View>
                                 )
                              }}
                           />
                        </View>
                        {!this.state.isPool ?
                           <View style={{ backgroundColor: '#fff', width: '100%', height: 'auto', alignItems: 'flex-end', marginTop: 10 }}>
                              <View style={{ width: '40%', alignItems: 'flex-end', height: 'auto' }}>
                                 <View style={{ width: '100%', backgroundColor: '#333333', height: 1 }}>
                                 </View>
                                 <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Image
                                       resizeMode="contain"
                                       style={{ height: hp(1.3), width: hp(1.5) }}
                                       source={require('../../../../images/BucksDark.png')}>
                                    </Image>
                                    <Text style={{ fontSize: 16, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.total_people_amount}</Text>
                                 </View>
                                 <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ color: '#888888', fontSize: 12, fontFamily: 'Montserrat-Medium' }}>Open Amount: </Text>
                                    <Image
                                       resizeMode="contain"
                                       style={{ height: hp(1.3), width: hp(1.5), marginTop: 5 }}
                                       source={require('../../../../images/BucksDark.png')}></Image>
                                    {/* <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-SemiBold' }}>{this.state.bet_detail.amount_to_win - this.state.bet_detail.total_people_amount}.00</Text> */}
                                    <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-SemiBold' }}> {this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/' ? Math.round(((this.state.bet_detail.amount_to_win - this.state.bet_detail.total_people_amount)) * 100) / 100 : Math.round(((this.state.bet_detail.bet_amount - this.state.bet_detail.total_people_amount)) * 100) / 100}
</Text>
                                
                                 </View>
                                 <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ color: '#888888', fontSize: 12, fontFamily: 'Montserrat-Medium' }}>Wager: </Text>
                                    <Image
                                       resizeMode="contain"
                                       style={{ height: hp(1.3), width: hp(1.5) }}
                                       source={require('../../../../images/BucksDark.png')}></Image>
                                    <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-SemiBold' }}>{(this.state.bet_detail.bet_reject_type == 'o' || this.state.bet_detail.bet_reject_type == 'p') ? this.state.bet_detail.bet_amount : this.state.bet_detail.amount_to_win}</Text>
                                 </View>
                              </View>
                           </View>
                           :
                           null
                        }
                     </View>
                  </Dialog>

                  <View style={styles.Main_Container}>
                     <View style={styles.Second_Container}>
                        <View style={styles.Profile_Container}>
                           <View style={styles.Image_Container}>
                              <Image source={{ uri: this.state.bet_user_info.photo }} style={{ width: 30, height: 30, borderRadius: 15 }} resizeMode='contain' />
                           </View>
                           <View style={styles.UserDetail_Container}>
                              <View style={{ flexDirection: 'row', width: '100%', height: 'auto' }}>
                                 <View style={{ flexDirection: 'column', width: '60%', }}>
                                    <Text style={{ fontSize: 12, color: '#888888', fontFamily: 'Montserrat-Regular', }}>From:</Text>
                                    <Text style={{ fontSize: 14, color: '#333333', fontFamily: 'Montserrat-SemiBold', paddingLeft: 1 }}>{this.state.Accepted == 'R' ? Application.sharedApplication().user!.profile.firstName : this.state.bet_user_info.firstname} </Text>
                                 </View>
                                 <View style={{ width: '40%', paddingRight: 10 }}>
                                    <Text style={{ width: '100%', fontSize: 10, color: '#888888', fontFamily: 'Montserrat-Regular', textAlign: 'right' }}> {this.state.betDate}  </Text>
                                    <Text style={{ width: '100%', fontSize: 10, color: '#888888', fontFamily: 'Montserrat-Regular', textAlign: 'right' }}> {this.state.betTime}  </Text>
                                 </View>
                              </View>

                              {this.state.Accepted == 'R' ?
                                 <Text style={{ fontSize: 12, color: '#888888', fontFamily: 'Montserrat-Regular' }}>To:
                                 <Text style={{ fontSize: 14, color: '#333333', fontFamily: 'Montserrat-SemiBold' }}>     {this.state.bet_user_info.firstname} {this.state.bet_user_info.lastname} </Text>
                                 </Text> : null}
                           </View>
                        </View>
                        <View style={styles.Line}>
                        </View>

                        {this.state.Accepted == "A" ?
                           <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                              <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                                 {/* {this.state.OddsBet == false ?
                                          <View style={{ flex: 1,
                                             flexDirection: 'column',
                                             justifyContent: 'center',
                                             alignItems: 'stretch',}} >   
                                          <Text style={{textAlign:'center',color: 'black', fontFamily: 'Montserrat-bold', fontSize: hp(2)}}>  MATCH UP   </Text>
                                                   </View>:null
                                 } */}
                                 {(this.state.OddsBet == false || this.state.isPool) ?
                                    // Team name
                                    // <View>
                                    //       <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'center' }}>
                                    //             <View style={{ width: '48%', backgroundColor: 'white' }}>
                                    //                   <Text> {this.state.bet_detail.home_team_name}</Text>
                                    //             </View>
                                    //             <View style={{ width: '48%', backgroundColor: 'white' }}>
                                    //                   <Text> {this.state.bet_detail.away_team_name}</Text>
                                    //             </View>
                                    //       </View>
                                    //       <Text style={{ color: '#68bcbc', fontFamily: 'Montserrat-Bold', fontSize: 16, padding: 10, paddingBottom: 5 }}>
                                    //             {this.state.bet_detail.question}
                                    //       </Text>
                                    // </View>
                                    <View style={{ flexDirection: 'row', marginTop: 12, marginBottom: 8 }}>
                                       {/* <View style={{flexDirection:'row',flex:1,width: '100%'}} >   
                                                                        <Text style={{textAlign:'center',color: 'black', fontFamily: 'Montserrat-bold', fontSize: hp(2)}}>  MATCH UP   </Text>
                                       </View> */}
                                       {/* <TouchableOpacity style={{width:wp(38)}} >
                                       <View style={{  alignItems: 'center', backgroundColor: '#08868a',justifyContent:'center',alignContent:'center'}}>  
                                                <Text style={{
                                                color: 'white',  
                                                fontSize: 15 ,
                                                padding:3
                                                }} >{this.state.bet_detail.home_team_name}</Text>  
                                             </View>  
                                             </TouchableOpacity>  
                                             <TouchableOpacity style={{width:wp(38),marginLeft:2}} >
                                             <View style={{  alignItems: 'center', backgroundColor: '#08868a',justifyContent:'center',alignContent:'center'}}>  
                                                <Text style={{
                                                color: 'white',  
                                                fontSize: 15 ,
                                                padding:3
                                                }} >{this.state.bet_detail.away_team_name}</Text>  
                                             </View>  
                                             </TouchableOpacity>                 */}
                                    </View> :
                                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'center' }}>
                                       <View style={{ width: '48%', backgroundColor: 'white' }}>
                                          <Text style={{ color: 'white', backgroundColor: '#3a9797', fontFamily: 'Montserrat-Bold', fontSize: 14, paddingVertical: (this.state.bet_detail.bet_odds_line_type == 'draw') ? 8 : 4, textAlign: 'center', marginRight: 2 }}>{this.state.TeamName1} </Text>
                                          {this.state.bet_detail.bet_odds_line_type == 'draw' ? null : <View style={{ backgroundColor: '#68bcbc', paddingVertical: 10, marginTop: 2, marginRight: 2, justifyContent: 'center' }}>
                                             <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 16 }}> {this.state.DataList.side_team_odd}</Text>
                                             {/* {this.state.bet_detail.bet_odds_type == '1' ?
                                             <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 16 }}> {this.state.bet_detail.ml_away_price}</Text>
                                          :
                                          this.state.bet_detail.bet_odds_type == '2' ?
                                             <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 16 }}>
                                                O {this.state.bet_detail.total} ({this.state.bet_detail.total_over_price})
                                             </Text>
                                          :
                                          <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 16 }}>
                                             {this.state.bet_detail.ps_away_spread > 0 ? "+" : null}{this.state.bet_detail.ps_away_spread} ({this.state.bet_detail.ps_away_price})
                                          </Text>
                                          } */}
                                          </View>}
                                       </View>
                                       <View style={{ width: '48%', backgroundColor: 'white' }}>
                                          <Text style={{ color: 'white', backgroundColor: (this.state.bet_detail.bet_odds_line_type == 'draw') ? '#3a9797' : '#999999', fontFamily: 'Montserrat-Bold', fontSize: 14, paddingVertical: (this.state.bet_detail.bet_odds_line_type == 'draw') ? 8 : 4, textAlign: 'center' }}>{this.state.TeamName2} </Text>
                                          {this.state.bet_detail.bet_odds_line_type == 'draw' ? null : <View style={{ backgroundColor: '#CCCCCC', paddingVertical: 10, marginTop: 2, justifyContent: 'center' }}>
                                             <Text style={{ color: '#999999', fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 16 }}>
                                                {this.state.DataList.opposite_team_odds}
                                             </Text>

                                             {/* {this.state.bet_detail.bet_odds_type == '1' ?
                                             <Text style={{ color: '#999999', fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 16 }}>
                                                {this.state.bet_detail.ml_home_price}
                                             </Text>
                                          :
                                          this.state.bet_detail.bet_odds_type == '2' ?
                                          <Text style={{ color: '#999999', fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 16 }}>
                                             U {this.state.bet_detail.total} ({this.state.bet_detail.total_under_price})
                                          </Text>
                                          :
                                          <Text style={{ color: '#999999', fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 16 }}>
                                             {this.state.bet_detail.ps_home_spread > 0 ? "+" : null}{this.state.bet_detail.ps_home_spread} ({this.state.bet_detail.ps_home_price})
                                          </Text>
                                          } */}
                                          </View>}
                                       </View>
                                    </View>
                                 }
                                 <View>
                                 </View>
                              </View>
                              <View style={styles.Main_WhiteColor_Container}>
                                 <Animated.View style={[styles.Main_WhiteColor_Container, { transform: [{ translateY: this.state.shift }] }]}>
                                    <View style={styles.White_Container}>
                                       {(this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/') ?
                                          <View style={{ margin: 10 }}>
                                             <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.opposite.name}
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}> is putting up </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.bet_amount} UDDA </Text>
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}> bucks to your </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.amount_to_win} UDDA </Text>
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}> bucks that </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.question}, {"\n"}</Text>
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>you can accept all of or any part of the bet, or tap “Not now, I think I’ll pass”. {"\n"}</Text>


                                                {/* <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>Odds </Text> 
                           <Text style={{ fontSize: 13, color: '#68bcbc', fontFamily: 'Montserrat-Bold' }}>{this.state.opposite.odds}{"\n"}</Text>
                            */}
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>My answer </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.answer}{"\n"}</Text>


                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>Bet closes at </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.betTimeExpr}, {this.state.betDateExpr}{"\n"}</Text>

                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>would you like accept the bet? </Text>
                                             </Text>
                                          </View>
                                          :
                                          null
                                       }

                                       {(this.DeeplinkName == 'index.php?poolbet/' || this.DeeplinkName == 'poolbet/') ?
                                          <View style={{ margin: 10 }}>
                                             <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Medium' }}>{this.state.opposite.name}
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}> created a pool that </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.question} {"\n"}</Text>
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>It costs </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.bet_amount} UDDA</Text>
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}> bucks to join, </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}> winner take all </Text>
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>{this.state.poolInfo.bet_near_type == '1' ? 'Exact' : 'Closest'}: </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>Yes, </Text>
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>wins{"\n"}</Text>
                                                {/* <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>{ this.state.poolInfo.bet_play_type =='1'? 'Show Pick':"Do'nt Show Pick" }: </Text>
                           <Text style={{ fontFamily: 'Montserrat-Bold' }}>Yes, </Text>  */}

                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>{this.state.poolInfo.bet_type == '1' ? 'You can invite your friends.\n' : null}</Text>
                                                {/* <Text style={{ fontFamily: 'Montserrat-Bold' }}>Yes, </Text> */}
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>The pool closes at </Text>
                                                <Text style={{ fontSize: 13, color: '#68bcbc', fontFamily: 'Montserrat-Bold' }}>{this.state.betTimeExpr}, {this.state.betDateExpr}{"\n"}</Text>

                                                {/* <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>{ this.state.poolInfo.multiple_winners=='1'?'Multiple Winner:':null} </Text>
                           <Text style={{ fontFamily: 'Montserrat-Bold' }}>{ this.state.poolInfo.multiple_winners=='1'?'Yes \n':"\n"}</Text>  */}
                                                {this.state.poolInfo.bet_play_type == '1' ? <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>My answer </Text> : null}
                                                {this.state.bet_detail.my_answer_type == '1' && this.state.poolInfo.bet_play_type == '1' ? <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.my_answer_date}{"\n"}</Text> : <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.my_answer_text}{"\n"}</Text>}
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>would you like accept the bet? </Text>
                                             </Text>
                                          </View>
                                          :
                                          null
                                       }

                                       {(this.DeeplinkName != 'index.php?poolbet/' && this.DeeplinkName != 'poolbet/' && this.DeeplinkName != 'index.php?custombet/' && this.DeeplinkName != 'custombet/') ?
                                          <View style={{ margin: 10 }}>
                                             <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.opposite.name}
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}> is putting up </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.bet_amount} UDDA</Text>
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}> bucks to your </Text>
                                                <Text style={{ fontSize: 13, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.amount_to_win} UDDA</Text>
                                                <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}> bucks, you can accept all of or any part of the bet, or tap “Not now, I think I’ll pass” {'\n'}</Text>
                                                {/* <Text style={{ fontSize: 13, color: '#68bcbc', fontFamily: 'Montserrat-Bold' }}>{this.state.opposite.answer}   </Text> */}

                                                {/* <Text style={{ fontSize: 13, color: '#888888', fontFamily: 'Montserrat-Medium' }}>Do you accept the bet? </Text> */}
                                             </Text>
                                          </View>
                                          :
                                          null
                                       }

                                       <View style={[styles.Horizontal_Container, { borderColor: '#dddddd', borderRadius: 5, borderWidth: 1.2, paddingVertical: 5 }]}>
                                          {this.state.isPool ? <View style={styles.Text_Container}>
                                             {/* <Text style={{ color: '#333333', fontSize: 12, fontFamily: 'Montserrat-Regular', marginBottom: 2 }}>Pool Amount: </Text> */}
                                             <TouchableWithoutFeedback onPress={() => this.getDialogue2()}>
                                                <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Montserrat-Medium', textDecorationLine: 'underline', textDecorationColor: '#888888', marginBottom: 4 }}>
                                                   {this.state.bet_detail.total_people} People accepted:
                              </Text>
                                             </TouchableWithoutFeedback>
                                             {/*<Text  style={{ color: '#333333', fontSize: 12, fontFamily: 'Montserrat-Regular', }}>Open Amount: </Text> */}
                                          </View>
                                             : <View style={styles.Text_Container}>
                                                <Text style={{ color: '#333333', fontSize: 12, fontFamily: 'Montserrat-Regular', marginBottom: 2 }}>Wager: </Text>
                                                <TouchableWithoutFeedback onPress={() => this.getDialogue2()}>
                                                   <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Montserrat-Regular', textDecorationLine: 'underline', textDecorationColor: '#888888', marginBottom: 4 }}>
                                                      {this.state.bet_detail.total_people} People accepted:
                                 </Text>
                                                </TouchableWithoutFeedback>
                                                <Text style={{ color: '#333333', fontSize: 12, fontFamily: 'Montserrat-Regular', }}>Open Amount: </Text>
                                             </View>}
                                          {this.state.isPool ?
                                             <View style={{ width: '30%', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', marginBottom: 2, width: '100%', justifyContent: 'flex-end' }}>
                                                   <Image
                                                      resizeMode="contain"
                                                      style={{ height: hp(1.3), width: hp(1.5) }}
                                                      source={require('../../../../images/BucksDark.png')}></Image>
                                                   <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.state.bet_detail.pool_amount}</Text>
                                                </View>
                                             </View>
                                             :
                                             <View style={{ width: '30%', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row', marginBottom: 2, width: '100%', justifyContent: 'flex-end' }}>
                                                   <Image
                                                      resizeMode="contain"
                                                      style={{ height: hp(1.3), width: hp(1.5) }}
                                                      source={require('../../../../images/BucksDark.png')}></Image>
                                                   <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'Montserrat-Bold' }}>{this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/' ? this.state.bet_detail.amount_to_win : this.state.bet_detail.bet_amount}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginBottom: 2, width: '100%', justifyContent: 'flex-end' }}>
                                                   <View style={{ flexDirection: 'column' }}>
                                                      <View style={{ flexDirection: 'row' }}>
                                                         <Text style={{ fontSize: 12, color: 'black', fontFamily: 'Montserrat-Medium' }}>-</Text>
                                                         <Image
                                                            resizeMode="contain"
                                                            style={{ height: hp(1.3), width: hp(1.5) }}
                                                            source={require('../../../../images/BucksDark.png')}></Image>
                                                         <Text style={{ fontSize: 12, color: 'black', fontFamily: 'Montserrat-Medium' }}>{this.state.bet_detail.total_people_amount}</Text>
                                                      </View>
                                                   </View>
                                                </View>
                                                <View style={{ backgroundColor: '#888888', width: '70%', height: 1.5, marginBottom: 2, alignSelf: 'flex-end' }}>
                                                </View>
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
                                                   <Image
                                                      resizeMode="contain"
                                                      style={{ height: hp(1.3), width: hp(1.5) }}
                                                      source={require('../../../../images/BucksGreenColor.png')}></Image>
                                                   <Text style={{ fontSize: 12, color: '#68bcbc', fontFamily: 'Montserrat-Bold' }}>{this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/' ? Math.round(((this.state.bet_detail.amount_to_win - this.state.bet_detail.total_people_amount)) * 100) / 100 : Math.round(((this.state.bet_detail.bet_amount - this.state.bet_detail.total_people_amount)) * 100) / 100}</Text>
                                                </View>
                                             </View>
                                          }
                                       </View>

                                       <View style={{ width: '100%', marginTop: 15, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                          {(this.state.isPool && this.state.bet_detail.my_answer_type == '1') ?
                                             <TouchableOpacity style={{ width: '95%' }} onPress={this.showDateTimePicker}>
                                                {/* <View style={{ width: '100%',height:hp(8), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}> */}
                                                <View style={{ width: '100%', height: 40, backgroundColor: 'white', borderColor: '#dddddd', borderRadius: 5, borderWidth: 1.2, flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                                   <View style={{ width: '90%', justifyContent: 'center', alignContent: 'center' }}>
                                                      <Text style={[styles.datetimetext, { color: this.state.customBetDate ? 'black' : '#a6a6a6', fontSize: hp(1.4) }]}> &nbsp;&nbsp; {this.state.customBetDate == '' ? 'Select your answer date' : this.state.customBetDate}</Text>
                                                   </View>
                                                   <View style={styles.datetimeicon}>
                                                      <Image source={require('../../../../images/calendar.png')}
                                                         style={{ height: 20, width: 20 }}
                                                         resizeMode="contain" />
                                                   </View>
                                                </View>
                                             </TouchableOpacity>
                                             :
                                             null
                                          }

                                          {(this.state.isPool && this.state.bet_detail.my_answer_type == '2') ?
                                             <View style={{ width: '95%', height: 40, backgroundColor: 'white', borderColor: '#dddddd', borderRadius: 5, borderWidth: 1.2, flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                                <TextInput
                                                   value={this.state.customPooltext}
                                                   onChangeText={(text) => { this.setState({ customPooltext: text }) }}
                                                   // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, "BA") }}
                                                   // onChangeText={(text) => this.setState({ customPooltext: text })}
                                                   onFocus={this.handleFocusBA}
                                                   clearTextOnFocus={true}
                                                   keyboardType='default'
                                                   returnKeyType='done'
                                                   style={{ padding: 8,  fontFamily: 'Montserrat-Bold', fontSize: 10, width: '100%' }}
                                                   placeholder='Enter Answer'
                                                   placeholderTextColor={this.state.focuseBet ? 'black' : '#a6a6a6'}
                                                   editable={true}
                                                />
                                             </View>
                                             :
                                             null
                                          }

                                          {(!this.state.isPool) ?
                                             <View style={{ width: '95%', height: 30, backgroundColor: '#eeeeee', borderColor: '#dddddd', borderRadius: 5, borderWidth: 1.2, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'Montserrat-Regular', marginLeft: 6 }}>I bet on the</Text>
                                                <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'Montserrat-Bold', }}> {this.state.opposite.answer}</Text>
                                                <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'Montserrat-Bold', }}> {(this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/') ? '&' : ''}</Text>
                                                <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'Montserrat-Bold', }}> {(this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/') ? this.state.opposite.odds:''}</Text>
                                                <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'Montserrat-Bold', }}> {(this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/') ? 'odds':''}</Text>
                                             </View>
                                             :
                                             null
                                          }
                                          <View style={{ width: '95%', height: 40, backgroundColor: 'white', borderColor: '#dddddd', borderRadius: 5, borderWidth: 1.2, flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                             <Image
                                                resizeMode="contain"
                                                style={{ height: hp(1.3), width: hp(1.5), marginLeft: 5 }}
                                                source={require('../../../../images/Buckscut.png')}></Image>
                                             <TextInput
                                                value={this.state.betammount}
                                                // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, "BA") }}

                                                onChange={(e: any) => { this.handleKeyDown(e, "BA") }}
                                                onFocus={this.handleFocusBA}
                                                clearTextOnFocus={true}
                                                keyboardType='numeric'
                                                returnKeyType='done'
                                                style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: 10, width: '100%' }}
                                                placeholder='Enter bet amount'
                                                placeholderTextColor={this.state.focuseBet ? 'black' : '#a6a6a6'}
                                                editable={true}
                                             />
                                          </View>
 {/* {this.state.isPool?'ENTER POOL':'ACCEPT BET'} */}
                                          <TouchableWithoutFeedback onPress={() => this.showDialog(true)}>
                                             <View style={{ width: '95%', height: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: '#68bcbc', borderRadius: 5, marginTop: 10 }}>
                                                <Text style={{ color: 'white', fontSize: 22, fontFamily: 'Montserrat-Bold', marginBottom: 10 }}>
                                                  
                                                {this.state.isPool?'ENTER POOL':'ACCEPT BET'}
                              </Text>
                                                {!this.state.isPool ?
                                                   <View style={{ flexDirection: 'row' }}>
                                                      <Text style={{ color: '#333333', fontSize: 15, fontFamily: 'Montserrat-Medium' }}>Amount to Win :</Text>
                                                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                         <Image source={require('../../../../images/BucksDark.png')} style={{ height: 10, width: 10, marginTop: 4, margin: 2, marginBottom: 0 }} />
                                                         <Text style={{ color: '#333333', fontSize: 15, fontFamily: 'Montserrat-Bold' }}>{this.state.valueofDialogShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                                                      </View>
                                                   </View>
                                                   :
                                                   null
                                                }
                                             </View>
                                          </TouchableWithoutFeedback>
                                          {this.state.bet_detail.bet_reject_type=='c'?
                                             <View style={{ flexDirection: 'row',width:'95%' }}>
                                                <View style={{ width: '50%' ,backgroundColor: '#CCC' ,height:hp(7),marginTop:10,marginRight:4,borderRadius: 5}}>
                                                   <TouchableWithoutFeedback onPress={() => this.getDialogue('R')}>
                                                   <View style={{height:'100%',width:'100%',alignItems: 'center',alignContent: 'center',justifyContent: 'center'}}>
                                                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15, fontFamily: 'Montserrat-Bold' }}>
                                                         Not now.{'\n'} I think I'll pass.
                           </Text>
                           </View>
                                                   </TouchableWithoutFeedback>
                                                </View>
                                                <View style={{ width: '50%',backgroundColor: '#f26524' ,height:hp(7),marginTop:10,borderRadius: 5 }}>
                                                   <TouchableWithoutFeedback onPress={() => this.goToCustomCounterBet('R')}>
                                                      <View style={{height:'100%',width:'100%',alignItems: 'center',alignContent: 'center',justifyContent: 'center'}}>
                                                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15, fontFamily: 'Montserrat-Bold' }}>
                                                         Counter Bet
                           </Text>
                           </View>
                                                   </TouchableWithoutFeedback>
                                                </View>
                                             </View>:
                                             <View  style={{backgroundColor: '#CCC',width:'95%',height:hp(7),marginTop:10,borderRadius: 5}}>
                                                <TouchableWithoutFeedback onPress={() => this.getDialogue('R')}>
                                                <View style={{height:'100%',width:'100%',alignItems: 'center',alignContent: 'center',justifyContent: 'center'}}>
                                                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15, fontFamily: 'Montserrat-Bold' }}>
                                                   Not now. I think I'll pass.
                           </Text>
                                                </View>
                                             </TouchableWithoutFeedback>
                                                </View>
                                          } 
                                       
                                       </View>
                                    </View>
                                 </Animated.View>
                              </View>
                           </View>
                           :
                           null
                        }

                        {this.state.BlackDialog == true ?
                           <View style={{ width: '100%', position: 'absolute', left: 5, top: '50%' }}>
                              <View style={{ alignItems: 'center' }}>
                                 <View style={styles.dialog_triangle}>
                                 </View>
                                 <View style={{ borderRadius: 5, backgroundColor: '#fff', padding: 5, elevation: 5, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.25, shadowRadius: 3.84, shadowColor: '#000' }}>
                                    <TouchableWithoutFeedback onPress={() => { this.setState({ BlackDialog: false }) }} >
                                       <View>
                                          <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10, alignSelf: 'flex-end', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image>
                                       </View>
                                    </TouchableWithoutFeedback>
                                    <FlatList
                                       extraData={this.state}
                                       data={this.state.people_list}
                                       keyExtractor={(item: any, index) => index.toString()}
                                       bounces={false}
                                       renderItem={({ item, index }: any) => {
                                          return (
                                             <View style={{ flex: 1 }} >
                                                {(index < 3 && !this.state.isPool) || (index > -1 && this.state.isPool) ?
                                                   <View style={{ width: '90%', flexDirection: 'row' }}>
                                                      <View style={{ width: (this.state.isPool) ? '42%' : '80%' }}>
                                                         <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>{item.username} </Text>

                                                      </View>
                                                      {this.state.isPool && <View style={{ width: '38%' }}>
                                                         <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>
                                                            {/*     {this.state.poolInfo.bet_play_type == '1' && this.state.isPool ? 'Pick: ' : null} */}
                                                            {this.state.poolInfo.bet_play_type == '1' && this.state.isPool ? item.my_answer : null}</Text>

                                                      </View>}
                                                      <View style={{ flexDirection: 'row', width: '20%', alignSelf: 'flex-end' }}>
                                                         <Image
                                                            resizeMode="contain"
                                                            style={{ height: hp(1.3), width: hp(1.5) }}
                                                            source={require('../../../../images/BucksDark.png')}></Image>
                                                         <Text style={{ color: '#000', fontFamily: 'Montserrat-Bold', fontSize: 12 }}>{item.bet_amount} </Text>
                                                      </View>

                                                   </View>
                                                   :
                                                   null
                                                }
                                             </View>
                                          )
                                       }}
                                    />

                                    {this.state.bet_detail.total_people > 3 && !this.state.isPool ?
                                       <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>
                                          ....plus {this.state.bet_detail.total_people - 3} more
                     </Text>
                                       :
                                       null
                                    }
                                    {this.state.isPool ?
                                       null :
                                       <TouchableWithoutFeedback onPress={() => { this.showMoreDialog(true) }}>
                                          <Text style={{ color: '#68bcbc', fontSize: 14, fontFamily: 'Montserrat-Bold', textDecorationColor: '#222', textDecorationLine: 'underline', textAlign: 'center' }}>
                                             VIEW ALL
                        </Text>
                                       </TouchableWithoutFeedback>

                                    }
                                 </View>
                              </View>
                           </View>
                           :
                           null
                        }

                        <DateTimePicker
                           // onDateChange={this.setDate}
                           isVisible={this.state.isDateTimePickerVisible}
                           // customConfirmButtonIOS={this.handleStartDatePicked}
                           onConfirm={this.handleStartDatePicked}
                           onCancel={this.hideDateTimePicker}
                           minimumDate={this.state.minimumDate}
                           mode="date"
                        />
                        {this.state.Accepted == 'R' ?
                           <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                              <Text style={{ width: '85%', color: '#333333', fontFamily: 'Montserrat-Bold', fontSize: 12 }}>Reply to {this.state.bet_user_info.firstname}
                                 <Text style={{ color: '#888888', fontFamily: 'Montserrat-Regular', fontSize: 12 }}> | </Text>
                                 <Text style={{ color: '#888888', fontFamily: 'Montserrat-Regular', fontSize: 12 }}>Reply to All </Text>
                              </Text>
                              <View style={{ width: '95%', height: 250, backgroundColor: 'white', alignItems: 'center', marginTop: 15 }}>
                                 <TextInput
                                    value={this.state.Message}
                                    style={{ padding: 8, fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), width: '100%' }}
                                    placeholder='Type your message here'
                                    placeholderTextColor='#333333'
                                    onChangeText={(text) => this.setState({ Message: text })}
                                    multiline={true}
                                    editable={true}
                                 />
                              </View>
                              <TouchableWithoutFeedback onPress={() => { this.sendMessege() }}>
                                 <View style={{ width: '90%', height: 40, backgroundColor: '#68bcbc', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Montserrat-Bold', textAlign: 'center' }}>
                                       SEND
                  </Text>
                                 </View>
                              </TouchableWithoutFeedback>

                              <TouchableWithoutFeedback onPress={() => { this.setState({ Accepted: 'A' }) }}>
                                 <Text style={{ textAlign: 'center', color: '#68bcbc', textDecorationColor: '#68bcbc', textDecorationLine: 'underline', marginTop: 10, fontFamily: 'Montserrat-Medium', fontSize: 12 }}>
                                    View original message
               </Text>
                              </TouchableWithoutFeedback>
                           </View>
                           :
                           null
                        }
                     </View>
                  </View>

                  <TouchableWithoutFeedback onPress={() => { this.gotoDashboard() }}>
                     <View style={{ width: '100%', height: '15%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#68bcbc', fontSize: 16, textDecorationColor: '#68bcbc', textDecorationLine: 'underline', fontFamily: 'Montserrat-SemiBold' }}>
                           Back to Dashboard
         </Text>
                     </View>
                  </TouchableWithoutFeedback>
               </ScrollView>
            </View >
         </Container >
      )
   }
}


const mapStateToProps = (state: GlobalAppState) => ({
   requestStatus: state.serviceReducer.requestStatus,
   response: state.serviceReducer.response as PlayResponse,
   error: state.serviceReducer.error,
   serviceKey: state.serviceReducer.serviceKey,
   listeners: state.serviceReducer.listeners,
   getProfileRequestStatus: state.serviceReducer.requestStatus,
   getProfileResponse: state.serviceReducer.response,
   getProfileError: state.serviceReducer.error,
   acceptBetRequestStatus: state.serviceReducer.requestStatus,
   acceptBetResponse: state.serviceReducer.response,
   acceptBetError: state.serviceReducer.error,

   sendMsgRequestStatus: state.serviceReducer.requestStatus,
   sendMsgResponse: state.serviceReducer.response,
   sendMsgError: state.serviceReducer.error,

   betaFriendRequestStatus: state.serviceReducer.requestStatus,
   betaFriendResponse: state.serviceReducer.response as BetAFriendResponse,
   betaFriendError: state.serviceReducer.error,
   customBetaFriendRequestStatus: state.serviceReducer.requestStatus,
   customBetaFriendResponse: state.serviceReducer.response as CustomBetAFriendResponse,
   customBetaFriendError: state.serviceReducer.error,
   customPoolBetaFriendRequestStatus: state.serviceReducer.requestStatus,
   customPoolBetaFriendResponse: state.serviceReducer.response as CustomPoolBetAFriendResponse,
   customPoolBetaFriendError: state.serviceReducer.error,
})

export default connect(mapStateToProps)(G_PrivateBetView);