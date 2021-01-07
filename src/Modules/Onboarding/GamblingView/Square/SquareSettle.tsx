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
} from "react-native";
import styles from "./aceptedstyles";
import Container from "../../../../Components/Container";
import AppValidationComponent, {
  Field,
  AppValidationComponentState,
  AppValidationComponentProps,
} from "../../../../Util/AppValidationComponent";
import { FooterComponent } from "../../../../Components/CustomComponents/Footer/FooterComponent";
import { AdMobBanner } from "react-native-admob";
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
// import ImgToBase64 from 'react-native-image-base64';

var update = require("immutability-helper");

console.disableYellowBox = true;

const ProfilePageContent = {
  key: "somethun",
  page_title: "",
};

interface G_SettleSquareViewProps extends AppValidationComponentProps {
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

interface G_SettleSquareViewState extends AppValidationComponentState {
  shift?: any;
  squarelist?: any;
  searchData?: any;
  searchtext?: any;
  loader?: any;
}

const bottom_initial = 0;
class SettleSquare
  extends AppValidationComponent<
    G_SettleSquareViewProps,
    G_SettleSquareViewState
  >
  implements MenuIconListener, ISubheaderListener, FooterListner {
  private authorisationToken = Application.sharedApplication().user!
    .authenticationToken;
  private serviceRequestInProgress = false;
  public filterData: any;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;

  /*  End Auto Racing and Horse Racing */

  constructor(props: any) {
    super(props);

    this.state = {
      shift: new Animated.Value(0),
      squarelist: [],
      searchData: [],
      searchtext: "",
      loader: false,
    };
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

  getSquaresList() {
    this.setState({ loader: true });

    var params: any = {
      custom_pool_id: "",
    };

    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/Custom_PoolGaming/custom_pools_list",
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
        console.log("vreate pool response :   " + JSON.stringify(responseJson));
        this.setState({ loader: false });
        this.setState({ squarelist: responseJson.data });
        //this.setState({flattext:[]})
        this.setState({ searchData: responseJson.data });

        console.log(
          "Success openplay" + JSON.stringify(this.state.customProbBetList)
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

  sarchCustomProp(val: any) {
    var squarelist = this.state.searchData;
    if (val.trim() !== "") {
      this.filterData = this.state.squarelist.filter((item) => {
        return item.question.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.filterData = squarelist;
    }
    console.log(this.filterData);
    this.setState({
      squarelist: this.filterData,
      searchtext: val,
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
  render() {
    const data = ["a", "b", "c"];
    return (
      <Container
        title={"FOOTBALL SQUARES"}
        isHeader={true}
        isSubHeader={true}
        isTitle={true}
        //  showIndicator={this.serviceRequestInProgress}
        menuIconListener={this}
        LogoIconListener={this}
        availableBalanceListener={this}
        openPlaysListener={this}
        coveredPlaysListener={this}
        accountNameListener={this}
        isSetting={false}
      >
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {/* { this.state.squarelist.length!=0?  */}
          {data.length != 0 ? (
            <View
              style={{
                height: hp(75),
                marginTop: 5,
                width: "100%",
                backgroundColor: "#dddddd",
              }}
            >
              <FlatList
                extraData={this.state}
                data={data}
                keyExtractor={(item: any, index) => index.toString()}
                bounces={true}
                renderItem={({ item, index }: any) => {
                  var itemindex = "";
                  itemindex = item.result_index;
                  // this.state.flattext.push({image:'',base:'',url:'',date:'',message:''})

                  return (
                    <View style={{ borderBottomWidth: 5, borderColor: "grey" }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#black",
                          fontFamily: "Montserrat-Bold",
                          padding: 10,
                        }}
                      >
                        Game Name
                      </Text>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          backgroundColor: "white",
                          padding: 5,
                          width: "100%",
                          flexDirection: "row",
                          padding: 10,
                        }}
                      >
                        <View
                          style={{
                            width: "45%",
                            marginTop: 5,
                            marginBottom: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#3a9797",
                              fontFamily: "Montserrat-Regular",
                            }}
                          >
                            Home Team
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#3a9797",
                              fontFamily: "Montserrat-Bold",
                            }}
                          >
                            Chiefs
                          </Text>
                        </View>

                        <View
                          style={{
                            width: "45%",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            marginTop: 5,
                            marginBottom: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "black",
                              fontFamily: "Montserrat-Regular",
                            }}
                          >
                            Away Team
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "black",
                              fontFamily: "Montserrat-Bold",
                            }}
                          >
                            Niners
                          </Text>
                        </View>

                        <View
                          style={{
                            width: "10%",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            marginTop: 5,
                            marginBottom: 5,
                          }}
                        >
                          <Icons
                            name="keyboard-arrow-right"
                            size={30}
                            color="black"
                            style={{ marginTop: 2 }}
                            // onPress={() => this.props.navigation?.goBack(null)}
                          />
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          ) : (
            <View
              style={{
                height: hp(80),
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Montserrat-Semibold",
                  color: "#222",
                  fontSize: hp(2.8),
                }}
              >
                {" "}
                No data available{" "}
              </Text>
            </View>
          )}
        </View>

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

export default connect(mapStateToProps)(SettleSquare);
