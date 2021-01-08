import React from "react";
import { View, Text, FlatList, TextInput, Platform, Alert, TouchableOpacity, ScrollView,SafeAreaView, AsyncStorage, Animated, UIManager, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView, Modal } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { FooterComponent } from "../../../../Components/CustomComponents/Footer/FooterComponent";
import { AdMobBanner } from 'react-native-admob';
import AlertUtil from "../../../../Util/AlertUtil";
import AppConstants from "../../../../Util/Constants";
import SportsListComponent from "../../../../Components/CustomComponents/SportsListComponent";
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import Application from "../../.../../../../Entities/Application";
import BigButton from "../../../../Components/Button/BigButton";
import RouterBuilder from "../../../../Router";
import SearchBox from '../../../../Components/CustomComponents/SearchBox/SearchBox';
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ProgressLoader from 'rn-progress-loader';
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { OverlayBackground } from '../../../../Components/CustomComponents/OverlayBackground/OverlayBackground';
import { CheckBox, Image, } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { UDDAError } from "../../../../Entities";
import { FooterListner } from "../../../../Components/CustomComponents/Footer/SingleMatchScheduleWithTitleComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { Dialog } from 'react-native-simple-dialogs';
import moment from 'moment';
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
import UrlService from '../../../../Services/Core/ServiceURI';
import DateTimePicker from "react-native-modal-datetime-picker";
import ReferralService from "../../../../Services/Referral/ReferralService";
import LinearGradient from 'react-native-linear-gradient';
import CustomBetAFriendRequest from "../../../../Services/Bets/CustomBetAFriendRequest";
import CustomBetAFriendResponseParser from "../../../../Services/Bets/CustomBetAFriendResponseParser";
import CustomBetAFriendResponse from "../../../../Services/Bets/CustomBetAFriendResponse";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const { State: TextInputState } = TextInput;
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Dash from 'react-native-dash';
import CircleImage from "../../../../Components/CustomComponents/CircleImage";
import ImageViewer from 'react-native-image-zoom-viewer';
// import ImgToBase64 from 'react-native-image-base64';



var update = require('immutability-helper');

console.disableYellowBox = true;

const ProfilePageContent = {
  key: 'somethun',
  page_title: '',
}


interface G_SettlePoolViewProps extends AppValidationComponentProps {

  getProfileRequestStatus?: ServiceRequestStatus
  getProfileResponse?: GetProfileResponse
  getProfileError?: UDDAError

  feedbackRequestStatus?: ServiceRequestStatus
  feedbackResponse?: FeedbackResponse
  feedbackError?: UDDAError

  betaFriendRequestStatus?: ServiceRequestStatus
  betaFriendResponse?: BetAFriendResponse
  betaFriendError?: UDDAError

  placeBetRequestStatus?: ServiceRequestStatus
  placeBetResponse?: PlaceBetResponse
  placeBetError?: UDDAError

  customBetaFriendRequestStatus?: ServiceRequestStatus
  customBetaFriendResponse?: CustomBetAFriendResponse
  customBetaFriendError?: UDDAError

  serviceKey?: string
  listeners?: any
}

interface G_SettlePoolViewState extends AppValidationComponentState {
  contentInsetBottom?: any
  firstName?: Field
  lastName?: Field
  email?: Field
  mobile?: Field
  showOverlayGameSelectionFlag: boolean
  league_id?: Field
  DataList?: any
  checkedBetPrivate: boolean,
  checkedBetPP: boolean,
  checkedBetText: any,
  checkedBetPublic: boolean,
  checkedMoneyLinePrivate: boolean,
  checkedMoneyLinePublic: boolean,
  betammount: any,
  amounttowin: any,

  ///@pky
  selectedBetData: any,
  customBetTest: any,
  customBetQTest1: any,
  customBetQTest2: any,
  customBetOdds: any,
  customBetCutmOdds: any,
  customBetDate: any,
  customBetTime: any,
  oddsValue: any,
  dateTimeValue: any,
  //@pky
  customProbBetList: any,
  //ashish
  isDateTimePickerVisible: any;
  isTimePickerVisible: any;
  iscustomdialog: any;
  result: any;
  minimumDate: any;

  text: any,
  ErrorMessage?: any,
  dialogVisible: boolean,
  valueofMoneylineDialog: any;
  valueofMoneylineDialogShow: any;
  TitleofMoneylineDialog: any;
  focuseAmounttowin: boolean;
  focuseBet: boolean;
  dialogmoreprocess: boolean,
  selectedItem: any;
  selectedPropsItem: any;
  selected_Legue_id: any;
  loader: any;
  isBetaFriendSelect: any;
  BetDialogueData: any;
  BetDialogueNoData: any;
  BetDialogQue: any;
  selecteValue: any;
  Bet_Question_array: any;
  moredialogclick: any;
  SelectedBetOption: any;
  NoData: any;
  selectedValue: any;
  selectedSoccerValue: any;
  selectedGameValue: any;
  showFighting: any; //garima
  showSoccer: any;
  groupType: any; //garima
  selectedPropBetOptions: any;
  selectedPropBetValue: any;
  shareDialog: any;
  appState: any;
  BetType: any;
  POSTBetAmount: any;
  MessageString: any;
  MessageUrl: any;
  keyboardOpen: any;
  SportData: any;
  guestUserDialog: boolean;
  FeedbackSubject: any;
  FeedbackMsg: any;
  FeedbackDialogue: any;
  thanksDialog: any;
  pastWeekTitle: any;
  currentWeekTitle: any;
  upcomingGameTitle: any;
  currentweekindex: any;

  shift: any;
  MatchEventDialog: any;
  RealpastWeekTitle: any;
  RealupcomingGameTitle: any;

  fightingArray: any; //garima

  avatarSource: any
  avatarSourcename: any
  multiple: boolean

  Feedbackphoto: any;
  FeedbackimageFilePath: any;
  FeedbackphotoName: any;
  Share_Show_Msg: any;
  PropselctedFlag: any;
  DashboardCall: any;
  BetPromotionalMsg: any;
  ReferString: any;
  isEditable: boolean;
  postQuestion: any;
  postAnswer: any;
  postOdds: any;
  /*  For Auto Racing and Horse Racing */
  showAutoRacing: any;
  showHorseRacing: any;
  selectedAutoRacingValue: any;
  selectedHorseRacingValue: any;
  selectedGroupType: any;

  //ashish
  settype: any;
  DatatwoList?: any;
  startPage: any;
  showView: any;
  searchText: any;
  searchData: any;
  uploadurl: any;
  uploadurlstatus: any;
  imagezoom: any;
  searchfield: any;
  flattext: any;
  dateindex: any;
  btn_txt:any;
  deleteitem:any;
  more_archive:any;
  pool_item:any;
  pool_index:any;
  pool_dialog:any;
  imagezoomqr:any;
  imagezoomqrlink:any;
}

const bottom_initial = 0;
class SettlePool extends AppValidationComponent<G_SettlePoolViewProps, G_SettlePoolViewState>
  implements MenuIconListener, ISubheaderListener, FooterListner {
  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  private serviceRequestInProgress = false
  public filterData: any;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any
  /*  End Auto Racing and Horse Racing */

  constructor(props: any) {
    super(props);

    this.state = {
      contentInsetBottom: bottom_initial,
      showOverlayGameSelectionFlag: false,
      DataList: [],
      selectedBetData: [],
      checkedBetPrivate: false,
      checkedBetPublic: true,
      checkedBetPP: true,
      checkedBetText: 'P1',
      checkedMoneyLinePrivate: false,
      checkedMoneyLinePublic: true,
      betammount: '',
      amounttowin: '',

      ///@pky
      customBetTest: '',
      customBetQTest1: '',
      customBetQTest2: '',
      customBetOdds: '',
      customBetCutmOdds: '',
      customBetDate: '',
      customBetTime: '',
      oddsValue: '',
      dateTimeValue: '',
      //@pky
      customProbBetList: [],
      //ashish
      minimumDate: new Date(),
      isDateTimePickerVisible: false,
      isTimePickerVisible: false,
      iscustomdialog: false,
      result: '',
      text: '',
      ErrorMessage: '',
      dialogVisible: false,
      valueofMoneylineDialog: '0.00',
      valueofMoneylineDialogShow: '0.00',
      TitleofMoneylineDialog: 'Amount to Win:',
      focuseAmounttowin: false,
      focuseBet: false,
      dialogmoreprocess: false,
      selectedItem: [],
      selectedPropsItem: [],
      selected_Legue_id: '1',
      loader: false,
      fightingArray: '',
      appState: AppState.currentState,
      shift: new Animated.Value(0),
      isBetaFriendSelect: false,
      selecteValue: '0',
      BetDialogueData: [],
      BetDialogueNoData: '',
      BetDialogQue: [],
      Bet_Question_array: [],
      moredialogclick: 'f',
      SelectedBetOption: '',
      NoData: '',
      showFighting: false, //garima
      showSoccer: false,//garima
      selectedValue: 'UFC',
      selectedSoccerValue: 'English Premier League',
      selectedGameValue: '',
      selectedPropBetOptions: 'N',
      selectedPropBetValue: '0',
      shareDialog: false,
      BetType: '',
      POSTBetAmount: '',
      MessageString: '',
      MessageUrl: '',
      keyboardOpen: false,
      SportData: '',
      guestUserDialog: false,

      FeedbackSubject: '',
      FeedbackMsg: '',
      FeedbackDialogue: false,
      thanksDialog: false,


      pastWeekTitle: 'PAST RESULTS',
      currentWeekTitle: 'WEEK',
      RealpastWeekTitle: 'PAST RESULTS',
      RealupcomingGameTitle: 'NEXT MATCH',
      upcomingGameTitle: 'NEXT MATCH',
      currentweekindex: 0,


      MatchEventDialog: false,
      avatarSource: '',
      avatarSourcename: '',
      multiple: true,
      FeedbackimageFilePath: '',
      FeedbackphotoName: 'Photo',

      Share_Show_Msg: '',
      PropselctedFlag: '',
      DashboardCall: '',
      BetPromotionalMsg: '',
      groupType: '', //garima
      ReferString: '',
      isEditable: false,
      postQuestion: '',
      postAnswer: '',
      postOdds: '',
      /*  For Auto Racing and Horse Racing */
      showAutoRacing: false,
      showHorseRacing: false,
      selectedAutoRacingValue: 'NASCAR matchups',
      selectedHorseRacingValue: 'Kentucky Derby',
      selectedGroupType: '',

      //ashish
      settype: '',
      DatatwoList: [],
      startPage: 1,
      showView: true,
      searchText: '',
      searchData: [],
      uploadurl:'',
      uploadurlstatus: false,
      imagezoom: false,
      searchfield: false,
      flattext: [],
      deleteitem: {},
      dateindex: 0,
      btn_txt:'POOL HISTORY',
      more_archive:'',
      pool_item:{},
  pool_index:0,
  pool_dialog:false,
  imagezoomqr:false,
  imagezoomqrlink:'',
    };
  }

  deleteitem(item:any){
this.setState({deleteitem:item});
this.setState({dialogVisible:true});
  }

  componentWillUnmount() {
    //     AppState.removeEventListener('change', this._handleAppStateChange);
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
    
  componentWillMount() {
    console.log("componentwillmount");
    this.getCreatePoolList('0','c');
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }
            
  handleKeyboardDidShow = (event: any) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight + fieldHeight + fieldHeight) || 0;
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 300,
          useNativeDriver: true,
        }
      ).start();
    });
  }
            
  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }
    ).start();
  }

  gotCustomHistory() {
    this.setState({ searchText:''})
    this.getCreatePoolList('1','c');
  }
           
  gotCustomResult() {
    this.setState({ searchText:''})
    this.getCreatePoolList('0','c');
  }

  getCreatePoolList(callBack:any,value:any) {
    this.setState({ loader: true });
    this.setState({ more_archive: '' });
    if(this.props.navigation.state.params.params.bet_id=='')
   {console.log('Old custom pool ashish',this.props.navigation.state.params.params.bet_id)
      var params: any = {
      'custom_pool_id': '',  
      'result_status':callBack   
    };
  }else{
    console.log('New custom pool ashish',this.props.navigation.state.params.params.bet_id)
    var params: any = {
      'custom_pool_id': this.props.navigation.state.params.params.bet_id,  
      'result_status':0 ,
      'archive_type':value 
    };
  }
    var formData = new FormData();
    for (var k in params) {
      formData.append(k, params[k]);
    }
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Custom_PoolGaming/custom_pools_list', {
      method: 'POST',
      headers: {
        'authorisation': this.authorisationToken
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('vreate pool responsen :   ' + JSON.stringify(responseJson)); 
        if(callBack =='0') {
          this.setState({ btn_txt: 'POOL HISTORY'});
        }
        else {
          this.setState({ btn_txt: 'SETTLE POOL'});
        }
        this.setState({ loader: false });
        this.setState({ more_archive: responseJson.more_archive });
        this.setState({ customProbBetList: responseJson.data });
        this.setState({flattext:[]})
        this.setState({ searchData: responseJson.data });
        console.log('Success openplay' + JSON.stringify(this.state.customProbBetList));
        // this.setState({ dialogVisible: true });
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // LogoutUtill.logoutButtonPressed(this.props);
        }
      })
    .catch(error => {
      this.setState({ loader: false });
      console.log(error);
    })
  }

  showcustomDialog(isShow: any) {
    this.setState({
      customProbBetList: this.state.searchData,
      searchText: '',
    })
    this.setState({ iscustomdialog: isShow });
  }

  logiccheck(item:any,index:any){
    var regex = "^\s+$" 
    if(item.custom_pools.my_answer_type=='1') {
      //if(this.state.flattext[index].url.toString().trim() == '' && this.state.flattext[index].image=='' ||this.state.flattext[index].date=='')
      if(this.state.flattext[index].date=='') {
        alert('Please enter all valid details.')
      } else {
        // alert('false')
        // this.publishPool(item,index)
        this.setState({pool_item:item})
        this.setState({pool_index:index})
        this.setState({pool_dialog:true})

      }
    } else {
      // if(this.state.flattext[index].message.toString().trim()=='' || (this.state.flattext[index].url.toString().trim() == '' && this.state.flattext[index].image==''))
      if(this.state.flattext[index].message.toString().trim()=='') {
        alert('Please enter all valid details.')
      } else {
        //  alert('second false')
        // this.publishPool(item,index)
        this.setState({pool_item:item})
        this.setState({pool_index:index})
        this.setState({pool_dialog:true})
      }
    }
  }

  publishPool(item: any,index:any) {
    // if (item.custom_pools.my_answer_text != null && item.custom_pools.my_answer_date.trim !=null) {
    //   alert('please select result')
    // } else {
    this.setState({ pool_dialog: false });
    this.setState({ loader: true });
    this.setState({ iscustomdialog: false })
    var that = this;
    var params: any = {
      'custom_pool_id': item.custom_pools.id,
      'publish_result_text': item.custom_pools.my_answer_type=='1'?'':this.state.flattext[index].message,
      'publish_result_link': this.state.flattext[index].image?'':this.state.flattext[index].url,
      'publish_result_date': item.custom_pools.my_answer_type=='1'?this.state.flattext[index].date:'',
      'publish_result_image': this.state.flattext[index].url?'':this.state.flattext[index].base
    };
    console.log('params of pool : ',params)
    // my_answere_type ==1 date 2=text
    // result_type ==1 link 2=image
    var formData = new FormData();
    for (var k in params) {
      formData.append(k, params[k]);
    }
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Custom_PoolGaming/creator_publish_custom_pool_result', {
      method: 'POST',
      headers: {
        'authorisation': this.authorisationToken
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('Success openplay' + JSON.stringify(responseJson));
        if(responseJson.message == "Whoops! Result already published")
       {
        that.setState({ loader: false });
         AlertUtil.show('Whoops! Result already published')
       }else{ if(this.props.navigation.state.params.params.bet_id=='')
  {
            this.getCreatePoolList('0','c');
}else{
  this.props.navigation!.navigate(AppScreens.G_NotificationView)
}}
        //this.getCustomProbBetList()
        // this.getCreatePoolList('0');
        that.setState({ iscustomdialog: false })
        // this.setState({ dialogVisible: true });
        //   alert(responseJson.message);
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // LogoutUtill.logoutButtonPressed(this.props);
        }
      })
    .catch(error => {
      that.setState({ iscustomdialog: false })
      that.setState({ loader: false });
      console.log(error);
    })
    //  }
  }



  cancelPool() {
  
    this.setState({ dialogVisible: false });
    this.setState({ loader: true });
    var that = this;
    var params: any = {
      'custom_pool_id': this.state.deleteitem.custom_pools.id
    };
    console.log('params of pool : ',params)
    var formData = new FormData();
    for (var k in params) {
      formData.append(k, params[k]);
    }
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Custom_PoolGaming/cancel_custom_pool', {
      method: 'POST',
      headers: {
        'authorisation': this.authorisationToken
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('cancel pool response' + JSON.stringify(responseJson));
        if(responseJson.message == "Bet cancelled successfully..!")
       { if(this.props.navigation.state.params.params.bet_id=='')
  {
            this.getCreatePoolList('0','c');
}else{
  this.props.navigation!.navigate(AppScreens.G_NotificationView)
}}else{
  that.setState({ loader: false });
   AlertUtil.show(responseJson.message)
 }
//         that.setState({ iscustomdialog: false })
        if (responseJson.message == "Access Expired.") {
          that.setState({ loader: false });
           AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // LogoutUtill.logoutButtonPressed(this.props);
        }
      })
    .catch(error => {
      that.setState({ iscustomdialog: false })
      that.setState({ loader: false });
      console.log(error);
    })
    //  }
  }

  sarchCustomProp(val: any) {
    var customProbBetList = this.state.searchData;
    if (val.trim() !== '') {
      this.filterData = this.state.customProbBetList.filter((item) => {
        return item.question.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.filterData = customProbBetList;
    }
    console.log(this.filterData);
    this.setState({
      customProbBetList: this.filterData,
      searchText: val,
    });
  }

  selectPhoto(index:any) {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
      console.log('454545');
    } else {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
          let image = [];
          image = this.state.flattext
          image[index].image = source.uri
          image[index].base ='data:image/jpeg;base64,' + response.data
          // ImgToBase64.getBase64String(source.uri)
          this.setState({flattext:image,uploadurlstatus:true})
          // var baseimage =ImgToBase64.getBase64String(source.uri)
          // console.log('base64 image : ',baseimage)
          // this.setState({ photo: { name: this.photoFieldName, value: response.data }, imageFilePath: source.uri });
        }
      });
    }
  }

  imageZoom(index:any,image){
    if(index == 'showImg'){
      this.setState({uploadurl:image})
    }else{
      this.setState({uploadurl:this.state.flattext[index].image})
    }
    this.setState({dialogmoreprocess:false})
    this.setState({imagezoom:true})
    //this.props.navigation?.navigate(AppScreens.G_ImageZoom,{url:this.state.uploadurl})
  }

  changeanswertext(text:any,index:any){
    let message = [];
    message =this.state.flattext
    message[index].message = text;
    this.setState({flattext:message})
    //this.state.customProbBetList[index].custom_pools.my_answer_text
  }

  changeurltext(text:any,index:any){
    let message = [];
    message =this.state.flattext
    message[index].url = text;
    this.setState({flattext:message})
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleStartDatePicked = (date: any) => {
    console.log('ashish pool date : ',date)
    // console.log('ashish pool data : ',JSON.stringify(this.state.pooldata))
    var formated_date = moment(date).format('MM-DD-YYYY');
    // alert(formated_date)
    let message = [];
    message =this.state.flattext
    message[this.state.dateindex].date = formated_date
    this.setState({flattext:message})
    this.hideDateTimePicker();
    //this.state.customProbBetList[index].custom_pools.my_answer_date
  }

  closeImage(index:any){
    let message = []
    message =this.state.flattext
    message[index].image = ''
    this.setState({flattext:message})
    // this.state.flattext[index].image
  }
openQrModel(link:any){
this.setState({imagezoomqrlink:link})
this.setState({imagezoomqr:true})
}
  render() {
    const images =[{
      url: this.state.uploadurl,
    }]
    return (
      <Container title={'private contest'}
        isHeader={false}
        isSubHeader={false}
        isTitle={false}
        //  showIndicator={this.serviceRequestInProgress}
        menuIconListener={false}
        LogoIconListener={false}
        availableBalanceListener={this}
        openPlaysListener={this}
        coveredPlaysListener={this}
        accountNameListener={this}
        isSetting={false}>

        <DateTimePicker
          // onDateChange={this.setDate}
          isVisible={this.state.isDateTimePickerVisible}
          // customConfirmButtonIOS={this.handleStartDatePicked}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideDateTimePicker}
          minimumDate={this.state.minimumDate}
          mode="date"
        />

         {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
         < Dialog
            visible={this.state.dialogVisible}
            title=""
            onTouchOutside={() => this.setState({ dialogVisible: false })
            } >
            <View style={{ backgroundColor: "transparent", width: '100%', paddingTop: 10, paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => { this.setState({ dialogVisible: false }) }}>
                <View style={{ alignItems: 'flex-end', width: '100%', paddingRight: wp(2) }}>
                  <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                </View>
              </TouchableOpacity>

              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 8, width: '100%' }} >
                <Text style={{ fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: wp(4), color: '#222' }}>
                  Are you sure you want to cancel this bet?
</Text>
                <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                  listener={() => {this.cancelPool();}} />
              </View>
            </View>
          </Dialog >



           {/* -------------------------------- Alert Settle pool confirm Dialogue --------------------------------*/}
         < Dialog
            visible={this.state.pool_dialog}
            title=""
            onTouchOutside={() => this.setState({ pool_dialog: false })
            } >
            <View style={{ backgroundColor: "transparent", width: '100%', paddingTop: 10, paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => { this.setState({ pool_dialog: false }) }}>
                <View style={{ alignItems: 'flex-end', width: '100%', paddingRight: wp(2) }}>
                  <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                </View>
              </TouchableOpacity>

              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 8, width: '100%' }} >
                <Text style={{ fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: wp(4), color: '#222' }}>
                  Are you sure you want to settle this pool?
</Text>
                <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                  listener={() => {this.publishPool(this.state.pool_item,this.state.pool_index);}} />
              </View>
            </View>
          </Dialog >

        {/* --------------------------------Ashish design agree and disagree UNCOVERED ACTION Dialogue --------------------------------*/}
        <Dialog
          // visible={this.state.dialogmoreprocess}
          title=""
          dialogStyle={{ backgroundColor: '#68bcbc',borderRadius:4,height: 'auto',padding:0 }}
          contentStyle={{ padding:0, backgroundColor: '#68bcbc' }}
          onTouchOutside={() => this.setState({ dialogmoreprocess: false })}>
          <View style={{padding:0}}>
            <View style={styles.headerviewdialog}>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:wp(75)}}>
                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: hp(2.8), color: 'white',}}>CUSTOM BET RESULT</Text>
                <TouchableOpacity onPress={() => this.setState({ dialogmoreprocess: false })}>
                  <View style={[styles.CloseView,]}>
                    <Icon name="close" size={25} color="white" style={{marginBottom:5}}/>
                    {/* <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12,tintColor:'white' }}></Image> */}
                  </View>
                </TouchableOpacity>           
              </View>             
            </View>
            <View>
              <View style={{backgroundColor:'white'}}>
                <View>
                  <Text  style={{padding:10,fontFamily: 'Montserrat-Semibold',fontSize: hp(2.1),color: '#222',textAlign:'justify'}}>
                    hello every one how are you guruhello every one how are you guru
                  </Text>
                </View>
                <View style={{backgroundColor:'#eeeeee'}}>
                  <Text  style={{padding:10,fontFamily: 'Montserrat-Semibold',fontSize: hp(2.1),color: '#c3c3c3',textAlign:'justify'}}>
                    hello every one how are you guruhello every one how are you guruhello every one how are you guru
                  </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text  style={{padding:10,fontFamily: 'Montserrat-Bold',fontSize: hp(2.4),color: '#222',textAlign:'justify'}}>
                    Result: <Text  style={{fontFamily: 'Montserrat-Semibold',fontSize: hp(2.4),color: '#222',textAlign:'justify'}}>
                    hello every one how are you guruhello every one how are you guru</Text>
                  </Text>
                </View>

                <View>
                  <View style={[styles.customtextinputpool,{padding:10,backgroundColor:'white'}]}>
                    <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                    <View style={{flexDirection:'row'}}>
                      <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(8), flexDirection:'column'}}/>
                      <TouchableOpacity style={{ width: '100%' }} onPress={()=>{alert('hello')}}>
                        <View style={{ width: '100%',height:hp(8), flexDirection: 'row', backgroundColor: 'white', }}>
                          <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                            <Text style={[styles.datetimetext,{color: this.state.customBetDate ?'#222':'c3c3c3'}]}>{this.state.customBetDate ? this.state.customBetDate : 'Upload Image'}</Text>
                          </View>
                          <View style={styles.datetimeicon}> 
                            <Image source={require('../../../../images/upload_image_icon.png')}
                              style={{ height: 30, width: 30, marginRight: 8 }}
                              resizeMode="contain"
                            /> 
                          </View>
                        </View>
                      </TouchableOpacity>
                      <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(8), flexDirection:'column'}}/>
                    </View>
                    <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                  </View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}}>  
                  <TouchableOpacity style={{width:wp(24)}} onPress={() => { alert('hello ashish')}}>
                    <View style={{  height:50,alignItems: 'center', backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center'}}>  
                      <Text style={{color: 'white', fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), borderRadius:3, padding:3}}>Disagree</Text>  
                    </View>  
                  </TouchableOpacity>  
                  <TouchableOpacity style={{width:wp(24),marginLeft:5}} onPress={() => { alert('hello ashish') }} >
                    <View style={{  height:50,alignItems: 'center', backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center'}}>  
                      <Text style={{
                        color: 'white',  
                        fontFamily: 'Montserrat-Bold',
                        borderRadius:3,
                        fontSize: hp(2.1),
                        padding:3}}>
                        Agree
                      </Text>  
                    </View>  
                  </TouchableOpacity>                
                </View> 
              </View>
            </View>
          </View>
        </Dialog> 

        <Modal visible={this.state.imagezoomqr} transparent={false}>
            <View>
            <SafeAreaView>
              <View style={{justifyContent:'flex-end',alignItems:'flex-end',alignContent:'flex-end',padding:10}}>
              <Icon onPress={() => { 
              this.setState({
                imagezoomqr: false
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
                    source={{uri:this.state.imagezoomqrlink}}
                      >
                     </Image>
              </View>
         </SafeAreaView>
            </View>
            
         
        </Modal>

        <Modal visible={this.state.imagezoom} transparent={true}>
          <View style={styles.imageclose}>
            <TouchableOpacity style={{marginTop:20,marginRight:5}} onPress={() => { 
              this.setState({
                imagezoom: false
              });
            }}>
              <View style={styles.CloseView}>
                <Icon  name="close" size={20} color="white"/>
                {/* <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12,tintColor:'white' }}></Image> */}
              </View>
            </TouchableOpacity>
          </View>
          <ImageViewer
            saveToLocalByLongPress={true}
            imageUrls={images}/>
        </Modal>

        <View style={{height:60,backgroundColor:'#68bcbc',flexDirection:'row',width:'100%',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
          <Icons name="arrow-back" size={30} color="white" style={{marginTop:2}} 
            onPress={() => this.props.navigation?.goBack(null)}
          />
          {this.state.searchfield?
            <TextInput
              value={this.state.searchText}
              style={{paddingLeft:5, height:40, fontFamily: 'Montserrat-Semibold', fontSize: hp(2),width:'70%' }}
              placeholder='SEARCH'
              underlineColorAndroid={'white'}
              placeholderTextColor={'white'}
              onChangeText={(text) => { this.sarchCustomProp(text) }}
              // autoFocus={true}
            />
          :
            <View style={{alignContent:'center',alignItems:'center',paddingRight:wp(5)}}>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.6),color:'white',textAlign:'center',marginTop:7,alignContent:'center' }}>{ this.state.btn_txt=='POOL HISTORY'? 'SETTLE POOL':'POOL HISTORY'} </Text>
            </View>
          }
          {this.state.searchfield?
            <View style={{paddingRight:wp(5)}}>
              <Icon name="close" size={18} color="white"
                onPress={()=>{this.setState({ searchfield: false })}}
                // onPress={()=>{this.setState({ dialogmoreprocess: true })}}
              />
            </View>
          :
            <View style={{paddingRight:wp(5)}}>
              <Icon name="search" size={18} color="white"
                onPress={()=>{this.setState({searchfield: true })}}
                // onPress={()=>{this.setState({ dialogmoreprocess: true })}}
              />
            </View>
          }
        </View>

        <View>
          {this.state.customProbBetList.length!=0? 
            <View style={{ height: hp(80), marginTop: 5 }}>
              <FlatList
                extraData={this.state}
                data={this.state.customProbBetList}
                keyExtractor={(item: any, index) => index.toString()}
                bounces={true}
                renderItem={({ item, index }: any) => {
                var itemindex = '';
                itemindex = item.result_index;
                this.state.flattext.push({image:'',base:'',url:'',date:'',message:''})
                
                return (
                  <Animated.View  style={[ styles.Main_WhiteColor_Container1, { transform: [{ translateY: this.state.shift }] }]}>
                    {this.state.btn_txt =='POOL HISTORY'?
                      <View style={styles.poolmaincontainer}>
                        <View style={{padding:10}}>
                        {item.custom_pools.qr_code!='' &&<View style={{justifyContent:'center',flexDirection:'row',alignContent:'center',alignItems:'center'}}>
                              {/* <Text style={{color:'#222',fontFamily: 'Montserrat-Bold', fontSize: hp(2.1)}}>
                                Qr code
                              </Text> */}
                              <TouchableOpacity onPress={()=>{this.openQrModel(item.custom_pools.qr_code)}}>
                              <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../../../../images/magnifying_glass_qrcode_icon.png')}
                                // source={{uri:item.custom_pools.qr_code}}
                                 >
                                </Image>
                              </TouchableOpacity>
                            </View>}
                          <Text style={{textAlign:'justify',color:'#222',fontFamily: 'Montserrat-Bold', fontSize: hp(2.1)}}>{item.question}</Text>
                          <View>
                            <Text style={{textAlign:'justify',color:'#222',paddingTop:10,fontSize:hp(2)}}>Result:</Text>
                            <View style={styles.customtextinputpool}>                        
                              {item.custom_pools.my_answer_type=='1'?
                                <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.setState({dateindex:index}),this.showDateTimePicker()}}>
                                  <View style={{ width: '100%',height:hp(8), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}>
                                    <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                                      <Text style={[styles.datetimetext,{color: '#222'}]}>{this.state.flattext[index].date?this.state.flattext[index].date:'Choose date'}</Text>
                                    </View>
                                    <View style={styles.datetimeicon}>
                                      <Image source={require('../../../../images/calendar.png')}
                                        style={{ height: 20, width: 20, marginRight: 8 }}
                                        resizeMode="contain"
                                      />
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              :
                                <TextInput
                                  value={this.state.flattext[index].message}
                                  clearTextOnFocus={true}
                                  style={{ paddingLeft:10,height:hp(8), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                                  placeholder='My answer is...'
                                  placeholderTextColor={'#c3c3c3'}
                                  onChangeText={(text) => { this.changeanswertext(text,index) }}
                                  // onChangeText={(text) => { this.state.customProbBetList[index].custom_pools.my_answer_text = text }}
                                  //lololololololol.o
                                  // editable={this.state.customBetDate?false:true}
                                  // onBlur={Keyboard.dismiss}
                                />
                              }
                            </View>
                          </View>

                          <View>
                            <View style={styles.customtextinputpool}>
                              <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                              <View style={{flexDirection:'row'}}>
                                <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(11), flexDirection:'column'}}/>
                                <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.state.flattext[index].url?AlertUtil.show('You can either upload image or enter external link.'):this.state.flattext[index].image?this.imageZoom(index,''):this.selectPhoto(index)}}>
                                  <View style={{ width: '100%',height:hp(11), flexDirection: 'row', backgroundColor: 'white', }}>
                                    <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                                      <Text style={[styles.datetimetext,{color:'c3c3c3'}]}>{'Upload Image'}</Text>
                                    </View>
                                    <View style={styles.datetimeicon}>
                                      {this.state.flattext[index].image?
                                        <View style={{marginRight: 8,flexDirection:'row'}}>
                                          <View style={{marginTop: 2}}>
                                          <CircleImage width={wp(20)} imageFilePath={this.state.flattext[index].image}/>
                                          </View>
                                          <View style={{marginLeft:10, width:40,justifyContent:'center',alignContent:'center',alignItems:'center',padding:3}}>
                                            <Icon name="close" size={20}  color="black" onPress={()=>{this.closeImage(index)}} style={{padding:10}}/>
                                          </View>
                                        </View>
                                      : 
                                        <Image source={require('../../../../images/upload_image_icon.png')}
                                          style={{ height: 30, width: 30, marginRight: 8 }}
                                          resizeMode="contain"
                                        />
                                      }
                                      {/* <Image source={require('../../../../images/upload_image_icon.png')}
                                      style={{ height: 30, width: 30, marginRight: 8 }}
                                      resizeMode="contain" /> */}
                                    </View>
                                  </View>
                                </TouchableOpacity>
                                <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(11), flexDirection:'column'}}/>
                              </View>
                              <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                            </View>
                          </View>

                          <View style={{   paddingTop: 10, width: '100%', paddingBottom: 10 }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: '#cfcfcf',textAlign:'center' }}> ────────  OR  ────────</Text>
                          </View>
                                
                          <Text style={{textAlign:'justify',fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: '#888888'}}>External Link</Text>
                          <View style={styles.customtextinputpool}>
                            <TextInput
                              value={this.state.flattext[index].url}
                              //clearTextOnFocus={true}
                              // numberOfLines={10}  
                              editable={this.state.flattext[index].image?false:true}
                              style={{paddingLeft:10,fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4),height:hp(8), width: '80%' }}
                              placeholder='Enter URL'
                              placeholderTextColor={'#c3c3c3'}
                              onChangeText={(text) => { this.changeurltext(text,index) }}
                              // onBlur={Keyboard.dismiss}
                            />
                          </View>

                          <View>
                            <View style={[styles.customtextinputpool,{flexDirection:'row'}]}>
                              {/* <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.publishPool(item,index)}}> */}
                             <View style={{width:item.custom_pools.result_type==0?'49%':'100%'}}>
                             <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.logiccheck(item,index)}}>
                                <View style={{ width: '100%',height:hp(8), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, backgroundColor: '#68bcbc' }}>
                                  <View style={{ width: '100%',justifyContent:'center',alignContent:'center' }}>
                                    <Text style={[styles.settlepool]}>Settle Pool</Text>
                                  </View>                           
                                </View>
                              </TouchableOpacity>
                             </View>

                             {item.custom_pools.result_type==0?<View style={{width:'2%'}}></View>:null}

                             {item.custom_pools.result_type==0?<View style={{width:'49%'}}>
                             <TouchableOpacity style={{ width: '100%' }} 
                             onPress={()=>{this.deleteitem(item)}}
                            //  onPress={()=>{this.logiccheck(item,index)}}
                             >
                                <View style={{ width: '100%',height:hp(8), flexDirection: 'row', borderColor: '#68bcbc', borderWidth: 1, backgroundColor: 'white' }}>
                                  <View style={{ width: '100%',justifyContent:'center',alignContent:'center' }}>
                                    <Text style={[styles.settlepool,{color:'#68bcbc'}]}>Cancel Pool</Text>
                                  </View>                           
                                </View>
                              </TouchableOpacity>
                             </View>:null}
                            </View>
                          </View>
                        </View>
                      </View>
                    :
                      <View style={[styles.poolmaincontainer,{width: '100%'}]}>
                        <View style={{padding:10}}>
                          <View style={{backgroundColor:'white'}} >
                            
                            <View>
                              <Text style={{textAlign:'justify',color:'#222',fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), paddingBottom: 15}}>
                                {item.question}
                              </Text>
                            </View>
                            <View style={{backgroundColor:'#eeeeee'}}>
                              <Text style={{padding:10,fontFamily: 'Montserrat-Semibold',fontSize: hp(2.1),color: 'grey',textAlign:'justify'}}>
                                {item.custom_pools.creator_name}
                              </Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                              <View style={{flexDirection:'row'}}>
                                <Text  style={{padding:10,fontFamily: 'Montserrat-Bold',fontSize: hp(2.4),color: '#222',textAlign:'justify',paddingLeft: 0}}>Result:</Text>
                                <Text  style={{padding:10,paddingLeft:0,fontFamily: 'Montserrat-Regular',fontSize: hp(2.4),color: '#222',textAlign:'justify'}}>
                                  {item.custom_pools.my_answer_type == "1" ? item.custom_pools.result_date : item.custom_pools.result_text} 
                                </Text>
                              </View>
                            </View>
                          <View>
                          {item.custom_pools.result_external_link?
                            <View>
                              <Text style={{textAlign:'justify',fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: '#888888'}}>External Link</Text>
                              <View style={[styles.customtextinputpool,{padding: 0}]}>
                                <TextInput
                                  value={item.custom_pools.result_external_link}
                                  clearTextOnFocus={true}
                                  editable={false}
                                  style={{paddingLeft:10,fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4),height:hp(8), width: '80%'  }}
                                  placeholderTextColor={'#c3c3c3'}
                                />
                              </View>
                            </View>
                          :
                          null
                            // <View style={[styles.customtextinputpool,{backgroundColor:'white'}]}>
                            //   <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                            //     <View style={{flexDirection:'row'}}>
                            //       <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(8), flexDirection:'column'}}/>
                            //                 <TouchableOpacity style={{ width: '100%' }} onPress={()=>this.imageZoom('showImg',item.custom_pools.result_image)}>
                            //                     <View style={{ width: '100%',height:hp(8), flexDirection: 'row', backgroundColor: 'white', }}>
                            //                         <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                            //                             <Text style={[styles.datetimetext,{color: 'black'}]}>{'Uploaded Image Result'}</Text>
                            //                         </View>
                            //                         <View style={styles.datetimeicon}> 
                            //                             <View style={{marginRight:8}}><CircleImage width={wp(10)} imageFilePath={item.custom_pools.result_image} /></View>
                            //                         </View>
                            //                     </View>
                            //                 </TouchableOpacity>
                            //                 <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(8), flexDirection:'column'}}/>
                            //             </View>
                            //             <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                            //         </View>
                            }

{item.custom_pools.result_image?
                            <View style={[styles.customtextinputpool,{backgroundColor:'white'}]}>
                            <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                              <View style={{flexDirection:'row'}}>
                                <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(11), flexDirection:'column'}}/>
                                          <TouchableOpacity style={{ width: '100%' }} onPress={()=>this.imageZoom('showImg',item.custom_pools.result_image)}>
                                              <View style={{ width: '100%',height:hp(11), flexDirection: 'row', backgroundColor: 'white', }}>
                                                  <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                                                      <Text style={[styles.datetimetext,{color: 'black'}]}>{'Uploaded Image'}</Text>
                                                  </View>
                                                  <View style={styles.datetimeicon}> 
                                                      <View style={{marginRight:8,marginTop:2}}>
                                                        <CircleImage width={wp(20)} imageFilePath={item.custom_pools.result_image} />
                                                        </View>
                                                  </View>
                                              </View>
                                          </TouchableOpacity>
                                          <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(11), flexDirection:'column'}}/>
                                      </View>
                                      <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                                  </View>
                          :
                            null
                            }



                            </View>
                        </View>
                    </View>
                    {/* {this.state.morearchive=='0'?null: index == parseInt(this.state.customProbBetList.length) - 1 ?<View style={{padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}><Text onPress={()=>{this.state.OpenPropSwitchAccepted === true?this.callMethod('a'):this.callPropHistory('a')}} style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#b9b7b7'}]}>More</Text></View>:null} */}
                    {/* {index == parseInt(this.state.customProbBetList.length) - 1 ?<View style={{padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}><Text onPress={()=>{AlertUtil.show('button working pool')}} style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#b9b7b7'}]}>More</Text></View>:null} */}
                </View>
                    }
                     {this.state.more_archive=='0'?null:this.state.btn_txt =='POOL HISTORY'?null:index == parseInt(this.state.customProbBetList.length) - 1 ?<View style={{padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}><Text onPress={()=>{this.getCreatePoolList('1','a');}} style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#f26522',textDecorationLine:'underline',textDecorationColor:'#f26522'}]}>More</Text></View>:null}
                  </Animated.View> 
                ) 
              }}/>
              
            </View>
          :
            <View style={{height:hp(80),justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
              <Text style={{textAlign:'center', fontFamily: 'Montserrat-Semibold',color: '#222',fontSize: hp(2.8)}}> No data available </Text>
           
            </View>
          }

          <ProgressLoader
            visible={this.state.loader}
            isModal={true} isHUD={true}
            hudColor={"#68bcbc"}
            color={"#FFFFFF"} 
          />
           {/* <View style={{ height: '10%', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'white' }}>
           {this.props.navigation.state.params.params.bet_id==''?<TouchableOpacity onPress={() => {this.state.btn_txt =='SETTLE POOL'? this.gotCustomResult() : this.gotCustomHistory() }}>
                  <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>{this.state.btn_txt}</Text>
                </TouchableOpacity>:null}
              </View> */}
              <View style={{ height: '4%', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'white' }}>
              {/* <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>{'More'}</Text> */}
              {this.props.navigation.state.params.params.bet_id==''? <TouchableOpacity onPress={() => {this.state.btn_txt =='SETTLE POOL'? this.gotCustomResult() : this.gotCustomHistory() }}>
                  <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>{this.state.btn_txt}</Text>
                </TouchableOpacity>:null}
              </View>
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
  customBetaFriendResponse: state.serviceReducer.response as CustomBetAFriendResponse,
  customBetaFriendError: state.serviceReducer.error,

  feedbackRequestStatus: state.serviceReducer.requestStatus,
  feedbackResponse: state.serviceReducer.response as FeedbackResponse,
  feedbackError: state.serviceReducer.error,

})

export default connect(mapStateToProps)(SettlePool);