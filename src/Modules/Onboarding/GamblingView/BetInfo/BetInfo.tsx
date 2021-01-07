import React, { ReactInstance } from "react";
import { View, Text, Image, ScrollView, AsyncStorage, TextInput, FlatList, Modal, Animated, Dimensions, UIManager, Keyboard, TouchableWithoutFeedback, Share, TouchableOpacity, BackHandler, ImageBackground, Alert } from "react-native";
import styles from './styles';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Container from '../../../../Components/Container';
import { AppEventsLogger } from 'react-native-fbsdk';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import Application from "../../../../Entities/Application";
import ProgressLoader from 'rn-progress-loader';
import Popover from 'react-native-popover-view'
import moment from 'moment';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
import { Dialog } from 'react-native-simple-dialogs'; // @pky 
var update = require('immutability-helper');
import AlertUtil from "../../../../Util/AlertUtil";
import ReferralService from "../../../../Services/Referral/ReferralService";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { connect } from 'react-redux';
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import { UDDAError } from "../../../../Entities";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Dash from 'react-native-dash';
import CircleImage from "../../../../Components/CustomComponents/CircleImage";
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from "react-native-image-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconse from 'react-native-vector-icons/AntDesign';
import BigButton from "../../../../Components/Button/BigButton";
import DetailComponent from "../../../../Components/CustomComponents/Free2Play/Freetoplaydetail";
const { State: TextInputState } = TextInput;

const ProfilePageContent = {
    key: 'somethun',
    page_title: 'OPEN PLAYS',
}

interface G_BetInfoViewProps extends AppValidationComponentProps {
  
    getProfileRequestStatus?: ServiceRequestStatus
    getProfileResponse?: GetProfileResponse
    getProfileError?: UDDAError
    serviceKey?: string
    listeners?: any
}

interface G_BetInfoViewState extends AppValidationComponentState {
    DataList?: any;
    isshow: any;
    loader: any;
    heading: any;
    bankrollstatus: any;
    contest_id: any;
    user_id: any;
    shift: any;
    betdialog: any;
    editItem: any;
    betammount: any;
    amounttowin: any;
    textlength: any;
    valueofMoneylineDialog: any;
    valueofMoneylineDialogShow: any;
    TitleofMoneylineDialog: any;
    focuseAmounttowin: boolean;
    focuseBet: boolean;
    selectedPropBetOptions: any;
    dialogVisible: any;
    selectedItem: any;
    noData: any;
    result_bet_type: any;
    contest_name: any;
    contestdetail: any;
    contestdetailid: any;
    RegisterDate: any;
    EndDate: any;
    MinBetAmount: any;
    contesttype: any;
}


const bottom_initial = 0;
class G_BetInfo extends AppValidationComponent<G_BetInfoViewProps, G_BetInfoViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    private referralservice = new ReferralService();
    private serviceRequestInProgress = false
    public keyboardDidShowSub: any;
    public keyboardDidHideSub: any;
    private Answer: any
    private NewAnswer: any
    private AnswerShow: any
    private NewAnswerShow: any
    private New: any
    private NewShow: any
    constructor(props: G_BetInfoViewProps) {
        super(props);
        this.state = {
            DataList: [],
            isshow: true,
            loader: false,
            heading: '',
            bankrollstatus: '',
            contest_id: '',
            user_id: '',
            shift: new Animated.Value(0),
            betdialog: false,
            editItem: {},
            amounttowin: '',
            betammount: '',
            textlength: 0,
            valueofMoneylineDialog: '0.00',
            valueofMoneylineDialogShow: '0.00',
            TitleofMoneylineDialog: 'Amount to Win:',
            focuseAmounttowin: false,
            focuseBet: false,
            selectedPropBetOptions: 'N',
            dialogVisible: false,
            selectedItem: '',
            result_bet_type: '',
            contest_name: '',
            noData:false,
            contestdetail:false,
            contestdetailid:'',
            RegisterDate:'',
            EndDate:'',
            MinBetAmount:'',
            contesttype:'',

        };
    }



    async componentDidMount() {

        let navigation = this.props.navigation;
        let contest_id = navigation.getParam("contest_id");
        let user_id = navigation.getParam("user_id");
        let result_bet_type = navigation.getParam("result_bet_type");
        let contest_name = navigation.getParam("contest_name");
        let RegisterDate = navigation.getParam("register");
        let EndDate = navigation.getParam("end");
        let contesttype = navigation.getParam("join_type");
        
        if(user_id==Application.sharedApplication().user!.id){
            this.setState({ noData:true });
        }
        await this.setState({ contest_id: contest_id, user_id: user_id, result_bet_type:result_bet_type,contest_name:contest_name,RegisterDate:RegisterDate,EndDate:EndDate,contesttype:contesttype });
        //0 for public
        //1 for private
        //     if(UrlService.isLiveApp == '1'){
        // this.referralservice.logEvent('BetList_Click', {});
        // AppEventsLogger.logEvent('BetList_Click');
        //     }
        //     if(this.props.navigation.state.params){
        //         this.setState({OpenPlaySwitchAccepted:true})
        //         this.callMethod('2');
        //     }else{
        //         this.callMethod('2');
        //     }
        this.callMethoddata()
        // this.callMethod('1');
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: AppScreens.Gambling_ApplicationStack })],
        });
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation!.dispatch(resetAction));

    }


    // ----------------------------------------------- API calling ---------------------------------------
    private getProfile() {
        var profileRequest = new GetProfileRequest()
        var serviceAction = new ServiceAction()
        var responseParser = new GetProfileResponseParser()
        this.props.dispatch!(serviceAction.request(ServiceType.User,
            ServiceKeys.GetProfileServiceName,
            profileRequest,
            [this.constructor.name],
            responseParser))

    }

    handleKeyDown = (e: any, aValue: any, Flag: any, MFlag: any) => {

        //if (e.nativeEvent.key == "." || e.nativeEvent.key == "1" || e.nativeEvent.key == "2" || e.nativeEvent.key == "3" || e.nativeEvent.key == "4" || e.nativeEvent.key == "5" || e.nativeEvent.key == "6" || e.nativeEvent.key == "7" || e.nativeEvent.key == "8" || e.nativeEvent.key == "9" || e.nativeEvent.key == "0") {
        if (this.state.textlength > e.nativeEvent.text.length) {
            // alert('delete')
            this.setState({ textlength: 0 })
            this.handleBackSpace(Flag)
        } else {

            var n = e.nativeEvent.text
            var res = n.length - 1
            // alert(n[res])



            if (n[res] == "." || n[res] == "1" || n[res] == "2" || n[res] == "3" || n[res] == "4" || n[res] == "5" || n[res] == "6" || n[res] == "7" || n[res] == "8" || n[res] == "9" || n[res] == "0") {
                this.setState({ textlength: e.nativeEvent.text.length })
                if (Flag == "ATW") {
                    var ammwin = '';
                    var ammwins;
                    if (this.state.amounttowin.length == 0) {
                        ammwin = this.state.amounttowin + n[res];
                        ammwins = ammwin.split(" ");
                        this.reverceendEditing(ammwin, aValue, MFlag);
                        this.setState({ amounttowin: ammwin });
                    }
                    else {
                        ammwin = this.state.amounttowin + n[res];
                        ammwins = ammwin.split(" ");
                        this.reverceendEditing(ammwin, aValue, MFlag);
                        this.setState({ amounttowin: ammwin });
                    }

                }
                else if (Flag == "BA") {
                    var betamm = '';
                    var betamms;
                    if (this.state.betammount.length == 0) {
                        betamm = this.state.betammount + n[res];
                        betamms = betamm.split(" ");
                        this.endEditing(betamm, aValue, MFlag);
                        this.setState({ betammount: betamm });
                    }
                    else {
                        betamm = this.state.betammount + n[res];
                        betamms = betamm.split(" ");
                        this.endEditing(betamm, aValue, MFlag);
                        this.setState({ betammount: betamm });
                    }
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
        this.setState({ TitleofMoneylineDialog: 'Amount to Win:' });
        this.setState({ valueofMoneylineDialog: '0.00' });
        this.setState({ valueofMoneylineDialogShow: '0.00' });
        this.setState({ betammount: '' });
        this.setState({ amounttowin: '' });
    }

    endEditing(value: any, MoneyLineValue: any, MFlag: any) {
        if (MFlag == 'ML' || MFlag == 'T' || MFlag == 'PS' || MFlag == 'D') {

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

        else if (MFlag == 'P') {
            if (this.state.selectedPropBetOptions == 'N') {
                AlertUtil.show("Please Select Odds.");
            }
            else {
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

        }


        else {
            this.NewAnswer = (value * 2)
            this.NewAnswerShow = (value);
        }
        this.NewShow = parseFloat(this.NewAnswerShow).toFixed(2);
        this.setState({ valueofMoneylineDialogShow: this.NewShow });
        this.New = parseFloat(this.NewAnswer).toFixed(2);
        this.setState({ valueofMoneylineDialog: this.New });
        //this.setState({ TitleofMoneylineDialog: 'Bet Amount:' });
    }

    reverceendEditing(value: any, MoneyLineValue: any, MFlag: any) {
        if (MFlag == 'ML' || MFlag == 'T' || MFlag == 'PS' || MFlag == 'D') {

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
       // this.setState({ TitleofMoneylineDialog: 'Amount to Win:' });
    }


    callMethoddata() {
       
        this.setState({ loader: true });
        if(this.state.contesttype=='public_contest')
       {
        var params: any = {
            'contest_id': this.state.contest_id,
            'user_id': this.state.user_id,
            'result_bet_type': this.state.result_bet_type
        };

       }else if(this.state.contesttype=='private_contest')
       {
        var params: any = {
            'private_contest_id': this.state.contest_id,
            'user_id': this.state.user_id,
            'result_bet_type': this.state.result_bet_type
        };

       }else{
        var params: any = {
            'contest_id': this.state.contest_id,
            'user_id': this.state.user_id,
            'result_bet_type': this.state.result_bet_type
        };
       }

       console.log('ashish bet info params : ',params)
        //1388
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        var url;
        if(this.state.contesttype=='public_contest')
        {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PublicContest/public_contest_placed_bets';
        }else  if(this.state.contesttype=='private_contest')
        {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PrivateContest/private_contest_placed_bets';
        }else{
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/ApiGaming/free_to_play_contest_placed_bets';
        }


        fetch(url, {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                console.log('Success bet counter ' + JSON.stringify(responseJson));
                this.setState({ heading: responseJson.heading_title });
                this.setState({ bankrollstatus: responseJson.bankroll });
                this.setState({ DataList: responseJson.data });
                this.setState({ MinBetAmount: responseJson.min_bet_amount })
                // console.log('Success openplay' + JSON.stringify(this.state.DataList));
                // if (responseJson.message == "Access Expired.") {
                //     // AlertUtil.show("Session Expired ! Please login again");
                //     console.log("Footer comp ---->"+responseJson.message);
                //     LogoutUtill.logoutButtonPressed(this.props);
                //    }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }

    deleteBet(first_index: any, second_index: any, third_index: any, item: any) {
        Alert.alert(
            "Are you sure you want to delete this bet?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.deleteMyBet(first_index,second_index,third_index,item)}
            ],
            { cancelable: false }
        );

    }
    deleteMyBet(first_index: any, second_index: any, third_index: any, item: any) {

        var that = this;
        this.setState({ loader: true });
        if(this.state.contesttype=='private_contest')
        {
            var params: any = {
                'private_contest_id': this.state.contest_id,
                'bet_id': item.encryptor_bet_id
            };
        }else{
            var params: any = {
                'contest_id': this.state.contest_id,
                'bet_id': item.encryptor_bet_id
            };
        }
        //1388
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        console.log('Bet deleted console ' + JSON.stringify(params));
        var url;
        if(this.state.contesttype=='public_contest')
        {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PublicContest/public_contest_delete_bet';
        }else if(this.state.contesttype=='private_contest')
        {
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PrivateContest/private_contest_delete_bet';
        }else{
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/ApiGaming/free_to_play_contest_delete_bet';
        }
       

        fetch(url, {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error == "0") {
                    AlertUtil.showSingleActionMessage(responseJson.message, function () {
                        that.setState({ loader: false });
                        that.callMethoddata();
                    });


                } else {
                    that.setState({ loader: false });
                    AlertUtil.show(responseJson.message);
                }
                console.log('Bet deleted console ' + JSON.stringify(responseJson));

            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }

    // ----------------------------------------------- Methods ---------------------------------------

    accountNameTapped() {
        this.props.navigation!.navigate(AppScreens.G_ProfileView);
    }

    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {

        //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
        RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
    }

    availableBalanceTapped() {
    }

    openPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }

    cellDidClicked(tag: number, tableViewCellReference: ReactInstance): void {
    }





    gotoDashboard() {
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
    }





    componentWillReceiveProps(nextProps: G_BetInfoViewProps) {
        if (nextProps.listeners!.includes(this.constructor.name)) {
            if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
                switch (nextProps.requestStatus) {
                    case ServiceRequestStatus.FinishedWithSuccess:
                        this.serviceRequestInProgress = false;
                        console.log("feedbackResponse " + JSON.stringify(nextProps));

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
                        break
                }

            }
        }
    }




    //end @pky



    getDateTimeFromTimeZone(match_time_stamp: any) {
        var new_time_stamp = match_time_stamp * 1000;
        var formated_time = moment(new_time_stamp).format('LT');
        var Match_date: any = new Date(new_time_stamp).toString().split(' ');

        var zonevalue: any = Match_date[6].toString();
        var zone: any = zonevalue.substr(1, zonevalue.length - 2);
        var eventdate = moment(new_time_stamp).format('MM/DD/YYYY');

        var dateTimeObj = { formated_time: formated_time, Match_date: Match_date, zone: zone }
        return dateTimeObj;
    }

    // componentWillMount() {
    //     console.log("componentwillmount");
    //     this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    //     this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    //   }

    //   handleKeyboardDidShow = (event: any) => {
    //     const { height: windowHeight } = Dimensions.get('window');
    //     const keyboardHeight = event.endCoordinates.height;
    //     const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
    //     UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
    //       const fieldHeight = height;
    //       const fieldTop = pageY;
    //       const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight+ fieldHeight+ fieldHeight) || 0;
    //       if (gap >= 0) {
    //         return;
    //       }
    //       Animated.timing(
    //         this.state.shift,
    //         {
    //           toValue: gap,
    //           duration: 300,
    //           useNativeDriver: true,
    //         }
    //       ).start();
    //     });
    //   }

    //   handleKeyboardDidHide = () => {
    //     Animated.timing(
    //       this.state.shift,
    //       {
    //         toValue: 0,
    //         duration: 300,
    //         useNativeDriver: true,
    //       }
    //     ).start();
    //   }



    // -----------------------------------------------Design and Design Methods---------------------------------------
    editBet(item: any) {
        this.setState({ betammount: item.amount })
        //this.setState({ amounttowin: item.amount_to_win })
       
        this.setState({ valueofMoneylineDialogShow: item.amount_to_win })
        this.setState({ editItem: item })
        this.setState({ betdialog: true })
    }

    async showConfirmDailog(item: any) {
        //console.log(this.state.betammount +'------'+ this.state.MinBetAmount);
        if (this.state.betammount == '' && this.state.amounttowin == '') {
            AlertUtil.show('Please enter bet amount')
        } else  if (parseInt(this.state.betammount) < this.state.MinBetAmount) {
            AlertUtil.show("The minimum amount to bet is " + this.state.MinBetAmount + " .");
          }
          else {
           // await this.setState({dialogVisible: true });
            await this.setState({betdialog: false });
            this.setState({dialogVisible: true });
        }
    }

    async closeConfirm() {
        await this.setState({betdialog: true });
        this.setState({ dialogVisible: false })
    }

    editPlaceBet(item: any) {
        console.log(this.state);
       var that = this;
        var bet_amount: any;
        var amount_to_win: any;
        if (this.state.betammount == '' && this.state.amounttowin == '') {
            AlertUtil.show('Please enter bet amount')
        } else {

            if (this.state.TitleofMoneylineDialog == 'Amount to Win:') {

                amount_to_win = this.state.valueofMoneylineDialogShow;
                bet_amount = this.state.betammount;
                bet_amount = bet_amount;

            }
            else if (this.state.TitleofMoneylineDialog == 'Bet Amount:') {
                bet_amount = this.state.valueofMoneylineDialog;
                amount_to_win = this.state.amounttowin;

            }
            this.setState({ dialogVisible: false })
            this.setState({ loader: true });
            //contest_id,bet_id,bet_amount,amount_to_win
            if(this.state.contesttype=='private_contest')
            {
            var params: any = {
                'private_contest_id': this.state.contest_id,
                'bet_id': item.encryptor_bet_id,
                'bet_amount': bet_amount,
                'amount_to_win': amount_to_win,
            };
        }else{
            var params: any = {
                'contest_id': this.state.contest_id,
                'bet_id': item.encryptor_bet_id,
                'bet_amount': bet_amount,
                'amount_to_win': amount_to_win,
            };
        }
            //1388
            var formData = new FormData();

            for (var k in params) {
                formData.append(k, params[k]);
            }
            var url;
            console.log('params value editing : ', params)
            if(this.state.contesttype=='public_contest')
            {
                url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PublicContest/public_contest_edit_bet';
            }else  if(this.state.contesttype=='private_contest')
            {
                url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PrivateContest/private_contest_edit_bet';
            }else{
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/ApiGaming/free_to_play_contest_edit_bet';
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    'authorisation': this.authorisationToken
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log('Success bet counter ' + JSON.stringify(responseJson));
                    if (responseJson.error == "0") {
                        this.setState({ betdialog: false });
                        AlertUtil.showSingleActionMessage(responseJson.message, function () {
                            that.setState({ loader: false });
                            that.callMethoddata();
                        });


                    } else {

                        AlertUtil.showSingleActionMessage(responseJson.message , function () {
                        that.setState({ loader: false });});
                    }

                })
                .catch(error => {
                    this.setState({ loader: false });
                    console.log(error);
                })

        }

    }
    openDetailmodel(value: any) {
        this.setState({ contestdetailid: value });
        this.setState({ contestdetail: !this.state.contestdetail });
    }
    closeDetailModal() {
        this.setState({ contestdetail: !this.state.contestdetail });
    }
    goinfo() {
        this.props.navigation!.navigate(AppScreens.G_InfochartView, this.props)
    }
    render() {

        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                showIndicator={false}
                menuIconListener={this}
                LogoIconListener={this}
                isSetting={false}
                accountNameListener={this}
                availableBalanceListener={this}
                coveredPlaysListener={this}
                openPlaysListener={this} >


                {/* overlay ui start */}
                <Dialog
                    //   visible={true}
                    visible={this.state.betdialog}
                    //  dialogStyle={{ backgroundColor: '#68bcbc',borderRadius:4,height: 'auto',padding:0 }}
                    //  contentStyle={{ padding:0, backgroundColor: '#68bcbc' }}
                    contentStyle={{ margin: 0, padding: 0, paddingTop: 0, borderRadius: 10, borderWidth: 1, backgroundColor: 'white' }}
                    dialogStyle={{ maxHeight: '90%', borderRadius: 10, borderWidth: 1 }}
                    onTouchOutside={() => this.setState({ betdialog: false })} >
                    <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={{ color: '#68bcbc', fontSize: hp(2.4), fontFamily: 'Montserrat-Bold', }}>UPDATE PICKS</Text>
                            <TouchableOpacity onPress={() => { this.setState({ betdialog: false }) }}>
                                <Image source={require('../../../../images/close.png')} style={{ width: wp(4), height: wp(4), marginRight: wp(5), tintColor: 'grey', marginTop: 4 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '100%', paddingVertical: '5%' }}>

                            <Text style={[styles.dialogue_main_text_label, { paddingLeft: '2%' }]}> You are betting {this.state.editItem.bet_odds_type == 'D' && 'on'} {this.state.editItem.bet_odds_type == 'D' && <Text style={styles.dialogue_sub_text_label}>Draw </Text>} <Text style={styles.dialogue_sub_text_label}>
                                {this.state.editItem.bet_odds_type == 'ML' || this.state.editItem.bet_odds_type == 'T' || this.state.editItem.bet_odds_type == 'PS' || this.state.editItem.bet_odds_type == 'D' ? (parseInt(this.state.editItem.on_bet_odd) > 0 ? '+' : '-') : ''}{Math.abs(this.state.editItem.on_bet_odd)}</Text> under <Text style={styles.dialogue_sub_text_label}>
                                    {this.state.editItem.bet_odds_type == 'ML' ? "Money Line" : this.state.editItem.bet_odds_type == 'T' ? 'Total' : this.state.editItem.bet_odds_type == 'D' ? 'Money Line' : 'Spread'}
                                    {this.state.editItem.is_team_type != '' ? ' (' + this.state.editItem.is_team_type + ') ' : null}</Text> for <Text style={styles.dialogue_sub_text_label}>{this.state.editItem.is_bet_team_name}</Text> {this.state.editItem.bet_odds_type == 'D' && <Text>Vs</Text>} {this.state.editItem.bet_odds_type == 'D' && <Text style={styles.dialogue_sub_text_label}>{this.state.editItem.is_other_team_name}</Text>} . </Text>



                        </View>

                        <ScrollView style={{ width: '100%' }}>
                            <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>
                                <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>


                                    <View style={[styles.customtextinput, { justifyContent: 'center', alignItems: 'center' }]}>
                                        <TextInput
                                            value={this.state.betammount}
                                            onChange={(e: any) => { this.handleKeyDown(e, this.state.editItem.on_bet_odd, "BA", this.state.editItem.bet_odds_type) }}
                                            onFocus={this.handleFocusBA}
                                            clearTextOnFocus={true}
                                            keyboardType='numeric'
                                            returnKeyType='done'

                                            style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), height: hp(6), width: '100%' }}
                                            placeholder='Enter Bet Amount'
                                            placeholderTextColor={'#c3c3c3'}

                                        // onBlur={Keyboard.dismiss}
                                        />
                                    </View>

                                    <View style={{ paddingTop: 10, width: '95%', paddingBottom: 5 }}>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: '#68bcbc', textAlign: 'center' }}> ────  OR  ────</Text>
                                    </View>


                                    <View style={[styles.customtextinput, { justifyContent: 'center', alignItems: 'center' }]}>
                                        <TextInput
                                            value={this.state.amounttowin}
                                            onChange={(e: any) => { this.handleKeyDown(e, this.state.editItem.on_bet_odd, "ATW", this.state.editItem.bet_odds_type) }}

                                            onFocus={this.handleFocusAtW}
                                            clearTextOnFocus={true}
                                            keyboardType='numeric'
                                            returnKeyType='done'
                                            style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), height: hp(6), width: '100%' }}
                                            placeholder='Enter Amount to Win'
                                            placeholderTextColor={'#c3c3c3'}

                                        // onBlur={Keyboard.dismiss}
                                        />
                                    </View>


                                    <View style={{ marginTop: 10, marginBottom: 10, width: '100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                        <TouchableOpacity onPress={() => { this.showConfirmDailog(this.state.editItem) }} style={[styles.placebutton, { height: 'auto' }]} >
                                            <View>
                                                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(3.8), color: 'white' }}> PLACE BET </Text>
                                                <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0), color: 'black' }}> {this.state.TitleofMoneylineDialog}<Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), color: 'black' }}> {this.state.valueofMoneylineDialogShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text> </Text>

       
                                            </View>
                                        </TouchableOpacity>
                                    </View>


                                </View>
                            </Animated.View>
                        </ScrollView>

                    </View>


                </Dialog>

                {/* overlay ui end */}


                {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
                <Dialog
                    visible={this.state.dialogVisible}
                    title=""
                    onTouchOutside={() => this.closeConfirm()} >
                    <View style={{ backgroundColor: "tranparent", padding: '1%' }}>
                        <TouchableOpacity onPress={() => { this.closeConfirm() }}>
                            <View style={{ alignItems: 'flex-end', width: '100%' }}>
                                <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                            </View>
                        </TouchableOpacity>

                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} >
                            <Text style={{ padding: 1, fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: wp(4), color: 'black' }}>
                                Are you sure you want to place this bet?
                  </Text>
                            <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                                listener={() => {
                                    this.editPlaceBet(this.state.editItem)
                                }} />
                        </View>
                    </View>
                </Dialog>


                <View style={styles.scrollContent} >
                    <View style={styles.mainContent}>
                        <ProgressLoader
                            visible={this.state.loader}
                            isModal={true} isHUD={true}
                            hudColor={"#68bcbc"}
                            color={"#FFFFFF"} />


                        {/* --------------------------------Ashishcustom design custom prop bets UNCOVERED ACTION Dialogue --------------------------------*/}









                        <View style={{ flex: 1 }}>
                            <View style={{ backgroundColor: 'white', height: '90%' }}>



                                


                                <View style={{  width: '100%', flexDirection: 'row',backgroundColor:'#CCCCCC' }}>
                                <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center',flexDirection:'row'}}>
                               <View style={{width:'15%',paddingLeft:5}}>
                               <Icons name="arrow-back" size={30} color="black" 
                            onPress={() => RouterBuilder.replaceRouteTo(AppScreens.G_FtpCurrentStanding, this.props)}
                            // onPress={() => this.props.navigation.goBack(null)}
                             />
                               </View>
                                    <View style={{width:'85%'}}>
                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: hp(1.7), textAlign:'center' }}>{this.state.contest_name}</Text>
                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: hp(1.2), textAlign:'center' }}>{this.state.RegisterDate}-{this.state.EndDate}</Text>
                                  </View>
                                </View>
                                <View style={{ width: '15%'}}>
                                    <TouchableOpacity onPress={() => {
                                       this.openDetailmodel(this.state.contest_id)
                                    }} style={{ width: '100%'}}>
                                        <ImageBackground source={this.state.contesttype=='public_contest'?require('../../../../images/public_contest.png'):this.state.contesttype=='private_contest'?require('../../../../images/private_contest.png'):require('../../../../images/freetoplay.png')}
                                            resizeMode='stretch'
                                            style={{ width: '100%', height: 40 }}
                                        >

                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.NameHeaderContainer}>
                                   
                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                        <Text style={[styles.NameStyle, { textAlign:'center'}]}>{this.state.heading}</Text>
                                    </View>
                                </View>

                                <View style={[styles.titleContainer]} >
                                    {this.state.bankrollstatus == 'Y' ? <View style={{ width: '100%', height: 35, backgroundColor: '#666666', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ width: '38%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), fontFamily: 'Montserrat-Bold', textAlign: 'center' }}>
                                                MATCH UP
                                            </Text>
                                        </View>
                                        <View style={{ width: '16%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>
                                                AMOUNT {"\n"} BET
                                            </Text>
                                        </View>
                                        <View style={{ width: '22%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold', }}>
                                                LINE
                                            </Text>
                                        </View>
                                        <View style={{ width: '24%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold', }}>
                                                AMOUNT TO {"\n"} WIN
                                            </Text>
                                        </View>
                                    </View> : <View style={{ width: '100%', height: 35, backgroundColor: '#666666', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                                            <View style={{ width: '38%', height: '100%', justifyContent: 'center' }}>
                                                <Text style={{ color: 'white', fontSize: hp(1.4), fontFamily: 'Montserrat-Bold', textAlign: 'center' }}>
                                                    MATCH UP
                                            </Text>
                                            </View>

                                            <View style={{ width: '22%', height: '100%', justifyContent: 'center' }}>
                                                <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold', }}>
                                                    LINE
                                            </Text>
                                            </View>
                                            <View style={{ width: '30%', height: '100%', justifyContent: 'center' }}>
                                                <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'right', fontFamily: 'Montserrat-Bold', }}>
                                                    STATUS
                                            </Text>
                                            </View>

                                        </View>}
                                </View>

                                {this.state.DataList.length > 0 ?
                                    <FlatList
                                        data={this.state.DataList}
                                        extraData={this.state}
                                        keyExtractor={(item: any, index) => index.toString()}
                                        bounces={false}
                                        renderItem={({ item, index }: any) => {
                                            var data_index = index;


                                            return (

                                                <View style={{ backgroundColor: 'white' }}>

                                                    {/* --------------------- Game Header ---------------- */}
                                                    <View style={styles.gameheader}>
                                                        <View style={{ width: '90%', flexDirection: 'row', }}>
                                                            <View>
                                                                <Text style={styles.gameheadertext} >
                                                                    {item.date_label}
                                                                </Text>
                                                            </View>
                                                        </View>

                                                        {/* <View style={{ width: '10%' }}>
                                                            <Text style={styles.gamecounttext}>( {item.bet_count} )</Text>
                                                        </View> */}
                                                    </View>

                                                    {/* --------------------- Games Arrray ---------------- */}
                                                    <FlatList
                                                        data={item.game_array}
                                                        extraData={this.state}
                                                        keyExtractor={(item: any, index) => index.toString()}
                                                        renderItem={({ item, index }: any) => {
                                                            var index2 = index;
                                                            var Sport_league = item.league_id;

                                                            return (
                                                                <View>
                                                                    <View style={[styles.gamedatetimecontainer, { flexDirection: 'row' }]}>

                                                                        <View style={{ paddingLeft: 5, paddingRight: 10, justifyContent: "center" }}>
                                                                            <Image source={{ uri: item.sport_icon }} style={{ height: 15, width: 15 }} tintColor='white' />
                                                                        </View>

                                                                        <Text style={styles.datetext} >
                                                                            {item.sport_name}

                                                                        </Text>
                                                                    </View>

                                                                    {/* --------------------- dates Arrray and beted matches row ---------------- */}
                                                                    <FlatList
                                                                        data={item.game_array}
                                                                        extraData={this.state}
                                                                        keyExtractor={(item: any, index) => index.toString()}
                                                                        renderItem={({ item, index }: any) => {
                                                                            var date_array_index = index;
                                                                            var sign_spread_home: any;
                                                                            var sign_spread_away: any;
                                                                            var index3 = index;
                                                                            var dateTimeObj: any;
                                                                            if (item.bet_odds_type == 'PS') {
                                                                                sign_spread_home = item.home.ps_home_spread.split(' ');
                                                                                sign_spread_away = item.away.ps_away_spread.split(' ');
                                                                            }
                                                                            dateTimeObj = this.getDateTimeFromTimeZone(item.match_time_stamp);
                                                                            return (
                                                                                <View>
                                                                                    <View style={[styles.timecontainer, { flexDirection: 'row' }]}>
                                                                                        <View style={{width: '75%'}}>
                                                                                        <Text style={[styles.betclosetext]} >
                                                                                            <Text style={[styles.daystext]}> {dateTimeObj.Match_date[0]}</Text>
                                                                                            <Text style={[styles.timetext]}> {dateTimeObj.Match_date[1]} {dateTimeObj.Match_date[2]} {dateTimeObj.formated_time} {dateTimeObj.zone} </Text>
                                                                                        </Text>
                                                                                        </View>

                                                                                        {item.edit_flag ? <View style={{width: '15%'}}><TouchableOpacity onPress={() => this.editBet(item)} ><Icon name="edit" size={16} color="#666666"  /></TouchableOpacity></View> : null}
                                                                                        {item.delete_flag ? <View style={{width: '13%',alignItems:'center'}}><TouchableOpacity onPress={() => this.deleteBet(data_index, index2, index3, item)} ><Iconse name="delete" size={16} color="#f26522" style={{}}  /></TouchableOpacity></View> : null}


                                                                                    </View>
                                                                                    <View style={styles.gamelistcontainer}>
                                                                                        <TouchableWithoutFeedback>
                                                                                            <View style={styles.gamelistindexcontainer}>
                                                                                                <Text style={[styles.indextext]}> {item.data_index + 1} </Text>
                                                                                            </View>
                                                                                        </TouchableWithoutFeedback>
                                                                                        <View style={[styles.gamelistteamcontainer, { position: 'relative'}]}>
                                                                                            <View style={[styles.gamelistteam1container]}>
                                                                                            <View style={[styles.gamelistmatchup, { flexDirection: 'row' }]}>
                                                                                                    {/* <Text style={[styles.teamtitletext, { color: item.away.is_bet_team == 'true' ? '#68bcbc' : '#888888' }]}> {Sport_league == '2' || Sport_league == '4' ? item.away.t : item.away.t} </Text> */}
                                                                                                    <Text style={[styles.teamtitletext, { width: '80%', flexWrap: 'wrap', color: item.away.is_bet_team == 'true' ? '#68bcbc' : '#888888' }]}>{item.league_id == '2' || item.league_id == '4' ? item.away.t : item.away.t}<Text style={[item.away.is_bet_team == 'true' ? styles.teamtitletext : styles.team2titletext, { fontFamily: 'Montserrat-Regular' }]}>{(item.away.result_text=='N/A'?'':'('+item.away.result_text+')')}</Text> </Text>
                                                                                                        <Text style={[styles.flatlist_matchup_count_text_style, { fontFamily: item.away.is_bet_team == 'true' ? 'Montserrat-SemiBold' : 'Montserrat-Regular' }]}>
                                                                                                            {item.away.result}
                                                                                                        </Text>
                                                                                                </View>
                                                                                                {this.state.bankrollstatus == 'Y' && <View style={item.away.is_bet_team == 'true' ? styles.gamelistamountbet : styles.gamelistamountbetteam2}>
                                                                                                    {item.away.is_bet_team == 'true' ? <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} /> : null}
                                                                                                    <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.away.is_bet_team == 'true' ? parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</Text>
                                                                                                </View>}
                                                                                                <View style={[item.away.is_bet_team == 'true' ? styles.gamelistline : styles.gamelistlineteam2, { width: this.state.bankrollstatus != 'Y' ? '70%' : '30%' }]}>

                                                                                                    {item.bet_odds_type == 'ML' ?
                                                                                                        <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(item.away.ml_away_price > 0 ? '+' : item.away.ml_away_price == 0 ? '' : '-') + Math.abs(item.away.ml_away_price)}  </Text>
                                                                                                        :
                                                                                                        item.bet_odds_type == 'T' ?
                                                                                                            <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.away.total}</Text>
                                                                                                            :
                                                                                                            <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.away.ps_away_spread}</Text>
                                                                                                    }

                                                                                                </View>
                                                                                            </View>
                                                                                            {item.ml_draw_price && <View style={[{ flexDirection: 'row', position: 'absolute', top: '35%', width: '100%', left: '40%', height: '33%', zIndex: 1, }]}>



{item.amount=='0.00'?null:<View style={[item.draw.is_bet_team == 'true' ? styles.gamelistamountbet : styles.gamelistamountbetteam2, { width: '30%' }]}>
    {item.draw.is_bet_team == 'true' ? <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} /> : null}
    <Text style={item.draw.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.draw.is_bet_team == 'true' ? parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</Text>
</View>}

<View style={[item.draw.is_bet_team == 'true' ? styles.gamelistline : styles.gamelistlineteam2, { width: item.amount=='0.00'?'61%':'31%' }]}>

    {(item.bet_odds_type == 'ML' || item.bet_odds_type == 'D') &&
        <Text style={[item.draw.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext, { textAlign: 'center' }]}>D {(item.draw.ml_draw_price > 0 ? '+' : item.draw.ml_draw_price == 0 ? '' : '-') + Math.abs(item.draw.ml_draw_price)}</Text>


    }

</View>

</View>}
                                                                                            <View style={[styles.gamelistteam2container]}>

                                                                                            <View style={[styles.gamelistmatchupteam2, { flexDirection: 'row', alignItems: 'center' }]}>
                                                                                                        <Text style={[styles.team2titletext, { width: '80%', flexWrap: 'wrap', color: item.home.is_bet_team == 'true' ? '#68bcbc' : '#888888' }]}>{item.league_id == '2' || item.league_id == '4' ? item.home.t : item.home.t}<Text style={[item.home.is_bet_team == 'true' ? styles.teamtitletext : styles.team2titletext, { fontFamily: 'Montserrat-Regular' }]}>{(item.home.result_text=='N/A'?'':'('+item.home.result_text+')')}</Text> </Text>

                                                                                                        <Text style={[styles.flatlist_matchup_count_text_style, { fontFamily: item.home.is_bet_team == 'true' ? 'Montserrat-SemiBold' : 'Montserrat-Regular' }]}>
                                                                                                            {item.home.result}
                                                                                                        </Text>
                                                                                                    </View>

                                                                                                {this.state.bankrollstatus == 'Y' && <View style={item.home.is_bet_team == 'true' ? styles.gamelistamountbet : styles.gamelistamountbetteam2}>
                                                                                                    {item.home.is_bet_team == 'true' ? <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} /> : null}
                                                                                                    <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.home.is_bet_team == 'true' ? parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</Text>
                                                                                                </View>}

                                                                                                <View style={[item.home.is_bet_team == 'true' ? styles.gamelistline : styles.gamelistlineteam2, { width: this.state.bankrollstatus != 'Y' ? '70%' : '30%' }]}>

                                                                                                    {item.bet_odds_type == 'ML' ?
                                                                                                        <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(item.home.ml_home_price > 0 ? '+' : item.home.ml_home_price == 0 ? '' : '-') + Math.abs(item.home.ml_home_price)} </Text>
                                                                                                        :
                                                                                                        item.bet_odds_type == 'T' ?
                                                                                                            <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.home.total} </Text>
                                                                                                            :
                                                                                                            <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.home.ps_home_spread} </Text>
                                                                                                    }

                                                                                                </View>

                                                                                            </View>

                                                                                        </View>
                                                                                        <View style={[styles.gamelisttotalcontainer,{backgroundColor:item.result=='Lost'?'#BBBBBB':'#68bcbc'}]}>
                                                                                            {this.state.bankrollstatus == 'Y' ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 10, width: 10, marginRight: 3 }} />

                                                                                                <Text style={styles.teamtotaltext}>{(this.state.bankrollstatus == 'Y' && item.bet_winning_status=='R')?item.amount_to_win+'\n'+item.refund_event_state:item.amount_to_win}</Text>
                                                                                                 {/* <Text style={styles.teamtotaltext}>{parseInt(item.amount_to_win).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text> */}

                                                                                            </View> : <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                                                                    <Text style={styles.teamtotaltext}>{item.result}</Text>

                                                                                                </View>}


                                                                                            <View style={{ marginRight: 2 }}>

                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                </View>
                                                                            )
                                                                        }
                                                                        } />
                                                                </View>
                                                            )
                                                        }} />
                                                </View>
                                            )
                                        }} />
                                    :
                                    <View style={styles.OtherTextContainer}>
                                       {this.state.noData ? <View style={styles.OtherTextSubContainer}>
                                             <Text style={styles.UnderConstText}>You haven't placed</Text>
                                            <Text style={styles.UnderConstText}>a bet yet.</Text>
                                            {/* <Text style={[styles.DescText, { marginTop: 15 }]}>Go to your favourite sport/team </Text>
                                            <Text style={styles.DescText}>to start betting. </Text> */}
                                        </View>:this.state.result_bet_type=='open'?<View style={styles.OtherTextSubContainer}>
                                             <Text style={styles.UnderConstText1}>You cannot view bets for others</Text>
                                             <Text style={styles.UnderConstText1}> before the game starts. Stay Tuned!</Text>
                                            
                                            {/* <Text style={[styles.DescText, { marginTop: 15 }]}>Go to your favourite sport/team </Text>
                                            <Text style={styles.DescText}>to start betting. </Text> */}
                                        </View>:this.state.result_bet_type=='won'?<View style={styles.OtherTextSubContainer}>
                                             <Text style={styles.UnderConstText1}>No results available yet</Text>
                                            
                                            {/* <Text style={[styles.DescText, { marginTop: 15 }]}>Go to your favourite sport/team </Text>
                                            <Text style={styles.DescText}>to start betting. </Text> */}
                                        </View>:<View style={styles.OtherTextSubContainer}>
                                             <Text style={styles.UnderConstText1}>No data found</Text>
                                            
                                            {/* <Text style={[styles.DescText, { marginTop: 15 }]}>Go to your favourite sport/team </Text>
                                            <Text style={styles.DescText}>to start betting. </Text> */}
                                        </View>}
                                    </View>
                                }

                            </View>

                        </View>
                    </View>
                </View>
                {this.state.contestdetail && (
                    <DetailComponent
                        detailmodel={this.state.contestdetail}
                        encrypted_contest_id={
                            this.state.contestdetailid
                        }
                        onDismiss={() => {
                            this.closeDetailModal();
                        }}
                        goinfo={() => {
                            this.goinfo();
                        }}
                        join_type={this.state.contesttype}
                    />
                )}
            </Container>
        );

    }



}

const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
    error: state.serviceReducer.error,
    updateProfileRequestStatus: state.serviceReducer.requestStatus,
    updateProfileResponse: state.serviceReducer.response,
    updateProfileError: state.serviceReducer.error,
    getProfileRequestStatus: state.serviceReducer.requestStatus,
    getProfileResponse: state.serviceReducer.response,
    getProfileError: state.serviceReducer.error,
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners



})



export default connect(mapStateToProps)(G_BetInfo);