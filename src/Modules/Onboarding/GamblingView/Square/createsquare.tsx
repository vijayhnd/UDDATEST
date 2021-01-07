import React from "react";
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
import { Dropdown } from "react-native-material-dropdown";
import ToggleSwitch from "toggle-switch-react-native";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import CustomSquareRequest from "../../../../Services/Bets/CustomSquareRequest";
import CustomSquareResponseParser from "../../../../Services/Bets/CustomSquareResponseParser";
import CustomSquareResponse from "../../../../Services/Bets/CustomSquareResponse";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { connect } from "react-redux";
import { UDDAError } from "../../../../Entities";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import ReferralService from "../../../../Services/Referral/ReferralService";
import Icons from 'react-native-vector-icons/MaterialIcons';
var update = require("immutability-helper");
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
  key: "somethun",
  page_title: "CREATE SQUARES",
};

interface G_CreateSquareViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus;
  getProfileResponse?: GetProfileResponse;
  getProfileError?: UDDAError;
  customSquareRequestStatus?: ServiceRequestStatus;
  CustomSquareResponse?: CustomSquareResponse;
  customSquareError?: UDDAError;

  serviceKey?: string;
  listeners?: any;
}

interface G_CreateSquareViewState extends AppValidationComponentState {
  square_title: any;
  square_limit_per_player: any;
  per_square_cost: any;
  select_quarter_type: any;
  win_per_q1: any;
  win_per_q2: any;
  win_per_q3: any;
  win_per_q4: any;
  randomNumber: any;
  quarter_enable: any;
  quarterq2_q4_enable: any;
  DataList?: any;
  isshow: any;
  loader: any;
  CoveredPlaySwitchAccepted: any;
  contentoftoggle: any;
  MenuList: any;
  MyTeamSelect: any;
  responseData: any;
  legueArrayTeamData: any;
  TeamForFavSelect: any;
  ConfirmDialog: any;
  NoData: any;
  scrollenabled: any;
  leagueArr: any;
  newSortKeyArr: any;
  shift: any;
  q1_place_holder: any;
  q3_place_holder: any;
  selectedItem: any;
  date1: any;
  date2: any;
  date3: any;
  date4: any;
  formated_time: any;
  zone: any;
  shareDialog: any;
  MessageString: any;
  MessageUrl: any;
  BetPromotionalMsg: any;
  Share_Show_Msg: any;
  dialogVisible: any;
  buttonType: any;
  eventdate: any;
  poolType: any;
  imageoverlay: any;
}

class G_CreateSquareView
  extends AppValidationComponent<
    G_CreateSquareViewProps,
    G_CreateSquareViewState
  >
  implements MenuIconListener, ISubheaderListener, LogoIconListener {
  private authorisationToken = Application.sharedApplication().user!
    .authenticationToken;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  public keyBoardType = "decimal-pad";
  private serviceRequestInProgress = false;
  private referralservice = new ReferralService(); //Vijay
  private my_referral_code = Application.sharedApplication().user!.profile
    .my_referral_code;
  focusListener: any;
  quartersData = [
    { label: "Four Quarters", value: "3" },
    { label: "Half & Final", value: "2" },
    { label: "Final Only", value: "1" },
  ];
  constructor(props: G_CreateSquareViewProps) {
    super(props);
    this.state = {
      square_title: "",
      square_limit_per_player: "",
      per_square_cost: "",
      select_quarter_type: "3",
      win_per_q1: "",
      win_per_q2: "",
      win_per_q3: "",
      win_per_q4: 100,
      randomNumber: true,
      quarter_enable: true,
      quarterq2_q4_enable: true,
      DataList: [],
      isshow: true,
      loader: false,
      CoveredPlaySwitchAccepted: false,
      contentoftoggle: "Show Private",
      MenuList: [],
      MyTeamSelect: "MY TEAMS",
      responseData: [],
      legueArrayTeamData: [],
      TeamForFavSelect: [],
      ConfirmDialog: false,
      NoData: "",
      scrollenabled: true,
      leagueArr: [],
      newSortKeyArr: [],
      shift: new Animated.Value(0),
      q1_place_holder: "0",
      q3_place_holder: "0",
      selectedItem: "",
      date1: "",
      date2: "",
      date3: "",
      date4: "",
      formated_time: "",
      zone: "",
      shareDialog: "",
      MessageString: "",
      MessageUrl: "",
      BetPromotionalMsg: "",
      Share_Show_Msg: "",
      dialogVisible: false,
      buttonType: "1",
      eventdate: "",
      poolType: false,
      imageoverlay: false,
    };
  }

  async saveoverlay() {
    try {
      await AsyncStorage.setItem("createsquareoverlay", "true");
      this.setState({ imageoverlay: false });
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
  async closecurrent() {
    this.setState({ imageoverlay: false });
    try {
      await AsyncStorage.setItem("createsquareoverlaycurrent", "true");
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
  async componentDidMount() {
    let userId = "";
    let current = "";
    try {
      current = await AsyncStorage.getItem("createsquareoverlaycurrent");
      userId = await AsyncStorage.getItem("createsquareoverlay");

      console.log("createsquareoverlay response", userId);
      var that = this;
      if (userId == "true") {
        setTimeout(function () {
          that.setState({ imageoverlay: false });
        }, 1000);
      } else {
        if (current == "true") {
          setTimeout(function () {
            that.setState({ imageoverlay: false });
          }, 3000);
        } else {
          setTimeout(function () {
            that.setState({ imageoverlay: true });
          }, 3000);
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }

    // this.callMethod();
    console.log(this.props);
    this.focusListener = this.props.navigation.addListener("willFocus", () => {
      if (this.props.navigation.state.params) {
        let navigation = this.props.navigation;
        let item = navigation.getParam("item");
        if (item) {
          let item = this.props.navigation?.state.params.item;

          var new_time_stamp = item.match_time_stamp * 1000;
          var formated_time = moment(new_time_stamp).format("LT");
          var Match_date: any = new Date(new_time_stamp).toString().split(" ");

          var zonevalue: any = Match_date[6].toString();
          var zone: any = zonevalue.substr(1, zonevalue.length - 2);
          var eventdate = moment(new_time_stamp).format("MM/DD/YYYY");
          console.log(Match_date);
          this.setState({ selectedItem: item });
          this.setState({ date1: Match_date[0] });
          this.setState({ date2: Match_date[1] });
          this.setState({ date3: Match_date[2] });
          this.setState({ formated_time: formated_time });
          this.setState({ zone: zone });
          this.setState({ eventdate: eventdate });

          console.log("crreate square", eventdate);
        }
      }
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
    this.focusListener.remove();
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

  showAlertDialog(buttonType: any) {
    this.setState({ buttonType: buttonType });

    if (
      this.state.selectedItem == "" ||
      this.state.selectedItem == null ||
      this.state.square_title.trim() == "" ||
      this.state.square_title.trim() == null ||
      this.state.square_limit_per_player.trim() == "" ||
      this.state.square_limit_per_player.trim() == null ||
      this.state.select_quarter_type == "" ||
      this.state.select_quarter_type == null ||
      this.state.per_square_cost.trim() == "" ||
      this.state.per_square_cost.trim() == null
    ) {
      AlertUtil.show("Please enter all valid details.");
    } else if (parseInt(this.state.square_limit_per_player) > 100) {
      AlertUtil.show("Squares limit can not not be more than 100.");
    } else if (
      parseFloat(this.state.per_square_cost) *
        parseInt(this.state.square_limit_per_player) <
      1000
    ) {
      // AlertUtil.show("Multiply of squares cost and limit should not be less than 1000.");
      AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
    } else if (
      this.state.select_quarter_type == "2" &&
      (this.state.win_per_q2 == "" || this.state.win_per_q4 == "")
    ) {
      AlertUtil.show("Please enter all valid details.");
    } else if (
      this.state.select_quarter_type == "2" &&
      parseFloat(this.state.win_per_q2) + parseFloat(this.state.win_per_q4) !=
        100
    ) {
      AlertUtil.show("Total winning amount (%) must be equal to 100%.");
    } else if (
      this.state.select_quarter_type == "3" &&
      (this.state.win_per_q1 == "" ||
        this.state.win_per_q2 == "" ||
        this.state.win_per_q3 == "" ||
        this.state.win_per_q4 == "")
    ) {
      AlertUtil.show("Please enter all valid details.");
    } else if (
      this.state.select_quarter_type == "3" &&
      parseFloat(this.state.win_per_q1) +
        parseFloat(this.state.win_per_q2) +
        parseFloat(this.state.win_per_q3) +
        parseFloat(this.state.win_per_q4) !=
        100
    ) {
      AlertUtil.show("Total winning amount (%) must be equal to 100%.");
    } else {
      if (buttonType == 1) {
        this.setState({ dialogVisible: true });
      } else {
        this.createSquaresAndBet();
      }
    }
  }

  createSquares() {
    // console.log('finsal arr', this.state);
    // console.log('item', this.state.selectedItem);
    // console.log('111');
    this.setState({ dialogVisible: false });

    var randomnumber = this.state.randomNumber ? "2" : "1";
    var customSquareRequset = new CustomSquareRequest(
      this.state.square_title.trim(),
      this.state.selectedItem.league_id,
      this.state.selectedItem.event_id,
      this.state.per_square_cost,
      this.state.square_limit_per_player,
      this.state.select_quarter_type,
      this.state.win_per_q1,
      this.state.win_per_q2,
      this.state.win_per_q3,
      this.state.win_per_q4,
      randomnumber,
      "1",
      "",
      "",
      this.state.poolType ? "2" : "1",
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

  createSquaresAndBet() {
    var data = {
      square_title: this.state.square_title,
      selectedItem: this.state.selectedItem,
      per_square_cost: this.state.per_square_cost,
      square_limit_per_player: this.state.square_limit_per_player,
      select_quarter_type: this.state.select_quarter_type,
      win_per_q1: this.state.win_per_q1,
      win_per_q2: this.state.win_per_q2,
      win_per_q3: this.state.win_per_q3,
      win_per_q4: this.state.win_per_q4,
      randomNumber: this.state.randomNumber,
      eventdate: this.state.eventdate,
      poolType: this.state.poolType,
    };

    this.props.navigation.navigate(AppScreens.G_SquareBoard, {
      square_data: data,
    });
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
  componentWillReceiveProps(nextProps: G_CreateSquareViewProps) {
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
              // this.getProfile();
              console.log("custom bet success");

              //this.onChangeQuarter('3');

              this.shareOption(response, "CUSTOMSQUARE");
            } else {
              AlertUtil.show("Unsuccesfull :" + response.message);
            }

            this.setState({ square_limit_per_player: "" });
            this.setState({ select_quarter_type: "3" });
            this.setState({ win_per_q1: "" });
            this.setState({ win_per_q2: "" });
            this.setState({ win_per_q3: "" });
            this.setState({ win_per_q4: "" });
            this.setState({ buttonType: "1" });
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
        if (this.state.poolType) {
          //strAccept =  'You can not invite your friends.'
        } else {
          strAccept = "You can invite your friends.";
        }
        MessageString =
          'You have been invited you to join our square pool for the "' +
          this.state.selectedItem.games.MATCH_UPS.away.t +
          " vs." +
          this.state.selectedItem.games.MATCH_UPS.home.t +
          " game on " +
          this.state.eventdate +
          ' cost per square is "' +
          this.state.per_square_cost +
          ' UDDA bucks" first come first served so act fast. ' +
          strAccept +
          " \nTap on “Square Details” to view more details. \nWould you like to accept the Bet?";
      } catch (e) {}
      MessageString += referStr;

      ShowString = (
        <Text style={{ fontFamily: "Montserrat-Regular", fontSize: hp(1.4) }}>
          You have been invited you to join our square pool for the "
          <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
            {" "}
            {this.state.selectedItem.games.MATCH_UPS.away.t} vs.{" "}
            {this.state.selectedItem.games.MATCH_UPS.home.t} game on{" "}
            {this.state.eventdate}" cost per square is
          </Text>
          <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
            {" "}
            "{this.state.per_square_cost} UDDA bucks "
          </Text>{" "}
          first come first served so act fast.{" "}
          {this.state.poolType ? null : "You can invite your friends."}
          {"\n"}Tap on “Squares Details” to view more details.{"\n"}
          Would you like to accept the Bet?{referStr} {"\n"}{" "}
        </Text>
      );

      this.setState({ MessageString: MessageString });
      this.setState({ Share_Show_Msg: ShowString });

      this.setState({ MessageUrl: url });
      console.log(JSON.stringify(this.state.MessageString));
      this.setState({ shareDialog: true });
      this.setState({ square_title: "" });
      this.setState({ selectedItem: "" });
      this.setState({ per_square_cost: "" });
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
        } else {
          this.setState({ shareDialog: false });
          console.log("shared");
          // shared
          RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
        }
      } else if (result.action === Share.dismissedAction) {
        this.setState({ shareDialog: false });
        console.log("share  in dismiss");
        // dismissed
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
      }
    } catch (error) {
      this.setState({ shareDialog: false });
      console.log("share error in catch " + JSON.stringify(error));
      //alert(error.message);
      RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
    }
  };

  closeShareDialog() {
    this.setState({ shareDialog: false });
    RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
    // setTimeout(function () { AlertUtil.show("Bet Placed Successfully") }, 2000)
  }
  onChangeShareMsg(val: any) {
    this.setState({ MessageString: val });
  }
  accountNameTapped() {
    this.props.navigation!.navigate(AppScreens.G_ProfileView);
  }

  iconDidTapped() {
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View, {
      gameList: true,
    });
  }

  LogoiconDidTapped() {
   // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
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
  selectGame() {
    if (this.props.navigation.state.params) {
      this.props.navigation!.navigate(AppScreens.G_SelectGameView, {
        setting: this.props.navigation?.state.params.setting,
      });
    } else {
      this.props.navigation!.navigate(AppScreens.G_SelectGameView);
    }
  }

  onChangeQuarter(value: any) {
    this.setState({ win_per_q1: "" });
    this.setState({ win_per_q2: "" });
    this.setState({ win_per_q3: "" });
    this.setState({ win_per_q4: 100 });
    this.setState({ select_quarter_type: value });
    if (value == "1") {
      this.setState({ win_per_q1: "100" });
    } else {
      if (value == "3") {
        this.setState({ win_per_q1: "" });
        this.setState({ q1_place_holder: "0" });
        this.setState({ q3_place_holder: "0" });
        this.setState({ quarter_enable: true });
        this.setState({ quarterq2_q4_enable: true });
      } else if (value == 2) {
        this.setState({ win_per_q1: "" });
        this.setState({ q1_place_holder: "X" });
        this.setState({ q3_place_holder: "X" });
        this.setState({ quarter_enable: false });
        this.setState({ quarterq2_q4_enable: true });
      } else {
        this.setState({ quarter_enable: false });
        this.setState({ quarterq2_q4_enable: false });
      }
    }
  }
  q1endediting() {
    if (this.state.win_per_q1.toString().trim() != "") {
      var a = parseInt(this.state.win_per_q4) - parseInt(this.state.win_per_q1);
      if (a > 0) {
        this.setState({
          win_per_q4:
            parseInt(this.state.win_per_q4) - parseInt(this.state.win_per_q1),
        });
      } else {
        alert("Total winning percentage can not be more than 100.");
        this.setState({
          win_per_q1: "",
          win_per_q2: "",
          win_per_q3: "",
          win_per_q4: 100,
        });
      }
    }
  }

  q2endediting() {
    if (this.state.win_per_q2.toString().trim() != "") {
      var a = parseInt(this.state.win_per_q4) - parseInt(this.state.win_per_q2);
      if (a > 0) {
        this.setState({
          win_per_q4:
            parseInt(this.state.win_per_q4) - parseInt(this.state.win_per_q2),
        });
      } else {
        alert("Total winning percentage can not be more than 100.");
        this.setState({
          win_per_q1: "",
          win_per_q2: "",
          win_per_q3: "",
          win_per_q4: 100,
        });
      }
    }
  }

  q3endediting() {
    if (this.state.win_per_q3.toString().trim() != "") {
      var a = parseInt(this.state.win_per_q4) - parseInt(this.state.win_per_q3);
      if (a > 0) {
        this.setState({
          win_per_q4:
            parseInt(this.state.win_per_q4) - parseInt(this.state.win_per_q3),
        });
      } else {
        alert("Total winning percentage can not be more than 100.");
        this.setState({
          win_per_q1: "",
          win_per_q2: "",
          win_per_q3: "",
          win_per_q4: 100,
        });
      }
    }
  }
  // -----------------------------------------------Design and Design Methods---------------------------------------

  render() {
    return (
      <Container
        title={ProfilePageContent.page_title}
        isHeader={true}
        isSubHeader={true}
        isTitle={false}
        showIndicator={this.serviceRequestInProgress}
        menuIconListener={this}
        LogoIconListener={this}
        accountNameListener={this}
        availableBalanceListener={this}
        coveredPlaysListener={this}
        openPlaysListener={this}
        isSetting={false}
      >
        {/* overlay ui start */}
        {UrlService.OVERLAY == 0 ? (
          <Modal visible={this.state.imageoverlay} transparent={true}>
            <View style={{ height: "100%", width: "100%", flex: 1 }}>
              <SafeAreaView forceInset={{ bottom: "never" }}>
                <ImageBackground
                  source={require("../../../../images/create-square-overlay.png")}
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
                      <TouchableWithoutFeedback
                        onPress={() => this.closecurrent()}
                      >
                        <Image
                          source={require("../../../../images/close_overlay.png")}
                          style={{ height: 50, width: 50 }}
                        ></Image>
                      </TouchableWithoutFeedback>
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
                  if (this.state.buttonType == "1") {
                    this.createSquares();
                  }
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
                    style={{ padding: 8, width: "100%", height: "auto",fontFamily: 'Montserrat-Regular',fontSize: hp(1.5) }}
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

        <View style={styles.hrline} />
        <View style={{ flex: 1 }}>
          <ProgressLoader
            visible={this.state.loader}
            isModal={true}
            isHUD={true}
            hudColor={"#68bcbc"}
            color={"#FFFFFF"}
          />
          <View style={styles.mainContent}>
            <View style={styles.content}>
              <ScrollView>
                <Animated.View
                  style={[
                    { flex: 1 },
                    { transform: [{ translateY: this.state.shift }] },
                  ]}
                >
                   <View style={[styles.ThirdContainer,{marginTop: '1%'}]}>
                   <View style={[styles.customhead,{backgroundColor:'white'}]}> 
          <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'35%' }}>             
              <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 0,marginTop:5 }}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>
              <View style={{ alignContent: 'flex-start', alignItems: 'flex-start', width:'65%' }}>
                <Text style={[styles.customheadtext,{color:'#68bcbc'}]}>{ProfilePageContent.page_title}</Text>
              </View>
             
              
             
           </View>
                  </View>
                  <View style={styles.ThirdContainer}>
                    <Text style={styles.Text_Style}>Squares Title</Text>
                    <View style={[styles.Input_Container, styles.inputPadding]}>
                      <TextInput
                        value={this.state.square_title}
                        onChangeText={(text) =>
                          this.setState({ square_title: text })
                        }
                        placeholder="Enter Square Title"
                        placeholderTextColor={"#c3c3c3"}
                        returnKeyType="done"
                        maxLength={50}
                        style={styles.Input_TextStyle}
                      />
                    </View>
                  </View>
                  {this.state.selectedItem == "" ? (
                    <View style={styles.ThirdContainer}>
                      <View style={{ width: "50%" }}>
                        <TouchableHighlight
                          style={styles.selectgame}
                          onPress={() => this.selectGame()}
                          underlayColor="#fff"
                        >
                          <Text style={styles.selectgametext}>Select Game</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  ) : (
                    <View style={[styles.ThirdContainer]}>
                      <View
                        style={[
                          styles.ThirdContainer,
                          { flex: 1, flexDirection: "row" },
                        ]}
                      >
                        <View
                          style={{
                            width: "58%",
                            marginRight: "1%",
                            alignItems: "flex-start",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={[styles.Text_Style, { fontSize: hp(2.0) }]}
                          >
                            Game Details
                          </Text>
                          <View
                            style={{
                              width: "100%",
                              alignItems: "flex-start",
                              justifyContent: "center",
                              paddingTop: 2,
                            }}
                          >
                            <Text style={[styles.flatlist_title]}>
                              <Text
                                style={{
                                  textAlign: "left",
                                  fontFamily: "Montserrat-SemiBold",
                                  fontSize: hp(2),
                                }}
                              >
                                {this.state.date1}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Montserrat-Regular",
                                  fontSize: hp(2),
                                }}
                              >
                                {" "}
                                {this.state.date2} {this.state.date3}{" "}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: "Montserrat-Regular",
                                  fontSize: hp(2),
                                }}
                              >
                                {this.state.formated_time} {this.state.zone}
                              </Text>
                            </Text>
                          </View>
                        </View>
                        <View style={{ width: "41%", alignItems: "flex-end" }}>
                          <TouchableHighlight
                            style={styles.selectgame}
                            onPress={() => this.selectGame()}
                            underlayColor="#fff"
                          >
                            <Text
                              style={[
                                styles.selectgametext,
                                { fontSize: hp(2.2) },
                              ]}
                            >
                              Change Game
                            </Text>
                          </TouchableHighlight>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.ThirdContainer,
                          {
                            flex: 1,
                            flexDirection: "row",
                            backgroundColor: "#F4F4F4",
                            padding: "2%",
                          },
                        ]}
                      >
                        {/* <View style={{ width: '45%', marginRight: '2%', alignItems: 'center', justifyContent: 'center',alignContent:'center' }}>
                                                    <Text style={[styles.Text_Style, styles.flatlist_matchup_text_style,{textAlign:'center'}]}>{this.state.selectedItem.games.MATCH_UPS.away.t}</Text>
                                                </View> */}
                        <View
                          style={{
                            width: "36%",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            alignContent: "flex-start",
                            marginRight: "14%",
                            paddingRight: 1,
                          }}
                        >
                          <Text
                            style={[
                              styles.flatlist_matchup_text_style,
                              { textAlign: "left", marginRight: "2%" },
                            ]}
                            ellipsizeMode={"tail"}
                          >
                            {this.state.selectedItem.games.MATCH_UPS.away.t}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "8%",
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
                        {/* <View style={{ width: '49%', alignItems: 'center',alignContent:'center',justifyContent:'center',paddingLeft:5 }}>
                                                    <Text style={[styles.Text_Style, styles.flatlist_matchup_text_style,{textAlign:'justify'}]}>{this.state.selectedItem.games.MATCH_UPS.home.t+'(H)'}   </Text>
                                                </View> */}
                        <View
                          style={{
                            width: "40%",
                            alignSelf: "center",
                            marginLeft: "10%",
                            paddingRight: 30,
                          }}
                        >
                          <Text
                            style={[
                              styles.flatlist_matchup_text_style,
                              { textAlign: "right" },
                            ]}
                            ellipsizeMode={"tail"}
                          >
                            {this.state.selectedItem.games.MATCH_UPS.home.t +
                              "(H)"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  <View
                    style={[
                      styles.ThirdContainer,
                      { flex: 1, flexDirection: "row" },
                    ]}
                  >
                    <View style={{ width: "49%", marginRight: "2%" }}>
                      <Text style={styles.Text_Style}>Cost Per Square</Text>
                      <View
                        style={[styles.Input_Container, styles.inputPadding]}
                      >
                        <TextInput
                          // value={this.state.per_square_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          value={this.state.per_square_cost}
                          onChangeText={(text) =>
                            this.setState({ per_square_cost: text })
                          }
                          placeholder="Squares Cost"
                          placeholderTextColor={"#c3c3c3"}
                          returnKeyType="done"
                          keyboardType="decimal-pad"
                          style={styles.Input_TextStyle}
                        />
                      </View>
                    </View>
                    <View style={{ width: "49%" }}>
                      <Text style={styles.Text_Style}>Max. # of Squares</Text>
                      <View
                        style={[styles.Input_Container, styles.inputPadding]}
                      >
                        <TextInput
                          value={this.state.square_limit_per_player}
                          onChangeText={(text) =>
                            this.setState({ square_limit_per_player: text })
                          }
                          placeholder="Squares Limit"
                          placeholderTextColor={"#c3c3c3"}
                          keyboardType="decimal-pad"
                          returnKeyType="done"
                          maxLength={3}
                          style={styles.Input_TextStyle}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.ThirdContainer}>
                    <Text style={styles.Text_Style}>Select Payouts</Text>
                    <View
                      style={[
                        styles.Input_Container,
                        styles.inputPadding,
                        {
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                          paddingBottom: 0,
                        },
                      ]}
                    >
                      <Dropdown
                        dropdownOffset={{ top: 0, left: 0 }}
                        dropdownMargins={{ min: 0, max: 0 }}
                        dropdownPosition={-4.2}
                        containerStyle={{
                          backgroundColor: "#eeeeee",
                          borderBottomWidth: 0,
                          justifyContent: "center",
                          width: "100%",
                        }}
                        inputContainerStyle={{
                          borderBottomColor: "transparent",
                          marginLeft: "2%",
                        }}
                        itemTextStyle={[
                          { fontFamily: "Montserrat-Bold", fontSize: hp(2.3) },
                        ]}
                        data={this.quartersData}
                        value={this.state.select_quarter_type}
                        onChangeText={(value) => this.onChangeQuarter(value)}
                        fontSize={hp(2.3)}
                      />
                    </View>
                  </View>
                  <View style={[styles.ThirdContainer]}>
                    <View>
                      <Text style={styles.Text_Style}>
                        Set Winning Amount in (%)
                      </Text>
                    </View>
                    {this.state.select_quarter_type == "2" ||
                    this.state.select_quarter_type == "3" ? (
                      <View
                        style={[
                          styles.ThirdContainer,
                          { flex: 1, flexDirection: "row" },
                        ]}
                      >
                        <View style={{ width: "23%", marginRight: "2%" }}>
                          <Text
                            style={[styles.Text_Style, { textAlign: "center" }]}
                          >
                            Q1
                          </Text>
                          <View
                            style={[
                              styles.Input_Container,
                              styles.inputPadding,
                            ]}
                          >
                            <TextInput
                              value={this.state.win_per_q1}
                              onChangeText={(text) => {
                                this.setState({ win_per_q1: text });
                              }}
                              onFocus={() => {
                                this.state.win_per_q1.toString().trim() == ""
                                  ? null
                                  : this.setState({
                                      win_per_q4:
                                        parseInt(this.state.win_per_q4) +
                                        parseInt(this.state.win_per_q1),
                                    }),
                                  this.setState({ win_per_q1: "" });
                              }}
                              //onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.setState({win_per_q1:'',win_per_q2:'',win_per_q3:'',win_per_q4:100}) : null }}
                              placeholder={this.state.q1_place_holder}
                              placeholderTextColor={"#c3c3c3"}
                              returnKeyType="done"
                              keyboardType="decimal-pad"
                              editable={this.state.quarter_enable}
                              maxLength={3}
                              onEndEditing={() => {
                                this.q1endediting();
                              }}
                              style={[
                                styles.Input_TextStyle,
                                { textAlign: "center" },
                              ]}
                            />
                          </View>
                        </View>
                        <View style={{ width: "23%", marginRight: "2%" }}>
                          <Text
                            style={[styles.Text_Style, { textAlign: "center" }]}
                          >
                            H
                          </Text>
                          <View
                            style={[
                              styles.Input_Container,
                              styles.inputPadding,
                            ]}
                          >
                            <TextInput
                              value={this.state.win_per_q2}
                              onChangeText={(text) => {
                                this.setState({ win_per_q2: text });
                              }}
                              onFocus={() => {
                                this.state.win_per_q2.toString().trim() == ""
                                  ? null
                                  : this.setState({
                                      win_per_q4:
                                        parseInt(this.state.win_per_q4) +
                                        parseInt(this.state.win_per_q2),
                                    }),
                                  this.setState({ win_per_q2: "" });
                              }}
                              // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.setState({win_per_q1:'',win_per_q2:'',win_per_q3:'',win_per_q4:100}) : null }}
                              placeholder="0"
                              placeholderTextColor={"#c3c3c3"}
                              returnKeyType="done"
                              keyboardType="decimal-pad"
                              editable={
                                this.state.quarter_enable ||
                                this.state.quarterq2_q4_enable
                              }
                              maxLength={3}
                              onEndEditing={() => {
                                this.q2endediting();
                              }}
                              // onEndEditing={()=>this.setState({win_per_q4:parseInt(this.state.win_per_q4)-parseInt(this.state.win_per_q2)})}
                              style={[
                                styles.Input_TextStyle,
                                { textAlign: "center" },
                              ]}
                            />
                          </View>
                        </View>
                        <View style={{ width: "23%", marginRight: "2%" }}>
                          <Text
                            style={[styles.Text_Style, { textAlign: "center" }]}
                          >
                            Q3
                          </Text>
                          <View
                            style={[
                              styles.Input_Container,
                              styles.inputPadding,
                            ]}
                          >
                            <TextInput
                              value={this.state.win_per_q3}
                              onChangeText={(text) => {
                                this.setState({ win_per_q3: text });
                              }}
                              onFocus={() => {
                                this.state.win_per_q3.toString().trim() == ""
                                  ? null
                                  : this.setState({
                                      win_per_q4:
                                        parseInt(this.state.win_per_q4) +
                                        parseInt(this.state.win_per_q3),
                                    }),
                                  this.setState({ win_per_q3: "" });
                              }}
                              // onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.setState({win_per_q1:'',win_per_q2:'',win_per_q3:'',win_per_q4:100}) : null }}
                              placeholder={this.state.q3_place_holder}
                              placeholderTextColor={"#c3c3c3"}
                              returnKeyType="done"
                              keyboardType="decimal-pad"
                              editable={this.state.quarter_enable}
                              maxLength={3}
                              onEndEditing={() => {
                                this.q3endediting();
                              }}
                              //onEndEditing={()=>{this.setState({win_per_q4:parseInt(this.state.win_per_q4)-parseInt(this.state.win_per_q3)})}}
                              style={[
                                styles.Input_TextStyle,
                                { textAlign: "center" },
                              ]}
                            />
                          </View>
                        </View>
                        <View style={{ width: "25%" }}>
                          <Text
                            style={[styles.Text_Style, { textAlign: "center" }]}
                          >
                            F
                          </Text>
                          <View
                            style={[
                              styles.Input_Container,
                              styles.inputPadding,
                            ]}
                          >
                            <TextInput
                              value={this.state.win_per_q4.toString()}
                              onChangeText={(text) =>
                                this.setState({ win_per_q4: text })
                              }
                              placeholder="0"
                              placeholderTextColor={"#c3c3c3"}
                              returnKeyType="done"
                              keyboardType="decimal-pad"
                              editable={false}
                              // editable={this.state.quarter_enable || this.state.quarterq2_q4_enable}
                              maxLength={3}
                              style={[
                                styles.Input_TextStyle,
                                { textAlign: "center", color: "black" },
                              ]}
                            />
                          </View>
                        </View>
                      </View>
                    ) : (
                      this.state.select_quarter_type == "1" && (
                        <View style={[styles.ThirdContainer]}>
                          <View style={{ width: "50%", alignSelf: "center" }}>
                            <Text
                              style={[
                                styles.Text_Style,
                                { textAlign: "center" },
                              ]}
                            >
                              Final
                            </Text>
                            <View
                              style={[
                                styles.Input_Container,
                                styles.inputPadding,
                              ]}
                            >
                              <TextInput
                                onChangeText={(text) =>
                                  this.setState({ win_per_q1: text })
                                }
                                placeholder="100"
                                placeholderTextColor={"#c3c3c3"}
                                returnKeyType="done"
                                keyboardType="decimal-pad"
                                editable={false}
                                style={[
                                  styles.Input_TextStyle,
                                  { textAlign: "center" },
                                ]}
                              />
                            </View>
                          </View>
                        </View>
                      )
                    )}
                  </View>

                  <View style={styles.ThirdContainer}>
                    <Text style={[styles.Text_Style, { fontSize: hp(1.8) }]}>
                      Create random number for all payouts
                    </Text>
                    <View
                      style={[
                        styles.inputPadding,
                        {
                          marginTop: 8,
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <View
                        style={{
                          width: "40%",
                          justifyContent: "flex-end",
                          alignContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <Text
                          style={[
                            styles.toggleText,
                            {
                              color:
                                this.state.randomNumber != true
                                  ? "#009c9d"
                                  : "#c3c3c3",
                            },
                          ]}
                        >
                          Same{" "}
                        </Text>
                      </View>
                      <ToggleSwitch
                        isOn={this.state.randomNumber}
                        onColor="#69bbbb"
                        offColor="#69bbbb"
                        useNativeDriver={true}
                        //  label="Example label"
                        labelStyle={{
                          color: "#222",
                          fontFamily: "Montserrat-Bold",
                          fontSize: hp(2.1),
                        }}
                        size="small"
                        onToggle={(isOn) =>
                          this.setState({ randomNumber: isOn })
                        }
                      />
                      <View style={{ width: "40%" }}>
                        <Text
                          style={[
                            styles.toggleText,
                            {
                              color: this.state.randomNumber
                                ? "#009c9d"
                                : "#c3c3c3",
                            },
                          ]}
                        >
                          {" "}
                          Different
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.ThirdContainer, { marginTop: 0 }]}>
                    <View
                      style={[
                        styles.inputPadding,
                        {
                          marginTop: 8,
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <View
                        style={{
                          width: "40%",
                          justifyContent: "flex-end",
                          alignContent: "flex-end",
                          alignItems: "flex-end",
                          flexDirection: "row",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            AlertUtil.show("Invitees can invite friends");
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={[
                                styles.toggleText,
                                {
                                  color:
                                    this.state.poolType != true
                                      ? "#009c9d"
                                      : "#c3c3c3",
                                },
                              ]}
                            >
                              Public{" "}
                            </Text>
                            <View
                              style={[
                                styles.table_title_info_container,
                                { marginBottom: 8, marginRight: 6 },
                              ]}
                            >
                              <Text style={styles.table_title_info_text}>
                                {" "}
                                i{" "}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <ToggleSwitch
                        isOn={this.state.poolType}
                        onColor="#69bbbb"
                        offColor="#69bbbb"
                        useNativeDriver={true}
                        //  label="Example label"
                        labelStyle={{
                          color: "#222",
                          fontFamily: "Montserrat-Bold",
                          fontSize: hp(2.1),
                        }}
                        size="small"
                        onToggle={(isOn) => this.setState({ poolType: isOn })}
                      />
                      <View style={{ width: "40%", flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => {
                            AlertUtil.show("Only Creator can invite");
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={[
                                styles.toggleText,
                                {
                                  color: this.state.poolType
                                    ? "#009c9d"
                                    : "#c3c3c3",
                                },
                              ]}
                            >
                              {" "}
                              Private
                            </Text>
                            <View
                              style={[
                                styles.table_title_info_container,
                                {
                                  marginBottom: 8,
                                  marginRight: 10,
                                  marginLeft: 3,
                                },
                              ]}
                            >
                              <Text style={styles.table_title_info_text}>
                                {" "}
                                i{" "}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.ThirdContainer,
                      { flex: 1, flexDirection: "row" },
                    ]}
                  >
                    <TouchableHighlight
                      style={[
                        styles.createsquaare,
                        { width: "49%", marginRight: "2%" },
                      ]}
                      onPress={() => this.showAlertDialog("1")}
                      underlayColor="#fff"
                    >
                      <Text style={styles.createsquaaretext}>
                        Create Squares
                      </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={[styles.createsquaare, { width: "49%" }]}
                      onPress={() => this.showAlertDialog("2")}
                      underlayColor="#fff"
                    >
                      <Text style={styles.createsquaaretext}>
                        Create {"\n"} Squares & Bet
                      </Text>
                    </TouchableHighlight>
                  </View>
                </Animated.View>
              </ScrollView>
              {/* <View style={{  justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                                </View> */}
            </View>
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

  customSquareRequestStatus: state.serviceReducer.requestStatus,
  CustomSquareResponse: state.serviceReducer.response as CustomSquareResponse,
  customSquareError: state.serviceReducer.error,
});

export default connect(mapStateToProps)(G_CreateSquareView);
