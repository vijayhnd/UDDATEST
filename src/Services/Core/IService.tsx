import { IServiceRequest } from "./IServiceRequest";

export interface IService{
    execute(servieName: string, request?: IServiceRequest): void    
}

export class BaseService implements IService{

    execute(serviceName: string, request: IServiceRequest){

    }
}