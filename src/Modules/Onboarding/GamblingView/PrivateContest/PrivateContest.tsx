import React from "react";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Share, Modal, Image, TextInput, ScrollView, Animated, UIManager, Keyboard, Dimensions, TouchableHighlight } from "react-native";
import styles from './styles';
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/AntDesign";
import Container from '../../../../Components/Container';
import BigButton from '../../../../Components/Button/BigButton';
import UpdateProfileResponse from "../../../../Services/Profile/UpdateProfileResponse";
import AlertUtil from "../../../../Util/AlertUtil";
import Application from "../../../../Entities/Application";
import ProgressLoader from 'rn-progress-loader';
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { UDDAError } from "../../../../Entities";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import { Dialog } from 'react-native-simple-dialogs';
import { Dropdown } from "react-native-material-dropdown"
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import CreateContestResponseParser from "../../../../Services/Contest/CreateContestResponseParser";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import CreateContestRequest from "../../../../Services/Contest/CreateContestRequest";
import CreateContestResponse from "../../../../Services/Contest/CreateContestResponse";
import UrlService from '../../../../Services/Core/ServiceURI'
import ReferralService from "../../../../Services/Referral/ReferralService";
import * as RNLocalize from "react-native-localize";
import Icons from 'react-native-vector-icons/MaterialIcons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import MultiSelect from 'react-native-multiple-select';
import { CheckBox } from 'react-native-elements'
import ToggleSwitch from 'toggle-switch-react-native'
const deviceTimeZone = RNLocalize.getTimeZone();
const { State: TextInputState } = TextInput;


interface G_PrivateContestProps extends AppValidationComponentProps {
    createContestRequestStatus?: ServiceRequestStatus
    CreateContestResponse?: CreateContestResponse
    createContestError?: UDDAError

    getProfileRequestStatus?: ServiceRequestStatus
    getProfileResponse?: GetProfileResponse
    getProfileError?: UDDAError

    serviceKey?: string
    listeners?: any
}

interface ProflieViewState extends AppValidationComponentState {
    contentInsetBottom?: any
    BucksAmount: any;
    isDateTimePickerVisible: any;
    isEndDateTimePickerVisible: any;
    date: any;
    chosenDate: any;
    privateSwitchAccepted: any;
    ContestType: any;
    SelectedLeague: any;
    ContstName: any;
    shareDialog: any;
    confirmPrivateBet:any;
    Share_Show_Msg: any;
    MessageUrl: any;
    MessageString: any;
    AllSports: any;
    MinBetAmount: any;
    prize_type: any;
    MaxBetAmount: any;
    endminimumDate: any;
    shift: any;
    Max_no_user: any;
    Number_picks: any;
    Number_picks_value: any;
    End_of_season: any;
    Last_date_register: any;
    Last_date_Picker: any;
    Bankroll_data: any;
    Bankroll_value: any;
    Winner_declared: any;
    Bankrol_amount: any;
    Entire_bankroll: any;
    Entry_fee: any;
    Minimum_picks: any;
    Maximum_picks: any;
    Wining_type: any;
    Wining_amount: any;
    Rentry_value: any;
    No_of_reentry: any;
    Threshold_amount: any;
    No_of_entry_boxes: any;
    selectedItems: any;
    loader: any;
    currency_type: any;
    league_data: any;
    Check_box1: any;
    Check_box2: any;
    Check_box3: any;
    Post_date_register: any;
    Post_date_Picker: any;
    league_model: any;
    create_contest_btn: any;
    seasonEndDate:any;


}


const bottom_initial = 0;

export class G_PrivateContest extends AppValidationComponent<G_PrivateContestProps, ProflieViewState>
    implements MenuIconListener, ISubheaderListener {

    private serviceRequestInProgress = false;
    private End_formated_time = moment().format('L');
    private start_formated_time = moment().format('L');
<<<<<<< HEAD
    private RegistrationEndDate = moment().format('L'); 
=======
    private RegistrationEndDate = moment().format('L');
>>>>>>> main
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private Username = Application.sharedApplication().user!.profile.firstName != null ? Application.sharedApplication().user!.profile.displayName : Application.sharedApplication().user!.profile.firstName + " " + Application.sharedApplication().user!.profile.lastName;
    public minimumDate = new Date();
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    private referralservice = new ReferralService();
    public keyboardDidShowSub: any;
    public keyboardDidHideSub: any;
    constructor(props: G_PrivateContestProps) {
        super(props);
        this.state = {
            contentInsetBottom: bottom_initial,
            BucksAmount: '',
            isDateTimePickerVisible: false,
            isEndDateTimePickerVisible: false,
            date: '',
            chosenDate: new Date(),
            privateSwitchAccepted: false,
            ContestType: '',
            SelectedLeague: '',
            ContstName: '',
            shareDialog: false,
            confirmPrivateBet:false,
            Share_Show_Msg: '',
            MessageUrl: '',
            MessageString: '',
            AllSports: [],
            MinBetAmount: '',
<<<<<<< HEAD
            prize_type: '',
=======
            prize_type: 'Winner Takes All',
>>>>>>> main
            MaxBetAmount: '',
            endminimumDate: new Date(),
            shift: new Animated.Value(0),
            Max_no_user: '',
<<<<<<< HEAD
            Number_picks: [{ value: 'Daily Pick' }, { value: 'Pick Weekly' }, { value: 'Pick Monthly' }, { value: 'Pick Season' }],
=======
            Number_picks: [{ value: 'Daily Pick', label: 'Day' }, { value: 'Pick Weekly' , label: 'Week'}, { value: 'Pick Monthly', label: 'Month' }, { value: 'Pick Season' , label: 'Season'}],
>>>>>>> main
            Number_picks_value: '',
            End_of_season: false,
            Last_date_Picker: false,
            Last_date_register: '',
            Post_date_Picker: false,
            Post_date_register: '',
            Bankroll_data: [{ value: 'Yes' }, { value: 'No' }],
            Bankroll_value: 'Yes',
            Winner_declared: 'highest_bankroll',
            Bankrol_amount: '',
            Entire_bankroll: 'no',
            Entry_fee: '',
            Minimum_picks: '',
            Maximum_picks: '',
            Wining_type: 'udda_bucks',
<<<<<<< HEAD
            Wining_amount: '',
=======
            Wining_amount: '0',
>>>>>>> main
            Rentry_value: 'yes',
            No_of_reentry: '',
            Threshold_amount: '',
            No_of_entry_boxes: [],
            selectedItems: [],
            loader: false,
            Check_box1: false,
            Check_box2: false,
            Check_box3: false,
<<<<<<< HEAD
            currency_type: '',
=======
            currency_type: 'UDDA Bucks',
>>>>>>> main
            league_data: [],
            league_model: false,
            create_contest_btn: false,
            seasonEndDate:moment().format('L')
        }
        this.setDate = this.setDate.bind(this);

    }



    componentDidMount() {
<<<<<<< HEAD
        
=======
       
>>>>>>> main
        this.callSports();
     
    }

    // ---------------------------------------------------- API Call ----------------------------------------------------

    callSports() {
        // fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_leagues', {
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PrivateContest/getAllLeaguesAndProducts', {
            method: 'GET',
            headers: {
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('Success Sports league' + JSON.stringify(responseJson));
                // var topSports = responseJson.data.topSports;
                // var normalSports = responseJson.data.normalSports;
                // var AllSports = topSports.concat(normalSports);
                // this.setState({
                //     AllSports: AllSports.map((x: any) => ({
                //         title: x.title,
                //         type: x.type,
                //         color: x.color,
                //         league_id: x.league_id,
                //         league_name: x.league_name,
                //         value: x.title,
                //     }))
                // });
                this.setState({
                    league_data: responseJson.data.all_leagues.map((x: any) => ({
                        //title: x.title,
                        league_id: x.league_id,
                        title: x.league_name,

                    }))
                });
                console.log('AllSports ' + JSON.stringify(this.state.AllSports));

            })
            .catch(error => console.log(error))
    }



    componentWillUnmount() {

        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();


    }
    componentWillMount() {

        console.log("componentwillmount");
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);

    }


    handleKeyboardDidShow = (event: any) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
        console.log(currentlyFocusedField);
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {

            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight + fieldHeight) || 0;
            console.log(gap)
            if (gap >= 0) {
                return;
            }
            Animated.timing(
                this.state.shift,
                {
                    toValue: gap,
                    duration: 300,
                    useNativeDriver: true,
                }
            ).start();
        });
    }

    handleKeyboardDidHide = () => {
        Animated.timing(
            this.state.shift,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }
        ).start();
    }

    createprivateBet() {
        console.log('boxes value : ', this.state.No_of_entry_boxes)
        return;
        var isshare: any;
        if (this.state.privateSwitchAccepted == false) {
            isshare = 0;
        }
        else {
            isshare = 1;
        }

        var maxBetAmt = parseInt(this.state.MaxBetAmount);
        var minBetAmt = parseInt(this.state.MinBetAmount);
        if (this.state.SelectedLeague == '' || this.state.SelectedLeague == null ||
            this.state.ContstName == '' || this.state.ContstName == null ||
            this.state.BucksAmount == '' || this.state.BucksAmount == null ||
            this.state.ContestType == '' || this.state.ContestType == null ||
            this.state.MinBetAmount == '' || this.state.MinBetAmount == null ||

            this.RegistrationEndDate == '' || this.RegistrationEndDate == null ||
            this.start_formated_time == '' || this.start_formated_time == null ||
            this.End_formated_time == '' || this.End_formated_time == null ||
            this.state.prize_type == '' || this.state.prize_type == null) {
            AlertUtil.show("Please enter valid all details");
        }

        else if (this.state.BucksAmount < 1000 || this.state.BucksAmount < '1000') {
            AlertUtil.show("Joining fee must be 1000 or above.");
        }
        else if ((this.state.MaxBetAmount > 0 || this.state.MaxBetAmount > '0') && (maxBetAmt < minBetAmt)) {
            console.log('alert');
            AlertUtil.show("Maximum bet amount must be greater than minimum bet amount.");
        } else {
            //console.log('ok'); return;
            var RegistrationEndDate = moment(this.RegistrationEndDate).format('YYYY-MM-DD');
            var start_formated_time = moment(this.start_formated_time).format('YYYY-MM-DD');
            var End_formated_time = moment(this.End_formated_time).format('YYYY-MM-DD');


            var createContestRequset = new CreateContestRequest(
                this.state.SelectedLeague,
                this.state.ContstName,
                this.state.BucksAmount,
                this.state.ContestType,
                RegistrationEndDate,
                start_formated_time,
                End_formated_time,
                isshare,
                this.state.MinBetAmount,
                this.state.MaxBetAmount,
                this.state.prize_type,
                deviceTimeZone,
            )
            var serviceAction = new ServiceAction()
            var responseParser = new CreateContestResponseParser()
            this.props.dispatch!(serviceAction.request(ServiceType.Contest,
                ServiceKeys.CreateContestServiceName,
                createContestRequset,
                [this.constructor.name],
                responseParser))
        }
    }


    componentWillReceiveProps(nextProps: G_PrivateContestProps) {
        if (nextProps.listeners!.includes(this.constructor.name)) {
            if (nextProps.serviceKey === ServiceKeys.CreateContestServiceName) {
                switch (nextProps.requestStatus) {
                    case ServiceRequestStatus.FinishedWithSuccess:
                        this.serviceRequestInProgress = false;
                        console.log("custom bet success " + JSON.stringify(nextProps.CreateContestResponse));
                        var response = nextProps.CreateContestResponse!.response;
                        if (response.data.length != 0) { //garima
                            // this.SharePrivateContest(response.data.encryptor_private_contest_id);
                        }
                        else {
                            AlertUtil.show(response.message);
                        }
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

    // ---------------------------------------------------- Method ----------------------------------------------------

    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {
        //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
        RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
    }

    accountNameTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_ProfileView, this.props)
    }

    availableBalanceTapped() {
    }

    openPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props);

    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props);

    }

    logoutButtonPressed() {
        Application.sharedApplication().logout()
        RouterBuilder.resetRouteTo(AppScreens.OnboardingStack, this.props)
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    showDateTimeEndPicker = () => {
        this.setState({ isEndDateTimePickerVisible: true });
    };

    hideDateTimEndPicker = () => {
        this.setState({ isEndDateTimePickerVisible: false });
    };

    handleEndDatePicked = (date: any) => {
        var formated_date = moment(date).format('L');
        this.End_formated_time = formated_date;
        this.setState({seasonEndDate:formated_date});
        this.hideDateTimEndPicker();
    }

    handleStartDatePicked = (date: any) => {
        this.setState({ endminimumDate: date })
        var formated_date = moment(date).format('L');
        this.start_formated_time = formated_date;
        this.hideDateTimePicker();
    }


    handleDatePicked = (date: any) => {
        this.setState({ chosenDate: date });
        var formated_date = moment(date).format('L');
        this.start_formated_time = formated_date;
        if (this.state.ContestType == 'Daily') {
            this.End_formated_time = moment(date).format('L');;
        }
        else if (this.state.ContestType == 'Weekly') {
            this.End_formated_time = moment(date).add(7, 'days').format('L');
        }
        else if (this.state.ContestType == 'Monthly') {
            this.End_formated_time = moment(date).add(1, 'months').format('L');
        }
        else {

        }
        this.hideDateTimePicker();

    };

    showLastDateTimeEndPicker = () => {
        this.setState({ Last_date_Picker: true });
    };

    hideLastDateTimEndPicker = () => {
        this.setState({ Last_date_Picker: false });
    };

    handleLastDatePicked = (date: any) => {
        var formated_date = moment(date).format('L');
        // this.End_formated_time = formated_date;
        this.setState({ Last_date_register: formated_date })
        this.hideLastDateTimEndPicker();
    }


    showPostDateTimeEndPicker = () => {
        this.setState({ Post_date_Picker: true });
    };

    hidePostDateTimEndPicker = () => {
        this.setState({ Post_date_Picker: false });
    };

    handlePostDatePicked = (date: any) => {
        var formated_date = moment(date).format('L');
        // this.End_formated_time = formated_date;
        this.setState({ Post_date_register: formated_date })
        this.hidePostDateTimEndPicker();
    }

    setDate(newDate: any) {
        this.setState({ chosenDate: newDate });
    }

    privateSwitchValueChanged() {
        if (this.state.privateSwitchAccepted === true) {
            this.setState({ privateSwitchAccepted: false });
        }
        else {
            this.setState({ privateSwitchAccepted: true });
        }
    }

    onChangeFilter(value: any) {
        this.setState({ ContestType: value });
        this.handleDatePicked(this.state.chosenDate);
    }
    onChangeBankroll(value: any) {
<<<<<<< HEAD
        
        if(value=='No'){
            this.setState({ Winner_declared: 'correct_pick' })
=======
       
        if(value=='No'){
            this.setState({ Winner_declared: 'most_wins' })
>>>>>>> main
           
        }else{
            this.setState({ Winner_declared: 'highest_bankroll' })
        }
<<<<<<< HEAD
        
=======
       
>>>>>>> main
        this.setState({ Bankroll_value: value });
        //this.handleDatePicked(this.state.chosenDate);
    }
    onChangeNumber_picked(value: any) {
        this.setState({ Number_picks_value: value });

    }

    onChangeLegue(value: any) {

        for (let i = 0; i < this.state.AllSports.length; i++) {
            if (this.state.AllSports[i].title == value) {
                this.setState({ SelectedLeague: this.state.AllSports[i].league_id });
            }
        }
        console.log('SelectedLeague ' + JSON.stringify(this.state.SelectedLeague));

    }

    async SharePrivateContest(encryptedID: any) {
        var MessageString: any;
        var ShowString: any;
        var url: any;
        var referStr: any;

        url = "http://bet.udda.com/index.php?t=contestbetnew&i=" + encryptedID;
        url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
        referStr = "\n Use Referral Code " + this.my_referral_code + " to sign up. ";
        MessageString = "You have been invited to a private contest through UDDA by " + this.Username + "." + referStr + " Open Link : " + url;


        ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
            You have been invited to a private contest through UDDA by <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {this.Username}</Text>{referStr}
        </Text>


        this.setState({ MessageString: MessageString });
        this.setState({ Share_Show_Msg: ShowString });
        this.setState({ MessageUrl: url });
        console.log("Private Contest " + JSON.stringify(MessageString));
        this.setState({ shareDialog: true });
    }



    shareNow() {
        var Message = this.state.MessageString;
        Share.share({
            message: Message
        }).then((result: any) => {
            this.setState({ shareDialog: false })
            console.log('share result' + JSON.stringify(result));
            this.setState({ create_contest_btn: false });
            this.props.navigation!.replace(AppScreens.G_UddaContests, { params: { bet_id: 'ashish' } });
        }).catch((errorMsg: any) => {
            this.setState({ shareDialog: false });
            this.setState({ create_contest_btn: false });
            AlertUtil.show('share error ' + JSON.stringify(errorMsg));
        });
    }

    onChange_price_type(value: any) {
        this.setState({ prize_type: value });
    }

    onChange_currency_type(value: any) {
        this.setState({ currency_type: value });
    }







    async Noofreentry() {
       
        var count = this.state.No_of_reentry;
       
        await this.setState({ No_of_entry_boxes: [] });
        for (let i = 0; i < count; i++) {
            this.state.No_of_entry_boxes.push('')
        }
<<<<<<< HEAD
        
=======
       
>>>>>>> main
        this.setState({ No_of_entry_boxes: this.state.No_of_entry_boxes })
    }

    ChangeTextEntryBox(value: any, index: any) {
        var count = this.state.No_of_entry_boxes
        count[index] = value
        this.setState({ No_of_entry_boxes: count })
    }





    onSelectedItemsChange = (selectedItems) => {
        console.log('dropdown slected items : ', selectedItems)
        // Set Selected Items
        this.setState({ selectedItems: selectedItems })
        // setSelectedItems(selectedItems);
    };

    checkValidation()
    {
        var line_permit = []
        if (this.state.Check_box1) {
            line_permit.push('money_line')
        }

        if (this.state.Check_box2) {
            line_permit.push('total')
        }

        if (this.state.Check_box3) {
            line_permit.push('point_spread')
        }
//|| this.state.Post_date_register == ''
        if (this.state.ContstName.trim() == '' || this.state.selectedItems.length == 0 || this.state.Max_no_user.trim() == ''
            || this.state.Number_picks_value == '' || this.state.BucksAmount.trim() == '' || this.state.Last_date_register == ''
            || this.state.Winner_declared == '' || this.state.Minimum_picks.trim() == '' || this.state.Maximum_picks.trim() == '' || this.state.Wining_amount.trim() == ''
            || this.state.prize_type == '' || line_permit.length == 0 ) {
            AlertUtil.show('Please fill All details. !!')
        } else {
            this.setState({confirmPrivateBet:true});  
        }
    }

    createprivate_contest() {
<<<<<<< HEAD
  
=======
 
>>>>>>> main

        var line_permit = []
        if (this.state.Check_box1) {
            line_permit.push('money_line')
        }

        if (this.state.Check_box2) {
            line_permit.push('total')
        }

        if (this.state.Check_box3) {
            line_permit.push('point_spread')
        }
//|| this.state.Post_date_register == ''
        if (this.state.ContstName.trim() == '' || this.state.selectedItems.length == 0 || this.state.Max_no_user.trim() == ''
            || this.state.Number_picks_value == '' || this.state.BucksAmount.trim() == '' || this.state.Last_date_register == ''
            || this.state.Winner_declared == '' || this.state.Minimum_picks.trim() == '' || this.state.Maximum_picks.trim() == '' || this.state.Wining_amount.trim() == ''
            || this.state.prize_type == '' || line_permit.length == 0 ) {
<<<<<<< HEAD
            AlertUtil.show('Please fill All details. !!')
        } else {
            // alert('false')
            this.setState({confirmPrivateBet:false});   
=======
            AlertUtil.show('Please fill all the details.')
        } else {
            // alert('false')
            this.setState({confirmPrivateBet:false});  
>>>>>>> main


            // return;
            this.setState({ loader: true });

            // var line_permit =[]
            // if(this.state.Check_box1)
            // {
            //     line_permit.push('money_line')
            // }

            // if(this.state.Check_box2)
            // {
            //     line_permit.push('total')
            // }

            // if(this.state.Check_box3)
            // {
            //     line_permit.push('point_spread')
            // }


            var RegistrationEndDate = moment(this.RegistrationEndDate).format('YYYY-MM-DD');
            var start_formated_time = moment(this.start_formated_time).format('YYYY-MM-DD');
            var End_formated_time = moment(this.End_formated_time).format('YYYY-MM-DD');
            var Last_formated_time = moment(this.state.Last_date_register).format('YYYY-MM-DD');
            var Post_formated_time = moment(this.state.Post_date_register).format('YYYY-MM-DD');
            var params: any = {
                // 'contest_id': '',
                'league_id': this.state.selectedItems.join(','), // With comma separated
                'contest_name': this.state.ContstName,
                'contest_type': this.state.Number_picks_value,
                'settlement_type': this.state.prize_type,
                'max_user': this.state.Max_no_user,
                'last_date_to_register': Last_formated_time,
                'entire_bankroll_avaiable': this.state.Entire_bankroll == 'no' ? 'N' : 'Y',
                'contest_start_date': start_formated_time,
                'contest_end_date': End_formated_time,
                'join_fee': this.state.BucksAmount,
                'bankroll': this.state.Bankroll_value == 'Yes' ? 'Y' : 'N',
                'max_bankroll_amount': this.state.Bankrol_amount,
                'min_bet_bankroll': this.state.MinBetAmount, // min bet amount
                'max_bet_bankroll': this.state.MaxBetAmount, // max bet amount
                'winner_decleared_by': this.state.Winner_declared,
                'minimum_picks': this.state.Minimum_picks,
                'maximum_picks': this.state.Maximum_picks,
                'line_permitted': line_permit.join(','),//'money_line,total,point_spread' ,// With comma separated
                'chkWinner': 'udda_bucks',//this.state.Wining_type, // Winning Type  winning_amount for real money, udda_bucks  for  UDDbucks ,swag_product for swag
                'winning_amount': this.state.Wining_type == 'Swag' ? '' : this.state.Wining_amount,
                'swag_product_id': '',
                'current_contest': 1,
                'allow_reentry': this.state.Rentry_value == 'yes' ? 1 : 0,
                'currency_type': this.state.currency_type,
                'allow_no_of_entries': this.state.No_of_entry_boxes.length,
                'threshold_amount': this.state.Threshold_amount,
                'rentry_amount': this.state.No_of_entry_boxes.join(','),  // With comma separated
                'private_end_season_status': this.state.End_of_season ? 1 : 0,
                'contest_show_date': Post_formated_time,
                'timezone': deviceTimeZone,
                'Is_share':this.state.privateSwitchAccepted ? 1:0

            };

            console.log('create private :', params)
<<<<<<< HEAD
            
=======
           
>>>>>>> main

            this.setState({ create_contest_btn: true });

            var formData = new FormData();

            for (var k in params) {
                formData.append(k, params[k]);
            }
            fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PrivateContest/add_private_contest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorisation': this.authorisationToken
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log('Success of add contest ' + JSON.stringify(responseJson));
                    var that = this;
                    if (responseJson.message == "Access Expired.") {
                        // AlertUtil.show("Session Expired ! Please login again");
                        console.log("Footer comp ---->" + responseJson.message);
                        // LogoutUtill.logoutButtonPressed(this.props);
                        that.setState({ loader: false });
                        that.setState({ create_contest_btn: false });
                    } else {

                        if (responseJson.error == 0) {
                            that.setState({ loader: false });
                            this.SharePrivateContest(responseJson.data.encryptor_private_contest_id);
                            // AlertUtil.showSingleActionMessage(responseJson.message,function(){that.props.navigation?.replace(AppScreens.G_UddaContests)})
                        } else {
                            AlertUtil.showSingleActionMessage(responseJson.message, function () {
                                that.setState({ loader: false });
                                that.setState({ create_contest_btn: false });
                            })
                        }


                    }

                })
                .catch(error => {
                    this.setState({ loader: false });
                    this.setState({ create_contest_btn: false });
                    console.log(error);
                })
        }
    }

    check_endseason_contest() {
        //this.setState({ loader: true });
        var myVar2 = this.state.selectedItems.join(',');

        console.log('create private join comma seprate :', myVar2)
        var params: any = {
            // 'contest_id': '',
            'league_id': myVar2, // With comma separated


        };

        console.log('create private :', params)
        // return;



        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PrivateContest/getSeasonEndDate', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                var that = this;
                console.log('Success end of season ' + JSON.stringify(responseJson));
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    // LogoutUtill.logoutButtonPressed(this.props);
                    that.setState({ loader: false });

                } else {
                    if (responseJson.error == 1) {
<<<<<<< HEAD
                        AlertUtil.showSingleActionMessage(responseJson.message, function () { 
=======
                        AlertUtil.showSingleActionMessage(responseJson.message, function () {
>>>>>>> main
                            that.setState({ loader: false });
                            that.setState({ End_of_season: false })
                         })
                    }
                    else {
                        that.setState({ loader: false });
                         this.setState({seasonEndDate:responseJson.data});
                        this.End_formated_time = this.state.seasonEndDate;
                    }

                }

            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }

    async change_season() {
        if (this.state.selectedItems.length == 0) {
            AlertUtil.show('Please select league(s).')
        } else {
           await this.setState({ End_of_season: !this.state.End_of_season })
            console.log('my state ',this.state.End_of_season);
            if (this.state.End_of_season) {
             
                this.check_endseason_contest()
            }else{
                await this.setState({ seasonEndDate: moment().format('L')});
               
            }
        }

    }

    acceptGift(index) {
        this.state.selectedItems.push(index),
            this.setState({ selectedItems: this.state.selectedItems });
    }

    removeGift(e) {
        var array = this.state.selectedItems;
        var index = array.indexOf(e); // Let's say it's Bob.
        // delete array[index];
        if (index > -1) {
            array.splice(index, 1);
        }
        this.setState({ selectedItems: array });
    }
    changereentryvalue(value: any) {
        this.setState({ No_of_reentry: '' })
        this.setState({ No_of_entry_boxes: [] })
        this.setState({ Rentry_value: value })
    }

    getTextStyle(index:any) {
        console.log('reminder',index % 2)
        if(index % 2 ==0) {
         return {
<<<<<<< HEAD
            width: "49%", 
=======
            width: "49%",
>>>>>>> main
         }
        } else {
          return {
            width: "49%",
          }
        }
       }

    // ---------------------------------------------------- Design ----------------------------------------------------
    render() {


        let data3 = [{
            value: 'Daily Pick',
        }, {
            value: 'Pick 6 Weekly',
        }];

        let data1 = this.state.Wining_type == 'Swag' ? [{
            value: 'Winner Takes All',
        }] : [{
            value: 'Winner Takes All',
        }, {
            value: 'See Prize Chart',
        }];
        const items = this.state.league_data


        return (
            <Container title={'private contest'}
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                showIndicator={this.serviceRequestInProgress}
                menuIconListener={this}
                LogoIconListener={this}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}
                accountNameListener={this}
                isSetting={false}
            >






                {/* create ui of Select Gift */}
                <Modal visible={this.state.league_model} transparent={false}>
                    <SafeAreaView>
                        <View style={[styles.customhead, { backgroundColor: "#68bcbc" }]}>
                            <View style={{ width: "35%", paddingLeft: 10 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ league_model: false });
                                        if(this.state.selectedItems.length==0){
                                            this.setState({ End_of_season: false });
                                            this.setState({ seasonEndDate: moment().format('L')});
                                    }

                                    }}
                                >
                                    <View style={[styles.CloseView1]}>
                                        <Icon name="arrowleft" size={35} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "65%" }}>
                                <Text style={[styles.customheadtext, { color: "white" }]}>
                                    {"Select League(s)"}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center",
                                marginTop: 5,
                            }}
                        >
                            <View style={{ width: "95%" }}>


                                <View
                                    style={{ height: hp(75) }}
                                >
                                    <ScrollView>
                                        {this.state.league_data.map((item, index) => {
                                            return (
                                                // <View style={[styles.giftRow,{backgroundColor:'#accfcf'}]}>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.state.selectedItems.includes(item.league_id)
                                                            ? this.removeGift(item.league_id)
                                                            : this.acceptGift(item.league_id)
                                                    }
                                                >
                                                    <View
                                                        style={[
                                                            styles.giftRow,
                                                            {
                                                                backgroundColor: this.state.selectedItems.includes(
                                                                    item.league_id
                                                                )
                                                                    ? "#d0edeb"
                                                                    : "#fff",
                                                            },
                                                        ]}
                                                    >
                                                        <View
                                                            style={{ width: "85%", justifyContent: "center" }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontFamily: "Montserrat-Bold",
                                                                    fontSize: hp(2.2),
                                                                    paddingLeft: 20,
                                                                }}
                                                            >
                                                                {item.title}
                                                            </Text>
                                                        </View>
                                                        <View style={[styles.itemCenter, { width: "15%" }]}>
                                                            {this.state.selectedItems.includes(item.league_id) ? (
                                                                <Icon name="check" size={25} color="#68bcbc" />
                                                            ) : null}
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </ScrollView>
                                </View>

                                <View
                                    style={[
                                        {
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 15,
                                            marginBottom: 15,
                                        },
                                    ]}
                                >
                                    <TouchableHighlight
                                        style={[
                                            styles.createsquaare,
                                            { width: "98%", height: hp(9.0) },
                                        ]}
                                        // onPress={() => this.showAlertDialog('2')}
                                        onPress={() => {
                                            if (this.state.selectedItems.length > 0) {
                                                this.setState({ league_model: false });
                                            } else {
                                                AlertUtil.show("Please select league(s).");
                                            }
                                        }}
                                        underlayColor="#fff"
                                    >
                                        <View style={{}}>
                                            <Text
                                                style={[
                                                    styles.createsquaaretext,
                                                    {
                                                        textAlign: "center",
                                                        fontSize: hp(2.9),
                                                        marginTop: 4,
                                                    },
                                                ]}
                                            >
                                                DONE
                      </Text>

                                        </View>
                                    </TouchableHighlight>
                                </View>

                                {/* <View style={[ { justifyContent:'center',alignItems:'center',marginTop:15,marginBottom:15 }]}>
                    <Text>{' '}</Text>
                    </View> */}
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>










                <ProgressLoader
                    visible={this.state.loader}
                    isModal={true} isHUD={true}
                    hudColor={"#68bcbc"}
                    color={"#FFFFFF"} />

                     {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
        <Dialog
          visible={this.state.confirmPrivateBet}
          title=""
          onTouchOutside={() => this.setState({ confirmPrivateBet: false })} >
          <View style={{ backgroundColor: "transparent", width: '100%', paddingTop: 10, paddingBottom: 10 }}>
            <TouchableOpacity onPress={() => { this.setState({ confirmPrivateBet: false }) }}>
              <View style={{ alignItems: 'flex-end', width: '100%', paddingRight: wp(2) }}>
                <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
              </View>
            </TouchableOpacity>

            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 8, width: '100%' }} >
              <Text style={{ fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: wp(4), color: 'black' }}>
                Are you sure you want to create private contest?
</Text>
              <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                listener={() => {
                  //this.DialogClose(this.selectedItemData,this.selectedItemIndex);
              this.createprivate_contest()
                }} />
            </View>
          </View>
        </Dialog>
                {/* -------------------------------- Share Dialogue --------------------------------*/}
                <Dialog
                    visible={this.state.shareDialog}
                    title=""
<<<<<<< HEAD
                // onTouchOutside={() => this.setState({ shareDialog: false })} 
=======
                // onTouchOutside={() => this.setState({ shareDialog: false })}
>>>>>>> main
                >

                    <View style={{ backgroundColor: "white" }}>

                        <View style={{ justifyContent: "center" }} >

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '85%', paddingLeft: '15%' }}>
                                    <Image source={require('../../../../images/udda_logo_white.png')} style={{ width: wp(30), height: wp(7), margin: 10, alignSelf: 'center' }} resizeMode='contain' />
                                </View>
                                <View style={{ width: '15%' }}>
                                    <TouchableWithoutFeedback onPress={() => { this.setState({ shareDialog: false }); this.props.navigation!.replace(AppScreens.G_UddaContests, { params: { bet_id: 'ashish' } }); }}>
                                        <View>
                                            <Image source={require('../../../../images/close.png')} style={{ height: 13, width: 13, alignSelf: 'flex-end', marginRight: 8, marginTop: 10 }}></Image>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>


                            <View style={{ width: '100%', backgroundColor: '#cccccc', height: 1, marginTop: 1, padding: 0 }}></View>

                            <View style={{ justifyContent: "center", padding: 10 }}>

                                <Text style={{ padding: 1, fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.7), marginTop: 3, color: 'black' }}>Messege</Text>

                                <View style={{ padding: 1, borderColor: '#cccccc', borderWidth: 1, marginTop: 5, }}>
                                    <Text style={{ padding: 8, width: '100%', height: 'auto' }}>{this.state.Share_Show_Msg}</Text>

                                </View>
                                <Text style={{ padding: 1, fontFamily: 'Montserrat-Regular', fontSize: hp(1.5), marginTop: 5, color: 'black' }}>
                                    {this.state.MessageUrl}
                                </Text>
                                <BigButton title="Share Now" style={styles.verify_button} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.shareNow() }} />
                            </View>
                        </View>
                    </View>
                </Dialog>

                <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>
                    <View style={styles.mainContent}>
                        <View style={[styles.Text_Container, { flexDirection: 'row' }]}>
                            <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                <Icons name="arrow-back" size={30} color="black"
                                    onPress={() => { this.props.navigation!.replace(AppScreens.G_UddaContests, { params: { bet_id: 'ashish' } }) }}
                                    // onPress={() => {RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)}}
                                    // onPress={() => this.props.navigation.goBack(null)}
                                    style={{ marginLeft: 2, marginTop: 5 }}
                                />
                            </View>
                            <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                <Text style={[styles.customheadtext1, { color: '#68bcbc' }]}>CREATE CONTEST</Text>
                            </View>
                        </View>


                        <View style={{ flex: 1 }}>
<<<<<<< HEAD
                            <View style={{ height: '90%', backgroundColor: '#FFF' }}>
=======
                            <View style={{ height: '97%', backgroundColor: '#FFF' }}>
>>>>>>> main
                                <ScrollView>
                                    <View style={styles.content}>
                                        <View style={styles.ThirdContainers}>
                                            <Text style={styles.Text_Style_Label}>Contest Name</Text>
                                            <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                <TextInput
                                                    placeholder='Enter Contest Name'
                                                    placeholderTextColor={'#888888'}
                                                    onChangeText={(text) => this.setState({ ContstName: text })}
                                                    clearTextOnFocus={true}
                                                    returnKeyType='done'
                                                    style={styles.Input_TextStyles}

                                                />
                                            </View>
                                        </View>
                                        <View style={styles.ThirdContainers}>
                                            <Text style={styles.Text_Style_Label}>Select a League</Text>
                                            <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                <TouchableOpacity onPress={() => { this.setState({ league_model: true }); }}>
                                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start', height: hp(7.1) }}>

                                                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.1), color: '#888888', paddingLeft: '1%' }}>{this.state.selectedItems.length == 0 ? 'Select League(s)' : this.state.selectedItems.length + ' League(s) Selected'}</Text>

                                                    </View>
                                                </TouchableOpacity>
                                                {/* <MultiSelect
          hideTags
          items={this.state.league_data}
          uniqueKey="id"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          selectText="Select League"
          searchInputPlaceholderText="Search League"
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#68bcbc"
          selectedItemIconColor="#68bcbc"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#68bcbc"
          submitButtonText="Submit"
          fixedHeight={true}
          styleDropdownMenu={{height:50}}
          styleItemsContainer={{maxHeight:180,minHeight:50}}

        /> */}

                                            </View>
                                        </View>

                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "49%", marginRight: "2%" }}>
<<<<<<< HEAD
                                                <Text style={styles.Text_Style_Label}>Maximum Number of User</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                    <TextInput
                                                        placeholder='Maximum Number of User'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ Max_no_user: text })}
                                                        clearTextOnFocus={true}
                                                        keyboardType={'numeric'}
                                                        returnKeyType='done'
                                                        style={styles.Input_TextStyles}

                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: "49%" }}>
                                                <Text style={styles.Text_Style_Label}>No. of Picks per period</Text>
                                                <View
                                                    style={[
                                                        styles.Input_Containers,

                                                        {
                                                            justifyContent: "center",
                                                            alignContent: "center",
                                                            alignItems: "center",
                                                            paddingBottom: 0,
                                                            height: hp(8.1),

                                                        },
                                                    ]}
                                                >
                                                    <Dropdown
                                                        dropdownOffset={{ top: 0, left: 0 }}
                                                        dropdownMargins={{ min: 0, max: 0 }}
                                                        dropdownPosition={-4.2}
                                                        containerStyle={{
                                                            backgroundColor: "#F4F4F4",
                                                            borderBottomWidth: 0,
                                                            justifyContent: "center",
                                                            width: "100%",

                                                        }}
                                                        inputContainerStyle={{
                                                            borderBottomColor: "transparent",
                                                            marginLeft: "2%",
                                                        }}
                                                        itemTextStyle={[
                                                            { fontFamily: "Montserrat-Bold", fontSize: hp(2.3) },
                                                        ]}
                                                        data={this.state.Number_picks}
                                                        onChangeText={value => this.onChangeNumber_picked(value)}
                                                        fontSize={hp(2.3)}
                                                    />
                                                </View>


                                            </View>
                                        </View>







                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "49%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Contest Fee</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, { flexDirection: 'row', }]}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginLeft: 3 }} />
                                                    </View>
                                                    <TextInput
                                                        placeholder='Enter Contest Fee'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ BucksAmount: text })}
                                                        clearTextOnFocus={true}
                                                        keyboardType={'numeric'}
                                                        returnKeyType='done'
                                                        style={[styles.Input_TextStyles, { width: '95%' }]}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: "49%" }}>

                                                <Text style={[styles.Text_Style_Label]}>End of season</Text>
                                                <View style={[styles.Input_Containers, { flexDirection: 'row', backgroundColor: '', marginLeft: "15%" }]}>
                                                    <TouchableOpacity onPress={() => { this.change_season() }}>
                                                        <Image source={this.state.End_of_season ? require('../../../../images/toggle_on_G.png') : require('../../../../images/toggle_off.png')}
                                                            style={{ height: 40, width: 60 }}
                                                            resizeMode="contain"></Image>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                        </View>






                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "49%", marginRight: "2%" }}>
=======
>>>>>>> main
                                                <Text style={styles.Text_Style_Label}>First Game Date</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, styles.heightCalender, { flexDirection: 'row' }]}>

                                                    <View style={{ width: '80%' }}>
                                                        <Text style={[styles.calenderTextCss]}>{this.start_formated_time}</Text>
                                                    </View>
                                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                                        <TouchableOpacity onPress={this.showDateTimePicker}>
                                                            <Image source={require('../../../../images/calendar.png')}
                                                                style={{ height: 20, width: 20, marginRight: 10 }}
                                                                resizeMode="contain" />
                                                        </TouchableOpacity>
                                                    </View>


                                                    <DateTimePicker
                                                        onDateChange={this.setDate}
                                                        isVisible={this.state.isDateTimePickerVisible}
                                                        onConfirm={this.handleStartDatePicked}
                                                        onCancel={this.hideDateTimePicker}
                                                        minimumDate={this.minimumDate}
                                                    />
                                                </View>

                                            </View>
                                            <View style={{ width: "49%" }}>
                                                <Text style={styles.Text_Style_Label}>Last Game Date</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, styles.heightCalender, { flexDirection: 'row' }]}>

                                                    <View style={{ width: '80%' }}>
                                                        <Text style={[styles.calenderTextCss]}>{this.state.seasonEndDate}</Text>
                                                    </View>
                                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                                        <TouchableOpacity onPress={this.state.End_of_season ? null : this.showDateTimeEndPicker }>
                                                            <Image source={require('../../../../images/calendar.png')}
                                                                style={{ height: 20, width: 20, marginRight: 10 }}
                                                                resizeMode="contain" />
                                                        </TouchableOpacity>
<<<<<<< HEAD
                                                    </View> 
=======
                                                    </View>
>>>>>>> main

                                                    <DateTimePicker
                                                        onDateChange={this.setDate}
                                                        isVisible={this.state.isEndDateTimePickerVisible}
                                                        onConfirm={this.handleEndDatePicked}
                                                        onCancel={this.hideDateTimEndPicker}
                                                        minimumDate={this.state.endminimumDate}
                                                    // minimumDate={this.minimumDate}
                                                    />

                                                </View>
                                            </View>

                                        </View>



                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
<<<<<<< HEAD
=======
                                           
                                            <View style={{ width: "100%" }}>

                                                <Text style={[styles.Text_Style_Label]}>End of season</Text>
                                                <View style={[styles.Input_Containers, { flexDirection: 'row', backgroundColor: '', marginLeft: "15%" }]}>
                                                    <TouchableOpacity onPress={() => { this.change_season() }}>
                                                        <Image source={this.state.End_of_season ? require('../../../../images/toggle_on_G.png') : require('../../../../images/toggle_off.png')}
                                                            style={{ height: 40, width: 60 }}
                                                            resizeMode="contain"></Image>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                        </View>



                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
>>>>>>> main
                                            <View style={{ width: "100%", marginRight: "2%" }}>
                                            <Text style={styles.Text_Style_Label}>Last Date to Register</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, styles.heightCalender, { flexDirection: 'row', }]}>


                                                    <View style={{ width: '80%' }}>
                                                        <Text style={[styles.calenderTextCss]}>{this.state.Last_date_register}</Text>
                                                    </View>
                                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                                        <TouchableOpacity onPress={this.showLastDateTimeEndPicker}>
                                                            <Image source={require('../../../../images/calendar.png')}
                                                                style={{ height: 20, width: 20, marginRight: 10 }}
                                                                resizeMode="contain" />
                                                        </TouchableOpacity>
                                                    </View>

                                                    <DateTimePicker
                                                        onDateChange={this.setDate}
                                                        isVisible={this.state.Last_date_Picker}
                                                        onConfirm={this.handleLastDatePicked}
                                                        onCancel={this.hideLastDateTimEndPicker}
                                                        minimumDate={this.state.endminimumDate}
                                                    // minimumDate={this.minimumDate}
                                                    />

                                                </View>
<<<<<<< HEAD
                                                {/* <Text style={styles.Text_Style_Label}>First Date to Register</Text>
                                                <TouchableOpacity onPress={this.showPostDateTimeEndPicker}>
                                                    <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, styles.heightCalender, { flexDirection: 'row' }]}>

                                                        <View style={{ width: '80%' }}>
                                                            <Text style={[styles.calenderTextCss]}>{this.state.Post_date_register}</Text>
                                                        </View>
                                                        <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                                            <TouchableOpacity onPress={this.showPostDateTimeEndPicker}>
                                                                <Image source={require('../../../../images/calendar.png')}
                                                                    style={{ height: 20, width: 20, marginRight: 10 }}
                                                                    resizeMode="contain" />
                                                            </TouchableOpacity>
                                                        </View>

                                                        <DateTimePicker
                                                            // onDateChange={this.setDate}
                                                            isVisible={this.state.Post_date_Picker}
                                                            onConfirm={this.handlePostDatePicked}
                                                            onCancel={this.hidePostDateTimEndPicker}
                                                            minimumDate={this.state.chosenDate}
                                                        // minimumDate={this.minimumDate}
                                                        />

                                                    </View>
                                                </TouchableOpacity> */}
                                            </View>

                                            {/* <View style={{ width: "49%" }}> */}
                                                
                                                {/* <Text style={styles.Text_Style_Label}>Last Date to Register</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, styles.heightCalender, { flexDirection: 'row', }]}>


                                                    <View style={{ width: '80%' }}>
                                                        <Text style={[styles.calenderTextCss]}>{this.state.Last_date_register}</Text>
                                                    </View>
                                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                                        <TouchableOpacity onPress={this.showLastDateTimeEndPicker}>
                                                            <Image source={require('../../../../images/calendar.png')}
                                                                style={{ height: 20, width: 20, marginRight: 10 }}
                                                                resizeMode="contain" />
                                                        </TouchableOpacity>
                                                    </View>

                                                    <DateTimePicker
                                                        onDateChange={this.setDate}
                                                        isVisible={this.state.Last_date_Picker}
                                                        onConfirm={this.handleLastDatePicked}
                                                        onCancel={this.hideLastDateTimEndPicker}
                                                        minimumDate={this.state.endminimumDate}
                                                    // minimumDate={this.minimumDate}
                                                    />

                                                </View> */}
                                            {/* </View> */}





                                        </View>


                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "40%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Bankroll</Text>
                                                <View
                                                    style={[
                                                        styles.Input_Containers,
                                                        styles.inputPadding,
=======
                                               
                                            </View>


                                         



                                        </View>


                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                           


                                            <View style={{ width: "100%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Entry Fee</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, { flexDirection: 'row', }]}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginLeft: 3 }} />
                                                    </View>
                                                    <TextInput
                                                        placeholder=' Enter Entry Fee'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ BucksAmount: text })}
                                                        clearTextOnFocus={true}
                                                        keyboardType={'numeric'}
                                                        returnKeyType='done'
                                                        style={[styles.Input_TextStyles, { width: '95%' }]}
                                                    />
                                                </View>
                                            </View>



                                        </View>



                                        {/* <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "100%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Winners Receive</Text>
                                                <View style={[styles.Input_Containers, { backgroundColor: '', alignContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }]}>
                                                    <RadioForm
                                                        // radio_props={[{ label: 'Real Money' + '    ', value: 'Real Money' },{ label: 'UDDA Bucks' + '    ', value: 'UDDA Bucks' },{ label: 'Swag' + '    ', value: 'Swag' }]}
                                                        radio_props={[{ label: 'UDDA Bucks' + '    ', value: 'udda_bucks' }]}
                                                        initial={0}
                                                        formHorizontal={false}
                                                        labelHorizontal={true}
                                                        buttonColor={'#ACACAC'}
                                                        buttonSize={6}
                                                        buttonOuterSize={19}
                                                        selectedButtonColor={'#68bcbc'}
                                                        buttonWrapStyle={{ marginBottom: 10 }}
                                                        labelWrapStyle={{ marginBottom: 10 }}
                                                        // buttonStyle={{marginTop:5,borderWidth:50}}
                                                        labelStyle={{ opacity: 1, color: '#222', fontSize: hp(2.2), fontFamily: 'Montserrat-Semibold', flexWrap: 'wrap' }}
                                                        animation={false}
                                                        disabled={false}
                                                        onPress={(value) => { this.setState({ Wining_type: value }) }}
                                                    />
                                                </View>
                                            </View>
                                            </View> */}



                                        <View style={styles.ThirdContainers}>
                                            <Text style={styles.Text_Style_Label}>Prize Payout(s)*</Text>
                                            <Text style={styles.Text_Style_Label}>*Prize Pool Based on Number of Entries</Text>
                                            <View
                                                style={[
                                                    styles.Input_Containers,
                                                    styles.inputPadding,
                                                    {
                                                        justifyContent: "center",
                                                        alignContent: "center",
                                                        alignItems: "center",
                                                        paddingBottom: 0,
                                                        height: hp(8.1),
                                                    },
                                                ]}
                                            >
                                                <Dropdown
                                                    dropdownOffset={{ top: 0, left: 0 }}
                                                    dropdownMargins={{ min: 0, max: 0 }}
                                                    dropdownPosition={-2.1}
                                                    containerStyle={{
                                                        backgroundColor: "#F4F4F4",
                                                        borderBottomWidth: 0,
                                                        justifyContent: "center",
                                                        width: "100%",
                                                    }}
                                                    inputContainerStyle={{
                                                        borderBottomColor: "transparent",
                                                        marginLeft: "2%",
                                                    }}
                                                    itemTextStyle={[
                                                        { fontFamily: "Montserrat-Bold", fontSize: hp(2.3) },
                                                    ]}
                                                    data={data1}
                                                    onChangeText={value => this.onChange_price_type(value)}

                                                    value={this.state.prize_type}
                                                />

                                            </View>
                                        </View>



                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                           
                                            <View style={{ width: "100%" }}>
                                                <Text style={[styles.Text_Style_Label,{width:'85%',flexWrap:'wrap'}]}>Minimum Picks Per</Text>
                                                <View
                                                    style={[
                                                        styles.Input_Containers,

>>>>>>> main
                                                        {
                                                            justifyContent: "center",
                                                            alignContent: "center",
                                                            alignItems: "center",
                                                            paddingBottom: 0,
                                                            height: hp(8.1),
<<<<<<< HEAD
=======

>>>>>>> main
                                                        },
                                                    ]}
                                                >
                                                    <Dropdown
                                                        dropdownOffset={{ top: 0, left: 0 }}
                                                        dropdownMargins={{ min: 0, max: 0 }}
<<<<<<< HEAD
                                                        dropdownPosition={-2.2}
=======
                                                        dropdownPosition={-4.2}
>>>>>>> main
                                                        containerStyle={{
                                                            backgroundColor: "#F4F4F4",
                                                            borderBottomWidth: 0,
                                                            justifyContent: "center",
                                                            width: "100%",
<<<<<<< HEAD
=======

>>>>>>> main
                                                        }}
                                                        inputContainerStyle={{
                                                            borderBottomColor: "transparent",
                                                            marginLeft: "2%",
                                                        }}
                                                        itemTextStyle={[
                                                            { fontFamily: "Montserrat-Bold", fontSize: hp(2.3) },
                                                        ]}
<<<<<<< HEAD
                                                        data={this.state.Bankroll_data}
                                                        onChangeText={value => this.onChangeBankroll(value)}
                                                        fontSize={hp(2.3)}
                                                        value={this.state.Bankroll_value}
=======
                                                        data={this.state.Number_picks}
                                                        onChangeText={value => this.onChangeNumber_picked(value)}
                                                        fontSize={hp(2.3)}
>>>>>>> main
                                                    />
                                                </View>


                                            </View>
<<<<<<< HEAD
                                            <View style={{ width: "58%" }}>
                                                <Text style={styles.Text_Style_Label}>Winner Declared By</Text>
                                                <View
                                                    style={[
                                                        styles.Input_Containers,
                                                        styles.inputPadding,
                                                        {
                                                            justifyContent: "center",
                                                            alignContent: "center",
                                                            alignItems: "center",
                                                            paddingBottom: 0,
                                                            height: hp(8.1),
                                                        },
=======
                                        </View>



                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "49%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Minimum Picks</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                    <TextInput
                                                        placeholder='Minimum Picks'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ Minimum_picks: text })}
                                                        keyboardType={'numeric'}
                                                        clearTextOnFocus={true}
                                                        returnKeyType='done'
                                                        style={styles.Input_TextStyles}

                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: "49%" }}>
                                                <Text style={styles.Text_Style_Label}>Maximum Picks</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                    <TextInput
                                                        placeholder='Maximum Picks'
                                                        placeholderTextColor={'#888888'}
                                                        keyboardType={'numeric'}
                                                        onChangeText={(text) => this.setState({ Maximum_picks: text })}
                                                        clearTextOnFocus={true}
                                                        returnKeyType='done'
                                                        style={styles.Input_TextStyles}

                                                    />
                                                </View>
                                            </View>
                                        </View>



                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "100%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Bankroll</Text>
                                                <View
                                                    style={[
                                                        styles.Input_Containers,
                                                        styles.inputPadding,
                                                        {
                                                            justifyContent: "center",
                                                            alignContent: "center",
                                                            alignItems: "center",
                                                            paddingBottom: 0,
                                                            height: hp(8.1),
                                                        },
>>>>>>> main
                                                    ]}
                                                >
                                                    <Dropdown
                                                        dropdownOffset={{ top: 0, left: 0 }}
                                                        dropdownMargins={{ min: 0, max: 0 }}
                                                        dropdownPosition={-2.2}
                                                        containerStyle={{
                                                            backgroundColor: "#F4F4F4",
                                                            borderBottomWidth: 0,
                                                            justifyContent: "center",
                                                            width: "100%",
                                                        }}
                                                        inputContainerStyle={{
                                                            borderBottomColor: "transparent",
                                                            marginLeft: "2%",
                                                        }}
                                                        itemTextStyle={[
                                                            { fontFamily: "Montserrat-Bold", fontSize: hp(2.3) },
                                                        ]}
<<<<<<< HEAD
                                                        data={this.state.Bankroll_value == 'No' ? [{ value: 'correct_pick', label: 'All Corect Pick' }, { value: 'most_wins', label: 'Most Wins' }] : [{ value: 'highest_bankroll', label: 'Highest Bankroll' }]}
                                                        onChangeText={value => this.setState({ Winner_declared: value })}
                                                        fontSize={hp(2.3)}
                                                        value={this.state.Winner_declared}
                                                    />
                                                </View>

                                            </View>
                                        </View>



                                        <View style={styles.ThirdContainers}>
                                            <Text style={styles.Text_Style_Label}>Bets/Lines Permitted (Choose 1,2 or 3)</Text>
                                            <View style={[styles.Input_Containers, { padding: 0, backgroundColor: '' }]}>
                                                {this.state.Bankroll_value == 'Yes' ?
                                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                                        <View>
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Money Line'
                                                                checked={this.state.Check_box1}
                                                                onPress={() => { this.setState({ Check_box1: !this.state.Check_box1 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                fontFamily={'Montserrat-SemiBold'}

                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />

                                                        </View>
                                                        <View >
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Total (Over/Under)'
                                                                checked={this.state.Check_box2}
                                                                onPress={() => { this.setState({ Check_box2: !this.state.Check_box2 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />
                                                        </View>
                                                        <View >
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Point Spread'
                                                                checked={this.state.Check_box3}
                                                                onPress={() => { this.setState({ Check_box3: !this.state.Check_box3 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />
                                                        </View>

                                                    </View> :
                                                    <View style={{ flexDirection: 'row' , flexWrap: 'wrap'}}>
                                                        <View >
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Total (Over/Under)'
                                                                checked={this.state.Check_box2}
                                                                onPress={() => { this.setState({ Check_box2: !this.state.Check_box2 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />
                                                        </View>
                                                        <View >
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Point Spread'
                                                                checked={this.state.Check_box3}
                                                                onPress={() => { this.setState({ Check_box3: !this.state.Check_box3 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />
                                                        </View>

                                                    </View>
                                                }


                                            </View>
                                        </View>

                                        {this.state.Bankroll_value == 'Yes' && <View>
                                            <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                                <View style={{ width: "49%", marginRight: "2%" }}>
=======
                                                        data={this.state.Bankroll_data}
                                                        onChangeText={value => this.onChangeBankroll(value)}
                                                        fontSize={hp(2.3)}
                                                        value={this.state.Bankroll_value}
                                                    />
                                                </View>


                                            </View>
                                            </View>



                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                           
                                            <View style={{ width: "100%" }}>
                                                <Text style={styles.Text_Style_Label}>Winner Declared By</Text>
                                                <View
                                                    style={[
                                                        styles.Input_Containers,
                                                        styles.inputPadding,
                                                        {
                                                            justifyContent: "center",
                                                            alignContent: "center",
                                                            alignItems: "center",
                                                            paddingBottom: 0,
                                                            height: hp(8.1),
                                                        },
                                                    ]}
                                                >
                                                    <Dropdown
                                                        dropdownOffset={{ top: 0, left: 0 }}
                                                        dropdownMargins={{ min: 0, max: 0 }}
                                                        dropdownPosition={-2.2}
                                                        containerStyle={{
                                                            backgroundColor: "#F4F4F4",
                                                            borderBottomWidth: 0,
                                                            justifyContent: "center",
                                                            width: "100%",
                                                        }}
                                                        inputContainerStyle={{
                                                            borderBottomColor: "transparent",
                                                            marginLeft: "2%",
                                                        }}
                                                        itemTextStyle={[
                                                            { fontFamily: "Montserrat-Bold", fontSize: hp(2.3) },
                                                        ]}
                                                        data={this.state.Bankroll_value == 'No' ? [{ value: 'correct_pick', label: 'All Correct Picks' }, { value: 'most_wins', label: 'Most Wins' }] : [{ value: 'highest_bankroll', label: 'Highest Bankroll' }]}
                                                        onChangeText={value => this.setState({ Winner_declared: value })}
                                                        fontSize={hp(2.3)}
                                                        value={this.state.Winner_declared}
                                                    />
                                                </View>

                                            </View>
                                        </View>




                                        {this.state.Bankroll_value == 'Yes' && <View>
                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                                <View style={{ width: "100%", marginRight: "2%" }}>
>>>>>>> main
                                                    <Text style={styles.Text_Style_Label}>Bankroll Amount</Text>
                                                    <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                        <TextInput
                                                            placeholder='Bankroll Amount'
                                                            placeholderTextColor={'#888888'}
                                                            onChangeText={(text) => this.setState({ Bankrol_amount: text })}
                                                            keyboardType={'numeric'}
                                                            clearTextOnFocus={true}
                                                            returnKeyType='done'
                                                            style={styles.Input_TextStyles}

                                                        />
                                                    </View>
                                                </View>
<<<<<<< HEAD
                                                <View style={{ width: "49%" }}>
=======
                                                </View>
                                            <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                               
                                                <View style={{ width: "100%" }}>
>>>>>>> main
                                                    <Text style={styles.Text_Style_Label}> Bet Entire Bankroll</Text>
                                                    <View style={[styles.Input_Container, { backgroundColor: '', alignContent: 'center', flexDirection: 'row' }]}>
                                                        <RadioForm
                                                            radio_props={[{ label: 'Yes' + '    ', value: 'yes' }, { label: 'No' + '    ', value: 'no' }]}
                                                            initial={1}
                                                            formHorizontal={true}
                                                            labelHorizontal={true}
                                                            buttonColor={'#ACACAC'}
                                                            buttonSize={6}
                                                            buttonOuterSize={19}
                                                            selectedButtonColor={'#68bcbc'}
                                                            buttonWrapStyle={{ marginBottom: 10 }}
                                                            labelWrapStyle={{ marginBottom: 10 }}
                                                            // buttonStyle={{marginTop:5,borderWidth:50}}
                                                            labelStyle={{ opacity: 1, color: '#222', fontSize: hp(2.2), fontFamily: 'Montserrat-Semibold', }}
                                                            animation={false}
                                                            disabled={false}
                                                            onPress={(value) => { this.setState({ Entire_bankroll: value }), this.setState({ MaxBetAmount: '' }) }}
                                                        />

                                                    </View>

                                                </View>
                                            </View>
                                            <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                                <View style={{ width: "49%", marginRight: "2%" }}>
                                                    <Text style={styles.Text_Style_Label}>Min Bet Amount</Text>
                                                    <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, { flexDirection: 'row', }]}>

                                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                            <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginLeft: 3 }} />
                                                        </View>
                                                        <TextInput
                                                            placeholder='Min Bet Amount'
                                                            placeholderTextColor={'#888888'}
                                                            onChangeText={(text) => this.setState({ MinBetAmount: text })}
                                                            keyboardType={'numeric'}
                                                            clearTextOnFocus={true}
                                                            returnKeyType='done'
                                                            style={[styles.Input_TextStyles, { width: '95%' }]}

                                                        />

                                                    </View>
                                                </View>
                                                <View style={{ width: "49%" }}>
                                                    <Text style={styles.Text_Style_Label}>Max Bet Amount</Text>
                                                    <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, { backgroundColor: this.state.Entire_bankroll == 'yes' ? '#9e9a9a' : '#F4F4F4', flexDirection: 'row', }]}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginLeft: 3 }} />
                                                    </View>
                                                    <TextInput
                                                        placeholder='Max Bet Amount'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ MaxBetAmount: text })}
                                                        clearTextOnFocus={true}
                                                        keyboardType={'numeric'}
                                                        returnKeyType='done'
                                                        value={this.state.MaxBetAmount}
                                                        style={[styles.Input_TextStyles, { width: '95%' }]}
                                                        editable={this.state.Entire_bankroll == 'no' ? true : false}
                                                    />
                                                       

                                                    </View>
                                                </View>
                                            </View>


                                        </View>}


<<<<<<< HEAD
=======
                                       

                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "100%", marginRight: "2%" }}>
                                                <Text style={[styles.Text_Style_Label,{width:'85%',flexWrap:'wrap'}]}>Maximum Number of User</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                    <TextInput
                                                        placeholder='Maximum Number of User'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ Max_no_user: text })}
                                                        clearTextOnFocus={true}
                                                        keyboardType={'numeric'}
                                                        returnKeyType='done'
                                                        style={styles.Input_TextStyles}

                                                    />
                                                </View>
                                            </View>
                                           
                                        </View>







                                        {/* <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "100%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Entry Fee</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, { flexDirection: 'row', }]}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginLeft: 3 }} />
                                                    </View>
                                                    <TextInput
                                                        placeholder=' Enter Entry Fee'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ BucksAmount: text })}
                                                        clearTextOnFocus={true}
                                                        keyboardType={'numeric'}
                                                        returnKeyType='done'
                                                        style={[styles.Input_TextStyles, { width: '95%' }]}
                                                    />
                                                </View>
                                            </View>
                                        </View> */}


>>>>>>> main




<<<<<<< HEAD
=======
                               
>>>>>>> main




<<<<<<< HEAD
=======
                                       
>>>>>>> main





<<<<<<< HEAD






                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "49%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Winning Type</Text>
                                                <View style={[styles.Input_Containers, { backgroundColor: '', alignContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }]}>
                                                    <RadioForm
                                                        // radio_props={[{ label: 'Real Money' + '    ', value: 'Real Money' },{ label: 'UDDA Bucks' + '    ', value: 'UDDA Bucks' },{ label: 'Swag' + '    ', value: 'Swag' }]}
                                                        radio_props={[{ label: 'UDDA Bucks' + '    ', value: 'udda_bucks' }]}
                                                        initial={0}
                                                        formHorizontal={false}
                                                        labelHorizontal={true}
                                                        buttonColor={'#ACACAC'}
                                                        buttonSize={6}
                                                        buttonOuterSize={19}
                                                        selectedButtonColor={'#68bcbc'}
                                                        buttonWrapStyle={{ marginBottom: 10 }}
                                                        labelWrapStyle={{ marginBottom: 10 }}
                                                        // buttonStyle={{marginTop:5,borderWidth:50}}
                                                        labelStyle={{ opacity: 1, color: '#222', fontSize: hp(2.2), fontFamily: 'Montserrat-Semibold', flexWrap: 'wrap' }}
                                                        animation={false}
                                                        disabled={false}
                                                        onPress={(value) => { this.setState({ Wining_type: value }) }}
                                                    />
                                                </View>
                                            </View>
                                            {this.state.Wining_type == 'Swag' ? <View style={{ width: "49%" }}>
=======
                                       


                                     


                                        <View style={styles.ThirdContainers}>
                                            <Text style={styles.Text_Style_Label}>Bets/Lines Permitted (Choose 1,2 or 3)</Text>
                                            <View style={[styles.Input_Containers, { padding: 0, backgroundColor: '' }]}>
                                                {this.state.Bankroll_value == 'Yes' ?
                                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                                        <View>
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Money Line'
                                                                checked={this.state.Check_box1}
                                                                onPress={() => { this.setState({ Check_box1: !this.state.Check_box1 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                fontFamily={'Montserrat-SemiBold'}

                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />

                                                        </View>
                                                        <View >
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Total (Over/Under)'
                                                                checked={this.state.Check_box2}
                                                                onPress={() => { this.setState({ Check_box2: !this.state.Check_box2 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />
                                                        </View>
                                                        <View >
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Point Spread'
                                                                checked={this.state.Check_box3}
                                                                onPress={() => { this.setState({ Check_box3: !this.state.Check_box3 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />
                                                        </View>

                                                    </View> :
                                                    <View style={{ flexDirection: 'row' , flexWrap: 'wrap'}}>
                                                        <View >
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Total (Over/Under)'
                                                                checked={this.state.Check_box2}
                                                                onPress={() => { this.setState({ Check_box2: !this.state.Check_box2 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />
                                                        </View>
                                                        <View >
                                                            <CheckBox
                                                                center
                                                                containerStyle={{ padding: 0, backgroundColor: '', margin: 0, marginLeft: 0, borderWidth: 0 }}
                                                                title='Point Spread'
                                                                checked={this.state.Check_box3}
                                                                onPress={() => { this.setState({ Check_box3: !this.state.Check_box3 }) }}
                                                                checkedColor='#68bcbc'
                                                                uncheckedColor='black'
                                                                textStyle={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.3), }}
                                                            />
                                                        </View>

                                                    </View>
                                                }


                                            </View>
                                        </View>

                                       





















                                        {/* <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                           
                                            {this.state.Wining_type == 'Swag' ? <View style={{ width: "100%" }}>
>>>>>>> main
                                                <Text style={styles.Text_Style_Label}>SWAG Product</Text>
                                                <View style={[styles.Input_Container, { alignContent: 'center', padding: 5 }]}>
                                                    <Dropdown
                                                        dropdownOffset={{ top: 0, left: 0 }}
                                                        dropdownMargins={{ min: 0, max: 0 }}
                                                        dropdownPosition={-2.2}
                                                        containerStyle={{
                                                            backgroundColor: "#F4F4F4",
                                                            borderBottomWidth: 0,
                                                            justifyContent: "center",
                                                            width: "100%",
                                                        }}
                                                        inputContainerStyle={{
                                                            borderBottomColor: "transparent",
                                                            marginLeft: "2%",
                                                        }}
                                                        itemTextStyle={[
                                                            { fontFamily: "Montserrat-Bold", fontSize: hp(2.3) },
                                                        ]}
                                                        data={[{ value: 'Hat' }, { value: 'Chair' }]}
                                                        onChangeText={value => this.setState({ Wining_amount: value })}
                                                        // onChangeText={value => this.onChange_price_type(value)}
                                                        fontSize={hp(1.6)}
                                                        value={''}
                                                    />

                                                </View>
<<<<<<< HEAD
                                            </View> : <View style={{ width: "49%" }}>
=======
                                            </View> : <View style={{ width: "100%" }}>
>>>>>>> main
                                                    <Text style={styles.Text_Style_Label}>Guaranteed Winning Amount</Text>
                                                    <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                        <TextInput
                                                            placeholder='Guaranteed Amount'
<<<<<<< HEAD
=======
                                                            value={this.state.Wining_amount}
>>>>>>> main
                                                            placeholderTextColor={'#888888'}
                                                            onChangeText={(text) => this.setState({ Wining_amount: text })}
                                                            clearTextOnFocus={true}
                                                            returnKeyType='done'
                                                            keyboardType={'numeric'}
                                                            style={styles.Input_TextStyles}

                                                        />
                                                    </View>
                                                </View>}
<<<<<<< HEAD
                                        </View>

                                        <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "49%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Minimum Picks</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                    <TextInput
                                                        placeholder='Minimum Picks'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ Minimum_picks: text })}
                                                        keyboardType={'numeric'}
                                                        clearTextOnFocus={true}
                                                        returnKeyType='done'
                                                        style={styles.Input_TextStyles}

                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: "49%" }}>
                                                <Text style={styles.Text_Style_Label}>Maximum Picks</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                    <TextInput
                                                        placeholder='Maximum Picks'
                                                        placeholderTextColor={'#888888'}
                                                        keyboardType={'numeric'}
                                                        onChangeText={(text) => this.setState({ Maximum_picks: text })}
                                                        clearTextOnFocus={true}
                                                        returnKeyType='done'
                                                        style={styles.Input_TextStyles}

                                                    />
                                                </View>
                                            </View>
                                        </View>


                                        <View style={styles.ThirdContainers}>
                                            <Text style={styles.Text_Style_Label}>Prize Type</Text>
                                            <View
                                                style={[
                                                    styles.Input_Containers,
                                                    styles.inputPadding,
                                                    {
                                                        justifyContent: "center",
                                                        alignContent: "center",
                                                        alignItems: "center",
                                                        paddingBottom: 0,
                                                        height: hp(8.1),
                                                    },
                                                ]}
                                            >
                                                <Dropdown
                                                    dropdownOffset={{ top: 0, left: 0 }}
                                                    dropdownMargins={{ min: 0, max: 0 }}
                                                    dropdownPosition={-2.1}
                                                    containerStyle={{
                                                        backgroundColor: "#F4F4F4",
                                                        borderBottomWidth: 0,
                                                        justifyContent: "center",
                                                        width: "100%",
                                                    }}
                                                    inputContainerStyle={{
                                                        borderBottomColor: "transparent",
                                                        marginLeft: "2%",
                                                    }}
                                                    itemTextStyle={[
                                                        { fontFamily: "Montserrat-Bold", fontSize: hp(2.3) },
                                                    ]}
                                                    data={data1}
                                                    onChangeText={value => this.onChange_price_type(value)}

                                                    value={''}
                                                />

                                            </View>
                                        </View>
                                        {this.state.Bankroll_value == 'No' ? null : <View style={{ width: '100%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                                <View style={{ width: "49%", marginRight: "2%" }}>
=======
                                        </View> */}

                                       


                                     
                                        {this.state.Bankroll_value == 'No' ? null : <View style={{ width: '100%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                                <View style={{ width: "100%", marginRight: "2%" }}>
>>>>>>> main
                                                    <Text style={styles.Text_Style_Label}>Allow Re-entry</Text>
                                                    <View style={[styles.Input_Containers, { backgroundColor: '', alignContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }]}>
                                                        <RadioForm
                                                            radio_props={[{ label: 'Yes' + '    ', value: 'yes' }, { label: 'No' + '    ', value: 'no' }]}
                                                            //initial={itemindex}
                                                            formHorizontal={true}
                                                            labelHorizontal={true}
                                                            buttonColor={'#ACACAC'}
                                                            buttonSize={6}
                                                            buttonOuterSize={19}
                                                            selectedButtonColor={'#68bcbc'}
                                                            buttonWrapStyle={{ marginBottom: 10 }}
                                                            labelWrapStyle={{ marginBottom: 10 }}
                                                            // buttonStyle={{marginTop:5,borderWidth:50}}
                                                            labelStyle={{ opacity: 1, color: '#222', fontSize: hp(2.2), fontFamily: 'Montserrat-Semibold', flexWrap: 'wrap' }}
                                                            animation={false}
                                                            disabled={false}
                                                            //onPress={(value) => { this.setState({ Rentry_value: value }) }}
                                                            onPress={(value) => { this.changereentryvalue(value) }}
                                                        // onPress={(value) => { this.setState({ Rentry_value: value }) ,value=='no'? this.setState({No_of_entry_boxes:[]}):null}}
                                                        />

                                                    </View>
                                                </View>
<<<<<<< HEAD
                                                <View style={{ width: "49%" }}>
=======
                                                {/* <View style={{ width: "49%" }}>
>>>>>>> main
                                                    <Text style={styles.Text_Style_Label}>Currency Type</Text>
                                                    <View
                                                        style={[
                                                            styles.Input_Containers,
                                                            styles.inputPadding,
                                                            {
                                                                justifyContent: "center",
                                                                alignContent: "center",
                                                                alignItems: "center",
                                                                paddingBottom: 0,
                                                                height: hp(8.1),
                                                            },
                                                        ]}
                                                    >
                                                        <Dropdown
                                                            dropdownOffset={{ top: 0, left: 0 }}
                                                            dropdownMargins={{ min: 0, max: 0 }}
                                                            dropdownPosition={-2.2}
                                                            containerStyle={{
                                                                backgroundColor: "#F4F4F4",
                                                                borderBottomWidth: 0,
                                                                justifyContent: "center",
                                                                width: "100%",
                                                            }}
                                                            inputContainerStyle={{
                                                                borderBottomColor: "transparent",
                                                                marginLeft: "2%",
                                                            }}
                                                            itemTextStyle={[
                                                                { fontFamily: "Montserrat-Bold", fontSize: hp(2.3) },
                                                            ]}
                                                            data={[{ value: 'UDDA Bucks' }]}
                                                            onChangeText={value => this.onChange_currency_type(value)}
                                                           
                                                            value={''}
                                                        />

                                                    </View>
<<<<<<< HEAD
                                                </View>
=======
                                                </View> */}
>>>>>>> main
                                            </View>

                                            <View style={[styles.ThirdContainers, { flex: 1, flexDirection: "row" }]}>
                                            <View style={{ width: "49%", marginRight: "2%" }}>
                                                <Text style={styles.Text_Style_Label}>Number of Re-Entries</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder,{ backgroundColor: this.state.Rentry_value == 'no' ? '#9e9a9a' : '#F4F4F4' }]}>
                                                    <TextInput
                                                        placeholder='Number of Re-Entries'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ No_of_reentry: text })}
                                                        value={this.state.No_of_reentry}
                                                        keyboardType={'numeric'}
                                                        clearTextOnFocus={true}
                                                        returnKeyType='done'
                                                        style={styles.Input_TextStyles}
                                                        onEndEditing={() => {
                                                            this.Noofreentry();
                                                        }}
                                                        editable={this.state.Rentry_value == 'no' ? false : true}

                                                    />
                                                </View>
                                            </View>
                                            <View style={{ width: "49%" }}>
                                                <Text style={[styles.Text_Style_Label,{width:'70%'}]}>Cost for Re-Entry</Text>
                                                <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder, { backgroundColor: this.state.Rentry_value == 'no' ? '#9e9a9a' : '#F4F4F4' }]}>
                                                    <TextInput
                                                        placeholder='Cost for Re-Entry'
                                                        placeholderTextColor={'#888888'}
                                                        onChangeText={(text) => this.setState({ Threshold_amount: text })}
                                                        keyboardType={'numeric'}
                                                        clearTextOnFocus={true}
                                                        returnKeyType='done'
                                                        style={styles.Input_TextStyles}
                                                        editable={this.state.Rentry_value == 'no' ? false : true}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                           


                                            {this.state.No_of_entry_boxes.map((item, index) => {
                                               
                                                return (
                                                    <View style={[styles.ThirdContainers, {   }]}>
                                                         {/* <View style={this.getTextStyle(index)}> */}
<<<<<<< HEAD
                                                        
=======
                                                       
>>>>>>> main
                                                        <Text style={styles.Text_Style_Label}>{'Re-Entry Amount ' + (index + 1)}</Text>
                                                        <View style={[styles.Input_Containers, styles.inputPadding, styles.textboxborder]}>
                                                            <TextInput
                                                                value={this.state.No_of_entry_boxes[index]}
                                                                onChangeText={(text) => this.ChangeTextEntryBox(text, index)}
                                                                clearTextOnFocus={true}
                                                                keyboardType={'numeric'}
                                                                returnKeyType='done'
                                                                style={styles.Input_TextStyles}

                                                            />
<<<<<<< HEAD
                                                      
=======
                                                     
>>>>>>> main
                                                        </View>
                                                    </View>
                                                )
                                            })}



                                        </View>}





                                        {/* <View style={styles.ThirdContainers}>
                                            <View style={{ flexDirection: 'row', marginTop: 10,  }}>

                                                <View style={{ width: '42%' }}>
                                                    <Text style={[styles.Text_Style_toggle_Label, { color: this.state.privateSwitchAccepted == true ? '#888888' : 'black' }]}>Invitees can invite friends</Text>
                                                </View>
                                                <View style={{ width: '12%', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableWithoutFeedback onPress={() => { this.privateSwitchValueChanged() }}>
                                                        <Image source={this.state.privateSwitchAccepted == true ? require('../../../../images/toggle_on_G.png') : require('../../../../images/toggle_off.png')}
                                                            style={{ height: 20, width: 40 }}
                                                            resizeMode="contain"></Image>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                <View style={{ width: '42%' }}>
                                                    <Text style={[styles.Text_Style_toggle_Label, { color: this.state.privateSwitchAccepted == true ? 'black' : '#888888', alignSelf: 'flex-end' }]}>Only Creator can invite</Text>
                                                </View>
                                            </View>
                                        </View> */}



                <View style={styles.toggleButton}>
                  <View style={{width:'40%',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end',flexDirection:'row'}}>
                  <TouchableOpacity onPress={() => { AlertUtil.show('Invitees can invite friends') }} >
                  <Text style={[styles.toggleText,{color:this.state.privateSwitchAccepted!=true?"#009c9d":'#c3c3c3',}] }>Public</Text>
                  </TouchableOpacity>
                  <View style={[styles.table_title_info_container,{marginBottom:5,marginRight:10}]}>
                  <TouchableOpacity onPress={() => { AlertUtil.show('Invitees can invite friends') }} >
                      <Text style={styles.table_title_info_text}> i </Text>
                      </TouchableOpacity>
                    </View>
<<<<<<< HEAD
                    
=======
                   
>>>>>>> main
                  </View>

              <ToggleSwitch
                isOn={this.state.privateSwitchAccepted}
                onColor="#69bbbb"
                offColor="#69bbbb"
              //  label="Example label"
                labelStyle={{ color: "#222",  fontFamily: 'Montserrat-Bold', fontSize: hp(2.1) }}
                size="small"
                onToggle={isOn =>this.privateSwitchValueChanged()}
                />
              <View style={{width:'40%',flexDirection:'row'}}>
              <TouchableOpacity onPress={() => { AlertUtil.show('Only Creator can invite') }} >
              <Text style={[styles.toggleText,{color:this.state.privateSwitchAccepted?"#009c9d":'#c3c3c3',}] }>&nbsp;Private</Text>
             </TouchableOpacity>
              <View style={[styles.table_title_info_container,{marginTop:5}]}>
              <TouchableOpacity onPress={() => { AlertUtil.show('Only Creator can invite') }} >
                      <Text style={styles.table_title_info_text}> i </Text>
                      </TouchableOpacity>
                    </View>
<<<<<<< HEAD
                    
=======
                   
>>>>>>> main
              </View>
              </View>



                                    </View>
                                </ScrollView>

                                <View style={{  justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableWithoutFeedback
                                            disabled={this.state.create_contest_btn}
                                            // onPress={() => { this.createprivateBet() }}
                                            onPress={() => { !this.state.create_contest_btn && this.checkValidation()}}
                                        >
                                            <View style={{ height:hp(8), backgroundColor: '#68bcbc', borderWidth: 2, borderRadius: 3, borderColor: 'white', width: '95%' , justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: hp(3.8), textAlign: 'center' }}>CREATE CONTEST</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        {/* <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 12, marginTop: 10 }}>Create this Contest and Invite Friends</Text> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View>


            </Container>
        );
    }

}

const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
    error: state.serviceReducer.error,
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners,

    getProfileRequestStatus: state.serviceReducer.requestStatus,
    getProfileResponse: state.serviceReducer.response,
    getProfileError: state.serviceReducer.error,

    createContestRequestStatus: state.serviceReducer.requestStatus,
    CreateContestResponse: state.serviceReducer.response as CreateContestResponse,
    createContestError: state.serviceReducer.error,


})

export default connect(mapStateToProps)(G_PrivateContest);