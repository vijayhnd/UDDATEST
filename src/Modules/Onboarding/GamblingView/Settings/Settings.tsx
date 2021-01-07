// import React, { Component } from "react";
// import INavigationProps from "../../../../Components";
// import { IState } from "../../../../Components/IState";
// import { View, SectionList, Text, BackHandler, ScrollView, Alert } from "react-native";
// import Container from "../../../../Components/Container";
// import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
// import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
// import RouterBuilder from "../../../../Router";
// import AppScreens from "../../../../Util/AppScreens";
// import SettingsStyles from "./SettingsStyles";
// import BigButton from "../../../../Components/Button/BigButton";
// import { SettingsTableCellViewModel } from "./SettingsTableCellViewModel";
// import { SettingsTableCellHeader } from "./SettingsTableCellHeader";
// import { SettingsTableCell } from "./SettingsTableCell";
// import { SettingsTableCellHeaderViewModel } from "./SettingsTableCellHeaderViewModel";
// import AlertUtil from "../../../../Util/AlertUtil";
// import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
// import { SettingsListViewModel } from "./SettingsListViewModel";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Application from "../../../../Entities/Application";

// interface G_SettingsViewProps extends INavigationProps {

// }

// interface G_SettingsViewState extends IState {

// }


// export default class G_SettingsView extends Component<G_SettingsViewProps, G_SettingsViewState>
//     implements MenuIconListener, ISubheaderListener, LogoIconListener {

//     private screenTitle = "SETTINGS"
//     private cellSectionModels: SettingsListViewModel[]
//     private notifyFriendRequests = false
//     private notifyMatchUpResults = false
//     private notifyUpcomingGames = false
//     private notifyLiveUpdates = false
//     private notifyFavoriteTeams = false

//     constructor(props: G_SettingsViewProps) {
//         super(props)
//         this.cellSectionModels = this.sectionModels()
//     }



//     componentDidMount() {
//         BackHandler.addEventListener('hardwareBackPress', this.iconDidTapped);

//         BackHandler.addEventListener('hardwareBackPress', () => {
//             if (this.props) {
//                 RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
//                 return true; // This will prevent the regular handling of the back button
//             }

//             return false;
//         });
//     }


//     iconDidTapped() {
//         this.props.navigation!.goBack(null);
//         return true;
//     }

//     LogoiconDidTapped() {
//         RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
//     }

//     accountNameTapped() {
//         // RouterBuilder.replaceRouteTo(AppScreens.ProfileView, this.props)
//         this.props.navigation!.navigate(AppScreens.G_ProfileView);
//     }

//     availableBalanceTapped() {

//     }

//     openPlaysTapped() {
//         RouterBuilder.replaceRouteTo(AppScreens.G_OpenPlaysView, this.props)
//         // this.props.navigation!.navigate(AppScreens.OpenPlaysView);
//     }

//     coveredPlaysTapped() {
//         RouterBuilder.replaceRouteTo(AppScreens.G_CoveredPlaysView, this.props)
//         // this.props.navigation!.navigate(AppScreens.CoveredPlaysView);
//     }

//     profileDidSelected = (viewModel: SettingsTableCellHeaderViewModel) => {


//         for (const cellModel of this.cellSectionModels) {
//             if (cellModel.sectionHeaderModel === viewModel) {
//                 cellModel.sectionHeaderModel!.selected = true
//             } else {
//                 cellModel.sectionHeaderModel!.selected = false
//             }
//         }

//         this.setState({})
//     }

//     addMoneyDidSelected = (viewModel: SettingsTableCellHeaderViewModel) => {
//         AlertUtil.show(viewModel.title)
//     }

//     notificationsDidSelected = (viewModel: SettingsTableCellHeaderViewModel) => {
//         AlertUtil.show(viewModel.title)
//     }

//     faqDidSelected = (viewModel: SettingsTableCellHeaderViewModel) => {
//         AlertUtil.show(viewModel.title)
//     }

//     rowDidSelected(inSection: number, row: number) {

//     }

//     sectionDidSelected(section: number) {
//         // AlertUtil.show('Section: '+section)
//         //AlertUtil.show('Section: '+this.cellSectionModels[section])
//         for (const cellModel of this.cellSectionModels) {
//             if (cellModel.sectionHeaderModel!.index === section) {
//                 cellModel.sectionHeaderModel!.selected = true
//                 cellModel.sectionHeaderModel!.icon = cellModel.sectionHeaderModel!.selectedIcon()
//                 if (section == 0) {
//                     // RouterBuilder.replaceRouteTo(AppScreens.ProfileView, this.props)
//                     this.props.navigation!.navigate(AppScreens.G_ProfileView);
//                 }
//                 else if (section == 3) {
//                     // RouterBuilder.replaceRouteTo(AppScreens.FAQView, this.props)
//                     this.props.navigation!.navigate(AppScreens.G_FAQView);
//                 }
//             } else {
//                 cellModel.sectionHeaderModel!.selected = false
//                 cellModel.sectionHeaderModel!.icon = cellModel.sectionHeaderModel!.unselectedIcon()
//             }
//         }
//         this.setState({})
//     }

//     friendRequestSwitchChanged = (isOn: boolean) => {
//         //AlertUtil.show('friend request switch changed to: '+isOn)
//         this.notifyFriendRequests = isOn
//         let notificationSectionModel = this.cellSectionModels[2]
//         let friendRequestCellModel = notificationSectionModel.data[0]
//         friendRequestCellModel.selected = this.notifyFriendRequests
//         this.setState({})
//     }

//     matchUpResultsSwitchChanged = (isOn: boolean) => {
//         //AlertUtil.show('match up switch changed to: '+isOn)
//         this.notifyMatchUpResults = isOn
//         let notificationSectionModel = this.cellSectionModels[2]
//         let matchUpResultsCellModel = notificationSectionModel.data[1]
//         matchUpResultsCellModel.selected = this.notifyMatchUpResults
//         this.setState({})
//     }

//     upcomingGamesSwitchChanged = (isOn: boolean) => {
//         //AlertUtil.show('upcoming games switch changed to: '+isOn)
//         this.notifyUpcomingGames = isOn
//         let notificationSectionModel = this.cellSectionModels[2]
//         let upcomingGamesCellModel = notificationSectionModel.data[2]
//         upcomingGamesCellModel.selected = this.notifyUpcomingGames
//         this.setState({})
//     }

//     liveUpdatesSwitchChanged = (isOn: boolean) => {
//         //AlertUtil.show('live updates switch changed to: '+isOn)
//         this.notifyLiveUpdates = isOn
//         let notificationSectionModel = this.cellSectionModels[2]
//         let liveUpdatesCellModel = notificationSectionModel.data[3]
//         liveUpdatesCellModel.selected = this.notifyLiveUpdates
//         this.setState({})
//     }

//     favoriteTeamsSwtichChanged = (isOn: boolean) => {
//         //AlertUtil.show('favorite teams switch changed to: '+isOn)
//         this.notifyFavoriteTeams = isOn
//         let notificationSectionModel = this.cellSectionModels[2]
//         let favoriteTeamsCellModel = notificationSectionModel.data[4]
//         favoriteTeamsCellModel.selected = this.notifyFavoriteTeams
//         this.setState({})
//     }

//     logoutButtonPressed() {
//         Application.sharedApplication().logout()
//         RouterBuilder.resetRouteTo(AppScreens.OnboardingStack, this.props)
//     }

//     private sectionModels(): SettingsListViewModel[] {
//         let profileHeaderModel = new SettingsListViewModel(SettingsTableCellHeaderViewModel.ProfileCellTitle, [])
//         profileHeaderModel.sectionHeaderModel = new SettingsTableCellHeaderViewModel('Profile', require('../../../../images/profile_off_G.png'))
//         profileHeaderModel.sectionHeaderModel.onPress = this.sectionDidSelected.bind(this) 
//         profileHeaderModel.sectionHeaderModel.index = 0

//         let addMoneyCellModel = new SettingsTableCellViewModel('Add Money')
//         addMoneyCellModel.index = 0
//         addMoneyCellModel.sectionIndex = 1
//         addMoneyCellModel.onPress = this.rowDidAddMoneySelected.bind(this)
//         let withdrawDonateCellModel = new SettingsTableCellViewModel('Withdraw/ Donate')
//         withdrawDonateCellModel.index = 1
//         withdrawDonateCellModel.sectionIndex = 1
//         withdrawDonateCellModel.onPress = this.rowDidWalletSelected.bind(this)
//         let walletHeaderModel = new SettingsListViewModel(SettingsTableCellHeaderViewModel.WalletCellTitle, [addMoneyCellModel, withdrawDonateCellModel])
//         walletHeaderModel.sectionHeaderModel = new SettingsTableCellHeaderViewModel('Wallet', require('../../../../images/wallet_off_G.png'))
//         walletHeaderModel.sectionHeaderModel.onPress = this.sectionDidSelected.bind(this)
//         walletHeaderModel.sectionHeaderModel.index = 1

//         let friendRequestCellModel = new SettingsTableCellViewModel('Friend Request')
//         friendRequestCellModel.switchCell = true
//         friendRequestCellModel.index = 0
//         friendRequestCellModel.sectionIndex = 2
//         friendRequestCellModel.switchHandler = this.friendRequestSwitchChanged
//         friendRequestCellModel.onPress = this.rowDidSelected.bind(this)
//         let matchUpResultsCellModel = new SettingsTableCellViewModel('Match Up Results')
//         matchUpResultsCellModel.switchCell = true
//         matchUpResultsCellModel.index = 1
//         matchUpResultsCellModel.sectionIndex = 2
//         matchUpResultsCellModel.switchHandler = this.matchUpResultsSwitchChanged
//         matchUpResultsCellModel.onPress = this.rowDidSelected.bind(this)
//         let upcomingGamesCellModel = new SettingsTableCellViewModel('Upcoming Games')
//         upcomingGamesCellModel.switchCell = true
//         upcomingGamesCellModel.index = 2
//         upcomingGamesCellModel.sectionIndex = 2
//         upcomingGamesCellModel.switchHandler = this.upcomingGamesSwitchChanged
//         upcomingGamesCellModel.onPress = this.rowDidSelected.bind(this)
//         let liveUpdatesCellModel = new SettingsTableCellViewModel('Live Updates')
//         liveUpdatesCellModel.switchCell = true
//         liveUpdatesCellModel.index = 3
//         liveUpdatesCellModel.sectionIndex = 2
//         liveUpdatesCellModel.switchHandler = this.liveUpdatesSwitchChanged
//         liveUpdatesCellModel.onPress = this.rowDidSelected.bind(this)
//         let favouriteTeamCellModel = new SettingsTableCellViewModel('Favorite Teams')
//         favouriteTeamCellModel.switchCell = true
//         favouriteTeamCellModel.index = 4
//         favouriteTeamCellModel.sectionIndex = 2
//         favouriteTeamCellModel.switchHandler = this.favoriteTeamsSwtichChanged
//         favouriteTeamCellModel.onPress = this.rowDidSelected.bind(this)
//         let notificationsHeaderModel = new SettingsListViewModel(SettingsTableCellHeaderViewModel.NotificationCellTitle, [friendRequestCellModel, matchUpResultsCellModel, upcomingGamesCellModel, liveUpdatesCellModel, favouriteTeamCellModel])
//         notificationsHeaderModel.sectionHeaderModel = new SettingsTableCellHeaderViewModel('Notifications', require('../../../../images/notif_off_G.png'))
//         notificationsHeaderModel.sectionHeaderModel.onPress = this.sectionDidSelected.bind(this)
//         notificationsHeaderModel.sectionHeaderModel.index = 2

//         let faqHeaderModel = new SettingsListViewModel('FAQ', [])
//         faqHeaderModel.sectionHeaderModel = new SettingsTableCellHeaderViewModel(SettingsTableCellHeaderViewModel.FAQCellTitle, require('../../../../images/faq_off_G.png'))
//         faqHeaderModel.sectionHeaderModel.onPress = this.sectionDidSelected.bind(this)
//         faqHeaderModel.sectionHeaderModel.index = 3

//         return [profileHeaderModel, walletHeaderModel, notificationsHeaderModel, faqHeaderModel]
//     }

//     rowDidAddMoneySelected() {
//         //AlertUtil.show('Add Money Selected')
//         this.props.navigation!.navigate(AppScreens.G_AddMoneyView)
//     }

//     rowDidWalletSelected() {
//         // AlertUtil.show('Wallet Selected')
//         this.props.navigation!.navigate(AppScreens.G_WithdrawMoneyView)
//     }



//     render() {
//         //AlertUtil.show(this.cellSectionModels[0].sectionHeaderModel!.title+'   selected: ' + this.cellSectionModels[0].sectionHeaderModel!.selected)
//         return (
//             <Container
//                 isHeader={true}
//                 isSubHeader={true}
//                 isTitle={false}
//                 showIndicator={false}
//                 menuIconListener={this}
//                 isSetting={true}
//                 LogoIconListener={this}
//                 accountNameListener={this}
//                 availableBalanceListener={this}
//                 openPlaysListener={this}
//                 coveredPlaysListener={this}>

//                 <ScrollView style={{ width: '100%', height: '100%' }}>
//                     <View style={[SettingsStyles.mainContent]}>
//                         <View style={[SettingsStyles.titleContainer]}>
//                             <Text style={[SettingsStyles.titleText]}>SETTINGS</Text>
//                         </View>
//                         <View style={[SettingsStyles.settingsContainer]}>
//                             <SectionList renderSectionHeader={({ section }) => <SettingsTableCellHeader viewModel={section.sectionHeaderModel}></SettingsTableCellHeader>}
//                                 sections={this.cellSectionModels}
//                                 renderItem={({ item }) => <SettingsTableCell viewModel={item} />}
//                                 keyExtractor={(item, index) => item + index}
//                             />
//                         </View>
//                         <View style={[SettingsStyles.logoutContainer]}>
//                             <BigButton title='LOG OUT'
//                                 style={[SettingsStyles.logoutButtonStyle,{backgroundColor:'#68bcbc'}]}
//                                 textStyle={[SettingsStyles.logoutButtonTextStyle]}
//                                 listener={this.logoutButtonPressed.bind(this)}>
//                             </BigButton>
//                         </View>
//                     </View>
//                 </ScrollView>


//             </Container>
//         )
//     }
// }






import React, { Component } from "react";
import INavigationProps from "../../../../Components";
import { IState } from "../../../../Components/IState";
import { View, SectionList, Text, BackHandler, AsyncStorage } from "react-native";
import Container from "../../../../Components/Container";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import SettingsStyles from "./SettingsStyles";
import BigButton from "../../../../Components/Button/BigButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SettingsTableCellViewModel } from "./SettingsTableCellViewModel";
import { SettingsTableCellHeader } from "./SettingsTableCellHeader";
import { SettingsTableCell } from "./SettingsTableCell";
import { SettingsTableCellHeaderViewModel } from "./SettingsTableCellHeaderViewModel";
import AlertUtil from "../../../../Util/AlertUtil";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { SettingsListViewModel } from "./SettingsListViewModel";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Application from "../../../../Entities/Application";

interface G_SettingsViewProps extends INavigationProps {

}

interface G_SettingsViewState extends IState {

}


export default class G_SettingsView extends Component<G_SettingsViewProps, G_SettingsViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {

    private screenTitle = "SETTINGS"
    private cellSectionModels: SettingsListViewModel[]
    private notifyFriendRequests = false
    private notifyMatchUpResults = false
    private notifyUpcomingGames = false
    private notifyLiveUpdates = false
    private notifyFavoriteTeams = false

    private checkedGamer = false
    private checkedGambler = false
    private checkedBoth = false


    constructor(props: G_SettingsViewProps) {
        super(props)
        this.cellSectionModels = this.sectionModels()
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.iconDidTapped);
    }


    iconDidTapped() {
        this.props.navigation!.goBack(null);
        return true;
    }

    LogoiconDidTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
    }

    accountNameTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_ProfileView, this.props)
    }

    availableBalanceTapped() {

    }

    openPlaysTapped() {

    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }

    profileDidSelected = (viewModel: SettingsTableCellHeaderViewModel) => {


        for (const cellModel of this.cellSectionModels) {
            if (cellModel.sectionHeaderModel === viewModel) {
                cellModel.sectionHeaderModel!.selected = true
            } else {
                cellModel.sectionHeaderModel!.selected = false
            }
        }

        this.setState({})
    }

    addMoneyDidSelected = (viewModel: SettingsTableCellHeaderViewModel) => {
        AlertUtil.show(viewModel.title)
    }

    notificationsDidSelected = (viewModel: SettingsTableCellHeaderViewModel) => {
        AlertUtil.show(viewModel.title)
    }

    faqDidSelected = (viewModel: SettingsTableCellHeaderViewModel) => {
        AlertUtil.show(viewModel.title)
    }

    rowDidSelected(inSection: number, row: number) {

    }

    sectionDidSelected(section: number) {
        // AlertUtil.show('Section: '+section)
        //AlertUtil.show('Section: '+this.cellSectionModels[section])
        for (const cellModel of this.cellSectionModels) {
            if (cellModel.sectionHeaderModel!.index === section) {
                cellModel.sectionHeaderModel!.selected = true
                cellModel.sectionHeaderModel!.icon = cellModel.sectionHeaderModel!.selectedIcon()
                if (section == 0) {
                    // RouterBuilder.replaceRouteTo(AppScreens.ProfileView, this.props)
                    this.props.navigation!.navigate(AppScreens.G_ProfileView);
                }
                else if (section == 4) {
                    // RouterBuilder.replaceRouteTo(AppScreens.FAQView, this.props)
                    // this.props.navigation!.navigate(AppScreens.G_FAQView);
                }
            } else {
                cellModel.sectionHeaderModel!.selected = false
                cellModel.sectionHeaderModel!.icon = cellModel.sectionHeaderModel!.unselectedIcon()
            }
        }
        this.setState({})
    }

    friendRequestSwitchChanged = (isOn: boolean) => {
        // AlertUtil.show('friend request switch changed to: '+isOn)
        this.notifyFriendRequests = isOn
        let notificationSectionModel = this.cellSectionModels[3]
        let friendRequestCellModel = notificationSectionModel.data[0]
        friendRequestCellModel.selected = this.notifyFriendRequests
        this.setState({})
    }

    matchUpResultsSwitchChanged = (isOn: boolean) => {
        //AlertUtil.show('match up switch changed to: '+isOn)
        this.notifyMatchUpResults = isOn
        let notificationSectionModel = this.cellSectionModels[3]
        let matchUpResultsCellModel = notificationSectionModel.data[1]
        matchUpResultsCellModel.selected = this.notifyMatchUpResults
        this.setState({})
    }

    upcomingGamesSwitchChanged = (isOn: boolean) => {
        //AlertUtil.show('upcoming games switch changed to: '+isOn)
        this.notifyUpcomingGames = isOn
        let notificationSectionModel = this.cellSectionModels[3]
        let upcomingGamesCellModel = notificationSectionModel.data[2]
        upcomingGamesCellModel.selected = this.notifyUpcomingGames
        this.setState({})
    }

    liveUpdatesSwitchChanged = (isOn: boolean) => {
        //AlertUtil.show('live updates switch changed to: '+isOn)
        this.notifyLiveUpdates = isOn
        let notificationSectionModel = this.cellSectionModels[3]
        let liveUpdatesCellModel = notificationSectionModel.data[3]
        liveUpdatesCellModel.selected = this.notifyLiveUpdates
        this.setState({})
    }

    favoriteTeamsSwtichChanged = (isOn: boolean) => {
        //AlertUtil.show('favorite teams switch changed to: '+isOn)
        this.notifyFavoriteTeams = isOn
        let notificationSectionModel = this.cellSectionModels[3]
        let favoriteTeamsCellModel = notificationSectionModel.data[4]
        favoriteTeamsCellModel.selected = this.notifyFavoriteTeams
        this.setState({})
    }

    gamerCheckedIcon = (isChecked: boolean) => {
        //  AlertUtil.show('gamerCheckedIcon changed to: '+isChecked)
        this.checkedGamer = isChecked
        let checkedSectionModel = this.cellSectionModels[2]
        let gamerCellModel = checkedSectionModel.data[0]
        gamerCellModel.selected = this.checkedGamer
        let gamblerCellModel = checkedSectionModel.data[1]
        gamblerCellModel.selected = !this.checkedGamer
        let bothCellModel = checkedSectionModel.data[2]
        bothCellModel.selected = !this.checkedGamer
        this.setState({})
    }

    gamblerCheckedIcon = (isChecked: boolean) => {
        // AlertUtil.show('gamblerCheckedIcon changed to: '+isChecked)
        this.checkedGambler = isChecked
        let checkedSectionModel = this.cellSectionModels[2]
        let gamblerCellModel = checkedSectionModel.data[1]
        gamblerCellModel.selected = this.checkedGambler
        let gamerCellModel = checkedSectionModel.data[0]
        gamerCellModel.selected = !this.checkedGambler
        let bothCellModel = checkedSectionModel.data[2]
        bothCellModel.selected = !this.checkedGambler
        this.setState({})
    }

    bothCheckedIcon = (isChecked: boolean) => {
        // AlertUtil.show('bothCheckedIcon changed to: '+isChecked)
        this.checkedBoth = isChecked
        let checkedSectionModel = this.cellSectionModels[2]
        let bothCellModel = checkedSectionModel.data[2]
        bothCellModel.selected = this.checkedBoth
        let gamerCellModel = checkedSectionModel.data[0]
        gamerCellModel.selected = !this.checkedBoth
        let gamblerCellModel = checkedSectionModel.data[1]
        gamblerCellModel.selected = !this.checkedBoth
        this.setState({})
    }

    logoutButtonPressed() {
        Application.sharedApplication().logout()
        AsyncStorage.removeItem("FromGame");
        AsyncStorage.removeItem("FromGambling");
        Application.sharedApplication().FromGame = false;
        Application.sharedApplication().FromGame = false;
        RouterBuilder.resetRouteTo(AppScreens.SplashLandingView, this.props)
        // RouterBuilder.resetRouteTo(AppScreens.ApplicationStack, this.props)

    }

    private sectionModels(): SettingsListViewModel[] {
        let profileHeaderModel = new SettingsListViewModel(SettingsTableCellHeaderViewModel.ProfileCellTitle, [])
        profileHeaderModel.sectionHeaderModel = new SettingsTableCellHeaderViewModel('Profile', require('../../../../images/profile_off_G.png'))
        profileHeaderModel.sectionHeaderModel.onPress = this.sectionDidSelected.bind(this)
        profileHeaderModel.sectionHeaderModel.index = 0

        let addMoneyCellModel = new SettingsTableCellViewModel('Add Money')
        addMoneyCellModel.index = 0
        addMoneyCellModel.sectionIndex = 1
        addMoneyCellModel.onPress = this.rowDidAddMoneySelected.bind(this)
        let withdrawDonateCellModel = new SettingsTableCellViewModel('Withdraw/ Donate')
        withdrawDonateCellModel.index = 1
        withdrawDonateCellModel.sectionIndex = 1
        withdrawDonateCellModel.onPress = this.rowDidWalletSelected.bind(this)
        let walletHeaderModel = new SettingsListViewModel(SettingsTableCellHeaderViewModel.WalletCellTitle, [addMoneyCellModel, withdrawDonateCellModel])
        walletHeaderModel.sectionHeaderModel = new SettingsTableCellHeaderViewModel('Wallet', require('../../../../images/wallet_off_G.png'))
        walletHeaderModel.sectionHeaderModel.onPress = this.sectionDidSelected.bind(this)
        walletHeaderModel.sectionHeaderModel.index = 1

        let gamerCellModel = new SettingsTableCellViewModel('I am gamer')
        gamerCellModel.index = 0
        gamerCellModel.sectionIndex = 2
        gamerCellModel.checkCell = true
        gamerCellModel.checkHandler = this.gamerCheckedIcon
        gamerCellModel.onPress = this.rowDidSelected.bind(this)
        let gamblerCellModel = new SettingsTableCellViewModel('I am gambler')
        gamblerCellModel.index = 1
        gamblerCellModel.sectionIndex = 2
        gamblerCellModel.checkCell = true
        gamblerCellModel.checkHandler = this.gamblerCheckedIcon
        gamblerCellModel.onPress = this.rowDidSelected.bind(this)
        let bothCellModel = new SettingsTableCellViewModel('Show me both options')
        bothCellModel.index = 2
        bothCellModel.sectionIndex = 2
        bothCellModel.checkCell = true
        bothCellModel.checkHandler = this.bothCheckedIcon
        bothCellModel.onPress = this.rowDidSelected.bind(this)
        let PreferenceHeaderModel = new SettingsListViewModel(SettingsTableCellHeaderViewModel.PreferenceCellTitle, [gamerCellModel, gamblerCellModel, bothCellModel])
        PreferenceHeaderModel.sectionHeaderModel = new SettingsTableCellHeaderViewModel('Preference', require('../../../../images/setting_off_G.png'))
        PreferenceHeaderModel.sectionHeaderModel.onPress = this.sectionDidSelected.bind(this)
        PreferenceHeaderModel.sectionHeaderModel.index = 2


        let friendRequestCellModel = new SettingsTableCellViewModel('Friend Request')
        friendRequestCellModel.switchCell = true
        friendRequestCellModel.index = 0
        friendRequestCellModel.sectionIndex = 3
        friendRequestCellModel.switchHandler = this.friendRequestSwitchChanged
        friendRequestCellModel.onPress = this.rowDidSelected.bind(this)
        let matchUpResultsCellModel = new SettingsTableCellViewModel('Match Up Results')
        matchUpResultsCellModel.switchCell = true
        matchUpResultsCellModel.index = 1
        matchUpResultsCellModel.sectionIndex = 3
        matchUpResultsCellModel.switchHandler = this.matchUpResultsSwitchChanged
        matchUpResultsCellModel.onPress = this.rowDidSelected.bind(this)
        let upcomingGamesCellModel = new SettingsTableCellViewModel('Upcoming Games')
        upcomingGamesCellModel.switchCell = true
        upcomingGamesCellModel.index = 2
        upcomingGamesCellModel.sectionIndex = 3
        upcomingGamesCellModel.switchHandler = this.upcomingGamesSwitchChanged
        upcomingGamesCellModel.onPress = this.rowDidSelected.bind(this)
        let liveUpdatesCellModel = new SettingsTableCellViewModel('Live Updates')
        liveUpdatesCellModel.switchCell = true
        liveUpdatesCellModel.index = 3
        liveUpdatesCellModel.sectionIndex = 3
        liveUpdatesCellModel.switchHandler = this.liveUpdatesSwitchChanged
        liveUpdatesCellModel.onPress = this.rowDidSelected.bind(this)
        // let favouriteTeamCellModel = new SettingsTableCellViewModel('Favorite Teams')
        // favouriteTeamCellModel.switchCell = true
        // favouriteTeamCellModel.index = 4
        // favouriteTeamCellModel.sectionIndex = 3
        // favouriteTeamCellModel.switchHandler = this.favoriteTeamsSwtichChanged
        // favouriteTeamCellModel.onPress = this.rowDidSelected.bind(this)
        // favouriteTeamCellModel
        let notificationsHeaderModel = new SettingsListViewModel(SettingsTableCellHeaderViewModel.NotificationCellTitle, [friendRequestCellModel, matchUpResultsCellModel, upcomingGamesCellModel, liveUpdatesCellModel])
        notificationsHeaderModel.sectionHeaderModel = new SettingsTableCellHeaderViewModel('Notifications', require('../../../../images/notif_off_G.png'))
        notificationsHeaderModel.sectionHeaderModel.onPress = this.sectionDidSelected.bind(this)
        notificationsHeaderModel.sectionHeaderModel.index = 3

        let faqHeaderModel = new SettingsListViewModel('FAQ', [])
        faqHeaderModel.sectionHeaderModel = new SettingsTableCellHeaderViewModel(SettingsTableCellHeaderViewModel.FAQCellTitle, require('../../../../images/faq_off_G.png'))
        faqHeaderModel.sectionHeaderModel.onPress = this.sectionDidSelected.bind(this)
        faqHeaderModel.sectionHeaderModel.index = 4

        return [profileHeaderModel, walletHeaderModel, PreferenceHeaderModel, notificationsHeaderModel, faqHeaderModel]
    }

    rowDidAddMoneySelected() {
        //AlertUtil.show('Add Money Selected')
        // this.props.navigation!.navigate(AppScreens.AddMoneyView)
    }

    rowDidWalletSelected() {
        // AlertUtil.show('Wallet Selected')
        // this.props.navigation!.navigate(AppScreens.WithdrawMoneyView)
    }



    render() {
        //AlertUtil.show(this.cellSectionModels[0].sectionHeaderModel!.title+'   selected: ' + this.cellSectionModels[0].sectionHeaderModel!.selected)
        return (
            <Container
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                showIndicator={false}
                menuIconListener={this}
                isSetting={true}
                LogoIconListener={this}
                accountNameListener={this}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}>

                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={SettingsStyles.scrollContent}
                    automaticallyAdjustContentInsets={false}
                    contentInset={{ top: 0, bottom: 0 }}
                    scrollEnabled={true}
                    bounces={false}>

                    <View style={[SettingsStyles.mainContent]}>
                        <View style={[SettingsStyles.titleContainer]}>
                            <Text style={[SettingsStyles.titleText]}>SETTINGS</Text>
                        </View>
                        <View style={[SettingsStyles.settingsContainer]}>
                            <SectionList renderSectionHeader={({ section }) =>
                                <SettingsTableCellHeader viewModel={section.sectionHeaderModel}></SettingsTableCellHeader>}
                                sections={this.cellSectionModels}
                                renderItem={({ item }) => <SettingsTableCell viewModel={item} />}
                                keyExtractor={(item, index) => item + index}
                            />
                        </View>
                        <View style={[SettingsStyles.logoutContainer]}>
                            <BigButton title='LOG OUT'
                                style={[SettingsStyles.logoutButtonStyle, { backgroundColor: '#68bcbc' }]}
                                textStyle={[SettingsStyles.logoutButtonTextStyle]}
                                listener={this.logoutButtonPressed.bind(this)}>
                            </BigButton>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}