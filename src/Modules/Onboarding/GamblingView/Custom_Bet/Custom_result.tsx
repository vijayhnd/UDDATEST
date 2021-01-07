import React from "react";
import { View, Text, FlatList, TextInput, Platform, Alert, TouchableOpacity, ScrollView, AsyncStorage,Modal, Animated, UIManager, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView ,SafeAreaView} from "react-native";
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


var update = require('immutability-helper');

console.disableYellowBox = true;

const ProfilePageContent = {
  key: 'somethun',
  page_title: '',
}


interface G_SettleCustomViewProps extends AppValidationComponentProps {

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

interface G_SettleCustomViewState extends AppValidationComponentState {
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
  btn_txt:any;
  searchfield: any;
  deleteitem: any;
  more_archive: any;
  imagezoomqr: any;
  imagezoomqrlink: any;
}

const bottom_initial = 0;
class SettleCustom extends AppValidationComponent<G_SettleCustomViewProps, G_SettleCustomViewState>
  implements MenuIconListener, ISubheaderListener, FooterListner {
  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
private serviceRequestInProgress = false
  public filterData: any;

  
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

      Feedbackphoto: { name: this.photoFieldName, value: '' },
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
      deleteitem:{},
      searchfield: false,
      imagezoomqr: false,
      imagezoomqrlink: '',
      btn_txt:'CUSTOM BETS HISTORY',
      more_archive:'',

    };
  }
deleteItem(item:any){
  this.setState({deleteitem:item});
  this.setState({dialogVisible:true})

}

  componentWillMount() {

    console.log("componentwillmount");
    this.getCustomProbBetList('0','c');
   }


   gotCustomHistory()
   {
    this.setState({ searchText:''})
     this.getCustomProbBetList('1','c');
   }

   gotCustomResult()
   {
    this.setState({ searchText:''})
    this.getCustomProbBetList('0','c');
   }
  getCustomProbBetList(callBack:any,value:any) {

    this.setState({ loader: true });
    if(this.props.navigation.state.params.params.bet_id=='')
   {console.log('Old custom ashish',this.props.navigation.state.params.params.bet_id)
      var params: any = {
      'event_id': '',
      'league_id': '',
      'contest_id': '',
      'result_status':callBack,
      'archive_type':value
    };
  }else{
    console.log('New custom ashish',this.props.navigation.state.params.params.bet_id)
      var params: any = {
        'custom_prop_id':this.props.navigation.state.params.params.bet_id,
        'result_status':callBack
      };
    }

    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }

    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/generate_custom_props', {
      method: 'POST',
      headers: {
        'authorisation': this.authorisationToken
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('vreate custom bet response :   ' + JSON.stringify(responseJson));
        this.setState({ more_archive: responseJson.more_archive });
        this.setState({ loader: false });
        if(callBack =='0')
        {
          this.setState({ btn_txt: 'CUSTOM BETS HISTORY'});
        }
        else{
          this.setState({ btn_txt: 'SETTLE CUSTOM BETS'});
          
        }
        this.setState({ customProbBetList: [] });
        this.setState({ customProbBetList: responseJson.data });
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


  publishCustomBet(item: any) {
    if (this.state.result == '') {
      alert('please select result')
    } else {
       this.setState({ loader: true });
      
      console.log('result by ashish', this.state.result)
     
      this.setState({ iscustomdialog: false })
      var that = this;
      var params: any = {
        'custom_prop_id': item.custom_props.id,
        'publish_result': this.state.result,
        'contest_id': '',
        'contest_type': ''
      };

      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }

      fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/publish_custom_props_result', {
        method: 'POST',
        headers: {
          'authorisation': this.authorisationToken
        },
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
        //   this.getCustomProbBetList()
if(this.props.navigation.state.params.params.bet_id=='')
  {
            this.getCustomProbBetList('0','c');
}else{
  this.props.navigation!.navigate(AppScreens.G_NotificationView)
}
         // setTimeout(function(){ AlertUtil.show("Session Expired ! Please login again");},2000)
         
        //   that.setState({ loader: false });
          // this.setState({ customProbBetList: responseJson.data });
          // console.log('Success openplay' + JSON.stringify(this.state.customProbBetList));
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
    }
  }


  cancelCustomBet() {
    
       this.setState({ dialogVisible: false });
       this.setState({ loader: true });
      
      console.log('result by ashish', this.state.result)
     
      var that = this;
      var params: any = {
        'custom_prop_id': this.state.deleteitem.custom_props.id
      };

      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }

      fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/cancel_custom_props', {
        method: 'POST',
        headers: {
          'authorisation': this.authorisationToken
        },
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
        //   this.getCustomProbBetList()
if(this.props.navigation.state.params.params.bet_id=='')
  {
            this.getCustomProbBetList('0','c');
}else{
  this.props.navigation!.navigate(AppScreens.G_NotificationView)
}
        
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

  openQrModel(link:any){
    this.setState({imagezoomqrlink:link})
    this.setState({imagezoomqr:true})
    }
  render() {
   
    return (
      <Container title={'private contest'}
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
                <Text style={{ fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: wp(4), color: 'black' }}>
                  Are you sure you want to cancel this bet?
</Text>
                <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                  listener={() => {
                      this.cancelCustomBet()
                   }} />
              </View>
            </View>
          </Dialog >

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
                     source={{uri:this.state.imagezoomqrlink}} >
                     </Image>
              </View>
         </SafeAreaView>
            </View>
            
         
        </Modal>

        <View style={{flexDirection:'column'}}>
            
            <View style={{height:60,backgroundColor:'#68bcbc',flexDirection:'row',width:'100%',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
           
               <Icons name="arrow-back" size={30} color="white" style={{marginTop:2}} 
               onPress={() => this.props.navigation?.goBack(null)}
                />
                  
            {this.state.searchfield ? 
              <TextInput
                value={this.state.searchText}
                style={{paddingLeft:5, height:40, fontFamily: 'Montserrat-Semibold', fontSize: hp(2),width:'70%',color:'#FFFFFF' }}
                placeholder='Search'
                underlineColorAndroid={'white'}
                placeholderTextColor={'white'}
                onChangeText={(text) => { this.sarchCustomProp(text) }}
                autoFocus={true}
              />
            :
              <View style={{alignContent:'center',alignItems:'center'}}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.6),color:'white',textAlign:'center',marginTop:7,alignContent:'center' }}>{ this.state.btn_txt=='CUSTOM BETS HISTORY'? 'SETTLE CUSTOM BETS':'CUSTOM BETS HISTORY'} </Text>
              </View>
            }
            {this.state.searchfield ? 
              <View style={{paddingRight:wp(5)}}>
                <Icon name="close" size={18} color="white" onPress={()=>{this.setState({ searchfield: false })}}/>
              </View>
            :
              <View style={{paddingRight:wp(5)}}>
                <Icon name="search" size={18} color="white" onPress={()=>{this.setState({searchfield: true })}}/>
              </View>
            }
         </View>

                     {/* <View style={{opacity:1, flexDirection:'row', width: '100%',alignContent:'center',alignItems:'center' }}> 
                     <Icon name="search" size={18} color="grey" style={{marginLeft:8}} />          
                     <TextInput
                        value={this.state.searchText}
                       // numberOfLines={10}
                       // multiline={true}
                        style={{ height:40, fontFamily: 'Montserrat-Semibold', fontSize: hp(2),width:'70%' }}
                        placeholder='Search'
                        placeholderTextColor={'#888888'}
                        onChangeText={(text) => { this.sarchCustomProp(text) }}
                       // autoFocus={true}
                    />
                    </View> */}
                    

               { this.state.customProbBetList.length!=0? 
                <View style={{opacity:1, height: hp(80) }}>
                {/* <ScrollView
                  bounces={true}
                  style={{opacity:1}}
                > */}
                {/* <SafeAreaView style={{flex:1,opacity:1}}> */}
               <FlatList
                style={{ height:200,opacity:1}}
                  extraData={this.state}
                  data={this.state.customProbBetList}
                  keyExtractor={(item: any, index) => index.toString()}
                  bounces={true}
                  renderItem={({ item, index }: any) => {
                    var itemindex = '';
                   itemindex = item.result_index;                    
                    return (
                        <View style={{marginBottom:0,opacity:1}}>
                        <View style={{opacity:1, backgroundColor: 'white',flexDirection:'column',borderWidth:1,width:wp(100),borderColor:'#EEEEEE' ,paddingBottom:5,paddingTop:5,marginBottom:8,flex:1,borderBottomWidth :5,borderBottomColor: '#d1caca',}} >
                       {this.state.btn_txt == 'CUSTOM BETS HISTORY'?item.custom_props.qr_code && <View style={{justifyContent:'center',flexDirection:'row',alignContent:'center',alignItems:'center'}}>
                              {/* <Text style={{color:'#222',fontFamily: 'Montserrat-Bold', fontSize: hp(2.1),paddingLeft: wp(3)}}>
                                Qr code
                              </Text> */}
                              <TouchableOpacity onPress={()=>{this.openQrModel(item.custom_props.qr_code)}}>
                              <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../../../../images/magnifying_glass_qrcode_icon.png')} >
                                </Image>
                              </TouchableOpacity>
                            </View>:null}
                    <Text style={[styles.paragraph,{opacity:1,paddingLeft: wp(3),paddingRight: wp(3),paddingTop:3,paddingBottom:3}]}>{item.question}</Text>
                        
                          <View style={{flexDirection:'column',marginTop: 3,opacity:1}}>
                          <View style={{opacity:1, flexDirection: 'row',height:hp(10), marginTop: 0, marginBottom: 0, paddingLeft: wp(3),justifyContent:'space-between' }}>
                            {(item.custom_props.custom_prop_state == 'FINAL' || item.custom_props.custom_prop_state == 'CANCELLED') ?
                             <View style={{opacity:1,paddingBottom:5,paddingTop:5,width:'50%'}}>
                              <RadioForm
                                radio_props={[{ label: item.my_answer + '    ', value: item.my_answer }, { label: item.other_answer + '    ', value: item.other_answer }]}
                                initial={itemindex}
                                formHorizontal={false}
                                 labelHorizontal={true}
                                buttonColor={'#ACACAC'}
                                buttonSize={6}
                                buttonOuterSize={19}
                                selectedButtonColor={'#68bcbc'}
                                buttonWrapStyle={{ marginBottom:10}}
                                labelWrapStyle={{ marginBottom:10}}
                                // buttonStyle={{marginTop:5,borderWidth:50}}
                                labelStyle={{opacity:1,color:'#222',fontSize:hp(2.2), fontFamily: 'Montserrat-Semibold',}}
                                animation={false}
                                disabled={true}
                                onPress={(value) => { this.setState({ result: value }) }}
                              />
                              </View>
                              :  
                             <View style={{opacity:1,paddingBottom:5,paddingTop:5,width:'50%'}}>
                             <RadioForm
                                radio_props={[{ label: item.my_answer + '    ', value: item.my_answer }, { label: item.other_answer + '    ', value: item.other_answer }]}
                                initial={-1}
                                formHorizontal={false}
                                 labelHorizontal={true}
                                buttonColor={'#ACACAC'}
                                buttonSize={6}
                                buttonOuterSize={19}
                                selectedButtonColor={'#68bcbc'}
                                buttonWrapStyle={{ marginBottom:10}}
                                labelWrapStyle={{ marginBottom:10}}
                                // buttonStyle={{marginTop:5,borderWidth:50}}
                                labelStyle={{opacity:1,color:'#222',fontSize:hp(2.2), fontFamily: 'Montserrat-Semibold',}}
                                animation={false}

                                onPress={(value) => { this.setState({ result: value }) }}
                              />
                             </View>}
                          
                             <View
                                style={{
                                borderLeftWidth: 1,
                                borderLeftColor: '#efefef',
                                opacity:1,
                                }}
                                />
                               {/* onPress={() => { this.publishCustomBet(item) }} */}
                              {(item.custom_props.custom_prop_state != 'FINAL' && item.custom_props.custom_prop_state != 'CANCELLED') ? <View style={{width:'30%',alignContent:'center',alignItems:'center'}}>
                              <TouchableOpacity style={{marginRight:wp(3), width:'100%',maxHeight:40, height: '50%', backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center',borderRadius:4,alignItems:'center' }} onPress={() => { this.publishCustomBet(item) }} >
                                <View style={{ opacity:1,alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                  <Text style={{
                                    color: 'white',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: hp(1.9),
                                    padding: 3,
                                    textAlign:'center'
                                  }} >Settle Bet</Text>
                                </View>
                              </TouchableOpacity>

                              {item.custom_prop_state==null?<TouchableOpacity style={{marginRight:wp(3),marginTop:wp(2), width:'100%',maxHeight:35, height: '50%', backgroundColor: 'white',justifyContent:'center',alignContent:'center',borderRadius:4,borderColor:'#68bcbc',borderWidth:1,alignItems:'center' }} 
                              onPress={() => { this.deleteItem(item) }} 
                             // onPress={() => { alert('item') }} 
                              >
                                <View style={{ opacity:1,alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                  <Text style={{
                                    color: '#68bcbc',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: hp(1.9),
                                    padding: 3,
                                    textAlign:'center'
                                  }} >Cancel Bet</Text>
                                </View>
                              </TouchableOpacity>:null}
                              </View>:<View style={{ width:'20%', height: '70%', backgroundColor: 'white',justifyContent:'center',alignContent:'center',borderRadius:4,alignItems:'center' }}></View>}
                              
                             
                        
                         
                          </View>
                         {(item.custom_props.custom_prop_state != 'FINAL') ?item.custom_props.custom_prop_state=='CANCELLED'?<View style={{ alignItems: 'center', justifyContent: 'flex-end', alignContent: 'flex-end',flexDirection:'row' ,paddingTop:3,paddingBottom:3,marginRight:wp(3),marginTop:wp(2),marginBottom:wp(2),}}>
                                <Text style={{
                                  fontFamily: 'Montserrat-Regular',
                                  color: 'black',
                                  fontSize: hp(1.6),
                                }} > Bet <Text style={{
                                  fontFamily: 'Montserrat-Regular',
                                  color: 'red',
                                  fontSize: hp(1.6),
                                }}>Cancelled</Text> at </Text>
                                <Text style={{color: '#222', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.8), textAlign: 'justify'}} >{moment(item.custom_props.expired_timestamp * 1000).format('LT')} {new Date(item.custom_props.expired_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.custom_props.expired_timestamp * 1000).toString().split(' ')[6].length - 2)}, {moment(item.custom_props.expired_timestamp * 1000).format('LL')}</Text>
                              </View>: <View style={{ alignItems: 'center', justifyContent: 'flex-end', alignContent: 'flex-end',flexDirection:'row' ,paddingTop:3,paddingBottom:3,marginRight:wp(3),marginTop:wp(2),marginBottom:wp(2),}}>
                                <Text style={{
                                  fontFamily: 'Montserrat-Regular',
                                  color: 'black',
                                  fontSize: hp(1.6),
                                }} > Bet closes at </Text>
                                <Text style={{color: '#222', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.8), textAlign: 'justify'}} >{moment(item.custom_props.expired_timestamp * 1000).format('LT')} {new Date(item.custom_props.expired_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.custom_props.expired_timestamp * 1000).toString().split(' ')[6].length - 2)}, {moment(item.custom_props.expired_timestamp * 1000).format('LL')}</Text>
                              </View> :<View style={{ alignItems: 'center', justifyContent: 'flex-end', alignContent: 'flex-end',flexDirection:'row' ,paddingTop:3,paddingBottom:3,marginRight:wp(3),marginTop:wp(2),marginBottom:wp(2),}}>
                                <Text style={{
                                  fontFamily: 'Montserrat-Regular',
                                  color: 'black',
                                  fontSize: hp(1.6),
                                }} > Result published on </Text>
                                <Text style={{color: '#222', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.8), textAlign: 'justify'}} >{moment(item.result_declared_timestamp * 1000).format('LT')} {new Date(item.result_declared_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.result_declared_timestamp * 1000).toString().split(' ')[6].length - 2)}, {moment(item.result_declared_timestamp * 1000).format('LL')}</Text>
                              </View>}
                         </View>
                          </View>
                          {this.state.more_archive=='0'?null:(item.custom_props.custom_prop_state != 'FINAL' && item.custom_props.custom_prop_state != 'CANCELLED')?null:index == parseInt(this.state.customProbBetList.length) - 1 ?<View style={{padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}><Text onPress={()=>{
        this.getCustomProbBetList('1','a');
        }} style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#f26522',textDecorationLine:'underline',textDecorationColor:'#f26522'}]}>More</Text></View>:null}
                          </View>
                     
                    )
                  }}
                />
                {/* </ScrollView> */}
                {/* </SafeAreaView> */}
                {/* <View style={{ height: '4%', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'white' }}>
                                <TouchableOpacity onPress={() => {this.state.btn_txt =='SETTLE CUSTOM BETS'? this.gotCustomResult() : this.gotCustomHistory() }}>
                                    <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>{this.state.btn_txt}</Text>
                                </TouchableOpacity>
                            </View> */}
                </View>:<View style={{height:hp(80),justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}><Text style={{textAlign:'center', fontFamily: 'Montserrat-Semibold',color: 'black',fontSize: hp(2.8)}}> No data available </Text></View>}

<ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />

{/* { this.state.customProbBetList.length==0? <View style={{ height: '10%', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'white' }}>
                                <TouchableOpacity onPress={() => {this.state.btn_txt =='SETTLE CUSTOM BETS'? this.gotCustomResult() : this.gotCustomHistory() }}>
                                    <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>{this.state.btn_txt}</Text>
                                </TouchableOpacity>
                            </View>   :null}        */}
      </View>
      {/* {this.state.more_archive!='0'?null:this.state.btn_txt =='POOL HISTORY'?null:index == parseInt(this.state.customProbBetList.length) - 1 ?<View style={{padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}><Text onPress={()=>{this.getCreatePoolList('1','a');}} style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#b9b7b7'}]}>More</Text></View>:null} */}
      
      <View style={{ height: '4%', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'white' }}>
                               {this.props.navigation.state.params.params.bet_id==''? <TouchableOpacity onPress={() => {this.state.btn_txt =='SETTLE CUSTOM BETS'? this.gotCustomResult() : this.gotCustomHistory() }}>
                                    <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>{this.state.btn_txt}</Text>
                                </TouchableOpacity>:null}
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



export default connect(mapStateToProps)(SettleCustom);