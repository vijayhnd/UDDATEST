import { AsyncStorage, Alert } from "react-native";
import { UDDAError } from "../../Entities";
import AlertMessages from "../../Util/AlertMessages";
import AlertUtil from "../../Util/AlertUtil";

export default class PersistentStore{

    static storeObjectWithKey = async (object: any, key: string):Promise<{success: boolean}> =>{
        try {
            await AsyncStorage.setItem(key, object)
            var promise = new Promise<{success: boolean}>((resolve,reject) =>{
                resolve({success: true})
            })
            return promise
        } catch (error) {
            var promise = new Promise<{success: boolean}>((resolve,reject) =>{
                reject({error: new UDDAError(0, error.message)})
            })
            return promise
        }
    }

    static fetchObjectWithKey = async (key: string): Promise<any|UDDAError> =>{
        try {
            const object = await AsyncStorage.getItem(key)
            if(object){
                return object
            }else{
                return new UDDAError(0, AlertMessages.ObjectNotFound)
            }
        } catch (error) {
            return new UDDAError(0, error.message)
        }
    }
}