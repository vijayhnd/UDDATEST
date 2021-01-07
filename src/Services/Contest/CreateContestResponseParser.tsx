import CreateContestResponse from "./CreateContestResponse";
import { IServiceResponseParser } from "../Core/IServiceResponseParser";

export default class CreateContestResponseParser implements IServiceResponseParser {
    parse(response: any): CreateContestResponse {
            console.log("CreateContestResponseParser "+JSON.stringify(response))

            return new CreateContestResponse(response)
        
    }
}