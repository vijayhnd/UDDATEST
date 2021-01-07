
import ISocialMediaManager from "./SocialMediaFactory";
const FBSDK = require('react-native-fbsdk');
import {Platform, StyleSheet} from 'react-native';
const {
  LoginManager,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

export default class FacebookManager implements ISocialMediaManager { 


    public login(): Promise<any> {
        return new Promise(function(resolve, reject) { 
            if (Platform.OS === 'ios'){
                LoginManager.logInWithPermissions(['public_profile', 'email']).then(
                    function (result: any) {
                        console.log(result);
                        if (result.isCancelled) {
                            reject('Login was cancelled');
                        }
                        else {
                            let request = new GraphRequest(
                                '/me',
                                null,
                                function (error?: any, result?: any) {
                                    console.log(result)
                                    resolve(result);
                                },
                            );
                            new GraphRequestManager().addRequest(request).start();
                        }
                    },
                    function (error: any) {
                        reject(error);
                    }
                );
            }else{
                LoginManager.logInWithPermissions(['public_profile', 'email']).then(
                    function (result: any) {
                        console.log(result);
                        if (result.isCancelled) {
                            reject('Login was cancelled');
                        }
                        else {
                            let request = new GraphRequest(
                                '/me',
                                null,
                                function (error?: any, result?: any) {
                                    console.log(result)
                                    resolve(result);
                                },
                            );
                            new GraphRequestManager().addRequest(request).start();
                        }
                    },
                    function (error: any) {
                        reject(error);
                    }
                );
            }
            
        })
    } 
}