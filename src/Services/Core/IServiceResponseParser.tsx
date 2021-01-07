import { IServiceResponse } from "./IServiceResponse";

export interface IServiceResponseParser {
    parse(jsonResponse: JSON): IServiceResponse
}