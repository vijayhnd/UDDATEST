import { Location } from ".";
import { IUser } from "./User";
import { UserRepository } from "../Infrastructure/Repository/UserRespository";

export default class Application {
    private static sharedInstance: Application = new Application()
 
    currentUserLocation?: Location
    private _userMobileNumber?: string
    get userMobileNumber():string {
        return this._userMobileNumber!;
    }
    set userMobileNumber(mobileNumber :string) {
        this._userMobileNumber = '+1'+mobileNumber;
    }
    user?: IUser
    Device_token?:any
    DeeplinkName?:any;
    EncId?:any;
    DeeplinkStatus?:any;
    FromGame?:any;
    FromGambling?:any;
    useEmailID?:any;
    private constructor(){

    }

    public static sharedApplication(): Application{
        return this.sharedInstance
    }
    

    logout(){
        var userRepository = UserRepository.sharedRepository();
        userRepository.removeUser();
        this.user = undefined;
    }
}