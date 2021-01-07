import React, { createRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
  Animated,
  Keyboard,
  Dimensions,
  UIManager,
  Share,
  Modal,
  ImageBackground,
} from "react-native";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import styles from "./styles";
import Container from "../../../../Components/Container";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppValidationComponent, {
  Field,
  AppValidationComponentState,
  AppValidationComponentProps,
} from "../../../../Util/AppValidationComponent";
import AlertUtil from "../../../../Util/AlertUtil";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import Application from "../../../../Entities/Application";
import ProgressLoader from "rn-progress-loader";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { Dialog } from "react-native-simple-dialogs";
import BigButton from "../../../../Components/Button/BigButton";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from "../../../../Services/Core/ServiceURI";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ToggleSwitch from "toggle-switch-react-native";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";

import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { connect } from "react-redux";
import { UDDAError } from "../../../../Entities";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import ReferralService from "../../../../Services/Referral/ReferralService";
import DateTimePicker from "react-native-modal-datetime-picker";
import BingoDetailComponent from "./bingoDetailComponent";
import SendMsgResponse from "../../../../Services/Bets/SendMsgResponse";
import SendMsgRequest from "../../../../Services/Bets/SendMsgRequest";
import SendMsgResponseParser from "../../../../Services/Bets/SendMsgResponseParser";
import AlertMessages from "../../../../Util/AlertMessages";
var update = require("immutability-helper");
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
  key: "somethun",
  page_title: "CREATE BINGO",
};

interface G_AcceptBingoViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus;
  getProfileResponse?: GetProfileResponse;
  getProfileError?: UDDAError;
  sendMsgRequestStatus?: ServiceRequestStatus;
  sendMsgResponse?: SendMsgResponse;
  sendMsgError?: UDDAError;
  serviceKey?: string;
  listeners?: any;
}

interface G_AcceptBingoViewState extends AppValidationComponentState {
  shift: any;
  loader: any;
  data: any;
  bingodata: any;
  detailmodel: any;
  bet_user_info: any;
  custom_bingo_info: any;
  bet_detail: any;
  bet_type: any;
  bet_id: any;
  all_gifts: any;
  bingoTitle: any;
  joiningFee: any;
  bingoGiftArrayOrder: any;
  passui: any;
  betTime: any;
  betDate: any;
  Message: any;
  userStatusDialog: any;
  actionName: any;
}

class G_AcceptBingoView
  extends AppValidationComponent<G_AcceptBingoViewProps, G_AcceptBingoViewState>
  implements MenuIconListener, ISubheaderListener, LogoIconListener {
  private authorisationToken = Application.sharedApplication().user!
    .authenticationToken;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  public keyBoardType = "decimal-pad";
  private serviceRequestInProgress = false;
  public touchable;
  private referralservice = new ReferralService(); //Vijay
  private my_referral_code = Application.sharedApplication().user!.profile
    .my_referral_code;
  focusListener: any;
  public DeeplinkName = Application.sharedApplication().DeeplinkName;
  public LinkId = Application.sharedApplication().EncId;

  constructor(props: G_AcceptBingoViewProps) {
    super(props);
    this.touchable = createRef();
    this.state = {
      shift: new Animated.Value(0),
      loader: false,
      detailmodel: false,
      data: ["1", "2", "3", "4", "5"],
      bingodata: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      bet_user_info: [],
      custom_bingo_info: {},
      bet_detail: [],
      bet_type: "",
      bet_id: "",
      all_gifts: [],
      bingoTitle: "",
      joiningFee: "",
      bingoGiftArrayOrder: "",
      passui: true,
      betTime: "",
      betDate: "",
      Message: "",
      userStatusDialog: false,
      actionName: function () {},
    };
  }

  async componentDidMount() {
    console.log(this.props);
    this.callMethod();
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  componentWillMount() {
    //  alert('hi')
    console.log("componentwillmount");
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
  }

  handleKeyboardDidShow = (event: any) => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap =
          windowHeight -
            keyboardHeight -
            (fieldTop + fieldHeight + fieldHeight + fieldHeight) || 0;
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // ----------------------------------------------- API calling ---------------------------------------

  callMethod = () => {
    //  Application.sharedApplication().DeeplinkName = 'bingo/';
    // Application.sharedApplication().EncId = 'TUMwYnYvWDlxNEFOaW9JR1IwS3R2Zz09';

    Application.sharedApplication().DeeplinkName = this.DeeplinkName;
    Application.sharedApplication().EncId = this.LinkId;

    console.log(
      "Deeplink callMethod privatebet " +
        Application.sharedApplication().DeeplinkName
    );
    console.log(
      "Deeplink callContestMethod link" + Application.sharedApplication().EncId
    );

    if (
      Application.sharedApplication().DeeplinkName &&
      Application.sharedApplication().DeeplinkName != ""
    ) {
      var DeeplinkName = Application.sharedApplication().DeeplinkName;
      var LinkId = Application.sharedApplication().EncId;
      console.log("DeeplinkName:" + JSON.stringify(DeeplinkName));
      console.log("ENC Id:" + JSON.stringify(LinkId));
      //index.php?index.php??
      var url =
        UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/custom_bingo/share_info_bingo_gifts/" +
        LinkId +
        "/custom_prop";
      this.setState({ loader: true });
      console.log("url" + JSON.stringify(url));
      fetch(url, {
        method: "GET",
        headers: {
          authorisation: this.authorisationToken,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          var that = this;
          console.log("OddsBet: " + JSON.stringify(responseJson));
          if (responseJson.data.user_status == "0") {
            that.setState({ loader: false });
            that.checkUserStatus("show", function () {
              that.setState({ loader: false });
            });
          } else if (responseJson.data.display_button == "0") {
            AlertUtil.showSingleActionMessage(
              responseJson.data.display_msg,
              function () {
                that.setState({ loader: false });
              }
            );
            // setTimeout(function(){ AlertUtil.show(responseJson.data.display_msg);},400)
          } else {
            that.setState({ loader: false });
          }
          //console.log('bingo_title: ', JSON.stringify(responseJson.data.custom_bingo_info));

          // that.setState({ DataList: responseJson.data });
          that.setState({ bet_detail: responseJson.data.bet_detail });
          that.setState({
            bingoTitle: responseJson.data.custom_bingo_info.bingo_title.toUpperCase(),
          });
          that.setState({ bet_id: responseJson.data.custom_bingo_info.id });
          that.setState({
            bet_type: responseJson.data.bet_detail.bet_reject_type,
          }); // @pky
          that.setState({ bet_user_info: responseJson.data.bet_user_info });
          that.setState({
            custom_bingo_info: responseJson.data.custom_bingo_info,
          });
          that.setState({ bingodata: responseJson.data.all_gifts });
          that.setState({
            joiningFee: responseJson.data.custom_bingo_info.joining_fees,
          });
          var new_time_stamp =
            responseJson.data.custom_bingo_info.bingo_created_at_time_stamp *
            1000;
          var formated_time = moment(new_time_stamp).format("LT");
          var batdate: any = moment(new_time_stamp).format("LL");
          console.log(formated_time + "pradeep" + batdate);
          var Match_date: any = new Date(new_time_stamp).toString().split(" ");
          console.log(
            formated_time + "pradeep" + batdate + " >>>" + Match_date
          );
          var zonevalue: any = Match_date[6].toString();
          var zone: any = zonevalue.substr(1, zonevalue.length - 2);

          that.setState({ betTime: formated_time + " " + zone });
          that.setState({ betDate: batdate });

          var bingoArray = [];

          responseJson.data.all_gifts.map((x) => {
            if (x.gift_id != "") {
              bingoArray.push(x.gift_id);
            }
          });

          that.setState({ bingoGiftArrayOrder: bingoArray.toString() });
          console.log("bingoArray: ", bingoArray.toString());

       

          Application.sharedApplication().DeeplinkName = "";
          Application.sharedApplication().EncId = "";

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
        .catch((error) => {
          this.setState({ loader: false });
          Application.sharedApplication().DeeplinkName = "";
          Application.sharedApplication().EncId = "";
          Application.sharedApplication().DeeplinkStatus = false;
          console.log("Private bet error " + JSON.stringify(error));
        });
    } else {
      Application.sharedApplication().DeeplinkName = "";
      Application.sharedApplication().EncId = "";
      Application.sharedApplication().DeeplinkStatus = false;
      this.props.navigation!.navigate(AppScreens.G_DashboardView);
    }
  };

  goToInappPage() {
    this.setState({ loader: false });
    this.setState({ userStatusDialog: false });

    // this.props.navigation!.navigate(AppScreens.G_LoginPage);

    // this.props.navigation!.navigate(AppScreens.G_InAppPurchaseUpdateIOS);
    this.props.navigation!.replace(AppScreens.G_InAPPPurchaseViewIOS, {
      params: { callFrom: "userLevel" },
    });
  }

  // checkUserStatus(betName: any, callback) {
  //   var that = this;
  //   //that.setState({ userStatusDialog: true });

  //   console.log(
  //     Application.sharedApplication().user!.profile.level_array.restricted_bets
  //   );
  //   //if( Application.sharedApplication().user.level_array.restricted_bets)
  //   var status = true;

  //   that.setState({ actionName: callback });
  //   callback;
  //   setTimeout(function () {
  //     that.setState({ userStatusDialog: true });
  //   }, 2000);
  //   return status;
  // }
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

  acceptBingo = () => {
    //index.php?index.php??
    this.referralservice.getLocation().then((res)=>{
      var url =
      UrlService.CONSTURI +
      "index.php/" +
      UrlService.APIVERSION3 +
      "/custom_bingo/place_bet/";
    this.setState({ loader: true });
    console.log("url" + JSON.stringify(url));
    var params: any = {
      joining_fees: this.state.joiningFee,
      selected_gifts: this.state.bingoGiftArrayOrder,
      bingo_on: this.state.bet_id,
    };
    console.log("acceptbingoparams", JSON.stringify(params));
    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }
    console.log("acceptbingoparams", JSON.stringify(formData));

    var headers: any = { authorisation: this.authorisationToken };
    if (
      typeof Application.sharedApplication().currentUserLocation != "undefined"
    ) {
      headers[
        "latitude"
      ] = Application.sharedApplication().currentUserLocation!.latitude;
      headers[
        "longitude"
      ] = Application.sharedApplication().currentUserLocation!.longitude;
    }
    console.log("Headers in aceept bingo ", JSON.stringify(headers));
    fetch(url, {
      method: "POST",
      headers: headers,
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var that = this;
        console.log("OddsBet: " + JSON.stringify(responseJson));

        if (responseJson.error == 0) {
          // AlertUtil.show(responseJson.message);
          RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
          that.setState({ loader: false });
        } else {
          AlertUtil.showSingleActionMessage(responseJson.message, function () {
            that.setState({ loader: false });
          });
        }

        // that.setState({ loader: false });
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          LogoutUtill.logoutButtonPressed(this.props);
        }
      })
      .catch((error) => {
        this.setState({ loader: false });

        console.log("Private bet error " + JSON.stringify(error));
      });
     
     }).catch((err)=>{
      AlertUtil.show(AlertMessages.LocationRequired);
     
     });
    
  };

  private getProfile() {
    var profileRequest = new GetProfileRequest();
    var serviceAction = new ServiceAction();
    var responseParser = new GetProfileResponseParser();
    this.props.dispatch!(
      serviceAction.request(
        ServiceType.User,
        ServiceKeys.GetProfileServiceName,
        profileRequest,
        [this.constructor.name],
        responseParser
      )
    );
  }

  sendMessege() {
    var sendMsgRequest = new SendMsgRequest(
      this.state.bet_user_info.id,
      this.state.Message,
      this.state.bet_id,
      this.state.bet_type
    );
    console.log("send msg request", JSON.stringify(sendMsgRequest));
    var serviceAction = new ServiceAction();
    var responseParser = new SendMsgResponseParser();
    this.props.dispatch!(
      serviceAction.request(
        ServiceType.Bets,
        ServiceKeys.SendMsgName,
        sendMsgRequest,
        [this.constructor.name],
        responseParser
      )
    );
  }

  componentWillReceiveProps(nextProps: G_AcceptBingoViewProps) {
    if (nextProps.listeners!.includes(this.constructor.name)) {
      if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            var serviceAction = new ServiceAction();
            nextProps.dispatch!(serviceAction.reset());
            break;
          case ServiceRequestStatus.FinishedWithError:
            this.serviceRequestInProgress = false;
            var errorMessage = nextProps.error!.message;
            AlertUtil.show(errorMessage);
            var serviceAction = new ServiceAction();
            nextProps.dispatch!(serviceAction.reset());
            break;
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            this.serviceRequestInProgress = true;
            break;
        }
      } else if (nextProps.serviceKey === ServiceKeys.SendMsgName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log(
              "sendMsgResponse " + JSON.stringify(nextProps.sendMsgResponse)
            );
            var response = nextProps.sendMsgResponse!.response;
            if (response.message == "success") {
              RouterBuilder.replaceRouteTo(
                AppScreens.G_DashboardView,
                this.props
              );
            } else {
              AlertUtil.show(JSON.stringify(response.message));
            }

            var serviceAction = new ServiceAction();
            nextProps.dispatch!(serviceAction.reset());
            break;
          case ServiceRequestStatus.FinishedWithError:
            this.serviceRequestInProgress = false;
            var errorMessage = nextProps.error!.message;
            AlertUtil.show(errorMessage);
            var serviceAction = new ServiceAction();
            nextProps.dispatch!(serviceAction.reset());
            break;
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            this.serviceRequestInProgress = true;
            break;
        }
      }
    }
  }
  // ----------------------------------------------- Methods ---------------------------------------

  accountNameTapped() {
    this.props.navigation!.navigate(AppScreens.G_ProfileView);
  }

  iconDidTapped() {
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View, {
      gameList: true,
    });
  }

  LogoiconDidTapped() {
    Application.sharedApplication().DeeplinkName = "";
    RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
  }

  availableBalanceTapped() {}

  openPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props);
  }

  coveredPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props);
  }

  goBacktoSetting() {
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
  }

  closeModal() {
    this.setState({ detailmodel: !this.state.detailmodel });
  }

  // -----------------------------------------------Design and Design Methods---------------------------------------

  render() {
    return (
      <Container
        title={this.state.bingoTitle}
        isHeader={true}
        isSubHeader={true}
        isTitle={true}
        showIndicator={this.serviceRequestInProgress}
        menuIconListener={this}
        LogoIconListener={this}
        accountNameListener={this}
        availableBalanceListener={this}
        coveredPlaysListener={this}
        openPlaysListener={this}
        isSetting={false}
      >
        {/* create ui of game details */}

        <Dialog
          visible={this.state.userStatusDialog}
          title=""
          onTouchOutside={() => this.setState({ userStatusDialog: false })}
        >
          <View style={{ backgroundColor: "white" }}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{ width: "88%", alignItems: "center", marginTop: "2%" }}
              >
                <Image
                  source={require("../../../../images/udda_logo_white.png")}
                  style={{
                    width: wp(30),
                    height: wp(7),
                    margin: 10,
                    alignSelf: "center",
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                padding: 15,
                alignItems: "center",
                borderColor: "#cccccc",
                borderTopWidth: 1,
                margin: 3,
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat-SemiBold",
                  fontSize: hp(1.6),
                  marginTop: 10,
                  color: "black",
                }}
              >
                You do not have enough UDDA bucks to access this feature. Please
                upgrade.
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 15,
              }}
            >
              <View style={{ width: "46%" }}>
                <BigButton
                  title="Cancel"
                  style={{ backgroundColor: "#68bcbc" }}
                  textStyle={styles.verify_button_text_style}
                  listener={() => {
                    this.setState({ userStatusDialog: false });
                    this.state.actionName;
                  }}
                />
              </View>
              <View style={{ width: "4%" }}></View>
              <View style={{ width: "46%" }}>
                <BigButton
                  title="Upgrade"
                  style={{ backgroundColor: "#68bcbc" }}
                  textStyle={styles.verify_button_text_style}
                  listener={() => {
                    this.goToInappPage();
                  }}
                />
              </View>
            </View>
          </View>
        </Dialog>

        {this.state.passui ? (
          <View style={{ flex: 1 }}>
            <ProgressLoader
              visible={this.state.loader}
              isModal={true}
              isHUD={true}
              hudColor={"#68bcbc"}
              color={"#FFFFFF"}
            />

            <ScrollView>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {this.state.bingodata.map((item, i) => {
                  var m: any;
                  var n: any;
                  var b = require("../../../../images/gifts_bg/Baby-Book.png");
                  var c = '#44a3bb';
   
                  {
                    i == 0 ? (m = 1,b=require("../../../../images/gifts_bg/Baby-Book.png"),c='#44a3bb') : (m = m);
                  }
                  {
                    i == 1 ? (m = 1,b=require("../../../../images/gifts_bg/Baby-Food.png"),c='#9f0ac4'): (m = m);
                  }
                  {
                    i == 2 ? (m = 1,b=require("../../../../images/gifts_bg/Baby-Hat.png"),c='#e75fa2'): (m = m);
                  }
                  {
                    i == 3 ? (m = 1,b=require("../../../../images/gifts_bg/Baby-Lotion.png"),c='#3bc4c5'): (m = m);
                  }
                  {
                    i == 4 ? (m = 1,b=require("../../../../images/gifts_bg/Baby-Powder.png"),c='#7640d9'): (m = m);
                  }
   
                  {
                    i == 5 ? (m = 2,b=require("../../../../images/gifts_bg/Baby-Shirt.png"),c='#d36dbc'): (m = m);
                  }
                  {
                    i == 6 ? (m = 2,b=require("../../../../images/gifts_bg/Baby-Sleeper.png"),c='#978e84'): (m = m);
                  }
                  {
                    i == 7 ? (m = 2,b=require("../../../../images/gifts_bg/Baby-Soap.png"),c='#bb8840'): (m = m);
                  }
                  {
                    i == 8 ? (m = 2,b=require("../../../../images/gifts_bg/Baby-Socks.png"),c='#6097db'): (m = m);
                  }
                  {
                    i == 9 ? (m = 2,b=require("../../../../images/gifts_bg/Baby-Towel.png"),c='#21c95c') : (m = m);
                  }
   
                  {
                    i == 10 ? (m = 3,b=require("../../../../images/gifts_bg/Baby-toy.png"),c='#f096ab') : (m = m);
                  }
                  {
                    i == 11 ? (m = 3,b=require("../../../../images/gifts_bg/Bib.png"),c='#932bd5') : (m = m);
                  }
                  {
                    i == 12 ? (m = 3) : (m = m);
                  }
                  {
                    i == 13 ? (m = 3,b=require("../../../../images/gifts_bg/Blanket.png"),c='#b32222') : (m = m);
                  }
                  {
                    i == 14 ? (m = 3,b=require("../../../../images/gifts_bg/Booties.png"),c='#1e3fbb') : (m = m);
                  }
   
                  {
                    i == 15 ? (m = 4,b=require("../../../../images/gifts_bg/Bottle.png"),c='#6cc88d') : (m = m);
                  }
                  {
                    i == 16 ? (m = 4,b=require("../../../../images/gifts_bg/Burp-Cloth.png"),c='#887171') : (m = m);
                  }
                  {
                    i == 17 ? (m = 4,b=require("../../../../images/gifts_bg/Diaper.png"),c='#8f7474') : (m = m);
                  }
                  {
                    i == 18 ? (m = 4,b=require("../../../../images/gifts_bg/Diaper-Bag.png"),c='#c542ba') : (m = m);
                  }
                  {
                    i == 19 ? (m = 4,b=require("../../../../images/gifts_bg/Formula.png"),c='#1e3fbb') : (m = m);
                  }
   
                  {
                    i == 20 ? (m = 5,b=require("../../../../images/gifts_bg/Hooded-Towel.png"),c='#d8c41d') : (m = m);
                  }
                  {
                    i == 21 ? (m = 5,b=require("../../../../images/gifts_bg/Onesie.png"),c='#55bc2d') : (m = m);
                  }
                  {
                    i == 22 ? (m = 5,b=require("../../../../images/gifts_bg/Rubber-Duck.png"),c='#34b8c8') : (m = m);
                  }
                  {
                    i == 23 ? (m = 5,b=require("../../../../images/gifts_bg/Teether.png"),c='#c58686') : (m = m);
                  }
                  {
                    i == 24 ? (m = 5,b=require("../../../../images/gifts_bg/Wash-Clothes.png"),c='#30d46a') : (m = m);
                  }
   
                  // console.log('myindex-----',i)
                  return (
                    <View style={[styles.squareBox]}>
                      <ImageBackground
                        source={
                          i == 12
                            ? this.state.custom_bingo_info.bingo_type_id=='1'?require("../../../../images/gifts_bg/bingo.png"):require("../../../../images/Football_center.jpeg")
                            : null// this.state.custom_bingo_info.bingo_type_id=='1' ?require("../../../../images/babybingo_selected_thumb_bg.png"):require("../../../../images/football_selected_thumb_bg.png")
                        }
                        resizeMode="stretch"
                        style={[
                          styles.itemCenter,
                          { width: "100%", height: "100%" },
                        ]}
                      >
                        <TouchableOpacity
                          style={[
                            styles.itemCenter,
                            { width: "100%", height: "100%" },
                          ]}
                        >
                          <View>
                            <Text
                              style={{ color:this.state.custom_bingo_info.bingo_type_id=='1'? c:'', textAlign: "center" }}
                            >
                              {i == 12 ? "" : item.gift_name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  );
                })}
              </View>

              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  },
                ]}
              >
                <TouchableHighlight
                  style={[
                    styles.createsquaare,
                    { width: "95%", height: hp(7.0) },
                  ]}
                  // onPress={() => this.showAlertDialog('2')}
                  onPress={() => this.acceptBingo()}
                  underlayColor="#fff"
                >
                  <View>
                    <Text
                      style={[styles.createsquaaretext, { fontSize: hp(2.9) }]}
                    >
                      Accept Bingo
                    </Text>
                    <View style={[styles.itemCenter, { flexDirection: "row" }]}>
                      <Text
                        style={[
                          styles.createsquaaretext,
                          { fontSize: hp(2.0), color: "black" },
                        ]}
                      >
                        Contest Fee:{" "}
                      </Text>
                      <Image
                        source={require("../../../../images/buck_dark.png")}
                        style={{ height: 10, width: 10 }}
                      />
                      <Text
                        style={[
                          styles.createsquaaretext,
                          { fontSize: hp(2.0), color: "black" },
                        ]}
                      >
                        {this.state.joiningFee
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>

              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.createsquaaretext,
                    { fontSize: hp(2.0), color: "#b9b7b7" },
                  ]}
                >
                  This is your personalized
                  <Text
                    style={[
                      styles.createsquaaretext,
                      { fontSize: hp(2.0), color: "grey" },
                    ]}
                  >
                    {" "}
                    BINGO
                  </Text>{" "}
                  {"\n"} card will be saved once you hit{" "}
                  <Text
                    style={[
                      styles.createsquaaretext,
                      { fontSize: hp(2.0), color: "grey" },
                    ]}
                  >
                    ACCEPT
                  </Text>
                </Text>
              </View>

              {/*   <View style={[styles.ThirdContainer,styles.itemCenter, {  flexDirection: 'row' }]}>

                            <TouchableHighlight
                                style={[styles.createsquaare, { width: '45%',height:hp(9), marginRight: '2%' }]}
                            //onPress={() => this.AcceptBingo()}
                                underlayColor='#fff'>
                                <Text style={styles.createsquaaretext}>{'Close \n Bingo'}</Text>
                            </TouchableHighlight>


                            <TouchableHighlight
                                style={[styles.createsquaare, { width: '45%',height:hp(9) }]}
                           // onPress={() => this.createBingo()}
                                underlayColor='#fff'>
                                <Text style={styles.createsquaaretext}>{'Submit \n Bingo'}</Text>
                            </TouchableHighlight>


                            </View> */}
              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  },
                ]}
              >
                <View
                  style={{
                    backgroundColor: "#CCC",
                    width: "95%",
                    height: hp(7),
                    borderRadius: 5,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.setState({ passui: false });
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          fontSize: 15,
                          fontFamily: "Montserrat-Bold",
                        }}
                      >
                        Not now. I think I'll pass.
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                {/* <TouchableOpacity style={{width:'50%'}} onPress={()=>{this.setState({passui:false})}}>
                        <View style={[styles.itemCenter,{flexDirection:'row'}]}>
                        <Text style={{ fontSize: 14, color: '#69bbbb', fontFamily: 'Montserrat-Semibold', padding: 5, textAlign: 'center', textDecorationLine: 'underline', textDecorationColor: "#888888" }}>Not now,I think I'II pass</Text>
                        
                        </View>
                        </TouchableOpacity> */}
              </View>

              <View
                style={[
                  styles.ThirdContainer,
                  styles.itemCenter,
                  { marginTop: "3%", marginBottom: "3%" },
                ]}
              >
                <TouchableOpacity
                  style={{ width: "40%" }}
                  onPress={() => {
                    this.setState({ detailmodel: true });
                  }}
                >
                  <View style={[styles.itemCenter, { flexDirection: "row" }]}>
                    <Text
                      style={[
                        styles.createsquaaretext,
                        {
                          fontSize: hp(2.0),
                          color: "#d8480f",
                          textDecorationLine: "underline",
                        },
                      ]}
                    >
                      Bingo Details
                    </Text>
                    <View
                      style={[
                        styles.table_title_info_container,
                        { marginBottom: 8, marginRight: 10, marginLeft: 3 },
                      ]}
                    >
                      <Text style={styles.table_title_info_text}> i </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.Main_Container}>
            <View style={styles.Second_Container}>
              <View style={styles.Profile_Container}>
                <View style={styles.Image_Container}>
                  <Image
                    source={{ uri: this.state.bet_user_info.photo }}
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.UserDetail_Container}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    <View style={{ flexDirection: "column", width: "60%" }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#888888",
                          fontFamily: "Montserrat-Regular",
                        }}
                      >
                        From:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#333333",
                          fontFamily: "Montserrat-SemiBold",
                          paddingLeft: 1,
                        }}
                      >
                        {this.state.passui == false
                          ? Application.sharedApplication().user!.profile
                              .firstName
                          : this.state.bet_user_info.firstname}{" "}
                      </Text>
                    </View>
                    <View style={{ width: "40%", paddingRight: 10 }}>
                      <Text
                        style={{
                          width: "100%",
                          fontSize: 10,
                          color: "#888888",
                          fontFamily: "Montserrat-Regular",
                          textAlign: "right",
                        }}
                      >
                        {" "}
                        {this.state.betDate}{" "}
                      </Text>
                      <Text
                        style={{
                          width: "100%",
                          fontSize: 10,
                          color: "#888888",
                          fontFamily: "Montserrat-Regular",
                          textAlign: "right",
                        }}
                      >
                        {" "}
                        {this.state.betTime}{" "}
                      </Text>
                    </View>
                  </View>

                  {this.state.passui == false ? (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#888888",
                        fontFamily: "Montserrat-Regular",
                      }}
                    >
                      To:
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#333333",
                          fontFamily: "Montserrat-SemiBold",
                        }}
                      >
                        {" "}
                        {this.state.bet_user_info.firstname}{" "}
                        {this.state.bet_user_info.lastname}{" "}
                      </Text>
                    </Text>
                  ) : null}
                </View>
              </View>

              <View style={styles.Line}></View>
              {this.state.passui == false ? (
                <ScrollView bounces={false} style={styles.scrollviewstyle}>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        width: "85%",
                        color: "#333333",
                        fontFamily: "Montserrat-Bold",
                        fontSize: 12,
                      }}
                    >
                      Reply to {this.state.bet_user_info.firstname}
                      <Text
                        style={{
                          color: "#888888",
                          fontFamily: "Montserrat-Regular",
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        |{" "}
                      </Text>
                      <Text
                        style={{
                          color: "#888888",
                          fontFamily: "Montserrat-Regular",
                          fontSize: 12,
                        }}
                      >
                        Reply to All{" "}
                      </Text>
                    </Text>
                    <View
                      style={{
                        width: "95%",
                        height: 250,
                        backgroundColor: "white",
                        alignItems: "center",
                        marginTop: 15,
                      }}
                    >
                      <TextInput
                        value={this.state.Message}
                        style={{
                          padding: 8,
                          fontFamily: "Montserrat-Regular",
                          fontSize: hp(1.4),
                          width: "100%",
                        }}
                        placeholder="Type your message here"
                        placeholderTextColor="#333333"
                        onChangeText={(text) =>
                          this.setState({ Message: text })
                        }
                        multiline={true}
                        editable={true}
                      />
                    </View>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.sendMessege();
                      }}
                    >
                      <View
                        style={{
                          width: "90%",
                          height: 40,
                          backgroundColor: "#68bcbc",
                          borderRadius: 5,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 15,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontFamily: "Montserrat-Bold",
                            textAlign: "center",
                          }}
                        >
                          SEND{" "}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.setState({ passui: true });
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#68bcbc",
                          textDecorationColor: "#68bcbc",
                          textDecorationLine: "underline",
                          marginTop: 10,
                          fontFamily: "Montserrat-Medium",
                          fontSize: 12,
                        }}
                      >
                        View original message{" "}
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                </ScrollView>
              ) : null}
            </View>
          </View>
        )}
        {this.state.detailmodel && (
          <BingoDetailComponent
            detailmodel={this.state.detailmodel}
            encrypted_bingo_id={this.state.custom_bingo_info.encrypted_bingo_id}
            onDismiss={() => {
              this.closeModal();
            }}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: GlobalAppState) => ({
  requestStatus: state.serviceReducer.requestStatus,
  error: state.serviceReducer.error,
  serviceKey: state.serviceReducer.serviceKey,
  listeners: state.serviceReducer.listeners,
  getProfileRequestStatus: state.serviceReducer.requestStatus,
  getProfileResponse: state.serviceReducer.response,
  getProfileError: state.serviceReducer.error,
  sendMsgRequestStatus: state.serviceReducer.requestStatus,
  sendMsgResponse: state.serviceReducer.response,
  sendMsgError: state.serviceReducer.error,
});

export default connect(mapStateToProps)(G_AcceptBingoView);
