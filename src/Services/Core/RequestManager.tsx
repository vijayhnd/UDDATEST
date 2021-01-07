import AlertUtil from "../../Util/AlertUtil";
import Application from "../../Entities/Application";
import ReferralService from '../Referral/ReferralService';
import * as RNLocalize from "react-native-localize";
const deviceTimeZone = RNLocalize.getTimeZone();


export default class RequestManager {
    private static sharedInstance = new RequestManager()
    private referralservice = new ReferralService();
    private constructor() { }

    static sharedManager(): RequestManager {
        return this.sharedInstance
    }

  async post(uri: string, request: string) {
       // console.log(request);
        //console.log('Apllication POST JSON ', typeof Application.sharedApplication().currentUserLocation);
        var respo = await  this.referralservice.getCurrentLocation();
        var headers: any = { 'Content-Type': 'multipart/form-data' }
        if (Application.sharedApplication().user && Application.sharedApplication().user!.authenticationToken) {
            headers = {
                'Content-Type': 'multipart/form-data',
                'authorisation': Application.sharedApplication().user!.authenticationToken
            }
        }
        if (typeof Application.sharedApplication().currentUserLocation != 'undefined') {
            headers['latitude'] = Application.sharedApplication().currentUserLocation!.latitude;
            headers['longitude'] = Application.sharedApplication().currentUserLocation!.longitude;
        }
        headers['timezone'] = deviceTimeZone;
        console.log('Headers in POST', JSON.stringify(headers));

        return fetch(uri, { method: 'POST', headers: headers, body: request }).then((response: any) => {
            console.log(response);
            if(!response.ok){
			   throw Error('server error please try again');
		   }else{
			   return response.json()
		   }
        }).then(responseData => { 
            console.log(responseData);
            if (responseData && responseData.error == 0) {
                return responseData
            } else {
                //AlertUtil.show('Server errror: '+ JSON.stringify(responseData.message))
                console.log('error block' + responseData.message)
                throw Error(responseData.message)
            }
        });
    }

    async get(uri: string, request: string) {
      /*   console.log(request);
        console.log('Apllication GET JSON ', typeof Application.sharedApplication().currentUserLocation);
        console.log('Apllication GET JSON Req ', JSON.stringify(Application.sharedApplication())); */
        if (Application.sharedApplication().user && Application.sharedApplication().user!.profile.userType==null && Application.sharedApplication().user!.profile.userType != 'Guest') {
          var respo = await  this.referralservice.getCurrentLocation();
        }
        var headers: any = { 'Content-Type': 'application/json' }
        if (Application.sharedApplication().user && Application.sharedApplication().user!.authenticationToken) {
            headers = {
                'Content-Type': 'application/json',
                'authorisation': Application.sharedApplication().user!.authenticationToken
            }
        }
        if (typeof Application.sharedApplication().currentUserLocation!='undefined' ) {
            headers['latitude'] = Application.sharedApplication().currentUserLocation!.latitude;
            headers['longitude'] = Application.sharedApplication().currentUserLocation!.longitude;
        }
        headers['timezone'] = deviceTimeZone;
        console.log('Headers in Get', JSON.stringify(headers));
        return fetch(uri, { method: 'GET', headers: headers, body: request }).then((response: any) => {
            console.log(response);
             if(!response.ok){
			   throw Error('server error please try again');
		   }else{
			   return response.json()
		   }
            //AlertUtil.show('GET Server response: '+ JSON.stringify(response._bodyText))
            
        }).then(responseData => {
            console.log(responseData);
            if (responseData && responseData.error == 0) {
                return responseData
            } else {
                //AlertUtil.show('Server errror: '+ JSON.stringify(responseData.message))
                console.log('error block' + responseData.message)
                throw Error(responseData.message)
            }
        });
    }

    async  postWithoutMulti(uri: string, request: string) {
        console.log('req'+request);
        var respo = await  this.referralservice.getCurrentLocation();
       // console.log('req'+respo);
        //console.log('Apllication Post with multi JSON ', typeof Application.sharedApplication().currentUserLocation);

        var headers: any = { 'Content-Type': 'application/x-www-form-urlencoded', }
        if (Application.sharedApplication().user && Application.sharedApplication().user!.authenticationToken) {
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorisation': Application.sharedApplication().user!.authenticationToken
            }
        }
        if (typeof Application.sharedApplication().currentUserLocation != 'undefined') {
            headers['latitude'] = Application.sharedApplication().currentUserLocation!.latitude;
            headers['longitude'] = Application.sharedApplication().currentUserLocation!.longitude;
        }
        headers['timezone'] = deviceTimeZone;
        console.log('Headers in Post with multi', JSON.stringify(headers));
        return fetch(uri, { method: 'POST', headers: headers, body: request }).then((response: any) => {
            console.log(response);
           if(!response.ok){
			   throw Error('server error please try again');
		   }else{
			   return response.json()
		   }
            /* return response.json().catch(err => {
                console.error(`'${err}' happened, but no big deal!`);
                return {};
            }); */
        }).then(responseData => {
            console.log(responseData);
            if (responseData && responseData.error == 0) {
                return responseData
            } else {
                //AlertUtil.show('Server errror: '+ JSON.stringify(responseData.message))
                AlertUtil.show(responseData.message);
                console.log('error block' + responseData.message)
                throw Error(responseData.message)
            }
        });
    }

    


}