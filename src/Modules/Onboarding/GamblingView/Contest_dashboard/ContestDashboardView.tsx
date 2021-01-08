import React from "react";
import { View, Text, FlatList, TextInput, Alert, Animated, UIManager, TouchableOpacity, ScrollView, AsyncStorage, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView,ImageBackground } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import AlertUtil from "../../../../Util/AlertUtil";
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
import FeedbackRequest from "../../../../Services/Feedback/FeedbackRequest";
import FeedbackResponseParser from "../../../../Services/Feedback/FeedbackResponseParser";
import FeedbackResponse from "../../../../Services/Feedback/FeedbackResponse";
import PlaceBetRequest from "../../../../Services/Bets/PlaceBetRequest";
import PlaceBetResponseParser from "../../../../Services/Bets/PlaceBetResponseParser";
import PlaceBetResponse from "../../../../Services/Bets/PlaceBetResponse";
import BetAFriendRequest from "../../../../Services/Bets/BetAFriendRequest";
import BetAFriendResponseParser from "../../../../Services/Bets/BetAFriendResponseParser";
import BetAFriendResponse from "../../../../Services/Bets/BetAFriendResponse";
import moment from 'moment';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from "../../../../Services/Core/ServiceURI"
import Messgae from "../../../../Services/Core/Messages"
import ReferralService from "../../../../Services/Referral/ReferralService";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RNLocalize from "react-native-localize";
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";
import LinearGradient from 'react-native-linear-gradient';
import DetailComponent from "../../../../Components/CustomComponents/Free2Play/Freetoplaydetail";
import Icons from 'react-native-vector-icons/MaterialIcons';
const CleverTap = require('clevertap-react-native');
var update = require('immutability-helper');
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
  key: 'somethun',
  page_title: '',
}

const deviceTimeZone = RNLocalize.getTimeZone();

interface G_ContestDashboardViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus
  getProfileResponse?: GetProfileResponse
  getProfileError?: UDDAError
  feedbackRequestStatus?: ServiceRequestStatus
  feedbackResponse?: FeedbackResponse
  feedbackError?: UDDAError

  placeBetRequestStatus?: ServiceRequestStatus
  placeBetResponse?: PlaceBetResponse
  placeBetError?: UDDAError

  betaFriendRequestStatus?: ServiceRequestStatus
  betaFriendResponse?: BetAFriendResponse
  betaFriendError?: UDDAError

  serviceKey?: string
  listeners?: any
}

interface G_ContestDashboardViewState extends AppValidationComponentState {
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
  FeedbackSubject: any;
  FeedbackMsg: any;
  FeedbackDialogue: any;
  thanksDialog: any;
  pastWeekTitle: any;
  currentWeekTitle: any;
  upcomingGameTitle: any;

  contest_id: any;
  RegisterDate: any;
  ChallengeName: any;
  EndDate: any;


  MatchEventDialog: any;
  from_private_contest: any;
  ContestType: any;
  Feedbackphoto: any;

  MinBetAmount: any;
  Share_Show_Msg: any;
  PropselctedFlag: any;
  shift: any;
  MaxBetAmount: any;

  //ashish
  DatatwoList: any;
  showView: any;
  startPage: any;
  POSTWinAmount:any;
  contestdetail:any;
  contestdetailid:any;
  contestid:any;
  contesttype:any;
  contestdata:any;
  eventindex:any;
  version_number:any;

}


const bottom_initial = 0;
class ContestDashboardView extends AppValidationComponent<G_ContestDashboardViewProps, G_ContestDashboardViewState>
  implements MenuIconListener, ISubheaderListener, FooterListner {
  private keyboardDidShowListener: any
  private keyboardDidHideListener: any
  private serviceRequestInProgress = false
  private DataTable: any
  private Answer: any
  private NewAnswer: any
  private AnswerShow: any
  private NewAnswerShow: any
  private New: any
  private NewShow: any
  private noqueData: any
  public bannerError = 'Under Construction';
  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  public ListView_Ref: any;
  private photoFieldName = 'Photo';
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  public leaugeArrayData:any;
  public currentdate = moment(new Date).format('YYYY-MM-DD');
  private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
  private referralservice = new ReferralService();
  public selectedItemData: any;
  focusListener: any;
  isfontSize: any;
  isMainBlockHeight: any;
  blockHeight: any;
  drawblockHeight: any;
  isPlaceBet: any= true;
  constructor(props: any) {
    super(props);
    this.state = {
      contentInsetBottom: bottom_initial,
      showOverlayGameSelectionFlag: false,
      DataList: [],
      checkedBetPrivate: false,
      checkedBetPublic: true,
      checkedBetPP: true,
      checkedBetText: 'P1',
      checkedMoneyLinePrivate: false,
      checkedMoneyLinePublic: true,
      betammount: '',
      amounttowin: '',
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
      appState: AppState.currentState,

      isBetaFriendSelect: false,
      selecteValue: '0',
      BetDialogueData: [],
      BetDialogueNoData: '',
      BetDialogQue: [],
      Bet_Question_array: [],
      moredialogclick: 'f',
      SelectedBetOption: '',
      NoData: '',

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

      FeedbackSubject: '',
      FeedbackMsg: '',
      FeedbackDialogue: false,
      thanksDialog: false,

      shift: new Animated.Value(0),
      pastWeekTitle: 'PAST RESULTS',
      currentWeekTitle: 'WEEK 1',
      upcomingGameTitle: 'UPCOMING GAMES',


      contest_id: '',
      RegisterDate: '',
      ChallengeName: '',
      EndDate: '',

      MatchEventDialog: false,
      from_private_contest: '',
      ContestType: '',
      Feedbackphoto: { name: this.photoFieldName, value: '' },

      MinBetAmount: '',
      Share_Show_Msg: '',
      PropselctedFlag: '',
      MaxBetAmount: '',

      //ashish

      DatatwoList: [],
      showView: true,
      startPage: 1,
      POSTWinAmount:'',
      contestdetail:false,
      contestdetailid:'',
      contestid:'',
      contesttype:'',
      contestdata:{},
      eventindex:'',
      version_number:'',
    };
  }


  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);

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
  async componentDidMount() {
    console.log('deviceTimeZone',deviceTimeZone);
    // console.log('contestid',this.props.navigation.state.params.params.contestid);
    // console.log('contesttype',this.props.navigation.state.params.params.contesttype);
    // this.setState({contestid:this.props.navigation.state.params.params.contestid})
    // this.setState({contesttype:this.props.navigation.state.params.params.contesttype})
    // if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
    //   this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
    // }
    // else {
    AppState.addEventListener('change', this._handleAppStateChange);
    // }

    var isFontsize: any;
    this.focusListener = this.props.navigation.addListener('willFocus', async () => {

      if (this.props.navigation.state.params) {
        if (typeof this.props.navigation?.state.params.setting != undefined && this.props.navigation?.state.params.setting) {
          isFontsize = await AsyncStorage.getItem('isfontSize');
          this.isfontSize = (isFontsize == '1.4') ? 'font_small' : ((isFontsize == '1.8') ? 'font_medium' : 'font_large');
          this.isMainBlockHeight = (isFontsize == '1.4') ? 'mainblockheight_small' : ((isFontsize == '1.8') ? 'mainblockheight_medium' : 'mainblockheight_large');
          this.blockHeight = (isFontsize == '1.4') ? 'blockheight_small' : ((isFontsize == '1.8') ? 'blockheight_medium' : 'blockheight_large');
          this.drawblockHeight = (isFontsize == '1.4') ? 'drawblockheight_small' : ((isFontsize == '1.8') ? 'drawblockheight_medium' : 'drawblockheight_large');
          //alert('in if ' + this.isfontSize + ' is main block height  ' + this.isMainBlockHeight + '  block height ' + this.blockHeight);
          this.loadMore(true);
          console.log('did foucs tt');

        }
      } else {
        //alert(111);
        isFontsize = await AsyncStorage.getItem('isfontSize');
        this.isfontSize = (isFontsize == '1.4') ? 'font_small' : ((isFontsize == '1.8') ? 'font_medium' : 'font_large');
        this.isMainBlockHeight = (isFontsize == '1.4') ? 'mainblockheight_small' : ((isFontsize == '1.8') ? 'mainblockheight_medium' : 'mainblockheight_large');
        this.blockHeight = (isFontsize == '1.4') ? 'blockheight_small' : ((isFontsize == '1.8') ? 'blockheight_medium' : 'blockheight_large');
        this.drawblockHeight = (isFontsize == '1.4') ? 'drawblockheight_small' : ((isFontsize == '1.8') ? 'drawblockheight_medium' : 'drawblockheight_large');
       // alert('in else ' + this.isfontSize + ' is main block height  ' + this.isMainBlockHeight + '  block height ' + this.blockHeight);
      }

    });

    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation!.replace(AppScreens.G_DashboardView));
    // BackHandler.addEventListener('hardwareBackPress', ()=> this.props.navigation!.goBack(null) );


    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => { this.setState({ keyboardOpen: true }) }

    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => { this.setState({ keyboardOpen: false }) }
    );
    this.callMethod(1);
    this.getProfile();
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
    this.focusListener.remove();

  }



  handleBackButton() {
    Alert.alert(
      'Exit App',
      'Are You Sure You Want to Exit the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }

  _handleAppStateChange = (nextAppState: any) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
        if (Application.sharedApplication().DeeplinkName == 'index.php?propsbet/') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'index.php?contestbet/') {
          this.props.navigation!.navigate(AppScreens.G_InvitationToJoin);
        }
        else if (Application.sharedApplication().DeeplinkName == 'index.php?oddsbet/') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'index.php?propsbet/private') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'index.php?propsbet/public') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'index.php?oddsbet/private') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'index.php?oddsbet/public') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }

      }
      else {
      }
    }

    this.setState({ appState: nextAppState });
  };



  //garima update share option message
  onChangeShareMsg(val: any) {
    this.setState({ MessageString: val });
  }


  //  ---------------------------------------------- API CALLING --------------------------------------------

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
  async setLeaugedata() 
  {
    this.leaugeArrayData = JSON.parse(await AsyncStorage.getItem('leagueArrayData'));
   // alert(this.leaugeArrayData);
  }

  cleverTapWithParam(eventName,param)
{
  console.log('alert>>>'+eventName+'>>'+JSON.stringify(param))
  try{

    CleverTap.recordEvent(eventName,param);
    CleverTap.recordEvent('AvailableUddaBucks',{'UDDABucks':Application.sharedApplication().user!.profile.chip_balance!})
    
    }
  catch(e)
  {
    console.log(e);
  }
 
}

  callMethod(count: any) {
this.setLeaugedata();
    var numberofRows = Application.sharedApplication().user!.profile.dashboard_number_of_matches!;
    this.setState({ loader: true });
    this.setState({ showView: true });
    console.log('numberofRows ashish :', numberofRows)
    if (count == 1) {
      console.log('count if :', count)
      this.setState({ DataList: [] })
    } else {
      console.log('count else :', count)
    }
    var contest_id;
    var league_id;
    var private_contest_id;
    var from_private_contest: any;
    AsyncStorage.multiGet(['league_id', 'contest_id', 'private_contest_id', 'from_private_contest','contest_type','contest_version']).then((data) => {
      console.log('contestid',data[1][1]);
    console.log('contesttype',data[4][1]);
    this.setState({contestid:data[1][1]})
    this.setState({contesttype:data[4][1]})
    this.setState({version_number:data[5][1]})
      league_id = data[0][1];
      contest_id = data[1][1];
      private_contest_id = data[2][1];
      from_private_contest = data[3][1];
      this.setState({ from_private_contest: from_private_contest });
      if (numberofRows == 'All') {
        if (from_private_contest == "1") {
          var params: any = {
            'league_id': data[0][1],
            'contest_id': data[1][1],
            'private_contest_id': data[2][1],
            'start': '',
            'per_page': '',
            'timezone': deviceTimeZone,
            'contest_type': data[4][1] == 'free_to_play_contest'?'free_to_play':''
          };
        } else {
          var params: any = {
            'league_id': data[0][1],
            'contest_id': data[1][1],
            'start': '',
            'per_page': '',
            'timezone': deviceTimeZone,
            'contest_type': data[4][1] == 'free_to_play_contest'?'free_to_play':''
          };
        }
      } else {
        if (from_private_contest == "1") {
          var params: any = {
            'league_id': data[0][1],
            'contest_id': data[1][1],
            'private_contest_id': data[2][1],
            'start': count,
            'per_page': numberofRows,
            'timezone': deviceTimeZone,
            'contest_type': data[4][1] == 'free_to_play_contest'?'free_to_play':''
          };
        } else {
          var params: any = {
            'league_id': data[0][1],
            'contest_id': data[1][1],
            'start': count,
            'per_page': numberofRows,
            'timezone': deviceTimeZone,
            'contest_type': data[4][1] == 'free_to_play_contest'?'free_to_play':''
          };
        }
      }

      console.log('contest_dashboard input' + JSON.stringify(params));

      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }


      fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/contest_dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorisation': this.authorisationToken
        },
        body: formData,

      }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({ loader: false });
          console.log('Contest Dashboard Data ' + JSON.stringify(responseJson));
          if (responseJson.error == 0) {

            this.setState({ contest_id: data[1][1] });
            this.setState({ contestdata: responseJson.data });
            this.setState({ ChallengeName: responseJson.data.ChallengeName });

            var new_ContestStartTimestamp = responseJson.data.RegisterDate_timestamp * 1000;
            var new_ContestStartDate = moment(new_ContestStartTimestamp).format('YY-MM-DD');

            console.log("RegisterDate " + JSON.stringify(new_ContestStartDate));

            var new_ContestEndTimestamp = responseJson.data.EndDate_timestamp * 1000;
            var new_ContestEndDate = moment(new_ContestEndTimestamp).format('YY-MM-DD');

            console.log("EndDate " + JSON.stringify(new_ContestEndDate));
            //garima
            // var newStartDate = new_ContestStartDate.split('-');
            var newStartDate = responseJson.data.RegisterDate.split('-');
            // var newEndDate = new_ContestEndDate.split('-');
            var newEndDate = responseJson.data.EndDate.split('-');
            var new_Start_Date = '';
            var new_End_Date = '';
            if (newStartDate[0] == newEndDate[0]) {
              new_Start_Date = newStartDate[1] + "/" + newStartDate[2];
              new_End_Date = newEndDate[1] + "/" + newEndDate[2] + "/" + newEndDate[0];
            }

            else {
              new_Start_Date = newStartDate[1] + "/" + newStartDate[2] + newStartDate[0];
              new_End_Date = newEndDate[1] + "/" + newEndDate[2] + "/" + newEndDate[0];
            }
            this.setState({ RegisterDate: new_Start_Date });
            this.setState({ EndDate: new_End_Date });
            this.setState({ ContestType: responseJson.data.ContestType });
            this.setState({ MinBetAmount: parseInt(responseJson.data.min_bet_amount) });
            this.setState({ MaxBetAmount: (responseJson.data.max_bet_amount != "") ? parseInt(responseJson.data.max_bet_amount) : responseJson.data.max_bet_amount });

            this.setState({ selected_Legue_id: data[0][1] });
            // this.setState({
            //   DataList: responseJson.data.contest_events.map((x: any) => ({
            //     event_id: x.event_id,
            //     league_id: x.league_id,
            //     gameState_id: x.gameState_id,
            //     gameState: x.gameState,
            //     event_date_time: x.event_date_time,
            //     games: x.games,
            //     score_time: x.score_time,
            //     quarter: x.quarter,
            //     odds: x.odds,
            //     day: x.day.split(' '),
            //     time: x.time,
            //     match_time_stamp: x.match_time_stamp,
            //     isMoneyLineSelect1: false,
            //     isMoneyLineSelect2: false,
            //     isTotalSelect1: false,
            //     isTotalSelect2: false,
            //     isSpreadSelect1: false,
            //     isSpreadSelect2: false,
            //     isBetaFriendSelect: false,
            //     MasterCalcFlag: 'D',
            //   }))
            // });

            this.setState({
              DatatwoList: responseJson.data.contest_events.map((x: any) => ({
                event_id: x.event_id,
                league_id: x.league_id,
                gameState_id: x.gameState_id,
                gameState: x.gameState,
                event_date_time: x.event_date_time,
                games: x.games,
                score_time: x.score_time,
                quarter: x.quarter,
                odds: x.odds,
                private_odds:x.private_odds,
                day: x.day.split(' '),
                time: x.time,
                match_time_stamp: x.match_time_stamp,
                isMoneyLineSelect1: false,
                isMoneyLineSelect2: false,
                isTotalSelect1: false,
                isTotalSelect2: false,
                isSpreadSelect1: false,
                isSpreadSelect2: false,
                isBetaFriendSelect: false,
                MasterCalcFlag: 'D',
                isMoneyLineDraw: false,
                sport_league_name:x.sport_league_name
              }))
            });

            const interest = [...this.state.DataList, ...this.state.DatatwoList];
            this.setState({ DataList: interest })
            if (numberofRows == 'All') {
              this.setState({ showView: false })
            } else {
              if (this.state.DatatwoList.length < numberofRows) {
                console.log('ashish data sowview false')
                this.setState({ showView: false })
              } else {
                console.log('ashish data sowview true')
                this.setState({ showView: true })
              }
            }
            console.log('ashish data list length : ', this.state.DataList.length)
            if (responseJson.data.contest_events.length == 0) {
              this.setState({ showView: false });
            } else {

            }

            this.setState({ NoData: false });
          }
          else {
            // this.setState({ DataList: [] });
            if (this.state.DataList.length == 0) {
              this.setState({ NoData: true });
            } else {
              this.setState({ showView: false });
            }
          }
          if (responseJson.message == "Access Expired.") {
            // AlertUtil.show("Session Expired ! Please login again");
            console.log("Footer comp ---->" + responseJson.message);
            LogoutUtill.logoutButtonPressed(this.props);
          }
        })
        .catch(error => {
          this.setState({ DataList: [] });
          this.setState({ loader: false });
          console.log("in catch " + error);
        })
    });
  }


  callBetAFriendAPI(selectedArray: any) {
    this.setState({loader:true})
    var that = this;
    setTimeout(function(){that.setState({loader:false})},400)
    // if(this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='N')
    // {
    // this.DialogClose(this.state.selectedItem, this.state.eventindex)
    // }else{
    //   console.log('hhh')
    // }

   
    this.setState({ dialogVisible: false })
    console.log('selected array ' + JSON.stringify(selectedArray));

    if( this.state.contesttype=='free_to_play_contest' && this.state.contestdata.bankroll=='N')
    {

     // return;
    }
    else if (this.state.amounttowin != '' || this.state.betammount != ''){
    
      // AlertUtil.show('Not entered any amount,please try agian');
      // return;

    }
    // if (this.state.amounttowin != '' || this.state.betammount != '') {
      var bet_odds_type;
      var bet_team_type;
      var bet_type: any;
      var bet_amount: any;
      var amount_to_win;
      var bet_team_id;
      var wining_rate_favored;
      var wining_rate_underdog;
      var contest_type;

      if (selectedArray.MasterCalcFlag == "M" || selectedArray.MasterCalcFlag == "D") {
        bet_odds_type = 1;
      }
      else if (selectedArray.MasterCalcFlag == "T") {
        bet_odds_type = 2;
      }
      else if (selectedArray.MasterCalcFlag == "S") {
        bet_odds_type = 3;
      }

      if (selectedArray.isMoneyLineSelect1 == true || selectedArray.isTotalSelect1 == true || selectedArray.isSpreadSelect1 == true) {

        bet_team_id = selectedArray.games.MATCH_UPS.away.team_id;

      }
      else if (selectedArray.isMoneyLineSelect2 == true || selectedArray.isTotalSelect2 == true || selectedArray.isSpreadSelect2 == true) {

        bet_team_id = selectedArray.games.MATCH_UPS.home.team_id;

      } else if (selectedArray.isMoneyLineDraw == true) {
        bet_team_id = '';
      }


      if (selectedArray.isMoneyLineSelect1 == true) {
        var posneg = Math.sign(selectedArray.games.MONEY_LINE.away.value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        }

        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.games.MONEY_LINE.away.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.games.MONEY_LINE.away.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.games.MONEY_LINE.away.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.games.MONEY_LINE.away.value) / 100);
        }

      }
      else if (selectedArray.isMoneyLineSelect2 == true) {
        var posneg = Math.sign(selectedArray.games.MONEY_LINE.home.value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        }
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.games.MONEY_LINE.home.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.games.MONEY_LINE.home.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.games.MONEY_LINE.home.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.games.MONEY_LINE.home.value) / 100);
        }

      }
      else if (selectedArray.isTotalSelect1 == true) {
        var posneg = Math.sign(selectedArray.games.TOTAL.away.value)
        bet_team_type = 'favored';
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.games.TOTAL.away.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.games.TOTAL.away.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.games.TOTAL.away.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.games.TOTAL.away.value) / 100);
        }

      }
      else if (selectedArray.isTotalSelect2 == true) {
        var posneg = Math.sign(selectedArray.games.TOTAL.home.value)
        bet_team_type = 'underdog';
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.games.TOTAL.home.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.games.TOTAL.home.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.games.TOTAL.home.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.games.TOTAL.home.value) / 100);
        }
      }
      else if (selectedArray.isSpreadSelect1 == true) {
        var posneg = Math.sign(selectedArray.games.SPREAD.away.other_value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        }
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.games.SPREAD.away.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.games.SPREAD.away.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.games.SPREAD.away.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.games.SPREAD.away.value) / 100);
        }
      }
      else if (selectedArray.isSpreadSelect2 == true) {
        wining_rate_favored = '';
        wining_rate_underdog = '';
        var posneg = Math.sign(selectedArray.games.SPREAD.home.other_value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        }
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.games.SPREAD.home.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.games.SPREAD.home.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.games.SPREAD.home.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.games.SPREAD.home.value) / 100);
        }
      } else if (selectedArray.isMoneyLineDraw == true) {
        bet_team_type = '';
        wining_rate_favored = '';
        wining_rate_underdog = '';
      }

      if (this.state.from_private_contest == "1") {
        contest_type = 'private';
      }
      else if (this.state.from_private_contest != "1") {
        contest_type = 'public';
      }

      // if (this.state.checkedMoneyLinePublic == true) {
      //   bet_type = '1';
      // }
      // else if (this.state.checkedMoneyLinePrivate == true) {
      //   bet_type = '2';
      // }
      var oddsArray :any;
      if (this.state.checkedMoneyLinePublic == true) {
        bet_type = '1';
        oddsArray = selectedArray.odds
      }
      else if (this.state.checkedMoneyLinePrivate == true) {
        bet_type = '2';
        oddsArray = selectedArray.private_odds
        //  // JSON.stringify(selectedArray.odds),
      }
      if (selectedArray.isMoneyLineDraw == true) {
        oddsArray = selectedArray.odds
      }
      // if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
      //   amount_to_win = this.state.valueofMoneylineDialog;
      //   bet_amount = this.state.betammount;
      //   bet_amount = bet_amount;

      // }
      // else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
      //   bet_amount = this.state.valueofMoneylineDialog;
      //   amount_to_win = this.state.amounttowin;
      //   amount_to_win = amount_to_win;
      // }
      if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
        // amount_to_win = this.state.valueofMoneylineDialog; // pky bifer bet and win amount 
        amount_to_win = this.state.valueofMoneylineDialogShow;
        bet_amount = this.state.betammount;
        bet_amount = bet_amount;

      }
      else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
        bet_amount = this.state.valueofMoneylineDialog;
        amount_to_win = this.state.amounttowin;
        //amount_to_win = parseInt(amount_to_win) + parseInt(bet_amount); //garima
      }

     if( this.state.contesttype=='free_to_play_contest' && this.state.contestdata.bankroll=='N')
     {
      bet_amount = "0"
      amount_to_win = "0"
     }


     ///////////////////////////clever tap //////////////////////////
     var leageName = '';
    
     //   this.leaugeArrayData.map((x: any) => ({
        
     // })
 
     for(var i=0 ; i< this.leaugeArrayData.length; i++)
     {
       if(this.leaugeArrayData[i].league_id == selectedArray.league_id)
       {
         leageName = this.leaugeArrayData[i].title;
       }
     }
 
       if (selectedArray.MasterCalcFlag == "M" || selectedArray.MasterCalcFlag == "D") {
        
         this.cleverTapWithParam('Placed_Bet',{'bet_amount':bet_amount,'league_name':leageName,'odd_type':'Money Line' })
       }
       else if (selectedArray.MasterCalcFlag == "T") {
         this.cleverTapWithParam('Placed_Bet',{'bet_amount':bet_amount,'league_name':leageName,'odd_type':'Total' })
        
       }
       else if (selectedArray.MasterCalcFlag == "S") {
         this.cleverTapWithParam('Placed_Bet',{'bet_amount':bet_amount,'league_name':leageName,'odd_type':'Spread' })
       }


       /////////////////////////// end ////////////////////



      this.setState({ POSTBetAmount: bet_amount });

      var placebetRequset = new PlaceBetRequest(
        this.state.contest_id,
        this.state.contesttype=='free_to_play_contest'?'free_to_play':contest_type,
        selectedArray.event_id,
        selectedArray.league_id,
        bet_odds_type,
        bet_type,
        bet_amount,
        amount_to_win,
        bet_team_type,
        bet_team_id,
        wining_rate_favored,
        wining_rate_underdog,
        JSON.stringify(oddsArray),
      )
      console.log('placebetRequset', placebetRequset)//;return false;
      this.isPlaceBet = true;
      var serviceAction = new ServiceAction()
      var responseParser = new PlaceBetResponseParser()
      this.props.dispatch!(serviceAction.request(ServiceType.Bets,
        ServiceKeys.PlaceBetName,
        placebetRequset,
        [this.constructor.name],
        responseParser))

    // }
    // else {
    //   AlertUtil.show('Not entered any amount,please try agian');
    // }

  }

  props_place_bet_API(selectedPropsArray: any, selectedFlag: any) {
    var bet_type;
    var bet_amount: any;
    var amount_to_win;
    var wining_rate_over;
    var wining_rate_under;
    var answer;
    var contest_type: any;

    this.setState({ dialogVisible: false })

    if (this.state.checkedBetText == 'P1') {
      bet_type = 1
    }
    else if (this.state.checkedBetText == 'P2') {
      bet_type = 2
    }

    if (this.state.from_private_contest == "1") {
      contest_type = 'private';
    }
    else if (this.state.from_private_contest != "1") {
      contest_type = 'public';
    }

    amount_to_win = this.state.valueofMoneylineDialog;
    bet_amount = this.state.betammount;
    bet_amount = bet_amount[1];
    var posneg = 0;

    if (Math.abs(selectedPropsArray.over) > 0) {
      posneg = Math.sign(selectedPropsArray.over)
      if (posneg == -1) {
        wining_rate_over = 1 + (100 / Math.abs(selectedPropsArray.over));
        wining_rate_under = 1 + (Math.abs(selectedPropsArray.under) / 100);
      }
      else {
        wining_rate_under = 1 + (100 / Math.abs(selectedPropsArray.under));
        wining_rate_over = 1 + (Math.abs(selectedPropsArray.over) / 100);

      }
    }
    else if (Math.abs(selectedPropsArray.over) == 0) {
      wining_rate_over = 1 + (100 / Math.abs(selectedPropsArray.over));
      wining_rate_under = 1 + (Math.abs(selectedPropsArray.under) / 100);
    }

    if (selectedFlag == 'O') {
      answer = selectedPropsArray.over
    }
    else {
      answer = selectedPropsArray.under
    }

    this.setState({ POSTBetAmount: bet_amount });

    if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
      // amount_to_win = this.state.valueofMoneylineDialog; // pky bifer bet and win amount 
      amount_to_win = this.state.valueofMoneylineDialogShow;
      bet_amount = this.state.betammount;
      bet_amount = bet_amount;

    }
    else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
      bet_amount = this.state.valueofMoneylineDialog;
      amount_to_win = this.state.amounttowin;
      //amount_to_win = parseInt(amount_to_win) + parseInt(bet_amount); //garima
    }
    var betRequset = new BetAFriendRequest(
      this.state.contest_id,
      contest_type,
      selectedPropsArray.player_props.event_id,
      selectedPropsArray.player_props.line_lookup,
      selectedPropsArray.question,
      answer,
      selectedFlag == 'O' ? 'over' : 'under',
      bet_type,
      bet_amount,
      amount_to_win,
      selectedPropsArray.total,
      selectedPropsArray.over,
      selectedPropsArray.under,
      wining_rate_over,
      wining_rate_under,
      selectedPropsArray.player_props.id,
      ''
    )
    var serviceAction = new ServiceAction()
    var responseParser = new BetAFriendResponseParser()
    this.props.dispatch!(serviceAction.request(ServiceType.Bets,
      ServiceKeys.BetaFriendName,
      betRequset,
      [this.constructor.name],
      responseParser))

  }

  calluncoveredAPI(event_id: any) {
    var params: any = {
      'event_id': event_id,
    };

    console.log('calluncoveredAPI body param ' + JSON.stringify(params));
    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/prop_uncoveredaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
      body: formData,

    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.data.length > 0) {
          this.setState({ BetDialogueData: responseJson.data });
          this.setState({ BetDialogueNoData: false });
          this.setState({ valueofMoneylineDialogShow: '0.00' });
          this.setState({ valueofMoneylineDialog: '0.00' });
        }
        else {
          this.setState({ BetDialogueNoData: true });
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
      .catch(error => console.log(error))
  }

  generatepropsAPI(event_id: any, legue_id: any) {
    var params: any = {
      'event_id': event_id,
      'league_id': legue_id

    };

    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }
    fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/api/genrate_props', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
      body: formData,

    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson))
        if (responseJson.data.length > 0) {
          this.setState({ Bet_Question_array: responseJson.data })
          console.log('que array ' + JSON.stringify(this.state.Bet_Question_array))
        }
        else {
          this.setState({ Bet_Question_array: '' });
          this.noqueData = true;
        }
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          LogoutUtill.logoutButtonPressed(this.props);
        }
      })
      .catch(error => console.log(error))
  }

  componentWillReceiveProps(nextProps: G_ContestDashboardViewProps) {
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
      else if (nextProps.serviceKey === ServiceKeys.FeedbackServiceName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log("feedbackResponse " + JSON.stringify(nextProps.feedbackResponse));
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
      else if (nextProps.serviceKey === ServiceKeys.PlaceBetName) {
        if(this.props.placeBetResponse !== nextProps.placeBetResponse){
          if(this.isPlaceBet){
          console.log("placeBetResponsessssssssssss " + JSON.stringify(nextProps));
          console.log("this.prop " + JSON.stringify(this.props));
          this.isPlaceBet = false;
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log("placeBetResponse " + JSON.stringify(nextProps.placeBetResponse));
            var response = nextProps.placeBetResponse!.response;
            if (response.message == 'success') {
              //chnage bankroll amount
              if(this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='Y')
             { 
               console.log('avialabel bank roll',response)
              var data= this.state.contestdata
              data.avaiable_bankroll_amount = response.data.available_bankroll_amount
              this.setState({contestdata:data})
              }else{
                console.log('avialabel no bankroll response',response)
              }
              //end chnage bankroll amount
              var amount_to_win;
              var bet_amount;

              if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
                amount_to_win = this.state.valueofMoneylineDialog;
                bet_amount = this.state.betammount;

              }
              else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
                bet_amount = this.state.valueofMoneylineDialog;
                amount_to_win = this.state.amounttowin;
              }


              console.log(" this.state.checkedMoneyLinePrivate " + this.state.checkedMoneyLinePrivate)
              if (this.state.checkedMoneyLinePrivate == true) {
                this.setState({ BetType: 'ODDS' });
                this.setState({ POSTBetAmount: bet_amount });
                if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
                
                  this.setState({ POSTWinAmount: this.state.valueofMoneylineDialogShow });
                }
                else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
                  this.setState({ POSTWinAmount: amount_to_win });
                }
                this.setState({ selectedItem: this.state.selectedItem });
                this.shareOption(response, this.state.selectedItem, 'ODDS');

                this.rightTickAfterBet();
               


              }
              var isPublickAlertOn = false;
              if (response.data.type == '1') {
                if (!isPublickAlertOn) {
                  isPublickAlertOn = true;
                  AlertUtil.show("Bet Placed Successfully");
                }
                this.rightTickAfterBet();
              }
              setTimeout(function () { isPublickAlertOn = false }, 1000)
              this.getProfile();
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
            }
            else {
              //  AlertUtil.show('Unsuccesful :' + response.message);
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
            }

            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.FinishedWithError:
             // start colour change code
       this.setState({loader:false})
       if(this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='N')
    {
    this.DialogClose(this.state.selectedItem, this.state.eventindex)
    }else{
      console.log('hhh')
    }
     //end colour change code
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
      }}
      }
      else if (nextProps.serviceKey === ServiceKeys.BetaFriendName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log("betaFriendResponse " + JSON.stringify(nextProps.betaFriendResponse));
            var response = nextProps.betaFriendResponse!.response;
            if (response.message == 'success') {

              console.log(" this.state.checkedBetText " + this.state.checkedBetText)
              

              if (this.state.checkedBetText == 'P2') {
                this.setState({ BetType: 'PROP' });
                this.setState({ POSTBetAmount: bet_amount });
                this.shareOption(response, this.state.selectedPropsItem, 'PROP');
              }

              this.getProfile();
              console.log("custom bet success");
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
            }
            else {
              AlertUtil.show('Unsuccesful :' + response.message);
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
            // AlertUtil.show(errorMessage)
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

  rightTickAfterBet() {
    try {
      var selectedItems = this.selectedItemData;
      if (selectedItems.isMoneyLineSelect1 == true || selectedItems.isTotalSelect1 == true || selectedItems.isSpreadSelect1 == true) {
        if (selectedItems.isMoneyLineSelect1 == true) {
          selectedItems.games.MONEY_LINE.away.flag = true;
        } else if (selectedItems.isTotalSelect1 == true) {
          selectedItems.games.TOTAL.away.flag = true;
        } else {
          selectedItems.games.SPREAD.away.flag = true;
        }
      } else {
        if (selectedItems.isMoneyLineSelect2 == true) {
          selectedItems.games.MONEY_LINE.home.flag = true;
        } else if (selectedItems.isTotalSelect2 == true) {
          selectedItems.games.TOTAL.home.flag = true;
        } else if (selectedItems.isMoneyLineDraw == true) {
          selectedItems.games.MONEY_LINE.draw.flag = true;
        }else {
          selectedItems.games.SPREAD.home.flag = true;
        }
      }
       // start colour change code
      // this.setState({loader:false})
      this.setState({ selectedItem: selectedItems });
       if(this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='N')
    {
    this.DialogClose(this.state.selectedItem, this.state.eventindex)
    }else{
      this.DialogClose(this.state.selectedItem, this.state.eventindex)
      console.log('hhh')
    }
     //end colour change code
     
    } catch (error) {

    }


  }




  submitFeedbackAPI() {
    if (this.state.FeedbackMsg != '' || this.state.FeedbackSubject != '') {
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

    } else {
      AlertUtil.show('Please Enter Subject and Message');
    }
  }


  //  ---------------------------------------------- METHODS --------------------------------------------

  accountNameTapped() {



    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.props.navigation!.navigate(AppScreens.G_ProfileView);
    }
  }

  iconDidTapped() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      console.log('version number : ',this.state.version_number)
      this.props.navigation!.navigate(AppScreens.G_Settings_2_View, { contest: true,version:this.state.version_number });
    }
  }

  LogoiconDidTapped() {
    //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
  }


  availableBalanceTapped() {

  }

  openPlaysTapped() {
    // this.props.navigation!.navigate(AppScreens.G_UddaContests);
    RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)

  }

  ContesetJoinTapped() {


  }


  logoutButtonPressed() {
    Application.sharedApplication().logout()
    AsyncStorage.removeItem("FromGame");
    AsyncStorage.removeItem("FromGambling");
    Application.sharedApplication().FromGame = false;
    Application.sharedApplication().FromGame = false;
    RouterBuilder.resetRouteTo(AppScreens.SplashLandingView, this.props)

  }

  HighlightTapped() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.props.navigation!.navigate(AppScreens.G_Highlighted_Matchups_View);
    }
  }

  MostOpenActionTapped() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.props.navigation!.navigate(AppScreens.G_MostOpenActionView);
    }
  }

  coveredPlaysTapped() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.props.navigation!.navigate(AppScreens.G_GamingBetView);
    }
  }
  handleKeyDown = (e: any, aValue: any, Flag: any, MFlag: any) => {
  
    //if (e.nativeEvent.key == "." || e.nativeEvent.key == "1" || e.nativeEvent.key == "2" || e.nativeEvent.key == "3" || e.nativeEvent.key == "4" || e.nativeEvent.key == "5" || e.nativeEvent.key == "6" || e.nativeEvent.key == "7" || e.nativeEvent.key == "8" || e.nativeEvent.key == "9" || e.nativeEvent.key == "0") {
      if(this.state.textlength > e.nativeEvent.text.length)
      {
       // alert('delete')
       this.setState({textlength:0})
        this.handleBackSpace(Flag)
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
          ammwin = this.state.amounttowin + n[res];
          ammwins = ammwin.split(" ");
          this.reverceendEditing(ammwin, aValue, MFlag);
          this.setState({ amounttowin: ammwin });
        }
        else {
          ammwin = this.state.amounttowin + n[res];
          ammwins = ammwin.split(" ");
          this.reverceendEditing(ammwin, aValue, MFlag);
          this.setState({ amounttowin: ammwin });
        }

      }
      else if (Flag == "BA") {
        var betamm = '';
        var betamms;
        if (this.state.betammount.length == 0) {
          betamm = this.state.betammount + n[res];
          betamms = betamm.split(" ");
          this.endEditing(betamm, aValue, MFlag);
          this.setState({ betammount: betamm });
        }
        else {
          betamm = this.state.betammount + n[res];
          betamms = betamm.split(" ");
          this.endEditing(betamm, aValue, MFlag);
          this.setState({ betammount: betamm });
        }
      }
    }
  }

  }
  handleKeyDown123 = (e: any, aValue: any, Flag: any, MFlag: any) => {



    if (e.nativeEvent.key == "." || e.nativeEvent.key == "1" || e.nativeEvent.key == "2" || e.nativeEvent.key == "3" || e.nativeEvent.key == "4" || e.nativeEvent.key == "5" || e.nativeEvent.key == "6" || e.nativeEvent.key == "7" || e.nativeEvent.key == "8" || e.nativeEvent.key == "9" || e.nativeEvent.key == "0") {

      if (Flag == "ATW") {
        var ammwin = '';
        var ammwins;
        if (this.state.amounttowin.length == 0) {
          ammwin = this.state.amounttowin + e.nativeEvent.key;
          ammwins = ammwin.split(" ");
          this.reverceendEditing(ammwin, aValue, MFlag);
          this.setState({ amounttowin: ammwin });
        }
        else {
          ammwin = this.state.amounttowin + e.nativeEvent.key;
          ammwins = ammwin.split(" ");
          this.reverceendEditing(ammwin, aValue, MFlag);
          this.setState({ amounttowin: ammwin });
        }

      }
      else if (Flag == "BA") {
        var betamm = '';
        var betamms;
        if (this.state.betammount.length == 0) {
          betamm = this.state.betammount + e.nativeEvent.key;
          betamms = betamm.split(" ");
          this.endEditing(betamm, aValue, MFlag);
          this.setState({ betammount: betamm });
        }
        else {
          betamm = this.state.betammount + e.nativeEvent.key;
          betamms = betamm.split(" ");
          this.endEditing(betamm, aValue, MFlag);
          this.setState({ betammount: betamm });
        }
      }
    }

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

  getDialogueState(item: any, index: any, Flag: any, ArrayLength: any) {
    // start colour change code
    this.setState({eventindex:index})
    // end colour change code
    var that = this;
    if(this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='N')
    {

   // setTimeout(function(){
    
     //that.showDialog(true, item);
      
   // },1000)
    
  }
  else{
    setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index, viewPosition: 0.2 }) }, 100);
  }
   
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
      this.setState({ MatchEventDialog: true });
    }
    else {


      var that = this;
      if(this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='N')
      {
  
     // setTimeout(function(){
      
       that.showDialog(true, item);
        
     // },1000)
      
    }



      if (Flag == 'M') {
        if (item.games.MONEY_LINE.away.value == 0 || item.games.MONEY_LINE.away.value == '') {
          AlertUtil.show("You can't bet on 0 odds");
        }
        else {
          for (let i = 0; i < ArrayLength; i++) {
            if (i == index) {
              this.state.DataList[index].isMoneyLineSelect1 = !item.isMoneyLineSelect1;
              this.state.DataList[index].isMoneyLineSelect2 = false;
              this.state.DataList[index].isTotalSelect1 = false;
              this.state.DataList[index].isTotalSelect2 = false;
              this.state.DataList[index].isSpreadSelect1 = false;
              this.state.DataList[index].isSpreadSelect2 = false;
              this.state.DataList[index].isBetaFriendSelect = false;
              this.state.DataList[index].isMoneyLineDraw = false;
              this.state.DataList[index].MasterCalcFlag = 'M';
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
            else {
              this.state.DataList[i].isMoneyLineSelect1 = false;
              this.state.DataList[i].isMoneyLineSelect2 = false;
              this.state.DataList[i].isTotalSelect1 = false;
              this.state.DataList[i].isTotalSelect2 = false;
              this.state.DataList[i].isSpreadSelect1 = false;
              this.state.DataList[i].isSpreadSelect2 = false;
              this.state.DataList[i].isBetaFriendSelect = false;
              this.state.DataList[i].MasterCalcFlag = 'M';
              this.state.DataList[i].isMoneyLineDraw = false;
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
          }
          this.setState({ DataList: this.state.DataList });
        }

      }
      else if (Flag == 'T') {
        if (item.games.TOTAL.away.value == 0 || item.games.TOTAL.away.value == '') {
          AlertUtil.show("You can't bet on 0 odds");
        }
        else {
          for (let i = 0; i < ArrayLength; i++) {
            if (i == index) {
              this.state.DataList[index].isMoneyLineSelect1 = false;
              this.state.DataList[index].isMoneyLineSelect2 = false;
              this.state.DataList[index].isTotalSelect1 = !item.isTotalSelect1;
              this.state.DataList[index].isTotalSelect2 = false;
              this.state.DataList[index].isSpreadSelect1 = false;
              this.state.DataList[index].isSpreadSelect2 = false;
              this.state.DataList[index].isBetaFriendSelect = false;
              this.state.DataList[index].MasterCalcFlag = 'T';
              this.state.DataList[index].isMoneyLineDraw = false;
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
            else {
              this.state.DataList[i].isMoneyLineSelect1 = false;
              this.state.DataList[i].isMoneyLineSelect2 = false;
              this.state.DataList[i].isTotalSelect1 = false;
              this.state.DataList[i].isTotalSelect2 = false;
              this.state.DataList[i].isSpreadSelect1 = false;
              this.state.DataList[i].isSpreadSelect2 = false;
              this.state.DataList[i].isBetaFriendSelect = false;
              this.state.DataList[i].MasterCalcFlag = 'T';
              this.state.DataList[i].isMoneyLineDraw = false;
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
          }
          this.setState({ DataList: this.state.DataList });
        }
      }
      else if (Flag == 'S') {
        if (item.games.SPREAD.away.value == 0 || item.games.SPREAD.away.value == '') {
          AlertUtil.show("You can't bet on 0 odds");
        }
        else {
          for (let i = 0; i < ArrayLength; i++) {
            if (i == index) {
              this.state.DataList[index].isMoneyLineSelect1 = false;
              this.state.DataList[index].isMoneyLineSelect2 = false;
              this.state.DataList[index].isTotalSelect1 = false;
              this.state.DataList[index].isTotalSelect2 = false;
              this.state.DataList[index].isSpreadSelect1 = !item.isSpreadSelect1;
              this.state.DataList[index].isSpreadSelect2 = false;
              this.state.DataList[index].isBetaFriendSelect = false;
              this.state.DataList[index].MasterCalcFlag = 'S';
              this.state.DataList[index].isMoneyLineDraw = false;
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
            else {
              this.state.DataList[i].isMoneyLineSelect1 = false;
              this.state.DataList[i].isMoneyLineSelect2 = false;
              this.state.DataList[i].isTotalSelect1 = false;
              this.state.DataList[i].isTotalSelect2 = false;
              this.state.DataList[i].isSpreadSelect1 = false;
              this.state.DataList[i].isSpreadSelect2 = false;
              this.state.DataList[i].isBetaFriendSelect = false;
              this.state.DataList[i].isMoneyLineDraw = false;
              this.state.DataList[i].MasterCalcFlag = 'S';
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
          }
          this.setState({ DataList: this.state.DataList });

        }
      }

      this.betselect('N');
    }
  }

  getDialogueState2(item: any, index: any, Flag: any, ArrayLength: any) {
    var that = this;
    if( this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='N')
    {

   // setTimeout(function(){
    
    // that.showDialog(true, item);
      
   // },1000)
    
  }
  else{
    setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index, viewPosition: 0.2 }) }, 100);
  }
    
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
      this.setState({ MatchEventDialog: true });
    }
    else {
      
      var that = this;
      if(this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='N')
      {
  
     // setTimeout(function(){
      
       that.showDialog(true, item);
        
     // },1000)
      
    }


      if (Flag == 'M') {
        if (item.games.MONEY_LINE.home.value == 0 || item.games.MONEY_LINE.home.value == '') {
          AlertUtil.show("You can't bet on 0 odds");
        }
        else {
          for (let i = 0; i < ArrayLength; i++) {
            if (i == index) {
              this.state.DataList[index].isMoneyLineSelect1 = false;
              this.state.DataList[index].isMoneyLineSelect2 = !item.isMoneyLineSelect2;
              this.state.DataList[index].isTotalSelect1 = false;
              this.state.DataList[index].isTotalSelect2 = false;
              this.state.DataList[index].isSpreadSelect1 = false;
              this.state.DataList[index].isSpreadSelect2 = false;
              this.state.DataList[index].isBetaFriendSelect = false;
              this.state.DataList[index].MasterCalcFlag = 'M';
              this.state.DataList[index].isMoneyLineDraw = false;
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
            else {
              this.state.DataList[i].isMoneyLineSelect1 = false;
              this.state.DataList[i].isMoneyLineSelect2 = false;
              this.state.DataList[i].isTotalSelect1 = false;
              this.state.DataList[i].isTotalSelect2 = false;
              this.state.DataList[i].isSpreadSelect1 = false;
              this.state.DataList[i].isSpreadSelect2 = false;
              this.state.DataList[i].isBetaFriendSelect = false;
              this.state.DataList[i].MasterCalcFlag = 'M';
              this.state.DataList[i].isMoneyLineDraw = false;
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
          }
          this.setState({ DataList: this.state.DataList });
        }
      }
      else if (Flag == 'T') {
        if (item.games.TOTAL.home.value == 0 || item.games.TOTAL.home.value == '') {
          AlertUtil.show("You can't bet on 0 odds");
        }
        else {
          for (let i = 0; i < ArrayLength; i++) {
            if (i == index) {
              this.state.DataList[index].isMoneyLineSelect1 = false;
              this.state.DataList[index].isMoneyLineSelect2 = false;
              this.state.DataList[index].isTotalSelect1 = false;
              this.state.DataList[index].isTotalSelect2 = !item.isTotalSelect2;
              this.state.DataList[index].isSpreadSelect1 = false;
              this.state.DataList[index].isSpreadSelect2 = false;
              this.state.DataList[index].isBetaFriendSelect = false;
              this.state.DataList[index].isMoneyLineDraw = false;
              this.state.DataList[index].MasterCalcFlag = 'T';
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
            else {
              this.state.DataList[i].isMoneyLineSelect1 = false;
              this.state.DataList[i].isMoneyLineSelect2 = false;
              this.state.DataList[i].isTotalSelect1 = false;
              this.state.DataList[i].isTotalSelect2 = false;
              this.state.DataList[i].isSpreadSelect1 = false;
              this.state.DataList[i].isSpreadSelect2 = false;
              this.state.DataList[i].isBetaFriendSelect = false;
              this.state.DataList[i].isMoneyLineDraw = false;
              this.state.DataList[i].MasterCalcFlag = 'T';
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
          }
          this.setState({ DataList: this.state.DataList });

        }
      }
      else if (Flag == 'S') {
        if (item.games.SPREAD.home.value == 0 || item.games.SPREAD.home.value == '') {
          AlertUtil.show("You can't bet on 0 odds");
        }
        else {
          for (let i = 0; i < ArrayLength; i++) {
            if (i == index) {
              this.state.DataList[index].isMoneyLineSelect1 = false;
              this.state.DataList[index].isMoneyLineSelect2 = false;
              this.state.DataList[index].isTotalSelect1 = false;
              this.state.DataList[index].isTotalSelect2 = false;
              this.state.DataList[index].isSpreadSelect1 = false;
              this.state.DataList[index].isSpreadSelect2 = !item.isSpreadSelect2;
              this.state.DataList[index].isBetaFriendSelect = false;
              this.state.DataList[index].isMoneyLineDraw = false;
              this.state.DataList[index].MasterCalcFlag = 'S';
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
            else {
              this.state.DataList[i].isMoneyLineSelect1 = false;
              this.state.DataList[i].isMoneyLineSelect2 = false;
              this.state.DataList[i].isTotalSelect1 = false;
              this.state.DataList[i].isTotalSelect2 = false;
              this.state.DataList[i].isSpreadSelect1 = false;
              this.state.DataList[i].isSpreadSelect2 = false;
              this.state.DataList[i].isBetaFriendSelect = false;
              this.state.DataList[i].isMoneyLineDraw = false;
              this.state.DataList[i].MasterCalcFlag = 'S';
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
          }
          this.setState({ DataList: this.state.DataList });
        }
      } else if (Flag == 'D') {

        // this.referralservice.logEvent('MoneylineBetDraw_Click', {});
        if (item.odds.ml_draw_price == 0 || item.odds.ml_draw_price == '') {
          AlertUtil.show("You can't bet on 0 odds");
        }
        else {
          for (let i = 0; i < ArrayLength; i++) {
            if (i == index) {
              this.state.DataList[index].isMoneyLineSelect1 = false;
              this.state.DataList[index].isMoneyLineSelect2 = false;
              this.state.DataList[index].isTotalSelect1 = false;
              this.state.DataList[index].isTotalSelect2 = false;
              this.state.DataList[index].isSpreadSelect1 = false;
              this.state.DataList[index].isSpreadSelect2 = false;
              this.state.DataList[index].isBetaFriendSelect = false;
              this.state.DataList[index].isMoneyLineDraw = !item.isMoneyLineDraw;

              this.state.DataList[index].MasterCalcFlag = 'D';
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
            else {
              this.state.DataList[i].isMoneyLineSelect1 = false;
              this.state.DataList[i].isMoneyLineSelect2 = false;
              this.state.DataList[i].isTotalSelect1 = false;
              this.state.DataList[i].isTotalSelect2 = false;
              this.state.DataList[i].isSpreadSelect1 = false;
              this.state.DataList[i].isSpreadSelect2 = false;
              this.state.DataList[i].isBetaFriendSelect = false;
              this.state.DataList[i].isMoneyLineDraw = false;
              this.state.DataList[i].MasterCalcFlag = 'D';
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              this.setState({ checkedMoneyLinePublic: true });
              this.setState({ checkedMoneyLinePrivate: false });
            }
          }
          this.setState({ DataList: this.state.DataList });
        }
        //this.checkUserStatus("money_line")
      }


      this.betselect('N');
    }
  }

  getBetDialogueState(item: any, index: any, ArrayLength: any) {
    setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index, viewPosition: 0.2 }) }, 100);
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
      this.setState({ MatchEventDialog: true });
    }
    else {
      for (let i = 0; i < ArrayLength; i++) {
        if (i == index) {
          this.state.DataList[index].isMoneyLineSelect1 = false;
          this.state.DataList[index].isMoneyLineSelect2 = false;
          this.state.DataList[index].isTotalSelect1 = false;
          this.state.DataList[index].isTotalSelect2 = false;
          this.state.DataList[index].isSpreadSelect1 = false;
          this.state.DataList[index].isSpreadSelect2 = false;
          this.state.DataList[index].isBetaFriendSelect = !item.isBetaFriendSelect;
          this.state.DataList[index].isMoneyLineDraw = false;
          this.setState({ SelectedBetOption: 'P' });
          this.setState({ selectedPropBetOptions: 'N' });
          this.setState({ selectedPropBetValue: '0' });
          this.setState({ betammount: '' });
          this.setState({ amounttowin: '' });
          this.setState({ valueofMoneylineDialog: '0.00' });
          this.setState({ valueofMoneylineDialogShow: '0.00' });

        }
        else {
          this.state.DataList[i].isMoneyLineSelect1 = false;
          this.state.DataList[i].isMoneyLineSelect2 = false;
          this.state.DataList[i].isTotalSelect1 = false;
          this.state.DataList[i].isTotalSelect2 = false;
          this.state.DataList[i].isSpreadSelect1 = false;
          this.state.DataList[i].isSpreadSelect2 = false;
          this.state.DataList[i].isBetaFriendSelect = false;
          this.state.DataList[i].isMoneyLineDraw = false;
          this.setState({ SelectedBetOption: 'P' });
          this.setState({ selectedPropBetOptions: 'N' });
          this.setState({ selectedPropBetValue: '0' });
          this.setState({ betammount: '' });
          this.setState({ amounttowin: '' });
          this.setState({ valueofMoneylineDialog: '0.00' });
          this.setState({ valueofMoneylineDialogShow: '0.00' });

        }
      }
      this.setState({ DataList: this.state.DataList });

      this.generatepropsAPI(item.event_id, item.league_id);
      this.calluncoveredAPI(item.event_id);
      // const updatedEmployees = update(this.state.DataList, { $splice: [[index, 1, item]] });
      // this.setState({ DataList: updatedEmployees });
    }
  }

  BetRadioPrivateButton() {
    if (this.state.checkedBetPrivate == false) {
      this.setState({ checkedBetPrivate: true })
      this.setState({ checkedBetPublic: false })
    }
    else {
      this.setState({ checkedBetPrivate: false })
      this.setState({ checkedBetPublic: true })
    }

  }

  BetRadioToggle(flag: any) {
    if (flag == 'P2') {
      this.setState({ checkedBetPP: false })
      this.setState({ checkedBetText: 'P2' })
    }

    else if (flag == 'P1') {
      this.setState({ checkedBetPP: true })
      this.setState({ checkedBetText: 'P1' })
    }
  }

  MoneyLineRadioPublicButton() {
    if (this.state.checkedMoneyLinePublic == true) {
      this.setState({ checkedMoneyLinePublic: false })
      this.setState({ checkedMoneyLinePrivate: false })
    }
    else {
      this.setState({ checkedMoneyLinePublic: true })
      this.setState({ checkedMoneyLinePrivate: false })
    }
    this.handleFocusAtW();
    this.handleFocusBA();
  }

  MoneyLineRadioPrivateButton() {
    if (this.state.checkedMoneyLinePrivate == true) {
      this.setState({ checkedMoneyLinePrivate: false })
      this.setState({ checkedMoneyLinePublic: false })
    }
    else {
      this.setState({ checkedMoneyLinePrivate: true })
      this.setState({ checkedMoneyLinePublic: false })
    }
    this.handleFocusAtW();
    this.handleFocusBA();
  }

  DialogClose(item: any, index: any) {
    
    item.isBetaFriendSelect = false;
    item.isMoneyLineSelect1 = false;
    item.isMoneyLineSelect2 = false;
    item.isTotalSelect1 = false;
    item.isTotalSelect2 = false;
    item.isSpreadSelect1 = false;
    item.isSpreadSelect2 = false;
    item.isMoneyLineDraw = false;
     
    this.setState({ betammount: '' });
    this.setState({ amounttowin: '' });
    this.setState({ valueofMoneylineDialog: '0.00' });
    this.setState({ valueofMoneylineDialogShow: '0.00' });
    // const updatedEmployees = update(this.state.DataList, { $splice: [[index, 1, item]] });
    // this.setState({ DataList: updatedEmployees });

  }

  endEditing(value: any, MoneyLineValue: any, MFlag: any) {
    if (MFlag == 'M' || MFlag == 'T' || MFlag == 'S' || MFlag == 'D') {

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
    if (MFlag == 'M' || MFlag == 'T' || MFlag == 'S' || MFlag == 'D') {

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

  showDialog1(isShow: any, item: any) {
    if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
      if (this.state.betammount < this.state.MinBetAmount) {
        AlertUtil.show("The minimum amount to bet is " + this.state.MinBetAmount + " UDDA bucks.");
      }
      else {
        this.setState({ dialogVisible: isShow });
        this.setState({ selectedItem: item });
      }

    }
    else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
      if (this.state.valueofMoneylineDialog < this.state.MinBetAmount) {
        AlertUtil.show("The minimum amount to bet is " + this.state.MinBetAmount + " 1000 UDDA bucks.");
      }
      else {
        this.setState({ dialogVisible: isShow });
        this.setState({ selectedItem: item });
      }

    }
    else {
      AlertUtil.show("Please Enter Valid Bet Amount.")
    }

  }

  showDialog(isShow: any, item: any) {
    if(this.state.contesttype=='free_to_play_contest' && this.state.contestdata.bankroll=='N')
    {

      this.setState({ dialogVisible: isShow });
      this.setState({ selectedItem: item });
      this.selectedItemData = item;
    }
   else if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
      if (this.state.betammount == "") {
        AlertUtil.show("The minimum amount to bet is " + this.state.MinBetAmount + " UDDA bucks.");
      } else if (parseInt(this.state.betammount) < this.state.MinBetAmount) {
        AlertUtil.show("The minimum amount to bet is " + this.state.MinBetAmount + " UDDA bucks.");
      }
      else if ((this.state.MaxBetAmount != "") && (parseInt(this.state.betammount) > this.state.MaxBetAmount)) {
        AlertUtil.show("The maximum amount to bet is " + this.state.MaxBetAmount + " UDDA bucks.");
      }
      else {
        this.setState({ dialogVisible: isShow });
        this.setState({ selectedItem: item });
        this.selectedItemData = item;
      }

    }
    else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
      if (this.state.valueofMoneylineDialog == "") {
        AlertUtil.show("The minimum amount to bet is " + this.state.MinBetAmount + " UDDA bucks.");
      } else if (parseInt(this.state.valueofMoneylineDialog) < this.state.MinBetAmount) {
        AlertUtil.show("The minimum amount to bet is " + this.state.MinBetAmount + " 1000 UDDA bucks.");
      }
      else if ((this.state.MaxBetAmount != "") && (parseInt(this.state.valueofMoneylineDialog) > this.state.MaxBetAmount)) {
        AlertUtil.show("The maximum amount to bet is " + this.state.MaxBetAmount + " 1000 UDDA bucks.");
      }
      else {
        this.setState({ dialogVisible: isShow });
        this.setState({ selectedItem: item });
        this.selectedItemData = item;
      }

    }
    else {
      AlertUtil.show("Please Enter Valid Bet Amount.")
    }

  }



  showMoreDialog(isShow: any) {
    this.setState({ dialogmoreprocess: isShow });

  }

  UncoveredDialogClose() {
    this.setState({ dialogmoreprocess: false });
    this.setState({ BetDialogueData: '' });
  }



  FlagMethode(more: any) {
    this.setState({ moredialogclick: more })
  }

  selectedcheckkbox(item: any, mainindex: any, subindex: any, maindataArraylength: any) {

    for (let j = 0; j < maindataArraylength; j++) {
      for (let i = 0; i < item[j].questons_array.length; i++) {
        if (j == mainindex) {
          if (i == subindex) {
            item[j].questons_array[subindex].isselected = true;
          }
          else {
            item[j].questons_array[i].isselected = false;
          }
        }
        else {
          item[j].questons_array[i].isselected = false;
        }
      }
    }

    this.setState({ BetDialogueData: item });
  }

  selectedbetoption(selectedvalue: any) {
  }

  betselect(selectbet: any) {

    this.setState({ SelectedBetOption: selectbet });


  }

  BetQuestion(item: any, index: any, flag: any) {
    var arrayLength = this.state.Bet_Question_array.length;
    var count: any;
    this.setState({ selectedPropBetOptions: 'N' });
    this.setState({ selectedPropBetValue: '0' });
    if (index < arrayLength) {
      if (flag == 'M' && index > 0) {
        count = index - 1;
        for (let i = 0; i < arrayLength; i++) {
          if (i == count) {
            this.state.Bet_Question_array[count].isselected = true;
            this.state.Bet_Question_array[i].subindex = index;
            this.setState({ selecteValue: count });
          }
          else {
            this.state.Bet_Question_array[i].isselected = false;
            this.state.Bet_Question_array[i].subindex = '';
          }
        }
        this.setState({ Bet_Question_array: this.state.Bet_Question_array });
      }

      else if (flag == 'P') {
        count = index + 1;
        for (let i = 0; i < arrayLength; i++) {
          if (i == count) {
            this.state.Bet_Question_array[count].isselected = true;
            this.state.Bet_Question_array[i].subindex = index;
            this.setState({ selecteValue: count });
          }
          else {
            this.state.Bet_Question_array[i].isselected = false;
            this.state.Bet_Question_array[i].subindex = '';
          }

        }

        this.setState({ Bet_Question_array: this.state.Bet_Question_array });

      }
      else {
      }
    }
    else {

    }
  }

  CheckClick(item: any, selectedFlag: any) {
    this.setState({ selectedPropBetOptions: selectedFlag });
    if (selectedFlag == 'U') {
      this.setState({ selectedPropBetValue: item.under });
    }
    else {
      this.setState({ selectedPropBetValue: item.over });
    }
    this.setState({ selectedPropsItem: item });
  }

  CustomBetDialog() {
    if (this.state.betammount < 1000 || this.state.betammount < "1000") {
      AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
    }
    else if (this.state.valueofMoneylineDialog > 0) {
      this.setState({ dialogVisible: true });
    }
    else {
      AlertUtil.show("Please Enter Valid Bet Amount.")
    }
  }

  async shareOption(item: any, selectedDatavalues: any, bettype: any) {
    console.log("shareOption bettype " + bettype);
    console.log("shareOption item " + JSON.stringify(item));

    var MessageString: any;
    var ShowString: any;
    var oddsString: any;
    var teamName: any;
    var teamName2: any;
    var url: any;
    var selectedData: any;
    var contest_type: any;
    var referStr: any;
    if (bettype == 'ODDS') {
      selectedData = selectedDatavalues;

    }
    else if (bettype == 'PROP') {
      selectedData = selectedDatavalues;
    }

    if (this.state.from_private_contest == "1") {
      contest_type = "private"
    } else if (this.state.from_private_contest != "1") {
      contest_type = "public"
    }

    var amount: any;
    if (bettype == 'ODDS') {
      console.log("shareOption selectedData " + JSON.stringify(selectedData));

      if (selectedData.MasterCalcFlag == 'M') {
        oddsString = "Money Line";
      }
      else if (selectedData.MasterCalcFlag == 'T') {
        oddsString = "Total";
      }
      else {
        oddsString = "Spread";
      }
      if (selectedData.isMoneyLineSelect1 == true || selectedData.isTotalSelect1 == true || selectedData.isSpreadSelect1 == true) {
        teamName = selectedData.games.MATCH_UPS.away.title;
        teamName2 = selectedData.games.MATCH_UPS.home.title;;
        if (selectedData.isMoneyLineSelect1 == true) {
          amount = selectedData.games.MONEY_LINE.away.private_value;
        }
        else if (selectedData.isTotalSelect1 == true) {
          amount = "Over " + selectedData.games.TOTAL.away.other_value + " (" + selectedData.games.TOTAL.away.private_value + ")";
        }
        else {
          amount = selectedData.games.SPREAD.away.other_value + " (" + selectedData.games.SPREAD.away.private_value + ")";
        }
      }
      else {
        teamName = selectedData.games.MATCH_UPS.home.title;
        teamName2 = selectedData.games.MATCH_UPS.away.title;
        if (selectedData.isMoneyLineSelect2 == true) {
          amount = selectedData.games.MONEY_LINE.home.private_value;
        }
        else if (selectedData.isTotalSelect2 == true) {
          amount = "Under " + selectedData.games.TOTAL.home.other_value + " (" + selectedData.games.TOTAL.home.private_value + ")";
        }
        else {
          amount = selectedData.games.SPREAD.home.other_value + " (" + selectedData.games.SPREAD.home.private_value + ")";
        }
      }
      url = "http://bet.udda.com/index.php?t=oddsbet/"+contest_type+"&type=" + contest_type + "&i=" + item.data.encryptor_bet_id;

      url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
      referStr = "\n Use Referral Code " + this.my_referral_code + " to sign up.";

      var newoddsString = '"'+oddsString+'"'
      var newteamName = '"'+teamName+'"'
      var newteamName2 = '"'+teamName2+'"'
      var newLine = '"'+amount+'"'
      var newAmount ='"'+this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'"'
      var newWinAmount = '"'+this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'"'
        MessageString = "I’ll bet you the " +  newteamName +" beat "+ newteamName2 +". The "+teamName+" are "+newLine+ " on the "+newoddsString+". I’ll put up " + newAmount + " UDDA bucks to your "+ newWinAmount+" Udda bucks, you can accept all of or any part of my bet.";
 
       MessageString += referStr;
 
 
       var ShowString1 = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
         I just bet <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA Bucks </Text>
         on the
       <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {oddsString} {amount} </Text> for the team <Text style={{ fontFamily: 'Montserrat-SemiBold', textDecorationLine: 'underline' }}>{teamName}</Text> v/s {teamName2}. {referStr}</Text>
 
 
 ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
         I’ll bet you the <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{teamName} </Text>
         beat
       <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {teamName2}</Text> The {teamName} are <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{amount}</Text> on the <Text style={{ fontFamily: 'Montserrat-SemiBold'}}>{oddsString}</Text>. I’ll put up <Text style={{ fontFamily: 'Montserrat-SemiBold'  }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks to your <Text style={{ fontFamily: 'Montserrat-SemiBold'  }}>{this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks, you can accept all of or any part of my bet.
   {referStr}</Text>
      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });
      this.setState({ MessageUrl: url });
      console.log("odds bet " + url);
      this.setState({ shareDialog: true });
    }
    else {

      if (this.state.PropselctedFlag == 'O') {
        amount = "over " + selectedData.total + " (" + selectedData.over + ")";
      }
      else {
        amount = "Under " + selectedData.total + " (" + selectedData.under + ")";
      }

      url = "http://bet.udda.com/index.php?t=propsbet&type=" + contest_type + "&i=" + item.data.encryptor_bet_id;

      url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
      referStr = "\n Use Referral Code " + this.my_referral_code + " to sign up.";

      MessageString = "I just bet a " + this.state.POSTBetAmount + " UDDA Bucks that " + selectedData.question + " is " + amount + ". Would you like to accept the Bet? "
      MessageString += referStr;

      ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet a <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount} UDDA Bucks </Text>
        that
      <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {selectedData.question} </Text> is
      <Text style={{ fontFamily: 'Montserrat-SemiBold', textDecorationLine: 'underline' }}> {amount} </Text>. Would you like to accept the Bet?  {referStr} </Text>


      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });

      this.setState({ MessageUrl: url });
      console.log("prop bet " + url);

      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
    }


  }

  shareNow() {
    var Message = this.state.MessageString + " " + this.state.MessageUrl;
    Share.share({
      message: Message
    }).then(result => {
      this.setState({ shareDialog: false })
      console.log('share result' + JSON.stringify(result));
    }).catch(errorMsg => {
      this.setState({ shareDialog: false })
      console.log('share error ' + JSON.stringify(errorMsg));
    });
  }


  feedbackDialogOpen() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.setState({ FeedbackDialogue: true });
    }
  }

  feedbackDialogClose() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.setState({ FeedbackDialogue: false });
    }
  }

  thanksDialogClose() {
    this.setState({ thanksDialog: false });
  }



  gotostandinglist() {
    AsyncStorage.setItem('Standing_contest_id', this.state.contest_id)
    AsyncStorage.setItem('Standing_Type', this.state.from_private_contest);
    AsyncStorage.setItem('contest_Type', this.state.contesttype);

    console.log('Standing_contest_id :  '+this.state.contest_id+' Standing_Type : '+this.state.from_private_contest+' contest_Type : '+ this.state.contesttype)
    this.props.navigation!.push(AppScreens.G_StandingList)
    //  RouterBuilder.replaceRouteTo(AppScreens.G_StandingList, this.props)
  }







  //  ---------------------------------------------- Design and Design Methods --------------------------------------------
  getDialogue(GamesArray: any, index: any, value: any, title: any,privateValue:any) {
    console.log('GamesArray')
    console.log(GamesArray)
    var that = this;
    if(this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='N')
    {
    setTimeout(function(){
      // that.setState({ selectedItem: GamesArray });
      // that.selectedItemData = GamesArray;
     // that.DialogClose(GamesArray, index)  this.state.contesttype=='free_to_play_contest' && 
     
    //  that.showDialog(true, GamesArray)
      
    },1000)
    return;
    //that.DialogClose(GamesArray, index);
    
   // that.showDialog(true,GamesArray);
   // await AsyncStorage.setItem('Garray', GamesArray);
    // GamesArray.isBetaFriendSelect = false;
    // GamesArray.isMoneyLineSelect1 = false;
    // GamesArray.isMoneyLineSelect2 = false;
    // GamesArray.isTotalSelect1 = false;
    // GamesArray.isTotalSelect2 = false;
    // GamesArray.isSpreadSelect1 = false;
    // GamesArray.isSpreadSelect2 = false;
    // GamesArray.isMoneyLineDraw = false;
 
   // return;
    // setTimeout(function(){
    //   //that.DialogClose(GamesArray, index)
    //   that.setState({ dialogVisible: true })
    // },400)
    
    }


    return (
      <View>
        <View style={[{ marginLeft: (GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'D')? '35%' : GamesArray.MasterCalcFlag == 'T' ? '52%' : '72%' }, styles.dialog_triangle]}></View>
        <View style={styles.dialog_container}>
          {/* --------------------- dialog checkbox  ---------------- */}

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '47%', height:30, flexDirection: 'row' }}>
              {/* <CheckBox
                title='PUBLIC BET'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.checkedMoneyLinePublic}
                checkedColor='#999999'
                size={20}
                textStyle={styles.dialog_chackbox_text_style}
                containerStyle={styles.dialog_chackbox_container}
                onPress={() => { this.MoneyLineRadioPublicButton() }}
              />
              <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 12, marginLeft: 1 }}>
                <View style={[styles.dialog_chackbox_info_container]}>
                  <Text style={[styles.titleStyle, styles.dialog_chackbox_info_text_style]}>i</Text>
                </View>
              </View> */}
            </View>

            <View style={{ width: '47%',height:30, flexDirection: 'row' }}>
              {/* <CheckBox
                title='PRIVATE BET'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.checkedMoneyLinePrivate}
                checkedColor='#999999'
                size={20}
                textStyle={styles.dialog_chackbox_text_style}
                containerStyle={styles.dialog_chackbox_container}
                onPress={() => { this.MoneyLineRadioPrivateButton() }}
              />
              <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 12, marginLeft: 1 }}>
                <View style={[styles.dialog_chackbox_info_container]}>
                  <Text style={[styles.titleStyle, styles.dialog_chackbox_info_text_style]}>i</Text>
                </View>
              </View> */}
            </View>

            <TouchableWithoutFeedback onPress={() => this.DialogClose(GamesArray, index)}>
              <View style={{ width: '4%', marginTop: 5 }}>
                <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10 }}></Image>
              </View>
            </TouchableWithoutFeedback>

          </View>

          {/* --------------------- dialog middle text  ---------------- */}


          <View style={styles.dialogue_text_label_container}>
            {this.state.checkedMoneyLinePrivate ?
              <Text style={styles.dialogue_main_text_label}>You are betting {GamesArray.MasterCalcFlag == 'D' && 'on'} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>Draw </Text>} <Text style={styles.dialogue_sub_text_label}>
                {GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'T' || GamesArray.MasterCalcFlag == 'S' || GamesArray.MasterCalcFlag == 'D'  ? (privateValue > 0 ? '+' : '-') : ''}{Math.abs(privateValue)}</Text> under <Text style={styles.dialogue_sub_text_label}>
                  {GamesArray.MasterCalcFlag == 'M' ? "Money Line" : GamesArray.MasterCalcFlag == 'T' ? 'Total' : GamesArray.MasterCalcFlag == 'D' ? 'Money Line' : 'Spread'}
                  {GamesArray.isTotalSelect1 == true ? " (Over)" : GamesArray.isTotalSelect2 == true ? " (Under)" : null}</Text> for <Text style={styles.dialogue_sub_text_label}>{title}</Text> {GamesArray.MasterCalcFlag == 'D' && <Text>Vs</Text>} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>{GamesArray.games.MATCH_UPS.away.title}</Text>}. </Text>
         
           :
              <Text style={styles.dialogue_main_text_label}> You are betting {GamesArray.MasterCalcFlag == 'D' && 'on'} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>Draw </Text>} <Text style={styles.dialogue_sub_text_label}>
                {GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'T' || GamesArray.MasterCalcFlag == 'S' || GamesArray.MasterCalcFlag == 'D' ? (value > 0 ? '+' : '-') : ''}{Math.abs(value)}</Text> under <Text style={styles.dialogue_sub_text_label}>
                  {GamesArray.MasterCalcFlag == 'M' ? "Money Line" : GamesArray.MasterCalcFlag == 'T' ? 'Total' : GamesArray.MasterCalcFlag == 'D' ? 'Money Line' : 'Spread'}
                  {GamesArray.isTotalSelect1 == true ? " (Over)" : GamesArray.isTotalSelect2 == true ? " (Under)" : null}</Text> for <Text style={styles.dialogue_sub_text_label}>{title}</Text> {GamesArray.MasterCalcFlag == 'D' && <Text>Vs</Text>} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>{GamesArray.games.MATCH_UPS.away.title}</Text>} . </Text>
      
            }
            </View>


          <View>
            <View style={{ flexDirection: 'row', width: '100%', marginTop: 3 }}>

              {/* --------------------- dialog text input column  ---------------- */}

              <View style={{ flexDirection: 'column', width: '50%' }}>
                <View style={[styles.dialog_text_input_container, { flexDirection: 'row' }]}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../../images/bucks.png')} style={{ height: 10, width: 10, marginLeft: 3 }} />
                  </View>
                  <TextInput
                    value={this.state.betammount}
                   // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag) }}
                    onChange={(e:any)=>{this.state.checkedMoneyLinePrivate ? this.handleKeyDown(e, privateValue, "BA", GamesArray.MasterCalcFlag):this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag)}}
                    onFocus={this.handleFocusBA}
                    clearTextOnFocus={true}
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={{ padding: 8, paddingLeft: 4, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '80%' }}
                    placeholder={this.state.contesttype=='free_to_play_contest'?'Enter Bet Amount':'Enter Bet Amount'}
                    placeholderTextColor={this.state.focuseBet ? 'black' : '#a6a6a6'}
                  />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={[{ marginBottom: 8 }, styles.dialog_or_text]}>  __ </Text>
                  <Text style={styles.dialog_or_text}>  OR </Text>
                  <Text style={[{ marginBottom: 8 }, styles.dialog_or_text]}>  __ </Text>
                </View>

                <View style={[styles.dialog_text_input_container, { flexDirection: 'row' }]}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../../images/bucks.png')} style={{ height: 10, width: 10, marginLeft: 3 }} />
                  </View>
                  <TextInput
                    value={this.state.amounttowin}
                   // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("ATW") : this.handleKeyDown(e, value, "ATW", GamesArray.MasterCalcFlag) }}
                    
                     // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag) }}
                     onChange={(e:any)=>{this.state.checkedMoneyLinePrivate ? this.handleKeyDown(e, privateValue, "ATW", GamesArray.MasterCalcFlag):this.handleKeyDown(e, value, "ATW", GamesArray.MasterCalcFlag)}}
                    
                     onFocus={this.handleFocusAtW}
                    clearTextOnFocus={true}
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={{ padding: 8, paddingLeft: 4, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '92%' }}
                    placeholder={this.state.contesttype=='free_to_play_contest'?'Enter Amount to Win':'Enter Amount to Win'}
                    placeholderTextColor={this.state.focuseAmounttowin ? 'black' : '#a6a6a6'}
                  />
                </View>
              </View>

              {/* --------------------- dialog place bet column  ---------------- */}

              <View style={{ width: '50%' }}>
                <TouchableOpacity onPress={() => { this.showDialog(true, GamesArray) }}>
                  <View style={styles.dialog_place_bet_container}>
                    <Text style={{ paddingTop: 3, fontFamily: 'Montserrat-Bold', fontSize: hp(2.9), color: 'white' }} >
                      PLACE BET
                    </Text>
                    <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.8), color: 'black' }} >
                      {this.state.TitleofMoneylineDialog}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={require('../../../../images/BucksDark.png')} style={{ width: 10, height: 10 }}></Image>
                      <Text style={{ padding: 1, fontFamily: 'Montserrat-Bold', fontSize: hp(2.3), color: 'black', alignSelf: 'center' }}> {this.state.valueofMoneylineDialogShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </View >
    )
  }

  // getDialogue(GamesArray: any, index: any, value: any, title: any,privateValue:any) {

  //   return (
  //     <View>
  //       <View style={[{ marginLeft: GamesArray.MasterCalcFlag == 'M' ? '35%' : GamesArray.MasterCalcFlag == 'T' ? '52%' : '72%' }, styles.dialog_triangle]}></View>
  //       <View style={styles.dialog_container}>

  //         {/* --------------------- dialog checkbox  ---------------- */}

  //         <View style={{ flexDirection: 'row', width: '100%' }}>
  //           <View style={{ width: '47%', flexDirection: 'row' }}>
  //             <CheckBox
  //               title='PUBLIC BET'
  //               checkedIcon='dot-circle-o'
  //               uncheckedIcon='circle-o'
  //               checked={this.state.checkedMoneyLinePublic}
  //               checkedColor='#999999'
  //               size={20}
  //               textStyle={styles.dialog_chackbox_text_style}
  //               containerStyle={styles.dialog_chackbox_container}
  //               onPress={() => { this.MoneyLineRadioPublicButton() }}
  //             />
  //             <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 12, marginLeft: 1 }}>
  //               <View style={[styles.dialog_chackbox_info_container]}>
  //                 <Text style={[styles.titleStyle, styles.dialog_chackbox_info_text_style]}>i</Text>
  //               </View>
  //             </View>
  //           </View>

  //           <View style={{ width: '47%', flexDirection: 'row' }}>
  //             <CheckBox
  //               title='PRIVATE BET'
  //               checkedIcon='dot-circle-o'
  //               uncheckedIcon='circle-o'
  //               checked={this.state.checkedMoneyLinePrivate}
  //               checkedColor='#999999'
  //               size={20}
  //               textStyle={styles.dialog_chackbox_text_style}
  //               containerStyle={styles.dialog_chackbox_container}
  //               onPress={() => { this.MoneyLineRadioPrivateButton() }}
  //             />
  //             <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 12, marginLeft: 1 }}>
  //               <View style={[styles.dialog_chackbox_info_container]}>
  //                 <Text style={[styles.titleStyle, styles.dialog_chackbox_info_text_style]}>i</Text>
  //               </View>
  //             </View>
  //           </View>

  //           <TouchableWithoutFeedback onPress={() => this.DialogClose(GamesArray, index)}>
  //             <View style={{ width: '4%', marginTop: 5 }}>
  //               <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10 }}></Image>
  //             </View>
  //           </TouchableWithoutFeedback>

  //         </View>

  //         {/* --------------------- dialog middle text  ---------------- */}


  //         <View style={styles.dialogue_text_label_container}>
  //           <Text style={styles.dialogue_main_text_label}> You are betting <Text style={styles.dialogue_sub_text_label}>
  //             {GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'T' || GamesArray.MasterCalcFlag == 'S' ? (value > 0 ? '+' : '-') : ''}{Math.abs(value)}</Text> under <Text style={styles.dialogue_sub_text_label}>
  //               {GamesArray.MasterCalcFlag == 'M' ? "Money Line" : GamesArray.MasterCalcFlag == 'T' ? 'Total' : 'Spread'}
  //               {GamesArray.isTotalSelect1 == true ? " (Over)" : GamesArray.isTotalSelect2 == true ? " (Under)" : null}</Text> for <Text style={styles.dialogue_sub_text_label}>{title}</Text> . </Text>
  //         </View>


  //         <View>
  //           <View style={{ flexDirection: 'row', width: '100%', marginTop: 3 }}>

  //             {/* --------------------- dialog text input column  ---------------- */}

  //             <View style={{ flexDirection: 'column', width: '50%' }}>
  //               <View style={[styles.dialog_text_input_container, { flexDirection: 'row' }]}>
  //                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  //                   <Image source={require('../../../../images/bucks.png')} style={{ height: 10, width: 10, marginLeft: 3 }} />
  //                 </View>
  //                 <TextInput
  //                   value={this.state.betammount}
  //                   onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag) }}
  //                   onFocus={this.handleFocusBA}
  //                   clearTextOnFocus={true}
  //                   keyboardType='numeric'
  //                   returnKeyType='done'
  //                   style={{ padding: 8, paddingLeft: 4, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '80%' }}
  //                   placeholder='Enter Bet Amount'
  //                   placeholderTextColor={this.state.focuseBet ? 'black' : '#a6a6a6'}
  //                 />
  //               </View>

  //               <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
  //                 <Text style={[{ marginBottom: 8 }, styles.dialog_or_text]}>  __ </Text>
  //                 <Text style={styles.dialog_or_text}>  OR </Text>
  //                 <Text style={[{ marginBottom: 8 }, styles.dialog_or_text]}>  __ </Text>
  //               </View>

  //               <View style={[styles.dialog_text_input_container, { flexDirection: 'row', }]}>
  //                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  //                   <Image source={require('../../../../images/bucks.png')} style={{ height: 10, width: 10, marginLeft: 3 }} />
  //                 </View>
  //                 <TextInput
  //                   value={this.state.amounttowin}
  //                   onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("ATW") : this.handleKeyDown(e, value, "ATW", GamesArray.MasterCalcFlag) }}
  //                   onFocus={this.handleFocusAtW}
  //                   clearTextOnFocus={true}
  //                   keyboardType='numeric'
  //                   returnKeyType='done'
  //                   style={{ padding: 8, paddingLeft: 4, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '92%' }}
  //                   placeholder='Enter Amount to Win'
  //                   placeholderTextColor={this.state.focuseAmounttowin ? 'black' : '#a6a6a6'}
  //                 />
  //               </View>
  //             </View>


  //             {/* --------------------- dialog place bet column  ---------------- */}

  //             <View style={{ width: '50%' }}>
  //               <TouchableOpacity onPress={() => { this.showDialog(true, GamesArray) }}>
  //                 <View style={styles.dialog_place_bet_container}>
  //                   <Text style={{ paddingTop: 3, fontFamily: 'Montserrat-Bold', fontSize: hp(2.9), color: 'white' }} >
  //                     PLACE BET
  //                   </Text>
  //                   <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.8), color: 'black' }} >
  //                     {this.state.TitleofMoneylineDialog}
  //                   </Text>
  //                   <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
  //                     <Image source={require('../../../../images/BucksDark.png')} style={{ width: 10, height: 10 }}></Image>
  //                     <Text style={{ padding: 1, fontFamily: 'Montserrat-Bold', fontSize: hp(2.3), color: 'black', alignSelf: 'center' }} > {this.state.valueofMoneylineDialogShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
  //                     </Text>
  //                   </View>
  //                 </View>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </View>

  //       </View>
  //     </View>
  //   )
  // }

  getBetAFriendDialogue(games: any, index: any) {

    let data2 = [{
      value: '3/1',
    }, {
      value: '3/2',
    }, {
      value: '3/3',
    }];



    return (
      <View>
        <View style={{ height: 0, width: 0, borderLeftWidth: 8, borderLeftColor: 'transparent', borderRightWidth: 8, borderRightColor: 'transparent', borderBottomWidth: 12, borderBottomColor: 'white', marginLeft: '87%', backgroundColor: 'transparent' }}></View>

        <View style={{ backgroundColor: 'white', marginLeft: 8, marginRight: 8, marginBottom: 8, borderRadius: 5 }}>
          <View style={{ flexDirection: 'row', width: '100%', }}>
            <View style={{ width: '48%',height:30, flexDirection: 'row' }}>
              {/* <CheckBox
                title='PUBLIC BET'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.checkedBetPP}
                checkedColor='#999999'
                size={20}
                textStyle={styles.dialog_chackbox_text_style}
                containerStyle={styles.dialog_chackbox_container}
                onPress={() => { this.BetRadioToggle('P1') }}
              />
              <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 12, marginLeft: 1 }}>
                <View style={[styles.dialog_chackbox_info_container]}>
                  <Text style={[styles.titleStyle, styles.dialog_chackbox_info_text_style]}>i</Text>
                </View>
              </View> */}
            </View>

            <View style={{ width: '48%',height:30, flexDirection: 'row' }}>
              {/* <CheckBox
                title='PRIVATE BET'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={!this.state.checkedBetPP}
                checkedColor='#999999'
                size={20}
                textStyle={styles.dialog_chackbox_text_style}
                containerStyle={styles.dialog_chackbox_container}
                onPress={() => { this.BetRadioToggle('P2') }}
              />
              <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 12, marginLeft: 1 }}>
                <View style={[styles.dialog_chackbox_info_container]}>
                  <Text style={[styles.titleStyle, styles.dialog_chackbox_info_text_style]}>i</Text>
                </View>
              </View> */}
            </View>

            <TouchableWithoutFeedback onPress={() => this.DialogClose(games, index)}>
              <View style={{ width: '4%', marginTop: 5 }}>
                <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10 }}></Image>
              </View>
            </TouchableWithoutFeedback>

          </View>

          <View style={{ backgroundColor: '#eeeeee', borderColor: '#eeeeee', borderWidth: 5, borderRadius: 3, flexDirection: 'column' }}>

            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => { this.betselect('P') }}>
                  <Text style={[styles.selectText, { color: this.state.SelectedBetOption == 'P' ? '#68bcbc' : '#767676', textDecorationLine: this.state.SelectedBetOption == 'P' ? 'underline' : 'none' }]}>
                    Select a prop bet
                    </Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => { this.betselect('C') }}>
                  <Text style={[styles.selectText, { color: this.state.SelectedBetOption == 'C' ? '#68bcbc' : '#767676', textDecorationLine: this.state.SelectedBetOption == 'C' ? 'underline' : 'none' }]}>
                    Create a custom bet
                    </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View>

              {this.state.SelectedBetOption == 'P' ? (this.state.Bet_Question_array.length > 0 ?

                <FlatList
                  data={this.state.Bet_Question_array}
                  extraData={this.state}
                  keyExtractor={(item: any, index) => index.toString()}
                  bounces={false}
                  renderItem={({ item, index }: any) => {
                    if (index == this.state.selecteValue) {
                      item.isselected = true
                    }
                    return (
                      <View>
                        {item.isselected == true ?

                          <View style={{ backgroundColor: 'white', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3 }}>

                            <View style={{ flexDirection: 'row', width: '100%' }}>
                              <TouchableWithoutFeedback onPress={() => { this.BetQuestion(item, index, 'M') }}>
                                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                  <Image source={require('../../../../images/gray-arrow.png')} style={{ height: 20, width: 20 }} />
                                </View>
                              </TouchableWithoutFeedback>

                              <View style={{ width: '80%', flexDirection: 'column', paddingVertical: 15 }}>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                  <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.4) }}>
                                    {index + 1}. <Text style={{ fontFamily: 'Montserrat-Medium' }}>{item.question}</Text>
                                  </Text>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 5 }}>
                                  <View style={{ width: '50%', alignItems: 'center' }}>
                                    <TouchableWithoutFeedback onPress={() => { this.CheckClick(item, 'O') }}>
                                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                          this.state.selectedPropBetOptions == 'O' ?
                                            <Image source={require('../../../../images/Check_Box_New.png')} style={{ height: 10, width: 10 }} />
                                            : null
                                        }
                                        <Text style={[styles.PopoptionText, { color: this.state.selectedPropBetOptions == 'O' ? '#3A3A3A' : '#A3A3A3' }]}> Over  {item.total}  ({item.over > 0 ? '+' : ''}{item.over})</Text>
                                      </View>
                                    </TouchableWithoutFeedback>
                                  </View>
                                  <View style={{ width: '50%', alignItems: 'center' }}>
                                    <TouchableWithoutFeedback onPress={() => { this.CheckClick(item, 'U') }}>
                                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                          this.state.selectedPropBetOptions == 'U' ?
                                            <Image source={require('../../../../images/Check_Box_New.png')} style={{ height: 10, width: 10 }} />
                                            : null
                                        }
                                        <Text style={[styles.PopoptionText, { color: this.state.selectedPropBetOptions == 'U' ? '#3A3A3A' : '#A3A3A3' }]}> Under  {item.total} ({item.under > 0 ? '+' : ''}{item.under})</Text>
                                      </View>
                                    </TouchableWithoutFeedback>

                                  </View>
                                </View>
                              </View>

                              <TouchableWithoutFeedback onPress={() => { this.BetQuestion(item, index, 'P') }} >
                                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                  <Image source={require('../../../../images/gray-arrow-right.png')} style={{ height: 20, width: 20 }} />
                                </View>
                              </TouchableWithoutFeedback>

                            </View>

                          </View>
                          : null}
                      </View>
                    )
                  }}
                />
                :
                <View>
                  {this.noqueData == true ?
                    <View style={{ width: '100%', height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: '#68bcbc', fontSize: hp(2.5), paddingVertical: 5, justifyContent: 'center', fontFamily: 'Montserrat-Bold' }}>
                        No Props Available.
                      </Text>
                    </View>
                    : null}
                </View>
              ) : null}

              {this.state.SelectedBetOption == 'C' ?
                <View>
                  <View style={{ backgroundColor: 'white', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3 }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      <View style={{ width: '50%', }}>
                        <TextInput
                          value={this.state.amounttowin}
                          style={{ padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), }}
                          placeholder='Write in your custom bet!'
                          placeholderTextColor={'#888888'}
                        />
                      </View>
                      <View style={{ width: '50%', flexDirection: 'column', borderLeftColor: '#cfcfcf', borderLeftWidth: 1 }}>
                        <TextInput
                          value={this.state.amounttowin}
                          style={{ padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder='My answer is...'
                          placeholderTextColor={'black'}
                        />
                        <TextInput
                          value={this.state.amounttowin}
                          style={{ padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder='Other answer is...'
                          placeholderTextColor={'#888888'}
                        />
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                          <Text style={{ padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.3), width: '65%', height: '100%', paddingTop: 12, backgroundColor: '#eeeeee' }}>ODDS</Text>
                          <Dropdown
                            containerStyle={{ paddingLeft: 8, margin: 0, borderBottomWidth: 0, justifyContent: "center", paddingBottom: 0, width: '35%', backgroundColor: '#eeeeee' }}
                            dropdownOffset={{ top: 0, left: 0 }}
                            dropdownMargins={{ min: 0, max: 0 }}
                            dropdownPosition={-4.2}
                            itemTextStyle={{ paddingLeft: 8, fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }}
                            data={data2}
                            fontSize={hp(1.6)}
                            value={''}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                : null}
            </View>
          </View>


          <View>
            <View style={{ flexDirection: 'row', width: '100%', marginTop: 3 }}>
              <View style={{ flexDirection: 'column', width: '50%' }}>
                <View style={{ marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 2 }}>
                  <TouchableOpacity onPress={() => { this.showMoreDialog(true) }}>
                    <View style={{ backgroundColor: '#dddddd', borderColor: '#cccccc', borderWidth: 2, borderRadius: 5 }}>
                      <Text style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), color: '#68bcbc' }}>See full list of prop bets.</Text>
                    </View>
                  </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderColor: '#666666', borderRadius: 5, borderWidth: 2, marginLeft: 5, marginBottom: 5, marginRight: 5, marginTop: 1, paddingTop: 6, paddingBottom: 6 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                    <Image source={require('../../../../images/BucksDark.png')} style={{ width: 10, height: 10 }}></Image>
                    <TextInput
                      value={this.state.betammount}
                      onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, this.state.selectedPropBetValue, "BA", 'P') }}
                      onFocus={this.handleFocusBA}
                      clearTextOnFocus={true}
                      keyboardType='default'
                      returnKeyType='done'
                      style={{ paddingHorizontal: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.6), width: '92%', paddingVertical: 2 }}
                      placeholder='Enter Bet Amount'
                      placeholderTextColor={this.state.focuseBet ? 'black' : '#a6a6a6'}
                    />
                  </View>
                </View>
              </View>
              <View style={{ width: '50%' }}>
                <TouchableOpacity onPress={() => { this.CustomBetDialog() }}>
                  <View style={{ backgroundColor: '#68bcbc', margin: 5, paddingVertical: 7, justifyContent: "center", alignItems: 'center', borderRadius: 2 }}>
                    <Text style={{ paddingTop: 3, fontFamily: 'Montserrat-Bold', fontSize: hp(2.9), color: 'white' }} >PLACE BET3</Text>
                    <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.8), color: 'black' }} > Amount to Win:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Image source={require('../../../../images/BucksDark.png')} style={{ width: 10, height: 10 }}></Image>
                      <Text style={{ padding: 1, fontFamily: 'Montserrat-Bold', fontSize: hp(2.3), color: 'black' }} > {this.state.valueofMoneylineDialogShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  loadMore(data: any) {
    if (data) {
      this.setState({ DataList: [] });
      var count = 1;
      this.setState({ startPage: count });
    } else {
      var count = parseInt(this.state.startPage) + 1
      console.log('count of ashish :', count)
      this.setState({ startPage: count });
    }
    //     if(this.state.settype=='PAST'){
    //       this.prev_next_dashboard_API_call(this.state.currentweekindex , 'S',count);
    //     }else if(this.state.settype=='NEXT'){
    //       this.prev_next_dashboard_API_call(this.state.currentweekindex , 'A',count);
    //     }else{
    //   if(this.state.showFighting){
    //      this.callMethod(this.state.selected_Legue_id, this.state.selecteValue,count);
    //   }else if(this.state.showSoccer){
    //     this.callMethod(this.state.selected_Legue_id, this.state.selectedSoccerValue,count);
    //   }else if(this.state.showAutoRacing){
    //     this.callMethod(this.state.selected_Legue_id, this.state.selectedAutoRacingValue,count);      
    //   }else if(this.state.showHorseRacing){
    //     this.callMethod(this.state.selected_Legue_id, this.state.selectedHorseRacingValue,count);
    //   }else{
    this.callMethod(count);
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
closeDetailModal() {
  this.setState({ contestdetail: !this.state.contestdetail });
}

openDetailmodel(value:any){
this.setState({ contestdetailid:value});
this.setState({ contestdetail: !this.state.contestdetail });
}
closeConfirm(){
  this.setState({ dialogVisible: false })
  if(this.state.contesttype=='free_to_play_contest' &&  this.state.contestdata.bankroll=='N')
    {
    this.DialogClose(this.state.selectedItem, this.state.eventindex)
    }else{
      console.log('hhh')
    }
}
goinfo() {
  this.props.navigation!.navigate(AppScreens.G_InfochartView, this.props)
}
  render() {

    let BetFilterData = [{
      value: 'Date Added',
    }, {
      value: 'Match Game',
    },
    {
      value: 'Player Name',
    }];



    return (
      <Container
        title={ProfilePageContent.page_title}
        isHeader={true}
        isSubHeader={true}
        isTitle={false}
        showIndicator={false}
        menuIconListener={this}
        accountNameListener={this}
        availableBalanceListener={this}
        openPlaysListener={this}
        coveredPlaysListener={this}
        LogoIconListener={this}
        isSetting={false}
        showOverlay={this.state.showOverlayGameSelectionFlag}>


        <ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />


        {/* -------------------------------- Feedback Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.FeedbackDialogue}
          title=""
          onTouchOutside={() => this.setState({ FeedbackDialogue: false })} >

          <View style={{ backgroundColor: "white" }}>
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




            <View style={{ justifyContent: "center" }} >


              <View style={{ justifyContent: "center", padding: 8, paddingHorizontal: 15 }}>

                <View style={{ padding: 1, borderColor: '#dddddd', borderWidth: 1, marginTop: 5, }}>
                  <TextInput
                    value={this.state.FeedbackSubject}
                    onChangeText={(text) => this.setState({ FeedbackSubject: text })}
                    onFocus={() => this.setState({ FeedbackSubject: '' })}
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
                    onFocus={() => this.setState({ FeedbackMsg: '' })}
                    placeholder='Message'
                    placeholderTextColor={'#666666'}
                    style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}
                    multiline={true}
                  />
                </View>


                <BigButton title="Submit"
                  style={{ width: '40%', marginTop: hp(1.0), paddingTop: hp(0.4), paddingBottom: hp(0.4), paddingLeft: hp(2.0), paddingRight: hp(2.0), backgroundColor: '#68bcbc', alignSelf: 'flex-end' }}
                  textStyle={{ fontSize: hp(2.0), textAlign: 'center', color: 'white' }}
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



        {/* -------------------------------- Bet Placed Status Dialogue --------------------------------*/}

        <Dialog
          visible={this.state.MatchEventDialog}
          title=""
          onTouchOutside={() => this.setState({ guestUserDialog: false })} >

          <View style={{ backgroundColor: "white" }}>

            <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
                Can't place a bet
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>

              <View style={{ width: '90%' }}>
                <BigButton title="OK" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                  listener={() => { this.setState({ MatchEventDialog: false }) }} />
              </View>
            </View>
          </View>
        </Dialog>



        {/* -------------------------------- Guest User Dialogue --------------------------------*/}
        <Dialog
         // visible={this.state.guestUserDialog}
          title=""
          onTouchOutside={() => this.setState({ guestUserDialog: false })} >

          <View style={{ backgroundColor: "white" }}>

            <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
                {Messgae.Guest_Msg}
                  </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <View style={{ width: '46%' }}>
                <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                  listener={() => { this.setState({ guestUserDialog: false }) }} />
              </View>
              <View style={{ width: '4%' }}></View>
              <View style={{ width: '46%' }}>
                <BigButton title="OK" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                  listener={() => { this.logoutButtonPressed() }} />
              </View>
            </View>
          </View>
        </Dialog>
        {this.state.guestUserDialog?<Guestdialog detailmodel={this.state.guestUserDialog} onDismiss={() => {
                  this.closeModal();
                }} onClick={() => {
                    this.loginButtonPressed();
                  }}/>:null}


        {/* -------------------------------- UNCOVERED ACTION Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.dialogmoreprocess}
          title=""
          dialogStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
          contentStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
          onTouchOutside={() => this.setState({ dialogmoreprocess: false })} >


          <View style={styles.DialogMain}>
            <TouchableOpacity onPress={() => { this.UncoveredDialogClose() }}>
              <View style={[styles.CloseView,]}>
                <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12 }}></Image>
              </View>
            </TouchableOpacity>

            <View style={styles.DialogHeaderMain} >
              <Text style={styles.DialogHeaderText}> PROP BETS</Text>

              <View style={styles.DialogSubmain}>
                <View style={styles.SearchView}>
                  <SearchBox />
                </View>
                <View style={styles.FilterContainer}>
                  <Text style={styles.FilterText}> Filter by :  </Text>
                  <View style={[styles.FilterBox]}>
                    <View style={styles.searchBoxMainContainer}>
                      <View style={[styles.searchBoxContainer]}>
                        <Dropdown
                          containerStyle={[{ paddingLeft: 8, margin: 0, borderBottomWidth: 0, justifyContent: "center", width: '100%' }]}
                          dropdownOffset={{ top: 0, left: 0 }}
                          dropdownMargins={{ min: 0, max: 0 }}
                          dropdownPosition={-4.2}
                          itemTextStyle={{ paddingLeft: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.6), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }}
                          data={BetFilterData}
                          fontSize={hp(1.4)}
                          value={'Select option below'}
                          onChangeText={this.selectedbetoption}
                        />
                      </View>
                    </View>
                    <View style={styles.OkButtonContainer}>
                      <Text style={styles.OkButtonText}>OK</Text>
                    </View>
                  </View>
                </View>
                {this.state.BetDialogueNoData == false ?

                  <ScrollView
                    bounces={false}
                  >
                    <FlatList
                      extraData={this.state}
                      data={this.state.BetDialogueData}
                      keyExtractor={(item: any, index) => index.toString()}
                      bounces={false}
                      renderItem={({ item, index }: any) => {
                        var mainindex = index;
                        var dataArray = this.state.BetDialogueData;
                        var dataArraylength = this.state.BetDialogueData.length;
                        return (
                          <View style={styles.MatchGameMainContainer}>
                            <View style={styles.MatchGameContainer}>
                              <View style={styles.MainGameSubContainer}>
                                <Text style={[styles.MatchGameText,
                                {
                                  fontSize: item.title === 'Player:' ? hp(1.5) : hp(1.7),
                                  fontFamily: item.title === 'Player:' ? 'Montserrat-SemiBold' : 'Montserrat-Bold'
                                }]}>
                                  {item.title}
                                  {item.title === 'Player:' ?
                                    <Text>
                                      <Text style={[styles.MatchGameText, { fontSize: hp(1.7), fontFamily: 'Montserrat-Bold' }]}> {item.player_name}</Text>
                                      <Text style={[styles.MatchGameText, { fontSize: hp(1.2), fontFamily: 'Montserrat-SemiBold' }]}> ({item.team_name}) </Text>
                                    </Text>
                                    : null
                                  }
                                </Text>
                              </View>
                              <View style={styles.MatchGame}>
                                <Text style={styles.MatchGameSubText}> ({item.count} bets) </Text>
                              </View>
                            </View>

                            <View style={styles.RedLine}></View>



                            <FlatList
                              data={item.questons_array}
                              extraData={this.state}
                              keyExtractor={(item: any, index) => index.toString()}
                              bounces={false}
                              renderItem={({ item, index }: any) => {
                                var subindex = index;
                                return (
                                  <View style={{ height: 'auto', width: 'auto', backgroundColor: item.isselected == true ? '#eeeeee' : 'white' }}>
                                    <View style={[styles.QuestionContainerMain,]}>
                                      <View style={styles.QuestionContainer}>
                                        <View style={styles.SelectionContainer}>
                                          <CheckBox
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checked={item.isselected}
                                            checkedColor='#e2211c'
                                            size={22}
                                            containerStyle={{ backgroundColor: 'transparent' }}
                                            onPress={() => { this.selectedcheckkbox(dataArray, mainindex, subindex, dataArraylength) }} />
                                        </View>
                                        <View style={[styles.AnswerContainer]}>
                                          <Text style={[styles.AnswerText, { color: '#333333' }]}>{item.question} </Text>
                                        </View>
                                        <View style={{ backgroundColor: '#888888', width: 1, marginTop: 4, marginBottom: 4, marginLeft: 4 }}>
                                        </View>
                                        <View style={{ width: '32%', alignItems: 'flex-end', justifyContent: 'center' }}>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#68bcbc', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline', textDecorationColor: '#68bcbc', fontSize: 10 }}>
                                              {item.type == 'over' ? " Over: " + item.over : " Under: " + item.under}
                                            </Text>
                                          </View>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#000000', fontFamily: 'Montserrat-Bold', fontSize: 10 }}>
                                              {item.type != 'over' ? " Over: " + item.over : " Under: " + item.under}
                                            </Text>
                                          </View>

                                        </View>
                                      </View>
                                      <View style={{ backgroundColor: '#888888', height: 1, }}>
                                      </View>

                                    </View>


                                    {item.isselected == true ?
                                      <View style={styles.BetaDialogMain}>
                                        <View style={styles.BetdialogAnswerrow}>
                                          <View style={styles.BetdialogAnswerrow1}>
                                            <Text style={styles.AnswerOptions1}> Created by:</Text>
                                          </View>
                                          <View style={styles.BetdialogAnswerrow2}>
                                            <Text style={styles.AnswerOptions1}> Wager: </Text>
                                            <Text style={styles.Answeroptions2}> {item.bet_amount} </Text>
                                          </View>
                                        </View>
                                        <View style={styles.BetdialogAnswerrow}>
                                          <View style={styles.BetdialogAnswerrow1}>
                                            <Text style={[styles.Answeroptions2,
                                            { textDecorationLine: 'underline', textDecorationColor: '#888888', color: '#333333', fontFamily: 'Montserrat-Bold' }]}> {item.create_by} </Text>
                                          </View>
                                          <View style={styles.BetdialogAnswerrow2}>
                                            <Text style={styles.AnswerOptions1}> Open Amount: </Text>
                                            <Text style={styles.Answeroptions2}> ${item.bet_amount} </Text>
                                          </View>
                                        </View>

                                        <View style={styles.MyAnswerContainer}>
                                          <View style={[styles.searchBoxMainContainer, { flexDirection: 'row', borderRadius: 5, borderWidth: 1, borderColor: '#68bcbc' }]}>
                                            <View style={styles.searchBoxContainer}>
                                              <TextInput
                                                style={styles.inputTextStyle}
                                                placeholder={"No, there won't be an OT"}
                                                placeholderTextColor='#333333'
                                              />
                                            </View>
                                            <View style={{ width: '30%', alignItems: 'flex-end' }}>
                                              <Text style={{ color: '#888888', fontFamily: 'Montserrat-Regular', fontSize: 9, textDecorationColor: '#888888', textDecorationLine: 'underline' }}> 34 people   </Text>
                                              <Text style={{ color: '#888888', fontFamily: 'Montserrat-Regular', fontSize: 9, textDecorationColor: '#888888', textDecorationLine: 'underline' }}> took this bet   </Text>
                                            </View>
                                          </View>
                                        </View>

                                        <View style={styles.EnterAmountOption}>
                                          <View style={[styles.searchBoxMainContainer, { flexDirection: 'row', borderRadius: 5, borderColor: '#888888', borderWidth: 1, height: 30 }]}>
                                            <View style={[styles.searchBoxContainer, { width: '90%' }]}>
                                              <TextInput
                                                style={styles.inputTextStyle}
                                                placeholder={'$ Enter bet amount'}
                                                placeholderTextColor='#333333' />
                                            </View>
                                            <View style={{ width: '10%', alignItems: 'center', }}>
                                              <Image source={require('../../../../images/light_close.png')} style={{ height: 12, width: 12 }}></Image>
                                            </View>
                                          </View>

                                        </View>


                                        <View style={[styles.place_bet_container]}>
                                          <View style={{ backgroundColor: '#e18804', width: '40%', justifyContent: 'center', alignItems: 'center', padding: 6, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, }}>
                                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), color: '#333333', }}>Payout:
                                                 <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), color: '#333333' }}>  $</Text>
                                              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), color: '#333333' }}>0.00</Text>
                                            </Text>
                                          </View>
                                          <View style={{ backgroundColor: '#ff9900', width: '60%', justifyContent: 'center', alignItems: 'center', padding: 6, borderTopRightRadius: 5, borderBottomRightRadius: 5, }}>
                                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.6), color: '#be0b07' }}>ACCEPT BET</Text>
                                          </View>
                                        </View>
                                      </View>
                                      :
                                      null
                                    }

                                  </View>
                                )
                              }} />
                          </View>
                        )
                      }}
                    />
                  </ScrollView>

                  :
                  <View style={{ backgroundColor: 'white', width: '100%', height: 250, justifyContent: 'center', alignItems: 'center' }}>
                    {this.state.BetDialogueNoData == true ?
                      <View>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.6), color: '#68bcbc' }}>No Data Found</Text>
                      </View>
                      : null}
                  </View>
                }
              </View>
            </View>
          </View>
        </Dialog>

        {/* -------------------------------- Share Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.shareDialog}
          title=""
          onTouchOutside={() => this.setState({ shareDialog: false })} >

          <View style={{ backgroundColor: "white" }}>

            <View style={{ justifyContent: "center" }} >

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '85%', paddingLeft: '15%' }}>
                  <Image source={require('../../../../images/udda_logo_white.png')} style={{ width: wp(30), height: wp(7), margin: 10, alignSelf: 'center' }} resizeMode='contain' />
                </View>
                <View style={{ width: '15%' }}>
                  <TouchableWithoutFeedback onPress={() => { this.setState({ shareDialog: false }) }}>
                    <View>
                      <Image source={require('../../../../images/close.png')} style={{ height: 13, width: 13, alignSelf: 'flex-end', marginRight: 8, marginTop: 10 }}></Image>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>


              <View style={{ width: '100%', backgroundColor: '#cccccc', height: 1, marginTop: 1, padding: 0 }}></View>

              <View style={{ justifyContent: "center", padding: 10 }}>

                <Text style={{ padding: 1, fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.7), marginTop: 3, color: 'black' }}>Messege</Text>

                <View style={{ padding: 1, borderColor: '#cccccc', borderWidth: 1, marginTop: 5, }}>
                  {/* <Text style={{ padding: 8, width: '100%', height: 'auto' }}>{this.state.Share_Show_Msg}</Text> */}
                  <TextInput
                    // value={this.state.Share_Show_Msg}
                    multiline={true}
                    onChangeText={value => this.onChangeShareMsg(value)}
                    editable={true} style={{ padding: 8, width: '100%', height: 'auto' ,fontFamily: 'Montserrat-Regular',fontSize: hp(1.5)}}>{this.state.Share_Show_Msg}</TextInput>
                </View>
                <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.5), marginTop: 5, color: 'black' }}>
                  {this.state.MessageUrl}
                </Text>
                <BigButton title="Share Now" style={styles.verify_button} textStyle={styles.verify_button_text_style}
                  listener={() => { this.shareNow() }} />
                {/* <Text style={{ fontFamily: 'Montserrat-SemiBold', textAlign: 'center', fontSize: hp(1.5), marginTop: 5, color: 'red' }}>
                    {this.state.BetPromotionalMsg}
                  </Text> */}
              </View>
            </View>
          </View>
        </Dialog>


        {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.dialogVisible}
          title=""
          onTouchOutside={() => this.closeConfirm()} >
          <View style={{ backgroundColor: "tranparent", padding: '1%' }}>
            <TouchableOpacity onPress={() => {this.closeConfirm()  }}>
              <View style={{ alignItems: 'flex-end', width: '100%' }}>
                <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
              </View>
            </TouchableOpacity>

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} >
              <Text style={{ padding: 1, fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: wp(4), color: 'black' }}>
                Are you sure you want to place this bet?
                  </Text>
              <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                listener={() => {
                  if (this.state.SelectedBetOption == 'P' || this.state.SelectedBetOption == 'C') {
                    this.props_place_bet_API(this.state.selectedPropsItem, this.state.selectedPropBetOptions);
                  }
                  else {
                    this.callBetAFriendAPI(this.state.selectedItem)
                  }
                }} />
            </View>
          </View>
        </Dialog>


        {/* -------------------------------- Bet a Friend Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.isBetaFriendSelect}
          title=""
          onTouchOutside={() => this.setState({ isBetaFriendSelect: false })} >
          <View style={{ backgroundColor: "white" }}>
            <TouchableOpacity onPress={() => { this.setState({ dialogVisible: false }) }}>
              <View style={{ alignItems: 'flex-end', width: '100%', padding: 10, paddingBottom: 0 }}>
                <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
              </View>
            </TouchableOpacity>

            <View style={{ justifyContent: "center", alignItems: "center", width: '100%' }}>
              <Text style={styles.DialogHeaderText}> BET A FRIEND </Text>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Text style={{ width: '85%', fontSize: hp(1.9), color: '#68bcbc', fontFamily: 'Montserrat-SemiBold', marginLeft: 10 }}> Select a prop bet</Text>
                <TouchableWithoutFeedback onPress={() => { this.betselect('P') }}>
                  <View style={{ width: '15%', }}>
                    <Image source={require('../../../../images/More_Icon.png')} style={{ height: 20, width: 20 }}></Image>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.vertical_line}></View>
              {this.state.SelectedBetOption == 'P' ?
                <View style={[styles.flatlist_main_container, { marginBottom: 20 }]}>
                  <FlatList
                    key={this.state.BetDialogQue.length}
                    extraData={this.state}
                    data={this.state.BetDialogQue}
                    keyExtractor={(item: any, index) => index.toString()}
                    bounces={false}
                    renderItem={({ item, index }: any) => {
                      return (
                        <View style={styles.flatlist_checkboc_container}>
                          <CheckBox
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={item.checked}
                            checkedColor='#e2211c'
                            size={20}
                            containerStyle={{ backgroundColor: 'white' }}
                            onPress={() => { }} />
                          <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-Medium' }}>{item.Question}</Text>
                          </View>
                        </View>
                      )
                    }} />
                  <View style={{ backgroundColor: '#dedede', padding: 10, }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                      <View style={[styles.over_under_button_container, { marginRight: 5, borderBottomColor: '#b2b2b2', borderRightColor: '#b2b2b2', borderBottomWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={{ fontSize: hp(1.6), color: '#333333', fontFamily: 'Montserrat-SemiBold' }}>
                          Over 0.5 <Text style={{ fontFamily: 'Montserrat-Regular' }}>+165</Text>
                        </Text>
                      </View>

                      <View style={[styles.over_under_button_container, { borderBottomColor: '#68bcbc', borderRightColor: '#68bcbc', borderBottomWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={{ fontSize: hp(1.6), color: '#68bcbc', fontFamily: 'Montserrat-SemiBold' }}>
                          Under 0.5 <Text style={{ fontFamily: 'Montserrat-Regular' }}>-165</Text>
                        </Text>
                      </View>
                    </View>

                    <View style={styles.second_container}>
                      <View style={styles.Input_container}>
                        <TextInput
                          value={this.state.betammount}
                          onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, '', "BA", '') }}
                          onFocus={this.handleFocusBA}
                          clearTextOnFocus={true}
                          keyboardType='default'
                          returnKeyType='done'
                          style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '96%', paddingVertical: 2 }}
                          placeholder='$ Enter bat to Win'
                          placeholderTextColor={this.state.focuseBet ? 'black' : '#888888'}
                        />
                        <Image source={require('../../../../images/close_icon.png')} style={[{ right: 2 }, styles.dialog_text_close_img]}></Image>
                      </View>

                      <View style={styles.place_bet_container}>
                        <View style={{ backgroundColor: '#e18804', width: '40%', paddingVertical: 8, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 6 }}>
                          <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.2), color: '#333333' }}>Payout:</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333' }}>$</Text>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), color: '#333333' }}>0.00</Text>
                          </View>

                        </View>
                        <View style={{ backgroundColor: '#68bcbc', width: '60%', borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.6), color: 'white' }}>PLACE BET4</Text>
                        </View>
                        <View style={styles.dialog_triangle2}></View>
                      </View>
                    </View>
                  </View>
                </View>
                : null}

              <View style={{ flexDirection: 'row', width: '100%', marginTop: this.state.SelectedBetOption == 'P' ? 2 : 10 }}>
                <Text style={{ width: '85%', fontSize: hp(1.9), color: '#68bcbc', fontFamily: 'Montserrat-SemiBold', marginLeft: 10 }}> Create a custom bet</Text>
                <TouchableWithoutFeedback onPress={() => { this.betselect('C') }}>
                  <View style={{ width: '15%', }}>
                    <Image source={require('../../../../images/More_Icon.png')} style={{ height: 20, width: 20 }}></Image>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.vertical_line}></View>

              {this.state.SelectedBetOption == 'C' ?
                <View style={{ backgroundColor: '#dddddd', padding: 10 }}>

                </View>
                : null}
              <View style={styles.seeuncover_button_container}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), color: '#68bcbc' }}>See Uncovered Actions</Text>
              </View>
            </View>
          </View>
        </Dialog>


        <View style={styles.scrollContent}>

          <View style={[styles.mainContent, { width: '100%' }]}>


            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop:this.state.contesttype=='free_to_play_contest'?0: 10 }}>
              <View style={{width:'100%',justifyContent:'center',flexDirection:'row'}}>
              {this.state.contesttype=='free_to_play_contest'?null:<View style={{width:'9%',justifyContent:'center'}}> 
              <Icons name="arrow-back" size={30} color="black" 
                            onPress={() => RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)}
                            // onPress={() => this.props.navigation.goBack(null)}
                             />
              </View>}
              <View style={{borderColor: this.state.contesttype=='free_to_play_contest'?'':'black', borderWidth: this.state.contesttype=='free_to_play_contest'?0:1,width:this.state.contesttype=='free_to_play_contest'?'100%':'90%',flexDirection:'row',backgroundColor:this.state.contesttype=='free_to_play_contest'?'#CCCCCC':''}}>
             {this.state.contesttype=='free_to_play_contest' && <View style={{width:'9%',justifyContent:'center'}}> 
              <Icons name="arrow-back" size={30} color="black" 
                 onPress={() => RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)}
                            // onPress={() => this.props.navigation.goBack(null)}
                             />
              </View>}
              <View style={{  width:this.state.contesttype=='free_to_play_contest'? '76%':'100%', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: hp(1.7),marginLeft:this.state.contesttype=='free_to_play_contest'?20:0 }}>{this.state.ChallengeName}</Text>
                <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: hp(1.2),marginLeft:this.state.contesttype=='free_to_play_contest'?20:0 }}>{this.state.RegisterDate}-{this.state.EndDate}</Text>
                </View>
               {this.state.contesttype=='free_to_play_contest'? <View style={{width:'15%'}}>
                  <TouchableOpacity onPress={()=>{this.openDetailmodel(this.state.contestid)}} style={{ width: '100%' }}>
                <ImageBackground source={require('../../../../images/freetoplay.png')}
                                resizeMode='stretch'
                                style={{ width: '100%', height: 40 }}
                                >
                                 
                                </ImageBackground>
                                </TouchableOpacity>
                </View>:null}
              </View>
              </View>
              <TouchableOpacity onPress={() => {
                this.gotostandinglist()
              }}>
                <Text style={{ color: '#68bcbc', fontFamily: 'Montserrat-Bold', fontSize: hp(1.5), textDecorationLine: 'underline', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>VIEW CURRENT STANDINGS</Text>
              </TouchableOpacity>
            </View>


               { this.state.contesttype=='free_to_play_contest'?this.state.contestdata.bankroll=='Y'?<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ color: 'black', fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.7) }}><Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: hp(1.9) }}>{'('}</Text>{'Available Bankroll Amount: '}<Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: hp(1.9) }}>{this.state.contestdata.avaiable_bankroll_amount+')'}</Text></Text>
              </View>:null:null}

            <View style={{ flex: 1, }}>
              <View style={styles.titleContainer} >

                {/* --------------------- table titles  ---------------- */}
                <View style={styles.table_titles_container}>
                  <Text style={[styles.titleStyle, { width: '28%', justifyContent: 'center', alignItems: 'center' }]}>
                    MATCH UPS
                      </Text>

                  <View style={[{ width: '22%' }, styles.table_title_row_container]}>
                    <Text style={[styles.titleStyle]}>MONEY LINE </Text>
                    <View style={styles.table_title_info_container}>
                      <Text style={styles.table_title_info_text}> i </Text>
                    </View>
                  </View>

                  <View style={[{ width: '14%' }, styles.table_title_row_container]}>
                    <Text style={[styles.titleStyle]}>TOTAL </Text>
                    <View style={styles.table_title_info_container}>
                      <Text style={styles.table_title_info_text}> i </Text>
                    </View>
                  </View>

                  <View style={[{ width: '18%' }, styles.table_title_row_container]}>
                    <Text style={[styles.titleStyle]}>SPREAD </Text>
                    <View style={styles.table_title_info_container}>
                      <Text style={styles.table_title_info_text}> i </Text>
                    </View>
                  </View>

                  <View style={[{ width: '17%' }, styles.table_title_row_container]}>
                    <Text style={[styles.titleStyle]}>CUSTOM </Text>
                    <View style={styles.table_title_info_container}>
                      <Text style={styles.table_title_info_text}> i </Text>
                    </View>
                  </View>
                </View>
              </View>
             
              {/* --------------------- Flatlist ---------------- */}
              <View style={{ backgroundColor: 'white', height: '93%', marginBottom: 0, paddingBottom: 0, }}>
                {this.state.DataList.length > 0 ?
                  <FlatList
                    key={this.state.DataList.length}
                    extraData={this.state}
                    data={this.state.DataList}
                    keyExtractor={(item: any, index: any) => index.toString()}
                    bounces={false}
                    scrollEnabled={true}
                    ref={(re: any) => { this.ListView_Ref = re }}
                    renderItem={({ item, index }: any) => {
                      var ArrayLength = this.state.DataList.length;
                      var new_time_stamp = item.match_time_stamp * 1000;
                      var formated_time = moment(new_time_stamp).format('LT');
                      var Match_date: any = new Date(new_time_stamp).toString().split(' ');

                      var zonevalue: any = Match_date[6].toString();
                      var zone: any = zonevalue.substr(1, zonevalue.length - 2);
                      var counts = item.games.MATCH_UPS.away.counts;

                      // console.log("name" +item.games.MATCH_UPS.away.title + "counts" +counts)
                      return (
                        <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>
                          <View style={{ backgroundColor: '#999999' }}>
                            {/* --------------------- Date and game status---------------- */}
                            <View style={[styles.flatlist_title_row, { height: (this.isfontSize == 'font_small') ? 18 : ((this.isfontSize == 'font_small') ? 20 : 23) }]}>

                              <View style={{ flexDirection: 'row', alignItems: 'center', width: (this.isfontSize == 'font_small') ? wp(75) : ((this.isfontSize == 'font_medium') ? wp(65) : wp(60)), paddingLeft: 4 }}>
                                <Text style={[styles.flatlist_title, styles[this.isfontSize],{width:'70%'}]}>
                                  <Text style={{ textAlign: 'left', fontFamily: 'Montserrat-SemiBold' }}>
                                    {Match_date[0]} 
                                  </Text>
                                 
                                  <Text style={{ fontFamily: 'Montserrat-Regular' }}> {Match_date[1]} {Match_date[2]} </Text>
                                  <Text style={{ fontFamily: 'Montserrat-Regular' }}>{formated_time} {zone}</Text>
                                  {item.gameState == "FINAL" ? " - FINAL" : null}
                                  <Text style={{ fontFamily: 'Montserrat-Regular' }}>{item.gameState == 'STARTED' ? " (" + item.quarter + ")" : null}</Text>
                               {/*    <Text style={{textAlign:'center'}}>{item.league_name}</Text> */}
                                </Text>
                                <View style={{width:'30%'}}>
                                <Text style={[styles[this.isfontSize],{textAlign:'left',color: '#666666',fontFamily: 'Montserrat-SemiBold'}]}>{item.sport_league_name}</Text> 
                                </View>
                                {/* <Text style={{textAlign:'center',paddingRight:5,paddingLeft:5}}>{item.league_name}</Text> */}
                              </View>
                          
                              <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'flex-end' }}>
                                <View style={{ backgroundColor: 'transparent' }}>
                                  <View style={[{
                                    borderRadius: item.gameState == 'PENDING' || item.gameState == '' ? hp(0) : hp(1.5),
                                    borderWidth: item.gameState == 'PENDING' || item.gameState == '' ? 0 : 1,
                                    width: (this.isfontSize == 'font_small') ? hp(1.5) : ((this.isfontSize == 'font_small') ? hp(2.0) : hp(2.5)),
                                    height: (this.isfontSize == 'font_small') ? hp(1.5) : ((this.isfontSize == 'font_small') ? hp(2.0) : hp(2.5))
                                  }, styles.game_state_round_container]}>
                                    <View style={[{
                                      backgroundColor: item.gameState == 'PENDING' || item.gameState == '' ? '#888888' : 'orange', width: (this.isfontSize == 'font_small') ? hp(1) : ((this.isfontSize == 'font_small') ? hp(1.2) : hp(1.5)),
                                      height: (this.isfontSize == 'font_small') ? hp(1) : ((this.isfontSize == 'font_small') ? hp(1.2) : hp(1.5))
                                    }, styles.game_state_round]}>
                                    </View>
                                  </View>
                                </View>
                                <View style={{}}>
                                  
                                  <Text style={[{ color: item.gameState == 'PENDING' || item.gameState == '' ? '#888888' : '#68bcbc' }, styles.game_state_text, styles[this.isfontSize]]}> GAME STATS </Text>
                                </View>

                              </View>

                            </View>
                            {/* --------------------- table row ---------------- */}
                            <View style={[styles[this.isMainBlockHeight], { width: '100%', alignItems: 'center' }]}>

                              <View style={styles.flatlist_data_whole_row}>

                                <View style={[styles.flatlist_data_row_vertical_line, { backgroundColor: ((item.gameState == 'PENDING' || item.gameState == '' || item.gameState == ' ') ? '#68bcbc' : 'orange') }]}></View>
                                {item.league_id == '9' ? <View style={styles.flatlist_data_4column}>


                                  {/* --------------------- first soccer row ---------------- */}

                                  <View style={[styles.flatlist_data_row_height, styles[this.blockHeight], { borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                    <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                      <View style={{ flexDirection: 'row', width: '80%' }}> 
                                        <Text style={[styles[this.isfontSize], {
                                          fontFamily: 'Montserrat-Bold',
                                          color: '#68bcbc',
                                          paddingLeft: 2,
                                        }]} numberOfLines={2} >
                                          {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.home.t : item.games.MATCH_UPS.home.t}
                                        
                                        {/* <Text style={[styles.flatlist_matchup_text_style, styles[this.isfontSize], { fontFamily: 'Montserrat-Regular', }]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text> */}
                                      </Text>
                                      </View>
                                      {/*garima */}
                                      <View style={{width:'20%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                      <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                        {item.games.MATCH_UPS.home.counts}
                                      </Text>
                                      <Text style={[styles.flatlist_matchup_text_style,  { fontFamily: 'Montserrat-Regular',fontSize:10, fontWeight: 'normal', paddingRight: 4, width: '100%',textAlign: 'center',paddingLeft:0}]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text>
                                      </View>
                                    </View>

                                    <TouchableWithoutFeedback onPress={() => (item.games.MONEY_LINE.home.value == 0 || item.games.MONEY_LINE.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'M', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.MONEY_LINE.home.value == "N/A" ? '#888888' : item.isMoneyLineSelect2 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isMoneyLineSelect2 == true ? '#68bcbc' : '',
                                        borderWidth: item.isMoneyLineSelect2 == true ? 1 : 0,
                                        borderRightWidth: 1,
                                      }, styles.flatlist_moneyline_style]}>
                                        {/*   <Text style={[{ color: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {item.games.MONEY_LINE.home.value > 0 ? '+' : ''}{item.games.MONEY_LINE.home.value}
                                    </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.MONEY_LINE.home.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                          {/* {item.games.MONEY_LINE.home.flag && <Icon name="check" size={12} color="white" />} */}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >
                                          <Text style={[{ color: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                            {item.games.MONEY_LINE.home.value == "N/A" ? item.games.MONEY_LINE.home.value : item.games.MONEY_LINE.home.value > 0 ? '+' + item.games.MONEY_LINE.home.value : item.games.MONEY_LINE.home.value}

                                          </Text>
                                        </View>

                                      </View>
                                    </TouchableWithoutFeedback>


                                    <TouchableWithoutFeedback onPress={() => (item.games.TOTAL.home.value == 0 || item.games.TOTAL.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'T', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.TOTAL.home.value == "N/A" ? '#888888' : item.isTotalSelect2 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isTotalSelect2 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isTotalSelect2 == true ? '#68bcbc' : '',
                                        borderWidth: item.isTotalSelect2 == true ? 1 : 0,
                                        borderRightWidth: 1,
                                      }, styles.flatlist_total_style]}>
                                        {/*  <Text style={[{ color: item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      U {item.games.TOTAL.home.other_value} ({Math.sign(item.games.TOTAL.home.value) == +1 ? '+' : ''}{item.games.TOTAL.home.value})
                                    </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.TOTAL.home.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                          {/* {item.games.TOTAL.home.flag && <Icon name="check" size={12} color="white" />} */}

                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >
                                          <Text style={[{ color: item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text,{textAlign:'center'}]}>

                                            {item.games.TOTAL.home.value == "N/A" ? item.games.TOTAL.home.value : 'U ' + item.games.TOTAL.home.other_value + ' (' + (Math.sign(item.games.TOTAL.home.value) == +1 ? '+' : '') + '' + item.games.TOTAL.home.value + ')'}

                                          </Text>
                                        </View>



                                      </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => (item.games.SPREAD.home.value == 0 || item.games.SPREAD.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'S', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.SPREAD.home.value == "N/A" ? '#888888' : item.isSpreadSelect2 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isSpreadSelect2 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isSpreadSelect2 == true ? '#68bcbc' : '',
                                        borderWidth: item.isSpreadSelect2 == true ? 1 : 0,

                                        borderRightWidth: 1,
                                      }, styles.flatlist_spread_style]}>
                                        {/*  <Text style={[{ color: item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' : ''}{item.games.SPREAD.home.other_value} ({Math.sign(item.games.SPREAD.home.value) == +1 ? '+' : ''}{item.games.SPREAD.home.value})
                                    </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.SPREAD.home.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                          {/* {item.games.SPREAD.home.flag && <Icon name="check" size={12} color="white" />} */}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >
                                          <Text style={[{ color: item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                            {item.games.SPREAD.home.value == "N/A" ? item.games.SPREAD.home.value : (Math.sign(item.games.SPREAD.home.other_value) == 1 ? '+' + item.games.SPREAD.home.other_value : item.games.SPREAD.home.other_value) + ' (' + (Math.sign(item.games.SPREAD.home.value) == 1 ? '+' + item.games.SPREAD.home.value : item.games.SPREAD.home.value) + ')'}
                                            {/*  {Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' : ''}{item.games.SPREAD.home.other_value} ({Math.sign(item.games.SPREAD.home.value) == +1 ? '+' : ''}{item.games.SPREAD.home.value}) */}

                                          </Text>
                                        </View>

                                      </View>
                                    </TouchableWithoutFeedback>

                                  </View>
                                
                                  {(item.odds.ml_draw_price != 0 || item.odds.ml_draw_price != "") && <TouchableWithoutFeedback onPress={() => (item.odds.ml_draw_price == 0 || item.odds.ml_draw_price == "") ? null : this.getDialogueState2(item, index, 'D', ArrayLength)}>
                                    <View style={[{
                                      backgroundColor: item.isMoneyLineDraw != true ? '#68bcbc' : 'white',
                                      borderRightColor: item.isMoneyLineDraw != true ? 'white' : '#68bcbc',
                                      borderColor: item.isMoneyLineDraw == true ? '#68bcbc' : 'white',
                                      borderWidth: item.isMoneyLineDraw == true ? 1 : 1,

                                      position: 'absolute',
                                      top: '35%',
                                      left: '34.5%',
                                      zIndex: 1,
                                      width: '22%',
                                      flex: 1,
                                      height: 20,

                                    },styles[this.drawblockHeight]]}>

                                      <View style={[styles.flatlist_icon_style]} >
                                        {item.games.MONEY_LINE.draw.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                        {/* {item.games.MONEY_LINE.draw.flag && <Icon name="check" size={12} color="white" />} */}
                                      </View>
                                      <View style={[styles.flatlist_odd_style]} >
                                        <Text style={[{ color: item.isMoneyLineDraw != true ? '#FFF' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                          D {(item.odds.ml_draw_price > 0) ? '+' + item.odds.ml_draw_price : item.odds.ml_draw_price}

                                        </Text>
                                      </View>


                                    </View>
                                  </TouchableWithoutFeedback> }


                                  {/* --------------------- second soccer row ---------------- */}
                                  <View style={[styles.flatlist_data_row_height, styles[this.blockHeight], { borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                    <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles[this.isfontSize], styles.flatlist_matchup_style]}>
                                    <View style={{width:'80%'}}>
                                      <Text numberOfLines={2} style={[styles.flatlist_matchup_text_style,styles[this.isfontSize],{paddingLeft: 2,}]}  >
                                        {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.away.t : item.games.MATCH_UPS.away.t}
                                      </Text>
                                      </View>
                                      <View style={{width:'20%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                      <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                        {item.games.MATCH_UPS.away.counts}
                                      </Text>
                                      </View>

                                    </View>

                                    <TouchableWithoutFeedback onPress={() => (item.games.MONEY_LINE.away.value == 0 || item.games.MONEY_LINE.away.value == "N/A") ? null : this.getDialogueState(item, index, 'M', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.MONEY_LINE.away.value == "N/A" ? '#888888' : item.isMoneyLineSelect1 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isMoneyLineSelect1 == true ? '#68bcbc' : '',
                                        borderWidth: item.isMoneyLineSelect1 == true ? 1 : 0,
                                        borderRightWidth: 1,
                                      }, styles.flatlist_moneyline_style]}>
                                        {/*  <Text style={[{ color: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                        {item.games.MONEY_LINE.away.value > 0 ? '+' : ''}{item.games.MONEY_LINE.away.value}
                                      </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.MONEY_LINE.away.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                          {/* {item.games.MONEY_LINE.away.flag && <Icon name="check" size={12} color="white" />} */}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >
                                          <Text style={[{ color: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                            {item.games.MONEY_LINE.away.value == "N/A" ? item.games.MONEY_LINE.away.value : item.games.MONEY_LINE.away.value > 0 ? '+' + item.games.MONEY_LINE.away.value : item.games.MONEY_LINE.away.value}

                                          </Text>
                                        </View>

                                      </View>

                                    </TouchableWithoutFeedback >

                                    <TouchableWithoutFeedback onPress={() => (item.games.TOTAL.away.value == 0 || item.games.TOTAL.away.value == "N/A") ? null : this.getDialogueState(item, index, 'T', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.TOTAL.away.value == "N/A" ? '#888888' : item.isTotalSelect1 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isTotalSelect1 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isTotalSelect1 == true ? '#68bcbc' : '',
                                        borderWidth: item.isTotalSelect1 == true ? 1 : 0,
                                        borderRightWidth: 1,
                                      }, styles.flatlist_total_style]}>

                                        {/*  <Text style={[{ color: item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                        O {item.games.TOTAL.away.other_value} ({Math.sign(item.games.TOTAL.away.value) == +1 ? '+' : ''}{item.games.TOTAL.away.value})
                                      </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.TOTAL.away.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                          {/* {item.games.TOTAL.away.flag && <Icon name="check" size={12} color="white" />} */}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >

                                          <Text style={[{ color: item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text,{textAlign:'center'}]}>
                                            {item.games.TOTAL.away.value == "N/A" ? item.games.TOTAL.away.value : 'O ' + item.games.TOTAL.away.other_value + ' (' + (Math.sign(item.games.TOTAL.away.value) == +1 ? '+' : '') + '' + item.games.TOTAL.away.value + ')'}
                                          </Text>
                                        </View>


                                      </View>
                                    </TouchableWithoutFeedback >

                                    <TouchableWithoutFeedback onPress={() => (item.games.SPREAD.away.value == 0 || item.games.SPREAD.away.value == "N/A") ? null : this.getDialogueState(item, index, 'S', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.SPREAD.away.value == "N/A" ? '#888888' : item.isSpreadSelect1 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isSpreadSelect1 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isSpreadSelect1 == true ? '#68bcbc' : '',
                                        borderWidth: item.isSpreadSelect1 == true ? 1 : 0,

                                        borderRightWidth: 1,
                                      }, styles.flatlist_spread_style]}>
                                        {/* <Text style={[{ color: item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                        {Math.sign(item.games.SPREAD.away.other_value) == +1 ? '+' : ''}{item.games.SPREAD.away.other_value} ({Math.sign(item.games.SPREAD.away.value) == +1 ? '+' : ''}{item.games.SPREAD.away.value})
                                      </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.SPREAD.away.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                          {/* {item.games.SPREAD.away.flag && <Icon name="check" size={12} color="white" />} */}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >
                                          <Text style={[{ color: item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                            {item.games.SPREAD.away.value == "N/A" ? item.games.SPREAD.away.value : (Math.sign(item.games.SPREAD.away.other_value) == +1 ? '+' + item.games.SPREAD.away.other_value : item.games.SPREAD.away.other_value) + ' (' + (Math.sign(item.games.SPREAD.away.value) == +1 ? '+' + item.games.SPREAD.away.value : item.games.SPREAD.away.value) + ')'}

                                          </Text>
                                        </View>


                                      </View>
                                    </TouchableWithoutFeedback >

                                  </View>


                                </View> : <View style={styles.flatlist_data_4column}>
                                    {/* --------------------- first row ---------------- */}
                                    <View style={[styles.flatlist_data_row_height, styles[this.blockHeight], { borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                      <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                      <View style={{width:'80%'}}>
                                        <Text numberOfLines={2} style={[styles.flatlist_matchup_text_style, styles[this.isfontSize],{paddingLeft: 2,}]}  >
                                          {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.away.t : item.games.MATCH_UPS.away.t}
                                        </Text>
                                        </View>
                                        <View style={{width:'20%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                        <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                          {item.games.MATCH_UPS.away.counts}
                                        </Text>
                                        </View>

                                      </View>

                                      <TouchableWithoutFeedback onPress={() => (item.games.MONEY_LINE.away.value == 0 || item.games.MONEY_LINE.away.value == "N/A") ? null : this.getDialogueState(item, index, 'M', ArrayLength)}>
                                        <View style={[{
                                          backgroundColor: item.games.MONEY_LINE.away.value == "N/A" ? '#888888' : item.isMoneyLineSelect1 != true ? '#68bcbc' : 'white',
                                          borderRightColor: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc',
                                          borderColor: item.isMoneyLineSelect1 == true ? '#68bcbc' : '',
                                          borderWidth: item.isMoneyLineSelect1 == true ? 1 : 0,
                                          borderRightWidth: 1,
                                        }, styles.flatlist_moneyline_style]}>
                                          {/*  <Text style={[{ color: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                        {item.games.MONEY_LINE.away.value > 0 ? '+' : ''}{item.games.MONEY_LINE.away.value}
                                      </Text> */}
                                          <View style={[styles.flatlist_icon_style]} >
                                            {item.games.MONEY_LINE.away.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                            {/* {item.games.MONEY_LINE.away.flag && <Icon name="check" size={12} color="white" />} */}
                                          </View>
                                          <View style={[styles.flatlist_odd_style]} >
                                            <Text style={[{ color: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                              {item.games.MONEY_LINE.away.value == "N/A" ? item.games.MONEY_LINE.away.value : item.games.MONEY_LINE.away.value > 0 ? '+' + item.games.MONEY_LINE.away.value : item.games.MONEY_LINE.away.value}

                                            </Text>
                                          </View>

                                        </View>

                                      </TouchableWithoutFeedback >

                                      <TouchableWithoutFeedback onPress={() => (item.games.TOTAL.away.value == 0 || item.games.TOTAL.away.value == "N/A") ? null : this.getDialogueState(item, index, 'T', ArrayLength)}>
                                        <View style={[{
                                          backgroundColor: item.games.TOTAL.away.value == "N/A" ? '#888888' : item.isTotalSelect1 != true ? '#68bcbc' : 'white',
                                          borderRightColor: item.isTotalSelect1 != true ? 'white' : '#68bcbc',
                                          borderColor: item.isTotalSelect1 == true ? '#68bcbc' : '',
                                          borderWidth: item.isTotalSelect1 == true ? 1 : 0,
                                          borderRightWidth: 1,
                                        }, styles.flatlist_total_style]}>

                                          {/*  <Text style={[{ color: item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                        O {item.games.TOTAL.away.other_value} ({Math.sign(item.games.TOTAL.away.value) == +1 ? '+' : ''}{item.games.TOTAL.away.value})
                                      </Text> */}
                                          <View style={[styles.flatlist_icon_style]} >
                                            {item.games.TOTAL.away.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                            {/* {item.games.TOTAL.away.flag && <Icon name="check" size={12} color="white" />} */}
                                          </View>
                                          <View style={[styles.flatlist_odd_style]} >

                                            <Text style={[{ color: item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text,{textAlign:'center'}]}>
                                              {item.games.TOTAL.away.value == "N/A" ? item.games.TOTAL.away.value : 'O ' + item.games.TOTAL.away.other_value + ' (' + (Math.sign(item.games.TOTAL.away.value) == +1 ? '+' : '') + '' + item.games.TOTAL.away.value + ')'}
                                            </Text>
                                          </View>


                                        </View>
                                      </TouchableWithoutFeedback >

                                      <TouchableWithoutFeedback onPress={() => (item.games.SPREAD.away.value == 0 || item.games.SPREAD.away.value == "N/A") ? null : this.getDialogueState(item, index, 'S', ArrayLength)}>
                                        <View style={[{
                                          backgroundColor: item.games.SPREAD.away.value == "N/A" ? '#888888' : item.isSpreadSelect1 != true ? '#68bcbc' : 'white',
                                          borderRightColor: item.isSpreadSelect1 != true ? 'white' : '#68bcbc',
                                          borderColor: item.isSpreadSelect1 == true ? '#68bcbc' : '',
                                          borderWidth: item.isSpreadSelect1 == true ? 1 : 0,

                                          borderRightWidth: 1,
                                        }, styles.flatlist_spread_style]}>
                                          {/* <Text style={[{ color: item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                        {Math.sign(item.games.SPREAD.away.other_value) == +1 ? '+' : ''}{item.games.SPREAD.away.other_value} ({Math.sign(item.games.SPREAD.away.value) == +1 ? '+' : ''}{item.games.SPREAD.away.value})
                                      </Text> */}
                                          <View style={[styles.flatlist_icon_style]} >
                                            {item.games.SPREAD.away.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                            {/* {item.games.SPREAD.away.flag && <Icon name="check" size={12} color="white" />} */}
                                          </View>
                                          <View style={[styles.flatlist_odd_style]} >
                                            <Text style={[{ color: item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                              {item.games.SPREAD.away.value == "N/A" ? item.games.SPREAD.away.value : (Math.sign(item.games.SPREAD.away.other_value) == +1 ? '+' + item.games.SPREAD.away.other_value : item.games.SPREAD.away.other_value) + ' (' + (Math.sign(item.games.SPREAD.away.value) == +1 ? '+' + item.games.SPREAD.away.value : item.games.SPREAD.away.value) + ')'}

                                            </Text>
                                          </View>


                                        </View>
                                      </TouchableWithoutFeedback >

                                    </View>
                                    {/* --------------------- second row ---------------- */}

                                    <View style={[styles.flatlist_data_row_height, styles[this.blockHeight], { borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                      <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                        <View style={{ flexDirection: 'row', width: '80%' }}>
                                          <Text style={[{
                                            fontFamily: 'Montserrat-Bold',
                                            color: '#68bcbc',
                                            paddingLeft: 2,
                                          }, styles[this.isfontSize]]} numberOfLines={2} >
                                            {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.home.t : item.games.MATCH_UPS.home.t}
                                         
                                          {/* <Text style={[styles.flatlist_matchup_text_style, styles[this.isfontSize], { fontFamily: 'Montserrat-Regular', }]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text> */}
                                        </Text>
                                        </View>
                                        {/*garima */}
                                        <View style={{width:'20%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                        <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                          {item.games.MATCH_UPS.home.counts}
                                        </Text>
                                        <Text style={[styles.flatlist_matchup_text_style,  { fontFamily: 'Montserrat-Regular',fontSize:10, fontWeight: 'normal', paddingRight: 4, width: '100%',textAlign: 'center',paddingLeft:0}]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text>
                                        </View>
                                      </View>

                                      <TouchableWithoutFeedback onPress={() => (item.games.MONEY_LINE.home.value == 0 || item.games.MONEY_LINE.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'M', ArrayLength)}>
                                        <View style={[{
                                          backgroundColor: item.games.MONEY_LINE.home.value == "N/A" ? '#888888' : item.isMoneyLineSelect2 != true ? '#68bcbc' : 'white',
                                          borderRightColor: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc',
                                          borderColor: item.isMoneyLineSelect2 == true ? '#68bcbc' : '',
                                          borderWidth: item.isMoneyLineSelect2 == true ? 1 : 0,
                                          borderRightWidth: 1,
                                        }, styles.flatlist_moneyline_style]}>
                                          {/*   <Text style={[{ color: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                        {item.games.MONEY_LINE.home.value > 0 ? '+' : ''}{item.games.MONEY_LINE.home.value}
                                      </Text> */}
                                          <View style={[styles.flatlist_icon_style]} >
                                            {item.games.MONEY_LINE.home.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                            {/* {item.games.MONEY_LINE.home.flag && <Icon name="check" size={12} color="white" />} */}
                                          </View>
                                          <View style={[styles.flatlist_odd_style]} >
                                            <Text style={[{ color: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                              {item.games.MONEY_LINE.home.value == "N/A" ? item.games.MONEY_LINE.home.value : item.games.MONEY_LINE.home.value > 0 ? '+' + item.games.MONEY_LINE.home.value : item.games.MONEY_LINE.home.value}

                                            </Text>
                                          </View>

                                        </View>
                                      </TouchableWithoutFeedback>


                                      <TouchableWithoutFeedback onPress={() => (item.games.TOTAL.home.value == 0 || item.games.TOTAL.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'T', ArrayLength)}>
                                        <View style={[{
                                          backgroundColor: item.games.TOTAL.home.value == "N/A" ? '#888888' : item.isTotalSelect2 != true ? '#68bcbc' : 'white',
                                          borderRightColor: item.isTotalSelect2 != true ? 'white' : '#68bcbc',
                                          borderColor: item.isTotalSelect2 == true ? '#68bcbc' : '',
                                          borderWidth: item.isTotalSelect2 == true ? 1 : 0,
                                          borderRightWidth: 1,
                                        }, styles.flatlist_total_style]}>
                                          {/*  <Text style={[{ color: item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                        U {item.games.TOTAL.home.other_value} ({Math.sign(item.games.TOTAL.home.value) == +1 ? '+' : ''}{item.games.TOTAL.home.value})
                                      </Text> */}
                                          <View style={[styles.flatlist_icon_style]} >
                                            {item.games.TOTAL.home.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                            {/* {item.games.TOTAL.home.flag && <Icon name="check" size={12} color="white" />} */}

                                          </View>
                                          <View style={[styles.flatlist_odd_style]} >
                                            <Text style={[{ color: item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text,{textAlign:'center'}]}>

                                              {item.games.TOTAL.home.value == "N/A" ? item.games.TOTAL.home.value : 'U ' + item.games.TOTAL.home.other_value + ' (' + (Math.sign(item.games.TOTAL.home.value) == +1 ? '+' : '') + '' + item.games.TOTAL.home.value + ')'}

                                            </Text>
                                          </View>



                                        </View>
                                      </TouchableWithoutFeedback>

                                      <TouchableWithoutFeedback onPress={() => (item.games.SPREAD.home.value == 0 || item.games.SPREAD.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'S', ArrayLength)}>
                                        <View style={[{
                                          backgroundColor: item.games.SPREAD.home.value == "N/A" ? '#888888' : item.isSpreadSelect2 != true ? '#68bcbc' : 'white',
                                          borderRightColor: item.isSpreadSelect2 != true ? 'white' : '#68bcbc',
                                          borderColor: item.isSpreadSelect2 == true ? '#68bcbc' : '',
                                          borderWidth: item.isSpreadSelect2 == true ? 1 : 0,

                                          borderRightWidth: 1,
                                        }, styles.flatlist_spread_style]}>
                                          {/*  <Text style={[{ color: item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                        {Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' : ''}{item.games.SPREAD.home.other_value} ({Math.sign(item.games.SPREAD.home.value) == +1 ? '+' : ''}{item.games.SPREAD.home.value})
                                      </Text> */}
                                          <View style={[styles.flatlist_icon_style]} >
                                            {item.games.SPREAD.home.flag && <Image source={require('../../../../images/tick.png')} style={{ height: 12, width: 12 ,marginRight:3}}></Image>}
                                            {/* {item.games.SPREAD.home.flag && <Icon name="check" size={12} color="white" />} */}
                                          </View>
                                          <View style={[styles.flatlist_odd_style]} >
                                            <Text style={[{ color: item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                              {item.games.SPREAD.home.value == "N/A" ? item.games.SPREAD.home.value : (Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' + item.games.SPREAD.home.other_value : item.games.SPREAD.home.other_value) + ' (' + (Math.sign(item.games.SPREAD.home.value) == +1 ? '+' + item.games.SPREAD.home.value : item.games.SPREAD.home.value) + ')'}
                                              {/*  {Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' : ''}{item.games.SPREAD.home.other_value} ({Math.sign(item.games.SPREAD.home.value) == +1 ? '+' : ''}{item.games.SPREAD.home.value}) */}

                                            </Text>
                                          </View>

                                        </View>
                                      </TouchableWithoutFeedback>

                                    </View>

                                  </View>}


                                {/* --------------------- bet friend column ---------------- */}

                                <View style={styles.flatlist_bet_a_friend_style} >
                                  <View style={[{
                                    height: '100%', width: '100%',
                                    borderTopColor: 'white',
                                    borderTopWidth: 1,
                                    borderBottomColor: 'white',
                                    borderBottomWidth: 1,
                                  }]}>
                                    {/* <TouchableWithoutFeedback onPress={() => this.getBetDialogueState(item, index, ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.isBetaFriendSelect == false ? '#68bcbc' : 'white',
                                        borderColor: item.isBetaFriendSelect == true ? '#68bcbc' : 'white',
                                        borderWidth: 1,
                                        borderTopWidth: item.isBetaFriendSelect == true ? 1 : 0,
                                        borderBottomWidth: item.isBetaFriendSelect == true ? 1 : 0,
                                        height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'
                                      }]}>
                                        <Text style={[{ color: item.isBetaFriendSelect == true ? '#68bcbc' : 'white', textAlign: 'center' }, styles.flatlist_data_text]}>
                                          BET A FRIEND
                                </Text>
                                      </View>
                                    </TouchableWithoutFeedback> */}
                                    <View style={[{
                                      backgroundColor: '#888888',
                                      borderColor: 'white',
                                      borderWidth: 1,
                                      borderTopWidth: 0,
                                      borderBottomWidth: 0,
                                      height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'
                                    }]}>
                                      <Text style={[{ color: 'white', textAlign: 'center' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                        N/A
                                </Text>
                                    </View>
                                  </View>
                                </View>

                              </View>
                            </View>
                            {/* {
                              item.isMoneyLineSelect1 == true ? this.getDialogue(item, index, item.games.MONEY_LINE.away.value, item.games.MATCH_UPS.away.title) : null
                            }
                            {
                              item.isMoneyLineSelect2 == true ? this.getDialogue(item, index, item.games.MONEY_LINE.home.value, item.games.MATCH_UPS.home.title) : null
                            }
                            {
                              item.isTotalSelect1 == true ? this.getDialogue(item, index, item.games.TOTAL.away.value, item.games.MATCH_UPS.away.title) : null
                            }
                            {
                              item.isTotalSelect2 == true ? this.getDialogue(item, index, item.games.TOTAL.home.value, item.games.MATCH_UPS.home.title) : null
                            }
                            {
                              item.isSpreadSelect1 == true ? this.getDialogue(item, index, item.games.SPREAD.away.value, item.games.MATCH_UPS.away.title) : null
                            }
                            {
                              item.isSpreadSelect2 == true ? this.getDialogue(item, index, item.games.SPREAD.home.value, item.games.MATCH_UPS.home.title) : null
                            }
                            {
                              item.isBetaFriendSelect == true ? this.getBetAFriendDialogue(item, index) : null
                            } */}
                            {
                            item.isMoneyLineSelect1 == true ? this.getDialogue(item, index, item.games.MONEY_LINE.away.value, item.games.MATCH_UPS.away.title,item.games.MONEY_LINE.away.private_value) : null
                          }
                          {
                            item.isMoneyLineSelect2 == true ? this.getDialogue(item, index, item.games.MONEY_LINE.home.value, item.games.MATCH_UPS.home.title,item.games.MONEY_LINE.home.private_value) : null
                          }
                          {
                             item.isTotalSelect1 == true ? this.getDialogue(item, index, item.games.TOTAL.away.value, item.games.MATCH_UPS.away.title,item.games.TOTAL.away.private_value) : null
                         
                           // item.isTotalSelect1 == true  &&  this.state.contesttype=='free_to_play_contest'&& this.state.contestdata.bankroll=='N'? alert('ashish') : null
                          }
                          {
                            item.isTotalSelect2 == true ? this.getDialogue(item, index, item.games.TOTAL.home.value, item.games.MATCH_UPS.home.title,item.games.TOTAL.home.private_value) : null
                          }
                          {
                            item.isSpreadSelect1 == true ? this.getDialogue(item, index, item.games.SPREAD.away.value, item.games.MATCH_UPS.away.title,item.games.SPREAD.away.private_value) : null
                          }
                          {
                            item.isSpreadSelect2 == true ? this.getDialogue(item, index, item.games.SPREAD.home.value, item.games.MATCH_UPS.home.title,item.games.SPREAD.home.private_value) : null
                          }
                          {
                            item.isBetaFriendSelect == true ? this.getBetAFriendDialogue(item, index) : null
                          }
                            {
                              item.isMoneyLineDraw == true ? this.getDialogue(item, index, item.odds.ml_draw_price, item.games.MATCH_UPS.home.title, item.odds.ml_draw_price) : null
                            }
                            
                          </View>
                          {this.state.showView ? index == parseInt(this.state.DataList.length) - 1 ? <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}><Text style={[styles.viewMore, styles[this.isfontSize]]} onPress={() => this.loadMore(false)}>VIEW MORE</Text></View> : null : null}
                        </Animated.View>
                      )
                    }} />

                  :

                  <View style={styles.OtherTextContainer}>
                    <View style={styles.OtherTextSubContainer}>
                      <Text style={styles.UnderConstText}>No Data Available</Text>
                    </View>
                  </View>

                }
              </View>


            </View>
          </View>
        </View>
        {this.state.contestdetail && (
              <DetailComponent
                detailmodel={this.state.contestdetail}
                encrypted_contest_id={
                  this.state.contestdetailid
                }
                onDismiss={() => {
                  this.closeDetailModal();
                }}
                goinfo={() => {
                  this.goinfo();
                }}
              />
            )}
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


  feedbackRequestStatus: state.serviceReducer.requestStatus,
  feedbackResponse: state.serviceReducer.response as FeedbackResponse,
  feedbackError: state.serviceReducer.error,

})

export default connect(mapStateToProps)(ContestDashboardView);