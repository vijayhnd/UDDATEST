import { BaseViewModel } from "../../../../Components/BaseViewModel";
import { SettingsTableCellHeaderViewModel } from "./SettingsTableCellHeaderViewModel";

export class SettingsListViewModel extends BaseViewModel{
    title: string
    data: any[]
    sectionHeaderModel?: SettingsTableCellHeaderViewModel
    
    constructor(title: string, data: any[]){
        super()
        this.title = title
        this.data = data
    }
}