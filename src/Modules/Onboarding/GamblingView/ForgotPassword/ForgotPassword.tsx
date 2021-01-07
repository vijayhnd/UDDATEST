import React from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from './styles';
import FullPageLogo from '../../../../Components/Logo/FullScreen';
import BigButton from '../../../../Components/Button/BigButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var ParsedText = require('react-native-parsed-text').default;
import { connect } from 'react-redux';
import { GlobalAppState } from '../../../../ReduxStore';
import { UDDAError } from '../../../../Entities';
import AlertUtil from '../../../../Util/AlertUtil';
import Application from '../../../../Entities/Application';
import { ServiceRequestStatus } from '../../../../ReduxStore/ServiceState';
import AppScreens from '../../../../Util/AppScreens';
import Container from '../../../../Components/Container';
import AppValidationComponent, { AppValidationComponentProps, AppValidationComponentState, Field } from '../../../../Util/AppValidationComponent';
import ServiceAction from '../../../../ReduxStore/Generic/GenericeServiceAction';
import ServiceKeys from '../../../../Services/Core/ServiceKeys';
import { ServiceType } from '../../../../Services/Core/ServiceFactory';
import RouterBuilder from "../../../../Router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProgressLoader from 'rn-progress-loader';
import SendOTPRequest from '../../../../Services/OTP/SendOTPRequest';
import SendOTPResponseParser from '../../../../Services/OTP/SendOTPResponseParser';
import SendOTPResponse from '../../../../Services/OTP/SendOTPResponse';
import LogoutUtill from '../../../../Util/LogoutUtill';
import UrlService from '../../../../Services/Core/ServiceURI'


interface G_ForgotProps extends AppValidationComponentProps {
    sendOTPRequestStatus?: ServiceRequestStatus
    sendOTPResponse?: SendOTPResponse
    sendOTPError?: UDDAError
    serviceKey?: string

}

interface G_ForgotState extends AppValidationComponentState {
    emailAddress: any;
    loader: any;
}



class G_ForgotPassword extends AppValidationComponent<G_ForgotProps, G_ForgotState>  {
    private sendOTPRequestInProgress = false
    constructor(props: G_ForgotProps) {
        super(props)
        this.state = {
            emailAddress: '',
            loader: false,
        }

    }


    gotoLogin() {
        RouterBuilder.replaceRouteTo(AppScreens.G_LoginPage, this.props);
    }
    //garima

    checkEmailPattern() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // var regemail=/^(\w+)\@(\w+)\.[a-zA-Z]/g ;
        if (reg.test(this.state.emailAddress) === false) {
            AlertUtil.show("Please Enter Valid Email Id");
            return false;
        }
        else {
            this.setState({ loader: true });
            var params: any = {
                'email': this.state.emailAddress,
            };

            console.log("forgot_password input " + JSON.stringify(params));

            var formData = new FormData();

            for (var k in params) {
                formData.append(k, params[k]);
            }
            fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/GuestUser/forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,

            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log("forgot_password " + JSON.stringify(responseJson));

                    if (responseJson.data.length !=0) {
                        Application.sharedApplication().userMobileNumber = responseJson.data.phone;
                        Application.sharedApplication().useEmailID = responseJson.data.email;
                        //AsyncStorage.setItem("FromForgotOTP", 'true');
                        RouterBuilder.replaceRouteTo(AppScreens.G_VerifyForgotOTPView, this.props);
                    }
                    else {
                      //  AlertUtil.show(JSON.stringify(responseJson.message));
                      AlertUtil.show("Email Id is not registered");
                    }
                    this.setState({ loader: false });
                    if (responseJson.message == "Access Expired.") {
                        // AlertUtil.show("Session Expired ! Please login again");
                        console.log("Footer comp ---->"+responseJson.message);
                        LogoutUtill.logoutButtonPressed(this.props);
                       }
                })
                .catch(error => {

                    this.setState({ loader: false });
                    console.log("prev_next_dashboard_API_call" + error);
                })
        }
    }

submitforgot() {
    if (this.state.emailAddress == '' || this.state.emailAddress == null) {
        AlertUtil.show("Please Enter Email Address");
    }
    else {
        this.checkEmailPattern();
    }

}



nextButtonClicked(phonenum: any) {
    var sendOTPRequest = new SendOTPRequest(phonenum)
    var serviceAction = new ServiceAction()
    var responseParser = new SendOTPResponseParser()

    this.props.dispatch!(serviceAction.request(ServiceType.OTP,
        ServiceKeys.SendOTPServiceName,
        sendOTPRequest,
        [this.constructor.name],
        responseParser))
}

componentWillReceiveProps(nextProps: G_ForgotProps) {
    if (nextProps.listeners!.includes(this.constructor.name)) {

        if (nextProps.serviceKey === ServiceKeys.SendOTPServiceName) {


            switch (nextProps.sendOTPRequestStatus) {
                case ServiceRequestStatus.FinishedWithSuccess: {

                    if (nextProps.serviceKey === ServiceKeys.SendOTPServiceName) {
                        this.sendOTPRequestInProgress = false;
                        this.setState({ loader: false });
                        AsyncStorage.setItem("FromForgotOTP", 'true');
                        nextProps.navigation!.navigate(AppScreens.G_VerifyOTPView)
                    }
                    var serviceAction = new ServiceAction()
                    nextProps.dispatch!(serviceAction.reset())
                }
                    break
                case ServiceRequestStatus.FinishedWithError:
                    this.sendOTPRequestInProgress = false
                    AlertUtil.show(nextProps.sendOTPError!.message)
                    var serviceAction = new ServiceAction()
                    nextProps.dispatch!(serviceAction.reset())
                    break
                case ServiceRequestStatus.Started:
                case ServiceRequestStatus.InProgress:
                    this.sendOTPRequestInProgress = true
                    break
            }
        }
    }
}



render() {


    return (
        <Container title={''} isHeader={false} isMyHeader={true} isSubHeader={false} isTitle={false} >

            <ProgressLoader
                visible={this.state.loader}
                isModal={true} isHUD={true}
                hudColor={"#68bcbc"}
                color={"#FFFFFF"} />

            <KeyboardAwareScrollView

                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.scrollContent}
                scrollEnabled={true}
            >
                <View style={[styles.mainContent, { backgroundColor: 'white' }]}>
                    <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'flex-start' }}>
                        <FullPageLogo />
                    </View>

                    <View style={[styles.inputBoxesWrapper]}>

                        <View style={styles.inputBoxWrapper}>
                            <Text style={styles.title}>ENTER YOUR REGISTERED</Text>
                            <Text style={styles.title}>EMAIL ADDRESS</Text>
                        </View>

                    </View>

                    <View style={[styles.inputBoxesWrapper]}>

                        <View style={[styles.inputBoxWrapper, { alignItems: 'center', }]}>
                            <TextInput
                                value={this.state.emailAddress}
                                clearTextOnFocus={true}
                                onChangeText={(data) => { this.setState({ emailAddress: data }) }}
                                returnKeyType='done'
                                style={{ padding: 8, paddingLeft: 4, fontFamily: 'Montserrat-Bold', fontSize: hp(1.6), width: '90%', borderBottomColor: '#a6a6a6', borderBottomWidth: 1 }}
                                placeholder='EMAIL ADDRESS '
                                placeholderTextColor='black'
                            />
                        </View>

                    </View>


                    <View style={styles.sign_in_details_wrapper}>
                        <View style={styles.sign_in_button_wrapper}>
                            <BigButton title={'SUBMIT'}
                                style={styles.sign_in_button}
                                textStyle={styles.sign_in_button_text_style}
                                listener={() => { this.submitforgot() }} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => { this.gotoLogin() }}>
                        <View>
                            <Text style={[styles.title, { textDecorationLine: 'underline', fontSize: hp(1.8) }]}>Back</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </KeyboardAwareScrollView>
        </Container>
    );
}

}

const mapStateToProps = (state: GlobalAppState) => ({
    listeners: state.serviceReducer.listeners,
    serviceKey: state.serviceReducer.serviceKey,
    sendOTPRequestStatus: state.serviceReducer.requestStatus,
    sendOTPResponse: state.serviceReducer.response,
    sendOTPError: state.serviceReducer.error,
})

export default connect(mapStateToProps)(G_ForgotPassword);