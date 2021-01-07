import React from "react";
import { View, Text, TextInput, Platform,ImageBackground, Alert, TouchableOpacity, ScrollView, AsyncStorage, Animated, UIManager, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView, Image } from "react-native";
// import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";


import AlertUtil from "../../../../Util/AlertUtil";
import AppConstants from "../../../../Util/Constants";
import styles from './styles';
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import Application from "../../.../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ProgressLoader from 'rn-progress-loader';
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { connect } from 'react-redux';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { UDDAError } from "../../../../Entities";
import { FooterListner } from "../../../../Components/CustomComponents/Footer/SingleMatchScheduleWithTitleComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";

import PlaceBetRequest from "../../../../Services/Bets/PlaceBetRequest";
import PlaceBetResponseParser from "../../../../Services/Bets/PlaceBetResponseParser";
import PlaceBetResponse from "../../../../Services/Bets/PlaceBetResponse";
import BetAFriendRequest from "../../../../Services/Bets/BetAFriendRequest";
import BetAFriendResponseParser from "../../../../Services/Bets/BetAFriendResponseParser";
import BetAFriendResponse from "../../../../Services/Bets/BetAFriendResponse";
import UrlService from '../../../../Services/Core/ServiceURI';
import DateTimePicker from "react-native-modal-datetime-picker";
import ReferralService from "../../../../Services/Referral/ReferralService";
import LinearGradient from 'react-native-linear-gradient';
import CustomBetAFriendRequest from "../../../../Services/Bets/CustomBetAFriendRequest";
import CustomBetAFriendResponseParser from "../../../../Services/Bets/CustomBetAFriendResponseParser";
import CustomBetAFriendResponse from "../../../../Services/Bets/CustomBetAFriendResponse";
var update = require('immutability-helper');
console.disableYellowBox = true;
import LocationResponse from '../../../../Services/Location/LocationResponse';
import AlertMessages from "../../../../Util/AlertMessages";
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialIcons';




const ProfilePageContent = {
  key: 'somethun',
  page_title: '',
}


interface VideoViewProps extends AppValidationComponentProps {

  getProfileRequestStatus?: ServiceRequestStatus
  getProfileResponse?: GetProfileResponse
  getProfileError?: UDDAError



  betaFriendRequestStatus?: ServiceRequestStatus
  betaFriendResponse?: BetAFriendResponse
  betaFriendError?: UDDAError

  placeBetRequestStatus?: ServiceRequestStatus
  placeBetResponse?: PlaceBetResponse
  placeBetError?: UDDAError

  customBetaFriendRequestStatus?: ServiceRequestStatus
  customBetaFriendResponse?: CustomBetAFriendResponse
  customBetaFriendError?: UDDAError

  serviceKey?: string
  listeners?: any

  locationRequestStatus?: ServiceRequestStatus
  locationResponse?: LocationResponse
  currentLocationError?: UDDAError
}

interface VideoViewState extends AppValidationComponentState {

 image_list: any;











}

const bottom_initial = 0;
class Video extends AppValidationComponent<VideoViewProps, VideoViewState>
{
  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  private serviceRequestInProgress = false
 
  private referralservice = new ReferralService(); //Vijay
  private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
  //public eventId ='1077045';
  public eventId ='';


  constructor(props: any) {
    super(props);

    this.state = {
        // image_list:[{
        //     "video_title": "This is the first video title",
        //     "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //     "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //     },{
        //         "video_title": "This is the first video title",
        //         "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //         "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //         },{
        //             "video_title": "This is the first video title",
        //             "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //             "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //             },{
        //                 "video_title": "This is the first video title",
        //                 "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                 "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                 },{
        //                     "video_title": "This is the first video title",
        //                     "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                     "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                     },{
        //                         "video_title": "This is the first video title",
        //                         "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                         "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                         },{
        //                             "video_title": "This is the first video title",
        //                             "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                             "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                             },{
        //                                 "video_title": "This is the first video title",
        //                                 "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                                 "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                                 },{
        //                                     "video_title": "This is the first video title",
        //                                     "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                                     "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                                     },{
        //                                         "video_title": "This is the first video title",
        //                                         "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                                         "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                                         },{
        //                                             "video_title": "This is the first video title",
        //                                             "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                                             "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                                             },{
        //                                                 "video_title": "This is the first video title",
        //                                                 "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                                                 "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                                                 },{
        //                                                     "video_title": "This is the first video title",
        //                                                     "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                                                     "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                                                     },{
        //                                                         "video_title": "This is the first video title",
        //                                                         "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                                                         "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                                                         },{
        //                                                             "video_title": "This is the first video title",
        //                                                             "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                                                             "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                                                             },{
        //                                                                 "video_title": "This is the first video title",
        //                                                                 "video_link": "https://www.youtube.com/watch?v=9ND-Kmd60t8&list=RD9ND-Kmd60t8&start_radio=1",
        //                                                                 "video_thumbnail_image": "http://uddadev.triazinesoft.com/assets/video_thumbnail_image/1604395071_minimum-bets.png"
        //                                                                 }]
        // image_list:'hello'
        image_list:[]

    };
  }



async componentDidMount(){
    let banner = '';
    let video='';
    try {
        // banner = await AsyncStorage.getItem('banner_data');
        video = await AsyncStorage.getItem('banner_video_data');

        // console.log('banner response',banner)
        console.log('video response',video)
        
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    // console.log('props data : ',this.props.navigation.state.params.params.bet_id)
    //  this.setState({image_list:this.props.navigation.state.params.params.bet_id})
     this.setState({image_list:JSON.parse(video)})
}
  
  componentWillReceiveProps(nextProps: VideoViewProps) {
    if (nextProps.listeners!.includes(this.constructor.name)) {
      if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false
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

      }else if (nextProps.serviceKey === ServiceKeys.LocationServiceName) {
        switch (nextProps.locationRequestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            // this.locationAgreement = true
            Application.sharedApplication().currentUserLocation = nextProps.locationResponse!.location
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.FinishedWithError:

           
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            // this.locationAgreement = false
            break
        }

      }
      
    }

  }
 
   // header functionalitu

   accountNameTapped() {
    
    this.props.navigation!.navigate(AppScreens.G_ProfileView);
  }

  iconDidTapped() {
 
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
  }


  availableBalanceTapped() {
    // this.props.navigation!.navigate(AppScreens.G_InfochartView);
  }

  openPlaysTapped() {
    /* if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else { */
    this.props.navigation!.navigate(AppScreens.G_UddaContests);
    //}
  }

  ContesetJoinTapped() {
    /*  if (Application.sharedApplication().user!.profile.userType == 'Guest') {
       this.setState({ guestUserDialog: true });
     }
     else { */
    this.props.navigation!.navigate(AppScreens.G_UddaContests);
    //}
  }
  coveredPlaysTapped() {
    /*  if (Application.sharedApplication().user!.profile.userType == 'Guest') {
       this.setState({ guestUserDialog: true });
     }
     else { */
    this.props.navigation!.navigate(AppScreens.G_GamingBetView);
    //}
  }
  LogoiconDidTapped() {
    //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
	RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
  }

  gotovideoStream(item){
    // this.props.navigation!.navigate(AppScreens.G_Yotube, { params: { video_id: "PLF797E961509B4EB5" } })
    // this.props.navigation!.navigate(AppScreens.G_Yotube, { params: { video_id: item.video_link} })
    this.props.navigation!.navigate(AppScreens.G_Yotube, { params: { video_id: item.video_link} })
    // this.props.navigation!.navigate(AppScreens.G_Yotube, { params: { video_id: '9ND-Kmd60t8'} })
  }
  render() {
  

    return (

      
        <Container 
          title={'VIDEO TUTORIALS'}
          isHeader={true}
          isSubHeader={true}
          isTitle={false}
          showIndicator={this.serviceRequestInProgress}
          menuIconListener={this}
          LogoIconListener={this}
          availableBalanceListener={this}
          openPlaysListener={this}
          coveredPlaysListener={this}
          accountNameListener={this}
          isSetting={false}
        >
          <View>
            <View style={{flexDirection:'row',width:'100%'}}>
            <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'30%' }}>
              <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 5 ,marginTop:3}}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>
              <View style={{ alignContent: 'flex-start', alignItems: 'flex-start', width:'70%' }}>
                <Text style={[styles.customheadtext,{color:'#68bcbc'}]}>VIDEO TUTORIALS</Text>
              </View>
            </View>
            <ScrollView>
         <View style={{width:'100%',flexWrap:'wrap',flexDirection:'row'}}>

   {this.state.image_list.map((item,index)=>{
       return(
         <View style={{width:'46%',margin:7}}>  
           <TouchableOpacity onPress={()=>{this.gotovideoStream(item)}}>
        <View style={{width:'100%',height:'auto',backgroundColor:'#EEEEEE',elevation:20,borderWidth:.5,borderRadius:5,borderColor:'white'}}>
     <View style={{width:'100%',height:180}}>
     <ImageBackground source={{ uri: item.video_thumbnail_image}}
                                resizeMode="stretch"
                                style={{ width: '100%', height: '100%',justifyContent:'center',alignContent:'center',alignItems:'center' }}>
                                    <View >
                                    <Icon name="play" size={30}  color="white" />
                                    </View>

                                </ImageBackground>
     </View>

     <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',padding:5}}>
     <Text style={{fontFamily: 'Montserrat-SemiBold',textAlign:'center',marginTop:3}}>{item.video_title}</Text>
     </View>
        
        
            </View>
            </TouchableOpacity>
            </View>
       )
   })}

         </View>
         </ScrollView>
         </View>
        </Container>
       
    );
  }

}



const mapStateToProps = (state: GlobalAppState) => ({
  requestStatus: state.serviceReducer.requestStatus,
  response: state.serviceReducer.response as PlayResponse,
  error: state.serviceReducer.error,
  serviceKey: state.serviceReducer.serviceKey,
  listeners: state.serviceReducer.listeners,
  getProfileRequestStatus: state.serviceReducer.requestStatus,
  getProfileResponse: state.serviceReducer.response,
  getProfileError: state.serviceReducer.error,

  placeBetRequestStatus: state.serviceReducer.requestStatus,
  placeBetResponse: state.serviceReducer.response as PlaceBetResponse,
  placeBetError: state.serviceReducer.error,

  betaFriendRequestStatus: state.serviceReducer.requestStatus,
  betaFriendResponse: state.serviceReducer.response as BetAFriendResponse,
  betaFriendError: state.serviceReducer.error,

  customBetaFriendRequestStatus: state.serviceReducer.requestStatus,
  customBetaFriendResponse: state.serviceReducer.response as CustomBetAFriendResponse,
  customBetaFriendError: state.serviceReducer.error,



  locationResponse: state.serviceReducer.response,
  currentLocationError: state.serviceReducer.error,
  locationRequestStatus: state.serviceReducer.requestStatus,



})



export default connect(mapStateToProps)(Video);
