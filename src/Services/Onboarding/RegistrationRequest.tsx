import {  BaseServiceRequest, PostServiceRequest } from "../Core/IServiceRequest";
import qs from 'qs'
import AlertUtil from "../../Util/AlertUtil";

export default class RegistrationRequest extends PostServiceRequest{
    firstName = ''
    lastName = ''
    email = ''
    password = ''
    referral_code =''  //garima
    confirmPassword = ''
    mobileNumber = ''
    device_type=''
    device_token=''
    timestamp=0
    signature=''
    latitude = 0
    longitude = 0

    constructor(firstName: string, 
                lastName: string, 
                email: string, 
                password: string, 
                confirmPassword: string,
                referral_code :string,
                mobileNumber: string,
                device_type:string,
                device_token:string,
                timestamp:number,
                signature:string,
                latitude: number,
                longitude: number){
        super()
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.confirmPassword = confirmPassword
        this.referral_code = referral_code
        this.mobileNumber = mobileNumber
        this.device_type = device_type
        this.device_token = device_token
        this.timestamp = timestamp
        this.signature = signature
         // this.latitude = 22.3106 
        //this.longitude = 73.1926 
        this.latitude = latitude 
        this.longitude = longitude 
    }

    serviceRequest(): string{
        var jsonRequest = super.jsonRequest()
        jsonRequest.firstname = this.firstName
        jsonRequest.lastname = this.lastName
        jsonRequest.email = this.email
        jsonRequest.password = this.password
        jsonRequest.referral_code = this.referral_code
        jsonRequest.mobile = this.mobileNumber
        jsonRequest.device_type = this.device_type
        jsonRequest.device_token =this.device_token 
        jsonRequest.timestamp =this.timestamp
        jsonRequest.signature =this.signature 
        jsonRequest.latitude = this.latitude
        jsonRequest.longitude = this.longitude
        return qs.stringify(jsonRequest, { encode: true })
    }
}

class SocialMediaRegistrationRequest extends BaseServiceRequest{
    email = ''
    mobile = ''
    firstName = ''
    lastName = ''
    profilePic = ''
    device_type =''
    device_token=''
    timestamp=0
    signature=''
    latitude = 0
    longitude = 0
    guest_access_token = ''

    constructor(email: string, 
                mobile: string, 
                firstName: string, 
                lastName: string, 
                profilePic: string,
                device_type:string,
                device_token:string,
                timestamp:number,
                signature:string,
                latitude: number,
                longitude: number,
                guest_access_token:string
                ){
        super()
        this.email = email
        this.mobile = mobile
        this.firstName = firstName
        this.lastName = lastName
        this.profilePic = profilePic
        this.device_type = device_type
        this.device_type = device_type
        this.device_token = device_token
        this.timestamp = timestamp
        this.signature = signature
        // this.latitude = 22.3106 
        // this.longitude = 73.1926 
        this.latitude = latitude 
        this.longitude = longitude 
        this.guest_access_token = guest_access_token
    }

    jsonRequest():any{
        var jsonRequest = super.jsonRequest()
        jsonRequest.firstname = this.firstName
        jsonRequest.lastname = this.lastName
        jsonRequest.email = this.email
        jsonRequest.mobile = this.mobile
        jsonRequest.profile_pic = this.profilePic
        jsonRequest.device_type = this.device_type
        jsonRequest.device_token =this.device_token 
        jsonRequest.timestamp =this.timestamp
        jsonRequest.signature =this.signature 
        jsonRequest.latitude = this.latitude
        jsonRequest.longitude = this.longitude
        return jsonRequest
    }
}

export class FacebookRegistrationRequest extends SocialMediaRegistrationRequest{
    facebookId = '';
    type ='';


    constructor(email: string, 
                mobile: string, 
                firstName: string, 
                lastName: string, 
                profilePic: string,
                facebookId: string,
                device_type:string,
                device_token:string,
                timestamp:number,
                signature:string,
                latitude: number,
                longitude: number,
                type: string,guest_access_token:string){
        super(email,mobile,firstName,lastName,profilePic,device_type,device_token,timestamp,signature,latitude,longitude,guest_access_token)
        this.facebookId = facebookId;

        this.type = type;
    }

    jsonRequest():any{
        var jsonRequest = super.jsonRequest()
        if(this.type=='apple'){
            jsonRequest.apple_id = this.facebookId
        }
        else{
            jsonRequest.fb_id = this.facebookId
        }
        
        return jsonRequest
    }

    serviceRequest(): string{
        return qs.stringify(this.jsonRequest(),{ encode: true })
    }
}

export class GoogleRegistrationRequest extends SocialMediaRegistrationRequest{
    googleId = ''

    constructor(email: string, 
                mobile: string, 
                firstName: string, 
                lastName: string, 
                profilePic: string,
                googleId: string,
                device_type:string,
                device_token:string,
                timestamp:number,
                signature:string,
                latitude: number,
                longitude: number,
                guest_access_token:string){
        super(email,mobile,firstName,lastName,profilePic,device_type,device_token,timestamp,signature,latitude,longitude,guest_access_token)
        this.googleId = googleId
    }

    jsonRequest():any{
        var jsonRequest = super.jsonRequest()
        jsonRequest.google_id = this.googleId
        return jsonRequest
    }

    serviceRequest(): string{
        return qs.stringify(this.jsonRequest(),{ encode: true })
    }
}

export class TwitterRegistrationRequest extends SocialMediaRegistrationRequest{
    twitterId = ''

    constructor(email: string, 
                mobile: string, 
                firstName: string, 
                lastName: string, 
                profilePic: string,
                twitterId: string,
                device_type:string,
                device_token:string,
                timestamp:number,
                signature:string,
                latitude: number,
                longitude: number,
                guest_access_token:string){
        super(email,mobile,firstName,lastName,profilePic,device_type,device_token,timestamp,signature,latitude,longitude,guest_access_token)
        this.twitterId = twitterId
}

    jsonRequest():any{
        var jsonRequest = super.jsonRequest()
        jsonRequest.twitter_id = this.twitterId
        return jsonRequest
    }

    serviceRequest(): string{
        return qs.stringify(this.jsonRequest(),{ encode: true })
    }
}