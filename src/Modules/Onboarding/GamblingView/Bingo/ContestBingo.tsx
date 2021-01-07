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
import Icons from 'react-native-vector-icons/MaterialIcons';
var update = require("immutability-helper");
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
  key: "somethun",
  page_title: "CREATE BINGO",
};

interface G_ContestBingoViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus;
  getProfileResponse?: GetProfileResponse;
  getProfileError?: UDDAError;

  serviceKey?: string;
  listeners?: any;
}

interface G_ContestBingoViewState extends AppValidationComponentState {
  shift: any;
  loader: any;
  data: any;
  bingodata: any;
  detailmodel: any;
  contestdata: any;
  bingoid: any;
  selectedgift: any;
  selectedCard: any;
  creatorGift: any;
  creatorselectedgift: any;
  creatorcard: any;
  imagezoom: any;
  annoucedCard: any;
  accepterClickCard:any;
  acceptorgift:any;
}

class G_ContestBingoView
  extends AppValidationComponent<
    G_ContestBingoViewProps,
    G_ContestBingoViewState
  >
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

  constructor(props: G_ContestBingoViewProps) {
    super(props);
    this.touchable = createRef();
    this.state = {
      shift: new Animated.Value(0),
      loader: false,
      detailmodel: false,
      contestdata: {},
      data: ["1", "2", "3", "4", "5"],
      bingodata: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "1",
        "2",
        "3",
        "4",
        "5",
        "1",
        "2",
        "3",
        "4",
        "5",
        "1",
        "2",
        "3",
        "4",
        "5",
        "1",
        "2",
        "3",
        "4",
        "5",
      ],
      bingoid: "",
      selectedgift: [],
      selectedCard: [],
      creatorGift: [],
      creatorselectedgift: [],
      creatorcard: false,
      imagezoom: false,
      annoucedCard: false,
      accepterClickCard:[],
      acceptorgift:[]
    };
  }

  async componentDidMount() {
    if (this.props.navigation.state.params.bingo_data.creator_index == 0) {
      this.setState({ annoucedCard: true });
    }
    // console.log(this.props.navigation.state.params.bingo_data);
    this.getcontestDetail(this.props.navigation.state.params.bingo_data);
    this.getcreatorcontestDetail(
      this.props.navigation.state.params.bingo_data.bingo_id
    );
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
  componentWillReceiveProps(nextProps: G_ContestBingoViewProps) {
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
  // ----------------------------------------------- Api calling ---------------------------------------
  getcreatorcontestDetail(value: any) {
    this.setState({ loader: true });
    var params: any = {
      bingo_id: value,
    };
    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }
    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/Custom_bingo/host_gifts",
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
        console.log(
          "bingo_gift creator contest response : " +
            JSON.stringify(responseJson)
        );
        this.setState({ loader: false });

        this.setState({ creatorGift: responseJson.data.all_gifts });
        // this.setState({ bingoid: responseJson.data.custom_bingo_info.id });

        // this.setState({ bingodata: responseJson.data.user_bingo_cards });

        if (responseJson.message == "Access Expired.") {
          AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // LogoutUtill.logoutButtonPressed(this.props);
        }
      })
      .catch((error) => {
        this.setState({ loader: false });
        console.log(error);
      });
  }

  getcontestDetail(value: any) {
    this.setState({ loader: true });
    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/custom_bingo/contest_view_bingo_info/" +
        value.id,
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
          "bingo_gift contest response : " + JSON.stringify(responseJson)
        );
        this.setState({ loader: false });
        var that = this;
        // responseJson.data.gift_announced_by_host[0]((item,i)=>{
        //   console.log('gift io>>>'+item.gift_id)
        //   that.state.selectedgift.push(item.gift_id)
        // })
        console.log(
          "gift io>>>" + responseJson.data.gift_announced_by_host.length
        );
        for (
          let i = 0;
          i < responseJson.data.gift_announced_by_host.length;
          i++
        ) {
          console.log(
            "gift io>>>" + responseJson.data.gift_announced_by_host[i].gift_id
          );
          that.state.selectedgift.push(
            responseJson.data.gift_announced_by_host[i].gift_id
          );
          // b.push(responseJson.data.custom_square_info.away_team_name[i])
        }
        this.setState({ contestdata: responseJson.data.custom_bingo_info });
        this.setState({ bingoid: responseJson.data.custom_bingo_info.id });
        // this.setState({ acceptorgift: responseJson.data.bingo_card_winner_gifts });

        // var card = responseJson.data.user_bingo_cards;

        // card.splice(12,0,{
        //   "gift_id": "1000",
        //   "gift_name": "ashish"
        // });
        // console.log('splice data : ',card)
        this.setState({ bingodata: responseJson.data.user_bingo_cards });

        //   var a =  moment(this.state.gamedetail.game_start_time_stamp * 1000).format('LT') +' '+ new Date(this.state.gamedetail.game_start_time_stamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(this.state.gamedetail.game_start_time_stamp * 1000).toString().split(' ')[6].length - 2) +' '+ moment(this.state.gamedetail.game_start_time_stamp * 1000).format('LL')
        //   this.setState({gamedetailtime:a})
        //   this.setState({detailmodel:true})

        // console.log('Success openplay gamedetail :  ',JSON.stringify(this.state.data));
        // this.setState({ dialogVisible: true });
        if (responseJson.message == "Access Expired.") {
          AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // LogoutUtill.logoutButtonPressed(this.props);
        }
      })
      .catch((error) => {
        this.setState({ loader: false });
        console.log(error);
      });
  }

  Statusupdate(value: any) {
    this.setState({ loader: true });

    var params: any = {
      bingo_id: this.state.bingoid,
      match_status: value,
    };
    //1 for start
    //2 for close
    //3 for cancel
    console.log("create bingo paramete", params);
    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(
      UrlService.CONSTURI +
        "index.php/" +
        UrlService.APIVERSION3 +
        "/Custom_bingo/match_status_update_by_host",
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
        var that = this;

        //   this.setState({ customProbBetList: responseJson.data });

        AlertUtil.showSingleActionMessage(responseJson.message, function () {
          that.setState({ loader: false });
          that.getcontestDetail(that.props.navigation.state.params.bingo_data);
        });

        if (value == "2") {
          that.setState({ selectedgift: [] });
          that.setState({ selectedCard: [] });
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

  CancelBingo() {
    this.setState({ loader: true });

    var params: any = {
      bingo_id: this.state.bingoid,
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
        "/Custom_bingo/bingo_cancelled_by_host",
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
        // that.setState({ loader: false });
        //   this.setState({ customProbBetList: responseJson.data });
        var that = this;
        // that.getcontestDetail(that.props.navigation.state.params.bingo_data)

        AlertUtil.showSingleActionMessage(responseJson.message, function () {
          that.setState({ loader: false });
          that.getcontestDetail(that.props.navigation.state.params.bingo_data);
        });

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

  GiftAnnouncementByHost(index: any) {
    if (false) {
      AlertUtil.show("Please select gift !");
    } else {
      this.setState({ loader: true });
      //  console.log('gift ig'+this.state.selectedgift.toString())
      var params: any = {
        bingo_id: this.state.bingoid,
        gift_id: index,
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
          "/Custom_bingo/gift_announcement_by_host",
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
          // this.setState({ loader: false })
          var that = this;
          //   this.setState({ customProbBetList: responseJson.data });
          // this.getcontestDetail(this.props.navigation.state.params.bingo_data)
          if (responseJson.error == "1") {
            // AlertUtil.show(responseJson.message);
            AlertUtil.showSingleActionMessage(
              responseJson.message,
              function () {
                that.setState({ loader: false });
              }
            );
          } else {
            this.setState({ loader: false });
            // this.state.selectedgift.push(index),
            // this.state.selectedCard.push(m+'.'+n),
            this.state.selectedgift.push(index),
              this.setState({ selectedgift: this.state.selectedgift });

            // this.setState({ selectedgift: this.state.selectedgift });
            // this.setState({ selectedCard: this.state.selectedCard });
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
  }

  SubmitBingo() {
    // that.setState({ loader: false });
    //  var that = this;
    //   that.setState({ imagezoom:true});
    //   setTimeout(function(){
    //     that.setState({ imagezoom:false});

    //   },2000)

    // return;

    if (this.state.contestdata.winner_flag == "1") {
      AlertUtil.show("You are already Winner");

      return;
    }

    var isCardCompleted: any = false;
    if (this.state.selectedgift.length == 0 && this.state.accepterClickCard.length == 0) {
      AlertUtil.show("Please select gift !");
    } else {
      var that = this;
      //   console.log('gift ig'+this.state.selectedgift.toString())
      //   console.log('gift card'+this.state.selectedCard.sort().toString())
      //   //2.1,2.2,2.3,3.4,4.3
      //   var arrD1 = ['1.1','2.2','4.4','5.5'] ; var arrD2 = ['1.5','2.4','4.2','5.1'] ; var countD1 = 0;var countD2 = 0;

      //   for (var l = 0; l < arrD2.length; l++) {
      //     if( that.state.selectedCard.sort().indexOf(arrD2[l]) > -1)
      //     {
      //       countD2++
      //       if(countD2 == 4)
      //       {
      //         isCardCompleted = true;
      //       }
      //     }
      //     // else{
      //     //   isCardCompleted = false
      //     // }
      //   }

      //   for (var k = 0; k < arrD1.length; k++) {
      //   if( that.state.selectedCard.sort().indexOf(arrD1[k]) >-1)
      //   {
      //     countD1 ++
      //     if(countD1 == 4)
      //     {
      //       isCardCompleted = true;
      //     }
      //   }
      //   // else{
      //   //   isCardCompleted = false
      //   // }
      //  }
      //  console.log(countD1+'>>>pky '+countD2)
      // //  return
      //   for (var i = 1; i < 6 ; i++) {

      //           var countx = 0 ;  var county = 0 ;

      //           for (var j = 0; j < this.state.selectedCard.sort().length; j++) {

      //             if(this.state.selectedCard[j].split('.')[0] == i)
      //             {
      //               countx ++
      //               if(countx == 5)
      //               {
      //                 isCardCompleted = true;
      //                 console.log(i+'is count you can submit'+countx)
      //                 break;
      //               }
      //               if(i == 3 && countx == 4)
      //               {
      //                 isCardCompleted = true;
      //                 console.log(i+'is count you can submit'+countx)
      //                 break;
      //               }
      //             }

      //             if(this.state.selectedCard[j].split('.')[1] == i)
      //             {
      //               county ++
      //               if(county == 5)
      //               {
      //                 isCardCompleted = true;
      //                 console.log(i+'is count you can submit'+county)
      //                 break;
      //               }
      //               if(i == 3 && county == 4)
      //               {
      //                 isCardCompleted = true;
      //                 console.log(i+'is count you can submit '+county)
      //                 break;
      //               }
      //             }

      //           }

      //  }

      //this.state.selectedgift

      // this.state.bingodata.map((item,i)=>{
      //  // console.log(item.gift_id);

      //   });

      //   isCardCompleted = false;
      console.log("craeter>>" + isCardCompleted);
      var arrC1 = [0, 5, 10, 15, 20];
      var arrC2 = [1, 6, 11, 16, 21];
      var arrC3 = [2, 7, 17, 22];
      var arrC4 = [3, 8, 13, 18, 23];
      var arrC5 = [4, 9, 14, 19, 24];
      var arrCD6 = [0, 6, 18, 24];
      var arrCD7 = [20, 16, 8, 4];
      var arrR1 = [0, 1, 2, 3, 4];
      var arrR2 = [5, 6, 7, 8, 9];
      var arrR3 = [10, 11, 13, 14];
      var arrR4 = [15, 16, 17, 18, 19];
      var arrR5 = [20, 21, 22, 23, 24];

      this.state.selectedgift.length;

      if(this.props.navigation.state.params.bingo_data.creator_index == 0 ){

      var CL = 0;
      for (var c1 = 0; c1 < arrC1.length; c1++) {
        var index = arrC1[c1];

        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
        // else{
        //   isCardCompleted = false
        // }
      }
      CL = 0;
      for (var c2 = 0; c2 < arrC2.length; c2++) {
        var index = arrC2[c2];
        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }
      CL = 0;
      for (var c3 = 0; c3 < arrC3.length; c3++) {
        var index = arrC3[c3];
        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 4) {
          isCardCompleted = true;
        }
      }
      CL = 0;
      for (var c4 = 0; c4 < arrC4.length; c4++) {
        var index = arrC4[c4];
        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }
      CL = 0;
      for (var c5 = 0; c5 < arrC5.length; c5++) {
        var index = arrC5[c5];
        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }

      CL = 0;

      for (var r1 = 0; r1 < arrR1.length; r1++) {
        var index = arrR1[r1];

        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var r2 = 0; r2 < arrR2.length; r2++) {
        var index = arrR2[r2];

        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var r3 = 0; r3 < arrR3.length; r3++) {
        var index = arrR3[r3];

        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 4) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var r4 = 0; r4 < arrR4.length; r4++) {
        var index = arrR4[r4];

        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }
      CL = 0;
      for (var r5 = 0; r5 < arrR5.length; r5++) {
        var index = arrR5[r5];

        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var cd6 = 0; cd6 < arrCD6.length; cd6++) {
        var index = arrCD6[cd6];

        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 4) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var cd7 = 0; cd7 < arrCD7.length; cd7++) {
        var index = arrCD7[cd7];

        if (
          this.state.selectedgift.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 4) {
          isCardCompleted = true;
        }
      }



    }
    else
    {
      var CL = 0;
      for (var c1 = 0; c1 < arrC1.length; c1++) {
        var index = arrC1[c1];

        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
        // else{
        //   isCardCompleted = false
        // }
      }
      CL = 0;
      for (var c2 = 0; c2 < arrC2.length; c2++) {
        var index = arrC2[c2];
        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }
      CL = 0;
      for (var c3 = 0; c3 < arrC3.length; c3++) {
        var index = arrC3[c3];
        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 4) {
          isCardCompleted = true;
        }
      }
      CL = 0;
      for (var c4 = 0; c4 < arrC4.length; c4++) {
        var index = arrC4[c4];
        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }
      CL = 0;
      for (var c5 = 0; c5 < arrC5.length; c5++) {
        var index = arrC5[c5];
        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }

      CL = 0;

      for (var r1 = 0; r1 < arrR1.length; r1++) {
        var index = arrR1[r1];

        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var r2 = 0; r2 < arrR2.length; r2++) {
        var index = arrR2[r2];

        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var r3 = 0; r3 < arrR3.length; r3++) {
        var index = arrR3[r3];

        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 4) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var r4 = 0; r4 < arrR4.length; r4++) {
        var index = arrR4[r4];

        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }
      CL = 0;
      for (var r5 = 0; r5 < arrR5.length; r5++) {
        var index = arrR5[r5];

        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 5) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var cd6 = 0; cd6 < arrCD6.length; cd6++) {
        var index = arrCD6[cd6];

        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 4) {
          isCardCompleted = true;
        }
      }

      CL = 0;
      for (var cd7 = 0; cd7 < arrCD7.length; cd7++) {
        var index = arrCD7[cd7];

        if (
          this.state.accepterClickCard.indexOf(that.state.bingodata[index].gift_id) >
          -1
        ) {
          CL++;
        }
        if (CL == 4) {
          isCardCompleted = true;
        }
      }
    }
      if (isCardCompleted) {
        //AlertUtil.show('you can submit')
      } else {
        AlertUtil.show("you can submit once you five in a row.");
        return;
      }

      //return;

      this.setState({ loader: true });
      var params: any = {
        bingo_id: this.state.bingoid,
        bingo_gift_ids: this.props.navigation.state.params.bingo_data.creator_index == 0 ? this.state.selectedgift.toString() : this.state.accepterClickCard.toString(), 
      };
      console.log("create bingo paramete", params);
      var formData = new FormData();

      for (var m in params) {
        formData.append(m, params[m]);
      }

      fetch(
        UrlService.CONSTURI +
          "index.php/" +
          UrlService.APIVERSION3 +
          "/Custom_bingo/bingo_api",
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
          console.log("submit bingo", JSON.stringify(responseJson));
          var that = this;

          if (responseJson.error == "0") {
            that.setState({ loader: false });
            that.setState({ imagezoom: true });
            setTimeout(function () {
              that.setState({ imagezoom: false });
            }, 4000);

            setTimeout(function () {
              AlertUtil.showSingleActionMessage(
                responseJson.message,
                function () {
                  that.getcontestDetail(
                    that.props.navigation.state.params.bingo_data
                  );
                }
              );
            }, 4500);
          } else {
            AlertUtil.showSingleActionMessage(
              responseJson.message,
              function () {
                that.setState({ loader: false });
                that.getcontestDetail(
                  that.props.navigation.state.params.bingo_data
                );
              }
            );
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

  acceptGift(index, m: any, n: any) {
    if (this.state.contestdata.creator_index == 0) {
      //this.GiftAnnouncementByHost(index,m,n);
    } else {
      // this.state.selectedgift.push(index),
      //   this.state.selectedCard.push(m + "." + n),
      //   this.setState({ selectedgift: this.state.selectedgift });
      // this.setState({ selectedCard: this.state.selectedCard });

       this.state.accepterClickCard.push(index),
        this.state.selectedCard.push(m + "." + n),
        this.setState({ accepterClickCard: this.state.accepterClickCard });
      this.setState({ selectedCard: this.state.selectedCard });
     
    }
  }

  // removeGift(e,m:any,n:any) {
  //   if(this.state.contestdata.creator_index==0){
  //    return;
  //     }
  //   var array = this.state.selectedgift;
  //   var array1 = this.state.selectedCard;
  //   var  index1 = array.indexOf(m+'_'+n);
  //   var index = array.indexOf(e); // Let's say it's Bob.
  //   // delete array[index];
  //   if (index > -1) {
  //     array.splice(index, 1);
  //   }
  //   if (index1 > -1) {
  //     array1.splice(m+'_'+n, 1);
  //   }
  //   this.setState({ selectedCard: array1 });
  //   this.setState({ selectedgift: array });
  // }

  // acceptGift(index,m:any,n:any) {
  //   if(this.state.contestdata.creator_index==0){
  //   this.GiftAnnouncementByHost(index);
  //   }
  //     this.state.selectedgift.push(index),
  //     this.state.selectedCard.push(m+'.'+n),
  //     this.setState({ selectedgift: this.state.selectedgift });
  //     this.setState({ selectedCard: this.state.selectedCard });

  //   }

  removeGift(e, m: any, n: any) {
    if (this.state.contestdata.creator_index == 0) {
      return;
    }
    var array = this.state.accepterClickCard;
    var array1 = this.state.selectedCard;
    var index1 = array1.indexOf(m + "." + n);
    console.log(index1);
    var index = array.indexOf(e); // Let's say it's Bob.
    // delete array[index];
    if (index > -1) {
      array.splice(index, 1);
    }
    if (index1 > -1) {
      array1.splice(index1, 1);
    }
    this.setState({ selectedCard: array1 });
    this.setState({ accepterClickCard: array });
  }

  acceptcreatorGift(index) {
    if (
      this.state.contestdata.bingo_match_status == 1 &&
      this.state.contestdata.creator_index == "0"
    ) {
      this.GiftAnnouncementByHost(index);
      // this.state.selectedgift.push(index),
      // this.setState({ selectedgift: this.state.selectedgift });
    }
  }

  removecreatorGift(e) {
    var array = this.state.creatorselectedgift;
    var index = array.indexOf(e); // Let's say it's Bob.
    // delete array[index];
    if (index > -1) {
      array.splice(index, 1);
    }
    this.setState({ creatorselectedgift: array });
  }
  // -----------------------------------------------Design and Design Methods---------------------------------------

  render() {
    return (
      <Container
        title={this.props.navigation.state.params.bingo_data.name + " Bingo"}
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
        {/* <View style={{width:'20%',justifyContent:'center',alignContent:'center'}}>
                   <TouchableOpacity onPress={() => { 
                      this.setState({annoucedCard:true}); 

                      // this.props.navigation.state.params.bingo_data.creator_index =0;
                      // this.state.contestdata.creator_index=0;
                      //   this.state.contestdata.bingo_match_status=0;
                      }}>


              <View style={[styles.CloseView,]}>
              <Icon name="arrow-left" size={25} color="BLACK"/>
              </View>
            </TouchableOpacity>           
</View> */}

        {/* {this.state.contestdata.creator_index == '1' && !this.state.annoucedCard ? <View style={{width:'100%',height:30,justifyContent:'center',alignContent:'flex-end',alignItems:'flex-end'}}>
                   <TouchableOpacity  onPress={() => { 
                      this.setState({annoucedCard:true}); 

                      // this.props.navigation.state.params.bingo_data.creator_index =0;
                      // this.state.contestdata.creator_index=0;
                      //   this.state.contestdata.bingo_match_status=0;
                      }} style={{  justifyContent:'center',alignItems:'center',alignContent:'center' }}>
                   <Image source={require('../../../../images/my-card.png')} resizeMode="stretch"
                                style={{ height:'100%' }}></Image>
                     </TouchableOpacity>             
                   </View>
                   :null
                    } */}

        <Modal visible={this.state.imagezoom} transparent={true}>
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../../../images/gifts_bg/bingo_animation.gif")}
              resizeMode="stretch"
              style={{ width: "100%", height: "60%" }}
            >
              {/* <View  style={{  position: 'absolute',  justifyContent: 'center', bottom: '2%' ,width:'100%',alignContent:'center',alignItems:'center'}}>
                                <View style={{width:'90%',justifyContent:'space-between',flexDirection:'row'}}>
                                <Text 
                                  style={{marginTop:15,fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), textDecorationLine:  'underline',color:'#68bcbc'}}
                                   onPress={()=>{this.saveoverlay()}}
                                   >Don't show again</Text>
                                   <TouchableOpacity  onPress={()=>this.closecurrent()}>
                       <Image source={require('../../../../images/close_overlay.png')}  style={{height:50,width:50 }}></Image>
                       </TouchableOpacity>

                                </View>
                                  </View> */}
            </ImageBackground>
          </View>
        </Modal>
        <ProgressLoader
          visible={this.state.loader}
          isModal={true}
          isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"}
        />
        {/* creator card ui start */}
        <Modal visible={this.state.creatorcard} transparent={false}>
          <Modal visible={this.state.imagezoom} transparent={true}>
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={require("../../../../images/gifts_bg/bingo_animation.gif")}
                resizeMode="stretch"
                style={{ width: "100%", height: "60%" }}
              >
                {/* <View  style={{  position: 'absolute',  justifyContent: 'center', bottom: '2%' ,width:'100%',alignContent:'center',alignItems:'center'}}>
                                <View style={{width:'90%',justifyContent:'space-between',flexDirection:'row'}}>
                                <Text 
                                  style={{marginTop:15,fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), textDecorationLine:  'underline',color:'#68bcbc'}}
                                   onPress={()=>{this.saveoverlay()}}
                                   >Don't show again</Text>
                                   <TouchableOpacity  onPress={()=>this.closecurrent()}>
                       <Image source={require('../../../../images/close_overlay.png')}  style={{height:50,width:50 }}></Image>
                       </TouchableOpacity>

                                </View>
                                  </View> */}
              </ImageBackground>
            </View>
          </Modal>
          <SafeAreaView>
            <ProgressLoader
              visible={this.state.loader}
              isModal={true}
              isHUD={true}
              hudColor={"#68bcbc"}
              color={"#FFFFFF"}
            />
            <View style={{}}>
              <View
                style={{
                  height: "10%",
                  width: "100%",
                  backgroundColor: "#69bbbb",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ creatorcard: false });
                    }}
                  >
                    <View style={[styles.CloseView1]}>
                      <Icon name="arrow-left" size={25} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "55%",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.customheadtext,
                      { color: "white", marginBottom: 2 },
                    ]}
                  >
                    {this.state.contestdata.bingo_type_id=='1' ?'ANNOUNCE GIFTS':'ANNOUNCE ACTIONS'}
                  </Text>
                </View>
                <View
                  style={{
                    width: "25%",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <Text style={[styles.customheadtext,{color:'white',marginBottom:2}]} onPress={()=>{this.setState({creatorcard:true})}}>MY CARDS</Text> */}
                </View>
              </View>
              {/* <View style={{padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
    <Text onPress={()=>{this.setState({creatorcard:false})}}> Back</Text>

  </View> */}

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
                  var b = require("../../../../images/gifts_bg/Gift_1.png");

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
   
                  {
                    i == 0 ? (n = 1) : (m = m);
                  }
                  {
                    i == 1 ? (n = 2) : (m = m);
                  }
                  {
                    i == 2 ? (n = 3) : (m = m);
                  }
                  {
                    i == 3 ? (n = 4) : (m = m);
                  }
                  {
                    i == 4 ? (n = 5) : (m = m);
                  }
  
                  {
                    i == 5 ? (n = 1) : (m = m);
                  }
                  {
                    i == 6 ? (n = 2) : (m = m);
                  }
                  {
                    i == 7 ? (n = 3) : (m = m);
                  }
                  {
                    i == 8 ? (n = 4) : (m = m);
                  }
                  {
                    i == 9 ? (n = 5) : (m = m);
                  }
  
                  {
                    i == 10 ? (n = 1) : (m = m);
                  }
                  {
                    i == 11 ? (n = 2) : (m = m);
                  }
                  {
                    i == 12 ? (n = 3) : (m = m);
                  }
                  {
                    i == 13 ? (n = 4) : (m = m);
                  }
                  {
                    i == 14 ? (n = 5) : (m = m);
                  }
                  {
                    i == 15 ? (n = 1) : (m = m);
                  }
                  {
                    i == 16 ? (n = 2) : (m = m);
                  }
                  {
                    i == 17 ? (n = 3) : (m = m);
                  }
                  {
                    i == 18 ? (n = 4) : (m = m);
                  }
                  {
                    i == 19 ? (n = 5) : (m = m);
                  }
  
                  {
                    i == 20 ? (n = 1) : (m = m);
                  }
                  {
                    i == 21 ? (n = 2) : (m = m);
                  }
                  {
                    i == 22 ? (n = 3) : (m = m);
                  }
                  {
                    i == 23 ? (n = 4) : (m = m);
                  }
                  {
                    i == 24 ? (n = 5) : (m = m);
                  }
  
                  console.log("mat" + m + "_" + n);
//  var a="../../../../images/gifts_bg/Gift_"+b+".png"
                  // console.log('myindex-----',i)
                  return (
                    <View
                      style={[
                        styles.squareBox,
                        {
                          backgroundColor: this.state.selectedgift.includes(
                            item.gift_id
                          )
                            ? "#fff"
                            : "#fff",
                        },
                      ]}
                    >
                      <ImageBackground
                        source={
                          i == 12
                            ? this.state.contestdata.bingo_type_id=='1' ? require("../../../../images/gifts_bg/bingo.png"):require("../../../../images/Football_center.jpeg")
                            :this.state.selectedgift.includes(item.gift_id )? this.state.contestdata.bingo_type_id=='1' ?require("../../../../images/babybingo_selected_thumb_bg.png"):require("../../../../images/football_selected_thumb_bg.png"):null
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
                          //    onPress={() => {(i == 12) ?null:AlertUtil.show('Click Work: ' + item.gift_name)}}
                          onPress={() => {
                            i == 12
                              ? null
                              : this.state.contestdata.bingo_match_status == 1
                              ? this.state.selectedgift.includes(item.gift_id)
                                ? this.removeGift(item.gift_id, m, n)
                                : this.acceptGift(item.gift_id, m, n)
                              : null;
                          }}
                          // onPress={() => {(i == 12) ?null:this.state.selectedgift.includes(item.gift_id)?this.removeGift(item.gift_id,m,n) : this.acceptGift(item.gift_id,m,n)}}
                        >
                          <View>
                            <Text
                              style={{ color:this.state.contestdata.bingo_type_id=='1'? c:'', textAlign: "center" }}
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
              {this.state.contestdata.creator_index == 0 &&
              this.state.contestdata.bingo_match_status == 0 ? (
                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                      flexDirection: "row",
                    },
                  ]}
                ></View>
              ) : this.state.contestdata.creator_index == 0 &&
                this.state.contestdata.bingo_match_status == 1 ? (
                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                      flexDirection: "row",
                    },
                  ]}
                >
                  {/* <TouchableHighlight
                            style={[styles.createsquaare, { width: '45%',height: hp(8.0),marginRight:10 }]}
                        onPress={() => this.Statusupdate('2')}
                        // onPress={() => AlertUtil.show('Button Work')}
                            underlayColor='#fff'>
                            <View>
                            <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>END BINGO{'\n'}CONTEST</Text>                            
                            </View>
                        </TouchableHighlight> */}
                  {this.state.contestdata.creator_index == 0 &&
                  (this.state.contestdata.is_bet == "0" ||
                    this.state.contestdata.winner_flag == "1") ? null : (
                    <TouchableHighlight
                      style={[
                        styles.createsquaare,
                        { width: "90%", height: hp(8.0) },
                      ]}
                      onPress={() => this.SubmitBingo()}
                      // onPress={() => AlertUtil.show('Button Work')}
                      underlayColor="#fff"
                    >
                      <View>
                        <Text
                          style={[
                            styles.createsquaaretext,
                            { fontSize: hp(2.7) },
                          ]}
                        >
                          SUBMIT BINGO
                        </Text>
                      </View>
                    </TouchableHighlight>
                  )}
                </View>
              ) : null}

              {this.state.contestdata.creator_index == 1 &&
              this.state.contestdata.bingo_match_status == 1 &&
              this.state.contestdata.winner_flag == "0" ? (
                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                      flexDirection: "row",
                    },
                  ]}
                >
                  <TouchableHighlight
                    style={[
                      styles.createsquaare,
                      { width: "45%", height: hp(8.0) },
                    ]}
                    onPress={() => this.SubmitBingo()}
                    // onPress={() => AlertUtil.show('Button Work')}
                    underlayColor="#fff"
                  >
                    <View>
                      <Text
                        style={[
                          styles.createsquaaretext,
                          { fontSize: hp(2.7) },
                        ]}
                      >
                        SUBMIT{"\n"}BINGO{" "}
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              ) : null}
              {this.state.contestdata.creator_index == 0 &&
              this.state.contestdata.bingo_match_status == 0 ? (
                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.createsquaaretext,
                      { fontSize: hp(2.0), color: "#b9b7b7" },
                    ]}
                  >
                    Hit{" "}
                    <Text
                      style={[
                        styles.createsquaaretext,
                        { fontSize: hp(2.0), color: "grey" },
                      ]}
                    >
                      START
                    </Text>{" "}
                    to start the game
                  </Text>
                </View>
              ) : this.state.contestdata.creator_index == 0 &&
                this.state.contestdata.bingo_match_status == 1 ? (
                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.createsquaaretext,
                      { fontSize: hp(2.0), color: "#b9b7b7" },
                    ]}
                  >
                    {this.state.contestdata.bingo_type_id=='1' ?'Tap on box to anounce the gift.\n Hit':'Tap on box to anounce the action.\n Hit'}{" "}
                    <Text
                      style={[
                        styles.createsquaaretext,
                        { fontSize: hp(2.0), color: "grey" },
                      ]}
                    >
                      SUBMIT
                    </Text>{" "}
                    once you have five in a row.{"\n"}Hit{" "}
                    <Text
                      style={[
                        styles.createsquaaretext,
                        { fontSize: hp(2.0), color: "grey" },
                      ]}
                    >
                      CLOSE
                    </Text>{" "}
                    to end the game.
                  </Text>
                </View>
              ) : null}

              <View style={[styles.ThirdContainer, styles.itemCenter]}>
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
            </View>
            {this.state.detailmodel && (
              <BingoDetailComponent
                detailmodel={this.state.detailmodel}
                encrypted_bingo_id={
                  this.props.navigation.state.params.bingo_data.id
                }
                onDismiss={() => {
                  this.closeModal();
                }}
              />
            )}
          </SafeAreaView>
        </Modal>
         {/* creator card ui end */}

        {this.state.annoucedCard ? (
          
          <View style={{ flex: 1 }}>
             {/* creator gift list ui start */}
            <View
              style={{
                height: "6%",
                width: "100%",
                justifyContent: "center",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: "12%",
                  justifyContent: "center",
                  // alignContent: "center",
                  // alignItems: "center",
                }}
              >
                <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 5 }}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>
              <View
                style={{
                  width: "65%",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    styles.customheadtext,
                    { color: "#68bcbc", marginBottom: 1, marginTop: 0 },
                  ]}
                >
                  {this.props.navigation.state.params.bingo_data.name +
                    " Bingo"}{" "}
                </Text>
                {this.state.contestdata.creator_index == "0" ? (
                  <Text
                    style={[
                      styles.customheadtext,
                      { color: "grey", marginBottom: 1, marginTop: 0,fontSize:hp(1.5) },
                    ]}
                  >
                    {this.state.contestdata.bingo_type_id=='1' ?'Tap to announce the gift.':'Tap to announce the action.'}
                  </Text>
                ) : null}
              </View>
              {this.state.contestdata.is_bet == "0" &&  this.state.contestdata.creator_index == "0" ? (
                // changes for participent 
                <View
                  style={{
                    width: "23%",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    {/* <Image source={require('../../../../images/my-card.png')} resizeMode="stretch"
             style={{ width: '60%', height: '80%' }}></Image> */}
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    width: "23%",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.state.contestdata.creator_index == "0"
                        ? this.setState({ creatorcard: true })
                        : this.setState({ annoucedCard: false });
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../../../images/my-card.png")}
                      resizeMode="stretch"
                      style={{ width: "60%", height: "80%" }}
                    ></Image>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.itemCenter}>
              <View style={{ height: hp(65), width: "95%" }}>
                <ScrollView>
                  {this.state.creatorGift.map((item, index) => {
                    return (
                      // <View style={[styles.giftRow,{backgroundColor:'#accfcf'}]}>
                      <TouchableOpacity
                        onPress={() =>
                          this.state.selectedgift.includes(item.gift_id)
                            ? null
                            : this.acceptcreatorGift(item.gift_id)
                        }
                      >
                        <View
                          style={[
                            styles.giftRow,
                            {
                              backgroundColor: this.state.selectedgift.includes(
                                item.gift_id
                              )
                                ? "#d0edeb"
                                : "#fff",
                            },
                          ]}
                        >
                          <View
                            style={{ width: "85%", justifyContent: "center" }}
                          >
                            <Text
                              style={{
                                fontFamily: "Montserrat-Bold",
                                fontSize: hp(2.2),
                                paddingLeft: 20,
                              }}
                            >
                              {item.gift_name}
                            </Text>
                          </View>
                          <View style={[styles.itemCenter, { width: "15%" }]}>
                            {this.state.selectedgift.includes(item.gift_id) ? (
                              <Icon name="check" size={25} color="#68bcbc" />
                            ) : null}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <View style={[styles.ThirdContainer, styles.itemCenter]}>
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
              </View>

              {this.state.contestdata.creator_index == 0 &&
              this.state.contestdata.bingo_match_status == 0 ? (
                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                      flexDirection: "row",
                    },
                  ]}
                >
                  <TouchableHighlight
                    style={[
                      styles.createsquaare,
                      { width: "46%", height: hp(8.0), marginRight: 10 },
                    ]}
                    onPress={() => this.Statusupdate("1")}
                    // onPress={() => AlertUtil.show('Button Work')}
                    underlayColor="#fff"
                  >
                    <View>
                      {this.state.contestdata.is_bet == "0" ? (
                        <Text
                          style={[
                            styles.createsquaaretext,
                            { fontSize: hp(2.7) },
                          ]}
                        >
                          START{"\n"}BINGO
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.createsquaaretext,
                            { fontSize: hp(2.7) },
                          ]}
                        >
                          START & PLAY {"\n"}BINGO{" "}
                        </Text>
                      )}
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={[
                      styles.createsquaare,
                      { width: "46%", height: hp(8.0) },
                    ]}
                    onPress={() => this.CancelBingo()}
                    // onPress={() => AlertUtil.show('Button Work')}
                    underlayColor="#fff"
                  >
                    <View>
                      <Text
                        style={[
                          styles.createsquaaretext,
                          { fontSize: hp(2.7) },
                        ]}
                      >
                        CANCEL{"\n"}BINGO
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              ) : this.state.contestdata.creator_index == 0 &&
                this.state.contestdata.bingo_match_status == 1 ? (
                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                      flexDirection: "row",
                    },
                  ]}
                >
                  <TouchableHighlight
                    style={[
                      styles.createsquaare,
                      { width: "90%", height: hp(8.0), marginRight: 10 },
                    ]}
                    onPress={() => this.Statusupdate("2")}
                    // onPress={() => AlertUtil.show('Button Work')}
                    underlayColor="#fff"
                  >
                    <View>
                      <Text
                        style={[
                          styles.createsquaaretext,
                          { fontSize: hp(2.7) },
                        ]}
                      >
                        {" "}
                        END BINGO {"\n"}CONTEST
                      </Text>
                    </View>
                  </TouchableHighlight>
                  {/* {  (this.state.contestdata.creator_index==0 && this.state.contestdata.is_bet == '0')?
                       null
                       :  <TouchableHighlight
                       style={[styles.createsquaare, { width: '45%',height: hp(8.0), }]}
                   onPress={() => this.SubmitBingo()}
                   // onPress={() => AlertUtil.show('Button Work')}
                       underlayColor='#fff'>
                       <View>
                       <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>SUBMIT{'\n'}BINGO</Text>                            
                       </View>
                   </TouchableHighlight>
    } */}
                </View>
              ) : null}

              {/* {( this.state.contestdata.creator_index==1 && this.state.contestdata.bingo_match_status==1 && this.state.contestdata.winner_flag =='0')?
                        <View style={[ { justifyContent:'center',alignItems:'center',marginTop:15 ,flexDirection:'row'}]}>
                           <TouchableHighlight
                       style={[styles.createsquaare, { width: '45%',height: hp(8.0), }]}
                   onPress={() => this.SubmitBingo()}
                   // onPress={() => AlertUtil.show('Button Work')}
                       underlayColor='#fff'>
                       <View>
                       <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>SUBMIT{'\n'}BINGO</Text>                            
                       </View>
                   </TouchableHighlight>
                          </View>
                        :
                        null
                     } */}

              {/* <View style={{flexDirection:'row',width:'90%',paddingTop:10}}>
                      <View style={{width:'50%',marginRight:2}}>
                      <TouchableHighlight
                            style={[styles.createsquaare, { width: '100%',height: hp(8.0), }]}
                       // onPress={() => this.CancelBingo()}
                         onPress={() => AlertUtil.show('Button Work')}
                            underlayColor='#fff'>
                            <View>
                            <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>SUBMIT{'\n'}BINGO</Text>                            
                            </View>
                        </TouchableHighlight>
                      </View>
                      <View style={{width:'50%'}}>
                      <TouchableHighlight
                            style={[styles.createsquaare, { width: '100%',height: hp(8.0), }]}
                       // onPress={() => this.CancelBingo()}
                         onPress={() => AlertUtil.show('Button Work')}
                            underlayColor='#fff'>
                            <View>
                            <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>CANCEL{'\n'}BINGO</Text>                            
                            </View>
                        </TouchableHighlight>
                      </View>
                      </View> */}
            </View>
             {/* creator gift list ui end */}
          </View>
        ) : (
          <View style={{ flex: 1 }}>
             {/* Acceptor card ui start */}
            <View
              style={{
                height: "6%",
                width: "100%",
                justifyContent: "center",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <View
                style={{
                  width: "12%",
                  justifyContent: "center",
                  // alignContent: "center",
                  // alignItems: "center",
                }}
              >
                <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 5}}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>
              <View
                style={{
                  width: "65%",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    styles.customheadtext,
                    { color: "#68bcbc", marginBottom: 1, marginTop: 0 },
                  ]}
                >
                  {this.props.navigation.state.params.bingo_data.name +
                    " Bingo"}{" "}
                </Text>
                {/* <Text style={[styles.customheadtext,{color:'grey',marginBottom:1,marginTop:0}]}>{'Tap to announce the gift.'} </Text> */}
              </View>

              <View
                style={{
                  width: "23%",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.getcontestDetail(
                      this.props.navigation.state.params.bingo_data
                    );
                    this.setState({ annoucedCard: true });
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <Image
                    source={this.state.contestdata.bingo_type_id=='1' ?require("../../../../images/gift-announced.png"):require("../../../../images/action-announced.png")}
                    resizeMode="stretch"
                    style={{ width: "100%", height: "80%" }}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>

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
                var b = require("../../../../images/gifts_bg/Gift_1.png");

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
 
                {
                  i == 0 ? (n = 1) : (m = m);
                }
                {
                  i == 1 ? (n = 2) : (m = m);
                }
                {
                  i == 2 ? (n = 3) : (m = m);
                }
                {
                  i == 3 ? (n = 4) : (m = m);
                }
                {
                  i == 4 ? (n = 5) : (m = m);
                }

                {
                  i == 5 ? (n = 1) : (m = m);
                }
                {
                  i == 6 ? (n = 2) : (m = m);
                }
                {
                  i == 7 ? (n = 3) : (m = m);
                }
                {
                  i == 8 ? (n = 4) : (m = m);
                }
                {
                  i == 9 ? (n = 5) : (m = m);
                }

                {
                  i == 10 ? (n = 1) : (m = m);
                }
                {
                  i == 11 ? (n = 2) : (m = m);
                }
                {
                  i == 12 ? (n = 3) : (m = m);
                }
                {
                  i == 13 ? (n = 4) : (m = m);
                }
                {
                  i == 14 ? (n = 5) : (m = m);
                }
                {
                  i == 15 ? (n = 1) : (m = m);
                }
                {
                  i == 16 ? (n = 2) : (m = m);
                }
                {
                  i == 17 ? (n = 3) : (m = m);
                }
                {
                  i == 18 ? (n = 4) : (m = m);
                }
                {
                  i == 19 ? (n = 5) : (m = m);
                }

                {
                  i == 20 ? (n = 1) : (m = m);
                }
                {
                  i == 21 ? (n = 2) : (m = m);
                }
                {
                  i == 22 ? (n = 3) : (m = m);
                }
                {
                  i == 23 ? (n = 4) : (m = m);
                }
                {
                  i == 24 ? (n = 5) : (m = m);
                }

                console.log("mat" + m + "_" + n);

                // console.log('myindex-----',i)
                return (
                  <View
                    style={[
                      styles.squareBox,
                      {
                        backgroundColor: this.state.accepterClickCard.includes(
                          item.gift_id
                        )
                          ? "#fff"
                          : "#fff",
                      },
                    ]}
                  >
                    <ImageBackground
                      source={
                        i == 12
                          ?this.state.contestdata.bingo_type_id=='1' ? require("../../../../images/gifts_bg/bingo.png"):require("../../../../images/Football_center.jpeg")
                          :this.state.accepterClickCard.includes(item.gift_id)?this.state.contestdata.bingo_type_id=='1' ?require("../../../../images/babybingo_selected_thumb_bg.png"):require("../../../../images/football_selected_thumb_bg.png"):null
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
                        //    onPress={() => {(i == 12) ?null:AlertUtil.show('Click Work: ' + item.gift_name)}}
                        onPress={() => {
                          i == 12
                            ? null
                            : this.state.contestdata.bingo_match_status == 1
                            ? this.state.accepterClickCard.includes(item.gift_id)
                              ? this.removeGift(item.gift_id, m, n)
                              : this.acceptGift(item.gift_id, m, n)
                            : null;
                        }}
                        // onPress={() => {(i == 12) ?null:this.state.selectedgift.includes(item.gift_id)?this.removeGift(item.gift_id,m,n) : this.acceptGift(item.gift_id,m,n)}}
                      >
                        <View>
                          <Text
                            style={{ color:this.state.contestdata.bingo_type_id=='1' ? c:'', textAlign: "center" }}
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
            {this.state.contestdata.creator_index == 0 &&
            this.state.contestdata.bingo_match_status == 0 ? (
              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                    flexDirection: "row",
                  },
                ]}
              >
                <TouchableHighlight
                  style={[
                    styles.createsquaare,
                    { width: "46%", height: hp(8.0), marginRight: 10 },
                  ]}
                  onPress={() => this.Statusupdate("1")}
                  // onPress={() => AlertUtil.show('Button Work')}
                  underlayColor="#fff"
                >
                  <View>
                    {this.state.contestdata.is_bet == "0" ? (
                      <Text
                        style={[
                          styles.createsquaaretext,
                          { fontSize: hp(2.7) },
                        ]}
                      >
                        START{"\n"}BINGO
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.createsquaaretext,
                          { fontSize: hp(2.7) },
                        ]}
                      >
                        START & PLAY {"\n"}BINGO3{" "}
                      </Text>
                    )}
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  style={[
                    styles.createsquaare,
                    { width: "46%", height: hp(8.0) },
                  ]}
                  onPress={() => this.CancelBingo()}
                  // onPress={() => AlertUtil.show('Button Work')}
                  underlayColor="#fff"
                >
                  <View>
                    <Text
                      style={[styles.createsquaaretext, { fontSize: hp(2.7) }]}
                    >
                      CANCEL{"\n"}BINGO
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            ) : this.state.contestdata.creator_index == 0 &&
              this.state.contestdata.bingo_match_status == 1 ? (
              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                    flexDirection: "row",
                  },
                ]}
              >
                <TouchableHighlight
                  style={[
                    styles.createsquaare,
                    { width: "45%", height: hp(8.0), marginRight: 10 },
                  ]}
                  onPress={() => this.Statusupdate("2")}
                  // onPress={() => AlertUtil.show('Button Work')}
                  underlayColor="#fff"
                >
                  <View>
                    <Text
                      style={[styles.createsquaaretext, { fontSize: hp(2.7) }]}
                    >
                      {" "}
                      END BINGO {"\n"}CONTEST
                    </Text>
                  </View>
                </TouchableHighlight>
                {this.state.contestdata.creator_index == 0 &&
                (this.state.contestdata.is_bet == "0" ||
                  this.state.contestdata.winner_flag == "1") ? null : (
                  <TouchableHighlight
                    style={[
                      styles.createsquaare,
                      { width: "45%", height: hp(8.0) },
                    ]}
                    onPress={() => this.SubmitBingo()}
                    // onPress={() => AlertUtil.show('Button Work')}
                    underlayColor="#fff"
                  >
                    <View>
                      <Text
                        style={[
                          styles.createsquaaretext,
                          { fontSize: hp(2.7) },
                        ]}
                      >
                        SUBMIT{"\n"}BINGO
                      </Text>
                    </View>
                  </TouchableHighlight>
                )}
              </View>
            ) : null}
            {this.state.contestdata.creator_index == 1 &&
            this.state.contestdata.bingo_match_status == 1 &&
            this.state.contestdata.winner_flag == "0" ? (
              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                    flexDirection: "row",
                  },
                ]}
              >
                <TouchableHighlight
                  style={[
                    styles.createsquaare,
                    { width: "90%", height: hp(8.0) },
                  ]}
                  onPress={() => this.SubmitBingo()}
                  // onPress={() => AlertUtil.show('Button Work')}
                  underlayColor="#fff"
                >
                  <View>
                    <Text
                      style={[styles.createsquaaretext, { fontSize: hp(2.7) }]}
                    >
                      SUBMIT BINGO
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            ) : null}
            {this.state.contestdata.creator_index == 0 &&
            this.state.contestdata.bingo_match_status == 0 ? (
              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.createsquaaretext,
                    { fontSize: hp(2.0), color: "#b9b7b7" },
                  ]}
                >
                  Hit{" "}
                  <Text
                    style={[
                      styles.createsquaaretext,
                      { fontSize: hp(2.0), color: "grey" },
                    ]}
                  >
                    START
                  </Text>{" "}
                  to start the game
                </Text>
              </View>
            ) : this.state.contestdata.creator_index == 0 &&
              this.state.contestdata.bingo_match_status == 1 ? (
              <View
                style={[
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.createsquaaretext,
                    { fontSize: hp(2.0), color: "#b9b7b7" },
                  ]}
                >
                  {this.state.contestdata.bingo_type_id=='1' ?'Tap on box to anounce the gift.\n Hit':'Tap on box to anounce the action.\n Hit'}
                  <Text
                    style={[
                      styles.createsquaaretext,
                      { fontSize: hp(2.0), color: "grey" },
                    ]}
                  >
                    SUBMIT
                  </Text>{" "}
                  once you have five in a row.{"\n"}Hit{" "}
                  <Text
                    style={[
                      styles.createsquaaretext,
                      { fontSize: hp(2.0), color: "grey" },
                    ]}
                  >
                    CLOSE
                  </Text>{" "}
                  to end the game.
                </Text>
              </View>
            ) : null}

            <View style={[styles.ThirdContainer, styles.itemCenter]}>
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
             {/* Acceptor card ui end */}
          </View>
        )}
         {/* Bingo detail component start */}
        {this.state.detailmodel && (
          <BingoDetailComponent
            detailmodel={this.state.detailmodel}
            encrypted_bingo_id={
              this.props.navigation.state.params.bingo_data.id
            }
            onDismiss={() => {
              this.closeModal();
            }}
          />
        )}
        {/* Bingo detail component end */}
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

export default connect(mapStateToProps)(G_ContestBingoView);
