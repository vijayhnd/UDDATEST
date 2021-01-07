import React from 'react';
import { View,  Text, TextInput } from 'react-native';
import styles from './styles';
import HalfPageLogo from '../../../../Components/Logo/HalfScreen';
import BigButton from '../../../../Components/Button/BigButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { GlobalAppState } from '../../../../ReduxStore';
import AlertUtil from '../../../../Util/AlertUtil';
import Application from '../../../../Entities/Application';
import AppScreens from '../../../../Util/AppScreens';
import Container from '../../../../Components/Container';
import AppValidationComponent, { AppValidationComponentProps, AppValidationComponentState } from '../../../../Util/AppValidationComponent';

import RouterBuilder from "../../../../Router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProgressLoader from 'rn-progress-loader';

import ResetPasswordRequest from '../../../../Services/Onboarding/ResetPasswordRequest';
import ResetPasswordResponse from '../../../../Services/Onboarding/ResetPasswordResponse';
import ResetPasswordResponseParser from '../../../../Services/Onboarding/ResetPasswordResponseParser';
import ServiceAction from '../../../../ReduxStore/Generic/GenericeServiceAction';
import { ServiceType } from '../../../../Services/Core/ServiceFactory';
import ServiceKeys from '../../../../Services/Core/ServiceKeys';
import { ServiceRequestStatus } from '../../../../ReduxStore/ServiceState';
import { UDDAError } from '../../../../Entities';

interface G_ResetPasswordProps extends AppValidationComponentProps {
    resetPasswordRequestStatus?: ServiceRequestStatus
    resetPasswordResponse?: ResetPasswordResponse
    resetPasswordError?: UDDAError

    serviceKey?: string
    listeners?: any
}

interface G_ResetPasswordState extends AppValidationComponentState {
    confirmpassword: any;
    newpassword: any;
    loader:any;
}



class G_ResetPassword extends AppValidationComponent<G_ResetPasswordProps, G_ResetPasswordState>  {
    private serviceRequestInProgress =false;
      
    constructor(props: G_ResetPasswordProps) {
        super(props)
        this.state = {
            confirmpassword: '',
            newpassword: '',
            loader:''

        }

    }




    submitreset() {
        if (this.state.newpassword == '' || this.state.newpassword == null) {
            AlertUtil.show("Please Enter New Password");
        }
        else if(this.state.confirmpassword == '' || this.state.confirmpassword == null)
        {
            AlertUtil.show("Please Enter Confirm Password");
        }
        else if(this.state.newpassword != this.state.confirmpassword)
        {
            AlertUtil.show("Password doesn't match");
        }
        else {
            var reset_pswdRequset = new ResetPasswordRequest(
                Application.sharedApplication().useEmailID,
                this.state.newpassword,
            )
            var serviceAction = new ServiceAction()
            var responseParser = new ResetPasswordResponseParser()
            this.props.dispatch!(serviceAction.request(ServiceType.Onbarding,
                ServiceKeys.ResetPasswordServiceName,
                reset_pswdRequset,
                [this.constructor.name],
                responseParser))
            }

}

componentWillReceiveProps(nextProps: G_ResetPasswordProps) {
    if (nextProps.listeners!.includes(this.constructor.name)) {
        if (nextProps.serviceKey === ServiceKeys.ResetPasswordServiceName) {
            switch (nextProps.requestStatus) {
                case ServiceRequestStatus.FinishedWithSuccess:
                    this.serviceRequestInProgress= false;
                    console.log("resetPasswordResponse " + JSON.stringify(nextProps.resetPasswordResponse));
                    var response = nextProps.resetPasswordResponse!.response;
                    if (response.message == "success") {
                        RouterBuilder.replaceRouteTo(AppScreens.G_LoginPage, this.props);
                        AlertUtil.show(JSON.stringify(response.data));

                    }
                    else {
                        AlertUtil.show(JSON.stringify(response.message));
                    }
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


    render() {


        return (
           
            <Container title = { ''} isHeader = { false} isMyHeader = { false}  isTitle = { false} showIndicator = { this.serviceRequestInProgress } >
                <KeyboardAwareScrollView

                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.scrollContent}
                    scrollEnabled={true}
                >
                    <View style={[styles.mainContent, { backgroundColor: 'white' }]}>
                        <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'flex-start' }}>
                            <HalfPageLogo />
                        </View>

                        <View style={[styles.inputBoxesWrapper]}>

                            <View style={styles.inputBoxWrapper}>
                                <Text style={styles.title}>RESET PASSWORD</Text>
                            </View>

                        </View>

                        <View style={[styles.inputBoxesWrapper]}>

                            <View style={[styles.inputBoxWrapper, { alignItems: 'center', }]}>
                                <TextInput
                                    value={this.state.newpassword}
                                    clearTextOnFocus={true}
                                    onChangeText={(data) => { this.setState({ newpassword: data }) }}
                                    returnKeyType='done'
                                    secureTextEntry={true}
                                    style={{ padding: 8, paddingLeft: 4, fontFamily: 'Montserrat-Bold', fontSize: hp(1.6), width: '90%', borderBottomColor: '#a6a6a6', borderBottomWidth: 1 }}
                                    placeholder='NEW PASSWORD'
                                    placeholderTextColor='black'
                                />
                            </View>

                            <View style={[styles.inputBoxWrapper, { alignItems: 'center',marginTop:10 }]}>
                                <TextInput
                                    value={this.state.confirmpassword}
                                    clearTextOnFocus={true}
                                    onChangeText={(data) => { this.setState({ confirmpassword: data }) }}
                                    returnKeyType='done'
                                    secureTextEntry={true}
                                    style={{ padding: 8, paddingLeft: 4, fontFamily: 'Montserrat-Bold', fontSize: hp(1.6), width: '90%', borderBottomColor: '#a6a6a6', borderBottomWidth: 1 }}
                                    placeholder='CONFIRM PASSWORD'
                                    placeholderTextColor='black'
                                />
                            </View>

                        </View>

                        <View style={styles.sign_in_details_wrapper}>
                            <View style={styles.sign_in_button_wrapper}>
                                <BigButton title={'SUBMIT'}
                                    style={styles.sign_in_button}
                                    textStyle={styles.sign_in_button_text_style}
                                    listener={() => {this.submitreset() }} />
                            </View>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </Container>
        );
    }

}

const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
    response: state.serviceReducer.response,
    error: state.serviceReducer.error,
    listeners: state.serviceReducer.listeners,

    resetPasswordRequestStatus: state.serviceReducer.requestStatus,
    resetPasswordResponse: state.serviceReducer.response as ResetPasswordResponse,
    resetPasswordError: state.serviceReducer.error,

    serviceKey: state.serviceReducer.serviceKey,
})

export default connect(mapStateToProps)(G_ResetPassword);