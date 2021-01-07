import { UDDAError } from "../../Entities";
import AlertUtil from "../../Util/AlertUtil";
import { AsyncStorage } from 'react-native';
import { Extends } from "typescript-compare";
import Application from "../../Entities/Application";

export interface IServiceRequest {
    signature: string
    timestamp: number
    token: any
    jsonRequest(): any
    serviceRequest(): string
}

interface IPostRequest extends IServiceRequest {
    signature: string
    timestamp: number
    token: any
    jsonRequest(): any
    serviceRequest(): string
    
}

interface IGetRequest extends IServiceRequest {
}

// export class BaseServiceRequest implements IServiceRequest{


//     constructor(){

//     }

//     jsonRequest():any{

//     }

//     serviceRequest(): string{
//         return ''
//     }

// }


export class BaseServiceRequest implements IServiceRequest {

    // signature = '5860915bc81ed150dfc79a0cc15171cbe2f254cde0739c69b10fef376f4d126c'
    signature = 'DUmwc8XSvje1AksoB34wSYUTlhRbdHz9zH26fjxC5WaAklBpFtxQGJZIno69CDPb'
    timestamp = 1498563535
    token=Application.sharedApplication().Device_token
    // token='jfhfbbnbvhjvb';

    constructor() {
       
    }
   

    jsonRequest(): any {
            return {
                'device_token': Application.sharedApplication().Device_token,
                'timestamp': this.timestamp,
                'signature': this.signature
            }
        
    }

    serviceRequest(): string {
        return ''
    }

}


export class PostServiceRequest extends BaseServiceRequest implements IPostRequest {
    signature = '5860915bc81ed150dfc79a0cc15171cbe2f254cde0739c69b10fef376f4d126c'
    timestamp = 1498563535
    token=Application.sharedApplication().Device_token;
    // token='jfhfbbnbvhjvb';

    constructor() {
        super()
    }


    jsonRequest(): any {

        return {
            'device_token': Application.sharedApplication().Device_token,
            'timestamp': this.timestamp,
            'signature': this.signature
        }
    }

    serviceRequest(): string {
        return ''
    }
}

export class GetServiceRequest extends BaseServiceRequest implements IGetRequest {

    constructor() {
        super()
    }

    jsonRequest(): any {

    }

    serviceRequest(): string {
        return ''
    }

}