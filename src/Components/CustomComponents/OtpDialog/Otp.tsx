
import React, { Component } from "react";
import { View, ScrollView,TextInput, Text,AppState,Keyboard,Dimensions, AsyncStorage,Animated,UIManager, BackHandler, Alert, TouchableWithoutFeedback, Platform } from "react-native";
import styles from './styles';
import FullPageLogo from "./../../../Components/Logo/FullScreen";
import BigButton from "./../../../Components/Button/BigButton";
import { GlobalAppState } from "./../../../ReduxStore";
import { connect } from 'react-redux';
import Container from './../../../Components/Container';
import AlertUtil from "./../../../Util/AlertUtil";
import Application from './../../../Entities/Application';
import VerifyPhoneOTPRequest from "./../../../Services/OTP/VerifyPhoneOTPRequest";
import VerifyLoginOTPRequest from "./../../../Services/OTP/VerifyLoginOTPRequest";
import ServiceAction from "./../../../ReduxStore/Generic/GenericeServiceAction";
import { ServiceType } from "./../../../Services/Core/ServiceFactory";
import ServiceKeys from "./../../../Services/Core/ServiceKeys";
import VerifyOTPResponseParser from "./../../../Services/OTP/VerifyOTPResponseParser";
import { ServiceRequestStatus } from "./../../../ReduxStore/ServiceState";
import VerifyOTPResponse from "./../../../Services/OTP/VerifyOTPResponse";
import { AppValidationComponentProps } from "./../../../Util/AppValidationComponent";
import { StackActions } from "react-navigation";
import { NavigationActions } from "react-navigation";
import AppScreens from "./../../../Util/AppScreens";
import InputBoxOTP from "./../../../Components/InputBox/OTP";
import LinkLabel from './../../../Components/Text/LinkLabel/LinkLabel';
import SendOTPRequest from "./../../../Services/OTP/SendOTPRequest";
import SendOTPResponseParser from "./../../../Services/OTP/SendOTPResponseParser";
import RouterBuilder from "./../../../Router";
import Modals from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TouchID from 'react-native-touch-id';
import { UserRepository } from "../../../Infrastructure/Repository/UserRespository";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoginResponse from "../../../Services/Onboarding/LoginResponse";
import LoginServiceParser from "../../../Services/Onboarding/LoginServiceParser";

import ProgressLoader from 'rn-progress-loader';

const { State: TextInputState } = TextInput;

const G_VerifyOTPViewContent = {
    key: 'somethun',
    text: 'Please enter the 4-digit code that was sent to your mobile device.',
    resendOtpSuccessText: 'New OTP sent successfully.',
    inputboxPlaceholder: 'Enter OTP received on your mobile',
    resendButton: 'Resend code',
    verifyButton: 'VERIFY CODE',
    colors: '#FFFFFF',
    page: 1,
    fingerPrintDescription: 'Confirm your fingerprint'
}
const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};
interface G_VerifyOTPViewProps extends AppValidationComponentProps {
    verifyOTPRequestStatus?: ServiceRequestStatus
    response?: LoginResponse
    onDismiss: any;
    detailmodel: any;
    gotodashboard: any;


}

interface G_VerifyOTPViewState {
    guestUserDialog: any;
    timer: any;
    resendlink: boolean;
    isEnabledTouch: any,
    fingerEnabled: any;
    shift: any;
    keyValue: any;
    verifybuttonState: any;
    loader:any;
}

enum G_VerifyOTPViewComponents {
    OTPInput = 1,
}

class G_VerifyOTPView extends Component<G_VerifyOTPViewProps, G_VerifyOTPViewState> {

    private otp = '';
    private displayname = '';
    private mobileNumber: string | undefined = '';
    private verifyOTPRequestInProgress = false
    public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  focusListener:any;
    private interval;
    constructor(props: G_VerifyOTPViewProps) {
        super(props);
        this.mobileNumber = Application.sharedApplication().userMobileNumber;
        this.state = {
            guestUserDialog: false,
            resendlink: false,
            timer: 30,
            isEnabledTouch: 'failed', fingerEnabled: false,
            shift: new Animated.Value(0),
            keyValue: false,
            verifybuttonState: true,
            loader: true,
            

        }
    }

   
      componentWillMount() {
        var that = this;
      
        console.log("componentwillmount");
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
        
      }
    
    
      handleKeyboardDidShow = (event: any) => {
          this.setState({keyValue:true})
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
        console.log(currentlyFocusedField);
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
          
          const fieldHeight = height;
          const fieldTop = pageY;
          const gap =  (windowHeight - keyboardHeight) - (fieldTop + fieldHeight + fieldHeight+100 ) || 0;
          console.log(gap)
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
        this.setState({keyValue:false})
        Animated.timing(
          this.state.shift,
          {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }
        ).start();
      }





    dismissScreen() {

        this.setState({ guestUserDialog: false })
        const dismissAction = this.props.onDismiss;
        dismissAction();
    }
    gotodashboard() {

        this.setState({ guestUserDialog: false })
        const gotodashboard = this.props.gotodashboard;
        gotodashboard();
    }
    onTextChange(text: string, tag: number) {
        switch (tag) {
            case G_VerifyOTPViewComponents.OTPInput:
                this.otp = text
                break
        }
    }

    onFocus(tag: number) {
    }

    onEndEditing(tag: number) {
    }
    checkFingerPrint() {
        TouchID.isSupported()
            .then(biometryType => {
                if (biometryType === 'TouchID') {
                    // Touch ID is supported on iOS
                    this.setState({ isEnabledTouch: 'TouchID' });
                } else if (biometryType === 'FaceID') {
                    // Face ID is supported on iOS
                    this.setState({ isEnabledTouch: 'FaceID' });
                } else if (biometryType === true) {
                    // Touch ID is supported on Android
                    this.setState({ isEnabledTouch: 'TouchID' });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ isEnabledTouch: 'failed' });
                // User's device does not support Touch ID (or Face ID)
                // This case is also triggered if users have not enabled Touch ID on their device
            });
    }
    fingerPrintAuthenticate() {
        TouchID.authenticate(G_VerifyOTPViewContent.fingerPrintDescription, optionalConfigObject)
            .then((success: any) => {
                AsyncStorage.getItem('authenticationToken').then((token) => {
                    //this.getProfileData(token);
                })
            })
            .catch((error: any) => {
                Alert.alert('Authentication Failed');
            });
    }

    public fingerPrintRegistration(): Promise<any> {
        return new Promise(function (resolve, reject) {
            TouchID.authenticate(G_VerifyOTPViewContent.fingerPrintDescription, optionalConfigObject)
                .then((success: any) => {
                    resolve(true);
                })
                .catch((error: any) => {
                    resolve(false);

                });

        })
    }
    async fingerPrintLoginCode() {
        AsyncStorage.setItem('fingerprint', 'false');
        if (this.state.isEnabledTouch != 'failed') {
            let data = await AsyncStorage.getItem('fingerprint');
            if (data == 'true') {
               // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
               this.gotodashboard();
            }
            else {
                this.fingerPrintRegistration().then(function (result: any) {
                    console.log('result: ' + result);
                    if (result) {
                        AsyncStorage.setItem('fingerprint', 'true');
                        var token = Application.sharedApplication().user!.authenticationToken;
                        AsyncStorage.setItem('authenticationToken', token);

                    } else {
                        AsyncStorage.setItem('fingerprint', 'false');
                    }
                },
                    function (error: any) {
                        //AsyncStorage.setItem('fingerprint', 'false');
                        //console.log('failed with error: ' + error);
                    }
                );
                this.gotodashboard();
               // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
            }

        } else {
            console.log('Finger print is not available or enabled');
            this.gotodashboard();
            //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
        }
    }
    async verifyOTP() {
        if (this.otp == '') {
            AlertUtil.show('Please fill OTP fields')
        } else {
            var displayname = await AsyncStorage.getItem('displayname')
            var device_type = Platform.OS === 'ios' ? 'ios' : 'android';
            var verifyOTPRequest = new VerifyPhoneOTPRequest(
                displayname,
                this.otp,
                this.mobileNumber!,
                device_type,
                Application.sharedApplication().Device_token,
                Math.floor(Date.now()),
                '98651428Signature',
                Application.sharedApplication().currentUserLocation!.latitude,
                Application.sharedApplication().currentUserLocation!.longitude,
                // Application.sharedApplication().user!.authenticationToken
                ((Application.sharedApplication().user && Application.sharedApplication().user!.authenticationToken))?Application.sharedApplication().user!.authenticationToken:''
            );
            console.log(verifyOTPRequest);
            var serviceAction = new ServiceAction()
            var verifyOTPParser = new LoginServiceParser()
            this.setState({verifybuttonState:false});
            this.props.dispatch!(serviceAction.request(ServiceType.OTP,
                ServiceKeys.VerifyPhoneOTPURI,
                verifyOTPRequest,
                [this.constructor.name],
                verifyOTPParser))
        }

    }

    resendOtp() {
        var sendOTPRequest = new SendOTPRequest(Application.sharedApplication().userMobileNumber)
        var serviceAction = new ServiceAction()
        var responseParser = new SendOTPResponseParser()
        this.setState({verifybuttonState:false});
        this.props.dispatch!(serviceAction.request(ServiceType.OTP,
            ServiceKeys.SendOTPServiceName,
            sendOTPRequest,
            [this.constructor.name],
            responseParser))
    }
    async verifyLoginOTP() {
        if (this.otp == '') {
            AlertUtil.show('Please fill OTP fields')
        } else {
            var device_type = Platform.OS === 'ios' ? 'ios' : 'android';
            var verifyOTPRequest = new VerifyLoginOTPRequest(
                this.otp,
                this.mobileNumber!,
                device_type,
                Application.sharedApplication().Device_token,
                Math.floor(Date.now()),
                '98651428Signature',
                Application.sharedApplication().currentUserLocation!.latitude,
                Application.sharedApplication().currentUserLocation!.longitude,
            );
            console.log(verifyOTPRequest);
            var serviceAction = new ServiceAction()
            var verifyOTPParser = new LoginServiceParser();
            this.setState({verifybuttonState:false});
            this.props.dispatch!(serviceAction.request(ServiceType.OTP,
                ServiceKeys.VerifyPhoneLoginOTPURI,
                verifyOTPRequest,
                [this.constructor.name],
                verifyOTPParser))
        }

    }
    componentWillReceiveProps(nextProps: G_VerifyOTPViewProps) {
        if (nextProps.listeners!.includes(this.constructor.name)) {
            if (nextProps.serviceKey === ServiceKeys.VerifyPhoneOTPURI || nextProps.serviceKey == ServiceKeys.SendOTPServiceName || nextProps.serviceKey == ServiceKeys.VerifyPhoneLoginOTPURI) {
                switch (nextProps.requestStatus) {
                   
                    case ServiceRequestStatus.FinishedWithSuccess:
                        this.verifyOTPRequestInProgress = false
                        if (nextProps.serviceKey === ServiceKeys.VerifyPhoneOTPURI || nextProps.serviceKey == ServiceKeys.VerifyPhoneLoginOTPURI) {
                           
                            var userRepository = UserRepository.sharedRepository();
                            userRepository.removeUser();

                            Application.sharedApplication().user = nextProps.response!.user!;
                            userRepository.saveUser(Application.sharedApplication().user!).then(success => {
                            }).catch(error => {
                            })
                            var isSocialExist = nextProps.response!.user.profile.referral_popup_show;;
                            if (isSocialExist == '1') {
                                this.setState({verifybuttonState:true});
                                this.gotodashboard();
                                
                              } else {
                                this.setState({verifybuttonState:true});
                                this.fingerPrintLoginCode();
                  
                              }
                            
                        } else if (nextProps.serviceKey == ServiceKeys.SendOTPServiceName) {
                            var that = this;
                            AlertUtil.showSingleActionMessage(G_VerifyOTPViewContent.resendOtpSuccessText, function () {    
                                that.setState({verifybuttonState:true}); 
                            })
                            
                            //AlertUtil.show(G_VerifyOTPViewContent.resendOtpSuccessText)
                        }
                        var serviceAction = new ServiceAction()
                        nextProps.dispatch!(serviceAction.reset())
                        break
                    case ServiceRequestStatus.FinishedWithError:
                        this.verifyOTPRequestInProgress = false
                        var errorMessage = nextProps.error!.message;
                        var that = this;
                        AlertUtil.showSingleActionMessage(errorMessage, function () {    
                            that.setState({verifybuttonState:true}); 
                        })
                        
                        var serviceAction = new ServiceAction()
                        nextProps.dispatch!(serviceAction.reset())
                        break
                    case ServiceRequestStatus.Started:
                    case ServiceRequestStatus.InProgress:
                        this.verifyOTPRequestInProgress = true
                        break
                }
            }
        }
    }
    //garima
   async componentDidMount() {
       this.displayname = await AsyncStorage.getItem('displayname');
       this.checkFingerPrint();
        this.setState({ guestUserDialog: this.props.detailmodel });
        this.interval = setInterval(
            () => {
                this.setState((prevState) => ({ timer: prevState.timer - 1 }));
                if (this.state.timer === 0) {
                    clearInterval(this.interval);
                    this.setState({ resendlink: !this.state.resendlink });
                }
            },
            1000
        ); 
    }
    componentDidUpdate() {

    }
    componentWillUnmount() {
        clearInterval(this.interval);
        // AppState.removeEventListener('change', this._handleAppStateChange);
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
        // this.focusListener.remove();
    }

    render() {

        return (
            <Container title={''} isHeader={false} isSubHeader={false} isTitle={false} isSetting={false} showIndicator={this.verifyOTPRequestInProgress} >

            <View>
            {/* <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}> */}
                <Modals
                    isVisible={this.state.guestUserDialog}
                    style={{ justifyContent: 'flex-end', margin: 0, padding: 0,zIndex:999999999 }}

                // onBackButtonPress={this.dismissScreen() }
                // onBackdropPress={this.dismissScreen() }

                >
 {/* <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}> */}
 

                    <View style={{
                        backgroundColor: "transparent", height: 370,
                        width: '100%',
                        bottom:this.state.keyValue?'20%':0
                    }}>

                        <View style={{ justifyContent: "center", padding: 0, paddingTop: 0, alignItems: 'center', width: '100%' }}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#68bcbc', width: '100%', height: 60, borderTopLeftRadius: 15, borderTopRightRadius: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '85%', justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(3.5), marginTop: 0, color: 'white', textAlign: 'center' }}>
                                        Verify Your Number
              </Text>
                                </View>
                                <View style={{ width: '5%' }}></View>
                                <View style={{ width: '10%' }}>
                                    <TouchableWithoutFeedback
                                        onPress={() => { this.dismissScreen() }}
                                    >
                                        <View>
                                            <Icon name="close" size={25} color="white" />

                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{
                                backgroundColor: "white", height: 310,
                                width: '100%'
                            }}>


                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.8), color: '#5b5b5b', textAlign: 'center' }}>
                                        Please enter the 4-digit code that was sent to your device!
              </Text>
                                </View>


                                <View style={{ marginTop: 5 }}>
                                    <View style={styles.inputBoxesWrapper}>
                                        <View style={styles.inputBoxWrapper}>
                                            <InputBoxOTP tag={G_VerifyOTPViewComponents.OTPInput} listener={this} />
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>

                                   { this.state.verifybuttonState ? <View style={{ width: '95%' }}>
                                        <BigButton title="Verify Code" style={{ backgroundColor: '#68bcbc', height: 50 }} textStyle={styles.verify_button_text_style}
                                            listener={() => {
                                               (this.displayname)? (this.state.verifybuttonState && this.verifyOTP()): (this.state.verifybuttonState &&this.verifyLoginOTP());
                                            }} />
                                    </View>:  <View style={{ width: '95%' }}>
                                        <BigButton title="Verify Code" style={{ backgroundColor: '#68bcbc', height: 50 }} textStyle={styles.verify_button_text_style}
                                             />
                                    </View>}
                                    
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                                    {!this.state.resendlink && <Text style={{ textAlign: 'center' }}>Didn't recieve the code ? <Text style={{ fontFamily: 'Montserrat-Semibold', color: '#68bcbc', fontSize: hp(2.2) }}>{this.state.timer}s </Text></Text>}
                                    {this.state.resendlink && <LinkLabel text={G_VerifyOTPViewContent.resendButton} style={styles.resend_OTP_text} listener={() => {
                                        this.state.verifybuttonState && this.resendOtp()
                                    }} /> }

                                </View>

                            </View>
                        </View>
                    </View>
                    {/* </Animated.View> */} 
                </Modals>



            </View>
            </Container>
        );

    }
}

const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
    response: state.serviceReducer.response,
    error: state.serviceReducer.error,
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners
})

export default connect(mapStateToProps)(G_VerifyOTPView);