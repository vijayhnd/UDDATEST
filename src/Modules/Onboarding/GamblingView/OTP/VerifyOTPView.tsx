import React, { Component } from "react";
import { View, ScrollView, Text,  AsyncStorage ,BackHandler,Alert} from "react-native";
import styles from './styles';
import FullPageLogo from "../../../../Components/Logo/FullScreen";
import BigButton from "../../../../Components/Button/BigButton";
import { GlobalAppState } from "../../../../ReduxStore";
import { connect } from 'react-redux';
import Container from '../../../../Components/Container';
import AlertUtil from "../../../../Util/AlertUtil";
import Application from '../../../../Entities/Application'; 
import VerifyOTPRequest from "../../../../Services/OTP/VerifyOTPRequest";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import VerifyOTPResponseParser from "../../../../Services/OTP/VerifyOTPResponseParser";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import VerifyOTPResponse from "../../../../Services/OTP/VerifyOTPResponse";
import { AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { StackActions } from "react-navigation";
import { NavigationActions } from "react-navigation";
import AppScreens from "../../../../Util/AppScreens";
import InputBoxOTP from "../../../../Components/InputBox/OTP";
import LinkLabel from '../../../../Components/Text/LinkLabel/LinkLabel';
import SendOTPRequest from "../../../../Services/OTP/SendOTPRequest";
import SendOTPResponseParser from "../../../../Services/OTP/SendOTPResponseParser";
import RouterBuilder from "../../../../Router";

const G_VerifyOTPViewContent = {
    key: 'somethun',
    text: 'Please enter the 4-digit code that was sent to your mobile device.',
    resendOtpSuccessText: 'New OTP sent successfully.',
    inputboxPlaceholder: 'Enter OTP received on your mobile',
    resendButton: 'Resend code',
    verifyButton: 'VERIFY CODE',
    colors: '#FFFFFF',
    page: 1
}

interface G_VerifyOTPViewProps extends AppValidationComponentProps {
    verifyOTPRequestStatus?: ServiceRequestStatus
    response?: VerifyOTPResponse
}

interface G_VerifyOTPViewState {
}

enum G_VerifyOTPViewComponents {
    OTPInput = 1,
}

class G_VerifyOTPView extends Component<G_VerifyOTPViewProps, G_VerifyOTPViewState> {

    private otp = '';
    private mobileNumber: string | undefined = '';
    private verifyOTPRequestInProgress = false

    constructor(props: G_VerifyOTPViewProps) {
        super(props);
        this.mobileNumber = Application.sharedApplication().userMobileNumber;
    }

    onTextChange(text: string, tag: number) {
        switch (tag) {
            case G_VerifyOTPViewComponents.OTPInput:
                this.otp = text
                break
        }
    }

    onFocus(tag: number){
    }
  
    onEndEditing(tag: number){
    }

    verifyOTP() {
        if(this.otp == '')
        {
            AlertUtil.show('Please fill OTP fields')
        }else{
            var verifyOTPRequest = new VerifyOTPRequest(this.mobileNumber!, this.otp)
        var serviceAction = new ServiceAction()
        var verifyOTPParser = new VerifyOTPResponseParser()
        
        this.props.dispatch!(serviceAction.request(ServiceType.OTP,
                                                  ServiceKeys.VerifyOTPServiceName,
                                                  verifyOTPRequest,
                                                  [this.constructor.name],
                                                  verifyOTPParser))
        }
        
    }

    resendOtp() {
        var sendOTPRequest = new SendOTPRequest(Application.sharedApplication().userMobileNumber)
        var serviceAction = new ServiceAction()
        var responseParser = new SendOTPResponseParser()
        this.props.dispatch!(serviceAction.request(ServiceType.OTP, 
                                               ServiceKeys.SendOTPServiceName,
                                               sendOTPRequest,
                                               [this.constructor.name],
                                               responseParser))
    }

    componentWillReceiveProps(nextProps: G_VerifyOTPViewProps){
        if(nextProps.listeners!.includes(this.constructor.name)){
          if(nextProps.serviceKey === ServiceKeys.VerifyOTPServiceName || nextProps.serviceKey == ServiceKeys.SendOTPServiceName){
            switch(nextProps.requestStatus){
              case ServiceRequestStatus.FinishedWithSuccess:
                this.verifyOTPRequestInProgress = false
                if (nextProps.serviceKey === ServiceKeys.VerifyOTPServiceName) {
                    const resetAction = StackActions.replace({
                                routeName: AppScreens.G_LoginPage
                              });
                            nextProps.navigation!.dispatch(resetAction);
                            
                    /* AsyncStorage.getItem("FromForgotOTP").then((data) => {
                        if(data == 'true')
                        {
                            const resetAction = StackActions.replace({
                                routeName: AppScreens.G_ResetPassword
                              });
                            nextProps.navigation!.dispatch(resetAction);
                        }
                        else{
                            AsyncStorage.setItem("FromForgotOTP",'false');
                            const resetAction = StackActions.replace({
                                routeName: AppScreens.G_LoginPage
                              });
                            nextProps.navigation!.dispatch(resetAction);
                            
                        }
                    })*/
                } else if(nextProps.serviceKey == ServiceKeys.SendOTPServiceName) {
                    AlertUtil.show(G_VerifyOTPViewContent.resendOtpSuccessText)
                }
                var serviceAction = new ServiceAction()
                nextProps.dispatch!(serviceAction.reset())
                break
              case ServiceRequestStatus.FinishedWithError:
                this.verifyOTPRequestInProgress = false
                var errorMessage = nextProps.error!.message.replace('dose','does')
                AlertUtil.show(errorMessage)
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
    componentDidMount(){

        // BackHandler.addEventListener('hardwareBackPress', () => {
        //     if (this.props) {
        //         RouterBuilder.replaceRouteTo(AppScreens.G_LocationConfirmation, this.props)
        //         return true; 
        //     }
        //     return false;
        // });
    }
    //garima
//     handleBackButton() {
//       //  this.props.navigation!.navigate(AppScreens.G_LocationConfirmation)
//       const resetAction = StackActions.reset({
//         index: 2,
//         actions: [NavigationActions.navigate({ routeName: AppScreens.G_LocationConfirmation })],
//     });
// this.props.navigation!.dispatch(resetAction);
    
//     }
    private navigateToLogin(){
        const resetAction = StackActions.reset({
            index: 2,
            actions: [NavigationActions.navigate({ routeName: AppScreens.G_LoginPage })],
        });
    this.props.navigation!.dispatch(resetAction);
    }

    render() {
        return (
            <Container title={''} isHeader={false} isMyHeader={true} isSubHeader={false} isSetting={false}  isTitle={false} showIndicator={this.verifyOTPRequestInProgress}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={[styles.mainContent, { backgroundColor: G_VerifyOTPViewContent.colors }]}>
                        <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'flex-start' }}>
                            <FullPageLogo />
                        </View>

                        <View style={styles.textWrapper}>
                            <Text style={styles.textStyle}>
                                {G_VerifyOTPViewContent.text}
                            </Text>
                        </View>

                        <View style={styles.inputBoxesWrapper}>
                            <View style={styles.inputBoxWrapper}>
                                <InputBoxOTP tag={G_VerifyOTPViewComponents.OTPInput} listener={this}/>
                            </View>
                        </View>

                        <View style={styles.verify_button_details_wrapper}>
                            <View style={styles.verify_button_wrapper}>
                                <BigButton title={G_VerifyOTPViewContent.verifyButton} style={[styles.verify_button,{backgroundColor:'#68bcbc'}]} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.verifyOTP() }} />
                            </View>
                        </View>

                        <View style={styles.resend_OTP_wrapper}>
                            <View style={styles.resend_wrapper}>
                                <LinkLabel text={G_VerifyOTPViewContent.resendButton} style={styles.resend_OTP_text} listener = {() => {
                                    this.resendOtp()
                                }}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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