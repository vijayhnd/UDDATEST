import { BaseServiceResponse } from "../Core/IServiceResponse";
import { IUser } from "../../Entities/User";

export default class LoginResponse extends BaseServiceResponse{
    user: IUser

    constructor(user: IUser){
        super()
        this.user = user
    }
}