import React, { ReactInstance } from "react";
import { View, Text, Image, ScrollView,AsyncStorage,TextInput, FlatList,Modal, Animated,Dimensions,UIManager,Keyboard, TouchableWithoutFeedback, Share, TouchableOpacity, BackHandler,ImageBackground } from "react-native";
import styles from './styles';
import { SafeAreaView,StackActions,NavigationActions } from 'react-navigation';
import Container from '../../../../Components/Container';
import {AppEventsLogger} from 'react-native-fbsdk'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens"; 
import Application from "../../.../../../../Entities/Application";
import ProgressLoader from 'rn-progress-loader';
import Popover from 'react-native-popover-view'
import moment from 'moment';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
import { Dialog } from 'react-native-simple-dialogs'; // @pky 
var update = require('immutability-helper');
import AlertUtil from "../../../../Util/AlertUtil";
import ReferralService from "../../../../Services/Referral/ReferralService";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { connect } from 'react-redux';
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import { UDDAError } from "../../../../Entities";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Dash from 'react-native-dash';
import CircleImage from "../../../../Components/CustomComponents/CircleImage";
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from "react-native-image-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icons from 'react-native-vector-icons/MaterialIcons';
const { State: TextInputState } = TextInput;

const ProfilePageContent = {
    key: 'somethun',
    page_title: 'OPEN PLAYS',
}

interface G_GamingBetViewProps extends AppValidationComponentProps {
    updateProfileRequestStatus?: ServiceRequestStatus
    updateProfileResponse?: UpdateProfileResponse
    updateProfileError?: UDDAError
    getProfileRequestStatus?: ServiceRequestStatus
    getProfileResponse?: GetProfileResponse
    getProfileError?: UDDAError
    serviceKey?: string
    listeners?: any
}

interface G_GamingBetViewState extends AppValidationComponentState {
    DataList?: any;
    isshow: any;
    loader: any;
    OpenPlaySwitchAccepted: any;
    contentoftoggle: any;
    people_list: any;
    selected_bet: any;
    blackdialogDate: any;
    dialogVisible:any;//@pky
    DataListOfCustomResult?:any;//@pky
    dialogmoreprocess:any;//ashish
    result:any;//ashish
    customData:any;//ashish
    textshow:any;//ashish
    betclose:any;//ashish
    imagezoom:any;//ashish
    uploadurl:any;//ashish
    pooldata:any;//ashish
    pooldialog:any;//ashish
    poollink:any;//ashish
    isDateTimePickerVisible: any;
    minimumDate: any;
    agreedialog: any;
    agreedata: any;
    imageurl: any;
    imagebase: any;
    pooldate: any;
    poolanswer: any;
    shift: any;
    imageoverlay: any;
    isSettle:boolean ;

    
}


const bottom_initial = 0;
 class G_GamingBetView extends AppValidationComponent<G_GamingBetViewProps, G_GamingBetViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    private referralservice = new ReferralService();
    private serviceRequestInProgress = false
    public keyboardDidShowSub: any;
    public keyboardDidHideSub: any;
    constructor(props: G_GamingBetViewProps) {
        super(props);
        this.state = {
            DataList: [],
            isshow: true,
            loader: false,
            dialogVisible:false,//@pky
            DataListOfCustomResult:[],//@pky
            OpenPlaySwitchAccepted: false,
            contentoftoggle: 'Show Private',
            people_list: '',
            selected_bet: '',
            blackdialogDate: '',
            result: '',//ashish
            customData: {},//ashish
            dialogmoreprocess:false,//ashish
            textshow:false,//ashish
            betclose:'',//ashish
            imagezoom:false,//ashish
            uploadurl:'',//ashish
            pooldata:{},//ashish
            pooldialog:false,//ashish
            poollink:false,//ashish
            isDateTimePickerVisible:false,//ashish
            minimumDate:new Date(),
            agreedialog:false,
            agreedata:{},
            imageurl:'',
            imagebase:'',
            pooldate:'',
            poolanswer:'',
            shift: new Animated.Value(0),
            isSettle:false,
            imageoverlay:false,

        };
    }


    async saveoverlay(){
        try {
          await AsyncStorage.setItem('betlistoverlay', 'true');
          this.setState({imageoverlay:false})
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }
      async closecurrent(){
        
        this.setState({imageoverlay:false})
        try {
          await AsyncStorage.setItem('betlistoverlaycurrent', 'true');
         
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }
      async componentDidMount() {
       

        let userId = '';
        let current = '';
        try {
            current = await AsyncStorage.getItem('betlistoverlaycurrent');
          userId = await AsyncStorage.getItem('betlistoverlay');
          
          console.log('betlistoverlay response',userId)
          var that = this;
          if(userId == 'true')
          {
              setTimeout(function(){
                that.setState({imageoverlay:false})
              },5000)
            // this.setState({imageoverlay:false})
          }else{
              if(current == 'true')
           { setTimeout(function(){
                that.setState({imageoverlay:false})
              },5000)
            }else{
                setTimeout(function(){
                    that.setState({imageoverlay:true})
                  },5000)
            }
            // this.setState({imageoverlay:true})
          }
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }


        //0 for public
            //1 for private
            if(UrlService.isLiveApp == '1'){
        this.referralservice.logEvent('BetList_Click', {});
        AppEventsLogger.logEvent('BetList_Click');
            }
            if(this.props.navigation.state.params){
                this.setState({OpenPlaySwitchAccepted:true})
                this.callMethod('2');
            }else{
                this.callMethod('1');
            }
        // this.callMethod('1');
		const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: AppScreens.Gambling_ApplicationStack})],
});
        BackHandler.addEventListener('hardwareBackPress', ()=>  this.props.navigation!.dispatch(resetAction) );
        // BackHandler.addEventListener('hardwareBackPress', ()=> this.props.navigation!.goBack(null) );
    }


    // ----------------------------------------------- API calling ---------------------------------------
    private getProfile() {
        var profileRequest = new GetProfileRequest()
        var serviceAction = new ServiceAction()
        var responseParser = new GetProfileResponseParser()
        this.props.dispatch!(serviceAction.request(ServiceType.User,
            ServiceKeys.GetProfileServiceName,
            profileRequest,
            [this.constructor.name],
            responseParser))

    }


    callMethod(OpenPlayVersion: any) {
      
        this.setState({ loader: true });
        var url;
        if (OpenPlayVersion == 1) {
            url = UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/open_plays/' + OpenPlayVersion;
        }
        else {
            url = UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/open_plays/' + OpenPlayVersion;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                this.setState({ DataList: responseJson.data });
                console.log('Success openplay' + JSON.stringify(this.state.DataList));
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }


    // ----------------------------------------------- Methods ---------------------------------------

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

    availableBalanceTapped() {
    }

    openPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
    }

    coveredPlaysTapped() {
    }

    cellDidClicked(tag: number, tableViewCellReference: ReactInstance): void {
    }

    OpenPlaySwitchValueChanged() {

        if (this.state.OpenPlaySwitchAccepted === true) {
            this.setState({ OpenPlaySwitchAccepted: false });
            this.callMethod('1');
        }
        else {
            this.setState({ OpenPlaySwitchAccepted: true });
            this.callMethod('2');
        }
    }

    async shareOption(item: any) {
        var MessageString: any;
        var oddsString: any;
        var teamName: any;
        var teamName2: any;
        var url: any;
        var amount: any;
        var referStr: any;
        if (item.ttype == 'o') {
            if (item.bet_odds_type == 'ML') {
                oddsString = "Money Line";
            }
            else if (item.bet_odds_type == 'T') {
                oddsString = "Total";
            }
             
            else {
                oddsString = "Spread";
            }
            if (item.ml_draw_price) {
                oddsString = "Money Line";
            }

           /*  if (item.home.is_bet_team == 'true') {
                teamName = item.home.home_team_name
                teamName2 = item.away.away_team_name
            } else {
                teamName = item.away.away_team_name
                teamName2 = item.home.home_team_name
            }


            url = "http://bet.udda.com/index.php?t=oddsbet&i=" + item.encryptor_bet_id;

            MessageString = "I just bet " + item.amount + " UDDA Bucks on the " +
                oddsString + " " + amount + " for the team " + teamName + "V/s" + teamName2 + ". " + url; */

        // @vijay code 

            if (item.home.is_bet_team == 'true') {
                teamName = item.home.home_team_name;
                teamName2 = item.away.away_team_name;
                amount = item.home.ml_home_price;
            } else {
                teamName = item.away.away_team_name;
                teamName2 = item.home.home_team_name;
                amount = item.away.ml_away_price;
            }
            if (item.ml_draw_price) {
            if (item.draw.is_bet_team == 'true') {
                teamName = item.away.away_team_name;
                teamName2 = item.home.home_team_name;
                amount = (item.draw.ml_draw_price > 0) ? '+'+item.draw.ml_draw_price : item.draw.ml_draw_price;
            }
        }
            
            /*url = "http://bet.udda.com/index.php?t=oddsbet&i=" + item.encryptor_bet_id;
            referStr = "\n Use Referral Code " + this.my_referral_code + " to sign up. ";

            MessageString = "I just bet " + item.amount + " UDDA Bucks on the " +
                oddsString + " " + amount + " for the team " + teamName + "V/s" + teamName2 + "." + referStr + "\n" + url;*/
                url = "http://bet.udda.com/index.php?t=oddsbet&i=" + item.encryptor_bet_id;
                url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
                referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up. ";
    
               // MessageString = "I just bet " + item.amount + " UDDA Bucks on the " +
                 //   oddsString + " " + amount + " for the team " + teamName + "V/s" + teamName2 + "." + referStr + "\n" + url;
                 var newoddsString = '"'+oddsString+'"'
                 var newteamName = '"'+teamName+'"'
                 var newteamName2 = '"'+teamName2+'"'
            var newLine = (item.ml_draw_price) ? '"' + amount + '"' : '"' + item.bet_odds_value + '"'
                 var newAmount ='"'+item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'"'
                 var newWinAmount = '"'+item.amount_to_win.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'"'
                  
                 MessageString = "I’ll bet you the " +  newteamName +" beat  "+ newteamName2 +". The "+teamName+" are "+newLine+ " on the "+newoddsString+". I’ll put up" + newAmount + "UDDA bucks to your "+newWinAmount+" Udda bucks, you can accept all of or any part of my bet."+ referStr + "\n" + url;;
            if(item.ml_draw_price) {
                MessageString = "I am betting on Draw " + newLine + " under " + newoddsString + " for " + newteamName2 + " Vs " + newteamName + " . I’ll put up " + newAmount + " UDDA bucks to your " + newWinAmount + " Udda bucks, you can accept all of or any part of my bet.";
                MessageString += referStr + "\n" + url;  
            }
           
        }
        else if (item.ttype == 'c') {
            url = "http://bet.udda.com/index.php?t=custombet&i=" + item.encryptor_bet_id;
           // url = "https://bet.udda.com/coming-soon/"

            url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
            referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up. ";
            //MessageString = "I just bet a " + item.amount + " UDDA Bucks that  " + item.question + "  and My answer is  " + item.line + " . Would you like to accept the Bet? "
           // MessageString += referStr + "\n" + url;

            
               
               
          
                

               				 var new_time_stampExp = item.bet_expired_on_time_stamp * 1000;
                              var formated_timeExp = moment(new_time_stampExp).format('LT');
                              var batdateExp: any = moment(new_time_stampExp).format('LL');
                              var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
                              var zonevalueExp: any = Match_dateExp[6].toString();
                              var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);
                 
                 				var betTimeExpr: any = formated_timeExp + " " + zoneExp;
                				var betDateExpr: any = batdateExp;
                try {
                //  MessageString = 'I just bet a ' + item.amount+ ' UDDA Bucks that  \n"' + item.question + '"\n Odds "' +item.odds + '"\n My answer  "' + item.line + '"\n Bet closes at  "' + betTimeExpr + ', ' + batdateExp + '" .\n Would you like to accept the Bet? '
                 MessageString = "I'll give you " ; 
                 MessageString += '"'; 
                 MessageString +=  item.odds + '" odds that "' + item.question + '". I’ll put up "' + item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks to your "' + item.amount_to_win.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks, you can accept all of or any part of the bet.\nMy answer "'+ item.line +'"\nBet closes at  "'+ betTimeExpr + ', ' + batdateExp + '".'
                }
                catch (e) {
          
                }
                MessageString += referStr + "\n" + url;     
                 
          
          
          
              


            

        }
        else if (item.ttype == 'cp') {
            url = "http://bet.udda.com/index.php?t=poolbet&i=" + item.encryptor_bet_id;
           // url = "https://bet.udda.com/coming-soon/"

            url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
            referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up. ";
            //MessageString = "I just bet a " + item.amount + " UDDA Bucks that  " + item.question + "  and My answer is  " + item.line + " . Would you like to accept the Bet? "
           // MessageString += referStr + "\n" + url;

            
               
               
          
                

               				//  var new_time_stampExp = item.bet_expired_on_time_stamp * 1000;
                            //   var formated_timeExp = moment(new_time_stampExp).format('LT');
                            //   var batdateExp: any = moment(new_time_stampExp).format('LL');
                            //   var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
                            //   var zonevalueExp: any = Match_dateExp[6].toString();
                            //   var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);
                 
                 			// 	var betTimeExpr: any = formated_timeExp + " " + zoneExp;
                            // 	var betDateExpr: any = batdateExp;
                            
                            var extraDetails = '"\n';
                            if(item.bet_near_type == '2')
                            {
                              extraDetails +='Closest: "Yes", '
                            }
                            else 
                            {
                              extraDetails += 'Exact: "Yes", '
                            }
                            if(item.bet_play_type== '1')
                            {
                              extraDetails +="Don’t Show Pick:"
                              extraDetails += ' "Yes", '
                            }
                            else 
                            {
                              extraDetails += 'Show Pick: "Yes", '
                            }
                            if(item.bet_type== '2')
                            {
                              extraDetails +='Private: "Yes"'
                            }
                            else 
                            {
                              extraDetails += 'Public: "Yes"'
                            }
                            if(item.bet_play_type== '1')
                            {
                              extraDetails+=', '
                            }
                            if(item.multiple_winners != '1')
                            {
                              extraDetails +='\n'
                            }
                            else 
                            {
                              extraDetails += 'Multiple Winner: "Yes" \n'
                            }

                try {
                  MessageString = 'I just bet a ' + item.amount+ ' UDDA Bucks that  \n"' + item.question + extraDetails+'My answer  "' + item.line + '" .\nWould you like to accept the Bet? '
          
                }
                catch (e) {
          
                }
                MessageString += referStr + "\n" + url;     
                 
          
          
          
              


            

        }
        else {

            url = "http://bet.udda.com/index.php?t=propsbet&i=" + item.encryptor_bet_id;
            url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
            referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up. ";

            MessageString = " I just bet a " + item.amount + " UDDA Bucks that " + item.question + " is " + item.bet_team_type + item.total + item.line + " bet on this. Would you accept the Bet? " + referStr + "\n" + url;
        }

        console.log('private url ' + JSON.stringify(MessageString));
        Share.share({
            message: MessageString,
        })
            .then(result => {
                console.log(result)
                this.closePopover();
            })
            .catch(errorMsg => {
                console.log(errorMsg)
                this.closePopover();

            });
    }

    gotoDashboard() {
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
    }
    gotoBetHistory() {
        if(UrlService.isLiveApp == '1'){
        this.referralservice.logEvent('BetHistory_Click', {});
        AppEventsLogger.logEvent('BetHistory_Click');
        }
        RouterBuilder.replaceRouteTo(AppScreens.G_HistoryView, this.props)

    }



    blackdialogOpen(item: any, index: any, index2: any, index3: any) {
        
        var new_time_stamp = item.bet_time_stamp * 1000;
        var formated_time = moment(new_time_stamp).format('MMMM DD,YYYY');
        this.setState({ blackdialogDate: formated_time });


        for (let i = 0; i < this.state.DataList.length; i++) {
            for (let j = 0; j < this.state.DataList[i].game_array.length; j++) {
                for (let k = 0; k < this.state.DataList[i].game_array[j].game_array.length; k++) {
                    if (i == index && j == index2 && k == index3) {
                        this.state.DataList[i].game_array[j].game_array[k].BlackDialog = true
                        this.setState({ people_list: this.state.DataList[i].game_array[j].game_array[k].share_info });
                        this.setState({ selected_bet: item });
                    }
                    else {
                        this.state.DataList[i].game_array[j].game_array[k].BlackDialog = false

                    }
                }
            }
        }
        this.setState({ DataList: this.state.DataList });
    }



    closePopover() {
        for (let i = 0; i < this.state.DataList.length; i++) {
            for (let j = 0; j < this.state.DataList[i].game_array.length; j++) {
                for (let k = 0; k < this.state.DataList[i].game_array[j].game_array.length; k++) {
                    this.state.DataList[i].game_array[j].game_array[k].BlackDialog = false
                }
            }
        }
        this.setState({ DataList: this.state.DataList });
    }


//@pky 


showCustomBetResultDialog1(id:any){

    this.setState({ loader: true });
        // var url;
        
        //     url = UrlService.CONSTURI + UrlService.APIVERSION3 +'/apiGaming/custom_props_result_publish_info' + id;
        

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'authorisation': this.authorisationToken
        //     },
        // })
      

        var params: any = {
            'bet_id': id,
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
console.log('token',this.authorisationToken)
        fetch(UrlService.CONSTURI+'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/custom_props_result_publish_info', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                this.setState({ DataListOfCustomResult: responseJson.data });
               
                console.log('Success openplay' + JSON.stringify(this.state.DataListOfCustomResult));
                this.setState({ dialogVisible: true });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })






    
}



showCustomBetResultDialog(id:any)
{

    this.setState({ loader: true });
        // var url;
        
        //     url = UrlService.CONSTURI + UrlService.APIVERSION3 +'/apiGaming/custom_props_result_publish_info' + id;
        

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'authorisation': this.authorisationToken
        //     },
        // })
      

        var params: any = {
            'bet_id': id,
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        fetch(UrlService.CONSTURI+'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/custom_props_result_publish_info', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                this.setState({ DataListOfCustomResult: responseJson.data });
                console.log('Success openplay' + JSON.stringify(this.state.DataListOfCustomResult));
                this.setState({ dialogVisible: true });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })






    
}


hideLoader()
{
    AlertUtil.show('hide me'); 
    this.setState({ loader: false });
}
customBetResultAgreeDisagree(id:any,bet_status:any)
{

   // this.setState({ dialogVisible: false });
   
    //this.setState({ loader: true });
    
        // var url;
        
        //     url = UrlService.CONSTURI + UrlService.APIVERSION3 +'/apiGaming/custom_props_result_publish_info' + id;
        

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'authorisation': this.authorisationToken
        //     },
        // })
      
// console.log(this.authorisationToken)
var that = this;
//setTimeout(function(){that.setState({ loader: false });},4000)
        var params: any = {
            'bet_id': id,
            'bet_status':bet_status
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        this.setState({ dialogVisible: false });
        fetch(UrlService.CONSTURI+'index.php/'+UrlService.APIVERSION3 +'/apiGaming/update_custom_props_result_status', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
            //that.hideLoader()
            this.getProfile();
            this.callMethod('2');
                this.setState({ loader: false });
                //this.callMethod('2');
              //  this.setState({ DataListOfCustomResult: responseJson.data });
              //  console.log('Success openplay' + JSON.stringify(this.state.DataListOfCustomResult));
             //  console.log(responseJson.data);
               AlertUtil.show(responseJson.message);
            
               this.setState({ dialogVisible: false });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })






    
}


    componentWillReceiveProps(nextProps: G_DashboardViewProps) {
        if (nextProps.listeners!.includes(this.constructor.name)) {
            if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
                switch (nextProps.requestStatus) {
                    case ServiceRequestStatus.FinishedWithSuccess:
                        this.serviceRequestInProgress = false;
                        console.log("feedbackResponse " + JSON.stringify(nextProps));
                        
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




//end @pky


getblackDialog(touchableRef: any) {
        
     
    // var that = this;
    // this.shareOption(that.state.selected_bet) 
   
    // return;

    return (

        // <Popover style={{ position: "absolute", top: 0, right: 15, zIndex: 100, width: '70%'}}>

        <Popover
            isVisible={true}
           // fromView={touchableRef}
          // backgroundStyle={{position:'absolute', top:100, paddingTop:hp(20), backgroundColor: '#fff' }}
        //   mode={'rn-modal'}
        // // mode={{'js-modal'
           popoverStyle ={{ marginLeft:-10, marginTop:hp(6)}}
            onRequestClose={() => this.closePopover()}>
               
            <View style={{ height:hp(87), margin:0, backgroundColor: '#fff', padding: 10, width: '100%', maxHeight: '100%', }}>
            <TouchableOpacity onPress={() => { this.closePopover() }} style={{ width:50}}>
                    <View >
                        {/* <Image source={require('../../../../images/back_icon.png')} style={{ height: 10, width: 10, alignSelf: 'flex-start', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image> */}
                        <Icons name="arrow-back" size={30} color="black" style={{marginLeft:2}} 
            onPress={() => { this.closePopover() }}
          />
                    </View>
                </TouchableOpacity>
            <View style={{position:'absolute',top:5,right:0, justifyContent: 'center', alignItems: 'center' ,width:'80%' }}>
                        <Text style={{ width: '100%', color:'#68bcbc',  fontSize: 18,marginTop:5, fontFamily: 'Montserrat-Bold',  textAlign: 'left',paddingLeft:'6%' }}>PARTICIPANTS </Text>
                    </View>
                {/* <TouchableWithoutFeedback onPress={() => { this.closePopover() }} >
                    <View>
                        <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10, alignSelf: 'flex-end', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image>
                    </View>
                </TouchableWithoutFeedback> */}


                <View style={{ width: '100%', flexDirection: 'row',marginTop:10 }}>
                    <Text style={{ width: '40%'   , fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Bet Date:</Text>

                    <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                        <Text style={{    fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.blackdialogDate}</Text>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <Text style={{ width: '40%',   fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Creator</Text>

                    <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                        <Text style={{   fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.selected_bet.creator}</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#777777', marginVertical: 5, width: '95%', height: 2, alignItems: 'center' }}>
                    </View>
                </View>

                {this.state.people_list.length > 0 ?
                <View style={{height:hp(63)}}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.people_list}
                        keyExtractor={(item: any, index) => index.toString()}
                        bounces={false}
                        renderItem={({ item, index }: any) => {
                            return (
                                item.status == 1 ? <View>
                                <View style={{ width: '100%',  flexDirection: 'row',justifyContent:'space-between', height:40,alignItems:'center',alignContent:'center'}}>
                                    <Text style={{   fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center' }}>{item.username}</Text>

                                    <View style={{ flexDirection: 'row',  height: 20 }}>
                                        <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                        <Text style={{   fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{item.amount}</Text>
                                    </View>
                                    {this.state.selected_bet.ttype == 'cp'?<Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{item.settled_status}</Text>:null}
                                </View>
                                <View style={{borderBottomColor: '#EEEEEE',borderBottomWidth: hp(.3),}} />
                            </View>: <View >
                                <View style={{ width: '100%', flexDirection: 'row',justifyContent:'space-between' ,height:40,alignItems:'center',alignContent:'center'}}>
                                    <Text style={{  color: '#808080', fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center', textDecorationLine:'line-through' }}>{item.username}</Text>

                                    <View style={{ flexDirection: 'row',  height: 20 }}>
                                        <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                        <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textDecorationLine:'line-through' }}>{item.amount}</Text>
                                    </View>
                                   {this.state.selected_bet.ttype=='cp'?<Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center'}}>{item.settled_status}</Text>:null}
                                </View>
                                <View style={{borderBottomColor: '#EEEEEE',borderBottomWidth: hp(.3),}} />
                            </View>
                            )
                        }}
                    />
                    </View>
                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ width: '100%',   fontSize: 12, fontFamily: 'Montserrat-Bold', height: hp(63), textAlign: 'center' }}>No record found</Text>
                    </View>

                }
                {this.state.selected_bet.ttype == "cp"?this.state.selected_bet.bet_type == 2 && this.state.selected_bet.creator_index == '0'?<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.selected_bet) }}>
                            <View style={{ backgroundColor: '#68bcbc', paddingVertical: 7, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, alignItems: 'center' }}> Invite More Friends</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>:this.state.selected_bet.bet_type == 1?<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.selected_bet) }}>
                            <View style={{ backgroundColor: '#68bcbc', paddingVertical: 7, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, alignItems: 'center' }}> Invite More Friends</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>:null:(this.state.selected_bet.ttype == "c" && this.state.selected_bet.result_status !="FINAL")?
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.selected_bet) }}>
                            <View style={{ backgroundColor: '#68bcbc', paddingVertical: 7, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, alignItems: 'center' }}> Invite More Friends</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : 
                (this.state.selected_bet.ttype != "c" ) ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.selected_bet) }}>
                            <View style={{ backgroundColor: '#68bcbc', paddingVertical: 7, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, alignItems: 'center' }}> Invite More Friends</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>:<View/>
               }
                

            </View>
        </Popover>

    )
}

    getCustomProbBetList(item:any) {

        this.setState({ loader: true });
       
        var params: any = {
          'event_id': '',
          'league_id': '',
          'contest_id': '',
          'custom_prop_id':item.custom_prop_id
        };
    
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
            this.setState({ loader: false });
           var a = moment(responseJson.data[0].custom_props.expired_timestamp * 1000).format('LT') +' '+ new Date(responseJson.data[0].custom_props.expired_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(responseJson.data[0].custom_props.expired_timestamp * 1000).toString().split(' ')[6].length - 2) +' '+ moment(responseJson.data[0].custom_props.expired_timestamp * 1000).format('LL')
          this.setState({betclose:a})
           this.setState({ customData: responseJson.data[0].custom_props });
           console.log('Success customData' +this.state.customData);
           this.setState({ dialogmoreprocess: true });
    
            console.log('Success openplay' +JSON.stringify(responseJson.data));
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



      publishCustomBet() {
        if (this.state.result == '') {
         // alert('please select result')
         this.setState({textshow:true});
        } else {
           this.setState({ textshow: false });
           this.setState({ dialogmoreprocess: false })
           this.setState({ loader: true });
          
          console.log('result by ashish', this.state.result)
         
        //   this.setState({ iscustomdialog: false })
          var that = this;
          var params: any = {
            'custom_prop_id': this.state.customData.id,
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
             // that.setState({ loader: false });
              // that.setState({ dialogmoreprocess: false })
             // alert(responseJson.message);
             if (this.state.OpenPlaySwitchAccepted === true) {
              //  this.setState({ OpenPlaySwitchAccepted: false });
                this.callMethod('2');
            }
            else {
              //  this.setState({ OpenPlaySwitchAccepted: true });
                this.callMethod('1');
            }
              if (responseJson.message == "Access Expired.") {
                // AlertUtil.show("Session Expired ! Please login again");
                console.log("Footer comp ---->" + responseJson.message);
                // LogoutUtill.logoutButtonPressed(this.props);
              }
            })
            .catch(error => {
            //  that.setState({ iscustomdialog: false })
              that.setState({ loader: false });
              console.log(error);
            })
        }
      }
      


      getCreatePoolList(item:any) {

        this.setState({ loader: true });
        this.setState({ uploadurl: '' });
        this.setState({poollink:''});
        this.setState({imagebase:''});
       
        var params: any = {
          'custom_pool_id': item.custom_pool_id,     
        };
    
        var formData = new FormData();
    
        for (var k in params) {
          formData.append(k, params[k]);
        }
    
        fetch(UrlService.CONSTURI+'index.php/'+ UrlService.APIVERSION3 +'/Custom_PoolGaming/custom_pools_list', {
          method: 'POST',
          headers: {
            'authorisation': this.authorisationToken
          },
          body: formData,
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log('vreate pool response :   ' + JSON.stringify(responseJson)); 
            this.setState({pooldate:''})
            this.setState({poolanswer:''})
            this.setState({ loader: false });
            this.setState({ pooldata: responseJson.data[0].custom_pools });
            this.setState({ pooldialog: true});
           // this.setState({flattext:[]})
            //this.setState({ searchData: responseJson.data });
    
    
           console.log('Success openplay' + JSON.stringify(this.state.pooldata));
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
    

      selectPhoto() {
        // if (Application.sharedApplication().user!.profile.userType == 'Guest') {
        //   this.setState({ guestUserDialog: true });
        //   console.log('454545');
    
        // } else {
    
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
           
              this.setState({uploadurl:source.uri})
              let data ='data:image/jpeg;base64,' + response.data
              console.log('basse 64 image : '+ data)
              this.setState({imagebase:data})
    
            
    
             // this.setState({ photo: { name: this.photoFieldName, value: response.data }, imageFilePath: source.uri });
            }
          });
        }
     // }


     changeanswertext(text:any){
        let message = [];
        message =this.state.pooldata
        message.my_answer_text = text;
        
        this.setState({poolanswer:text})
       // this.setState({pooldata:message})
    
    //this.state.customProbBetList[index].custom_pools.my_answer_text
      }
logiccheck(){
    var regex = "^\s+$" 
    if(this.state.pooldata.my_answer_type=='1')
    {
       // if(this.state.poollink.toString().trim() == '' && this.state.uploadurl=='' || this.state.pooldate=='')
       if(this.state.pooldate=='')
        {
            alert('Please enter all valid details.')
        }else{
           // alert('false')
           this.publishPool()
        }

    }else{
       // if(this.state.poolanswer.toString().trim()=='' || (this.state.poollink.toString().trim() == '' && this.state.uploadurl==''))
       if(this.state.poolanswer.toString().trim()=='')
       {
            alert('Please enter all valid details.')
        }else{
          // alert('second false')
         this.publishPool()
        }
    }
}
      publishPool() {
        //   if(this.state.pooldata.my_answer_type=='2')
        //   {
        //       if(this.state.pooldata.my_answer_text ==null || this.state.pooldata.my_answer_text =='')
        //       {
                 
        //       }else{
        //         if(this.state.poollink == '' ||this.state.poollink == null && this.state.uploadurl ==null || this.state.uploadurl =='')
        //         {
        //             alert('true condition')
        //         }else{
        //             alert('false condition')
        //         }
        //       }
        //   }
      
       
           this.setState({ loader: true });
          
          var that = this;
          var params: any = {
            'custom_pool_id': this.state.pooldata.id,
            'publish_result_text': this.state.pooldata.my_answer_type=='1'?'':this.state.poolanswer,
            'publish_result_link': this.state.uploadurl?'':this.state.poollink,
            'publish_result_date': this.state.pooldata.my_answer_type=='1'?this.state.pooldate:'',
            'publish_result_image': this.state.poollink?'':this.state.imagebase
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
              this.setState({poollink:''});
              this.setState({pooldialog:false});
           
              if (this.state.OpenPlaySwitchAccepted === true) {
                //  this.setState({ OpenPlaySwitchAccepted: false });
                  this.callMethod('2');
              }
              else {
                //  this.setState({ OpenPlaySwitchAccepted: true });
                  this.callMethod('1');
              }
    
              // this.setState({ dialogVisible: true });
           //   alert(responseJson.message);
              if (responseJson.message == "Access Expired.") {
                // AlertUtil.show("Session Expired ! Please login again");
                console.log("Footer comp ---->" + responseJson.message);
                // LogoutUtill.logoutButtonPressed(this.props);
              }
            })
            .catch(error => {
              that.setState({ pooldialog: false })
              that.setState({ loader: false });
              console.log(error);
            })
     //  }
     }
     imageZoom(url:any,callback:any){
       this.setState({imageurl:url})
       this.setState({pooldialog:false})
       this.setState({agreedialog:false})
       if(callback == '1')
       {
        this.setState({isSettle:false})
        
       }
       else
       {
        this.setState({isSettle:true})  
       }
       
        this.setState({imagezoom:true})
        //this.props.navigation?.navigate(AppScreens.G_ImageZoom,{url:this.state.uploadurl})
      }


      showDateTimePicker = () => {
        this.setState({pooldialog:false})
        this.setState({ isDateTimePickerVisible: true });
      };
    
      hideDateTimePicker = () => {
        var that = this;
        this.setState({ isDateTimePickerVisible: false });
        setTimeout(function(){that.setState({pooldialog:true})},1000) 
      };
      handleStartDatePicked = (date: any) => {
        console.log('ashish pool date : ',date)
        console.log('ashish pool data : ',JSON.stringify(this.state.pooldata))
        var formated_date = moment(date).format('MM-DD-YYYY');
         let message = [];
        message =this.state.pooldata
       // message.my_answer_date = formated_date
        this.setState({pooldate:formated_date})
        // this.setState({pooldata:message})
         this.hideDateTimePicker();
      }
     
      closeImage=()=>{
      
        var that = this;

         this.setState({ imagezoom: false })

         setTimeout(function(){

         if(that.state.isSettle)
         {
            that.setState({pooldialog:true});
         }
         else{
  
         
            that.setState({agreedialog:true})
         }
        },100)
      }
    
      showPoolResultDialog(id:any)
      {
      
          this.setState({ loader: true });
                      
      
              var params: any = {
                  'bet_id': id,
              };
      
              var formData = new FormData();
      
              for (var k in params) {
                  formData.append(k, params[k]);
              }
      
              fetch(UrlService.CONSTURI+'index.php/'+UrlService.APIVERSION3 +'/Custom_PoolGaming/custom_pool_result_publish_info', {
                  method: 'POST',
                  headers: {
                      'authorisation': this.authorisationToken
                  },
                  body: formData,
              }).then((response) => response.json())
                  .then((responseJson) => {
                      this.setState({ loader: false });
                      this.setState({ agreedata: responseJson.data });
                      console.log('Success openplay' + JSON.stringify(this.state.agreedata));
                      this.setState({ agreedialog: true });
                      if (responseJson.message == "Access Expired.") {
                          // AlertUtil.show("Session Expired ! Please login again");
                          console.log("Footer comp ---->"+responseJson.message);
                          LogoutUtill.logoutButtonPressed(this.props);
                         }
                  })
                  .catch(error => {
                      this.setState({ loader: false });
                      console.log(error);
                  })     
          
      }



      PoolBetResultAgreeDisagree(id:any,bet_status:any)
{
    this.setState({ loader: true });
var that = this;
//setTimeout(function(){that.setState({ loader: false });},4000)
        var params: any = {
            'bet_id': id,
            'bet_status':bet_status
        };
console.log('disagree parameter'+ params)
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        this.setState({ agreedialog: false });
        fetch(UrlService.CONSTURI+'index.php/'+UrlService.APIVERSION3 +'/Custom_PoolGaming/acceptor_publish_custom_pool_result', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
            //that.hideLoader()
            this.getProfile();
            if (this.state.OpenPlaySwitchAccepted === true) {
                //  this.setState({ OpenPlaySwitchAccepted: false });
                  this.callMethod('2');
              }
              else {
                //  this.setState({ OpenPlaySwitchAccepted: true });
                  this.callMethod('1');
              }
               // this.setState({ loader: false });
                //this.callMethod('2');
              //  this.setState({ DataListOfCustomResult: responseJson.data });
              //  console.log('Success openplay' + JSON.stringify(this.state.DataListOfCustomResult));
             //  console.log(responseJson.data);
               AlertUtil.show(responseJson.message);
            
               this.setState({ dialogVisible: false });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })    
}


     getDateTimeFromTimeZone(match_time_stamp:any){
    var new_time_stamp = match_time_stamp * 1000;
    var formated_time = moment(new_time_stamp).format('LT');
    var Match_date: any = new Date(new_time_stamp).toString().split(' ');

    var zonevalue: any = Match_date[6].toString();
    var zone: any = zonevalue.substr(1, zonevalue.length - 2);
    var eventdate = moment(new_time_stamp).format('MM/DD/YYYY');
        
         var dateTimeObj = { formated_time: formated_time, Match_date: Match_date, zone: zone}
        return dateTimeObj;
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
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight+ fieldHeight+ fieldHeight) || 0;
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


  cancelCustomBet() {
    
          this.setState({ textshow: false });
          this.setState({ dialogmoreprocess: false })
          this.setState({ loader: true });
         
         console.log('result by ashish', this.state.result)
        
       //   this.setState({ iscustomdialog: false })
         var that = this;
        
        var params: any = {
            'custom_prop_id': this.state.customData.id
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
            // that.setState({ loader: false });
             // that.setState({ dialogmoreprocess: false })
            // alert(responseJson.message);
            if (this.state.OpenPlaySwitchAccepted === true) {
             //  this.setState({ OpenPlaySwitchAccepted: false });
               this.callMethod('2');
           }
           else {
             //  this.setState({ OpenPlaySwitchAccepted: true });
               this.callMethod('1');
           }
             if (responseJson.message == "Access Expired.") {
               // AlertUtil.show("Session Expired ! Please login again");
               console.log("Footer comp ---->" + responseJson.message);
               // LogoutUtill.logoutButtonPressed(this.props);
             }
           })
           .catch(error => {
           //  that.setState({ iscustomdialog: false })
             that.setState({ loader: false });
             console.log(error);
           })
      
 }


 cancelPool() {
  
    this.setState({ loader: true });
          
          var that = this;
         
          var params: any = {
            'custom_pool_id': this.state.pooldata.id
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
              console.log('Success openplay' + JSON.stringify(responseJson));
              this.setState({poollink:''});
              this.setState({pooldialog:false});
           
              if (this.state.OpenPlaySwitchAccepted === true) {
                //  this.setState({ OpenPlaySwitchAccepted: false });
                  this.callMethod('2');
              }
              else {
                //  this.setState({ OpenPlaySwitchAccepted: true });
                  this.callMethod('1');
              }
    
              // this.setState({ dialogVisible: true });
           //   alert(responseJson.message);
              if (responseJson.message == "Access Expired.") {
                // AlertUtil.show("Session Expired ! Please login again");
                console.log("Footer comp ---->" + responseJson.message);
                // LogoutUtill.logoutButtonPressed(this.props);
              }
            })
            .catch(error => {
              that.setState({ pooldialog: false })
              that.setState({ loader: false });
              console.log(error);
            })
     //  }
  }
    // -----------------------------------------------Design and Design Methods---------------------------------------

    render() {
        const images =[{
   
            url: this.state.imageurl,
         
        }]
        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                showIndicator={false}
                menuIconListener={this}
                LogoIconListener={this}
                isSetting={false}
                accountNameListener={this}
                availableBalanceListener={this}
                coveredPlaysListener={this}
                openPlaysListener={this} >


                     {/* overlay ui start */}
                {UrlService.OVERLAY==0?this.state.OpenPlaySwitchAccepted == true ?<Modal visible={this.state.imageoverlay} transparent={true}>
<View style={{height:'100%', width:'100%',flex:1}}>
<SafeAreaView forceInset={{ bottom: 'never' }}>
         <ImageBackground source={require('../../../../images/bet-list-overlay.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: '100%' }}>
                                  <View  style={{  position: 'absolute',  justifyContent: 'center', bottom: '2%' ,width:'100%',alignContent:'center',alignItems:'center'}}>
                                <View style={{width:'90%',justifyContent:'space-between',flexDirection:'row'}}>
                                <Text 
                                  style={{marginTop:15,fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), textDecorationLine:  'underline',color:'#68bcbc'}}
                                   onPress={()=>{this.saveoverlay()}}
                                   >Don't show again</Text>
                                   <TouchableOpacity  onPress={()=>this.closecurrent()}>
                       <Image source={require('../../../../images/close_overlay.png')}  style={{height:50,width:50 }}></Image>
                       </TouchableOpacity>

                                </View>
                                  </View>

                                </ImageBackground>
                                </SafeAreaView>
         </View>
          
        </Modal>:null:null}
                {/* overlay ui end */}

                <View style={styles.scrollContent} >
                    <View style={styles.mainContent}>
                        <ProgressLoader
                            visible={this.state.loader}
                            isModal={true} isHUD={true}
                            hudColor={"#68bcbc"}
                            color={"#FFFFFF"} />


                             {/* --------------------------------Ashishcustom design custom prop bets UNCOVERED ACTION Dialogue --------------------------------*/}
         <Dialog
        visible={this.state.dialogmoreprocess}
          title=""
         dialogStyle={{ backgroundColor: 'white',borderRadius:4,height: 'auto' }}
          // contentStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
          onTouchOutside={() => this.setState({ dialogmoreprocess: false })} >


          <View style={{backgroundColor:'white',height:'auto'}}>
            <TouchableOpacity onPress={() => this.setState({ dialogmoreprocess: false })}>
              <View style={[styles.CloseView,]}>
                <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12 }}></Image>
              </View>
            </TouchableOpacity>
            <View style={styles.DialogHeaderMain1} >
            <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
            <Text style={styles.DialogHeaderText}> SETTLE CUSTOM BET </Text>
            </View>
                

              <View >
              {/* <View style={{ padding: 1, borderColor: '#cccccc', borderWidth: 1, marginTop: 5, }}> */}
                    <TextInput
                      multiline={true}
                      editable={false}
                       style={{fontSize:hp(2.1), fontFamily: 'Montserrat-Semibold', padding:2, width: '100%', height: 'auto' }}
                       placeholder={this.state.customData.question}
                        placeholderTextColor={'#222'}
                     />
                  {/* </View> */}
                 {/* <Text style={{padding:0,fontFamily: 'Montserrat-SemiBold',fontSize: 18,color: 'black',}}>
                  {this.state.customData.question}</Text> */}
              </View>
              <View style={{ flexDirection: 'row',justifyContent:'space-between',marginTop:10,marginBottom:10}}>
                           
                             {/* <View style={{paddingBottom:5,paddingTop:5,width:'50%'}}> */}
                            <View style={{width:'50%'}}>
                            <RadioForm
                                radio_props={[{ label: this.state.customData.my_answer + '    ', value: this.state.customData.my_answer }, { label: this.state.customData.other_answer + '    ', value: this.state.customData.other_answer }]}
                                initial={-1}
                                formHorizontal={false}
                                 labelHorizontal={true}
                                 buttonColor={'#ACACAC'}
                                 buttonSize={6}
                                 buttonOuterSize={17}
                                 selectedButtonColor={'#68bcbc'}
                                labelStyle={{color:'#222', fontSize:hp(2.4), fontFamily: 'Montserrat-Semibold'}}
                                animation={true}
                                onPress={(value) => { this.setState({ result: value }) }}
                              />
                             {this.state.textshow?<Text style={{color:'red'}}>Please Select Answer</Text>:null}
                            </View>
                             
                            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center', width:'45%'}}>
                            <TouchableOpacity style={{height: 30,width:'80%',backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center',alignItems:'center',paddingLeft:2,paddingRight:2,borderRadius:3 }} onPress={() =>{this.publishCustomBet()}} >
                                <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                  <Text style={{
                                    color: 'white',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: hp(2.1),
                                    padding: 3,
                                    textAlign:'center'
                                  }} >Settle Bet</Text>
                                </View>
                              </TouchableOpacity>

                              <TouchableOpacity style={{height: 30,width:'80%',backgroundColor: 'white',justifyContent:'center',alignContent:'center',alignItems:'center',paddingLeft:2,paddingRight:2,borderRadius:3,marginTop:5,borderWidth:1,borderColor:'#68bcbc' }}
                               onPress={() =>{this.cancelCustomBet()}} >
                                <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                  <Text style={{
                                    color: '#68bcbc',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: hp(1.8),
                                    padding: 3,
                                    textAlign:'center'
                                  }} >Cancel Bet</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                               {/* :<View style={{ width:'20%', height: '70%', backgroundColor: 'white',justifyContent:'center',alignContent:'center',borderRadius:4,alignItems:'center' }}></View>} */}
                              
                             
                        
                         
                          </View>
                          <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end',flexDirection:'row',marginTop:3}}>
                                <Text style={{
                                  fontFamily: 'Montserrat-Regular',
                                  color: 'black',
                                  fontSize: hp(1.8),
                                }} > Bet closes at </Text>
                                <Text style={{color: '#222', fontFamily: 'Montserrat-Semibold', fontSize: hp(1.8), textAlign: 'justify'}} >{this.state.betclose}</Text>
                              </View>

            </View>  
          </View>
        </Dialog>


              {/* --------------------------------Ashish design settle pool Dialogue --------------------------------*/}
              <DateTimePicker
              // onDateChange={this.setDate}
              isVisible={this.state.isDateTimePickerVisible}
              // customConfirmButtonIOS={this.handleStartDatePicked}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={this.state.minimumDate}
              mode="date"
            />
              <Modal visible={this.state.imagezoom} transparent={true}>
             <View style={styles.imageclose}>
             <TouchableOpacity style={{marginTop:20,marginRight:20}} onPress={() =>this.closeImage()}>
              <View style={[styles.CloseView,]}>
              <Icon name="close" size={20} color="white"/>
                {/* <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12,tintColor:'white' }}></Image> */}
              </View>
            </TouchableOpacity>
             </View>
                <ImageViewer
               // saveToLocalByLongPress={true}
                 imageUrls={images}/>
            </Modal>



           
              <Dialog
          visible={this.state.pooldialog}
          title=""
         dialogStyle={{ backgroundColor: '#68bcbc',borderRadius:4,height: 'auto',padding:0 }}
         contentStyle={{ padding:0, backgroundColor: '#68bcbc' }}
          onTouchOutside={() => this.setState({ pooldialog: false })} >

         <View style={{padding:0}}>
          <View style={styles.headerviewdialog}>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:wp(75)}}>
                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: hp(3), color: 'white',}}>SETTLE POOL</Text>
                <TouchableOpacity onPress={() => this.setState({ pooldialog: false })}>
              <View style={[styles.CloseView,]}>
              <Icon name="close" size={20} color="white"/>
                {/* <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12,tintColor:'white' }}></Image> */}
              </View>
            </TouchableOpacity>             
            </View>             
          </View>


          
          <View style={[styles.poolmaincontainer,{backgroundColor:'white',padding:10}]}>
              <ScrollView>
          <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>

                         <View style={{padding:0}}>
                             <View style={{maxHeight:hp(10)}}>
                             <ScrollView>

                            <Text style={{textAlign:'justify',color:'#222',fontFamily: 'Montserrat-Bold', fontSize: hp(2.1)}}>{this.state.pooldata.question}</Text>
                            </ScrollView>
                            </View>
                         <View>

                         <Text style={{textAlign:'justify',color:'black',paddingTop:3,fontSize:hp(2)}}>Result:</Text>

                                   {this.state.pooldata.my_answer_type == '1'? <View style={styles.customtextinputpool}>                        
                        <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.showDateTimePicker()}}>
                        <View style={{ width: '100%',height:hp(8), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, backgroundColor: '#eeeeee' }}>
                          
                            <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                            <Text style={[styles.datetimetext,{color:'black'}]}>{this.state.pooldate?this.state.pooldate:'Choose Date'}</Text>
                            </View>

                            <View style={styles.datetimeicon}>                            
                                <Image source={require('../../../../images/calendar.png')}
                                style={{ height: 20, width: 20, marginRight: 8 }}
                                resizeMode="contain" />                            
                            </View>

                        </View>
                        </TouchableOpacity>
                        </View>:<View style={styles.customtextinputpool}>
                        <TextInput
                            value={this.state.poolanswer}
                            clearTextOnFocus={true}
                            style={{ paddingLeft:10,height:hp(8), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                            placeholder='My answer is...'
                            placeholderTextColor={'#c3c3c3'}
                            onChangeText={(text) => { this.changeanswertext(text) }}
                            // onChangeText={(text) => { this.state.customProbBetList[index].custom_pools.my_answer_text = text }}
                            //lololololololol.o
                          // editable={this.state.customBetDate?false:true}
                            // onBlur={Keyboard.dismiss}
                          />
                            </View>}
                             </View>

                             <View>
                                    <View style={styles.customtextinputpool}>
                                    <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                                    <View style={{flexDirection:'row'}}>
                                    <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(8), flexDirection:'column'}}/>
                        <TouchableOpacity style={{ width: '100%' }} 
                        onPress={()=>{this.state.poollink?AlertUtil.show('You can either upload image or enter external link.'):this.state.uploadurl !=''?this.imageZoom(this.state.uploadurl,'2'):this.selectPhoto()}}
                          // onPress={()=>{alert('dialog photo')}}
                        >
                        <View style={{ width: '100%',height:hp(8), flexDirection: 'row', backgroundColor: 'white', }}>
                            <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                            <Text style={[styles.datetimetext,{color: 'c3c3c3'}]}>{'Upload Image Result'}</Text>
                            </View>
                            <View style={styles.datetimeicon}> 
                            {this.state.uploadurl?<View style={{marginRight:8,flexDirection:'row'}}><CircleImage width={wp(8)} imageFilePath={this.state.uploadurl} /><View style={{marginLeft:10, width:40, justifyContent:'center',alignContent:'center',alignItems:'center',padding:3}}>
                                <Icon name="close" size={20} color="black" onPress={()=>{this.setState({uploadurl:''})}}/></View></View>:<Image source={require('../../../../images/upload_image_icon.png')}
                                style={{ height: 30, width: 30, marginRight: 8 }}
                                resizeMode="contain" />}                          
                                {/* <Image source={ this.state.uploadurlstatus? { uri: this.state.uploadurl }:require('../../../../images/upload_image_icon.png')}
                                style={{ height: 30, width: 30, marginRight: 8 }}
                                resizeMode="contain" /> */}
                            
                            </View>
                        </View>
                        </TouchableOpacity>
                        <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(8), flexDirection:'column'}}/>
                        </View>
                        <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                        </View>
                             </View>

                             <View style={{ paddingTop: 10, width: '100%', paddingBottom: 10 }}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: '#cfcfcf',textAlign:'center' }}> ──────  OR  ──────</Text>
                            </View>
                            
                            <Text style={{ textAlign:'justify',fontFamily: 'Montserrat-Bold', fontSize: hp(2), color: '#888888'}}>External Link</Text>
                           
                            <View style={styles.customtextinputpool}>
                                
                            <TextInput
                                value={this.state.poollink}
                               // clearTextOnFocus={true}
                                // numberOfLines={10}  
                                editable={this.state.uploadurl == ''?true:false}
                                style={{paddingLeft:10,fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4),height:hp(8), width: '80%' }}
                                placeholder='Enter URL'
                                placeholderTextColor={'#c3c3c3'}
                                onChangeText={(text) => { this.setState({poollink:text}) }}
                                // onBlur={Keyboard.dismiss}
                                />
                            </View>
                            

                            <View style={{flexDirection:'row',width:'100%'}}>
                                    <View style={[styles.customtextinputpool1,{width:'49%'}]}>
                        {/* <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.publishPool()}}> */}
                        <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.logiccheck()}}>
                        <View style={{ width: '100%',height:hp(8), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, backgroundColor: '#68bcbc' }}>
                            <View style={{ width: '100%',justifyContent:'center',alignContent:'center' }}>
                            <Text style={{ color:'white',
            textAlign:'center',
            fontFamily: 'Montserrat-Bold',
            fontSize: hp(2.8), }}>Settle Pool</Text>
                            </View>                           
                        </View>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'2%'}}></View>
                        <View style={[styles.customtextinputpool1,{width:'49%'}]}>
                        {/* <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.publishPool()}}> */}
                        <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.cancelPool()}}>
                        <View style={{ width: '100%',height:hp(8), flexDirection: 'row', borderColor: '#68bcbc', borderWidth: 1, backgroundColor: 'white' }}>
                            <View style={{ width: '100%',justifyContent:'center',alignContent:'center' }}>
                            <Text style={{ color:'#68bcbc',
            textAlign:'center',
            fontFamily: 'Montserrat-Bold',
            fontSize: hp(2.8), }}>Cancel Pool</Text>
                            </View>                           
                        </View>
                        </TouchableOpacity>
                        </View>
                             </View>
                         </View>
                         </Animated.View>
                         </ScrollView>
                       </View>



          </View>
         
        </Dialog>
        

         {/* --------------------------------Ashish design agree and disagree UNCOVERED ACTION Dialogue --------------------------------*/}
         <Dialog
       visible={this.state.agreedialog}
          title=""
         dialogStyle={{ backgroundColor: '#68bcbc',borderRadius:4,height: 'auto',padding:0 }}
         contentStyle={{ padding:0, backgroundColor: '#68bcbc' }}
          onTouchOutside={() => this.setState({ agreedialog: false })} >

          <View style={{padding:0}}>
          <View style={styles.headerviewdialog}>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:wp(75)}}>
                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: 'white',}}>CUSTOM POOL RESULT</Text>
                <TouchableOpacity onPress={() => this.setState({ agreedialog: false })}>
              <View style={[styles.CloseView,]}>
              <Icon name="close" size={25} color="white" style={{marginBottom:5}}/>
                {/* <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12,tintColor:'white' }}></Image> */}
              </View>
            </TouchableOpacity>             
            </View>             
          </View>
          <View>
                          <View style={{backgroundColor:'white'}} >
                                        <View>
                                            <Text  style={{padding:10,fontFamily: 'Montserrat-Semibold',fontSize: hp(2.1),color: '#222',textAlign:'justify'}}>
                                            {this.state.agreedata.question}</Text>
                                            </View>
                                            <View style={{backgroundColor:'#eeeeee'}}>
                                            <Text  style={{padding:10,fontFamily: 'Montserrat-Semibold',fontSize: hp(2.1),color: 'grey',textAlign:'justify'}}>
                                              {this.state.agreedata.creator_name}</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <View style={{flexDirection:'row'}}>
                                            <Text  style={{padding:10,fontFamily: 'Montserrat-Bold',fontSize: hp(2.4),color: '#222',textAlign:'justify'}}>Result:</Text>
                                            <Text  style={{padding:10,paddingLeft:0,fontFamily: 'Montserrat-Regular',fontSize: hp(2.4),color: '#222',textAlign:'justify'}}>
                                            {this.state.agreedata.result}</Text>
                                            </View>
                                            </View>
                                            <View>
                                   {this.state.agreedata.result_type=='1'?<View style={[styles.customtextinputpool]}>
                                   <TextInput
                                value={this.state.agreedata.external_link}
                                clearTextOnFocus={true}
                                // numberOfLines={10}  
                                editable={false}
                                style={{paddingLeft:10,fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4),height:hp(8), width: '80%',color:'black' }}
                                placeholder='Enter URL'
                                placeholderTextColor={'#c3c3c3'}
                               // onChangeText={(text) => { this.setState({poollink:text}) }}
                                // onBlur={Keyboard.dismiss}
                                />
                                   </View> :<View style={[styles.customtextinputpool,{padding:10,backgroundColor:'white'}]}>
                                    <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                                    <View style={{flexDirection:'row'}}>
                                    <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(8), flexDirection:'column'}}/>
                        <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.imageZoom(this.state.agreedata.result_image,'1')}}>
                        <View style={{ width: '100%',height:hp(8), flexDirection: 'row', backgroundColor: 'white', }}>
                            <View style={{ width: '90%',justifyContent:'center',alignContent:'center' }}>
                            <Text style={[styles.datetimetext,{color: 'black'}]}>{'Uploaded Image Result'}</Text>
                            </View>
                            <View style={styles.datetimeicon}> 
                            <View style={{marginRight:8}}><CircleImage width={wp(10)} imageFilePath={this.state.agreedata.result_image} /></View>
                            </View>
                        </View>
                        </TouchableOpacity>
                        <Dash dashColor={'#cfcfcf'} style={{width:1, height:hp(8), flexDirection:'column'}}/>
                        </View>
                        <Dash dashColor={'#cfcfcf'} style={{width:'100%'}}/>
                        </View>}
                             </View>

                             <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}}>  
                                                                <TouchableOpacity style={{width:wp(24)}} onPress={() => { this.PoolBetResultAgreeDisagree(this.state.agreedata.bet_id,2)}} >
                                            <View style={{ borderRadius:3, height:50,alignItems: 'center', backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center'}}>  
                                         <Text style={{
                                            color: 'white',  
                                            fontFamily: 'Montserrat-Bold',
                                                fontSize: hp(2.1),
                                              
                                                 padding:3
                                                       }} >Disagree</Text>  
                                                 </View>  
                                             </TouchableOpacity>  
                                              <TouchableOpacity style={{width:wp(24),marginLeft:5}} onPress={() => { this.PoolBetResultAgreeDisagree(this.state.agreedata.bet_id,1) }} >
                                              <View style={{ borderRadius:3, height:50,alignItems: 'center', backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center'}}>  
                                           <Text style={{
                                               color: 'white',  
                                               fontFamily: 'Montserrat-Bold',
                                               
                                               fontSize: hp(2.1),
                                                  padding:3
                                                     }} >Agree</Text>  
                                                  </View>  
                                           </TouchableOpacity>                
                                      </View> 

                           </View>
          </View>
              </View>
        </Dialog> 

              {/* --------------------------------Ashish design agree and disagree UNCOVERED ACTION Dialogue --------------------------------*/}
                                                    <Dialog
                                                visible={this.state.dialogVisible}
                                                title=""
                                                dialogStyle={{ backgroundColor: 'white',borderRadius:4 }}
                                                // contentStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
                                                onTouchOutside={() => this.setState({ dialogVisible: false })} >


                                    <View style={styles.DialogMain}>
                                        <TouchableOpacity onPress={() => this.setState({ dialogVisible: false })}>
                                        <View style={[styles.CloseView,]}>
                                            <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12 }}></Image>
                                        </View>
                                        </TouchableOpacity>

                                            <View style={styles.DialogHeaderMain1} >
                                        <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                        <Text style={styles.DialogHeaderText}> CUSTOM PROP BET </Text>
                                        </View>
                                            

                                        <View >
                                            <Text style={{padding:0,fontFamily: 'Montserrat-SemiBold',fontSize: hp(2.1),color: '#222',textAlign:'center'}}>
                                            {this.state.DataListOfCustomResult.question}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row',marginTop:4 ,alignContent:'center',alignItems:'center'}}>
                                        <View style={[styles.cardtext]}>
                                            <Text style={{color:'#222',fontFamily: 'Montserrat-SemiBold',fontSize:hp(2.2)}}>{this.state.DataListOfCustomResult.creator_name}{'\n'}</Text>
                                                <Text style={{textAlign:'justify',fontFamily: 'Montserrat-SemiBold',fontSize:hp(2.2)}}>Result: <Text style={{color:'#08868a'}}> {this.state.DataListOfCustomResult.result}</Text></Text>
                                            </View>          
                                        </View>
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10}}>  
                                                                <TouchableOpacity style={{width:wp(24)}} onPress={() => { this.customBetResultAgreeDisagree(this.state.DataListOfCustomResult.bet_id,2) }} >
                                            <View style={{  height:50,alignItems: 'center', backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center'}}>  
                                         <Text style={{
                                            color: 'white',  
                                            fontFamily: 'Montserrat-Bold',
                                                fontSize: hp(2.1),
                                               borderRadius:3,
                                                 padding:3
                                                       }} >Disagree</Text>  
                                                 </View>  
                                             </TouchableOpacity>  
                                              <TouchableOpacity style={{width:wp(24),marginLeft:5}} onPress={() => { this.customBetResultAgreeDisagree(this.state.DataListOfCustomResult.bet_id,1) }} >
                                              <View style={{  height:50,alignItems: 'center', backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center'}}>  
                                           <Text style={{
                                               color: 'white',  
                                               fontFamily: 'Montserrat-Bold',
                                               borderRadius:3,
                                               fontSize: hp(2.1),
                                                  padding:3
                                                     }} >Agree</Text>  
                                                  </View>  
                                           </TouchableOpacity>                
                                      </View>        

                                        </View>
                                    </View>
                                    </Dialog>


                                                                  <Dialog
                                                                            style={{backgroundColor:'#fff'}}
                                                                            //visible={this.state.dialogVisible}
                                                                            title=""
                                                                            dialogStyle={{ maxHeight: '90%' }}
                                                                            contentStyle={{ maxHeight: '90%'}}
                                                                            onTouchOutside={() => this.setState({ dialogVisible: false })} >


                                                                            <View style={styles.DialogMain1}>
                                                                                <TouchableOpacity onPress={() => this.setState({ dialogVisible: false })}>
                                                                                <View style={[styles.CloseView,]}>
                                                                                    <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12 }}></Image>
                                                                                </View>
                                                                                </TouchableOpacity>

                                                                                <View style={styles.DialogHeaderMain} >

                                                                                <Text style={styles.DialogHeaderText}> CUSTOM PROP BETS </Text>

                                                                                {/* <Text>{JSON.stringify(this.state.DataListOfCustomResult)} </Text> */}
                                                                                    
                                                                                
                                                                                    <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}} >
                                                                                    <View style={[styles.resultcontainer1]}>
                                                                                    {/* <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                                                                        <Text style={{textAlign:'center',color: 'black', fontFamily: 'Montserrat-bold', fontSize: hp(2)}}>
                                                                                        MATCH UP
                                                                                        </Text>
                                                                                    </View> */}
                                                                                    {/* <View style={{flexDirection:'row',marginTop:12,marginBottom:8}}>  
                                                                                    <TouchableOpacity style={{width:wp(38)}} >
                                                                                    <View style={{  alignItems: 'center', backgroundColor: '#08868a',justifyContent:'center',alignContent:'center'}}>  
                                                                                            <Text style={{
                                                                                            color: 'white',  
                                                                                            fontSize: 15 ,
                                                                                            padding:3
                                                                                            }} >{this.state.DataListOfCustomResult.home_team_name}</Text>  
                                                                                        </View>  
                                                                                        </TouchableOpacity>  
                                                                                        <TouchableOpacity style={{width:wp(38),marginLeft:2}} >
                                                                                        <View style={{  alignItems: 'center', backgroundColor: '#08868a',justifyContent:'center',alignContent:'center'}}>  
                                                                                            <Text style={{
                                                                                            color: 'white',  
                                                                                            fontSize: 15 ,
                                                                                            padding:3
                                                                                            }} >{this.state.DataListOfCustomResult.away_team_name}</Text>  
                                                                                        </View>  
                                                                                        </TouchableOpacity>                
                                                                                    </View> */}
                                                                                    <View style={{padding:15,width:wp(78)}}>
                                                                                        <Text style={{textAlign:'center',fontFamily: 'Montserrat-bold',fontSize:hp(2.2)}}>
                                                                                       {this.state.DataListOfCustomResult.question}
                                                                                        </Text>
                                                                                    </View>
                                                                                    <View style={[styles.cardtext]}>
                                                                                        <Text style={{textAlign:'justify',fontFamily: 'Montserrat',fontSize:hp(2.2)}}>{this.state.DataListOfCustomResult.creator_name}{'\n'}</Text>
                                                                                        <Text style={{textAlign:'justify',fontFamily:'Montserrat',fontSize:hp(2.2),fontWeight:'bold'}}>Result: <Text style={{color:'#08868a'}}> {this.state.DataListOfCustomResult.result}</Text></Text>
                                                                                    </View>
                                                                                    
                                                                                    </View>
                                                                                
                                                                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>  
                                                                                    <TouchableOpacity style={{width:wp(22),paddingTop:25,paddingBottom:25}} onPress={() => { this.customBetResultAgreeDisagree(this.state.DataListOfCustomResult.bet_id,1) }} >
                                                                                    <View style={{  height:40,alignItems: 'center', backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center'}}>  
                                                                                            <Text style={{
                                                                                            color: 'white',  
                                                                                            fontSize: hp(1.4),
                                                                                            padding:3
                                                                                            }} >Agree</Text>  
                                                                                        </View>  
                                                                                        </TouchableOpacity>  
                                                                                        <TouchableOpacity style={{width:wp(22),marginLeft:2,paddingTop:25,paddingBottom:25}} onPress={() => { this.customBetResultAgreeDisagree(this.state.DataListOfCustomResult.bet_id,2) }} >
                                                                                        <View style={{  height:40,alignItems: 'center', backgroundColor: '#67d5cf',justifyContent:'center',alignContent:'center'}}>  
                                                                                            <Text style={{
                                                                                            color: 'white',  
                                                                                            fontSize: hp(1.4),
                                                                                            padding:3
                                                                                            }} >Disagree</Text>  
                                                                                        </View>  
                                                                                        </TouchableOpacity>                
                                                                                    </View>


                                                                                    </View>
                                                                                    
                                                                                
                                                                                </View>
                                                                            </View>
                                                                            </Dialog>




                        <View style={{ flex: 1 }}>
                            <View style={{ flexShrink: 1, backgroundColor: 'white', height: '90%' }}>



                                <View style={styles.NameHeaderContainer}>
                                    <View style={{ width: '55%' }}>
                                        <Text style={styles.NameStyle}>YOUR BETS</Text>
                                    </View>
                                    <View style={{ width: '45%', alignItems: 'center', flexDirection: 'row', }}>

                                        <View style={{ width: 'auto', height: 'auto', }}>
                                            <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPlaySwitchAccepted == false ? 'black' : '#888888', textAlign: 'right' }}>Sportsbook</Text>
                                            {/* <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPlaySwitchAccepted == false ? 'black' : '#888888', textAlign: 'right' }}>Bets</Text> */}
                                        </View>

                                        <TouchableWithoutFeedback onPress={() => { this.OpenPlaySwitchValueChanged() }}>
                                            <Image source={this.state.OpenPlaySwitchAccepted == true ? require('../../../../images/toggle_on_G.png') : require('../../../../images/toggle-off-button.png')}
                                                style={{ height: 20, width: 40 }}
                                                resizeMode="contain"></Image>
                                        </TouchableWithoutFeedback>


                                        <View style={{ width: 'auto', height: 'auto', }}>
                                            <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPlaySwitchAccepted == true ? 'black' : '#888888', textAlign: 'left' }}>Private</Text>
                                            <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPlaySwitchAccepted == true ? 'black' : '#888888', textAlign: 'left' }}>Bets</Text>
                                        </View>

                                    </View>



                                </View>

                                <View style={[styles.titleContainer]} >
                                    <View style={{ width: '100%', height: 35, backgroundColor: '#666666', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                                        <View style={{ width: '38%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), fontFamily: 'Montserrat-Bold', textAlign: 'center' }}>
                                                MATCH UP
                                            </Text>
                                        </View>
                                        <View style={{ width: '16%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>
                                                AMOUNT {"\n"} BET
                                            </Text>
                                        </View>
                                        <View style={{ width: '22%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold', }}>
                                                LINE
                                            </Text>
                                        </View>
                                        <View style={{ width: '24%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold', }}>
                                                AMOUNT TO {"\n"} WIN
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {this.state.DataList.length > 0 ?
                                    <FlatList
                                        data={this.state.DataList}
                                        extraData={this.state}
                                        keyExtractor={(item: any, index) => index.toString()}
                                        bounces={false}
                                        renderItem={({ item, index }: any) => {
                                            var data_index = index;
                                           

                                            return (

                                                <View style={{ backgroundColor: 'white' }}>

                                                    {/* --------------------- Game Header ---------------- */}
                                                    <View style={styles.gameheader}>
                                                        <View style={{ width: '90%', flexDirection: 'row', }}>
                                                            <View>
                                                                <Text style={styles.gameheadertext} >
                                                                    {item.date_label}
                                                                </Text>
                                                            </View>
                                                        </View>

                                                        {/* <View style={{ width: '10%' }}>
                                                            <Text style={styles.gamecounttext}>( {item.bet_count} )</Text>
                                                        </View> */}
                                                    </View>

                                                    {/* --------------------- Games Arrray ---------------- */}
                                                    <FlatList
                                                        data={item.game_array}
                                                        extraData={this.state}
                                                        keyExtractor={(item: any, index) => index.toString()}
                                                        renderItem={({ item, index }: any) => {
                                                            var index2 = index;
                                                            var Sport_league = item.league_id;

                                                            return (
                                                                <View>
                                                                    <View style={[styles.gamedatetimecontainer, { flexDirection: 'row' }]}>

                                                                        <View style={{ paddingLeft: 5, paddingRight: 10, justifyContent: "center"}}>
                                                                            <Image source={{ uri: item.sport_icon }} style={{ height: 15, width: 15 }} tintColor='white'/>
                                                                        </View>

                                                                        <Text style={styles.datetext} >
                                                                            {item.sport_name}

                                                                        </Text>
                                                                    </View>

                                                                    {/* --------------------- dates Arrray and beted matches row ---------------- */}
                                                                    <FlatList
                                                                        data={item.game_array}
                                                                        extraData={this.state}
                                                                        keyExtractor={(item: any, index) => index.toString()}
                                                                        renderItem={({ item, index }: any) => {
                                                                            var date_array_index = index;
                                                                            var sign_spread_home: any;
                                                                            var sign_spread_away: any;
                                                                            var index3 = index;
                                                                            var dateTimeObj: any;
                                                                            if (item.bet_odds_type == 'PS') {
                                                                                sign_spread_home = item.home.ps_home_spread.split(' ');
                                                                                sign_spread_away = item.away.ps_away_spread.split(' ');
                                                                            }
                                                                            if(item.ttype=='c'){
                                                                                dateTimeObj = this.getDateTimeFromTimeZone(item.bet_expired_on_time_stamp);
                                                                                console.log('mytimeObj', dateTimeObj);
                                                                            }else if (item.ttype == 'o') {
                                                                                dateTimeObj = this.getDateTimeFromTimeZone(item.match_time_stamp);
                                                                                console.log('mytimeObj', dateTimeObj);
                                                                            } else if (item.ttype == 'p') {
                                                                                dateTimeObj = this.getDateTimeFromTimeZone(item.match_time_stamp);
                                                                                console.log('mytimeObj', dateTimeObj);
                                                                            } 
                                                                            return (
                                                                                <View>
                                                                                    {item.ttype == 'c' && <View style={[styles.timecontainer]}>
                                                                                        <Text style={[styles.betclosetext]} >Bet closes at 
                                                                                        <Text style={[styles.daystext]}> {dateTimeObj.Match_date[0]}</Text>
                                                                                            <Text style={[styles.timetext]}> {dateTimeObj.Match_date[1]} {dateTimeObj.Match_date[2]} {dateTimeObj.formated_time} {dateTimeObj.zone} </Text>
                                                                                        </Text>
                                                                                        
                                                                                    </View>}
                                                                                    {item.ttype == 'o' && <View style={[styles.timecontainer]}>
                                                                                        <Text style={[styles.daystext]}> {dateTimeObj.Match_date[0]}<Text style={[styles.timetext]}> {dateTimeObj.Match_date[1]} {dateTimeObj.Match_date[2]} {dateTimeObj.formated_time} {dateTimeObj.zone} </Text>
                                                                                       </Text>
                                                                                         

                                                                                    </View>}
                                                                                    {item.ttype == 'p' &&  <View style={[styles.timecontainer]}>
                                                                                        <Text style={[styles.daystext]}> {dateTimeObj.Match_date[0]}<Text style={[styles.timetext]}> {dateTimeObj.Match_date[1]} {dateTimeObj.Match_date[2]} {dateTimeObj.formated_time} {dateTimeObj.zone} </Text>
                                                                                        </Text>


                                                                                    </View>}
                                                                                    <View style={styles.gamelistcontainer}>
                                                                                        <TouchableWithoutFeedback>
                                                                                            <View style={styles.gamelistindexcontainer}>
                                                                                                <Text style={[styles.indextext]}> {item.data_index + 1} </Text>
                                                                                            </View>
                                                                                        </TouchableWithoutFeedback>

                                                                                        {item.ttype == 'o' ?
                                                                                            <View style={styles.gamelistteamcontainer}>

                                                                                                <View style={[styles.gamelistteam1container, { position: 'relative' }]}>

                                                                                                    <View style={styles.gamelistmatchup}>
                                                                                                        <Text style={[styles.teamtitletext, { color: item.away.is_bet_team == 'true' ? '#68bcbc' : '#888888' }]}> {Sport_league == '2' || Sport_league == '4' ? item.away.t : item.away.t} </Text>
                                                                                                    </View>


                                                                                                    <View style={item.away.is_bet_team == 'true' ? styles.gamelistamountbet : styles.gamelistamountbetteam2}>
                                                                                                        {item.away.is_bet_team == 'true' ? <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} /> : null}
                                                                                                        <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.away.is_bet_team == 'true' ? parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</Text>
                                                                                                    </View>

                                                                                                    <View style={item.away.is_bet_team == 'true' ? styles.gamelistline : styles.gamelistlineteam2}>

                                                                                                        {item.bet_odds_type == 'ML' ?
                                                                                                            <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(item.away.ml_away_price > 0 ? '+' : item.away.ml_away_price == 0 || item.away.ml_away_price == 'N/A'  ? '' : '-') +item.away.ml_away_price == 'N/A'? item.away.ml_away_price:Math.abs(item.away.ml_away_price)} </Text>
                                                                                                            :
                                                                                                            item.bet_odds_type == 'T' ?
                                                                                                                <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.away.total}</Text>
                                                                                                                :
                                                                                                                <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(sign_spread_away[0] > 0 ? '+' : '') + item.away.ps_away_spread}</Text>
                                                                                                        }

                                                                                                    </View>

                                                                                                </View>
                                                                                                {item.ml_draw_price && <View style={[{ flexDirection: 'row', position: 'absolute', top: '35%', width: '100%', left: '40%', height: '33%', zIndex: 1, }]}>



                                                                                                    <View style={[item.draw.is_bet_team == 'true' ? styles.gamelistamountbet : styles.gamelistamountbetteam2, { width: '30%' }]}>
                                                                                                        {item.draw.is_bet_team == 'true' ? <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} /> : null}
                                                                                                        <Text style={item.draw.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.draw.is_bet_team == 'true' ? parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</Text>
                                                                                                    </View>

                                                                                                    <View style={[item.draw.is_bet_team == 'true' ? styles.gamelistline : styles.gamelistlineteam2, { width: '31%' }]}>

                                                                                                        {item.bet_odds_type == 'ML' &&
                                                                                                            <Text style={[item.draw.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext, { textAlign: 'center' }]}>D {(item.draw.ml_draw_price > 0 ? '+' : item.draw.ml_draw_price == 0 ? '' : '-') + Math.abs(item.draw.ml_draw_price)}</Text>


                                                                                                        }

                                                                                                    </View>

                                                                                                </View>}

                                                                                                <View style={[styles.gamelistteam2container]}>

                                                                                                    <View style={styles.gamelistmatchupteam2}>
                                                                                                        <Text style={[styles.team2titletext, { color: item.home.is_bet_team == 'true' ? '#68bcbc' : '#888888' }]}> {Sport_league == '2' || Sport_league == '4' ? item.home.t : item.home.t} </Text>
                                                                                                    </View>

                                                                                                    <View style={item.home.is_bet_team == 'true' ? styles.gamelistamountbet : styles.gamelistamountbetteam2}>
                                                                                                        {item.home.is_bet_team == 'true' ? <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} /> : null}
                                                                                                        <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.home.is_bet_team == 'true' ? parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</Text>
                                                                                                    </View>

                                                                                                    <View style={item.home.is_bet_team == 'true' ? styles.gamelistline : styles.gamelistlineteam2}>

                                                                                                        {item.bet_odds_type == 'ML' ?
                                                                                                            <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(item.home.ml_home_price > 0 ? '+' : item.home.ml_home_price == 0 || item.home.ml_home_price == 'N/A' ? '' : '-') +item.home.ml_home_price == 'N/A' ? item.home.ml_home_price:Math.abs(item.home.ml_home_price)}</Text>
                                                                                                            :
                                                                                                            item.bet_odds_type == 'T' ?
                                                                                                                <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.home.total} </Text>
                                                                                                                :
                                                                                                                <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(sign_spread_home[0] > 0 ? '+' : '') + item.home.ps_home_spread} </Text>
                                                                                                        }

                                                                                                    </View>

                                                                                                </View>
                                                                                               

                                                                                            </View>
                                                                                            :
                                                                                            <View style={styles.gamelistteamcontainer}>

                                                                                                <View style={[styles.QuestionContainer]}>
                                                                                                    <Text style={styles.Quetitletext}> {item.question} </Text>
                                                                                                </View>

                                                                                                <View style={styles.gamelistteam2container}>
                                                                                                        {item.ttype == 'p'?
                                                                                                    <View style={[styles.gamelistmatchupteam2, { backgroundColor: '#888888' }]}>
                                                                                                        <Text style={styles.Proptitletext}> PROP BET  </Text>
                                                                                                    </View>
                                                                                                    :null}
                                                                                                    
                                                                                                        { item.ttype != 'p' && item.result_status==''?
                                                                                                    <View style={[styles.gamelistmatchupteam2, { backgroundColor:item.creator_index=='0'? 'white':'#888888' }]}>
                                                                                                        <TouchableWithoutFeedback onPress={()=>{item.creator_index=='0'?item.ttype == 'cp'?this.getCreatePoolList(item):this.getCustomProbBetList(item):null}}>
                                                                                                        {/* <TouchableWithoutFeedback onPress={()=>{this.setState({customData:item ,dialogmoreprocess: true })}}> */}
                                                                                                    <Text style={[styles.Proptitletext,{textAlign:'center',color:item.creator_index=='0'?'#f26522':'white',textDecorationLine:item.creator_index=='0'?'underline':'none',fontSize:item.ttype == 'cp'?hp(1.2):hp(1.2)}]}>{item.ttype == 'cp'?'SETTLE POOL':'SETTLE CUSTOM BET'} </Text>
                                                                                                    {/* <Text style={[styles.Proptitletext,{color:'orange'}]}> CUSTOM PROP BET  </Text> */}
                                                                                                    </TouchableWithoutFeedback>
                                                                                                     </View>
                                                                                                     : null}
                                                                                                      { item.ttype != 'p' && item.result_status=='FINAL'?
                                                                                                     <View style={[styles.gamelistmatchupteam2, { backgroundColor: '#fff' }]}>
                                                                                                         <TouchableWithoutFeedback onPress={() => {item.ttype == 'cp'? this.showPoolResultDialog(item.bet_id):this.showCustomBetResultDialog(item.bet_id)}}>
                                                                                                        <Text style={[styles.Proptitletext, { textAlign:'center', color:    '#f26522' , textDecorationLine:  'underline' ,fontSize:item.ttype == 'cp'?hp(1.2):hp(1.2)  }]}>
                                                                                                        {item.ttype == 'cp'?'SETTLE POOL':'SETTLE CUSTOM BET'}
                                                                                                            </Text>
                                                                                                        </TouchableWithoutFeedback>
                                                                                                   
                                                                                                     </View>:null
                                                                                                     
                                                                                                        }
                                                                                                       
                                                                                                        
                                                                                                    

                                                                                                   

                                                                                                    <View style={styles.gamelistamountbet}>
                                                                                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                            <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 10, width: 10, marginRight: 3 }} />
                                                                                                            <Text style={styles.teamoddstext}>{parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                                                                                                        </View>
                                                                                                    </View>

                                                                                                    <View style={styles.gamelistline}>
                                                                                                        {item.ttype == 'p' ?
                                                                                                            <Text style={styles.teamoddstext}> {item.bet_team_type == 'under' ? 'U' : 'O'} {item.total}<Text style={{ fontFamily: 'Montserrat-SemiBold' }}> ({item.line})</Text> </Text>
                                                                                                            :
                                                                                                            item.ttype=='cp'?null: <Text style={styles.teamoddstext}> {item.ttype !='c'?item.line:''} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{item.odds} </Text> </Text>
                                                                                                            // <Text style={styles.teamoddstext}> {item.ttype !='c'?item.line:''} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>{item.ttype !='c'?'ML':''} </Text> </Text>
                                                                                                        }


                                                                                                    </View>

                                                                                                </View>

                                                                                            </View>
                                                                                        }
                                                                                                        {/* --------------------------------Ashish design custom result UNCOVERED ACTION Dialogue --------------------------------*/}
                                                                          

                                                                                        {/* {
                                                                                            

                                                                                            <Dialog style={{backgroundColor:'#fff'}}
                                                                                            visible={this.state.dialogVisible}
                                                                                            title="Custom prob bet result"
                                                                                            onTouchOutside={() => this.setState({dialogVisible: false})} >
                                                                                            <View>
                                                                                               <Text>{JSON.stringify(this.state.DataListOfCustomResult)} </Text>
                                                                                            </View>

                                                                                            <TouchableOpacity onPress={() => { this.customBetResultAgreeDisagree(this.state.DataListOfCustomResult.bet_id,2) }}>
                                                                                                    <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>Disagree</Text>
                                                                                                </TouchableOpacity>

                                                                                                <TouchableOpacity onPress={() => { this.customBetResultAgreeDisagree(this.state.DataListOfCustomResult.bet_id,1) }}>
                                                                                                    <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>Agree</Text>
                                                                                                </TouchableOpacity>
                                                                                           
                                                                                            </Dialog>




                                                                                        } */}
                                                                                        <View style={styles.gamelisttotalcontainer}>
                                                                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                            {/* { item.ttype=='cp'?null: */}
                                                                                            <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 10, width: 10, marginRight: 3 }} />
                                                                                            { item.ttype=='cp'? <Text style={styles.teamtotaltext}> {parseInt(item.pool_amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } </Text>
                                                                                            
                                                                                            : 
                                                                                            <Text style={styles.teamtotaltext}>{parseInt(item.amount_to_win).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") } </Text>
                                                                                            }
                                                                                            </View>
                                                                                            { item.ttype=='cp'? <View style={{ marginRight: 2 }}>
                                                                                                    <TouchableWithoutFeedback onPress={() => { this.blackdialogOpen(item, data_index, index2, index3) }}>
                                                                                                        <Image ref={ref => item.touchable = ref} source={require('../../../../images/Bet_Share.png')} style={{ height: 15, width: 15 }} resizeMode='contain' />
                                                                                                    </TouchableWithoutFeedback>
                                                                                                </View>:item.bet_type == 2 ?
                                                                                                
                                                                                                <View style={{ marginRight: 2 }}>
                                                                                                    <TouchableWithoutFeedback onPress={() => { this.blackdialogOpen(item, data_index, index2, index3) }}>
                                                                                                        <Image ref={ref => item.touchable = ref} source={require('../../../../images/Bet_Share.png')} style={{ height: 15, width: 15 }} resizeMode='contain' />
                                                                                                    </TouchableWithoutFeedback>
                                                                                                </View>
                                                                                                : 
                                                                                                null
                                                                                            }

<View style={{ marginRight: 2 }}>
                                                                                                 
                                                                                            </View>
                                                                                        </View>
                                                                                        {item.BlackDialog == true ? this.getblackDialog(item.touchable ? item.touchable:null) : null}
                                                                                    </View>
                                                                                </View>
                                                                            )
                                                                        }
                                                                        } />
                                                                </View>
                                                            )
                                                        }} />
                                                </View>
                                            )
                                        }} />
                                    :
                                    <View style={styles.OtherTextContainer}>
                                        <View style={styles.OtherTextSubContainer}>
                                            <Text style={styles.UnderConstText}>You haven't placed</Text>
                                            <Text style={styles.UnderConstText}>a bet yet.</Text>
                                            <Text style={[styles.DescText, { marginTop: 15 }]}>Go to your favorite sport/team </Text>
                                            <Text style={styles.DescText}>to start betting. </Text>
                                        </View>
                                    </View>
                                }

                            </View>

                            <View style={{ height: '10%', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'white' }}>
                                <TouchableOpacity onPress={() => { this.gotoBetHistory() }}>
                                    <Text style={{ color: '#f26522', fontSize: hp(1.9), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}>BET HISTORY</Text>
                                </TouchableOpacity>
                            </View>
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
    updateProfileRequestStatus: state.serviceReducer.requestStatus,
    updateProfileResponse: state.serviceReducer.response,
    updateProfileError: state.serviceReducer.error,
    getProfileRequestStatus: state.serviceReducer.requestStatus,
    getProfileResponse: state.serviceReducer.response,
    getProfileError: state.serviceReducer.error,
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners

    

})



export default connect(mapStateToProps)(G_GamingBetView);