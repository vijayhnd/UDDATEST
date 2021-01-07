import { IMatch } from "../../../Entities/Match";
import { BaseViewModel } from "../../BaseViewModel";

export class SingleMatchScheduleViewModel extends BaseViewModel{
    match: IMatch

    constructor(match: IMatch){
        super()
        this.match = match
    }
}