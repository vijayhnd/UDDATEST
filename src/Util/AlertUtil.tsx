import { Alert } from "react-native";
import AppConstants from "./Constants";

export default class AlertUtil{

    static show(message: string){
        Alert.alert(AppConstants.ApplicationName, message)
    }

    static showSingleActionMessage(message: string, action:()=>void){
        Alert.alert(AppConstants.ApplicationName, message,[{text: 'OK', onPress: action}])
    }
}