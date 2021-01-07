import { IServiceResponse } from "../Core/IServiceResponse";

import AlertUtil from "../../Util/AlertUtil";
export default class PlaceBetResponse implements IServiceResponse {
    response: any

    constructor(response: any){
        // super()
        this.response = response; 
    }
}