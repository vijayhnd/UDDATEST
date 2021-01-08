import React from "react";
import { Button, View, ScrollView, PermissionsAndroid, Platform, BackHandler, Alert, AsyncStorage, NativeModules, Image, TouchableOpacity, Text, TouchableWithoutFeedback, TextInput, Linking, ImageBackground } from "react-native";
import styles from './styles';
import FullPageLogo from "../../../../Components/Logo/FullScreen";
import InputBoxText from "../../../../Components/InputBox/Text";
import LinkLabel from "../../../../Components/Text";
import BigButton from "../../../../Components/Button/BigButton";
import SocialButton from "../../../../Components/Button/SocialButton";
import { ButtonType } from "../../../../Components/Button/SocialButton/SocialButton";
import SocialMediaFactory from "../../../../SocialMediaManager";
import { SocialMediaType } from "../../../../SocialMediaManager/SocialMediaFactory";
import DotIcon from '../../../../Components/Icons/DotIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppScreens from "../../../../Util/AppScreens";
import { GlobalAppState } from "../../../../ReduxStore";
import { connect } from 'react-redux';
import Container from '../../../../Components/Container';
import AlertUtil from "../../../../Util/AlertUtil";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps, Field } from "../../../../Util/AppValidationComponent";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import { LoginRequest } from "../../../../Services/Onboarding/LoginRequest";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import LoginResponse from "../../../../Services/Onboarding/LoginResponse";
import Application from "../../../../Entities/Application";
import LoginServiceParser from "../../../../Services/Onboarding/LoginServiceParser";
import { FacebookRegistrationRequest, GoogleRegistrationRequest, TwitterRegistrationRequest } from "../../../../Services/Onboarding/RegistrationRequest";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import twitter, { TWLoginButton } from 'react-native-simple-twitter'
import { TwitterConstants } from "../../../../SocialMediaManager/TwitterManager";
import { UserRepository } from "../../../../Infrastructure/Repository/UserRespository";
import RouterBuilder from "../../../../Router";
import GuestLoginServiceParser from "../../../../Services/Onboarding/GuestLoginServiceParser";
import { GuestLoginRequest } from "../../../../Services/Onboarding/GuestLoginRequest";
import LocationResponse from '../../../../Services/Location/LocationResponse';
import { Location, UDDAError } from '../../../../Entities';
import TouchID from 'react-native-touch-id';
import UrlService from '../../../../Services/Core/ServiceURI';
import Geolocation from '@react-native-community/geolocation';
import { Dialog } from 'react-native-simple-dialogs';
import { AppEventsLogger } from 'react-native-fbsdk';
import ProgressLoader from 'rn-progress-loader';
import ReferralService from "../../../../Services/Referral/ReferralService";
import AlertMessages from '../../../../Util/AlertMessages';
import AppConstants from '../../../../Util/Constants';
import HalfPageLogo from '../../../../Components/Logo/HalfScreen';
import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SignupRequest from '../../../../Services/Onboarding/SignupRequest';
import SignupResponse from '../../../../Services/Onboarding/SignupResponse';
import Otpdialog from "../../../../Components/CustomComponents/OtpDialog/Otp";
import LongButton from '../../../../Components/Button/LongButton';
import CustomToggleButton from "../../../../Components/CustomToggleButton";
const CleverTap = require('clevertap-react-native');
import appsFlyer from 'react-native-appsflyer';
const { RNTwitterSignIn } = NativeModules
const Constants = {
  ///Dev Parse keys
  //TWITTER_COMSUMER_KEY: "qWPj1TXbreMX1SsDvdiQTaF7Y",
  //TWITTER_CONSUMER_SECRET: "4t0cRfGWXZvySIa5sS0M38AnT8a8B8hwcX2lZiaStSWStD4B4Z"
  TWITTER_COMSUMER_KEY: "IiZ5GFjg4o2ZObqJhEK3HQrdP",
  TWITTER_CONSUMER_SECRET: "M6QGTGuCjGEkrs2Udp6gnJRzSJ8DiLhv0pIHenIPmOyvBKbXT4"

}
const LoginPageContent = {
  key: 'somethun',
  centerContent: {
    fullText: 'If you are an employee of a sports governing body or member team who is not prohibited from wagering on sports you must complete this form. For more information read our Terms of Use.'
  },
  inputPlaceHolder: 'XXX-XXX-XXXX',

  checkboxContent1: {
    //fullText: 'I accept these Terms of Use, Privacy Policy, and agree to receive marketing communications and offers from UDDA.'
    fullText: 'I hereby acknowledge that I am 18 years of age and agree to the terms & conditions , privacy policy & contest rules .'
  },
  checkboxContent2: 'Allow UDDA to access your location while you are using the app. This app requires access to your location when the screen is on and the app is displayed.',
  checkboxContent3: 'I certify that all information provided during account registration is true and accurate and that I am not a casino key employee or casino employee prohibited from wagering in a New Jersey casino or simulcasting facility.',
  nextButtonText: 'Submit',
  icon: 'ios-images',
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

interface G_LoginViewProps extends AppValidationComponentProps {
  locationRequestStatus?: ServiceRequestStatus
  locationResponse?: LocationResponse
  currentLocationError?: UDDAError
  serviceKey?: string
  verifyOTPRequestStatus?: ServiceRequestStatus
  phoneSignUpRequestStatus?: ServiceRequestStatus
  phoneSignUpResponse?: SignupResponse
  phoneSignUpError?: UDDAError
  response?: LoginResponse
  error?: UDDAError
}

interface G_LoginViewState extends AppValidationComponentState {
  email?: Field
  password?: Field
  isEnabledTouch: any,
  fingerEnabled: any
  referalDialogue: any;
  referalCode: any;
  loader: any;
  mobileNumber?: Field
  sendOTPIsSuccess?: boolean
  SignIn?: boolean
  displayName?: Field
  otpmodel?: boolean;
  backbtn?: boolean;
}

enum LoginScreenComponents {
  MobileNumberTextField = 1,
  displayNameInput,
}

class G_LoginView extends AppValidationComponent<G_LoginViewProps, G_LoginViewState> {
  private getLat: any
  private getLong: any;
  private checkBox1Formatting: [{}, {}, {}];
  private termsAgreement = false;
  private locationAgreement = true;
  private trueInformationAcknowledgement = false;
  private mobileNumber = ''
  private mobileNumberFieldName = 'Mobile number'
  private displayFieldName = 'Username'
  private sendOTPRequestInProgress = false
  private mobileSeparator = '-';
  private displayName = '';
  private serviceAction = new ServiceAction()
  private parser = new LoginServiceParser()
  public locationCallCount = 0
  private referralservice = new ReferralService(); //Vijay
  constructor(props: G_LoginViewProps) {
    super(props);
    //twitter.setConsumerKey(TwitterConstants.consumernKey, TwitterConstants.consumerSecret)
    this.state = {
      otpmodel: false, sendOTPIsSuccess: false, SignIn: false,
      mobileNumber: { name: this.mobileNumberFieldName, value: '' },
      displayName: { name: this.displayFieldName, value: '' }, isEnabledTouch: 'failed', fingerEnabled: false, referalDialogue: false,
      referalCode: '', loader: false, backbtn: true,
    };
    this.checkBox1Formatting = [{ pattern: /terms & conditions/, style: styles.title_link, onPress: this.handleTermsOfUse.bind('terms') },
    { pattern: /privacy policy/, style: styles.title_link, onPress: this.handleTermsOfUse.bind('privacy') },{ pattern: /contest rules/, style: styles.title_link, onPress: this.handleTermsOfUse.bind('contest') }];
    // this.checkBox1Formatting = [{ pattern: /terms & conditions/, style: styles.title_link, onPress: this.handleTermsOfUse },
    //   { pattern: /privacy policy/, style: styles.title_link, onPress: this.handlePrivacyPolicy },{ pattern: /contest rules/, style: styles.title_link, onPress: this.handlePrivacyPolicy }];
    console.log('test1');
  }
  handleTermsOfUse = (item:any) => {
    var weakSelf = this;

    weakSelf.props.navigation!.navigate(AppScreens.G_OnlyTermsOfUseView, {params:{type:item}})
  }

  handlePrivacyPolicy = () => {
    var weakSelf = this
    weakSelf.props.navigation!.navigate(AppScreens.G_OnlyPrivacyPolicyView, weakSelf.props)
  }
  private submit() {
    // this.closecurrent()
    this.referralservice.getLocation().then((res) => {
      var isRequestValid = this.validate({
        mobileNumber: { required: true, usphonenumber: true },
        displayName: { required: true },
      })
      if (isRequestValid) {
        this.mobileNumber = this.mobileNumber.replace(new RegExp('[' + this.mobileSeparator + ']', 'g'), '');
        Application.sharedApplication().userMobileNumber = this.mobileNumber;
        this.createAndDispatchRegistrationRequest()
      } else {
        AlertUtil.show(this.getErrorMessages())
      }

    }).catch((err) => {
      AlertUtil.show(AlertMessages.LocationRequired);

    });

  }

  private createAndDispatchRegistrationRequest() {
    var device_type = Platform.OS === 'ios' ? 'ios' : 'android';
    var registrationRequest = new SignupRequest(this.displayName,

      Application.sharedApplication().userMobileNumber!,
      device_type,
      Application.sharedApplication().Device_token,
      Math.floor(Date.now()),
      '98651428Signature',
      Application.sharedApplication().currentUserLocation!.latitude,
      Application.sharedApplication().currentUserLocation!.longitude);
    console.log(registrationRequest);
    var serviceAction = new ServiceAction()
    this.props.dispatch!(serviceAction.request(ServiceType.Onbarding,
      ServiceKeys.PhoneSignUp,
      registrationRequest,
      [this.constructor.name]))
  }

  async componentDidMount() {
    //appsFlyer.logEvent('sign_up',{})
    console.log('ashish login props', this.props.phoneSignUpRequestStatus)
    this.closecurrent()
    //console.log('vijaytest1');
    let isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    let FingerPopup = await AsyncStorage.getItem('FingerPopup');
    if (isLoggedIn != null) {
      this.setState({ backbtn: false });
      this.setState({ SignIn: true });
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    } else {
      // BackHandler.addEventListener('hardwareBackPress',  this.goBackToDashboard);

    }

    if (Platform.OS === 'ios') {
      this.createAndDispatchLocationAction()
    }
    else {
      this.requestLocationPermission();
    }
    //this.requestLocationPermission(); //garima
    if (FingerPopup == 'true') {
      console.log('ashish login props dashboard', this.props.phoneSignUpRequestStatus)
      AsyncStorage.removeItem('FingerPopup')
    } else {
      this.checkFingerPrint();
      AsyncStorage.getItem('fingerprint').then((data) => {
        if (data == 'true') {
          this.setState({ fingerEnabled: true });
          this.fingerPrintAuthenticate()
        }
      });
    }

    //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation!.goBack(null));
  }
  /*  createAndDispatchLocationAction() {
     Geolocation.watchPosition((position) => {
       let region = {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: 0.00922 * 1.5,
         longitudeDelta: 0.00421 * 1.5
       }
 
       Application.sharedApplication().currentUserLocation = region;
     })
   } */
  onTextChange(text: string, tag: number) {
    switch (tag) {
      case LoginScreenComponents.MobileNumberTextField:
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
        this.setState({ mobileNumber: { name: this.mobileNumberFieldName, value: this.mobileNumber } })
        break
      case LoginScreenComponents.displayNameInput:
        this.displayName = text
        this.setState({ displayName: { name: this.displayFieldName, value: this.displayName } })
        break
    }
  }


  _twitterSignIn = (callback: any, context: this) => {
    // return;
    this.referralservice.getLocation().then((res) => {
      RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
      RNTwitterSignIn.logIn()
        .then(loginData => {
          console.log(loginData)
          const { authToken, authTokenSecret, email } = loginData
          if (authToken && authTokenSecret) {
            callback(loginData, context);
          }
        })
        .catch(error => {
          console.log(error)
        }
        )

    }).catch((err) => {
      AlertUtil.show(AlertMessages.LocationRequired);

    });

  }




  /* Vijay For Finger Print Code Start*/
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
    TouchID.authenticate(LoginPageContent.fingerPrintDescription, optionalConfigObject)
      .then((success: any) => {
        AsyncStorage.getItem('authenticationToken').then((token) => {
          this.getProfileData(token);
        })
      })
      .catch((error: any) => {
        Alert.alert('Authentication Failed');
      });
  }

  public fingerPrintRegistration(): Promise<any> {
    return new Promise(function (resolve, reject) {
      TouchID.authenticate(LoginPageContent.fingerPrintDescription, optionalConfigObject)
        .then((success: any) => {
          resolve(true);
        })
        .catch((error: any) => {
          resolve(false);

        });

    })
  }





  getProfileData(token: any) {
    var ths = this;
    this.referralservice.getLocation().then((res) => {
      // console.log('isresponse',res);
      ths.setState({ loader: true });
      fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/api/user_info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorisation': token,
          'latitude': Application.sharedApplication().currentUserLocation!.latitude,
          'longitude': Application.sharedApplication().currentUserLocation!.longitude,


        },
      }).then((response) => response.json())
        .then((responseJson) => {
          ths.setState({ loader: false });
          console.log('GETPromotionalMSG ' + JSON.stringify(responseJson));
          if (responseJson.message == "Access Expired.") {
            AlertUtil.show("Session Expired ! Please login again");
            console.log("Footer comp ---->" + responseJson.message);
            this.setState({ fingerEnabled: false });
            AsyncStorage.setItem('fingerprint', 'false');
          } else if (responseJson.error == '1107') {
            AlertUtil.show(responseJson.message);
          } else {
            var userData = responseJson;
            userData.data.token = userData.data.access_token;
            var data = ths.parser.parse(userData);
            console.log(data);
            Application.sharedApplication().user = data.user;
            var userRepository = UserRepository.sharedRepository()
            userRepository.saveUser(Application.sharedApplication().user!).then(success => {
            }).catch(error => {
            })
            RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);

          }

        })
        .catch(error => {
          ths.setState({ loader: true });
          console.log(error);
        })

    }).catch((err) => {
      AlertUtil.show(AlertMessages.LocationRequired);

    });


  }

  /* Vijay For Finger Print Code End*/

  //garima


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

  //garima
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

  handleBackButton() {
    Alert.alert(
      'Exit App',
      'Are You Sure You Want to Exit the application?', [{
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



  onFocus(tag: number) {
    
  }

  onEndEditing(tag: number) {

  }
  twitterSignIn123(callback: any, context: this) {
    //RNTwitterSignIn.init(TwitterConstants.consumernKey, TwitterConstants.consumerSecret)
    RNTwitterSignIn.logIn()
      .then((loginData: any) => {
        console.log(loginData)
        const { authToken, authTokenSecret } = loginData
        if (authToken && authTokenSecret) {
          callback(loginData, context);
        }
      })
      .catch((error: any) => {
        console.log(error)
      }
      )
  }


  async handleSignin(callback: any, context: this) {
    if (Platform.Version < 11) {
      AlertUtil.show('Apple sign-in is not supported on this device version.')
    }
    else {
      try {
        let res = await this.referralservice.getLocation();
        // performs login request
        try {
          const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
          });

          // get current authentication state for user
          const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

          // use credentialState response to ensure the user is authenticated
          if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
            // user is authenticated
            //alert(' sign Succesfully '+JSON.stringify(appleAuthRequestResponse))
            callback(appleAuthRequestResponse, context);

          }
          else {

          }
        }
        catch (e) {

        }
      } catch (error) {
        AlertUtil.show(AlertMessages.LocationRequired);
      }



    }
  }


  callAPSignIn(result: any, context: this) {
    // this.closecurrent()

    var device_type = Platform.OS === 'ios' ? 'ios' : 'android';

    // var username: any = result.fullName.split(" ");
    //console.log('fb name' + JSON.stringify(username));
    var firstName = '';
    var lastName = '';
    var useremail = '';
    
    if (result.fullName.givenName) {
      firstName = result.fullName.givenName;
    }

    if (result.fullName.familyName) {
      lastName = result.fullName.familyName;
    }
    if (result.email) {
      useremail = result.email;
    }
    var facebookRegistrationRequest = new FacebookRegistrationRequest(useremail,
      '',
      firstName,
      lastName,
      '',
      result.user,
      device_type,
      Application.sharedApplication().Device_token,
      Math.floor(Date.now()),
      '98651428Signature',
      Application.sharedApplication().currentUserLocation!.latitude,
      Application.sharedApplication().currentUserLocation!.longitude, 'apple', ((Application.sharedApplication().user && Application.sharedApplication().user!.authenticationToken)) ? Application.sharedApplication().user!.authenticationToken : '')

    context.props.dispatch!(context.serviceAction.request(ServiceType.Onbarding,
      ServiceKeys.FacebookRegistrationServiceName,
      facebookRegistrationRequest,
      [context.constructor.name],
      context.parser));



  }

  doFaceBookLogin(callback: any, context: this) {
    // this.closecurrent()
    this.referralservice.getLocation().then((res) => {
      let manager = SocialMediaFactory.createManager(SocialMediaType.FACEBOOK)
      manager.login().then(
        function (result: any) {
          console.log('Login success');
          console.log(result);
        //  CleverTap.pushProfile('facebook',result);
          callback(result, context);

        },
        function (error: any) {
          console.log('Login failed with error: ' + error);
        }
      );

    }).catch((err) => {
      AlertUtil.show(AlertMessages.LocationRequired);

    });

  }

  closeModal() {
    this.setState({ otpmodel: !this.state.otpmodel });
  }

  callFBSignIn(result: any, context: this) {
    // this.closecurrent()

    var device_type = Platform.OS === 'ios' ? 'ios' : 'android';
    var username: any = result.name.split(" ");
    console.log('fb name' + JSON.stringify(username));
    CleverTap.onUserLogin({'Name':  username[0], 'Identity': result.id, 'Email': ' ', 'custom': Application.sharedApplication().Device_token,'Photo':' '});
    CleverTap.setLocation(  Application.sharedApplication().currentUserLocation!.latitude, Application.sharedApplication().currentUserLocation!.longitude);
    
    var facebookRegistrationRequest = new FacebookRegistrationRequest('',
      '',
      username[0],
      username[1],
      '',
      result.id,
      device_type,
      Application.sharedApplication().Device_token,
      Math.floor(Date.now()),
      '98651428Signature',
      Application.sharedApplication().currentUserLocation!.latitude,
      Application.sharedApplication().currentUserLocation!.longitude, 'FB', ((Application.sharedApplication().user && Application.sharedApplication().user!.authenticationToken)) ? Application.sharedApplication().user!.authenticationToken : '')

    context.props.dispatch!(context.serviceAction.request(ServiceType.Onbarding,
      ServiceKeys.FacebookRegistrationServiceName,
      facebookRegistrationRequest,
      [context.constructor.name],
      context.parser));
  }

  callGoogleSignIn(result: any, context: this) {
    //this.closecurrent()
    var device_type = Platform.OS === 'ios' ? 'ios' : 'android';
    CleverTap.onUserLogin({'Name': result.user.givenName, 'Identity': result.user.id, 'Email':result.user.email, 'custom': Application.sharedApplication().Device_token,'Photo':result.user.photo});
    CleverTap.setLocation(  Application.sharedApplication().currentUserLocation!.latitude, Application.sharedApplication().currentUserLocation!.longitude);
    
    var googleRegistrationRequest = new GoogleRegistrationRequest(result.user.email,
      '',
      result.user.givenName,
      result.user.familyName,
      result.user.photo,
      result.user.id,
      device_type,
      Application.sharedApplication().Device_token,
      Math.floor(Date.now()),
      '98651428Signature',
      Application.sharedApplication().currentUserLocation!.latitude,
      Application.sharedApplication().currentUserLocation!.longitude, ((Application.sharedApplication().user && Application.sharedApplication().user!.authenticationToken)) ? Application.sharedApplication().user!.authenticationToken : '')
    context.props.dispatch!(context.serviceAction.request(ServiceType.Onbarding,
      ServiceKeys.GoogleRegistrationServiceName,
      googleRegistrationRequest,
      [context.constructor.name],
      context.parser));
  }

  doGoogleLogin(callback: any, context: this) {



    this.referralservice.getLocation().then((res) => {
      let manager = SocialMediaFactory.createManager(SocialMediaType.GOOGLE)
      manager.login().then(
        function (result: any) {
          console.log('Login success');
          console.log(result);
          callback(result, context);
        },
        function (error: any) {
          console.log('Login failed with error: ' + error);
        }
      );

    }).catch((err) => {
      AlertUtil.show(AlertMessages.LocationRequired);

    });
  }

  callTwitterSignIn(result: any, context: this) {
    // this.closecurrent()
    var device_type = Platform.OS === 'ios' ? 'ios' : 'android';
    CleverTap.onUserLogin({'Name': result.userName, 'Identity':  result.userID, 'Email':result.email, 'custom': Application.sharedApplication().Device_token,'Photo':''});
    CleverTap.setLocation(  Application.sharedApplication().currentUserLocation!.latitude, Application.sharedApplication().currentUserLocation!.longitude);
    
    var twitterRegisrationRequest = new TwitterRegistrationRequest(result.email,
      '',
      result.userName,
      '',
      '',
      result.userID,
      device_type,
      Application.sharedApplication().Device_token,
      Math.floor(Date.now()),
      '98651428Signature',
      Application.sharedApplication().currentUserLocation!.latitude,

      Application.sharedApplication().currentUserLocation!.longitude, ((Application.sharedApplication().user && Application.sharedApplication().user!.authenticationToken)) ? Application.sharedApplication().user!.authenticationToken : '')
    context.props.dispatch!(context.serviceAction.request(ServiceType.Onbarding,
      ServiceKeys.TwitterRegistrationServiceName,
      twitterRegisrationRequest,
      [context.constructor.name],
      context.parser));
  }

  createAccountLinkPressed() {
    this.props.navigation!.navigate(AppScreens.G_RegistrationView);
  }

  async closecurrent() {
    try {
      await AsyncStorage.removeItem('reffer_dialog');

    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }


  async doLogin() {
    //  this.closecurrent()
    this.referralservice.getLocation().then((res) => {
      console.log('isresponse', res);
      var isRequestValid = this.validate({
        mobileNumber: { required: true, usphonenumber: true },
      })

      var device_type = Platform.OS === 'ios' ? 'ios' : 'android';

      if (isRequestValid) {
        this.mobileNumber = this.mobileNumber.replace(new RegExp('[' + this.mobileSeparator + ']', 'g'), '');
        Application.sharedApplication().userMobileNumber = this.mobileNumber;
        CleverTap.onUserLogin({'Name': '','Identity': Application.sharedApplication().userMobileNumber, 'Phone':Application.sharedApplication().userMobileNumber, 'custom': Application.sharedApplication().Device_token,'Photo':'','Lat': ((Application.sharedApplication().currentUserLocation && Application.sharedApplication().currentUserLocation!.latitude)) ? Application.sharedApplication().currentUserLocation!.latitude : 0.00,'Long': ((Application.sharedApplication().currentUserLocation && Application.sharedApplication().currentUserLocation!.longitude)) ? Application.sharedApplication().currentUserLocation!.longitude : 0.00});
        CleverTap.setLocation( ((Application.sharedApplication().currentUserLocation && Application.sharedApplication().currentUserLocation!.latitude)) ? Application.sharedApplication().currentUserLocation!.latitude : 0.00, ((Application.sharedApplication().currentUserLocation && Application.sharedApplication().currentUserLocation!.longitude)) ? Application.sharedApplication().currentUserLocation!.longitude : 0.00);
        var loginRequest = new LoginRequest(Application.sharedApplication().userMobileNumber,
          // this.password,
          device_type,
          Application.sharedApplication().Device_token,
          Math.floor(Date.now()),
          '98651428Signature',
          ((Application.sharedApplication().currentUserLocation && Application.sharedApplication().currentUserLocation!.latitude)) ? Application.sharedApplication().currentUserLocation!.latitude : 0.00,
          ((Application.sharedApplication().currentUserLocation && Application.sharedApplication().currentUserLocation!.longitude)) ? Application.sharedApplication().currentUserLocation!.longitude : 0.00)

        //  Application.sharedApplication().currentUserLocation!.latitude,
        // Application.sharedApplication().currentUserLocation!.longitude)

        this.props.dispatch!(this.serviceAction.request(ServiceType.Onbarding,
          ServiceKeys.phoneLoginURI,
          loginRequest,
          [this.constructor.name],
          this.parser));
      } else {
        AlertUtil.show(this.getErrorMessages())
      }
    }).catch((err) => {
      AlertUtil.show(AlertMessages.LocationRequired);

    });


  }





  componentWillReceiveProps(nextProps: G_LoginViewProps) {

    var that = this;
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

            try {
              if (typeof Application.sharedApplication().currentUserLocation == 'undefined' ) {
            //     if(Platform.OS != 'ios')
            //  {
            //     AlertUtil.showSingleActionMessage(AlertMessages.LocationRequired, function () {
            //       //Linking.openURL('app-settings:')
            //       //Linking.openURL('App-Prefs:Bluetooth'); 
            //     })
            //   }
                this.locationAgreement = false
             
              }

            }
            catch (e) {
              // console.log('mye0',e);
            }
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            this.locationAgreement = false
            break
        }

      } else if (nextProps.serviceKey === ServiceKeys.PhoneSignUp) {
        switch (nextProps.phoneSignUpRequestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess: {
            this.sendOTPRequestInProgress = false;
            this.setState({ otpmodel: true });
            AsyncStorage.setItem('displayname', this.displayName);
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
          }
            break
          case ServiceRequestStatus.FinishedWithError:
            this.sendOTPRequestInProgress = false

            AlertUtil.show(nextProps.phoneSignUpError!.message);
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            this.sendOTPRequestInProgress = true
            break
        }

      } else if (nextProps.serviceKey === ServiceKeys.phoneLoginURI) {
        switch (nextProps.phoneSignUpRequestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess: {
            this.sendOTPRequestInProgress = false;
            this.setState({ otpmodel: true });
            AsyncStorage.setItem('displayname', '');
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
          }
            break
          case ServiceRequestStatus.FinishedWithError:
            this.sendOTPRequestInProgress = false

            AlertUtil.show(nextProps.phoneSignUpError!.message);
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            this.sendOTPRequestInProgress = true
            break
        }

      } else if (nextProps.serviceKey === ServiceKeys.FacebookRegistrationServiceName || nextProps.serviceKey === ServiceKeys.GoogleRegistrationServiceName || nextProps.serviceKey === ServiceKeys.TwitterRegistrationServiceName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.InProgress:
            this.sendOTPRequestInProgress = true
            break
          case ServiceRequestStatus.FinishedWithSuccess:
            var userRepository = UserRepository.sharedRepository();
            userRepository.removeUser();

            Application.sharedApplication().user = nextProps.response!.user
            var userType = nextProps.response!.user.profile.userType;
            var isSocialExist = nextProps.response!.user.profile.referral_popup_show;;

            //var userRepository = UserRepository.sharedRepository();
            userRepository.saveUser(Application.sharedApplication().user!).then(success => {
            }).catch(error => {
            })
       
            if (isSocialExist == '1') {
              that.setState({ referalDialogue: true });

              if (UrlService.isLiveApp == '1') {

                that.referralservice.logEvent('sign_up', {});
                CleverTap.recordEvent('sign_up');
                appsFlyer.logEvent('sign_up',{})
                //AppEventsLogger.logEvent('sign_up');

                AppEventsLogger.logEvent('fb_mobile_complete_registration','','USD');
              }
            } else {
              that.fingerPrintLoginCode();

            }

            this.sendOTPRequestInProgress = false
            break
          case ServiceRequestStatus.FinishedWithError:
            AlertUtil.show(nextProps.error!.message)
            this.sendOTPRequestInProgress = false
            break
        }
        var serviceAction = new ServiceAction()
        nextProps.dispatch!(serviceAction.reset())

      }
    }

    //garima

  }

  onGetAccessToken = (token: string) => {
    console.log("oauthtoken")
    console.log(token)
  }

  onSuccess = (user: any) => {
    console.log(user)
    this.callTwitterSignIn(user, this)
  }

  onClose = (e: any) => {
    console.log("press close button")
  }

  onError = (err: any) => {
    console.log(err)
  }

  GotoForgotScreen() {
    //RouterBuilder.replaceRouteTo(AppScreens.G_ForgotPassword, this.props)
    this.props.navigation!.navigate(AppScreens.G_ForgotPassword);
  }
  gotodashboard() {
    var that = this;
    var referral_popup_show = Application.sharedApplication().user!.profile!.referral_popup_show;
    
    if (referral_popup_show == '1') {
      var that = this
      setTimeout(() => {

        that.setState({ referalDialogue: true });
        that.referralservice.logEvent('sign_up', {});
        AppEventsLogger.logEvent('fb_mobile_complete_registration','','USD');
        CleverTap.recordEvent('sign_up');
        appsFlyer.logEvent('sign_up',{})
        
      }, 2000);
    } else {
      RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);
    }

  }
  goBackToDashboard() {
    this.setState({ loader: true });
    this.referralservice.goToDashboard().then((res: any) => {
      if (res) {
        this.setState({ loader: false });
        RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);
      }

    });
    return true;
  }
  closeReferalDialogue() {
    this.setState({ referalDialogue: false });
    this.fingerPrintLoginCode();
  }
  submitReferalCodeAPI() {
    //this.fingerPrintLoginCode();
    if (this.state.referalCode.trim() == '') {
      AlertUtil.show("Please enter referral code!");
    } else {
      var token = Application.sharedApplication().user!.authenticationToken;
      var ths = this;
      this.setState({ loader: true });
      var params: any = {
        'referee_code': this.state.referalCode,
      };

      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }
      fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/referral/social_update_referral_code', {
        method: 'POST',
        headers: {
          'authorisation': token
        },
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log('referalCode Api Response ' + JSON.stringify(responseJson));
          ths.setState({ loader: false });
          if (responseJson.message == "Access Expired.") {
            AlertUtil.show("Session Expired ! Please login again");
            console.log("Footer comp ---->" + responseJson.message);

          } else {
            if (responseJson.error == 0) {
              ths.fingerPrintLoginCode();
            } else {
              AlertUtil.show(responseJson.message);
            }

          }


        })
        .catch(error => {
          console.log(error);
          ths.setState({ loader: false });
        })
    }
  }

  fingerPrintLoginCode() {

    // console.log('Application',JSON.stringify(Application.sharedApplication().user));
    var userType = Application.sharedApplication().user!.profile!.userType;
    console.log('userType', userType)

    AsyncStorage.setItem('fingerprint', 'false');
    if (this.state.isEnabledTouch != 'failed' && userType != 'Guest') {
      AsyncStorage.getItem('fingerprint').then((data) => {
        if (data == 'true') {
          RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);

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
              console.log('failed with error: ' + error);
            }
          );
          RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);

        }
      });

    } else {
      console.log('Finger print is not available or enabled');
      RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);
    }
  }

  trueInformationSwitchValueChanged(isOn: boolean) {
    this.trueInformationAcknowledgement = isOn
    this.setState({})
  }
  termsSwitchValueChanged(isOn: boolean) {
    this.termsAgreement = isOn
    this.setState({})
  }
  render() {

    const rememberMeFormatting =
      [
        { pattern: /Remember me/, style: styles.forgot_password_remember_me }
      ];
    var th = this;
    return (

      <Container title={'ProfilePageContent.page_title'}
        isHeader={false}
        isMyHeader={false}
        isSubHeader={false}
        isTitle={false}
        isSetting={false}
        showIndicator={this.sendOTPRequestInProgress}>


        <Dialog
          visible={this.state.referalDialogue}
          title=""
          onTouchOutside={() => this.closeReferalDialogue()} >
          <View style={{ backgroundColor: "transparent" }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '85%' }}>
                <Text style={{ padding: 5, paddingHorizontal: 13, fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0), marginTop: 3, color: '#68bcbc' }}>Referral</Text>
              </View>
              <View style={{ width: '15%' }}>
                <TouchableWithoutFeedback onPress={() => this.closeReferalDialogue()}>
                  <View>
                    <Image source={require('../../../../images/close.png')} style={{ height: 13, width: 13, alignSelf: 'flex-end', marginRight: 8, marginTop: 10 }}></Image>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={{ justifyContent: "center", backgroundColor: "#FFF" }} >
              <View style={{ justifyContent: "center", padding: 8, paddingHorizontal: 15 }}>
                <View style={{ padding: 1, borderColor: '#dddddd', borderWidth: 1, marginTop: 5, }}>
                  <TextInput
                    value={this.state.referalCode}
                    onChangeText={(text) => this.setState({ referalCode: text })}
                    placeholder='Enter Referral Code'
                    placeholderTextColor={'#666666'}
                    style={{ padding: 6, fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), width: '100%', height: 'auto' }}
                    multiline={true}
                  />
                </View>

                <View style={{ flexDirection: 'row' }}>

                  <View style={{ width: '75%' }}>
                    <BigButton title="SUBMIT"
                      style={{ width: '100%', marginTop: 10, paddingTop: hp(0.4), paddingBottom: hp(0.4), paddingLeft: hp(2.0), paddingRight: hp(2.0), backgroundColor: '#68bcbc', alignSelf: 'flex-end' }}
                      textStyle={{ fontSize: hp(2.0), textAlign: 'center', color: 'white', padding: 5 }}
                      listener={() => { this.submitReferalCodeAPI() }} />
                  </View>
                  <View style={{ width: '25%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
                    <Text style={{ padding: 5, paddingHorizontal: 13, fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0), marginTop: 3, color: '#f26522', textDecorationLine: 'underline', textDecorationColor: '#f26522' }} onPress={() => this.closeReferalDialogue()}>Skip</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Dialog>

        <ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />
        {this.state.backbtn && <TouchableWithoutFeedback onPress={() => this.goBackToDashboard()}>

          <Image source={require('../../../../images/back_btn.png')} style={{ width: wp(8), height: wp(8) }} resizeMode='contain' />


        </TouchableWithoutFeedback>}
        {this.state.otpmodel ? <Otpdialog detailmodel={this.state.otpmodel} gotodashboard={() => {
          this.gotodashboard();
        }} onDismiss={() => {
          this.closeModal();
        }} /> : null}
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent} scrollEnabled={true}
        >
          <View style={[styles.mainContent, { backgroundColor: LoginPageContent.colors }]}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <HalfPageLogo />
            </View>
            <View style={styles.inputBoxesWrapper}>
              <View style={styles.inputBoxWrapper}>
                {/* <InputBoxMobile tag={LocationScreenComponent.MobileNumberTextField}
              placeHolderText={Page2Content.inputPlaceHolder}
              listener={this}
              multiline={true}
              text={this.mobileNumber} /> */}
                <InputBoxText placeHolderText={'ENTER MOBILE NUMBER'} keyboardType={'phone-pad'} tag={LoginScreenComponents.MobileNumberTextField} listener={this} />
              </View>
              {this.state.SignIn ? null : <View style={styles.inputBoxWrapper}>
                <InputBoxText placeHolderText={'ENTER USER NAME'} tag={LoginScreenComponents.displayNameInput} listener={this} />
              </View>}
            </View>

            {this.state.SignIn ? null : <View style={{ alignItems: 'stretch', justifyContent: 'center', flexDirection: 'column', marginBottom: hp(1.5), marginTop: hp(1.5) }}>

              <View style={styles.checkboxContainer} >
                <CustomToggleButton isChecked={this.termsAgreement}
                  content={LoginPageContent.checkboxContent1.fullText}
                  formattingText={this.checkBox1Formatting}
                  listener={(isOn: boolean) => { this.termsSwitchValueChanged(isOn) }} />
              </View>

              {/*<View style={styles.checkboxContainer} pointerEvents={this.locationAgreement ? 'none' : 'auto'}>
  <CustomToggleButton isChecked={this.locationAgreement}
    content={Page2Content.checkboxContent2}
    listener={(isOn: boolean) => { this.locationSwitchValueChanged(isOn) }} />
</View> */}

              <View style={[styles.checkboxContainer, { marginTop: 10 }]} >
                <CustomToggleButton isChecked={this.trueInformationAcknowledgement}
                  content={LoginPageContent.checkboxContent3}
                  listener={(isOn: boolean) => { this.trueInformationSwitchValueChanged(isOn) }} />
              </View>

            </View>}

            {this.state.SignIn ? <View style={{ alignSelf: 'stretch', alignItems: 'stretch', flexDirection: 'column', marginTop: 15 }} >
              <LongButton title={'Sign in'}
                buttonStyle={{ backgroundColor: '#68bcbc' }}
                enabled={true}
                listener={() => {
                  this.doLogin()
                }} />
              <Text onPress={() => { this.setState({ SignIn: !this.state.SignIn }) }} style={{ color: '#68bcbc', fontFamily: 'Montserrat-Bold', marginTop: 15, textDecorationLine: 'underline', textDecorationColor: '#68bcbc', textAlign: 'right' }}>Sign Up</Text>
              <Text style={{ alignSelf: 'center', color: 'black', fontFamily: 'Montserrat-Bold', marginTop: 15 }}> Or Continue with</Text>
            </View> : <View style={{ alignSelf: 'stretch', alignItems: 'stretch', flexDirection: 'column', marginTop: 15 }} >
                <LongButton title={'Sign up'}
                  buttonStyle={{ backgroundColor: '#68bcbc' }}
                  enabled={this.termsAgreement && this.trueInformationAcknowledgement}
                  listener={() => {
                    this.submit()
                  }} />
                <Text onPress={() => { this.setState({ SignIn: !this.state.SignIn }) }} style={{ color: '#68bcbc', fontFamily: 'Montserrat-Bold', marginTop: 15, textDecorationLine: 'underline', textDecorationColor: '#68bcbc', textAlign: 'right' }}>Existing User!</Text>
                <Text style={{ alignSelf: 'center', color: 'black', fontFamily: 'Montserrat-Bold', marginTop: 15 }}> Or Continue with</Text>
              </View>}

            <View style={{ alignSelf: 'stretch', alignItems: 'stretch', flexDirection: 'column', marginTop: 15 }} >
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity onPress={() => { this.doFaceBookLogin(this.callFBSignIn, this) }} style={{ width: '45%', height: 50, borderRadius: 25, borderWidth: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderColor: 'white' }}>

                  <ImageBackground source={require('../../../../images/facebook.png')}
                    resizeMode="stretch"
                    style={{ width: '100%', height: '100%' }}></ImageBackground>

                </TouchableOpacity>
                <View style={{ width: '5%' }}></View>
                <TouchableOpacity onPress={() => { this.doGoogleLogin(this.callGoogleSignIn, this) }} style={{ width: '45%', height: 50, borderRadius: 25, borderWidth: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderColor: 'white' }}>
                  <ImageBackground source={require('../../../../images/google.png')}
                    resizeMode="stretch"
                    style={{ width: '100%', height: '100%' }}></ImageBackground>
                </TouchableOpacity>
              </View>
            </View>

            {Platform.OS === 'ios' ? <View style={{ alignSelf: 'stretch', alignItems: 'stretch', flexDirection: 'column', marginTop: 15 }} >
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity onPress={() => { this._twitterSignIn(this.callTwitterSignIn, this) }} style={{ width: '45%', height: 50, borderRadius: 25, borderWidth: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderColor: 'white' }}>
                  <ImageBackground source={require('../../../../images/twitter12.png')}
                    resizeMode="stretch"
                    style={{ width: '100%', height: '100%' }}></ImageBackground>
                </TouchableOpacity>
                <View style={{ width: '5%' }}></View>
                <TouchableOpacity onPress={() => { this.handleSignin(this.callAPSignIn, this) }} style={{ width: '45%', height: 50, borderRadius: 25, borderWidth: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderColor: 'white' }}>
                  <ImageBackground source={require('../../../../images/apple.png')}
                    resizeMode="stretch"
                    style={{ width: '100%', height: '100%' }}></ImageBackground>
                </TouchableOpacity>
              </View>
            </View> : <View style={{ alignItems: 'center', flexDirection: 'column', marginTop: 15, justifyContent: 'center', alignContent: 'center' }} >

                <TouchableOpacity onPress={() => { this._twitterSignIn(this.callTwitterSignIn, this) }} style={{ width: '45%', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderColor: 'white' }}>
                  <ImageBackground source={require('../../../../images/twitter12.png')}
                    resizeMode="stretch"
                    style={{ width: '100%', height: '100%' }}></ImageBackground>
                </TouchableOpacity>

              </View>}

            {/* <View style={{ alignSelf: 'stretch', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', marginTop: hp(1), marginBottom: hp(1) }}>
            <InputBoxMobile tag={LocationScreenComponent.MobileNumberTextField}
              placeHolderText={Page2Content.inputPlaceHolder}
              listener={this}
              multiline={true}
              text={this.mobileNumber} />
          </View>
            <Text style={{ flex: 1, alignSelf: 'center'}}> Message and Data Rates May Apply</Text>  */}


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
  verifyOTPRequestStatus: state.serviceReducer.requestStatus,
  phoneSignUpRequestStatus: state.serviceReducer.requestStatus,
  phoneSignUpResponse: state.serviceReducer.response,
  phoneSignUpError: state.serviceReducer.error,
  requestStatus: state.serviceReducer.requestStatus,
  response: state.serviceReducer.response as LoginResponse,
  error: state.serviceReducer.error,
})

export default connect(mapStateToProps)(G_LoginView);