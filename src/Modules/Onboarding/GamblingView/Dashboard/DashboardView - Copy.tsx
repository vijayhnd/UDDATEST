import React from "react";
import { View, Text, FlatList, TextInput, Platform,Alert, TouchableOpacity, ScrollView, AsyncStorage, Animated, UIManager, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { FooterComponent } from "../../../../Components/CustomComponents/Footer/FooterComponent";
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
import FeedbackRequest from "../../../../Services/Feedback/FeedbackRequest";
import FeedbackResponseParser from "../../../../Services/Feedback/FeedbackResponseParser";
import FeedbackResponse from "../../../../Services/Feedback/FeedbackResponse";
import PlaceBetRequest from "../../../../Services/Bets/PlaceBetRequest";
import PlaceBetResponseParser from "../../../../Services/Bets/PlaceBetResponseParser";
import PlaceBetResponse from "../../../../Services/Bets/PlaceBetResponse";
import BetAFriendRequest from "../../../../Services/Bets/BetAFriendRequest";
import BetAFriendResponseParser from "../../../../Services/Bets/BetAFriendResponseParser";
import BetAFriendResponse from "../../../../Services/Bets/BetAFriendResponse";
import UrlService from '../../../../Services/Core/ServiceURI';
import ReferralService from "../../../../Services/Referral/ReferralService";




const { State: TextInputState } = TextInput;



var update = require('immutability-helper');

console.disableYellowBox = true;

const ProfilePageContent = {
  key: 'somethun',
  page_title: '',
}


interface G_DashboardViewProps extends AppValidationComponentProps {

  getProfileRequestStatus?: ServiceRequestStatus
  getProfileResponse?: GetProfileResponse
  getProfileError?: UDDAError

  feedbackRequestStatus?: ServiceRequestStatus
  feedbackResponse?: FeedbackResponse
  feedbackError?: UDDAError

  betaFriendRequestStatus?: ServiceRequestStatus
  betaFriendResponse?: BetAFriendResponse
  betaFriendError?: UDDAError

  placeBetRequestStatus?: ServiceRequestStatus
  placeBetResponse?: PlaceBetResponse
  placeBetError?: UDDAError

  serviceKey?: string
  listeners?: any
}

interface G_DashboardViewState extends AppValidationComponentState {
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
  selectedValue: any;
  selectedSoccerValue:any;
  selectedGameValue: any;
  showFighting: any; //garima
  showSoccer:any;
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
  FeedbackSubject: any;
  FeedbackMsg: any;
  FeedbackDialogue: any;
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

  Feedbackphoto: any;
  FeedbackimageFilePath: any;
  FeedbackphotoName: any;
  Share_Show_Msg: any;
  PropselctedFlag: any;
  DashboardCall: any;
  BetPromotionalMsg: any;
  ReferString: any;
}

const bottom_initial = 0;
class DashboardView extends AppValidationComponent<G_DashboardViewProps, G_DashboardViewState>
  implements MenuIconListener, ISubheaderListener, FooterListner {
  private playtableData: any
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
  public DeeplinkName = Application.sharedApplication().DeeplinkName;
  private USERAvailableUddaBucks: any = Application.sharedApplication().user!.profile.chip_balance!;
  fightingArray: any; //garima
  private groupType: any //garima

  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  private referralservice = new ReferralService();
  data3 = [{
    value: 'UFC',
  }, {
    value: 'BOXING',
  }];
  dataSoccer = [{
    value: 'English Premier League',
  }, {
    value: 'UEFA Champions League',
  },
  {
    value: 'UEFA Europa League',
  },
  {
    value: 'MLS',
  },
  {
    value:'International Teams'
  },
  {
    value:'Spanish La Liga'
  },
  {
    value:'Italian Series A'
  },
  {
    value:'German Bundesliga'
  },
  {
    value:'French Ligue 1'
  }

]
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
      SelectedBetOption: '',
      NoData: '',
      showFighting: false, //garima
      showSoccer:false,//garima
      selectedValue: 'UFC',
      selectedSoccerValue:'English Premier League',
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

      FeedbackSubject: '',
      FeedbackMsg: '',
      FeedbackDialogue: false,
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

      Feedbackphoto: { name: this.photoFieldName, value: '' },
      FeedbackimageFilePath: '',
      FeedbackphotoName: 'Photo',

      Share_Show_Msg: '',
      PropselctedFlag: '',
      DashboardCall: '',
      BetPromotionalMsg: '',
      groupType: ''  , //garima
      ReferString: ''

    };
  }



  async componentDidMount() {  
    //AlertUtil.show("fmg");
  //RouterBuilder.replaceRouteTo(AppScreens.G_QuickGuide,this.props);
    //return;
    //console.log("deeplink componentDidMount dashboard 1" + this.DeeplinkName);
    //Application.sharedApplication().DeeplinkName = this.DeeplinkName;
      console.log('@pky'+Application.sharedApplication().DeeplinkName);

    if (Platform.OS === 'ios') {
      
      if (Application.sharedApplication().DeeplinkName == 'propsbet/') {
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'oddsbet/') {
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'contestbet/') {
        this.props.navigation!.navigate(AppScreens.G_InvitationToJoin);
      }
      else {
        AppState.addEventListener('change', this._handleAppStateChange);
      }
  
    }
    else{
    //console.log("garima " + this.DeeplinkName);
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

      else {
        AppState.addEventListener('change', this._handleAppStateChange);
      }
    
  }
    this.getProfile();
    this.callMethod(3 ,'');
    this.GETPromotionalMSG();

    setTimeout(() => {
      //this.setState({ shareDialog: true });
     }, 2000)

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => { this.setState({ keyboardOpen: true }) }

    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => { this.setState({ keyboardOpen: false }) }
    );


  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

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
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight + fieldHeight + fieldHeight+ fieldHeight)  || 0;
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

  GETPromotionalMSG() {
    fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_promotional_message', {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('GETPromotionalMSG ' + JSON.stringify(responseJson));
        if (responseJson.message = "success promotional message") {
          this.setState({ BetPromotionalMsg: responseJson.data.promotional_array[0].gaming_promotional_message })
        } else {
          this.setState({ BetPromotionalMsg: responseJson.message });
        }
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          this.logoutButtonPressed();
        }

      })
      .catch(error => {
        AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
        console.log(error);
      })
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
    //garima to handle private contest page for ios and android

    console.log(Application.sharedApplication().DeeplinkName);
    if (Platform.OS === 'ios') {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
          if (Application.sharedApplication().DeeplinkName == 'propsbet/') {
            this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
          }
          else if (Application.sharedApplication().DeeplinkName == 'custombet/') {
            this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
          }
          else if (Application.sharedApplication().DeeplinkName == 'oddsbet/') {
            this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
          }
          else if (Application.sharedApplication().DeeplinkName == 'contestbet/') {
            this.props.navigation!.navigate(AppScreens.G_InvitationToJoin);
          }
        }
        else {
          console.log('Not DeepLink');
        }
      }

    }

   else{
    
    console.log("dashboard deeplink" + JSON.stringify(Application.sharedApplication().DeeplinkName));
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
        if (Application.sharedApplication().DeeplinkName == 'propsbet/') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'contestbet/') {
          this.props.navigation!.navigate(AppScreens.G_InvitationToJoin);
        }
        else if (Application.sharedApplication().DeeplinkName == 'oddsbet/') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'propsbet/private') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'propsbet/public') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'oddsbet/private') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (Application.sharedApplication().DeeplinkName == 'oddsbet/public') {
          this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }


      }
      else {
      }
    }
  }
    this.setState({ appState: nextAppState });
  };


  private loadMatches(week: number) {
    switch (week) {
      case 1: {
        this.callMethod(this.state.selected_Legue_id ,'');
      } break;
      case 2: {
        this.callMethod(this.state.selected_Legue_id ,'');
      } break;
      case 3: {
        this.callMethod(this.state.selected_Legue_id , '');
      } break;

    }

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



  callMethod(league_id: any ,value:any) {
    console.log("garima" + league_id);
    if (league_id == 10) {
      this.setState({ showFighting: true }); //garima
      this.setState({ showSoccer: false });
      //this.setState({ selectedValue: 'UFC' });//garima
      if(value == "UFC"){
        this.groupType =  "ufc"
        
      }
      else if(value == "BOXING"){
        this.groupType =  "boxing"
      }
      else{
        this.groupType = "ufc"
        this.setState({ selectedValue: 'UFC' });//garima
      }
      
    }
    else if(league_id == 9){
      this.setState({ showSoccer: true });
      this.setState({ showFighting: false });
      if(value == "English Premier League"){
        this.groupType =  "eng_premier"
        
      }
      else if(value == "UEFA Champions League"){
        this.groupType =  "uefa_champions"
      }
      else if(value == "UEFA Europa League"){
        this.groupType =  "uefa_europa"
      }
      else if(value == "MLS"){
        this.groupType =  "mls"
      }
      else if(value == "International Teams"){
        this.groupType =  "international_teams"
      }
      else if(value == "Spanish La Liga"){
        this.groupType =  "spain_la_liga"
      }
      else if(value == "Italian Series A "){
        this.groupType =  "italy_serie_a"
      }
      else if(value == "German Bundesliga "){
        this.groupType =  "german_bundesliga"
      }
      else if(value == "French Ligue 1"){
        this.groupType =  "france_ligue"
      }
      else{
        this.groupType = "eng_premier"
        this.setState({ selectedSoccerValue: 'English Premier League' });//garima
      }
    }
    else {
      this.groupType =  ""
      this.setState({ showFighting: false }); //garima
      this.setState({ showSoccer: false }); //garima
    }
    this.setState({ loader: true });
    this.setState({ DashboardCall: false });


    this.setState({ currentWeekTitle: 'WEEK' })
    this.setState({ currentweekindex: 0 })
    this.setState({ pastWeekTitle: 'PAST RESULTS' })
    this.setState({ upcomingGameTitle: 'NEXT MATCH' })
    this.setState({ RealpastWeekTitle: 'PAST RESULTS' })
    this.setState({ RealupcomingGameTitle: 'NEXT MATCH' })
    this.setState({ selected_Legue_id: league_id });

    var params: any = {
      'league_id': league_id,
      'group_type': this.groupType
    };






    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
      body: formData,

    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({ loader: false });
        this.setState({ DashboardCall: true });
        console.log('Dashboard Data ' + JSON.stringify(responseJson));
        if (responseJson.data.type == 'D') {

          var end_time_stamp1 = responseJson.data.date_range_startDate_timestamp * 1000;
          var formated_end_time1 = moment(end_time_stamp1).format('MMM DD');
          console.log('Start Date ' + JSON.stringify(end_time_stamp1));
          var Match_date: any = formated_end_time1.toString().split(' ');

          var end_time_stamp = responseJson.data.date_range_endDate_timestamp * 1000;
          var formated_end_time = moment(end_time_stamp).format('MMM DD');
          console.log('Start Date ' + JSON.stringify(end_time_stamp));
          var Match_date_end: any = formated_end_time.toString().split(' ');

          this.setState({ currentWeekTitle: Match_date[0] + ". " + Match_date[1] + " - " + Match_date_end[0] + ". " + Match_date_end[1] });
          this.setState({ selectedGameValue: this.state.currentWeekTitle });//garima
        }
        else {
          this.setState({ currentWeekTitle: responseJson.data.date_range });
         
          this.setState({ selectedGameValue: this.state.currentWeekTitle });//garima
        }
        this.fightingArray = [{
          value: this.state.currentWeekTitle
        },
        {
          value: "NEXT MATCH",
        },
        {
          value: "PAST RESULTS",
        }
        ];

        if (responseJson.data.events_array.length > 0) {
          this.setState({
            DataList: responseJson.data.events_array.map((x: any) => ({
              event_id: x.event_id,
              league_id: x.league_id,
              event_status: x.event_status,
              gameState_id: x.gameState_id,
              gameState: x.gameState,
              event_date_time: x.event_date_time,
              games: x.games,
              score_time: x.score_time,
              quarter: x.quarter,
              odds: x.odds,
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
            }))
          });

          this.setState({ NoData: false });
        }
        else {
          this.setState({ DataList: [] });
          this.setState({ NoData: true });
        }
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          this.logoutButtonPressed();
        }
      })
      .catch(error => {
        this.setState({ DataList: [] });
        this.setState({ loader: false });
        console.log(error);
      })


  }




  prev_next_dashboard_API_call(currentindex: any, flagofindex: any) {
    this.setState({ currentweekindex:currentindex});
    console.log("Current Index Dashboard Week" + currentindex);
    this.setState({ loader: true });

    if (currentindex == 0) {
      this.callMethod(this.state.selected_Legue_id ,'');
    }
    else {
      if (this.state.selected_Legue_id == 10) {
        this.setState({ showFighting: true }); //garima
        this.setState({ showSoccer: false });
        //this.setState({ selectedValue: 'UFC' });//garima
        if(this.state.selectedValue == "UFC"){
          this.groupType =  "ufc"
          
        }
        else{
          this.groupType =  "boxing"
        }
      }
      else if(this.state.selected_Legue_id == 9){
        this.setState({ showSoccer: true });
        this.setState({ showFighting: false });
        if(this.state.selectedSoccerValue == "English Premier League"){
          this.groupType =  "eng_premier"
          
        }
        else if(this.state.selectedSoccerValue == "UEFA Champions League"){
          this.groupType =  "uefa_champions"
        }
        else if(this.state.selectedSoccerValue == "UEFA Europa League"){
          this.groupType =  "uefa_europa"
        }
        else if(this.state.selectedSoccerValue == "MLS"){
          this.groupType =  "mls"
        }
        else if(this.state.selectedSoccerValue == "International Teams"){
          this.groupType =  "international_teams"
        }
        else if(this.state.selectedSoccerValue == "Spanish La Liga"){
          this.groupType =  "spain_la_liga"
        }
        else if(this.state.selectedSoccerValue == "Italian Series A "){
          this.groupType =  "italy_serie_a"
        }
        else if(this.state.selectedSoccerValue == "German Bundesliga "){
          this.groupType =  "german_bundesliga"
        }
        else{
          this.groupType =  "france_ligue"
        }
      }
      else {
      this.groupType =  ""
      this.setState({ showFighting: false }); //garima
      this.setState({ showSoccer: false }); //garima
      }
      var params: any = {
        'league_id': this.state.selected_Legue_id,
        'dashboard': currentindex,
        'group_type': this.groupType
      };

      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }

      fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/prev_next_dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorisation': this.authorisationToken
        },
        body: formData,

      }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({ loader: false });
          console.log('Prev Next Dashboard Data ' + JSON.stringify(responseJson));

          var current_time_stamp1 = responseJson.data.date_range_startDate_timestamp * 1000;
          var cur_formated_time1 = moment(current_time_stamp1).format('MMM DD');
          var cur_Match_date1: any = cur_formated_time1.toString().split(' ');

          var current_time_stamp2 = responseJson.data.date_range_endDate_timestamp * 1000;
          var cur_formated_time2 = moment(current_time_stamp2).format('MMM DD');
          var cur_Match_date2: any = cur_formated_time2.toString().split(' ');

          var past_time_stamp1 = responseJson.data.past_range_startDate_timestamp * 1000;
          var past_formated_time1 = moment(past_time_stamp1).format('MMM DD');
          var past_Match_date1: any = past_formated_time1.toString().split(' ');

          var past_time_stamp2 = responseJson.data.past_range_endDate_timestamp * 1000;
          var past_formated_time2 = moment(past_time_stamp2).format('MMM DD');
          var past_Match_date2: any = past_formated_time2.toString().split(' ');


          var next_time_stamp1 = responseJson.data.upcoming_range_startDate_timestamp * 1000;
          var next_formated_time1 = moment(next_time_stamp1).format('MMM DD');
          var next_Match_date1: any = next_formated_time1.toString().split(' ');

          var next_time_stamp2 = responseJson.data.upcoming_range_endDate_timestamp * 1000;
          var next_formated_time2 = moment(next_time_stamp2).format('MMM DD');
          var next_Match_date2: any = next_formated_time2.toString().split(' ');


          if (responseJson.data.type == "D") {
            this.setState({ currentWeekTitle: cur_Match_date1[0] + ". " + cur_Match_date1[1] + " - " + cur_Match_date2[0] + ". " + cur_Match_date2[1] });
            this.setState({ pastWeekTitle: past_Match_date1[0] + ". " + past_Match_date1[1] + " - " + past_Match_date2[0] + ". " + past_Match_date2[1] });
            this.setState({ upcomingGameTitle: next_Match_date1[0] + ". " + next_Match_date1[1] + " - " + next_Match_date2[0] + ". " + next_Match_date2[1] });
            this.setState({ RealpastWeekTitle: past_Match_date1[0] + ". " + past_Match_date1[1] + " - " + past_Match_date2[0] + ". " + past_Match_date2[1] });
            this.setState({ RealupcomingGameTitle: next_Match_date1[0] + ". " + next_Match_date1[1] + " - " + next_Match_date2[0] + ". " + next_Match_date2[1] });
          } else {
            this.setState({ currentWeekTitle: responseJson.data.date_range });
            this.setState({ pastWeekTitle: responseJson.data.past_range });
            this.setState({ upcomingGameTitle: responseJson.data.upcoming_range });
            this.setState({ RealpastWeekTitle: responseJson.data.past_range });
            this.setState({ RealupcomingGameTitle: responseJson.data.upcoming_range });
          }


          if (flagofindex == 'S') {
            this.setState({ currentWeekTitle: this.state.currentWeekTitle });
            this.setState({ upcomingGameTitle: (this.state.upcomingGameTitle) });
            this.setState({ pastWeekTitle: 'PAST RESULTS' })
          }
          else if (flagofindex == 'A') {
            this.setState({ currentWeekTitle: this.state.currentWeekTitle });
            this.setState({ pastWeekTitle: (this.state.pastWeekTitle) });
            this.setState({ upcomingGameTitle: 'NEXT MATCH' })
          }
          else {

          }
          this.fightingArray = [{
            value: this.state.currentWeekTitle
          },
          {
            value: "NEXT MATCH",
          },
          {
            value: "PAST RESULTS",
          }
          ];

            this.setState({ selectedGameValue: this.state.currentWeekTitle }) //garima
          if (responseJson.data.events_array.length > 0) {
            this.setState({
              DataList: responseJson.data.events_array.map((x: any) => ({
                event_id: x.event_id,
                league_id: x.league_id,
                event_status: x.event_status,
                gameState_id: x.gameState_id,
                gameState: x.gameState,
                event_date_time: x.event_date_time,
                games: x.games,
                score_time: x.score_time,
                quarter: x.quarter,
                odds: x.odds,
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
              }))
            });

            this.setState({ NoData: false });
          }
          else {
            this.setState({ DataList: [] });
            this.setState({ NoData: true });
          }
          if (responseJson.message == "Access Expired.") {
            // AlertUtil.show("Session Expired ! Please login again");
            console.log("Footer comp ---->" + responseJson.message);
            this.logoutButtonPressed();
          }
        })
        .catch(error => {
          this.setState({ DataList: [] });
          this.setState({ loader: false });
          console.log(error);
        })
    }

  }

  callBetAFriendAPI(selectedArray: any) {
    this.setState({ dialogVisible: false })
    console.log('selected array ' + JSON.stringify(selectedArray));
    if (this.state.amounttowin != '' || this.state.betammount != '') {

      var bet_odds_type;
      var bet_team_type;
      var bet_type: any;
      var bet_amount: any;
      var amount_to_win;
      var bet_team_id;
      var wining_rate_favored;
      var wining_rate_underdog;

      if (selectedArray.MasterCalcFlag == "M") {
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
      }




      if (selectedArray.isMoneyLineSelect1 == true) {
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.games.MONEY_LINE.away.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.games.MONEY_LINE.away.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.games.MONEY_LINE.away.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.games.MONEY_LINE.away.value) / 100);
        }
        var posneg = Math.sign(selectedArray.games.MONEY_LINE.away.value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        }
      }
      else if (selectedArray.isMoneyLineSelect2 == true) {
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.games.MONEY_LINE.home.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.games.MONEY_LINE.home.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.games.MONEY_LINE.home.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.games.MONEY_LINE.home.value) / 100);
        }
        var posneg = Math.sign(selectedArray.games.MONEY_LINE.home.value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        }
      }
      else if (selectedArray.isTotalSelect1 == true) {

        var posneg = Math.sign(selectedArray.games.TOTAL.away.value)
        // if (posneg == -1) {
        bet_team_type = 'favored';
        // }
        // else {
        //   bet_team_type = 'underdog';
        // }
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
        // if (posneg == -1) {
        //   bet_team_type = 'favored';
        // }
        // else {
        bet_team_type = 'underdog';
        // }
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
      }

      if (this.state.checkedMoneyLinePublic == true) {
        bet_type = '1';
      }
      else if (this.state.checkedMoneyLinePrivate == true) {
        bet_type = '2';
      }

      if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
        amount_to_win = this.state.valueofMoneylineDialog;
        bet_amount = this.state.betammount;
        bet_amount = bet_amount;

      }
      else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
        bet_amount = this.state.valueofMoneylineDialog;
        amount_to_win = this.state.amounttowin;
        amount_to_win = parseInt(amount_to_win)+parseInt(bet_amount); //garima
      }
      //console.log("garima"    +amount_to_win);
      this.setState({ POSTBetAmount: bet_amount });


      var placebetRequset = new PlaceBetRequest(
        null,
        null,
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
        JSON.stringify(selectedArray.odds),
      )
      var serviceAction = new ServiceAction()
      var responseParser = new PlaceBetResponseParser()
      this.props.dispatch!(serviceAction.request(ServiceType.Bets,
        ServiceKeys.PlaceBetName,
        placebetRequset,
        [this.constructor.name],
        responseParser))


    }
    else {
      AlertUtil.show('Not entered any amount,please try agian');
    }

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

    var betRequset = new BetAFriendRequest(
      null,
      null,
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

    fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/prop_uncoveredaction', {
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
          this.logoutButtonPressed();
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
    fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/api/genrate_props', {
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
          this.logoutButtonPressed();
        }
      })
      .catch(error => console.log(error))
  }

  componentWillReceiveProps(nextProps: G_DashboardViewProps) {
    if (nextProps.listeners!.includes(this.constructor.name)) {
      if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log("feedbackResponse " + JSON.stringify(nextProps));
            this.setState({ ReferString: nextProps.response!.userProfile.my_referral_code });

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
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log("placeBetResponse " + JSON.stringify(nextProps.placeBetResponse));
            var response = nextProps.placeBetResponse!.response;
            if (response.message == 'success') {
               //garima
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

              if (this.state.checkedMoneyLinePrivate == true) {
                this.setState({ BetType: 'ODDS' });
                this.setState({ POSTBetAmount: bet_amount });
                this.setState({ selectedItem: this.state.selectedItem });
                this.shareOption(response, this.state.selectedItem, 'ODDS');
              }else{
                AlertUtil.show("Bet Placed Successfully");
              }

              this.getProfile();
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
              

            }
            else {
              AlertUtil.show('Unsuccesfull :' + response.message);
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
      else if (nextProps.serviceKey === ServiceKeys.BetaFriendName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log("betaFriendResponse " + JSON.stringify(nextProps.betaFriendResponse));
            var response = nextProps.betaFriendResponse!.response;
            if (response.message == 'success') {
            
              if (this.state.checkedBetText == 'P2') {
                this.setState({ BetType: 'PROP' });
                this.setState({ POSTBetAmount: bet_amount });
                this.shareOption(response, this.state.selectedPropsItem, 'PROP');
              }else{
                AlertUtil.show("Bet Placed Successfully"); //garima
              }
              this.getProfile();
              console.log("custom bet success");
              this.setState({ betammount: '' });
              this.setState({ amounttowin: '' });
              this.setState({ valueofMoneylineDialog: '0.00' });
              this.setState({ valueofMoneylineDialogShow: '0.00' });
            }
            else {
              AlertUtil.show('Unsuccesfull :' + response.message);
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
      else if (nextProps.serviceKey === ServiceKeys.BetaFriendName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log("betaFriendResponse " + JSON.stringify(nextProps.betaFriendResponse));
            var response = nextProps.betaFriendResponse!.response;
            if (response.message == 'success') {
              AlertUtil.show("Bet Placed Successfully"); //garima
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
              AlertUtil.show('Unsuccesfull :' + response.message);
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

  //garima
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
      this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }
  }


  availableBalanceTapped() {
    // this.props.navigation!.navigate(AppScreens.G_InfochartView);
  }

  openPlaysTapped() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.props.navigation!.navigate(AppScreens.G_UddaContests);
    }
  }

  ContesetJoinTapped() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.props.navigation!.navigate(AppScreens.G_UddaContests);
    }
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
      if (this.state.selected_Legue_id != '3') {
        AsyncStorage.multiSet([
          ["league_id", this.state.selected_Legue_id]
        ]);
      } else {
        AsyncStorage.multiSet([
          ["league_id", '3']
        ])
      }

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
    this.USERAvailableUddaBucks = Application.sharedApplication().user!.profile.chip_balance!;

    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
      this.setState({ MatchEventDialog: true });
    }
    else {
      setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index, viewPosition: 0.2 }) }, 100);
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
    this.USERAvailableUddaBucks = Application.sharedApplication().user!.profile.chip_balance!;

    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
      this.setState({ MatchEventDialog: true });
    }
    else {
      setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index, viewPosition: 0.2 }) }, 100);

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

  getBetDialogueState(item: any, index: any, ArrayLength: any) {
    this.USERAvailableUddaBucks = Application.sharedApplication().user!.profile.chip_balance!;

    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
      this.setState({ MatchEventDialog: true });
    }
    else {
      setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index, viewPosition: 0.2 }) }, 100);

      for (let i = 0; i < ArrayLength; i++) {
        if (i == index) {
          this.state.DataList[index].isMoneyLineSelect1 = false;
          this.state.DataList[index].isMoneyLineSelect2 = false;
          this.state.DataList[index].isTotalSelect1 = false;
          this.state.DataList[index].isTotalSelect2 = false;
          this.state.DataList[index].isSpreadSelect1 = false;
          this.state.DataList[index].isSpreadSelect2 = false;
          this.state.DataList[index].isBetaFriendSelect = !item.isBetaFriendSelect;
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
      const updatedEmployees = update(this.state.DataList, { $splice: [[index, 1, item]] });
      this.setState({ DataList: updatedEmployees });
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
  }

  DialogClose(item: any, index: any) {
    item.isBetaFriendSelect = false;
    item.isMoneyLineSelect1 = false;
    item.isMoneyLineSelect2 = false;
    item.isTotalSelect1 = false;
    item.isTotalSelect2 = false;
    item.isSpreadSelect1 = false;
    item.isSpreadSelect2 = false;
    this.setState({ betammount: '' });
    this.setState({ amounttowin: '' });
    this.setState({ valueofMoneylineDialog: '0.00' });
    this.setState({ valueofMoneylineDialogShow: '0.00' });
    const updatedEmployees = update(this.state.DataList, { $splice: [[index, 1, item]] });
    this.setState({ DataList: updatedEmployees });

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

  showDialog(isShow: any, item: any) {

    if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
      if (this.state.betammount < 1000 || this.state.betammount < "1000") {
        AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
      }
      else {
        this.setState({ dialogVisible: isShow });
        this.setState({ selectedItem: item });
      }

    }
    else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
      if (this.state.valueofMoneylineDialog < 1000 || this.state.valueofMoneylineDialog < "1000") {
        AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
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
      this.setState({ PropselctedFlag: 'U' });
    }
    else {
      this.setState({ selectedPropBetValue: item.over });
      this.setState({ PropselctedFlag: 'O' });
    }
    this.setState({ selectedPropsItem: item });
  }

  CustomBetDialog() {
    if (this.state.betammount < 1000 || this.state.betammount < "1000") {
    }
    else if (this.state.valueofMoneylineDialog > 0) {
      this.setState({ dialogVisible: true });
    }
    else {
    }
  }

  async shareOption(item: any, selectedDatavalues: any, bettype: any) {
    console.log("shareOption bettype " + bettype);

    var MessageString: any;
    var ShowString: any;
    var oddsString: any;
    var teamName: any;
    var teamName2: any;
    var url: any;
    var selectedData: any;
    var referStr: any;
    if (bettype == 'ODDS') {
      selectedData = selectedDatavalues;

    }
    else if (bettype == 'PROP') {
      selectedData = selectedDatavalues;

    }

    var amount: any;
    if (bettype == 'ODDS') {
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
          amount = selectedData.games.MONEY_LINE.away.value;
        }
        else if (selectedData.isTotalSelect1 == true) {
          amount = "Over " + selectedData.games.TOTAL.away.other_value + " (" + selectedData.games.TOTAL.away.value + ")";
        }
        else {
          amount = selectedData.games.SPREAD.away.other_value + " (" + selectedData.games.SPREAD.away.value + ")";
        }
      } else {
        teamName = selectedData.games.MATCH_UPS.home.title;
        teamName2 = selectedData.games.MATCH_UPS.away.title;
        if (selectedData.isMoneyLineSelect2 == true) {
          amount = selectedData.games.MONEY_LINE.home.value;
        }
        else if (selectedData.isTotalSelect2 == true) {
          amount = "Under " + selectedData.games.TOTAL.home.other_value + " (" + selectedData.games.TOTAL.home.value + ")";
        }
        else {
          amount = selectedData.games.SPREAD.home.other_value + " (" + selectedData.games.SPREAD.home.value + ")";
        }
      }
     url = "http://bet.udda.com/index.php?t=oddsbet&i=" + item.data.encryptor_bet_id;   //garima for now
     //url = "https://bet.udda.com/coming-soon/"
      url = await this.referralservice.getReferralUrl(url, this.state.ReferString, "U"); // Getting Dynamic Share Link From Firebase

      referStr = "\n Use Referral Code " + this.state.ReferString + " to sign up.";
      MessageString = "I just bet " + this.state.POSTBetAmount + " UDDA Bucks on the " + oddsString + " " + amount + " for the team " + teamName + " v/s " + teamName2 + ". ";
      MessageString += referStr;


      ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount} UDDA Bucks </Text>
        on the
      <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {oddsString} {amount} </Text> for the team <Text style={{ fontFamily: 'Montserrat-SemiBold', textDecorationLine: 'underline' }}>{teamName}</Text> v/s {teamName2}. {referStr}</Text>

      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });
      this.setState({ MessageUrl: url });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
    }
    else {

      if (this.state.PropselctedFlag == 'O') {
        amount = "over " + selectedData.total + " (" + selectedData.over + ")";
      }
      else {
        amount = "Under " + selectedData.total + " (" + selectedData.under + ")";
      }
     url = "http://bet.udda.com/index.php?t=propsbet&i=" + item.data.encryptor_bet_id;
    //url = "https://bet.udda.com/coming-soon/"

      MessageString = "I just bet a " + this.state.POSTBetAmount + " UDDA Bucks that " + selectedData.question + " is " + amount + ". Would you like to accept the Bet? "


      ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet a <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount} UDDA Bucks </Text>
        that
      <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {selectedData.question} </Text> is
      <Text style={{ fontFamily: 'Montserrat-SemiBold', textDecorationLine: 'underline' }}> {amount} </Text>. Would you like to accept the Bet? </Text>


      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });

      this.setState({ MessageUrl: url });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
    }


  }

  /*shareNow() {
    var Message = this.state.MessageString + " " + this.state.MessageUrl;
    Share.share({
      message: var Message = this.state.MessageString + " " + this.state.MessageUrl;
    }).then(result => {
      this.setState({ shareDialog: false })
      console.log('share result' + JSON.stringify(result));
    }).catch(errorMsg => {
      this.setState({ shareDialog: false })
      console.log('share error ' + JSON.stringify(errorMsg));
    });
  }*/

  shareNow = async () => {

    try {
      var Message = this.state.MessageString + " " + this.state.MessageUrl;
      const result = await Share.share({
        message:Message,
      }); 

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          this.setState({ shareDialog: false });
          console.log('shared in activity');
          // shared with activity type of result.activityType
        } else {
          this.setState({ shareDialog: false });
          console.log('shared');
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        this.setState({ shareDialog: false });
        console.log('share  in dismiss');
        // dismissed
      }
    } catch (error) {
      this.setState({ shareDialog: false });
      console.log('share error in catch ' + JSON.stringify(error));
      //alert(error.message);
    }
  };

  feedbackDialogOpen() {
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

  private updateWeekTitles() {
  }

  pastResultClicked() {
    //Alert.alert("enter");
    this.setState({ currentweekindex: this.state.currentweekindex - 1 });
    this.prev_next_dashboard_API_call(this.state.currentweekindex - 1, 'S');
  }
  upcomingGamesClicked() {
    this.setState({ currentweekindex: this.state.currentweekindex + 1 });
    this.prev_next_dashboard_API_call(this.state.currentweekindex + 1, 'A');
  }
  //garima
  //garima
  onChangeGroupType(value: any) {
    this.setState({ selectedValue: value });
    this.callMethod(this.state.selected_Legue_id ,value);
  }
  //garima 

  onChangeSoccerType (value:any){
    this.setState({ selectedSoccerValue: value });
    this.callMethod(this.state.selected_Legue_id ,value);
  }
  //garima
  onChangeResult(value: any) {
    this.setState({ selectedGameValue: value });
    if(value == "PAST RESULTS"){
      //this.setState({ currentweekindex: this.state.currentweekindex - 1 });
      this.prev_next_dashboard_API_call(this.state.currentweekindex - 1, 'S');
    }
    else if(value == "NEXT MATCH"){
  //  this.setState({ currentweekindex: this.state.currentweekindex + 1 });
    this.prev_next_dashboard_API_call(this.state.currentweekindex + 1, 'A');
    }
    else{
      this.prev_next_dashboard_API_call('0' , '');
    }
  }


  
// Vijay close share dialog with alert
 closeShareDialog() { 
  this.setState({ shareDialog: false });
  setTimeout(() => {
    AlertUtil.show("Bet Placed Successfully");
   }, 3000)
                                    
  }




//garima update share option message
  onChangeShareMsg (val:any){
    this.setState({ MessageString:  val});
  }













  //  ---------------------------------------------- Design and Design Methods --------------------------------------------

  showOverlayGameSelection() {
    //selected sports
    return (
      <View style={{ height: hp(7.5), backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

        <SportsListComponent sportsList={this.state.SportData} weight={1.2} leagueid={this.state.selected_Legue_id} tapAction={(sport) => {
          console.log(JSON.stringify(sport));
          this.setState({ showOverlayGameSelectionFlag: false })
          this.setState({ selected_Legue_id: sport.league_id });
          this.callMethod(sport.league_id ,'');
        }}></SportsListComponent>
      </View>
    )
  }

  showGameSelectionAndOther() {
    return (
      <View>
        <View style={{ height: hp(7.5), backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <SportsListComponent sportsList={this.state.SportData} weight={0.7} leagueid={this.state.selected_Legue_id} tapAction={(sport) => {
            console.log(JSON.stringify(sport))
            this.setState({ showOverlayGameSelectionFlag: false })
            this.setState({ selected_Legue_id: sport.league_id });
            this.callMethod(sport.league_id ,'');
          }}></SportsListComponent>
        </View>


        <View style={{ width: '100%', height: hp(6), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        {this.state.showFighting == false && this.state.showSoccer == false ?
             <View style={{ width: '95%', backgroundColor: 'white', flexDirection: 'row' }}>
                 <View style={{ width: '30%', height: '100%', justifyContent: 'center' }}>
                 <TouchableOpacity onPress={() => { this.pastResultClicked() }} style={{ width: '100%' }} >
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <GrayPrevIcon />
                  <Text  style={[styles.boldTextStyle]} >{this.state.pastWeekTitle == "" ? "PAST RESULTS" : this.state.pastWeekTitle}</Text>
                </View>
              </TouchableOpacity>
              </View>
            <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ borderColor: '$gray', borderWidth: 1, padding: wp(1.2), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.centerTitleTextStyle}>{this.state.currentWeekTitle == "" ? "WEEK" : this.state.currentWeekTitle}</Text>
              </View>
            </View>
            <View style={{ width: '30%', height: '100%', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => { this.upcomingGamesClicked() }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={styles.boldTextStyle} >{this.state.upcomingGameTitle == "" ? "NEXT GAMES" : this.state.upcomingGameTitle}</Text>
                  <GrayNextIcon />
                </View>
              </TouchableOpacity>
            </View>
            </View>
            : null}
          {/*garima UI Changes */}
          {this.state.showFighting == true && this.state.showSoccer == false ?
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>
                <Dropdown 
                  //containerStyle={{borderWidth:1, borderColor:'lightgrey', borderRadius:5, paddingLeft:10}}
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.data3}
                  value={this.state.selectedValue}
                  onChangeText={value => this.onChangeGroupType(value)}
                  fontSize={hp(1.6)}

                />

              </View>

              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>
                <Dropdown
                  //containerStyle={{borderWidth:1, borderColor:'lightgrey', borderRadius:5, paddingLeft:10}}
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.fightingArray}
                  value={this.state.selectedGameValue}
                  onChangeText={value => this.onChangeResult(value)}
                  fontSize={hp(1.6)}

                />

              </View>
            </View>
            : null}

           {/* soccer garima */}
           {this.state.showSoccer ==  true && this.state.showFighting == false  ?
          <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>
             
              <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.dataSoccer}
                  value={this.state.selectedSoccerValue}
                  onChangeText={value => this.onChangeSoccerType(value)}
                  fontSize={hp(1.6)}
                 
                />
              </View>

              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>
              <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.fightingArray}
                  value={this.state.selectedGameValue}
                  onChangeText={value => this.onChangeResult(value)}
                  fontSize={hp(1.6)}
                  

                />

              </View>
            </View>
            : null} 


        </View>

      </View>
    )
  }

  getDialogue(GamesArray: any, index: any, value: any, title: any) {

    return (
      <View>
        <View style={[{ marginLeft: GamesArray.MasterCalcFlag == 'M' ? '35%' : GamesArray.MasterCalcFlag == 'T' ? '52%' : '72%' }, styles.dialog_triangle]}></View>
        <View style={styles.dialog_container}>
          {/* --------------------- dialog checkbox  ---------------- */}

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '47%', flexDirection: 'row' }}>
              <CheckBox
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
              </View>
            </View>

            <View style={{ width: '47%', flexDirection: 'row' }}>
              <CheckBox
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
              </View>
            </View>

            <TouchableWithoutFeedback onPress={() => this.DialogClose(GamesArray, index)}>
              <View style={{ width: '4%', marginTop: 5 }}>
                <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10 }}></Image>
              </View>
            </TouchableWithoutFeedback>

          </View>

          {/* --------------------- dialog middle text  ---------------- */}


          <View style={styles.dialogue_text_label_container}>
            <Text style={styles.dialogue_main_text_label}> You are betting <Text style={styles.dialogue_sub_text_label}>
              {GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'T' || GamesArray.MasterCalcFlag == 'S' ? (value > 0 ? '+' : '-') : ''}{Math.abs(value)}</Text> under <Text style={styles.dialogue_sub_text_label}>
                {GamesArray.MasterCalcFlag == 'M' ? "Money Line" : GamesArray.MasterCalcFlag == 'T' ? 'Total' : 'Spread'}
                {GamesArray.isTotalSelect1 == true ? " (Over)" : GamesArray.isTotalSelect2 == true ? " (Under)" : null}</Text> for <Text style={styles.dialogue_sub_text_label}>{title}</Text> . </Text>
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
                    onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag) }}
                    onFocus={this.handleFocusBA}
                    clearTextOnFocus={true}
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={{ padding: 8, paddingLeft: 4, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '80%' }}
                    placeholder='Enter Bet Amount'
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
                    onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("ATW") : this.handleKeyDown(e, value, "ATW", GamesArray.MasterCalcFlag) }}
                    onFocus={this.handleFocusAtW}
                    clearTextOnFocus={true}
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={{ padding: 8, paddingLeft: 4, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '92%' }}
                    placeholder='Enter Amount to Win'
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
            <View style={{ width: '48%', flexDirection: 'row' }}>
              <CheckBox
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
              </View>
            </View>

            <View style={{ width: '48%', flexDirection: 'row' }}>
              <CheckBox
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
              </View>
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
                          onChangeText={(text) => { this.setState({ amounttowin: text }) }}
                        />
                      </View>
                      <View style={{ width: '50%', flexDirection: 'column', borderLeftColor: '#cfcfcf', borderLeftWidth: 1 }}>
                        <TextInput
                          value={this.state.amounttowin}
                          style={{ padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder='My answer is...'
                          placeholderTextColor={'black'}
                          onChangeText={(text) => { this.setState({ amounttowin: text }) }}
                        />
                        <TextInput
                          value={this.state.amounttowin}
                          style={{ padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder='Other answer is...'
                          placeholderTextColor={'#888888'}
                          onChangeText={(text) => { this.setState({ amounttowin: text }) }}
                        />
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                          <Text style={{ padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.3), width: '65%', height: '100%', paddingTop: 12, backgroundColor: '#eeeeee' }}>ODDS</Text>
                          <Dropdown
                            containerStyle={{ paddingLeft: 8, margin: 0, borderBottomWidth: 0, justifyContent: "center", paddingBottom: 0, width: '35%', backgroundColor: '#eeeeee' }}
                            dropdownOffset={{ top: 0, left: 0 }}
                            dropdownMargins={{ min: 0, max: 0 }}
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
                {/*  */}
                <TouchableOpacity onPress={() => { this.CustomBetDialog() }}>
                  <View style={{ backgroundColor: '#68bcbc', margin: 5, paddingVertical: 7, justifyContent: "center", alignItems: 'center', borderRadius: 2 }}>
                    <Text style={{ paddingTop: 3, fontFamily: 'Montserrat-Bold', fontSize: hp(2.9), color: 'white' }} >PLACE BET</Text>
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
  //garima
  goToLoginPage() {
    this.setState({ guestUserDialog: false });

    this.props.navigation!.navigate(AppScreens.G_LoginPage);
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
            <View style={{ justifyContent: "center",backgroundColor: "#FFF"}} >
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
                    style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}
                    multiline={true}
                  />
                </View>


                <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, }}>
                  <View style={{ width: '80%', justifyContent: 'center', flexDirection: 'row', borderColor: '#dddddd', borderWidth: 1 }}>
                    <View style={{ width: '70%', padding: 5, justifyContent: 'center' }}>
                      <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>{this.state.FeedbackphotoName}</Text>
                    </View>
                    <View style={{ width: '30%', backgroundColor: '#dddddd', padding: 5, justifyContent: 'center', alignItems: "center" }}>
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

        {/* -------------------------------- Bet Placed Status Dialogue --------------------------------*/}

        <Dialog
          visible={this.state.MatchEventDialog}
          title=""
          onTouchOutside={() => this.setState({ guestUserDialog: false })} >

          <View style={{ backgroundColor: "white" }}>

            <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black', textAlign: 'center' }}>
                Unable to place bet ! The match is either in play or finished
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
          visible={this.state.guestUserDialog}
          title=""
          onTouchOutside={() => this.setState({ guestUserDialog: false })} >

          <View style={{ backgroundColor: "white" }}>

            <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
              Please register/login to use UDDA app
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
                  listener={() => { this.goToLoginPage() }} />
              </View>
            </View>
          </View>
        </Dialog>

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
              <Text style={styles.DialogHeaderText}> PROP BETS </Text>

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
          onTouchOutside={() => this.closeShareDialog()} >

          <View style={{ backgroundColor: "white" }}>
            <View style={{ justifyContent: "center" }} >

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '88%',alignItems:'center',marginTop:'2%' }}>
                  <Image source={require('../../../../images/udda_logo_white.png')} style={{ width: wp(30), height: wp(7), margin: 10, alignSelf: 'center' }} resizeMode='contain' />
                </View>
                <View style={{ width: '7%',alignItems:'flex-end',padding:'1%'}}>
                  <TouchableWithoutFeedback onPress={() => { this.closeShareDialog()}}>
                    <View>
                      <Image source={require('../../../../images/close.png')} style={{ height: 13, width: 13, alignSelf: 'flex-end'}}></Image>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              <View style={{ width: '100%', backgroundColor: '#cccccc', height: 1, marginTop: 1, padding: 0 }}></View>

              <View style={{ justifyContent: "center", padding: 10}}>

                <Text style={{ padding: 1, fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.7), marginTop: 3, color: 'black' }}>Message</Text>

                <View style={{ padding: 1, borderColor: '#cccccc', borderWidth: 1, marginTop: 5, }}>
                  <TextInput
                   multiline={true}
                 // value={this.state.Share_Show_Msg}
                  onChangeText={value => this.onChangeShareMsg(value)}
                  editable={true} style={{ padding: 8, width: '100%', height: 'auto' }}>{this.state.Share_Show_Msg}</TextInput>
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


        {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.dialogVisible}
          title=""
          onTouchOutside={() => this.setState({ dialogVisible: false })} >
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
                          placeholder='$ Enter bet to Win'
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
                          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.6), color: 'white' }}>PLACE BET</Text>
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
          <View style={{ height: 50, width: '100%', }}>
            <AdMobBanner
              bannerSize="smartBannerPortrait"
              adUnitID="ca-app-pub-3077576045869180/5426698953"
              testDeviceID="EMULATOR"
              didFailToReceiveAdWithError={(err: any) => {
                console.log('admob error' + JSON.stringify(err));
              }} />
          </View>
          <View style={[styles.mainContent, { width: '100%' }]}>


            {this.state.showOverlayGameSelectionFlag ? this.showOverlayGameSelection() : this.showGameSelectionAndOther()}



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

                {/*garima for scrolling issue*/}
                {this.state.NoData == true ?
                  <View style={styles.OtherTextContainer}>
                    <View style={styles.OtherTextSubContainer}>
                      <Text style={styles.UnderConstText}>No Matches Available</Text>
                      <Text style={[styles.DescText, { textAlign: 'center' }]}>Check back later when updates on this sport become available.</Text>
                    </View>
                  </View>
                  : null}
                {/*garima */}
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
                    return (
                      <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>
                      <View style={{ backgroundColor: '#999999' }}>
                        {/* --------------------- Date and game status---------------- */}
                        <View style={styles.flatlist_title_row}>

                          <View style={{ flexDirection: 'row', alignItems: 'center', width: '75%', paddingLeft: 4 }}>
                            <Text style={[styles.flatlist_title]}>
                              <Text style={{ textAlign: 'left', fontFamily: 'Montserrat-SemiBold' }}>
                                {Match_date[0]}
                              </Text>
                              <Text style={{ fontFamily: 'Montserrat-Regular' }}> {Match_date[1]} {Match_date[2]} </Text>
                              <Text style={{ fontFamily: 'Montserrat-Regular' }}>{formated_time} {zone}</Text>
                              {item.gameState == "FINAL" ? " - FINAL" : null}
                              <Text style={{ fontFamily: 'Montserrat-Regular' }}>{item.gameState == 'STARTED' ? " (" + item.quarter + ")" : null}</Text>

                            </Text>
                          </View>

                          <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'flex-end' }}>
                            <View style={{ backgroundColor: 'transparent' }}>
                              <View style={[{
                                borderRadius: item.gameState == 'PENDING' || item.gameState == '' ? hp(0) : hp(1.5),
                                borderWidth: item.gameState == 'PENDING' || item.gameState == '' ? 0 : 1,
                              }, styles.game_state_round_container]}>
                                <View style={[{ backgroundColor: item.gameState == 'PENDING' || item.gameState == '' ? '#888888' : 'orange' }, styles.game_state_round]}>
                                </View>
                              </View>
                            </View>
                            <View style={{}}>
                              <Text style={[{ color: item.gameState == 'PENDING' || item.gameState == '' ? '#888888' : '#68bcbc' }, styles.game_state_text]}> GAME STATS </Text>
                            </View>

                          </View>

                        </View>
                        {/* --------------------- table row ---------------- */}
                        <View style={{ width: '100%', height: 70, alignItems: 'center' }}>

                          <View style={styles.flatlist_data_whole_row}>

                            <View style={[styles.flatlist_data_row_vertical_line, { backgroundColor: ((item.gameState == 'PENDING' || item.gameState == '' || item.gameState == ' ') ? '#68bcbc' : 'orange') }]}></View>
                          {this.state.showSoccer==false?  <View style={styles.flatlist_data_4column}>
                              {/* --------------------- first row ---------------- */}
                              <View style={[styles.flatlist_data_row_height, { borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                  <Text style={styles.flatlist_matchup_text_style} ellipsizeMode={"tail"} >
                                    {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.away.t : item.games.MATCH_UPS.away.t}
                                  </Text>
                                  <Text style={styles.flatlist_matchup_count_text_style}>
                                    {item.games.MATCH_UPS.away.counts}
                                  </Text>

                                </View>

                                <TouchableWithoutFeedback onPress={() => item.games.MONEY_LINE.away.value == 0 ? null : this.getDialogueState(item, index, 'M', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.MONEY_LINE.away.result == "L" ? '#BBBBBB' : item.isMoneyLineSelect1 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isMoneyLineSelect1 == true ? '#68bcbc' : '',
                                    borderWidth: item.isMoneyLineSelect1 == true ? 1 : 0,
                                    borderRightWidth: 1,
                                  }, styles.flatlist_moneyline_style]}>
                                    <Text style={[{ color: item.games.MONEY_LINE.away.result == "L" ? '#666666' : item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {item.games.MONEY_LINE.away.value > 0 ? '+' : ''}{item.games.MONEY_LINE.away.value}
                                    </Text>
                                  </View>

                                </TouchableWithoutFeedback >

                                <TouchableWithoutFeedback onPress={() => item.games.TOTAL.away.value == 0 ? null : this.getDialogueState(item, index, 'T', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.TOTAL.away.result == "L" ? '#BBBBBB' : item.isTotalSelect1 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isTotalSelect1 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isTotalSelect1 == true ? '#68bcbc' : '',
                                    borderWidth: item.isTotalSelect1 == true ? 1 : 0,
                                    borderRightWidth: 1,
                                  }, styles.flatlist_total_style]}>
                                    <Text style={[{ color: item.games.TOTAL.away.result == "L" ? '#666666' : item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      O {item.games.TOTAL.away.other_value} ({Math.sign(item.games.TOTAL.away.value) == +1 ? '+' : ''}{item.games.TOTAL.away.value})
                                      </Text>
                                  </View>
                                </TouchableWithoutFeedback >

                                <TouchableWithoutFeedback onPress={() => item.games.SPREAD.away.other_value == 0 ? null : this.getDialogueState(item, index, 'S', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.SPREAD.away.result == "L" ? '#BBBBBB' : item.isSpreadSelect1 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isSpreadSelect1 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isSpreadSelect1 == true ? '#68bcbc' : '',
                                    borderWidth: item.isSpreadSelect1 == true ? 1 : 0,
                                    alignContent: 'center',
                                    borderRightWidth: 1,
                                  }, styles.flatlist_spread_style]}>
                                    <Text style={[{ color: item.games.SPREAD.away.result == "L" ? '#666666' : item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {Math.sign(item.games.SPREAD.away.other_value) == +1 ? '+' : ''}{item.games.SPREAD.away.other_value} ({Math.sign(item.games.SPREAD.away.value) == +1 ? '+' : ''}{item.games.SPREAD.away.value})
                                      </Text>
                                  </View>
                                </TouchableWithoutFeedback >

                              </View>
                              {/* --------------------- second row ---------------- */}

                              <View style={[styles.flatlist_data_row_height, { borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                  <View style={{ flexDirection: 'row', width: '80%' }}>
                                    <Text style={{
                                      fontFamily: 'Montserrat-Bold',
                                      fontSize: hp(1.4),
                                      color: '#68bcbc',
                                      paddingLeft: 2,
                                    }} ellipsizeMode={"tail"} >
                                      {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.home.t : item.games.MATCH_UPS.home.t}
                                        <Text>{""}</Text>
                                        <Text style={[styles.flatlist_matchup_text_style, { fontFamily: 'Montserrat-Regular', fontWeight: 'normal' }]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text>
                                    </Text>
                                    {/* <Text style={[styles.flatlist_matchup_text_style, { fontFamily: 'Montserrat-Regular', }]}>{(this.state.selected_Legue_id == '10') ? '' : '(H)'} </Text> */}
                                  </View>
                                  <Text style={styles.flatlist_matchup_count_text_style}>
                                    {item.games.MATCH_UPS.home.counts}
                                  </Text>
                                </View>

                                <TouchableWithoutFeedback onPress={() => item.games.MONEY_LINE.home.value == 0 ? null : this.getDialogueState2(item, index, 'M', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.MONEY_LINE.home.result == "L" ? '#BBBBBB' : item.isMoneyLineSelect2 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isMoneyLineSelect2 == true ? '#68bcbc' : '',
                                    borderWidth: item.isMoneyLineSelect2 == true ? 1 : 0,
                                    borderRightWidth: 1,
                                  }, styles.flatlist_moneyline_style]}>
                                    <Text style={[{ color: item.games.MONEY_LINE.home.result == "L" ? '#666666' : item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {item.games.MONEY_LINE.home.value > 0 ? '+' : ''}{item.games.MONEY_LINE.home.value}
                                    </Text>
                                  </View>
                                </TouchableWithoutFeedback>


                                <TouchableWithoutFeedback onPress={() => item.games.TOTAL.home.value == 0 ? null : this.getDialogueState2(item, index, 'T', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.TOTAL.home.result == "L" ? '#BBBBBB' : item.isTotalSelect2 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isTotalSelect2 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isTotalSelect2 == true ? '#68bcbc' : '',
                                    borderWidth: item.isTotalSelect2 == true ? 1 : 0,
                                    borderRightWidth: 1,
                                  }, styles.flatlist_total_style]}>
                                    <Text style={[{ color: item.games.TOTAL.home.result == "L" ? '#666666' : item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      U {item.games.TOTAL.home.other_value} ({Math.sign(item.games.TOTAL.home.value) == +1 ? '+' : ''}{item.games.TOTAL.home.value})
                                      </Text>
                                  </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => item.games.SPREAD.home.value == 0 ? null : this.getDialogueState2(item, index, 'S', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.SPREAD.home.result == "L" ? '#BBBBBB' : item.isSpreadSelect2 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isSpreadSelect2 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isSpreadSelect2 == true ? '#68bcbc' : '',
                                    borderWidth: item.isSpreadSelect2 == true ? 1 : 0,
                                    alignContent: 'center',
                                    borderRightWidth: 1,
                                  }, styles.flatlist_spread_style]}>
                                    <Text style={[{ color: item.games.SPREAD.home.result == "L" ? '#666666' : item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' : ''}{item.games.SPREAD.home.other_value} ({Math.sign(item.games.SPREAD.home.value) == +1 ? '+' : ''}{item.games.SPREAD.home.value})
                                      </Text>
                                  </View>
                                </TouchableWithoutFeedback>

                              </View>

                            </View>:  <View style={styles.flatlist_data_4column}>
                              {/* --------------------- first row soccer---------------- */}

                              <View style={[styles.flatlist_data_row_height, { borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                  <View style={{ flexDirection: 'row', width: '80%' }}>
                                    <Text style={{
                                      fontFamily: 'Montserrat-Bold',
                                      fontSize: hp(1.4),
                                      color: '#68bcbc',
                                      paddingLeft: 2,
                                    }} ellipsizeMode={"tail"} >
                                      {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.home.t : item.games.MATCH_UPS.home.t}
                                          <Text>{""}</Text>
                                          <Text style={[styles.flatlist_matchup_text_style, { fontFamily: 'Montserrat-Regular', fontWeight: 'normal' }]}>{(this.state.selected_Legue_id == '10') ? '' : '(H)'} </Text>
                                    </Text>
                                    {/* <Text style={[styles.flatlist_matchup_text_style, { fontFamily: 'Montserrat-Regular', }]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text> */}
                                  </View>
                                  <Text style={styles.flatlist_matchup_count_text_style}>
                                    {item.games.MATCH_UPS.home.counts}
                                  </Text>
                                </View>

                                <TouchableWithoutFeedback onPress={() => item.games.MONEY_LINE.home.value == 0 ? null : this.getDialogueState2(item, index, 'M', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.MONEY_LINE.home.result == "L" ? '#BBBBBB' : item.isMoneyLineSelect2 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isMoneyLineSelect2 == true ? '#68bcbc' : '',
                                    borderWidth: item.isMoneyLineSelect2 == true ? 1 : 0,
                                    borderRightWidth: 1,
                                  }, styles.flatlist_moneyline_style]}>
                                    <Text style={[{ color: item.games.MONEY_LINE.home.result == "L" ? '#666666' : item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {item.games.MONEY_LINE.home.value > 0 ? '+' : ''}{item.games.MONEY_LINE.home.value}
                                    </Text>
                                  </View>
                                </TouchableWithoutFeedback>


                                <TouchableWithoutFeedback onPress={() => item.games.TOTAL.home.value == 0 ? null : this.getDialogueState2(item, index, 'T', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.TOTAL.home.result == "L" ? '#BBBBBB' : item.isTotalSelect2 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isTotalSelect2 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isTotalSelect2 == true ? '#68bcbc' : '',
                                    borderWidth: item.isTotalSelect2 == true ? 1 : 0,
                                    borderRightWidth: 1,
                                  }, styles.flatlist_total_style]}>
                                    <Text style={[{ color: item.games.TOTAL.home.result == "L" ? '#666666' : item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      U {item.games.TOTAL.home.other_value} ({Math.sign(item.games.TOTAL.home.value) == +1 ? '+' : ''}{item.games.TOTAL.home.value})
                                      </Text>
                                  </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => item.games.SPREAD.home.value == 0 ? null : this.getDialogueState2(item, index, 'S', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.SPREAD.home.result == "L" ? '#BBBBBB' : item.isSpreadSelect2 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isSpreadSelect2 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isSpreadSelect2 == true ? '#68bcbc' : '',
                                    borderWidth: item.isSpreadSelect2 == true ? 1 : 0,
                                    alignContent: 'center',
                                    borderRightWidth: 1,
                                  }, styles.flatlist_spread_style]}>
                                    <Text style={[{ color: item.games.SPREAD.home.result == "L" ? '#666666' : item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' : ''}{item.games.SPREAD.home.other_value} ({Math.sign(item.games.SPREAD.home.value) == +1 ? '+' : ''}{item.games.SPREAD.home.value})
                                      </Text>
                                  </View>
                                </TouchableWithoutFeedback>

                              </View>
                              {/* --------------------- second row soccer ---------------- */}
                              <View style={[styles.flatlist_data_row_height, { borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                  <Text style={styles.flatlist_matchup_text_style} ellipsizeMode={"tail"} >
                                    {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.away.t : item.games.MATCH_UPS.away.t}
                                  </Text>
                                  <Text style={styles.flatlist_matchup_count_text_style}>
                                    {item.games.MATCH_UPS.away.counts}
                                  </Text>

                                </View>

                                <TouchableWithoutFeedback onPress={() => item.games.MONEY_LINE.away.value == 0 ? null : this.getDialogueState(item, index, 'M', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.MONEY_LINE.away.result == "L" ? '#BBBBBB' : item.isMoneyLineSelect1 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isMoneyLineSelect1 == true ? '#68bcbc' : '',
                                    borderWidth: item.isMoneyLineSelect1 == true ? 1 : 0,
                                    borderRightWidth: 1,
                                  }, styles.flatlist_moneyline_style]}>
                                    <Text style={[{ color: item.games.MONEY_LINE.away.result == "L" ? '#666666' : item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {item.games.MONEY_LINE.away.value > 0 ? '+' : ''}{item.games.MONEY_LINE.away.value}
                                    </Text>
                                  </View>

                                </TouchableWithoutFeedback >

                                <TouchableWithoutFeedback onPress={() => item.games.TOTAL.away.value == 0 ? null : this.getDialogueState(item, index, 'T', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.TOTAL.away.result == "L" ? '#BBBBBB' : item.isTotalSelect1 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isTotalSelect1 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isTotalSelect1 == true ? '#68bcbc' : '',
                                    borderWidth: item.isTotalSelect1 == true ? 1 : 0,
                                    borderRightWidth: 1,
                                  }, styles.flatlist_total_style]}>
                                    <Text style={[{ color: item.games.TOTAL.away.result == "L" ? '#666666' : item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      O {item.games.TOTAL.away.other_value} ({Math.sign(item.games.TOTAL.away.value) == +1 ? '+' : ''}{item.games.TOTAL.away.value})
                                      </Text>
                                  </View>
                                </TouchableWithoutFeedback >

                                <TouchableWithoutFeedback onPress={() => item.games.SPREAD.away.other_value == 0 ? null : this.getDialogueState(item, index, 'S', ArrayLength)}>
                                  <View style={[{
                                    backgroundColor: item.games.SPREAD.away.result == "L" ? '#BBBBBB' : item.isSpreadSelect1 != true ? '#68bcbc' : 'white',
                                    borderRightColor: item.isSpreadSelect1 != true ? 'white' : '#68bcbc',
                                    borderColor: item.isSpreadSelect1 == true ? '#68bcbc' : '',
                                    borderWidth: item.isSpreadSelect1 == true ? 1 : 0,
                                    alignContent: 'center',
                                    borderRightWidth: 1,
                                  }, styles.flatlist_spread_style]}>
                                    <Text style={[{ color: item.games.SPREAD.away.result == "L" ? '#666666' : item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                      {Math.sign(item.games.SPREAD.away.other_value) == +1 ? '+' : ''}{item.games.SPREAD.away.other_value} ({Math.sign(item.games.SPREAD.away.value) == +1 ? '+' : ''}{item.games.SPREAD.away.value})
                                      </Text>
                                  </View>
                                </TouchableWithoutFeedback >

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
                                <TouchableWithoutFeedback onPress={() => this.getBetDialogueState(item, index, ArrayLength)}>
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
                                </TouchableWithoutFeedback>
                              </View>
                            </View>

                          </View>
                        </View>
                        {
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
                        }
                      </View>
</Animated.View>
                    )
                  }} />

              </View>


            </View>
            {this.state.keyboardOpen == false ?
              <View style={{ height: '16%' }}>
                {this.state.DashboardCall == true ?
                  <FooterComponent
                    HighLightListner={this}
                    MostOpenedListener={this}
                    authorisationToken={this.authorisationToken}
                    ContesetJoinListner={this}
                    InIf={true}
                    legue_id={this.state.selected_Legue_id} />
                  : null}
                {this.state.showOverlayGameSelectionFlag ? <OverlayBackground /> : null}
              </View>
              : null}

            {this.state.keyboardOpen == false ?

              <View style={{ position: 'absolute', height: '100%', justifyContent: 'flex-end', marginBottom: '28%', marginLeft: '3%' }}>
                <TouchableWithoutFeedback onPress={() => { this.feedbackDialogOpen() }}>
                  <View style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={require('../../../../images/Feedback.png')}>
                    </Image>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              : null}



          </View>
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

  feedbackRequestStatus: state.serviceReducer.requestStatus,
  feedbackResponse: state.serviceReducer.response as FeedbackResponse,
  feedbackError: state.serviceReducer.error,

})

export default connect(mapStateToProps)(DashboardView);