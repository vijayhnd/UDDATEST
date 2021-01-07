import { BaseViewModel } from "../../BaseViewModel";
import { IMatch } from "../../../Entities/Match";

export class SingleMatchScheduleWithTitleViewModel extends BaseViewModel{
    title:string
    match: IMatch

    constructor(title: string, match: IMatch){
        super()
        this.title = title
        this.match = match
    }
}