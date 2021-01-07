import AlertUtil from "../../Util/AlertUtil";
import PlaceBetResponse from "./PlaceBetResponse";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";

export default class PlaceBetResponseParser implements IServiceResponseParser {
    parse(response: any): PlaceBetResponse {
            console.log("PlaceBetResponseParser "+JSON.stringify(response))
            
            return new PlaceBetResponse(response)
        
    }
}