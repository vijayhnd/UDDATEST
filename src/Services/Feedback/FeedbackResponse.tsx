import { IServiceResponse } from "../Core/IServiceResponse";


export default class FeedbackResponse implements IServiceResponse {
    response: any

    constructor(response: any){
        // super()
        this.response = response;
    }
}