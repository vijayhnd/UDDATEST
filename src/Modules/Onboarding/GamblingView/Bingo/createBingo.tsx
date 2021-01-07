import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
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
  Linking
  
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
import Icon from "react-native-vector-icons/AntDesign";
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
import Icons from 'react-native-vector-icons/MaterialIcons';
import AlertMessages from "../../../../Util/AlertMessages";
import { Dropdown } from 'react-native-material-dropdown';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
var update = require("immutability-helper");
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
  key: "somethun",
  page_title: "CREATE BINGO",
};

interface G_CreateBingoViewProps extends AppValidationComponentProps {
  getProfileRequestStatus?: ServiceRequestStatus;
  getProfileResponse?: GetProfileResponse;
  getProfileError?: UDDAError;

  serviceKey?: string;
  listeners?: any;
}

interface G_CreateBingoViewState extends AppValidationComponentState {
  imageoverlay: any;
  shift: any;
  selectedItem: any;
  loader: any;
  date: any;
  dateshow: any;
  timeshow: any;
  time: any;
  minimumDate: any;
  poolType: any;
  detailmodel: any;
  data: any;
  selectedgift: any;
  bingotitle: any;
  contestfee: any;
  dialogVisible: any;
  customGiftTitle: any;
  shareDialog: any;
  Share_Show_Msg: any;
  MessageString: any;
  MessageUrl: any;
  submitButton: any;
  changegift: any;
  dataAutoRacing:any;  
  custonDropDownvalue: any;
  bingoTypeID:any;
  buttonText:any;
  showBackButton:any;
}

class G_CreateBingoView
  extends AppValidationComponent<G_CreateBingoViewProps, G_CreateBingoViewState>
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

  constructor(props: G_CreateBingoViewProps) {
    super(props);
    this.state = {
      imageoverlay: false,
      shift: new Animated.Value(0),
      selectedItem: true,
      loader: false,
      dateshow: false,
      timeshow: false,
      poolType: false,
      detailmodel: false,
      dialogVisible: false,
      date: "",
      time: "",
      bingotitle: "",
      contestfee: "",
      customGiftTitle: "",
      minimumDate: new Date(),
      data: [],
      selectedgift: [],

      shareDialog: false,
      Share_Show_Msg: "",
      MessageString: "",
      MessageUrl: "",
      changegift: "",
      submitButton: false,
      buttonText:"Select/Add Custom Gifts \n (Minimum 24)",
      dataAutoRacing : [{
        value: 'Baby Bingo',
        id:'1',
        title:'pradeep',
      }, {
        value: 'Football Bingo',
        title:'pradeep',
        id:'1'
      },
      {
        value: 'Baseball Bingo',
        title:'pradeep',
        id:'1'
      },
           {
           value: 'Basketball Bingo',
           id:'1',
           title:'pradeep'
         }, 
         {
          value: 'Political',
          id:'1',
          title:'pradeep'
        }, 
    
      ],
      custonDropDownvalue: 'Baby Bingo',
      bingoTypeID:1,
      showBackButton:0
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
    // let userId = '';
    // let current = '';
    // try {
    //     current = await AsyncStorage.getItem('createsquareoverlaycurrent');
    //   userId = await AsyncStorage.getItem('createsquareoverlay');

    //   console.log('createsquareoverlay response',userId)
    //   var that = this;
    //   if(userId == 'true')
    //   {
    //       setTimeout(function(){ that.setState({imageoverlay:false})},1000)

    //   }else{
    //     if(current == 'true')
    //     { setTimeout(function(){
    //          that.setState({imageoverlay:false})
    //        },3000)
    //      }else{
    //          setTimeout(function(){
    //              that.setState({imageoverlay:true})
    //            },3000)
    //      }

    //   }
    // } catch (error) {
    //   // Error retrieving data
    //   console.log(error.message);
    // }

    // this.callMethod();
   //this.getBingoGift(); //remove for gift type selection
 if(this.props.navigation.state.params)
 {
  this.setState({showBackButton:this.props.navigation.state.params.param.fromHeader}) 
  console.log('bingo call >> @pky'+this.props.navigation.state.params.param.fromHeader )
  
 }
   this.getBingoType()
    console.log(this.props);
  }
  showDateTimePickerpool = () => {
    this.setState({ dateshow: true });
  };
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };
  hideDateTimePickerpool = () => {
    this.setState({ dateshow: false });
  };

  setDatepool(newDate: any) {
    //this.setState({ customBetDate: newDate });
    //var formated_date = moment(newDate).format('YYYY-MM-DD');
    var formated_date = moment(newDate).format("MM-DD-YYYY");
    this.setState({ date: formated_date });
  }

  handleStartDatePickedpool = (date: any) => {
    var formated_date = moment(date).format("MM-DD-YYYY");
    this.setState({ date: formated_date });
    // this.customBetDateTime = formated_date;
    this.hideDateTimePickerpool();
  };

  showDateTimePicker1pool = () => {
    this.setState({ timeshow: true });
  };

  hideDateTimePicker1pool = () => {
    this.setState({ timeshow: false });
  };

  setDate1pool(newDate: any) {
    this.setState({ time: newDate });
  }

  handleStartDatePicked1pool = (date: any) => {
    let formate = date;
    let am_pm = " AM";
    let hours = formate.getHours();
    let minutes = formate.getMinutes();
    let seconds = formate.getSeconds();
    if (hours > 11) {
      am_pm = " PM";
      if (hours > 12) {
        hours = hours - 12;
      }
    }

    if (hours == 0) {
      hours = 12;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var string = hours + ":" + minutes + am_pm;
    this.setState({ time: string });
    //   // this.customBetDateTime = formated_date;
    this.hideDateTimePicker1pool();
  };

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
  componentWillReceiveProps(nextProps: G_CreateBingoViewProps) {
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

              //  this.shareOption(response, 'CUSTOMSQUARE');
            } else {
              AlertUtil.show("Unsuccesfull :" + response.message);
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
  getBingoGift() {
   //alert(this.state.custonDropDownvalue)
    this.setState({ loader: true });
    var params: any = {
      bingo_type_id: this.state.bingoTypeID
      
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
        "/Custom_bingo/get_gift_list",
      {
        method: "POST",
        body: formData,
        headers: {
          authorisation: this.authorisationToken,
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("bingo_gift response : " + JSON.stringify(responseJson));
        this.setState({ loader: false });
        this.setState({ dialogVisible: false });
        this.setState({ submitButton: false });
        this.setState({ customGiftTitle: "" });

        this.setState({ data: responseJson.data });
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

  getBingoType() {
    //alert(this.state.custonDropDownvalue)
     this.setState({ loader: true });
     fetch(
       UrlService.CONSTURI +
         "index.php/" +
         UrlService.APIVERSION3 +
         "/Custom_bingo/get_bingo_types",
       {
         method: "GET",
         headers: {
           authorisation: this.authorisationToken,
         },
       }
     )
       .then((response) => response.json())
       .then((responseJson) => {
         console.log("bingo_gift response : " + JSON.stringify(responseJson));
         this.setState({ loader: false });
         var a =  responseJson.data
         var b = []
        //  a.map((item,index)=>{
        //    b.push(item.value)
        //  })
         let custombet = {
          value: "POOL",
          type: "pool",
           id: "pool",
           coming_soon:'0',
           button_label:'Select Add/Custom Comments'
          
      }
      this.setState({dataAutoRacing:responseJson.data})
      var newSports = this.state.dataAutoRacing;
      newSports.push(custombet);
      this.setState({ dataAutoRacing: newSports }); 
        // alert(b)
        this.getBingoGift();
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

  logiccheck(value: any) {
    // this.AcceptBingo();
    if (
      this.state.bingotitle.trim() == "" ||
      this.state.date == "" ||
      this.state.time == "" ||
      this.state.contestfee.trim() == "" ||
      this.state.selectedgift.length == 0
    ) {
      AlertUtil.show("Please enter all valid details");
    } else {
      // AlertUtil.show('Already fill all fields !')
      if (this.state.selectedgift.length >= 24) {
        if (value == "0") {
          this.createBingo(value);
        } else {
          this.createBingo(value);
          //this.AcceptBingo();
        }
      } else {
        AlertUtil.show("Please select minimum 24 gifts !");
      }
    }
  }

  createBingo(callFrom: any) {

    //this.state.custonDropDownvalue //// bingoType val required to add in api 
    this.referralservice.getLocation().then((res)=>{
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
        is_bet: callFrom,
        bingo_type_id:this.state.bingoTypeID
      };
      console.log("create bingo paramete", params);
      var formData = new FormData();
  
      for (var k in params) {
        formData.append(k, params[k]);
      }
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
      console.log("Headers in create bingo ", JSON.stringify(headers));
      fetch(
        UrlService.CONSTURI +
          "index.php/" +
          UrlService.APIVERSION3 +
          "/custom_bingo/place_bet",
        {
          method: "POST",
          headers: headers,
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          var that = this;
  
          //   this.setState({ customProbBetList: responseJson.data });
          console.log("create bingp" + JSON.stringify(responseJson));
          if (responseJson.message == "success") {
            that.setState({ loader: false });
            // this.AcceptBingo();
            if (callFrom == "0") {
              this.shareOption(responseJson, "bingo");
              this.setState({ bingotitle: "" });
              this.setState({ date: "" });
              this.setState({ time: "" });
              this.setState({ contestfee: "" });
              this.setState({ selectedgift: [] });
              this.setState({ poolType: false });
            } else {
              //that.setState({ bingodata: responseJson.data.all_gifts });
              this.AcceptBingo(
                responseJson.data.all_gifts,
                responseJson.data.encryptor_bingo_id
              );
            }
            //AlertUtil.show(responseJson.message);
          } else {
            AlertUtil.showSingleActionMessage(responseJson.message, function () {
              that.setState({ loader: false });
            });
            //   this.setState({ bingotitle: '' });
            // this.setState({ date: '' });
            // this.setState({ time: '' });
            // this.setState({ contestfee: '' });
            // this.setState({ selectedgift: [] });
            // this.setState({ poolType: false });
          }
  
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
     
     }).catch((err)=>{
      AlertUtil.show(AlertMessages.LocationRequired);
     
     });
    
  }

  changecustomdrop(value:any)
  {
  
    this.setState({ custonDropDownvalue: value });
    var a =  this.state.dataAutoRacing;
    var that = this;
    a.map((item,index)=>{
      if(item.value == value)
      {
if(item.coming_soon == '0'){
  
      that.setState({ bingoTypeID: item.id });
      that.setState({buttonText:item.button_label+' \n (Minimum 24)'})
      if(value != 'POOL')
      {
        
      setTimeout(function(){ that.getBingoGift();},500);
      }
}
else{

    
    setTimeout(function(){ AlertUtil.showSingleActionMessage(item.message,function(){
      that.setState({ bingoTypeID: 1});  
    that.setState({ custonDropDownvalue: a[0].value  });
      that.getBingoGift();})
  
  },500);
}
      
    }
    })
   
   // alert(b)
   
   
    
    this.setState({ selectedgift: []});
    var that = this;
    setTimeout(function(){
      if(value == 'POOL')
      {
       that.setState({ bingoTypeID: 1});  
        that.setState({ custonDropDownvalue: a[0].value });
        setTimeout(function(){
         that.props.navigation!.navigate(AppScreens.G_Createpool);},200)
     
        
      }
      else
      {
       // that.getBingoGift();
      }
   
  },700)
    
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
      url =
        "http://bet.udda.com/index.php?t=bingo&i=" +
        item.data.encryptor_bingo_id;
      //url = "https://bet.udda.com/coming-soon/"

      url = await this.referralservice.getReferralUrl(
        url,
        this.my_referral_code,
        "U"
      ); // Getting Dynamic Share Link From Firebase
     // url = item.data.dynamic_link 
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
          RouterBuilder.resetRouteTo(
            AppScreens.Gambling_ApplicationStack,
            this.props
          );
          // shared with activity type of result.activityType
        } else {
          this.setState({ shareDialog: false });
          console.log("shared");
          RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        this.setState({ shareDialog: false });
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
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
  onChangeShareMsg(val: any) {
    this.setState({ MessageString: val });
  }

  AddCustomGift() {
    if (this.state.customGiftTitle.trim() != "") {
      this.setState({ submitButton: true });
      this.setState({ loader: true });

      var params: any = {
        title: this.state.customGiftTitle,
        bingo_type_id:this.state.bingoTypeID
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
          "/Custom_bingo/add_gifts",
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
            // AlertUtil.show(responseJson.message);

            //  this.setState({ dialogVisible: false });
            //  this.setState({ dialogVisible: false });
            //  this.setState({ customGiftTitle: '' });
            this.getBingoGift();
          } else {
            var that = this;
            AlertUtil.showSingleActionMessage(
              responseJson.message,
              function () {
                that.setState({ dialogVisible: false });
                that.setState({ submitButton: false });
                that.setState({ customGiftTitle: "" });
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
    } else {
      AlertUtil.show(this.state.bingoTypeID==1?"Please enter gift title !":"Please enter action title !");
    }
  }
  // ----------------------------------------------- Api calling ---------------------------------------

  accountNameTapped() {
    this.props.navigation!.navigate(AppScreens.G_ProfileView);
  }

  iconDidTapped() {
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View, {
      gameList: true,
    });
  }

  LogoiconDidTapped() {
    RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);
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
  selectGame(value:any) {


    // if(this.state.data.length >0)
    // {
    this.setState({ changegift: value });
    this.setState({ detailmodel: true });
    // }
    // else{
    //   alert('Please change Bingo Type')
    // }
  }

  AcceptBingo(cardData: any, id: any) {
    var data = {
      bingotitle: this.state.bingotitle,
      date: this.state.date,
      time: this.state.time,
      selectedgift: this.state.selectedgift,
      contestfee: this.state.contestfee,
      poolType: this.state.poolType,
      cardData: cardData,
      bingo_id: id,
      bingo_type_id: this.state.bingoTypeID,
    };
    this.props.navigation!.navigate(AppScreens.G_ShareBingo, {
      bingo_data: data,
    });
    // this.props.navigation!.navigate(AppScreens.G_ShareBingo);
  }
  acceptGift(index) {
    this.state.selectedgift.push(index),
      this.setState({ selectedgift: this.state.selectedgift });
  }

  removeGift(e) {
    var array = this.state.selectedgift;
    var index = array.indexOf(e); // Let's say it's Bob.
    // delete array[index];
    if (index > -1) {
      array.splice(index, 1);
    }
    this.setState({ selectedgift: array });
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
         {/* <QRCodeScanner
        onRead={this.onSuccess}
       // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      /> */}
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
          //  visible={this.state.dialogVisible}
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
                Add Custom Gift
              </Text>
              <View style={[styles.Input_Container, styles.inputPadding]}>
                <TextInput
                  value={this.state.customGiftTitle}
                  onChangeText={(text) =>
                    this.setState({ customGiftTitle: text })
                  }
                  placeholder="Enter Gift Title"
                  placeholderTextColor={"#c3c3c3"}
                  returnKeyType="done"
                  // maxLength={50}
                  style={[styles.Input_TextStyle, { height: hp(8) }]}
                />
              </View>
              <BigButton
                title="SUBMIT"
                style={[styles.verify_button, { backgroundColor: "#68bcbc" }]}
                textStyle={styles.verify_button_text_style}
                listener={() => {
                  this.AddCustomGift();
                }}
              />
            </View>
          </View>
        </Dialog>

        {/* create ui of Select Gift */}
        <Modal visible={this.state.detailmodel} transparent={false}>
          <SafeAreaView>
            <View style={[styles.customhead, { backgroundColor: "#68bcbc" }]}>
              <View style={{ width: "35%", paddingLeft: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                   { 
                     this.setState({ detailmodel: false})
                   if(this.state.changegift=='')
                    {
                      this.setState({  selectedgift: [] })
                    }
                  }}
                >
                  <View style={[styles.CloseView1]}>
                    <Icon name="arrowleft" size={35} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ width: "65%" }}>
                <Text style={[styles.customheadtext, { color: "white" }]}>
                  {this.state.bingoTypeID==1?'SELECT GIFTS':'SELECT ACTIONS'}{"\n"}
                  {"(Minimum 24)"}
                </Text>
              </View>
            </View>

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
                {this.state.dialogVisible ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 8,
                      width: "100%",
                      borderWidth: 1,
                      marginBottom: 5,
                      padding: 5,
                      borderColor: "#69bbbb",
                      borderRadius: 7,
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
                  alignContent: "flex-end",
                  width: wp(90),
                  paddingRight: wp(2)
                 
                }}
              >
                <Image
                  source={require("../../../../images/close.png")}
                  style={{ height: 15, width: 15 }}
                ></Image>
              </View>
            </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: "Montserrat-semibold",
                        textAlign: "center",
                        fontSize: wp(4),
                        color: "#69bbbb",
                      }}
                    >
                      {this.state.bingoTypeID==1?'Add Custom Gift.':'Add Custom Action.'}
                    </Text>
                    
                   


                    <View style={[styles.Input_Container, styles.inputPadding]}>
                      <TextInput
                        value={this.state.customGiftTitle}
                        onChangeText={(text) =>
                          this.setState({ customGiftTitle: text })
                        }
                        placeholder={this.state.bingoTypeID==1?"Enter Gift Title":"Enter Action Title"}
                        placeholderTextColor={"#c3c3c3"}
                        returnKeyType="done"
                        // maxLength={50}
                        style={[styles.Input_TextStyle, { height: hp(8) }]}
                      />
                    </View>
                    {this.state.submitButton ? (
                      <ActivityIndicator
                        size="small"
                        color="#0000ff"
                        style={{ marginTop: 10 }}
                      />
                    ) : (
                      <BigButton
                        title="SUBMIT"
                        style={[
                          styles.verify_button,
                          { backgroundColor: "#68bcbc" },
                        ]}
                        textStyle={styles.verify_button_text_style}
                        listener={() => {
                          this.AddCustomGift();
                        }}
                      />
                    )}
                  </View>
                ) : (
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 15,
                        marginBottom: 15,
                      },
                    ]}
                  >
                    <TouchableHighlight
                      style={[
                        styles.createsquaare,
                        {
                          width: "98%",
                          height: hp(7.0),
                          backgroundColor: "white",
                        },
                      ]}
                      // onPress={() => this.showAlertDialog('2')}
                      //  onPress={() => AlertUtil.show('Button Work')}
                      onPress={() => {
                        this.setState({ dialogVisible: true });
                      }}
                      underlayColor="#fff"
                    >
                      <View style={{ flexDirection: "row" }}>
                        {this.state.bingoTypeID==1?<Icon name="gift" size={25} color="#68bcbc" />:null}
                        <Text
                          style={[
                            styles.createsquaaretext,
                            {
                              color: "#68bcbc",
                              textAlign: "center",
                              fontSize: hp(2.2),
                              marginTop: 4,
                            },
                          ]}
                        >
                          {" "}
                          {this.state.bingoTypeID==1?'Add Custom Gift':'Add Custom Action'}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                )}

                <View
                  style={{ height: this.state.dialogVisible ? hp(50) : hp(60) }}
                >
                  <ScrollView
                    onScroll={() => {
                      this.setState({ dialogVisible: false });
                    }}
                  >
                    {this.state.data.map((item, index) => {
                      return (
                        // <View style={[styles.giftRow,{backgroundColor:'#accfcf'}]}>
                        <TouchableOpacity
                          onPress={() =>
                            this.state.selectedgift.includes(item.id)
                              ? this.removeGift(item.id)
                              : this.acceptGift(item.id)
                          }
                        >
                          <View
                            style={[
                              styles.giftRow,
                              {
                                backgroundColor: this.state.selectedgift.includes(
                                  item.id
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
                                {item.title}
                              </Text>
                            </View>
                            <View style={[styles.itemCenter, { width: "15%" }]}>
                              {this.state.selectedgift.includes(item.id) ? (
                                <Icon name="check" size={25} color="#68bcbc" />
                              ) : null}
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                <View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 15,
                      marginBottom: 15,
                    },
                  ]}
                >
                  <TouchableHighlight
                    style={[
                      styles.createsquaare,
                      { width: "98%", height: hp(9.0) },
                    ]}
                    // onPress={() => this.showAlertDialog('2')}
                    onPress={() => {
                      if (this.state.selectedgift.length >= 24) {
                        this.setState({ detailmodel: false });
                      } else {
                        AlertUtil.show(this.state.bingoTypeID==1?"Please select minimum 24 gifts.":"Please select minimum 24 actions.");
                      }
                    }}
                    underlayColor="#fff"
                  >
                    <View style={{}}>
                      <Text
                        style={[
                          styles.createsquaaretext,
                          {
                            textAlign: "center",
                            fontSize: hp(2.9),
                            marginTop: 4,
                          },
                        ]}
                      >
                        {" "}
                        DONE
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        {this.state.bingoTypeID==1?<Icon name="gift" size={22} color="black" />:null}
                        <Text
                          style={[
                            styles.createsquaaretext,
                            {
                              color: "black",
                              textAlign: "center",
                              fontSize: hp(2.4),
                              marginTop: 2,
                            },
                          ]}
                        >
                          {" "}
                          {this.state.bingoTypeID==1?'Gifts':'Actions'} Selected : {this.state.selectedgift.length}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>

                {/* <View style={[ { justifyContent:'center',alignItems:'center',marginTop:15,marginBottom:15 }]}>
                    <Text>{' '}</Text>
                    </View> */}
              </View>
            </View>
          </SafeAreaView>
        </Modal>

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
                   {this.state.showBackButton == 0?
          <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'35%' }}>             
              <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 0,marginTop:5 }}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>: 
              <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'35%' }}>             
              {/* <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 0,marginTop:5 }}
                onPress={() => this.props.navigation?.goBack(null)}
              /> */}
              </View>
              }
              <View style={{ alignContent: 'flex-start', alignItems: 'flex-start', width:'65%' }}>
                <Text style={[styles.customheadtext,{color:'#68bcbc'}]}>{ProfilePageContent.page_title}</Text>
              </View>   
           </View>
                  </View>

                  <View style={styles.ThirdContainer}>
                  <View style={ {width:'100%'}}>
                  {/* <Text style={styles.Text_Style}>Bingo Type</Text> */}
        <Dropdown
          dropdownOffset={{ top: 0, left: 0 }}
          dropdownMargins={{ min: 0, max: 0 }}
          dropdownPosition={-5.1}
          itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(6.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
          //data={pool}
           data={this.state.dataAutoRacing}
           value={this.state.custonDropDownvalue}
           onChangeText={value =>{ this.changecustomdrop(value)}}
          fontSize={hp(2.6)}

        />
        </View>
       
                    <View style={[styles.Input_Container, styles.inputPadding]}>
                      <TextInput
                        value={this.state.bingotitle}
                        onChangeText={(text) =>
                          this.setState({ bingotitle: text })
                        }
                        placeholder="Enter Bingo Title"
                        placeholderTextColor={"#c3c3c3"}
                        returnKeyType="done"
                        // maxLength={50}
                        style={[styles.Input_TextStyle, { height: hp(10) }]}
                      />
                    </View>
                  </View>
                  {/* <View style={styles.ThirdContainer}>
                                        <View style={{ width: '100%' }}>
                                            <TouchableHighlight
                                            style={[styles.selectgame,{width:'100%'}]}
                                            onPress={() => this.selectGame()}
                                            underlayColor='#fff'>
                                            <Text style={styles.selectgametext}>{'Select/Add Custom Gifts \n (Minimum 24)'}</Text>
                                        </TouchableHighlight>
                                        </View>

                                    </View>  */}

                  {this.state.selectedgift.length == 0 ? (
                    <View style={styles.ThirdContainer}>
                      <View style={{ width: "100%" }}>
                        <TouchableHighlight
                          style={[styles.selectgame, { width: "100%" }]}
                          onPress={() => this.selectGame('')}
                          underlayColor="#fff"
                        >
                          <Text style={styles.selectgametext}>
                            {this.state.buttonText}
                          </Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  ) : (
                    <View style={[styles.ThirdContainer]}>
                      <View
                        style={[
                          styles.ThirdContainer,
                          styles.itemCenter,
                          { flex: 1, flexDirection: "row" },
                        ]}
                      >
                        <View style={{ width: "35%" }}>
                          <Text
                            style={{
                              fontFamily: "Montserrat-Bold",
                              fontSize: hp(1.8),
                            }}
                          >
                            { this.state.bingoTypeID==1?this.state.selectedgift.length +" Gifts Selected":this.state.selectedgift.length +" Actions Selected"}
                          </Text>
                        </View>
                        <View style={{ width: "65%", alignItems: "flex-end" }}>
                          <TouchableHighlight
                            style={[styles.selectgame, { width: "60%" }]}
                            onPress={() => this.selectGame('c')}
                            underlayColor="#fff"
                          >
                            <Text
                              style={[
                                styles.selectgametext,
                                { fontSize: hp(2.2) },
                              ]}
                            >
                              {this.state.bingoTypeID==1?'Change Gift':'Change Action'}
                            </Text>
                          </TouchableHighlight>
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
                      <Text style={styles.Text_Style}>Date</Text>
                      <View
                        style={[styles.Input_Container, styles.inputPadding]}
                      >
                        <TouchableOpacity
                          style={[styles.Input_TextStyle,{height:hp(7.0)}]}
                          onPress={this.showDateTimePickerpool}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <View style={{ width: "90%" }}>
                              <Text
                                style={{
                                  color: this.state.date ? "black" : "#c3c3c3",
                                }}
                              >
                                {this.state.date
                                  ? this.state.date
                                  : "Choose Date"}
                              </Text>
                            </View>
                            <View style={styles.datetimeicon}>
                              <Image
                                source={require("../../../../images/calendar.png")}
                                style={{
                                  height: 20,
                                  width: 20,
                                  marginRight: 3,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ width: "49%" }}>
                      <Text style={styles.Text_Style}>Time</Text>
                      <View
                        style={[styles.Input_Container, styles.inputPadding]}
                      >
                        <TouchableOpacity
                          style={[styles.Input_TextStyle,{height:hp(7.0)}]}
                          onPress={this.showDateTimePicker1pool}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <View style={{ width: "90%" }}>
                              <Text
                                style={{
                                  color: this.state.time ? "black" : "#c3c3c3",
                                }}
                              >
                                {this.state.time
                                  ? this.state.time
                                  : "Choose Time"}
                              </Text>
                            </View>
                            <View style={styles.datetimeicon}>
                              <Image
                                source={require("../../../../images/watch_icon.png")}
                                style={{
                                  height: 20,
                                  width: 20,
                                  marginRight: 3,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <DateTimePicker
                    // onDateChange={this.setDate}
                    isVisible={this.state.dateshow}
                    // customConfirmButtonIOS={this.handleStartDatePicked}
                    onConfirm={this.handleStartDatePickedpool}
                    onCancel={this.hideDateTimePickerpool}
                    minimumDate={this.state.minimumDate}
                    mode="date"
                  />

                  <DateTimePicker
                    // onTimeChange={this.setDate1}
                    isVisible={this.state.timeshow}
                    onConfirm={this.handleStartDatePicked1pool}
                    onCancel={this.hideDateTimePicker1pool}
                    // minimumTime={this.minimumTime}
                    is24Hour={true}
                    mode="time"
                  />

                  <View
                    style={[
                      styles.ThirdContainer,
                      { flex: 1, flexDirection: "row" },
                    ]}
                  >
                    <View style={{ width: "100%" }}>
                      <Text style={styles.Text_Style}>Contest Fee</Text>
                      <View
                        style={[styles.Input_Container, styles.inputPadding]}
                      >
                        <TextInput
                          // value={this.state.contestfee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          value={this.state.contestfee}
                          onChangeText={(text) =>
                            
                            this.setState({ contestfee: text })
                          }
                          placeholder="Minimum 1,000 UDDA Bucks"
                          placeholderTextColor={"#c3c3c3"}
                          returnKeyType="done"
                          keyboardType="decimal-pad"
                          style={[styles.Input_TextStyle, { height: hp(7.0) }]}
                        />
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
                      //    onPress={() => this.AcceptBingo()}
                      onPress={() => this.logiccheck("0")}
                      underlayColor="#fff"
                    >
                      <Text style={[styles.createsquaaretext,{fontSize:hp(2.9)}]}>Create</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={[styles.createsquaare, { width: "49%" }]}
                      // onPress={() => this.showAlertDialog('2')}
                      onPress={() => this.logiccheck("1")}
                      underlayColor="#fff"
                    >
                      <Text style={[styles.createsquaaretext,{fontSize:hp(2.9)}]}>
                        Create &{"\n"} Participate
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
});

export default connect(mapStateToProps)(G_CreateBingoView);
