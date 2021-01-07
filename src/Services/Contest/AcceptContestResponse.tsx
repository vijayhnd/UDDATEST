import { IServiceResponse } from "../Core/IServiceResponse";


export default class AcceptContestResponse implements IServiceResponse {
    response: any

    constructor(response: any){
        // super()
        this.response = response;
    }
}