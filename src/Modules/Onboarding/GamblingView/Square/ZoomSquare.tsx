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
  SafeAreaView,
  StyleSheet,
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
// import ImgToBase64 from 'react-native-image-base64';

var update = require("immutability-helper");

console.disableYellowBox = true;

const ProfilePageContent = {
  key: "somethun",
  page_title: "",
};

interface G_ZoomSquareViewProps extends AppValidationComponentProps {
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

interface G_ZoomSquareViewState extends AppValidationComponentState {
  shift?: any;
  squarelist?: any;
  searchData?: any;
  searchtext?: any;
  loader?: any;
  detailmodel?: any;
  currentOrientation: any;
  currentSpecificOrientation: any;
}

const bottom_initial = 0;
class ZoomSquare
  extends AppValidationComponent<G_ZoomSquareViewProps, G_ZoomSquareViewState>
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
      detailmodel: false,
      currentOrientation: "",
      currentSpecificOrientation: "",
    };
  }

  componentWillUnmount() {
    //     AppState.removeEventListener('change', this._handleAppStateChange);
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    //Orientation.lockToPortrait()
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  componentWillMount() {
    console.log("componentwillmount");

    // Orientation.removeOrientationListener(this._orientationChange);
    // Orientation.removeSpecificOrientationListener(
    //   this._specificOrientationChange
    // );
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

  componentDidMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.
    Orientation.lockToLandscapeLeft();
    const initial = Orientation.getInitialOrientation();
    this.setState({
      currentOrientation: "Current Device Orientation: " + initial,
    });

    //Listner for general orientation LANDSCAPE / PORTRAIT
    Orientation.addOrientationListener(this._orientationChange);

    //Listner for more Specific Orientation
    //LANDSCAPE-LEFT / LANDSCAPE-RIGHT / PORTRAIT / PORTRAITUPSIDEDOWN / UNKNOWN
    Orientation.addSpecificOrientationListener(this._specificOrientationChange);
  }

  _orientationChange = (orientation) => {
    this.setState({
      currentOrientation: "Current Device Orientation: " + orientation,
    });
  };

  _specificOrientationChange = (specificOrientation) => {
    this.setState({
      currentSpecificOrientation:
        "Current Device Specific Orientation: " + specificOrientation,
    });
  };

  _getCurrentOrientation() {
    Orientation.getOrientation((err, orientation) => {
      alert("Orientation: " + orientation);
    });
  }
  _getCurrentSpecificOrientation() {
    Orientation.getSpecificOrientation((err, specificOrientation) => {
      alert("Specific Orientation: " + specificOrientation);
    });
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
    var b = [1, 2, 3, 99, 32, 55, 66, 78];
    var c = [1, 20, 30, 9, 30, 5, 68, 77];
    // var b =[]
    // var c =[]

    return (
      <ScrollView>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={styles.dropdown}>
            <View style={{ width: "100%" }}>
              <Dropdown
                style={{ color: "white" }}
                containerStyle={{
                  paddingLeft: 8,
                  borderBottomWidth: 0,
                  justifyContent: "center",
                  width: "100%",
                }}
                inputContainerStyle={{ borderBottomColor: "transparent" }}
                fontSize={hp(2)}
                dropdownOffset={{ top: 0, left: 0 }}
                dropdownMargins={{ min: 0, max: 0 }}
                dropdownPosition={-4.2}
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
                value={"Quarter 1"}
              />
            </View>
          </View>

          <View style={styles.toptext}>
            <Text
              style={{
                fontSize: 12,
                color: "white",
                fontFamily: "Montserrat-Bold",
              }}
            >
              San Francisco 49ers (H)
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
                Orientation.lockToPortrait(),
                  this.props.navigation?.goBack(null);
              }}
            />
          </View>
        </View>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.sidetext, { width: "6%" }]}>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontFamily: "Montserrat-Bold",
                textAlign: "center",
              }}
            >
              Arizona Cardinals
            </Text>
          </View>
          <ScrollView scrollEnabled={true} horizontal={true}>
            <View
              style={{ backgroundColor: "#EEEEEE", padding: 0, width: "100%" }}
            >
              {data.map((item, index) => {
                if (index < 10) {
                  if (index == 0) {
                    return (
                      <View style={{ flexDirection: "row" }}>
                        {data.map((item, index) => {
                          a = a + 1;
                          if (index == 0) {
                            return (
                              <View style={[styles.header1, { width: 80 }]}>
                                {c.includes(a) ? (
                                  <View
                                    style={{
                                      backgroundColor: "#888888",
                                      width: 60,
                                      height: 39,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        color: c.includes(a)
                                          ? "white"
                                          : "black",
                                      }}
                                    >
                                      {a}
                                    </Text>
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      backgroundColor: b.includes(a)
                                        ? "#68bcbc"
                                        : "white",
                                      width: 60,
                                      height: 39,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    {b.includes(a) ? (
                                      <View
                                        style={{
                                          justifyContent: "flex-end",
                                          width: 60,
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
                                        color: b.includes(a)
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
                          } else {
                            return (
                              <View style={[styles.header1]}>
                                {c.includes(a) ? (
                                  <View
                                    style={{
                                      backgroundColor: "#888888",
                                      width: 60,
                                      height: 39,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        color: c.includes(a)
                                          ? "white"
                                          : "black",
                                      }}
                                    >
                                      {a}
                                    </Text>
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      backgroundColor: b.includes(a)
                                        ? "#68bcbc"
                                        : "white",
                                      width: 60,
                                      height: 39,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    {b.includes(a) ? (
                                      <View
                                        style={{
                                          justifyContent: "flex-end",
                                          width: 60,
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
                                        color: b.includes(a)
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
                                  { height: 40, width: 80, marginTop: 0.5 },
                                ]}
                              >
                                {c.includes(a) ? (
                                  <View
                                    style={{
                                      backgroundColor: "#888888",
                                      width: 60,
                                      height: 39,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        color: c.includes(a)
                                          ? "white"
                                          : "black",
                                      }}
                                    >
                                      {a}
                                    </Text>
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      backgroundColor: b.includes(a)
                                        ? "#68bcbc"
                                        : "white",
                                      width: 60,
                                      height: 39,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    {b.includes(a) ? (
                                      <View
                                        style={{
                                          justifyContent: "flex-end",
                                          width: 60,
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
                                        color: b.includes(a)
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
                          } else {
                            return (
                              <View
                                style={[
                                  styles.header2,
                                  { height: 40, marginTop: 0.5 },
                                ]}
                              >
                                {c.includes(a) ? (
                                  <View
                                    style={{
                                      backgroundColor: "#888888",
                                      width: 60,
                                      height: 39,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        color: c.includes(a)
                                          ? "white"
                                          : "black",
                                      }}
                                    >
                                      {a}
                                    </Text>
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      backgroundColor: b.includes(a)
                                        ? "#68bcbc"
                                        : "white",
                                      width: 60,
                                      height: 39,
                                      justifyContent: "center",
                                      alignItems: "center",
                                      alignContent: "center",
                                    }}
                                  >
                                    {b.includes(a) ? (
                                      <View
                                        style={{
                                          justifyContent: "flex-end",
                                          width: 60,
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
                                        color: b.includes(a)
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
        {/* <View style={{ width: '95%',margin:10,borderRadius: 3}}>
                    <TouchableOpacity onPress={() => { alert('hello udda')}} style={styles.placebutton} >
                     <View>
                      <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(3.8), color: 'white' }}> ACCEPT </Text>
                      <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row'}}>
                      <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Semibold', fontSize: hp(2.5) }}> Total Amount : </Text>
                      <Image source={require('../../../../images/buck_dark.png')} style={{ height: 13, width: 13}} />
                      <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(2.7) }}>100.00</Text>
                      <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Semibold', fontSize: hp(2.5) }}>(5 Squares)</Text>
                      </View>
                     
                  </View>
                    </TouchableOpacity>
              </View>
              <View style={{padding:0}}>
              <Text style={{ fontSize: 14, color: '#69bbbb', fontFamily: 'Montserrat-Semibold',padding:5,textAlign:'center',textDecorationLine:'underline',textDecorationColor: "#888888"}} onPress={()=>{alert('hello udda')}}>Not now,I think I'II pass</Text>
              </View> */}
      </ScrollView>
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

export default connect(mapStateToProps)(ZoomSquare);
