import { IServiceResponseParser } from "../Core/IServiceResponseParser";
import AlertUtil from "../../Util/AlertUtil";
import PlayResponse from "./PlayResponse";

export default class PlayServiceParser implements IServiceResponseParser{

    parse(response:any): PlayResponse{
       // AlertUtil.show('Dashboard response :'+JSON.stringify(response))
       var result = response.data; 
       return new PlayResponse(result)
    }
}