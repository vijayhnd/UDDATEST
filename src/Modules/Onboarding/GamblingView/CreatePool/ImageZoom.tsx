import React from "react";
import { View, Text, FlatList, TextInput, Image, Platform, Alert, TouchableOpacity, ScrollView, AsyncStorage, Animated, UIManager, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { FooterComponent } from "../../../../Components/CustomComponents/Footer/FooterComponent";
import { AdMobBanner } from 'react-native-admob';
import AlertUtil from "../../../../Util/AlertUtil";
import AppConstants from "../../../../Util/Constants";
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import Application from "../../.../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { connect } from 'react-redux';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { UDDAError } from "../../../../Entities";
import { FooterListner } from "../../../../Components/CustomComponents/Footer/SingleMatchScheduleWithTitleComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI';
import ImageViewer from 'react-native-image-zoom-viewer';
import DateTimePicker from "react-native-modal-datetime-picker";
import SendMsgRequest from "../../../../Services/Bets/SendMsgRequest";
import SendMsgResponseParser from "../../../../Services/Bets/SendMsgResponseParser";
import { Dialog } from 'react-native-simple-dialogs';
import moment from 'moment';
var update = require('immutability-helper');
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;


console.disableYellowBox = true;

const ProfilePageContent = {
  key: 'somethun',
  page_title: '',
}

// const images =[{
   
//     url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
 
// }]
interface G_ImagezoomViewProps extends AppValidationComponentProps {
  serviceKey?: string
  listeners?: any
}

interface G_ImagezoomViewState extends AppValidationComponentState {
 isDateTimePickerVisible:any;
 minimumDate:any;
 customBetDate:any;
 shift:any;
 DataList: any;
 loader: any;
 Accepted: any;
 Message: any;
 bet_user_info: any;
 bet_id: any;
 bet_type: any;
 bet_detail: any;
 dialogVisible: any;



}

class Imagezoom extends AppValidationComponent<G_ImagezoomViewProps, G_ImagezoomViewState>
  implements MenuIconListener, ISubheaderListener, FooterListner {
  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  private serviceRequestInProgress = false
  public filterData: any;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any
  
  public DeeplinkName = Application.sharedApplication().DeeplinkName;
  public LinkId = Application.sharedApplication().EncId;

  
  /*  End Auto Racing and Horse Racing */

  constructor(props: any) {
    super(props);

    this.state = {
        isDateTimePickerVisible:false,
        minimumDate:new Date(),
        customBetDate:'',
        shift: new Animated.Value(0),
        DataList: [],
        loader: false,
        Accepted: 'A',
        Message: '',
        bet_id: '',
        bet_type: '',
        bet_user_info: [],
        bet_detail: [],
        dialogVisible: '',

    };
  }

  async componentDidMount() {
    this.callMethod()
  }


  callMethod = () => {
    Application.sharedApplication().DeeplinkName = this.DeeplinkName;
    Application.sharedApplication().EncId = this.LinkId;
    console.log("Deeplink callMethod privatebet " + Application.sharedApplication().DeeplinkName)
    console.log("Deeplink callContestMethod link" + Application.sharedApplication().EncId)

    if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
          var DeeplinkName = Application.sharedApplication().DeeplinkName;
          var LinkId = Application.sharedApplication().EncId;
          console.log('DeeplinkName:' + JSON.stringify(DeeplinkName))
          console.log('ENC Id:' + JSON.stringify(LinkId))
          //index.php?index.php??
          var url: any;
          url = UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Custom_PoolGaming/share_custom_pool_info/' + LinkId;
         
          this.setState({ loader: true });
          console.log('url' + JSON.stringify(url));
          fetch(url, {
                method: 'GET',
                headers: {
                      'authorisation': this.authorisationToken
                },
          }).then((response) => response.json())
                .then((responseJson) => {
                      var that = this;
                      console.log('poolBet: ' + JSON.stringify(responseJson));

                      that.setState({ DataList: responseJson.data });
                       that.setState({ bet_detail: responseJson.data.bet_detail });
                       that.setState({ bet_id: responseJson.data.bet_detail.bet_id }) //garima
                       that.setState({ bet_type: responseJson.data.bet_detail.bet_reject_type }) // @pky
                       that.setState({ bet_user_info: responseJson.data.bet_user_info });
                      // that.setState({ people_list: responseJson.data.people_list });
                      // that.setState({ opposite: responseJson.data.opposite });
                      that.setState({ loader: false });

                      // if (responseJson.data.bet_detail.total_people_amount == null) {
                      //       responseJson.data.bet_detail.total_people_amount = '0';
                      // }
                      // if (responseJson.data.bet_detail.bet_odds_type) {
                      //       that.setState({ OddsBet: true });

                      //       let TeamName = responseJson.data.bet_detail.event_name.split(" Vs ");;
                      //       this.setState({ TeamName1: TeamName[0] })
                      //       this.setState({ TeamName2: TeamName[1] })

                      //       if (responseJson.data.bet_detail.bet_team_type == 'underdog') {
                      //             if (responseJson.data.bet_detail.bet_odds_type == '1') {
                      //                   that.setState({ HeaderValue: responseJson.data.bet_detail.ml_home_price })
                      //             }
                      //             else if (responseJson.data.bet_detail.bet_odds_type == '2') {
                      //                   that.setState({ HeaderValue: responseJson.data.bet_detail.total })
                      //             }
                      //             else if (responseJson.data.bet_detail.bet_odds_type == '3') {
                      //                   that.setState({ HeaderValue: responseJson.data.bet_detail.ps_home_spread })
                      //             }
                      //       }
                      //       else {
                      //             if (responseJson.data.bet_detail.bet_odds_type == '1') {
                      //                   that.setState({ HeaderValue: responseJson.data.bet_detail.ml_away_price })
                      //             }
                      //             else if (responseJson.data.bet_detail.bet_odds_type == '2') {
                      //                   that.setState({ HeaderValue: responseJson.data.bet_detail.total })
                      //             }
                      //             else if (responseJson.data.bet_detail.bet_odds_type == '3') {
                      //                   that.setState({ HeaderValue: responseJson.data.bet_detail.ps_away_price })
                      //             }
                      //       }
                      // }
                      // else {
                      //       that.setState({ OddsBet: false });
                      // }
                      // console.log('bet ' + JSON.stringify(that.state.OddsBet));
                      // console.log('Success Private bet' + JSON.stringify(that.state.DataList));

                      // var new_time_stamp = this.state.bet_detail.created_timestamp * 1000;
                      // var formated_time = moment(new_time_stamp).format('LT');
                      // var batdate: any = moment(new_time_stamp).format('LL');
                      // console.log(formated_time +'pradeep'+ batdate)
                      // var Match_date: any = new Date(new_time_stamp).toString().split(' ');
                      // console.log(formated_time +'pradeep'+ batdate+' >>>'+ Match_date)
                      // var zonevalue: any = Match_date[6].toString();
                      // var zone: any = zonevalue.substr(1, zonevalue.length - 2);

                      // this.setState({ betTime: formated_time + " " + zone });
                      // this.setState({ betDate: batdate });

                      // var new_time_stampExp = this.state.opposite.expired_timestamp * 1000;
                      // var formated_timeExp = moment(new_time_stampExp).format('LT');
                      // var batdateExp: any = moment(new_time_stampExp).format('LL');
                      // var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
                      // var zonevalueExp: any = Match_dateExp[6].toString();
                      // var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);

                      // this.setState({ betTimeExpr: formated_timeExp + " " + zoneExp });
                      // this.setState({ betDateExpr: batdateExp });
                      // console.log(moment('04-19-2020 11:08 PM').format('LL'));
                      // console.log(moment('04-19-2020 11:08 PM').format('LT')+ " " +new Date('04-19-2020 11:08 PM').toString().split(' ')[6].toString().substr(1, zonevalueExp.length - 2));
                      

                      if (responseJson.message == "Access Expired.") {
                            // AlertUtil.show("Session Expired ! Please login again");
                            console.log("Footer comp ---->" + responseJson.message);
                            LogoutUtill.logoutButtonPressed(this.props);
                      }
                      if (responseJson.message == "Access Expired.") {
                            // AlertUtil.show("Session Expired ! Please login again");
                            console.log("Footer comp ---->" + responseJson.message);
                            LogoutUtill.logoutButtonPressed(this.props);
                      }
                })
                .catch(error => {
                      this.setState({ loader: false });
                      Application.sharedApplication().DeeplinkName = '';
                      Application.sharedApplication().EncId = '';
                      Application.sharedApplication().DeeplinkStatus = false;
                      console.log('Private bet error ' + JSON.stringify(error));
                })
    }
    else {
          Application.sharedApplication().DeeplinkName = '';
          Application.sharedApplication().EncId = '';
          Application.sharedApplication().DeeplinkStatus = false;
          this.props.navigation!.navigate(AppScreens.G_DashboardView);
    }
}



showDialog(isShow: any) {
  // this.setState({ dialogVisible: isShow });
  var openAmount = this.state.bet_detail.amount_to_win - this.state.bet_detail.total_people_amount;
  console.log("Opne amount " + openAmount + " value " + this.state.valueofDialogShow);

  if (this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/' || this.DeeplinkName == 'propsbet/' || this.DeeplinkName == 'oddsbet/' || this.DeeplinkName == 'index.php?propsbet/' || this.DeeplinkName == 'index.php?oddsbet/') {
        if (this.state.betammount < 1000 || this.state.betammount < "1000") {
              AlertUtil.show("The minimum amount to bet is 1000 UDDA bucks.");
        }
        else {
              if (this.state.betammount <= openAmount) {
                    this.setState({ dialogVisible: isShow });
              }
              else if (this.state.betammount > openAmount) {
                    AlertUtil.show("Please enter amount below the Open Amount.");
              }
        }
  } else if (this.DeeplinkName == 'index.php?propsbet/public' || this.DeeplinkName == 'index.php?oddsbet/public' ||
        this.DeeplinkName == 'index.php?propsbet/private' || this.DeeplinkName == 'index.php?oddsbet/private') {
        if (this.state.betammount < parseInt(this.state.DataList.min_bet_amount)) {
              AlertUtil.show("The minimum amount to bet is " + this.state.DataList.min_bet_amount + " UDDA bucks");
        }
        else {
              if (this.state.betammount <= openAmount) {
                    this.setState({ dialogVisible: isShow });
              }
              else if (this.state.betammount > openAmount) {
                    AlertUtil.show("Please enter amount below the Open Amount.");
              }
        }
  }


}


sendMessege() {
  var sendMsgRequest = new SendMsgRequest(
        this.state.bet_user_info.id,
        this.state.Message,
        this.state.bet_id,
        this.state.bet_type

  )
  var serviceAction = new ServiceAction()
  var responseParser = new SendMsgResponseParser()
  this.props.dispatch!(serviceAction.request(ServiceType.Bets,
        ServiceKeys.SendMsgName,
        sendMsgRequest,
        [this.constructor.name],
        responseParser))
}

   componentWillUnmount() {
    //     AppState.removeEventListener('change', this._handleAppStateChange);
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    
      }
    
    
          componentWillMount() {
                console.log("componentwillmount");
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
   showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
   handleStartDatePicked = (date: any) => {
    var formated_date = moment(date).format('MM-DD-YYYY');
    this.setState({ customBetDate: formated_date });
    // this.customBetDateTime = formated_date;
    this.hideDateTimePicker();
  }
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };


  render() {
   
    return (
      <Container title={'POOL'}
      isHeader={true}
      isSubHeader={true}
      isTitle={true}
    //  showIndicator={this.serviceRequestInProgress}
      menuIconListener={false}
      LogoIconListener={false}
      availableBalanceListener={this}
      openPlaysListener={this}
      coveredPlaysListener={this}
      accountNameListener={this}
      isSetting={false}
    >


      {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
      <Dialog
                                          visible={this.state.dialogVisible}
                                          title=""
                                          onTouchOutside={() => this.setState({ dialogVisible: false })} >
                                          <View style={{ backgroundColor: "white", padding: 10 }}>
                                                <TouchableOpacity onPress={() => { this.setState({ dialogVisible: false }) }}>
                                                      <View style={{ alignItems: 'flex-end', width: '100%' }}>
                                                            <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                                                      </View>
                                                </TouchableOpacity>

                                                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} >
                                                      <Text style={{ padding: 1, fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: hp(2.2), color: 'black' }}>
                                                            Are you sure you want to place this bet?
                          </Text>
                                                      <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                                                            listener={() => {
                                                                  this.setState({ dialogVisible: false });

                                                                  if (this.state.OddsBet == true) {
                                                                        this.setState({ dialogVisible: false })
                                                                        if (this.DeeplinkName == 'oddsbet/' || this.DeeplinkName == 'index.php?oddsbet/') {
                                                                              this.AcceptBetCall()
                                                                        }
                                                                        else if (this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/') {
                                                                              this.acceptCustomCetCall()
                                                                        }
                                                                        else if (this.DeeplinkName == 'oddsbet/public' || this.DeeplinkName == 'oddsbet/private' || this.DeeplinkName == 'index.php?oddsbet/public' || this.DeeplinkName == 'index.php?oddsbet/private') {
                                                                              this.AcceptContestBetCall()
                                                                        }
                                                                  }
                                                                  else {
                                                                        this.setState({ dialogVisible: false });
                                                                        if (this.DeeplinkName == 'propsbet/' || this.DeeplinkName == 'index.php?propsbet/') {
                                                                              this.props_place_bet_API()
                                                                        } else if (this.DeeplinkName == 'propsbet/public' || this.DeeplinkName == 'propsbet/private' || this.DeeplinkName == 'index.php?propsbet/public' || this.DeeplinkName == 'index.php?propsbet/private') {
                                                                              this.AcceptContestPropBetCall()
                                                                        } else if (this.DeeplinkName == 'index.php?custombet/' || this.DeeplinkName == 'custombet/') {
                                                                              this.acceptCustomCetCall()
                                                                        }
                                                                  }
                                                            }} />
                                                </View>
                                          </View>
                                    </Dialog>



       <View style={styles.scrollContent}>

                              {/* <ProgressLoader
                                    visible={this.state.loader}
                                    isModal={true} isHUD={true}
                                    hudColor={"#68bcbc"}
                                    color={"#FFFFFF"} /> */}


                              <ScrollView bounces={false} style={styles.scrollviewstyle}>
                              <Animated.View style={[ styles.Main_WhiteColor_Container, { transform: [{ translateY: this.state.shift }] }]}>
       <View style={styles.Main_Container}>
       <View style={styles.Second_Container}>
       <View style={styles.Profile_Container}>
       <View style={styles.Image_Container}>

                                                            <Image source={{ uri:Application.sharedApplication().user!.profile.profilePic}} style={{ width: 30, height: 30, borderRadius: 15 }} resizeMode='contain' />
                                                      </View>
                                                      <View style={styles.UserDetail_Container}>
                                                            <View style={{ flexDirection: 'row', width: '100%', height: 'auto' }}>
                                                                  <View style={{ flexDirection: 'column', width: '60%', }}>
                                                                        <Text style={{ fontSize: 12, color: '#888888', fontFamily: 'Montserrat-Regular', }}>From:</Text>
                                                                        <Text style={{ fontSize: 14, color: '#333333', fontFamily: 'Montserrat-SemiBold', paddingLeft: 0 }}>{Application.sharedApplication().user!.profile.firstName}</Text>
                                                                  </View>
                                                                  <View style={{ width: '40%', paddingRight: 10 }}>
                                                                        <Text style={{ width: '100%', fontSize: 10, color: '#888888', fontFamily: 'Montserrat-Regular', textAlign: 'right' }}> {'March 24,2020'}  </Text>
                                                                        <Text style={{ width: '100%', fontSize: 10, color: '#888888', fontFamily: 'Montserrat-Regular', textAlign: 'right' }}> {'9:34 PM IST'}  </Text>
                                                                  </View>
                                                            </View>
                                                            {this.state.Accepted == 'R' ?
                                                                  <Text style={{ fontSize: 12, color: '#888888', fontFamily: 'Montserrat-Regular' }}>To:
                                    <Text style={{ fontSize: 14, color: '#333333', fontFamily: 'Montserrat-SemiBold' }}> {Application.sharedApplication().user!.profile.firstName} {Application.sharedApplication().user!.profile.lastName} </Text>
                                                                  </Text>
                                                                  : null}
                                                      </View>
                                                     
         </View>
         <View style={styles.Line}/>
         {this.state.Accepted == "A" ?<View style={{width:'95%',backgroundColor:'white',padding:8}}>
         <Text style={{ fontSize: 14, color: '#333333', fontFamily: 'Montserrat-SemiBold' }}>{Application.sharedApplication().user!.profile.firstName} {Application.sharedApplication().user!.profile.lastName} 
         <Text style={{ fontSize: 14, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold' }}>&nbsp;bets a &nbsp;<Text style={{ fontSize: 14, color: '#333333', fontFamily: 'Montserrat-SemiBold' }}>{this.state.bet_detail.bet_amount}</Text></Text>
         </Text>
         <Text style={{ fontSize: 14, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold',marginTop:3 }}>UDDA bucks that</Text>
                                  <Text style={{ fontSize: 14, color: '#69bbbb', fontFamily: 'Montserrat-Semibold',marginTop:3 }}>{this.state.bet_detail.question}</Text>
         <Text style={{ fontSize: 14, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold',marginTop:3 }}>My answere <Text style={{ fontSize: 14, color: '#69bbbb', fontFamily: 'Montserrat-Semibold' }}>{this.state.bet_detail.my_answer_text}</Text></Text>
         <Text style={{ fontSize: 14, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold',marginTop:3 }}>Would you like accept the bet?</Text>

         <View style={{width:'99%',borderWidth:1,borderRadius:6,marginTop:5,marginBottom:4}}>
           <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:3}}>
             <View style={{width:'60%'}}><Text style={{ fontSize: 12, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold',paddingLeft:8 }}>Wager</Text></View>
             <View style={{width:'40%',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end',flexDirection:'row'}}><Image
                                                                        resizeMode="contain"
                                                                        style={{ height: hp(1.3), width: hp(1.5),marginBottom:4 }}
                                                                        source={require('../../../../images/BucksDark.png')}></Image><Text style={{ fontSize: 12, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold',paddingRight:8}}>1000</Text></View>
           </View>  
           <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:3}}>
             <View style={{width:'60%'}}><Text style={{ fontSize: 12, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold',paddingLeft:8 }}>{this.state.bet_detail.total_people} People accepted</Text></View>
             <View style={{width:'40%',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end',flexDirection:'row'}}><Image
                                                                        resizeMode="contain"
                                                                        style={{ height: hp(1.3), width: hp(1.5),marginBottom:4 }}
                                                                        source={require('../../../../images/BucksDark.png')}></Image><Text style={{ fontSize: 12, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold',paddingRight:8 }}>{this.state.bet_detail.total_people_amount}</Text></View>
           </View>  
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <View style={{width:'70%'}}><Text style={{ fontSize: 12, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold' }}></Text></View>
             <View style={{width:'30%',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end',flexDirection:'row',marginRight:5}}><View style={[styles.Line,{paddingRight:8}]}/></View>
           </View>  

            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:3}}>
             <View style={{width:'60%'}}><Text style={{ fontSize: 12, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold',paddingLeft:8 }}>Open amount</Text></View>
             <View style={{width:'40%',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end',flexDirection:'row'}}><Image
                                                                        resizeMode="contain"
                                                                        style={{ height: hp(1.3), width: hp(1.5),marginBottom:4 }}
                                                                        source={require('../../../../images/BucksDark.png')}></Image><Text style={{ fontSize: 12, color: '#c3c3c3', fontFamily: 'Montserrat-Semibold',paddingRight:8 }}>{this.state.bet_detail.bet_amount - this.state.bet_detail.total_people_amount}.00</Text></View>
           </View>       
         </View>

         
         <View style={styles.customtextinputpool}>                        
                        <TouchableOpacity style={{ width: '100%' }} onPress={this.showDateTimePicker}>
                        <View style={{ width: '100%',height:hp(8), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 0, backgroundColor: '#eeeeee' }}>
                            <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                            <Text style={[styles.datetimetext,{color: this.state.customBetDate ?'black':'c3c3c3',fontSize: hp(2)}]}>{this.state.customBetDate==''?'Select your answere date':this.state.customBetDate}</Text>
                            </View>
                            <View style={styles.datetimeicon}>
                            
                                <Image source={require('../../../../images/calendar.png')}
                                style={{ height: 20, width: 20, marginRight: 8 }}
                                resizeMode="contain" />
                            
                            </View>
                        </View>
                        </TouchableOpacity>
                        </View>

                        <View style={[styles.customtextinputpool,{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}]}>    
                        <Image resizeMode="contain"style={{ height: 15, width: 15 }}
                             source={require('../../../../images/BucksDark.png')}/>                   
                        <TextInput
                       // value={this.state.searchText}
                       // numberOfLines={10}
                       // multiline={true}
                        style={{paddingLeft:5, height:hp(8), fontFamily: 'Montserrat-Semibold', fontSize: hp(2),width:'92%' }}
                        placeholder='Enter bet amount'
                        placeholderTextColor={'#888888'}
                       //onChangeText={(text) => { this.sarchCustomProp(text) }}
                       // autoFocus={true}
                    />
                        </View>


                        <View style={styles.customtextinputpool}>                        
                        <TouchableOpacity style={{ width: '100%' }} onPress={()=>{alert('hello settlepool')}}>
                        <View style={styles.deepPlace}>
                        <Text style={{  fontSize: hp(3.8), color: 'white', fontFamily: 'Montserrat-SemiBold'}}>ACCEPT BET</Text>  
                        {/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                        <Text style={{  fontSize: hp(1.8), color: '#333333', fontFamily: 'Montserrat-SemiBold'}}>Amount to win: </Text>
                        <Image resizeMode="contain"style={{ height: 10, width: 10 }}
                             source={require('../../../../images/BucksDark.png')}/>
                        <Text style={{  fontSize: hp(2), color: '#333333', fontFamily: 'Montserrat-Bold', paddingLeft: 4 }}>10000</Text>
                          </View>                          */}
                        
                        {/* <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Image resizeMode="contain"style={{ height: 15, width: 15 }}
                             source={require('../../../../images/BucksDark.png')}/>
                        <Text style={{  fontSize: hp(2), color: '#333333', fontFamily: 'Montserrat-SemiBold', paddingLeft: 4 }}>10000</Text>
                          </View>                            */}
                        </View>
                        </TouchableOpacity>
                        </View>

                        <Text style={{ fontSize: 14, color: '#69bbbb', fontFamily: 'Montserrat-Semibold',padding:8,textAlign:'center' }} onPress={()=>{this.setState({ Accepted: 'R' });}}>Not now,I think I'II pass</Text>   

         </View>:null}
         {this.state.Accepted == 'R' ?
                                                      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                                            <Text style={{ width: '85%', color: '#333333', fontFamily: 'Montserrat-Bold', fontSize: 12 }}>Reply to {''}
                                                                  <Text style={{ color: '#888888', fontFamily: 'Montserrat-Regular', fontSize: 12 }}> | </Text>
                                                                  <Text style={{ color: '#888888', fontFamily: 'Montserrat-Regular', fontSize: 12 }}>Reply to All </Text>
                                                            </Text>
                                                            <View style={{ width: '95%', height: 250, backgroundColor: 'white', alignItems: 'center', marginTop: 15 }}>
                                                                  <TextInput
                                                                        value={this.state.Message}
                                                                        style={{ padding: 8, fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), width: '100%' }}
                                                                        placeholder='Type your message here'
                                                                        placeholderTextColor='#333333'
                                                                        onChangeText={(text) => this.setState({ Message: text })}
                                                                        multiline={true}
                                                                        editable={true}
                                                                  />
                                                            </View>
                                                            {/* <TouchableWithoutFeedback onPress={() => { this.sendMessege() }}> */}
                                                            <TouchableWithoutFeedback onPress={() => { this.sendMessege() }}>
                                                                  <View style={{ width: '90%', height: 40, backgroundColor: '#68bcbc', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                                                        <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Montserrat-Bold', textAlign: 'center' }}>
                                                                              SEND
                                       </Text>
                                                                  </View> 
                                                            </TouchableWithoutFeedback>

                                                            <TouchableWithoutFeedback onPress={() => { this.setState({ Accepted: 'A' }) }}>
                                                                  <Text style={{ textAlign: 'center', color: '#68bcbc', textDecorationColor: '#68bcbc', textDecorationLine: 'underline', marginTop: 10, fontFamily: 'Montserrat-Medium', fontSize: 12 }}>
                                                                        View original message
                              </Text>
                                                            </TouchableWithoutFeedback>
                                                      </View>
                                                      : null}
         </View>
        
         </View>
    </Animated.View>
   </ScrollView>
   </View>
   <DateTimePicker
              // onDateChange={this.setDate}
              isVisible={this.state.isDateTimePickerVisible}
              // customConfirmButtonIOS={this.handleStartDatePicked}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={this.state.minimumDate}
              mode="date"
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

  placeBetRequestStatus: state.serviceReducer.requestStatus,
  placeBetError: state.serviceReducer.error,


  sendMsgRequestStatus: state.serviceReducer.requestStatus,
      sendMsgResponse: state.serviceReducer.response,
      sendMsgError: state.serviceReducer.error,

  betaFriendRequestStatus: state.serviceReducer.requestStatus,
  betaFriendError: state.serviceReducer.error,

  customBetaFriendRequestStatus: state.serviceReducer.requestStatus,
  customBetaFriendError: state.serviceReducer.error,

  feedbackRequestStatus: state.serviceReducer.requestStatus,
  feedbackError: state.serviceReducer.error,

})



export default connect(mapStateToProps)(Imagezoom);