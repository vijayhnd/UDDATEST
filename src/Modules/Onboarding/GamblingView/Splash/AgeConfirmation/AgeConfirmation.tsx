import React, { Component } from 'react';
import { View, Text, Dimensions, Alert,Image, BackHandler, AsyncStorage, Platform } from 'react-native';
import FullPageLogo from '../../../../../Components/Logo/FullScreen';
import LongButton from '../../../../../Components/Button/LongButton';
import styles from './styles';
import CustomToggleButton from '../../../../../Components/CustomToggleButton';
import DotIcon from '../../../../../Components/Icons/DotIcon';
import Container from '../../../../../Components/Container';

import { GlobalAppState } from '../../../../../ReduxStore';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AppScreens from '../../../../../Util/AppScreens';
import { IDispatchProps } from '../../../../../Components/IProps';

import { ServiceRequestStatus } from "../../../../../ReduxStore/ServiceState";
import ServiceAction from "../../../../../ReduxStore/Generic/GenericeServiceAction";
import { LoginRequest } from "../../../../../Services/Onboarding/LoginRequest";
import ServiceKeys from "../../../../../Services/Core/ServiceKeys";
import LoginResponse from "../../../../../Services/Onboarding/LoginResponse";
import Application from "../../../../../Entities/Application";
import { ServiceType } from "../../../../../Services/Core/ServiceFactory";
import { UserRepository } from "../../../../../Infrastructure/Repository/UserRespository";
import GuestLoginServiceParser from "../../../../../Services/Onboarding/GuestLoginServiceParser";
import { GuestLoginRequest } from "../../../../../Services/Onboarding/GuestLoginRequest";
import AlertUtil from "../../../../../Util/AlertUtil";
import RouterBuilder from "../../../../../Router";
import UrlService from '../../../../../Services/Core/ServiceURI';
import ReferralService from "../../../../../Services/Referral/ReferralService";
import ProgressLoader from 'rn-progress-loader';
import HalfPageLogo from '../../../../../Components/Logo/HalfScreen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// const screenWidth = Dimensions.get('window');

const Page1Content = {
  key: 'somethun',
  title: 'Quick setup, good defaults',
  text1: 'Bet the Book. Bet a Friend. Bet a Stranger. UDDA (as in "UDDA MAN") is a social sports gaming App that allows users to bet on sports for FREE and win prizes.',
  checkboxContent: 'I hereby acknowledge that I am 18 years of age and am prohibited from allowing any other person to access or use my gaming account.',
  nextButtonText: 'Next',
  icon: 'ios-images',
  colors: '#FFFFFF',
  page: 1
}

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth - wp(10);
const imageHeight = screenWidth - wp(40);
interface G_AgeConfirmationProps extends IDispatchProps {
  response?: LoginResponse
  serviceKey?: string
}

interface G_AgeConfirmationState {
  loader:any;
}

class G_AgeConfirmation extends Component<G_AgeConfirmationProps, G_AgeConfirmationState> {
  private serviceRequestInProgress = false
  private serviceAction = new ServiceAction()
  private referralservice = new ReferralService();
  private Guestparser = new GuestLoginServiceParser()
  private agingTermsAccepted: boolean = false
  // private serviceRequestInProgress = false
  // private serviceAction = new ServiceAction()

  // private Guestparser = new GuestLoginServiceParser()
  constructor(props: G_AgeConfirmationProps) {
    super(props);
    this.state = {
      loader: false
    };
  }

  async componentDidMount() {
    //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    //this.props.navigation!.navigate(AppScreens.G_LocationConfirmation);
    // this.mDashboard();
   // this.setState({loader:true})
    let isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if(isLoggedIn==null){
     // this.setState({loader:false})
      this.getdasboard();
    }else{
     // this.setState({loader:false})
      // this.props.navigation!.replace(AppScreens.G_LoginPage,this.props);
      RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
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



 

  getdasboard() {
    this.setState({ loader: true });
    this.referralservice.goToDashboard().then((res: any) => {
      if (res) {
          this.setState({ loader: false });
          RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props);
      }

  });
  }
  mDashboard() {
    var device_type = Platform.OS === 'ios' ? 'ios' : 'android';
    var loginRequest = new GuestLoginRequest(device_type,
      Application.sharedApplication().Device_token,
      Math.floor(Date.now()),
      '98651428Signature')
   
    this.props.dispatch!(this.serviceAction.request(ServiceType.Onbarding,
      ServiceKeys.GuestLoginServiceName,
      loginRequest,
      [this.constructor.name],
      this.Guestparser));


  }
  componentWillReceiveProps(nextProps: G_AgeConfirmationProps) {
    var that = this;
    if (nextProps.listeners!.includes(this.constructor.name)) {
      switch (nextProps.requestStatus) {
        case ServiceRequestStatus.InProgress:
          this.serviceRequestInProgress = true
          break
        case ServiceRequestStatus.FinishedWithSuccess:
          Application.sharedApplication().user = nextProps.response!.user
          var userType = nextProps.response!.user.profile.userType
          var userRepository = UserRepository.sharedRepository();
          userRepository.saveUser(Application.sharedApplication().user!).then(success => {
          }).catch(error => {
          })

          RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, nextProps);
          this.serviceRequestInProgress = false
          break
        case ServiceRequestStatus.FinishedWithError:
          AlertUtil.show(nextProps.error!.message)
          this.serviceRequestInProgress = false
          break
      }
      var serviceAction = new ServiceAction()
      nextProps.dispatch!(serviceAction.reset())
    }



  }







  render() {
    
    return (
      <Container title={''} isHeader={false} isSubHeader={false} isTitle={false} isSetting={false} showIndicator={this.serviceRequestInProgress} >
    <ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />
          {/* <View style={styles.logoContainer}>
          <View style={{width: screenWidth,alignItems:'center'}}>
                <Image
                    resizeMode="contain"
                    style={{width: imageWidth, height: imageHeight}}
                    source={ require('../../../../../images/logo.png')}
                />
            </View>
          </View> */}
       

          {/*  <View style={styles.titleContainer}>
            <Text style={styles.title} >{Page1Content.text1}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.checkboxContainer}>
              <CustomToggleButton isChecked={this.agingTermsAccepted}
                content={Page1Content.checkboxContent}
                listener={(isOn: boolean) => { this.ageSwitchValueChanged(isOn) }} 
                style={{fontSize: 12}}/>
            </View>
            <LongButton
              buttonStyle={{ backgroundColor: '#68bcbc' }}
              title={Page1Content.nextButtonText}
              enabled={this.agingTermsAccepted}
              listener={() => { this.nextButtonClicked() }} />

          </View>
          <View style={styles.footerDots}>
            <DotIcon isFilled={true} color={styles.$dotColorValue}></DotIcon>
            <DotIcon color={styles.$dotColorValue}></DotIcon>
            <DotIcon color={styles.$dotColorValue}></DotIcon>
          </View>

        </View>
 */}
      </Container>
    );

  }
}

const mapStateToProps = (state: GlobalAppState) => ({
  requestStatus: state.serviceReducer.requestStatus,
  response: state.serviceReducer.response as LoginResponse,
  error: state.serviceReducer.error,
  listeners: state.serviceReducer.listeners
})

export default connect(mapStateToProps)(G_AgeConfirmation);