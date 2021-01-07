import React from 'react';
import { View, PermissionsAndroid, Platform, Alert,Text, AppState, Linking, BackHandler, AsyncStorage } from 'react-native';
import styles from './styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HalfPageLogo from '../../../../../Components/Logo/HalfScreen';
import LongButton from '../../../../../Components/Button/LongButton';
import InputBoxMobile from '../../../../../Components/InputBox/Mobile';
import CustomToggleButton from '../../../../../Components/CustomToggleButton';
import ParsedText from 'react-native-parsed-text';
import DotIcon from '../../../../../Components/Icons/DotIcon';
import { GlobalAppState } from '../../../../../ReduxStore';
import { connect } from 'react-redux';
import { UDDAError } from '../../../../../Entities';
import AlertUtil from '../../../../../Util/AlertUtil';
import AlertMessages from '../../../../../Util/AlertMessages';
import Application from '../../../../../Entities/Application';
import { TextInputListener } from '../../../../../Components/InputBox/Mobile/InputBoxMobile';
import Container from '../../../../../Components/Container/index';
import AppUtil from '../../../../../Util/AppUtil';
import AppUrls from '../../../../../Util/AppURLs';
import { ServiceRequestStatus } from '../../../../../ReduxStore/ServiceState';
import AppValidationComponent, { AppValidationComponentProps, AppValidationComponentState, Field } from '../../../../../Util/AppValidationComponent';
import ServiceAction from '../../../../../ReduxStore/Generic/GenericeServiceAction';
import ServiceKeys from '../../../../../Services/Core/ServiceKeys';
import LocationResponse from '../../../../../Services/Location/LocationResponse';
import { ServiceType } from '../../../../../Services/Core/ServiceFactory';
import SendOTPResponse from '../../../../../Services/OTP/SendOTPResponse';
import AppScreens from '../../../../../Util/AppScreens';
import SendOTPRequest from '../../../../../Services/OTP/SendOTPRequest';
import SendOTPResponseParser from '../../../../../Services/OTP/SendOTPResponseParser';
import AppConstants from '../../../../../Util/Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const Page2Content = {  
  key: 'somethun',
  title: 'Before you can play',
  centerContent: {
    fullText: 'If you are an employee of a sports governing body or member team who is not prohibited from wagering on sports you must complete this form. For more information read our Terms of Use.'
  },
  inputPlaceHolder: 'XXX-XXX-XXXX',

  checkboxContent1: {
    fullText: 'I accept these Terms of Use, Privacy Policy, and agree to receive marketing communications and offers from UDDA.'
  },
  checkboxContent2: 'Allow UDDA to access your location while you are using the app. This app requires access to your location when the screen is on and the app is displayed.',
  checkboxContent3: 'I certify that all information provided during account registration is true and accurate and that I am not a casino key employee or casino employee prohibited from wagering in a New Jersey casino or simulcasting facility.',
  nextButtonText: 'Submit',
  icon: 'ios-images',
  colors: '#FFFFFF',
  page: 1
}

interface G_LocationConfirmationProps extends AppValidationComponentProps {
  locationRequestStatus?: ServiceRequestStatus
  locationResponse?: LocationResponse
  currentLocationError?: UDDAError
  sendOTPRequestStatus?: ServiceRequestStatus
  sendOTPResponse?: SendOTPResponse
  sendOTPError?: UDDAError
  serviceKey?: string
  verifyOTPRequestStatus?: ServiceRequestStatus
}

interface G_LocationConfirmationState extends AppValidationComponentState {
  contentInsetBottom?: any
  appState?: string
  mobileNumber?: Field
  sendOTPIsSuccess?: boolean
}

const bottom_initial = 0;

enum LocationScreenComponent {
  MobileNumberTextField = 1
}

class G_LocationConfirmation extends AppValidationComponent<G_LocationConfirmationProps, G_LocationConfirmationState> implements TextInputListener {

  private checkBox1Formatting: [{}, {}];
  private termsAgreement = false;
  private locationAgreement = false;
  private trueInformationAcknowledgement = false;
  private mobileNumber = ''
  private mobileNumberFieldName = 'Mobile Number'
  private sendOTPRequestInProgress = false
  private mobileSeparator = '-'

  constructor(props: G_LocationConfirmationProps) {
    super(props);
    this.state = { appState: AppState.currentState, contentInsetBottom: bottom_initial, sendOTPIsSuccess: false, mobileNumber: { name: this.mobileNumberFieldName, value: '' } }
    this.checkBox1Formatting = [{ pattern: /Terms of Use/, style: styles.title_link, onPress: this.handleTermsOfUse },
    { pattern: /Privacy Policy/, style: styles.title_link, onPress: this.handlePrivacyPolicy }];
  }



  handleBackButton() {
   
    Alert.alert(
      'Exit App',
      'Are You Sure You Want to Exist the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
        cancelable: false
      }
    )
    return true;
  }

  handleTermsOfUse = () => {
    var weakSelf = this;
 
    weakSelf.props.navigation!.navigate(AppScreens.G_OnlyTermsOfUseView , weakSelf.props)
}

handlePrivacyPolicy = () => {
    var weakSelf = this
    weakSelf.props.navigation!.navigate(AppScreens.G_OnlyPrivacyPolicyView, weakSelf.props)
}


  handleThisForm() {
    Linking.openURL(AppUrls.ThisForm);
  }

  termsSwitchValueChanged(isOn: boolean) {
    this.termsAgreement = isOn
    this.setState({})
  }

  locationSwitchValueChanged(isOn: boolean) {
    if (isOn) {
      //this.getCurrentLocation()
      AlertUtil.showSingleActionMessage(AlertMessages.LocationRequired,function(){ Linking.openURL('app-settings:')})
    }
    this.locationAgreement = isOn
  }

  trueInformationSwitchValueChanged(isOn: boolean) {
    this.trueInformationAcknowledgement = isOn
    this.setState({})
  }

  nextButtonClicked() {
    var sendOTPRequest = new SendOTPRequest(Application.sharedApplication().userMobileNumber)
    var serviceAction = new ServiceAction()
    var responseParser = new SendOTPResponseParser()
    this.props.dispatch!(serviceAction.request(ServiceType.OTP,
      ServiceKeys.SendOTPServiceName,
      sendOTPRequest,
      [this.constructor.name],
      responseParser))
  }

  private submit() {
    var isRequestValid = this.validate({ mobileNumber: { required: true, usphonenumber: true } })
    if (isRequestValid) {
      this.mobileNumber = this.mobileNumber.replace(new RegExp('[' + this.mobileSeparator + ']', 'g'), '')
      Application.sharedApplication().userMobileNumber = this.mobileNumber
      this.nextButtonClicked()
    } else {
      AlertUtil.show(this.getErrorMessages())
    }
  }

  onTextChange(text: string, tag: number) {
    if (text.length > AppConstants.MaxPhoneLength) {
      return
    }
    text = text.replace(new RegExp('[' + this.mobileSeparator + ']', 'g'), '')
    if (text.length <= 3) {

    } else if (text.length > 3 && text.length <= 6) {
      text = text.slice(0, 3) + this.mobileSeparator + text.slice(3, 6)
    } else if (text.length > 6) {
      text = text.slice(0, 3) + this.mobileSeparator + text.slice(3, 6) + this.mobileSeparator + text.slice(6, text.length)
    }
    this.mobileNumber = text
    this.setState({ sendOTPIsSuccess: false, mobileNumber: { name: this.mobileNumberFieldName, value: this.mobileNumber } })
  }

  onFocus(tag: number) {
  }

  onEndEditing(tag: number) {
  }

  async requestLocationPermission() {

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ]);
      if (granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] && granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED) {
        this.createAndDispatchLocationAction()
      } else {
        this.requestLocationPermission();
      }
    } catch (err) {
      Alert.alert(err);
    }

  }

  componentDidMount() {
    this.getCurrentLocation()

    this.setState({ sendOTPIsSuccess: false })

    AppState.addEventListener('change', this._handleAppStateChange.bind(this));

  //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  BackHandler.addEventListener('hardwareBackPress', ()=> this.props.navigation!.goBack(null) );

  }

  componentDidUpdate(props: G_LocationConfirmationProps, state: G_LocationConfirmationState) {
    AppUtil.logConsole('state.sendOTPIsSuccess');

  }

  _handleAppStateChange = () => {
    this.state = { appState: AppState.currentState }
    if (this.state.appState == 'active') {
      this.getCurrentLocation()
    }
  };

  private getCurrentLocation() {
    if (Platform.OS === 'ios') {
      this.createAndDispatchLocationAction()
    }
    else {
      this.requestLocationPermission();
    }
  }

  private createAndDispatchLocationAction() {
    var serviceAction = new ServiceAction()
    this.props.dispatch!(serviceAction.request(ServiceType.Location,
      ServiceKeys.LocationServiceName,
      undefined,
      [this.constructor.name],
      undefined))

  }

  componentWillReceiveProps(nextProps: G_LocationConfirmationProps) {

    if (nextProps.listeners!.includes(this.constructor.name)) {
      if (nextProps.serviceKey === ServiceKeys.LocationServiceName) {
        switch (nextProps.locationRequestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.locationAgreement = true
            Application.sharedApplication().currentUserLocation = nextProps.locationResponse!.location
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.FinishedWithError:
             
            try{
           if(!Application.sharedApplication().currentUserLocation.latitude){         
            AlertUtil.showSingleActionMessage(AlertMessages.LocationRequired,function(){ Linking.openURL('app-settings:')})
            this.locationAgreement = false   
            }
            
          }
          catch(e)
          {

          }
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            this.locationAgreement = false
            break
        }

      }
      if (nextProps.serviceKey === ServiceKeys.SendOTPServiceName) {
        switch (nextProps.sendOTPRequestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess: {
            if (nextProps.serviceKey === ServiceKeys.SendOTPServiceName) {
              this.sendOTPRequestInProgress = false
              //AsyncStorage.setItem("FromForgotOTP", 'false');
              nextProps.navigation!.navigate(AppScreens.G_VerifyOTPView)
            }
            if (nextProps.serviceKey === ServiceKeys.VerifyOTPServiceName) {
              nextProps.navigation!.navigate(AppScreens.G_LoginPage)
            }
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
          }
            break
          case ServiceRequestStatus.FinishedWithError:
            this.sendOTPRequestInProgress = false
            AlertUtil.show(nextProps.currentLocationError!.message)
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
      <Container title={'ProfilePageContent.page_title'}
        isHeader={false}
		isMyHeader={true}
        isSubHeader={false}
        isTitle={false}
        isSetting={false}
        showIndicator={this.sendOTPRequestInProgress}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent} scrollEnabled={true}
        >
          <View style={[styles.mainContent, { backgroundColor: Page2Content.colors }]}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <HalfPageLogo />
            </View>
            <View style={{ alignItems: 'center' }}>

              <ParsedText
                style={styles.headTitle}
                parse={
                  [
                    { pattern: /you|play/, style: styles.headTitle_bold },
                  ]
                }
                childrenProps={{ allowFontScaling: false }}
              >
                {Page2Content.title}
              </ParsedText>


              <ParsedText
                style={styles.title}
                parse={
                  [
                    { pattern: /this form/, style: styles.title_link, onPress: this.handleThisForm },
                    { pattern: /Terms of Use/, style: styles.title_link, onPress: this.handleTermsOfUse },
                  ]
                }
                childrenProps={{ allowFontScaling: false }}
              >
                {Page2Content.centerContent.fullText}
              </ParsedText>
            </View>

            <View style={{ alignSelf: 'stretch', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', marginTop: hp(1), marginBottom: hp(1) }}>
              <InputBoxMobile tag={LocationScreenComponent.MobileNumberTextField}
                placeHolderText={Page2Content.inputPlaceHolder}
                listener={this}
                multiline={true}
                text={this.mobileNumber} />
            </View>
              <Text style={{ flex: 1, alignSelf: 'center'}}> Message and Data Rates May Apply</Text> 
            <View style={{ flex: 1, alignSelf: 'center', alignItems: 'stretch', justifyContent: 'space-evenly', flexDirection: 'column', marginBottom: hp(1.5) }}>

              <View style={styles.checkboxContainer} >
                <CustomToggleButton isChecked={this.termsAgreement}
                  content={Page2Content.checkboxContent1.fullText}
                  formattingText={this.checkBox1Formatting}
                  listener={(isOn: boolean) => { this.termsSwitchValueChanged(isOn) }} />
              </View>

              <View style={styles.checkboxContainer} pointerEvents={this.locationAgreement ? 'none' : 'auto'}>
                <CustomToggleButton isChecked={this.locationAgreement}
                  content={Page2Content.checkboxContent2}
                  listener={(isOn: boolean) => { this.locationSwitchValueChanged(isOn) }} />
              </View>

              <View style={styles.checkboxContainer} >
                <CustomToggleButton isChecked={this.trueInformationAcknowledgement}
                  content={Page2Content.checkboxContent3}
                  listener={(isOn: boolean) => { this.trueInformationSwitchValueChanged(isOn) }} />
              </View>

            </View>
            <View style={{ alignSelf: 'stretch', alignItems: 'stretch', flexDirection: 'column' }} >
              <LongButton title={Page2Content.nextButtonText}
                buttonStyle={{ backgroundColor: '#68bcbc' }}
                enabled={this.termsAgreement && this.locationAgreement && this.trueInformationAcknowledgement}
                listener={() => { this.submit() }} />
              <View style={styles.footerDots}>
                <DotIcon color={styles.$dotColorValue}></DotIcon>
                <DotIcon isFilled={true} color={styles.$dotColorValue}></DotIcon>
                <DotIcon color={styles.$dotColorValue}></DotIcon>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );

  }
}


const mapStateToProps = (state: GlobalAppState) => ({
  locationResponse: state.serviceReducer.response,
  currentLocationError: state.serviceReducer.error,
  locationRequestStatus: state.serviceReducer.requestStatus,
  listeners: state.serviceReducer.listeners,
  serviceKey: state.serviceReducer.serviceKey,
  sendOTPRequestStatus: state.serviceReducer.requestStatus,
  sendOTPResponse: state.serviceReducer.response,
  sendOTPError: state.serviceReducer.error,
  verifyOTPRequestStatus: state.serviceReducer.requestStatus
})
export default connect(mapStateToProps)(G_LocationConfirmation);