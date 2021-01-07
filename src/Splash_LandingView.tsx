import React, { Component } from "react";
import { IState } from "./Components/IState";
import INavigationProps from "./Components";
import NavigationStacks from "./Router/NavigationStacks";
import { UserRepository } from "./Infrastructure/Repository/UserRespository";
import AlertUtil from "./Util/AlertUtil";
import AppScreens from "./Util/AppScreens";
import { IUser } from "./Entities/User";
import Application from "./Entities/Application";
import RouterBuilder from "./Router";

import { View, Linking, AppState, Text, TouchableOpacity, AsyncStorage,Platform ,Alert} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
//import firebase from 'react-native-firebase';
import firebase from '@react-native-firebase/app';
import DeviceInfo from 'react-native-device-info';
import UrlService from './Services/Core/ServiceURI';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
interface SplashLandingViewProps extends INavigationProps {

}

interface SplashLandingViewState extends IState {
    selectedItem: any;
	deviceId:any;
}

export default class SplashLandingView extends Component<SplashLandingViewProps, SplashLandingViewState>{
    applicationNavigationStack = new NavigationStacks().createNavigationStacks()
    UserExist = false;
    state: { deviceId: string; selectedItem: string; };
    deviceId: any;
   // private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    constructor(props: SplashLandingViewProps) {
        super(props)
		this.state = {
			deviceId: '',
			selectedItem:''
        };
        

    }



    componentDidMount = async () => {
   
        this.checkVersionUpdate();
        await firebase.analytics().setAnalyticsCollectionEnabled(true);
        console.log('splash call');
        this.deviceId = '';
		//this.getDeviceID();
		this.checkLink();
	    //analytics().setAnalyticsCollectionEnabled(true);
    }

    componentWillMount = async () => {
        var userRepository = UserRepository.sharedRepository()
        userRepository.fetchUser().then(user => {
            Application.sharedApplication().user = user as IUser

        }).catch(error => {
            this.UserExist = false;
        })

        AsyncStorage.getItem("FromGame").then((data) => {

            if (data == 'true') {
                this.UserExist = true;
                Application.sharedApplication().FromGame = true;
                RouterBuilder.resetRouteTo(AppScreens.LandingView, this.props)
            }
            else {
                AsyncStorage.setItem("FromGame", 'false');
                AsyncStorage.setItem("FromGambling", 'true');
                Application.sharedApplication().FromGambling = true;
                RouterBuilder.resetRouteTo(AppScreens.LandingView, this.props)
            }

        }).catch((error) => { this.UserExist = false; });

       /*  AsyncStorage.getItem("FromGambling").then((data) => {
            if (data == 'true') {
                this.UserExist = true;
                Application.sharedApplication().FromGambling = true;
                RouterBuilder.resetRouteTo(AppScreens.LandingView, this.props)
            }

        }).catch((error) => { this.UserExist = false; }); */

    }

    FromGameLogin() {
        AsyncStorage.setItem("FromGame", 'true');
        AsyncStorage.setItem("FromGambling", 'false');
        Application.sharedApplication().FromGame = true;
        RouterBuilder.resetRouteTo(AppScreens.LandingView, this.props)
    }

    FromGameBlingLogin() {
        AsyncStorage.setItem("FromGambling", 'true');
        AsyncStorage.setItem("FromGame", 'false');
        Application.sharedApplication().FromGambling = true;
        RouterBuilder.resetRouteTo(AppScreens.LandingView, this.props)
    }

async checkLink() {
    dynamicLinks()
        .getInitialLink()
        .then((link) => {
        if (link) {
           // app opened from a dynamic link URL
			console.log('incoming url', link);
			if(link.url){
                console.log('my link url',link.url);
                this.saveReferal(link.url);
				  /* AsyncStorage.getItem("referral").then((data) => {
                        if(data != 'true')
                        {
                            this.saveReferal(link.url);
                        }
                    })   */
              //  this.saveReferal(url);
				
			}
        } else {
           // use deep link to handle the URL.
          if (Platform.OS === 'android') {
            Linking.getInitialURL()
              .then((url) => {
				  console.log('incoming url android WITHOUT DYANAMIC LINK', url);
                 // do something with the URL
              })
              .catch(err => err);
          } else {
			 
            // handle case for iOS 
          }
        }
    });
  } 
  
    getParameterFromUrl(url:any, parm:any) {
        var re = new RegExp(".*[?&]" + parm + "=([^&]+)(&|$)");
        var match = url.match(re);
        return (match ? match[1] : "");
    }
	  saveReferal(url:any) {
         
        var params: any = {
            "referralCode": this.getParameterFromUrl(url, "referralCode"),
            "referralMode": (this.getParameterFromUrl(url, "referralMode") != "") ? this.getParameterFromUrl(url, "referralMode"):"C",
            "deviceIdentifier": this.deviceId,
            "url": url,
            "campaign_source": this.getParameterFromUrl(url, "utm_source"),
            "campaign_medium": this.getParameterFromUrl(url, "utm_medium"),
            "campaign_name": this.getParameterFromUrl(url, "utm_campaign"),
            "campaign_term": this.getParameterFromUrl(url, "utm_term"),
            "campaign_content": this.getParameterFromUrl(url, "utm_content"),
        };
          analytics().logEvent('weblink', params);
        console.log('body param ' + JSON.stringify(params));
       // return false;
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
 
   fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/guestUser/referral_invitees', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    }).then((response) => {
			console.log(response);
		     return response.json()
		})
      .then((responseJson) => {
         console.log('refererl Data ' + JSON.stringify(responseJson));
		 if(responseJson.error==0){
			  AsyncStorage.setItem("referral", 'true');
		 }
      })
      .catch(error => {
       console.log(error);
      })
   }


   checkVersionUpdate() {
    
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/guestUser/app_version', {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        //'authorisation': 'abcvdvds344'
      },
    }).then((response) => response.json())
      .then((responseJson) => {
//alert(UrlService.APPVERSION_iOS +'>>>>'+ responseJson.data.ios_version);
if (responseJson.message == "Access Expired.") {
    // AlertUtil.show("Session Expired ! Please login again");
    console.log("Footer comp ---->" + responseJson.message);
    //this.logoutButtonPressed();
  }
  else{

   // responseJson.data.ios_version = 2.5
        if((UrlService.APPVERSION_iOS <   responseJson.data.ios_version && Platform.OS == 'ios') || (UrlService.APPVERSION_ANDROID <   responseJson.data.android_version && Platform.OS == 'android'))
        {
            var that = this;
           
              //  that.updateAppNotice(responseJson.data);
       
          //alert(UrlService.APPVERSION_iOS +'>>>> pky'+ responseJson.data.ios_version);
        }
        console.log('update version  ' + JSON.stringify(responseJson));
        // if (responseJson.message = "success promotional message") {
        //   this.setState({ BetPromotionalMsg: responseJson.data.promotional_array[0].gaming_promotional_message })
        // } else {
        //   this.setState({ BetPromotionalMsg: responseJson.message });
        // }
    }

      })
      .catch(error => {
        AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
        console.log(error);
      })
  }

  updateAppNotice(jsonData){
   // const APP_STORE_LINK = 'https://apps.apple.com/in/app/dominos-pizza/id523106486';
   // const APP_STORE_LINK = 'itms://apps.apple.com/us/app/apple-store/id1484047531?mt=8';
//   const APP_STORE_LINK = 'https://apps.apple.com/us/app/udda-sports/id1484047531';
//       const PLAY_STORE_LINK = 'market://details?id=com.uddaapp.gaming'; 
//   if(jsonData.hide_update_popup == "0")
//   {
//     if( (jsonData.force_android == "0" && Platform.OS == 'android') || (jsonData.force_ios== "0" && Platform.OS == 'ios')  ){
//   Alert.alert(
//      'Update Available',
//     // 'This version of the app is outdated. Please update app from the '+(Platform.OS =='ios' ? 'app store' : 'play store')+'.',
//       (Platform.OS == 'ios') ? jsonData.ios_msg : jsonData.android_msg,
//     [
//          {text: 'Not Now', onPress: () => {
//           AsyncStorage.setItem('isupadte', '0');
            
//          }},

//          {text: 'Update', onPress: () => {
//           AsyncStorage.setItem('isupadte', '0');
//           if(Platform.OS =='ios'){
//               Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
//           }
//           else{
//            // Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
//               Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));
//           }
//       }},
//      ]
//  );
//     }
//     else{

//         Alert.alert(
//             'Update Available',
//             //'This version of the app is outdated. Please update app from the '+(Platform.OS =='ios' ? 'app store' : 'play store')+'.',
//             (Platform.OS == 'ios') ? jsonData.ios_msg : jsonData.android_msg,
//             [
               
       
//                 {text: 'Update', onPress: () => {
//                  AsyncStorage.setItem('isupadte', '0');
//                  if(Platform.OS =='ios'){
//                      Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
//                  }
//                  else{
//                      Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));
//                  }
//              }},
//             ]
//         );

//     }
//     }
}


/* getDeviceID(){

    var id = DeviceInfo.getUniqueId();
    console.log('deviceId',id);
    this.deviceId = id;
    this.setState({
      deviceId : id
    })

  } */
	
    render() {
        if (this.UserExist == false) {
            return (
            
                <View />

            )
        }
        else if (this.UserExist == true) {
            return (<View />)
        }

    }
}

const styles = EStyleSheet.create({
    GameView: {
        height: '50%', backgroundColor: '$appRed', alignItems: 'center', justifyContent: 'center'
    },
    GamblingView: {
        height: '50%', backgroundColor: '$appGreen', alignItems: 'center', justifyContent: 'center'
    }
})