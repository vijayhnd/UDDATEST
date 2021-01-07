import { BaseServiceResponse } from "../Core/IServiceResponse";
import { Location } from "../../Entities";

export default class LocationResponse extends BaseServiceResponse{
    location?: Location

    constructor(location: Location){
        super()
        this.location = location
    }
}