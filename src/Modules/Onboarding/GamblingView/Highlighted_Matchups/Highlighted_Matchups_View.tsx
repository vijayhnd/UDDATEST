import React, { ReactInstance } from "react";
import { BackHandler, View, Text, TextInput, TouchableWithoutFeedback, Image, Dimensions, FlatList, ScrollView, Share, TouchableOpacity, Keyboard, Alert, Animated, UIManager, AsyncStorage } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import {AppEventsLogger} from 'react-native-fbsdk'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import AlertUtil from "../../../../Util/AlertUtil";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import AppScreens from "../../../../Util/AppScreens";
import RouterBuilder from "../../../../Router";
import { Dropdown } from 'react-native-material-dropdown';
import Application from "../../../../Entities/Application";
import ProgressLoader from 'rn-progress-loader';
import { CheckBox } from 'react-native-elements'
import BigButton from "../../../../Components/Button/BigButton";
import { Dialog } from 'react-native-simple-dialogs';
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { UDDAError } from "../../../../Entities";
import { GlobalAppState } from "../../../../ReduxStore";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import { connect } from 'react-redux';
import SearchBox from '../../../../Components/CustomComponents/SearchBox/SearchBox';
import moment from 'moment';
import PlaceBetRequest from "../../../../Services/Bets/PlaceBetRequest";
import PlaceBetResponseParser from "../../../../Services/Bets/PlaceBetResponseParser";
import PlaceBetResponse from "../../../../Services/Bets/PlaceBetResponse";
import BetAFriendRequest from "../../../../Services/Bets/BetAFriendRequest";
import BetAFriendResponseParser from "../../../../Services/Bets/BetAFriendResponseParser";
import BetAFriendResponse from "../../../../Services/Bets/BetAFriendResponse";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
import ReferralService from "../../../../Services/Referral/ReferralService";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import * as RNLocalize from "react-native-localize";
import Messgae from "../../../../Services/Core/Messages"
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";
const CleverTap = require('clevertap-react-native');
const deviceTimeZone = RNLocalize.getTimeZone();
const { State: TextInputState } = TextInput;

var update = require('immutability-helper');
const ProfilePageContent = {
  key: 'somethun',
  page_title: 'HIGHLIGHTED MATCHUPS',
}

interface G_Highlighted_Matchups_ViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus
  getProfileResponse?: GetProfileResponse
  getProfileError?: UDDAError

  placeBetRequestStatus?: ServiceRequestStatus
  placeBetResponse?: PlaceBetResponse
  placeBetError?: UDDAError

  betaFriendRequestStatus?: ServiceRequestStatus
  betaFriendResponse?: BetAFriendResponse
  betaFriendError?: UDDAError

  serviceKey?: string
  listeners?: any
}

interface G_Highlighted_Matchups_ViewState extends AppValidationComponentState {
  contentInsetBottom?: any
  firstName?: Field
  lastName?: Field
  email?: Field
  mobile?: Field
  showOverlayGameSelectionFlag: boolean
  DataList: any;
  loader: any;
  checkedBetPrivate: boolean,
  checkedBetPublic: boolean,
  checkedBetText: any,
  checkedBetPP: boolean,
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
  selected_Legue_id: any;
  BetDialogueData: any;
  Share_Show_Msg: any;
  isBetaFriendSelect: any;
  selecteValue: any;
  BetDialogueNoData: any;
  BetDialogQue: any;
  Bet_Question_array: any;
  moredialogclick: any;
  SelectedBetOption: any;
  NoData: any;
  selectedPropBetOptions: any;
  selectedPropBetValue: any;
  selectedPropsItem: any;
  shareDialog: any;
  BetType: any;
  POSTBetAmount: any;
  MessageString: any;
  MessageUrl: any;
  PropselctedFlag: any;
  BetPromotionalMsg: any;
  MatchEventDialog: any;  //garima
  shift: any;
  guestUserDialog: boolean;
  textlength: any;
  POSTWinAmount: any;
  userStatusDialog: any;
}


const bottom_initial = 0;
const arbitrary_move_value = 100;

class Highlighted_Matchups_View extends AppValidationComponent<G_Highlighted_Matchups_ViewProps, G_Highlighted_Matchups_ViewState>
  implements MenuIconListener, ISubheaderListener, LogoIconListener {
  private playtableData: any
  private serviceRequestInProgress = false;
  private Answer: any
  private NewAnswer: any
  private AnswerShow: any
  private NewAnswerShow: any
  private New: any
  private NewShow: any
  private noqueData: any
  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  public ListView_Ref: any;
  private USERAvailableUddaBucks: any = Application.sharedApplication().user!.profile.chip_balance;
  private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
  private referralservice = new ReferralService();
  public selectedItemData: any;
  public selectedItemIndex1: any;
  public selectedItemIndex2: any;
  public leaugeArrayData:any;
  focusListener: any;
  isfontSize: any;
  isMainBlockHeight: any;
  blockHeight: any;
  drawblockHeight: any;
  constructor(props: G_Highlighted_Matchups_ViewProps) {
    super(props);
    this.state = {
      contentInsetBottom: bottom_initial,
      showOverlayGameSelectionFlag: true,
      DataList: [],
      loader: false,
      checkedBetPrivate: false,
      checkedBetPublic: true,
      checkedBetText: 'P1',
      checkedBetPP: true,
      checkedMoneyLinePrivate: false,
      checkedMoneyLinePublic: true,
      betammount: '',
      amounttowin: '',
      text: '',
      ErrorMessage: '',
      dialogVisible: false,
      valueofMoneylineDialog: '00.00',
      valueofMoneylineDialogShow: '00.00',
      TitleofMoneylineDialog: 'Amount to Win:',
      focuseAmounttowin: false,
      focuseBet: false,
      dialogmoreprocess: false,
      selectedItem: [],
      selected_Legue_id: '',
      BetDialogueData: [],
      isBetaFriendSelect: false,
      selecteValue: '0',
      Share_Show_Msg: '',
      BetDialogueNoData: '',
      BetDialogQue: [],
      Bet_Question_array: [],
      selectedPropsItem: [],
      moredialogclick: 'f',
      SelectedBetOption: '',
      NoData: '',
      PropselctedFlag: '',
      selectedPropBetOptions: 'N',
      selectedPropBetValue: '0',
      shareDialog: false,
      BetType: '',
      POSTBetAmount: '',
      MessageString: '',
      MessageUrl: '',
      BetPromotionalMsg: '',
      MatchEventDialog: false,
      shift: new Animated.Value(0),
      guestUserDialog: false,
      textlength: 0,
      POSTWinAmount: '',
      userStatusDialog: false
    };

  }

  async componentDidMount() {
  
    if(UrlService.isLiveApp == '1'){
    this.referralservice.logEvent('HighlightMatchup_Click', {});
    AppEventsLogger.logEvent('HighlightMatchup_Click');
    }
    var isFontsize: any;
    isFontsize = await AsyncStorage.getItem('isfontSize');
    this.isfontSize = (isFontsize == '1.4') ? 'font_small' : ((isFontsize == '1.8') ? 'font_medium' : 'font_large');
    this.isMainBlockHeight = (isFontsize == '1.4') ? 'mainblockheight_small' : ((isFontsize == '1.8') ? 'mainblockheight_medium' : 'mainblockheight_large');
    this.blockHeight = (isFontsize == '1.4') ? 'blockheight_small' : ((isFontsize == '1.8') ? 'blockheight_medium' : 'blockheight_large');
    this.drawblockHeight = (isFontsize == '1.4') ? 'drawblockheight_small' : ((isFontsize == '1.8') ? 'drawblockheight_medium' : 'drawblockheight_large');
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
        //alert('in else ' + this.isfontSize + ' is main block height  ' + this.isMainBlockHeight + '  block height ' + this.blockHeight);
      }
    });
    this.callMethod();
    this.GETPromotionalMSG();
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props) {
       // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
	   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
        return true;
      }

      return false;
    });

  }

  loadMore(data: any) {
    this.callMethod();
  }

  loginButtonPressed() {
    this.setState({ guestUserDialog: false });
    // this.props.navigation!.navigate(AppScreens.G_LocationConfirmation);
    // this.props.navigation!.navigate(AppScreens.G_LoginPage,this.props);
    RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
  }
  closeModal() {
    this.setState({ guestUserDialog: !this.state.guestUserDialog });
  }
  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }
  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
    this.focusListener.remove();
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
  cellDidClicked(tag: number, tableViewCellReference: ReactInstance): void {
  }

  //  ---------------------------------------------- API Calling --------------------------------------------
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

  callMethod() {
  this.setLeaugedata();
    AsyncStorage.multiGet(['league_id']).then((data: any) => {
      var league_id_highlight = data[0][1];
      this.setState({ selected_Legue_id: league_id_highlight })
      this.setState({ loader: true });
      var params: any = {
        'league_id': league_id_highlight,
        'timezone': deviceTimeZone
      };

      var formData = new FormData();
      for (var k in params) {
        formData.append(k, params[k]);
      }
      fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/getHighLighted', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorisation': this.authorisationToken
        },
        body: formData,

      }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({ loader: false });
          console.log('highlight data' + JSON.stringify(responseJson));
          if (responseJson.content) {
            this.setState({ DataList: responseJson.content });
          }
          else {
            this.setState({ DataList: [] });
          }
          if (responseJson.message == "Access Expired.") {
            // AlertUtil.show("Session Expired ! Please login again");
            console.log("Footer comp ---->" + responseJson.message);
            LogoutUtill.logoutButtonPressed(this.props);
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ loader: false });
        })
    });
  }

  callBetAFriendAPI(selectedArray: any) {
    this.setState({ dialogVisible: false })

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
        bet_team_id = selectedArray.MATCH_UPS.away.team_id;
      }
      else if (selectedArray.isMoneyLineSelect2 == true || selectedArray.isTotalSelect2 == true || selectedArray.isSpreadSelect2 == true) {
        bet_team_id = selectedArray.MATCH_UPS.home.team_id;
      } else if (selectedArray.isMoneyLineDraw == true) {
        bet_team_id = '';
      }



      if (selectedArray.isMoneyLineSelect1 == true) {
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.MONEY_LINE.away.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.MONEY_LINE.away.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.MONEY_LINE.away.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.MONEY_LINE.away.value) / 100);
        }
        var posneg = Math.sign(selectedArray.MONEY_LINE.away.value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        }
      }
      else if (selectedArray.isMoneyLineSelect2 == true) {
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.MONEY_LINE.home.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.MONEY_LINE.home.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.MONEY_LINE.home.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.MONEY_LINE.home.value) / 100);
        }
        var posneg = Math.sign(selectedArray.MONEY_LINE.home.value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        }
      }
      else if (selectedArray.isTotalSelect1 == true) {

        var posneg = Math.sign(selectedArray.TOTAL.away.value)
        // if (posneg == -1) {
        bet_team_type = 'favored';
        // }
        // else {
        //   bet_team_type = 'underdog';
        // }
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.TOTAL.away.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.TOTAL.away.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.TOTAL.away.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.TOTAL.away.value) / 100);
        }
      }

      else if (selectedArray.isTotalSelect2 == true) {
        var posneg = Math.sign(selectedArray.TOTAL.home.value)
        // if (posneg == -1) {
        //   bet_team_type = 'favored';
        // }
        // else {
        bet_team_type = 'underdog';
        // }
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.TOTAL.home.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.TOTAL.home.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.TOTAL.home.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.TOTAL.home.value) / 100);
        }
      }

      else if (selectedArray.isSpreadSelect1 == true) {
        var posneg = Math.sign(selectedArray.SPREAD.away.other_value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        } ``
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.SPREAD.away.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.SPREAD.away.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.SPREAD.away.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.SPREAD.away.value) / 100);
        }
      }
      else if (selectedArray.isSpreadSelect2 == true) {
        var posneg = Math.sign(selectedArray.SPREAD.home.other_value)
        if (posneg == -1) {
          bet_team_type = 'favored';
        }
        else {
          bet_team_type = 'underdog';
        }
        if (bet_team_type == 'underdog') {
          wining_rate_favored = 1 + (Math.abs(selectedArray.SPREAD.home.value) / 100);
          wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.SPREAD.home.value));
        }
        else {
          wining_rate_favored = 1 + (100 / Math.abs(selectedArray.SPREAD.home.value));
          wining_rate_underdog = 1 + (Math.abs(selectedArray.SPREAD.home.value) / 100);
        }
      } else if (selectedArray.isMoneyLineDraw == true) {
        bet_team_type = '';
        wining_rate_favored = '';
        wining_rate_underdog = '';
      }

      // if (this.state.checkedMoneyLinePublic == true) {
      //   bet_type = 1
      // }
      // else if (this.state.checkedMoneyLinePrivate == true) {
      //   bet_type = 2
      // }
      var oddsArray: any;
      if (this.state.checkedMoneyLinePublic == true) {
        bet_type = '1';
        oddsArray = selectedArray.odds
      }
      else if (this.state.checkedMoneyLinePrivate == true) {
        bet_type = '2';
        oddsArray = selectedArray.private_odds
        //  // JSON.stringify(selectedArray.odds),
      }
      // if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
      //   amount_to_win = this.state.valueofMoneylineDialog;
      //   bet_amount = this.state.betammount;
      //   bet_amount = bet_amount;

      // }
      // else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
      //   bet_amount = this.state.valueofMoneylineDialog;
      //   amount_to_win = this.state.amounttowin;
      //  /// amount_to_win = parseInt(amount_to_win) + parseInt(bet_amount); pky 
      // }
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



      this.setState({ POSTBetAmount: bet_amount });


      


      
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
        JSON.stringify(oddsArray)
      )
      console.log('placebetRequset',JSON.stringify(placebetRequset))
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
    console.log('data input' + JSON.stringify(selectedPropsArray));
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

  componentWillReceiveProps(nextProps: G_Highlighted_Matchups_ViewProps) {
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
      else if (nextProps.serviceKey === ServiceKeys.PlaceBetName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log("placeBetResponse " + JSON.stringify(nextProps.placeBetResponse));
            console.log(this.state.selectedItem);
            var response = nextProps.placeBetResponse!.response;
            if (response.message == 'success') {

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
                }//garima
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
  rightTickAfterBet() {
    try {
      var selectedItems = this.selectedItemData;
      if (selectedItems.isMoneyLineSelect1 == true || selectedItems.isTotalSelect1 == true || selectedItems.isSpreadSelect1 == true) {
        if (selectedItems.isMoneyLineSelect1 == true) {
          selectedItems.MONEY_LINE.away.flag = true;
        } else if (selectedItems.isTotalSelect1 == true) {
          selectedItems.TOTAL.away.flag = true;
        } else {
          selectedItems.SPREAD.away.flag = true;
        }
      } else {
        if (selectedItems.isMoneyLineSelect2 == true) {
          selectedItems.MONEY_LINE.home.flag = true;
        } else if (selectedItems.isTotalSelect2 == true) {
          selectedItems.TOTAL.home.flag = true;
        } else if (selectedItems.isMoneyLineDraw == true) {
          selectedItems.games.MONEY_LINE.draw.flag = true;
        }else {
          selectedItems.SPREAD.home.flag = true;
        }
      }
      this.setState({ selectedItem: selectedItems });
    
      this.DialogClose(this.state.selectedItem, this.selectedItemIndex1,this.selectedItemIndex2)
    } catch (error) {

    }


  }





  calluncoveredAPI(event_id: any) {
    var params: any = {
      'event_id': event_id,
    };

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
        }
        else {
          this.setState({ BetDialogueNoData: true });
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
        if (responseJson.data.length > 0) {
          this.setState({ Bet_Question_array: responseJson.data })
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

  GETPromotionalMSG() {
    fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/get_promotional_message', {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('GETPromotionalMSG ' + JSON.stringify(responseJson));
        if (responseJson.message = "success") {
          this.setState({ BetPromotionalMsg: responseJson.data.promotional_array[0].gaming_promotional_message })
        } else {
          this.setState({ BetPromotionalMsg: responseJson.message });
        }
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          LogoutUtill.logoutButtonPressed(this.props);
        }
      })
      .catch(error => {
        AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
        console.log(error);
      })
  }












  //  ---------------------------------------------- METHODS --------------------------------------------


  accountNameTapped() {
    this.props.navigation!.navigate(AppScreens.G_ProfileView);
  }

  iconDidTapped() {
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View, { highlighted: true });
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

  coveredPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
  }

  ContesetJoinTapped() {

    this.props.navigation!.navigate(AppScreens.G_UddaContests);

  }




  handleKeyDown = (e: any, aValue: any, Flag: any, MFlag: any) => {
    //if (e.nativeEvent.key == "." || e.nativeEvent.key == "1" || e.nativeEvent.key == "2" || e.nativeEvent.key == "3" || e.nativeEvent.key == "4" || e.nativeEvent.key == "5" || e.nativeEvent.key == "6" || e.nativeEvent.key == "7" || e.nativeEvent.key == "8" || e.nativeEvent.key == "9" || e.nativeEvent.key == "0") {
    if (this.state.textlength > e.nativeEvent.text.length) {
      // alert('delete')
      this.setState({ textlength: 0 })
      this.handleBackSpace(Flag)
    } else {

      var n = e.nativeEvent.text
      var res = n.length - 1
      // alert(n[res])



      if (n[res] == "." || n[res] == "1" || n[res] == "2" || n[res] == "3" || n[res] == "4" || n[res] == "5" || n[res] == "6" || n[res] == "7" || n[res] == "8" || n[res] == "9" || n[res] == "0") {
        this.setState({ textlength: e.nativeEvent.text.length })
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

  goToInappPage() {
    this.setState({ userStatusDialog: false });

    // this.props.navigation!.navigate(AppScreens.G_LoginPage);

    this.props.navigation!.navigate(AppScreens.G_InAppPurchaseUpdateIOS);
  }

  checkUserStatus(betName: any) {
    var that = this;
    //that.setState({ userStatusDialog: true });

    console.log(Application.sharedApplication().user!.profile.level_array.restricted_bets);
    //if( Application.sharedApplication().user.level_array.restricted_bets)
    var status = true;
    for (let i = 0; i < Application.sharedApplication().user!.profile.level_array.restricted_bets.length; i++) {
      if (Application.sharedApplication().user!.profile.level_array.restricted_bets[i].type == betName) {
        status = false;
        that.setState({ userStatusDialog: true });
      }

    }


    return status;
  }



  getDialogueState(item: any, index1: any, index2: any, index3: any, Flag: any, Arraylength1: any, Arraylength2: any, Arraylength3: any) {

    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    } else {

      setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index1, viewPosition: 0.2 }) }, 100);

      if (this.USERAvailableUddaBucks <= '1000') {
        AlertUtil.show("Minimum Balance For Placing A Bet Is 1000 UDDA Bucks.");
      }
      else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
        this.setState({ MatchEventDialog: true }); //garima
      }
      else {
        if (Flag == 'M') {
          if (item.MONEY_LINE.away.value == 0 || item.MONEY_LINE.away.value == '') {
            AlertUtil.show("You can't bet on 0 odds");
          }
          else {
            for (let i = 0; i < Arraylength1; i++) {
              for (let j = 0; j < Arraylength2; j++) {
                for (let k = 0; k < Arraylength3; k++) {
                  if (i == index1 && j == index2 && k == index3) {
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = !item.isMoneyLineSelect1;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineDraw = false;
                    this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'M';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                  else {
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineDraw = false;

                    this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'M';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                }
              }
            }
            this.setState({ DataList: this.state.DataList });
          }
          this.checkUserStatus("money_line")
        }
        else if (Flag == 'T') {
          if (item.TOTAL.away.value == 0 || item.TOTAL.away.value == '') {
            AlertUtil.show("You can't bet on 0 odds");
          }
          else {
            for (let i = 0; i < Arraylength1; i++) {
              for (let j = 0; j < Arraylength2; j++) {
                for (let k = 0; k < Arraylength3; k++) {
                  if (i == index1 && j == index2 && k == index3) {
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = !item.isTotalSelect1;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineDraw = false;
                    this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'T';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                  else {
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineDraw = false;
                    this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'T';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                }
              }
            }
            this.setState({ DataList: this.state.DataList });
          }
          this.checkUserStatus("total")
        }
        else if (Flag == 'S') {
          if (item.SPREAD.away.value == 0 || item.SPREAD.away.value == '') {
            AlertUtil.show("You can't bet on 0 odds");
          }
          else {
            for (let i = 0; i < Arraylength1; i++) {

              for (let j = 0; j < Arraylength2; j++) {

                for (let k = 0; k < Arraylength3; k++) {
                  if (i == index1 && j == index2 && k == index3) {
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = !item.isSpreadSelect1;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineDraw = false;
                    this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'S';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                  else {
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineDraw = false;
                    this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'S';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                }
              }
            }
            this.setState({ DataList: this.state.DataList });
          }
          this.checkUserStatus("spread")
        }
      }
    }
  }

  getDialogueState2(item: any, index1: any, index2: any, index3: any, Flag: any, Arraylength1: any, Arraylength2: any, Arraylength3: any) {
    setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index1, viewPosition: 0.2 }) }, 100);

    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    } else {
      if (this.USERAvailableUddaBucks <= '1000') {
        AlertUtil.show("Minimum Balance For Placing A Bet Is 1000 UDDA Bucks.");
      }
      else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
        this.setState({ MatchEventDialog: true });
      }
      else {
        if (Flag == 'M') {
          if (item.MONEY_LINE.home.value == 0 || item.MONEY_LINE.home.value == '') {
            AlertUtil.show("You can't bet on 0 odds");
          }
          else {
            for (let i = 0; i < Arraylength1; i++) {
              for (let j = 0; j < Arraylength2; j++) {
                for (let k = 0; k < Arraylength3; k++) {
                  if (i == index1 && j == index2 && k == index3) {
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = !item.isMoneyLineSelect2;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineDraw = false;
                    this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'M';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                  else {
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineDraw = false;
                    this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'M';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                }
              }
            }
            this.setState({ DataList: this.state.DataList });
          }
          this.checkUserStatus("money_line")
        }
        else if (Flag == 'T') {
          if (item.TOTAL.home.value == 0 || item.TOTAL.home.value == '') {
            AlertUtil.show("You can't bet on 0 odds");
          }
          else {
            for (let i = 0; i < Arraylength1; i++) {
              for (let j = 0; j < Arraylength2; j++) {
                for (let k = 0; k < Arraylength3; k++) {
                  if (i == index1 && j == index2 && k == index3) {
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = !item.isTotalSelect2;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineDraw = false;
                    this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'T';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                  else {
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineDraw = false;
                    this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'T';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                }
              }
            }
            this.setState({ DataList: this.state.DataList });
          }
          this.checkUserStatus("total")
        }
        else if (Flag == 'S') {
          if (item.SPREAD.home.value == 0 || item.SPREAD.home.value == '') {
            AlertUtil.show("You can't bet on 0 odds");
          }
          else {
            for (let i = 0; i < Arraylength1; i++) {

              for (let j = 0; j < Arraylength2; j++) {

                for (let k = 0; k < Arraylength3; k++) {
                  if (i == index1 && j == index2 && k == index3) {
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = !item.isSpreadSelect2;
                    this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineDraw = false;
                    this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'S';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                  else {
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineDraw = false;
                    this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'S';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                }
              }
            }
            this.setState({ DataList: this.state.DataList });
          }
          this.checkUserStatus("spread")
        } else if (Flag == 'D') {
          if (item.odds.ml_draw_price == 0 || item.odds.ml_draw_price == '') {
            AlertUtil.show("You can't bet on 0 odds");
          }
          else {
            for (let i = 0; i < Arraylength1; i++) {

              for (let j = 0; j < Arraylength2; j++) {

                for (let k = 0; k < Arraylength3; k++) {
                  if (i == index1 && j == index2 && k == index3) {
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false
                    this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                    this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineDraw = !item.isMoneyLineDraw;;
                    this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'D';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                  else {
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                    this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                    this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                    this.state.DataList[i].date_array[j].game[k].isMoneyLineDraw = false;
                    this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'D';
                    this.setState({ betammount: '' });
                    this.setState({ amounttowin: '' });
                    this.setState({ valueofMoneylineDialog: '0.00' });
                    this.setState({ valueofMoneylineDialogShow: '0.00' });
                    this.setState({ checkedMoneyLinePublic: true });
                    this.setState({ checkedMoneyLinePrivate: false });
                  }
                }
              }
            }
            this.setState({ DataList: this.state.DataList });
          }
          this.checkUserStatus("money_line")
        }
      }
    }
  }

  getBetDialogueState(item: any, index1: any, index2: any, index3: any, Arraylength1: any, Arraylength2: any, Arraylength3: any) {
    this.checkUserStatus("prop_bet")
    setTimeout(() => { this.ListView_Ref.scrollToIndex({ animated: true, index: index1, viewPosition: 0.2 }) }, 100);
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    } else {
      if (this.USERAvailableUddaBucks <= '1000') {
        AlertUtil.show("Minimum Balance For Placing A Bet Is 1000 UDDA Bucks.");
      }
      else if (item.gameState == 'STARTED' || item.gameState == 'FINAL') {
        this.setState({ MatchEventDialog: true });
      }
      else {
        this.generatepropsAPI(item.event_id, item.league_id);
        this.calluncoveredAPI(item.event_id);
        //  this.setState({ SelectedBetOption: 'P' });
        for (let i = 0; i < Arraylength1; i++) {
          for (let j = 0; j < Arraylength2; j++) {
            for (let k = 0; k < Arraylength3; k++) {
              if (i == index1 && j == index2 && k == index3) {
                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineDraw = false;
                this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = !item.isBetaFriendSelect;
                this.setState({ selectedPropBetOptions: 'N' });
                this.setState({ selectedPropBetValue: '0' });
                this.setState({ betammount: '' });
                this.setState({ amounttowin: '' });
                this.setState({ valueofMoneylineDialog: '0.00' });
                this.setState({ valueofMoneylineDialogShow: '0.00' });

              }
              else {
                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                this.state.DataList[i].date_array[j].game[k].isMoneyLineDraw = false;
                this.setState({ selectedPropBetOptions: 'N' });
                this.setState({ selectedPropBetValue: '0' });
                this.setState({ betammount: '' });
                this.setState({ amounttowin: '' });
                this.setState({ valueofMoneylineDialog: '0.00' });
                this.setState({ valueofMoneylineDialogShow: '0.00' });
              }
            }
          }
        }
        this.setState({ DataList: this.state.DataList });
      }
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

  DialogClose(item: any, index1: any, index2: any,) {
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
    var index3 = item.index;
    const updatedEmployees = update(this.state.DataList, {
      [index1]: {
        date_array: {
          [index2]: {
            game: {
              [index3]: { $set: item }
            }
          }
        }
      }


    });
    
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

    }

    else {
      this.NewAnswer = (value * 2)
      this.NewAnswerShow = (value);
    }
    this.NewShow = parseFloat(this.NewAnswerShow).toFixed(2);
    this.setState({ valueofMoneylineDialogShow: this.NewShow });
    console.log('valueofMoneylineDialogShow ' + JSON.stringify(this.state.valueofMoneylineDialogShow));
    this.New = parseFloat(this.NewAnswer).toFixed(2);
    this.setState({ valueofMoneylineDialog: this.New });
    console.log('valueofMoneylineDialog ' + JSON.stringify(this.state.valueofMoneylineDialog));
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

  showMoreDialog(isShow: any) {
     this.setState({ dialogmoreprocess: isShow });
  }

  UncoveredDialogClose() {
    this.setState({ dialogmoreprocess: false });
    this.setState({ BetDialogueData: '' });
  }


  betselect(selectbet: any) {
    this.setState({betammount:''});
    if (this.state.checkedBetText == 'P1' && selectbet == 'C') {
      AlertUtil.show('Custom Bet cannot be created for Public Bet');
    } else {
      // this.setState({ SelectedBetOption: selectbet });
      if (selectbet == 'C') {
        // AlertUtil.show('Custom Bet cannot be created for Public Bet');
        var status = this.checkUserStatus("custom_bet");
        if (status) {
          this.props.navigation!.navigate(AppScreens.G_CustomBet, this.props);
        }
        return;
      } else {
        var status = this.checkUserStatus("prop_bet");
        if (status) {
          this.setState({ SelectedBetOption: selectbet });
        }
      }
    }
    // if (selectbet == 'C') {
    //   this.props.navigation!.navigate(AppScreens.G_CustomBet, this.props);
    //   return;
    // } else {
    //   this.setState({ SelectedBetOption: selectbet });
    // }

  }

  betoption = () => {

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
    this.handleFocusBA();
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


  CustomBetDialog(games, index1, index2) {
    if (this.state.betammount < 1000 || this.state.betammount < "1000") {
      AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
    }
    else if (this.state.valueofMoneylineDialog > 0) {
      this.setState({ dialogVisible: true });
this.selectedItemIndex1 = index1;
this.selectedItemIndex2 = index2;
    }
    else {
      AlertUtil.show("Please Enter Valid Bet Amount.")
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
      } else if (selectedData.MasterCalcFlag == 'D') {
        oddsString = "Money Line";
      }
      else {
        oddsString = "Spread";
      }
      if (selectedData.isMoneyLineSelect1 == true || selectedData.isTotalSelect1 == true || selectedData.isSpreadSelect1 == true) {
        teamName = selectedData.MATCH_UPS.away.title;
        teamName2 = selectedData.MATCH_UPS.home.title;;
        if (selectedData.isMoneyLineSelect1 == true) {
          amount = selectedData.MONEY_LINE.away.private_value;
        }
        else if (selectedData.isTotalSelect1 == true) {
          amount = "Over " + selectedData.TOTAL.away.other_value + " (" + selectedData.TOTAL.away.private_value + ")";
        }
        else {
          amount = selectedData.SPREAD.away.other_value + " (" + selectedData.SPREAD.away.private_value + ")";
        }
      }
      else {
        teamName = selectedData.MATCH_UPS.home.title;
        teamName2 = selectedData.MATCH_UPS.away.title;
        if (selectedData.isMoneyLineSelect2 == true) {
          amount = selectedData.MONEY_LINE.home.private_value;
        }
        else if (selectedData.isMoneyLineDraw == true) {
          amount = selectedData.odds.ml_draw_price;
        }
        else if (selectedData.isTotalSelect2 == true) {
          amount = "Under " + selectedData.TOTAL.home.other_value + " (" + selectedData.TOTAL.home.private_value + ")";
        }
        else {
          amount = selectedData.SPREAD.home.other_value + " (" + selectedData.SPREAD.home.private_value + ")";
        }
      }

      url = "http://bet.udda.com/index.php?t=oddsbet&i=" + item.data.encryptor_bet_id;
      url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
      referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up.";
      // MessageString = "I just bet " + this.state.POSTBetAmount + " UDDA Bucks on the " + oddsString + " " + amount + " for the team " + teamName + " v/s " + teamName2 + ". ";
      // MessageString += referStr;

      // ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
      //   I just bet <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount} UDDA Bucks </Text>
      //   on the
      // <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {oddsString} {amount} </Text> for the team <Text style={{ fontFamily: 'Montserrat-SemiBold', textDecorationLine: 'underline' }}>{teamName}</Text> v/s {teamName2}. {referStr}</Text>

      var newoddsString = '"' + oddsString + '"'
      var newteamName = '"' + teamName + '"'
      var newteamName2 = '"' + teamName2 + '"'
      var newLine = (amount > 0) ? '"+' + amount + '"' : '"' + amount + '"'
      var drawOdds = (amount > 0) ? '+' + amount : amount;
      var newAmount = '"' + this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '"'
      var newWinAmount = '"' + this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '"'

      // MessageString = "I’ll bet you the " + newteamName + " beat " + newteamName2 + ". The " + teamName + " are " + newLine + " on the " + newoddsString + ". I’ll put up " +  newAmount  + " UDDA bucks to your " + newWinAmount+ " Udda bucks, you can accept all of or any part of my bet.";
      MessageString = "I’ll bet you " + newteamName + " beats " + newteamName2 + ". The " + teamName + " are " + newLine + " on the " + newoddsString + ". I’ll put up " +  newAmount  + " UDDA bucks to your " + newWinAmount+ " UDDA bucks, you can accept "+ (this.state.POSTBetAmount >= 2000 ?"all of or any part of my bet ":"")+"or decline by tapping the link below.";
      if (selectedData.MasterCalcFlag == 'D') {
        MessageString = "I am betting on Draw  " + newLine + "under  " + newoddsString + " for " + newteamName + " Vs " + newteamName2 + " . I’ll put up " + newAmount + " UDDA bucks to your " + newWinAmount + " UDDA bucks, you can accept "+ (this.state.POSTBetAmount >= 2000 ?"all of or any part of my bet ":"")+"or decline by tapping the link below.";

      }
      MessageString += referStr;


      var ShowString1 = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA Bucks </Text>
    on the
  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {oddsString} {amount} </Text> for the team <Text style={{ fontFamily: 'Montserrat-SemiBold', textDecorationLine: 'underline' }}>{teamName}</Text> v/s {teamName2}. {referStr}</Text>


//       ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
//         I’ll bet you the <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{teamName} </Text>
//     beat
//   <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {teamName2}</Text> The {teamName} are <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{drawOdds}</Text> on the <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{oddsString}</Text>. I’ll put up <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks to your <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks, you can accept all of or any part of my bet.
// {referStr}</Text>
ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
I’ll bet you <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{teamName} </Text>
beats
<Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {teamName2}</Text> The {teamName} are <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{drawOdds}</Text> on the <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{oddsString}</Text>. I’ll put up <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks to your <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> {"bucks, you can accept "+ (this.state.POSTBetAmount >= 2000 ?"all of or any part of my bet ":"")+"or decline by tapping the link below."} 
{referStr}</Text>
      if (selectedData.MasterCalcFlag == 'D') {
        ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
          I am betting on Draw  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{drawOdds} </Text>
        under
      <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {oddsString}</Text> for  <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{teamName} </Text> Vs <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{teamName2}</Text>. I’ll put up <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks to your <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> {"bucks, you can accept "+ (this.state.POSTBetAmount >= 2000 ?"all of or any part of my bet ":"")+"or decline by tapping the link below."}
  {referStr}</Text>
      }
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

      url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
      referStr = "\n Use Referral Code " + this.my_referral_code + " to sign up.";
      var newoddsString = '"' + oddsString + '"'
      var newteamName = '"' + teamName + '"'
      var newteamName2 = '"' + teamName2 + '"'
      var newLine = '"' + amount + '"'
      var newAmount = '"' + this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '"'
      var newWinAmount = '"' + this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '"'
      MessageString = "I’ll bet you " + newteamName + " beats " + newteamName2 + ". The " + teamName + " are " + newLine + " on the " + newoddsString + ". I’ll put up " + newAmount + " UDDA bucks to your " + newWinAmount + " UDDA bucks, you can accept "+ (this.state.POSTBetAmount >= 2000 ?"all of or any part of my bet ":"")+"or decline by tapping the link below.";

      MessageString += referStr;


      var ShowString1 = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I just bet <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA Bucks </Text>
        on the
      <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {oddsString} {amount} </Text> for the team <Text style={{ fontFamily: 'Montserrat-SemiBold', textDecorationLine: 'underline' }}>{teamName}</Text> v/s {teamName2}. {referStr}</Text>


      ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        I’ll bet you <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{teamName} </Text>
        beats
      <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {teamName2}</Text> The {teamName} are <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{amount}</Text> on the <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{oddsString}</Text>. I’ll put up <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTBetAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> bucks to your <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{this.state.POSTWinAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} UDDA</Text> {"bucks, you can accept "+ (this.state.POSTBetAmount >= 2000 ?"all of or any part of my bet ":"")+"or decline by tapping the link below."}
  {referStr}</Text>

      this.setState({ MessageString: MessageString });
      this.setState({ MessageUrl: url });
      this.setState({ Share_Show_Msg: ShowString });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });

    }
  }


  shareNow() {
    var Message = this.state.MessageString + " " + this.state.MessageUrl;

    Share.share({
      message: Message,
    })
      .then(result => {
        this.setState({ shareDialog: false });
        console.log(result)
      })
      .catch(errorMsg => {
        this.setState({ shareDialog: false });
        console.log(errorMsg)
      });
  }

  //  ---------------------------------------------- Design and Design methods --------------------------------------------

  getBetAFriendDialogue(games: any, index1: any, index2: any) {

    let data2 = [{
      value: '3/1',
    }, {
      value: '3/2',
    }, {
      value: '3/3',
    }];

    return (
      <View style={{ backgroundColor: '#999999' }}>
        <View style={{ height: 0, width: 0, borderLeftWidth: 8, borderLeftColor: 'transparent', borderRightWidth: 8, borderRightColor: 'transparent', borderBottomWidth: 12, borderBottomColor: 'white', marginLeft: '87%', backgroundColor: 'transparent' }}></View>

        <View style={{ backgroundColor: 'white', marginLeft: 8, marginRight: 8, marginBottom: 8, borderRadius: 5 }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '48%', flexDirection: 'row' }}>
              <CheckBox
                title='SPORTSBOOK'
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

            <TouchableWithoutFeedback onPress={() => this.DialogClose(games, index1, index2)}>
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
                  listKey={(item: any, index: any) => index.toString()}
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
                                        <Text style={[styles.PopoptionText, { color: this.state.selectedPropBetOptions == 'U' ? '#3A3A3A' : '#A3A3A3' }]}> Under  {item.total}  ({item.under > 0 ? '+' : ''}{item.under})</Text>
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
                      <Text style={{
                        color: '#68bcbc',
                        fontSize: hp(2.5),
                        paddingVertical: 5,
                        justifyContent: 'center',
                        fontFamily: 'Montserrat-Bold',
                      }}>
                        No Props Available.
                         </Text>
                    </View>
                    : null}
                </View>
              ) : null
              }

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
                <TouchableOpacity onPress={() => { this.showMoreDialog(true) }}>
                  <View style={{ marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 2 }}>
                    <View style={{ backgroundColor: '#dddddd', borderColor: '#cccccc', borderWidth: 2, borderRadius: 5 }}>
                      <Text style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), color: '#68bcbc' }}>See full list of prop bets.</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderColor: '#666666', borderRadius: 5, borderWidth: 2, marginLeft: 5, marginBottom: 5, marginRight: 5, marginTop: 1, paddingTop: 6, paddingBottom: 6 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                    <Image source={require('../../../../images/BucksDark.png')} style={{ width: 10, height: 10 }}></Image>
                    <TextInput
                      value={this.state.betammount}
                      // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, this.state.selectedPropBetValue, "BA", 'P') }}
                      onChange={(e: any) => { this.handleKeyDown(e, this.state.selectedPropBetValue, "BA", 'P') }}
                      onFocus={this.handleFocusBA}
                      clearTextOnFocus={true}
                      keyboardType='numeric'
                      returnKeyType='done'
                      style={{ paddingHorizontal: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.6), width: '92%', paddingVertical: 2 }}
                      placeholder='Enter Bet Amount'
                      placeholderTextColor={this.state.focuseBet ? 'black' : '#a6a6a6'}
                    />


                  </View>
                </View>
              </View>
              <View style={{ width: '50%' }}>

                <TouchableOpacity onPress={() => { this.CustomBetDialog(games, index1, index2) }}>
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

  getDialogue(GamesArray: any, index1: any, index2: any, value: any, title: any, PrivateValue: any) {
    console.log('GamesArray', GamesArray)
    return (
      <View style={{ backgroundColor: '#999999' }}>


        <View style={[{ marginLeft: (GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'D') ? '35%' : GamesArray.MasterCalcFlag == 'T' ? '52%' : '70%' }, styles.dialog_triangle]}></View>

        <View style={styles.dialog_container}>
          {/* --------------------- dialog checkbox  ---------------- */}

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '47%', flexDirection: 'row' }}>
              <CheckBox
                title='SPORTSBOOK'
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

            <TouchableWithoutFeedback onPress={() => this.DialogClose(GamesArray, index1, index2)}>
              <View style={{ width: '4%', marginTop: 5 }}>
                <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10 }}></Image>
              </View>
            </TouchableWithoutFeedback>

          </View>

          {/* --------------------- dialog middle text  ---------------- */}

          <View style={styles.dialogue_text_label_container}>
            {this.state.checkedMoneyLinePrivate ?
              <Text style={styles.dialogue_main_text_label}> You are betting  {GamesArray.MasterCalcFlag == 'D' && 'on'} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>Draw </Text>} <Text style={styles.dialogue_sub_text_label}>
                {GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'T' || GamesArray.MasterCalcFlag == 'S' || GamesArray.MasterCalcFlag == 'D'? (PrivateValue > 0 ? '+' : '-') : ''}{Math.abs(PrivateValue)}</Text> under <Text style={styles.dialogue_sub_text_label}>
                  {GamesArray.MasterCalcFlag == 'M' ? "Money Line" : GamesArray.MasterCalcFlag == 'T' ? 'Total' : GamesArray.MasterCalcFlag == 'D' ? 'Money Line' : 'Spread'}
                  {GamesArray.isTotalSelect1 == true ? " (Over)" : GamesArray.isTotalSelect2 == true ? " (Under)" : null}</Text> for <Text style={styles.dialogue_sub_text_label}>{title}</Text> {GamesArray.MasterCalcFlag == 'D' && <Text>Vs</Text>} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>{GamesArray.MATCH_UPS.away.title}</Text>} . </Text>
              :

              <Text style={styles.dialogue_main_text_label}> You are betting  {GamesArray.MasterCalcFlag == 'D' && 'on'} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>Draw </Text>} <Text style={styles.dialogue_sub_text_label}>
                {GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'T' || GamesArray.MasterCalcFlag == 'S' || GamesArray.MasterCalcFlag == 'D'? (value > 0 ? '+' : '-') : ''}{Math.abs(value)}</Text> under <Text style={styles.dialogue_sub_text_label}>
                  {GamesArray.MasterCalcFlag == 'M' ? "Money Line" : GamesArray.MasterCalcFlag == 'T' ? 'Total' : GamesArray.MasterCalcFlag == 'D' ? 'Money Line' : 'Spread'}
                  {GamesArray.isTotalSelect1 == true ? " (Over)" : GamesArray.isTotalSelect2 == true ? " (Under)" : null}</Text> for <Text style={styles.dialogue_sub_text_label}>{title}</Text> {GamesArray.MasterCalcFlag == 'D' && <Text>Vs</Text>} {GamesArray.MasterCalcFlag == 'D' && <Text style={styles.dialogue_sub_text_label}>{GamesArray.MATCH_UPS.away.title}</Text>} . </Text>
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
                    //onChange={(e:any)=>{this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag)}}
                    onChange={(e: any) => { this.state.checkedMoneyLinePrivate ? this.handleKeyDown(e, PrivateValue, "BA", GamesArray.MasterCalcFlag) : this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag) }}
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
                    //  onChange={(e:any)=>{this.handleKeyDown(e, value, "ATW", GamesArray.MasterCalcFlag)}} 
                    onChange={(e: any) => { this.state.checkedMoneyLinePrivate ? this.handleKeyDown(e, PrivateValue, "ATW", GamesArray.MasterCalcFlag) : this.handleKeyDown(e, value, "ATW", GamesArray.MasterCalcFlag) }}
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
                      <Text style={{ padding: 1, fontFamily: 'Montserrat-Bold', fontSize: hp(2.3), color: 'black', alignSelf: 'center' }} > {this.state.valueofMoneylineDialogShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
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

  render() {

    let BetFilterData = [{
      value: 'Date Added',
    }, {
      value: 'Match Game',
    },
    {
      value: 'Player Name',
    }];


    if (this.state.NoData == false) {

      return (

        <Container
          title={ProfilePageContent.page_title}
          isHeader={true}
          isSubHeader={true}
          isTitle={false}
          menuIconListener={this}
          LogoIconListener={this}
          accountNameListener={this}
          isSetting={false}
          availableBalanceListener={this}
          openPlaysListener={this}
          coveredPlaysListener={this}
          showIndicator={false}>

          <ProgressLoader
            visible={this.state.loader}
            isModal={true} isHUD={true}
            hudColor={"#68bcbc"}
            color={"#FFFFFF"} />
          {/* -------------------------------- garima Bet Placed Status Dialogue --------------------------------*/}

          <Dialog
            visible={this.state.MatchEventDialog}
            title=""
          >

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
                            containerStyle={[{ paddingLeft: 8, paddingBottom: 7, margin: 0, borderBottomWidth: 0, justifyContent: "center", width: '100%' }]}
                            dropdownOffset={{ top: 0, left: 0 }}
                            dropdownMargins={{ min: 0, max: 0 }}
                            dropdownPosition={-4.2}
                            itemTextStyle={{ paddingLeft: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.6), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }}
                            data={BetFilterData}
                            fontSize={hp(1.4)}
                            value={'Select option below'}
                            onChangeText={this.betoption}
                          />
                        </View>
                      </View>
                      <View style={styles.OkButtonContainer}>
                        <Text style={styles.OkButtonText}>OK</Text>
                      </View>
                    </View>
                  </View>

                  {this.state.BetDialogueNoData == false ?
                    <ScrollView bounces={false}>
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
                                              <Text style={{ color: '#68bcbc', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline', textDecorationColor: '#68bcbc', fontSize: 10 }}>{item.type == 'over' ? " Over: " + item.over : " Under: " + item.under} </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                              <Text style={{ color: '#000000', fontFamily: 'Montserrat-Bold', fontSize: 10 }}> {item.type != 'over' ? " Over: " + item.over : " Under: " + item.under} </Text>
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
                    <Text style={{ padding: 8, width: '100%', height: 'auto' }}>{this.state.Share_Show_Msg}</Text>
                  </View>
                  <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.5), marginTop: 5, color: 'black' }}>
                    {this.state.MessageUrl}
                  </Text>
                  <BigButton title="Share Now" style={styles.verify_button} textStyle={styles.verify_button_text_style}
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
            <View style={{ backgroundColor: "white", padding: 10 }}>
              <TouchableOpacity onPress={() => { this.setState({ dialogVisible: false }) }}>
                <View style={{ alignItems: 'flex-end', width: '100%' }}>
                  <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                </View>
              </TouchableOpacity>

              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} >

                <Text style={{ padding: 1, fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: hp(2.2), color: 'black' }} > Are you sure you want to place this bet?</Text>
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
              <View style={{ justifyContent: "center", padding: 15, alignItems: 'center', borderColor: '#cccccc', borderTopWidth: 1, margin: 3 }}>
                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
                  You do not have enough UDDA bucks to access this feature. Please upgrade.

                  </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                <View style={{ width: '46%' }}>
                  <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                    listener={() => { this.setState({ userStatusDialog: false }) }} />
                </View>
                <View style={{ width: '4%' }}></View>
                <View style={{ width: '46%' }}>
                  <BigButton title="Upgrade" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                    listener={() => { this.goToInappPage() }} />
                </View>
              </View>
            </View>
          </Dialog>
          {/* -------------------------------- Guest User Dialogue --------------------------------*/}
          <Dialog
            //visible={this.state.guestUserDialog}
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
                    listener={() => { this.loginButtonPressed() }} />
                </View>
              </View>
            </View>
          </Dialog>
          {this.state.guestUserDialog?<Guestdialog detailmodel={this.state.guestUserDialog} onDismiss={() => {
                  this.closeModal();
                }} onClick={() => {
                    this.loginButtonPressed();
                  }}/>:null}
          <View style={styles.scrollContent}>
            <View style={styles.mainContent}>
            <View style={[{width:'100%',justifyContent:'center',flexDirection:'row'}]}>
          <View style={{width:'10%',justifyContent:'center'}}>
          <Icons name="arrow-back" size={30} color="black" 
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>          

            <View style={[styles.NameHeaderContainer,{width:'90%'}]}>              
                <Text style={styles.NameStyle}>{ProfilePageContent.page_title}</Text>              
            </View>
            </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexShrink: 1, backgroundColor: 'white', height: '100%' }}>

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



                  {this.state.DataList.length > 0 ?
                    <FlatList
                      extraData={this.state}
                      data={this.state.DataList}
                      keyExtractor={(item: any, index: any) => index.toString()}
                      bounces={false}
                      ref={(re: any) => { this.ListView_Ref = re }}

                      renderItem={({ item, index }: any) => {
                        var index1 = index;
                        var Arraylength1 = this.state.DataList.length;
                        return (
                          <View>
                            {/* --------------------- game haeder---------------- */}

                            <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>
                              <View style={styles.gameheader}>
                                <View style={{ paddingLeft: 8, paddingRight: 8 }}>
                                  <Image source={{ uri: item.sport_icon }} style={{ height: 16, width: 16 }}></Image>
                                </View>
                                <View>
                                  <Text style={styles.gameheadertext}>{item.gameName} -
                                <Text style={styles.gameheader_sub_text}>{item.gameShortDec}</Text>
                                  </Text>
                                </View>
                              </View>


                              <FlatList
                                extraData={this.state}
                                data={item.date_array}
                                keyExtractor={(item: any, index: any) => index.toString()}
                                bounces={false}
                                renderItem={({ item, index }: any) => {
                                  // var date = item.date.split(' ');
                                  var index2 = index;
                                  var Arraylength2 = this.state.DataList[index1].date_array.length;

                                  var new_time_stamp = item.match_time_stamp * 1000;
                                  var formated_time = moment(new_time_stamp).format('LT');
                                  var Match_date: any = new Date(new_time_stamp).toString().split(' ');

                                  var zonevalue: any = Match_date[6].toString();
                                  var zone: any = zonevalue.substr(1, zonevalue.length - 2);
                                  return (

                                    <View style={{ backgroundColor: '#DDDDDD' }}>
                                      {/* --------------------- Date and game status  garima---------------- */}
                                      < View style={[styles.flatlist_title_row, { height: (this.isfontSize == 'font_small') ? 18 : ((this.isfontSize == 'font_small') ? 20 : 23) }]} >

                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: (this.isfontSize == 'font_small') ? wp(75) : ((this.isfontSize == 'font_medium') ? wp(65) : wp(60)), paddingLeft: 4 }}>
                                          <Text style={[styles.flatlist_title, { textAlign: 'left' }, styles[this.isfontSize]]}> {Match_date[0]} <Text style={{ fontFamily: 'Montserrat-Regular' }}>{Match_date[1]} {Match_date[2]} {formated_time} {zone}</Text>
                                            {item.gameState == "FINAL" ? " - FINAL" : null}
                                          </Text>


                                        </View>



                                        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'flex-end' }}>
                                          <View style={{}}>
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
                                            <Text style={[{ color: item.gamestate == 'PENDING' || item.gameState == '' ? '#888888' : '#68bcbc' }, styles.game_state_text, styles[this.isfontSize]]}> GAME STATS </Text>
                                          </View>

                                        </View>

                                      </View>

                                      {/* --------------------- table row ---------------- */}
                                      <FlatList
                                        extraData={this.state}
                                        data={item.game}
                                        keyExtractor={(item: any, index: any) => index.toString()}
                                        bounces={false}
                                        renderItem={({ item, index }: any) => {
                                          var index3 = index;
                                          var Arraylength3 = this.state.DataList[index1].date_array[index2].game.length;
                                          return (


                                            < View style={[styles[this.isMainBlockHeight], { width: '100%', alignItems: 'center' }]}>

                                              <View style={styles.flatlist_data_whole_row}>

                                                <View style={[styles.flatlist_data_row_vertical_line, { backgroundColor: ((item.gameState == 'PENDING' || item.gameState == '' || item.gameState == ' ') ? '#68bcbc' : 'orange') }]}></View>

                                                {this.state.DataList[index1].gameName == 'Soccer' ? <View style={styles.flatlist_data_4column}>
                                                  {/* --------------------- first soccer row ---------------- */}

                                                  <View style={[styles.flatlist_data_row_height, styles[this.blockHeight], { borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                                    <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                                      <View style={{ flexDirection: 'row', width: '80%' }}>
                                                        <Text style={[styles[this.isfontSize], {
                                                          fontFamily: 'Montserrat-Bold',
                                                          color: '#68bcbc',
                                                          paddingLeft: 5,
                                                        }]} numberOfLines={2}  >
                                                          {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.MATCH_UPS.home.t : item.MATCH_UPS.home.t}

                                                        
                                                        {/* <Text style={[styles.flatlist_matchup_text_style, styles[this.isfontSize], { fontFamily: 'Montserrat-Regular', }]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'} </Text> */}
                                                     </Text>
                                                      </View>
                                                      {/*garima */}
                                                      <View style={{width:'20%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                        <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                                        {item.MATCH_UPS.home.counts}
                                                      </Text>
                                                      <Text style={[styles.flatlist_matchup_text_style,  { fontFamily: 'Montserrat-Regular',fontSize:10, fontWeight: 'normal', paddingRight: 4, width: '100%',textAlign: 'center',paddingLeft:0}]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'} </Text>
                                                      </View>
                                                    </View>

                                                    <TouchableWithoutFeedback onPress={() => (item.MONEY_LINE.home.value == 0 || item.MONEY_LINE.home.value == "N/A") ? null : this.getDialogueState2(item, index1, index2, index3, 'M', Arraylength1, Arraylength2, Arraylength3)}>
                                                      <View style={[{
                                                        backgroundColor: item.MONEY_LINE.home.value == "N/A" ? '#888888' : item.isMoneyLineSelect2 != true ? '#68bcbc' : 'white',
                                                        borderRightColor: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc',
                                                        borderColor: item.isMoneyLineSelect2 == true ? '#68bcbc' : '',
                                                        borderWidth: item.isMoneyLineSelect2 == true ? 1 : 0,
                                                        borderRightWidth: 1,
                                                      }, styles.flatlist_moneyline_style]}>
                                                        {/*  <Text style={[{ color: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                                {item.MONEY_LINE.home.value > 0 ? '+' : ''}{item.MONEY_LINE.home.value}
                                                              </Text> */}
                                                        <View style={[styles.flatlist_icon_style]} >
                                                          {item.MONEY_LINE.home.flag && <Icon name="check" size={12} color="white" />}
                                                        </View>
                                                        <View style={[styles.flatlist_odd_style]} >
                                                          <Text style={[{ color: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                            {item.MONEY_LINE.home.value == "N/A" ? item.MONEY_LINE.home.value : item.MONEY_LINE.home.value > 0 ? '+' + item.MONEY_LINE.home.value : item.MONEY_LINE.home.value}
                                                          </Text>
                                                        </View>
                                                      
                                                      </View>

                                                    </TouchableWithoutFeedback >

                                                    <TouchableWithoutFeedback onPress={() => (item.TOTAL.home.value == 0 || item.TOTAL.home.value == "N/A") ? null : this.getDialogueState2(item, index1, index2, index3, 'T', Arraylength1, Arraylength2, Arraylength3)}>
                                                      <View style={[{
                                                        backgroundColor: item.TOTAL.home.value == "N/A" ? '#888888' : item.isTotalSelect2 != true ? '#68bcbc' : 'white',
                                                        borderRightColor: item.isTotalSelect2 != true ? 'white' : '#68bcbc',
                                                        borderColor: item.isTotalSelect2 == true ? '#68bcbc' : '',
                                                        borderWidth: item.isTotalSelect2 == true ? 1 : 0,
                                                        borderRightWidth: 1,
                                                      }, styles.flatlist_total_style]}>
                                                        {/* <Text style={[{ color: item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                                U {item.TOTAL.home.other_value} ({Math.sign(item.TOTAL.home.value) == +1 ? '+' : ''}{item.TOTAL.home.value})
                                                          </Text> */}
                                                        <View style={[styles.flatlist_icon_style]} >
                                                          {item.TOTAL.home.flag && <Icon name="check" size={12} color="white" />}

                                                        </View>
                                                        <View style={[styles.flatlist_odd_style]} >
                                                          <Text style={[{ color: item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                            {item.TOTAL.home.value == "N/A" ? item.TOTAL.home.value : 'U ' + item.TOTAL.home.other_value + ' (' + (Math.sign(item.TOTAL.home.value) == +1 ? '+' : '') + '' + item.TOTAL.home.value + ')'}
                                                          </Text>
                                                        </View>

                                                       
                                                      </View>
                                                    </TouchableWithoutFeedback >

                                                    <TouchableWithoutFeedback onPress={() => (item.SPREAD.home.value == 0 || item.SPREAD.home.value == "N/A") ? null : this.getDialogueState2(item, index1, index2, index3, 'S', Arraylength1, Arraylength2, Arraylength3)}>
                                                      <View style={[{
                                                        backgroundColor: item.SPREAD.home.value == "N/A" ? '#888888' : item.isSpreadSelect2 != true ? '#68bcbc' : 'white',
                                                        borderRightColor: item.isSpreadSelect2 != true ? 'white' : '#68bcbc',
                                                        borderColor: item.isSpreadSelect2 == true ? '#68bcbc' : '',
                                                        borderWidth: item.isSpreadSelect2 == true ? 1 : 0,
                                                        borderRightWidth: 1,
                                                      }, styles.flatlist_spread_style]}>
                                                        {/*  <Text style={[{ color: item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                                {Math.sign(item.SPREAD.home.other_value) == +1 ? '+' : ''}{item.SPREAD.home.other_value} ({Math.sign(item.SPREAD.home.value) == +1 ? '+' : ''}{item.SPREAD.home.value})
                                                          </Text> */}
                                                        <View style={[styles.flatlist_icon_style]} >
                                                          {item.SPREAD.home.flag && <Icon name="check" size={12} color="white" />}
                                                        </View>
                                                        <View style={[styles.flatlist_odd_style]} >
                                                          <Text style={[{ color: item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                            {item.SPREAD.home.value == "N/A" ? item.SPREAD.home.value : (Math.sign(item.SPREAD.home.other_value) == +1 ? '+' + item.SPREAD.home.other_value : item.SPREAD.home.other_value) + ' (' + (Math.sign(item.SPREAD.home.value) == +1 ? '+' + item.SPREAD.home.value : item.SPREAD.home.value) + ')'}
                                                            {/*  {Math.sign(item.SPREAD.home.other_value) == +1 ? '+' : ''}{item.SPREAD.home.other_value} ({Math.sign(item.SPREAD.home.value) == +1 ? '+' : ''}{item.SPREAD.home.value}) */}

                                                          </Text>
                                                        </View>
                                                      
                                                      </View>
                                                    </TouchableWithoutFeedback >

                                                  </View>
                                                  {(item.odds.ml_draw_price != 0 || item.odds.ml_draw_price != "") && <TouchableWithoutFeedback onPress={() => (item.odds.ml_draw_price == 0 || item.odds.ml_draw_price == "") ? null : this.getDialogueState2(item, index1, index2, index3, 'D', Arraylength1, Arraylength2, Arraylength3)}>
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
                                                        {item.MONEY_LINE.draw.flag && <Icon name="check" size={12} color="white" />}
                                                      </View>
                                                      <View style={[styles.flatlist_odd_style]} >
                                                        <Text style={[{ color: item.isMoneyLineDraw != true ? '#FFF' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                                          D {(item.odds.ml_draw_price > 0) ? '+' + item.odds.ml_draw_price : item.odds.ml_draw_price}

                                                        </Text>
                                                      </View>


                                                    </View>
                                                  </TouchableWithoutFeedback>}
                                                  {/* --------------------- second soccer row ---------------- */}
                                                  <View style={[styles.flatlist_data_row_height, styles[this.blockHeight], { borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                                    <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles[this.isfontSize], styles.flatlist_matchup_style]}>
                                                      <View style={{ flexDirection: 'row', width: '80%' }}>
                                                      <Text numberOfLines={2} style={[styles.flatlist_matchup_text_style,styles[this.isfontSize]]}  >
                                                        {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.MATCH_UPS.away.t : item.MATCH_UPS.away.t}
                                                      </Text>
                                                      </View>
                                                      {/*garima added */}
                                                      <View style={{width:'20%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                        <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                                        {item.MATCH_UPS.away.counts}
                                                      </Text>
                                                      </View>
                                                    </View>

                                                    <TouchableWithoutFeedback onPress={() => (item.MONEY_LINE.away.value == 0 || item.MONEY_LINE.away.value == "N/A") ? null : this.getDialogueState(item, index1, index2, index3, 'M', Arraylength1, Arraylength2, Arraylength3)}>
                                                      <View style={[{
                                                        backgroundColor: item.MONEY_LINE.away.value == "N/A" ? '#888888' : item.isMoneyLineSelect1 != true ? '#68bcbc' : 'white',
                                                        borderRightColor: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc',
                                                        borderColor: item.isMoneyLineSelect1 == true ? '#68bcbc' : '',
                                                        borderWidth: item.isMoneyLineSelect1 == true ? 1 : 0,
                                                        borderRightWidth: 1,
                                                      }, styles.flatlist_moneyline_style]}>
                                                        {/* <Text style={[{ color: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                          {item.MONEY_LINE.away.value > 0 ? '+' : ''}{item.MONEY_LINE.away.value}
                                                        </Text> */}
                                                        <View style={[styles.flatlist_icon_style]} >
                                                          {item.MONEY_LINE.away.flag && <Icon name="check" size={12} color="white" />}
                                                        </View>
                                                        <View style={[styles.flatlist_odd_style]} >
                                                          <Text style={[{ color: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                            {item.MONEY_LINE.away.value == "N/A" ? item.MONEY_LINE.away.value : item.MONEY_LINE.away.value > 0 ? '+' + item.MONEY_LINE.away.value : item.MONEY_LINE.away.value}
                                                          </Text>
                                                        </View>
                                                       

                                                      </View>

                                                    </TouchableWithoutFeedback >

                                                    <TouchableWithoutFeedback onPress={() => (item.TOTAL.away.value == 0 || item.TOTAL.away.value == "N/A") ? null : this.getDialogueState(item, index1, index2, index3, 'T', Arraylength1, Arraylength2, Arraylength3)}>
                                                      <View style={[{
                                                        backgroundColor: item.TOTAL.away.value == "N/A" ? '#888888' : item.isTotalSelect1 != true ? '#68bcbc' : 'white',
                                                        borderRightColor: item.isTotalSelect1 != true ? 'white' : '#68bcbc',
                                                        borderColor: item.isTotalSelect1 == true ? '#68bcbc' : '',
                                                        borderWidth: item.isTotalSelect1 == true ? 1 : 0,
                                                        borderRightWidth: 1,
                                                      }, styles.flatlist_total_style]}>
                                                        {/* <Text style={[{ color: item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                          O {item.TOTAL.away.other_value} ({Math.sign(item.TOTAL.away.value) == +1 ? '+' : ''}{item.TOTAL.away.value})
                                                    </Text> */}
                                                        <View style={[styles.flatlist_icon_style]} >
                                                          {item.TOTAL.away.flag && <Icon name="check" size={12} color="white" />}
                                                        </View>
                                                        <View style={[styles.flatlist_odd_style]} >

                                                          <Text style={[{ color: item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                            {item.TOTAL.away.value == "N/A" ? item.TOTAL.away.value : 'O ' + item.TOTAL.away.other_value + ' (' + (Math.sign(item.TOTAL.away.value) == +1 ? '+' : '') + '' + item.TOTAL.away.value + ')'}

                                                          </Text>
                                                        </View>
                                                       
                                                      </View>
                                                    </TouchableWithoutFeedback >

                                                    <TouchableWithoutFeedback onPress={() => (item.SPREAD.away.value == 0 || item.SPREAD.away.value == "N/A") ? null : this.getDialogueState(item, index1, index2, index3, 'S', Arraylength1, Arraylength2, Arraylength3)}>
                                                      <View style={[{
                                                        backgroundColor: item.SPREAD.away.value == "N/A" ? '#888888' : item.isSpreadSelect1 != true ? '#68bcbc' : 'white',
                                                        borderRightColor: item.isSpreadSelect1 != true ? 'white' : '#68bcbc',
                                                        borderColor: item.isSpreadSelect1 == true ? '#68bcbc' : '',
                                                        borderWidth: item.isSpreadSelect1 == true ? 1 : 0,
                                                        borderRightWidth: 1,
                                                      }, styles.flatlist_spread_style]}>
                                                        {/*  <Text style={[{ color: item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                          {Math.sign(item.SPREAD.away.other_value) == +1 ? '+' : ''}{item.SPREAD.away.other_value} ({Math.sign(item.SPREAD.away.value) == +1 ? '+' : ''}{item.SPREAD.away.value})
                                                    </Text> */}
                                                        <View style={[styles.flatlist_icon_style]} >
                                                          {item.SPREAD.away.flag && <Icon name="check" size={12} color="white" />}
                                                        </View>
                                                        <View style={[styles.flatlist_odd_style]} >
                                                          <Text style={[{ color: item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                                            {item.SPREAD.away.value == "N/A" ? item.SPREAD.away.value : (Math.sign(item.SPREAD.away.other_value) == +1 ? '+' + item.SPREAD.away.other_value : item.SPREAD.away.other_value) + ' (' + (Math.sign(item.SPREAD.away.value) == +1 ? '+' + item.SPREAD.away.value : item.SPREAD.away.value) + ')'}

                                                          </Text>
                                                        </View>

                                                       
                                                      </View>
                                                    </TouchableWithoutFeedback >

                                                  </View>


                                                </View> : <View style={styles.flatlist_data_4column}>
                                                    {/* --------------------- first row ---------------- */}
                                                    <View style={[styles.flatlist_data_row_height, styles[this.blockHeight], { borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                                      <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                                        <View style={{ flexDirection: 'row', width: '80%' }}>
                                                        <Text numberOfLines={2} style={[styles.flatlist_matchup_text_style, styles[this.isfontSize]]}  >
                                                          {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.MATCH_UPS.away.t : item.MATCH_UPS.away.t}
                                                        </Text>
                                                          </View>
                                                        {/*garima added */}
                                                       <View style={{width:'20%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                        <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                                          {item.MATCH_UPS.away.counts}
                                                        </Text>
                                                        </View>
                                                      </View>

                                                      <TouchableWithoutFeedback onPress={() => (item.MONEY_LINE.away.value == 0 || item.MONEY_LINE.away.value == "N/A") ? null : this.getDialogueState(item, index1, index2, index3, 'M', Arraylength1, Arraylength2, Arraylength3)}>
                                                        <View style={[{
                                                          backgroundColor: item.MONEY_LINE.away.value == "N/A" ? '#888888' : item.isMoneyLineSelect1 != true ? '#68bcbc' : 'white',
                                                          borderRightColor: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc',
                                                          borderColor: item.isMoneyLineSelect1 == true ? '#68bcbc' : '',
                                                          borderWidth: item.isMoneyLineSelect1 == true ? 1 : 0,
                                                          borderRightWidth: 1,
                                                        }, styles.flatlist_moneyline_style]}>
                                                          {/* <Text style={[{ color: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                          {item.MONEY_LINE.away.value > 0 ? '+' : ''}{item.MONEY_LINE.away.value}
                                                        </Text> */}
                                                          <View style={[styles.flatlist_icon_style]} >
                                                            {item.MONEY_LINE.away.flag && <Icon name="check" size={12} color="white" />}
                                                          </View>
                                                          <View style={[styles.flatlist_odd_style]} >
                                                            <Text style={[{ color: item.isMoneyLineSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                              {item.MONEY_LINE.away.value == "N/A" ? item.MONEY_LINE.away.value : item.MONEY_LINE.away.value > 0 ? '+' + item.MONEY_LINE.away.value : item.MONEY_LINE.away.value}
                                                            </Text>
                                                          </View>


                                                        </View>

                                                      </TouchableWithoutFeedback >

                                                      <TouchableWithoutFeedback onPress={() => (item.TOTAL.away.value == 0 || item.TOTAL.away.value == "N/A") ? null : this.getDialogueState(item, index1, index2, index3, 'T', Arraylength1, Arraylength2, Arraylength3)}>
                                                        <View style={[{
                                                          backgroundColor: item.TOTAL.away.value == "N/A" ? '#888888' : item.isTotalSelect1 != true ? '#68bcbc' : 'white',
                                                          borderRightColor: item.isTotalSelect1 != true ? 'white' : '#68bcbc',
                                                          borderColor: item.isTotalSelect1 == true ? '#68bcbc' : '',
                                                          borderWidth: item.isTotalSelect1 == true ? 1 : 0,
                                                          borderRightWidth: 1,
                                                        }, styles.flatlist_total_style]}>
                                                          {/* <Text style={[{ color: item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                          O {item.TOTAL.away.other_value} ({Math.sign(item.TOTAL.away.value) == +1 ? '+' : ''}{item.TOTAL.away.value})
                                                    </Text> */}
                                                          <View style={[styles.flatlist_icon_style]} >
                                                            {item.TOTAL.away.flag && <Icon name="check" size={12} color="white" />}
                                                          </View>
                                                          <View style={[styles.flatlist_odd_style]} >

                                                            <Text style={[{ color: item.isTotalSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                              {item.TOTAL.away.value == "N/A" ? item.TOTAL.away.value : 'O ' + item.TOTAL.away.other_value + ' (' + (Math.sign(item.TOTAL.away.value) == +1 ? '+' : '') + '' + item.TOTAL.away.value + ')'}

                                                            </Text>
                                                          </View>

                                                        </View>
                                                      </TouchableWithoutFeedback >

                                                      <TouchableWithoutFeedback onPress={() => (item.SPREAD.away.value == 0 || item.SPREAD.away.value == "N/A") ? null : this.getDialogueState(item, index1, index2, index3, 'S', Arraylength1, Arraylength2, Arraylength3)}>
                                                        <View style={[{
                                                          backgroundColor: item.SPREAD.away.value == "N/A" ? '#888888' : item.isSpreadSelect1 != true ? '#68bcbc' : 'white',
                                                          borderRightColor: item.isSpreadSelect1 != true ? 'white' : '#68bcbc',
                                                          borderColor: item.isSpreadSelect1 == true ? '#68bcbc' : '',
                                                          borderWidth: item.isSpreadSelect1 == true ? 1 : 0,
                                                          borderRightWidth: 1,
                                                        }, styles.flatlist_spread_style]}>
                                                          {/*  <Text style={[{ color: item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                          {Math.sign(item.SPREAD.away.other_value) == +1 ? '+' : ''}{item.SPREAD.away.other_value} ({Math.sign(item.SPREAD.away.value) == +1 ? '+' : ''}{item.SPREAD.away.value})
                                                    </Text> */}
                                                          <View style={[styles.flatlist_icon_style]} >
                                                            {item.SPREAD.away.flag && <Icon name="check" size={12} color="white" />}
                                                          </View>
                                                          <View style={[styles.flatlist_odd_style]} >
                                                            <Text style={[{ color: item.isSpreadSelect1 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>

                                                              {item.SPREAD.away.value == "N/A" ? item.SPREAD.away.value : (Math.sign(item.SPREAD.away.other_value) == +1 ? '+' + item.SPREAD.away.other_value : item.SPREAD.away.other_value) + ' (' + (Math.sign(item.SPREAD.away.value) == +1 ? '+' + item.SPREAD.away.value : item.SPREAD.away.value) + ')'}

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
                                                            paddingLeft: 5,
                                                          }, styles[this.isfontSize]]} numberOfLines={2}  >
                                                            {this.state.selected_Legue_id == '2' || this.state.selected_Legue_id == '4' ? item.MATCH_UPS.home.t : item.MATCH_UPS.home.t}

                                                          
                                                          {/* <Text style={[styles.flatlist_matchup_text_style, styles[this.isfontSize], { fontFamily: 'Montserrat-Regular', }]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'} </Text> */}
                                                        </Text>
                                                        </View>
                                                        {/*garima */}
                                                        <View style={{width:'20%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                        <Text style={[styles.flatlist_matchup_count_text_style, {textAlign:'center',width:'100%',fontSize:10}]}>
                                                          {item.MATCH_UPS.home.counts}
                                                        </Text>
                                                        <Text style={[styles.flatlist_matchup_text_style,  { fontFamily: 'Montserrat-Regular',fontSize:10, fontWeight: 'normal', paddingRight: 4, width: '100%',textAlign: 'center',paddingLeft:0}]}> {(this.state.selected_Legue_id == '10') ? '' : '(H)'} </Text>
                                                        </View>
                                                      </View>

                                                      <TouchableWithoutFeedback onPress={() => (item.MONEY_LINE.home.value == 0 || item.MONEY_LINE.home.value == "N/A") ? null : this.getDialogueState2(item, index1, index2, index3, 'M', Arraylength1, Arraylength2, Arraylength3)}>
                                                        <View style={[{
                                                          backgroundColor: item.MONEY_LINE.home.value == "N/A" ? '#888888' : item.isMoneyLineSelect2 != true ? '#68bcbc' : 'white',
                                                          borderRightColor: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc',
                                                          borderColor: item.isMoneyLineSelect2 == true ? '#68bcbc' : '',
                                                          borderWidth: item.isMoneyLineSelect2 == true ? 1 : 0,
                                                          borderRightWidth: 1,
                                                        }, styles.flatlist_moneyline_style]}>
                                                          {/*  <Text style={[{ color: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                          {item.MONEY_LINE.home.value > 0 ? '+' : ''}{item.MONEY_LINE.home.value}
                                                        </Text> */}
                                                          <View style={[styles.flatlist_icon_style]} >
                                                            {item.MONEY_LINE.home.flag && <Icon name="check" size={12} color="white" />}
                                                          </View>
                                                          <View style={[styles.flatlist_odd_style]} >
                                                            <Text style={[{ color: item.isMoneyLineSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                              {item.MONEY_LINE.home.value == "N/A" ? item.MONEY_LINE.home.value : item.MONEY_LINE.home.value > 0 ? '+' + item.MONEY_LINE.home.value : item.MONEY_LINE.home.value}
                                                            </Text>
                                                          </View>

                                                        </View>

                                                      </TouchableWithoutFeedback >

                                                      <TouchableWithoutFeedback onPress={() => (item.TOTAL.home.value == 0 || item.TOTAL.home.value == "N/A") ? null : this.getDialogueState2(item, index1, index2, index3, 'T', Arraylength1, Arraylength2, Arraylength3)}>
                                                        <View style={[{
                                                          backgroundColor: item.TOTAL.home.value == "N/A" ? '#888888' : item.isTotalSelect2 != true ? '#68bcbc' : 'white',
                                                          borderRightColor: item.isTotalSelect2 != true ? 'white' : '#68bcbc',
                                                          borderColor: item.isTotalSelect2 == true ? '#68bcbc' : '',
                                                          borderWidth: item.isTotalSelect2 == true ? 1 : 0,
                                                          borderRightWidth: 1,
                                                        }, styles.flatlist_total_style]}>
                                                          {/* <Text style={[{ color: item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                          U {item.TOTAL.home.other_value} ({Math.sign(item.TOTAL.home.value) == +1 ? '+' : ''}{item.TOTAL.home.value})
                                                    </Text> */}
                                                          <View style={[styles.flatlist_icon_style]} >
                                                            {item.TOTAL.home.flag && <Icon name="check" size={12} color="white" />}

                                                          </View>
                                                          <View style={[styles.flatlist_odd_style]} >
                                                            <Text style={[{ color: item.isTotalSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                              {item.TOTAL.home.value == "N/A" ? item.TOTAL.home.value : 'U ' + item.TOTAL.home.other_value + ' (' + (Math.sign(item.TOTAL.home.value) == +1 ? '+' : '') + '' + item.TOTAL.home.value + ')'}
                                                            </Text>
                                                          </View>


                                                        </View>
                                                      </TouchableWithoutFeedback >

                                                      <TouchableWithoutFeedback onPress={() => (item.SPREAD.home.value == 0 || item.SPREAD.home.value == "N/A") ? null : this.getDialogueState2(item, index1, index2, index3, 'S', Arraylength1, Arraylength2, Arraylength3)}>
                                                        <View style={[{
                                                          backgroundColor: item.SPREAD.home.value == "N/A" ? '#888888' : item.isSpreadSelect2 != true ? '#68bcbc' : 'white',
                                                          borderRightColor: item.isSpreadSelect2 != true ? 'white' : '#68bcbc',
                                                          borderColor: item.isSpreadSelect2 == true ? '#68bcbc' : '',
                                                          borderWidth: item.isSpreadSelect2 == true ? 1 : 0,
                                                          borderRightWidth: 1,
                                                        }, styles.flatlist_spread_style]}>
                                                          {/*  <Text style={[{ color: item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles.flatlist_data_text]}>
                                                          {Math.sign(item.SPREAD.home.other_value) == +1 ? '+' : ''}{item.SPREAD.home.other_value} ({Math.sign(item.SPREAD.home.value) == +1 ? '+' : ''}{item.SPREAD.home.value})
                                                    </Text> */}
                                                          <View style={[styles.flatlist_icon_style]} >
                                                            {item.SPREAD.home.flag && <Icon name="check" size={12} color="white" />}
                                                          </View>
                                                          <View style={[styles.flatlist_odd_style]} >
                                                            <Text style={[{ color: item.isSpreadSelect2 != true ? 'white' : '#68bcbc' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                              {item.SPREAD.home.value == "N/A" ? item.SPREAD.home.value : (Math.sign(item.SPREAD.home.other_value) == +1 ? '+' + item.SPREAD.home.other_value : item.SPREAD.home.other_value) + ' (' + (Math.sign(item.SPREAD.home.value) == +1 ? '+' + item.SPREAD.home.value : item.SPREAD.home.value) + ')'}
                                                              {/*  {Math.sign(item.SPREAD.home.other_value) == +1 ? '+' : ''}{item.SPREAD.home.other_value} ({Math.sign(item.SPREAD.home.value) == +1 ? '+' : ''}{item.SPREAD.home.value}) */}

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
                                                    <TouchableWithoutFeedback onPress={() => this.getBetDialogueState(item, index1, index2, index3, Arraylength1, Arraylength2, Arraylength3)}>
                                                      <View style={[{
                                                        backgroundColor: '#68bcbc',
                                                        borderColor: 'white',
                                                        borderWidth: 1,
                                                        borderTopWidth: 0,
                                                        borderBottomWidth: 0,
                                                        height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'
                                                      }]}>
                                                        {/* <Text style={[{ color: 'white', textAlign: 'center' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                          BET A FRIEND
                                                     </Text> */}
                                                      <Text style={[{ color: 'white', textAlign: 'center' }, styles[this.isfontSize], styles.flatlist_data_text]}>
                                                      PROP BETS
                                                     </Text>
                                                      </View>
                                                    </TouchableWithoutFeedback>
                                                  </View>
                                                </View>
                                              </View>

                                            </View>

                                          )
                                        }} />

                                      {
                                        item.game[index2].isMoneyLineSelect1 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].MONEY_LINE.away.value, item.game[index2].MATCH_UPS.away.title, item.game[index2].MONEY_LINE.away.private_value) : null
                                      }
                                      {
                                        item.game[index2].isMoneyLineSelect2 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].MONEY_LINE.home.value, item.game[index2].MATCH_UPS.home.title, item.game[index2].MONEY_LINE.home.private_value) : null
                                      }
                                      {
                                        item.game[index2].isTotalSelect1 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].TOTAL.away.value, item.game[index2].MATCH_UPS.away.title, item.game[index2].TOTAL.away.private_value) : null
                                      }
                                      {
                                        item.game[index2].isTotalSelect2 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].TOTAL.home.value, item.game[index2].MATCH_UPS.home.title, item.game[index2].TOTAL.home.private_value) : null
                                      }
                                      {
                                        item.game[index2].isSpreadSelect1 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].SPREAD.away.value, item.game[index2].MATCH_UPS.away.title, item.game[index2].SPREAD.away.private_value) : null
                                      }
                                      {
                                        item.game[index2].isSpreadSelect2 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].SPREAD.home.value, item.game[index2].MATCH_UPS.home.title, item.game[index2].SPREAD.home.private_value) : null
                                      }
                                      {
                                        item.game[index2].isBetaFriendSelect == true ? this.getBetAFriendDialogue(item.game[index2], index1, index2) : null
                                      }
                                      {
                                        item.game[index2].isMoneyLineDraw == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].odds.ml_draw_price, item.game[index2].MATCH_UPS.home.title, item.game[index2].odds.ml_draw_price) : null
                                      }

                                    </View>
                                  )
                                }} />
                              < View >
                              </View>
                            </Animated.View>
                          </View>
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
        </Container>
      )

    } else {
      return (
        <Container
          title={ProfilePageContent.page_title}
          isHeader={true}
          isSubHeader={true}
          isTitle={true}
          menuIconListener={this}
          LogoIconListener={this}
          isSetting={false}
          accountNameListener={this}
          availableBalanceListener={this}
          openPlaysListener={this}
          coveredPlaysListener={this}
          showIndicator={false}>
          <View style={styles.scrollContent}>
            <View style={styles.mainContent}>
            </View>
          </View>
        </Container>
      );
    }
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

  betaFriendRequestStatus: state.serviceReducer.requestStatus,
  betaFriendResponse: state.serviceReducer.response as BetAFriendResponse,
  betaFriendError: state.serviceReducer.error,


  placeBetRequestStatus: state.serviceReducer.requestStatus,
  placeBetResponse: state.serviceReducer.response as PlaceBetResponse,
  placeBetError: state.serviceReducer.error,

});

export default connect(mapStateToProps)(Highlighted_Matchups_View);

