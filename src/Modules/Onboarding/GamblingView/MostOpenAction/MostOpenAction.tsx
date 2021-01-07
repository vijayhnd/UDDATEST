import React, { Component, ReactInstance } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, FlatList, Share, BackHandler, Alert } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { playTable } from './PlayTable';
import AlertUtil from "../../../../Util/AlertUtil";
import AppConstants from "../../../../Util/Constants";
import RouterBuilder from "../../../../Router";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import AppScreens from "../../../../Util/AppScreens";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import Application from "../../../../Entities/Application";
import ProgressLoader from 'rn-progress-loader';
import { CheckBox } from 'react-native-elements'
import BigButton from "../../../../Components/Button/BigButton";
import { Dialog } from 'react-native-simple-dialogs';
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { UDDAError } from "../../../../Entities";
import { GlobalAppState } from "../../../../ReduxStore";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import moment from 'moment';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'

var update = require('immutability-helper');

const ProfilePageContent = {
    key: 'somethun',
    page_title: 'MOST OPEN ACTION',
}

interface G_MostOpenActionViewProps extends AppValidationComponentProps {
    getProfileRequestStatus?: ServiceRequestStatus
    getProfileResponse?: GetProfileResponse
    getProfileError?: UDDAError
    serviceKey?: string
    listeners?: any
}

interface G_MostOpenActionViewState extends AppValidationComponentState {
    contentInsetBottom?: any
    firstName?: Field
    lastName?: Field
    email?: Field
    mobile?: Field
    showOverlayGameSelectionFlag: boolean,
    DataList: any;
    loader: any;
    checkedBetPrivate: boolean,
    checkedBetPublic: boolean,
    checkedMoneyLinePrivate: boolean,
    checkedMoneyLinePublic: boolean,
    betammount: any,
    amounttowin: any,
    text: any,
    ErrorMessage?: any,
    dialogVisible: boolean,
    valueofMoneylineDialog: any;
    valueofMoneylineDialogShow: any;
    TitleofMoneylineDialog: any;
    focuseAmounttowin: boolean;
    focuseBet: boolean;
    dialogmoreprocess: boolean,
    selectedItem: any;
    selected_Legue_id: any;

    BetDialogueData: any;
    shareDialog: any;
    BetType: any;
    POSTBetAmount: any;
    MessageString: any;
    MessageUrl: any;
    NoData: any;
}


const bottom_initial = 0;

class MostOpenActionView extends AppValidationComponent<G_MostOpenActionViewProps, G_MostOpenActionViewState>
    implements ISubheaderListener, MenuIconListener, LogoIconListener {
    private playtableData: any;
    private serviceRequestInProgress = false;
    private Answer: any
    private NewAnswer: any
    private New: any
    private AnswerShow: any
    private NewAnswerShow: any
    private NewShow: any
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    constructor(props: G_MostOpenActionViewProps) {
        super(props);
        this.state = {
            contentInsetBottom: bottom_initial,
            showOverlayGameSelectionFlag: true,
            DataList: [],
            loader: false,
            checkedBetPrivate: false,
            checkedBetPublic: true,
            checkedMoneyLinePrivate: false,
            checkedMoneyLinePublic: true,
            betammount: '',
            amounttowin: '',
            text: '',
            ErrorMessage: '',
            dialogVisible: false,
            valueofMoneylineDialog: '00.00',
            valueofMoneylineDialogShow: '00.00',
            TitleofMoneylineDialog: 'Amount to Win:',
            focuseAmounttowin: false,
            focuseBet: false,
            dialogmoreprocess: false,
            selectedItem: [],
            selected_Legue_id: '1',
            BetDialogueData: [],
            shareDialog: false,
            BetType: '',
            POSTBetAmount: '',
            MessageString: '',
            MessageUrl: '',
            NoData: ''
        };

    }

    componentDidMount() {
        //AlertUtil.show('Component did mount')
        this.callMethod('1')
        // setTimeout(() => {
        //     this.loadMatches(1)
        // }, AppConstants.ZeroDelay)
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props) {
                RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
                return true; // This will prevent the regular handling of the back button
            }

            return false;
        });
    }




    // ------------------------------------------------ API calling ------------------------------------------

    callMethod(league_id: any) {
        //POST json 
        this.setState({ loader: true }); //For open loader
        var params: any = {
            'league_id': league_id,
        };

        var formData = new FormData();
        for (var k in params) {
            formData.append(k, params[k]);
        }
        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiNew/getMostOpen', {
            method: 'POST',
            headers: {//Header Defination
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken
            },
            body: formData,

        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false }); //For close loader
                console.log('mostopen data' + JSON.stringify(responseJson));
                this.setState({ DataList: responseJson.content });
                if (responseJson.content.length > 0) {
                    this.setState({ NoData: false });
                }
                else {
                    this.setState({ NoData: true });
                }
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                console.log(error);
                this.setState({ loader: false }); //For close loader
                // AlertUtil.show('data' + JSON.stringify(error));
            }) //to catch the errors if any  
    }

    callBetAFriendAPI(selectedArray: any) {
        this.setState({ dialogVisible: false })

        if (this.state.amounttowin != '' || this.state.betammount != '') {

            var bet_odds_type;
            var bet_team_type;
            var bet_type;
            var bet_amount: any;
            var amount_to_win;
            var bet_team_id;
            var wining_rate_favored;
            var wining_rate_underdog;

            if (selectedArray.MasterCalcFlag == "M") {
                bet_odds_type = 1;
            }
            else if (selectedArray.MasterCalcFlag == "T") {
                bet_odds_type = 2;
            }
            else if (selectedArray.MasterCalcFlag == "S") {
                bet_odds_type = 3;
            }


            if (selectedArray.isMoneyLineSelect1 == true || selectedArray.isTotalSelect1 == true || selectedArray.isSpreadSelect1 == true) {
                bet_team_id = selectedArray.MATCH_UPS.away.team_id;
            }
            else if (selectedArray.isMoneyLineSelect2 == true || selectedArray.isTotalSelect2 == true || selectedArray.isSpreadSelect2 == true) {
                bet_team_id = selectedArray.MATCH_UPS.home.team_id;
            }



            if (selectedArray.isMoneyLineSelect1 == true) {
                if (bet_team_type == 'underdog') {
                    wining_rate_favored = 1 + (Math.abs(selectedArray.MONEY_LINE.away.value) / 100);
                    wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.MONEY_LINE.away.value));
                }
                else {
                    wining_rate_favored = 1 + (100 / Math.abs(selectedArray.MONEY_LINE.away.value));
                    wining_rate_underdog = 1 + (Math.abs(selectedArray.MONEY_LINE.away.value) / 100);
                }
                var posneg = Math.sign(selectedArray.MONEY_LINE.away.value)
                if (posneg == -1) {
                    bet_team_type = 'favored';
                }
                else {
                    bet_team_type = 'underdog';
                }

            }
            else if (selectedArray.isMoneyLineSelect2 == true) {
                if (bet_team_type == 'underdog') {
                    wining_rate_favored = 1 + (Math.abs(selectedArray.MONEY_LINE.home.value) / 100);
                    wining_rate_underdog = 1 + (100 / Math.abs(selectedArray.MONEY_LINE.home.value));
                }
                else {
                    wining_rate_favored = 1 + (100 / Math.abs(selectedArray.MONEY_LINE.home.value));
                    wining_rate_underdog = 1 + (Math.abs(selectedArray.MONEY_LINE.home.value) / 100);
                }
                var posneg = Math.sign(selectedArray.MONEY_LINE.home.value)
                if (posneg == -1) {
                    bet_team_type = 'favored';
                }
                else {
                    bet_team_type = 'underdog';
                }

            }
            else if (selectedArray.isTotalSelect1 == true) {
                wining_rate_favored = '';
                wining_rate_underdog = '';
                bet_team_type = 'favored';
            }
            else if (selectedArray.isTotalSelect2 == true) {
                wining_rate_favored = '';
                wining_rate_underdog = '';
                bet_team_type = 'underdog';
            }
            else if (selectedArray.isSpreadSelect1 == true) {
                wining_rate_favored = '';
                wining_rate_underdog = '';
                var posneg = Math.sign(selectedArray.SPREAD.away.value)
                if (posneg == -1) {
                    bet_team_type = 'favored';
                }
                else {
                    bet_team_type = 'underdog';
                }
            }
            else if (selectedArray.isSpreadSelect2 == true) {
                wining_rate_favored = '';
                wining_rate_underdog = '';
                var posneg = Math.sign(selectedArray.SPREAD.home.value)
                if (posneg == -1) {
                    bet_team_type = 'favored';
                }
                else {
                    bet_team_type = 'underdog';
                }
            }

            if (this.state.checkedMoneyLinePublic == true) {
                bet_type = 1
            }
            else if (this.state.checkedMoneyLinePrivate == true) {
                bet_type = 2
            }

            if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {
                amount_to_win = this.state.valueofMoneylineDialog;
                bet_amount = this.state.betammount.split(" ");
                bet_amount = bet_amount[1];

            }
            else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
                bet_amount = this.state.valueofMoneylineDialog;
                amount_to_win = this.state.amounttowin.split(" ");
                amount_to_win = amount_to_win[1];
            }

            var params: any = {
                'event_id': selectedArray.event_id,
                'league_id': selectedArray.league_id,
                'bet_odds_type': bet_odds_type,
                'bet_type': bet_type,
                'bet_amount': bet_amount,
                'amount_to_win': amount_to_win,
                'bet_team_type': bet_team_type,
                'bet_team_id': bet_team_id,
                'wining_rate_favored': wining_rate_favored,
                'wining_rate_underdog': wining_rate_underdog,
                'odds': JSON.stringify(selectedArray.odds),
            };

            console.log(JSON.stringify(params));
            var formData = new FormData();

            for (var k in params) {
                formData.append(k, params[k]);
            }

            fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/place_bet', {
                method: 'POST',
                headers: {//Header Defination
                    'Content-Type': 'multipart/form-data',
                    'authorisation': this.authorisationToken
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ ErrorMessage: responseJson.message })
                    if (this.state.ErrorMessage == 'success') {
                        if (this.state.checkedMoneyLinePrivate == true) {
                            this.setState({ BetType: 'ODDS' });
                            this.setState({ POSTBetAmount: bet_amount });
                            this.shareOption(responseJson);
                        }
                        this.getProfile();
                        //AlertUtil.show('' + this.state.ErrorMessage);
                        this.setState({ betammount: '' });
                        this.setState({ amounttowin: '' });
                        this.setState({ valueofMoneylineDialog: '0.00' });
                    }
                    else {
                        AlertUtil.show('Unsuccesfull :' + this.state.ErrorMessage);
                        this.setState({ betammount: '' });
                        this.setState({ amounttowin: '' });
                        this.setState({ valueofMoneylineDialog: '0.00' });
                    }
                    if (responseJson.message == "Access Expired.") {
                        // AlertUtil.show("Session Expired ! Please login again");
                        console.log("Footer comp ---->"+responseJson.message);
                        LogoutUtill.logoutButtonPressed(this.props);
                       }
                })
                .catch(error => {
                    console.log(error);
                    AlertUtil.show('Something went wrong.. Please try again');
                })
        }
        else {
            AlertUtil.show('Not entered any amount,please try agian');
        }

    }

    private getProfile() {
        //AlertUtil.show('Fetching profile')
        var profileRequest = new GetProfileRequest()
        var serviceAction = new ServiceAction()
        var responseParser = new GetProfileResponseParser()
        this.props.dispatch!(serviceAction.request(ServiceType.User,
            ServiceKeys.GetProfileServiceName,
            profileRequest,
            [this.constructor.name],
            responseParser))
    }

    componentWillReceiveProps(nextProps: G_MostOpenActionViewProps) {
        if (nextProps.listeners!.includes(this.constructor.name)) {
            if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
                switch (nextProps.requestStatus) {
                    case ServiceRequestStatus.FinishedWithSuccess:
                        //AlertUtil.show('Get profile success '+JSON.stringify(nextProps.getProfileResponse))
                        this.serviceRequestInProgress = false
                        var serviceAction = new ServiceAction()
                        nextProps.dispatch!(serviceAction.reset())
                        break
                    case ServiceRequestStatus.FinishedWithError:
                        this.serviceRequestInProgress = false
                        var errorMessage = nextProps.error!.message
                        AlertUtil.show(errorMessage)
                        var serviceAction = new ServiceAction()
                        nextProps.dispatch!(serviceAction.reset())
                        break
                    case ServiceRequestStatus.Started:
                    case ServiceRequestStatus.InProgress:
                        this.serviceRequestInProgress = true
                        //AlertUtil.show('otp verification in progress')
                        break
                }

            }
        }
    }


    // ------------------------------------------------ METHODS ------------------------------------------

    accountNameTapped() {
        // RouterBuilder.replaceRouteTo(AppScreens.ProfileView, this.props)
        this.props.navigation!.navigate(AppScreens.G_ProfileView);
    }

    iconDidTapped() {
        //AlertUtil.show("Icon tapped in dashboard")
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {
        //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
		RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
    }

    availableBalanceTapped() {
    }

    openPlaysTapped() {
        // RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
        // this.props.navigation!.navigate(AppScreens.OpenPlaysView);
    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
        // this.props.navigation!.navigate(AppScreens.CoveredPlaysView);
    }


    cellDidClicked(tag: number, tableViewCellReference: ReactInstance): void {
        //AlertUtil.show('Click in dashboard for component: '+tag)
    }

    handleKeyDown = (e: any, aValue: any, Flag: any, MFlag: any) => {
        if (e.nativeEvent.key == "." || e.nativeEvent.key == "1" || e.nativeEvent.key == "2" || e.nativeEvent.key == "3" || e.nativeEvent.key == "4" || e.nativeEvent.key == "5" || e.nativeEvent.key == "6" || e.nativeEvent.key == "7" || e.nativeEvent.key == "8" || e.nativeEvent.key == "9" || e.nativeEvent.key == "0") {

            if (Flag == "ATW") {
                var ammwin = '';
                var ammwins;
                if (this.state.amounttowin.length == 0) {
                    ammwin = '$ ' + this.state.amounttowin + e.nativeEvent.key;
                    ammwins = ammwin.split(" ");
                    this.reverceendEditing(ammwins[1], aValue, MFlag);
                    this.setState({ amounttowin: ammwin });
                }
                else {
                    ammwin = this.state.amounttowin + e.nativeEvent.key;
                    ammwins = ammwin.split(" ");
                    this.reverceendEditing(ammwins[1], aValue, MFlag);
                    this.setState({ amounttowin: ammwin });
                }

            }
            else if (Flag == "BA") {
                var betamm = '';
                var betamms;
                if (this.state.betammount.length == 0) {
                    betamm = '$ ' + this.state.betammount + e.nativeEvent.key;
                    betamms = betamm.split(" ");
                    this.endEditing(betamms[1], aValue, MFlag);
                    this.setState({ betammount: betamm });
                }
                else {
                    betamm = this.state.betammount + e.nativeEvent.key;
                    betamms = betamm.split(" ");
                    this.endEditing(betamms[1], aValue, MFlag);
                    this.setState({ betammount: betamm });
                }
            }
        }

    }

    handleBackSpace = (Flag: any) => {
        if (Flag == "ATW") {
            this.setState({ amounttowin: '' });
            this.setState({ valueofMoneylineDialog: '0.00' });
            this.setState({ valueofMoneylineDialogShow: '0.00' });
        }
        else if (Flag == "BA") {
            this.setState({ betammount: '' });
            this.setState({ valueofMoneylineDialog: '0.00' });
            this.setState({ valueofMoneylineDialogShow: '0.00' });
        }
    }

    handleFocusAtW = () => {
        this.setState({ focuseAmounttowin: true });
        this.setState({ focuseBet: false });
        this.setState({ TitleofMoneylineDialog: 'Bet Amount:' });
        this.setState({ valueofMoneylineDialog: '0.00' });
        this.setState({ valueofMoneylineDialogShow: '0.00' });
        this.setState({ betammount: '' });
        this.setState({ amounttowin: '' });
    }

    handleFocusBA = () => {
        this.setState({ focuseBet: true });
        this.setState({ focuseAmounttowin: false });
        this.setState({ TitleofMoneylineDialog: 'Amount To Win:' });
        this.setState({ valueofMoneylineDialog: '0.00' });
        this.setState({ valueofMoneylineDialogShow: '0.00' });
        this.setState({ betammount: '' });
        this.setState({ amounttowin: '' });
    }

    getDialogueState(item: any, index1: any, index2: any, index3: any, Flag: any, Arraylength1: any, Arraylength2: any, Arraylength3: any) {
        if (Flag == 'M') {
            if (item.MONEY_LINE.away.value == 0 || item.MONEY_LINE.away.value == '') {
                AlertUtil.show("You can't bet on 0 odds");
            }
            else {
                for (let i = 0; i < Arraylength1; i++) {
                    for (let j = 0; j < Arraylength2; j++) {
                        for (let k = 0; k < Arraylength3; k++) {
                            if (i == index1 && j == index2 && k == index3) {
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = !item.isMoneyLineSelect1;
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                                this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'M';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                            else {
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                                this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'M';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                        }
                    }
                }
                this.setState({ DataList: this.state.DataList });
            }

        }
        else if (Flag == 'T') {
            if (item.TOTAL.away.value == 0 || item.TOTAL.away.value == '') {
                AlertUtil.show("You can't bet on 0 odds");
            }
            else {
                for (let i = 0; i < Arraylength1; i++) {
                    for (let j = 0; j < Arraylength2; j++) {
                        for (let k = 0; k < Arraylength3; k++) {
                            if (i == index1 && j == index2 && k == index3) {
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = !item.isTotalSelect1;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                                this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'T';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                            else {
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                                this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'T';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                        }
                    }
                }
                this.setState({ DataList: this.state.DataList });
            }
        }
        else if (Flag == 'S') {
            if (item.SPREAD.away.value == 0 || item.SPREAD.away.value == '') {
                AlertUtil.show("You can't bet on 0 odds");
            }
            else {
                for (let i = 0; i < Arraylength1; i++) {

                    for (let j = 0; j < Arraylength2; j++) {

                        for (let k = 0; k < Arraylength3; k++) {
                            if (i == index1 && j == index2 && k == index3) {
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = !item.isSpreadSelect1;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                                this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'S';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                            else {
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                                this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'S';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                        }
                    }
                }
                this.setState({ DataList: this.state.DataList });
            }
        }

        // const updatedEmployees = update(this.state.DataList, {
        //   [index1]: {
        //     date_array: {
        //       [index2]: {
        //         game: {
        //           [index3]: { $set: item }
        //         }
        //       }
        //     }
        //   }
        // });
        // // console.log('updated array '+JSON.stringify(this.state.DataList));
        // this.setState({ DataList: updatedEmployees });
    }

    getDialogueState2(item: any, index1: any, index2: any, index3: any, Flag: any, Arraylength1: any, Arraylength2: any, Arraylength3: any) {

        if (Flag == 'M') {
            if (item.MONEY_LINE.home.value == 0 || item.MONEY_LINE.home.value == '') {
                AlertUtil.show("You can't bet on 0 odds");
            }
            else {
                for (let i = 0; i < Arraylength1; i++) {
                    for (let j = 0; j < Arraylength2; j++) {
                        for (let k = 0; k < Arraylength3; k++) {
                            if (i == index1 && j == index2 && k == index3) {
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = !item.isMoneyLineSelect2;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                                this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'M';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                            else {
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                                this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'M';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                        }
                    }
                }
                this.setState({ DataList: this.state.DataList });
            }
        }
        else if (Flag == 'T') {
            if (item.TOTAL.home.value == 0 || item.TOTAL.home.value == '') {
                AlertUtil.show("You can't bet on 0 odds");
            }
            else {
                for (let i = 0; i < Arraylength1; i++) {
                    for (let j = 0; j < Arraylength2; j++) {
                        for (let k = 0; k < Arraylength3; k++) {
                            if (i == index1 && j == index2 && k == index3) {
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = !item.isTotalSelect2;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                                this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'T';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                            else {
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                                this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'T';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                        }
                    }
                }
                this.setState({ DataList: this.state.DataList });
            }
        }
        else if (Flag == 'S') {
            if (item.SPREAD.home.value == 0 || item.SPREAD.home.value == '') {
                AlertUtil.show("You can't bet on 0 odds");
            }
            else {
                for (let i = 0; i < Arraylength1; i++) {

                    for (let j = 0; j < Arraylength2; j++) {

                        for (let k = 0; k < Arraylength3; k++) {
                            if (i == index1 && j == index2 && k == index3) {
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isMoneyLineSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isTotalSelect2 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect1 = false;
                                this.state.DataList[index1].date_array[index2].game[index3].isSpreadSelect2 = !item.isSpreadSelect2;
                                this.state.DataList[index1].date_array[index2].game[index3].isBetaFriendSelect = false;
                                this.state.DataList[index1].date_array[index2].game[index3].MasterCalcFlag = 'S';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                            else {
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isMoneyLineSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isTotalSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect1 = false;
                                this.state.DataList[i].date_array[j].game[k].isSpreadSelect2 = false;
                                this.state.DataList[i].date_array[j].game[k].isBetaFriendSelect = false;
                                this.state.DataList[i].date_array[j].game[k].MasterCalcFlag = 'S';
                                this.setState({ betammount: '' });
                                this.setState({ amounttowin: '' });
                                this.setState({ valueofMoneylineDialog: '0.00' });
                                this.setState({ valueofMoneylineDialogShow: '0.00' });
                                this.setState({ checkedMoneyLinePublic: true });
                                this.setState({ checkedMoneyLinePrivate: false });
                            }
                        }
                    }
                }
                this.setState({ DataList: this.state.DataList });
            }
        }

        // const updatedEmployees = update(this.state.DataList, {
        //   [index1]: {
        //     date_array: {
        //       [index2]: {
        //         game: {
        //           [index3]: { $set: item }
        //         }
        //       }
        //     }
        //   }


        // });
        // // console.log('updated array '+JSON.stringify(this.state.DataList));
        // this.setState({ DataList: updatedEmployees });
    }

    getBetDialogueState(item: any, index: any) {
        item.isBetaFriendSelect = !item.isBetaFriendSelect;
        item.isMoneyLineSelect1 = false;
        item.isMoneyLineSelect2 = false;
        item.isTotalSelect1 = false;
        item.isTotalSelect2 = false;
        item.isSpreadSelect1 = false;
        item.isSpreadSelect2 = false;
        this.setState({ betammount: '' });
        this.setState({ amounttowin: '' });
        this.setState({ valueofMoneylineDialog: '0.00' });
        this.setState({ valueofMoneylineDialogShow: '0.00' });
        const updatedEmployees = update(this.state.DataList, { $splice: [[index, 1, item]] });  // array.splice(start, deleteCount, item1)
        this.setState({ DataList: updatedEmployees });
    }

    BetRadioPublicButton() {
        if (this.state.checkedBetPublic == true) {
            this.setState({ checkedBetPublic: false })
            this.setState({ checkedBetPrivate: false })
        }
        else {
            this.setState({ checkedBetPublic: true })
            this.setState({ checkedBetPrivate: false })
        }

    }

    BetRadioPrivateButton() {
        if (this.state.checkedBetPrivate == true) {
            this.setState({ checkedBetPrivate: false })
            this.setState({ checkedBetPublic: false })
        }
        else {
            this.setState({ checkedBetPrivate: true })
            this.setState({ checkedBetPublic: false })
        }
    }

    MoneyLineRadioPublicButton() {
        if (this.state.checkedMoneyLinePublic == true) {
            this.setState({ checkedMoneyLinePublic: false })
            this.setState({ checkedMoneyLinePrivate: false })
        }
        else {
            this.setState({ checkedMoneyLinePublic: true })
            this.setState({ checkedMoneyLinePrivate: false })
        }

    }

    MoneyLineRadioPrivateButton() {
        if (this.state.checkedMoneyLinePrivate == true) {
            this.setState({ checkedMoneyLinePrivate: false })
            this.setState({ checkedMoneyLinePublic: false })
        }
        else {
            this.setState({ checkedMoneyLinePrivate: true })
            this.setState({ checkedMoneyLinePublic: false })
        }
    }

    DialogClose(item: any, index1: any, index2: any, ) {
        // AlertUtil.show(JSON.stringify(item));
        item.isBetaFriendSelect = false;
        item.isMoneyLineSelect1 = false;
        item.isMoneyLineSelect2 = false;
        item.isTotalSelect1 = false;
        item.isTotalSelect2 = false;
        item.isSpreadSelect1 = false;
        item.isSpreadSelect2 = false;
        this.setState({ betammount: '' });
        this.setState({ amounttowin: '' });
        this.setState({ valueofMoneylineDialog: '0.00' });
        this.setState({ valueofMoneylineDialogShow: '0.00' });

        var index3 = item.index;
        const updatedEmployees = update(this.state.DataList, {
            [index1]: {
                date_array: {
                    [index2]: {
                        game: {
                            [index3]: { $set: item }
                        }
                    }
                }
            }


        });
        this.setState({ DataList: updatedEmployees });

    }

    endEditing(value: any, MoneyLineValue: any, MFlag: any) {
        if (MFlag == 'M') {
            var posneg = Math.sign(MoneyLineValue)
            if (posneg == -1) {
                this.Answer = 1 + (100 / Math.abs(MoneyLineValue));
                this.AnswerShow = (100 / Math.abs(MoneyLineValue));
            }
            else {
                this.Answer = 1 + (MoneyLineValue / 100);
                this.AnswerShow = (MoneyLineValue / 100);
            }
            this.NewAnswer = (value * (this.Answer))
            this.NewAnswerShow = (value * (this.AnswerShow))
        }
        // else if (MFlag == 'P') {
        //   if (this.state.selectedPropBetOptions == 'N') {
        //     AlertUtil.show("Please Select Odds.");
        //   }
        //   else {
        //     var posneg = Math.sign(MoneyLineValue)
        //     if (posneg == -1) {
        //       this.Answer = 1 + (100 / Math.abs(MoneyLineValue));
        //       this.AnswerShow = (100 / Math.abs(MoneyLineValue));
        //     }
        //     else {
        //       this.Answer = 1 + (MoneyLineValue / 100);
        //       this.AnswerShow = (MoneyLineValue / 100);
        //     }
        //     this.NewAnswer = (value * (this.Answer))
        //     this.NewAnswerShow = (value * (this.AnswerShow))
        //   }

        // }

        else {
            this.NewAnswer = (value * 2) //remove as per document on 14-06-2019 (for spread and total logic)
            this.NewAnswerShow = (value);
        }
        this.NewShow = parseFloat(this.NewAnswerShow).toFixed(2);
        this.setState({ valueofMoneylineDialogShow: this.NewShow });
        this.New = parseFloat(this.NewAnswer).toFixed(2);
        this.setState({ valueofMoneylineDialog: this.New });
        this.setState({ TitleofMoneylineDialog: 'Amount to Win:' });
    }

    reverceendEditing(value: any, MoneyLineValue: any, MFlag: any) {
        if (MFlag == 'M') {
            var posneg = Math.sign(MoneyLineValue)
            if (posneg == -1) {
                this.Answer = (value * Math.abs(MoneyLineValue)) / 100;
                this.AnswerShow = (value * Math.abs(MoneyLineValue)) / 100;
            }
            else {
                this.Answer = (value / MoneyLineValue) * 100;
                this.AnswerShow = (value / MoneyLineValue) * 100;
            }
            this.NewAnswer = (this.Answer);
            this.NewAnswerShow = (this.AnswerShow);
        }
        else {
            this.NewAnswer = (value);
            this.NewAnswerShow = (value);
        }

        this.New = parseFloat(this.NewAnswer).toFixed(2);
        this.setState({ valueofMoneylineDialog: this.New });

        this.NewShow = parseFloat(this.NewAnswerShow).toFixed(2);
        this.setState({ valueofMoneylineDialogShow: this.NewShow });

    }

    // showDialog(isShow: any, item: any) {
    //     this.setState({ dialogVisible: isShow });
    //     this.setState({ selectedItem: item });
    // }
    showDialog(isShow: any, item: any) {
        // AlertUtil.show(JSON.stringify(this.state.valueofMoneylineDialog))
        if (this.state.valueofMoneylineDialog > 0) {
            this.setState({ dialogVisible: isShow });
            this.setState({ selectedItem: item });
        }
        else {
            AlertUtil.show("Please Enter Valid Bet Amount.")
        }

    }


    showMoreDialog(isShow: any) {
        this.setState({ dialogmoreprocess: isShow });
        this.setState({ BetDialogueData: '' });
        //AlertUtil.show(JSON.stringify(this.state.BetDialogueData));
    }

    shareOption(item: any) {
        console.log('fgh ' + JSON.stringify(item));
        //  fgh {"error":0,"version":"1.0","message":"success","data":
        //  {"bet_id":156,"encryptor_bet_id":"ZTQ1MUF0N2lkT05VVXJjMk1RdWNkZz09"}}


        var MessageString: any;
        var oddsString: any;
        var teamName: any;
        var url: any;
        var selectedData: any;
        if (this.state.BetType == 'ODDS') {
            selectedData = this.state.selectedItem;
        }

        console.log('gvbg ' + JSON.stringify(selectedData));
        var amount: any;
        if (selectedData.isBetaFriendSelect == false || this.state.BetType == 'ODDS') {

            if (selectedData.MasterCalcFlag == 'M') {
                oddsString = "Money Line";
            }
            else if (selectedData.MasterCalcFlag == 'T') {
                oddsString = "Total";
            }
            else {
                oddsString = "Spread";
            }
            if (selectedData.isMoneyLineSelect1 == true || selectedData.isTotalSelect1 == true || selectedData.isSpreadSelect1 == true) {
                teamName = selectedData.MATCH_UPS.away.title
                if (selectedData.isMoneyLineSelect1 == true) {
                    amount = selectedData.MONEY_LINE.away.value;
                }
                else if (selectedData.isTotalSelect1 == true) {
                    amount = selectedData.TOTAL.away.value;
                }
                else {
                    amount = selectedData.SPREAD.away.value;
                }
            } else {
                teamName = selectedData.MATCH_UPS.home.title;
                if (selectedData.isMoneyLineSelect2 == true) {
                    amount = selectedData.MONEY_LINE.home.value;
                }
                else if (selectedData.isTotalSelect2 == true) {
                    amount = selectedData.TOTAL.home.value;
                }
                else {
                    amount = selectedData.SPREAD.home.value;
                }
            }

            url = "http://ios-deeplink.cloudaccess.host/d-l-v1.php?t=oddsbet&i=" + item.data.encryptor_bet_id;
            MessageString = "I just place a $" + this.state.POSTBetAmount + " bet in the line " +
                oddsString + " for the team " + teamName + ". Accept the challenge and try to outrank me!. ";
            this.setState({ MessageString: MessageString });
            this.setState({ MessageUrl: url });
            console.log(JSON.stringify(this.state.MessageString));
            this.setState({ shareDialog: true });
        }
        // else {
        //   // Props - 
        //   url = "http://ios-deeplink.cloudaccess.host/d-l-v1.php?t=propsbet&i=" + item.data.encryptor_bet_id;

        //   MessageString = selectedData.question + " I just placed a $" + this.state.POSTBetAmount + " bet on this. Would you accept the Bet? " + url;
        //   // AlertUtil.show(JSON.stringify(MessageString));

        //   this.setState({MessageString:MessageString});
        //   console.log(JSON.stringify(this.state.MessageString));
        //   this.setState({ shareDialog: true });
        // }


    }

    shareNow() {
        var Message = this.state.MessageString + " " + this.state.MessageUrl;
        Share.share({
            message: Message,
        })//after successful share return result
            .then(result => {
                this.setState({ shareDialog: false });
                console.log(result)
            })
            //If any thing goes wrong it comes here
            .catch(errorMsg => {
                this.setState({ shareDialog: false });
                console.log(errorMsg)
            });
    }
    // ------------------------------------------------ Design and Design Methods ------------------------------------------

    getBetAFriendDialogue(games: any, index1: any, index2: any, ) {

        var SelectedGameContent = [];
        SelectedGameContent = games;
        //    AlertUtil.show(JSON.stringify(SelectedGameContent));
        let data = [{
            value: 'Select a prop bet question',
        }, {
            value: 'C.J. Anderson rushing 80 yds',
        }];

        return (
            <View>
                <View style={{ height: 0, width: 0, borderLeftWidth: 12, borderLeftColor: 'transparent', borderRightWidth: 12, borderRightColor: 'transparent', borderBottomWidth: 24, borderBottomColor: 'white', marginTop: "-3%", marginLeft: '87%', backgroundColor: 'transparent' }}></View>

                <View style={{ backgroundColor: 'white', marginLeft: 8, marginRight: 8, marginBottom: 8, borderRadius: 5 }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '48%', alignItems: 'center', }}>
                            <CheckBox
                                title='PUBLIC BET'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checkedBetPublic}
                                checkedColor='#999999'
                                size={20}
                                textStyle={{ fontFamily: 'Montserrat-Bold', fontSize: hp(1.8), padding: 0, marginLeft: 1 }}
                                containerStyle={{ backgroundColor: 'white', padding: 5, marginLeft: 3, alignSelf: 'flex-start' }}
                                onPress={() => { this.BetRadioPublicButton() }}
                            />
                            <View style={{ alignSelf: 'flex-start', position: 'absolute', right: 35, top: 12, backgroundColor: '#15c3c3', padding: hp(0.1), height: hp(1.4), width: hp(1.4), borderRadius: hp(1) }}>
                                <Text style={[styles.titleStyle, { fontSize: hp(1), color: 'white', fontFamily: 'Montserrat-Bold' }]}>i</Text>
                            </View>
                        </View>

                        <View style={{ width: '48%', alignItems: 'center' }}>
                            <CheckBox
                                title='PRIVATE BET'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checkedBetPrivate}
                                checkedColor='#999999'
                                size={20}
                                textStyle={{ fontFamily: 'Montserrat-Bold', fontSize: hp(1.8), padding: 0, marginLeft: 1 }}
                                containerStyle={{ backgroundColor: 'white', padding: 5, marginLeft: 3, alignSelf: 'flex-start' }}
                                onPress={() => { this.BetRadioPrivateButton() }}
                            />
                            <View style={{ alignSelf: 'flex-start', position: 'absolute', right: 29, top: 12, backgroundColor: '#15c3c3', padding: hp(0.1), height: hp(1.4), width: hp(1.4), borderRadius: hp(1) }}>
                                <Text style={[styles.titleStyle, { fontSize: hp(1), color: 'white', fontFamily: 'Montserrat-Bold' }]}>i</Text>
                            </View>
                        </View>
                        {/* this.DialogClose() */}
                        <TouchableWithoutFeedback onPress={() => this.DialogClose(games, index1, index2)}>
                            <View style={{ width: '4%', marginTop: 5 }}>
                                <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10 }} ></Image>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

                    <View style={{ backgroundColor: '#dddddd', borderColor: '#dddddd', borderWidth: 5, borderRadius: 3, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', borderColor: '#dddddd', borderWidth: 1, borderRadius: 3 }}>
                            <View style={{ width: '60%', borderRightColor: '#dddddd', borderRightWidth: 1, }}>
                                <View style={{ backgroundColor: 'white', borderBottomStartRadius: 5, borderTopStartRadius: 5 }}>
                                    <Dropdown
                                        containerStyle={{ paddingLeft: 8, margin: 0, borderBottomWidth: 0, justifyContent: "center", paddingBottom: 0 }}
                                        dropdownOffset={{ top: 0, left: 0 }}
                                        dropdownMargins={{ min: 0, max: 0 }}
                                        dropdownPosition={-4.2}
                                        itemTextStyle={{ paddingLeft: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.6), color: '#333333', margin: 0, paddingBottom: 0 }}
                                        data={data}
                                        fontSize={hp(1.6)}
                                        value={'Select a prop bet question'}
                                    />
                                    {/* <Text >Write in your custom bet.</Text> */}
                                </View>
                            </View>
                            <View style={{ width: '40%' }}>
                                <View style={{ backgroundColor: '#f9f9f9', borderBottomEndRadius: 5, borderTopRightRadius: 5 }}>
                                    <TextInput
                                        value={this.state.betammount}
                                        style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.6), justifyContent: "center" }}
                                        placeholder='Answer'
                                        placeholderTextColor={'#999999'}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', borderColor: '#dddddd', borderWidth: 1, borderRadius: 5 }}>
                            <View style={{ width: '60%', borderRightColor: '#dddddd', borderRightWidth: 1 }}>
                                <View style={{ backgroundColor: 'white', borderBottomStartRadius: 5, borderTopStartRadius: 5 }}>
                                    <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.6), color: '#333333' }}>Write in your custom bet.</Text>
                                </View>
                            </View>
                            <View style={{ width: '40%' }}>
                                <View style={{ backgroundColor: '#f9f9f9', borderBottomEndRadius: 5, borderTopRightRadius: 5 }}>
                                    <TextInput
                                        value={this.state.betammount}
                                        style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.6) }}
                                        placeholder='Answer'
                                        placeholderTextColor={'#999999'}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>

                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 3 }}>
                            <View style={{ flexDirection: 'column', width: '50%' }}>
                                <View style={{ marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 2 }}>
                                    <TouchableOpacity onPress={() => { this.showMoreDialog(true) }}>
                                        <View style={{ backgroundColor: '#dddddd', borderColor: '#cccccc', borderWidth: 2, borderRadius: 5 }}>
                                            <Text style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), color: '#68bcbc' }}>See full list of prop bets.</Text>
                                        </View>
                                    </TouchableOpacity>


                                </View>


                                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderColor: '#666666', borderRadius: 5, borderWidth: 2, marginLeft: 5, marginBottom: 5, marginRight: 5, marginTop: 1, paddingTop: 6, paddingBottom: 6 }}>

                                    <TextInput
                                        value={this.state.amounttowin}
                                        keyboardType='default'
                                        style={{ padding: 8, fontFamily: 'Montserrat-Semibold', fontSize: hp(1.6), width: '92%', }}
                                        placeholder='$ Enter bet amount'
                                        placeholderTextColor={'black'}
                                    // onChangeText={(text) => this.onTextChange(text, this.props.tag!)}
                                    // value={this.state.text}
                                    />


                                    <Image source={require('../../../../images/close_icon.png')} style={{ height: 12, width: 12, marginTop: 9, position: 'absolute', left: -2 }}></Image>

                                </View>
                            </View>
                            <View style={{ width: '50%' }}>
                                {/* this.showDialog(true,games) */}
                                <TouchableOpacity onPress={() => { '' }}>
                                    <View style={{ backgroundColor: '#68bcbc', margin: 5, padding: 4, justifyContent: "center", alignItems: 'center', borderRadius: 2 }}>
                                        <Text style={{ paddingTop: 3, fontFamily: 'Montserrat-Bold', fontSize: hp(2.9), color: 'white' }} >PLACE BET</Text>
                                        {/* <Text style={{ paddingTop: 3, fontFamily: 'Montserrat-Bold', fontSize: hp(2.9), color: '#a21310' }} >PLACE BET</Text> */}
                                        <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.8), color: 'black' }} > Amount to Win:</Text>
                                        <Text style={{ padding: 1, fontFamily: 'Montserrat-Bold', fontSize: hp(2.3), color: 'black' }} >${this.state.valueofMoneylineDialogShow}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    getDialogue(GamesArray: any, index1: any, index2: any, value: any, title: any) {
        // AlertUtil.show(JSON.stringify(GamesArray));
        return (
            <View style={{ backgroundColor: '#999999' }}>


                <View style={[{ marginLeft: GamesArray.MasterCalcFlag == 'M' ? '47%' : GamesArray.MasterCalcFlag == 'T' ? '70%' : '88%' }, styles.dialog_triangle]}></View>
                <View style={styles.dialog_container}>
                    {/* --------------------- dialog checkbox  ---------------- */}

                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '47%', flexDirection: 'row' }}>
                            <CheckBox
                                title='PUBLIC BET'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checkedMoneyLinePublic}
                                checkedColor='#999999'
                                size={20}
                                textStyle={styles.dialog_chackbox_text_style}
                                containerStyle={styles.dialog_chackbox_container}
                                onPress={() => { this.MoneyLineRadioPublicButton() }}
                            />
                            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 12, marginLeft: 1 }}>
                                <View style={[styles.dialog_chackbox_info_container]}>
                                    <Text style={[styles.titleStyle, styles.dialog_chackbox_info_text_style]}>i</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: '47%', flexDirection: 'row' }}>
                            <CheckBox
                                title='PRIVATE BET'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.checkedMoneyLinePrivate}
                                checkedColor='#999999'
                                size={20}
                                textStyle={styles.dialog_chackbox_text_style}
                                containerStyle={styles.dialog_chackbox_container}
                                onPress={() => { this.MoneyLineRadioPrivateButton() }}
                            />
                            <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 12, marginLeft: 1 }}>
                                <View style={[styles.dialog_chackbox_info_container]}>
                                    <Text style={[styles.titleStyle, styles.dialog_chackbox_info_text_style]}>i</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableWithoutFeedback onPress={() => this.DialogClose(GamesArray, index1, index2)}>
                            <View style={{ width: '4%', marginTop: 5 }}>
                                <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10 }}></Image>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

                    {/* --------------------- dialog middle text  ---------------- */}

                    <View style={styles.dialogue_text_label_container}>
                        <Text style={styles.dialogue_main_text_label}> You are betting <Text style={styles.dialogue_sub_text_label}>
                            {GamesArray.MasterCalcFlag == 'M' || GamesArray.MasterCalcFlag == 'S' ? (value > 0 ? '+' : '-') : ''}{Math.abs(value)}</Text> under <Text style={styles.dialogue_sub_text_label}>
                                {GamesArray.MasterCalcFlag == 'M' ? "Money Line" : GamesArray.MasterCalcFlag == 'T' ? 'Total' : 'Spread'}
                                {GamesArray.isTotalSelect1 == true ? " (Over)" : GamesArray.isTotalSelect2 == true ? " (Under)" : null}</Text> for <Text style={styles.dialogue_sub_text_label}>{title}</Text> . </Text>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 3 }}>

                            {/* --------------------- dialog text input column  ---------------- */}

                            <View style={{ flexDirection: 'column', width: '50%' }}>
                                <View style={styles.dialog_text_input_container}>
                                    <TextInput
                                        value={this.state.betammount}
                                        onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("BA") : this.handleKeyDown(e, value, "BA", GamesArray.MasterCalcFlag) }}
                                        onFocus={this.handleFocusBA}
                                        clearTextOnFocus={true}
                                        keyboardType='default'
                                        returnKeyType='done'
                                        style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '80%', paddingVertical: 2 }}
                                        placeholder='$ Enter Bet Amount'
                                        placeholderTextColor={this.state.focuseBet ? 'black' : '#a6a6a6'}
                                    />
                                    <Image source={require('../../../../images/light_close.png')} style={[{ right: 2 }, styles.dialog_text_close_img]}></Image>
                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={[{ marginBottom: 8 }, styles.dialog_or_text]}>  __ </Text>
                                    <Text style={styles.dialog_or_text}>  OR </Text>
                                    <Text style={[{ marginBottom: 8 }, styles.dialog_or_text]}>  __ </Text>
                                </View>

                                <View style={styles.dialog_text_input_container}>
                                    <TextInput
                                        value={this.state.amounttowin}
                                        onKeyPress={(e: any) => { e.nativeEvent.key == "Backspace" ? this.handleBackSpace("ATW") : this.handleKeyDown(e, value, "ATW", GamesArray.MasterCalcFlag) }}
                                        onFocus={this.handleFocusAtW}
                                        clearTextOnFocus={true}
                                        keyboardType='default'
                                        returnKeyType='done'
                                        style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '92%', paddingVertical: 2 }}
                                        placeholder='$ Enter Amount to Win'
                                        placeholderTextColor={this.state.focuseAmounttowin ? 'black' : '#a6a6a6'}
                                    />
                                    <Image source={require('../../../../images/close_icon.png')} style={[{ right: 2 }, styles.dialog_text_close_img]}></Image>
                                </View>
                            </View>

                            {/* --------------------- dialog place bet column  ---------------- */}

                            <View style={{ width: '50%' }}>
                                <TouchableOpacity onPress={() => { this.showDialog(true, GamesArray) }}>
                                    <View style={styles.dialog_place_bet_container}>
                                        <Text style={{ paddingTop: 3, fontFamily: 'Montserrat-Bold', fontSize: hp(2.9), color: 'white' }} >
                                            {/* <Text style={{ paddingTop: 3, fontFamily: 'Montserrat-Bold', fontSize: hp(2.9), color: '#a21310' }} > */}
                                            PLACE BET
                    </Text>
                                        <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.8), color: 'black' }} >
                                            {this.state.TitleofMoneylineDialog}
                                        </Text>
                                        <Text style={{ padding: 1, fontFamily: 'Montserrat-Bold', fontSize: hp(2.3), color: 'black', alignSelf: 'center' }} >
                                            ${this.state.valueofMoneylineDialogShow}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    render() {
        if (this.state.NoData == false) {

            return (
                <Container
                    title={ProfilePageContent.page_title}
                    isHeader={true}
                    isSubHeader={true}
                    isTitle={true}
                    showIndicator={false}
                    menuIconListener={this}
                    isSetting={false}
                    LogoIconListener={this}
                    accountNameListener={this}
                    availableBalanceListener={this}
                    coveredPlaysListener={this}
                    openPlaysListener={this} >




                    <ProgressLoader
                        visible={this.state.loader}
                        isModal={true} isHUD={true}
                        hudColor={"#68bcbc"}
                        color={"#FFFFFF"} />

                    {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
                    <Dialog
                        visible={this.state.dialogVisible}
                        title=""
                        onTouchOutside={() => this.setState({ dialogVisible: false })} >
                        <View style={{ backgroundColor: "white", padding: 10 }}>
                            <TouchableOpacity onPress={() => { this.setState({ dialogVisible: false }) }}>
                                <View style={{ alignItems: 'flex-end', width: '100%' }}>
                                    <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                                </View>
                            </TouchableOpacity>

                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} >

                                <Text style={{ padding: 1, fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: hp(2.2), color: 'black' }} > Are you sure you want to place this bet?</Text>
                                <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}

                                    listener={() => { this.callBetAFriendAPI(this.state.selectedItem) }} />
                            </View>
                        </View>
                    </Dialog>

                    {/* -------------------------------- Share Dialogue --------------------------------*/}
                    <Dialog
                        visible={this.state.shareDialog}
                        title=""
                        onTouchOutside={() => this.setState({ shareDialog: false })} >



                        <View style={{ backgroundColor: "white" }}>


                            <View style={{ alignItems: 'flex-end', position: "absolute", right: 8, top: 10 }}>
                                <TouchableWithoutFeedback onPress={() => { this.setState({ shareDialog: false }) }}>
                                    <Image source={require('../../../../images/close.png')} style={{ height: 13, width: 13 }}></Image>
                                </TouchableWithoutFeedback>
                            </View>


                            <View style={{ justifyContent: "center" }} >
                                <Text style={{ padding: 8, fontFamily: 'Montserrat-semibold', alignSelf: 'center', textAlign: "center", fontSize: hp(2.2), color: '#68bcbc' }}>
                                    Share Bet
                  </Text>

                                <View style={{ width: '100%', backgroundColor: '#cccccc', height: 1, marginTop: 1, padding: 0 }}></View>

                                <View style={{ justifyContent: "center", padding: 10 }}>

                                    <Text style={{ padding: 1, fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.7), marginTop: 3, color: 'black' }}>Messege</Text>

                                    <View style={{ padding: 1, borderColor: '#cccccc', borderWidth: 1, marginTop: 5, }}>
                                        <TextInput
                                            //value={this.state.MessageString}
                                            onChangeText={(text) => this.setState({ MessageString: text })}
                                            style={{ padding: 8, fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), width: '100%', height: 'auto' }}
                                            multiline={true}
                                        />
                                    </View>
                                    <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.5), marginTop: 5, color: 'black' }}>
                                        {this.state.MessageUrl}
                                    </Text>
                                    <BigButton title="Share Now" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                                        listener={() => {
                                            this.shareNow()
                                        }} />
                                </View>
                            </View>
                        </View>
                    </Dialog>
                    <View style={styles.scrollContent} >
                        <View style={styles.mainContent}>
                            <View style={{ flex: 1 }}>
                                <View style={{ backgroundColor: 'white', height: '100%' }}>
                                    {/* <OpenActionTableComponent playTable={this.playtableData} cellListener={this} /> */}
                                    <View style={styles.titleContainer} >
                                        {/* {titlesView} */}
                                        {/* --------------------- table titles  ---------------- */}
                                        <View style={styles.table_titles_container}>
                                            <Text style={[styles.titleStyle, { width: '36%', justifyContent: 'center', alignItems: 'center' }]}>
                                                MATCH UPS
                                            </Text>

                                            <View style={[{ width: '28%' }, styles.table_title_row_container]}>
                                                <Text style={[styles.titleStyle]}>MONEY LINE </Text>
                                                <View style={styles.table_title_info_container}>
                                                    <Text style={styles.table_title_info_text}> i </Text>
                                                </View>
                                            </View>

                                            <View style={[{ width: '18%' }, styles.table_title_row_container]}>
                                                <Text style={[styles.titleStyle]}>TOTAL </Text>
                                                <View style={styles.table_title_info_container}>
                                                    <Text style={styles.table_title_info_text}> i </Text>
                                                </View>
                                            </View>

                                            <View style={[{ width: '18%' }, styles.table_title_row_container]}>
                                                <Text style={[styles.titleStyle]}>SPREAD </Text>
                                                <View style={styles.table_title_info_container}>
                                                    <Text style={styles.table_title_info_text}> i </Text>
                                                </View>
                                            </View>



                                        </View>
                                    </View>

                                    {/* --------------------- Flatlist ---------------- */}


                                    {/* <KeyboardAwareScrollView
                                        scrollEnabled={true}
                                        enableResetScrollToCoords={true}
                                        resetScrollToCoords={{ x: 0, y: 0 }}
                                        automaticallyAdjustContentInsets={false}
                                        contentInset={{ top: 0, bottom: 0 }}
                                        keyboardShouldPersistTaps='handled'
                                        bounces={false}
                                        contentContainerStyle={{ flex: 1 }}
                                        extraHeight={1}
                                        behavior='padding'> */}
                                    <FlatList
                                        key={this.state.DataList.length}
                                        extraData={this.state}
                                        data={this.state.DataList}
                                        bounces={false}
                                        keyExtractor={(item: any, index: any) => index.toString()}
                                        //showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }: any) => {
                                            var gameImage;
                                            if (item.league_id == 1) {
                                                gameImage = require('../../../../images/football_icon.png')
                                            }
                                            else if (item.league_id == 5) {
                                                gameImage = require('../../../../images/baseball.png')
                                            }
                                            else {
                                                gameImage = require('../../../../images/basketball.png')
                                            }
                                            var index1 = index;
                                            var Arraylength1 = this.state.DataList.length;
                                            return (
                                                <View style={{ backgroundColor: '#DDDDDD', flex: 1 }}>
                                                    {/* --------------------- game haeder---------------- */}

                                                    <View style={styles.gameheader}>
                                                        <View style={{ paddingLeft: 8, paddingRight: 8 }}>
                                                            <Image source={gameImage} style={{ height: 16, width: 16 }}></Image>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.gameheadertext}>{item.gameName} - <Text style={styles.gameheader_sub_text}>{item.gameShortDec}</Text></Text>
                                                        </View>
                                                    </View>

                                                    {/* --------------------- Date and game status---------------- */}

                                                    <FlatList
                                                        key={item.date_array.length}
                                                        extraData={this.state}
                                                        data={item.date_array}
                                                        bounces={false}
                                                        keyExtractor={(item: any, index) => index.toString()}
                                                        //showsVerticalScrollIndicator={false}
                                                        renderItem={({ item, index }: any) => {
                                                            var index2 = index;
                                                            var Arraylength2 = this.state.DataList[index1].date_array.length;
                                                            var day = item.date.split(' ');
                                                            var currentTimeStamp = Math.floor(Date.now()); //Get Timestamp in Milliseconds 
                                                            // var currentTimeStamp =  Math.floor(Date.now() / 1000); //Get Timestamp in Seconds

                                                            var new_time_stamp = item.match_time_stamp * 1000;
                                                            var formated_time = moment(new_time_stamp).format('LT');
                                                            var Match_date: any = new Date(new_time_stamp).toString().split(' ');

                                                            var zonevalue: any = Match_date[6].toString();
                                                            var zone: any = zonevalue.substr(1, zonevalue.length - 2);

                                                            return (
                                                                <View>
                                                                    <View style={styles.flatlist_title_row}>

                                                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '55%', paddingLeft: 4 }}>
                                                                            <Text style={[styles.flatlist_title, { textAlign: 'left' }]}> {Match_date[0]} <Text style={{ fontFamily: 'Montserrat-Regular' }}>{Match_date[1]} {Match_date[2]} {formated_time} {zone}</Text> </Text>
                                                                        </View>

                                                                        <View style={{ alignItems: 'center', width: '45%', paddingRight: 4 }}>
                                                                            <Text style={[styles.flatlist_sub_title, { fontFamily: 'Montserrat-Bold', textAlign: 'right' }]}>
                                                                                Game Countdown:
                                                                   <Text style={{ fontFamily: 'Montserrat-Semibold', color: 'black', fontSize: hp(1.4) }}>{item.gameTime}</Text>
                                                                            </Text>
                                                                        </View>

                                                                    </View>


                                                                    <FlatList
                                                                        key={item.game.length}
                                                                        extraData={this.state}
                                                                        data={item.game}
                                                                        bounces={false}
                                                                        keyExtractor={(item: any, index) => index.toString()}
                                                                        //showsVerticalScrollIndicator={false}
                                                                        renderItem={({ item, index }: any) => {
                                                                            var index3 = index;
                                                                            var Arraylength3 = this.state.DataList[index1].date_array[index2].game.length;
                                                                            {/* --------------------- table row ---------------- */ }
                                                                            return (
                                                                                <View style={{ width: '100%', height: 60, alignItems: 'center' }}>

                                                                                    <View style={styles.flatlist_data_whole_row}>

                                                                                        <View style={styles.flatlist_data_row_vertical_line}></View>

                                                                                        <View style={styles.flatlist_data_4column}>
                                                                                            {/* --------------------- first row ---------------- */}
                                                                                            <View style={[styles.flatlist_data_row_height, { borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1 }]}>

                                                                                                <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                                                                                    <Text style={styles.flatlist_matchup_text_style} numberOfLines={1} ellipsizeMode={"tail"} >
                                                                                                        {item.MATCH_UPS.away.title}
                                                                                                    </Text>
                                                                                                </View>

                                                                                                <TouchableWithoutFeedback onPress={() => this.getDialogueState(item, index1, index2, index3, 'M', Arraylength1, Arraylength2, Arraylength3)}>
                                                                                                    <View style={[{
                                                                                                        backgroundColor: '#68bcbc',
                                                                                                        borderRightColor: 'white',
                                                                                                        borderRightWidth: 1,
                                                                                                    }, styles.flatlist_moneyline_style]}>
                                                                                                        <Text style={[{ color: 'white' }, styles.flatlist_data_text]}>
                                                                                                            {item.MONEY_LINE.away.value > 0 ? '+' : ''}{item.MONEY_LINE.away.value}
                                                                                                        </Text>
                                                                                                    </View>

                                                                                                </TouchableWithoutFeedback >

                                                                                                <TouchableWithoutFeedback onPress={() => this.getDialogueState(item, index1, index2, index3, 'T', Arraylength1, Arraylength2, Arraylength3)}>
                                                                                                    <View style={[{
                                                                                                        backgroundColor: '#68bcbc',
                                                                                                        borderRightColor: 'white',
                                                                                                        borderRightWidth: 1
                                                                                                    }, styles.flatlist_total_style]}>
                                                                                                        <Text style={[{ color: 'white' }, styles.flatlist_data_text]}>
                                                                                                            {item.TOTAL.away.value > 0 ? 'O' : ''} {item.TOTAL.away.value}
                                                                                                        </Text>
                                                                                                    </View>
                                                                                                </TouchableWithoutFeedback >

                                                                                                <TouchableWithoutFeedback onPress={() => this.getDialogueState(item, index1, index2, index3, 'S', Arraylength1, Arraylength2, Arraylength3)}>
                                                                                                    <View style={[{
                                                                                                        backgroundColor: '#68bcbc',
                                                                                                    }, styles.flatlist_spread_style]}>
                                                                                                        <Text style={[{ color: 'white' }, styles.flatlist_data_text]}>
                                                                                                            {Math.sign(item.SPREAD.away.value) == +1 ? '+' : ''}{item.SPREAD.away.value}
                                                                                                        </Text>
                                                                                                    </View>
                                                                                                </TouchableWithoutFeedback >

                                                                                            </View>
                                                                                            {/* --------------------- second row ---------------- */}

                                                                                            <View style={[styles.flatlist_data_row_height, { borderBottomColor: 'white', borderBottomWidth: 1 }]}>
                                                                                                <View style={[{ borderRightColor: 'white', borderRightWidth: 1 }, styles.flatlist_matchup_style]}>
                                                                                                    <Text style={styles.flatlist_matchup_text_style} numberOfLines={1} ellipsizeMode={"tail"} >
                                                                                                        {item.MATCH_UPS.home.title}
                                                                                                    </Text>
                                                                                                </View>

                                                                                                <TouchableWithoutFeedback onPress={() => this.getDialogueState2(item, index1, index2, index3, 'M', Arraylength1, Arraylength2, Arraylength3)}>
                                                                                                    <View style={[{
                                                                                                        backgroundColor: '#68bcbc',
                                                                                                        borderRightColor: 'white',
                                                                                                        borderRightWidth: 1,
                                                                                                    }, styles.flatlist_moneyline_style]}>
                                                                                                        <Text style={[{ color: 'white' }, styles.flatlist_data_text]}>
                                                                                                            {item.MONEY_LINE.home.value > 0 ? '+' : ''}{item.MONEY_LINE.home.value}
                                                                                                        </Text>
                                                                                                    </View>

                                                                                                </TouchableWithoutFeedback >

                                                                                                <TouchableWithoutFeedback onPress={() => this.getDialogueState2(item, index1, index2, index3, 'T', Arraylength1, Arraylength2, Arraylength3)}>
                                                                                                    <View style={[{
                                                                                                        backgroundColor: '#68bcbc',
                                                                                                        borderRightColor: 'white',
                                                                                                        borderRightWidth: 1
                                                                                                    }, styles.flatlist_total_style]}>
                                                                                                        <Text style={[{ color: 'white' }, styles.flatlist_data_text]}>
                                                                                                            {item.TOTAL.home.value > 0 ? 'U' : ''} {item.TOTAL.home.value}
                                                                                                        </Text>
                                                                                                    </View>
                                                                                                </TouchableWithoutFeedback >

                                                                                                <TouchableWithoutFeedback onPress={() => this.getDialogueState2(item, index1, index2, index3, 'S', Arraylength1, Arraylength2, Arraylength3)}>
                                                                                                    <View style={[{
                                                                                                        backgroundColor: '#68bcbc',
                                                                                                    }, styles.flatlist_spread_style]}>
                                                                                                        <Text style={[{ color: 'white' }, styles.flatlist_data_text]}>
                                                                                                            {Math.sign(item.SPREAD.home.value) == +1 ? '+' : ''}{item.SPREAD.home.value}
                                                                                                        </Text>
                                                                                                    </View>
                                                                                                </TouchableWithoutFeedback >
                                                                                            </View>

                                                                                        </View>

                                                                                    </View>

                                                                                </View>

                                                                            )
                                                                        }} />
                                                                    {
                                                                        item.game[index2].isMoneyLineSelect1 ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].MONEY_LINE.away.value, item.game[index2].MATCH_UPS.away.title) : null
                                                                    }
                                                                    {
                                                                        item.game[index2].isMoneyLineSelect2 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].MONEY_LINE.home.value, item.game[index2].MATCH_UPS.home.title) : null
                                                                    }
                                                                    {
                                                                        item.game[index2].isTotalSelect1 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].TOTAL.away.value, item.game[index2].MATCH_UPS.away.title) : null
                                                                    }
                                                                    {
                                                                        item.game[index2].isTotalSelect2 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].TOTAL.home.value, item.game[index2].MATCH_UPS.home.title) : null
                                                                    }
                                                                    {
                                                                        item.game[index2].isSpreadSelect1 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].SPREAD.away.value, item.game[index2].MATCH_UPS.away.title) : null
                                                                    }
                                                                    {
                                                                        item.game[index2].isSpreadSelect2 == true ? this.getDialogue(item.game[index2], index1, index2, item.game[index2].SPREAD.home.value, item.game[index2].MATCH_UPS.home.title) : null
                                                                    }
                                                                    {
                                                                        item.game[index2].isBetaFriendSelect == true ? this.getBetAFriendDialogue(item.game[index2], index1, index2) : null
                                                                    }
                                                                </View>

                                                            )
                                                        }} />
                                                </View>
                                            )
                                        }} />
                                    {/* </KeyboardAwareScrollView> */}

                                </View>
                            </View>
                        </View>
                    </View>
                </Container>
            );
        } else {
            return (
                <Container
                    title={ProfilePageContent.page_title}
                    isHeader={true}
                    isSubHeader={true}
                    isTitle={true}
                    showIndicator={false}
                    menuIconListener={this}
                    LogoIconListener={this}
                    isSetting={false}
                    accountNameListener={this}
                    availableBalanceListener={this}
                    coveredPlaysListener={this}
                    openPlaysListener={this} >
                    <View style={styles.scrollContent}>
                        <View style={styles.mainContent}>
                        </View>
                    </View>
                </Container>
            );
        }
    }

}
const mapStateToProps = (state: GlobalAppState) => ({
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners,
    getProfileRequestStatus: state.serviceReducer.requestStatus,
    getProfileResponse: state.serviceReducer.response,
    getProfileError: state.serviceReducer.error,
});

export default connect(mapStateToProps)(MostOpenActionView);
