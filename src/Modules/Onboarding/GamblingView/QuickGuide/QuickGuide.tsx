import React from "react";
import AppValidationComponent, {  AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, TouchableWithoutFeedback, Image,StyleSheet,TouchableOpacity,Dimensions} from "react-native";
//import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import { GlobalAppState } from "../../../../ReduxStore";
import { connect } from 'react-redux';
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import { LoginRequest } from "../../../../Services/Onboarding/LoginRequest";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import LoginResponse from "../../../../Services/Onboarding/LoginResponse";
import Application from "../../../../Entities/Application";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { UserRepository } from "../../../../Infrastructure/Repository/UserRespository";
import GuestLoginServiceParser from "../../../../Services/Onboarding/GuestLoginServiceParser";
import { GuestLoginRequest } from "../../../../Services/Onboarding/GuestLoginRequest";
import { ProgressIndicator } from '../../../../Components/CustomComponents/Indicator';
import AlertUtil from "../../../../Util/AlertUtil";

interface QuickGuideProps extends AppValidationComponentProps {
    response?: LoginResponse
    serviceKey?: string
}

interface QuickGuideState extends AppValidationComponentState {
    QuickGuideData: any
    slideno: any
}


const slides = [
    // {
    //     image: require('../../../../images/UserGuide1.png'),
    //     //imageStyle: styles.image,
    // },
    // {
    //     image: require('../../../../images/UserGuide2.png'),
    //     //imageStyle: styles.image,
    // },
    // {
    //     image: require('../../../../images/UserGuide3.png'),
    //     //imageStyle: styles.image,
    // },  
    // {
    //     image: require('../../../../images/UserGuide4.png'), 
    //     //imageStyle: styles.image,
    // },
    // {
    //     image: require('../../../../images/UserGuide6.png'),
    //     //imageStyle: styles.image,
    // }
    // ,
    // {
    //     image: require('../../../../images/UserGuide5.png'),
    //     //imageStyle: styles.image,
    // },

];

class G_QuickGuide extends AppValidationComponent<QuickGuideProps, QuickGuideState> {
    private serviceRequestInProgress = false
    private serviceAction = new ServiceAction()
    
    private Guestparser = new GuestLoginServiceParser()

    constructor(props: QuickGuideProps) { 
        super(props);
        this.state = {
            QuickGuideData:'',
            slideno: ''
        }
        //alert(Dimensions.get('window').height);
    }
      _renderItem = (item:any) => {
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
             
            }}>
            <Image style={styles.image} source={item.image} />
            
          </View>
        );
      };

    _onDone = () => {
        this.gotoDashboard()
    }
    async componentDidMount() {
        this.gotoDashboard()
    }

    gotoDashboard() {
        var loginRequest = new GuestLoginRequest()

        this.props.dispatch!(this.serviceAction.request(ServiceType.Onbarding,
            ServiceKeys.GuestLoginServiceName,
            loginRequest,
            [this.constructor.name],
            this.Guestparser));

       
    }


    callSlidechage(data: any) {
        
        console.log("callSlidechage " + JSON.stringify(data));
        this.setState({ slideno: data });
    }
    componentWillReceiveProps(nextProps: G_LoginViewProps) {
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
                
                    RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, nextProps);
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
            <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
   
              }}>
              <View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'flex-end',paddingTop:35 }}>
                    <View style={{ width: '50%', justifyContent: 'center', }}>
                        <Image
                            style={{ width: 100, height: 40, marginLeft: 10 }}
                            source={require('../../../../images/QuickGuideLogo.png')}
                            resizeMode='contain' />
                    </View>
                    <View style={{ width: '50%',justifyContent:'center' ,backgroundColor:'white'  }}>
                        {/* <TouchableOpacity onPress={()=>{this.gotoDashboard()}}>
                        <Text style={{ textAlign: 'right', marginRight: 10, color: '#68bcbc', textDecorationColor: '#68bcbc', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline', fontSize: 16 }}>
                        {this.state.slideno == 4 ? 'Done' : 'Skip'}
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={{ flex: 1, height: '90%',backgroundColor: '#68bcbc',justifyContent: 'center',
              alignItems: 'center', }}>
                    <AppIntroSlider
                        renderItem={this._renderItem}
                        slides={slides}
                        activeDotColor='#68bcbc'
                       // showNextButton='false'
                       onDone={this._onDone}
                        onSlideChange={(data: any) => { this.callSlidechage(data) }}
                    />
                </View>
                {this.serviceRequestInProgress && <ProgressIndicator />}
            </View>
        )
    }


}
 
const styles = StyleSheet.create({ 
    image: {
      width: Dimensions.get('window').width,
      //minHeight: 700,
      height: (Dimensions.get('window').height>800)?Dimensions.get('window').height-200:Dimensions.get('window').height-75,
      paddingLeft:'5%',
      paddingRight:'5%',
    },
  });

//export default G_QuickGuide;
const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
    response: state.serviceReducer.response as LoginResponse,
    error: state.serviceReducer.error,
    listeners: state.serviceReducer.listeners
})

export default connect(mapStateToProps)(G_QuickGuide);

