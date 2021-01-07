import ISocialMediaManager from "./SocialMediaFactory";
import { GoogleSignin, statusCodes } from 'react-native-google-signin';


export default class GoogleManager implements ISocialMediaManager {

    constructor() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '676081949033-3jt9t2qsqb38g8bnlt6k3un97ae489gm.apps.googleusercontent.com'
            //webClientId: '160373025398-v0atkbca6n3aulnbkgckjobni5nqgnsq.apps.googleusercontent.com'    
          });

    }

    public login(): Promise<any> {
        return new Promise(function (resolve, reject) {
            console.log('google login started..');
            GoogleSignin.hasPlayServices().then(
                function (result: Boolean) {
                    console.log('google play service enabled');
                    if (result) {
                        GoogleSignin.signIn().then(
                            function (result) {
                                resolve(result);
                            },
                            function (error) {
                                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                                    reject(error)
                                } else if (error.code === statusCodes.IN_PROGRESS) {
                                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                                    reject(error)
                                } else {
                                    reject(error)
                                }

                            }
                        );
                    } else {
                        console.log('google play service disabled')
                        reject(new Error('Google play service is not enabled'));
                    }
                },
                function (error: any) {
                    console.log('google play service disabled')
                    reject(error)
                }
            )
        });
    }
}