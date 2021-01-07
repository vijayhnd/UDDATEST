import { BaseViewModel } from "../../BaseViewModel";

export class GrayRedTitleViewModel extends BaseViewModel{
    title: string

    constructor(title: string){
        super()
        this.title = title
    }

    static createViewModel(title: string): GrayRedTitleViewModel{
        var grayRedTitleViewModel = new GrayRedTitleViewModel(title)
        return grayRedTitleViewModel
    }
}