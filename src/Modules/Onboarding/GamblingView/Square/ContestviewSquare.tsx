import React, { createRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Platform,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
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
} from "react-native";
import styles from "./squarestyles";
import Container from "../../../../Components/Container";
import AppValidationComponent, {
  Field,
  AppValidationComponentState,
  AppValidationComponentProps,
} from "../../../../Util/AppValidationComponent";
import { FooterComponent } from "../../../../Components/CustomComponents/Footer/FooterComponent";
import AlertUtil from "../../../../Util/AlertUtil";
import AppConstants from "../../../../Util/Constants";
import SportsListComponent from "../../../../Components/CustomComponents/SportsListComponent";
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import Application from "../../../../Entities/Application";
import BigButton from "../../../../Components/Button/BigButton";
import RouterBuilder from "../../../../Router";
import SearchBox from "../../../../Components/CustomComponents/SearchBox/SearchBox";
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
import { FooterListner } from "../../../../Components/CustomComponents/Footer/SingleMatchScheduleWithTitleComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { Dialog } from "react-native-simple-dialogs";
import moment from "moment";
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
import UrlService from "../../../../Services/Core/ServiceURI";
import DateTimePicker from "react-native-modal-datetime-picker";
import ReferralService from "../../../../Services/Referral/ReferralService";
import LinearGradient from "react-native-linear-gradient";
import CustomBetAFriendRequest from "../../../../Services/Bets/CustomBetAFriendRequest";
import CustomBetAFriendResponseParser from "../../../../Services/Bets/CustomBetAFriendResponseParser";
import CustomBetAFriendResponse from "../../../../Services/Bets/CustomBetAFriendResponse";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
const { State: TextInputState } = TextInput;
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/MaterialIcons";
import Dash from "react-native-dash";
import CircleImage from "../../../../Components/CustomComponents/CircleImage";
import ImageViewer from "react-native-image-zoom-viewer";
import Orientation from "react-native-orientation";
import Popover from "react-native-popover-view";

var update = require("immutability-helper");

console.disableYellowBox = true;

const ProfilePageContent = {
  key: "somethun",
  page_title: "",
};

interface G_ContestSquareViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus;
  getProfileResponse?: GetProfileResponse;
  getProfileError?: UDDAError;

  feedbackRequestStatus?: ServiceRequestStatus;
  feedbackResponse?: FeedbackResponse;
  feedbackError?: UDDAError;

  betaFriendRequestStatus?: ServiceRequestStatus;
  betaFriendResponse?: BetAFriendResponse;
  betaFriendError?: UDDAError;

  placeBetRequestStatus?: ServiceRequestStatus;
  placeBetResponse?: PlaceBetResponse;
  placeBetError?: UDDAError;

  customBetaFriendRequestStatus?: ServiceRequestStatus;
  customBetaFriendResponse?: CustomBetAFriendResponse;
  customBetaFriendError?: UDDAError;

  serviceKey?: string;
  listeners?: any;
}

interface G_ContestSquareViewState extends AppValidationComponentState {
  shift?: any;
  squarelist?: any;
  searchData?: any;
  searchtext?: any;
  loader?: any;
  detailmodel?: any;
  userSquare?: any;
  SquareBooked?: any;
  Squaredata?: any;
  gamename?: any;
  gamedetail?: any;
  gamedetailtime?: any;
  sideteamname?: any;
  sideteamname1?: any;
  randomSquare?: any;
  quatervalue?: any;
  x_axis?: any;
  y_axis?: any;
  showzoom?: any;
  resultQuarterValue: any;
  BlackDialog: any;
  blackdialogDate: any;
  displayname: any;
  imagezoom: any;
}

const bottom_initial = 0;
class ContestSquare
  extends AppValidationComponent<
    G_ContestSquareViewProps,
    G_ContestSquareViewState
  >
  implements MenuIconListener, ISubheaderListener {
  private authorisationToken = Application.sharedApplication().user!
    .authenticationToken;
  private serviceRequestInProgress = false;
  public filterData: any;
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
      shift: new Animated.Value(0),
      squarelist: [],
      searchData: [],
      searchtext: "",
      loader: false,
      detailmodel: false,
      userSquare: [],
      SquareBooked: [],
      Squaredata: {},
      gamedetail: {},
      gamename: "",
      gamedetailtime: "",
      sideteamname: "",
      sideteamname1: [],
      quatervalue: "",
      randomSquare: [],
      x_axis: [],
      y_axis: [],
      showzoom: false,
      resultQuarterValue: "",
      BlackDialog: false,
      imagezoom: false,
      blackdialogDate: "",
      displayname: [],
    };
  }

  showPopover() {
    var new_time_stamp = this.state.gamedetail.bet_time_stamp * 1000;
    var formated_time = moment(new_time_stamp).format("MMMM DD,YYYY");
    this.setState({ blackdialogDate: formated_time });
    this.setState({ BlackDialog: true });
  }

  closePopover() {
    this.setState({ BlackDialog: false });
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
                          height: 40,
                          alignItems: "center",
                          alignContent: "center",
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
                            justifyContent: "flex-end",
                            alignContent: "flex-end",
                            alignItems: "flex-end",
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
                      <View
                        style={{
                          borderBottomColor: "#EEEEEE",
                          borderBottomWidth: hp(0.3),
                        }}
                      />
                    </View>
                  ) : (
                    <View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          height: 40,
                          alignContent: "center",
                          alignItems: "center",
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
                            justifyContent: "flex-end",
                            alignContent: "flex-end",
                            alignItems: "flex-end",
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
                      <View
                        style={{
                          borderBottomColor: "#EEEEEE",
                          borderBottomWidth: hp(0.3),
                        }}
                      />
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
        ". \nTap on “Game Details” to view more details. \nWould you like to accept the Bet?";
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

  componentWillUnmount() {
    //     AppState.removeEventListener('change', this._handleAppStateChange);
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  componentWillMount() {
    console.log("componentwillmount");
    Orientation.lockToPortrait();
    console.log("componentwillmount props", this.props);
    console.log(
      "componentwillmount props bet_id :--",
      this.props.navigation.state.params.params.bet_id
    );
    this.getSquaresList();
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

  getGameDetail() {
    this.setState({ loader: true });
    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/Custom_SquareGaming/game_detail/" +
        this.props.navigation.state.params.params.bet_id,
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

  getSquaresList() {
    this.setState({ loader: true });
    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/Custom_SquareGaming/contest_view_square_box_info/" +
        this.props.navigation.state.params.params.bet_id,
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
        //  this.setState({ squarelist: responseJson.data });
        this.setState({ Squaredata: responseJson.data.custom_square_info });
        this.setState({ displayname: responseJson.data.display_square_booked });
        this.setState({ SquareBooked: responseJson.data.square_booked });
        this.setState({ userSquare: responseJson.data.user_squares });
        this.setState({
          randomSquare: responseJson.data.random_square_numbers,
        });
        this.setState({
          gamename: responseJson.data.custom_square_info.home_team_name,
        });
        console.log("display_square_booked :   ", this.state.displayname);
        console.log(
          "random number :   " + JSON.stringify(this.state.randomSquare)
        );
        {
          responseJson.data.custom_square_info.select_quarter_type == "3"
            ? this.setState({ quatervalue: "Quarter 1" })
            : responseJson.data.custom_square_info.select_quarter_type == "2"
            ? this.setState({ quatervalue: "Quarter 2" })
            : this.setState({ quatervalue: "Final" });
        }
        // this.changeAxis('Quarter 3')
        {
          responseJson.data.custom_square_info.select_quarter_type == "3"
            ? this.changeAxis("Quarter 1")
            : responseJson.data.custom_square_info.select_quarter_type == "2"
            ? this.changeAxis("Half Only")
            : this.changeAxis("Final");
        }
        var a = responseJson.data.custom_square_info.away_team_name.split(" ");
        console.log("split of name ", a);
        var b = [];
        //  a.map((item,index)=>{
        //    { index == 0? b=item+'  ':b=b+item+'  '}
        //  })
        //  this.setState({ sideteamname: b });
        for (
          let i = 0;
          i < responseJson.data.custom_square_info.away_team_name.length;
          i++
        ) {
          b.push(responseJson.data.custom_square_info.away_team_name[i]);
        }
        this.setState({ sideteamname1: b });
        console.log("array of name ", this.state.sideteamname1);
        // //this.setState({flattext:[]})
        // this.setState({ searchData: responseJson.data });

        //  console.log('Success openplay Squaredata :  ',JSON.stringify(this.state.Squaredata.custom_square_info.game_name));
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
   // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
  }
  changeAxis(value) {
    this.setState({ quatervalue: value });

    if (value == "Quarter 1") {
      this.setState({ resultQuarterValue: "Quarter1" });
      this.setState({ x_axis: this.state.randomSquare[0].Quarter1.axis.x });
      this.setState({ y_axis: this.state.randomSquare[0].Quarter1.axis.y });
      this.setState({
        resultQuarterValue: this.state.randomSquare[0].Quarter1.winner_box,
      });
    } else if (value == "Quarter 2") {
      this.setState({ x_axis: this.state.randomSquare[1].Quarter2.axis.x });
      this.setState({ y_axis: this.state.randomSquare[1].Quarter2.axis.y });
      this.setState({
        resultQuarterValue: this.state.randomSquare[1].Quarter2.winner_box,
      });
    } else if (value == "Quarter 3") {
      this.setState({ x_axis: this.state.randomSquare[2].Quarter3.axis.x });
      this.setState({ y_axis: this.state.randomSquare[2].Quarter3.axis.y });

      this.setState({
        resultQuarterValue: this.state.randomSquare[2].Quarter3.winner_box,
      });
    } else if (value == "Quarter 4") {
      this.setState({ x_axis: this.state.randomSquare[3].Quarter4.axis.x });
      this.setState({ y_axis: this.state.randomSquare[3].Quarter4.axis.y });
      this.setState({
        resultQuarterValue: this.state.randomSquare[3].Quarter4.winner_box,
      });
    } else if (value == "Half Only") {
      this.setState({ x_axis: this.state.randomSquare[0].Quarter2.axis.x });
      this.setState({ y_axis: this.state.randomSquare[0].Quarter2.axis.y });
      this.setState({
        resultQuarterValue: this.state.randomSquare[0].Quarter2.winner_box,
      });
    } else if (value == "Final Only") {
      this.setState({
        resultQuarterValue: this.state.randomSquare[1].Quarter4.winner_box,
      });
      this.setState({ x_axis: this.state.randomSquare[1].Quarter4.axis.x });
      this.setState({ y_axis: this.state.randomSquare[1].Quarter4.axis.y });
    } else if (value == "Final") {
      this.setState({ x_axis: this.state.randomSquare[0].FINAL.axis.x });
      this.setState({ y_axis: this.state.randomSquare[0].FINAL.axis.y });
      this.setState({
        resultQuarterValue: this.state.randomSquare[0].FINAL.winner_box,
      });
    }

    console.log("my quarter value", this.state.resultQuarterValue);
  }

  cancelSquare() {
    console.log("ashish square id : ", this.state.Squaredata.id);
    this.setState({ loader: true });

    var that = this;
    var params: any = {
      custom_square_id: this.state.Squaredata.id,
    };

    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/Custom_SquareGaming/cancel_custom_squares",
      {
        method: "POST",
        headers: {
          authorisation: this.authorisationToken,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        that.setState({ loader: false });
        console.log("cancel Square response" + JSON.stringify(responseJson));
        this.getSquaresList();
        //  AlertUtil.show(responseJson.message);

        if (responseJson.message == "Access Expired.") {
          that.setState({ loader: false });
          AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // LogoutUtill.logoutButtonPressed(this.props);
        }
      })
      .catch((error) => {
        that.setState({ loader: false });
        console.log(error);
      });
  }
  render() {
    const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let pool =
      this.state.Squaredata.select_quarter_type == "3"
        ? [
            { value: "Quarter 1" },
            { value: "Quarter 2" },
            { value: "Quarter 3" },
            { value: "Quarter 4" },
          ]
        : this.state.Squaredata.select_quarter_type == "2"
        ? [{ value: "Half Only" }, { value: "Final Only" }]
        : [{ value: "Final" }];
    var a = 0;
    var b = [1, 2, 3, 99, 32, 55, 66, 78];
    var c = [1, 20, 30, 9, 30, 5, 68, 77];
    var x = [1, 20, 30, 9, 30, 5, 68, 77, 55, 11];
    // var b =[]
    // var c =[]

    return this.state.showzoom ? (
      <View style={{ width: "100%", marginTop: 32 }}>
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
                  // dropdownPosition={-5}
                  dropdownPosition={
                    this.state.Squaredata.select_quarter_type == "3"
                      ? -5
                      : this.state.Squaredata.select_quarter_type == "2"
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
                  fontSize={hp(1.8)}
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
                {this.state.gamename} (H)
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
            {/* <View style={[styles.sidetext,{width:'6%'}]}>
      <Text style={{ width:15,fontSize: 15, color: 'white', fontFamily: 'Montserrat-Bold',textAlign:'center' }}> {this.state.sideteamname}</Text>
      </View> */}
            <ScrollView scrollEnabled={true} horizontal={true}>
              <View style={{ backgroundColor: "#EEEEEE", padding: 0 }}>
                {data.map((item, i) => {
                  if (i < 10) {
                    if (i == 0) {
                      return (
                        <View style={{ flexDirection: "row" }}>
                          {data.map((item, index) => {
                            a = a + 1;
                            if (index == 0) {
                              return (
                                <View style={[styles.header1, { width: 70 }]}>
                                  {this.state.SquareBooked.length == 100 ? (
                                    <View
                                      style={{
                                        justifyContent: "center",
                                        alignContent: "center",
                                        alignItems: "center",
                                        width: 70,
                                      }}
                                    >
                                      <Text style={{ textAlign: "center" }}>
                                        {this.state.x_axis[index]}
                                      </Text>
                                    </View>
                                  ) : null}
                                  {
                                    <View style={{ flexDirection: "row" }}>
                                      {this.state.SquareBooked.length == 100 ? (
                                        <View
                                          style={{
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                            width: 20,
                                          }}
                                        >
                                          <Text style={{ textAlign: "center" }}>
                                            {this.state.y_axis[index]}
                                          </Text>
                                        </View>
                                      ) : null}
                                      {this.state.SquareBooked.includes(
                                        JSON.stringify(a)
                                      ) ? (
                                        this.state.displayname.map(
                                          (item, i) => {
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
                                                          this.state
                                                            .resultQuarterValue ==
                                                          JSON.stringify(a)
                                                            ? "#d8480f"
                                                            : this.state.userSquare.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "#68bcbc"
                                                            : this.state.SquareBooked.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "#888888"
                                                            : "white",
                                                        width: 50,
                                                        height: 39,
                                                        justifyContent:
                                                          "center",
                                                        alignItems: "center",
                                                        alignContent: "center",
                                                      }}
                                                    >
                                                      {
                                                        <View
                                                          style={{
                                                            justifyContent:
                                                              "space-between",
                                                            width: 50,
                                                            flexDirection:
                                                              "row",
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
                                                          {this.state.userSquare.includes(
                                                            JSON.stringify(a)
                                                          ) ? (
                                                            <Icons
                                                              name="check"
                                                              size={13}
                                                              color="white"
                                                              style={{
                                                                marginTop: 0,
                                                              }}
                                                            />
                                                          ) : null}
                                                        </View>
                                                      }
                                                      <Text
                                                        style={{
                                                          textAlign: "center",
                                                          color: this.state.userSquare.includes(
                                                            JSON.stringify(a)
                                                          )
                                                            ? "white"
                                                            : this.state.SquareBooked.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "white"
                                                            : "black",
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
                                        <View
                                          style={{
                                            backgroundColor:
                                              this.state.resultQuarterValue ==
                                              JSON.stringify(a)
                                                ? "#d8480f"
                                                : this.state.userSquare.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "#68bcbc"
                                                : this.state.SquareBooked.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "#888888"
                                                : "white",
                                            width: 50,
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                          }}
                                        >
                                          {this.state.userSquare.includes(
                                            JSON.stringify(a)
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
                                              color: this.state.userSquare.includes(
                                                JSON.stringify(a)
                                              )
                                                ? "white"
                                                : this.state.SquareBooked.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "white"
                                                : "black",
                                            }}
                                          >
                                            {a}
                                          </Text>
                                        </View>
                                      )}
                                    </View>
                                  }
                                </View>
                              );
                            } else {
                              return (
                                <View style={[styles.header1]}>
                                  {this.state.SquareBooked.length == 100 ? (
                                    <View
                                      style={{
                                        justifyContent: "center",
                                        alignContent: "center",
                                        alignItems: "center",
                                        width: 50,
                                      }}
                                    >
                                      <Text style={{ textAlign: "center" }}>
                                        {this.state.x_axis[index]}
                                      </Text>
                                    </View>
                                  ) : null}
                                  {this.state.SquareBooked.includes(
                                    JSON.stringify(a)
                                  ) ? (
                                    this.state.displayname.map((item, i) => {
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
                                                    this.state
                                                      .resultQuarterValue ==
                                                    JSON.stringify(a)
                                                      ? "#d8480f"
                                                      : this.state.userSquare.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "#68bcbc"
                                                      : this.state.SquareBooked.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "#888888"
                                                      : "white",
                                                  width: 50,
                                                  height: 39,
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  alignContent: "center",
                                                }}
                                              >
                                                {
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
                                                    {this.state.userSquare.includes(
                                                      JSON.stringify(a)
                                                    ) ? (
                                                      <Icons
                                                        name="check"
                                                        size={13}
                                                        color="white"
                                                        style={{ marginTop: 0 }}
                                                      />
                                                    ) : null}
                                                  </View>
                                                }
                                                <Text
                                                  style={{
                                                    textAlign: "center",
                                                    color: this.state.userSquare.includes(
                                                      JSON.stringify(a)
                                                    )
                                                      ? "white"
                                                      : this.state.SquareBooked.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "white"
                                                      : "black",
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
                                    <View
                                      style={{
                                        backgroundColor:
                                          this.state.resultQuarterValue ==
                                          JSON.stringify(a)
                                            ? "#d8480f"
                                            : this.state.userSquare.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "#68bcbc"
                                            : this.state.SquareBooked.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "#888888"
                                            : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.userSquare.includes(
                                        JSON.stringify(a)
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
                                          color: this.state.userSquare.includes(
                                            JSON.stringify(a)
                                          )
                                            ? "white"
                                            : this.state.SquareBooked.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "white"
                                            : "black",
                                        }}
                                      >
                                        {a}
                                      </Text>
                                    </View>
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
                            if (index == 0) {
                              return (
                                <View
                                  style={[
                                    styles.header2,
                                    { height: 40, width: 70, marginTop: 0.5 },
                                  ]}
                                >
                                  {
                                    <View style={{ flexDirection: "row" }}>
                                      {this.state.SquareBooked.length == 100 ? (
                                        <View
                                          style={{
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                            width: 20,
                                          }}
                                        >
                                          <Text style={{ textAlign: "center" }}>
                                            {this.state.y_axis[i]}
                                          </Text>
                                        </View>
                                      ) : null}
                                      {this.state.SquareBooked.includes(
                                        JSON.stringify(a)
                                      ) ? (
                                        this.state.displayname.map(
                                          (item, i) => {
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
                                                          this.state
                                                            .resultQuarterValue ==
                                                          JSON.stringify(a)
                                                            ? "#d8480f"
                                                            : this.state.userSquare.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "#68bcbc"
                                                            : this.state.SquareBooked.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "#888888"
                                                            : "white",
                                                        width: 50,
                                                        height: 39,
                                                        justifyContent:
                                                          "center",
                                                        alignItems: "center",
                                                        alignContent: "center",
                                                      }}
                                                    >
                                                      {
                                                        <View
                                                          style={{
                                                            justifyContent:
                                                              "space-between",
                                                            width: 50,
                                                            flexDirection:
                                                              "row",
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
                                                          {this.state.userSquare.includes(
                                                            JSON.stringify(a)
                                                          ) ? (
                                                            <Icons
                                                              name="check"
                                                              size={13}
                                                              color="white"
                                                              style={{
                                                                marginTop: 0,
                                                              }}
                                                            />
                                                          ) : null}
                                                        </View>
                                                      }
                                                      <Text
                                                        style={{
                                                          textAlign: "center",
                                                          color: this.state.userSquare.includes(
                                                            JSON.stringify(a)
                                                          )
                                                            ? "white"
                                                            : this.state.SquareBooked.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "white"
                                                            : "black",
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
                                        <View
                                          style={{
                                            backgroundColor:
                                              this.state.resultQuarterValue ==
                                              JSON.stringify(a)
                                                ? "#d8480f"
                                                : this.state.userSquare.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "#68bcbc"
                                                : this.state.SquareBooked.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "#888888"
                                                : "white",
                                            width: 50,
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                          }}
                                        >
                                          {this.state.userSquare.includes(
                                            JSON.stringify(a)
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
                                              color: this.state.userSquare.includes(
                                                JSON.stringify(a)
                                              )
                                                ? "white"
                                                : this.state.SquareBooked.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "white"
                                                : "black",
                                            }}
                                          >
                                            {a}
                                          </Text>
                                        </View>
                                      )}
                                    </View>
                                  }
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
                                  {this.state.SquareBooked.includes(
                                    JSON.stringify(a)
                                  ) ? (
                                    this.state.displayname.map((item, i) => {
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
                                                    this.state
                                                      .resultQuarterValue ==
                                                    JSON.stringify(a)
                                                      ? "#d8480f"
                                                      : this.state.userSquare.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "#68bcbc"
                                                      : this.state.SquareBooked.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "#888888"
                                                      : "white",
                                                  width: 50,
                                                  height: 39,
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  alignContent: "center",
                                                }}
                                              >
                                                {
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
                                                    {this.state.userSquare.includes(
                                                      JSON.stringify(a)
                                                    ) ? (
                                                      <Icons
                                                        name="check"
                                                        size={13}
                                                        color="white"
                                                        style={{ marginTop: 0 }}
                                                      />
                                                    ) : null}
                                                  </View>
                                                }
                                                <Text
                                                  style={{
                                                    textAlign: "center",
                                                    color: this.state.userSquare.includes(
                                                      JSON.stringify(a)
                                                    )
                                                      ? "white"
                                                      : this.state.SquareBooked.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "white"
                                                      : "black",
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
                                    <View
                                      style={{
                                        backgroundColor:
                                          this.state.resultQuarterValue ==
                                          JSON.stringify(a)
                                            ? "#d8480f"
                                            : this.state.userSquare.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "#68bcbc"
                                            : this.state.SquareBooked.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "#888888"
                                            : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.userSquare.includes(
                                        JSON.stringify(a)
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
                                          color: this.state.userSquare.includes(
                                            JSON.stringify(a)
                                          )
                                            ? "white"
                                            : this.state.SquareBooked.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "white"
                                            : "black",
                                        }}
                                      >
                                        {a}
                                      </Text>
                                    </View>
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
        </ScrollView>
      </View>
    ) : (
      <Container
        title={"FOOTBALL SQUARES"}
        isHeader={this.state.showzoom ? false : true}
        isSubHeader={this.state.showzoom ? false : true}
        isTitle={false}
        //  showIndicator={this.serviceRequestInProgress}
        menuIconListener={this}
        LogoIconListener={this}
        availableBalanceListener={this}
        openPlaysListener={this}
        coveredPlaysListener={this}
        accountNameListener={this}
        isSetting={false}
      >
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
                    //  source={require('../../../../images/winner_trophy.png')}
                    source={{uri:this.state.gamedetail.qr_code}}
                     
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
                   {this.state.gamedetail.qr_code && <View
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
          {this.state.BlackDialog && this.getblackDialog()}
        </Modal>

        {/* {this.state.BlackDialog && this.getblackDialog()} */}
        {/* end ui of game details */}
        {this.state.showzoom ? null : (
          <View style={styles.customhead}>
             <View
              style={{
                // alignContent: "flex-end",
                // alignItems: "flex-end",
                justifyContent: 'center',
                width: "10%",
              }}
            >
               <Icons name="arrow-back" size={30} color="black" 
                            // onPress={() => RouterBuilder.replaceRouteTo(AppScreens.G_StandingList, this.props)}
                            onPress={() => this.props.navigation.goBack(null)}
                             />
            </View>
            <View
              style={{
                alignContent: "flex-end",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                width: "60%",
              }}
            >
              <Text style={styles.customheadtext}>FOOTBALL SQUARES</Text>
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
              <View style={{ width: "70%", marginRight: 6 }}>
                <Text style={[styles.customheadtext1]}>Squares Details</Text>
              </View>
              <View
                style={[
                  styles.table_title_info_container,
                  { marginBottom: hp(1.8), marginRight: 4 },
                ]}
              >
                <Text
                  style={styles.table_title_info_text}
                  //   onPress={()=>{this.setState({detailmodel:true})}}
                >
                  {" "}
                  i{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
                  // dropdownPosition={-5}
                  dropdownPosition={
                    this.state.Squaredata.select_quarter_type == "3"
                      ? -5
                      : this.state.Squaredata.select_quarter_type == "2"
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
                  fontSize={hp(1.7)}
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
                {this.state.gamename} (H)
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
                  {this.state.sideteamname1.map((item,index)=>{
                    return(                     
                      <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Bold',textAlign:'center' }}> {item}</Text>
                    )
                  })}
                {/* <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Bold',textAlign:'center' }}> {'1'}</Text>
                <Text style={{ fontSize: 15, color: 'white', fontFamily: 'Montserrat-Bold',textAlign:'center' }}> {'1'}</Text> 
                </View> */}
            <ScrollView scrollEnabled={true} horizontal={true}>
              <View style={{ backgroundColor: "#EEEEEE", padding: 0 }}>
                {data.map((item, i) => {
                  if (i < 10) {
                    if (i == 0) {
                      return (
                        <View style={{ flexDirection: "row" }}>
                          {data.map((item, index) => {
                            a = a + 1;
                            if (index == 0) {
                              return (
                                <View style={[styles.header1, { width: 70 }]}>
                                  {this.state.SquareBooked.length == 100 ? (
                                    <View
                                      style={{
                                        justifyContent: "center",
                                        alignContent: "center",
                                        alignItems: "center",
                                        width: 70,
                                      }}
                                    >
                                      <Text style={{ textAlign: "center" }}>
                                        {this.state.x_axis[index]}
                                      </Text>
                                    </View>
                                  ) : null}
                                  {
                                    <View style={{ flexDirection: "row" }}>
                                      {this.state.SquareBooked.length == 100 ? (
                                        <View
                                          style={{
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                            width: 20,
                                          }}
                                        >
                                          <Text style={{ textAlign: "center" }}>
                                            {this.state.y_axis[index]}
                                          </Text>
                                        </View>
                                      ) : null}
                                      {this.state.SquareBooked.includes(
                                        JSON.stringify(a)
                                      ) ? (
                                        this.state.displayname.map(
                                          (item, i) => {
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
                                                          this.state
                                                            .resultQuarterValue ==
                                                          JSON.stringify(a)
                                                            ? "#d8480f"
                                                            : this.state.userSquare.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "#68bcbc"
                                                            : this.state.SquareBooked.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "#888888"
                                                            : "white",
                                                        width: 50,
                                                        height: 39,
                                                        justifyContent:
                                                          "center",
                                                        alignItems: "center",
                                                        alignContent: "center",
                                                      }}
                                                    >
                                                      {
                                                        <View
                                                          style={{
                                                            justifyContent:
                                                              "space-between",
                                                            width: 50,
                                                            flexDirection:
                                                              "row",
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
                                                          {this.state.userSquare.includes(
                                                            JSON.stringify(a)
                                                          ) ? (
                                                            <Icons
                                                              name="check"
                                                              size={13}
                                                              color="white"
                                                              style={{
                                                                marginTop: 0,
                                                              }}
                                                            />
                                                          ) : null}
                                                        </View>
                                                      }
                                                      <Text
                                                        style={{
                                                          textAlign: "center",
                                                          color: this.state.userSquare.includes(
                                                            JSON.stringify(a)
                                                          )
                                                            ? "white"
                                                            : this.state.SquareBooked.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "white"
                                                            : "black",
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
                                        <View
                                          style={{
                                            backgroundColor:
                                              this.state.resultQuarterValue ==
                                              JSON.stringify(a)
                                                ? "#d8480f"
                                                : this.state.userSquare.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "#68bcbc"
                                                : this.state.SquareBooked.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "#888888"
                                                : "white",
                                            width: 50,
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                          }}
                                        >
                                          {this.state.userSquare.includes(
                                            JSON.stringify(a)
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
                                              color: this.state.userSquare.includes(
                                                JSON.stringify(a)
                                              )
                                                ? "white"
                                                : this.state.SquareBooked.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "white"
                                                : "black",
                                            }}
                                          >
                                            {a}
                                          </Text>
                                        </View>
                                      )}
                                    </View>
                                  }
                                </View>
                              );
                            } else {
                              return (
                                <View style={[styles.header1]}>
                                  {this.state.SquareBooked.length == 100 ? (
                                    <View
                                      style={{
                                        justifyContent: "center",
                                        alignContent: "center",
                                        alignItems: "center",
                                        width: 50,
                                      }}
                                    >
                                      <Text style={{ textAlign: "center" }}>
                                        {this.state.x_axis[index]}
                                      </Text>
                                    </View>
                                  ) : null}
                                  {this.state.SquareBooked.includes(
                                    JSON.stringify(a)
                                  ) ? (
                                    this.state.displayname.map((item, i) => {
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
                                                    this.state
                                                      .resultQuarterValue ==
                                                    JSON.stringify(a)
                                                      ? "#d8480f"
                                                      : this.state.userSquare.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "#68bcbc"
                                                      : this.state.SquareBooked.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "#888888"
                                                      : "white",
                                                  width: 50,
                                                  height: 39,
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  alignContent: "center",
                                                }}
                                              >
                                                {
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
                                                    {this.state.userSquare.includes(
                                                      JSON.stringify(a)
                                                    ) ? (
                                                      <Icons
                                                        name="check"
                                                        size={13}
                                                        color="white"
                                                        style={{ marginTop: 0 }}
                                                      />
                                                    ) : null}
                                                  </View>
                                                }
                                                <Text
                                                  style={{
                                                    textAlign: "center",
                                                    color: this.state.userSquare.includes(
                                                      JSON.stringify(a)
                                                    )
                                                      ? "white"
                                                      : this.state.SquareBooked.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "white"
                                                      : "black",
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
                                    <View
                                      style={{
                                        backgroundColor:
                                          this.state.resultQuarterValue ==
                                          JSON.stringify(a)
                                            ? "#d8480f"
                                            : this.state.userSquare.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "#68bcbc"
                                            : this.state.SquareBooked.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "#888888"
                                            : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.userSquare.includes(
                                        JSON.stringify(a)
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
                                          color: this.state.userSquare.includes(
                                            JSON.stringify(a)
                                          )
                                            ? "white"
                                            : this.state.SquareBooked.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "white"
                                            : "black",
                                        }}
                                      >
                                        {a}
                                      </Text>
                                    </View>
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
                            if (index == 0) {
                              return (
                                <View
                                  style={[
                                    styles.header2,
                                    { height: 40, width: 70, marginTop: 0.5 },
                                  ]}
                                >
                                  {
                                    <View style={{ flexDirection: "row" }}>
                                      {this.state.SquareBooked.length == 100 ? (
                                        <View
                                          style={{
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                            width: 20,
                                          }}
                                        >
                                          <Text style={{ textAlign: "center" }}>
                                            {this.state.y_axis[i]}
                                          </Text>
                                        </View>
                                      ) : null}
                                      {this.state.SquareBooked.includes(
                                        JSON.stringify(a)
                                      ) ? (
                                        this.state.displayname.map(
                                          (item, i) => {
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
                                                          this.state
                                                            .resultQuarterValue ==
                                                          JSON.stringify(a)
                                                            ? "#d8480f"
                                                            : this.state.userSquare.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "#68bcbc"
                                                            : this.state.SquareBooked.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "#888888"
                                                            : "white",
                                                        width: 50,
                                                        height: 39,
                                                        justifyContent:
                                                          "center",
                                                        alignItems: "center",
                                                        alignContent: "center",
                                                      }}
                                                    >
                                                      {
                                                        <View
                                                          style={{
                                                            justifyContent:
                                                              "space-between",
                                                            width: 50,
                                                            flexDirection:
                                                              "row",
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
                                                          {this.state.userSquare.includes(
                                                            JSON.stringify(a)
                                                          ) ? (
                                                            <Icons
                                                              name="check"
                                                              size={13}
                                                              color="white"
                                                              style={{
                                                                marginTop: 0,
                                                              }}
                                                            />
                                                          ) : null}
                                                        </View>
                                                      }
                                                      <Text
                                                        style={{
                                                          textAlign: "center",
                                                          color: this.state.userSquare.includes(
                                                            JSON.stringify(a)
                                                          )
                                                            ? "white"
                                                            : this.state.SquareBooked.includes(
                                                                JSON.stringify(
                                                                  a
                                                                )
                                                              )
                                                            ? "white"
                                                            : "black",
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
                                        <View
                                          style={{
                                            backgroundColor:
                                              this.state.resultQuarterValue ==
                                              JSON.stringify(a)
                                                ? "#d8480f"
                                                : this.state.userSquare.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "#68bcbc"
                                                : this.state.SquareBooked.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "#888888"
                                                : "white",
                                            width: 50,
                                            height: 39,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center",
                                          }}
                                        >
                                          {this.state.userSquare.includes(
                                            JSON.stringify(a)
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
                                              color: this.state.userSquare.includes(
                                                JSON.stringify(a)
                                              )
                                                ? "white"
                                                : this.state.SquareBooked.includes(
                                                    JSON.stringify(a)
                                                  )
                                                ? "white"
                                                : "black",
                                            }}
                                          >
                                            {a}
                                          </Text>
                                        </View>
                                      )}
                                    </View>
                                  }
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
                                  {this.state.SquareBooked.includes(
                                    JSON.stringify(a)
                                  ) ? (
                                    this.state.displayname.map((item, i) => {
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
                                                    this.state
                                                      .resultQuarterValue ==
                                                    JSON.stringify(a)
                                                      ? "#d8480f"
                                                      : this.state.userSquare.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "#68bcbc"
                                                      : this.state.SquareBooked.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "#888888"
                                                      : "white",
                                                  width: 50,
                                                  height: 39,
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  alignContent: "center",
                                                }}
                                              >
                                                {
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
                                                    {this.state.userSquare.includes(
                                                      JSON.stringify(a)
                                                    ) ? (
                                                      <Icons
                                                        name="check"
                                                        size={13}
                                                        color="white"
                                                        style={{ marginTop: 0 }}
                                                      />
                                                    ) : null}
                                                  </View>
                                                }
                                                <Text
                                                  style={{
                                                    textAlign: "center",
                                                    color: this.state.userSquare.includes(
                                                      JSON.stringify(a)
                                                    )
                                                      ? "white"
                                                      : this.state.SquareBooked.includes(
                                                          JSON.stringify(a)
                                                        )
                                                      ? "white"
                                                      : "black",
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
                                    <View
                                      style={{
                                        backgroundColor:
                                          this.state.resultQuarterValue ==
                                          JSON.stringify(a)
                                            ? "#d8480f"
                                            : this.state.userSquare.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "#68bcbc"
                                            : this.state.SquareBooked.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "#888888"
                                            : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.userSquare.includes(
                                        JSON.stringify(a)
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
                                          color: this.state.userSquare.includes(
                                            JSON.stringify(a)
                                          )
                                            ? "white"
                                            : this.state.SquareBooked.includes(
                                                JSON.stringify(a)
                                              )
                                            ? "white"
                                            : "black",
                                        }}
                                      >
                                        {a}
                                      </Text>
                                    </View>
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
          {this.state.Squaredata.creator_index == 0 ? (
            this.state.Squaredata.refund_event_state == null ? (
              this.state.Squaredata.final_result_score == null ? (
                <View style={{ width: "95%", margin: 10, borderRadius: 3 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.cancelSquare();
                    }}
                    style={[styles.placebutton1, { height: hp(7.0) }]}
                  >
                    <View>
                      <Text
                        style={{
                          textAlign: "center",
                          fontFamily: "Montserrat-Regular",
                          fontSize: hp(3.8),
                          color: "#68bcbc",
                        }}
                      >
                        {" "}
                        Cancel Squares
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null
            ) : null
          ) : null}
          {/* <View style={{padding:0}}>
            <Text style={{ fontSize: 14, color: '#69bbbb', fontFamily: 'Montserrat-Semibold',padding:5,textAlign:'center',textDecorationLine:'underline',textDecorationColor: "#888888"}} onPress={()=>{alert('hello udda')}}>Not now,I think I'II pass</Text>
            </View> */}
        </ScrollView>

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

  placeBetRequestStatus: state.serviceReducer.requestStatus,
  placeBetResponse: state.serviceReducer.response as PlaceBetResponse,
  placeBetError: state.serviceReducer.error,

  betaFriendRequestStatus: state.serviceReducer.requestStatus,
  betaFriendResponse: state.serviceReducer.response as BetAFriendResponse,
  betaFriendError: state.serviceReducer.error,

  customBetaFriendRequestStatus: state.serviceReducer.requestStatus,
  customBetaFriendResponse: state.serviceReducer
    .response as CustomBetAFriendResponse,
  customBetaFriendError: state.serviceReducer.error,

  feedbackRequestStatus: state.serviceReducer.requestStatus,
  feedbackResponse: state.serviceReducer.response as FeedbackResponse,
  feedbackError: state.serviceReducer.error,
});

export default connect(mapStateToProps)(ContestSquare);
