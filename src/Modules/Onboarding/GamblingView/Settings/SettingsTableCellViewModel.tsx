import { BaseViewModel } from "../../../../Components/BaseViewModel";

export class SettingsTableCellViewModel extends BaseViewModel {
    title?: string
    onClick?: any
    key?: string
    selected = false
    switchCell = false
    switchHandler?: any
    onPress?: any
    didPressed = false
    index?: number
    sectionIndex?: number
    checkCell = false
    checkHandler?: any


    constructor(title: string) {
        super()
        this.title = title
    }
}