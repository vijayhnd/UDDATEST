import React from "react";
import { Linking, View, Text, FlatList, TextInput, Platform, Alert, TouchableOpacity, ScrollView, AsyncStorage, Animated, UIManager,TouchableHighlight, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView,ImageBackground,Modal, PermissionsAndroid } from "react-native";
import styles from './styles';
import { SafeAreaView } from 'react-navigation';
import Container from '../../../../Components/Container';
import {AppEventsLogger} from 'react-native-fbsdk'; 
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { FooterComponent } from "../../../../Components/CustomComponents/Footer/FooterComponent";
//import { AdMobBanner } from 'react-native-admob';
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
import LocationResponse from '../../../../Services/Location/LocationResponse';
import UrlService from '../../../../Services/Core/ServiceURI';
import DateTimePicker from "react-native-modal-datetime-picker";
import ReferralService from "../../../../Services/Referral/ReferralService";
import LinearGradient from 'react-native-linear-gradient';
import CustomBetAFriendRequest from "../../../../Services/Bets/CustomBetAFriendRequest";
import CustomBetAFriendResponseParser from "../../../../Services/Bets/CustomBetAFriendResponseParser";
import CustomBetAFriendResponse from "../../../../Services/Bets/CustomBetAFriendResponse";
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import { InterstitialAd, RewardedAd, BannerAd, TestIds } from '@react-native-firebase/admob';
import { BannerAdSize } from '@react-native-firebase/admob';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const { State: TextInputState } = TextInput;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MovableView from 'react-native-movable-view'
import Draggable from 'react-native-draggable';
import crashlytics from '@react-native-firebase/crashlytics';
import * as RNLocalize from "react-native-localize";
import LogoutUtill from "../../../../Util/LogoutUtill";
import Messgae from "../../../../Services/Core/Messages"
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";
// import LogoutUtill from "../../../Util/LogoutUtill";

var update = require('immutability-helper');

console.disableYellowBox = true;

const ProfilePageContent = {
  key: 'somethun',
  page_title: '',
}
const deviceTimeZone = RNLocalize.getTimeZone();

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

  customBetaFriendRequestStatus?: ServiceRequestStatus
  customBetaFriendResponse?: CustomBetAFriendResponse
  customBetaFriendError?: UDDAError
  locationRequestStatus?: ServiceRequestStatus
  locationResponse?: LocationResponse
  currentLocationError?: UDDAError

  serviceKey?: string
  listeners?: any
  setting:false;
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
  dashboard_team_id:any;
   nextDate:any;
  preDate:any;
  apinextDate: any;
  apipreDate: any;
  custonDropDown: any;
  custonDropDownvalue: any;
  showProBasketBall: any;
  textlength:any;
  POSTWinAmount:any;
  userStatusDialog:any;
  imagezoom:any;
  overlaycurrent:any;
  overlaylocal:any;
  aceeptoverlay:any;
  
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
  private referralservice = new ReferralService(); //Vijay
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  public filterData: any;
  public selectedItemData: any;
  focusListener:any;
  isfontSize: any;
  isMainBlockHeight: any;
  blockHeight: any;
  drawblockHeight: any;
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
    value: 'International Teams'
  },
  {
    value: 'Spanish La Liga'
  },
  {
    value: 'Italian Series A'
  },
  {
    value: 'German Bundesliga'
  },
  {
    value: 'French Ligue 1'
  }

  ];

  /*  For Auto Racing and Horse Racing */
  dataAutoRacing = [{
    value: 'NASCAR',
  }, {
    value: 'Indy 500',
  },
  {
    value: 'F1',
  },
    /*  {
       value: 'ALL',
     }, */

  ];
  dataHorseRacing = [{
    value: 'Kentucky Derby',
  }, {
    value: 'Preakness',
  },
  {
    value: 'Belmont',
  },
    /* {
      value: 'ALL',
    }, */

  ];
  /*  End Auto Racing and Horse Racing */

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
      checkedBetText: 'P1',
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
      selected_Legue_id: '',
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
      groupType: '', //garima
      ReferString: '',
      isEditable: false,
      postQuestion: '',
      postAnswer: '',
      postOdds: '',
      /*  For Auto Racing and Horse Racing */
      showAutoRacing: false,
      showHorseRacing: false,
      selectedAutoRacingValue: 'NASCAR',
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
      showClgFootball:false,
      showClgBasketBall:false,
      dashboard_team_id:'',
      nextDate:'',
      preDate: '',
      apinextDate: '',
      apipreDate: '',
      custonDropDown: false,
      custonDropDownvalue: 'Select Custom Bet',
      showProBasketBall:false,
      textlength:0,
      POSTWinAmount:'',
      userStatusDialog:false,
      imagezoom:false,
      overlaycurrent:'',
  overlaylocal:'',
  aceeptoverlay:true
     

    };

    
  }

   
  async saveoverlay(){
    this.setState({overlaylocal:'true'})
    try {
      await AsyncStorage.setItem('overlay', 'true');
      this.setState({imagezoom:false})
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  async closecurrent(){
    this.setState({overlaycurrent:'true'})
    this.setState({imagezoom:false})
    try {
      await AsyncStorage.setItem('overlaycurrent', 'true');
     
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
async openoverlay(){
 
  // let userId = '';
  //   let current='';
  //   var that = this;
  //   try {
  //     userId = await AsyncStorage.getItem('overlay');
  //     current = await AsyncStorage.getItem('overlaycurrent');
  //     console.log('overlay response',userId)
  //     if(userId == 'true')
  //     {
  //       // this.setState({imagezoom:false})
  //       setTimeout(() => {
  //         that.setState({imagezoom:false})
  //       }, 1000);
  //     }else{
  //       if(current == 'true')
  //       {
  //         setTimeout(() => {
  //           that.setState({imagezoom:false})
  //         }, 1000);
  //         // this.setState({imagezoom:false})
  //       }else{
  //         setTimeout(() => {
  //           that.setState({imagezoom:true})
  //         }, 1000);
  //         // this.setState({imagezoom:true})
  //       }
        
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
}
  async componentDidMount() {
  //   if (Application.sharedApplication().user!.profile.userType == 'Guest') 
  //   {
  //     console.log('not guest')
    
  // }else{
  //   LogoutUtill.logoutButtonPressed(this.props);
  // }
     //AppEventsLogger.logEvent('uddatest1');
    console.log('deviceTimeZone',deviceTimeZone);
    var isFontsize:any;
    this.isfontSize = (isFontsize == '1.4') ? 'font_small' : ((isFontsize == '1.8') ? 'font_medium' : 'font_large');
    this.isMainBlockHeight = (isFontsize == '1.4') ? 'mainblockheight_small' : ((isFontsize == '1.8') ? 'mainblockheight_medium' : 'mainblockheight_large');
    this.blockHeight = (isFontsize == '1.4') ? 'blockheight_small' : ((isFontsize == '1.8') ? 'blockheight_medium' : 'blockheight_large');
    this.drawblockHeight = (isFontsize == '1.4') ? 'drawblockheight_small' : ((isFontsize == '1.8') ? 'drawblockheight_medium' : 'drawblockheight_large');
   
    console.log('@pky' + Application.sharedApplication().DeeplinkName);
    this.focusListener = this.props.navigation.addListener('willFocus', async () => {
    ///alert(11);
      if (this.props.navigation.state.params) {
      if (typeof this.props.navigation?.state.params.setting != undefined && this.props.navigation?.state.params.setting){
        
        console.log('did fouctttttttttttt');
        isFontsize = await AsyncStorage.getItem('isfontSize');
        this.isfontSize = (isFontsize == '1.4') ? 'font_small' : ((isFontsize == '1.8') ? 'font_medium' :'font_large');
        this.isMainBlockHeight = (isFontsize == '1.4') ? 'mainblockheight_small' : ((isFontsize == '1.8') ? 'mainblockheight_medium' :'mainblockheight_large');
        this.blockHeight = (isFontsize == '1.4') ? 'blockheight_small' : ((isFontsize == '1.8') ? 'blockheight_medium' :'blockheight_large');
        this.drawblockHeight = (isFontsize == '1.4') ? 'drawblockheight_small' : ((isFontsize == '1.8') ? 'drawblockheight_medium' :'drawblockheight_large');
        this.loadMore(true);
       // alert('in if' + this.isfontSize + ' is main block height ' + this.isMainBlockHeight + ' block height' + this.blockHeight); 
      }
      
    }else{
        isFontsize = await AsyncStorage.getItem('isfontSize');
        this.isfontSize = (isFontsize == '1.4') ? 'font_small' : ((isFontsize == '1.8') ? 'font_medium' : 'font_large');
        this.isMainBlockHeight = (isFontsize == '1.4') ? 'mainblockheight_small' : ((isFontsize == '1.8') ? 'mainblockheight_medium' : 'mainblockheight_large');
        this.blockHeight = (isFontsize == '1.4') ? 'blockheight_small' : ((isFontsize == '1.8') ? 'blockheight_medium' : 'blockheight_large');
        this.drawblockHeight = (isFontsize == '1.4') ? 'drawblockheight_small' : ((isFontsize == '1.8') ? 'drawblockheight_medium' : 'drawblockheight_large');
     
       //alert('in else' + this.isfontSize + ' is main block height ' + this.isMainBlockHeight + ' block height' + this.blockHeight); 
    }
    
        
    });
    this.getCurrentLocation();
     let userId = '';
    let current='';
    var that = this;
    try {
      userId = await AsyncStorage.getItem('overlay');
      current = await AsyncStorage.getItem('overlaycurrent');
      console.log('overlay response',userId)
      if(userId == 'true')
      {
        that.setState({overlaylocal:'true'})
        // this.setState({imagezoom:false})
        // setTimeout(() => {
        //   that.setState({imagezoom:false})
        // }, 1000);
      }else{
        if(current == 'true')
        {console.log('current overlay value true : =',current)
          that.setState({overlaycurrent:'true'})
         
        }else{
          console.log('current overlay value false := ',current)
          that.setState({overlaycurrent:'false'})
      
        }
        
      }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    admob()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance ////
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,
  })
  .then(() => {
   
    // Request config successfully set!
  });
    //AlertUtil.show("fmg");
    //RouterBuilder.replaceRouteTo(AppScreens.G_QuickGuide,this.props);
    //return;
    //console.log("deeplink componentDidMount dashboard 1" + this.DeeplinkName);
    //Application.sharedApplication().DeeplinkName = this.DeeplinkName;
   
    //alert(Dimensions.get('window').height);

   
    if (Platform.OS === 'ios') {
      

      if (Application.sharedApplication().DeeplinkName == 'propsbet/') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'oddsbet/') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'contestbet/') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_InvitationToJoin);
      }
      else if (Application.sharedApplication().DeeplinkName == 'custombet/') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'poolbet/') {
        this.setState({aceeptoverlay:false});
        //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'bingo/') {
        this.setState({aceeptoverlay:false});
        //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
        
        this.props.navigation!.navigate(AppScreens.G_AcceptBingo);
      } else if (Application.sharedApplication().DeeplinkName == 'customsquare/') {
        this.setState({aceeptoverlay:false});
        //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
        
        this.props.navigation!.navigate(AppScreens.G_AcceptSquare);
      }

      else if (Application.sharedApplication().DeeplinkName == 'oddsbet/private/' || Application.sharedApplication().DeeplinkName == 'oddsbet/public/') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      
      else {
        AppState.addEventListener('change', this._handleAppStateChange);
      }
//"http://bet.udda.com/index.php?t=customsquare&i="
    }
    else {
      //console.log("garima " + this.DeeplinkName);
      if (Application.sharedApplication().DeeplinkName == 'index.php?propsbet/') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?contestbet/') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_InvitationToJoin);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?oddsbet/') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?propsbet/private') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?propsbet/public') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?oddsbet/private') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?oddsbet/public') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?custombet/') {
        this.setState({aceeptoverlay:false});
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?poolbet/' ) {
        this.setState({aceeptoverlay:false});
       // this.props.navigation!.navigate(AppScreens.G_ImageZoom);
       this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?bingo/') {
        this.setState({aceeptoverlay:false});
        //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
        
        this.props.navigation!.navigate(AppScreens.G_AcceptBingo);
      }
      else if (Application.sharedApplication().DeeplinkName == 'index.php?customsquare/' ) {
        this.setState({aceeptoverlay:false});
        // this.props.navigation!.navigate(AppScreens.G_ImageZoom);
        this.props.navigation!.navigate(AppScreens.G_AcceptSquare);
       }

      else {
        AppState.addEventListener('change', this._handleAppStateChange);
      }

    }
    this.setState({ DataList: [], startPage: 1 })//ashish_today
   this.getProfile();
   
    let defaultLeagueId = await this.getDefaultLeagueId();
    console.log('defaultLeagueId', defaultLeagueId);
    if (defaultLeagueId) {
      if (defaultLeagueId == '3' || defaultLeagueId == '8') {
        this.setState({ showProBasketBall: true }); //vijay
      }
      this.setState({ selected_Legue_id: defaultLeagueId });
      this.callMethod(defaultLeagueId, '', 1);
    }
    //this.callMethod(3, '', 1);
    this.GETPromotionalMSG();
   // AsyncStorage.removeItem("isupadte");
    var isFontsize:any = await AsyncStorage.getItem('isupadte');
    var that = this;
    if(isFontsize !='1' ){
    AsyncStorage.setItem('isupadte', '1');
  // setTimeout(function(){ that.checkVersionUpdate();},7000)
    }

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
    this.focusListener.remove();
   

  }
  componentWillMount() {
    var that = this;
  
    console.log("componentwillmount");
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    
  }


  handleKeyboardDidShow = (event: any) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
    console.log(currentlyFocusedField);
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap =  (windowHeight - keyboardHeight) - (fieldTop + fieldHeight + fieldHeight ) || 0;
      console.log(gap)
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
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_promotional_message', {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // this.logoutButtonPressed();
          LogoutUtill.logoutButtonPressed(this.props);
        }else
       { console.log('GETPromotionalMSG ' + JSON.stringify(responseJson));
        if (responseJson.message = "success promotional message") {
          this.setState({ BetPromotionalMsg: responseJson.data.promotional_array[0].gaming_promotional_message })
        } else {
          this.setState({ BetPromotionalMsg: responseJson.message });
        }}
        

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
          else if (Application.sharedApplication().DeeplinkName == 'poolbet/' ) {
            //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
            this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
          }
          else if (Application.sharedApplication().DeeplinkName == 'oddsbet/') {
            this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
          }
          else if (Application.sharedApplication().DeeplinkName == 'contestbet/') {
            this.props.navigation!.navigate(AppScreens.G_InvitationToJoin);
          }else if (Application.sharedApplication().DeeplinkName == 'customsquare/' ) {
            // this.props.navigation!.navigate(AppScreens.G_ImageZoom);
            this.props.navigation!.navigate(AppScreens.G_AcceptSquare);
           }
           else if (Application.sharedApplication().DeeplinkName == 'bingo/') {
            this.setState({aceeptoverlay:false});
            //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
            
            this.props.navigation!.navigate(AppScreens.G_AcceptBingo);
          }
           else if (Application.sharedApplication().DeeplinkName == 'oddsbet/private/' || Application.sharedApplication().DeeplinkName == 'oddsbet/public/') {
            this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
          }
     

        } 
        else {
          console.log('Not DeepLink');
        }
      }

    }

    else {

      console.log("dashboard deeplink" + JSON.stringify(Application.sharedApplication().DeeplinkName));
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
          /* if (Application.sharedApplication().DeeplinkName == 'propsbet/') {
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
           }*/
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
          else if (Application.sharedApplication().DeeplinkName == 'index.php?custombet/') {
            this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
          }
          else if (Application.sharedApplication().DeeplinkName == 'index.php?poolbet/' ) {
            //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
            this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
          }else if (Application.sharedApplication().DeeplinkName == 'index.php?customsquare/' ) {
            // this.props.navigation!.navigate(AppScreens.G_ImageZoom);
            this.props.navigation!.navigate(AppScreens.G_AcceptSquare);
           }
           else if (Application.sharedApplication().DeeplinkName == 'index.php?bingo/') {
            this.setState({aceeptoverlay:false});
            //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
            
            this.props.navigation!.navigate(AppScreens.G_AcceptBingo);
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
        this.setState({ DataList: [], startPage: 1 })//ashish_today
        this.callMethod(this.state.selected_Legue_id, '', 1);
      } break;
      case 2: {
        this.setState({ DataList: [], startPage: 1 })//ashish_today
        this.callMethod(this.state.selected_Legue_id, '', 1);
      } break;
      case 3: {
        this.setState({ DataList: [], startPage: 1 })//ashish_today
        this.callMethod(this.state.selected_Legue_id, '', 1);
      } break;

    }

  }

  //  ---------------------------------------------- API CALLING --------------------------------------------


  /**
   * 
   * @param league_id 
   *  Description: Get all the team for league id 2 and 4 (College Football and College Basketball)
   */

   call_team_list_by_league(league_id: any, value: any): Promise<any> {
     var that = this;
     that.setState({ loader: true });
    return new Promise(function (resolve, reject) {
   
      var params: any = {
        'league_id': league_id,
      };

      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }
   
      fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/college_team_list_by_league', {
        method: 'POST',
        headers: {
          'authorisation': that.authorisationToken
        },
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
          that.setState({ loader: false });
          if (responseJson.message == "Access Expired.") {
            console.log("Footer comp ---->" + responseJson.message);
            // this.logoutButtonPressed();
            LogoutUtill.logoutButtonPressed(this.props);
          } else{
            console.log('Success team_list_by_league' + JSON.stringify(responseJson.data.leagues_array));
          if (responseJson.data.leagues_array) {

            const drop_down_data = responseJson.data.leagues_array.map((element: any) => ({
              value: element.group_type,
              label: element.group_name
            }));
            console.log(drop_down_data);
            resolve(drop_down_data);

          }}


        })
        .catch(error => {
          that.setState({ loader: false });
          console.log(error);
          reject(error);
          //AlertUtil.show('error ' + JSON.stringify(error));
        })

    })
  }

  /**
       * 
       * 
       *  Description: Get Default league Id
       */

  getDefaultLeagueId(): Promise<any> {
    var that = this;
    that.setState({ loader: true });
    return new Promise(function (resolve, reject) {
      fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/get_leagues_new', {
        method: 'GET',
        headers: {
          'authorisation': that.authorisationToken
        },
      }).then((response) => response.json())
        .then((responseJson) => {
          that.setState({ loader: false });
          if (responseJson.message == "Access Expired.") {
            // AlertUtil.show("Session Expired ! Please login again");
            console.log("Footer comp ---->" + responseJson.message);
            // this.logoutButtonPressed();
            LogoutUtill.logoutButtonPressed(this.props);
          }else{
          if (responseJson.data.defaultSelection) {
            console.log('defaultSelection', responseJson.data.defaultSelection);
            resolve(responseJson.data.defaultSelection);
          }
        }
        })
        .catch(error => {
          that.setState({ loader: false });
          console.log(error);
          reject(error);
          //AlertUtil.show('error ' + JSON.stringify(error));
        })

    })
  }



  //@pky 


  getCustomProbBetList(event_idd: any, league_idd: any) {
console.log('event_idd : ',event_idd)
console.log('league_idd : ',league_idd)
    //this.setState({ loader: true });
    // var url;

    //     url = UrlService.CONSTURI + UrlService.APIVERSION3 +'/apiGaming/custom_props_result_publish_info' + id;


    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'authorisation': this.authorisationToken
    //     },
    // })


    var params: any = {
      'event_id': event_idd,
      'league_id': league_idd,
      'contest_id': ''
    };

    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/generate_custom_props', {
      method: 'POST',
      headers: {
        'authorisation': this.authorisationToken
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loader: false });
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // this.logoutButtonPressed();
          LogoutUtill.logoutButtonPressed(this.props);
        }else
       {
        this.setState({ customProbBetList: responseJson.data });
        this.setState({ searchData: responseJson.data });


        console.log('Success openplay' + JSON.stringify(this.state.customProbBetList));
        // this.setState({ dialogVisible: true });
       }
      })
      .catch(error => {
        this.setState({ loader: false });
        console.log(error);
      })






  }

  showcustomDialog(isShow: any) {
    this.setState({
      customProbBetList: this.state.searchData,
      searchText: '',
    })
    this.setState({ iscustomdialog: isShow });
  }


  publishCustomBet(item: any) {
    if (this.state.result == '') {
      alert('please select result')
    } else {
      // this.setState({ loader: true });
      // var url;
      console.log('result by ashish', this.state.result)
      //     url = UrlService.CONSTURI + UrlService.APIVERSION3 +'/apiGaming/custom_props_result_publish_info' + id;


      // fetch(url, {
      //     method: 'POST',
      //     headers: {
      //         'authorisation': this.authorisationToken
      //     },
      // })
      this.setState({ iscustomdialog: false })
      var that = this;
      var params: any = {
        'custom_prop_id': item.custom_props.id,
        'publish_result': this.state.result,
        'contest_id': '',
        'contest_type': ''
      };

      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }

      fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/publish_custom_props_result', {
        method: 'POST',
        headers: {
          'authorisation': this.authorisationToken
        },
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.message == "Access Expired.") {
            // AlertUtil.show("Session Expired ! Please login again");
            console.log("Footer comp ---->" + responseJson.message);
            // this.logoutButtonPressed();
            LogoutUtill.logoutButtonPressed(this.props);
          }else
         {
          this.getCustomProbBetList(this.state.selectedBetData.event_id, this.state.selectedBetData.league_id)
          that.setState({ loader: false });
          // this.setState({ customProbBetList: responseJson.data });
          // console.log('Success openplay' + JSON.stringify(this.state.customProbBetList));
          that.setState({ iscustomdialog: false })

          // this.setState({ dialogVisible: true });
          alert(responseJson.message+'pky');
        }
          
        })
        .catch(error => {
          that.setState({ iscustomdialog: false })
          that.setState({ loader: false });
          console.log(error);
        })
    }
  }

  //@pky end
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


  async callMethod(league_id: any, value: any, count: any) {

    if (league_id==""){
      this.setState({ showProBasketBall: false });//ashish
      this.setState({ showFighting: false }); //garima
      this.setState({ showSoccer: false });
      this.setState({ showAutoRacing: false }); //vijay
      this.setState({ showHorseRacing: false }); //vijay
      this.setState({ showClgBasketBall: false }); //vijay
      this.setState({ showClgFootball: false }); //vijay
      this.setState({ showProBasketBall: false }); 
      this.setState({custonDropDown:true})
      if (Application.sharedApplication().user!.profile.userType == 'Guest') {
        this.setState({ guestUserDialog: true });
    }else{

      //this.props.navigation!.navigate(AppScreens.G_Createpool);
    //  this.props.navigation!.navigate(AppScreens.G_Settlepool);
      // this.props.navigation!.navigate(AppScreens.G_ImageZoom);
      // this.props.navigation!.navigate(AppScreens.G_CustomBet);
      return;
    }
    }else{
      this.setState({custonDropDown:false})
    this.setState({ showView: true });
    console.log('ashish start_page no :', this.state.startPage)

    console.log("garima" + league_id);
    var numberofRows = Application.sharedApplication().user!.profile.dashboard_number_of_matches!;
    console.log('ashish no of rows call method  :', numberofRows)
      this.setState({ settype: '' });
    if (league_id == 10) {
      this.setState({ showFighting: true }); //garima
      this.setState({ showSoccer: false });
      this.setState({ showAutoRacing: false }); //vijay
      this.setState({ showHorseRacing: false }); //vijay
      this.setState({ showClgBasketBall: false }); //vijay
      this.setState({ showClgFootball: false }); //vijay
      this.setState({ showProBasketBall: false }); //vijay
      //this.setState({ selectedValue: 'UFC' });//garima
      if (value == "UFC") {
        this.groupType = "ufc"

      }
      else if (value == "BOXING") {
        this.groupType = "boxing"
      }
      else {
        this.groupType = "ufc"
        this.setState({ selectedValue: 'UFC' });//garima
      }

    }
    else if (league_id == 9) {
      this.setState({ showSoccer: true });
      this.setState({ showFighting: false });
      this.setState({ showAutoRacing: false }); //vijay
      this.setState({ showHorseRacing: false }); //vijay
      this.setState({ showClgBasketBall: false }); //vijay
      this.setState({ showClgFootball: false }); //vijay
      this.setState({ showProBasketBall: false }); //vijay
      if (value == "English Premier League") {
        this.groupType = "eng_premier"

      }
      else if (value == "UEFA Champions League") {
        this.groupType = "uefa_champions"
      }
      else if (value == "UEFA Europa League") {
        this.groupType = "uefa_europa"
      }
      else if (value == "MLS") {
        this.groupType = "mls"
      }
      else if (value == "International Teams") {
        this.groupType = "international_teams"
      }
      else if (value == "Spanish La Liga") {
        this.groupType = "spain_la_liga"
      }
      else if (value == "Italian Series A") {
        this.groupType = "italy_serie_a"
      }
      else if (value == "German Bundesliga") {
        this.groupType = "german_bundesliga"
      }
      else if (value == "French Ligue 1") {
        this.groupType = "france_ligue"
      }
      else {
        this.groupType = "eng_premier"
      //  this.groupType = "uefa_champions"
        this.setState({ selectedSoccerValue: 'English Premier League' });//garima
      }
    } else if (league_id == 14) {
      this.setState({ showFighting: false });
      this.setState({ showSoccer: false });
      this.setState({ showAutoRacing: true }); //vijay
      this.setState({ showHorseRacing: false }); //vijay
      this.setState({ showClgBasketBall: false }); //vijay
      this.setState({ showClgFootball: false }); //vijay
      this.setState({ showProBasketBall: false }); //vijay
      //this.setState({ selectedValue: 'UFC' });//garima
      if (value == "NASCAR") {
        this.groupType = "nascar"

      }
      else if (value == "Indy 500") {
        this.groupType = "indy"
      }
      else if (value == "F1") {
        this.groupType = "formula_one"
      }
      else {
        this.groupType = "nascar"
        this.setState({ selectedAutoRacingValue: 'NASCAR' });
      }

    } else if (league_id == 22) {
      this.setState({ showFighting: false });
      this.setState({ showSoccer: false });
      this.setState({ showAutoRacing: false }); //vijay
      this.setState({ showHorseRacing: true }); //vijay
      this.setState({ showClgBasketBall: false }); //vijay
      this.setState({ showClgFootball: false }); //vijay
      this.setState({ showProBasketBall: false }); //vijay
      //this.setState({ selectedValue: 'UFC' });//garima
      if (value == "Kentucky Derby") {
        this.groupType = "kentucky"

      }
      else if (value == "Preakness") {
        this.groupType = "preakness"
      }
      else if (value == "Belmont") {
        this.groupType = "belmont"
      }
      else {
        this.groupType = "kentucky"
        this.setState({ selectedHorseRacingValue: 'Kentucky Derby' });
      }

    } else if (league_id == 2) {
      if (value == "") {
       var teamData = await this.call_team_list_by_league(league_id, value);
        this.setState({ legueArrayTeamData: teamData });
        this.setState({ dashboard_team_id: teamData[0].value });
      }
      this.setState({ showFighting: false });
      this.setState({ showSoccer: false });
      this.setState({ showAutoRacing: false }); //vijay
      this.setState({ showHorseRacing: false }); //vijay
      this.setState({ showClgBasketBall: false }); //vijay
      this.setState({ showClgFootball: true }); //vijay
      this.setState({ showProBasketBall: false }); //vijay
      //this.setState({ selectedValue: 'UFC' });//garima
      this.groupType = this.state.dashboard_team_id

    } else if (league_id == 4) {
      if (value == "") {
        var teamData = await this.call_team_list_by_league(league_id, value);
        this.setState({ legueArrayTeamData: teamData });
        this.setState({ dashboard_team_id: teamData[0].value });
      }
      
      this.setState({ showFighting: false });
      this.setState({ showSoccer: false });
      this.setState({ showAutoRacing: false }); //vijay
      this.setState({ showHorseRacing: false }); //vijay
      this.setState({ showClgBasketBall: true }); //vijay
      this.setState({ showClgFootball: false }); //vijay
      this.setState({ showProBasketBall: false }); //vijay
      //this.setState({ selectedValue: 'UFC' });//garima
      this.groupType = this.state.dashboard_team_id
    } else if (league_id == 3 || league_id == 8) {
      if (value == "") {
        var teamData = await this.call_team_list_by_league(league_id, value);
        this.setState({ legueArrayTeamData: teamData });
        this.setState({ dashboard_team_id: teamData[0].value });
      }
      this.setState({ showFighting: false });
      this.setState({ showSoccer: false });
      this.setState({ showAutoRacing: false }); //vijay
      this.setState({ showHorseRacing: false }); //vijay
      this.setState({ showClgBasketBall: false }); //vijay
      this.setState({ showClgFootball: false }); //vijay
      this.setState({ showProBasketBall: true }); //vijay
      //this.setState({ selectedValue: 'UFC' });//garima
      this.groupType =''

    } else {
      this.groupType = ""
      this.setState({ showFighting: false }); //garima
      this.setState({ showSoccer: false }); //garima
      this.setState({ showAutoRacing: false }); //vijay
      this.setState({ showHorseRacing: false }); //vijay
      this.setState({ showClgBasketBall: false }); //vijay
      this.setState({ showClgFootball: false }); //vijay
      this.setState({ showProBasketBall: false }); //vijay
    }
    this.setState({ loader: true });
    this.setState({ DashboardCall: false });


    this.setState({ currentWeekTitle: 'WEEK' })
    this.setState({ currentweekindex: 0 })//@pky change here to jump week
    this.setState({ pastWeekTitle: 'PAST RESULTS' })
    this.setState({ upcomingGameTitle: 'NEXT MATCH' })
    this.setState({ RealpastWeekTitle: 'PAST RESULTS' })
    this.setState({ RealupcomingGameTitle: 'NEXT MATCH' })
    this.setState({ selected_Legue_id: league_id });

    if(numberofRows=='All')
   
    { console.log('numberof rows condition  :  true ')
      var params: any = {
      'league_id': league_id,
      'group_type': this.groupType,
      'start': '',
      'per_page': '',
      'match_start_next_date': this.state.nextDate,
      'match_start_prev_date': this.state.preDate,
      'timezone': deviceTimeZone
    };}else{
      console.log('numberof rows condition  :  false ')
      var params: any = {
        'league_id': league_id,
        'group_type': this.groupType,
        'start': count,
        'per_page': numberofRows,
        'match_start_next_date': this.state.nextDate,
        'match_start_prev_date': this.state.preDate,
        'timezone': deviceTimeZone
      };
    }
    //start,per_page

console.log('myparams',params);
console.log( this.authorisationToken);


    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
      body: formData,

    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({ loader: false });
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // this.logoutButtonPressed();
          LogoutUtill.logoutButtonPressed(this.props);
        }else
       {
        if(this.state.overlaylocal=='true')
      {console.log('overlaylocal true')
        this.setState({imagezoom:false})
      }else{
        if(this.state.overlaycurrent=='true')
        {console.log('overlaycurrent true')
          this.setState({imagezoom:false})
        }else{
          console.log('overlaycurrent false')
          this.setState({imagezoom :true})
        }
      }


        // this.openoverlay();
        // this.setState({imagezoom:true})
        this.setState({ DashboardCall: true });
        console.log('Dashboard Data ' + JSON.stringify(responseJson));
        this.setState({ nextDate: responseJson.data.match_start_next_date });
        this.setState({ preDate: responseJson.data.match_start_prev_date });
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
          if(league_id=='1'){
            this.setState({ upcomingGameTitle: responseJson.data.upcoming_range });
            this.setState({ pastWeekTitle: responseJson.data.past_range });
          }
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
          // this.setState({
          //   DataList: responseJson.data.events_array.map((x: any) => ({
          //     event_id: x.event_id,
          //     league_id: x.league_id,
          //     event_status: x.event_status,
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
            DatatwoList: responseJson.data.events_array.map((x: any) => ({
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
            }))
          });
          const interest = [...this.state.DataList, ...this.state.DatatwoList];
          this.setState({ DataList: interest })
          if(numberofRows=='All')
          {
            this.setState({ showView: false })
          }else{if (this.state.DatatwoList.length < numberofRows) {
            console.log('ashish data sowview false')
            this.setState({ showView: false })
          } else {
            console.log('ashish data sowview true')
            this.setState({ showView: true })
          }}

          this.setState({ NoData: false });
        }
        else {
          // this.setState({ DataList: [] });
          if (this.state.DataList.length == 0) {
            this.setState({ NoData: true });
          } else {
            this.setState({ showView: false })
          }
        }
      }
      
      })
      .catch(error => {
        this.setState({ DataList: [] });
        this.setState({ loader: false });
        console.log(error);
      })

    }
  }



  prev_next_dashboard_API_call(currentindex: any, flagofindex: any, count: any, currIndVal: any,isloadMore: any) {
    this.setState({ showView: true });
    console.log('ashish start_page no :', count)
    var numberofRows = Application.sharedApplication().user!.profile.dashboard_number_of_matches!;
    console.log('ashish no of rows call method  :', numberofRows)
    this.setState({ currentweekindex: currentindex });
    console.log("Current Index Dashboard Week" + currentindex);
    this.setState({ loader: true });

    if (currentindex == 0) {
      this.setState({ DataList: [], startPage: 1 })//ashish_today
      this.callMethod(this.state.selected_Legue_id, '', 1);
    }
    else {
      if (this.state.selected_Legue_id == 10) {
        this.setState({ showFighting: true }); //garima
        this.setState({ showSoccer: false });
        this.setState({ showAutoRacing: false }); //vijay
        this.setState({ showHorseRacing: false }); //vijay
        this.setState({ showClgBasketBall: false }); //vijay
        this.setState({ showClgFootball: false }); //vijay
        //this.setState({ selectedValue: 'UFC' });//garima
        if (this.state.selectedValue == "UFC") {
          this.groupType = "ufc"

        }
        else {
          this.groupType = "boxing"
        }
      }
      else if (this.state.selected_Legue_id == 9) {
        this.setState({ showSoccer: true });
        this.setState({ showFighting: false });
        this.setState({ showAutoRacing: false }); //vijay
        this.setState({ showHorseRacing: false }); //vijay
        this.setState({ showClgBasketBall: false }); //vijay
        this.setState({ showClgFootball: false }); //vijay
        if (this.state.selectedSoccerValue == "English Premier League") {
          this.groupType = "eng_premier"

        }
        else if (this.state.selectedSoccerValue == "UEFA Champions League") {
          this.groupType = "uefa_champions"
        }
        else if (this.state.selectedSoccerValue == "UEFA Europa League") {
          this.groupType = "uefa_europa"
        }
        else if (this.state.selectedSoccerValue == "MLS") {
          this.groupType = "mls"
        }
        else if (this.state.selectedSoccerValue == "International Teams") {
          this.groupType = "international_teams"
        }
        else if (this.state.selectedSoccerValue == "Spanish La Liga") {
          this.groupType = "spain_la_liga"
        }
        else if (this.state.selectedSoccerValue == "Italian Series A") {
          this.groupType = "italy_serie_a"
        }
        else if (this.state.selectedSoccerValue == "German Bundesliga") {
          this.groupType = "german_bundesliga"
        }
        else {
          this.groupType = "france_ligue"
        }
      } else if (this.state.selected_Legue_id == 14) {
        this.setState({ showFighting: false });
        this.setState({ showSoccer: false });
        this.setState({ showAutoRacing: true }); //vijay
        this.setState({ showHorseRacing: false }); //vijay
        this.setState({ showClgBasketBall: false }); //vijay
        this.setState({ showClgFootball: false }); //vijay
        if (this.state.selectedAutoRacingValue == "NASCAR") {
          this.groupType = "nascar"

        } else if (this.state.selectedAutoRacingValue == "Indy 500") {
          this.groupType = "indy"
        }
        else if (this.state.selectedAutoRacingValue == "F1") {
          this.groupType = "formula_one"
        } else {
          this.groupType = "nascar"
        }
      } else if (this.state.selected_Legue_id == 22) {
        this.setState({ showFighting: false });
        this.setState({ showSoccer: false });
        this.setState({ showAutoRacing: false }); //vijay
        this.setState({ showHorseRacing: true }); //vijay
        this.setState({ showClgBasketBall: false }); //vijay
        this.setState({ showClgFootball: false }); //vijay
        if (this.state.selectedHorseRacingValue == "Kentucky Derby") {
          this.groupType = "kentucky"

        } else if (this.state.selectedHorseRacingValue == "Preakness") {
          this.groupType = "preakness"
        }
        else if (this.state.selectedHorseRacingValue == "Belmont") {
          this.groupType = "belmont"
        } else {
          this.groupType = "kentucky"
        }
      } else if (this.state.selected_Legue_id == 2) {
       
        this.setState({ showFighting: false });
        this.setState({ showSoccer: false });
        this.setState({ showAutoRacing: false }); //vijay
        this.setState({ showHorseRacing: false }); //vijay
        this.setState({ showClgBasketBall: false }); //vijay
        this.setState({ showClgFootball: true }); //vijay
        //this.setState({ selectedValue: 'UFC' });//garima
        this.groupType = ""

      } else if (this.state.selected_Legue_id == 4) {
      

        this.setState({ showFighting: false });
        this.setState({ showSoccer: false });
        this.setState({ showAutoRacing: false }); //vijay
        this.setState({ showHorseRacing: false }); //vijay
        this.setState({ showClgBasketBall: true }); //vijay
        this.setState({ showClgFootball: false }); //vijay
        //this.setState({ selectedValue: 'UFC' });//garima
        this.groupType = ""

      } else if (this.state.selected_Legue_id == 3 || this.state.selected_Legue_id == 8) {
        
        this.setState({ showFighting: false });
        this.setState({ showSoccer: false });
        this.setState({ showAutoRacing: false }); //vijay
        this.setState({ showHorseRacing: false }); //vijay
        this.setState({ showClgBasketBall: false }); //vijay
        this.setState({ showClgFootball: false }); //vijay
        this.setState({ showProBasketBall: true }); //vijay
        //this.setState({ selectedValue: 'UFC' });//garima
        this.groupType = ''

      } else {
        this.groupType = ""
        this.setState({ showFighting: false }); //garima
        this.setState({ showSoccer: false }); //garima
        this.setState({ showAutoRacing: false }); //vijay
        this.setState({ showHorseRacing: false }); //vijay
        this.setState({ showClgBasketBall: false }); //vijay
        this.setState({ showClgFootball: false }); //vijay
      }


      var currIndexVal ;
      if (this.state.settype == 'PAST')
      {
        currIndexVal = -1;
      }
      else
      {
        currIndexVal = 1;
      }

   if(numberofRows=='All')
   {
    if (isloadMore) {
      var params: any = {
        'league_id': this.state.selected_Legue_id,
        'dashboard': currIndVal,//currentindex,
        'group_type': this.groupType,
        'start': '',
        'per_page': '',
        'match_start_next_date': this.state.apinextDate,
        'match_start_prev_date': this.state.apipreDate,
        'timezone': deviceTimeZone
      };
    } else {
      this.setState({ apinextDate: this.state.nextDate });
      this.setState({ apipreDate: this.state.preDate });
      var params: any = {
        'league_id': this.state.selected_Legue_id,
        'dashboard': currIndVal,//currentindex,
        'group_type': this.groupType,
        'start': '',
        'per_page': '',
        'match_start_next_date': this.state.nextDate,
        'match_start_prev_date': this.state.preDate,
        'timezone': deviceTimeZone
      };

    }
   }else{
    if (isloadMore) {
      var params: any = {
        'league_id': this.state.selected_Legue_id,
        'dashboard': currIndVal,//currentindex,
        'group_type': this.groupType,
        'start': count,
        'per_page': numberofRows,
        'match_start_next_date': this.state.apinextDate,
        'match_start_prev_date': this.state.apipreDate,
        'timezone': deviceTimeZone
        //'team_id': this.state.dashboard_team_id
      };
    } else {
      this.setState({ apinextDate: this.state.nextDate });
      this.setState({ apipreDate: this.state.preDate });
      var params: any = {
        'league_id': this.state.selected_Legue_id,
        'dashboard': currIndVal,//currentindex,
        'group_type': this.groupType,
        'start': count,
        'per_page': numberofRows,
        'match_start_next_date': this.state.nextDate,
        'match_start_prev_date': this.state.preDate,
        'timezone': deviceTimeZone
        //'team_id': this.state.dashboard_team_id
      };

    }
   }
      console.log('nextPrev', JSON.stringify(params));

      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }

      fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/prev_next_dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorisation': this.authorisationToken
        },
        body: formData,

      }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({ loader: false });
          if (responseJson.message == "Access Expired.") {
            // AlertUtil.show("Session Expired ! Please login again");
            console.log("Footer comp ---->" + responseJson.message);
            // this.logoutButtonPressed();
            LogoutUtill.logoutButtonPressed(this.props);
          }else
         {
          console.log('Prev Next Dashboard Data ' + JSON.stringify(responseJson));
          this.setState({ nextDate: responseJson.data.match_start_next_date });
        this.setState({ preDate: responseJson.data.match_start_prev_date });

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
            
            if (this.state.selected_Legue_id == '1') {
              this.setState({ pastWeekTitle: (this.state.pastWeekTitle) });
            }else{
              this.setState({ pastWeekTitle: 'PAST RESULTS' });
            }
          }
          else if (flagofindex == 'A') {
            this.setState({ currentWeekTitle: this.state.currentWeekTitle });
            this.setState({ pastWeekTitle: (this.state.pastWeekTitle) });
            if (this.state.selected_Legue_id == '1') {
              this.setState({ upcomingGameTitle: (this.state.upcomingGameTitle) });
            }else{
              this.setState({ upcomingGameTitle: 'NEXT MATCH' })
            }
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
            // this.setState({
            //   DataList: responseJson.data.events_array.map((x: any) => ({
            //     event_id: x.event_id,
            //     league_id: x.league_id,
            //     event_status: x.event_status,
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
              DatatwoList: responseJson.data.events_array.map((x: any) => ({
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
                isMoneyLineDraw: false,
                MasterCalcFlag: 'D',
              }))
            });
            //  this.state.DataList.push(this.state.DatatwoList.toString())
            const interest = [...this.state.DataList, ...this.state.DatatwoList];

            this.setState({ DataList: interest })
            console.log('ashish data list length : ', this.state.DataList.length)
           if(numberofRows=='All')
           {
            this.setState({ showView: false })
           }else{
            if (this.state.DatatwoList.length < numberofRows) {
              console.log('ashish data sowview false')
              this.setState({ showView: false })
            } else {
              console.log('ashish data sowview true')
              this.setState({ showView: true })
            }
           }




            this.setState({ NoData: false });
          }
          else {
            // this.setState({ DataList: [] });
            if (this.state.DataList.length == 0) {
              this.setState({ NoData: true });
            } else {
              this.setState({ showView: false })
            }
          }
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
      } else if (selectedArray.isMoneyLineDraw == true){
        bet_team_id ='';
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
      } else if (selectedArray.isMoneyLineDraw == true){
        bet_team_type ='';
        wining_rate_favored ='';
        wining_rate_underdog ='';
      }
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
      //console.log("garima"    +amount_to_win);
      this.setState({ POSTBetAmount: bet_amount });
      console.log( 'oddsArray>>'+bet_type+'>>>'+JSON.stringify(oddsArray));

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
        JSON.stringify(oddsArray),
      )
      console.log('placebetDraw ', JSON.stringify(placebetRequset));
    
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

    amount_to_win = this.state.valueofMoneylineDialogShow;
    bet_amount = this.state.betammount;
    bet_amount = bet_amount;
    var posneg = 0;



    this.setState({ POSTBetAmount: bet_amount });

    //console.log('ok');
    //return;
    if (this.state.SelectedBetOption == 'P') {

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
    } else {
      var oddType;
      var odds;
      // var RegistrationEndDate = moment(this.RegistrationEndDate).format('YYYY-MM-DD');
      //       var start_formated_time = moment(this.start_formated_time).format('YYYY-MM-DD');
      //       var End_formated_time = moment(this.End_formated_time).format('YYYY-MM-DD');

      // try{
      var datetime = new Date(this.state.customBetDate.split('-').join('/') + ' ' + this.state.customBetTime).toISOString();
      // if(!datetime){datetime = "2020-04-19T09:03:07.553Z" }
      // console.log(new Date(this.state.customBetDate + ' ' + this.state.customBetTime).getTime())
      // }
      // catch(e)
      // {

      // }

      // var datetime = moment(this.state.customBetDate).format('YYYY-MM-DD'); + ' ' + moment(this.state.customBetTime).format('YYYY-MM-DD');

      // var datetime = "2020-04-19T09:03:07.553Z"
      console.log('pky>>>>' + datetime)
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
        selectedPropsArray.event_id,
        this.state.customBetTest,
        this.state.customBetQTest1,
        this.state.customBetQTest2,
        odds,
        oddType, //'odd type  selected/custom (when create custom props)'
        bet_type,
        bet_amount,
        amount_to_win,
        datetime, //bet_expired_on
        ''
      )
      var serviceAction = new ServiceAction()
      var responseParser = new CustomBetAFriendResponseParser()
      this.props.dispatch!(serviceAction.request(ServiceType.Bets,
        ServiceKeys.CustomBetaFriendName,
        customBetRequset,
        [this.constructor.name],
        responseParser))
    }

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

    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/prop_uncoveredaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
      body: formData,

    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // this.logoutButtonPressed();
          LogoutUtill.logoutButtonPressed(this.props);
        }else
       {
        if (responseJson.data.length > 0) {
          this.setState({ BetDialogueData: responseJson.data });
          this.setState({ BetDialogueNoData: false });
          this.setState({ valueofMoneylineDialogShow: '0.00' });
          this.setState({ valueofMoneylineDialog: '0.00' });
        }
        else {
          this.setState({ BetDialogueNoData: true });
        }
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
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/genrate_props', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
      body: formData,

    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson))
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // this.logoutButtonPressed();
          LogoutUtill.logoutButtonPressed(this.props);
        }else
       {
        if (responseJson.data.length > 0) {
          this.setState({ Bet_Question_array: responseJson.data })
          console.log('que array ' + JSON.stringify(this.state.Bet_Question_array))
        }
        else {
          this.setState({ Bet_Question_array: '' });
          this.noqueData = true;
        }
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
            console.log(this.state.selectedItem);
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
                //if (response.data.type == '2') {
                this.setState({ BetType: 'ODDS' });
                this.setState({ POSTBetAmount: bet_amount });
                
                if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
                
                  this.setState({ POSTWinAmount: this.state.valueofMoneylineDialogShow });
                }
                else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
                  this.setState({ POSTWinAmount: amount_to_win });
                }
                this.setState({ selectedItem: this.state.selectedItem });
                // alert('Bet Placed. Please share bet')
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

              setTimeout(function () { isPublickAlertOn = false }, 3000)



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
                //alert('Bet Placed. Please share ')
                this.shareOption(response, this.state.selectedPropsItem, 'PROP');

              }
              var isPublickAlertOn = false;
              if (response.data.type == '1') {
                if (!isPublickAlertOn) {
                  isPublickAlertOn = true;
                  AlertUtil.show("Bet Placed Successfully"); //garima

                }
              }
              setTimeout(function () { isPublickAlertOn = false }, 3000)
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

      } else if (nextProps.serviceKey === ServiceKeys.CustomBetaFriendName) {  // Custom bet response 
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

                this.shareOption(response, this.state.selectedPropsItem, 'CUSTOM');

              }
              //else {
              //   AlertUtil.show("Bet Placed Successfully"); //garima
              // }
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
              AlertUtil.show('Unsuccesfull :' + response.message);
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

      } else if (nextProps.serviceKey === ServiceKeys.LocationServiceName) {
        switch (nextProps.locationRequestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
         
            Application.sharedApplication().currentUserLocation = nextProps.locationResponse!.location
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.FinishedWithError:

            try {
              if (!Application.sharedApplication().currentUserLocation.latitude) {
                AlertUtil.showSingleActionMessage(AlertMessages.LocationRequired, function () { Linking.openURL('app-settings:') })
               
              }

            }
            catch (e) {

            }
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
          
            break
        }

      }
    }
  }

  rightTickAfterBet() {
    try {
      var selectedItems = this.selectedItemData;
      console.log('RightTick', JSON.stringify(selectedItems));
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
        } else {
          selectedItems.games.SPREAD.home.flag = true;
        }
      }
      this.setState({ selectedItem: selectedItems });
    } catch (error) {

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
    /*  if (Application.sharedApplication().user!.profile.userType == 'Guest') {
       this.setState({ guestUserDialog: true });
     }
     else { */
    this.props.navigation!.navigate(AppScreens.G_ProfileView);
    // }
  }

  iconDidTapped() {
    /*if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }*/
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View,{dashboard:true});
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


  logoutButtonPressed() {
    Application.sharedApplication().logout()
    AsyncStorage.removeItem("FromGame");
    AsyncStorage.removeItem("FromGambling");
    Application.sharedApplication().FromGame = false;
    Application.sharedApplication().FromGame = false;
    RouterBuilder.resetRouteTo(AppScreens.SplashLandingView, this.props)
  }
  HighlightTapped() {
    //  if (Application.sharedApplication().user!.profile.userType == 'Guest') {
     if (this.state.selected_Legue_id == '') {
       AlertUtil.show('Not use in custom bet')
       //this.setState({ guestUserDialog: true });
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
    /*  if (Application.sharedApplication().user!.profile.userType == 'Guest') {
       this.setState({ guestUserDialog: true });
     }
     else { */
    this.props.navigation!.navigate(AppScreens.G_GamingBetView);
    //}
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

   checkVersionUpdate() {
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/app_version', {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // this.logoutButtonPressed();
          LogoutUtill.logoutButtonPressed(this.props);
        }else
       {
//alert(UrlService.APPVERSION_iOS +'>>>>'+ responseJson.data.ios_version);
        if(UrlService.APPVERSION_iOS <   responseJson.data.ios_version)
        {
          this.updateAppNotice();
          //alert(UrlService.APPVERSION_iOS +'>>>> pky'+ responseJson.data.ios_version);
        }
        console.log('update version  ' + JSON.stringify(responseJson));
        // if (responseJson.message = "success promotional message") {
        //   this.setState({ BetPromotionalMsg: responseJson.data.promotional_array[0].gaming_promotional_message })
        // } else {
        //   this.setState({ BetPromotionalMsg: responseJson.message });
        // }
      }
        

      })
      .catch(error => {
        AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
        console.log(error);
      })
  }

  updateAppNotice(){
    
  const APP_STORE_LINK = 'https://apps.apple.com/us/app/udda-sports/id1484047531';
  const PLAY_STORE_LINK = 'market://details?id=myandroidappid';
  Alert.alert(
     'Update Available',
     'This version of the app is outdated. Please update app from the '+(Platform.OS =='ios' ? 'app store' : 'play store')+'.',
     [
         {text: 'Not Now', onPress: () => {
          AsyncStorage.setItem('isupadte', '0');
            
         }},

         {text: 'Upadte', onPress: () => {
          AsyncStorage.setItem('isupadte', '0');
          if(Platform.OS =='ios'){
              Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
          }
          else{
              Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));
          }
      }},
     ]
 );
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

  getDialogueState(item: any, index: any, Flag: any, ArrayLength: any) {
   // alert('moneyline>>>>>>>'+Flag);
    //this.setState({ userStatusDialog: true });

   
    this.USERAvailableUddaBucks = Application.sharedApplication().user!.profile.chip_balance!;

    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
      this.setState({ MatchEventDialog: true });
    }
    // else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
    //   this.setState({ userStatusDialog: true });
    // }
    
    else {
      
      setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index, viewPosition: 0.2 }) }, 100);
      if (Flag == 'M') {
        console.log('nnn',this.referralservice);
        this.referralservice.logEvent('MoneylineBet_Click', {});
        AppEventsLogger.logEvent('MoneylineBet_Click');
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
        this.checkUserStatus("money_line")
      }
      else if (Flag == 'T') {
        this.referralservice.logEvent('TotalBet_Click', {});
        AppEventsLogger.logEvent('TotalBet_Click');
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
        this.checkUserStatus("total")
      }
      else if (Flag == 'S') {
        this.referralservice.logEvent('SpreadBet_Click', {});
        AppEventsLogger.logEvent('SpreadBet_Click');
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
              this.state.DataList[i].MasterCalcFlag = 'S';
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
        this.checkUserStatus("spread")
      }
      this.betselect('N');
    }
  }

  getDialogueState2(item: any, index: any, Flag: any, ArrayLength: any) {
   // alert('dig>>>'+Flag) 
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
        this.referralservice.logEvent('MoneylineBet_Click', {});
        AppEventsLogger.logEvent('MoneylineBet_Click');
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
              this.state.DataList[i].isMoneyLineDraw = false;
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
        this.checkUserStatus("money_line")
      }
      else if (Flag == 'T') {
        this.referralservice.logEvent('TotalBet_Click', {});
        AppEventsLogger.logEvent('TotalBet_Click');
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
        this.checkUserStatus("total")
      }
      else if (Flag == 'S') {
        this.referralservice.logEvent('SpreadBet_Click', {});
        AppEventsLogger.logEvent('SpreadBet_Click');
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
              this.state.DataList[i].MasterCalcFlag = 'S';
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
        this.checkUserStatus("spread")
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
        this.checkUserStatus("money_line")
      }

      this.betselect('N');
    }
  }

  getBetDialogueState(item: any, index: any, ArrayLength: any) {
    this.referralservice.logEvent('PropBet_Click', {});
    AppEventsLogger.logEvent('PropBet_Click');
    this.checkUserStatus("prop_bet")
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
      this.getCustomProbBetList(item.event_id, item.league_id)
      this.calluncoveredAPI(item.event_id);
      const updatedEmployees = update(this.state.DataList, { $splice: [[index, 1, item]] });
      this.setState({ DataList: updatedEmployees });
      this.setState({ selectedBetData: item });
      // this.getCustomProbBetList(this.state.selectedBetData.event_id, this.state.selectedBetData.league_id)
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
      this.setState({ checkedBetText: 'P1' });
      this.betselect('P');
    }
  }

  MoneyLineRadioPublicButton() {
    /* if (this.state.checkedMoneyLinePublic == true) {
      this.setState({ checkedMoneyLinePublic: false })
      this.setState({ checkedMoneyLinePrivate: false })
    }
    else {
      this.setState({ checkedMoneyLinePublic: true })
      this.setState({ checkedMoneyLinePrivate: false })
    } */
    this.setState({ checkedMoneyLinePublic: true })
    this.setState({ checkedMoneyLinePrivate: false })
    this.handleFocusAtW();
    this.handleFocusBA();

  }

  MoneyLineRadioPrivateButton() {
    /* if (this.state.checkedMoneyLinePrivate == true) {
      this.setState({ checkedMoneyLinePrivate: false })
      this.setState({ checkedMoneyLinePublic: false })
    }
    else {
      this.setState({ checkedMoneyLinePrivate: true })
      this.setState({ checkedMoneyLinePublic: false })
    } */
    this.setState({ checkedMoneyLinePrivate: true })
    this.setState({ checkedMoneyLinePublic: false })
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
    const updatedEmployees = update(this.state.DataList, { $splice: [[index, 1, item]] });
    this.setState({ DataList: updatedEmployees });

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

  showDialog(isShow: any, item: any) {

    if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
      if (this.state.betammount < 1000 || this.state.betammount < "1000") {
        AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
      }
      else {
        this.setState({ dialogVisible: isShow });
        this.setState({ selectedItem: item });
        this.selectedItemData = item;
      }

    }
    else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
      if (this.state.valueofMoneylineDialog < 1000 || this.state.valueofMoneylineDialog < "1000") {
        AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
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
    this.setState({betammount:''});

   
    console.log(status);
    if (this.state.checkedBetText == 'P1' && selectbet == 'C') {
      AlertUtil.show('Custom Bet cannot be created for Public Bet');
    } else {
     // this.setState({ SelectedBetOption: selectbet });
     if (selectbet == 'C') {

      // AlertUtil.show('Custom Bet cannot be created for Public Bet');
      var status = this.checkUserStatus("custom_bet");
      if(status)
      {
        this.props.navigation!.navigate(AppScreens.G_CustomBet, this.props);
      }
        return;
     } else {
      var status = this.checkUserStatus("prop_bet");
      if(status)
      {
       this.setState({ SelectedBetOption: selectbet });
      }
     }
    }
    //console.log(this.state);
   /*  if (this.state.checkedBetText == 'P1' && selectbet == 'C') {
      AlertUtil.show('Custom Bet cannot be created for Public Bet');
    } */
    //  if (selectbet == 'C') {
    //  // AlertUtil.show('Custom Bet cannot be created for Public Bet');
    //    this.props.navigation!.navigate(AppScreens.G_CustomBet, this.props);
    //    return;
    // } else {
    //   this.setState({ SelectedBetOption: selectbet });
    // }

  }

  BetQuestion(item: any, index: any, flag: any) {
    this.handleFocusBA();
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
    this.handleFocusBA()
  }

  CustomBetDialog(item: any) {


    if (this.state.SelectedBetOption == 'C') {
      var numericReg = /^(\d*[0-9]\/\d*[0-9])?$/;
      if (this.state.customBetTest == "" || this.state.customBetTest == null ||
        this.state.customBetQTest1 == "" || this.state.customBetQTest1 == null ||
        this.state.customBetQTest2 == "" || this.state.customBetQTest2 == null ||
        this.state.customBetOdds == "" || this.state.customBetOdds == null ||
        this.state.customBetDate == "" || this.state.customBetDate == null ||
        this.state.customBetTime == "" || this.state.customBetTime == null
      ) {
        AlertUtil.show("Please enter valid all details");
      } else if (this.state.customBetQTest1.toLowerCase() == this.state.customBetQTest2.toLowerCase()) {

        AlertUtil.show("My answer and other answer must no be equal");
      } else if (this.state.betammount < 1000 || this.state.betammount < "1000") {
        AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
      } else if (this.state.customBetOdds == 'CUSTOM' && (this.state.customBetCutmOdds == "" || this.state.customBetCutmOdds == null)) {
        AlertUtil.show("Please enter custom odd.");
      } else if (this.state.customBetOdds == 'CUSTOM' && !numericReg.test(this.state.customBetCutmOdds)) {
        AlertUtil.show("Please enter valid value in custom odd.");
      } else {
        this.setState({ selectedPropsItem: item });
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



  async shareOption(item: any, selectedDatavalues: any, bettype: any) {
    console.log("shareOption bettype " + JSON.stringify(selectedDatavalues));

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
      } else if (selectedData.MasterCalcFlag == 'D') {
        oddsString = "Money Line";
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
      } else {
        teamName = selectedData.games.MATCH_UPS.home.title;
        teamName2 = selectedData.games.MATCH_UPS.away.title;
        if (selectedData.isMoneyLineSelect2 == true ) {
          amount = selectedData.games.MONEY_LINE.home.private_value;
        }
        else if (selectedData.isMoneyLineDraw == true) {
          amount = selectedData.odds.ml_draw_price ;
        }
        else if (selectedData.isTotalSelect2 == true) {
          amount = "Under " + selectedData.games.TOTAL.home.other_value + " (" + selectedData.games.TOTAL.home.private_value + ")";
        }
        else {
          amount = selectedData.games.SPREAD.home.other_value + " (" + selectedData.games.SPREAD.home.private_value + ")";
        }
      }
      url = "http://bet.udda.com/index.php?t=oddsbet&i=" + item.data.encryptor_bet_id;   //garima for now
      //url = "https://bet.udda.com/coming-soon/"
      url = await this.referralservice.getReferralUrl(url, this.state.ReferString, "U"); // Getting Dynamic Share Link From Firebase
      referStr = "\nUse Referral Code " + this.state.ReferString + " to sign up.";
     // MessageString = "I just bet " + this.state.POSTBetAmount + " UDDA Bucks on the " + oddsString + " " + amount + " for the team " + teamName + " v/s " + teamName2 + ". ";
     // MessageString = "I’ll bet you the " +  teamName +" beat the "+ teamName2 +". The "+teamName+" are  "+oddsString+ "on the money line. I’ll put up" +this.state.POSTBetAmount+ "UDDA bucks to your "+this.state.POSTBetAmount+" Udda bucks, you can accept all of or any part of my bet.";
     var newoddsString = '"'+oddsString+'"'
     var newteamName = '"'+teamName+'"'
     var newteamName2 = '"'+teamName2+'"'
      var newLine = (amount > 0) ? '"+' + amount + '"' : '"' + amount + '"'
      var drawOdds = (amount > 0) ? '+' + amount  :  amount ;
     var newAmount ='"'+this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'"'
     var newWinAmount = '"'+this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'"'
       MessageString = "I’ll bet you the " +  newteamName +" beat "+ newteamName2 +". The "+teamName+" are "+newLine+ " on the "+newoddsString+". I’ll put up " + newAmount + " UDDA bucks to your "+ newWinAmount+" UDDA bucks, you can accept all of or any part of my bet.";
      if (selectedData.MasterCalcFlag == 'D') {
        MessageString = "I am betting on Draw " + newLine + " under " + newoddsString + " for " + newteamName + " Vs " + newteamName2+" . I’ll put up " + newAmount + " UDDA bucks to your " +  newWinAmount+ " UDDA bucks, you can accept all of or any part of my bet.";

      }
      MessageString += referStr;


      var ShowString1 = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA Bucks </Text>
        on the
      <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {oddsString} {amount} </Text> for the team <Text style={{ fontFamily: 'Montserrat-SemiBold', textDecorationLine: 'underline' }}>{teamName}</Text> v/s {teamName2}. {referStr}</Text>


ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I’ll bet you the <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{teamName} </Text>
        beat 
      <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {teamName2}.</Text> The {teamName} are <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{amount}</Text> on the <Text style={{ fontFamily: 'Montserrat-SemiBold'}}>{oddsString}</Text>. I’ll put up <Text style={{ fontFamily: 'Montserrat-SemiBold'  }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks to your <Text style={{ fontFamily: 'Montserrat-SemiBold'  }}>{this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks, you can accept all of or any part of my bet.
  {referStr}</Text>

      if (selectedData.MasterCalcFlag == 'D') {
        ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
          I am betting on Draw <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{drawOdds} </Text>
        under 
      <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {oddsString}</Text> for  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{teamName} </Text> Vs <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{teamName2}</Text>. I’ll put up <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks to your <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks, you can accept all of or any part of my bet.
  {referStr}</Text>
      }
      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });
      this.setState({ MessageUrl: url });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
    }
    else if (bettype == 'CUSTOM') {
      url = "http://bet.udda.com/index.php?t=custombet&i=" + item.data.encryptor_bet_id;
      //url = "https://bet.udda.com/coming-soon/"

      url = await this.referralservice.getReferralUrl(url, this.state.ReferString, "U"); // Getting Dynamic Share Link From Firebase
      referStr = "\n Use Referral Code " + this.state.ReferString + " to sign up.";

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
      try {
        MessageString = 'I just bet a ' + this.state.POSTBetAmount + ' UDDA Bucks that  \n"' + this.state.customBetTest + '"\n Odds "' + this.state.oddsValue + '"\n My answer  "' + this.state.customBetQTest1 + '"\n Bet closes at  "' + betTimeExpr + ', ' + batdateExp + '" .\n Would you like to accept the Bet? '

      }
      catch (e) {

      }
      MessageString += referStr;

      ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet a <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount}</Text>
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


      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });

      this.setState({ MessageUrl: url });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
      this.setState({ customBetTest: '' });
      this.setState({ customBetQTest1: '' });



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

      url = await this.referralservice.getReferralUrl(url, this.state.ReferString, "U"); // Getting Dynamic Share Link From Firebase
      referStr = "\n Use Referral Code " + this.state.ReferString + " to sign up.";
      MessageString = "I just bet a " + this.state.POSTBetAmount + " UDDA Bucks that " + selectedData.question + " is " + amount + ". Would you like to accept the Bet? "
      MessageString += referStr;

      ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet a <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount} UDDA Bucks </Text>
        that
    <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {selectedData.question} </Text> is
    <Text style={{ fontFamily: 'Montserrat-SemiBold', textDecorationLine: 'underline' }}> {amount} </Text>. Would you like to accept the Bet? {referStr} </Text>


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
    this.getCustomProbBetList(this.state.selectedBetData.event_id, this.state.selectedBetData.league_id);
  };

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

  private updateWeekTitles() {
  }

   pastResultClicked() {
   if( !this.state.preDate)
    {
      // if(!this.state.nextDate){
      // AlertUtil.show('No upcoming matches available.');
      // }
      // else
      // {
      AlertUtil.show('No matches available.');
      // }
    }
    else
    {
    //Alert.alert("enter");
    this.setState({ currentweekindex: this.state.currentweekindex - 1 });
    this.setState({ settype: 'PAST' });
    this.setState({ DataList: [], startPage: 1 })//ashish_today
    this.prev_next_dashboard_API_call(this.state.currentweekindex - 1, 'S', 1,-1,false);
    }
  }
  upcomingGamesClicked() {
   if( !this.state.nextDate )
    {
      // if(!this.state.nextDate){
      // AlertUtil.show('No upcoming matches available.');
      // }
      // else
      // {
      AlertUtil.show('No matches available.');
      // }
    }
    else{

    
    this.setState({ currentweekindex: this.state.currentweekindex + 1 });
    this.setState({ DataList: [], startPage: 1 })//ashish_today
    this.setState({ settype: 'NEXT' });
    this.prev_next_dashboard_API_call(this.state.currentweekindex + 1, 'A', 1,1,false);
  }
  }
  //garima
  //garima
  onChangeGroupType(value: any) {
    this.setState({ selectedValue: value });
    this.setState({ DataList: [], startPage: 1 })//ashish_today
    this.callMethod(this.state.selected_Legue_id, value, 1);
  }
  //garima 

  onChangeSoccerType(value: any) {
    this.setState({ selectedSoccerValue: value });
    this.setState({ DataList: [], startPage: 1 })//ashish_today
    this.callMethod(this.state.selected_Legue_id, value, 1);
  }

  /*   For auto racing & horse racing */

  onChangeAutoRacingType(value: any) {
    this.setState({ selectedAutoRacingValue: value });
	 this.setState({ DataList: [], startPage: 1 })//ashish_today
    this.callMethod(this.state.selected_Legue_id, value, 1);
  }

  onChangeHorseRacingType(value: any) {
    this.setState({ selectedHorseRacingValue: value });
    this.setState({ DataList: [], startPage: 1 })//ashish_today
    this.callMethod(this.state.selected_Legue_id, value, 1);
  }
  /*   end  auto racing & horse racing */
  onChangeTeam(value:any){
    this.setState({ dashboard_team_id: value });
    this.setState({ DataList: [], startPage: 1 })//ashish_today
    this.callMethod(this.state.selected_Legue_id, value, 1);
  }
  onChangeLeague(value:any){
    this.setState({ dashboard_team_id: value });
    this.setState({ DataList: [], startPage: 1 })//ashish_today
    this.callMethod(value, value, 1);
  }



  //garima
 onChangeResult(value: any) {
    this.setState({ selectedGameValue: value });
    if (value == "PAST RESULTS") {
    
      if( !this.state.preDate )
      {  
        setTimeout(function(){      
        AlertUtil.show('No matches available.'); 
      },800)      
      }
      else{
      this.setState({ DataList: [], startPage: 1 })//ashish_today
      this.setState({ settype: 'PAST' });//ashish_today
      //this.setState({ currentweekindex: this.state.currentweekindex - 1 });
      this.prev_next_dashboard_API_call(this.state.currentweekindex - 1, 'S', 1,-1,false);
      }
    }
    else if (value == "NEXT MATCH") {
      if( !this.state.nextDate )
      {        
        setTimeout(function(){      
          AlertUtil.show('No matches available.'); 
        },800)      
      }
      else{

      this.setState({ DataList: [], startPage: 1 })//ashish_today
      this.setState({ settype: 'NEXT' });//ashish_today
      //  this.setState({ currentweekindex: this.state.currentweekindex + 1 });
      this.prev_next_dashboard_API_call(this.state.currentweekindex + 1, 'A', 1,1,false);
      }
    }
    else {
      this.prev_next_dashboard_API_call('0', '', 1,0,false);
    }
  }



  // Vijay close share dialog with alert
  closeShareDialog() {
    this.setState({ shareDialog: false });
    //this.getCustomProbBetList(this.state.selectedBetData.event_id, this.state.selectedBetData.league_id)
    setTimeout(() => {
      //AlertUtil.show("Bet Placed Successfully");

    }, 2000)

  }




  //garima update share option message
  onChangeShareMsg(val: any) {
    this.setState({ MessageString: val });
  }


  //ashish changes for date picker 

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
    // let formate = date;

    // let hours = formate.getHours();
    // let minutes = formate.getMinutes();
    // let seconds = formate.getSeconds();
    // var string = hours + '-' + minutes + '-' + seconds;
    // // alert(string)
    // // var formated_date = moment(date).format('L');
    // this.setState({ customBetTime: string });
    // // this.customBetDateTime = formated_date;
    // this.hideDateTimePicker1();

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
    //  var string = hours + ':' + minutes + ':' + seconds  ;
    //  console.log('formate ashish time : ',string)
    this.setState({ customBetTime: string });
    //   // this.customBetDateTime = formated_date;
    this.hideDateTimePicker1();
  }





  private getCurrentLocation() {
    if (Platform.OS === 'ios') {
      this.createAndDispatchLocationAction()
    }
    else {
      this.requestLocationPermission();
    }
  }
  async requestLocationPermission() {

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ]);
      if (granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] && granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED) {
        this.createAndDispatchLocationAction()
      } else {
        this.requestLocationPermission();
      }
    } catch (err) {
      Alert.alert(err);
    }

  }
  private createAndDispatchLocationAction() {
    var serviceAction = new ServiceAction()
    this.props.dispatch!(serviceAction.request(ServiceType.Location,
      ServiceKeys.LocationServiceName,
      undefined,
      [this.constructor.name],
      undefined))

  }





  //  ---------------------------------------------- Design and Design Methods --------------------------------------------

  showOverlayGameSelection() {
    //selected sports
    return (
      <View style={{ height: hp(3.5), backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

        <SportsListComponent sportsList={this.state.SportData} weight={1.2} leagueid={this.state.selected_Legue_id} tapAction={(sport) => {
          console.log(JSON.stringify(sport));
          this.setState({ showOverlayGameSelectionFlag: false });
          
          this.setState({ selected_Legue_id: sport.league_id });
          this.setState({ DataList: [], startPage: 1 })//ashish_today
          this.callMethod(sport.league_id, '', 1);
        }}></SportsListComponent>
      </View>
    )
  }

          showDropDownpool() {
           
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
        
          return(
            
              <View style={ { padding: 5 ,width:'100%'}}>
           <View style={ {width:'50%'}}>
        <Dropdown
          dropdownOffset={{ top: 0, left: 0 }}
          dropdownMargins={{ min: 0, max: 0 }}
          dropdownPosition={-4.2}
          itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
          data={pool}
          // data={this.dataAutoRacing}
           value={this.state.custonDropDownvalue}
           onChangeText={value =>{ this.changecustomdrop(value)}}
          fontSize={hp(1.6)}

        />
        </View>
        </View>
          
          )
        }
changecustomdrop(item:any){
  this.setState({custonDropDownvalue:item})
  if(item == 'CUSTOM BET')
  { 
    this.referralservice.logEvent('CreateCustomBet_Click',{});
    AppEventsLogger.logEvent('CreateCustomBet_Click');
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
    this.setState({ guestUserDialog: true });
}else{
 var status =  this.checkUserStatusDelay("custom_bet")
 if(status){
    this.props.navigation!.navigate(AppScreens.G_CustomBet);}}
  }else if(item == 'POOL'){
    this.referralservice.logEvent('CreatePool_Click', {});
    AppEventsLogger.logEvent('CreatePool_Click');
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
  }else{
    var status =  this.checkUserStatusDelay("pool")
 if(status){
    this.props.navigation!.navigate(AppScreens.G_Createpool);
 }
  }
  } else if (item == 'SQUARES') {
    this.referralservice.logEvent('CreateSquares_Click', {});
    AppEventsLogger.logEvent('CreateSquares_Click');
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
        this.referralservice.logEvent('CreateBingo_Click',{});
        AppEventsLogger.logEvent('CreateBingo_Click');
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
  showGameSelectionAndOther() {
    var ashish = true;
    return (
      <View>
        <View style={{ height: hp(9.5), backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <SportsListComponent sportsList={this.state.SportData} weight={0.7} leagueid={this.state.selected_Legue_id} tapAction={(sport) => {
            console.log(JSON.stringify(sport))
            this.setState({ showOverlayGameSelectionFlag: false })
            if (sport.type !='custom'){
              var title = ((sport.title).toLowerCase()).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
              title = title.replace(/\s/g, "");
             
              title = title + '_Click';
              this.referralservice.logEvent(title, {});
              AppEventsLogger.logEvent(title);
            }
            this.setState({ selected_Legue_id: sport.league_id });
            this.setState({ DataList: [], startPage: 1 })//ashish_today
            this.callMethod(sport.league_id, '', 1);
          }}></SportsListComponent>
        </View>


        <View style={{ width: '100%', height: hp(6), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
          {this.state.custonDropDown == false && this.state.showFighting == false && this.state.showSoccer == false && this.state.showAutoRacing == false && this.state.showHorseRacing == false && this.state.showClgFootball == false && this.state.showClgBasketBall == false && this.state.showProBasketBall == false ?
            <View style={{ width: '95%', backgroundColor: 'white', flexDirection: 'row' }}>
              <View style={{ width: '30%', height: '100%', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { this.pastResultClicked() }} style={{ width: '100%' }} >
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <GrayPrevIcon />
                    <Text style={[styles.boldTextStyle]} >{this.state.pastWeekTitle == "" ? "PAST RESULTS" : this.state.pastWeekTitle}</Text>
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
          {this.state.showFighting == true && this.state.showSoccer == false && this.state.showHorseRacing == false && this.state.showAutoRacing == false && this.state.showClgFootball == false && this.state.showClgBasketBall == false && this.state.showProBasketBall == false?
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>
                <Dropdown
                  //containerStyle={{borderWidth:1, borderColor:'lightgrey', borderRadius:5, paddingLeft:10}}
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={this.data3.length > 3 ? -5.2 : this.data3.length == 3 ? -4.2 : this.data3.length == 1 ? -2.2: -3.2}
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
                  dropdownPosition={-4.2}
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
          {this.state.showSoccer == true && this.state.showFighting == false && this.state.showHorseRacing == false && this.state.showAutoRacing == false && this.state.showClgFootball == false && this.state.showClgBasketBall == false && this.state.showProBasketBall == false ?
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>

                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={this.dataSoccer.length > 3 ? -5.2 : this.dataSoccer.length == 3 ? -4.2 : this.dataSoccer.length == 1 ? -2.2: -3.2}
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
                  dropdownPosition={-4.2}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.fightingArray}
                  value={this.state.selectedGameValue}
                  onChangeText={value => this.onChangeResult(value)}
                  fontSize={hp(1.6)}


                />

              </View>
            </View>
            : null}


          {/* Auto Racing  Dropdown */}
          {this.state.showAutoRacing == true && this.state.showSoccer == false && this.state.showFighting == false && this.state.showHorseRacing == false && this.state.showClgFootball == false && this.state.showClgBasketBall == false && this.state.showProBasketBall == false?
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>

                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={this.dataAutoRacing.length > 3 ? -5.2 : this.dataAutoRacing.length == 3 ? -4.2 : this.dataAutoRacing.length == 1 ? -2.2: -3.2}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.dataAutoRacing}
                  value={this.state.selectedAutoRacingValue}
                  onChangeText={value => this.onChangeAutoRacingType(value)}
                  fontSize={hp(1.6)}

                />
              </View>

              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>
                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={-4.2}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.fightingArray}
                  value={this.state.selectedGameValue}
                  onChangeText={value => this.onChangeResult(value)}
                  fontSize={hp(1.6)}


                />

              </View>
            </View>
            : null}

          {/* Horse  Racing  Dropdown */}
          {this.state.showHorseRacing == true && this.state.showAutoRacing == false && this.state.showSoccer == false && this.state.showFighting == false && this.state.showClgFootball == false && this.state.showClgBasketBall == false && this.state.showProBasketBall == false ?
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>

                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={this.dataHorseRacing.length > 3 ? -5.2 : this.dataHorseRacing.length == 3 ? -4.2 : this.dataHorseRacing.length == 1 ? -2.2: -3.2}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.dataHorseRacing}
                  value={this.state.selectedHorseRacingValue}
                  onChangeText={value => this.onChangeHorseRacingType(value)}
                  fontSize={hp(1.6)}

                />
              </View>

              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>
                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={-4.2}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.fightingArray}
                  value={this.state.selectedGameValue}
                  onChangeText={value => this.onChangeResult(value)}
                  fontSize={hp(1.6)}


                />

              </View>
            </View>
            : null}


          {/* End Auto Racing  Dropdown */}


          {/* Colleage Football and BasketBall Dropdown */}
          {this.state.showHorseRacing == false && this.state.showAutoRacing == false && this.state.showProBasketBall == false && this.state.showSoccer == false && this.state.showFighting == false && (this.state.showClgFootball == true || this.state.showClgBasketBall == true ) ?
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>

                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={this.state.legueArrayTeamData.length > 3 ? -5.2 : this.state.legueArrayTeamData.length == 3 ? -4.2 : this.state.legueArrayTeamData.length == 1 ? -2.2: -3.2}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.state.legueArrayTeamData}
                  value={this.state.dashboard_team_id}
                  onChangeText={value => this.onChangeTeam(value)}
                  fontSize={hp(1.6)}

                />
              </View>

              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>
                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={-4.2}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.fightingArray}
                  value={this.state.selectedGameValue}
                  onChangeText={value => this.onChangeResult(value)}
                  fontSize={hp(1.6)}


                />

              </View>
            </View>
            : null}
          {/* End Colleage Football and BasketBall Dropdown */}

          {/* Pro Football and BasketBall Dropdown */}
          {this.state.showHorseRacing == false && this.state.showAutoRacing == false && this.state.showSoccer == false && this.state.showFighting == false && this.state.showClgFootball == false && this.state.showClgBasketBall == false && this.state.showProBasketBall == true ?
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>

                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={this.state.legueArrayTeamData.length > 3 ? -5.2 : this.state.legueArrayTeamData.length == 3 ? -4.2 : this.state.legueArrayTeamData.length == 1 ? -2.2: -3.2}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.state.legueArrayTeamData}
                  value={this.state.dashboard_team_id}
                  onChangeText={value => this.onChangeLeague(value)}
                  fontSize={hp(1.6)}

                />
              </View>

              <View style={[styles.dropDown_Container, { alignContent: 'center', padding: 5 }]}>
                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={-4.2}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={this.fightingArray}
                  value={this.state.selectedGameValue}
                  onChangeText={value => this.onChangeResult(value)}
                  fontSize={hp(1.6)}


                />

              </View>
            </View>
            : null}
          {/* End Pro Football and Pro Dropdown */}
          {/* stsrt custom dropdown */}
          {this.state.custonDropDown?this.showDropDownpool():null}
          {/* end custom dropdown */}

        </View>

      </View>
    )
  }

  getDialogue(GamesArray: any, index: any, value: any, title: any,privateValue:any) {
    console.log('GamesArray')
    console.log(GamesArray)
    console.log(GamesArray.games.MATCH_UPS.away.title)

    return (
      <View>
        <View style={[{ marginLeft: (GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'D') ? '35%' : GamesArray.MasterCalcFlag == 'T' ? '52%' : '72%' }, styles.dialog_triangle]}></View>
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
            {this.state.checkedMoneyLinePrivate ?
              <Text style={styles.dialogue_main_text_label}> You are betting {GamesArray.MasterCalcFlag == 'D' && 'on'} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>Draw </Text>}<Text style={styles.dialogue_sub_text_label}>
                {GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'T' || GamesArray.MasterCalcFlag == 'S' || GamesArray.MasterCalcFlag == 'D' ? (privateValue > 0 ? '+' : '-') : ''} {Math.abs(privateValue)}</Text> under <Text style={styles.dialogue_sub_text_label}>
                  {GamesArray.MasterCalcFlag == 'M' ? "Money Line" : GamesArray.MasterCalcFlag == 'T' ? 'Total' : GamesArray.MasterCalcFlag == 'D' ?'Money Line': 'Spread'}
                  {GamesArray.isTotalSelect1 == true ? " (Over)" : GamesArray.isTotalSelect2 == true ? " (Under)" : null}</Text> for <Text style={styles.dialogue_sub_text_label}>{title} </Text> {GamesArray.MasterCalcFlag == 'D' && <Text>Vs</Text>} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>{GamesArray.games.MATCH_UPS.away.title}</Text>} . </Text>
         
           :
              <Text style={styles.dialogue_main_text_label}> You are betting {GamesArray.MasterCalcFlag == 'D' && 'on'} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>Draw </Text>} <Text style={styles.dialogue_sub_text_label}>
                {GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'T' || GamesArray.MasterCalcFlag == 'S' || GamesArray.MasterCalcFlag == 'D' ? (value > 0 ? '+' : '-') : ''} {Math.abs(value)}</Text> under <Text style={styles.dialogue_sub_text_label}>
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
                   // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("ATW") : this.handleKeyDown(e, value, "ATW", GamesArray.MasterCalcFlag) }}
                    
                     // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag) }}
                     onChange={(e:any)=>{this.state.checkedMoneyLinePrivate ? this.handleKeyDown(e, privateValue, "ATW", GamesArray.MasterCalcFlag):this.handleKeyDown(e, value, "ATW", GamesArray.MasterCalcFlag)}}
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
      value: '1/1',
    }, {
      value: '3/2',
    }, {
      value: '2/1',
    }, {
      value: '3/1',
    },
      , {
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
                  <Text style={[styles.selectText, { color: this.state.checkedBetText == 'P2' ? '#68bcbc' : '#767676', textDecorationLine: this.state.checkedBetText == 'P2' ? 'underline' : 'none' }]}>
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
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                      <View style={{ width: '100%', }}>
                        <Text style={{ padding: 8, paddingBottom: 0, paddingLeft: 3, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1) }}> Write in your custom bet </Text>
                        <TextInput
                          value={this.state.customBetTest}
                          style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, padding: Platform.OS === 'ios' ? 8 : 0, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), }}
                          placeholder=' Write in your custom bet'
                          placeholderTextColor={'#888888'}
                          onChangeText={(text) => { this.setState({ customBetTest: text }) }}
                        />
                      </View>

                    </View>



                    {/* <View style={{ flexDirection: 'row', width: '100%', }}>
                      <View style={{ width: '100%', }}>
                        <Text style={{ padding: 8, paddingBottom: 0, paddingLeft: 3, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1) }}> My answer </Text>
                        <TextInput
                          value={this.state.customBetQTest1}
                          style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder='My answer is...'
                          placeholderTextColor={'black'}
                          onChangeText={(text) => { this.setState({ customBetQTest1: text }) }}
                        />
                      </View>

                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', }}>
                      <View style={{ width: '100%', }}>
                        <Text style={{ padding: 8, paddingBottom: 0, paddingLeft: 3, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1) }}> Other answer </Text>
                        <TextInput
                          value={this.state.customBetQTest2}
                          style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder='Other answer is...'
                          placeholderTextColor={'#888888'}
                          onChangeText={(text) => { this.setState({ customBetQTest2: text }) }}
                        />
                      </View>

                    </View> */}



                    <View style={{ flexDirection: 'row', width: '100%', margin: 3 }}>

                      <View style={{ width: '50%' }}>
                        <Text style={{ padding: 8, paddingBottom: 0, paddingLeft: 3, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1) }}> My answer </Text>
                        <TextInput
                          value={this.state.customBetQTest1}
                          style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, padding: Platform.OS === 'ios' ? 8 : 0, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder=' My answer is...'
                          placeholderTextColor={'black'}
                          onChangeText={(text) => { this.setState({ customBetQTest1: text }) }}
                        />
                      </View>
                      <View style={{ width: '48%', marginLeft: 3 }}>
                        <Text style={{ padding: 8, paddingBottom: 0, paddingLeft: 3, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1) }}> Other answer </Text>
                        <TextInput
                          value={this.state.customBetQTest2}
                          style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, padding: Platform.OS === 'ios' ? 8 : 0, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder=' Other answer is...'
                          placeholderTextColor={'#888888'}
                          onChangeText={(text) => { this.setState({ customBetQTest2: text }) }}
                        />

                      </View>
                    </View>






                    {/* <View style={{ flexDirection: 'row', width: '98%',margin: 3 }}>
                      <View style={{ width: '100%', }}>
                      <Text style = {{padding: 8,paddingBottom:3,paddingLeft:0,width:'100%',fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1)}}> Odds</Text>
                      <View style={{ flexDirection: 'row', width: '100%',borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3 }}>
                      <Text style={{ padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.3), width: '65%', paddingTop: 12, backgroundColor: '#eeeeee' }}>ODDS</Text>
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

                    <View style={{ flexDirection: 'row', width: '100%', }}>
                      <View style={{ width: '100%', }}>
                      <Text style = {{padding: 8,paddingBottom:0,paddingLeft:3,width:'100%',fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1)}}> Custom odd </Text>
                        <TextInput
                          value={this.state.customBetCutmOdds}
                          style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder='Custom odd...'
                          placeholderTextColor={'#888888'}
                          onChangeText={(text) => { this.setState({ customBetCutmOdds: text }) }}
                        />
                      </View>
                       
                    </View> */}
                    {/* <View style={{ flexDirection: 'row', width: '100%', }}>
                      <View style={{ width: '100%', }}>
                      <Text style = {{padding: 8,paddingBottom:0,paddingLeft:3,width:'100%',fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1)}}> Notification Expiry time </Text>
                        <TextInput
                          value={this.state.customBetDateTime}
                          style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.2), borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}
                          placeholder='Date and Time...'
                          placeholderTextColor={'#888888'}
                          onChangeText={(text) => { this.setState({ customBetDateTime: text }) }}
                        />
                      </View>
                       
                    </View> */}





                    <View style={{ width: '100%', flexDirection: 'column' }}>

                      <View style={{ flexDirection: 'row', width: '100%', margin: 3 }}>

                        <View style={{ width: '48%' }}>
                          <Text style={{ paddingLeft: 3, paddingBottom: 0, paddingTop: 5, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.0) }}> Odds </Text>
                          <View style={{ flexDirection: 'row', width: '100%', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3 }}>
                            <Text style={{ paddingTop: 6, paddingLeft: 3, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1), width: '50%', backgroundColor: '#fff' }}>ODDS</Text>
                            <Dropdown
                              containerStyle={{ paddingLeft: 8, borderBottomWidth: 0, justifyContent: "center", width: '50%', backgroundColor: '#fff' }}
                              dropdownOffset={{ top: 0, left: 0 }}
                              dropdownMargins={{ min: 0, max: 0 }}
                              dropdownPosition={-4.2}
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
                      </View>




                      <View style={{ flexDirection: 'row', width: '98%', margin: 3 }}>

                        <View style={{ width: '50%' }}>
                          <Text style={{ paddingTop: 8, paddingBottom: 0, paddingLeft: 3, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1) }}> Must respond by </Text>


                          <View style={[styles.Input_Container, { flexDirection: 'row', }]}>

                            <View style={{ width: '80%' }}>
                              <Text style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, marginTop: 0, color: 'black', fontFamily: 'Montserrat-SemiBold', padding: 8, fontSize: hp(1.2), }}>{this.state.customBetDate ? this.state.customBetDate : 'Select Date'}</Text>
                            </View>
                            <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                              <TouchableOpacity onPress={this.showDateTimePicker}>
                                <Image source={require('../../../../images/calendar.png')}
                                  style={{ height: 20, width: 20, marginRight: 10 }}
                                  resizeMode="contain" />
                              </TouchableOpacity>
                            </View>

                            <DateTimePicker
                              // onDateChange={this.setDate}
                              isVisible={this.state.isDateTimePickerVisible}
                              customConfirmButtonIOS={this.handleStartDatePicked}
                              onConfirm={this.handleStartDatePicked}
                              onCancel={this.hideDateTimePicker}
                              minimumDate={this.state.minimumDate}
                              mode="date"
                            />
                          </View>
                        </View>
                        <View style={{ width: '50%', marginLeft: 3 }}>
                          <Text style={{ padding: 8, paddingBottom: 0, paddingLeft: 3, width: '100%', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.1) }}> </Text>


                          <View style={[styles.Input_Container, { flexDirection: 'row', }]}>

                            <View style={{ width: '80%' }}>
                              <Text style={{ borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, margin: 3, marginTop: 0, color: 'black', fontFamily: 'Montserrat-SemiBold', padding: 8, fontSize: hp(1.2), }}>{this.state.customBetTime ? this.state.customBetTime : 'Select Time'}</Text>
                            </View>
                            <View style={{ width: '19%', justifyContent: 'center', alignItems: 'flex-end' }}>
                              <TouchableOpacity onPress={this.showDateTimePicker1}>
                                <Image source={require('../../../../images/calendar.png')}
                                  style={{ height: 20, width: 20, marginRight: 10 }}
                                  resizeMode="contain" />
                              </TouchableOpacity>
                            </View>

                            <DateTimePicker
                              // onTimeChange={this.setDate1}
                              isVisible={this.state.isTimePickerVisible}
                              onConfirm={this.handleStartDatePicked1}
                              onCancel={this.hideDateTimePicker1}
                              // minimumTime={this.minimumTime}
                              is24Hour={true}
                              mode="time"

                            />
                          </View>

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

                {this.state.SelectedBetOption != 'C' ?
                  <View style={{ marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 2 }}>
                    <TouchableOpacity onPress={() => { this.showMoreDialog(true) }}>
                      <View style={{ backgroundColor: '#dddddd', borderColor: '#cccccc', borderWidth: 2, borderRadius: 5 }}>
                        <Text style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), color: '#68bcbc' }}>See full list of prop bets.</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{ marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 2 }}>
                    <TouchableOpacity onPress={() => { this.showcustomDialog(true) }}>
                      <View style={{ backgroundColor: '#dddddd', borderColor: '#cccccc', borderWidth: 2, borderRadius: 5 }}>
                        <Text style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#68bcbc' }}>See full list of custom bets.</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                }



                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderColor: '#666666', borderRadius: 5, borderWidth: 2, marginLeft: 5, marginBottom: 5, marginRight: 5, marginTop: 1, paddingTop: 6, paddingBottom: 6 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>

                    <Image source={require('../../../../images/BucksDark.png')} style={{ width: 10, height: 10 }}></Image>

                    <TextInput
                      value={this.state.betammount}
                     // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, this.state.selectedPropBetValue, "BA", this.state.SelectedBetOption) }}
                      onChange={(e:any)=>{this.handleKeyDown(e, this.state.selectedPropBetValue, "BA", this.state.SelectedBetOption)}}
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
                <TouchableOpacity onPress={() => { this.CustomBetDialog(games) }}>
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
            {/* {this.state.SelectedBetOption == 'C' ?
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => { this.showMoreDialog(true)}}>
                  <Text style={[styles.selectText, { textAlign:'center', color:    '#68bcbc' , textDecorationLine:  'underline'   }]}>
                  See full list of custom prop bets.
                    </Text>
                </TouchableWithoutFeedback>
              </View>
              :null} */}



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

    // this.props.navigation!.navigate(AppScreens.G_LoginPage);

    this.props.navigation!.navigate(AppScreens.G_LocationConfirmation);
  }

  goToInappPage() {
    this.setState({ userStatusDialog: false });

    // this.props.navigation!.navigate(AppScreens.G_LoginPage);

   // this.props.navigation!.navigate(AppScreens.G_InAppPurchaseUpdateIOS);
   // this.props.navigation!.replace(AppScreens.G_InAPPPurchaseViewIOS,{params:{callFrom:'userLevel'}});
    this.props.navigation!.navigate(AppScreens.G_InAPPPurchaseViewIOS,{params:{callFrom:'userLevel'}});
  }

  loadMore(data:any) {
    console.log('load more',data);
    if(data){
      this.setState({ DataList: [] });
      var count = 1;
      this.setState({ startPage: count });
    }else{
      var count = parseInt(this.state.startPage) + 1;
      this.setState({ startPage: count });
    }

    if (this.state.settype == 'PAST') {
      this.prev_next_dashboard_API_call(this.state.currentweekindex, 'S', count,-1,true);
    } else if (this.state.settype == 'NEXT') {
      this.prev_next_dashboard_API_call(this.state.currentweekindex, 'A', count,1,true);
    } else {
      if (this.state.showFighting) {
        this.callMethod(this.state.selected_Legue_id, this.state.selectedValue, count);
      } else if (this.state.showSoccer) {
        this.callMethod(this.state.selected_Legue_id, this.state.selectedSoccerValue, count);
      } else if (this.state.showAutoRacing) {
        this.callMethod(this.state.selected_Legue_id, this.state.selectedAutoRacingValue, count);
      } else if (this.state.showHorseRacing) {
        this.callMethod(this.state.selected_Legue_id, this.state.selectedHorseRacingValue, count);
      } else if (this.state.showClgFootball || this.state.showClgBasketBall) {
        this.callMethod(this.state.selected_Legue_id, this.state.dashboard_team_id, count);
      } else {
        this.callMethod(this.state.selected_Legue_id, '', count);
      }
    }
  }


  sarchCustomProp(val: any) {
    var customProbBetList = this.state.searchData;
    if (val.trim() !== '') {
      this.filterData = this.state.customProbBetList.filter((item:any) => {
        return item.question.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });

    } else {
      this.filterData = customProbBetList;
    }
    console.log(this.filterData);
    this.setState({
      customProbBetList: this.filterData,
      searchText: val,
    });

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

    let BetFilterData = [{
      value: 'Date Added',
    }, {
      value: 'Match Game',
    },
    {
      value: 'Player Name',
    }];

    var radio1 = false;
    var radio2 = true;




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
        isNotification={true}
        showOverlay={this.state.showOverlayGameSelectionFlag}>


        <ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />

{this.state.aceeptoverlay? UrlService.OVERLAY==0?<Modal visible={this.state.imagezoom} transparent={true}>
<View style={{height:'100%', width:'100%',flex:1}}>
<SafeAreaView forceInset={{ bottom: 'never' }}>
         <ImageBackground source={require('../../../../images/dash_overlay1.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: '100%' }}>
                                  <View  style={{  position: 'absolute',  justifyContent: 'center', bottom: '2%' ,width:'100%',alignContent:'center',alignItems:'center'}}>
                                <View style={{width:'90%',justifyContent:'space-between',flexDirection:'row'}}>
                                <Text 
                                  style={{marginTop:15,fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), textDecorationLine:  'underline',color:'#68bcbc'}}
                                   onPress={()=>{this.saveoverlay()}}
                                   >Don't show again</Text>
                                   <TouchableOpacity  onPress={()=>this.closecurrent()}>
                       <Image source={require('../../../../images/close_overlay.png')}  style={{height:50,width:50 }}></Image>
                       </TouchableOpacity>

                                </View>
                                  </View>

                                </ImageBackground>
                                </SafeAreaView>
         </View>
          
        </Modal>:null:null}
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
                    style={{ fontFamily: 'Montserrat-Regular', height: 80, fontSize: hp(1.4)}}
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
                We received your feedback.
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
                  listener={() => {this.setState({ guestUserDialog: false })}} />
              </View>
              <View style={{ width: '4%' }}></View>
              <View style={{ width: '46%' }}>
                 <BigButton title="OK" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                  listener={() => { this.goToLoginPage()  }} />
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

              {this.state.SelectedBetOption != 'C' ?

                <Text style={styles.DialogHeaderText}> PROP BETS </Text>
                : <Text style={styles.DialogHeaderText}> Custom  PROP BETS </Text>}

              <View style={styles.DialogSubmain}>
                <View style={styles.SearchView}>
                  <SearchBox />
                </View>

                {this.state.SelectedBetOption != 'C' ?
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
                  : null}

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



        {/* --------------------------------Ashish design custom prop bets UNCOVERED ACTION Dialogue --------------------------------*/}
        <Dialog
         visible={this.state.iscustomdialog}
          title=""
          // dialogStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
          // contentStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
          onTouchOutside={() => this.setState({ iscustomdialog: false })} >


          <View style={styles.DialogMain}>
            <TouchableOpacity onPress={() => this.setState({ iscustomdialog: false })}>
              <View style={[styles.CloseView,]}>
                <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12 }}></Image>
              </View>
            </TouchableOpacity>

            <View style={styles.DialogHeaderMain} >

              {this.state.SelectedBetOption != 'C' ?

                <Text style={styles.DialogHeaderText}> PROP BETS </Text>
                : <Text style={styles.DialogHeaderText}> CUSTOM PROP BETS </Text>}

              <View style={styles.DialogSubmain}>
                <View style={styles.SearchView}>
                  {/* <SearchBox /> */}
                  <TextInput
                    value={this.state.searchText}
                    style={[styles.inputTextStylesearch, { width: '85%' }]}
                    placeholder={'SEARCH'}
                    placeholderTextColor='#333333'
                    onChangeText={(text) => { this.sarchCustomProp(text) }}
                    autoFocus={true}
                  />

                  <View style={styles.searchIconContainer}>
                    <TouchableWithoutFeedback onPress={() => { this.sarchCustomProp(this.state.searchText) }}>
                      <Image source={require('../../../../images/search_icon.png')} style={{ width: wp(5), height: wp(5) }} resizeMode='contain' />
                    </TouchableWithoutFeedback>
                  </View>
                </View>

                {/* <Text>{ JSON.stringify(this.state.customProbBetList)}</Text> */}
              </View>
              {this.state.customProbBetList.length != 0 ?
                <View style={{ height: hp(45), marginTop: 5 }}>
                  <ScrollView
                    bounces={true}
                  >
                    <FlatList
                      extraData={this.state}
                      data={this.state.customProbBetList}
                      keyExtractor={(item: any, index) => index.toString()}
                      bounces={false}
                      renderItem={({ item, index }: any) => {
                        var itemindex = '';
                        itemindex = item.result_index;

                        return (
                          <View style={[styles.containerdialog]}>
                            {/* <LinearGradient colors={['#e7e1e5', 'white']} style={{flex: 1,}}> */}

                            <View style={{ backgroundColor: '#e6eaec', flex: 1 }} >
                              <View style={{
                                flexDirection: 'row', paddingRight: wp(2),
                                paddingLeft: wp(3), paddingTop: 3
                              }}>

                                <Text style={[styles.paragraph]}>{item.question}</Text>
                              </View>
                              <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10, paddingLeft: wp(3), }}>
                                {(item.custom_props.custom_prop_state == 'FINAL') ?
                                  <RadioForm
                                    radio_props={[{ label: item.my_answer + '    ', value: item.my_answer }, { label: item.other_answer + '    ', value: item.other_answer }]}
                                    initial={itemindex}
                                    formHorizontal={true}
                                    // labelHorizontal={true}
                                    buttonColor={'#ACACAC'}
                                    buttonSize={10}
                                    buttonOuterSize={20}

                                    selectedButtonColor={'#68bcbc'}
                                    buttonWrapStyle={{ marginLeft: 15 }}
                                    labelWrapStyle={{ marginRight: 10 }}
                                    animation={true}
                                    disabled={true}
                                    onPress={(value:any) => { this.setState({ result: value }) }}
                                  />
                                  : <RadioForm
                                    radio_props={[{ label: item.my_answer + '    ', value: item.my_answer }, { label: item.other_answer + '    ', value: item.other_answer }]}
                                    initial={-1}
                                    formHorizontal={true}
                                    // labelHorizontal={true}
                                    buttonColor={'#ACACAC'}
                                    buttonSize={10}
                                    buttonOuterSize={20}
                                    selectedButtonColor={'#68bcbc'}
                                    buttonWrapStyle={{ marginLeft: 15 }}
                                    labelWrapStyle={{ marginRight: 10 }}
                                    animation={true}

                                    onPress={(value:any) => { this.setState({ result: value }) }}
                                  />
                                }
                              </View>
                              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                {(item.custom_props.custom_prop_state == 'FINAL') ?
                                  <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                    <Text style={{
                                      fontFamily: 'Montserrat-Regular',
                                      color: 'black',
                                      fontSize: hp(1.4),
                                      padding: 3
                                    }} > Result published on {moment(item.result_declared_timestamp * 1000).format('LT')} {new Date(item.result_declared_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.result_declared_timestamp * 1000).toString().split(' ')[6].length - 2)}, {moment(item.result_declared_timestamp * 1000).format('LL')}</Text>
                                  </View>
                                  : <TouchableOpacity style={{ width: 120, height: 50 }} onPress={() => { this.publishCustomBet(item) }} >
                                    <View style={{ alignItems: 'center', backgroundColor: '#68bcbc', justifyContent: 'center', alignContent: 'center' }}>
                                      <Text style={{
                                        color: 'white',
                                        fontSize: hp(1.4),
                                        padding: 3
                                      }} >Publish Result</Text>
                                    </View>
                                  </TouchableOpacity>
                                }

                              </View>


                            </View>
                            {/* </LinearGradient> */}
                          </View>
                        )
                      }}
                    />
                  </ScrollView>
                </View> :
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
        </Dialog>



        

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
                            onPress={() => { }} 
                            />
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
                         // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, '', "BA", '') }}
                          // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag) }}
                            onChange={(e:any)=>{this.handleKeyDown(e, '', "BA", '')}}
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
            {/* <AdMobBanner
              bannerSize="smartBannerPortrait"
              adUnitID="ca-app-pub-3077576045869180/5426698953"
              testDeviceID="EMULATOR"
              didFailToReceiveAdWithError={(err: any) => {
                console.log('admob error' + JSON.stringify(err));
              }} /> */}
              {/* <BannerAd unitId={TestIds.BANNER}  size={BannerAdSize.FULL_BANNER} />  */}
          </View>
          <View style={[styles.mainContent, { width: '100%' }]}>


            {this.state.showOverlayGameSelectionFlag ? this.showOverlayGameSelection() : this.showGameSelectionAndOther()}



            <View style={{ flex: 1, }}>
            {!this.state.custonDropDown?<View style={styles.titleContainer} >

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
              </View>:null}



              {/* --------------------- Flatlist ---------------- */}
              <View style={{ backgroundColor: 'white', height: '93%', marginBottom: 0, paddingBottom: 0, }}>

                {/*garima for scrolling issue*/}
                {this.state.selected_Legue_id == '' ?null:this.state.NoData == true ?
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
                          <View style={[styles.flatlist_title_row, { height: (this.isfontSize == 'font_small') ? 18 : ((this.isfontSize == 'font_small')?20:23)}]}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', width: (this.isfontSize == 'font_small') ? wp(75) : ((this.isfontSize == 'font_medium') ? wp(65) : wp(60)), paddingLeft: 4 }}>
                              <Text style={[styles.flatlist_title, styles[this.isfontSize]]}>
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
                                  width: (this.isfontSize == 'font_small') ? hp(1.5) : ((this.isfontSize == 'font_small') ? hp(2.0) : hp(2.5)),
                                  height: (this.isfontSize == 'font_small') ? hp(1.5) : ((this.isfontSize == 'font_small') ? hp(2.0) : hp(2.5))
                                }, styles.game_state_round_container]}>
                                  <View style={[{
                                    backgroundColor: item.gameState == 'PENDING' || item.gameState == '' ? '#888888' : 'orange', width: (this.isfontSize == 'font_small') ? hp(1) : ((this.isfontSize == 'font_small') ? hp(1.2) : hp(1.5)),
                                    height: (this.isfontSize == 'font_small') ? hp(1) : ((this.isfontSize == 'font_small') ? hp(1.2) : hp(1.5)) }, styles.game_state_round]}>
                                  </View>
                                </View>
                              </View>
                              <View style={{}}>
                                <Text style={[{ color: item.gameState == 'PENDING' || item.gameState == '' ? '#888888' : '#68bcbc' }, styles.game_state_text,styles[this.isfontSize]]}> GAME STATS </Text>
                              </View>

                            </View>

                          </View>
                          {/* --------------------- table row ---------------- */}
                          <View style={[styles[this.isMainBlockHeight],{ width: '100%', alignItems: 'center' }]}>

                            <View style={styles.flatlist_data_whole_row}>

                              <View style={[styles.flatlist_data_row_vertical_line, { backgroundColor: ((item.gameState == 'PENDING' || item.gameState == '' || item.gameState == ' ') ? '#68bcbc' : 'orange') }]}></View>
                              {this.state.showSoccer == false ? <View style={styles.flatlist_data_4column}>
                                {/* --------------------- first row ---------------- */}
                                <View style={[styles.flatlist_data_row_height, styles[this.blockHeight], { borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                  <View style={[{ borderRightColor: 'white', borderRightWidth: 1,flexDirection:'row' }, styles.flatlist_matchup_style]}>
                                    <View style={{width:'80%',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                    <Text numberOfLines={2} style={[styles.flatlist_matchup_text_style, styles[this.isfontSize],{textAlign:'left',width:'100%'}]} >
                                      {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.away.t : item.games.MATCH_UPS.away.t}
                                     </Text>
                                     </View>
                                     <View style={{width:'20%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                    {/* <Text style={[styles.flatlist_matchup_count_text_style, styles[this.isfontSize],{textAlign:'center',width:'100%'}]}> */}
                                    <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                      {item.games.MATCH_UPS.away.counts}
                                    </Text>
                                    </View>

                                  </View>

                                  <TouchableWithoutFeedback onPress={() => (item.games.MONEY_LINE.away.value == 0 || item.games.MONEY_LINE.away.value == "N/A") ? null : this.getDialogueState(item, index, 'M', ArrayLength)}>
                                    <View style={[{
                                      backgroundColor: item.games.MONEY_LINE.away.value == "N/A" ? '#888888' : item.games.MONEY_LINE.away.result == "L" ? '#BBBBBB' : item.isMoneyLineSelect1 != true ? '#68bcbc' : 'white',
                                      borderRightColor: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc',
                                      borderColor: item.isMoneyLineSelect1 == true ? '#68bcbc' : '',
                                      borderWidth: item.isMoneyLineSelect1 == true ? 1 : 0,
                                      borderRightWidth: 1,
                                    }, styles.flatlist_moneyline_style]}>
                                      <View style={[styles.flatlist_icon_style]} >
                                        {item.games.MONEY_LINE.away.flag && <Icon name="check" size={12} color="white" />}
                                      </View>
                                      <View style={[styles.flatlist_odd_style]} >
                                        <Text style={[{ color: item.games.MONEY_LINE.away.value == "N/A" ? '#FFFFFF' : item.games.MONEY_LINE.away.result == "L" ? '#666666' : item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text]}>

                                          {item.games.MONEY_LINE.away.value == "N/A" ? item.games.MONEY_LINE.away.value : item.games.MONEY_LINE.away.value > 0 ? '+' + item.games.MONEY_LINE.away.value : item.games.MONEY_LINE.away.value}

                                        </Text>
                                      </View>



                                    </View>

                                  </TouchableWithoutFeedback >

                                  <TouchableWithoutFeedback onPress={() => (item.games.TOTAL.away.value == 0 || item.games.TOTAL.away.value == "N/A") ? null : this.getDialogueState(item, index, 'T', ArrayLength)}>
                                    <View style={[{
                                      backgroundColor: item.games.TOTAL.away.value == "N/A" ? '#888888' : item.games.TOTAL.away.result == "L" ? '#BBBBBB' : item.isTotalSelect1 != true ? '#68bcbc' : 'white',
                                      borderRightColor: item.isTotalSelect1 != true ? 'white' : '#68bcbc',
                                      borderColor: item.isTotalSelect1 == true ? '#68bcbc' : '',
                                      borderWidth: item.isTotalSelect1 == true ? 1 : 0,
                                      borderRightWidth: 1,
                                    }, styles.flatlist_total_style]}>
                                      <View style={[styles.flatlist_icon_style]} >
                                        {item.games.TOTAL.away.flag && <Icon name="check" size={12} color="white" />}
                                      </View>

                                      <View style={[styles.flatlist_odd_style]} >

                                        <Text style={[{ color: item.games.TOTAL.away.value == "N/A" ? '#FFFFFF' : item.games.TOTAL.away.result == "L" ? '#666666' : item.isTotalSelect1 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text,{textAlign:'center'}]}>
                                          {item.games.TOTAL.away.value == "N/A" ? item.games.TOTAL.away.value : 'O ' + item.games.TOTAL.away.other_value + ' (' + (Math.sign(item.games.TOTAL.away.value) == +1 ? '+' : '') + '' + item.games.TOTAL.away.value + ')'}

                                        </Text>
                                      </View>


                                    </View>
                                  </TouchableWithoutFeedback >

                                  <TouchableWithoutFeedback onPress={() => (item.games.SPREAD.away.value == 0 || item.games.SPREAD.away.value == "N/A") ? null : this.getDialogueState(item, index, 'S', ArrayLength)}>
                                    <View style={[{
                                      backgroundColor: item.games.SPREAD.away.value == "N/A" ? '#888888' : item.games.SPREAD.away.result == "L" ? '#BBBBBB' : item.isSpreadSelect1 != true ? '#68bcbc' : 'white',
                                      borderRightColor: item.isSpreadSelect1 != true ? 'white' : '#68bcbc',
                                      borderColor: item.isSpreadSelect1 == true ? '#68bcbc' : '',
                                      borderWidth: item.isSpreadSelect1 == true ? 1 : 0,

                                      borderRightWidth: 1,
                                    }, styles.flatlist_spread_style]}>

                                      <View style={[styles.flatlist_icon_style]} >
                                        {item.games.SPREAD.away.flag && <Icon name="check" size={12} color="white" />}
                                      </View>
                                      <View style={[styles.flatlist_odd_style]} >
                                        <Text style={[{ color: item.games.SPREAD.away.result == "N/A" ? '#FFFFFF' : item.games.SPREAD.away.result == "L" ? '#666666' : item.isSpreadSelect1 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text]}>

                                          {item.games.SPREAD.away.value == "N/A" ? item.games.SPREAD.away.value : (Math.sign(item.games.SPREAD.away.other_value) == +1 ? '+' + item.games.SPREAD.away.other_value : item.games.SPREAD.away.other_value) + ' (' + (Math.sign(item.games.SPREAD.away.value) == +1 ? '+' + item.games.SPREAD.away.value : item.games.SPREAD.away.value + ')')}

                                        </Text>
                                      </View>



                                    </View>
                                  </TouchableWithoutFeedback >

                                </View>
                                {/* --------------------- second row ---------------- */}

                                <View style={[styles.flatlist_data_row_height, styles[this.blockHeight],{ borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                  <View style={[{ borderRightColor: 'white', borderRightWidth: 1 ,flexDirection:'row'}, styles.flatlist_matchup_style]}>
                                    <View style={{ flexDirection: 'row', width: '80%',justifyContent:'flex-start',alignContent:'center',alignItems:'center' }}>
                                      <Text style={[styles[this.isfontSize],{
                                        fontFamily: 'Montserrat-Bold',
                                        color: '#68bcbc',
                                        paddingLeft: 2,
                                        textAlign:'left',
                                        width:'100%'
                                      }]}  numberOfLines={2} >
                                        {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.home.t : item.games.MATCH_UPS.home.t}
                                        <Text>{""}</Text>
                                        {/* <Text style={[styles.flatlist_matchup_text_style, styles[this.isfontSize], { fontFamily: 'Montserrat-Regular', fontWeight: 'normal' }]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text> */}
                                      </Text>
                                     
                                      {/* <Text style={[styles.flatlist_matchup_text_style, { fontFamily: 'Montserrat-Regular', }]}>{(this.state.selected_Legue_id == '10') ? '' : '(H)'} </Text> */}
                                    </View>
                                    <View style={{width:'20%',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                    <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                      {item.games.MATCH_UPS.home.counts}
                                    </Text>
                                    <Text style={[styles.flatlist_matchup_text_style, { fontFamily: 'Montserrat-Regular',fontSize:10, fontWeight: 'normal', paddingRight: 4, width: '100%',textAlign: 'center',paddingLeft:0}]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text>
                                    </View>
                                  </View>

                                  <TouchableWithoutFeedback onPress={() => (item.games.MONEY_LINE.home.value == 0 || item.games.MONEY_LINE.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'M', ArrayLength)}>
                                    <View style={[{
                                      backgroundColor: item.games.MONEY_LINE.home.value == "N/A" ? '#888888' : item.games.MONEY_LINE.home.result == "L" ? '#BBBBBB' : item.isMoneyLineSelect2 != true ? '#68bcbc' : 'white',
                                      borderRightColor: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc',
                                      borderColor: item.isMoneyLineSelect2 == true ? '#68bcbc' : '',
                                      borderWidth: item.isMoneyLineSelect2 == true ? 1 : 0,
                                      borderRightWidth: 1,
                                    }, styles.flatlist_moneyline_style]}>
                                      <View style={[styles.flatlist_icon_style]} >
                                        {item.games.MONEY_LINE.home.flag && <Icon name="check" size={12} color="white" />}
                                      </View>
                                      <View style={[styles.flatlist_odd_style]} >
                                        <Text style={[{ color: item.games.MONEY_LINE.home.value == "N/A" ? '#FFFFFF' : item.games.MONEY_LINE.home.result == "L" ? '#666666' : item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text]}>

                                          {item.games.MONEY_LINE.home.value == "N/A" ? item.games.MONEY_LINE.home.value : item.games.MONEY_LINE.home.value > 0 ? '+' + item.games.MONEY_LINE.home.value : item.games.MONEY_LINE.home.value}

                                        </Text>
                                      </View>


                                    </View>
                                  </TouchableWithoutFeedback>


                                  <TouchableWithoutFeedback onPress={() => (item.games.TOTAL.home.value == 0 || item.games.TOTAL.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'T', ArrayLength)}>
                                    <View style={[{
                                      backgroundColor: item.games.TOTAL.home.value == "N/A" ? '#888888' : item.games.TOTAL.home.result == "L" ? '#BBBBBB' : item.isTotalSelect2 != true ? '#68bcbc' : 'white',
                                      borderRightColor: item.isTotalSelect2 != true ? 'white' : '#68bcbc',
                                      borderColor: item.isTotalSelect2 == true ? '#68bcbc' : '',
                                      borderWidth: item.isTotalSelect2 == true ? 1 : 0,
                                      borderRightWidth: 1,
                                    }, styles.flatlist_total_style]}>

                                      <View style={[styles.flatlist_icon_style]} >
                                        {item.games.TOTAL.home.flag && <Icon name="check" size={12} color="white" />}

                                      </View>
                                      <View style={[styles.flatlist_odd_style]} >
                                        <Text style={[{ color: item.games.TOTAL.home.value == "N/A" ? '#FFFFFF' : item.games.TOTAL.home.result == "L" ? '#666666' : item.isTotalSelect2 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text,{textAlign:'center'}]}>


                                          {item.games.TOTAL.home.value == "N/A" ? item.games.TOTAL.home.value : 'U ' + item.games.TOTAL.home.other_value + ' (' + (Math.sign(item.games.TOTAL.home.value) == +1 ? '+' : '') + '' + item.games.TOTAL.home.value + ')'}

                                        </Text>
                                      </View>



                                    </View>
                                  </TouchableWithoutFeedback>

                                  <TouchableWithoutFeedback onPress={() => (item.games.SPREAD.home.value == 0 || item.games.SPREAD.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'S', ArrayLength)}>
                                    <View style={[{
                                      backgroundColor: item.games.SPREAD.home.value == "N/A" ? '#888888' : item.games.SPREAD.home.result == "L" ? '#BBBBBB' : item.isSpreadSelect2 != true ? '#68bcbc' : 'white',
                                      borderRightColor: item.isSpreadSelect2 != true ? 'white' : '#68bcbc',
                                      borderColor: item.isSpreadSelect2 == true ? '#68bcbc' : '',
                                      borderWidth: item.isSpreadSelect2 == true ? 1 : 0,
                                      borderRightWidth: 1,
                                    }, styles.flatlist_spread_style]}>

                                      <View style={[styles.flatlist_icon_style]} >
                                        {item.games.SPREAD.home.flag && <Icon name="check" size={12} color="white" />}
                                      </View>
                                      <View style={[styles.flatlist_odd_style]} >
                                        <Text style={[{ color: item.games.SPREAD.home.value == "N/A" ? '#FFFFFF' : item.games.SPREAD.home.result == "L" ? '#666666' : item.isSpreadSelect2 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text]}>

                                          {item.games.SPREAD.home.value == "N/A" ? item.games.SPREAD.home.value : (Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' + item.games.SPREAD.home.other_value : item.games.SPREAD.home.other_value) + ' (' + (Math.sign(item.games.SPREAD.home.value) == +1 ? '+' + item.games.SPREAD.home.value : item.games.SPREAD.home.value + ')')+')'}
                                          {/*  {Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' : ''}{item.games.SPREAD.home.other_value} ({Math.sign(item.games.SPREAD.home.value) == +1 ? '+' : ''}{item.games.SPREAD.home.value}) */}

                                        </Text>
                                      </View>

                                    </View>
                                  </TouchableWithoutFeedback>

                                </View>

                              </View> : <View style={[styles.flatlist_data_4column,]}>
                                  {/* --------------------- first row soccer---------------- */}

                                  <View style={[styles.flatlist_data_row_height, styles[this.blockHeight], { borderBottomColor: 'white', borderBottomWidth: 1, position: 'relative' }]}>

                                    


                                    <View style={[{ borderRightColor: 'white', borderRightWidth: 1 ,flexDirection:'row'}, styles.flatlist_matchup_style]}>
                                      <View style={{  width: '80%',justifyContent:'flex-start',alignContent:'center',alignItems:'center' }}>
                                        <Text style={[styles[this.isfontSize],{
                                          paddingTop:0,
                                          fontFamily: 'Montserrat-Bold',
                                          color: '#68bcbc',
                                          paddingLeft: 2,
                                          textAlign:'left',
                                          width:'100%'
                                        }]}  numberOfLines={2}>
                                          {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.home.t : item.games.MATCH_UPS.home.t}
                                          <Text>{""}</Text>
                                          {/* <Text style={[styles.flatlist_matchup_text_style, styles[this.isfontSize], { fontFamily: 'Montserrat-Regular', fontWeight: 'normal' }]}>{(this.state.selected_Legue_id == '10') ? '' : '(H)'} </Text> */}
                                        </Text>
                                        {/* <Text style={[styles.flatlist_matchup_text_style, { fontFamily: 'Montserrat-Regular', }]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text> */}
                                      </View>
                                      <View style={{  width: '20%',justifyContent:'center',alignContent:'center',alignItems:'center' }}>
                                      <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                        {item.games.MATCH_UPS.home.counts}
                                      </Text>
                                      <Text style={[styles.flatlist_matchup_text_style,  { fontFamily: 'Montserrat-Regular', fontWeight: 'normal',fontSize:10, paddingRight: 4, width: '100%',textAlign: 'center',paddingLeft:0}]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'}</Text>
                                      </View>
                                    </View>
                                    
                                    <TouchableWithoutFeedback onPress={() => (item.games.MONEY_LINE.home.value == 0 || item.games.MONEY_LINE.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'M', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.MONEY_LINE.home.value == "N/A" ? '#888888' : item.games.MONEY_LINE.home.result == "L" ? '#BBBBBB' : item.isMoneyLineSelect2 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isMoneyLineSelect2 == true ? '#68bcbc' : '',
                                        borderWidth: item.isMoneyLineSelect2 == true ? 1 : 0,
                                        borderRightWidth: 1,
                                      
                                      }, styles.flatlist_moneyline_style]}>

                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.MONEY_LINE.home.flag && <Icon name="check" size={12} color="white" />}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >
                                          <Text style={[{ color: item.games.MONEY_LINE.home.value == "N/A" ? '#FFFFFF' : item.games.MONEY_LINE.home.result == "L" ? '#666666' : item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc',paddingBottom:5 },styles[this.isfontSize], styles.flatlist_data_text]}>

                                            {item.games.MONEY_LINE.home.value == "N/A" ? item.games.MONEY_LINE.home.value : (item.games.MONEY_LINE.home.value > 0) ? '+' + item.games.MONEY_LINE.home.value : item.games.MONEY_LINE.home.value}

                                            {/* {item.games.MONEY_LINE.home.value > 0 ? '+' : ''}{item.games.MONEY_LINE.home.value} */}
                                          </Text>
                                        </View>


                                      </View>
                                    </TouchableWithoutFeedback>


                                    <TouchableWithoutFeedback onPress={() => (item.games.TOTAL.home.value == 0 || item.games.TOTAL.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'T', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.TOTAL.home.value == "N/A" ? '#888888' : item.games.TOTAL.home.result == "L" ? '#BBBBBB' : item.isTotalSelect2 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isTotalSelect2 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isTotalSelect2 == true ? '#68bcbc' : '',
                                        borderWidth: item.isTotalSelect2 == true ? 1 : 0,
                                        borderRightWidth: 1,
                                      }, styles.flatlist_total_style]}>
                                        {/* <Text style={[{ color: item.games.TOTAL.home.result == "L" ? '#666666' : item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>


                                          U {item.games.TOTAL.home.other_value} ({Math.sign(item.games.TOTAL.home.value) == +1 ? '+' : ''}{item.games.TOTAL.home.value})
                                      </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.TOTAL.home.flag && <Icon name="check" size={12} color="white" />}

                                        </View>

                                        <View style={[styles.flatlist_odd_style]} >
                                          <Text style={[{ color: item.games.TOTAL.home.value == "N/A" ? '#FFFFFF' : item.games.TOTAL.home.result == "L" ? '#666666' : item.isTotalSelect2 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text,{textAlign:'center'}]}>


                                            {item.games.TOTAL.home.value == "N/A" ? item.games.TOTAL.home.value : 'U ' + item.games.TOTAL.home.other_value + ' (' + (Math.sign(item.games.TOTAL.home.value) == +1 ? '+' : '') + '' + item.games.TOTAL.home.value + ')'}

                                          </Text>
                                        </View>


                                      </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => (item.games.SPREAD.home.value == 0 || item.games.SPREAD.home.value == "N/A") ? null : this.getDialogueState2(item, index, 'S', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.SPREAD.home.value == "N/A" ? '#888888' : item.games.SPREAD.home.result == "L" ? '#BBBBBB' : item.isSpreadSelect2 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isSpreadSelect2 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isSpreadSelect2 == true ? '#68bcbc' : '',
                                        borderWidth: item.isSpreadSelect2 == true ? 1 : 0,
                                        alignContent: 'center',
                                        borderRightWidth: 1,
                                      }, styles.flatlist_spread_style]}>
                                        {/* <Text style={[{ color: item.games.SPREAD.home.result == "L" ? '#666666' : item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                          {Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' : ''}{item.games.SPREAD.home.other_value} ({Math.sign(item.games.SPREAD.home.value) == +1 ? '+' : ''}{item.games.SPREAD.home.value})
                                      </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.SPREAD.home.flag && <Icon name="check" size={12} color="white" />}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >
                                          <Text style={[{ color: item.games.SPREAD.home.value == "N/A" ? '#FFFFFF' : item.games.SPREAD.home.result == "L" ? '#666666' : item.isSpreadSelect2 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text]}>

                                            {item.games.SPREAD.home.value == "N/A" ? item.games.SPREAD.home.value : (Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' + item.games.SPREAD.home.other_value : item.games.SPREAD.home.other_value) + ' (' + (Math.sign(item.games.SPREAD.home.value) == +1 ? '+' + item.games.SPREAD.home.value : item.games.SPREAD.home.value + ')')}
                                            {/*  {Math.sign(item.games.SPREAD.home.other_value) == +1 ? '+' : ''}{item.games.SPREAD.home.other_value} ({Math.sign(item.games.SPREAD.home.value) == +1 ? '+' : ''}{item.games.SPREAD.home.value}) */}

                                          </Text>
                                        </View>


                                      </View>
                                    </TouchableWithoutFeedback>

                                  </View>
                                 
                                  {(item.odds.ml_draw_price != 0 || item.odds.ml_draw_price != "") && <TouchableWithoutFeedback onPress={() => (item.odds.ml_draw_price == 0 || item.odds.ml_draw_price == "") ? null : this.getDialogueState2(item, index, 'D', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: (item.games.MONEY_LINE.draw.result == "L" ) ? '#BBBBBB' : item.isMoneyLineDraw != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isMoneyLineDraw != true ? 'white' : '#68bcbc',
                                        borderColor: item.isMoneyLineDraw == true ? '#68bcbc' : 'white',
                                        borderWidth: item.isMoneyLineDraw == true ? 1 : 1,
                                      
                                        position: 'absolute',
                                        top: '35%',
                                        left: '34.5%',
                                        zIndex: 1,
                                        width: '22%',
                                        flex: 1,
                                        

                                      },styles[this.drawblockHeight]]}>

                                        <View style={[styles.flatlist_icon_style]} >
                                        {item.games.MONEY_LINE.draw.flag && <Icon name="check" size={12} color="white" />}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >
                                        <Text style={[{ color: (item.games.MONEY_LINE.draw.result == "L") ? '#666666' :item.isMoneyLineDraw != true ? '#FFF' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                          D { (item.odds.ml_draw_price > 0) ? '+' + item.odds.ml_draw_price : item.odds.ml_draw_price}

                                           </Text>
                                        </View>


                                      </View>
                                    </TouchableWithoutFeedback> }

                                 


                               
                                  {/* --------------------- second row soccer ---------------- */}
                                  <View style={[styles.flatlist_data_row_height,styles[this.blockHeight], { borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                    <View style={[{ borderRightColor: 'white', borderRightWidth: 1,flexDirection:'row' }, styles.flatlist_matchup_style]}>
                                    <View style={{  width: '80%',justifyContent:'flex-start',alignContent:'center',alignItems:'center' }}>
                                      <Text style={[styles[this.isfontSize],{
                                          paddingTop:0,
                                          fontFamily: 'Montserrat-Bold',
                                          color: '#68bcbc',
                                          paddingLeft: 2,
                                          textAlign:'left',
                                          width:'100%'
                                        }]} numberOfLines={2}>
                                        {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.games.MATCH_UPS.away.t : item.games.MATCH_UPS.away.t}
                                        
                                      </Text>                                      
                                      </View>
                                      <View style={{  width: '20%',justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                                      <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                        {item.games.MATCH_UPS.away.counts}
                                      </Text>
                                      </View>
                                    </View>

                                    <TouchableWithoutFeedback onPress={() => (item.games.MONEY_LINE.away.value == 0 || item.games.MONEY_LINE.away.value == "N/A") ? null : this.getDialogueState(item, index, 'M', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.MONEY_LINE.away.value == "N/A" ? '#888888' : item.games.MONEY_LINE.away.result == "L" ? '#BBBBBB' : item.isMoneyLineSelect1 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isMoneyLineSelect1 == true ? '#68bcbc' : '',
                                        borderWidth: item.isMoneyLineSelect1 == true ? 1 : 0,
                                        borderRightWidth: 1,
                                        }, styles.flatlist_moneyline_style]}>
                                        {/*  <Text style={[{ color: item.games.MONEY_LINE.away.result == "L" ? '#666666' : item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                          {item.games.MONEY_LINE.away.value > 0 ? '+' : ''}{item.games.MONEY_LINE.away.value}
                                        </Text> */}
                                        <View style={[styles.flatlist_icon_style, { top: ((item.odds.ml_draw_price != 0 || item.odds.ml_draw_price != "") && item.games.MONEY_LINE.away.flag)?'45%':'1%'}] } >
                                          {item.games.MONEY_LINE.away.flag && <Icon name="check" size={12} color="white" />}
                                        </View>
                                        <View style={[styles.flatlist_odd_style, { marginTop: ((item.odds.ml_draw_price != 0 || item.odds.ml_draw_price != "") && item.games.MONEY_LINE.away.flag)?'10%':'1%' }]} >
                                          <Text style={[{ color: item.games.MONEY_LINE.away.value == "N/A" ? '#FFFFFF' : item.games.MONEY_LINE.away.result == "L" ? '#666666' : item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc',paddingTop:15 },styles[this.isfontSize], styles.flatlist_data_text]}>

                                            {item.games.MONEY_LINE.away.value == "N/A" ? item.games.MONEY_LINE.away.value : item.games.MONEY_LINE.away.value > 0 ? '+' + item.games.MONEY_LINE.away.value : item.games.MONEY_LINE.away.value}

                                          </Text>
                                        </View>


                                      </View>

                                    </TouchableWithoutFeedback >

                                    <TouchableWithoutFeedback onPress={() => (item.games.TOTAL.away.value == 0 || item.games.TOTAL.away.value == "N/A") ? null : this.getDialogueState(item, index, 'T', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.TOTAL.away.value == "N/A" ? '#888888' : item.games.TOTAL.away.result == "L" ? '#BBBBBB' : item.isTotalSelect1 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isTotalSelect1 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isTotalSelect1 == true ? '#68bcbc' : '',
                                        borderWidth: item.isTotalSelect1 == true ? 1 : 0,
                                        borderRightWidth: 1,
                                      }, styles.flatlist_total_style]}>
                                        {/* <Text style={[{ color: item.games.TOTAL.away.result == "L" ? '#666666' : item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                          O {item.games.TOTAL.away.other_value} ({Math.sign(item.games.TOTAL.away.value) == +1 ? '+' : ''}{item.games.TOTAL.away.value})
                                      </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.TOTAL.away.flag && <Icon name="check" size={12} color="white" />}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >

                                          <Text style={[{ color: item.games.TOTAL.away.value == "N/A" ? '#FFFFFF' : item.games.TOTAL.away.result == "L" ? '#666666' : item.isTotalSelect1 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text,{textAlign:'center'}]}>
                                            {item.games.TOTAL.away.value == "N/A" ? item.games.TOTAL.away.value : 'O ' + item.games.TOTAL.away.other_value + ' (' + (Math.sign(item.games.TOTAL.away.value) == +1 ? '+' : '') + '' + item.games.TOTAL.away.value + ')'}

                                          </Text>
                                        </View>


                                      </View>
                                    </TouchableWithoutFeedback >

                                    <TouchableWithoutFeedback onPress={() => (item.games.SPREAD.away.value == 0 || item.games.SPREAD.away.value == "N/A") ? null : this.getDialogueState(item, index, 'S', ArrayLength)}>
                                      <View style={[{
                                        backgroundColor: item.games.SPREAD.away.result == "L" ? '#BBBBBB' : item.isSpreadSelect1 != true ? '#68bcbc' : 'white',
                                        borderRightColor: item.isSpreadSelect1 != true ? 'white' : '#68bcbc',
                                        borderColor: item.isSpreadSelect1 == true ? '#68bcbc' : '',
                                        borderWidth: item.isSpreadSelect1 == true ? 1 : 0,
                                        alignContent: 'center',
                                        borderRightWidth: 1,
                                      }, styles.flatlist_spread_style]}>
                                        {/*  <Text style={[{ color: item.games.SPREAD.away.result == "L" ? '#666666' : item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                          {Math.sign(item.games.SPREAD.away.other_value) == +1 ? '+' : ''}{item.games.SPREAD.away.other_value} ({Math.sign(item.games.SPREAD.away.value) == +1 ? '+' : ''}{item.games.SPREAD.away.value})
                                      </Text> */}
                                        <View style={[styles.flatlist_icon_style]} >
                                          {item.games.SPREAD.away.flag && <Icon name="check" size={12} color="white" />}
                                        </View>
                                        <View style={[styles.flatlist_odd_style]} >
                                          <Text style={[{ color: item.games.SPREAD.away.result == "L" ? '#FFFFFF' : item.games.SPREAD.away.result == "L" ? '#666666' : item.isSpreadSelect1 != true ? 'white' : '#68bcbc' },styles[this.isfontSize], styles.flatlist_data_text]}>

                                            {item.games.SPREAD.away.value == "N/A" ? item.games.SPREAD.away.value : (Math.sign(item.games.SPREAD.away.other_value) == +1 ? '+' + item.games.SPREAD.away.other_value : item.games.SPREAD.away.other_value) + ' (' + (Math.sign(item.games.SPREAD.away.value) == +1 ? '+' + item.games.SPREAD.away.value : item.games.SPREAD.away.value + ')')}

                                          </Text>
                                        </View>


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
                                      <Text style={[{ color: item.isBetaFriendSelect == true ? '#68bcbc' : 'white', textAlign: 'center' },styles[this.isfontSize], styles.flatlist_data_text]}>
                                        BET A FRIEND
                                </Text>
                                    </View>
                                  </TouchableWithoutFeedback>
                                </View>
                              </View>

                            </View>
                          </View>
                          {
                            item.isMoneyLineSelect1 == true ? this.getDialogue(item, index, item.games.MONEY_LINE.away.value, item.games.MATCH_UPS.away.title,item.games.MONEY_LINE.away.private_value) : null
                          }
                          {
                            item.isMoneyLineSelect2 == true ? this.getDialogue(item, index, item.games.MONEY_LINE.home.value, item.games.MATCH_UPS.home.title,item.games.MONEY_LINE.home.private_value) : null
                          }
                          {
                            item.isTotalSelect1 == true ? this.getDialogue(item, index, item.games.TOTAL.away.value, item.games.MATCH_UPS.away.title,item.games.TOTAL.away.private_value) : null
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
                       {index == parseInt(this.state.DataList.length) - 1 && this.state.keyboardOpen ?  <View style={{height:400, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}><Text style={[styles.viewMore, styles[this.isfontSize]]}  >  </Text></View> :null}
                       {/* <Text  onPress={() => crashlytics().crash()} >Crash</Text> */}
                      </Animated.View>
                    )
                  }} />

              </View>

            </View>
            {this.state.keyboardOpen == false ?
              <View style={{  height: '16%' }}>
                {this.state.DashboardCall == true  && this.state.selected_Legue_id!='' ?
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

            {/* {this.state.keyboardOpen == false ? onMove  = {() =>console.log('move start')}   onDragStart={() =>console.log('drag start')} onDragEnd={() =>{ this.feedbackDialogOpen() }}*/}
           
           <View style={{   position: 'absolute',  justifyContent: 'flex-end', bottom: '20%', marginLeft: '3%' }}>
              <Draggable>
              <TouchableWithoutFeedback onPress={() => { this.feedbackDialogOpen() }}> 
                
            <View>
            
                <View style={{ backgroundColor:'white', width: 50, height: 50,  borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                  <Image  
                    style={{   width: 30, height: 30 }}
                    source={require('../../../../images/Feedback.png')}>
                  </Image>
                </View>
            
            </View>
            </TouchableWithoutFeedback>
            </Draggable>
           </View>
           
              {/* : null} */}



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

  customBetaFriendRequestStatus: state.serviceReducer.requestStatus,
  customBetaFriendResponse: state.serviceReducer.response as CustomBetAFriendResponse,
  customBetaFriendError: state.serviceReducer.error,

  feedbackRequestStatus: state.serviceReducer.requestStatus,
  feedbackResponse: state.serviceReducer.response as FeedbackResponse,
  feedbackError: state.serviceReducer.error,
  locationResponse: state.serviceReducer.response,
  currentLocationError: state.serviceReducer.error,
  locationRequestStatus: state.serviceReducer.requestStatus,

})



export default connect(mapStateToProps)(DashboardView);