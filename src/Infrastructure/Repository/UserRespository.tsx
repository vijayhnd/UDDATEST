import { IRepository } from "../CorePersistent/IRepository";
import { IUser, User, UserProfile } from "../../Entities/User";
import { UDDAError } from "../../Entities";
import PersistentStore from "../CorePersistent/PersistentStore";
import AppConstants from "../../Util/Constants";
import AlertUtil from "../../Util/AlertUtil";

export interface IUserRepository extends IRepository{

    saveUser(user:IUser, callback:(success: boolean, error?: UDDAError)=>void): void
}

export class UserRepository implements IUserRepository{

    static sharedInstance =  new UserRepository()

    private constructor(){

    }

    static sharedRepository(){
        return this.sharedInstance
    }
    
    saveUserOnboardingStatus= async(isUserLoggedIn: boolean):Promise<{success: boolean, error?:undefined}> => {
        var jsonUserLoggedInStatus = JSON.stringify(isUserLoggedIn)
        return await PersistentStore.storeObjectWithKey(jsonUserLoggedInStatus, AppConstants.UserOnboardingStatusKey)
    }

    fetchUserOnboardingStatus = async():Promise<boolean|UDDAError> => {
        return await PersistentStore.fetchObjectWithKey(AppConstants.UserOnboardingStatusKey)
    }

    saveUser= async(user:IUser):Promise<{success: boolean, error?:undefined}> => {
        var jsonUserString = JSON.stringify(user)
        return await PersistentStore.storeObjectWithKey(jsonUserString, AppConstants.UserStorageKey)
    }

    removeUser= async():Promise<{success: boolean, error?:undefined}> => {
        return await PersistentStore.storeObjectWithKey("", AppConstants.UserStorageKey)
    }

    fetchUser = async():Promise<IUser|UDDAError> => {

        var result: Promise<IUser|UDDAError> 
        var storedObject = await PersistentStore.fetchObjectWithKey(AppConstants.UserStorageKey)
        
        if(storedObject.constructor.name.toLowerCase() != UDDAError.name.toLowerCase()){
            var jsonUserObject = JSON.parse(storedObject)
            var userProfile = new UserProfile()
            userProfile.firstName = jsonUserObject.profile.firstName
            userProfile.displayName = jsonUserObject.profile.displayName
            userProfile.lastName = jsonUserObject.profile.lastName
            userProfile.email = jsonUserObject.profile.email
            userProfile.phone = jsonUserObject.profile.phone
            userProfile.profilePic = jsonUserObject.profile.profilePic
            userProfile.balance = jsonUserObject.profile.balance
            userProfile.openPlayCount = jsonUserObject.profile.open_plays
            userProfile.coveredPlayCount = jsonUserObject.profile.colvered_plays
            var user = new User(jsonUserObject.id,userProfile)
            user.authenticationToken = jsonUserObject.authenticationToken

            var userPromise = new Promise<IUser|UDDAError>((resolve,reject)=>{
                resolve(user)
            })
            result = userPromise
        }else{
            var userPromise = new Promise<IUser|UDDAError>((resolve,reject)=>{
                reject(storedObject)
            })
            result = userPromise
        }
        return result
    }
}