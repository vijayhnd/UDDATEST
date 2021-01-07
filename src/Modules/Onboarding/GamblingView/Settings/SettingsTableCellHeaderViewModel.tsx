import { BaseViewModel } from "../../../../Components/BaseViewModel";

export class SettingsTableCellHeaderViewModel extends BaseViewModel {

    static ProfileCellTitle = 'Profile'
    static WalletCellTitle = 'Wallet'
    static PreferenceCellTitle = 'Preference'
    static NotificationCellTitle = 'Notifications'
    static FAQCellTitle = 'FAQ'
    title: string
    icon: NodeRequire
    onClick?: any
    selected = false
    onPress?: any
    didPressed = false
    index?: number

    constructor(title: string, icon: NodeRequire) {
        super()
        this.title = title
        this.icon = icon
    }

    selectedIcon(): NodeRequire {
        if (this.title === SettingsTableCellHeaderViewModel.ProfileCellTitle) {
            return require('../../../../images/profile_on_G.png')
        } else if (this.title === SettingsTableCellHeaderViewModel.WalletCellTitle) {
            return require('../../../../images/wallet_on_G.png')
        }
        else if (this.title === SettingsTableCellHeaderViewModel.PreferenceCellTitle) {
            return require('../../../../images/setting_off_G.png')
        }
        else if (this.title === SettingsTableCellHeaderViewModel.NotificationCellTitle) {
            return require('../../../../images/notif_on_G.png')
        } else if (this.title === SettingsTableCellHeaderViewModel.PreferenceCellTitle) {
            return require('../../../../images/setting_on_G.png')
        } else {
            return require('../../../../images/faq_on_G.png')
        }
    }

    unselectedIcon(): NodeRequire {
        if (this.title === SettingsTableCellHeaderViewModel.ProfileCellTitle) {
            return require('../../../../images/profile_off_G.png')
        } else if (this.title === SettingsTableCellHeaderViewModel.WalletCellTitle) {
            return require('../../../../images/wallet_off_G.png')
        } else if (this.title === SettingsTableCellHeaderViewModel.NotificationCellTitle) {
            return require('../../../../images/notif_off_G.png')
        } else {
            return require('../../../../images/faq_off_G.png')
        }
    }
}