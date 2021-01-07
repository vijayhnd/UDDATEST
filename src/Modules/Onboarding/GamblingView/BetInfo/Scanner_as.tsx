
 
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
        this.setState({loader:false});
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          // this.logoutButtonPressed();
          LogoutUtill.logoutButtonPressed(this.props);
        }else
       {
         console.log('scanner api data ', responseJson)
//alert(UrlService.APPVERSION_iOS +'>>>>'+ responseJson.data.ios_version);
       
      }
        

      })
      .catch(error => {
        AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
        console.log(error);
      })
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  
    render() {

        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={false}
                isSubHeader={false}
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

       <QRCodeScanner
     //  reactivate={true}
         onRead={this.onSuccess}
        //  flashMode={RNCamera.Constants.FlashMode.torch}
         topContent={
           <Text style={styles.centerText}>
             Go to{' '}
             <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
             your computer and scan the QR code.
           </Text>
         }
         bottomContent={
           <TouchableOpacity onPress={()=>{this.props.navigation?.goBack(null)}} style={styles.buttonTouchable}>
             <Text style={styles.buttonText}>OK. Got it!</Text>
           </TouchableOpacity>
         }
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