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
import { View, Linking, AppState, AsyncStorage, Platform } from 'react-native';
//import firebase from 'react-native-firebase';
import dynamicLinks from '@react-native-firebase/dynamic-links';
interface LandingViewProps extends INavigationProps {

}

interface LandingViewState extends IState {
    selectedItem: any;
}

export default class LandingView extends Component<LandingViewProps, LandingViewState>{
    [x: string]: any;

    applicationNavigationStack = new NavigationStacks().createNavigationStacks()

    constructor(props: LandingViewProps) {
        super(props)



    }

    state = {
        appState: AppState.currentState,
        selectedItem: 'Dashboard'
    };

    componentDidMount = async () => {
        Linking.addEventListener('url', this.handleOpenURL);
        //this.getInitialUrl();
      //  AppState.addEventListener('change', this.handleAppStateChange);
        const unsubscribe = dynamicLinks().onLink((link:any) => {
            console.log("Landingview Route: wwww " + link);
            var url  = link.url;
            url = this.removeParam("referralMode", url);
            url = this.removeParam("referralCode", url);
            this.handleAppUrl(url);

        }); 
    }

    componentWillMount = async () => {
        var userRepository = UserRepository.sharedRepository()

        AsyncStorage.getItem("FromGame").then((data) => {
            if (data == 'true') {
                userRepository.fetchUser().then(user => {
                    Application.sharedApplication().user = user as IUser
                    Application.sharedApplication().FromGame = true;
                    this.showProfileScreen()
                }).catch(error => {
                    this.showOnboardinScreen()
                })
            }
        }).catch((error) => { });

        AsyncStorage.getItem("FromGambling").then((data) => {
            if (data == 'true') {
                userRepository.fetchUser().then(user => {
                    Application.sharedApplication().user = user as IUser
                    Application.sharedApplication().FromGambling = true;
                    this.showGamblingProfileScreen()
                }).catch(error => {
                    this.showGamblingOnboardinScreen()
                })
            }
        }).catch((error) => { });

        Linking.removeEventListener('url', this.handleOpenURL);
    }


    private showProfileScreen() {

        this.checkInitialUrl()
    }

    private showOnboardinScreen() {
       
        RouterBuilder.resetRouteTo(AppScreens.OnboardingStack, this.props)
    }

    private showGamblingProfileScreen() {
       
        this.checkInitialUrl()
    }

    private showGamblingOnboardinScreen() {
      
        RouterBuilder.resetRouteTo(AppScreens.Gambling_OnboardingStack, this.props)
    }

    handleOpenURL(event: any) {
        console.log("URL: " + event.url);
        const route = event.url.replace(/.*?:\/\//g, '');
        try{
            const id = route.match(/\/([^\/]+)\/?$/)[1];
        }
        catch(error)
        {

        }
       
        const URLSlashCount = route.split("/").length;
        var last = route.length;

        var routeName: any;
            var routeId:any;
            if (URLSlashCount == 3) {
                var lastIndex = route.lastIndexOf('/');
               // routeName = route.substring(0, lastIndex).split('?')[1];
               routeName = route.substring(0, lastIndex)
                routeId = route.substring(lastIndex+1,last);
                // routeName = route.split('/',2)[0];
            } else {
                routeName = route.split('/')[0];
            }



        console.log("Landingview URLSlashCount 1: " + URLSlashCount);
        console.log("Landingview Route 1: " + route);
        console.log("Landingview Route Id 1: " + routeId);
        console.log("Landingview Route Name 1: " + routeName);

        if (routeName) {
            Application.sharedApplication().DeeplinkName = routeName;
            Application.sharedApplication().EncId = routeId;
            Application.sharedApplication().DeeplinkStatus = true;
        }
    }

    handleAppStateChange = async (nextAppState: any) => {
      
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground! vijay jain');
            this.checkInitialUrl();
        }
    };

    checkInitialUrl1 = async () => {
        const url = await this.getInitialUrl()

        if (url != null) {
            this.setState({ selectedItem: 'PrivateBet' })
            const route = url.replace(/.*?:\/\//g, '');
            const id = route.split('/')[1];
            const URLSlashCount = route.split("/").length;
            var last = route.length;
            var routeName: any;
            var routeId:any;
            if (URLSlashCount == 3) {
                var lastIndex = route.lastIndexOf('/');
                routeName = route.substring(0, lastIndex); // hanges for android
               // routeName = route.substring(0, lastIndex).split('?')[1];

                routeId = route.substring(lastIndex+1,last);
                // routeName = route.split('/',2)[0];
            } else {
                routeName = route.split('/')[0];
            }


            console.log("Landingview URLSlashCount: " + URLSlashCount);
            console.log("Landingview Route: " + route);
            console.log("Landingview Route Id: " + routeId);
            console.log("Landingview Route Name: " + routeName); 

            Application.sharedApplication().DeeplinkName = routeName;
            Application.sharedApplication().EncId = routeId;
            Application.sharedApplication().DeeplinkStatus = true;

            if (Application.sharedApplication().FromGame == true) {
                RouterBuilder.resetRouteTo(AppScreens.ApplicationStack, this.props)
            }
            else {
                RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
            }
        }
        else {
            if (Application.sharedApplication().FromGame == true) {
                RouterBuilder.resetRouteTo(AppScreens.ApplicationStack, this.props)
            }
            else {
                RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
            }
        }
    }

    /* Handling Firebase dynamic URL */

    checkInitialUrl = async () => {
        const url = await this.getInitialUrl()

        if (url != null) {
            this.setState({ selectedItem: 'PrivateBet' })
            const route = url.replace(/^.*\/\/[^\/\/]+/, '');
            const routeArr = route.split('/')[1];
            const pathname = routeArr.split('?')[0];
           
            var routeName: any;
            var routeId: any;
            if (Platform.OS === 'android') {
                routeName = (this.getParameterFromUrl(url, "t") != "") ? pathname + '?' + this.getParameterFromUrl(url, "t") + '/' :"";// hanges for android
                // routeName = route.substring(0, lastIndex).split('?')[1];
 
 
                // routeName = route.split('/',2)[0];
            } else {
                routeName =  (this.getParameterFromUrl(url, "t") != "") ? this.getParameterFromUrl(url, "t") + '/':"";
            }

            routeId = this.getParameterFromUrl(url, "i");

           // console.log("Landingview URLSlashCount: " + URLSlashCount);
            console.log("Landingview Route: " + route);
            console.log("Landingview Route Id: " + routeId);
            console.log("Landingview Route Name: " + routeName);

            if (routeName) {
            
            Application.sharedApplication().DeeplinkName = routeName;
            Application.sharedApplication().EncId = routeId;
            Application.sharedApplication().DeeplinkStatus = true;
            }

            if (Application.sharedApplication().FromGame == true) {
                RouterBuilder.resetRouteTo(AppScreens.ApplicationStack, this.props)
            }
            else {
                RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
            }
        }
        else {
            if (Application.sharedApplication().FromGame == true) {
                RouterBuilder.resetRouteTo(AppScreens.ApplicationStack, this.props)
            }
            else {
                RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
            }
        }
    }

    handleAppUrl = async (url:any) => {
       

        if (url != null) {
            this.setState({ selectedItem: 'PrivateBet' })
            const route = url.replace(/^.*\/\/[^\/\/]+/, '');
            const routeArr = route.split('/')[1];
            const pathname = routeArr.split('?')[0];
 
            var routeName: any;
            var routeId: any;
            if (Platform.OS === 'android') {
                routeName = (this.getParameterFromUrl(url, "t") != "") ? pathname + '?' + this.getParameterFromUrl(url, "t") + '/' :"";// hanges for android
                // routeName = route.substring(0, lastIndex).split('?')[1];
 
 
                // routeName = route.split('/',2)[0];
            } else {
                routeName =  (this.getParameterFromUrl(url, "t") != "") ? this.getParameterFromUrl(url, "t") + '/':"";
            }
            routeId = this.getParameterFromUrl(url, "i");
 
            // console.log("Landingview URLSlashCount: " + URLSlashCount);
            console.log("Landingview Route: " + route);
            console.log("Landingview Route Id: " + routeId);
            console.log("Landingview Route Name: " + routeName);
            if (routeName) {
            Application.sharedApplication().DeeplinkName = routeName;
            Application.sharedApplication().EncId = routeId;
            Application.sharedApplication().DeeplinkStatus = true;
            }
 
            if (Application.sharedApplication().FromGame == true) {
                RouterBuilder.resetRouteTo(AppScreens.ApplicationStack, this.props)
            }
            else {
                RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
            }
        }
        else {
            if (Application.sharedApplication().FromGame == true) {
                RouterBuilder.resetRouteTo(AppScreens.ApplicationStack, this.props)
            }
            else {
                RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
            }
        }
    }

     getInitialUrl = async () => {
         let link = await dynamicLinks().getInitialLink();
         
        if (link) {
            var url = link.url;
            url = this.removeParam("referralMode", url);
            url = this.removeParam("referralCode", url);
        }
        return url;
    } 
    removeParam(name, _url) {
        var reg = new RegExp("((&)*" + name + "=([^&]*))", "g");
        return _url.replace(reg, '');
    }
    getParameterFromUrl(url, parm) {
        var re = new RegExp(".*[?&]" + parm + "=([^&]+)(&|$)");
        var match = url.match(re);
        return (match ? match[1] : "");
    }

    render() {
        return (<View />)
    }
}