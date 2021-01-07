
 
import React, { ReactInstance } from "react";
import { View, Text, Image, ScrollView, AsyncStorage,Linking, TextInput, FlatList, Modal, Animated, Dimensions, UIManager, Keyboard, TouchableWithoutFeedback, Share, TouchableOpacity, BackHandler, ImageBackground, Alert } from "react-native";
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Container from '../../../../Components/Container';
import { AppEventsLogger } from 'react-native-fbsdk';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import Application from "../../../../Entities/Application";
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
import Iconse from 'react-native-vector-icons/AntDesign';
import BigButton from "../../../../Components/Button/BigButton";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
const { State: TextInputState } = TextInput;

const ProfilePageContent = {
    key: 'somethun',
    page_title: 'OPEN PLAYS',
}

interface G_BetInfoViewProps extends AppValidationComponentProps {
  
    getProfileRequestStatus?: ServiceRequestStatus
    getProfileResponse?: GetProfileResponse
    getProfileError?: UDDAError
    serviceKey?: string
    listeners?: any
}

interface G_BetInfoViewState extends AppValidationComponentState {
  loader:any;
}


const bottom_initial = 0;
class G_BetInfo extends AppValidationComponent<G_BetInfoViewProps, G_BetInfoViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    private referralservice = new ReferralService();
    private serviceRequestInProgress = false
    public keyboardDidShowSub: any;
    public keyboardDidHideSub: any;
    private Answer: any
    private NewAnswer: any
    private AnswerShow: any
    private NewAnswerShow: any
    private New: any
    private NewShow: any
    constructor(props: G_BetInfoViewProps) {
        super(props);
        this.state = {
          loader: false

        };
    }

  onSuccess = e => {
    var that = this;
    this.setState({loader:true});
    //alert(e.data)
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/qr_code_scan_bet_details?short_url='+e.data, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
    }).then((response) => response.json())
      .then((responseJson) => {
       
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // this.logoutButtonPressed();
          this.setState({loader:false});
          LogoutUtill.logoutButtonPressed(this.props);
        }else
       {
         console.log('scanner api data ', responseJson)
         var that = this;
         if(responseJson.error =='1')
         {

          AlertUtil.showSingleActionMessage(responseJson.message,function(){
            that.setState({loader:false});
            that.props.navigation?.goBack(null)
            
          })
         }
         else{

          this.setState({loader:false});
        //alert(UrlService.APPVERSION_iOS +'>>>>'+ responseJson.data.ios_version);
       Application.sharedApplication().DeeplinkName = responseJson.data.type;
        Application.sharedApplication().EncId = responseJson.data.encrypted_action_id;
       if (responseJson.data.type == 'custombet/') {
        that.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }
        else if (responseJson.data.type == 'poolbet/'  ) {
          //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
          that.props.navigation!.navigate(AppScreens.G_PrivateBetView);
        }else if ( responseJson.data.type == 'customsquare/' ) {
          // this.props.navigation!.navigate(AppScreens.G_ImageZoom);
          that.props.navigation!.navigate(AppScreens.G_AcceptSquare);
         }
         else if (responseJson.data.type == 'bingo') {
          //this.setState({aceeptoverlay:false});
          //this.props.navigation!.navigate(AppScreens.G_ImageZoom);
          
          that.props.navigation!.navigate(AppScreens.G_AcceptBingo);
        }
         }
      }
        

      })
      .catch(error => {
        this.setState({loader:false});
        AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
        console.log(error);
      })
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  accountNameTapped() {
   
    this.props.navigation!.navigate(AppScreens.G_ProfileView);
    
  }

  iconDidTapped() {
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
  }

  availableBalanceTapped() {
    // this.props.navigation!.navigate(AppScreens.G_InfochartView);
  }

  openPlaysTapped() {
   
    // this.props.navigation!.navigate(AppScreens.G_UddaContests);
    RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
    
  }

  ContesetJoinTapped() {
   
    this.props.navigation!.navigate(AppScreens.G_UddaContests);
    
  }
  coveredPlaysTapped() {
    
    this.props.navigation!.navigate(AppScreens.G_GamingBetView);
    
  }
  LogoiconDidTapped() {
   // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
   RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
  }
    render() {

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
                  <ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />

      <View style={{flexDirection:'row',}} >
      <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'20%' ,height:40}}>
              <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 5 ,marginTop:3}}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>

              <View style={{ alignContent: 'flex-start', alignItems: 'flex-start', width:'80%' }}>
                <Text style={[styles.customheadtext,{color:'#68bcbc'}]}>Scan QR Code To Join Contest</Text>
              </View>
   
      </View>
      <QRCodeScanner
     ///  reactivate={true}
         onRead={this.onSuccess}
        //  flashMode={RNCamera.Constants.FlashMode.torch}
        //  topContent={
        //    <Text style={styles.centerText}>
        //       {' '}
        //      <Text style={styles.textBold}>Scan</Text> QR code To Join Contest
        //    </Text>
        //  }
        //  bottomContent={
        //    <TouchableOpacity onPress={()=>{this.props.navigation?.goBack(null)}} style={styles.buttonTouchable}>
        //      <Text style={styles.buttonText}>OK. Got it!</Text>
        //    </TouchableOpacity>
        //  }
       />
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



export default connect(mapStateToProps)(G_BetInfo);