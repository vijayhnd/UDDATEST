import React from "react";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, TouchableWithoutFeedback, TouchableOpacity,Share, Image, FlatList, ImageBackground, AsyncStorage,Modal,ScrollView,Dimensions} from "react-native";
import styles from './styles';
import { SafeAreaView } from 'react-navigation';
import {AppEventsLogger} from 'react-native-fbsdk'; 
import Container from '../../../../Components/Container';
import BigButton from '../../../../Components/Button/BigButton';
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import AlertUtil from "../../../../Util/AlertUtil";
import Application from "../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ProgressLoader from 'rn-progress-loader';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { UDDAError } from "../../../../Entities";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import { Dialog } from 'react-native-simple-dialogs';
import moment from 'moment';
import SubscribeContestRequest from "../../../../Services/Contest/SubscribeContestRequest";
import SubscribeContestResponseParser from "../../../../Services/Contest/SubscribeContestResponseParser";
import SubscribeContestResponse from "../../../../Services/Contest/SubscribeContestResponse";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI';
import ReferralService from "../../../../Services/Referral/ReferralService";
import Messgae from "../../../../Services/Core/Messages"
import Message from "../../../../Services/Core/Messages";
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";
import DetailComponent from "../../../../Components/CustomComponents/Free2Play/Freetoplaydetail";
import Icons from "react-native-vector-icons/FontAwesome";
import Iconsm from 'react-native-vector-icons/MaterialIcons';
// import CheckBox from 'react-native-checkbox';
import HTML from 'react-native-render-html';
import ToggleSwitch from 'toggle-switch-react-native'
import * as RNLocalize from "react-native-localize";
const CleverTap = require('clevertap-react-native');
const deviceTimeZone = RNLocalize.getTimeZone();
interface G_UddaContestsProps extends AppValidationComponentProps {

    getProfileRequestStatus?: ServiceRequestStatus
    getProfileResponse?: GetProfileResponse
    getProfileError?: UDDAError
    serviceKey?: string
    listeners?: any
    subscribeContestRequestStatus?: ServiceRequestStatus
    subscribeContestResponse?: SubscribeContestResponse
    subscribeContestError?: UDDAError
}

interface ProflieViewState extends AppValidationComponentState {
    contentInsetBottom?: any
    dialogVisible: boolean,
    OrderSummaryDialog: boolean,
    SubscribedContests: any,
    UddaContests: any,
    JoinNowSelected: any,
    loader: any,
    SelectedContest: any,
    ContestDialog: any,
    ContestStartDate: any,
    DisplayDialogueStartDate: any,
    Dialog: boolean,
    guestUserDialog: boolean;
    userStatusDialog: any;
    imagezoom:any;
    OpenPlaySwitchAccepted:any;
    private_contest_array:any;
    AcceptedContests:any;
    Share_Show_Msg: any;
    MessageUrl: any;
    MessageString: any;
    CreatedContest:any;
    shareDialog:any;
    privateoverlay:any;
    acceptmorearchive:any;
    createmorearchive:any;
    freetoplay:any;
    freetoplaydata:any;
    contestdetail:any;
    contestdetailid:any;
    termscondition:any;
    termsconditiondata:any;
    termscheck:any;
    callcontestswitch:any;
    availabeldata:any;
    contest_history:any;
    contest_historydata:any;
    join_type:any;
    private_history:any;
    private_history_show:any;
}

enum ProfileScreenComponents {
    FirstNameInput = 1,
    LastNameInput,
    EmailInput,
    MobileInput
}

const bottom_initial = 0;

export class G_UddaContests extends AppValidationComponent<G_UddaContestsProps, ProflieViewState>
    implements ISubheaderListener, MenuIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private UserId = Application.sharedApplication().user!.id;
    public referralservice = new ReferralService();
    private serviceRequestInProgress = false

    constructor(props: G_UddaContestsProps) {
        super(props);
        this.state = {
            contentInsetBottom: bottom_initial,
            dialogVisible: false,
            OrderSummaryDialog: false,
            SubscribedContests: '',
            UddaContests: '',
            JoinNowSelected: '',
            Dialog: false,
            loader: false,
            ContestDialog: false,
            SelectedContest: '',
            ContestStartDate: '',
            DisplayDialogueStartDate: '',
            guestUserDialog: false,
            userStatusDialog:false,
            imagezoom:false,
            OpenPlaySwitchAccepted:false,
            private_contest_array:[],
            AcceptedContests:[],
            Share_Show_Msg: '',
            MessageUrl: '',
            MessageString: '',
            CreatedContest:'A',
            shareDialog:false,
            privateoverlay:false,
            freetoplay:false,
            contestdetail:false,
            contestdetailid:'',
            freetoplaydata:[],
            termscondition:false,
            termscheck:false,
            callcontestswitch:'A',
            termsconditiondata:'',
            acceptmorearchive:'',
            createmorearchive:'',
            availabeldata:[],
            contest_history:false,
            contest_historydata:[],
            join_type:'',
            private_history:[],
            private_history_show:false,
        }
    }

    async saveoverlay(){
        try {
          await AsyncStorage.setItem('uddacontestoverlay', 'true');
          this.setState({imagezoom:false})
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }
      async saveprivateoverlay(){
        try {
          await AsyncStorage.setItem('privatecontestoverlay', 'true');
          this.setState({privateoverlay:false})
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }
      async closeprivatecurrent(){
        
        this.setState({privateoverlay:false})
        try {
          await AsyncStorage.setItem('privatecontestoverlaycurrent', 'true');
         
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }
      async closecurrent(){
        
        this.setState({imagezoom:false})
        try {
          await AsyncStorage.setItem('uddacontestoverlaycurrent', 'true');
         
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }
   async componentDidMount() {
    //    console.log('ashish props data :- ',this.props.navigation.state.params)
    //    console.log('ashish props data :- ',this.props.navigation.state.params.params.bet_id)
       if(this.props.navigation.state.params)
       {
        if(this.props.navigation.state.params.params.bet_id=='free')
          {
            this.setState({freetoplay:true})
          }else if(this.props.navigation.state.params.params.bet_id=='created_private_contest')
          {
              this.setState({CreatedContest : 'C'})
            this.setState({OpenPlaySwitchAccepted:true})
          }else if(this.props.navigation.state.params.params.bet_id=='accepted_private_contest')
          {
            this.setState({CreatedContest : 'A'})
            this.setState({OpenPlaySwitchAccepted:true})
          }else{
            this.setState({OpenPlaySwitchAccepted:true})
          }

           console.log('true data')
       }else{
        console.log('false data')
    }
        let userId = '';
        let current = '';
        let privateuserId = '';
        let privatecurrent = '';
        try {
            current = await AsyncStorage.getItem('uddacontestoverlaycurrent');
          userId = await AsyncStorage.getItem('uddacontestoverlay');
          privatecurrent = await AsyncStorage.getItem('privatecontestoverlaycurrent');
          privateuserId = await AsyncStorage.getItem('privatecontestoverlay');
          
          console.log('overlay response',userId)
var that = this;
          if(userId == 'true')
          {
              setTimeout(function(){
                that.setState({imagezoom:false})},2000)
          }else{
            if(current == 'true')
            { setTimeout(function(){
                 that.setState({imagezoom:false})
               },3000)
             }else{
                 setTimeout(function(){
                     that.setState({imagezoom:true})
                   },3000)
             }}

             if(privateuserId == 'true')
             {
                 setTimeout(function(){
                   that.setState({privateoverlay:false})},2000)
             }else{
               if(privatecurrent == 'true')
               { setTimeout(function(){
                    that.setState({privateoverlay:false})
                  },3000)
                }else{
                    setTimeout(function(){
                        that.setState({privateoverlay:true})
                      },3000)
                }}
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
        this.callMethod();
        this.callFreetoplayMethod();
        this.callMethod1('c');
        this.callAcceptedContest('c');
        this.getProfile();
        this.callPrivateHistory()
    }



    // -------------------------------------------------- API Calling ------------------------------------------------------
    callMethod1(value:any) {
        
        this.setState({ loader: true }); 
        this.setState({ createmorearchive: '' }); 
        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_private_contest_of_user/'+value, {
        // fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/Custom_SquareGaming/get_private_contest_of_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken,'timezone':deviceTimeZone
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false }); 
                console.log('get_private_contest_of_user ' + JSON.stringify(responseJson));
                if ( responseJson.message == 'success') {
                    this.setState({ createmorearchive: responseJson.data.more_archive });
                    this.setState({ private_contest_array: responseJson.data.private_contest_array });
                }
                else {
                    this.setState({ private_contest_array: [] });
                }
                if (responseJson.message == "Access Expired.") {
                     // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                this.setState({ loader: false }); 
                AlertUtil.show("Error " + JSON.stringify(error));
                console.log(error);
            }) 
    }

    callAcceptedContest(value:any) {
        this.setState({loader:true});
        this.setState({acceptmorearchive:''});

        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_accepted_private_contest/'+value, {
        // fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/Custom_SquareGaming/get_accepted_private_contest', {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken,'timezone':deviceTimeZone
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({loader:false})
               console.log('callAcceptedContest ' + JSON.stringify(responseJson));
                if ( responseJson.message == 'success') {
                    this.setState({ acceptmorearchive: responseJson.more_archive });
                    this.setState({ AcceptedContests: responseJson.data.accepted_private_contest });
                }
                else {
                    this.setState({ AcceptedContests: [] });

                }
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                AlertUtil.show("Error " + JSON.stringify(error));
                console.log(error);
            }) 
    }


    gotDetailsScreen(item: any) {
        AsyncStorage.multiSet([
            ["Selected_contest", item.private_contest_id]
        ])
        RouterBuilder.replaceRouteTo(AppScreens.G_PrivateContestUserView, this.props)
    }

    gotocontestDashboard1(selected_item: any) {
        AsyncStorage.multiSet([
            ["league_id", selected_item.league_id],
            ["contest_id", selected_item.private_contest_id],
            ["private_contest_id", selected_item.private_contest_id],
            ["from_private_contest", "1"],
            ["contest_type", 'private_contest'],
            ["contest_version", selected_item.version_number]
        ])
        // RouterBuilder.replaceRouteTo(AppScreens.G_ContestDashboardView, this.props);
        //this.props.navigation!.push(AppScreens.G_ContestDashboardView);
   
    if(selected_item.version_number>2.7)
    {
        this.props.navigation!.push(AppScreens.G_FtpContestDashboard);
    }else{
        this.props.navigation!.push(AppScreens.G_ContestDashboardView);
    }
    }


    gotoSquarecontestDashboard(selected_item: any) {
        console.log('square id ashish',selected_item.encryptor_square_id)
        // AsyncStorage.multiSet([
        //     ["league_id", selected_item.league_id],
        //     ["contest_id", selected_item.private_contest_id],
        //     ["private_contest_id", selected_item.private_contest_id],
        //     ["from_private_contest", "1"],
        // ])
      //  RouterBuilder.replaceRouteTo(AppScreens.G_ContestDashboardView, {bet_id:selected_item});
      this.props.navigation!.push(AppScreens.G_ContestviewSquare,{params:{bet_id:selected_item.encryptor_square_id}})
    }

    settleCustomPool(item: any, result_status:any) {
        this.props.navigation!.push(AppScreens.G_SettlePoolInfoView, { item: item, result_status: result_status});
    }
    aggreeDisagrePage(item: any,result_status:any) {
       
            this.props.navigation!.push(AppScreens.G_AgreeDisagreeInfoView, { item: item, result_status: result_status })
    
      
    }


    SharePrivateContest(item: any) {

        var MessageString: any;
        var ShowString: any;
        var url: any;

        url = "http://bet.udda.com/index.php?t=contestbetnew&i=" + item.encryptor_private_contest_id;

        MessageString = "You have been invited to a private contest through UDDA by " + this.Username + ". Open Link : " + url;


        ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
            You have been invited to a private contest through UDDA by <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {this.Username} </Text>
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

    CreatedContestMethode(C_Type: any) {

        this.setState({ CreatedContest: C_Type });
        if(C_Type=='A'){
            if(UrlService.isLiveApp == '1'){
            this.referralservice.logEvent('AcceptedContest_Click', {});
            AppEventsLogger.logEvent('AcceptedContest_Click');
            CleverTap.recordEvent('AcceptedContest_Click');
            }
        }else{
            if(UrlService.isLiveApp == '1'){
            this.referralservice.logEvent('CreatedContest_Click', {});
            AppEventsLogger.logEvent('CreatedContest_Click');
            CleverTap.recordEvent('CreatedContest_Click');
            }
        }

    }
    loginButtonPressed() {
        this.setState({ guestUserDialog: false });
        // this.props.navigation!.navigate(AppScreens.G_LocationConfirmation);
        // this.props.navigation!.navigate(AppScreens.G_LoginPage,this.props);
        RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
    }

    closeModal() {
        this.setState({ guestUserDialog: !this.state.guestUserDialog });
      }

      goinfo() {
        this.props.navigation!.navigate(AppScreens.G_InfochartView, this.props)
      }
    componentWillReceiveProps(nextProps: G_UddaContestsProps) {
        if (nextProps.listeners!.includes(this.constructor.name)) {
            if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
                switch (nextProps.requestStatus) {
                    case ServiceRequestStatus.FinishedWithSuccess:
                        this.serviceRequestInProgress = false
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
            else if (nextProps.serviceKey === ServiceKeys.SubscribeContestName) {
                switch (nextProps.requestStatus) {
                    case ServiceRequestStatus.FinishedWithSuccess:
                        console.log("subscribeContestResponse " + JSON.stringify(nextProps.subscribeContestResponse));
                        var response: any = nextProps.subscribeContestResponse!.response;
                        console.log("response " + JSON.stringify(response.message));
                        if (response.message == "Contest subscribe successfully..!") {
                            AlertUtil.show("Contest Join successfully.");
                            // AlertUtil.showSingleActionMessage("Contest Join successfully." , function () {
                            //     this.callMethod();
                            // this.callFreetoplayMethod();
                            // this.callMethod1('c');
                            // this.callAcceptedContest('c');
                            // this.getProfile();
                            
                            // });
                            
                            this.callMethod();
                            this.callFreetoplayMethod();
                            this.callMethod1('c');
                            this.callAcceptedContest('c');
                            this.getProfile();
                            this.callPrivateHistory();
                            
                        }
                        else {
                            //garima
                            var errorMsg = response.message;
                            //console.log("garima" +errorMsg);
                            AlertUtil.show(errorMsg);
                        }
                        this.serviceRequestInProgress = false;
                        var serviceAction = new ServiceAction()
                        nextProps.dispatch!(serviceAction.reset())
                        break
                    case ServiceRequestStatus.FinishedWithError:
                        this.serviceRequestInProgress = false;
                        this.setState({ Dialog: false });
                        var errorMessage = nextProps.error!.message;
                        AlertUtil.show(errorMessage)
                        var serviceAction = new ServiceAction()
                        nextProps.dispatch!(serviceAction.reset())
                        break
                    case ServiceRequestStatus.Started:
                    case ServiceRequestStatus.InProgress:
                        this.serviceRequestInProgress = true;
                        break
                }

            }
        }
    }


    // -------------------------------------------------- API Calling ------------------------------------------------------
    callMethod() {
        this.setState({ loader: true });

        //fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/getFreetoPlayContests', {
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/getUddaContests', {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken,
                'timezone':deviceTimeZone
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                } else {
                  //  console.log('Udda Contest Data ' + JSON.stringify(responseJson));
                    if (responseJson.data != []) {
                        // responseJson.data.UddaContests.map((item)=>{
                        //     if(item.ContestType=='Free 2 Play')
                        //     {
                        //         this.state.freetoplaydata.push(item)
                        //     }else{
                        //         this.state.UddaContests.push(item)
                        //     }
                        // })


                            // this.setState({
                            //     freetoplaydata: responseJson.data.FreetoPlayContests.map((x: any) => ({
                            //         Id: x.Id,
                            //         ChallengeName:x.ChallengeName,
                            //         ContestStartDate:x.ContestStartDate,
                            //         ContestStartDate_timestamp:x.ContestStartDate_timestamp,
                            //         ContestEndDate : x.ContestEndDate,
                            //         ContestEndDate_timestamp: x.ContestEndDate_timestamp,
                            //         JoiningFee: x.JoiningFee,
                            //         league_id:x.league_id,
                            //         contest_status : x.contest_status,
                            //         contest_type : 'free2play'
                                 
                                
                            //     }))
                            //   });
                           
                        
                        this.setState({ UddaContests: responseJson.data.UddaContests });
                        this.setState({ SubscribedContests: responseJson.data.Subscribed });
                        this.setState({ availabeldata: responseJson.data.AvailableContests });
                        this.setState({ contest_historydata: responseJson.data.UddaOverContests });

                    }
                    else {

                    }
                }

            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }
    callFreetoplayMethod() {
        this.setState({ loader: true });
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/getFreetoPlayContests', {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken,'timezone':deviceTimeZone
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                } else {
                   // console.log('callFreetoplayMethod ' + JSON.stringify(responseJson));
                    if (responseJson.data != []) {
                        this.setState({
                            freetoplaydata: responseJson.data.FreetoPlayContests.map((x: any) => ({
                                Id: x.Id,
                                ChallengeName:x.ChallengeName,
                                ContestStartDate:x.ContestStartDate,
                                ContestStartDate_timestamp:x.ContestStartDate_timestamp,
                                ContestEndDate : x.ContestEndDate,
                                ContestEndDate_timestamp: x.ContestEndDate_timestamp,
                                JoiningFee: x.JoiningFee,
                                league_id:x.league_id,
                                contest_status : x.contest_status,
                                contest_type : 'free2play'
                             
                            
                            }))
                          });
                       
                        // this.setState({ freetoplaydata: responseJson.data.FreetoPlayContests });
                       // this.setState({ SubscribedContests: responseJson.data.Subscribed });

                    }
                    else {

                    }
                    console.log('callFreetoplayMethod state ' , this.state.freetoplaydata);
                }

            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }


    callPrivateHistory() {
        this.setState({ loader: true });
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/ApiGaming/get_private_contest_history', {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken,'timezone':deviceTimeZone
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                } else {
                    console.log('call private history  : ' + JSON.stringify(responseJson));
                    if (responseJson.error == '0') {
                     if(typeof responseJson.data.private_contest_array!='undefined'){
                        this.setState({private_history:responseJson.data.private_contest_array});
                     }
                        
                        // this.setState({
                        //     freetoplaydata: responseJson.data.FreetoPlayContests.map((x: any) => ({
                        //         Id: x.Id,
                        //         ChallengeName:x.ChallengeName,
                        //         ContestStartDate:x.ContestStartDate,
                        //         ContestStartDate_timestamp:x.ContestStartDate_timestamp,
                        //         ContestEndDate : x.ContestEndDate,
                        //         ContestEndDate_timestamp: x.ContestEndDate_timestamp,
                        //         JoiningFee: x.JoiningFee,
                        //         league_id:x.league_id,
                        //         contest_status : x.contest_status,
                        //         contest_type : 'free2play'
                             
                            
                        //     }))
                        //   });
                       
                        // this.setState({ freetoplaydata: responseJson.data.FreetoPlayContests });
                       // this.setState({ SubscribedContests: responseJson.data.Subscribed });

                    }
                    else {

                    }
                    console.log('callFreetoplayMethod state ' , this.state.freetoplaydata);
                }

            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }
    callTermsConditionMethod(itemData) {

        // var params: any = {
        //     'contest_id': this.state.SelectedContest.Id,
        //       };
        //       var formData = new FormData();

        //       for (var k in params) {
        //         formData.append(k, params[k]);
        //       }
        // fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/subscribe_free_to_play_contest', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       'authorisation': this.authorisationToken
        //     },
        //     body: formData,

            
        this.setState({ termscheck: false });
        this.setState({ loader: true });
           var params: any = {
            'contest_id': itemData.Id,
              };
              var formData = new FormData();

              for (var k in params) {
                formData.append(k, params[k]);
              }
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/free_to_play_contest_terms', {
       // fetch('http://uddadev.triazinesoft.com/index.php/v2_5/apiGaming/free_to_play_contest_terms', {
   
            method: 'POST',
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'authorisation': this.authorisationToken,'timezone':deviceTimeZone
                },
                body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                } else {
                    console.log('callTermsConditionMethod ' + JSON.stringify(responseJson));
                    if (responseJson.data != '') {
                        const regex = /(<([^>]+)>)/ig;
                        const result = responseJson.data.replace(regex, '');
                        console.log('remove html tags ' + result);
                        this.setState({ termsconditiondata: responseJson.data });
                        this.setState({ termscondition: true });

                    }
                    else {

                    }
                }

            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }
    callTermsConditionMethod1() {

        this.setState({ termscheck: false });
        this.setState({ loader: true });
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/guestUser/terms_and_condition', {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken,'timezone':deviceTimeZone
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                } else {
                    console.log('callTermsConditionMethod ' + JSON.stringify(responseJson));
                    if (responseJson.data != '') {
                        const regex = /(<([^>]+)>)/ig;
                        const result = responseJson.data.replace(regex, '');
                        console.log('remove html tags ' + result);
                        this.setState({ termsconditiondata: responseJson.data });
                        this.setState({ termscondition: true });

                    }
                    else {

                    }
                }

            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }
    joinContestAPIcalled(item: any) {
        
        this.setState({ termscondition: false });
        this.setState({ termscheck: false });
        this.setState({ Dialog: false });
        if(this.state.SelectedContest.contest_type == "free2play")
        {
            console.log('hello data',this.state.SelectedContest)
            this.joinFreetoplayContest();
        }else{


        var sub_contestRequset = new SubscribeContestRequest(
            item.Id
        )
        var serviceAction = new ServiceAction()
        var responseParser = new SubscribeContestResponseParser()
        this.props.dispatch!(serviceAction.request(ServiceType.Contest,
            ServiceKeys.SubscribeContestName,
            sub_contestRequset,
            [this.constructor.name],
            responseParser))
        }
        


    }
    joinContestAPIcalled_new(item: any) {
        
        this.setState({ termscondition: false });
        this.setState({ termscheck: false });
        this.setState({ Dialog: false });
        if(this.state.SelectedContest.contest_type == "free2play")
        {
            console.log('hello data',this.state.SelectedContest)
            this.joinFreetoplayContest();
        }else{


        var sub_contestRequset = new SubscribeContestRequest(
            item.Id
        )
        var serviceAction = new ServiceAction()
        var responseParser = new SubscribeContestResponseParser()
        this.props.dispatch!(serviceAction.request(ServiceType.Contest,
            ServiceKeys.SubscribeContestName,
            sub_contestRequset,
            [this.constructor.name],
            responseParser))
        }
        


    }
    joinFreetoplayContest() {
        this.setState({ loader: true });
        var params: any = {
            'contest_id': this.state.SelectedContest.Id,
              };
              var formData = new FormData();

              for (var k in params) {
                formData.append(k, params[k]);
              }
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/subscribe_free_to_play_contest', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              'authorisation': this.authorisationToken,'timezone':deviceTimeZone
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                var that = this;
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                    that.setState({ loader: false });
                    
                } else {
                    if(responseJson.error == 1)
                        {
                            AlertUtil.showSingleActionMessage(responseJson.message,function(){that.setState({ loader: false });})
                        }
                        else{
             that.setState({ loader: false });
                       
                    console.log('callFreetoplayMethod subscribed ' + JSON.stringify(responseJson));
                    this.setState({freetoplay:false})
                    this.setState({callcontestswitch:'A'})
                    this.getProfile()
                    this.callMethod();
                    this.callPrivateHistory();
                    this.callFreetoplayMethod();
                    this.callMethod1('c');
                    this.callAcceptedContest('c');
                        }
                   
                }

            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }
    getProfile() {
        var profileRequest = new GetProfileRequest()
        var serviceAction = new ServiceAction()
        var responseParser = new GetProfileResponseParser()
        this.props.dispatch!(serviceAction.request(ServiceType.User,
            ServiceKeys.GetProfileServiceName,
            profileRequest,
            [this.constructor.name],
            responseParser))
    }

    // -------------------------------------------------- Methods ------------------------------------------------------


    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {
       // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
	   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
    }


    accountNameTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_ProfileView, this.props)
    }

    openPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }

    checkUserStatus(betName: any) {
        var that = this;
        console.log(Application.sharedApplication().user!.profile.level_array.restricted_bets);
        //if( Application.sharedApplication().user.level_array.restricted_bets)
        var status = true;
        for (let i = 0; i < Application.sharedApplication().user!.profile.level_array.restricted_bets.length; i++) {
            if (Application.sharedApplication().user!.profile.level_array.restricted_bets[i].type == betName) {
                status = false;
                //setTimeout(function(){ that.setState({ userStatusDialog: true });},500)
                that.setState({ userStatusDialog: true });
            }

        }


        return status;
    }

// goToInappPage() {
//     this.setState({ userStatusDialog: false });

//     // this.props.navigation!.navigate(AppScreens.G_LoginPage);

//     this.props.navigation!.navigate(AppScreens.G_InAPPPurchaseViewIOS);
//   }
  goToInappPage() {
    this.setState({ userStatusDialog: false });

    // goToInappPage() {
    //     this.setState({ userStatusDialog: false });

   // this.props.navigation!.navigate(AppScreens.G_InAppPurchaseUpdateIOS);
    this.props.navigation!.replace(AppScreens.G_InAPPPurchaseViewIOS,{params:{callFrom:'userLevel'}});
  }
    gotoCreatePrivateContest() {
       console.log('rrr',this.referralservice)
       if(UrlService.isLiveApp == '1'){
        this.referralservice.logEvent('MoneylineBet_Click', {});
        AppEventsLogger.logEvent('MoneylineBet_Click');
        CleverTap.recordEvent('MoneylineBet_Click');
       }
        if (Application.sharedApplication().user!.profile.userType == 'Guest') {
            this.setState({ guestUserDialog: true });
        } else {
            var staus = this.checkUserStatus("private_contest")
            if (staus) {
                RouterBuilder.replaceRouteTo(AppScreens.G_PrivateContest, this.props);
            }
        }


    }

    gotoMyPrivateContest() {

       // RouterBuilder.replaceRouteTo(AppScreens.G_YourPrivateContest, this.props);

    }


    availableBalanceTapped() {
    }

    gotocontestDashboard(selected_item: any) {
        console.log("selected_item " + JSON.stringify(selected_item));
        var new_ContestStartTimestamp = selected_item.ContestStartDate_timestamp * 1000;
        var new_ContestStartDate = moment(new_ContestStartTimestamp).format('YYYY-MM-DD');

        console.log("new_ContestStartDate " + JSON.stringify(new_ContestStartDate));


        var new_ContestEndTimestamp = selected_item.ContestEndDate_timestamp * 1000;
        var new_ContestEndDate = moment(new_ContestEndTimestamp).format('YYYY-MM-DD');

        var todayDate = moment(new Date()).format('YYYY-MM-DD');
        console.log("todayDate " + JSON.stringify(todayDate));
        this.setState({ DisplayDialogueStartDate: moment(new_ContestStartTimestamp).format('Do MMM YYYY') });


        //if (todayDate != selected_item.ContestStartDate) { // old condition
      /*   if (todayDate > selected_item.ContestEndDate ) {
            this.setState({ ContestDialog: true });
        } else { */
            AsyncStorage.multiSet([
                ["league_id", selected_item.league_id],
                ["contest_id", selected_item.Id],
                ["from_private_contest", "0"],
                ["contest_type", selected_item.join_type],
                ["contest_version", selected_item.version_number],
            ])
            // RouterBuilder.replaceRouteTo(AppScreens.G_ContestDashboardView, this.props);
            if(selected_item.version_number>2.7)
            {
                this.props.navigation!.push(AppScreens.G_FtpContestDashboard);
            }else{
                this.props.navigation!.push(AppScreens.G_ContestDashboardView);
            }
            //this.props.navigation!.push(AppScreens.G_FtpContestDashboard);
            // this.props.navigation!.push(AppScreens.G_ContestDashboardView);
            // this.props.navigation!.replace(AppScreens.G_ContestDashboardView,{ params: { contestid:selected_item.Id ,contesttype: selected_item.join_type } });
        //}

    }


    logoutButtonPressed() {
        Application.sharedApplication().logout()
        RouterBuilder.resetRouteTo(AppScreens.OnboardingStack, this.props)
    }

    ShowDialog(item: any, isShow: any) {
        if (Application.sharedApplication().user!.profile.userType == 'Guest') {
            this.setState({ guestUserDialog: true });
        } else {
var userlevelType =''
if(item.contest_type == "free2play")
{
    userlevelType = 'free_to_play_contest'
}
else{
    userlevelType = 'public_contest'
}
            var status = this.checkUserStatus(userlevelType);
            if (status) {
                var todayDate = moment(new Date()).format('YYYY-MM-DD');
                var new_ContestStartTimestamp = item.ContestStartDate_timestamp * 1000;
                this.setState({ DisplayDialogueStartDate: moment(new_ContestStartTimestamp).format('Do MMM YYYY') });
                if (todayDate > item.ContestStartDate){
                    this.setState({ ContestDialog: true });
                }else{
                    this.setState({ SelectedContest: item });
                    // if(item.contest_type == "free2play")
                    // {
                    //     this.callTermsConditionMethod(item);
                    // }else{
                        this.setState({ Dialog: isShow });
                    //}
                    
                    
                }

               
            }
            }
        }
    

    gotoPrivateContest() {
        this.props.navigation!.navigate(AppScreens.G_PrivateContest);

    }

    gotoBingoContest(value:any) {
        // alert('Bingo function!')
        var data={
            id:value.encryptor_bingo_id,
            name:value.creator,
            creator_index:value.creator_index,
            bingo_id:value.bingo_id,
        }
       this.props.navigation!.navigate(AppScreens.G_contestBingo, { bingo_data: data });

    }


    closeDetailModal() {
        this.setState({ contestdetail: !this.state.contestdetail });
      }

openDetailmodel(item:any,value:any){


    // console.log('private item : ',item)
    // console.log('private value : ',value)
    // return;
    if(value=='A')
    {
       // console.log('join type detail public_contest',item)
    this.setState({ join_type:'public_contest'});
    this.setState({ contestdetailid:item.Id});    
    this.setState({ contestdetail: !this.state.contestdetail });
    }else if(value=='P')
    {
       // console.log('join type detail public_contest',item)
    this.setState({ join_type:'private_contest'});
    this.setState({ contestdetailid:item.private_contest_id});    
    this.setState({ contestdetail: !this.state.contestdetail });
    }else{
        // console.log('join type detail',item)
        this.setState({ join_type:item.join_type});
        this.setState({ contestdetailid:item.Id});    
        this.setState({ contestdetail: !this.state.contestdetail });
    }
   
}
gotostandinglist(selected_item:any,value:any) {
    if(value=='P')
    {
        console.log('direct private gotostandinglist : ',selected_item)
        AsyncStorage.setItem('Standing_contest_id', selected_item.private_contest_id)
    AsyncStorage.setItem('Standing_Type', "1");
    AsyncStorage.setItem('contest_Type', 'private_contest');
    }else{
        console.log('direct public gotostandinglist : ',selected_item)
        AsyncStorage.setItem('Standing_contest_id', selected_item.Id)
    AsyncStorage.setItem('Standing_Type', "0");
    AsyncStorage.setItem('contest_Type', selected_item.join_type);
    }

// return;

// if(selected_item.)
    // AsyncStorage.setItem('Standing_contest_id', selected_item.Id)
    // AsyncStorage.setItem('Standing_Type', "0");
    // AsyncStorage.setItem('contest_Type', selected_item.join_type);

  //  console.log('Standing_contest_id :  '+this.state.contest_id+' Standing_Type : '+this.state.from_private_contest+' contest_Type : '+ this.state.contesttype)
    // this.props.navigation!.push(AppScreens.G_StandingList)
    if(selected_item.version_number>2.7)
            {
                this.props.navigation!.push(AppScreens.G_FtpCurrentStanding);
            }else{
                this.props.navigation!.push(AppScreens.G_StandingList);
            }
    //  RouterBuilder.replaceRouteTo(AppScreens.G_StandingList, this.props)
  }
    // -------------------------------------------------- Design Methods & Design ------------------------------------------------------
    render() {
        return (
            <Container title={'Udda Contests'}
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
                <ProgressLoader
                    visible={this.state.loader}
                    isModal={true} isHUD={true}
                    hudColor={"#68bcbc"}
                    color={"#FFFFFF"} />


<Modal visible={this.state.termscondition} transparent={false}>
<View style={{height:'80%', width:'100%',flex:1}}>
             <SafeAreaView forceInset={{bottom:'never'}}>
<View style={{height:'98%', width:'100%'}} >
    <View style={{height:'8%',justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor:'#68bcbc'}}>
    <Text style={{fontFamily: 'Montserrat-Bold', fontSize: hp(3.0),color:'white'}}>Terms & Condition</Text>
    </View>
        <View style={{height:'100%',padding:5}}>
       
            <View style={{height:'75%'}}>
            <ScrollView>
            <HTML emSize={2} html={this.state.termsconditiondata} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView> 
            </View>
            <View style={{height:'15%',width:'100%'}}>
           <View style={{marginTop:5,flexDirection:'row'}}>
           
           <View style={{width:'10%',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
           <ToggleSwitch
                isOn={this.state.termscheck}
                onColor="#69bbbb"
                offColor="#c3c3c3"
                //label="Accept"
                labelStyle={{ color: "#222",  fontFamily: 'Montserrat-Bold', fontSize: hp(2.1) }}
                size="small"
                onToggle={isOn =>this.setState({termscheck:isOn})}
                />
           </View>
           <View style={{width:'5%'}}></View>
           <View style={{width:'85%',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
           <Text style={{fontFamily: 'Montserrat-Bold', fontSize: hp(2.0),}}>I hereby agree that I have read and consent to be bound by these Official Rules:</Text>
               </View>
           {/* <CheckBox
  label='Accept'
  checked={this.state.termscheck}
  onChange={(checked) => this.setState({termscheck:!this.state.termscheck})}
/> */}
           </View>
<View style={{width:'100%',justifyContent:'center',alignItems:'center',alignContent:'center',flexDirection:'row',marginTop:10}}>

<View style={{width:'49%'}}>
<TouchableOpacity onPress={()=>{this.setState({termscondition:false})}} style={{width:'100%'}}>
    <View style={{width:'100%',justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'#68bcbc',height:40}}>
        <Text style={{fontFamily: 'Montserrat-Bold', fontSize: hp(2.0),color:'white'}}>CANCEL</Text>
    </View>
</TouchableOpacity>
</View>
<View style={{width:'2%'}}></View>
<View style={{width:'49%'}}>
<TouchableOpacity onPress={()=>{this.state.termscheck?this.joinContestAPIcalled_new(this.state.SelectedContest):AlertUtil.show('Please Accept Terms & Condition')}} style={{width:'100%'}}>
    <View style={{width:'100%',justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'#68bcbc',height:40}}>
        <Text style={{fontFamily: 'Montserrat-Bold', fontSize: hp(2.0),color:'white'}}>PROCEED</Text>
    </View>
</TouchableOpacity>
</View>
    </View>
            </View>
        </View>
           
</View>
</SafeAreaView>
</View>
</Modal>

{UrlService.OVERLAY==0?this.state.OpenPlaySwitchAccepted? this.state.CreatedContest == 'C'?<Modal visible={this.state.privateoverlay} transparent={true}>
         <View style={{height:'100%', width:'100%',flex:1}}>
             <SafeAreaView forceInset={{bottom:'never'}}>
         <ImageBackground source={require('../../../../images/your-private-bet-overlay1.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: '100%' }}>
                                  <View  style={{  position: 'absolute',  justifyContent: 'center', bottom: '8%' ,width:'100%',alignContent:'center',alignItems:'center'}}>
                                <View style={{width:'90%',justifyContent:'space-between',flexDirection:'row'}}>
                                <Text 
                                  style={{marginTop:15,fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), textDecorationLine:  'underline',color:'#68bcbc'}}
                                   onPress={()=>{this.saveprivateoverlay()}}
                                   >Don't show again</Text>

<TouchableWithoutFeedback  onPress={()=>this.closeprivatecurrent()}>
                       <Image source={require('../../../../images/close_overlay.png')}  style={{height:50,width:50 }}></Image>
                       </TouchableWithoutFeedback>

                                </View>
                                  </View>

                                </ImageBackground>
                                </SafeAreaView>
         </View>
          
        </Modal>:null:null:null}

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


                     {/* overlay ui start */}
               {UrlService.OVERLAY==0?this.state.OpenPlaySwitchAccepted?null:this.state.freetoplay?null: <Modal visible={this.state.imagezoom} transparent={true}>
<View style={{height:'100%', width:'100%',flex:1}}>
    <SafeAreaView  forceInset={{ bottom: 'never' }}>
         <ImageBackground source={require('../../../../images/udda-contest-updated-3_new.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: '100%' }}>
                                  <View  style={{  position: 'absolute',  justifyContent: 'center', bottom: '8%' ,width:'100%',alignContent:'center',alignItems:'center'}}>
                                <View style={{width:'90%',justifyContent:'space-between',flexDirection:'row'}}>
                                 <Text 
                                  style={{marginTop:15,fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), textDecorationLine:  'underline',color:'#68bcbc'}}
                                   onPress={()=>{this.saveoverlay()}}
                                   >Don't show again</Text>
                                   <TouchableWithoutFeedback  onPress={()=>this.closecurrent()}>
                       <Image source={require('../../../../images/close_overlay.png')}  style={{height:50,width:50 }}></Image>
                       </TouchableWithoutFeedback>

                                </View>
                                  </View>

                                </ImageBackground>
                                </SafeAreaView>
         </View>
          
        </Modal>:null}
                {/* overlay ui end */}

                <Dialog
                    visible={this.state.Dialog}
                    title=""
                    dialogStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
                    contentStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
                    onTouchOutside={() => this.setState({ Dialog: false })} >
                    <View style={styles.DialogMain}>

                        <TouchableOpacity onPress={() => { this.setState({ Dialog: false }) }}  >
                            <View style={[styles.CloseView,]}>
                                <Image source={require('../../../../images/close_icon.png')} style={{ height: 15, width: 15 }}></Image>
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.Text_style}>Would you like to join</Text>
                            <Text style={styles.Text_Style_NFL}>{this.state.SelectedContest.ChallengeName}</Text>

                            <View style={styles.Question_Container}>
                                <TouchableWithoutFeedback onPress={() => { this.joinContestAPIcalled_new(this.state.SelectedContest) }}>
                                    <View style={{ width: '45%', backgroundColor: '#68bcbc', padding: 10 }}>
                                        <Text style={styles.Yes_Text}>Yes</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.setState({ Dialog: false }) }}>
                                    <View style={{ backgroundColor: '#A3A3A3', width: '45%', padding: 10, marginLeft: 10 }}>
                                        <Text style={styles.No_Text}>No</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>


                        </View>
                    </View>
                </Dialog>



                {/* -------------------------------- Bet Placed user Status check Dialogue --------------------------------*/}




                <Dialog
                    visible={this.state.userStatusDialog}
                    title=""
                    onTouchOutside={() => this.setState({ userStatusDialog: false })} >

                    <View style={{ backgroundColor: "white" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '88%', alignItems: 'center', marginTop: '2%' }}>
                                <Image source={require('../../../../images/udda_logo_white.png')} style={{ width: wp(30), height: wp(7), margin: 10, alignSelf: 'center' }} resizeMode='contain' />
                            </View>

                        </View>
                        <View style={{ justifyContent: "center", padding: 15, alignItems: 'center', borderColor: '#cccccc', borderTopWidth: 1, margin: 3 }}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
                                You do not have enough UDDA bucks to access this feature. Please upgrade.

                  </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                            <View style={{ width: '46%' }}>
                                <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.setState({ userStatusDialog: false }) }} />
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ width: '46%' }}>
                                <BigButton title="Upgrade" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.goToInappPage() }} />
                            </View>
                        </View>
                    </View>
                </Dialog>


                {/* ------------------------ Contest Starts Dialog----------------------------- */}

                <Dialog
                    visible={this.state.ContestDialog}
                    title=""
                    onTouchOutside={() => this.setState({ ContestDialog: false })} >

                    <View style={{ backgroundColor: "white" }}>

                        <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.6), marginTop: 10, color: 'black', textAlign: 'center' }}>
                                {/* Contest will start on {this.state.DisplayDialogueStartDate}. Please visit on {this.state.DisplayDialogueStartDate} */}
                                Registration closed for this contest.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                            <View style={{ width: '90%' }}>
                                <BigButton title="OK" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.setState({ ContestDialog: false }) }} />
                            </View>
                        </View>
                    </View>
                </Dialog>


                <View style={[styles.mainContent]}>
                    {this.state.contest_history? <View style={{height:hp(7),width:'100%',backgroundColor:'white',flexDirection:'row',padding:10}}>
                        <View style={{justifyContent:'flex-start',alignContent:'flex-start',alignItems:'flex-start',width:'25%'}}>
                        <Iconsm  name="arrow-back"   size={30} color="black"  style={{ marginLeft: 2 }}
                         onPress={() => {RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props) }}
                        //  onPress={() => {this.setState({contest_history:false}) }}
                          />
                        </View>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'75%'}}>
                        <Text style={styles.NameStyle}>CONTEST HISTORY</Text>
                        </View>
                        
                    </View>:this.state.freetoplay?<View style={{height:hp(7),width:'100%',backgroundColor:'white',flexDirection:'row',padding:10}}>
                        <View style={{justifyContent:'flex-start',alignContent:'flex-start',alignItems:'flex-start',width:'25%'}}>
                        <Iconsm  name="arrow-back"   size={30} color="black"  style={{ marginLeft: 2 }}
                         onPress={() => {this.setState({freetoplay:false}) }} />
                        </View>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'75%'}}>
                        <Text style={styles.NameStyle}>FREE TO PLAY CONTEST</Text>
                        </View>
                        
                    </View>:this.state.private_history_show?<View style={{height:hp(7),width:'100%',backgroundColor:'white',flexDirection:'row',padding:10}}>
                        <View style={{justifyContent:'flex-start',alignContent:'flex-start',alignItems:'flex-start',width:'20%'}}>
                        <Iconsm  name="arrow-back"   size={30} color="black"  style={{ marginLeft: 2 }}
                         onPress={() => {this.setState({private_history_show:false}) }} />
                        </View>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'80%'}}>
                        <Text style={styles.NameStyle}>PRIVATE CONTEST HISTORY</Text>
                        </View>
                        
                    </View>:<View style={{height:hp(7),width:'100%',backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',padding:10}}>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={styles.NameStyle}>CONTESTS</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPlaySwitchAccepted == false ? 'black' : '#888888', textAlign: 'right'}}>Public</Text>
                                {/* <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPlaySwitchAccepted == false ? 'black' : '#888888', textAlign: 'right'}}>Contests</Text> */}
                            </View>
                            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <TouchableWithoutFeedback onPress={() => {
                               this.setState({OpenPlaySwitchAccepted:!this.state.OpenPlaySwitchAccepted,CreatedContest:'A'})
                           //this.gotoMyPrivateContest()
                             }}>
                                            <Image source={this.state.OpenPlaySwitchAccepted == true ? require('../../../../images/toggle_on_G.png') : require('../../../../images/toggle-off-button.png')}
                                                style={{ height: 20, width: 40 }}
                                                resizeMode="contain"></Image>
                                        </TouchableWithoutFeedback>
                            </View>
                            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPlaySwitchAccepted == true ? 'black' : '#888888', textAlign: 'left' }}>Private</Text>
                                {/* <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPlaySwitchAccepted == true ? 'black' : '#888888', textAlign: 'left' }}>Contests</Text> */}
                            </View>
                        </View>
                    </View>}
                    
                   {this.state.OpenPlaySwitchAccepted?<View >
                        <View style={{ width: '100%' }}>
                            <View style={{ width: '100%' ,justifyContent:'center',alignItems:'center'}}>

                             {this.state.private_history_show?null: <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => { this.CreatedContestMethode('A') }}
                                        style={{ width: '50%', backgroundColor: this.state.CreatedContest == 'A' ? '#68bcbc' : '#EEEEEE', padding: 10 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: this.state.CreatedContest == 'A' ? 'white' : '#999999',fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0) }}>Accepted Contests</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { this.CreatedContestMethode('C') }}
                                        style={{ width: '50%', backgroundColor: this.state.CreatedContest == 'C' ? '#68bcbc' : '#EEEEEE', padding: 10 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: this.state.CreatedContest == 'C' ? 'white' : '#999999',fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0) }}>Created Contests</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>}






                                {this.state.private_history_show?
                                    <View style={{ width: '95%',height:'100%' }}>
                                        {this.state.private_history.length > 0 ?
                                            <View>
                                                <FlatList
                                                    data={this.state.private_history}
                                                    extraData={this.state}
                                                    keyExtractor={(item: any, index: any) => index.toString()}
                                                    renderItem={({ item, index }: any) => {
                                                        var subindex = index;
                                                        var new_ContestStartTimestamp = item.contest_start_date_timestamp * 1000;
                                                      //garima  var new_ContestStartDate = moment(new_ContestStartTimestamp).subtract(1, 'days').format('Do MMM'); 
                                                        var new_ContestStartDate = moment(new_ContestStartTimestamp).format('Do MMM');
                                                        var a=[]
                                                        if(item.ttype == 'bingo')
                                                        {
                                                             a = item.join_fee.split('.')
                                                        // console.log('split contest rate',a)
                                                        }
 
                                                        return (
                                                            <View style={{ width: '100%',padding:10 }}>
                                                                <ImageBackground source={item.list_type=='created'?require('../../../../images/UddaContestsGreen.png'):require('../../../../images/UddaContestsYellow.png')}
                                                                    resizeMode="stretch"
                                                                    style={{ width: '100%', height: 60, marginTop: 10 }}>
                                                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                        <TouchableWithoutFeedback onPress={() => { item.version_number > 2.7 ?this.openDetailmodel(item,'P'):(item.ttype == 'square' || item.ttype == 'pool' || item.ttype == 'bingo')? null:this.gotDetailsScreen(item) }  }>
                                                                            <View style={{ width: '60%', height: 60, justifyContent: 'center', paddingLeft: 10, }}>
                                                                            <View style={{width:'100%',flexDirection:'row',alignContent:'center'}}>
                                                                                
                                                                                <Text style={styles.Challenge_Name_Text}>
                                                                                {item.ttype == 'square' ? item.game_name+' ' : item.ttype == 'pool' ? item.pool_name+' ':item.contest_name+' '}
                                                                                </Text>
                                                                                
                                                                                {item.version_number > 2.7 ?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,'P'):null}}>
                                                                                <View   style={[styles.table_title_info_container ]} >
                                                                                    <Text style={styles.table_title_info_text}> i </Text>
                                                                                    </View>
                                                                                    </TouchableOpacity>:null}
                                                                                
                                                                            </View>
                                                                                {/* <Text style={styles.Challenge_Name_Text}>
                                                                                    {item.ttype == 'square' ? item.game_name : item.ttype == 'pool' ? item.pool_name:item.contest_name}
                                                                                </Text> */}
                                                                                {item.list_type=='created'?null:<Text style={[styles.Challenge_Name_Text, { fontFamily: 'Montserrat-SemiBold', fontSize: 11 }]}>
                                                                                    by {item.creator}
                                                                                </Text>}
                                                                                {/*garima */}
                                                                                {item.ttype=='square'?<Text style={styles.Registration_Text}>
                                                                               { moment(item.game_start_timestamp * 1000).format('LT') +' '+ new Date(item.game_start_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.game_start_timestamp * 1000).toString().split(' ')[6].length - 2) +' '+ moment(item.game_start_timestamp * 1000).format('LL')}
                                                                                </Text> : item.ttype == 'pool' ? <Text style={styles.Registration_Text}>
                                                                                        {moment(item.expired_timestamp * 1000).format('LT') + ' ' + new Date(item.expired_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.expired_timestamp * 1000).toString().split(' ')[6].length - 2) + ' ' + moment(item.expired_timestamp * 1000).format('LL')}
                                                                                </Text>:item.ttype == 'bingo' ? <Text style={styles.Registration_Text}>
                                                                                        {moment(item.bingo_expired_timestamp * 1000).format('LT') + ' ' + new Date(item.bingo_expired_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.bingo_expired_timestamp * 1000).toString().split(' ')[6].length - 2) + ' ' + moment(item.bingo_expired_timestamp * 1000).format('LL')}
                                                                                </Text>:<Text style={styles.Registration_Text}>
                                                                                Registration closes on {item.contest_end_date}
                                                                            </Text>}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                        {item.list_type=='created'?<View style={{ width: '40%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                                       { item.ttype=='square'?<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                       <Image
                                                                                resizeMode="contain"
                                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                source={{ uri:item.sport_icon}}></Image>
                                                                            <Text style={styles.Joining_Text}> &nbsp;Football Squares</Text>                                                                            
                                                                        </View> : item.ttype == 'pool' ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <Image
                                                                                resizeMode="contain"
                                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                source={{ uri: item.sport_icon }}></Image>
                                                                            <Text style={styles.Joining_Text}>&nbsp;Custom Pool</Text>
                                                                        </View>:<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <Text style={styles.Joining_Text}>Joining Fee.</Text>
                                                                            <Image
                                                                                resizeMode="contain"
                                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                source={require('../../../../images/Buckscut.png')}></Image>
                                                                            {item.ttype == 'bingo' ?<Text style={styles.Joining_Price}>
                                                                                    {a[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.
                                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>{a[1]}</Text>
                                                                                </Text>:<Text style={styles.Joining_Price}>
                                                                                    {item.join_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.
                                                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>00</Text>
                                                                                </Text>}
                                                                        </View>}
                                                                        {(item.ttype == 'pool' && item.result_status == 'FINAL') ?
                                                                            <TouchableOpacity onPress={() => { item.ttype=='contest'?this.gotostandinglist(item,'P'):item.ttype == 'pool' ? this.settleCustomPool(item,1) : '' }}>
                                                                                <View style={{ backgroundColor: '#68bcbc', justifyContent: 'center' }}>
                                                                                    <Text style={styles.Join_Now_Text}>View</Text>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                            : <TouchableOpacity onPress={() => {item.ttype=='contest'?this.gotostandinglist(item,'P'):item.ttype == 'bingo' ?this.gotoBingoContest(item): item.ttype == 'square' ? this.gotoSquarecontestDashboard(item) : (item.ttype == 'pool' && item.result_status == '') ?this.settleCustomPool(item,0): this.gotocontestDashboard1(item) }}>
                                                                                <View style={{ backgroundColor: '#68bcbc', justifyContent: 'center' }}>
                                                                                    <Text style={styles.Join_Now_Text}>View</Text>
                                                                                </View>
                                                                            </TouchableOpacity>

                                                                        }
                                                                        
                                                                    </View>:<View style={{ width: '40%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                                            {item.ttype=='square'?<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <Image
                                                                                resizeMode="contain"
                                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                source={{ uri:item.sport_icon}}></Image>
                                                                                <Text style={styles.Joining_Text}>&nbsp;Football Squares</Text>                                                                      
                                                                            </View> : item.ttype == 'pool' ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                 <Image
                                                                                    resizeMode="contain"
                                                                                    style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                    source={{ uri: item.sport_icon }}></Image> 
                                                                                    <Text style={styles.Joining_Text}>&nbsp;Custom Pool</Text>
                                                                            </View> :
                                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                <Text style={styles.Joining_Text}>Joining Fee.</Text>
                                                                                <Image
                                                                                    resizeMode="contain"
                                                                                    style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                    source={require('../../../../images/Buckscut.png')}></Image>
                                                                                {item.ttype == 'bingo' ?<Text style={styles.Joining_Price}>
                                                                                    {a[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.
                                                        <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>{a[1]}</Text>
                                                                                </Text>:<Text style={styles.Joining_Price}>
                                                                                    {item.join_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.
                                                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>00</Text>
                                                                                </Text>}
                                                                            </View>}
                                                                            {(item.ttype == 'pool' && item.result_status=='FINAL')?
                                                                                <TouchableOpacity onPress={() => { item.ttype=='contest'?this.gotostandinglist(item,'P'):item.ttype == 'pool' && item.result_status == 'FINAL' && item.action != null ? this.settleCustomPool(item, 1) : this.aggreeDisagrePage(item,1)  }}>
                                                                                    <View style={{ backgroundColor: '#ff9900', justifyContent: 'center' }}>
                                                                                    <Text style={styles.Join_Now_Text}>View</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                                : <TouchableOpacity onPress={() => {item.ttype=='contest'?this.gotostandinglist(item,'P'):item.ttype == 'bingo' ? this.gotoBingoContest(item):(item.ttype == 'pool' && item.result_status == '') ? this.aggreeDisagrePage(item, 0):(item.ttype == 'square' ? this.gotoSquarecontestDashboard(item) : this.gotocontestDashboard1(item) )}}>
                                                                                    <View style={{ backgroundColor: '#ff9900', justifyContent: 'center' }}>
                                                                                        <Text style={styles.Join_Now_Text}>View</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>

                                                                            }
                                                                            
                                                                        </View>}
                                                                    </View>
                                                                </ImageBackground>
                                                                {/* {this.state.acceptmorearchive == '0'?null: index == parseInt(this.state.AcceptedContests.length) - 1 ?<View style={{padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}><Text onPress={()=>{
        this.callAcceptedContest('a');
        }} style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#f26522',textDecorationLine:'underline',textDecorationColor:'#f26522'}]}>More</Text></View>:null} */}
                                                            </View>
                                                        )
                                                    }} />
                                            </View>
                                            :
                                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15,height:'100%' }}>
                                                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 20,textAlign:'center'  }}>No contests available</Text>
                                            </View>
                                        }

                                    </View>
                                    : null}











                                {this.state.private_history_show?null:this.state.CreatedContest == 'A' ?
                                    <View style={{ width: '95%',height:'86%' }}>
                                        {this.state.AcceptedContests.length > 0 ?
                                            <View>
                                                <FlatList
                                                    data={this.state.AcceptedContests}
                                                    extraData={this.state}
                                                    keyExtractor={(item: any, index: any) => index.toString()}
                                                    renderItem={({ item, index }: any) => {
                                                        var subindex = index;
                                                        var new_ContestStartTimestamp = item.contest_start_date_timestamp * 1000;
                                                      //garima  var new_ContestStartDate = moment(new_ContestStartTimestamp).subtract(1, 'days').format('Do MMM'); 
                                                        var new_ContestStartDate = moment(new_ContestStartTimestamp).format('Do MMM');
                                                        var a=[]
                                                        if(item.ttype == 'bingo')
                                                        {
                                                             a = item.join_fee.split('.')
                                                        // console.log('split contest rate',a)
                                                        }
 
                                                        return (
                                                            <View style={{ width: '100%',padding:10 }}>
                                                                <ImageBackground source={require('../../../../images/UddaContestsYellow.png')}
                                                                    resizeMode="stretch"
                                                                    style={{ width: '100%', height: item.ttype == 'contest'?item.is_live_contest == '1' ? 84 :66:66, marginTop: 10 }}>
                                                                        <View style={{ width: '100%'}}>
                                                                        {item.ttype == 'contest'?item.is_live_contest == '1' && <Text style={[{fontSize: hp(1.5),fontFamily: 'Montserrat-Bold',color:'#f26522',textAlign:'center',padding:0}]}>Live</Text>:null}
                                                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                        <TouchableWithoutFeedback onPress={() => { item.version_number > 2.7 ?this.openDetailmodel(item,'P'):(item.ttype == 'square' || item.ttype == 'pool' || item.ttype == 'bingo')? null:this.gotDetailsScreen(item) }  }>
                                                                            <View style={{ width: '60%', height: 60, justifyContent: 'center', paddingLeft: 10, }}>
                                                                            <View style={{maxWidth:'90%',flexDirection:'row',alignContent:'center'}}>
                                                                                
                                                                                <Text style={styles.Challenge_Name_Text} numberOfLines={2} ellipsizeMode={'tail'}>
                                                                                {item.ttype == 'square' ? item.game_name+' ' : item.ttype == 'pool' ? item.pool_name+' ':item.contest_name+' '}
                                                                                </Text>
                                                                                
                                                                                {item.version_number > 2.7 ?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,'P'):null}}>
                                                                                <View   style={[styles.table_title_info_container ]} >
                                                                                    <Text style={styles.table_title_info_text}> i </Text>
                                                                                    </View>
                                                                                    </TouchableOpacity>:null}
                                                                                
                                                                            </View>
                                                                                {/* <Text style={styles.Challenge_Name_Text}>
                                                                                    {item.ttype == 'square' ? item.game_name : item.ttype == 'pool' ? item.pool_name:item.contest_name}
                                                                                </Text> */}
                                                                                <Text style={[styles.Challenge_Name_Text, { fontFamily: 'Montserrat-SemiBold', fontSize: 11 }]}>
                                                                                    by {item.creator}
                                                                                </Text>
                                                                                {/*garima */}
                                                                                {item.ttype=='square'?<Text style={[styles.Registration_Text,{fontSize:hp(1.5)}]}>
                                                                               { moment(item.game_start_timestamp * 1000).format('LT') +' '+ new Date(item.game_start_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.game_start_timestamp * 1000).toString().split(' ')[6].length - 2) +' '+ moment(item.game_start_timestamp * 1000).format('LL')}
                                                                                </Text> : item.ttype == 'pool' ? <Text style={[styles.Registration_Text,{fontSize:hp(1.5)}]}>
                                                                                        {moment(item.expired_timestamp * 1000).format('LT') + ' ' + new Date(item.expired_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.expired_timestamp * 1000).toString().split(' ')[6].length - 2) + ' ' + moment(item.expired_timestamp * 1000).format('LL')}
                                                                                </Text>:item.ttype == 'bingo' ? <Text style={[styles.Registration_Text,{fontSize:hp(1.5)}]}>
                                                                                        {moment(item.bingo_expired_timestamp * 1000).format('LT') + ' ' + new Date(item.bingo_expired_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.bingo_expired_timestamp * 1000).toString().split(' ')[6].length - 2) + ' ' + moment(item.bingo_expired_timestamp * 1000).format('LL')}
                                                                                </Text>:<Text style={[styles.Registration_Text,{fontSize:hp(1.5)}]}>
                                                                                Registration closes on {item.contest_end_date}
                                                                            </Text>}
                                                                            </View>
                                                                        </TouchableWithoutFeedback>
                                                                        <View style={{ width: '40%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                                            {item.ttype=='square'?<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <Image
                                                                                resizeMode="contain"
                                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                source={{ uri:item.sport_icon}}></Image>
                                                                                <Text style={styles.Joining_Text}>&nbsp;Football Squares</Text>                                                                      
                                                                            </View> : item.ttype == 'pool' ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                 <Image
                                                                                    resizeMode="contain"
                                                                                    style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                    source={{ uri: item.sport_icon }}></Image> 
                                                                                    <Text style={styles.Joining_Text}>&nbsp;Custom Pool</Text>
                                                                            </View> :
                                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                <Text style={styles.Joining_Text}>Joining Fee.</Text>
                                                                                <Image
                                                                                    resizeMode="contain"
                                                                                    style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                    source={require('../../../../images/Buckscut.png')}></Image>
                                                                                {item.ttype == 'bingo' ?<Text style={styles.Joining_Price}>
                                                                                    {a[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.
                                                        <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>{a[1]}</Text>
                                                                                </Text>:<Text style={styles.Joining_Price}>
                                                                                    {item.join_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.
                                                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>00</Text>
                                                                                </Text>}
                                                                            </View>}
                                                                            {(item.ttype == 'pool' && item.result_status=='FINAL')?
                                                                                <TouchableOpacity onPress={() => { item.ttype == 'pool' && item.result_status == 'FINAL' && item.action != null ? this.settleCustomPool(item, 1) : this.aggreeDisagrePage(item,1)  }}>
                                                                                    <View style={{ backgroundColor: '#ff9900', justifyContent: 'center' }}>
                                                                                    <Text style={styles.Join_Now_Text}>View</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                                : <TouchableOpacity onPress={() => {item.ttype == 'bingo' ? this.gotoBingoContest(item):(item.ttype == 'pool' && item.result_status == '') ? this.aggreeDisagrePage(item, 0):(item.ttype == 'square' ? this.gotoSquarecontestDashboard(item) : this.gotocontestDashboard1(item) )}}>
                                                                                    <View style={{ backgroundColor: '#ff9900', justifyContent: 'center' }}>
                                                                                        <Text style={styles.Join_Now_Text}>View</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>

                                                                            }
                                                                            
                                                                        </View>
                                                                    </View>
                                                                    </View>
                                                                </ImageBackground>
                                                                {this.state.acceptmorearchive == '0'?null: index == parseInt(this.state.AcceptedContests.length) - 1 ?<View style={{padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}><Text onPress={()=>{
        this.callAcceptedContest('a');
        }} style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#f26522',textDecorationLine:'underline',textDecorationColor:'#f26522'}]}>More</Text></View>:null}
                                                            </View>
                                                        )
                                                    }} />
                                            </View>
                                            :
                                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15,height:'100%' }}>
                                                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 20,textAlign:'center'  }}>You have not accepted any contests yet</Text>
                                            </View>
                                        }

                                    </View>
                                    : null}


                                {this.state.private_history_show?null: this.state.CreatedContest == 'C' ?
                                    <View style={{ width: '95%',height:'86%'}}>

                                        {this.state.private_contest_array.length > 0 ?

                                            <FlatList
                                                data={this.state.private_contest_array}
                                                extraData={this.state}
                                                keyExtractor={(item: any, index: any) => index.toString()}
                                                renderItem={({ item, index }: any) => {
                                                    var a=[]
                                                    if(item.ttype == 'bingo')
                                                    {
                                                         a = item.join_fee.split('.')
                                                   // console.log('split contest rate',a)
                                                    }
                                                    var subindex = index;
                                                    var new_ContestStartTimestamp = item.contest_start_date_timestamp * 1000;
                                                   // var new_ContestStartDate = moment(new_ContestStartTimestamp).subtract(1, 'days').format('Do MMM'); //garima
                                                   var new_ContestStartDate = moment(new_ContestStartTimestamp).format('Do MMM'); 
                                                    return (
                                                        <View style={{ width: '100%',padding:10 }}>

                                                            <ImageBackground source={require('../../../../images/UddaContestsGreen.png')}
                                                                resizeMode="stretch"
                                                                style={{ width: '100%', height:item.ttype == 'contest'?item.is_live_contest == '1' ? 84 :66:66}}>
                                                                    <View style={{ width: '100%'}}>
                                                                        {item.ttype == 'contest'?item.is_live_contest == '1' && <Text style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#f26522',textAlign:'center',marginTop:3}]}>Live</Text>:null}
                                                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                    <TouchableWithoutFeedback onPress={() => {item.version_number > 2.7 ?this.openDetailmodel(item,'P'): item.ttype == 'contest' && this.gotDetailsScreen(item) }}>
                                                                        <View style={{ width: '60%', height: 60, justifyContent: 'center', paddingLeft: 10, }}>
                                                                        <View style={{maxWidth:'90%',flexDirection:'row',alignContent:'center'}}>
                                                                                
                                                                                <Text style={styles.Challenge_Name_Text} numberOfLines={2} ellipsizeMode={'tail'}>
                                                                                {item.ttype == 'square' ? item.game_name+' ' : item.ttype == 'pool' ? item.pool_name+' ' : item.contest_name+' '}
                                                                                </Text>
                                                                               
                                                                                
                                                                                {item.version_number > 2.7 ?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,'P'):null}}>
                                                                                <View   style={[styles.table_title_info_container ]} >
                                                                                    <Text style={styles.table_title_info_text}> i </Text>
                                                                                    </View>
                                                                                    </TouchableOpacity>:null}
                                                                                
                                                                            </View>
                                                                            {/* <Text style={styles.Month_Text}>
                                                                                {item.ttype == 'square' ? item.game_name : item.ttype == 'pool' ? item.pool_name : item.contest_name}

                                                                            </Text> */}
                                                                            {/*garima*/}
                                                                            {item.ttype=='square'?<Text style={[styles.Registration_Text,{fontSize:hp(1.5)}]}>
                                                                               { moment(item.game_start_timestamp * 1000).format('LT') +' '+ new Date(item.game_start_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.game_start_timestamp * 1000).toString().split(' ')[6].length - 2) +' '+ moment(item.game_start_timestamp * 1000).format('LL')}
                                                                            </Text> : item.ttype == 'pool' ? <Text style={[styles.Registration_Text,{fontSize:hp(1.5)}]}>
                                                                                {moment(item.expired_timestamp * 1000).format('LT') + ' ' + new Date(item.expired_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.expired_timestamp * 1000).toString().split(' ')[6].length - 2) + ' ' + moment(item.expired_timestamp * 1000).format('LL')}
                                                                            </Text>:item.ttype == 'bingo' ? <Text style={[styles.Registration_Text,{fontSize:hp(1.5)}]}>
                                                                                {moment(item.bingo_expired_timestamp * 1000).format('LT') + ' ' + new Date(item.bingo_expired_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.bingo_expired_timestamp * 1000).toString().split(' ')[6].length - 2) + ' ' + moment(item.bingo_expired_timestamp * 1000).format('LL')}
                                                                            </Text>:<Text style={[styles.Registration_Text,{fontSize:hp(1.5)}]}>
                                                                                Registration closes on {item.contest_end_date}
                                                                            </Text>}
                                                                        </View>
                                                                    </TouchableWithoutFeedback>
                                                                    <View style={{ width: '40%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                                       { item.ttype=='square'?<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                       <Image
                                                                                resizeMode="contain"
                                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                source={{ uri:item.sport_icon}}></Image>
                                                                            <Text style={styles.Joining_Text}> &nbsp;Football Squares</Text>                                                                            
                                                                        </View> : item.ttype == 'pool' ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <Image
                                                                                resizeMode="contain"
                                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                source={{ uri: item.sport_icon }}></Image>
                                                                            <Text style={styles.Joining_Text}>&nbsp;Custom Pool</Text>
                                                                        </View>:<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <Text style={styles.Joining_Text}>Joining Fee.</Text>
                                                                            <Image
                                                                                resizeMode="contain"
                                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                                source={require('../../../../images/Buckscut.png')}></Image>
                                                                            {item.ttype == 'bingo' ?<Text style={styles.Joining_Price}>
                                                                                    {a[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.
                                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>{a[1]}</Text>
                                                                                </Text>:<Text style={styles.Joining_Price}>
                                                                                    {item.join_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.
                                                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>00</Text>
                                                                                </Text>}
                                                                        </View>}
                                                                        {(item.ttype == 'pool' && item.result_status == 'FINAL') ?
                                                                            <TouchableOpacity onPress={() => { item.ttype == 'pool' ? this.settleCustomPool(item,1) : '' }}>
                                                                                <View style={{ backgroundColor: '#68bcbc', justifyContent: 'center' }}>
                                                                                    <Text style={styles.Join_Now_Text}>View</Text>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                            : <TouchableOpacity onPress={() => {item.ttype == 'bingo' ?this.gotoBingoContest(item): item.ttype == 'square' ? this.gotoSquarecontestDashboard(item) : (item.ttype == 'pool' && item.result_status == '') ?this.settleCustomPool(item,0): this.gotocontestDashboard1(item) }}>
                                                                                <View style={{ backgroundColor: '#68bcbc', justifyContent: 'center' }}>
                                                                                    <Text style={styles.Join_Now_Text}>View</Text>
                                                                                </View>
                                                                            </TouchableOpacity>

                                                                        }
                                                                        
                                                                    </View>


                                                                </View>
                                                                </View>
                                                            </ImageBackground>
                                                            {this.state.createmorearchive == '0'?null: index == parseInt(this.state.private_contest_array.length) - 1 ?<View style={{padding:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}><Text onPress={()=>{this.callMethod1('a');}} style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#f26522',textDecorationLine:'underline',textDecorationColor:'#f26522'}]}>More</Text></View>:null}
                                                        </View>


                                                    )
                                                }}
                                            />
                                            :
                                            <View style={{ justifyContent: 'center', alignItems: 'center',  paddingVertical: 15,height:'100%' }}>
                                                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 20,textAlign:'center' }}> You have not created any private contests yet</Text>
                                            </View>
                                        }
                                    </View>
                                    : null}


                            </View>
                        </View>
                    </View>:this.state.contest_history?
                    <View style={{ height: '90%', width: '95%', marginTop: 20, paddingBottom: 60, }}>
                        {this.state.contest_historydata.length > 0 ?
                            <View style={{ height: '100%'  }}>
                                <FlatList
                                    data={this.state.contest_historydata}
                                    extraData={this.state}
                                    bounces={false}
                                    keyExtractor={(item: any, index: any) => index.toString()}
                                    renderItem={({ item, index }: any) => {
                                        var subindex = index;

                                        var new_ContestStartTimestamp = item.ContestStartDate_timestamp * 1000;
                                        //  var new_ContestStartDate = moment(new_ContestStartTimestamp).subtract(1, 'days').format('Do MMM');
                                        var new_ContestStartDate = moment(item.ContestStartDate).format('Do MMM'); //garima  moment().format("MMM Do YY");  

                                        return (
                                            <View style={{ width: '100%', height: 'auto', marginTop: 5, marginBottom: 5 }}>
                                                <ImageBackground source={item.join_type == 'free_to_play_contest'?require('../../../../images/free-to-play-contest-bg.png'):require('../../../../images/UddaContestsGreen.png')}
                                                    resizeMode="stretch"
                                                    style={{ width: '100%', height: 60 }}>
                                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                                        <TouchableOpacity style={{width:'68%'}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,''):item.join_type == 'free_to_play_contest'?this.openDetailmodel(item,''):null}}>
                                                        <View style={{ width: '100%', height: 60, justifyContent: 'center', paddingLeft: 5, }}>
                                                        <View style={{width:'100%',flexDirection:'row',alignContent:'center'}}>
                                                           
                                                           <Text style={styles.Challenge_Name_Text}>
                                                            {item.ChallengeName+' '}
                                                        </Text>
                                                          
                                                           {item.version_number > 2.7 ?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,''):item.join_type == 'free_to_play_contest'?this.openDetailmodel(item,''):null}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity>:item.join_type == 'free_to_play_contest'?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,''):item.join_type == 'free_to_play_contest'?this.openDetailmodel(item,''):null}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity>:null}
                                                          
                                                       </View>
                                                            {/* <Text style={styles.Month_Text}>
                                                                {item.ChallengeName}
                                                            </Text> */}
                                                            <Text style={styles.Registration_Text}>
                                                                Registration closes on {new_ContestStartDate} {/*garima*/}
                                                            </Text>
                                                        </View>
                                                        </TouchableOpacity>
                                                        <View style={{width:'2%'}}/>
                                                        <View style={{ width: '30%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                        {item.join_type == 'free_to_play_contest'?<View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:2}}>
                                                            <Text style={[styles.Joining_Text,{color:'#68bcbc'}]}>Free to Play</Text>
                                                        {/* <TouchableOpacity onPress={()=>{this.openDetailmodel(item)}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity> */}
                                                            </View>:null}
                                                            <TouchableWithoutFeedback onPress={() => { this.gotostandinglist(item,'PU') }}>
                                                                <View style={{ borderColor: '#ff9900', borderWidth: 1, height: 40, justifyContent: 'center' }}>
                                                                    <Text style={styles.Subscribe_Text}>VIEW</Text>
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        </View>
                                                    </View>
                                                </ImageBackground>
                                                {index==parseInt(this.state.contest_historydata.length )-1 && <View  style={{padding:20}}/>}
                                                
                                            </View>
                                        )
                                    }} />
                                    
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15,height:'100%' }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 20,textAlign:'center' }}>No any contest</Text>
                            </View>}
                           
                    </View>
                    :this.state.freetoplay? <View style={{ height: '75%', width: '95%', marginTop: 20, paddingBottom: 10, }}>
                        

                        {this.state.freetoplaydata.length > 0 ?
                            <FlatList
                                data={this.state.freetoplaydata}
                                extraData={this.state}
                                bounces={false}
                                keyExtractor={(item: any, index: any) => index.toString()}
                                renderItem={({ item, index }: any) => {
                                    var subindex = index;
                                    var new_ContestStartTimestamp = item.ContestStartDate_timestamp * 1000;
                                    //var new_ContestStartDate = moment(new_ContestStartTimestamp).subtract(1, 'days').format('Do MMM');
                                    var new_ContestStartDate = moment(item.ContestStartDate).format('Do MMM'); //garima  moment().format("MMM Do YY");  
                                    return (
                                        <View style={{ width: '100%', height: 50, marginTop: 5, marginBottom: 20 }}>
                                            {/*garima*/}

                                            <ImageBackground source={require('../../../../images/UddaContest.png')}
                                                resizeMode="stretch"
                                                style={{ width: '100%', height: 60, marginTop: 10, }}>
                                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                                    <TouchableOpacity style={{width:'65%'}} onPress={()=>{this.openDetailmodel(item,'')}}>
                                                    <View style={{ width: '100%', height: 60, justifyContent: 'center', paddingLeft: 5}}>
                                                       
                                                       <View style={{maxWidth:'90%',flexDirection:'row',alignContent:'center'}}>
                                                           
                                                           <Text style={styles.Challenge_Name_Text}>
                                                            {item.ChallengeName+' '}
                                                        </Text>
                                                           
                                                           <TouchableOpacity style={{marginTop:2}} onPress={()=>{this.openDetailmodel(item,'')}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity>
                                                           
                                                       </View>
                                                        <Text style={[styles.Registration_Date,{fontSize:13}]}>
                                                            Registration closes on {new_ContestStartDate}
                                                        </Text>
                                                        
                                                       
                                                    </View>
                                                    </TouchableOpacity>
                                                    <View style={{ width: '35%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom:2,width:'100%' }}>
                                                       {item.JoiningFee==0?<View style={{width:'90%',flexDirection:'row',alignItems: 'center'}}>
                                                       <Text style={[styles.Joining_Text,{fontSize:hp(2.0)}]}>Free to Play</Text></View>:<View style={{width:'90%',flexDirection:'row',alignItems: 'center'}}>
                                                       <Text style={styles.Joining_Text}>Joining Fee.</Text>
                                                            
                                                            <Image
                                                                resizeMode="contain"
                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                source={require('../../../../images/bucks.png')}></Image>
                                                            <Text style={styles.Joining_Price}>
                                                                {item.JoiningFee}.
                                                                <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>00</Text>
                                                            </Text>
                                                       </View>}
                                                            {/* <View style={{width:'5%',justifyContent:'flex-start'}}>
                                                            <TouchableOpacity style={{marginBottom:10}} onPress={()=>{this.openDetailmodel(item.Id)}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity>
                                                            </View> */}
                                                        </View>
                                                        <TouchableOpacity onPress={() => { 
                                                           // AlertUtil.show('Free to play join')
                                                            
                                                             this.ShowDialog(item, true)
                                                             }}>
                                                            <View style={{ backgroundColor: '#ff9900', justifyContent: 'center' }}>
                                                                <Text style={styles.Join_Now_Text}>JOIN NOW</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </ImageBackground>

                                        </View>
                                    )
                                }}
                            />
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15,height:'75%' }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 20 }}>No contest available</Text>
                            </View>}
                    </View>: <View style={{ height: '75%', width: '95%', marginTop: 20, paddingBottom: 10, }}>
                        {<View style={{ height: '10%', width: '100%',flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{this.setState({callcontestswitch:'A'})}} style={{width:'32%'}}>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',borderBottomColor:'white',borderBottomWidth:this.state.callcontestswitch=='A' ? 2:0}}>
                        <Text onPress={()=>{this.setState({callcontestswitch:'A'})}} style={[styles.Udda_Text,{color:this.state.callcontestswitch=='A' ?'white':'#abe8e6'}]}>Available</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'1%'}}/>
                        <TouchableOpacity onPress={()=>{this.setState({callcontestswitch:'J'})}} style={{width:'33%'}}>
                            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',borderBottomColor:'white',borderBottomWidth:this.state.callcontestswitch =='J' ? 2:0}}>
                        <Text onPress={()=>{this.setState({callcontestswitch:'J'})}} style={[styles.Udda_Text,{color:this.state.callcontestswitch =='J' ?'white':'#abe8e6'}]}>Joined</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'1%'}}/>
                        <TouchableOpacity onPress={()=>{this.setState({callcontestswitch:'L'})}} style={{width:'33%'}}>
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',borderBottomColor:'white',borderBottomWidth:this.state.callcontestswitch=='L' ? 2:0}}>
                        <Text onPress={()=>{this.setState({callcontestswitch:'L'})}} style={[styles.Udda_Text,{color:this.state.callcontestswitch=='L' ?'white':'#abe8e6'}]}>Live</Text>
                        </View>
                        </TouchableOpacity>

                        
                       
                        </View>}

                        {this.state.callcontestswitch=='J' ?this.state.SubscribedContests.length > 0 ?
                            <View style={{ height: '100%' }}>
                                <FlatList
                                    data={this.state.SubscribedContests}
                                    extraData={this.state}
                                    bounces={false}
                                    keyExtractor={(item: any, index: any) => index.toString()}
                                    renderItem={({ item, index }: any) => {
                                        var subindex = index;

                                        var new_ContestStartTimestamp = item.ContestStartDate_timestamp * 1000;
                                        //  var new_ContestStartDate = moment(new_ContestStartTimestamp).subtract(1, 'days').format('Do MMM');
                                        var new_ContestStartDate = moment(item.ContestStartDate).format('Do MMM'); //garima  moment().format("MMM Do YY");  

                                        return (
                                            <View style={{ width: '100%', height: 'auto', marginTop: 5, marginBottom: 5 }}>
                                                <ImageBackground source={item.join_type == 'free_to_play_contest'?require('../../../../images/free-to-play-contest-bg.png'):require('../../../../images/UddaContestsGreen.png')}
                                                    resizeMode="stretch"
                                                    style={{ width: '100%', height: 60 }}>
                                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                                        <TouchableOpacity onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,''):item.join_type == 'free_to_play_contest'?this.openDetailmodel(item,''):null}} style={{width:'68%'}}>
                                                        <View style={{ width: '100%', height: 60, justifyContent: 'center', paddingLeft: 5, }}>
                                                        <View style={{width:'100%',flexDirection:'row',alignContent:'center'}}>
                                                           
                                                           <Text style={styles.Challenge_Name_Text}>
                                                            {item.ChallengeName+' '}
                                                        </Text>
                                                           
                                                        {item.version_number > 2.7 ?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,''):item.join_type == 'free_to_play_contest'?this.openDetailmodel(item,''):null}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity>:item.join_type == 'free_to_play_contest'?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,''):item.join_type == 'free_to_play_contest'?this.openDetailmodel(item,''):null}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity>:null}
                                                           
                                                       </View>
                                                            {/* <Text style={styles.Month_Text}>
                                                                {item.ChallengeName}
                                                            </Text> */}
                                                            <Text style={[styles.Registration_Text,{fontSize:13}]}>
                                                                Registration closes on {new_ContestStartDate} {/*garima*/}
                                                            </Text>
                                                        </View>
                                                        </TouchableOpacity>
                                                        <View style={{width:'2%'}}/>
                                                        <View style={{ width: '30%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                        {item.join_type == 'free_to_play_contest'?<View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:2}}>
                                                            <Text style={[styles.Joining_Text,{color:'#68bcbc'}]}>Free to Play</Text>
                                                        {/* <TouchableOpacity onPress={()=>{this.openDetailmodel(item)}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity> */}
                                                            </View>:null}
                                                            <TouchableWithoutFeedback onPress={() => { this.gotocontestDashboard(item) }}>
                                                                <View style={{ borderColor: '#ff9900', borderWidth: 1, height: 40, justifyContent: 'center' }}>
                                                                    <Text style={styles.Subscribe_Text}>VIEW</Text>
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        </View>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        )
                                    }} />
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15,height:'100%' }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 20,textAlign:'center' }}>You have not joined any contest yet</Text>
                            </View>:null}

                        {/* <View style={{ marginTop: 3, width: '100%', height: 2, marginBottom: 20 }}>
                            <Image
                                resizeMode="contain"
                                source={require('../../../../images/DotedLine.png')}
                                style={{ height: 2, width: '100%', marginTop: 10 }}>
                            </Image>
                        </View> */}
                        {/* <Text style={styles.Udda_Text}>ONGOING</Text> */}

                        {/* {this.state.callcontestswitch == 'L'?this.state.UddaContests.length > 0 ?
                            <FlatList
                                data={this.state.UddaContests}
                                extraData={this.state}
                                bounces={false}
                                keyExtractor={(item: any, index: any) => index.toString()}
                                renderItem={({ item, index }: any) => {
                                    var subindex = index;
                                    var new_ContestStartTimestamp = item.ContestStartDate_timestamp * 1000;
                                    //var new_ContestStartDate = moment(new_ContestStartTimestamp).subtract(1, 'days').format('Do MMM');
                                    var new_ContestStartDate = moment(item.ContestStartDate).format('Do MMM'); //garima  moment().format("MMM Do YY");  
                                    return (
                                        <View style={{ width: '100%', height: 50, marginTop: 5, marginBottom: 20 }}>
                                            

                                            <ImageBackground source={require('../../../../images/UddaContest.png')}
                                                resizeMode="stretch"
                                                style={{ width: '100%', height: 60, marginTop: 10, }}>
                                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                                    <View style={{ width: '60%', height: 60, justifyContent: 'center', paddingLeft: 5, }}>
                                                        <Text style={styles.Challenge_Name_Text}>
                                                            {item.ChallengeName}
                                                        </Text>
                                                        <Text style={styles.Registration_Date}>
                                                            Registration closes on {new_ContestStartDate}
                                                        </Text>
                                                    </View>
                                                    <View style={{ width: '40%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={styles.Joining_Text}>Joining Fee.</Text>
                                                            <Image
                                                                resizeMode="contain"
                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                source={require('../../../../images/bucks.png')}></Image>
                                                            <Text style={styles.Joining_Price}>
                                                                {item.JoiningFee}.
                                                                <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>00</Text>
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() => { this.ShowDialog(item, true) }}>
                                                            <View style={{ backgroundColor: '#ff9900', justifyContent: 'center' }}>
                                                                <Text style={styles.Join_Now_Text}>VIEW</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </ImageBackground>

                                        </View>
                                    )
                                }}
                            />
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15,height:'100%' }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 25 }}>No Live Contest</Text>
                            </View>:null} */}

{this.state.callcontestswitch=='L' ?this.state.UddaContests.length > 0 ?
                            <View style={{ height: '100%' }}>
                                <FlatList
                                    data={this.state.UddaContests}
                                    extraData={this.state}
                                    bounces={false}
                                    keyExtractor={(item: any, index: any) => index.toString()}
                                    renderItem={({ item, index }: any) => {
                                        var subindex = index;

                                        var new_ContestStartTimestamp = item.ContestStartDate_timestamp * 1000;
                                        //  var new_ContestStartDate = moment(new_ContestStartTimestamp).subtract(1, 'days').format('Do MMM');
                                        var new_ContestStartDate = moment(item.ContestStartDate).format('Do MMM'); //garima  moment().format("MMM Do YY");  

                                        return (
                                            <View style={{ width: '100%', height: 'auto', marginTop: 5, marginBottom: 5 }}>
                                                <ImageBackground source={item.join_type == 'free_to_play_contest'?require('../../../../images/free-to-play-contest-bg.png'):require('../../../../images/UddaContestsGreen.png')}
                                                    resizeMode="stretch"
                                                    style={{ width: '100%', height: 60 }}>
                                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                                        <TouchableOpacity onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,''):item.join_type == 'free_to_play_contest'?this.openDetailmodel(item,''):null}} style={{width:'68%'}}>
                                                        <View style={{ width: '100%', height: 60, justifyContent: 'center', paddingLeft: 5, }}>
                                                        <View style={{width:'100%',flexDirection:'row',alignContent:'center'}}>
                                                           
                                                           <Text style={styles.Challenge_Name_Text}>
                                                            {item.ChallengeName+' '}
                                                        </Text>
                                                           
                                                        {item.version_number > 2.7 ?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,''):item.join_type == 'free_to_play_contest'?this.openDetailmodel(item,''):null}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity>:item.join_type == 'free_to_play_contest'?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,''):item.join_type == 'free_to_play_contest'?this.openDetailmodel(item,''):null}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity>:null}
                                                           
                                                       </View>
                                                            {/* <Text style={styles.Month_Text}>
                                                                {item.ChallengeName}
                                                            </Text> */}
                                                            <Text style={[styles.Registration_Text,{fontSize:13}]}>
                                                                Registration closes on {new_ContestStartDate} {/*garima*/}
                                                            </Text>
                                                        </View>
                                                        </TouchableOpacity>
                                                        <View style={{width:'2%'}}/>
                                                        <View style={{ width: '30%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                        {item.join_type == 'free_to_play_contest'?<View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:2}}>
                                                            <Text style={[styles.Joining_Text,{color:'#68bcbc'}]}>Free to Play</Text>
                                                        {/* <TouchableOpacity onPress={()=>{this.openDetailmodel(item)}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity> */}
                                                            </View>:null}
                                                            <TouchableWithoutFeedback onPress={() => { this.gotocontestDashboard(item) }}>
                                                                <View style={{ borderColor: '#ff9900', borderWidth: 1, height: 40, justifyContent: 'center' }}>
                                                                    <Text style={styles.Subscribe_Text}>VIEW</Text>
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        </View>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        )
                                    }} />
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15,height:'100%' }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 20,textAlign:'center' }}>No contest started yet. Stay tuned!!</Text>
                            </View>:null}


                            {this.state.callcontestswitch == 'A'?this.state.availabeldata.length > 0 ?
                            <View style={{ height: '100%' }}>
                            <FlatList
                                data={this.state.availabeldata}
                                extraData={this.state}
                                bounces={false}
                                keyExtractor={(item: any, index: any) => index.toString()}
                                renderItem={({ item, index }: any) => {
                                    var subindex = index;
                                    var new_ContestStartTimestamp = item.ContestStartDate_timestamp * 1000;
                                    //var new_ContestStartDate = moment(new_ContestStartTimestamp).subtract(1, 'days').format('Do MMM');
                                    var new_ContestStartDate = moment(item.ContestStartDate).format('Do MMM'); //garima  moment().format("MMM Do YY");  
                                    return (
                                        <View style={{ width: '100%', height: 50, marginTop: 5, marginBottom: 20 }}>
                                            {/*garima*/}

                                            <ImageBackground source={require('../../../../images/UddaContest.png')}
                                                resizeMode="stretch"
                                                style={{ width: '100%', height: 60, marginTop: 10, }}>
                                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                                    <TouchableOpacity style={{width:'59%'}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,'A'):null}}>
                                                    <View style={{ width: '100%', height: 60, justifyContent: 'center', paddingLeft: 5, }}>
                                                    <View style={{width:'100%',flexDirection:'row',alignContent:'center'}}>
                                                           
                                                           <Text style={styles.Challenge_Name_Text}>
                                                            {item.ChallengeName+' '} 
                                                        </Text>
                                                           
                                                        {item.version_number > 2.7 ?<TouchableOpacity style={{marginTop:2}} onPress={()=>{item.version_number > 2.7 ? this.openDetailmodel(item,'A'):null}}>
                                                        <View   style={[styles.table_title_info_container ]} >
                                                            <Text style={styles.table_title_info_text}> i </Text>
                                                            </View>
                                                            </TouchableOpacity>:null}
                                                           
                                                       </View>
                                                        {/* <Text style={styles.Challenge_Name_Text}>
                                                            {item.ChallengeName}
                                                        </Text> */}
                                                        <Text style={[styles.Registration_Date,{fontSize:13}]}>
                                                            Registration closes on {new_ContestStartDate}
                                                        </Text>
                                                    </View>
                                                    </TouchableOpacity>
                                                    <View style={{width:'2%'}}/>
                                                    <View style={{ width: '39%', height: 60, justifyContent: 'center', paddingRight: 5, }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={styles.Joining_Text}>Joining Fee.</Text>
                                                            <Image
                                                                resizeMode="contain"
                                                                style={{ height: hp(1.3), width: hp(1.5) }}
                                                                source={require('../../../../images/bucks.png')}></Image>
                                                            <Text style={styles.Joining_Price}>
                                                                {item.JoiningFee}.
                                                                <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 8 }}>00</Text>
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() => { this.ShowDialog(item, true) }}>
                                                            <View style={{ backgroundColor: '#ff9900', justifyContent: 'center' }}>
                                                                <Text style={styles.Join_Now_Text}>JOIN NOW</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </ImageBackground>

                                        </View>
                                    )
                                }}
                            />
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 15,height:'100%' }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 20 ,textAlign:'center'}}>No Contests are available currently</Text>
                            </View>:null}

                           
                    </View>}
                    

                </View>
                {this.state.OpenPlaySwitchAccepted ? this.state.private_history_show?null:<View style={{justifyContent:'center',alignContent:'center',alignItems:'center',backgroundColor:'white',width:'100%'}}>
<TouchableOpacity onPress={()=>{this.setState({private_history_show:true})}}>
                    <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>{'CONTEST HISTORY'}</Text>
                    </TouchableOpacity>
</View>:null}
                {this.state.OpenPlaySwitchAccepted==false?this.state.contest_history?null:<View style={{justifyContent:'center',alignContent:'center',alignItems:'center',padding:5,height:this.state.freetoplay?'10%':'5%'}}>
                    <TouchableOpacity onPress={()=>{this.setState({contest_history:true})}}>
                    <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>{'CONTEST HISTORY'}</Text>
                    </TouchableOpacity>
                </View>:null}
                {this.state.OpenPlaySwitchAccepted==false?
                this.state.contest_history ?null:this.state.freetoplay?null:
                <View style={{ height: '10%', backgroundColor: 'white', width: '100%', alignItems: 'center',marginTop:8 }}>
                        <TouchableWithoutFeedback onPress={() => { 
                            // this.gotoCreatePrivateContest() 
                            // AlertUtil.show('FREE TO PLAY WORK')
                            this.setState({freetoplay:true})
                            }}>
                            <View style={[styles.Button_Style]}>
                                <Text style={styles.Create_Text}>FREE TO</Text>
                                <Text style={styles.Private_Text}>PLAY CONTEST</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {/* <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 3 }}>
                            <TouchableWithoutFeedback onPress={() => { this.gotoMyPrivateContest() }}>
                                <Text style={[styles.Private_Text, { color: '#68bcbc' }]}>YOUR PRIVATE CONTESTS</Text>
                            </TouchableWithoutFeedback>
                        </View> */}

                    </View>
                    :<View style={{ height: '10%', backgroundColor: 'white', width: '100%', alignItems: 'center',marginTop:8 }}>
                        <TouchableWithoutFeedback onPress={() => { this.gotoCreatePrivateContest() }}>
                            <View style={[styles.Button_Style]}>
                                <Text style={styles.Create_Text}>CREATE A</Text>
                                <Text style={styles.Private_Text}>PRIVATE CONTEST</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {/* <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 3 }}>
                            <TouchableWithoutFeedback onPress={() => { this.gotoMyPrivateContest() }}>
                                <Text style={[styles.Private_Text, { color: '#68bcbc' }]}>YOUR PRIVATE CONTESTS</Text>
                            </TouchableWithoutFeedback>
                        </View> */}

                    </View>}
                {/* -------------------------------- Guest User Dialogue --------------------------------*/}
                <Dialog
                   // visible={this.state.guestUserDialog}
                    title=""
                    onTouchOutside={() => this.setState({ guestUserDialog: false })} >

                    <View style={{ backgroundColor: "white" }}>

                        <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
                                {Message.Guest_Msg}
                  </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                            <View style={{ width: '46%' }}>
                                <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.setState({ guestUserDialog: false }) }} />
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ width: '46%' }}>
                                <BigButton title="OK" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.loginButtonPressed() }} />
                            </View>
                        </View>
                    </View>
                </Dialog>
                {this.state.guestUserDialog?<Guestdialog detailmodel={this.state.guestUserDialog} onDismiss={() => {
                  this.closeModal();
                }} onClick={() => {
                    this.loginButtonPressed();
                  }}/>:null}
                  {this.state.contestdetail && (
              <DetailComponent
                detailmodel={this.state.contestdetail}
                encrypted_contest_id={
                  this.state.contestdetailid
                }
                onDismiss={() => {
                  this.closeDetailModal();
                }}
                goinfo={() => {
                    this.goinfo();
                  }}
                  join_type={this.state.join_type}
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
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners,
    subscribeContestRequestStatus: state.serviceReducer.requestStatus,
    subscribeContestResponse: state.serviceReducer.response as SubscribeContestResponse,
    subscribeContestError: state.serviceReducer.error,
})

export default connect(mapStateToProps)(G_UddaContests);