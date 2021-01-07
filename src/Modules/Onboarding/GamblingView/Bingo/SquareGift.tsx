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
var update = require("immutability-helper");
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
  key: "somethun",
  page_title: "CREATE BINGO",
};

interface G_ShareBingoViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus;
  getProfileResponse?: GetProfileResponse;
  getProfileError?: UDDAError;

  serviceKey?: string;
  listeners?: any;
}

interface G_ShareBingoViewState extends AppValidationComponentState {
  shift: any;
  loader: any;
  data: any;
  bingodata: any;
  detailmodel: any;
  shareDialog: any;
  Share_Show_Msg: any;
  MessageString: any;
  MessageUrl: any;
}

class G_ShareBingoView
  extends AppValidationComponent<G_ShareBingoViewProps, G_ShareBingoViewState>
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

  constructor(props: G_ShareBingoViewProps) {
    super(props);
    this.touchable = createRef();
    this.state = {
      shift: new Animated.Value(0),
      loader: false,
      detailmodel: false,
      data: ["1", "2", "3", "4", "5"],
      bingodata: ["1", "2", "3", "4", "5"],
      shareDialog: false,
      Share_Show_Msg: "",
      MessageString: "",
      MessageUrl: "",
    };
  }

  async componentDidMount() {
    var that = this;
    console.log("bingo>>>" + this.props.navigation.state.params.bingo_data);
    that.setState({
      bingodata: that.props.navigation.state.params.bingo_data.cardData,
    });
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

  createBingo() {
    console.log(
      "bindo id id >>>" + this.props.navigation.state.params.bingo_data.bingo_id
    );
    this.props.navigation.state.params.bingo_data.bingo_id;
    this.shareOption(
      this.props.navigation.state.params.bingo_data.bingo_id,
      "bingo"
    );

    return;
    this.setState({ loader: true });
    var datetime = new Date(
      this.state.date.split("-").join("/") + " " + this.state.time
    ).toISOString();
    var params: any = {
      bingo_title: this.state.bingotitle,
      joining_fees: this.state.contestfee,
      bingo_expired_on: datetime,
      bingo_share_type: this.state.poolType ? 1 : 0,
      selected_gifts: this.state.selectedgift.toString(),
      is_bet: "0",
    };
    console.log("create bingo paramete", params);
    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/custom_bingo/place_bet",
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
        this.setState({ loader: false });
        //   this.setState({ customProbBetList: responseJson.data });
        if (responseJson.message == "success") {
          this.shareOption(responseJson, "bingo");
          //AlertUtil.show(responseJson.message);
          //    this.setState({ bingotitle: '' });
          //     this.setState({ date: '' });
          //     this.setState({ time: '' });
          //     this.setState({ contestfee: '' });
          //     this.setState({ selectedgift: [] });
          //     this.setState({ poolType: false });
        } else {
          AlertUtil.show(responseJson.message);
          //   this.setState({ bingotitle: '' });
          // this.setState({ date: '' });
          // this.setState({ time: '' });
          // this.setState({ contestfee: '' });
          // this.setState({ selectedgift: [] });
          // this.setState({ poolType: false });
        }

        console.log("create bingo response" + JSON.stringify(responseJson));
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

  async shareOption(item: any, bettype: any) {
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

    if (bettype == "bingo") {
      url = "http://bet.udda.com/index.php?t=bingo&i=" + item;
      // url = "http://bet.udda.com/index.php?t=bingot&i=" + 143;
      //url = "https://bet.udda.com/coming-soon/"

      url = await this.referralservice.getReferralUrl(
        url,
        this.my_referral_code,
        "U"
      ); // Getting Dynamic Share Link From Firebase
      referStr =
        "\nUse Referral Code " + this.my_referral_code + " to sign up.";

      MessageString = "You have been invited to a Bingo through UDDA.";
      MessageString += referStr;

      ShowString = (
        <Text style={{ fontFamily: "Montserrat-Regular", fontSize: hp(1.4) }}>
          {" "}
          You have been invited to a Bingo through UDDA. Would you like to
          accept the Bet? {referStr}{" "}
        </Text>
      );

      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });

      this.setState({ MessageUrl: url });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
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
          console.log("shared in activity");
          // shared with activity type of result.activityType
          RouterBuilder.resetRouteTo(
            AppScreens.Gambling_ApplicationStack,
            this.props
          );
        } else {
          this.setState({ shareDialog: false });
          console.log("shared");
          // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
          RouterBuilder.resetRouteTo(
            AppScreens.Gambling_ApplicationStack,
            this.props
          );
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        this.setState({ shareDialog: false });
        // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
        RouterBuilder.resetRouteTo(
          AppScreens.Gambling_ApplicationStack,
          this.props
        );
        console.log("share  in dismiss");
        // dismissed
      }
    } catch (error) {
      this.setState({ shareDialog: false });
      RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
      console.log("share error in catch " + JSON.stringify(error));
      //alert(error.message);
    }
  };

  closeShareDialog() {
    this.setState({ shareDialog: false });
    setTimeout(function () {
      AlertUtil.show("Bet Placed Successfully");
    }, 2000);
    RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
  }

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
  componentWillReceiveProps(nextProps: G_ShareBingoViewProps) {
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
      } else if (nextProps.serviceKey === ServiceKeys.CustomSquareName) {
        // Custom bet response
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false;
            // console.log("betaFriendResponse " + JSON.stringify(nextProps.CustomSquareResponse));
            var response = nextProps.CustomSquareResponse!.response;
            if (response.message == "success") {
              // this.getProfile();
              console.log("custom bet success");

              //this.onChangeQuarter('3');

              //  this.shareOption(response, 'CUSTOMSQUARE');
            } else {
              AlertUtil.show("Unsuccesful :" + response.message);
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
    //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
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

  // -----------------------------------------------Design and Design Methods---------------------------------------

  render() {
    return (
      <Container
        title={"CREATE BINGO"}
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
        {/* -------------------------------- Share Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.shareDialog}
          title=""
          onTouchOutside={() => this.closeShareDialog()}
        >
          <View style={{ backgroundColor: "white" }}>
            <View style={{ justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: "88%",
                    alignItems: "center",
                    marginTop: "2%",
                  }}
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
                <View
                  style={{ width: "7%", alignItems: "flex-end", padding: "1%" }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.closeShareDialog();
                    }}
                  >
                    <View>
                      <Image
                        source={require("../../../../images/close.png")}
                        style={{ height: 13, width: 13, alignSelf: "flex-end" }}
                      ></Image>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  backgroundColor: "#cccccc",
                  height: 1,
                  marginTop: 1,
                  padding: 0,
                }}
              ></View>

              <View style={{ justifyContent: "center", padding: 10 }}>
                <Text
                  style={{
                    padding: 1,
                    fontFamily: "Montserrat-SemiBold",
                    fontSize: hp(1.7),
                    marginTop: 3,
                    color: "#222",
                  }}
                >
                  Message
                </Text>

                <View
                  style={{
                    padding: 1,
                    borderColor: "#cccccc",
                    borderWidth: 1,
                    marginTop: 5,
                  }}
                >
                  <TextInput
                    multiline={true}
                    onChangeText={(value) => this.onChangeShareMsg(value)}
                    editable={true}
                    style={{ padding: 8, width: "100%", height: "auto" }}
                  >
                    {this.state.Share_Show_Msg}
                  </TextInput>
                </View>
                <Text
                  style={{
                    padding: 1,
                    fontFamily: "Montserrat-Regular",
                    fontSize: hp(1.5),
                    marginTop: 5,
                    color: "#222",
                  }}
                >
                  {this.state.MessageUrl}
                </Text>
                <BigButton
                  title="Share Now"
                  style={[styles.verify_button, { backgroundColor: "#68bcbc" }]}
                  textStyle={styles.verify_button_text_style}
                  listener={() => {
                    this.shareNow();
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Montserrat-SemiBold",
                    textAlign: "center",
                    fontSize: hp(1.5),
                    marginTop: 5,
                    color: "red",
                  }}
                >
                  {this.state.BetPromotionalMsg}
                </Text>
              </View>
            </View>
          </View>
        </Dialog>

        <View style={{ flex: 1 }}>
          <ProgressLoader
            visible={this.state.loader}
            isModal={true}
            isHUD={true}
            hudColor={"#68bcbc"}
            color={"#FFFFFF"}
          />

          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.state.bingodata.map((item, i) => {
              // console.log('myindex-----',i)
              return (
                <View style={[styles.squareBox]}>
                  <ImageBackground
                    source={
                      i == 12
                        ? require("../../../../images/gifts_bg/bingo.png")
                        : require("../../../../images/gifts_bg/Baby-Book.png")
                    }
                    resizeMode="stretch"
                    style={[styles.itemCenter, { width: "90%", height: "90%" }]}
                  >
                    <TouchableOpacity
                      style={[
                        styles.itemCenter,
                        { width: "100%", height: "100%" },
                      ]}
                    >
                      <View>
                        <Text style={{ color: "#44a3bb", textAlign: "center" }}>
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
              { justifyContent: "center", alignItems: "center", marginTop: 15 },
            ]}
          >
            <TouchableHighlight
              style={[styles.createsquaare, { width: "95%", height: hp(7.0) }]}
              // onPress={() => this.showAlertDialog('2')}
              onPress={() => {
                this.createBingo();
              }}
              underlayColor="#fff"
            >
              <View>
                <Text style={[styles.createsquaaretext, { fontSize: hp(2.9) }]}>
                  Share Bingo
                </Text>
              </View>
            </TouchableHighlight>
          </View>

          <View
            style={[
              { justifyContent: "center", alignItems: "center", marginTop: 15 },
            ]}
          >
            <Text
              style={[
                styles.createsquaaretext,
                { fontSize: hp(2.0), color: "#b9b7b7" },
              ]}
            >
              {"Each participant will have a \n unique board"}
            </Text>
          </View>
        </View>
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
});

export default connect(mapStateToProps)(G_ShareBingoView);
