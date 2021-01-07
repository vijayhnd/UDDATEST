

//------------------------- 11-06-2019------------------------
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, { Component } from 'react';

import INavigationProps from './Components';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './ReduxStore/configureStore';
import AlertUtil from './Util/AlertUtil';
import LandingView from './LandingView';
import { NavigationContainer } from 'react-navigation';
import NavigationStacks from './Router/NavigationStacks';

/* import firebase from 'react-native-firebase';
import NotificationOpen from 'react-native-firebase';
import Notification from 'react-native-firebase'; */
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import  AuthorizationStatus  from '@react-native-firebase/messaging';
import { AsyncStorage } from 'react-native';
import Application from './Entities/Application';
import ReferralService from "./Services/Referral/ReferralService";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

EStyleSheet.build({
  $white: '#FFFFFF',
  $gray: 'gray',
  $appRed: '#E2211C',
  $appGreen:'#68bcbc',
  $inputBoxLightColor: '#666666',
  $dividerColor: '#BBBBBB',
  $subHeaderNameBackground: '#DDDDDD',
  $subHeaderBalanceBackground: '#DDDDDD',
  $subHeaderPlaysBackground: '#CCCCCC',
  $backgroundColorHeader: '#EEEEEE',
  $dotColor: '#999999',
  $popupBackgroundColor: '#66666633',
  $activityIndicatorColor: 'black',
  $screenWidth: screenWidth,
  $screenHeight: screenHeight
});


interface AppProps extends INavigationProps {

}

const store = configureStore();

export default class App extends Component<AppProps> {
  applicationContainer: NavigationContainer
  notificationDisplayedListener: any;
  notificationListener: any;
  notificationOpenedListener: any;
   unsubscribe: any;
  private referralservice = new ReferralService();

  async checkPermission() {
    const enabled = await messaging().hasPermission();
    console.log('check permissions ',enabled);
    if (enabled) {
      messaging().getToken()
        .then(fcmToken => {
          if (fcmToken) {
            AsyncStorage.setItem('fcmToken', fcmToken);
            Application.sharedApplication().Device_token = fcmToken;
           
            console.log('my fcm' + JSON.stringify(fcmToken));
          } else {
            AlertUtil.show('not token');
          }
        });

    } else {
      this.requestPermission();
    }
  } 


  async requestPermission() {
    try {
      const enabled = await messaging().requestPermission();
     

      console.log('request permission',enabled);
      if (enabled) {
        const fcmToken = await messaging().getToken();
        console.log(fcmToken);
        console.log('User granted messaging permissions!');
        console.log('my fcm' + JSON.stringify(fcmToken));
        AsyncStorage.setItem('fcmToken', fcmToken);
        Application.sharedApplication().Device_token = fcmToken;
      } else {
        console.log('User declined messaging permissions :(');
      }
     
    } catch (error) {
      console.log('permission rejected');
    }
  } 

  componentDidMount = async () => {
    AsyncStorage.setItem('purchaseuddaoverlaycurrent', 'false');
    AsyncStorage.setItem('squareboardoverlaycurrent', 'false');
    AsyncStorage.setItem('acceptsquareoverlaycurrent', 'false');
    AsyncStorage.setItem('privatecontestoverlaycurrent', 'false');
    AsyncStorage.setItem('uddacontestoverlaycurrent', 'false');
    AsyncStorage.setItem('createsquareoverlaycurrent', 'false');
    AsyncStorage.setItem('betlistoverlaycurrent', 'false');
    AsyncStorage.setItem('overlaycurrent', 'false');
    messaging().setAutoInitEnabled(true);
    await messaging().registerDeviceForRemoteMessages();
    this.checkPermission();
    var fontsize = await AsyncStorage.getItem('isfontSize');
    if (fontsize==null){
     // console.log('sett font size', fontsize);
      AsyncStorage.setItem('isfontSize', '1.4');
    }else{
      //console.log('my font',fontsize);
     // console.log(1);
    }
    
   // 
    


  if (Platform.OS === 'android') {
      //this.createAndroidNotificationChannel();
    }
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      AlertUtil.show(
        //JSON.stringify(remoteMessage),
        remoteMessage.notification.body,
      );
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          AlertUtil.show(
            remoteMessage.notification.body,
            //JSON.stringify(remoteMessage),
          );
        }
      });

     messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    
    this.unsubscribe = messaging().onMessage(async remoteMessage => {
       // AlertUtil.show(JSON.stringify(remoteMessage));
       AlertUtil.show( remoteMessage.notification.body,);
        // For notification count code is here 
      this.referralservice.getProfile().then((res: any) => {
        if (res) {
          console.log(Application.sharedApplication().user);
          console.log('123456')
        }

      });
      });
	
	
   
  }
 /* createAndroidNotificationChannel() {
    const channel = new firebase.notifications.Android.Channel(
      'default',
      'Push Notification',
      new firebase.notifications.Android.Importance.Max,
    ).setDescription('Turn on to receive push notification');

    new firebase.notifications().android.createChannel(channel);
  } */
  componentWillUnmount() {
    //this.notificationDisplayedListener();
    //this.notificationListener();
    //this.notificationOpenedListener();
    //this.unsubscribe();
  }


  constructor(props: AppProps) {
    super(props);
    var navigationStacks = new NavigationStacks()
    navigationStacks.createNavigationStacks()
    this.applicationContainer = navigationStacks.applicationContainer!
  }
  render() {
    return (
    
      <Provider store={store}>
        <this.applicationContainer />
      </Provider>
    );
  }
}