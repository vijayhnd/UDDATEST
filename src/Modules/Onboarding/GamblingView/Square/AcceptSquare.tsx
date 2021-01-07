import React, { createRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Animated,
  UIManager,
  TouchableWithoutFeedback,
  AppState,
  Share,
  BackHandler,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import styles from "./aceptedstyles";
import { SafeAreaView } from "react-navigation";
import Container from "../../../../Components/Container";
import AppValidationComponent, {
  Field,
  AppValidationComponentState,
  AppValidationComponentProps,
} from "../../../../Util/AppValidationComponent";

import AlertUtil from "../../../../Util/AlertUtil";
import AppConstants from "../../../../Util/Constants";

import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import Application from "../../../../Entities/Application";
import BigButton from "../../../../Components/Button/BigButton";
import RouterBuilder from "../../../../Router";

import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ProgressLoader from "rn-progress-loader";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { OverlayBackground } from "../../../../Components/CustomComponents/OverlayBackground/OverlayBackground";
import { CheckBox, Image } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { UDDAError } from "../../../../Entities";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { Dialog } from "react-native-simple-dialogs";
import moment from "moment";

import ImagePicker from "react-native-image-picker";

import LogoutUtill from "../../../../Util/LogoutUtill";

import SendMsgResponse from "../../../../Services/Bets/SendMsgResponse";
import SendMsgResponseParser from "../../../../Services/Bets/SendMsgResponseParser";
import SendMsgRequest from "../../../../Services/Bets/SendMsgRequest";
import UrlService from "../../../../Services/Core/ServiceURI";
import DateTimePicker from "react-native-modal-datetime-picker";
import ReferralService from "../../../../Services/Referral/ReferralService";
import LinearGradient from "react-native-linear-gradient";

import CustomSquareRequest from "../../../../Services/Bets/CustomSquareRequest";
import CustomSquareResponseParser from "../../../../Services/Bets/CustomSquareResponseParser";
import CustomSquareResponse from "../../../../Services/Bets/CustomSquareResponse";
const { State: TextInputState } = TextInput;
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/MaterialIcons";
import Dash from "react-native-dash";
import CircleImage from "../../../../Components/CustomComponents/CircleImage";
import ImageViewer from "react-native-image-zoom-viewer";
// import ImgToBase64 from 'react-native-image-base64';
import Orientation from "react-native-orientation";
import Popover from "react-native-popover-view";

var update = require("immutability-helper");

console.disableYellowBox = true;

const ProfilePageContent = {
  key: "somethun",
  page_title: "",
};

interface G_AcceptSquareViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus;
  getProfileResponse?: GetProfileResponse;
  getProfileError?: UDDAError;

  customSquareRequestStatus?: ServiceRequestStatus;
  CustomSquareResponse?: CustomSquareResponse;
  customSquareError?: UDDAError;

  sendMsgRequestStatus?: ServiceRequestStatus;
  sendMsgResponse?: SendMsgResponse;
  sendMsgError?: UDDAError;

  serviceKey?: string;
  listeners?: any;
}

interface G_AcceptSquareViewState extends AppValidationComponentState {
  squarelist?: any;
  searchData?: any;
  searchtext?: any;
  detailmodel?: any;
  showOverlayGameSelectionFlag: boolean;
  Accepted: any;
  BlackDialog: any;
  Dialog: any;
  DataList: any;
  bet_detail: any;
  bet_id: any; //garima
  bet_type: any; //@pky
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
  custom_square_info: any;
  quatervalue: any;
  squarebook: any;
  gamedetail?: any;
  gamedetailtime?: any;
  selectSquare?: any;
  showzoom?: any;
  BlackDialogshare: any;
  blackdialogDate: any;
  sideteamname1: any;
  userStatusDialog: any;
  actionName: any;
  imageoverlay: any;
  displayname: any;
  imagezoom: any;
}
enum ProfileScreenComponents {
  FirstNameInput = 1,
  LastNameInput,
  EmailInput,
  MobileInput,
}
const bottom_initial = 0;
class AcceptSquare
  extends AppValidationComponent<
    G_AcceptSquareViewProps,
    G_AcceptSquareViewState
  >
  implements MenuIconListener, ISubheaderListener {
  public UserID = Application.sharedApplication().user!.id;
  private authorisationToken = Application.sharedApplication().user!
    .authenticationToken;
  private playtable: any;
  private NewAnswer: any;
  private New: any;
  private Answer: any;
  private NewAnswerShow: any;
  private NewShow: any;
  private AnswerShow: any;
  public DeeplinkName = Application.sharedApplication().DeeplinkName;
  public LinkId = Application.sharedApplication().EncId;

  private serviceRequestInProgress = false;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  public touchable;
  private referralservice = new ReferralService(); //Ashish
  private my_referral_code = Application.sharedApplication().user!.profile
    .my_referral_code;

  /*  End Auto Racing and Horse Racing */

  constructor(props: any) {
    super(props);
    this.touchable = createRef();

    this.state = {
      squarelist: [],
      searchData: [],
      searchtext: "",
      detailmodel: false,
      showOverlayGameSelectionFlag: false,
      Dialog: false,
      Accepted: false,
      //   Accepted: 'A',
      BlackDialog: false,
      DataList: [],
      bet_detail: [],
      bet_id: "", //garima
      bet_type: "", //@pky
      bet_user_info: [],
      people_list: [],
      opposite: [],
      loader: false,
      betammount: "",
      focuseBet: "",
      valueofDialog: "0.00",
      valueofDialogShow: "0.00",
      dialogVisible: "",
      OddsBet: "",
      HeaderValue: "",
      NoData: "",
      Message: "",
      FlagTotal: "",
      TeamName1: "",
      TeamName2: "",
      betTime: "",
      betDate: "",
      participants: [],
      BetDialog: false,
      isCustom: false,
      showzoom: false,
      isPool: false,
      betTimeExpr: "",
      betDateExpr: "",
      shift: new Animated.Value(0),
      isDateTimePickerVisible: false,
      minimumDate: new Date(),
      customBetDate: "",
      customPooltext: "",
      textlength: 0,
      poolInfo: [],
      custom_square_info: {},
      quatervalue: "",
      squarebook: [],
      gamedetail: {},
      gamedetailtime: "",
      selectSquare: [],
      BlackDialogshare: false,
      blackdialogDate: "",
      sideteamname1: [],
      userStatusDialog: false,
      imageoverlay: false,
      imagezoom: false,
      displayname: [],
      actionName: function () {},
    };
  }

  showPopover() {
    var new_time_stamp = this.state.gamedetail.bet_time_stamp * 1000;
    var formated_time = moment(new_time_stamp).format("MMMM DD,YYYY");
    this.setState({ blackdialogDate: formated_time });
    this.setState({ BlackDialogshare: true });
  }

  closePopover() {
    this.setState({ BlackDialogshare: false });
  }
  getblackDialog() {
    return (
      <Popover
        isVisible={true}
        // fromView={touchableRef}
        // backgroundStyle={{position:'absolute', top:100, paddingTop:hp(20), backgroundColor: '#fff' }}
        //   mode={'rn-modal'}
        // // mode={{'js-modal'
        popoverStyle={{ marginLeft: -10, marginTop: hp(8) }}
        onRequestClose={() => this.closePopover()}
      >
        <View
          style={{
            height: hp(87),
            margin: 0,
            backgroundColor: "#fff",
            padding: 10,
            width: "100%",
            maxHeight: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.closePopover();
            }}
            style={{ width: 50 }}
          >
            <View>
              {/* <Image source={require('../../../../images/back_icon.png')} style={{ height: 10, width: 10, alignSelf: 'flex-start', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image> */}
              <Icons
                name="arrow-back"
                size={30}
                color="black"
                style={{ marginLeft: 2 }}
                onPress={() => {
                  this.closePopover();
                }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Text
              style={{
                width: "100%",
                color: "#68bcbc",
                fontSize: 18,
                marginTop: 5,
                fontFamily: "Montserrat-Bold",
                textAlign: "left",
                paddingLeft: "6%",
              }}
            >
              PARTICIPANTS{" "}
            </Text>
          </View>
          {/* <TouchableWithoutFeedback onPress={() => { this.closePopover() }} >
                          <View>
                              <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10, alignSelf: 'flex-end', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image>
                          </View>
                      </TouchableWithoutFeedback> */}
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text
              style={{
                width: "40%",
                fontSize: 12,
                fontFamily: "Montserrat-Regular",
                height: 20,
                alignItems: "center",
              }}
            >
              Bet Date:
            </Text>

            <View
              style={{
                flexDirection: "row",
                width: "60%",
                justifyContent: "flex-end",
                height: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat-Bold",
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                {this.state.blackdialogDate}
              </Text>
            </View>
          </View>

          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text
              style={{
                width: "40%",
                fontSize: 12,
                fontFamily: "Montserrat-Regular",
                height: 20,
                alignItems: "center",
              }}
            >
              Creator
            </Text>

            <View
              style={{
                flexDirection: "row",
                width: "60%",
                justifyContent: "flex-end",
                height: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat-Bold",
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                {this.state.gamedetail.creator}
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#777777",
                marginVertical: 5,
                width: "95%",
                height: 2,
                alignItems: "center",
              }}
            ></View>
          </View>

          {this.state.gamedetail.share_info.length > 0 ? (
            <View style={{ height: hp(63) }}>
              <FlatList
                extraData={this.state}
                data={this.state.gamedetail.share_info}
                keyExtractor={(item: any, index) => index.toString()}
                bounces={false}
                renderItem={({ item, index }: any) => {
                  return item.status == 1 ? (
                    <View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ width: "50%" }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: "Montserrat-Bold",
                              height: 20,
                              alignItems: "center",
                            }}
                          >
                            {item.username}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            height: 20,
                            width: "30%",
                          }}
                        >
                          <Image
                            source={require("../../../../images/BucksWhite.png")}
                            style={{
                              height: 8,
                              width: 8,
                              alignItems: "center",
                              marginRight: 2,
                              marginTop: 3,
                            }}
                          />
                          <Text
                            style={{
                              fontFamily: "Montserrat-Bold",
                              fontSize: 12,
                              alignItems: "center",
                            }}
                          >
                            {item.amount}
                          </Text>
                        </View>
                        {/* <View style={{ width: '20%' }}><Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textAlign: "right"}}>{item.settled_status}</Text></View> */}
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ width: "50%" }}>
                          {" "}
                          <Text
                            style={{
                              color: "#808080",
                              fontSize: 12,
                              fontFamily: "Montserrat-Bold",
                              height: 20,
                              alignItems: "center",
                              textDecorationLine: "line-through",
                            }}
                          >
                            {item.username}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            height: 20,
                            width: "30%",
                          }}
                        >
                          <Image
                            source={require("../../../../images/BucksWhite.png")}
                            style={{
                              height: 8,
                              width: 8,
                              alignItems: "center",
                              marginRight: 2,
                              marginTop: 3,
                            }}
                          />
                          <Text
                            style={{
                              color: "#808080",
                              fontFamily: "Montserrat-Bold",
                              fontSize: 12,
                              alignItems: "center",
                              textDecorationLine: "line-through",
                            }}
                          >
                            {item.amount}
                          </Text>
                        </View>
                        {/* <View style={{ width: '20%', }}> <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center',textAlign:"right" }}>{item.settled_status}</Text></View> */}
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 12,
                  fontFamily: "Montserrat-Bold",
                  height: hp(63),
                  textAlign: "center",
                }}
              >
                No record found
              </Text>
            </View>
          )}

          {this.state.gamedetail.settlement_status ==
          "Settlement In-Progress" ? (
            this.state.gamedetail.bet_share_type == 2 &&
            this.state.gamedetail.creator_index == "0" ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.shareOption(this.state.gamedetail);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#68bcbc",
                      paddingVertical: 7,
                      marginVertical: 10,
                      width: "95%",
                      alignItems: "center",
                      borderRadius: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Montserrat-Bold",
                        fontSize: 15,
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      Invite More Friends
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ) : this.state.gamedetail.bet_share_type == 1 ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.shareOption(this.state.gamedetail);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#68bcbc",
                      paddingVertical: 7,
                      marginVertical: 10,
                      width: "95%",
                      alignItems: "center",
                      borderRadius: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Montserrat-Bold",
                        fontSize: 15,
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      Invite More Friends
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ) : null
          ) : (
            <View />
          )}
        </View>
      </Popover>
    );
  }

  async shareOption(item: any) {
    var MessageString: any;
    var ShowString: any;
    var oddsString: any;
    var teamName: any;
    var teamName2: any;
    var url: any;
    var selectedData: any;
    var referStr: any;

    var amount: any;
    var new_time_stamp = item.game_start_time_stamp * 1000;
    var date: any;
    date = moment(new_time_stamp).format("MM/DD/YYYY");

    url =
      "http://bet.udda.com/index.php?t=customsquare&i=" +
      item.encryptor_square_id;
    //url = "https://bet.udda.com/coming-soon/"

    url = await this.referralservice.getReferralUrl(
      url,
      this.my_referral_code,
      "U"
    ); // Getting Dynamic Share Link From Firebase
    referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up.";

    // this.setState({ betTimeExpr: formated_timeExp + " " + zoneExp });
    // this.setState({ betDateExpr: batdateExp });
    try {
      var strAccept: any;
      if (item.bet_share_type == "2") {
        //strAccept =  'You can not invite your friends'
      } else {
        strAccept = "You can invite your friends";
      }

      MessageString =
        'You have been invited you to join our square pool for the "' +
        item.away_team_name +
        " vs." +
        item.home_team_name +
        " game on " +
        date +
        '" cost per square is "' +
        item.per_square_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        ' udda bucks" first come first served so act fast.' +
        strAccept +
        ". \nTap on “Square Details” to view more details. \nWould you like to accept the Bet?";
    } catch (e) {}
    MessageString += referStr + "\n" + url;

    console.log("private url " + JSON.stringify(MessageString));
    Share.share({
      message: MessageString,
    })
      .then((result) => {
        console.log(result);
        this.closePopover();
      })
      .catch((errorMsg) => {
        console.log(errorMsg);
        this.closePopover();
      });
  }

  goToInappPage() {
    this.setState({ loader: false });
    this.setState({ userStatusDialog: false });

    // this.props.navigation!.navigate(AppScreens.G_LoginPage);

    // this.props.navigation!.navigate(AppScreens.G_InAppPurchaseUpdateIOS);
    this.props.navigation!.replace(AppScreens.G_InAPPPurchaseViewIOS, {
      params: { callFrom: "userLevel" },
    });
  }

  checkUserStatus(betName: any, callback) {
    var that = this;
    //that.setState({ userStatusDialog: true });

    console.log(
      Application.sharedApplication().user!.profile.level_array.restricted_bets
    );
    //if( Application.sharedApplication().user.level_array.restricted_bets)
    var status = true;

    that.setState({ actionName: callback });
    setTimeout(function () {
      that.setState({ userStatusDialog: true });
    }, 10000);
    return status;
  }
  async saveoverlay() {
    try {
      await AsyncStorage.setItem("acceptsquareoverlay", "true");
      this.setState({ imageoverlay: false });
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
  async closecurrent() {
    this.setState({ imageoverlay: false });
    try {
      await AsyncStorage.setItem("acceptsquareoverlaycurrent", "true");
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
  async componentDidMount() {
    let userId = "";
    let current = "";

    try {
      current = await AsyncStorage.getItem("acceptsquareoverlaycurrent");
      userId = await AsyncStorage.getItem("acceptsquareoverlay");

      console.log("acceptsquareoverlay response", userId);
      var that = this;
      if (userId == "true") {
        setTimeout(function () {
          that.setState({ imageoverlay: false });
        }, 5000);
        // this.setState({imageoverlay:false})
      } else {
        if (current == "true") {
          setTimeout(function () {
            that.setState({ imageoverlay: false });
          }, 5000);
        } else {
          setTimeout(function () {
            that.setState({ imageoverlay: true });
          }, 5000);
        }
        //this.setState({imageoverlay:true})
      }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }

    Application.sharedApplication().DeeplinkName = this.DeeplinkName;
    Application.sharedApplication().EncId = this.LinkId;
    this.LinkId = Application.sharedApplication().EncId;
    console.log(
      "Deeplink  privatebet " + Application.sharedApplication().DeeplinkName
    );
    console.log("Deeplink  link " + Application.sharedApplication().EncId);
    if (
      Application.sharedApplication().DeeplinkName &&
      Application.sharedApplication().DeeplinkName != ""
    ) {
      var DeeplinkName = Application.sharedApplication().DeeplinkName;
      this.DeeplinkName = Application.sharedApplication().DeeplinkName;
      this.LinkId = Application.sharedApplication().EncId;
      console.log("bet DeeplinkName " + JSON.stringify(DeeplinkName));

      if (
        DeeplinkName == "index.php?customsquare/" ||
        DeeplinkName == "customsquare/"
      ) {
        ProfilePageContent.page_title = "ACCEPT SQUARES";
      }

      if (
        DeeplinkName == "index.php?poolbet/" ||
        DeeplinkName == "poolbet/" ||
        DeeplinkName == "index.php?custombet/" ||
        DeeplinkName == "index.php?customsquare/" ||
        DeeplinkName == "customsquare/" ||
        DeeplinkName == "custombet/" ||
        DeeplinkName == "propsbet/" ||
        DeeplinkName == "oddsbet/" ||
        DeeplinkName == "index.php?propsbet/" ||
        DeeplinkName == "index.php?oddsbet/"
      ) {
        this.callMethod();
      } else if (
        DeeplinkName == "propsbet/public" ||
        DeeplinkName == "oddsbet/public" ||
        DeeplinkName == "propsbet/private" ||
        DeeplinkName == "oddsbet/private" ||
        DeeplinkName == "index.php?propsbet/public" ||
        DeeplinkName == "index.php?oddsbet/public" ||
        DeeplinkName == "index.php?propsbet/private" ||
        DeeplinkName == "index.php?oddsbet/private"
      ) {
        this.callContestMethod();
      }
    } else {
    }
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.props) {
       // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
	   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
        return true;
      }

      return false;
    });
  }

  callMethod = () => {
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
      var url: any;
      if (
        DeeplinkName == "customsquare/" ||
        DeeplinkName == "index.php?customsquare/"
      ) {
        url =
          UrlService.CONSTURI +
          "index.php/" +
          UrlService.APIVERSION3 +
          "/Custom_SquareGaming/share_info_square_box/" +
          LinkId +
          "/customsquare";
      }
      //  this.setState({ loader: true });
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
          console.log(responseJson.data.display_button);
          if (responseJson.data.user_status == "0") {
            that.setState({ loader: false });
            this.checkUserStatus("show", function () {
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
          that.setState({ DataList: responseJson.data });
          if (responseJson.data.square_booked) {
            var arr = responseJson.data.square_booked.map(Number);
            that.setState({ squarebook: arr });
          }

          if (responseJson.data.display_square_booked) {
            that.setState({
              displayname: responseJson.data.display_square_booked,
            });
            console.log(
              "accept square display_square_booked",
              this.state.displayname
            );
          }
          console.log(
            "accept square display_square_booked false",
            this.state.displayname
          );

          {
            responseJson.data.custom_square_info.select_quarter_type == "3"
              ? this.changeAxis("Quarter 1")
              : responseJson.data.custom_square_info.select_quarter_type == "2"
              ? this.changeAxis("Quarter Half")
              : this.changeAxis("Final");
          }
          var a = responseJson.data.custom_square_info.away_team_name.split(
            " "
          );
          console.log("split of name ", a);
          var b = [];
          for (
            let i = 0;
            i < responseJson.data.custom_square_info.away_team_name.length;
            i++
          ) {
            b.push(responseJson.data.custom_square_info.away_team_name[i]);
          }
          this.setState({ sideteamname1: b });
          // a.map((item, index) => {
          //       { index == 0 ? b = item + '  ' : b = b + item + '  ' }
          // })
          var c = responseJson.data.custom_square_info;
          c.away_team_name = b;
          this.setState({ custom_square_info: c });
          that.setState({ bet_detail: responseJson.data.bet_detail });
          that.setState({ bet_id: responseJson.data.bet_detail.bet_id }); //garima
          that.setState({
            bet_type: responseJson.data.bet_detail.bet_reject_type,
          }); // @pky
          that.setState({ bet_user_info: responseJson.data.bet_user_info });
          that.setState({ people_list: responseJson.data.people_list });
          that.setState({ opposite: responseJson.data.opposite });

          // if(responseJson.data.display_button =='0'){
          //       AlertUtil.showSingleActionMessage(responseJson.data.display_msg,function(){that.setState({ loader: false });})
          //     // setTimeout(function(){ AlertUtil.show(responseJson.data.display_msg);},400)
          //  }
          //  else
          //  {
          //       that.setState({ loader: false });
          //  }

        
          Application.sharedApplication().DeeplinkName = "";
          Application.sharedApplication().EncId = "";
          Application.sharedApplication().DeeplinkStatus = false;

          /*   if (responseJson.data.bet_detail.bet_odds_type) {
                                    that.setState({ OddsBet: true });

                                    let TeamName = responseJson.data.bet_detail.event_name.split(" Vs ");;
                                    this.setState({ TeamName1: TeamName[0] })
                                    this.setState({ TeamName2: TeamName[1] })

                                    if (responseJson.data.bet_detail.bet_team_type == 'underdog') {
                                          if (responseJson.data.bet_detail.bet_odds_type == '1') {
                                                that.setState({ HeaderValue: responseJson.data.bet_detail.ml_home_price })
                                          }
                                          else if (responseJson.data.bet_detail.bet_odds_type == '2') {
                                                that.setState({ HeaderValue: responseJson.data.bet_detail.total })
                                          }
                                          else if (responseJson.data.bet_detail.bet_odds_type == '3') {
                                                that.setState({ HeaderValue: responseJson.data.bet_detail.ps_home_spread })
                                          }
                                    }
                                    else {
                                          if (responseJson.data.bet_detail.bet_odds_type == '1') {
                                                that.setState({ HeaderValue: responseJson.data.bet_detail.ml_away_price })
                                          }
                                          else if (responseJson.data.bet_detail.bet_odds_type == '2') {
                                                that.setState({ HeaderValue: responseJson.data.bet_detail.total })
                                          }
                                          else if (responseJson.data.bet_detail.bet_odds_type == '3') {
                                                that.setState({ HeaderValue: responseJson.data.bet_detail.ps_away_price })
                                          }
                                    }
                              }
                              else {
                                    if (!this.state.isPool) {
                                          that.setState({ OddsBet: false });
                                    }
                              }
                              console.log('bet ' + JSON.stringify(that.state.OddsBet));
                              console.log('Success Private bet' + JSON.stringify(that.state.DataList));

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

                              var new_time_stampExp = this.state.opposite.expired_timestamp * 1000;
                              var formated_timeExp = moment(new_time_stampExp).format('LT');
                              var batdateExp: any = moment(new_time_stampExp).format('LL');
                              var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
                              var zonevalueExp: any = Match_dateExp[6].toString();
                              var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);

                              this.setState({ betTimeExpr: formated_timeExp + " " + zoneExp });
                              this.setState({ betDateExpr: batdateExp });
                              console.log(moment('04-19-2020 11:08 PM').format('LL'));
                              console.log(moment('04-19-2020 11:08 PM').format('LT') + " " + new Date('04-19-2020 11:08 PM').toString().split(' ')[6].toString().substr(1, zonevalueExp.length - 2));
 */

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

  getProfile() {
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

  componentWillReceiveProps(nextProps: G_AcceptSquareViewProps) {
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
              this.setState({ valueofDialog: "0.00" });
              this.setState({ valueofDialogShow: "0.00" });
            } else {
              AlertUtil.show(JSON.stringify(response.message));
              this.setState({ valueofDialog: "0.00" });
              this.setState({ valueofDialogShow: "0.00" });
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
      } else if (nextProps.serviceKey === ServiceKeys.CustomSquareName) {
        // Custom bet response
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            console.log(
              "betaFriendResponse " +
                JSON.stringify(nextProps.CustomSquareResponse)
            );
            var response = nextProps.CustomSquareResponse!.response;
            if (response.message == "success") {
              console.log("custom bet success");
              RouterBuilder.replaceRouteTo(
                AppScreens.G_DashboardView,
                this.props
              );
            } else {
              AlertUtil.show("Unsuccesful :" + response.message);
            }
            this.getProfile();
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
      } // end
    }
  }

  sendMessege() {
    if (!this.state.Message || this.state.Message.trim() == "") {
      AlertUtil.show("Please enter your message");
    } else {
      var sendMsgRequest = new SendMsgRequest(
        this.state.bet_user_info.id,
        this.state.Message,
        this.state.custom_square_info.id,
        this.state.bet_detail.bet_reject_type
      );
      console.log("create sendMsgRequest", JSON.stringify(sendMsgRequest));
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
  }

  componentWillUnmount() {
    //     AppState.removeEventListener('change', this._handleAppStateChange);
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  componentWillMount() {
    console.log("componentwillmount");
    //this.getSquaresList();
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
   // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
  }

  changeAxis(value) {
    this.setState({ quatervalue: value });
    // if(value=='Quarter 1')
    // {
    //     this.setState({x_axis:this.state.randomSquare[0].Quarter1.axis.x})
    //     this.setState({y_axis:this.state.randomSquare[0].Quarter1.axis.y})
    // }else if(value=='Quarter 2'){
    //   this.setState({x_axis:this.state.randomSquare[1].Quarter2.axis.x})
    //   this.setState({y_axis:this.state.randomSquare[1].Quarter2.axis.y})
    // }else if(value=='Quarter 3'){
    //   this.setState({x_axis:this.state.randomSquare[2].Quarter3.axis.x})
    //   this.setState({y_axis:this.state.randomSquare[2].Quarter3.axis.y})
    // }else if(value=='Quarter 4'){
    //   this.setState({x_axis:this.state.randomSquare[3].Quarter4.axis.x})
    //   this.setState({y_axis:this.state.randomSquare[3].Quarter4.axis.y})
    // }else if(value=='Quarter Half'){
    //   this.setState({x_axis:this.state.randomSquare[0].Quarter2.axis.x})
    //   this.setState({y_axis:this.state.randomSquare[0].Quarter2.axis.y})
    // }else if(value=='Quarter Final'){
    //   this.setState({x_axis:this.state.randomSquare[1].Quarter4.axis.x})
    //   this.setState({y_axis:this.state.randomSquare[1].Quarter4.axis.y})
    // }else if(value=='Final'){
    //   this.setState({x_axis:this.state.randomSquare[0].FINAL.axis.x})
    //   this.setState({y_axis:this.state.randomSquare[0].FINAL.axis.y})
    // }
  }

  getGameDetail() {
    this.setState({ loader: true });
    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/Custom_SquareGaming/game_detail/" +
        this.state.custom_square_info.encrypted_square_id,
      {
        method: "GET",
        headers: {
          authorisation: this.authorisationToken,
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          "vreate pool response : squarelist :   " +
            JSON.stringify(responseJson)
        );
        this.setState({ loader: false });

        this.setState({ gamedetail: responseJson.data.custom_square_info });
        var a =
          moment(this.state.gamedetail.game_start_time_stamp * 1000).format(
            "LT"
          ) +
          " " +
          new Date(this.state.gamedetail.game_start_time_stamp * 1000)
            .toString()
            .split(" ")[6]
            .toString()
            .substr(
              1,
              new Date(this.state.gamedetail.game_start_time_stamp * 1000)
                .toString()
                .split(" ")[6].length - 2
            ) +
          " " +
          moment(this.state.gamedetail.game_start_time_stamp * 1000).format(
            "LL"
          );
        this.setState({ gamedetailtime: a });
        this.setState({ detailmodel: true });
        // this.setState({ Squaredata: responseJson.data });
        //  this.setState({ SquareBooked: responseJson.data.square_booked });
        //  this.setState({ userSquare: responseJson.data.user_squares });
        //  this.setState({ gamename: responseJson.data.custom_square_info.game_name });
        // //this.setState({flattext:[]})
        // this.setState({ searchData: responseJson.data });

        console.log(
          "Success openplay gamedetail :  ",
          JSON.stringify(this.state.gamedetail)
        );
        // this.setState({ dialogVisible: true });
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // LogoutUtill.logoutButtonPressed(this.props);
        }
      })
      .catch((error) => {
        this.setState({ loader: false });
        console.log(error);
      });
  }

  removeSquare(e) {
    var array = this.state.selectSquare;
    var index = array.splice(array.indexOf(e), 1); //array.indexOf(e); // Let's say it's Bob.
    //delete array[index];
    this.setState({ selectSquare: array });
    var a =
      parseFloat(this.state.valueofDialog) -
      parseFloat(this.state.custom_square_info.per_square_cost);
    this.setState({ valueofDialog: a });
  }

  dialogOpen() {
    if (this.state.valueofDialog < 1000) {
      AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
    } else {
      this.setState({ dialogVisible: true });
    }
  }
  squaresAcceptApi() {
    var customSquareRequset = new CustomSquareRequest(
      "",
      " ",
      "",
      "",
      this.state.custom_square_info.square_limit_per_player,
      "",
      "",
      "",
      "",
      "",
      "",
      "2",
      this.state.selectSquare.toString(),
      this.state.valueofDialog,
      "",
      this.state.custom_square_info.id
    );
    console.log("accept square request", JSON.stringify(customSquareRequset));
    var serviceAction = new ServiceAction();
    var responseParser = new CustomSquareResponseParser();
    this.props.dispatch!(
      serviceAction.request(
        ServiceType.Bets,
        ServiceKeys.CustomSquareName,
        customSquareRequset,
        [this.constructor.name],
        responseParser
      )
    );
  }

  acceptSquare(index) {
    if (
      this.state.custom_square_info.square_limit_per_player >
      this.state.selectSquare.length
    ) {
      //   if(5 > this.state.selectSquare.length)
      this.state.selectSquare.push(index),
        this.setState({ selectSquare: this.state.selectSquare });
      var a =
        parseFloat(this.state.valueofDialog) +
        parseFloat(this.state.custom_square_info.per_square_cost);
      this.setState({ valueofDialog: a });
    } else {
      AlertUtil.show(
        "You can not purchase more than the allowed squares limit."
      );
    }
  }

  render() {
    const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let pool =
      this.state.custom_square_info.select_quarter_type == "3"
        ? [
            { value: "Quarter 1" },
            { value: "Quarter 2" },
            { value: "Quarter 3" },
            { value: "Quarter 4" },
          ]
        : this.state.custom_square_info.select_quarter_type == "2"
        ? [{ value: "Quarter Half" }, { value: "Quarter Final" }]
        : [{ value: "Final" }];
    var a = 0;
    var b = [];
    var c = [1, 20, 30, 9, 30, 5, 68, 77];
    var d = [];
    // var b =[]
    // var c =[]

    return this.state.showzoom ? (
      <ScrollView>
        <View style={{ marginTop: 30, width: "100%", flexDirection: "row" }}>
          <View style={styles.dropdown}>
            <View style={{ width: "100%" }}>
              <Dropdown
                containerStyle={{
                  paddingLeft: 8,
                  borderBottomWidth: 0,
                  justifyContent: "center",
                  width: "100%",
                }}
                inputContainerStyle={{ borderBottomColor: "transparent" }}
                dropdownOffset={{ top: 0, left: 0 }}
                dropdownMargins={{ min: 0, max: 0 }}
                // dropdownPosition={-3.2}
                dropdownPosition={
                  this.state.custom_square_info.select_quarter_type == "3"
                    ? -5
                    : this.state.custom_square_info.select_quarter_type == "2"
                    ? -3
                    : -2
                }
                itemTextStyle={[
                  styles.Input_TextStyle,
                  {
                    padding: 5,
                    fontFamily: "Montserrat-Bold",
                    fontSize: hp(2.5),
                    color: "white",
                    margin: 0,
                    paddingBottom: 0,
                    width: "100%",
                  },
                ]}
                data={pool}
                value={this.state.quatervalue}
                style={{ color: "white" }}
                baseColor={"rgba(255, 255, 255, 1)"}
                onChangeText={(value) => {
                  this.changeAxis(value);
                }}
                fontSize={
                  this.state.custom_square_info.select_quarter_type == "2"
                    ? hp(1.5)
                    : hp(1.8)
                }
              />
            </View>
          </View>

          <View style={styles.toptext}>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontFamily: "Montserrat-Bold",
              }}
            >
              {this.state.custom_square_info.home_team_name} (H)
            </Text>
          </View>

          <View
            style={{
              width: "10%",
              padding: 5,
              backgroundColor: "#68bcbc",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Icons
              name="zoom-out-map"
              size={30}
              color="white"
              style={{ marginTop: 0 }}
              onPress={() => {
                this.state.showzoom
                  ? Orientation.lockToPortrait()
                  : Orientation.lockToLandscapeLeft(),
                  this.setState({ showzoom: !this.state.showzoom });
              }}
            />
          </View>
        </View>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View
            style={{
              width: "10%",
              backgroundColor: "#68bcbc",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {this.state.sideteamname1.map((item, index) => {
              return (
                <Text
                  style={{
                    fontSize: 15,
                    color: "white",
                    fontFamily: "Montserrat-Bold",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {item}
                </Text>
              );
            })}
          </View>
          {/* <View style={[styles.sidetext,{width:'4.5%'}]}>
                              <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Bold', textAlign: 'center' }}>{this.state.custom_square_info.away_team_name}</Text>
                        </View> */}
          <ScrollView scrollEnabled={true} horizontal={true}>
            <View style={{ backgroundColor: "#EEEEEE", padding: 0 }}>
              {data.map((item, i) => {
                d.push({ value: [] });
                if (i < 10) {
                  if (i == 0) {
                    return (
                      <View style={{ flexDirection: "row" }}>
                        {data.map((item, index) => {
                          a = a + 1;
                          d[i].value.push(a);
                          if (index == 0) {
                            return (
                              <View style={[styles.header1, { width: 60 }]}>
                                {this.state.squarebook.includes(a) ? (
                                  this.state.displayname.map((item, index) => {
                                    if (
                                      item.box_purchase_number ==
                                      JSON.stringify(a)
                                    ) {
                                      return (
                                        <View>
                                          <TouchableOpacity
                                            onPress={() =>
                                              AlertUtil.show(
                                                item.box_purchase_display_name
                                              )
                                            }
                                          >
                                            <View
                                              style={{
                                                backgroundColor: "#888888",
                                                width: 50,
                                                height: 39,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                alignContent: "center",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  justifyContent:
                                                    "space-between",
                                                  width: 50,
                                                  flexDirection: "row",
                                                  marginTop: -9,
                                                }}
                                              >
                                                <Text
                                                  style={{
                                                    color: "white",
                                                    fontSize: hp(1.5),
                                                    paddingLeft: 3,
                                                  }}
                                                >
                                                  {
                                                    item.box_purchase_display_short_name
                                                  }
                                                </Text>
                                              </View>
                                              <Text
                                                style={{
                                                  textAlign: "center",
                                                  color: "white",
                                                }}
                                              >
                                                {a}
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                      );
                                    }
                                  })
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.selectSquare.includes(
                                        d[i].value[index]
                                      )
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.selectSquare.includes(
                                          a
                                        )
                                          ? "#68bcbc"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.selectSquare.includes(a) ? (
                                        <View
                                          style={{
                                            justifyContent: "flex-end",
                                            width: 50,
                                            alignItems: "flex-end",
                                            alignContent: "flex-end",
                                          }}
                                        >
                                          <Icons
                                            name="check"
                                            size={13}
                                            color="white"
                                            style={{ marginTop: -10 }}
                                          />
                                        </View>
                                      ) : null}
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          color: this.state.selectSquare.includes(
                                            a
                                          )
                                            ? "white"
                                            : "black",
                                        }}
                                      >
                                        {a}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                              </View>
                            );
                          } else {
                            return (
                              <View style={[styles.header1]}>
                                {this.state.squarebook.includes(a) ? (
                                  this.state.displayname.map((item, index) => {
                                    if (
                                      item.box_purchase_number ==
                                      JSON.stringify(a)
                                    ) {
                                      return (
                                        <View>
                                          <TouchableOpacity
                                            onPress={() =>
                                              AlertUtil.show(
                                                item.box_purchase_display_name
                                              )
                                            }
                                          >
                                            <View
                                              style={{
                                                backgroundColor: "#888888",
                                                width: 50,
                                                height: 39,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                alignContent: "center",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  justifyContent:
                                                    "space-between",
                                                  width: 50,
                                                  flexDirection: "row",
                                                  marginTop: -9,
                                                }}
                                              >
                                                <Text
                                                  style={{
                                                    color: "white",
                                                    fontSize: hp(1.5),
                                                    paddingLeft: 3,
                                                  }}
                                                >
                                                  {
                                                    item.box_purchase_display_short_name
                                                  }
                                                </Text>
                                              </View>
                                              <Text
                                                style={{
                                                  textAlign: "center",
                                                  color: "white",
                                                }}
                                              >
                                                {a}
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                      );
                                    }
                                  })
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.selectSquare.includes(
                                        d[i].value[index]
                                      )
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.selectSquare.includes(
                                          a
                                        )
                                          ? "#68bcbc"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.selectSquare.includes(a) ? (
                                        <View
                                          style={{
                                            justifyContent: "flex-end",
                                            width: 50,
                                            alignItems: "flex-end",
                                            alignContent: "flex-end",
                                          }}
                                        >
                                          <Icons
                                            name="check"
                                            size={13}
                                            color="white"
                                            style={{ marginTop: -10 }}
                                          />
                                        </View>
                                      ) : null}
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          color: this.state.selectSquare.includes(
                                            a
                                          )
                                            ? "white"
                                            : "black",
                                        }}
                                      >
                                        {a}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                              </View>
                            );
                          }
                        })}
                      </View>
                    );
                  } else {
                    return (
                      <View style={{ flexDirection: "row" }}>
                        {data.map((item, index) => {
                          a = a + 1;
                          d[i].value.push(a);
                          if (index == 0) {
                            return (
                              <View
                                style={[
                                  styles.header2,
                                  { height: 40, width: 60, marginTop: 0.5 },
                                ]}
                              >
                                {this.state.squarebook.includes(a) ? (
                                  this.state.displayname.map((item, index) => {
                                    if (
                                      item.box_purchase_number ==
                                      JSON.stringify(a)
                                    ) {
                                      return (
                                        <View>
                                          <TouchableOpacity
                                            onPress={() =>
                                              AlertUtil.show(
                                                item.box_purchase_display_name
                                              )
                                            }
                                          >
                                            <View
                                              style={{
                                                backgroundColor: "#888888",
                                                width: 50,
                                                height: 39,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                alignContent: "center",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  justifyContent:
                                                    "space-between",
                                                  width: 50,
                                                  flexDirection: "row",
                                                  marginTop: -9,
                                                }}
                                              >
                                                <Text
                                                  style={{
                                                    color: "white",
                                                    fontSize: hp(1.5),
                                                    paddingLeft: 3,
                                                  }}
                                                >
                                                  {
                                                    item.box_purchase_display_short_name
                                                  }
                                                </Text>
                                              </View>
                                              <Text
                                                style={{
                                                  textAlign: "center",
                                                  color: "white",
                                                }}
                                              >
                                                {a}
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                      );
                                    }
                                  })
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.selectSquare.includes(
                                        d[i].value[index]
                                      )
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.selectSquare.includes(
                                          a
                                        )
                                          ? "#68bcbc"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.selectSquare.includes(a) ? (
                                        <View
                                          style={{
                                            justifyContent: "flex-end",
                                            width: 50,
                                            alignItems: "flex-end",
                                            alignContent: "flex-end",
                                          }}
                                        >
                                          <Icons
                                            name="check"
                                            size={13}
                                            color="white"
                                            style={{ marginTop: -10 }}
                                          />
                                        </View>
                                      ) : null}
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          color: this.state.selectSquare.includes(
                                            a
                                          )
                                            ? "white"
                                            : "black",
                                        }}
                                      >
                                        {a}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                              </View>
                            );
                          } else {
                            return (
                              <View
                                style={[
                                  styles.header2,
                                  { height: 40, marginTop: 0.5 },
                                ]}
                              >
                                {this.state.squarebook.includes(a) ? (
                                  this.state.displayname.map((item, index) => {
                                    if (
                                      item.box_purchase_number ==
                                      JSON.stringify(a)
                                    ) {
                                      return (
                                        <View>
                                          <TouchableOpacity
                                            onPress={() =>
                                              AlertUtil.show(
                                                item.box_purchase_display_name
                                              )
                                            }
                                          >
                                            <View
                                              style={{
                                                backgroundColor: "#888888",
                                                width: 50,
                                                height: 39,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                alignContent: "center",
                                              }}
                                            >
                                              <View
                                                style={{
                                                  justifyContent:
                                                    "space-between",
                                                  width: 50,
                                                  flexDirection: "row",
                                                  marginTop: -9,
                                                }}
                                              >
                                                <Text
                                                  style={{
                                                    color: "white",
                                                    fontSize: hp(1.5),
                                                    paddingLeft: 3,
                                                  }}
                                                >
                                                  {
                                                    item.box_purchase_display_short_name
                                                  }
                                                </Text>
                                              </View>
                                              <Text
                                                style={{
                                                  textAlign: "center",
                                                  color: "white",
                                                }}
                                              >
                                                {a}
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        </View>
                                      );
                                    }
                                  })
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.selectSquare.includes(
                                        d[i].value[index]
                                      )
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.selectSquare.includes(
                                          a
                                        )
                                          ? "#68bcbc"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.selectSquare.includes(a) ? (
                                        <View
                                          style={{
                                            justifyContent: "flex-end",
                                            width: 50,
                                            alignItems: "flex-end",
                                            alignContent: "flex-end",
                                          }}
                                        >
                                          <Icons
                                            name="check"
                                            size={13}
                                            color="white"
                                            style={{ marginTop: -10 }}
                                          />
                                        </View>
                                      ) : null}
                                      <Text
                                        style={{
                                          textAlign: "center",
                                          color: this.state.selectSquare.includes(
                                            a
                                          )
                                            ? "white"
                                            : "black",
                                        }}
                                      >
                                        {a}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                              </View>
                            );
                          }
                        })}
                      </View>
                    );
                  }
                } else {
                  return <View></View>;
                }
              })}
            </View>
          </ScrollView>
        </View>
        {/* <View style={{ width: '95%', margin: 10, borderRadius: 3 }}>
                        <TouchableOpacity onPress={() => this.dialogOpen()} style={styles.placebutton} >
                              <View>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(3.8), color: 'white' }}> ACCEPT </Text>
                                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                          <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'black' }}> Total Amount : </Text>
                                          <Image source={require('../../../../images/buck_dark.png')} style={{ height: 13, width: 13 }} />
                                          <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(2.3), color: 'black' }}>{this.state.valueofDialog} </Text>
                                          <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'black' }}>({this.state.selectSquare.length} Squares)</Text>
                                    </View>

                              </View>
                        </TouchableOpacity>
                  </View> */}
        {/* <View style={{ padding: 0 }}>
                        <Text style={{ fontSize: 14, color: '#69bbbb', fontFamily: 'Montserrat-Semibold', padding: 5, textAlign: 'center', textDecorationLine: 'underline', textDecorationColor: "#888888" }} onPress={() => { this.setState({ Accepted: true }) }}>Not now,I think I'II pass</Text>
                  </View> */}
      </ScrollView>
    ) : (
      <Container
        title={"FOOTBALL SQUARES"}
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
        {/* overlay ui start */}
        {UrlService.OVERLAY == 0 ? (
          <Modal visible={this.state.imageoverlay} transparent={true}>
            <View style={{ height: "100%", width: "100%", flex: 1 }}>
              <SafeAreaView forceInset={{ bottom: "never" }}>
                <ImageBackground
                  source={require("../../../../images/accept-square-overlay.png")}
                  resizeMode="stretch"
                  style={{ width: "100%", height: "100%" }}
                >
                  <View
                    style={{
                      position: "absolute",
                      justifyContent: "center",
                      bottom: "2%",
                      width: "100%",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          marginTop: 15,
                          fontFamily: "Montserrat-Bold",
                          fontSize: hp(2.0),
                          textDecorationLine: "underline",
                          color: "#68bcbc",
                        }}
                        onPress={() => {
                          this.saveoverlay();
                        }}
                      >
                        Don't show again
                      </Text>
                      <TouchableOpacity onPress={() => this.closecurrent()}>
                        <Image
                          source={require("../../../../images/close_overlay.png")}
                          style={{ height: 50, width: 50 }}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </SafeAreaView>
            </View>
          </Modal>
        ) : null}
        {/* overlay ui end */}

        {/* -------------------------------- Bet Placed user Status check Dialogue --------------------------------*/}

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

        {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.dialogVisible}
          title=""
          onTouchOutside={() => this.setState({ dialogVisible: false })}
        >
          <View style={{ backgroundColor: "white", padding: 10 }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ dialogVisible: false });
              }}
            >
              <View style={{ alignItems: "flex-end", width: "100%" }}>
                <Image
                  source={require("../../../../images/close.png")}
                  style={{ height: 15, width: 15 }}
                ></Image>
              </View>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  padding: 1,
                  fontFamily: "Montserrat-semibold",
                  textAlign: "center",
                  fontSize: hp(2.2),
                  color: "black",
                }}
              >
                Are you sure you want to place this bet?
              </Text>
              <BigButton
                title="CONFIRM"
                style={[styles.verify_button, { backgroundColor: "#68bcbc" }]}
                textStyle={styles.verify_button_text_style}
                listener={() => {
                  this.setState({ dialogVisible: false });
                  if (
                    this.DeeplinkName == "customsquare/" ||
                    this.DeeplinkName == "index.php?customsquare/"
                  ) {
                    this.squaresAcceptApi();
                  }
                }}
              />
            </View>
          </View>
        </Dialog>

        {/* create ui of game details */}
        <Modal visible={this.state.detailmodel} transparent={false}>
        <Modal visible={this.state.imagezoom} transparent={false}>
            <View>
            <SafeAreaView>
              <View style={{justifyContent:'flex-end',alignItems:'flex-end',alignContent:'flex-end',padding:10}}>
              <Icon onPress={() => { 
              this.setState({
                imagezoom: false
              });
            }} name="close" size={26} color="Black"/>
              </View>

              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',height:100}}>
          <Text style={{fontSize: hp(3.4), fontFamily: 'Montserrat-SemiBold',textAlign:'center'}}>Scan <Text style={{fontSize: hp(3.4), fontFamily: 'Montserrat-Bold',}}> QR Code </Text> {'\n'}to join the contest</Text>
              </View>
              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:20,height:250}}>
              <Image
                     style={{ width: 250, height: 250 }}
                     source={{uri:this.state.gamedetail.qr_code}}
                    //  source={require('../../../../images/winner_trophy.png')} 
                     
                     >
                     </Image>
              </View>
         </SafeAreaView>
            </View>
            
         
        </Modal>
          <SafeAreaView>
            <View style={[styles.customhead, { backgroundColor: "#68bcbc" }]}>
              <View
                style={{
                  alignContent: "flex-end",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  width: "75%",
                }}
              >
                <Text style={[styles.customheadtext, { color: "white" }]}>
                  SQUARES DETAILS
                </Text>
              </View>
              <View
                style={{
                  alignContent: "flex-end",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  width: "25%",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ detailmodel: false })}
                >
                  <View style={[styles.CloseView]}>
                    <Icon name="close" size={25} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <View style={{ width: "95%" }}>


                 {this.state.gamedetail.qr_code &&  <View style={{width:'100%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>{this.setState({imagezoom:true})}}>
                  <Image
                     style={{ width: 40, height: 40 }}
                     source={require('../../../../images/magnifying_glass_qrcode_icon.png')}
                    // source={{uri:this.state.gamedetail.qr_code}}
                      >
                     </Image>
                  </TouchableOpacity>
                   </View>}
                    {this.state.gamedetail.qr_code &&<View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#c3c3c3",
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    />}






                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Squares Title
                  </Text>
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2.2),
                      color: "black",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {this.state.gamedetail.game_name}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#c3c3c3",
                      marginBottom: 5,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Game Details
                  </Text>
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2.2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {this.state.gamedetailtime}
                  </Text>
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: "#EEEEEE",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "45%",
                        justifyContent: "center",
                        alignContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <View style={{ width: "70%" }}>
                        <Text
                          style={{
                            padding: 5,
                            fontSize: hp(1.9),
                            color: "#68bcbc",
                            fontFamily: "Montserrat-Bold",
                            textAlign: "left",
                          }}
                        >
                          {this.state.gamedetail.away_team_name}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={{borderLeftWidth:1,borderLeftColor:'#c3c3c3'}}/> */}
                    <View
                      style={{
                        width: "9%",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        height: hp(6),
                      }}
                    >
                      <Text
                        style={[
                          styles.Text_Style,
                          styles.flatlist_matchup_text_style,
                          { color: "black", fontSize: hp(2.8) },
                        ]}
                      >
                        {"vs"}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "45%",
                        justifyContent: "center",
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <View style={{ width: "80%" }}>
                        <Text
                          style={{
                            padding: 5,
                            marginLeft: "8%",
                            fontSize: hp(1.9),
                            color: "#68bcbc",
                            fontFamily: "Montserrat-Bold",
                            textAlign: "left",
                          }}
                        >
                          {this.state.gamedetail.home_team_name} (H)
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#c3c3c3",
                      marginBottom: 5,
                      marginTop: 10,
                    }}
                  />
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Cost Per Square
                  </Text>
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2.2),
                      color: "#373737",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {this.state.gamedetail.per_square_cost}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#c3c3c3",
                      marginBottom: 5,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Max. # of Squares
                  </Text>
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2.2),
                      color: "#373737",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {this.state.gamedetail.square_limit_per_player}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#c3c3c3",
                      marginBottom: 5,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Payouts
                  </Text>
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2.2),
                      color: "#373737",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {this.state.gamedetail.select_quarter_text}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#c3c3c3",
                      marginBottom: 5,
                      marginTop: 5,
                    }}
                  />
                  <Text
                    style={{
                      padding: 3,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Wining Amount in Percent(%)
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      width: "100%",
                    }}
                  >
                    {this.state.gamedetail.select_quarter_type == "3" ? (
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            width: "25%",
                            borderWidth: 1,
                            borderColor: "#EEEEEE",
                          }}
                        >
                          <Text style={[styles.quartertext, { padding: 5 }]}>
                            Q1
                          </Text>
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#EEEEEE",
                            }}
                          />
                          <Text style={[styles.quartertext, { padding: 15 }]}>
                            {this.state.gamedetail.quarter_arr.Q1}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: "25%",
                            borderWidth: 1,
                            borderColor: "#EEEEEE",
                          }}
                        >
                          <Text style={[styles.quartertext, { padding: 5 }]}>
                            H
                          </Text>
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#EEEEEE",
                            }}
                          />
                          <Text style={[styles.quartertext, { padding: 15 }]}>
                            {this.state.gamedetail.quarter_arr.Q2}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: "25%",
                            borderWidth: 1,
                            borderColor: "#EEEEEE",
                          }}
                        >
                          <Text style={[styles.quartertext, { padding: 5 }]}>
                            Q3
                          </Text>
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#EEEEEE",
                            }}
                          />
                          <Text style={[styles.quartertext, { padding: 15 }]}>
                            {this.state.gamedetail.quarter_arr.Q3}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: "25%",
                            borderWidth: 1,
                            borderColor: "#EEEEEE",
                          }}
                        >
                          <Text style={[styles.quartertext, { padding: 5 }]}>
                            F
                          </Text>
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#EEEEEE",
                            }}
                          />
                          <Text style={[styles.quartertext, { padding: 15 }]}>
                            {this.state.gamedetail.quarter_arr.Q4}
                          </Text>
                        </View>
                      </View>
                    ) : this.state.gamedetail.select_quarter_type == "2" ? (
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            width: "50%",
                            borderWidth: 1,
                            borderColor: "#EEEEEE",
                          }}
                        >
                          <Text style={[styles.quartertext, { padding: 5 }]}>
                            H
                          </Text>
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#EEEEEE",
                            }}
                          />
                          <Text style={[styles.quartertext, { padding: 15 }]}>
                            {this.state.gamedetail.quarter_arr.Q2}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: "50%",
                            borderWidth: 1,
                            borderColor: "#EEEEEE",
                          }}
                        >
                          <Text style={[styles.quartertext, { padding: 5 }]}>
                            F
                          </Text>
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#EEEEEE",
                            }}
                          />
                          <Text style={[styles.quartertext, { padding: 15 }]}>
                            {this.state.gamedetail.quarter_arr.Q4}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            width: "100%",
                            borderWidth: 1,
                            borderColor: "#EEEEEE",
                          }}
                        >
                          <Text style={[styles.quartertext, { padding: 5 }]}>
                            Final
                          </Text>
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#EEEEEE",
                            }}
                          />
                          <Text style={[styles.quartertext, { padding: 15 }]}>
                            {"100.00"}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#c3c3c3",
                      marginBottom: 5,
                      marginTop: 15,
                    }}
                  />
                  <Text
                    style={{
                      padding: 5,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Random number for all payouts
                  </Text>
                  <Text
                    style={{
                      padding: 5,
                      fontSize: hp(2.2),
                      color: "#373737",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {this.state.gamedetail.square_random_number_text}
                  </Text>

                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#c3c3c3",
                      marginBottom: 5,
                      marginTop: 15,
                    }}
                  />
                  <Text
                    style={{
                      padding: 5,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Bet amount
                  </Text>
                  <Text
                    style={{
                      padding: 5,
                      fontSize: hp(2.2),
                      color: "#373737",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {this.state.gamedetail.bet_amount}
                  </Text>

                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#c3c3c3",
                      marginBottom: 5,
                      marginTop: 15,
                    }}
                  />
                  <Text
                    style={{
                      padding: 5,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Wining amount
                  </Text>
                  <Text
                    style={{
                      padding: 5,
                      fontSize: hp(2.2),
                      color: "#373737",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {this.state.gamedetail.square_total_pool_amount}
                  </Text>

                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#c3c3c3",
                      marginBottom: 5,
                      marginTop: 15,
                    }}
                  />
                  <Text
                    style={{
                      padding: 5,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Status
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        padding: 5,
                        fontSize: hp(2.2),
                        color: "#373737",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      {this.state.gamedetail.settlement_status}
                    </Text>
                    <View style={{ padding: 10 }}>
                      <TouchableHighlight onPress={() => this.showPopover()}>
                        <Image
                          ref={(ref) => (this.touchable = ref)}
                          source={require("../../../../images/Bet_Share.png")}
                          style={{
                            height: 20,
                            width: 20,
                            tintColor: "#68bcbc",
                          }}
                          resizeMode="contain"
                          tintColor="#68bcbc"
                        />
                      </TouchableHighlight>
                    </View>
                  </View>

                  {/* <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:15}}/> */}
                  <Text
                    style={{
                      padding: 5,
                      fontSize: hp(2),
                      color: "grey",
                      fontFamily: "Montserrat-Bold",
                    }}
                  ></Text>
                  <Text
                    style={{
                      padding: 5,
                      fontSize: hp(2.2),
                      color: "#373737",
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {""}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
          {this.state.BlackDialogshare && this.getblackDialog()}
        </Modal>

        {/* {this.state.BlackDialogshare && this.getblackDialog()} */}
        {/* end ui of game details */}
        <View style={styles.customhead}>
          <View
            style={{
              alignContent: "flex-end",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              width: "70%",
            }}
          >
            <Text style={styles.customheadtext}>ACCEPT SQUARES</Text>
          </View>
          <TouchableOpacity
            style={{
              alignContent: "flex-end",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              width: "30%",
              flexDirection: "row",
            }}
            onPress={() => {
              this.getGameDetail();
            }}
          >
            <View style={{ width: "60%", marginRight: 4 }}>
              <Text style={[styles.customheadtext1]}>Squares Details</Text>
            </View>
            <View
              style={[
                styles.table_title_info_container,
                { marginBottom: hp(1.8), marginRight: 4 },
              ]}
            >
              <Text style={styles.table_title_info_text}> i </Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.Accepted == true ? (
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
                        {this.state.Accepted == true
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

                  {this.state.Accepted == true ? (
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
              {this.state.Accepted == true ? (
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
                        this.setState({ Accepted: false });
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
        ) : (
          <ScrollView>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View style={styles.dropdown}>
                <View style={{ width: "100%" }}>
                  <Dropdown
                    containerStyle={{
                      paddingLeft: 8,
                      borderBottomWidth: 0,
                      justifyContent: "center",
                      width: "100%",
                    }}
                    inputContainerStyle={{ borderBottomColor: "transparent" }}
                    dropdownOffset={{ top: 0, left: 0 }}
                    dropdownMargins={{ min: 0, max: 0 }}
                    // dropdownPosition={-3.2}
                    dropdownPosition={
                      this.state.custom_square_info.select_quarter_type == "3"
                        ? -5
                        : this.state.custom_square_info.select_quarter_type ==
                          "2"
                        ? -3
                        : -2
                    }
                    itemTextStyle={[
                      styles.Input_TextStyle,
                      {
                        padding: 5,
                        fontFamily: "Montserrat-Bold",
                        fontSize: hp(2.5),
                        color: "white",
                        margin: 0,
                        paddingBottom: 0,
                        width: "100%",
                      },
                    ]}
                    data={pool}
                    value={this.state.quatervalue}
                    textColor={"white"}
                    baseColor={"rgba(255, 255, 255, 1)"}
                    selectedItemColor={"black"}
                    onChangeText={(value) => {
                      this.changeAxis(value);
                    }}
                    fontSize={
                      this.state.custom_square_info.select_quarter_type == "2"
                        ? hp(1.5)
                        : hp(1.8)
                    }
                  />
                </View>
              </View>

              <View style={styles.toptext}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "white",
                    fontFamily: "Montserrat-Bold",
                  }}
                >
                  {this.state.custom_square_info.home_team_name} (H)
                </Text>
              </View>

              <View
                style={{
                  width: "10%",
                  padding: 5,
                  backgroundColor: "#68bcbc",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Icons
                  name="zoom-out-map"
                  size={30}
                  color="white"
                  style={{ marginTop: 0 }}
                  onPress={() => {
                    this.state.showzoom
                      ? Orientation.lockToPortrait()
                      : Orientation.lockToLandscapeLeft(),
                      this.setState({ showzoom: !this.state.showzoom });
                  }}
                />
              </View>
            </View>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <View
                style={{
                  width: "10%",
                  backgroundColor: "#68bcbc",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                {this.state.sideteamname1.map((item, index) => {
                  return (
                    <Text
                      style={{
                        fontSize: 15,
                        color: "white",
                        fontFamily: "Montserrat-Bold",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {item}
                    </Text>
                  );
                })}
              </View>
              {/* <View style={styles.sidetext}>
                                                <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Bold', textAlign: 'center' }}>{this.state.custom_square_info.away_team_name}</Text>
                                          </View> */}
              <ScrollView scrollEnabled={true} horizontal={true}>
                <View style={{ backgroundColor: "#EEEEEE", padding: 0 }}>
                  {data.map((item, i) => {
                    d.push({ value: [] });
                    if (i < 10) {
                      if (i == 0) {
                        return (
                          <View style={{ flexDirection: "row" }}>
                            {data.map((item, index) => {
                              a = a + 1;
                              d[i].value.push(a);
                              if (index == 0) {
                                return (
                                  <View style={[styles.header1, { width: 60 }]}>
                                    {this.state.squarebook.includes(a) ? (
                                      this.state.displayname.map(
                                        (item, index) => {
                                          if (
                                            item.box_purchase_number ==
                                            JSON.stringify(a)
                                          ) {
                                            return (
                                              <View>
                                                <TouchableOpacity
                                                  onPress={() =>
                                                    AlertUtil.show(
                                                      item.box_purchase_display_name
                                                    )
                                                  }
                                                >
                                                  <View
                                                    style={{
                                                      backgroundColor:
                                                        "#888888",
                                                      width: 50,
                                                      height: 39,
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      alignContent: "center",
                                                    }}
                                                  >
                                                    <View
                                                      style={{
                                                        justifyContent:
                                                          "space-between",
                                                        width: 50,
                                                        flexDirection: "row",
                                                        marginTop: -9,
                                                      }}
                                                    >
                                                      <Text
                                                        style={{
                                                          color: "white",
                                                          fontSize: hp(1.5),
                                                          paddingLeft: 3,
                                                        }}
                                                      >
                                                        {
                                                          item.box_purchase_display_short_name
                                                        }
                                                      </Text>
                                                    </View>
                                                    <Text
                                                      style={{
                                                        textAlign: "center",
                                                        color: "white",
                                                      }}
                                                    >
                                                      {a}
                                                    </Text>
                                                  </View>
                                                </TouchableOpacity>
                                              </View>
                                            );
                                          }
                                        }
                                      )
                                    ) : (
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.state.selectSquare.includes(
                                            d[i].value[index]
                                          )
                                            ? this.removeSquare(
                                                d[i].value[index]
                                              )
                                            : this.acceptSquare(
                                                d[i].value[index]
                                              );
                                        }}
                                      >
                                        <View
                                          style={{
                                            backgroundColor: this.state.selectSquare.includes(
                                              a
                                            )
                                              ? "#68bcbc"
                                              : "white",
                                            width: 50,
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                          }}
                                        >
                                          {this.state.selectSquare.includes(
                                            a
                                          ) ? (
                                            <View
                                              style={{
                                                justifyContent: "flex-end",
                                                width: 50,
                                                alignItems: "flex-end",
                                                alignContent: "flex-end",
                                              }}
                                            >
                                              <Icons
                                                name="check"
                                                size={13}
                                                color="white"
                                                style={{ marginTop: -10 }}
                                              />
                                            </View>
                                          ) : null}
                                          <Text
                                            style={{
                                              textAlign: "center",
                                              color: this.state.selectSquare.includes(
                                                a
                                              )
                                                ? "white"
                                                : "black",
                                            }}
                                          >
                                            {a}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                    )}
                                  </View>
                                );
                              } else {
                                return (
                                  <View style={[styles.header1]}>
                                    {this.state.squarebook.includes(a) ? (
                                      this.state.displayname.map(
                                        (item, index) => {
                                          if (
                                            item.box_purchase_number ==
                                            JSON.stringify(a)
                                          ) {
                                            return (
                                              <View>
                                                <TouchableOpacity
                                                  onPress={() =>
                                                    AlertUtil.show(
                                                      item.box_purchase_display_name
                                                    )
                                                  }
                                                >
                                                  <View
                                                    style={{
                                                      backgroundColor:
                                                        "#888888",
                                                      width: 50,
                                                      height: 39,
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      alignContent: "center",
                                                    }}
                                                  >
                                                    <View
                                                      style={{
                                                        justifyContent:
                                                          "space-between",
                                                        width: 50,
                                                        flexDirection: "row",
                                                        marginTop: -9,
                                                      }}
                                                    >
                                                      <Text
                                                        style={{
                                                          color: "white",
                                                          fontSize: hp(1.5),
                                                          paddingLeft: 3,
                                                        }}
                                                      >
                                                        {
                                                          item.box_purchase_display_short_name
                                                        }
                                                      </Text>
                                                    </View>
                                                    <Text
                                                      style={{
                                                        textAlign: "center",
                                                        color: "white",
                                                      }}
                                                    >
                                                      {a}
                                                    </Text>
                                                  </View>
                                                </TouchableOpacity>
                                              </View>
                                            );
                                          }
                                        }
                                      )
                                    ) : (
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.state.selectSquare.includes(
                                            d[i].value[index]
                                          )
                                            ? this.removeSquare(
                                                d[i].value[index]
                                              )
                                            : this.acceptSquare(
                                                d[i].value[index]
                                              );
                                        }}
                                      >
                                        <View
                                          style={{
                                            backgroundColor: this.state.selectSquare.includes(
                                              a
                                            )
                                              ? "#68bcbc"
                                              : "white",
                                            width: 50,
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                          }}
                                        >
                                          {this.state.selectSquare.includes(
                                            a
                                          ) ? (
                                            <View
                                              style={{
                                                justifyContent: "flex-end",
                                                width: 50,
                                                alignItems: "flex-end",
                                                alignContent: "flex-end",
                                              }}
                                            >
                                              <Icons
                                                name="check"
                                                size={13}
                                                color="white"
                                                style={{ marginTop: -10 }}
                                              />
                                            </View>
                                          ) : null}
                                          <Text
                                            style={{
                                              textAlign: "center",
                                              color: this.state.selectSquare.includes(
                                                a
                                              )
                                                ? "white"
                                                : "black",
                                            }}
                                          >
                                            {a}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                    )}
                                  </View>
                                );
                              }
                            })}
                          </View>
                        );
                      } else {
                        return (
                          <View style={{ flexDirection: "row" }}>
                            {data.map((item, index) => {
                              a = a + 1;
                              d[i].value.push(a);
                              if (index == 0) {
                                return (
                                  <View
                                    style={[
                                      styles.header2,
                                      { height: 40, width: 60, marginTop: 0.5 },
                                    ]}
                                  >
                                    {this.state.squarebook.includes(a) ? (
                                      this.state.displayname.map(
                                        (item, index) => {
                                          if (
                                            item.box_purchase_number ==
                                            JSON.stringify(a)
                                          ) {
                                            return (
                                              <View>
                                                <TouchableOpacity
                                                  onPress={() =>
                                                    AlertUtil.show(
                                                      item.box_purchase_display_name
                                                    )
                                                  }
                                                >
                                                  <View
                                                    style={{
                                                      backgroundColor:
                                                        "#888888",
                                                      width: 50,
                                                      height: 39,
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      alignContent: "center",
                                                    }}
                                                  >
                                                    <View
                                                      style={{
                                                        justifyContent:
                                                          "space-between",
                                                        width: 50,
                                                        flexDirection: "row",
                                                        marginTop: -9,
                                                      }}
                                                    >
                                                      <Text
                                                        style={{
                                                          color: "white",
                                                          fontSize: hp(1.5),
                                                          paddingLeft: 3,
                                                        }}
                                                      >
                                                        {
                                                          item.box_purchase_display_short_name
                                                        }
                                                      </Text>
                                                    </View>
                                                    <Text
                                                      style={{
                                                        textAlign: "center",
                                                        color: "white",
                                                      }}
                                                    >
                                                      {a}
                                                    </Text>
                                                  </View>
                                                </TouchableOpacity>
                                              </View>
                                            );
                                          }
                                        }
                                      )
                                    ) : (
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.state.selectSquare.includes(
                                            d[i].value[index]
                                          )
                                            ? this.removeSquare(
                                                d[i].value[index]
                                              )
                                            : this.acceptSquare(
                                                d[i].value[index]
                                              );
                                        }}
                                      >
                                        <View
                                          style={{
                                            backgroundColor: this.state.selectSquare.includes(
                                              a
                                            )
                                              ? "#68bcbc"
                                              : "white",
                                            width: 50,
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                          }}
                                        >
                                          {this.state.selectSquare.includes(
                                            a
                                          ) ? (
                                            <View
                                              style={{
                                                justifyContent: "flex-end",
                                                width: 50,
                                                alignItems: "flex-end",
                                                alignContent: "flex-end",
                                              }}
                                            >
                                              <Icons
                                                name="check"
                                                size={13}
                                                color="white"
                                                style={{ marginTop: -10 }}
                                              />
                                            </View>
                                          ) : null}
                                          <Text
                                            style={{
                                              textAlign: "center",
                                              color: this.state.selectSquare.includes(
                                                a
                                              )
                                                ? "white"
                                                : "black",
                                            }}
                                          >
                                            {a}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                    )}
                                  </View>
                                );
                              } else {
                                return (
                                  <View
                                    style={[
                                      styles.header2,
                                      { height: 40, marginTop: 0.5 },
                                    ]}
                                  >
                                    {this.state.squarebook.includes(a) ? (
                                      this.state.displayname.map(
                                        (item, index) => {
                                          if (
                                            item.box_purchase_number ==
                                            JSON.stringify(a)
                                          ) {
                                            return (
                                              <View>
                                                <TouchableOpacity
                                                  onPress={() =>
                                                    AlertUtil.show(
                                                      item.box_purchase_display_name
                                                    )
                                                  }
                                                >
                                                  <View
                                                    style={{
                                                      backgroundColor:
                                                        "#888888",
                                                      width: 50,
                                                      height: 39,
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      alignContent: "center",
                                                    }}
                                                  >
                                                    <View
                                                      style={{
                                                        justifyContent:
                                                          "space-between",
                                                        width: 50,
                                                        flexDirection: "row",
                                                        marginTop: -9,
                                                      }}
                                                    >
                                                      <Text
                                                        style={{
                                                          color: "white",
                                                          fontSize: hp(1.5),
                                                          paddingLeft: 3,
                                                        }}
                                                      >
                                                        {
                                                          item.box_purchase_display_short_name
                                                        }
                                                      </Text>
                                                    </View>
                                                    <Text
                                                      style={{
                                                        textAlign: "center",
                                                        color: "white",
                                                      }}
                                                    >
                                                      {a}
                                                    </Text>
                                                  </View>
                                                </TouchableOpacity>
                                              </View>
                                            );
                                          }
                                        }
                                      )
                                    ) : (
                                      <TouchableOpacity
                                        onPress={() => {
                                          this.state.selectSquare.includes(
                                            d[i].value[index]
                                          )
                                            ? this.removeSquare(
                                                d[i].value[index]
                                              )
                                            : this.acceptSquare(
                                                d[i].value[index]
                                              );
                                        }}
                                      >
                                        <View
                                          style={{
                                            backgroundColor: this.state.selectSquare.includes(
                                              a
                                            )
                                              ? "#68bcbc"
                                              : "white",
                                            width: 50,
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                          }}
                                        >
                                          {this.state.selectSquare.includes(
                                            a
                                          ) ? (
                                            <View
                                              style={{
                                                justifyContent: "flex-end",
                                                width: 50,
                                                alignItems: "flex-end",
                                                alignContent: "flex-end",
                                              }}
                                            >
                                              <Icons
                                                name="check"
                                                size={13}
                                                color="white"
                                                style={{ marginTop: -10 }}
                                              />
                                            </View>
                                          ) : null}
                                          <Text
                                            style={{
                                              textAlign: "center",
                                              color: this.state.selectSquare.includes(
                                                a
                                              )
                                                ? "white"
                                                : "black",
                                            }}
                                          >
                                            {a}
                                          </Text>
                                        </View>
                                      </TouchableOpacity>
                                    )}
                                  </View>
                                );
                              }
                            })}
                          </View>
                        );
                      }
                    } else {
                      return <View></View>;
                    }
                  })}
                </View>
              </ScrollView>
            </View>
            <View style={{ width: "95%", margin: 10, borderRadius: 3 }}>
              <TouchableOpacity
                onPress={() => this.dialogOpen()}
                style={styles.placebutton}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat-Bold",
                      fontSize: hp(3.8),
                      color: "white",
                    }}
                  >
                    {" "}
                    ACCEPT{" "}
                  </Text>
                  <View
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Montserrat-Semibold",
                        fontSize: hp(2.1),
                        color: "black",
                      }}
                    >
                      {" "}
                      Total Amount :{" "}
                    </Text>
                    <Image
                      source={require("../../../../images/buck_dark.png")}
                      style={{ height: 13, width: 13 }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Montserrat-Bold",
                        fontSize: hp(2.3),
                        color: "black",
                      }}
                    >
                      {this.state.valueofDialog}{" "}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Montserrat-Semibold",
                        fontSize: hp(2.1),
                        color: "black",
                      }}
                    >
                      ({this.state.selectSquare.length} Squares)
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={{ padding: 0 }}>
                                          <Text style={{ fontSize: 14, color: '#69bbbb', fontFamily: 'Montserrat-Semibold', padding: 5, textAlign: 'center', textDecorationLine: 'underline', textDecorationColor: "#888888" }} onPress={() => { this.setState({ Accepted: true }) }}>Not now,I think I'II pass</Text>
                                    </View> */}
            <View
              style={{
                backgroundColor: "#CCC",
                width: "95%",
                height: hp(7),
                margin: 10,
                borderRadius: 5,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ Accepted: true });
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
          </ScrollView>
        )}

        <ProgressLoader
          visible={this.state.loader}
          isModal={true}
          isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"}
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
  customSquareRequestStatus: state.serviceReducer.requestStatus,
  CustomSquareResponse: state.serviceReducer.response as CustomSquareResponse,
  customSquareError: state.serviceReducer.error,

  sendMsgRequestStatus: state.serviceReducer.requestStatus,
  sendMsgResponse: state.serviceReducer.response,
  sendMsgError: state.serviceReducer.error,
});

export default connect(mapStateToProps)(AcceptSquare);
