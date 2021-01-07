import Application from "../Entities/Application";
import { AsyncStorage } from "react-native";
import RouterBuilder from "../Router/RouterBuilder";
import AppScreens from "./AppScreens";
import INavigationProps from "../Components";

export default class LogoutUtill {
    
//   static show(message: string){
//     Alert.alert(AppConstants.ApplicationName, message)
// }
 static logoutButtonPressed(propsNew : INavigationProps) {
    Application.sharedApplication().logout()
    AsyncStorage.removeItem("FromGame");
    AsyncStorage.removeItem("FromGambling");
    Application.sharedApplication().FromGame = false;
    Application.sharedApplication().FromGame = false;
    RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack, propsNew)
    
    // RouterBuilder.resetRouteTo(AppScreens.SplashLandingView, propsNew)
  }
  static loginButtonPressed(propsNew: INavigationProps){
    propsNew.navigation!.navigate(AppScreens.G_LocationConfirmation, propsNew );
  }
}