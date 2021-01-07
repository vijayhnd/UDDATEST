import { BaseViewModel } from "../../BaseViewModel";
import { IMatch } from "../../../Entities/Match";

export class TeamVersusViewModel extends BaseViewModel{
    match: IMatch

    constructor(match: IMatch){
        super()
        this.match = match
    }
}