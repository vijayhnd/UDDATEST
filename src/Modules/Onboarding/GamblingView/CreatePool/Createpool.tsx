import React from "react";
import { View, Text, TextInput, Platform, Alert, TouchableOpacity, ScrollView, AsyncStorage, Animated, UIManager, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";

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
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import ToggleSwitch from 'toggle-switch-react-native'
import { isRegExp } from "util";
import LocationResponse from '../../../../Services/Location/LocationResponse';
import AlertMessages from "../../../../Util/AlertMessages";




const ProfilePageContent = {
  key: 'somethun',
  page_title: '',
}


interface G_CreatePoolViewProps extends AppValidationComponentProps {

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

  locationRequestStatus?: ServiceRequestStatus
  locationResponse?: LocationResponse
  currentLocationError?: UDDAError
}

interface G_CreatePoolViewState extends AppValidationComponentState {

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
  bet_near_type: any;
  bet_play_type: any;
  bet_type: any;
  multiple_winners: any;
  showdate: any;
  pooltitle: any;
  poolexpiredate: any;
  poolexpiretime: any;
  dateexpire: any;
  timeexpire: any;
  settleBetDate: any;
  settleBetTime: any;
  settleBetTimePicker: any;
  settleBetDatePicker: any;
  settleBetToogle: any;










}

const bottom_initial = 0;
class CreatePool extends AppValidationComponent<G_CreatePoolViewProps, G_CreatePoolViewState>
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
      bet_near_type: false,
      bet_play_type: false,
      bet_type: false,
      multiple_winners: false,
      showdate: false,
      pooltitle: '',
      poolexpiredate:'',
      poolexpiretime:'',
      timeexpire:false,
      dateexpire:false,
      settleBetTimePicker: false,
      settleBetDatePicker: false,
      settleBetToogle: false,
      settleBetTime: '',
      settleBetDate: '',

    };
  }






  showDateTimePickerpool = () => {
    this.setState({ dateexpire: true });
  };

  hideDateTimePickerpool = () => {
    this.setState({ dateexpire: false });
  };

  setDatepool(newDate: any) {
    //this.setState({ customBetDate: newDate });
    //var formated_date = moment(newDate).format('YYYY-MM-DD');
    var formated_date = moment(newDate).format('MM-DD-YYYY');
    this.setState({ poolexpiredate: formated_date });
  }

  handleStartDatePickedpool = (date: any) => {
    var formated_date = moment(date).format('MM-DD-YYYY');
    this.setState({ poolexpiredate: formated_date });
    // this.customBetDateTime = formated_date;
    this.hideDateTimePickerpool();
  }

  showDateTimePicker1pool = () => {
    this.setState({ timeexpire: true });
  };

  hideDateTimePicker1pool = () => {
    this.setState({ timeexpire: false });
  };

  setDate1pool(newDate: any) {
    this.setState({ customBetTime: newDate });
  }

  handleStartDatePicked1pool = (date: any) => {
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
    this.setState({ poolexpiretime: string });
    //   // this.customBetDateTime = formated_date;
    this.hideDateTimePicker1pool();
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
    this.setState({ customBetQTest1: '' })
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
    // if (e.nativeEvent.key == "." || e.nativeEvent.key == "1" || e.nativeEvent.key == "2" || e.nativeEvent.key == "3" || e.nativeEvent.key == "4" || e.nativeEvent.key == "5" || e.nativeEvent.key == "6" || e.nativeEvent.key == "7" || e.nativeEvent.key == "8" || e.nativeEvent.key == "9" || e.nativeEvent.key == "0") {

    //   if (Flag == "ATW") {
    //     var ammwin = '';
    //     var ammwins;
    //     if (this.state.amounttowin.length == 0) {
    //       ammwin = this.state.amounttowin + e.nativeEvent.key;
    //       ammwins = ammwin.split(" ");
    //       this.reverceendEditing(ammwin, aValue, MFlag);
    //       this.setState({ amounttowin: ammwin });
    //     }
    //     else {
    //       ammwin = this.state.amounttowin + e.nativeEvent.key;
    //       ammwins = ammwin.split(" ");
    //       this.reverceendEditing(ammwin, aValue, MFlag);
    //       this.setState({ amounttowin: ammwin });
    //     }

    //   }
    //   else if (Flag == "BA") {
    //     var betamm = '';
    //     var betamms;
    //     if (this.state.betammount.length == 0) {
    //       betamm = this.state.betammount + e.nativeEvent.key;
    //       betamms = betamm.split(" ");
    //       this.endEditing(betamm, aValue, MFlag);
    //       this.setState({ betammount: betamm });
    //     }
    //     else {
    //       betamm = this.state.betammount + e.nativeEvent.key;
    //       betamms = betamm.split(" ");
    //       this.endEditing(betamm, aValue, MFlag);
    //       this.setState({ betammount: betamm });
    //     }
    //   }
    // }

  }

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

   // this.setState({ dialogVisible: true });
   
      var numericReg = /^(\d*[0-9]\/\d*[0-9])?$/;
      if (this.state.customBetTest == "" || this.state.betammount == "" || this.state.pooltitle == ""
      ||this.state.poolexpiredate == "" || this.state.poolexpiredate == null ||
      this.state.poolexpiretime == "" || this.state.poolexpiretime == null||
      this.state.settleBetDate == "" || this.state.settleBetDate == null ||
       this.state.settleBetTime == "" || this.state.settleBetTime == null
      ) {
        AlertUtil.show("Please enter all valid details");
      }else if (this.state.pooltitle.trim() == '') {
        AlertUtil.show("Please enter custom pool title");
      }else if (this.state.customBetTest.trim() == '') {
        AlertUtil.show("Please enter custom pool question");
      } else if (this.state.customBetQTest1.trim() == '' && this.state.customBetDate.trim() == '') {
        AlertUtil.show("Please enter My answer");
      }else if (this.state.betammount < 1000 || this.state.betammount < "1000") {
        AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
       }else {

        this.setState({ dialogVisible: true });
       }


      






        //this.setState({ selectedPropsItem: item });
       // this.setState({ dialogVisible: true });
      


    



  }
  private createAndDispatchLocationAction() {
    var serviceAction = new ServiceAction()
    this.props.dispatch!(serviceAction.request(ServiceType.Location,
      ServiceKeys.LocationServiceName,
      undefined,
      [this.constructor.name],
      undefined))

  }

  componentWillUnmount() {

    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();

  }


  componentWillMount() {
    this.createAndDispatchLocationAction()
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
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight+ fieldHeight+ fieldHeight+ fieldHeight) || 0;
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
    this.referralservice.getLocation().then((res)=>{
      this.setState({ dialogVisible: false })
     this.setState({ loader: true });

     var datetime = new Date(this.state.poolexpiredate.split('-').join('/') + ' ' + this.state.poolexpiretime).toISOString();
     var  season_expired_on = new Date(this.state.settleBetDate.split('-').join('/') + ' ' + this.state.settleBetTime).toISOString();
  
    //  'pool_expired_on': datetime
        var params: any = {
          'pool_name':this.state.pooltitle,
          'question': this.state.customBetTest,
          'my_answer_text': this.state.customBetQTest1,
          'my_answer_date': this.state.customBetDate,
          'bet_near_type':this.state.bet_near_type?2:1,
          'bet_play_type':this.state.bet_play_type?2:1,
          'bet_type':this.state.bet_type?2:1,
          'multiple_winners':this.state.multiple_winners?0:1,
          'bet_amount':this.state.betammount,
          'pool_expired_on': datetime,
          'season_expired_on': season_expired_on
        };
        console.log('ashish create pool',params)
  
        var formData = new FormData();
  
        for (var k in params) {
          formData.append(k, params[k]);
        }
    var headers: any = { authorisation: this.authorisationToken }
    if (typeof Application.sharedApplication().currentUserLocation != 'undefined') {
      headers['latitude'] = Application.sharedApplication().currentUserLocation!.latitude;
      headers['longitude'] = Application.sharedApplication().currentUserLocation!.longitude;
    }
    console.log('Headers in pool', JSON.stringify(headers));
        fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Custom_PoolGaming/custom_pool_bet_place', {
          method: 'POST',
          headers: headers,
          body: formData,
        }).then((response) => response.json())
          .then((responseJson) => {
            
            this.setState({ loader: false });
           // alert('hi')
            console.log('vreate pool response :   ' + JSON.stringify(responseJson));  
            // this.setState({ dialogVisible: true });
           // AlertUtil.show(responseJson.message);
           if (responseJson.message == 'success') {
           this.shareOption(responseJson, 'POOL');
           }
           else
           {
            AlertUtil.show(responseJson.message);
           }
           
            // if (responseJson.message == "Access Expired.") {
            //   // AlertUtil.show("Session Expired ! Please login again");
            //   console.log("Footer comp ---->" + responseJson.message);
            //   // LogoutUtill.logoutButtonPressed(this.props);
            // }
          })
          .catch(error => {
            // that.setState({ iscustomdialog: false })
            // that.setState({ loader: false });
            console.log(error);
          })
     
     }).catch((err)=>{
      AlertUtil.show(AlertMessages.LocationRequired);
     
     });
   
    

  }


  async shareOption(item: any,bettype: any) {
    console.log("shareOption bettype " + bettype);

    

    var MessageString: any;
    var ShowString: any;
    var oddsString: any;
    var teamName: any;
    var teamName2: any;
    var url: any;
    var selectedData: any;
    var referStr: any;


    var amount: any;

    if (bettype == 'POOL') {
      url = "http://bet.udda.com/index.php?t=poolbet&i=" + item.data.encryptor_bet_id;
      //url = "https://bet.udda.com/coming-soon/"

      url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
      referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up.";
      this.setState({ dateTimeValue: this.state.poolexpiredate.split('-').join('/') + ' ' + this.state.poolexpiretime });
      var new_time_stampExp = new Date(this.state.dateTimeValue).getTime();//1587290498417*1000;//new Date(this.state.dateTimeValue).getTime() * 1000;
      var formated_timeExp = moment(new_time_stampExp).format('LT');
      var batdateExp: any = moment(new_time_stampExp).format('LL');
      var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
      var zonevalueExp: any = Match_dateExp[6].toString();
      var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);
      var betTimeExpr: any = formated_timeExp + " " + zoneExp;
      var betDateExpr: any = batdateExp;
      var myBetOn = ''
      if(this.state.customBetDate)
      {
        myBetOn =this.state.customBetDate
      }
      else{
        myBetOn = this.state.customBetQTest1
      }
      try {

        var extraDetails = '\n';
        if(this.state.bet_near_type)
        {
          extraDetails +='Closest: "Yes", wins'
        }
        else 
        {
          extraDetails += 'Exact: "Yes", wins'
        }
        if(this.state.bet_play_type)
        {
         // extraDetails +="Don’t Show Pick:"
         // extraDetails += ' "Yes", '
        }
        else 
        {
          //extraDetails += 'Show Pick: "Yes", '
        }
        if(this.state.bet_type)
        {
          //extraDetails +='Private: "Yes"'
          extraDetails +='\n'
        }
        else 
        {
         // extraDetails += 'Public: "Yes"'
          extraDetails +='\nYou can invite your friends'
        }
        if(!this.state.bet_play_type)
        {
         // extraDetails+=', '
        }
        if(this.state.multiple_winners)
        {
         // extraDetails +='\n'
        }
        else 
        {
         // extraDetails += 'Multiple Winner: "Yes" \n'
        }
       // extraDetails += { !this.state.bet_near_type? 'Exact':'Closest' }

        //MessageString = 'I just bet a ' + this.state.betammount + ' UDDA Bucks that  \n"' + this.state.customBetTest + extraDetails+'My answer "' + myBetOn + '" .\nWould you like to accept the Bet? ' +'\nThe pool closes at "' + myBetOn 
        if(this.state.bet_play_type)
        {
          MessageString = 'I created a pool that "' + this.state.customBetTest+'"\nIt costs "'+ this.state.betammount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks to join, "winner take all" ' + extraDetails+'\nThe pool closes at "' + betTimeExpr + ', ' + batdateExp  +'" .\nWould you like to accept the Bet? '
        }
        else{
          MessageString = 'I created a pool that "' + this.state.customBetTest+'"\nIt costs "'+ this.state.betammount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks to join, "winner take all" ' + extraDetails+'\nThe pool closes at "' + betTimeExpr + ', ' + batdateExp  +'"\nMy answer "' + myBetOn + '" .\nWould you like to accept the Bet? '
        }
       

      }
      catch (e) {

      }
      MessageString += referStr;
    

      var ShowString1 = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet a <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.betammount}</Text>
        <Text> UDDA Bucks that{"\n"}</Text>
        <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.customBetTest}  {"\n"}</Text>

        <Text>{ !this.state.bet_near_type? 'Exact':'Closest' }: </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>Yes, </Text> 
        {/* <Text>{ !this.state.bet_play_type? 'Show Pick':"Don’t Show Pick" }: </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>Yes, </Text>  */}

        <Text>{ !this.state.bet_type? 'You can invite your friends.':null } </Text>
        {/* <Text style={{ fontFamily: 'Montserrat-Bold' }}>Yes{ !this.state.bet_play_type? ',':null } </Text> 
       
        <Text>{ !this.state.multiple_winners?'Multiple Winner:':null} </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{ !this.state.multiple_winners?'Yes \n':"\n"}</Text> 
         */}
          <Text>The pool closes at </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{myBetOn}{"\n"}</Text>  
        <Text>My answer </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{myBetOn}{"\n"}</Text>       
        Would you like to accept the Bet? {referStr} </Text>

ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
I created a pool that <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.customBetTest}{"\n"}</Text>
<Text>It costs </Text>
<Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.betammount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA </Text>
<Text>bucks to join,</Text>
<Text style={{ fontFamily: 'Montserrat-SemiBold' }}> winner take all, </Text>

<Text>{ !this.state.bet_near_type? 'Exact ':'Closest ' }</Text>
<Text style={{ fontFamily: 'Montserrat-Bold' }}>Yes, </Text> 
{/* <Text>{ !this.state.bet_play_type? 'Show Pick':"Don’t Show Pick" }: </Text>
<Text style={{ fontFamily: 'Montserrat-Bold' }}>Yes, </Text>  */}

<Text>{ !this.state.bet_type? 'You can invite your friends.':null }{"\n"}</Text>
{/* <Text style={{ fontFamily: 'Montserrat-Bold' }}>Yes{ !this.state.bet_play_type? ',':null } </Text>  */}

{/* <Text>{ !this.state.multiple_winners?'Multiple Winner:':null} </Text> */}
{/* <Text style={{ fontFamily: 'Montserrat-Bold' }}>{ !this.state.multiple_winners?'Yes \n':"\n"}</Text>  */}
<Text>The pool closes at </Text>
        <Text style={{ fontFamily: 'Montserrat-Bold' }}>{betTimeExpr + ', ' + batdateExp }{"\n"}</Text>  
{!this.state.bet_play_type ?<Text>My answer </Text>:null}
{!this.state.bet_play_type ?<Text style={{ fontFamily: 'Montserrat-Bold' }}>{myBetOn}{"\n"}</Text>   :null}    
Would you like to accept the Bet? {referStr} </Text>

      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });

      this.setState({ MessageUrl: url });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
      this.setState({ customBetTest: '' });
      this.setState({ pooltitle: '' });
      this.setState({ customBetQTest1: '' });
      this.setState({ betammount: '' });
      this.setState({ poolexpiredate: '' });
      this.setState({ poolexpiretime: '' });
      this.setState({ customBetDate: '' });
      this.setState({ multiple_winners: false });
      this.setState({ bet_play_type: false });
      this.setState({ bet_type: false });
      this.setState({ bet_near_type: false });
      this.setState({ settleBetDate: '' });
      this.setState({ settleBetTime: '' });



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
          // shared with activity type of result.activityType
        } else {
          this.setState({ shareDialog: false });
          console.log('shared');
          RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        this.setState({ shareDialog: false });
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
        console.log('share  in dismiss');
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

  componentWillReceiveProps(nextProps: G_CreatePoolViewProps) {
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

      }else if (nextProps.serviceKey === ServiceKeys.LocationServiceName) {
        switch (nextProps.locationRequestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            // this.locationAgreement = true
            Application.sharedApplication().currentUserLocation = nextProps.locationResponse!.location
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.FinishedWithError:

            try {
              // if (!Application.sharedApplication().currentUserLocation.latitude) {
              //   AlertUtil.showSingleActionMessage(AlertMessages.LocationRequired, function () { Linking.openURL('app-settings:') })
              //   this.locationAgreement = false
              // }

            }
            catch (e) {

            }
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            // this.locationAgreement = false
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
              if (this.state.checkedBetText == 'P2') {
                this.setState({ BetType: 'CUSTOM' });
                this.setState({ POSTBetAmount: bet_amount });

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
  onchangeanswere(text:any){
    this.setState({customBetQTest1:text})
    if(text.trim()=='')
    {
      this.setState({showdate:false})
    }else{
      this.setState({showdate:true})
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
    // this.props.navigation!.navigate(AppScreens.G_UddaContests);
    RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
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
  render() {
    let data2 = [{
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
    },
    {
      value: 'CUSTOM'
    }
    ];


    return (

      
        <Container 
          title={'CREATE POOL'}
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
          {/* <View style={styles.customhead}>
              <Icons name="arrow-back" size={30} color="white" style={{ marginTop: 2 }}
                onPress={() => this.props.navigation?.goBack(null)}
              />
               <View style={{ alignContent: 'center', alignItems: 'center', paddingRight: wp(35) }}>
                <Text style={styles.customheadtext}>CREATE POOL</Text>
              </View>
            </View> */}
            

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
                <Text style={{ fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: wp(4), color: '#222' }}>
                  Are you sure you want to place this bet?
</Text>
                <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                  listener={() => {
                   
                      this.props_place_bet_API(this.state.selectedPropsItem, this.state.selectedPropBetOptions);
                   
                   
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

                  <Text style={{ padding: 1, fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.7), marginTop: 3, color: '#222' }}>Message</Text>

                  <View style={{ padding: 1, borderColor: '#cccccc', borderWidth: 1, marginTop: 5, }}>
                    <TextInput
                      multiline={true}

                      onChangeText={value => this.onChangeShareMsg(value)}
                      editable={true} style={{ padding: 8, width: '100%', height: 'auto',fontFamily: 'Montserrat-Regular',fontSize: hp(1.5) }}>{this.state.Share_Show_Msg}</TextInput>
                  </View>
                  <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.5), marginTop: 5, color: '#222' }}>
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
          <ScrollView >
        <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>
          <View style={styles.maincontainercustom}>

          <View style={[styles.customhead,{backgroundColor:'white'}]}> 
          <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'35%' }}>             
              <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 5,marginTop:5 }}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>
              <View style={{ alignContent: 'flex-start', alignItems: 'flex-start', width:'65%' }}>
                <Text style={[styles.customheadtext,{color:'#68bcbc'}]}>CREATE POOL</Text>
              </View>
             
              
             
           </View>
          {/* <View style={styles.customquestion}> */}
          <View style={[styles.customtextinput]}>
                <TextInput
                  value={this.state.pooltitle}
                  // numberOfLines={10}  
                 // multiline={true}
                  style={{paddingLeft:10,fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4),height:hp(6), width: '80%' }}
                  placeholder='Enter Pool Title'
                  placeholderTextColor={'#c3c3c3'}
                  onChangeText={(text) => { this.setState({ pooltitle: text }) }}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
              <View style={[styles.customtextinput]}>
                <TextInput
                  value={this.state.customBetTest}
                  // numberOfLines={10}  
                  multiline={true}
                  style={{paddingLeft:10,fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4),height:hp(10), width: '80%' }}
                  placeholder='Write in your custom pool'
                  placeholderTextColor={'#c3c3c3'}
                  onChangeText={(text) => { this.setState({ customBetTest: text }) }}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
            {/* </View> */}
            <View style={{ paddingTop: 5, width: '95%' }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: '#888888' }}> My Answer</Text>
            </View>

            <View style={styles.customtextinput}>
            <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.state.showdate ? null:this.showDateTimePicker()}}>
              <View style={{ width: '100%',height:hp(6), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}>
                <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                  <Text style={[styles.datetimetext,{color: this.state.customBetDate ?'#222':'c3c3c3'}]}>{this.state.customBetDate ? this.state.customBetDate : 'Choose Date'}</Text>
                </View>
                <View style={styles.datetimeicon}>                  
                   
                    {this.state.customBetDate? <Icon name="close" size={15} color="#222" onPress={()=>{this.setState({customBetDate:''})}} style={{padding:8,paddingLeft:15}}/>    : <Image source={require('../../../../images/calendar.png')}
                      style={{ height: 20, width: 20, marginRight: 8 }}
                      resizeMode="contain" />}  
                  
                </View>
              </View>
              </TouchableOpacity>
              </View>
              <View style={{flex:1,  paddingTop: 10, width: '95%', paddingBottom: 5 }}>
                  <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: '#c3c3c3',textAlign:'center' }}> ────────  OR  ────────</Text>
              </View>

              <View style={styles.customtextinput}>
                <TextInput
                   value={this.state.customBetQTest1}
                  // clearTextOnFocus={true}
                  style={{ paddingLeft:10,height:hp(6), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                  placeholder='My answer is...'
                  placeholderTextColor={'#c3c3c3'}
                  onChangeText={(text) => { this.onchangeanswere(text) }}
                  editable={this.state.customBetDate?false:true}
                  // onBlur={Keyboard.dismiss}
                />
              </View>



              <View style={{ width: '95%', paddingBottom: 8, paddingTop: 15 }}>
              <Text style={{ width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: '#888888' }}>Must respond by </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '95%', }}>
            <TouchableOpacity style={{ width: '49%' }} onPress={this.showDateTimePickerpool}>
              <View style={{ width: '100%',height:hp(6), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}>
                <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                  <Text style={styles.datetimetext}>{this.state.poolexpiredate ? this.state.poolexpiredate : 'Select Date'}</Text>
                </View>
                <View style={styles.datetimeicon}>
                  
                    <Image source={require('../../../../images/calendar.png')}
                      style={{ height: 20, width: 20, marginRight: 3 }}
                      resizeMode="contain" />
                  
                </View>
              </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '49%' }} onPress={this.showDateTimePicker1pool}>
              <View style={{ width: '100%',height:hp(6), flexDirection: 'row', marginLeft: 9, borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}>
                <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                  <Text style={styles.datetimetext}>{this.state.poolexpiretime ? this.state.poolexpiretime : 'Select Time'}</Text>
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
              isVisible={this.state.dateexpire}
              // customConfirmButtonIOS={this.handleStartDatePicked}
              onConfirm={this.handleStartDatePickedpool}
              onCancel={this.hideDateTimePickerpool}
              minimumDate={this.state.minimumDate}
              mode="date"
            />

            <DateTimePicker
              // onTimeChange={this.setDate1}
              isVisible={this.state.timeexpire}
              onConfirm={this.handleStartDatePicked1pool}
              onCancel={this.hideDateTimePicker1pool}
              // minimumTime={this.minimumTime}
              is24Hour={true}
              mode="time"

            />
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


              <View style={styles.poolborder}/>

              <View style={styles.toggleButton}>
                  <View style={{width:'40%',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}>
                  <Text style={[styles.toggleText,{color:this.state.bet_near_type!=true?"#009c9d":'#c3c3c3',}] }>Exact&nbsp;</Text>
                  </View>

              <ToggleSwitch
                isOn={this.state.bet_near_type}
                onColor="#69bbbb"
                offColor="#69bbbb"
              //  label="Example label"
                labelStyle={{ color: "#222",  fontFamily: 'Montserrat-Bold', fontSize: hp(2.1) }}
                size="small"
                onToggle={isOn =>this.setState({bet_near_type:isOn})}
                />
              <View style={{width:'40%'}}>
              <Text style={[styles.toggleText,{color:this.state.bet_near_type?"#009c9d":'#c3c3c3',}] }>&nbsp;Closest</Text>
              </View>
              </View>

              <View style={styles.toggleButton}>
                  <View style={{width:'40%',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}>
                  <Text style={[styles.toggleText,{color:this.state.bet_play_type!=true?"#009c9d":'#c3c3c3',}] }>Show Pick&nbsp;</Text>
                  </View>

              <ToggleSwitch
                isOn={this.state.bet_play_type}
                onColor="#69bbbb"
                offColor="#69bbbb"
              //  label="Example label"
                labelStyle={{ color: "#222",  fontFamily: 'Montserrat-Bold', fontSize: hp(2.1) }}
                size="small"
                onToggle={isOn =>{this.setState({bet_play_type:isOn})}}
                />
              <View style={{width:'40%'}}>
              <Text style={[styles.toggleText,{color:this.state.bet_play_type?"#009c9d":'#c3c3c3',}] }>&nbsp;Don’t Show Pick</Text>
              </View>
              </View>

              <View style={styles.toggleButton}>
                  <View style={{width:'40%',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end',flexDirection:'row'}}>
                  <TouchableOpacity onPress={() => { AlertUtil.show('Invitees can invite friends') }} >
                  <Text style={[styles.toggleText,{color:this.state.bet_type!=true?"#009c9d":'#c3c3c3',}] }>Public</Text>
                  </TouchableOpacity>
                  <View style={[styles.table_title_info_container,{marginBottom:5,marginRight:10}]}>
                  <TouchableOpacity onPress={() => { AlertUtil.show('Invitees can invite friends') }} >
                      <Text style={styles.table_title_info_text}> i </Text>
                      </TouchableOpacity>
                    </View>
                    
                  </View>

              <ToggleSwitch
                isOn={this.state.bet_type}
                onColor="#69bbbb"
                offColor="#69bbbb"
              //  label="Example label"
                labelStyle={{ color: "#222",  fontFamily: 'Montserrat-Bold', fontSize: hp(2.1) }}
                size="small"
                onToggle={isOn =>this.setState({bet_type:isOn})}
                />
              <View style={{width:'40%',flexDirection:'row'}}>
              <TouchableOpacity onPress={() => { AlertUtil.show('Only Creator can invite') }} >
              <Text style={[styles.toggleText,{color:this.state.bet_type?"#009c9d":'#c3c3c3',}] }>&nbsp;Private</Text>
             </TouchableOpacity>
              <View style={[styles.table_title_info_container,{marginTop:5}]}>
              <TouchableOpacity onPress={() => { AlertUtil.show('Only Creator can invite') }} >
                      <Text style={styles.table_title_info_text}> i </Text>
                      </TouchableOpacity>
                    </View>
                    
              </View>
              </View>

             <View style={{flexDirection:'row',marginTop:10,width:'95%',alignContent:'center',alignItems:'center'}}>
                <View style={{width:'46%'}}>
              <Text style={{ color:this.state.multiple_winners? "#4b4b4b":'#4b4b4b',  fontFamily: 'Montserrat-Bold', fontSize: hp(2.1) }}>Multiple Winner</Text>
              </View>
              <ToggleSwitch
                isOn={this.state.multiple_winners}
                onColor="#c3c3c3"
                offColor="#69bbbb"
              //  label="Example label"
                labelStyle={{ color: "#222",  fontFamily: 'Montserrat-Bold', fontSize: hp(2.1) }}
                size="small"
                onToggle={isOn =>this.setState({multiple_winners:isOn})}
             
               // disabled={true}
                />
              </View>

              <View style={styles.poolborder}/>
              <View style={[styles.betamount,{height:hp(6)}]}>
                    <View style={{paddingLeft:5,paddingRight:5}} >
                      <Image source={require('../../../../images/BucksDark.png')} style={{ height: 10, width: 10}} />
                    </View>
                    <TextInput
                      value={this.state.betammount}
                      onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, this.state.selectedPropBetValue, "BA", this.state.SelectedBetOption) }}
                      onFocus={this.handleFocusBA}
                      clearTextOnFocus={true}
                      keyboardType='numeric'
                      returnKeyType='done'
                      style={{height:hp(6), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4),width:'95%' }}
                      placeholder=' Enter Bet Amount'
                      placeholderTextColor={'#c3c3c3'}
                      onBlur={Keyboard.dismiss}
                      //editable={this.state.betenable}
                      onChangeText={(text) => { this.setState({ betammount: text }) }}
                    />
              </View>
              <View style={{ width: '95%',marginTop:10,marginBottom:10,borderRadius: 3}}>
                  <TouchableOpacity onPress={() => { this.CustomBetDialog('') }} style={[styles.placebutton,{height:hp(8)}]} >
                   <View>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(3.8), color: 'white' }}> CREATE POOL </Text>
                    {/* <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(3.8), color: 'white' }}> PLACE BET </Text> */}
                    {/* <Text style={{textAlign: 'center', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.9), color: 'black', }}>Amount to win</Text>
                    <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'center',alignContent:'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center',paddingRight:3 }}>
                      <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 10, width: 10, marginTop: 4 }} />
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>
                      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: 'black' }}>{this.state.valueofMoneylineDialogShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                  </View> */}
                </View>
                  </TouchableOpacity>
            </View>
          </View>
          </Animated.View>
          </ScrollView>
          <ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />
          <DateTimePicker
              // onDateChange={this.setDate}
              isVisible={this.state.isDateTimePickerVisible}
              // customConfirmButtonIOS={this.handleStartDatePicked}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={this.state.minimumDate}
              mode="date"
            />
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



  locationResponse: state.serviceReducer.response,
  currentLocationError: state.serviceReducer.error,
  locationRequestStatus: state.serviceReducer.requestStatus,



})



export default connect(mapStateToProps)(CreatePool);
