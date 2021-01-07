import React from "react";
import {
  View,
  Text,
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
  FlatList,
} from "react-native";
import styles from "./selectgamestyles";
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
import Application from "../../.../../../../Entities/Application";
import BigButton from "../../../../Components/Button/BigButton";
import RouterBuilder from "../../../../Router";
import SearchBox from "../../../../Components/CustomComponents/SearchBox/SearchBox";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ProgressLoader from "rn-progress-loader";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { OverlayBackground } from "../../../../Components/CustomComponents/OverlayBackground/OverlayBackground";
import { CheckBox, Image, Card } from "react-native-elements";
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
import GrayPrevIcon from "../../../../Components/Icons/GrayIconPrev";
import GrayNextIcon from "../../../../Components/Icons/GrayIconNext";
import ImagePicker from "react-native-image-picker";

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
import * as RNLocalize from "react-native-localize";
var update = require("immutability-helper");
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/MaterialIcons";
import ToggleSwitch from "toggle-switch-react-native";
import { isRegExp } from "util";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

const ProfilePageContent = {
  key: "somethun",
  page_title: "",
};
const deviceTimeZone = RNLocalize.getTimeZone();
interface G_SelectGameViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus;
  getProfileResponse?: GetProfileResponse;
  getProfileError?: UDDAError;

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

interface G_SelectGameViewState extends AppValidationComponentState {
  contentInsetBottom?: any;
  DataList?: any;
  shift: any;
  leagueData: any;
  leagueId: any;
  loader: any;
  currentWeekTitle: any;
  upcomingGameTitle: any;
  checked: any;
  value3Index: any;
  selected_Legue_id: any;
  nextDate: any;
  preDate: any;
  apinextDate: any;
  apipreDate: any;
  selectedGameValue: any;
  DatatwoList: any;
  NoData: any;
  sportsData: any;
  startPage: any;
  selectedItem: any;
  currentweekindex: any;
  settype: any;
  pastWeekTitle: any;
  searchfield: any;
  searchText: any;
  searchData: any;
}

const bottom_initial = 0;
class G_SelectGameView extends AppValidationComponent<
  G_SelectGameViewProps,
  G_SelectGameViewState
> {
  private authorisationToken = Application.sharedApplication().user!
    .authenticationToken;
  private serviceRequestInProgress = false;
  private Answer: any;
  private NewAnswer: any;
  private AnswerShow: any;
  private NewAnswerShow: any;
  private New: any;
  private NewShow: any;
  private noqueData: any;
  public filterData: any;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  focusListener: any;
  isfontSize: any;
  isMainBlockHeight: any;
  blockHeight: any;

  constructor(props: any) {
    super(props);

    this.state = {
      contentInsetBottom: bottom_initial,
      DataList: [],
      shift: new Animated.Value(0),
      sportsData: [{ label: "FOOTBALL", value: "1" }],
      //leagueData: [{ 'label': 'NFL', 'value': '1' }, { 'label': 'Ncaaf div l-A', 'value': '2' }],
      leagueData: [{ label: "NFL", value: "1" }],
      leagueId: "1",
      loader: false,
      currentWeekTitle: "",
      upcomingGameTitle: "",
      checked: true,
      value3Index: "",
      selected_Legue_id: "",
      nextDate: "",
      preDate: "",
      apinextDate: "",
      apipreDate: "",
      selectedGameValue: "",
      DatatwoList: [],
      NoData: false,
      startPage: 1,
      selectedItem: "",
      currentweekindex: 0,
      settype: "",
      pastWeekTitle: "",
      searchfield: false,
      searchText: "",
      searchData: [],
    };
  }

  async componentDidMount() {
    var isFontsize: any;
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        //alert(111);
        isFontsize = await AsyncStorage.getItem("isfontSize");
        this.isfontSize =
          isFontsize == "1.4"
            ? "font_small"
            : isFontsize == "1.8"
            ? "font_medium"
            : "font_large";
        this.isMainBlockHeight =
          isFontsize == "1.4"
            ? "mainblockheight_small"
            : isFontsize == "1.8"
            ? "mainblockheight_medium"
            : "mainblockheight_large";
        this.blockHeight =
          isFontsize == "1.4"
            ? "blockheight_small"
            : isFontsize == "1.8"
            ? "blockheight_medium"
            : "blockheight_large";
        //alert('in else ' + this.isfontSize + ' is main block height  ' + this.isMainBlockHeight + '  block height ' + this.blockHeight);
      }
    );
    this.callMethod("1", 0, 0);
  }

  async callMethod(league_id: any, currentweekindex: any, currentIn: any) {
    this.setState({ loader: true });

    this.setState({ selected_Legue_id: league_id });
    if (currentweekindex == 0) {
      currentIn = 0;
    }
    var params: any = {
      league_id: league_id,

      dashboard: currentIn,
      match_start_next_date: this.state.nextDate,
      match_start_prev_date: this.state.preDate,
      'timezone': deviceTimeZone,
      // 'team_id': this.state.dashboard_team_id
    };
    //start,per_page

    console.log("myparams", params);
    console.log(this.authorisationToken);

    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/Custom_SquareGaming/dashboard",
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          authorisation: this.authorisationToken,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loader: false });

        console.log("Dashboard Data " + JSON.stringify(responseJson));
        this.setState({ nextDate: responseJson.data.match_start_next_date });
        this.setState({ preDate: responseJson.data.match_start_prev_date });
        if (responseJson.data.type == "D") {
          var end_time_stamp1 =
            responseJson.data.date_range_startDate_timestamp * 1000;
          var formated_end_time1 = moment(end_time_stamp1).format("MMM DD");
          console.log("Start Date " + JSON.stringify(end_time_stamp1));
          var Match_date: any = formated_end_time1.toString().split(" ");

          var end_time_stamp =
            responseJson.data.date_range_endDate_timestamp * 1000;
          var formated_end_time = moment(end_time_stamp).format("MMM DD");
          console.log("Start Date " + JSON.stringify(end_time_stamp));
          var Match_date_end: any = formated_end_time.toString().split(" ");

          this.setState({
            currentWeekTitle:
              Match_date[0] +
              ". " +
              Match_date[1] +
              " - " +
              Match_date_end[0] +
              ". " +
              Match_date_end[1],
          });
          this.setState({ selectedGameValue: this.state.currentWeekTitle }); //garima
        } else {
          this.setState({ currentWeekTitle: responseJson.data.date_range });

          this.setState({ selectedGameValue: this.state.currentWeekTitle }); //garima
          this.setState({
            upcomingGameTitle: responseJson.data.upcoming_range,
          });
          this.setState({ pastWeekTitle: responseJson.data.past_range });
        }
        /*   this.fightingArray = [{
            value: this.state.currentWeekTitle
          },
          {
            value: "NEXT MATCH",
          },
          {
            value: "PAST RESULTS",
          }
          ]; */

        if (responseJson.data.events_array.length > 0) {
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
              day: x.day.split(" "),
              time: x.time,
              match_time_stamp: x.match_time_stamp,
              isMoneyLineSelect1: false,
              isMoneyLineSelect2: false,
              isTotalSelect1: false,
              isTotalSelect2: false,
              isSpreadSelect1: false,
              isSpreadSelect2: false,
              isBetaFriendSelect: false,
              MasterCalcFlag: "D",
              checked: false,
            })),
          });
          const interest = [...this.state.DataList, ...this.state.DatatwoList];
          this.setState({ DataList: interest });
          this.setState({ searchData: interest });

          this.setState({ NoData: false });
        } else {
          // this.setState({ DataList: [] });
          if (this.state.DataList.length == 0) {
            this.setState({ NoData: true });
          } else {
          }
        }
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          //this.logoutButtonPressed();
        }
      })
      .catch((error) => {
        this.setState({ DataList: [] });
        this.setState({ loader: false });
        console.log(error);
      });
  }

  pastResultClicked() {
    if (!this.state.preDate) {
      AlertUtil.show("No matches available.");
    } else {
      this.setState({ currentweekindex: this.state.currentweekindex - 1 });
      this.setState({ DataList: [] });
      this.setState({ settype: "PAST" });
      this.callMethod(
        this.state.selected_Legue_id,
        this.state.currentweekindex - 1,
        -1
      );
    }
  }

  upcomingGamesClicked() {
    if (!this.state.nextDate) {
      AlertUtil.show("No matches available.");
    } else {
      this.setState({ currentweekindex: this.state.currentweekindex + 1 });
      this.setState({ DataList: [] });
      this.setState({ settype: "NEXT" });
      this.callMethod(
        this.state.selected_Legue_id,
        this.state.currentweekindex + 1,
        1
      );
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  componentWillMount() {
    console.log("componentwillmount");
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
    // if(this.focusListener){
    //   this.focusListener.remove();
    // }else{

    // }
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
            (fieldTop +
              fieldHeight +
              fieldHeight +
              fieldHeight +
              fieldHeight) || 0;
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

  onChangeLeague(value: any) {
    this.setState({ selected_Legue_id: value });
    this.setState({ settype: "" });
    this.setState({ DataList: [] }); //ashish_today
    this.callMethod(value, 1, 0);
  }
  selectGame(item: any, index: any) {
    //  alert(111);
    var arrayLength = this.state.DataList.length;
    // console.log(item);
    console.log(index);
    for (let i = 0; i < arrayLength; i++) {
      if (i == index) {
        this.state.DataList[i].checked = true;
      } else {
        this.state.DataList[i].checked = false;
      }
    }
    this.setState({ DataList: this.state.DataList });
    this.setState({ selectedItem: item });
    this.props.navigation?.navigate(AppScreens.G_CreateSquareView, {
      item: item,
    });
  }
  sarchMatch(val: any) {
    var matchList = this.state.searchData;
    //console.log('my value',val);
    if (val.trim() !== "") {
      this.filterData = this.state.DataList.filter((item: any) => {
        return (
          item.games.MATCH_UPS.away.t.toLowerCase().indexOf(val.toLowerCase()) >
            -1 ||
          item.games.MATCH_UPS.home.t.toLowerCase().indexOf(val.toLowerCase()) >
            -1
        );
      });
    } else {
      this.filterData = matchList;
    }
    console.log(this.filterData);
    this.setState({
      DataList: this.filterData,
      searchText: val,
    });
  }
  render() {
    var radio_props = [
      { label: "param1", value: 0 },
      { label: "param2", value: 1 },
      { label: "param3", value: 2 },
      { label: "param4", value: 3 },
    ];
    return (
      <Container
        title={""}
        isHeader={false}
        isSubHeader={false}
        isTitle={false}
        showIndicator={this.serviceRequestInProgress}
        menuIconListener={false}
        LogoIconListener={false}
        availableBalanceListener={this}
        openPlaysListener={this}
        coveredPlaysListener={this}
        accountNameListener={this}
        isSetting={false}
      >
        <View style={styles.maincontainercustom}>
          <View style={styles.customhead}>
            <View style={{ width: "10%" }}>
              <Icons
                name="arrow-back"
                size={30}
                color="white"
                style={{ marginTop: 2 }}
                onPress={() => this.props.navigation?.goBack(null)}
              />
            </View>
            {this.state.searchfield ? (
              <TextInput
                value={this.state.searchText}
                style={{
                  paddingLeft: 5,
                  height: 40,
                  fontFamily: "Montserrat-Semibold",
                  fontSize: hp(2),
                  width: "70%",
                  color: "#FFFFFF",
                }}
                placeholder="SEARCH"
                underlineColorAndroid={"white"}
                placeholderTextColor={"white"}
                onChangeText={(text) => {
                  this.sarchMatch(text);
                }}
                autoFocus={true}
              />
            ) : (
              <View style={{ width: "80%" }}>
                <Text style={styles.leaguetext}>SELECT GAME</Text>
              </View>
            )}
            {this.state.searchfield ? (
              <View style={{ paddingRight: wp(5) }}>
                <Icon
                  name="close"
                  size={18}
                  color="white"
                  onPress={() => {
                    this.setState({ searchfield: false });
                  }}
                />
              </View>
            ) : (
              <View style={{ paddingRight: wp(5) }}>
                <Icon
                  name="search"
                  size={18}
                  color="white"
                  onPress={() => {
                    this.setState({ searchfield: true });
                  }}
                />
              </View>
            )}

            {/* <View style={{padding: wp(1),width: '10%'}}>
            <TouchableWithoutFeedback>
              <Image source={require('../../../../images/search_icon.png')} style={{ width: wp(6), height: wp(6) }} resizeMode='contain' />
            </TouchableWithoutFeedback>
          </View> */}
          </View>

          <View style={[styles.ThirdContainer, { flexDirection: "row" }]}>
            <View style={{ width: "49%", marginRight: "2%" }}>
              <View style={[styles.Input_Container, styles.inputPadding]}>
                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={
                    this.state.sportsData.length > 3
                      ? -5.2
                      : this.state.sportsData.length == 3
                      ? -4.2
                      : this.state.sportsData.length == 1
                      ? -2.2
                      : -3.2
                  }
                  containerStyle={{
                    borderBottomWidth: 0,
                    justifyContent: "center",
                    paddingLeft: "1%",
                  }}
                  inputContainerStyle={{ borderBottomColor: "#000" }}
                  itemTextStyle={[
                    {
                      fontFamily: "Montserrat-Bold",
                      fontSize: hp(2.0),
                      paddingLeft: "1%",
                    },
                  ]}
                  data={this.state.sportsData}
                  value={this.state.leagueId}
                  // onChangeText={value => this.onChangeLeague(value)}
                  fontSize={hp(2.0)}
                />
              </View>
            </View>
            <View style={{ width: "49%" }}>
              <View style={[styles.Input_Container, styles.inputPadding]}>
                <Dropdown
                  dropdownOffset={{ top: 0, left: 0 }}
                  dropdownMargins={{ min: 0, max: 0 }}
                  dropdownPosition={
                    this.state.leagueData.length > 3
                      ? -5.2
                      : this.state.leagueData.length == 3
                      ? -4.2
                      : this.state.leagueData.length == 1
                      ? -2.2
                      : -3.2
                  }
                  containerStyle={{
                    borderBottomWidth: 0,
                    justifyContent: "center",
                    paddingLeft: "1%",
                  }}
                  inputContainerStyle={{ borderBottomColor: "#000" }}
                  itemTextStyle={[
                    {
                      fontFamily: "Montserrat-Bold",
                      fontSize: hp(2.0),
                      paddingLeft: "1%",
                    },
                  ]}
                  data={this.state.leagueData}
                  value={this.state.selected_Legue_id}
                  // onChangeText={value => this.onChangeLeague(value)}
                  fontSize={hp(2.0)}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              marginBottom: "2%",
            }}
          >
            <View
              style={{
                width: "28%",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              {this.state.currentweekindex > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    this.pastResultClicked();
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <GrayPrevIcon />
                    <Text style={styles.boldTextStyle}>
                      {this.state.pastWeekTitle == ""
                        ? "PAST"
                        : this.state.pastWeekTitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={{
                width: "30%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text style={styles.centerTitleTextStyle}>
                {this.state.currentWeekTitle == ""
                  ? "WEEK"
                  : this.state.currentWeekTitle}
              </Text>
            </View>
            <View
              style={{
                width: "40%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.upcomingGamesClicked();
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Text style={styles.boldTextStyle}>
                    {this.state.upcomingGameTitle == ""
                      ? "NEXT"
                      : this.state.upcomingGameTitle}
                  </Text>
                  <GrayNextIcon />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: hp(4),
              backgroundColor: "#666666",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: hp(1.5),
                fontFamily: "Montserrat-Bold",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              MATCH UPS
            </Text>
          </View>
          {this.state.NoData == true ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginVertical: "50%",
              }}
            >
              <View style={styles.OtherTextContainer}>
                <View style={styles.OtherTextSubContainer}>
                  <Text style={styles.UnderConstText}>
                    No Matches Available
                  </Text>
                  <Text style={[styles.DescText, { textAlign: "center" }]}>
                    Check back later when updates on this sport become
                    available.
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <ScrollView>
            {/*  <View style={{ backgroundColor: 'white', flexDirection: 'row', marginBottom: '2%' }}>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <CheckBox
                    center
                    title=''
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checkedColor='#dedede'
                    checked={this.state.checked}
                  />
                  </View>
                <View style={{ width: '40%', justifyContent: 'center' }}>
                  <Text>trtrtrtr1</Text>
                </View>
                <View style={{ width: '40%', justifyContent: 'center' }}>
                  <Text>fdffsasaas</Text>
                </View>
                </View>  */}

            {this.state.DataList.length > 0 ? (
              <FlatList
                key={this.state.DataList.length}
                extraData={this.state}
                data={this.state.DataList}
                keyExtractor={(item: any, index: any) => index.toString()}
                bounces={false}
                scrollEnabled={true}
                // ref={(re: any) => { this.ListView_Ref = re }}
                renderItem={({ item, index }: any) => {
                  var ArrayLength = this.state.DataList.length;
                  var new_time_stamp = item.match_time_stamp * 1000;
                  var formated_time = moment(new_time_stamp).format("LT");
                  var Match_date: any = new Date(new_time_stamp)
                    .toString()
                    .split(" ");

                  var zonevalue: any = Match_date[6].toString();
                  var zone: any = zonevalue.substr(1, zonevalue.length - 2);
                  return (
                    <Animated.View
                      style={[
                        { flex: 1 },
                        { transform: [{ translateY: this.state.shift }] },
                      ]}
                    >
                      <View style={{ backgroundColor: "#FFFFFF" }}>
                        <View
                          style={[
                            styles.flatlist_title_row,
                            {
                              height:
                                this.isfontSize == "font_small"
                                  ? 18
                                  : this.isfontSize == "font_small"
                                  ? 20
                                  : 23,
                            },
                          ]}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              width: "75%",
                              paddingLeft: 4,
                            }}
                          >
                            <Text
                              style={[
                                styles.flatlist_title,
                                styles[this.isfontSize],
                              ]}
                            >
                              <Text
                                style={{
                                  textAlign: "left",
                                  fontFamily: "Montserrat-SemiBold",
                                }}
                              >
                                {Match_date[0]}
                              </Text>
                              <Text
                                style={{ fontFamily: "Montserrat-Regular" }}
                              >
                                {" "}
                                {Match_date[1]} {Match_date[2]}{" "}
                              </Text>
                              <Text
                                style={{ fontFamily: "Montserrat-Regular" }}
                              >
                                {formated_time} {zone}
                              </Text>
                            </Text>
                          </View>
                        </View>
                        <TouchableWithoutFeedback
                          onPress={() => this.selectGame(item, index)}
                        >
                          <View
                            style={{
                              backgroundColor: "#EFEFEF",
                              flexDirection: "row",
                              borderColor: "#ffffff",
                              borderWidth: 0,
                              borderTopWidth: 2,
                              borderBottomWidth: 2,
                            }}
                          >
                            <View style={{ width: "15%" }}>
                              <CheckBox
                                center
                                title=""
                                onPress={() => this.selectGame(item, index)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checkedColor="#999999"
                                checked={item.checked}
                              />
                            </View>
                            <View
                              style={{
                                width: "36%",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                alignContent: "flex-start",
                                borderWidth: 1,
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                                borderLeftWidth: 0,
                                borderColor: "#ffffff",
                                marginRight: "12%",
                                paddingRight: 1,
                              }}
                            >
                              <Text
                                style={[
                                  styles.flatlist_matchup_text_style,
                                  styles[this.isfontSize],
                                  { textAlign: "left", marginRight: "2%" },
                                ]}
                                ellipsizeMode={"tail"}
                              >
                                {item.games.MATCH_UPS.away.t}
                              </Text>
                            </View>
                            <View style={{ width: "36%", alignSelf: "center" }}>
                              <Text
                                style={[
                                  styles.flatlist_matchup_text_style,
                                  styles[this.isfontSize],
                                  { textAlign: "right", marginRight: "4%" },
                                ]}
                                ellipsizeMode={"tail"}
                              >
                                {item.games.MATCH_UPS.home.t} (H)
                              </Text>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </Animated.View>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  height: hp(60),
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Montserrat-Semibold",
                    color: "black",
                    fontSize: hp(2.8),
                  }}
                >
                  {" "}
                  No data available{" "}
                </Text>
              </View>
            )}
          </ScrollView>
          <ProgressLoader
            visible={this.state.loader}
            isModal={true}
            isHUD={true}
            hudColor={"#68bcbc"}
            color={"#FFFFFF"}
          />
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
  customBetaFriendResponse: state.serviceReducer
    .response as CustomBetAFriendResponse,
  customBetaFriendError: state.serviceReducer.error,
});

export default connect(mapStateToProps)(G_SelectGameView);
