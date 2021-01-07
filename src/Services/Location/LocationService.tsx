import { Location, UDDAError } from "../../Entities";
import { IServiceRequest } from "../Core/IServiceRequest";
import ServiceKeys from "../Core/ServiceKeys";
import LocationResponse from "./LocationResponse";
import { BaseService } from "../Core/IService";
import AlertUtil from "../../Util/AlertUtil";
import Geolocation from '@react-native-community/geolocation';


export default class LocationService extends BaseService {

    constructor() {
        super()
    }

    execute(serviceName: string, request?: IServiceRequest) {
        if (serviceName === ServiceKeys.LocationServiceName) {
            return this.getCurrentLocation()
        }
    }

    getCurrentLocation(): Promise<{ locationResponse?: LocationResponse }> {
        const promise:any = new Promise((resolve, reject) => {

           // navigator.geolocation.getCurrentPosition(
            Geolocation.getCurrentPosition( 
                position => {

                    var currentLocation = new Location(position.coords.latitude, position.coords.longitude)
                    var locationResponse = new LocationResponse(currentLocation)
                    resolve(locationResponse);

                },
                error => {

                    var locationError = new UDDAError(error.code, error.message)
                    reject(locationError);
                },
                { enableHighAccuracy: false, timeout: 20000 }
            );
        })
        return promise;
    }
}