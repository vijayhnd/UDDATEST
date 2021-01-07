import React from "react";
import { View, Text, TextInput, Platform, Alert, TouchableOpacity, ScrollView, AsyncStorage, Animated, UIManager, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import {AppEventsLogger} from 'react-native-fbsdk'; 
import { AdMobBanner } from 'react-native-admob';
import AlertUtil from "../../../../Util/AlertUtil";
import AppConstants from "../../../../Util/Constants";
import SportsListComponent from "../../../../Components/CustomComponents/SportsListComponent";
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import Application from "../../.../../../../Entities/Application";
import BigButton from "../../../../Components/Button/BigButton";
import RouterBuilder from "../../../../Router";
import SearchBox from '../../../../Components/CustomComponents/SearchBox/SearchBox';
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ProgressLoader from 'rn-progress-loader';
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { OverlayBackground } from '../../../../Components/CustomComponents/OverlayBackground/OverlayBackground';
import { CheckBox, Image, } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { UDDAError } from "../../../../Entities";
import { FooterListner } from "../../../../Components/CustomComponents/Footer/SingleMatchScheduleWithTitleComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { Dialog } from 'react-native-simple-dialogs';
import moment from 'moment';
import GrayPrevIcon from "../../../../Components/Icons/GrayIconPrev";
import GrayNextIcon from "../../../../Components/Icons/GrayIconNext";
import ImagePicker from "react-native-image-picker";

import PlaceBetRequest from "../../../../Services/Bets/PlaceBetRequest";
import PlaceBetResponseParser from "../../../../Services/Bets/PlaceBetResponseParser";
import PlaceBetResponse from "../../../../Services/Bets/PlaceBetResponse";
import BetAFriendRequest from "../../../../Services/Bets/BetAFriendRequest";
import BetAFriendResponseParser from "../../../../Services/Bets/BetAFriendResponseParser";
import BetAFriendResponse from "../../../../Services/Bets/BetAFriendResponse";
import UrlService from '../../../../Services/Core/ServiceURI';
import DateTimePicker from "react-native-modal-datetime-picker";
import ReferralService from "../../../../Services/Referral/ReferralService";
import LinearGradient from 'react-native-linear-gradient';
import CustomBetAFriendRequest from "../../../../Services/Bets/CustomBetAFriendRequest";
import CustomBetAFriendResponseParser from "../../../../Services/Bets/CustomBetAFriendResponseParser";
import CustomBetAFriendResponse from "../../../../Services/Bets/CustomBetAFriendResponse";
var update = require('immutability-helper');
import ToggleSwitch from 'toggle-switch-react-native'
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const CleverTap = require('clevertap-react-native');
import Icons from 'react-native-vector-icons/MaterialIcons';




const ProfilePageContent = {
  key: 'somethun',
  page_title: '',
}


interface G_CustomBetViewProps extends AppValidationComponentProps {

  getProfileRequestStatus?: ServiceRequestStatus
  getProfileResponse?: GetProfileResponse
  getProfileError?: UDDAError



  betaFriendRequestStatus?: ServiceRequestStatus
  betaFriendResponse?: BetAFriendResponse
  betaFriendError?: UDDAError

  placeBetRequestStatus?: ServiceRequestStatus
  placeBetResponse?: PlaceBetResponse
  placeBetError?: UDDAError

  customBetaFriendRequestStatus?: ServiceRequestStatus
  customBetaFriendResponse?: CustomBetAFriendResponse
  customBetaFriendError?: UDDAError

  serviceKey?: string
  listeners?: any
}

interface G_CustomBetViewState extends AppValidationComponentState {

  contentInsetBottom?: any
  firstName?: Field
  lastName?: Field
  email?: Field
  mobile?: Field
  showOverlayGameSelectionFlag: boolean
  league_id?: Field
  DataList?: any
  checkedBetPrivate: boolean,
  checkedBetPP: boolean,
  checkedBetText: any,
  checkedBetPublic: boolean,
  checkedMoneyLinePrivate: boolean,
  checkedMoneyLinePublic: boolean,
  betammount: any,
  amounttowin: any,

  ///@pky
  selectedBetData: any,
  customBetTest: any,
  customBetQTest1: any,
  customBetQTest2: any,
  customBetOdds: any,
  customBetCutmOdds: any,
  customBetDate: any,
  customBetTime: any,
  oddsValue: any,
  dateTimeValue: any,
  //@pky
  customProbBetList: any,
  //ashish
  isDateTimePickerVisible: any;
  isTimePickerVisible: any;
  iscustomdialog: any;
  result: any;
  minimumDate: any;






  text: any,
  ErrorMessage?: any,
  dialogVisible: boolean,
  valueofMoneylineDialog: any;
  valueofMoneylineDialogShow: any;
  TitleofMoneylineDialog: any;
  focuseAmounttowin: boolean;
  focuseBet: boolean;
  dialogmoreprocess: boolean,
  selectedItem: any;
  selectedPropsItem: any;
  selected_Legue_id: any;
  loader: any;
  isBetaFriendSelect: any;
  BetDialogueData: any;
  BetDialogueNoData: any;
  BetDialogQue: any;
  selecteValue: any;
  Bet_Question_array: any;
  moredialogclick: any;
  SelectedBetOption: any;
  NoData: any;
  selectedValue: any;
  selectedSoccerValue: any;
  selectedGameValue: any;
  showFighting: any; //garima
  showSoccer: any;
  groupType: any; //garima
  selectedPropBetOptions: any;
  selectedPropBetValue: any;
  shareDialog: any;
  appState: any;
  BetType: any;
  POSTBetAmount: any;
  MessageString: any;
  MessageUrl: any;
  keyboardOpen: any;
  SportData: any;
  guestUserDialog: boolean;

  thanksDialog: any;
  pastWeekTitle: any;
  currentWeekTitle: any;
  upcomingGameTitle: any;
  currentweekindex: any;

  shift: any;
  MatchEventDialog: any;
  RealpastWeekTitle: any;
  RealupcomingGameTitle: any;

  fightingArray: any; //garima

  avatarSource: any
  avatarSourcename: any
  multiple: boolean


  Share_Show_Msg: any;
  PropselctedFlag: any;

  BetPromotionalMsg: any;
  ReferString: any;
  isEditable: boolean;
  postQuestion: any;
  postAnswer: any;
  postOdds: any;
  /*  For Auto Racing and Horse Racing */
  showAutoRacing: any;
  showHorseRacing: any;
  selectedAutoRacingValue: any;
  selectedHorseRacingValue: any;
  selectedGroupType: any;

  //ashish
  settype: any;
  DatatwoList?: any;
  startPage: any;
  showView: any;
  searchText: any;
  searchData: any;
  legueArrayTeamData: any;
  showClgFootball: any;
  showClgBasketBall: any;
  dashboard_team_id: any;
  betenable: any;
  textlength: any;

  POSTamounttowin:any;
  userStatusDialog:any;
  custonDropDownvalue:any;
  settleBetDate:any;
  settleBetTime:any;
  settleBetTimePicker:any;
  settleBetDatePicker:any;
  settleBetToogle:any;
  keypadBlock:any;









}

const bottom_initial = 0;
class CustomBet extends AppValidationComponent<G_CustomBetViewProps, G_CustomBetViewState>
{
  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  private serviceRequestInProgress = false
  private Answer: any
  private NewAnswer: any
  private AnswerShow: any
  private NewAnswerShow: any
  private New: any
  private NewShow: any
  private noqueData: any
  public filterData: any;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  private referralservice = new ReferralService(); //Vijay
  private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
  //public eventId ='1077045';
  public eventId ='';


  constructor(props: any) {
    super(props);

    this.state = {
      contentInsetBottom: bottom_initial,
      showOverlayGameSelectionFlag: false,
      DataList: [],
      selectedBetData: [],
      checkedBetPrivate: false,
      checkedBetPublic: true,
      checkedBetPP: true,
      checkedBetText: 'P2',
      checkedMoneyLinePrivate: false,
      checkedMoneyLinePublic: true,
      betammount: '',
      amounttowin: '',

      ///@pky
      customBetTest: '',
      customBetQTest1: '',
      customBetQTest2: '',
      customBetOdds: '',
      customBetCutmOdds: '',
      customBetDate: '',
      customBetTime: '',
      oddsValue: '',
      dateTimeValue: '',
      //@pky
      customProbBetList: [],
      //ashish
      minimumDate: new Date(),
      isDateTimePickerVisible: false,
      isTimePickerVisible: false,
      iscustomdialog: false,
      result: '',
      text: '',
      ErrorMessage: '',
      dialogVisible: false,
      valueofMoneylineDialog: '0.00',
      valueofMoneylineDialogShow: '0.00',
      TitleofMoneylineDialog: 'Amount to Win:',
      focuseAmounttowin: false,
      focuseBet: false,
      dialogmoreprocess: false,
      selectedItem: [],
      selectedPropsItem: [],
      selected_Legue_id: '1',
      loader: false,
      fightingArray: '',
      appState: AppState.currentState,
      shift: new Animated.Value(0),
      isBetaFriendSelect: false,
      selecteValue: '0',
      BetDialogueData: [],
      BetDialogueNoData: '',
      BetDialogQue: [],
      Bet_Question_array: [],
      moredialogclick: 'f',
      SelectedBetOption: 'C',
      NoData: '',
      showFighting: false, //garima
      showSoccer: false,//garima
      selectedValue: 'UFC',
      selectedSoccerValue: 'English Premier League',
      selectedGameValue: '',
      selectedPropBetOptions: 'N',
      selectedPropBetValue: '0',
      shareDialog: false,
      BetType: '',
      POSTBetAmount: '',
      MessageString: '',
      MessageUrl: '',
      keyboardOpen: false,
      SportData: '',
      guestUserDialog: false,

      thanksDialog: false,


      pastWeekTitle: 'PAST RESULTS',
      currentWeekTitle: 'WEEK',
      RealpastWeekTitle: 'PAST RESULTS',
      RealupcomingGameTitle: 'NEXT MATCH',
      upcomingGameTitle: 'NEXT MATCH',
      currentweekindex: 0,


      MatchEventDialog: false,
      avatarSource: '',
      avatarSourcename: '',
      multiple: true,


      Share_Show_Msg: '',
      PropselctedFlag: '',

      BetPromotionalMsg: '',
      groupType: '', //garima
      ReferString: '',
      isEditable: false,
      postQuestion: '',
      postAnswer: '',
      postOdds: '',
      /*  For Auto Racing and Horse Racing */
      showAutoRacing: false,
      showHorseRacing: false,
      selectedAutoRacingValue: 'NASCAR matchups',
      selectedHorseRacingValue: 'Kentucky Derby',
      selectedGroupType: '',

      //ashish
      settype: '',
      DatatwoList: [],
      startPage: 1,
      showView: true,
      searchText: '',
      searchData: [],
      legueArrayTeamData: [],
      showClgFootball: false,
      showClgBasketBall: false,
      dashboard_team_id: '',
      betenable:false,
      textlength: 0,
      POSTamounttowin:'',
      custonDropDownvalue:'',
      userStatusDialog:false,
      settleBetTimePicker:false,
      settleBetDatePicker:false, 
      settleBetToogle:false, 
      settleBetTime:'',
      settleBetDate:'',
      keypadBlock:false,

    };
  }


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  setDate(newDate: any) {
    //this.setState({ customBetDate: newDate });
    //var formated_date = moment(newDate).format('YYYY-MM-DD');
    var formated_date = moment(newDate).format('MM-DD-YYYY');
    this.setState({ customBetDate: formated_date });
  }

  handleStartDatePicked = (date: any) => {
    var formated_date = moment(date).format('MM-DD-YYYY');
    this.setState({ customBetDate: formated_date });
    // this.customBetDateTime = formated_date;
    this.hideDateTimePicker();
  }

  showDateTimePicker1 = () => {
    this.setState({ isTimePickerVisible: true });
  };

  hideDateTimePicker1 = () => {
    this.setState({ isTimePickerVisible: false });
  };

  setDate1(newDate: any) {
    this.setState({ customBetTime: newDate });
  }

  handleStartDatePicked1 = (date: any) => {
    let formate = date;
    let am_pm = ' AM';
    let hours = formate.getHours();
    let minutes = formate.getMinutes();
    let seconds = formate.getSeconds();
    if (hours > 11) {
      am_pm = ' PM';
      if (hours > 12) {
        hours = hours - 12;
      }
    }

    if (hours == 0) {
      hours = 12;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var string = hours + ':' + minutes + am_pm;
    this.setState({ customBetTime: string });
    //   // this.customBetDateTime = formated_date;
    this.hideDateTimePicker1();
  }








  settleDateTimePicker = () => {
    this.setState({ settleBetDatePicker: true });
  };

  settlehideDateTimePicker = () => {
    this.setState({ settleBetDatePicker: false });
  };

  settlesetDate(newDate: any) {
    //this.setState({ customBetDate: newDate });
    //var formated_date = moment(newDate).format('YYYY-MM-DD');
    var formated_date = moment(newDate).format('MM-DD-YYYY');
    this.setState({ settleBetDate: formated_date });
  }

  settlehandleStartDatePicked = (date: any) => {
    var formated_date = moment(date).format('MM-DD-YYYY');
    this.setState({ settleBetDate: formated_date });
    // this.customBetDateTime = formated_date;
    this.settlehideDateTimePicker();
  }

  settleshowDateTimePicker1 = () => {
    this.setState({ settleBetTimePicker: true });
  };

  settlehideDateTimePicker1 = () => {
    this.setState({ settleBetTimePicker: false });
  };

  settlesetDate1(newDate: any) {
    this.setState({ settleBetTime: newDate });
  }

  settlehandleStartDatePicked1 = (date: any) => {
    let formate = date;
    let am_pm = ' AM';
    let hours = formate.getHours();
    let minutes = formate.getMinutes();
    let seconds = formate.getSeconds();
    if (hours > 11) {
      am_pm = ' PM';
      if (hours > 12) {
        hours = hours - 12;
      }
    }

    if (hours == 0) {
      hours = 12;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var string = hours + ':' + minutes + am_pm;
    this.setState({ settleBetTime: string });
    //   // this.customBetDateTime = formated_date;
    this.settlehideDateTimePicker1();
  }










  onChangeOdd(value: any) {
    this.setState({ isEditable: false });
    this.setState({ customBetOdds: value });
    this.setState({ customBetCutmOdds: '' });
    this.setState({ betammount: '' });
    this.setState({ amounttowin: '' });
    this.setState({ valueofMoneylineDialogShow: '0.00' });
    this.setState({ valueofMoneylineDialog: '0.00' });
    if (value == 'CUSTOM') {
      this.setState({ isEditable: true });
    }
    Keyboard.dismiss();
    if(this.state.customBetCutmOdds==''||this.state.customBetOdds==''){
      if(this.state.customBetOdds!='CUSTOM')
      {
        this.setState({betenable:true})
      }else{
        this.setState({betenable:false})
      }
    }else{
      this.setState({betenable:true})
    }
  }
  onchangecustombet(text:any){
    this.setState({customBetCutmOdds:text})
    if(!text && text.trim() == '' )
    {
      this.setState({betenable:false})
    }else{
      this.setState({betenable:true})
    }
  }
  endEditing(value: any, MoneyLineValue: any, MFlag: any) {
    if (MFlag == 'M' || MFlag == 'T' || MFlag == 'S') {

      var posneg = Math.sign(MoneyLineValue)
      if (posneg == -1) {
        this.Answer = 1 + (100 / Math.abs(MoneyLineValue));
        this.AnswerShow = (100 / Math.abs(MoneyLineValue));
      }
      else {
        this.Answer = 1 + (MoneyLineValue / 100);
        this.AnswerShow = (MoneyLineValue / 100);
      }
      this.NewAnswer = (value * (this.Answer))
      this.NewAnswerShow = (value * (this.AnswerShow))
    }

    else if (MFlag == 'P') {
      if (this.state.selectedPropBetOptions == 'N') {
        AlertUtil.show("Please Select Odds.");
      }
      else {
        var posneg = Math.sign(MoneyLineValue)
        if (posneg == -1) {
          this.Answer = 1 + (100 / Math.abs(MoneyLineValue));
          this.AnswerShow = (100 / Math.abs(MoneyLineValue));
        }
        else {
          this.Answer = 1 + (MoneyLineValue / 100);
          this.AnswerShow = (MoneyLineValue / 100);
        }
        this.NewAnswer = (value * (this.Answer))
        this.NewAnswerShow = (value * (this.AnswerShow))
      }

    } else if (MFlag == 'C') {
      var numericReg = /^(\d*[0-9]\/\d*[0-9])?$/;
      if (this.state.customBetOdds == '') {
        AlertUtil.show("Please Select Odds.");
      } else if (this.state.customBetOdds == 'CUSTOM' && (this.state.customBetCutmOdds == "" || this.state.customBetCutmOdds == null)) {
        AlertUtil.show("Please enter custom odd.");
      } else if (this.state.customBetOdds == 'CUSTOM' && !numericReg.test(this.state.customBetCutmOdds)) {
        AlertUtil.show("Please enter valid value in custom odd.");
      }
      else if (this.state.customBetOdds == 'CUSTOM' && (parseInt(this.state.customBetCutmOdds.split('/')[0]) < 1 || parseInt(this.state.customBetCutmOdds.split('/')[1]) < 1)) {
        AlertUtil.show("Please enter valid value in custom odd.");
      } else {
        var oddsArr;
        this.NewAnswerShow = 0;
        if (this.state.customBetOdds.indexOf('/') != -1) {
          oddsArr = this.state.customBetOdds.split('/');
          this.NewAnswerShow = ((value * parseInt(oddsArr[0])) / oddsArr[1]);
          this.NewAnswer = ((value * parseInt(oddsArr[0])) / oddsArr[1]);
          console.log(this.NewAnswerShow);
        } else if ((this.state.customBetOdds == 'CUSTOM' && this.state.customBetCutmOdds != '') && this.state.customBetCutmOdds.indexOf('/') != -1) {

          oddsArr = this.state.customBetCutmOdds.split('/');
          this.NewAnswerShow = ((value * parseInt(oddsArr[0])) / oddsArr[1]);
          this.NewAnswer = ((value * parseInt(oddsArr[0])) / oddsArr[1]);
          console.log(this.NewAnswerShow);

        }

      }


    }
    else {
      this.NewAnswer = (value * 2)
      this.NewAnswerShow = (value);
    }
    this.NewShow = parseFloat(this.NewAnswerShow).toFixed(2);
    this.setState({ valueofMoneylineDialogShow: this.NewShow });
    this.New = parseFloat(this.NewAnswer).toFixed(2);
    this.setState({ valueofMoneylineDialog: this.New });
    this.setState({ TitleofMoneylineDialog: 'Amount to Win:' });
  }


  reverceendEditing(value: any, MoneyLineValue: any, MFlag: any) {
    if (MFlag == 'M' || MFlag == 'T' || MFlag == 'S') {

      var posneg = Math.sign(MoneyLineValue)
      if (posneg == -1) {
        this.Answer = (value * Math.abs(MoneyLineValue)) / 100;
        this.AnswerShow = (value * Math.abs(MoneyLineValue)) / 100;
      }
      else {
        this.Answer = (value / MoneyLineValue) * 100;
        this.AnswerShow = (value / MoneyLineValue) * 100;
      }
      this.NewAnswer = (this.Answer);
      this.NewAnswerShow = (this.AnswerShow);
    }
    else {
      this.NewAnswer = (value);
      this.NewAnswerShow = (value);
    }

    this.New = parseFloat(this.NewAnswer).toFixed(2);
    this.setState({ valueofMoneylineDialog: this.New });

    this.NewShow = parseFloat(this.NewAnswerShow).toFixed(2);
    this.setState({ valueofMoneylineDialogShow: this.NewShow });

  }



  handleKeyDown = (e: any, aValue: any, Flag: any, MFlag: any) => {
    
    if(this.state.textlength > e.nativeEvent.text.length)
    {
     // alert('delete')
     this.setState({textlength:0})
      this.handleBackSpace("BA")
    }else{ 
     
      var n = e.nativeEvent.text
    var res = n.length-1
   // alert(n[res])
   
    
  
    if (n[res] == "." || n[res] == "1" || n[res] == "2" || n[res] == "3" || n[res] == "4" || n[res] == "5" || n[res] == "6" || n[res] == "7" ||n[res] == "8" ||n[res] == "9" ||n[res] == "0") {
      this.setState({textlength:e.nativeEvent.text.length})
      if (Flag == "ATW") {
        var ammwin = '';
        var ammwins;
        if (this.state.amounttowin.length == 0) {
          ammwin = this.state.amounttowin +n[res];
          ammwins = ammwin.split(" ");
          this.reverceendEditing(ammwin, aValue, MFlag);
          this.setState({ amounttowin: ammwin });
        }
        else {
          ammwin = this.state.amounttowin +n[res];
          ammwins = ammwin.split(" ");
          this.reverceendEditing(ammwin, aValue, MFlag);
          this.setState({ amounttowin: ammwin });
        }

      }
      else if (Flag == "BA") {
        var betamm = '';
        var betamms;
        if (this.state.betammount.length == 0) {
          betamm = this.state.betammount +n[res];
          betamms = betamm.split(" ");
          this.endEditing(betamm, aValue, MFlag);
          this.setState({ betammount: betamm });
        }
        else {
          betamm = this.state.betammount +n[res];
          betamms = betamm.split(" ");
          this.endEditing(betamm, aValue, MFlag);
          this.setState({ betammount: betamm });
        }
      }
    }
  }
  }


  /*

  handleKeyDown = (e: any, aValue: any, Flag: any, MFlag: any) => {
    if (e.nativeEvent.key == "." || e.nativeEvent.key == "1" || e.nativeEvent.key == "2" || e.nativeEvent.key == "3" || e.nativeEvent.key == "4" || e.nativeEvent.key == "5" || e.nativeEvent.key == "6" || e.nativeEvent.key == "7" || e.nativeEvent.key == "8" || e.nativeEvent.key == "9" || e.nativeEvent.key == "0") {

      if (Flag == "ATW") {
        var ammwin = '';
        var ammwins;
        if (this.state.amounttowin.length == 0) {
          ammwin = this.state.amounttowin +n[res];
          ammwins = ammwin.split(" ");
          this.reverceendEditing(ammwin, aValue, MFlag);
          this.setState({ amounttowin: ammwin });
        }
        else {
          ammwin = this.state.amounttowin +n[res];
          ammwins = ammwin.split(" ");
          this.reverceendEditing(ammwin, aValue, MFlag);
          this.setState({ amounttowin: ammwin });
        }

      }
      else if (Flag == "BA") {
        var betamm = '';
        var betamms;
        if (this.state.betammount.length == 0) {
          betamm = this.state.betammount +n[res];
          betamms = betamm.split(" ");
          this.endEditing(betamm, aValue, MFlag);
          this.setState({ betammount: betamm });
        }
        else {
          betamm = this.state.betammount +n[res];
          betamms = betamm.split(" ");
          this.endEditing(betamm, aValue, MFlag);
          this.setState({ betammount: betamm });
        }
      }
    }
  }*/
 // }

  handleBackSpace = (Flag: any) => {
    if (Flag == "ATW") {
      this.setState({ amounttowin: '' });
      this.setState({ valueofMoneylineDialog: '0.00' });
      this.setState({ valueofMoneylineDialogShow: '0.00' });
    }
    else if (Flag == "BA") {
      this.setState({ betammount: '' });
      this.setState({ valueofMoneylineDialog: '0.00' });
      this.setState({ valueofMoneylineDialogShow: '0.00' });
    }
  }

  handleFocusAtW = () => {
    this.setState({ focuseAmounttowin: true });
    this.setState({ focuseBet: false });
    this.setState({ TitleofMoneylineDialog: 'Bet Amount:' });
    this.setState({ valueofMoneylineDialog: '0.00' });
    this.setState({ valueofMoneylineDialogShow: '0.00' });
    this.setState({ betammount: '' });
    this.setState({ amounttowin: '' });
  }

  handleFocusBA = () => {
    this.setState({ focuseBet: true });
    this.setState({ focuseAmounttowin: false });
    this.setState({ TitleofMoneylineDialog: 'Amount To Win:' });
    this.setState({ valueofMoneylineDialog: '0.00' });
    this.setState({ valueofMoneylineDialogShow: '0.00' });
    this.setState({ betammount: '' });
    this.setState({ amounttowin: '' });
  }

  CustomBetDialog(item: any) {
    
    if (this.state.SelectedBetOption == 'C') {
      var numericReg = /^(\d*[0-9]\/\d*[0-9])?$/;
      if (this.state.customBetTest == "" || this.state.customBetTest == null ||
        this.state.customBetQTest1 == "" || this.state.customBetQTest1 == null ||
        this.state.customBetQTest2 == "" || this.state.customBetQTest2 == null ||
        this.state.customBetOdds == "" || this.state.customBetOdds == null ||
        this.state.customBetDate == "" || this.state.customBetDate == null ||
        this.state.customBetTime == "" || this.state.customBetTime == null ||
        this.state.settleBetDate == "" || this.state.settleBetDate == null ||
         this.state.settleBetTime == "" || this.state.settleBetTime == null
      ) {
        AlertUtil.show("Please enter all valid details");
      } else if (this.state.customBetQTest1.toLowerCase() == this.state.customBetQTest2.toLowerCase()) {

        AlertUtil.show("My answer and other answer can not be same");
      } else if (this.state.betammount < 1000 || this.state.betammount < "1000") {
        AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
      } else if (this.state.customBetOdds == 'CUSTOM' && (this.state.customBetCutmOdds == "" || this.state.customBetCutmOdds == null)) {
        AlertUtil.show("Please enter custom odd.");
      } else if (this.state.customBetOdds == 'CUSTOM' && !numericReg.test(this.state.customBetCutmOdds)) {
        AlertUtil.show("Please enter valid value in custom odd.");
      } else {
        // if(this.state.settleBetToogle)
        // {
        //   this.setState({ dialogVisible: true });
        // }else{
        //   if(this.state.settleBetDate == "" || this.state.settleBetDate == null ||
        //    this.state.settleBetTime == "" || this.state.settleBetTime == null)
        //    {
        //     AlertUtil.show("Please enter settle bet date and time !");
        //    }else{
        //     this.setState({ dialogVisible: true });
        //    }
        // }
        //this.setState({ selectedPropsItem: item });
        this.setState({ dialogVisible: true });
      }


    } else {
      if (this.state.betammount < 1000 || this.state.betammount < "1000") {
      } else if (this.state.valueofMoneylineDialog > 0) {
        this.setState({ dialogVisible: true });
      } else {
      }

    }



  }

  componentWillUnmount() {

    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();

  }


  componentWillMount() {
    console.log("componentwillmount");
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  handleKeyboardDidShow = (event: any) => {
    this.setState({ keypadBlock: true })
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight+ fieldHeight) || 0;
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
    this.setState({ keypadBlock: false })
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();
  }
  private getProfile() {
    var profileRequest = new GetProfileRequest()
    var serviceAction = new ServiceAction()
    var responseParser = new GetProfileResponseParser()
    this.props.dispatch!(serviceAction.request(ServiceType.User,
      ServiceKeys.GetProfileServiceName,
      profileRequest,
      [this.constructor.name],
      responseParser))

  }

  props_place_bet_API(selectedPropsArray: any, selectedFlag: any) {
    var bet_type;
    var bet_amount: any;
    var amount_to_win;
    var wining_rate_over;
    var wining_rate_under;
    var answer;

    this.setState({ dialogVisible: false })

    if (this.state.checkedBetText == 'P1') {
      bet_type = 1
    }
    else if (this.state.checkedBetText == 'P2') {
      bet_type = 2
    }

    amount_to_win = this.state.valueofMoneylineDialog;
    bet_amount = this.state.betammount;
    bet_amount = bet_amount;
    var posneg = 0;



    this.setState({ POSTBetAmount: bet_amount });

   
      var oddType;
      var odds;
      // var RegistrationEndDate = moment(this.RegistrationEndDate).format('YYYY-MM-DD');
      //       var start_formated_time = moment(this.start_formated_time).format('YYYY-MM-DD');
      //       var End_formated_time = moment(this.End_formated_time).format('YYYY-MM-DD');

      // try{
      var datetime = new Date(this.state.customBetDate.split('-').join('/') + ' ' + this.state.customBetTime).toISOString();
      // var settledatetime = new Date(this.state.settleBetDate.split('-').join('/') + ' ' + this.state.settleBetTime).toISOString();
      // if(!datetime){datetime = "2020-04-19T09:03:07.553Z" }
      // console.log(new Date(this.state.customBetDate + ' ' + this.state.customBetTime).getTime())
      // }
      // catch(e)
      // {

      // }

      // var datetime = moment(this.state.customBetDate).format('YYYY-MM-DD'); + ' ' + moment(this.state.customBetTime).format('YYYY-MM-DD');

      // var datetime = "2020-04-19T09:03:07.553Z"
      console.log('pky>>>>' + datetime)

      var  season_expired_on = new Date(this.state.settleBetDate.split('-').join('/') + ' ' + this.state.settleBetTime).toISOString();
      if (this.state.customBetOdds == 'CUSTOM' && (this.state.customBetCutmOdds != "")) {
        odds = this.state.customBetCutmOdds;
        oddType = 'custom';
      } else {
        odds = this.state.customBetOdds;
        oddType = 'selected';
      }
      //this.state.customBetDate.split('-').join('/')
      this.setState({ oddsValue: odds });
      this.setState({ dateTimeValue: this.state.customBetDate.split('-').join('/') + ' ' + this.state.customBetTime });

      var customBetRequset = new CustomBetAFriendRequest(
        null,
        null,
        this.eventId,
        this.state.customBetTest,
        this.state.customBetQTest1,
        this.state.customBetQTest2,
        odds,
        oddType, //'odd type  selected/custom (when create custom props)'
        bet_type,
        bet_amount,
        amount_to_win,
        datetime, //bet_expired_on
        '',
        season_expired_on,//season_expired_on 
        // this.state.settleBetToogle?1:0,
        // this.state.settleBetToogle?'':settledatetime
      )

       console.log('ok');
    console.log(customBetRequset);
   // return;

      var serviceAction = new ServiceAction()
      var responseParser = new CustomBetAFriendResponseParser()
      this.props.dispatch!(serviceAction.request(ServiceType.Bets,
        ServiceKeys.CustomBetaFriendName,
        customBetRequset,
        [this.constructor.name],
        responseParser))
    

  }

  changeToggleValue(value){
    this.setState({settleBetToogle:value})
    if(value == true)
    {
      this.setState({settleBetTime:''})
      this.setState({settleBetDate:''})
    }

  }

  async shareOption(item: any,bettype: any) {
    console.log("shareOption bettype " + bettype);

    if (this.state.shareDialog) {
      return;
    }

    var MessageString: any;
    var ShowString: any;
    var oddsString: any;
    var teamName: any;
    var teamName2: any;
    var url: any;
    var selectedData: any;
    var referStr: any;


    var amount: any;

    if (bettype == 'CUSTOM') {
      url = "http://bet.udda.com/index.php?t=custombet&i=" + item.data.encryptor_bet_id;
      //url = "https://bet.udda.com/coming-soon/"

      url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
      referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up.";

      var new_time_stampExp = new Date(this.state.dateTimeValue).getTime();//1587290498417*1000;//new Date(this.state.dateTimeValue).getTime() * 1000;
      var formated_timeExp = moment(new_time_stampExp).format('LT');
      var batdateExp: any = moment(new_time_stampExp).format('LL');
      var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
      var zonevalueExp: any = Match_dateExp[6].toString();
      var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);
      var betTimeExpr: any = formated_timeExp + " " + zoneExp;
      var betDateExpr: any = batdateExp;
      // this.setState({ betTimeExpr: formated_timeExp + " " + zoneExp });
      // this.setState({ betDateExpr: batdateExp });
     // MessageString = ' I ll give you "' + this.state.oddsValue + '" odds that "' + this.state.customBetTest + '".  I’ll put up ' + this.state.POSTBetAmount + ' UDDA bucks to your ' + this.state.POSTBetAmount + ' UDDA bucks, you can accept all of or any part of the bet. My answer  '+ this.state.customBetQTest1 +'  Bet closes at  '+ betTimeExpr + ', ' + batdateExp + '.'

      try {
       // MessageString = 'I just bet a ' + this.state.POSTBetAmount + ' UDDA Bucks that  \n"' + this.state.customBetTest + '"\n Odds "' + this.state.oddsValue + '"\n My answer  "' + this.state.customBetQTest1 + '"\n Bet closes at  "' + betTimeExpr + ', ' + batdateExp + '" .\n Would you like to accept the Bet? '
       MessageString = "I'll give you " ; 
       MessageString += '"'; 
       MessageString +=  this.state.oddsValue + '" odds that "' + this.state.customBetTest + '". I’ll put up "' + this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks to your "' + this.state.POSTamounttowin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks, you can accept all of or any part of the bet.\nMy answer "'+ this.state.customBetQTest1 +'"\nBet closes at  "'+ betTimeExpr + ', ' + batdateExp + '".'
      }
      catch (e) {

      }
      MessageString += referStr;

     var  ShowString1 = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet a <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        <Text> UDDA Bucks that{"\n"}</Text>
        <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.customBetTest} {"\n"}</Text>

        <Text>Odds </Text>

        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{this.state.oddsValue}{"\n"}</Text>
        <Text>My answer </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{this.state.customBetQTest1}{"\n"}</Text>


        <Text>Bet closes at </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{betTimeExpr}, {batdateExp} {"\n"}</Text>

        {/* <Text> and My answer is </Text>
        <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.customBetQTest1}</Text> */}
        Would you like to accept the Bet? {referStr} </Text>

        ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I’ll give you <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.oddsValue}</Text>
        <Text> odds that </Text>
        <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.customBetTest}.</Text>

        <Text> I’ll put up </Text>

        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA </Text>
        <Text>bucks to your </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{this.state.POSTamounttowin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text>


        <Text> bucks, you can accept all of or any part of the bet. {"\n"}</Text>
        <Text>My answer </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{this.state.customBetQTest1}{"\n"}</Text>


        <Text>Bet closes at </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{betTimeExpr}, {batdateExp}{"\n"}</Text>

        {/* <Text> and My answer is </Text>
        <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.customBetQTest1}</Text> */}
        Would you like to accept the Bet? {referStr} </Text>
      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });

      this.setState({ MessageUrl: url });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
      this.setState({ customBetTest: '' });
      this.setState({ customBetQTest1: '' });



    }


  }



  shareNow = async () => {

    try {
      var Message = this.state.MessageString + " " + this.state.MessageUrl;
      const result = await Share.share({
        message: Message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          this.setState({ shareDialog: false });
          console.log('shared in activity');
          RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
          // shared with activity type of result.activityType
        } else {
          this.setState({ shareDialog: false });
          console.log('shared');
          RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        this.setState({ shareDialog: false });
        console.log('share  in dismiss');
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
        // dismissed
      }
    } catch (error) {
      this.setState({ shareDialog: false });
      RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
      console.log('share error in catch ' + JSON.stringify(error));
      //alert(error.message);
    }

  };

  closeShareDialog() {
    this.setState({ shareDialog: false });
    setTimeout(function(){AlertUtil.show("Bet Placed Successfully")},2000)
    RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
  }
  onChangeShareMsg(val: any) {
    this.setState({ MessageString: val });
  }

  componentWillReceiveProps(nextProps: G_CustomBetViewProps) {
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

      }
      else if (nextProps.serviceKey === ServiceKeys.CustomBetaFriendName) {  // Custom bet response 
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log("betaFriendResponse " + JSON.stringify(nextProps.customBetaFriendResponse));
            var response = nextProps.customBetaFriendResponse!.response;
            if (response.message == 'success') {
              var amount_to_win;
              var bet_amount = this.state.betammount;
              var bet_amounttowin = this.state.valueofMoneylineDialogShow
              if (this.state.checkedBetText == 'P2') {
                this.setState({ BetType: 'CUSTOM' });
                this.setState({ POSTBetAmount: bet_amount });
                this.setState({ POSTamounttowin: bet_amounttowin });
                //alert(bet_amounttowin);

                this.shareOption(response, 'CUSTOM');

              }

              this.getProfile();
              console.log("custom bet success");

              this.setState({ customBetQTest2: '' });
              this.setState({ customBetCutmOdds: '' });
              this.setState({ customBetOdds: '' });
              this.setState({ customBetDate: '' });
              this.setState({ customBetTime: '' });
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
            }
            else {
              AlertUtil.show('Unsuccesful :' + response.message);
              this.setState({ customBetTest: '' });
              this.setState({ customBetQTest1: '' });
              this.setState({ customBetQTest2: '' });
              this.setState({ customBetCutmOdds: '' });
              this.setState({ customBetOdds: '' });
              this.setState({ customBetDate: '' });
              this.setState({ customBetTime: '' });
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });

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

 // header functionalitu

 accountNameTapped() {
  /*  if (Application.sharedApplication().user!.profile.userType == 'Guest') {
     this.setState({ guestUserDialog: true });
   }
   else { */
  this.props.navigation!.navigate(AppScreens.G_ProfileView);
  // }
}

iconDidTapped() {

  this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
}


availableBalanceTapped() {
  // this.props.navigation!.navigate(AppScreens.G_InfochartView);
}

openPlaysTapped() {
  /* if (Application.sharedApplication().user!.profile.userType == 'Guest') {
    this.setState({ guestUserDialog: true });
  }
  else { */
  this.props.navigation!.navigate(AppScreens.G_UddaContests);
  //}
}

ContesetJoinTapped() {
  /*  if (Application.sharedApplication().user!.profile.userType == 'Guest') {
     this.setState({ guestUserDialog: true });
   }
   else { */
  this.props.navigation!.navigate(AppScreens.G_UddaContests);
  //}
}
coveredPlaysTapped() {
  /*  if (Application.sharedApplication().user!.profile.userType == 'Guest') {
     this.setState({ guestUserDialog: true });
   }
   else { */
  this.props.navigation!.navigate(AppScreens.G_GamingBetView);
  //}
}
LogoiconDidTapped() {
  //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
}

goToInappPage() {
  this.setState({ userStatusDialog: false });

  // this.props.navigation!.navigate(AppScreens.G_LoginPage);

 // this.props.navigation!.navigate(AppScreens.G_InAppPurchaseUpdateIOS);
 // this.props.navigation!.replace(AppScreens.G_InAPPPurchaseViewIOS,{params:{callFrom:'userLevel'}});
  this.props.navigation!.navigate(AppScreens.G_InAPPPurchaseViewIOS,{params:{callFrom:'userLevel'}});
}


checkUserStatusDelay(betName:any)
{
  //this.updateAppNotice();
 // return;
 var that = this;
 console.log( Application.sharedApplication().user!.profile.level_array.restricted_bets);
 //if( Application.sharedApplication().user.level_array.restricted_bets)
var status = true;
 for(let i = 0; i < Application.sharedApplication().user!.profile.level_array.restricted_bets.length; i++){
  if(Application.sharedApplication().user!.profile.level_array.restricted_bets[i].type == betName)
  {
    status = false;
 setTimeout(function(){ that.setState({ userStatusDialog: true });},500)
  }

 }

  
  return status;
}



changecustomdrop(item:any){
 // this.setState({custonDropDownvalue:item})
  if(item == 'CUSTOM BET')
  { 
    if(UrlService.isLiveApp == '1'){
    this.referralservice.logEvent('CreateCustomBet_Click',{});
    AppEventsLogger.logEvent('CreateCustomBet_Click');
    CleverTap.recordEvent('CreateCustomBet_Click');
    }
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
    this.setState({ guestUserDialog: true });
}else{
 var status =  this.checkUserStatusDelay("custom_bet")
 if(status){
    this.props.navigation!.navigate(AppScreens.G_CustomBet);}}
  }else if(item == 'POOL'){
    if(UrlService.isLiveApp == '1'){
    this.referralservice.logEvent('CreatePool_Click', {});
    AppEventsLogger.logEvent('CreatePool_Click');
    CleverTap.recordEvent('CreatePool_Click');
    }
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
  }else{
    var status =  this.checkUserStatusDelay("pool")
 if(status){
    this.props.navigation!.navigate(AppScreens.G_Createpool);
 }
  }
  } else if (item == 'SQUARES') {
    if(UrlService.isLiveApp == '1'){
    this.referralservice.logEvent('CreateSquares_Click', {});
    AppEventsLogger.logEvent('CreateSquares_Click');
    CleverTap.recordEvent('CreateSquares_Click');
    }
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    } else {
      var status =  this.checkUserStatusDelay("squares")
 if(status){
      this.props.navigation!.navigate(AppScreens.G_CreateSquareView);
          }
    }
  }else if(item == 'BINGO')
  { 
    if(UrlService.isLiveApp == '1'){
        this.referralservice.logEvent('CreateBingo_Click',{});
        AppEventsLogger.logEvent('CreateBingo_Click');
        CleverTap.recordEvent('CreateBingo_Click');
    }
        if (Application.sharedApplication().user!.profile.userType == 'Guest') {
        this.setState({ guestUserDialog: true });
    }
    else{
      
          var status =  this.checkUserStatusDelay("bingo")
          if(status){
            this.props.navigation!.navigate(AppScreens.G_CreateBingo);
      }
      
      
    }
}
}
closeModal() {
  this.setState({ guestUserDialog: !this.state.guestUserDialog });
}
loginButtonPressed() {
  this.setState({ guestUserDialog: false });
  // this.props.navigation!.navigate(AppScreens.G_LocationConfirmation);
  // this.props.navigation!.navigate(AppScreens.G_LoginPage,this.props);
  RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
}
  render() {
    let data2 = [
      {
        value: 'CUSTOM'
      }, 
      
      {
      value: '1/1',
    }, {
      value: '3/2',
    }, {
      value: '2/1',
    }, {
      value: '3/1',
    },
    {
      value: '5/1',
    },
    {
      value: '10/1',
    }
    
    ];
    let pool = [{
      value: 'CUSTOM BET',//'CREATE CUSTOM',
    }, {
      value: 'POOL',
    }, 
    {
      value: 'SQUARES',
    },
    {
      value: 'BINGO',
    },
  ];


    return (

      
        <Container 
        title={'CREATE CUSTOM BET'}
          isHeader={true}
          isSubHeader={true}
          isTitle={false}
          showIndicator={this.serviceRequestInProgress}
          menuIconListener={this}
          LogoIconListener={this}
          availableBalanceListener={this}
          openPlaysListener={this}
          coveredPlaysListener={this}
          accountNameListener={this}
          isSetting={false}
        >

                 
          {/* -------------------------------- Guest user Dialogue --------------------------------*/}
          {this.state.guestUserDialog?<Guestdialog detailmodel={this.state.guestUserDialog} onDismiss={() => {
                  this.closeModal();
                }} onClick={() => {
                    this.loginButtonPressed();
                  }}/>:null}
          {/* -------------------------------- user status Dialogue --------------------------------*/}
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
                 <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                  listener={() => {this.setState({ userStatusDialog: false })}} />
              </View>
              <View style={{ width: '4%' }}></View>
              <View style={{ width: '46%' }}>
                 <BigButton title="Upgrade" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                  listener={() => { this.goToInappPage()  }} />
              </View>
            </View>
          </View>
        </Dialog>

          {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
          < Dialog
            visible={this.state.dialogVisible}
            title=""
            onTouchOutside={() => this.setState({ dialogVisible: false })
            } >
            <View style={{ backgroundColor: "transparent", width: '100%', paddingTop: 10, paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => { this.setState({ dialogVisible: false }) }}>
                <View style={{ alignItems: 'flex-end', width: '100%', paddingRight: wp(2) }}>
                  <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                </View>
              </TouchableOpacity>

              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 8, width: '100%' }} >
                <Text style={{ fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: wp(4), color: 'black' }}>
                  Are you sure you want to place this bet?
</Text>
                <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                  listener={() => {
                    if (this.state.SelectedBetOption == 'C') {
                      this.props_place_bet_API(this.state.selectedPropsItem, this.state.selectedPropBetOptions);
                    }
                   
                  }} />
              </View>
            </View>
          </Dialog >


          {/* -------------------------------- Share Dialogue --------------------------------*/}
          <Dialog
            visible={this.state.shareDialog}
            title=""
            onTouchOutside={() => this.closeShareDialog()} >

            <View style={{ backgroundColor: "white" }}>
              <View style={{ justifyContent: "center" }} >

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '88%', alignItems: 'center', marginTop: '2%' }}>
                    <Image source={require('../../../../images/udda_logo_white.png')} style={{ width: wp(30), height: wp(7), margin: 10, alignSelf: 'center' }} resizeMode='contain' />
                  </View>
                  <View style={{ width: '7%', alignItems: 'flex-end', padding: '1%' }}>
                    <TouchableWithoutFeedback onPress={() => { this.closeShareDialog() }}>
                      <View>
                        <Image source={require('../../../../images/close.png')} style={{ height: 13, width: 13, alignSelf: 'flex-end' }}></Image>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>

                <View style={{ width: '100%', backgroundColor: '#cccccc', height: 1, marginTop: 1, padding: 0 }}></View>

                <View style={{ justifyContent: "center", padding: 10 }}>

                  <Text style={{ padding: 1, fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.7), marginTop: 3, color: 'black' }}>Message</Text>

                  <View style={{ padding: 1, borderColor: '#cccccc', borderWidth: 1, marginTop: 5, }}>
                    <TextInput
                      multiline={true}

                      onChangeText={value => this.onChangeShareMsg(value)}
                      editable={true} style={{ padding: 8, width: '100%', height: 'auto',fontFamily: 'Montserrat-Regular',fontSize: hp(1.5) }}>{this.state.Share_Show_Msg}</TextInput>
                  </View>
                  <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.5), marginTop: 5, color: 'black' }}>
                    {this.state.MessageUrl}
                  </Text>
                  <BigButton title="Share Now" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                    listener={() => { this.shareNow() }} />
                  <Text style={{ fontFamily: 'Montserrat-SemiBold', textAlign: 'center', fontSize: hp(1.5), marginTop: 5, color: 'red' }}>
                    {this.state.BetPromotionalMsg}
                  </Text>
                </View>
              </View>
            </View>
          </Dialog>
          <View>
         
          <ScrollView >
   <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>
          <View style={styles.maincontainercustom}>
           
          <View style={styles.customhead}>              
              {/* <Icons name="arrow-back" size={30} color="black" style={{ marginTop: 2 }}
                onPress={() => this.props.navigation?.goBack(null)}
              /> */}
              <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'25%' }}>
              <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 5 ,marginTop:3}}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>
              <View style={{ alignContent: 'flex-start', alignItems: 'flex-start', width:'75%' }}>
                <Text style={[styles.customheadtext,{color:'#68bcbc'}]}>CREATE CUSTOM BET</Text>
              </View>
              
              {/* <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'24%' }}>
              <View style={{marginTop:15,width:'100%',alignContent: 'flex-start', alignItems:'flex-start',marginRight:5}}>
              <Dropdown
                              containerStyle={{  justifyContent: "center", width: '100%' }}
                              inputContainerStyle={{ borderBottomColor: 'transparent',width: '20%'}}
                              // pickerStyle={{ width: '100%',alignContent:'center'}}
                              overlayStyle={{ width: '100%'}}
                              dropdownOffset={{ top: 0, left: 0 }}
                              dropdownMargins={{ min: 0, max: 0 }}
                              dropdownPosition={-5.2}
                              itemTextStyle={{  paddingLeft: 5, fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: hp(1.5), color: 'black'}}
                              data={pool}
                              onChangeText={(text) => { this.changecustomdrop(text)}}
                              fontSize={hp(1.8)}
                              value={this.state.custonDropDownvalue}
                              baseColor={'#68bcbc'}
                             
                              // onFocus={Keyboard.dismiss}
                            />
              </View>
              </View> */}
           </View>

            {/* <View style={{ paddingTop: 15, width: '90%', paddingBottom: 8 }}>
              <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'black' }}> Write in your custom bet </Text>
            </View> */}

            <View style={styles.customquestion}>
              <View style={styles.customtextinput}>
                <TextInput
                  value={this.state.customBetTest}
                  // numberOfLines={10}  
                  multiline={true}
                  style={{paddingLeft:10,fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4),height:hp(15.6), width: '80%' }}
                  placeholder='Write in your custom bet'
                  placeholderTextColor={'#888888'}
                  onChangeText={(text) => { this.setState({ customBetTest: text }) }}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
            </View>


            {/* <View style={{ paddingTop: 15, width: '90%', paddingBottom: 8 }}>
              <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'black' }}> My answer is </Text>
            </View> */}

            <View style={styles.customanswere}>
              <View style={styles.customtextinput}>
                <TextInput
                   value={this.state.customBetQTest1}
                  style={{ paddingLeft:10,height:hp(8.1), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                  placeholder='My answer is...'
                  placeholderTextColor={'#888888'}
                  onChangeText={(text) => { this.setState({ customBetQTest1: text }) }}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
            </View>



            {/* <View style={{ paddingTop: 15, width: '90%', paddingBottom: 8 }}>
              <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'black' }}> Other answer is </Text>
            </View> */}

            <View style={styles.customanswere}>
              <View style={styles.customtextinput}>
                <TextInput
                  value={this.state.customBetQTest2}
                  style={{paddingLeft:10, height:hp(8.1), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                  placeholder='Other answer is...'
                  placeholderTextColor={'#888888'}
                  onChangeText={(text) => { this.setState({ customBetQTest2: text }) }}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
            </View>

            {/* <View style={{ flexDirection: 'row', width: '100%', margin: 3 }}>

                        <View style={{ width: '48%' }}>
                          <Text style={{ paddingLeft: 3, paddingBottom: 0, paddingTop: 5, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.0) }}> Odds </Text>
                          <View style={{ flexDirection: 'row', width: '100%', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3 }}>
                            <Text style={{ paddingTop: 6, paddingLeft: 3, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1), width: '50%', backgroundColor: '#fff' }}>ODDS</Text>
                            <Dropdown
                              containerStyle={{ paddingLeft: 8, borderBottomWidth: 0, justifyContent: "center", width: '50%', backgroundColor: '#fff' }}
                              dropdownOffset={{ top: 0, left: 0 }}
                              dropdownMargins={{ min: 0, max: 0 }}
                              itemTextStyle={{ paddingLeft: 8, fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: hp(1.1), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }}
                              data={data2}
                              onChangeText={(text) => { this.onChangeOdd(text) }}
                              fontSize={hp(1.1)}
                              value={''}
                            />
                          </View>
                        </View>
                        
                        <View style={{ width: '48%', marginLeft: 9, marginTop: Platform.OS === 'ios' ? 0 : 2 }}>
                          <Text style={{ padding: 4, paddingBottom: 0, paddingLeft: 3, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1) }}> Custom odd </Text>
                          <TextInput
                            value={this.state.customBetCutmOdds}
                            onFocus={this.handleFocusBA}
                            clearTextOnFocus={true}

                            style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, padding: Platform.OS === 'ios' ? 8 : 0, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: Platform.OS === 'ios' ? 1 : 0, backgroundColor: this.state.isEditable ? '#FFF' : '#DDD' }}
                            placeholder='  Custom odd...'

                            placeholderTextColor={'#888888'}
                            editable={this.state.isEditable}
                            onChangeText={(text) => { this.setState({ customBetCutmOdds: text }) }}
                          />

                        </View>
                      </View> */}
 
            <View style={{ flexDirection: 'row', width: '95%', }}>

            <View style={{ width: '48%' }}>
                          <Text style={styles.oddcustomtext}>ODDS </Text>
                          <View style={{ height:hp(8.1), flexDirection: 'row', width: '100%', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3,   }}>
                            <Text style={{ paddingTop: hp(2.1), paddingLeft: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.8), width: '40%', backgroundColor: '#eeeeee' }}>ODDS</Text>
                            <Dropdown
                              containerStyle={{ backgroundColor: '#eeeeee', paddingLeft: 8, borderBottomWidth: 0, justifyContent: "center", width: '60%'  }}
                              inputContainerStyle={{ borderBottomColor: 'transparent'}}
                              dropdownOffset={{ top: 0, left: 0 }}
                              dropdownMargins={{ min: 0, max: 0 }}
                              dropdownPosition={-4.2}
                              itemTextStyle={{  paddingLeft: 8, fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: hp(1.8), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }}
                              data={data2}
                              onChangeText={(text) => { this.onChangeOdd(text)}}
                              fontSize={hp(1.8)}
                              value={''}
                              // onFocus={Keyboard.dismiss}
                            />
                          </View>
                        </View>


             
              <View style={{ width: '49%', marginLeft: 9 }}>
                <Text style={styles.oddcustomtext}>Custom ODD </Text>
                <View style={{ width: '100%', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: 'white',height:hp(8.1) }}>
                  <TextInput
                    value={this.state.customBetCutmOdds}
                    onFocus={this.handleFocusBA}
                    // clearTextOnFocus={true}
                    style={{ paddingLeft:10, height:hp(8.1), fontFamily: 'Montserrat-Semibold', fontSize: hp(1.7), backgroundColor: this.state.isEditable ? '#eeeeee' : '#DDD' }}
                    placeholder='Custom odd...'
                    placeholderTextColor={'#888888'}
                    editable={this.state.isEditable}
                    onChangeText={(text) => { this.onchangecustombet(text) }}
                    // onChangeText={(text) => { this.setState({ customBetCutmOdds: text }) }}
                  />
                </View>
              </View>
            </View>



            <View style={{ width: '95%', paddingBottom: 8, paddingTop: 15 }}>
              <Text style={{ width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: '#888888' }}>Must respond by </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '95%', }}>
            <TouchableOpacity style={{ width: '49%' }} onPress={this.showDateTimePicker}>
              <View style={{ width: '100%',height:hp(8.1), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}>
                <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                  <Text style={styles.datetimetext}>{this.state.customBetDate ? this.state.customBetDate : 'Select Date'}</Text>
                </View>
                <View style={styles.datetimeicon}>
                  
                    <Image source={require('../../../../images/calendar.png')}
                      style={{ height: 20, width: 20, marginRight: 3 }}
                      resizeMode="contain" />
                  
                </View>
              </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '49%' }} onPress={this.showDateTimePicker1}>
              <View style={{ width: '100%',height:hp(8.1), flexDirection: 'row', marginLeft: 9, borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}>
                <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                  <Text style={styles.datetimetext}>{this.state.customBetTime ? this.state.customBetTime : 'Select Time'}</Text>
                </View>
                <View style={styles.datetimeicon}>
                  
                    {/* <Icon name="timer" size={20} color="black" style={{}} /> */}
                    <Image source={require('../../../../images/watch_icon.png')}
                      style={{ height: 20, width: 20, marginRight: 3 }}
                      resizeMode="contain" />
                  
                </View>
              </View>
              </TouchableOpacity>
            </View>


            <DateTimePicker
              // onDateChange={this.setDate}
              isVisible={this.state.isDateTimePickerVisible}
              // customConfirmButtonIOS={this.handleStartDatePicked}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={this.state.minimumDate}
              mode="date"
            />

            <DateTimePicker
              // onTimeChange={this.setDate1}
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this.handleStartDatePicked1}
              onCancel={this.hideDateTimePicker1}
              // minimumTime={this.minimumTime}
              is24Hour={true}
              mode="time"

            />


            {/* Settled by Date time */ }
          


<View style={{ width: '95%', paddingBottom: 8, paddingTop: 15,}}>
             
              <Text style={{ width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: '#888888',marginBottom:1 }}>Settle bet by </Text>
             
            </View>
            <View style={{ flexDirection: 'row', width: '95%', }}>
            <TouchableOpacity style={{ width: '49%' }} onPress={this.state.settleBetToogle?null:this.settleDateTimePicker}>
              <View style={{ width: '100%',height:hp(8.1), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}>
                <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                  <Text style={styles.datetimetext}>{this.state.settleBetDate ? this.state.settleBetDate : 'Select Date'}</Text>
                </View>
                <View style={styles.datetimeicon}>
                  
                    <Image source={require('../../../../images/calendar.png')}
                      style={{ height: 20, width: 20, marginRight: 3 }}
                      resizeMode="contain" />
                  
                </View>
              </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '49%' }} onPress={this.state.settleBetToogle?null:this.settleshowDateTimePicker1}>
              <View style={{ width: '100%',height:hp(8.1), flexDirection: 'row', marginLeft: 9, borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}>
                <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                  <Text style={styles.datetimetext}>{this.state.settleBetTime ? this.state.settleBetTime : 'Select Time'}</Text>
                </View>
                <View style={styles.datetimeicon}>                    
                    <Image source={require('../../../../images/watch_icon.png')}
                      style={{ height: 20, width: 20, marginRight: 3 }}
                      resizeMode="contain" />                  
                </View>
              </View>
              </TouchableOpacity>
            </View>


            <DateTimePicker
              // onDateChange={this.setDate}
              isVisible={this.state.settleBetDatePicker}
              // customConfirmButtonIOS={this.handleStartDatePicked}
              onConfirm={this.settlehandleStartDatePicked}
              onCancel={this.settlehideDateTimePicker}
              minimumDate={this.state.minimumDate}
              mode="date"
            />

            <DateTimePicker
              // onTimeChange={this.setDate1}
              isVisible={this.state.settleBetTimePicker}
              onConfirm={this.settlehandleStartDatePicked1}
              onCancel={this.settlehideDateTimePicker1}
              // minimumTime={this.minimumTime}
              is24Hour={true}
              mode="time"

            /> 








{/* <Animated.View style={[{ flex: 1,backgroundColor:'white' , width:'100%', paddingLeft:'2.5%'}, { transform: [{ translateY: this.state.shift }] }]}> */}

              <View style={styles.betamount}>
                {/* <View style={{ flexDirection: 'column', padding: 10 }}>
                  <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.5), color: 'black' }}>Enter bet amount</Text>
                </View> */}
                {/* <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 1, paddingBottom: 1 }}>
                  <View style={{ borderColor: '#cfcfcf', borderWidth: 1, height: 35, flexDirection: 'row', width: '90%', borderRadius: 0, shadowRadius: 3.84, backgroundColor: 'white', shadowColor: "#000", shadowOpacity: 0.25, elevation: 5, shadowOffset: { width: 0, height: 2, } }}> */}
                    <View style={{paddingLeft:5,paddingRight:5}} >
                      <Image source={require('../../../../images/buck_dark.png')} style={{ height: 10, width: 10}} />
                    </View>
                    <TextInput
                      value={this.state.betammount}
                      onChange={(e:any)=>{this.handleKeyDown(e, this.state.selectedPropBetValue, "BA", this.state.SelectedBetOption)}}
                     // onKeyPress={this.searchProducts.bind(this)}
                     // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, this.state.selectedPropBetValue, "BA", this.state.SelectedBetOption) }}
                     // onKeyPress={(e) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : null }}
                      // onKeyPress={(e: any) => { alert(e.nativeEvent.key) }}
                      //  onChange={(e:any)=>{this.handleKeyDown(e, this.state.selectedPropBetValue, "BA", this.state.SelectedBetOption)}}
                      // onChange={(e:any)=>{ alert(JSON.stringify(e.nativeEvent.key))}}
                      onFocus={this.handleFocusBA}
                      clearTextOnFocus={true}
                       keyboardType='numeric'
                      returnKeyType='done'
                      style={{height:hp(8.1), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4),width:'95%' }}
                      placeholder=' Enter Bet Amount'
                      placeholderTextColor={'#888888'}
                      // onBlur={Keyboard.dismiss}
                     editable={this.state.betenable}
                     // editable={true}
                    //  onChangeText={(text) => { this.setState({ betammount: text }) }}
                    />

                  {/* </View>
                </View> */}
              </View>
              {/* </Animated.View> */}
              <View style={{ width: '95%',marginTop:10}}>

              {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center',height:90, backgroundColor: '#009c9d', }}> */}
                {/* <View style={{ flexDirection: 'column', paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>
                  <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'white', }}>Amount to win</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 10, width: 10, marginTop: 4 }} />
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>
                      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: 'white' }}>{this.state.valueofMoneylineDialogShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                  </View>
                </View> */}
                {/* <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}> */}
                  <TouchableOpacity onPress={() => { this.CustomBetDialog('') }} style={styles.placebutton} >
                   <View>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(2.8), color: 'white' }}> PLACE BET </Text>
                    <Text style={{textAlign: 'center', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.9), color: 'black', }}>Amount to win</Text>
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'center',alignContent:'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center',paddingRight:3 }}>
                      <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 10, width: 10, marginTop: 4 }} />
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>
                      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: 'black' }}>{this.state.valueofMoneylineDialogShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                  </View>
                </View>
                  </TouchableOpacity>
                {/* </View> */}
              {/* </View> */}

  {/* </View> */}{ this.state.keypadBlock?
              <View  style={{ height:400}}></View> :null}
            </View>
           

            
          </View>
          </Animated.View>
          </ScrollView>
          </View>
        </Container>
       
    );
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

  placeBetRequestStatus: state.serviceReducer.requestStatus,
  placeBetResponse: state.serviceReducer.response as PlaceBetResponse,
  placeBetError: state.serviceReducer.error,

  betaFriendRequestStatus: state.serviceReducer.requestStatus,
  betaFriendResponse: state.serviceReducer.response as BetAFriendResponse,
  betaFriendError: state.serviceReducer.error,

  customBetaFriendRequestStatus: state.serviceReducer.requestStatus,
  customBetaFriendResponse: state.serviceReducer.response as CustomBetAFriendResponse,
  customBetaFriendError: state.serviceReducer.error,



})



export default connect(mapStateToProps)(CustomBet);
