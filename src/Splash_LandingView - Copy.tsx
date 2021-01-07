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
import { View, Linking, AppState, Text, TouchableOpacity, AsyncStorage, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import UrlService from './Services/Core/ServiceURI';
interface SplashLandingViewProps extends INavigationProps {

}

interface SplashLandingViewState extends IState {
    selectedItem: any;
}

export default class SplashLandingView extends Component<SplashLandingViewProps, SplashLandingViewState>{
    applicationNavigationStack = new NavigationStacks().createNavigationStacks()
    UserExist = false;
    constructor(props: SplashLandingViewProps) {
        super(props)
        this.state = {
            deviceId: '',
        };

    }



    componentDidMount = async () => {
        console.log('splash call');
        this.getDeviceID();
        this.checkLink();
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

        AsyncStorage.getItem("FromGambling").then((data) => {
            if (data == 'true') {
                this.UserExist = true;
                Application.sharedApplication().FromGambling = true;
                RouterBuilder.resetRouteTo(AppScreens.LandingView, this.props)
            }

        }).catch((error) => { this.UserExist = false; });
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
        firebase.links()
            .getInitialLink()
            .then((url) => {
                if (url) {
                    // app opened from a dynamic link URL
                    console.log('incoming url', url);
                    if (url) {
                        Application.sharedApplication().DynamicUrl = url;
                        AsyncStorage.getItem("referral").then((data) => {
                            if (data != 'true') {
                                this.saveReferal(url);
                            }
                        })

                    }
                } else {
                    // use deep link to handle the URL.
                    if (Platform.OS === 'android') {
                        Linking.getInitialURL()
                            .then((url) => {
                                console.log('incoming url android', url);
                                // do something with the URL
                            })
                            .catch(err => err);
                    } else {
                        console.log('error', err);
                        // handle case for iOS 
                    }
                }
            });
    }

    getParameterFromUrl(url, parm) {
        var re = new RegExp(".*[?&]" + parm + "=([^&]+)(&|$)");
        var match = url.match(re);
        return (match ? match[1] : "");
    }
    saveReferal(url: any) {

        var params: any = {
            "referralCode": this.getParameterFromUrl(url, "referralCode"),
            "referralMode": this.getParameterFromUrl(url, "referralMode"),
            "deviceIdentifier": this.state.deviceId,
            "url": url,
        };

        console.log('body param ' + JSON.stringify(params));
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        fetch(UrlService.CONSTURI + '/'+ UrlService.APIVERSION3 +'/guestUser/referral_invitees', {
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
                if (responseJson.error == 0) {
                    AsyncStorage.setItem("referral", 'true');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    getDeviceID() {

        var id = DeviceInfo.getUniqueId();
        console.log('deviceId', id);
        this.setState({
            deviceId: id
        })

    }

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