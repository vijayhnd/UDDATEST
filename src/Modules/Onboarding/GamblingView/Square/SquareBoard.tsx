import React from "react";
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
import { FooterComponent } from "../../../../Components/CustomComponents/Footer/FooterComponent";
import AlertUtil from "../../../../Util/AlertUtil";
import AppConstants from "../../../../Util/Constants";
import SportsListComponent from "../../../../Components/CustomComponents/SportsListComponent";
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";

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
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
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

import UrlService from "../../../../Services/Core/ServiceURI";
import DateTimePicker from "react-native-modal-datetime-picker";
import ReferralService from "../../../../Services/Referral/ReferralService";
import LinearGradient from "react-native-linear-gradient";
import CustomSquareRequest from "../../../../Services/Bets/CustomSquareRequest";
import CustomSquareResponseParser from "../../../../Services/Bets/CustomSquareResponseParser";
import CustomSquareResponse from "../../../../Services/Bets/CustomSquareResponse";

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
// import ImgToBase64 from 'react-native-image-base64';

var update = require("immutability-helper");

console.disableYellowBox = true;

const ProfilePageContent = {
  key: "somethun",
  page_title: "",
};

interface G_SquareBoardViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus;
  getProfileResponse?: GetProfileResponse;
  getProfileError?: UDDAError;
  customSquareRequestStatus?: ServiceRequestStatus;
  CustomSquareResponse?: CustomSquareResponse;
  customSquareError?: UDDAError;

  serviceKey?: string;
  listeners?: any;
}

interface G_SquareBoardViewState extends AppValidationComponentState {
  shift?: any;
  squarelist?: any;
  searchData?: any;
  searchtext?: any;
  loader?: any;
  b?: any;
  square_data: any;
  hometeam: any;
  awayteam: any;
  betamount: any;
  boxcount: any;
  shareDialog: any;
  MessageString: any;
  MessageUrl: any;
  BetPromotionalMsg: any;
  Share_Show_Msg: any;
  showzoom: any;

  dialogVisible: any;
  imageoverlay: any;
}

const bottom_initial = 0;
class SquareBoard
  extends AppValidationComponent<G_SquareBoardViewProps, G_SquareBoardViewState>
  implements MenuIconListener, ISubheaderListener, LogoIconListener {
  private authorisationToken = Application.sharedApplication().user!
    .authenticationToken;
  private serviceRequestInProgress = false;
  public filterData: any;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  public focusListener;
  private referralservice = new ReferralService(); //Vijay
  private my_referral_code = Application.sharedApplication().user!.profile
    .my_referral_code;
  /*  End Auto Racing and Horse Racing */

  constructor(props: any) {
    super(props);

    this.state = {
      shift: new Animated.Value(0),
      squarelist: [],
      searchData: [],
      searchtext: "",
      loader: false,
      showzoom: false,
      b: [],
      square_data: "",
      hometeam: "",
      awayteam: "",
      betamount: "0",
      boxcount: 0,
      shareDialog: "",
      MessageString: "",
      MessageUrl: "",
      BetPromotionalMsg: "",
      Share_Show_Msg: "",
      dialogVisible: false,
      imageoverlay: false,
    };
  }

  async saveoverlay() {
    try {
      await AsyncStorage.setItem("squareboardoverlay", "true");
      this.setState({ imageoverlay: false });
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
  async closecurrent() {
    this.setState({ imageoverlay: false });
    try {
      await AsyncStorage.setItem("squareboardoverlaycurrent", "true");
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
  async componentDidMount() {
    let userId = "";
    let current = "";
    var that = this;
    try {
      current = await AsyncStorage.getItem("squareboardoverlaycurrent");
      userId = await AsyncStorage.getItem("squareboardoverlay");

      console.log("squareboardoverlay response", userId);
      if (userId == "true") {
        setTimeout(function () {
          that.setState({ imageoverlay: false });
        }, 1000);
      } else {
        if (current == "true") {
          setTimeout(function () {
            that.setState({ imageoverlay: false });
          }, 1000);
        } else {
          setTimeout(function () {
            that.setState({ imageoverlay: true });
          }, 1000);
        }
        // setTimeout(function(){ that.setState({imageoverlay:true})},1000)
      }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }

    // this.callMethod();
    console.log(this.props);
    //this.focusListener = this.props.navigation.addListener('willFocus', () => {
    if (this.props.navigation.state.params) {
      let navigation = this.props.navigation;
      let square_data = navigation.getParam("square_data");

      await this.setState({
        square_data: square_data,
        hometeam: square_data.selectedItem.games.MATCH_UPS.home.t,
        awayteam: square_data.selectedItem.games.MATCH_UPS.away.t,
      });
    }
    // });
  }
  componentWillUnmount() {
    //     AppState.removeEventListener('change', this._handleAppStateChange);
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
    // this.focusListener.remove();
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
    //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
	RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
  }
  removeSquare(e) {
    var array = this.state.b;
    var index = array.indexOf(e); // Let's say it's Bob.
    // delete array[index];
    if (index > -1) {
      array.splice(index, 1);
    }
    this.setState({ b: array });
    var betamout =
      parseInt(this.state.square_data.per_square_cost) *
      parseInt(this.state.b.length);
    this.setState({ betamount: betamout });
    this.setState({ boxcount: this.state.b.length });
  }

  acceptSquare(index) {
    if (this.state.b.length < this.state.square_data.square_limit_per_player) {
      this.state.b.push(index), this.setState({ b: this.state.b });
      var betamout =
        parseInt(this.state.square_data.per_square_cost) *
        parseInt(this.state.b.length);
      this.setState({ betamount: betamout });
    } else {
      AlertUtil.show(
        "You can not purchase more than the allowed squares limit."
      );
    }
    this.setState({ boxcount: this.state.b.length });
  }
  showAlertDialog() {
    if (this.state.betamount < 1000) {
      AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
    } else {
      this.setState({ dialogVisible: true });
    }
  }
  createSquaresAndBet() {
    /*  if (this.state.b.length < this.state.square_data.square_limit_per_player) {
       AlertUtil.show('Please select atleast ' + this.state.square_data.square_limit_per_player+' box.');
     } else 
    if (this.state.betamount < 1000) {
      AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
    } else {*/
    this.setState({ dialogVisible: false });
    var randomnumber = this.state.square_data.randomNumber ? "2" : "1";
    var customSquareRequset = new CustomSquareRequest(
      this.state.square_data.square_title,
      this.state.square_data.selectedItem.league_id,
      this.state.square_data.selectedItem.event_id,
      this.state.square_data.per_square_cost,
      this.state.square_data.square_limit_per_player,
      this.state.square_data.select_quarter_type,
      this.state.square_data.win_per_q1,
      this.state.square_data.win_per_q2,
      this.state.square_data.win_per_q3,
      this.state.square_data.win_per_q4,
      randomnumber,
      "2",
      this.state.b.toString(),
      this.state.betamount,
      this.state.square_data.poolType ? "2" : "1",
      ""
    );
    console.log("create betsquare", JSON.stringify(customSquareRequset));
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
  componentWillReceiveProps(nextProps: G_SquareBoardViewProps) {
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
            console.log(
              "betaFriendResponse " +
                JSON.stringify(nextProps.CustomSquareResponse)
            );
            var response = nextProps.CustomSquareResponse!.response;
            if (response.message == "success") {
              console.log("custom bet success");

              this.shareOption(response, "CUSTOMSQUARE");
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
      }
    }
  }
  // ----------------------------------------------- Methods ---------------------------------------

  async shareOption(item: any, bettype: any) {
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

    if (bettype == "CUSTOMSQUARE") {
      url =
        "http://bet.udda.com/index.php?t=customsquare&i=" +
        item.data.encryptor_square_id;
      //url = "https://bet.udda.com/coming-soon/"

      url = await this.referralservice.getReferralUrl(
        url,
        this.my_referral_code,
        "U"
      ); // Getting Dynamic Share Link From Firebase
      referStr =
        "\nUse Referral Code " + this.my_referral_code + " to sign up.";

      // this.setState({ betTimeExpr: formated_timeExp + " " + zoneExp });
      // this.setState({ betDateExpr: batdateExp });
      try {
        var strAccept: any;
        if (this.state.square_data.poolType) {
          //strAccept =  'You can not invite your friends'
        } else {
          strAccept = "You can invite your friends";
        }

        MessageString =
          'You have been invited you to join our square pool for the "' +
          this.state.square_data.selectedItem.games.MATCH_UPS.away.t +
          " vs." +
          this.state.square_data.selectedItem.games.MATCH_UPS.home.t +
          " game on " +
          this.state.square_data.eventdate +
          '" cost per square is "' +
          this.state.square_data.per_square_cost
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          ' udda bucks" first come first served so act fast.' +
          strAccept +
          ". \nTap on “Square Details” to view more details. \nWould you like to accept the Bet?";
      } catch (e) {}
      MessageString += referStr;

      ShowString = (
        <Text style={{ fontFamily: "Montserrat-Regular", fontSize: hp(1.4) }}>
          You have been invited you to join our square pool for the "
          <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
            {" "}
            {
              this.state.square_data.selectedItem.games.MATCH_UPS.away.t
            } vs. {this.state.square_data.selectedItem.games.MATCH_UPS.home.t}{" "}
            game on {this.state.square_data.eventdate}
          </Text>
          " cost per square is "
          <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
            {" "}
            {this.state.square_data.per_square_cost
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            UDDA bucks
          </Text>{" "}
          " first come first served so act fast.{" "}
          {this.state.square_data.poolType
            ? null
            : "You can invite your friends."}
          {"\n"}Tap on “Squares Details” to view more details.{"\n"}
          Would you like to accept the Bet?{referStr} {"\n"}{" "}
        </Text>
      );

      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });

      this.setState({ MessageUrl: url });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
      this.setState({ square_data: "" });
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
          // shared
          RouterBuilder.resetRouteTo(
            AppScreens.Gambling_ApplicationStack,
            this.props
          );
          //   setTimeout(function(){
          //     alert('hi2')
          //   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);
          // },1000)
        }
      } else if (result.action === Share.dismissedAction) {
        this.setState({ shareDialog: false });
        console.log("share  in dismiss");
        // dismissed
        RouterBuilder.resetRouteTo(
          AppScreens.Gambling_ApplicationStack,
          this.props
        );
        // setTimeout(function(){
        //   alert('dismiss')
        //   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);
        // },500)
      }
    } catch (error) {
      this.setState({ shareDialog: false });
      console.log("share error in catch " + JSON.stringify(error));
      //alert(error.message);
      RouterBuilder.resetRouteTo(
        AppScreens.Gambling_ApplicationStack,
        this.props
      );
      //   setTimeout(function(){
      //     alert('error')
      //   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);
      // },1000)
      //this.props.navigation.navigate(AppScreens.G_DashboardView);
    }
  };

  closeShareDialog() {
    this.setState({ shareDialog: false });
    RouterBuilder.resetRouteTo(
      AppScreens.Gambling_ApplicationStack,
      this.props
    );
    //   setTimeout(function(){
    //     alert('close')
    //   RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
    // },1000)
    //setTimeout(function () { AlertUtil.show("Bet Placed Successfully") }, 2000)
    // this.props.navigation.navigate(AppScreens.G_DashboardView);
  }
  onChangeShareMsg(val: any) {
    this.setState({ MessageString: val });
  }
  render() {
    const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let pool = [
      {
        value: "Quarter 1", //'CREATE CUSTOM',
      },
      {
        value: "Quarter 2",
      },
      {
        value: "Quarter 3",
      },
      {
        value: "Quarter 4",
      },
    ];
    var a = 0;
    var d = [];
    var b = [];

    return this.state.showzoom ? (
      <View style={{ width: "100%", marginTop: 32 }}>
        <ScrollView>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={styles.dropdown}>
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    fontSize: hp(1.6),
                    color: "white",
                    fontFamily: "Montserrat-Bold",
                    textAlign: "center",
                  }}
                >
                  {this.state.square_data.select_quarter_type == "1"
                    ? "Final Only"
                    : this.state.square_data.select_quarter_type == "2"
                    ? "Half & Final"
                    : "Four Quarters "}
                </Text>
                {/*  <Dropdown
            labelFontSize={50}
            fontSize={hp(2.0)}
            containerStyle={{ paddingLeft: 8, borderBottomWidth: 0, justifyContent: "center", width: '100%',paddingTop: 3 }}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
            dropdownOffset={{ top: 0, left: 0 }}
            dropdownMargins={{ min: 0, max: 0 }}
            itemTextStyle={[styles.Input_TextStyle, { padding: 0, fontFamily: 'Montserrat-Bold', fontSize: hp(2.5), color: 'white', margin: 0, paddingBottom: 0, width: '100%' }]}
            data={pool}
            textColor={'white'}
            selectedItemColor={'black'}
            baseColor={"rgba(255, 255, 255, 1)"}
            value={'Quarter 1'}
          // data={this.dataAutoRacing}
          //    value={this.state.custonDropDownvalue}
          //    onChangeText={value =>{ this.changecustomdrop(value)}}

          /> */}
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
                {this.state.hometeam}(H)
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
            <View style={[styles.sidetext, { width: "4.5%" }]}>
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontFamily: "Montserrat-Bold",
                  textAlign: "center",
                }}
              >
                {this.state.awayteam}{" "}
              </Text>
            </View>
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
                              //alert( JSON.stringify(d[i].value[index]))
                              return (
                                <View style={[styles.header1, { width: 60 }]}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.b.includes(d[i].value[index])
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.b.includes(
                                          a
                                        )
                                          ? "#3a9797"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                        marginBottom: 1,
                                      }}
                                    >
                                      {this.state.b.includes(a) ? (
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
                                          color: this.state.b.includes(a)
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
                            } else {
                              return (
                                <View style={[styles.header1]}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.b.includes(d[i].value[index])
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.b.includes(
                                          a
                                        )
                                          ? "#3a9797"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                        marginBottom: 1,
                                      }}
                                    >
                                      {this.state.b.includes(a) ? (
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
                                          color: this.state.b.includes(a)
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
                                    { height: 40, width: 60, marginTop: 1 },
                                  ]}
                                >
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.b.includes(d[i].value[index])
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.b.includes(
                                          a
                                        )
                                          ? "#3a9797"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.b.includes(a) ? (
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
                                          color: this.state.b.includes(a)
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
                            } else {
                              return (
                                <View
                                  style={[
                                    styles.header2,
                                    { height: 40, marginTop: 1 },
                                  ]}
                                >
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.b.includes(d[i].value[index])
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.b.includes(
                                          a
                                        )
                                          ? "#3a9797"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.b.includes(a) ? (
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
                                          color: this.state.b.includes(a)
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
                          })}
                        </View>
                      );
                    }
                  }
                })}
              </View>
            </ScrollView>
          </View>
          <View style={{ width: "95%", margin: 10, borderRadius: 3 }}>
            {/* <TouchableOpacity onPress={() => this.createSquaresAndBet()} style={styles.placebutton} >
        <View>
          <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(3.0), color: 'white' }}> PLACE BET </Text>
          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'black' }}> Total Amount : </Text>
            <Image source={require('../../../../images/buck_dark.png')} style={{ height: 13, width: 13 }} />
            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: 'black' }}> {this.state.betamount}</Text>
            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'black' }}> ({this.state.boxcount} Squares)</Text>
          </View>

        </View>
      </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
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
                  source={require("../../../../images/football-square-overlay.png")}
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
        {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.dialogVisible}
          title=""
          onTouchOutside={() => this.setState({ dialogVisible: false })}
        >
          <View
            style={{
              backgroundColor: "transparent",
              width: "100%",
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ dialogVisible: false });
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  width: "100%",
                  paddingRight: wp(2),
                }}
              >
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
                marginTop: 8,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontFamily: "Montserrat-semibold",
                  textAlign: "center",
                  fontSize: wp(4),
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
                  this.createSquaresAndBet();
                }}
              />
            </View>
          </View>
        </Dialog>

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
                    color: "black",
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
                    style={{ padding: 8, width: "100%", height: "auto" ,fontFamily: 'Montserrat-Regular',fontSize: hp(1.5)}}
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
                    color: "black",
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

        <View style={styles.customhead}>
          <Icons
            name="arrow-back"
            size={30}
            color="black"
            style={{ marginTop: 4 }}
            onPress={() => this.props.navigation?.goBack(null)}
          />
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              paddingRight: 80,
            }}
          >
            <Text style={styles.customheadtext}>FOOTBALL SQUARES</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={styles.dropdown}>
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    fontSize: hp(1.6),
                    color: "white",
                    fontFamily: "Montserrat-Bold",
                    textAlign: "center",
                  }}
                >
                  {this.state.square_data.select_quarter_type == "1"
                    ? "Final Only"
                    : this.state.square_data.select_quarter_type == "2"
                    ? "Half & Final"
                    : "Four Quarters "}
                </Text>
                {/* <Dropdown
                  labelFontSize={50}
                  fontSize={hp(1.8)}
                  containerStyle={{ paddingLeft: 8, borderBottomWidth: 0, justifyContent: "center", width: '100%', paddingTop: 3 }}
                  inputContainerStyle={{ borderBottomColor: 'transparent' }}
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  itemTextStyle={[styles.Input_TextStyle, { padding: 0, fontFamily: 'Montserrat-Bold', fontSize: hp(2.5), color: 'white', margin: 0, paddingBottom: 0, width: '100%' }]}
                  data={pool}
                  textColor={'white'}
                  selectedItemColor={'black'}
                  baseColor={"rgba(255, 255, 255, 1)"}
                  value={'Quarter 1'}
                // data={this.dataAutoRacing}
                //    value={this.state.custonDropDownvalue}
                //    onChangeText={value =>{ this.changecustomdrop(value)}}

                /> */}
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
                {this.state.hometeam} (H)
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
            <View style={styles.sidetext}>
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  fontFamily: "Montserrat-Bold",
                  textAlign: "center",
                }}
              >
                {this.state.awayteam}{" "}
              </Text>
            </View>
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
                              //alert( JSON.stringify(d[i].value[index]))
                              return (
                                <View style={[styles.header1, { width: 60 }]}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.b.includes(d[i].value[index])
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.b.includes(
                                          a
                                        )
                                          ? "#3a9797"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                        marginBottom: 1,
                                      }}
                                    >
                                      {this.state.b.includes(a) ? (
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
                                          color: this.state.b.includes(a)
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
                            } else {
                              return (
                                <View style={[styles.header1]}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.b.includes(d[i].value[index])
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.b.includes(
                                          a
                                        )
                                          ? "#3a9797"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                        marginBottom: 1,
                                      }}
                                    >
                                      {this.state.b.includes(a) ? (
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
                                          color: this.state.b.includes(a)
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
                                    { height: 40, width: 60, marginTop: 1 },
                                  ]}
                                >
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.b.includes(d[i].value[index])
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.b.includes(
                                          a
                                        )
                                          ? "#3a9797"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.b.includes(a) ? (
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
                                          color: this.state.b.includes(a)
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
                            } else {
                              return (
                                <View
                                  style={[
                                    styles.header2,
                                    { height: 40, marginTop: 1 },
                                  ]}
                                >
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.state.b.includes(d[i].value[index])
                                        ? this.removeSquare(d[i].value[index])
                                        : this.acceptSquare(d[i].value[index]);
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: this.state.b.includes(
                                          a
                                        )
                                          ? "#3a9797"
                                          : "white",
                                        width: 50,
                                        height: 39,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {this.state.b.includes(a) ? (
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
                                          color: this.state.b.includes(a)
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
                          })}
                        </View>
                      );
                    }
                  }
                })}
              </View>
            </ScrollView>
          </View>
          <View style={{ width: "95%", margin: 10, borderRadius: 3 }}>
            <TouchableOpacity
              onPress={() => this.showAlertDialog()}
              style={styles.placebutton}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat-Bold",
                    fontSize: hp(3.0),
                    color: "white",
                  }}
                >
                  {" "}
                  PLACE BET{" "}
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
                      fontSize: hp(2.4),
                      color: "black",
                    }}
                  >
                    {" "}
                    {this.state.betamount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat-Semibold",
                      fontSize: hp(2.1),
                      color: "black",
                    }}
                  >
                    {" "}
                    ({this.state.boxcount} Squares)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
  error: state.serviceReducer.error,
  serviceKey: state.serviceReducer.serviceKey,
  listeners: state.serviceReducer.listeners,
  getProfileRequestStatus: state.serviceReducer.requestStatus,
  getProfileResponse: state.serviceReducer.response,
  getProfileError: state.serviceReducer.error,

  customSquareRequestStatus: state.serviceReducer.requestStatus,
  CustomSquareResponse: state.serviceReducer.response as CustomSquareResponse,
  customSquareError: state.serviceReducer.error,
});

export default connect(mapStateToProps)(SquareBoard);
