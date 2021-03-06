import React from "react";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, TouchableWithoutFeedback, Share, Image,TouchableOpacity } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import BigButton from '../../../../Components/Button/BigButton';
import UpdateProfileResponse from "../../../../Services/Profile/UpdateProfileResponse";
import AlertUtil from "../../../../Util/AlertUtil";
import Application from "../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { UDDAError } from "../../../../Entities";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import { Dialog } from 'react-native-simple-dialogs';

import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import AcceptContestRequest from "../../../../Services/Contest/AcceptContestRequest";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import AcceptContestResponseParser from "../../../../Services/Contest/AcceptContestResponseParser";
import AcceptContestResponse from "../../../../Services/Contest/AcceptContestResponse";
import moment from 'moment';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
import ReferralService from "../../../../Services/Referral/ReferralService";
import DetailComponent from "../../../../Components/CustomComponents/Free2Play/Freetoplaydetail";
const ProfilePageContent = {
  key: 'somethun',
  page_title: 'INVITATION TO JOIN',
}

interface G_InvitationToJoinProps extends AppValidationComponentProps {
  updateProfileRequestStatus?: ServiceRequestStatus
  updateProfileResponse?: UpdateProfileResponse
  updateProfileError?: UDDAError
  getProfileRequestStatus?: ServiceRequestStatus
  getProfileResponse?: GetProfileResponse
  getProfileError?: UDDAError

  acceptContestRequestStatus?: ServiceRequestStatus
  acceptContestResponse?: AcceptContestResponse,
  acceptContestError?: UDDAError

  serviceKey?: string
  listeners?: any
}

interface ProflieViewState extends AppValidationComponentState {
  contentInsetBottom?: any;
  loader: any;
  ContestData: any;
  shareDialog: any;
  Share_Show_Msg: any;
  MessageUrl: any;
  MessageString: any;
  contestEndDate: any;
  contestStartDate: any;
  version:any;
  contestdetail: any;
}


export class G_InvitationToJoin extends AppValidationComponent<G_InvitationToJoinProps, ProflieViewState>
  implements MenuIconListener, ISubheaderListener {


  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  private userId = Application.sharedApplication().user!.id;
  private firstName =Application.sharedApplication().user!.profile.firstName   //garima
  private lastName = Application.sharedApplication().user!.profile.lastName!  //garima
  private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
  private serviceRequestInProgress = false;
  private referralservice = new ReferralService();

  constructor(props: G_InvitationToJoinProps) {
    super(props);
    this.state = {
      loader: false,
      ContestData: [],
      shareDialog: false,
      contestdetail: false,
      Share_Show_Msg: '',
      MessageUrl: '',
      MessageString: '',
      contestEndDate: '',
      contestStartDate: '',
      version:'2.8'

    }
  }


  // ------------------------------------------------------- API calling ----------------------------------------------------------------------

  async componentDidMount() {
    //console.log("Profile Name :"  +this.profileName)
    this.callMethod();
  }

  componentWillUnmount() {
  
 }


  callMethod = () => {
    if (Application.sharedApplication().DeeplinkName && Application.sharedApplication().DeeplinkName != '') {
      var DeeplinkName = Application.sharedApplication().DeeplinkName;
      var LinkId = Application.sharedApplication().EncId;
      console.log('DeeplinkName:' + JSON.stringify(DeeplinkName))
      console.log('ENC Id:' + UrlService.CONSTURI)
      console.log('url @pky' + UrlService.CONSTURI )
      var url: any;
      if (DeeplinkName == 'index.php?contestbet/' || DeeplinkName == 'contestbet/') { //@pky
       // if (DeeplinkName == 'index.php?contestbet/') {
        url = UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_share_private_contest_info/' + LinkId + '/' + this.userId;
     
      
      }
      else
      {
        url = UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/PrivateContest/get_share_private_contest_info/' + LinkId + '/' + this.userId;
      
      }
     // url = 'https://bet.udda.com/betting-app/' +'index.php/v1/apiGaming/get_share_private_contest_info/' + LinkId + '/' + this.userId;
      this.setState({ loader: true });
      // fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_share_private_contest_info/emhKMVg3UllWbk5UTHI4dHVUeEQ1QT09/' + this.userId, {
      fetch(url, {
        method: 'GET',
        headers: {
          'authorisation': this.authorisationToken
        },
      }).then((response) => response.json())
        .then((responseJson) => {
          var that = this;
          console.log('Contest: ' + JSON.stringify(responseJson));
          if (responseJson.error == 0) {
            this.setState({ ContestData: responseJson.data.private_contest_details })
            
            this.setState({ version: responseJson.version})
            var startdate = responseJson.data.private_contest_details.contest_start_date_timestamp * 1000;
            var starttime = moment(startdate).format('MMMM DD, YYYY');
            this.setState({ contestStartDate: starttime });

            var enddate = responseJson.data.private_contest_details.contest_end_date_timestamp * 1000;
            var endtime = moment(enddate).format('MMMM DD, YYYY');
            this.setState({ contestEndDate: endtime });
          }
          else {
            AlertUtil.show("Not Succefull");
          }
          Application.sharedApplication().DeeplinkName = ''
          Application.sharedApplication().EncId = ''
          Application.sharedApplication().DeeplinkStatus = false;
          if (responseJson.message == "Access Expired.") {
            // AlertUtil.show("Session Expired ! Please login again");
            console.log("Footer comp ---->"+responseJson.message);
            LogoutUtill.logoutButtonPressed(this.props);
           }
       
        })
        .catch(error => {
          console.log('Contest bet error ' + JSON.stringify(error));
          AlertUtil.show('error ' + JSON.stringify(error));
          Application.sharedApplication().DeeplinkName = ''
          Application.sharedApplication().EncId = ''
          Application.sharedApplication().DeeplinkStatus = false;
        })
    }
    else {
      AlertUtil.show('This Contest is no longer available.');
      Application.sharedApplication().DeeplinkName = ''
      Application.sharedApplication().EncId = ''
      Application.sharedApplication().DeeplinkStatus = false;
      this.props.navigation!.navigate(AppScreens.G_DashboardView);
    }
  }

  JoinBet(flag) {
    
     // alert(winnetAmount+'>>>>'+index+'>>>'+this.props.navigation.state.params.params.spin_alldata);
     this.setState({loader:true})
     var params: any = {
        'private_contest_id':  this.state.ContestData.private_contest_id,
        'private_contest_join_status':flag
      };

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
      console.log("Headers in aceept bingo ", JSON.stringify(headers));
      fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/PrivateContest/accept_private_contest', {
        method: 'POST',
        headers: headers,
        body:formData

      }).then((response) => response.json())
        .then((responseJson) => {
          console.log(JSON.stringify(responseJson))
          // this.setState({spinner_price:this.state.spinData})
          
         
         // this.setState({ loader: false });
          var that=this;
  if (responseJson.message == "Access Expired.") {
      // AlertUtil.show("Session Expired ! Please login again");
      console.log("Footer comp ---->" + responseJson.message);
      this.setState({ loader: false });
      //this.logoutButtonPressed();
    }
    else{
     
     if(responseJson.error == 0)
     {
      this.props.navigation!.replace(AppScreens.G_UddaContests,{params:{bet_id:'ashish'}});
     }
     else
     {
      AlertUtil.showSingleActionMessage(responseJson.message,function(){ that.setState({ loader: false });})
     }
    
 
      }
  
        })
        .catch(error => {
         // AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
          console.log(error);
        })

    

   
  }





  gotAcceptrejectAPICall(flag: any) {
    if(this.state.ContestData.version_number == '2.8')
    {
      this.JoinBet(flag);
      return
    }
   
  
    var acceptContestRequest = new AcceptContestRequest(
      this.state.ContestData.private_contest_id,
      flag,
    )
    var serviceAction = new ServiceAction()
    var responseParser = new AcceptContestResponseParser()
    this.props.dispatch!(serviceAction.request(ServiceType.Contest,
      ServiceKeys.AcceptRejectContestName,
      acceptContestRequest,
      [this.constructor.name],
      responseParser))

  }




  accountNameTapped() {
    this.props.navigation!.navigate(AppScreens.G_ProfileView);
  }

  iconDidTapped() {
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
  }

  LogoiconDidTapped() {
    //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
	RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
  }


  openPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
  }

  coveredPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)

  }

  availableBalanceTapped() {
  }

  logoutButtonPressed() {
    Application.sharedApplication().logout()
    RouterBuilder.resetRouteTo(AppScreens.OnboardingStack, this.props)
  }

  async SharePrivateContest(item: any) {

    var MessageString: any;
    var ShowString: any;
    var url: any;
    var fullname = this.firstName +" " + this.lastName; //garima
    var referStr: any;
    var my_referral_code =  Application.sharedApplication().user!.profile.my_referral_code;
    //console.log(fullname);
    //item.creator
   // url = "http://bet.udda.com/index.php?t=contestbet&i=" + item.encryptor_private_contest_id;
  //  url = "http://bet.udda.com/index.php?t=contestbet&i=" + item.encryptor_private_contest_id;
    if(this.state.ContestData.version_number == '2.8')
    {
      url = "http://bet.udda.com/index.php?t=contestbetnew&i=" + item.encryptor_private_contest_id;
    }
    else{
      url = "http://bet.udda.com/index.php?t=contestbet&i=" + item.encryptor_private_contest_id;
    }
    url = await this.referralservice.getReferralUrl(url, my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
    referStr = "\n Use Referral Code " + my_referral_code + " to sign up. ";
    MessageString = "You have been invited to a private contest through UDDA by " + fullname + "." + referStr + "\n Open Link : " + url;


    ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
      You have been invited to a private contest through UDDA by <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {fullname} </Text>
      {referStr}
    </Text>

    this.setState({ MessageString: MessageString });
    this.setState({ Share_Show_Msg: ShowString });
    this.setState({ MessageUrl: url });
    console.log("Private Contest " + JSON.stringify(MessageString));
    this.setState({ shareDialog: true });
  }



  shareNow() {
    var Message = this.state.MessageString;
    Share.share({
      message: Message
    }).then((result: any) => {
      this.setState({ shareDialog: false })
      console.log('share result' + JSON.stringify(result));
    }).catch((errorMsg: any) => {
      this.setState({ shareDialog: false })
      console.log('share error ' + JSON.stringify(errorMsg));
    });
  }



  componentWillReceiveProps(nextProps: G_InvitationToJoinProps) {
    if (nextProps.listeners!.includes(this.constructor.name)) {
      if (nextProps.serviceKey === ServiceKeys.AcceptRejectContestName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            console.log("feedbackResponse " + JSON.stringify(nextProps.acceptContestResponse));
            var response = nextProps.acceptContestResponse!.response;
            console.log("custom bet success");
            AlertUtil.show(response.message);
            // this.props.navigation!.navigate(AppScreens.G_YourPrivateContest); 
            this.props.navigation!.replace(AppScreens.G_UddaContests,{params:{bet_id:'ashish'}});
            this.serviceRequestInProgress = false;
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.FinishedWithError:
            this.serviceRequestInProgress = false
            var errorMessage = nextProps.error!.message
            AlertUtil.show(errorMessage)
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            this.serviceRequestInProgress = true
            break
        }

      }
    }
  }


  gotoinfo(){
    RouterBuilder.replaceRouteTo(AppScreens.G_InfochartView, this.props)
  }


  closeDetailModal() {
    this.setState({ contestdetail: !this.state.contestdetail });
  }

  goinfo() {
    this.props.navigation!.navigate(AppScreens.G_InfochartView, this.props)
  }

  openDetailmodel(){
     
        this.setState({ contestdetail: !this.state.contestdetail });
  
   
}


  render() {
    return (
      <Container title={ProfilePageContent.page_title}
        isHeader={true}
        isSubHeader={true}
        isTitle={true}
        showIndicator={this.serviceRequestInProgress}
        menuIconListener={this}
        LogoIconListener={this}
        accountNameListener={this}
        availableBalanceListener={this}
        openPlaysListener={this}
        coveredPlaysListener={this}
        isSetting={false}>

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.scrollContent}
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 0, bottom: this.state.contentInsetBottom }}
          scrollEnabled={true}
          bounces={false}>




          {/* -------------------------------- Share Dialogue --------------------------------*/}
          <Dialog
            visible={this.state.shareDialog}
            title=""
            onTouchOutside={() => this.setState({ shareDialog: false })} >

            <View style={{ backgroundColor: "white" }}>

              <View style={{ justifyContent: "center" }} >

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '85%', paddingLeft: '15%' }}>
                    <Image source={require('../../../../images/udda_logo_white.png')} style={{ width: wp(30), height: wp(7), margin: 10, alignSelf: 'center' }} resizeMode='contain' />
                  </View>
                  <View style={{ width: '15%' }}>
                    <TouchableWithoutFeedback onPress={() => { this.setState({ shareDialog: false }) }}>
                      <View>
                        <Image source={require('../../../../images/close.png')} style={{ height: 13, width: 13, alignSelf: 'flex-end', marginRight: 8, marginTop: 10 }}></Image>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>


                <View style={{ width: '100%', backgroundColor: '#cccccc', height: 1, marginTop: 1, padding: 0 }}></View>

                <View style={{ justifyContent: "center", padding: 10 }}>

                  <Text style={{ padding: 1, fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.7), marginTop: 3, color: 'black' }}>Messege</Text>

                  <View style={{ padding: 1, borderColor: '#cccccc', borderWidth: 1, marginTop: 5, }}>
                    <Text style={{ padding: 8, width: '100%', height: 'auto' }}>{this.state.Share_Show_Msg}</Text>

                  </View>
                  <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.5), marginTop: 5, color: 'black' }}>
                    {this.state.MessageUrl}
                  </Text>
                  <BigButton title="Share Now" style={styles.verify_button} textStyle={styles.verify_button_text_style}
                    listener={() => { this.shareNow() }} />
                </View>
              </View>
            </View>
          </Dialog>






          <View style={styles.mainContent}>
            <View style={styles.NFLDAILYGAME} >
              <View>
                <View style={{ paddingVertical: 3, padding: 5 }}>
                  <Text style={styles.Text_Nfl}>{this.state.ContestData.contest_name}</Text>
                  <View style={styles.Line1}>
                  </View>
                  <Text style={styles.Text_ContestName}>CONTEST NAME</Text>
                </View>


                <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 3, padding: 5, backgroundColor: '#eeeeee' }}>
                  <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center', marginRight: '0.5%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.Text_Allan}>{this.state.ContestData.creator}</Text>
                    </View>
                    <View style={styles.Line1}></View>
                    <Text style={styles.Text_ContestName}>CREATOR</Text>
                  </View>

                  <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center', marginLeft: '0.5%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        resizeMode="contain"
                        style={{ height: hp(1.4), width: hp(1.6), marginTop: 12, marginRight: 2 }}
                        source={require('../../../../images/Buckscut.png')} />
                      <Text style={styles.Text_Allan}>{this.state.ContestData.join_fee}.<Text style={{ fontSize: 10 }}>00</Text></Text>
                    </View>
                    <View style={styles.Line1}></View>
                   {this.state.ContestData.version_number > 2.7 ? <Text style={styles.Text_ContestName}>ENTRY FEE</Text>:<Text style={styles.Text_ContestName}>CONTEST FEE</Text>}
                  </View>
                </View>



                <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 3, padding: 5, backgroundColor: '#eeeeee' }}>
                  <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center', marginRight: '0.5%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.Text_Allan}>{this.state.ContestData.league_name}</Text>
                    </View>
                    <View style={styles.Line1}></View>
                    <Text style={styles.Text_ContestName}> LEAGUE NAME</Text>
                  </View>

                  <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center', marginLeft: '0.5%' }}>
                    <Text style={styles.Text_Allan}>{this.state.ContestData.ContestType}</Text>
                    <View style={styles.Line1}></View>
                    {this.state.ContestData.version_number > 2.7 ?<Text style={styles.Text_ContestName}>MINIMUM PICKS PER</Text>:<Text style={styles.Text_ContestName}>CONTEST TYPE</Text>}
                  </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 3, padding: 5, backgroundColor: '#eeeeee' }}>
                  <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center', marginRight: '0.5%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.Text_Allan}>{this.state.contestStartDate}</Text>
                    </View>
                    <View style={styles.Line1}></View>
                    <Text style={styles.Text_ContestName}>First Game Date</Text>
                  </View>

                  <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center', marginLeft: '0.5%' }}>
                    <Text style={styles.Text_Allan}>{this.state.contestEndDate}</Text>
                    <View style={styles.Line1}></View>
                    <Text style={styles.Text_ContestName}>Last Game Date</Text>
                  </View>
                </View>


                {this.state.ContestData.version_number !=  '2.8'  ? <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 3, padding: 5, paddingBottom: 21, backgroundColor: '#eeeeee' }}>
                  <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center', marginRight: '0.5%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        resizeMode="contain"
                        style={{ height: hp(1.4), width: hp(1.6), marginTop: 12, marginRight: 2 }}
                        source={require('../../../../images/Buckscut.png')} />
                      <Text style={styles.Text_Allan}>{this.state.ContestData.min_bet_amount}
                     {/*  .<Text style={{ fontSize: 10 }}>00</Text> */}
                      </Text>
                    </View>
                    <View style={styles.Line1}></View>
                    <Text style={styles.Text_ContestName}>MINIMUM BET AMOUNT</Text>
                  </View>

                  <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center', marginRight: '0.5%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        resizeMode="contain"
                        style={{ height: hp(1.4), width: hp(1.6), marginTop: 12, marginRight: 2 }}
                        source={require('../../../../images/Buckscut.png')} />
                        {
                        (this.state.ContestData.max_bet_amount!="")?
                          <Text style={styles.Text_Allan}>{this.state.ContestData.max_bet_amount}
                           </Text> : <Text style={styles.Text_Allan}>0.<Text style={{ fontSize: 10 }}>00</Text> 
                          </Text>
                        }
                      
                    </View>
                    <View style={styles.Line1}></View>
                    <Text style={styles.Text_ContestName}>MAXIMUM BET AMOUNT</Text>
                  </View>

                </View>
                :null
  }
                <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 3, padding: 5, paddingBottom: 21, backgroundColor: '#eeeeee' }}>
                

                  <View style={{ width: '99%', justifyContent: 'center', alignItems: 'center', marginLeft: '0.5%' }}>
                    <TouchableWithoutFeedback onPress={() => { this.state.ContestData.price_type == 'See Prize Chart' ? this.gotoinfo() : null }}>
                      <Text style={[styles.Text_Allan, { color: this.state.ContestData.price_type == 'See Prize Chart' ? '#68bcbc' : 'black', textDecorationLine: this.state.ContestData.price_type == 'See Prize Chart' ? 'none' : 'none' }]}>{this.state.ContestData.price_type}</Text>
                    </TouchableWithoutFeedback>
                    <View style={styles.Line1}></View>
                    {this.state.ContestData.version_number > 2.7 ?<Text style={styles.Text_ContestName}>Prize Payout(s)</Text>:<Text style={styles.Text_ContestName}>PRIZE TYPE</Text>}
                  </View>

                </View>

               {this.state.ContestData.version_number > 2.7 && <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor: '#eeeeee',padding:5,paddingBottom:10}}>
                   <TouchableOpacity onPress={()=>{this.openDetailmodel()}}>
                    <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>{'View Contest Details'}</Text>
                    </TouchableOpacity>
                  </View>}

              </View>
              <View style={styles.MainAcceptView}>
                <TouchableWithoutFeedback onPress={() => { this.gotAcceptrejectAPICall(1) }}>
                  <View style={[styles.AcceptView, { marginRight: '1%', borderBottomLeftRadius: 5 }]}>
                    <Text style={styles.Text_Accept}>
                      Accept
                   </Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => { this.gotAcceptrejectAPICall(0) }}>
                  <View style={[styles.AcceptView2, { borderBottomRightRadius: 5, backgroundColor: '#999999' }]}>
                    <Text style={styles.Text_Accept}>
                      Decline
                  </Text>
                  </View>
                </TouchableWithoutFeedback>

              </View>

              </View>
              {this.state.ContestData.is_share == '0' ?<View style={{ width: '100%' }}>
                <View style={styles.LineImageContainer}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../../images/DotedLine.png')}
                    style={{ height: 2, width: '100%', marginTop: 10 }}>
                  </Image>
                </View>

                <View style={{ padding: 10, width: '100%' }}>
                  <TouchableWithoutFeedback onPress={() => { this.SharePrivateContest(this.state.ContestData) }}>
                    <View style={styles.BorderContainer}>
                      <Image
                        resizeMode="contain"
                        style={{ height: hp(2.5), width: hp(2.5), marginRight: 1 }}
                        source={require('../../../../images/gaming_share.png')} />
                      <Text style={styles.Text_ViewThisContest}>INVITE MORE FRIENDS</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>:null}
              
            </View>


           

            {/* {this.state.ContestData.is_share == '0' ?
              <View style={{ width: '100%' }}>
                <View style={styles.LineImageContainer}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../../images/DotedLine.png')}
                    style={{ height: 2, width: '100%', marginTop: 10 }}>
                  </Image>
                </View>

                <View style={{ padding: 10, width: '100%' }}>
                  <TouchableWithoutFeedback onPress={() => { this.SharePrivateContest(this.state.ContestData) }}>
                    <View style={styles.BorderContainer}>
                      <Image
                        resizeMode="contain"
                        style={{ height: hp(2.5), width: hp(2.5), marginRight: 1 }}
                        source={require('../../../../images/gaming_share.png')} />
                      <Text style={styles.Text_ViewThisContest}>INVITE MORE FRIENDS</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              :
              <View style={{ width: '100%' }}>
                <View style={styles.LineImageContainer}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../../images/DotedLine.png')}
                    style={{ height: 2, width: '100%', marginTop: 10 }}>
                  </Image>
                </View>

                <View style={{ padding: 10, width: '100%' }}>
                  <View style={[styles.BorderContainer, { borderColor: '#96d0d0' }]}>
                    <Image
                      resizeMode="contain"
                      style={{ height: hp(2.5), width: hp(2.5), padding:5 }}
                      source={require('../../../../images/light_green_share.png')} />
                    <Text style={[styles.Text_ViewThisContest, { color: '#96d0d0' ,paddingLeft:5}]}>INVITE MORE FRIENDS</Text>
                  </View>
                </View>
              </View>
            } */}
         
        </KeyboardAwareScrollView>
        
         {this.state.contestdetail && (
           <DetailComponent
             detailmodel={this.state.contestdetail}
             encrypted_contest_id={
               this.state.ContestData.private_contest_id
             }
             onDismiss={() => {
               this.closeDetailModal();
             }}
             goinfo={() => {
                 this.goinfo();
               }}
               join_type={'private_contest'}
           />
         )}

      </Container>
    );
  }

}

const mapStateToProps = (state: GlobalAppState) => ({
  requestStatus: state.serviceReducer.requestStatus,
  error: state.serviceReducer.error,
  updateProfileRequestStatus: state.serviceReducer.requestStatus,
  updateProfileResponse: state.serviceReducer.response,
  updateProfileError: state.serviceReducer.error,
  getProfileRequestStatus: state.serviceReducer.requestStatus,
  getProfileResponse: state.serviceReducer.response,
  getProfileError: state.serviceReducer.error,

  acceptContestRequestStatus: state.serviceReducer.requestStatus,
  acceptContestResponse: state.serviceReducer.response as AcceptContestResponse,
  acceptContestError: state.serviceReducer.error,

  serviceKey: state.serviceReducer.serviceKey,
  listeners: state.serviceReducer.listeners
})

export default connect(mapStateToProps)(G_InvitationToJoin);