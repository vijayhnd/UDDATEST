import React from 'react';
import { View, ScrollView, Text, Platform,Animated,Keyboard,UIManager,Dimensions,TextInput } from 'react-native';
import styles from './styles';
import HalfPageLogo from '../../../../Components/Logo/HalfScreen';
import FullPageLogo from '../../../../Components/Logo/FullScreen';
import InputBoxText from '../../../../Components/InputBox/Text';
import BigButton from '../../../../Components/Button/BigButton';
var ParsedText = require('react-native-parsed-text').default;
import { connect } from 'react-redux';
import { GlobalAppState } from '../../../../ReduxStore';
import { TextInputListener } from '../../../../Components/InputBox/Mobile/InputBoxMobile';
import RegistrationRequest from '../../../../Services/Onboarding/RegistrationRequest';
import AlertUtil from '../../../../Util/AlertUtil';
import Application from '../../../../Entities/Application';
import { ServiceRequestStatus } from '../../../../ReduxStore/ServiceState';
import AppScreens from '../../../../Util/AppScreens';
import AlertMessages from '../../../../Util/AlertMessages';
import Container from '../../../../Components/Container';
import { IState } from '../../../../Components/IState';
import AppValidationComponent, { AppValidationComponentProps, AppValidationComponentState, Field } from '../../../../Util/AppValidationComponent';
import ServiceAction from '../../../../ReduxStore/Generic/GenericeServiceAction';
import OnboardingServices from '../../../../Services/Onboarding/OnboardingServices';
import ServiceKeys from '../../../../Services/Core/ServiceKeys';
import RegistrationResponse from '../../../../Services/Onboarding/RegistrationResponse';
import { ServiceType } from '../../../../Services/Core/ServiceFactory';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {AppEventsLogger} from 'react-native-fbsdk'; 
import UrlService from '../../../../Services/Core/ServiceURI';
import ReferralService from "../../../../Services/Referral/ReferralService";
const { State: TextInputState } = TextInput;

const RegistrationPageContent = {
    key: 'somethun',
    title: 'Create Account',
    text: 'Bet the Book. Bet a Friend. Bet a Stranger. UDDA (as in "UDDA MAN") is a social sports gaming App that allows users to bet on sports for FREE and win prizes.',
    inputs: {
        firstName: 'FIRST NAME',
        lastName: 'LAST NAME',
        emailAddress: 'EMAIL ADDRESS',
        password: 'PASSWORD',
        confirmPassword: 'CONFIRM PASSWORD',
        referral_code : 'REFERRAL CODE'  //garima
    },
    signUp: 'Sign up',
    footerText: 'By clicking the Sign Up button, you agree to our Terms & Conditions and Privacy Policy.',

    colors: '#FFFFFF',
    page: 1
}

interface RegistrationProps extends AppValidationComponentProps {
    response?: RegistrationResponse
}

interface RegistrationState extends AppValidationComponentState {
    firstName?: Field
    lastName?: Field
    email?: Field
    password?: Field
    confirmPassword?: Field
    referral_code?:Field //garima
    shift:any;
}

enum RegistrationScreenComponents {
    FirstNameInput = 1,
    LastNameInput,
    EmailInput,
    PasswordInput,
    ConfirmPasswordInput,
    referralCodeInput //garima
}

class G_RegistrationView extends AppValidationComponent<RegistrationProps, RegistrationState> implements TextInputListener {

    private firstName = ''
    private lastName = ''
    private email = ''
    private password = ''
    private confirmPassword = ''
    private referral_code = ''
    private isRequestInProgress = false
    private firstNameFieldName = 'First name'
    private lastNameFieldName = 'Last name'
    private emailFieldName = 'Email'
    private passwordFieldName = 'Password'
    private confirmPasswordFieldName = 'Confirm password'
    private confirmReferralFieldName = 'Referral Code' //garima
    private serviceAction = new ServiceAction()
    public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  private referralservice = new ReferralService(); //Vijay

    constructor(props: RegistrationProps) {
        super(props)
        this.state = {
            firstName: { name: this.firstNameFieldName, value: '' },
            lastName: { name: this.lastNameFieldName, value: '' },
            email: { name: this.emailFieldName, value: '' },
            password: { name: this.passwordFieldName, value: '' },
            confirmPassword: { name: this.confirmPasswordFieldName, value: '' },
            referral_code: {name:this.confirmReferralFieldName ,value:'' },
            shift: new Animated.Value(0),
        }
    }

    onTextChange(text: string, tag: number) {
        switch (tag) {
            case RegistrationScreenComponents.FirstNameInput:
                this.firstName = text
                this.setState({ firstName: { name: this.firstNameFieldName, value: this.firstName } })
                break
            case RegistrationScreenComponents.LastNameInput:
                this.lastName = text
                this.setState({ lastName: { name: this.lastNameFieldName, value: this.lastName } })
                break
            case RegistrationScreenComponents.EmailInput:
                this.email = text
                this.setState({ email: { name: this.emailFieldName, value: this.email } })
                break
            case RegistrationScreenComponents.PasswordInput:
                this.password = text
                this.setState({ password: { name: this.passwordFieldName, value: this.password } })
                break
            case RegistrationScreenComponents.ConfirmPasswordInput:
                this.confirmPassword = text
                this.setState({ confirmPassword: { name: this.confirmPasswordFieldName, value: this.confirmPassword } })
                break
                case RegistrationScreenComponents.referralCodeInput:
                this.referral_code = text
                this.setState({ referral_code: { name: this.confirmReferralFieldName, value: this.referral_code } })
                break
        }
    }

    onFocus(tag: number) {
    }

    onEndEditing(tag: number) {
    }

    nextButtonClicked() {
        var isRequestValid = this.validate({
            firstName: { required: true },
            lastName: { required: true },
            email: { required: true, email: true },
            password: { required: true },
            confirmPassword: { required: true },
           // referral_code :{required :false} //garima
        })


        if (isRequestValid) {
            if (this.password === this.confirmPassword) {
                this.createAndDispatchRegistrationRequest()
            } else {
                AlertUtil.show(AlertMessages.ConfirmPasswordMismatch)
            }
        } else {
            AlertUtil.show(this.getErrorMessages())
        }
    }

    private createAndDispatchRegistrationRequest() {
        var device_type = Platform.OS === 'ios' ? 'ios' : 'android';
        var registrationRequest = new RegistrationRequest(this.firstName,
            this.lastName,
            this.email,
            this.password,
            this.confirmPassword,
            this.referral_code,
            Application.sharedApplication().userMobileNumber!,
            device_type,
            Application.sharedApplication().Device_token,
            Math.floor(Date.now()),
            '98651428Signature',
            Application.sharedApplication().currentUserLocation!.latitude,
            Application.sharedApplication().currentUserLocation!.longitude)

        var service = new OnboardingServices()
        this.props.dispatch!(this.serviceAction.request(ServiceType.Onbarding,
            ServiceKeys.RegisterServiceName,
            registrationRequest,
            [this.constructor.name]))
    }

    handleTermsOfUse = () => {
        var weakSelf = this;
        weakSelf.props.navigation!.navigate(AppScreens.G_OnlyTermsOfUseView)
    }
    
    handlePrivacyPolicy = () => {
        var weakSelf = this
        weakSelf.props.navigation!.navigate(AppScreens.G_OnlyPrivacyPolicyView)
    }




    componentWillReceiveProps(nextProps: RegistrationProps) {
        if (nextProps.listeners!.includes(this.constructor.name)) {
            switch (nextProps.requestStatus) {
                case ServiceRequestStatus.InProgress:
                case ServiceRequestStatus.Started:
                    this.isRequestInProgress = true
                    break
                case ServiceRequestStatus.FinishedWithSuccess:
                    var weakSelf = this
                    AlertUtil.showSingleActionMessage(AlertMessages.RegistrationSuccessfull, function () {
                        weakSelf.props.navigation!.navigate(AppScreens.G_LoginPage)
                        if(UrlService.isLiveApp == '1'){
                            this.referralservice.logEvent('sign_up', {});
                            AppEventsLogger.logEvent('sign_up');
                            }
                    })
                    this.isRequestInProgress = false
                    break
                case ServiceRequestStatus.FinishedWithError:
                    AlertUtil.show(nextProps.error!.message)
                    this.isRequestInProgress = false
                    break
            }
            nextProps.dispatch!(this.serviceAction.reset())
        }
    }
    componentWillUnmount() {

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
          const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight+ fieldHeight+ fieldHeight+ fieldHeight ) || 0;
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
    render() {

        const footerPattern =
            [
                { pattern: /Terms & Conditions/, style: styles.title_link, onPress: this.handleTermsOfUse },
                { pattern: /Privacy Policy/, style: styles.title_link, onPress: this.handlePrivacyPolicy }
            ];

        const titlePattern =
            [
                { pattern: /Account/, style: styles.headTitle_bold },
            ];

        return (
           
                
                
            <Container title={''} isHeader={false} isMyHeader={true} isSubHeader={false} isTitle={false} showIndicator={this.isRequestInProgress}>
            {/* <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}> */}
            <ScrollView>
                <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'flex-start' }}>
                    <FullPageLogo />
                </View>
                <View style={[styles.mainContent, { backgroundColor: RegistrationPageContent.colors }]}>
                    <View style={styles.headTitleWrapper}>
                        <ParsedText
                            style={styles.headTitle}
                            parse={titlePattern}
                            childrenProps={{ allowFontScaling: false }}
                        >
                            {RegistrationPageContent.title}
                        </ParsedText>
                    </View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title} >{RegistrationPageContent.text}</Text>
                    </View>
                    <ScrollView bounces={false} nestedScrollEnabled={true}>
                    
                    <View style={styles.inputBoxesWrapper}>
                        <View style={styles.inputBoxWrapper}>
                            <InputBoxText tag={RegistrationScreenComponents.FirstNameInput}
                                placeHolderText={RegistrationPageContent.inputs.firstName}
                                listener={this} />
                        </View>
                        <View style={styles.inputBoxWrapper}>
                            <InputBoxText tag={RegistrationScreenComponents.LastNameInput}
                                placeHolderText={RegistrationPageContent.inputs.lastName}
                                listener={this} />
                        </View>
                        <View style={styles.inputBoxWrapper}>
                            <InputBoxText tag={RegistrationScreenComponents.EmailInput}
                                placeHolderText={RegistrationPageContent.inputs.emailAddress}
                                keyboardType={'email-address'}
                                listener={this} />
                        </View>
                        <View style={styles.inputBoxWrapper}>
                            <InputBoxText tag={RegistrationScreenComponents.PasswordInput}
                                placeHolderText={RegistrationPageContent.inputs.password}
                                contentType='password'
                                listener={this} />
                        </View>
                        <View style={styles.inputBoxWrapper}>
                            <InputBoxText tag={RegistrationScreenComponents.ConfirmPasswordInput}
                                placeHolderText={RegistrationPageContent.inputs.confirmPassword}
                                contentType='password'
                                listener={this} />
                        </View>

                          <View style={styles.inputBoxWrapper}>
                            <InputBoxText tag={RegistrationScreenComponents.referralCodeInput}
                                placeHolderText={RegistrationPageContent.inputs.referral_code}
                                listener={this} />
                        </View>
                    </View>

                    </ScrollView>
                    <View style={{flex: 0}}>
                        <View style={styles.sign_in_details_wrapper}>
                            <View style={styles.sign_in_button_wrapper}>
                                <BigButton title={RegistrationPageContent.signUp}
                                    style={[styles.sign_in_button,{backgroundColor:'#68bcbc'}]}
                                    textStyle={styles.sign_in_button_text_style}
                                    listener={() => { this.nextButtonClicked() }} />
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <ParsedText
                                style={styles.footerTitle}
                                parse={footerPattern}
                                childrenProps={{ allowFontScaling: false }}
                            >
                                {RegistrationPageContent.footerText}
                            </ParsedText>
                        </View>
                    </View>
                </View>
                </ScrollView>
                {/* </Animated.View> */}
            </Container>
            
        );
    }

}

const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
    response: state.serviceReducer.response,
    error: state.serviceReducer.error,
    listeners: state.serviceReducer.listeners
})

export default connect(mapStateToProps)(G_RegistrationView);