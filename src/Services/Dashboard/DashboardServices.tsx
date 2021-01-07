import RequestManager from "../Core/RequestManager";
import ServiceURI from "../Core/ServiceURI";
import { IServiceRequest } from "../Core/IServiceRequest";
import ServiceKeys from "../Core/ServiceKeys";
import { PlayRequest } from "./PlayRequest";
import AlertUtil from "../../Util/AlertUtil";
import { BaseService } from "../Core/IService";
import Application from "../../Entities/Application";


export default class DashboardServices extends BaseService{

    // private authorisationToken = Application.sharedApplication().user!.profile.authenticationToken;

    // execute(serviceName: string, request?: IServiceRequest){
    //     if(serviceName === ServiceKeys.DashboardServiceName){
    //         return this.Play(request as PlayRequest)
    //   }      
    // }
    
    // Play(request: PlayRequest){
    //     return RequestManager.sharedManager().postwithheader(ServiceURI.DashboardURI, request.serviceRequest(),this.authorisationToken)
    // }
}