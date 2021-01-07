//import firebase from 'react-native-firebase';
import GetProfileResponse from "../Profile/GetProfileResponse";
import GetProfileRequest from "../Profile/GetProfileRequest";
import GetProfileResponseParser from "../Profile/GetProfileResponseParser";
import Application from "../../Entities/Application";
import { UserRepository } from "../../Infrastructure/Repository/UserRespository";
import UrlService from '../Core/ServiceURI';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import analytics from '@react-native-firebase/analytics';
import { Platform } from "react-native";
import GuestLoginServiceParser from "../../Services/Onboarding/GuestLoginServiceParser";
import { Location, UDDAError } from "../../Entities";
import LocationResponse from "../Location/LocationResponse";
import Geolocation from '@react-native-community/geolocation';
import AlertMessages from '../../Util/AlertMessages';
export default class ReferralService {
  
  public dynamicLinkDomain = 'https://uddasports.page.link';
  async getReferralUrl(url: any, referralCode: any, referralMode: any): Promise<any> {
    return new Promise(function (resolve, reject) {
      if (referralCode != '') {
        if (url.indexOf('?') != -1) {
          url = url + '&referralMode=' + referralMode + '&referralCode=' + referralCode;
        } else {
          url = url + '?referralMode=' + referralMode + '&referralCode=' + referralCode;
        }
      }
      /* const link = new firebase.links.DynamicLink(url, 'https://uddasports.page.link')
        .android.setPackageName('com.udda.sports')
        .ios.setBundleId('com.udda.uddaapp');
      firebase.links()
        .createShortDynamicLink(link, 'UNGUESSABLE')
        .then((url) => {
          resolve(url);
        });  */
      dynamicLinks().buildShortLink({
        link: url,
        domainUriPrefix: 'https://uddasports.page.link',
        ios: {
          bundleId: 'com.udda.uddaapp',
          //appStoreId: '??????',
          // fallbackUrl: 'http://example.com',
        },
        android: {
          //packageName: 'com.udda.sports',
          packageName: 'com.uddaapp.gaming',
          //fallbackUrl: 'http://example.com',
        }
      }, dynamicLinks.ShortLinkType.UNGUESSABLE).then((url) => {
        console.log('MYSHORT LINK URL FOR OPEN', url);
        resolve(url);
      });

    })
  }
  public getProfile(): Promise<any> {
    return new Promise(function (resolve, reject) {
      var responseParser = new GetProfileResponseParser();
      var authorisationToken = Application.sharedApplication().user!.authenticationToken;
      fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/api/user_info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorisation': authorisationToken
        },
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log('GETPromotionalMSG ' + JSON.stringify(responseJson));
          if (responseJson.message == "Access Expired.") {
            reject(false);
          } else {
            var userData = responseJson;
            // userData.data.token = userData.data.access_token;
            var data = responseParser.parse(userData);
            resolve(true);

          }
        })
        .catch(error => {
          console.log(error);
          reject(false);
        })

    })
  }

  /**
   * log event
   */
  public logEvent(event_name: any, params: any) {
    if (Object.keys(params).length > 0) {
      analytics().logEvent(event_name, params);
    } else {
      analytics().logEvent(event_name);
    }

  }

  public goToDashboard(): Promise<any> {
    return new Promise(function (resolve, reject) {
      var Guestparser = new GuestLoginServiceParser()
      var ths = this;
      var device_type = Platform.OS === 'ios' ? 'ios' : 'android';
      var params: any = {
        "device_type": device_type,
        "device_token": Application.sharedApplication().Device_token

      };
      var formData = new FormData();

      for (var k in params) {
        formData.append(k, params[k]);
      }
      fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/GuestUser/guest_user', {
        method: 'POST',
        headers: {

        },
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log('myresponse of guest ' + JSON.stringify(responseJson));
          if (responseJson.message == "Access Expired.") {
            console.log("Footer comp ---->" + responseJson.message);
            reject(false);

          } else {
            var userData = responseJson;
            userData.data.token = userData.data.access_token;
            var data = Guestparser.parse(userData);

            Application.sharedApplication().user = data.user;
            var userRepository = UserRepository.sharedRepository()
            userRepository.saveUser(Application.sharedApplication().user!).then(success => {
            }).catch(error => {
            })
            resolve(true);


          }


        })
        .catch(error => {
          console.log(error);
          reject(false);
        })


    })
  }

  getCurrentLocation(): Promise<{ locationResponse?: LocationResponse }> {
    const promise:any = new Promise((resolve, reject) => {

       // navigator.geolocation.getCurrentPosition(
        Geolocation.getCurrentPosition( 
            position => {

                var currentLocation = new Location(position.coords.latitude, position.coords.longitude)
                var locationResponse = new LocationResponse(currentLocation);
                Application.sharedApplication().currentUserLocation = currentLocation;
                resolve(locationResponse);

            },
            error => {
              console.log(error);
         
              //  var locationError = new UDDAError(error.code, error.message)
                var locationError = new UDDAError(error.code, AlertMessages.LocationRequired)
                reject(locationError);
            },
            {enableHighAccuracy: false, timeout: 30000},
        );
    })
    return promise;
}

getLocation(): Promise<any> {
  const promise:any = new Promise((resolve, reject) => {

     // navigator.geolocation.getCurrentPosition(
      Geolocation.getCurrentPosition( 
          position => {

              var currentLocation = new Location(position.coords.latitude, position.coords.longitude)
              var locationResponse = new LocationResponse(currentLocation);
              Application.sharedApplication().currentUserLocation = currentLocation;
              resolve(locationResponse);

          },
          error => {
            console.log(error);
            //  var locationError = new UDDAError(error.code, error.message)
              //var locationError = new UDDAError(error.code, AlertMessages.LocationRequired)
              reject(error);
          },
          {enableHighAccuracy: false, timeout: 30000},
      );
  })
  return promise;
}
}