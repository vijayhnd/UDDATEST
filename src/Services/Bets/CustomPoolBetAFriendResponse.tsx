import { IServiceResponse } from "../Core/IServiceResponse";


export default class CustomPoolBetAFriendResponse implements IServiceResponse {
    response: any

    constructor(response: any){
        // super()
        this.response = response;
    }
}