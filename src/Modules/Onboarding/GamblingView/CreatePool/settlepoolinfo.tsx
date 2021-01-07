import React, { createRef, useState } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback,SafeAreaView, TouchableOpacity, AsyncStorage, TextInput, TouchableHighlight, Animated, Keyboard, Dimensions, UIManager, Share, Modal } from "react-native";

import styles from './settlepoolinfostyles';
import MasterCss from '../Mastercss'
import Container from '../../../../Components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import AlertUtil from "../../../../Util/AlertUtil";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import Application from "../../../../Entities/Application";
import ProgressLoader from 'rn-progress-loader';
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { Dialog } from 'react-native-simple-dialogs';
import BigButton from "../../../../Components/Button/BigButton";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from "../../../../Services/Core/ServiceURI"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from "react-native-material-dropdown"
import ToggleSwitch from 'toggle-switch-react-native'
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment';

import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";

import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { connect } from 'react-redux';
import { UDDAError } from "../../../../Entities";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import ReferralService from "../../../../Services/Referral/ReferralService";
import Icons from 'react-native-vector-icons/MaterialIcons';
import ImageViewer from 'react-native-image-zoom-viewer';

import ImagePicker from "react-native-image-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import Dash from "react-native-dash";
import CircleImage from "../../../../Components/CustomComponents/CircleImage";
import Popover from 'react-native-popover-view';
import PopoverMode from 'react-native-popover-view';
var update = require('immutability-helper');
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
    key: 'somethun',
    page_title: 'CREATE SQUARES',
}

interface G_SettlePoolInfoViewProps extends AppValidationComponentProps {


    serviceKey?: string
    listeners?: any
}

interface G_SettlePoolInfoViewState extends AppValidationComponentState {
    pooldate: any;
    poolanswer: any;
    pooldata: any;
    uploadurl: any
    poollink: any;
    imageurl: any;
    imagebase: any;
    DataList?: any;
    isshow: any;
    loader: any;
    CoveredPlaySwitchAccepted: any;

    ConfirmDialog: any;
    NoData: any;
    shift: any;

    shareDialog: any;
    MessageString: any;
    MessageUrl: any;
    BetPromotionalMsg: any;
    Share_Show_Msg: any;
    dialogVisible: any;
    isDateTimePickerVisible: any;
    minimumDate: any;
    imagezoom: any;
    isSettle: any;
    selectedPoolItem: any;
    result_status: any;
    betDetailData: any;
    BlackDialog: any;
    blackdialogDate: any;
    blackdialogSettleDate: any;
    BlackDialogSettle: any;
    imagezoomqr: any;
    imagezoomqrlink: any;
}

class G_SettlePoolInfoView extends AppValidationComponent<G_SettlePoolInfoViewProps, G_SettlePoolInfoViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    public keyboardDidShowSub: any;
    public keyboardDidHideSub: any;
    public keyBoardType = 'decimal-pad';
    private serviceRequestInProgress = false
    private referralservice = new ReferralService(); //Vijay
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    public touchable;

    constructor(props: G_SettlePoolInfoViewProps) {
        super(props);
        this.touchable = createRef();
        this.state = {
            pooldate: '',
            poolanswer: '',
            pooldata: '',
            imageurl: '',
            uploadurl: '',
            poollink: false,
            imagebase: '',
            DataList: [

            ],
            isshow: true,
            loader: false,
            CoveredPlaySwitchAccepted: false,

            ConfirmDialog: false,
            NoData: '',
            shift: new Animated.Value(0),
            shareDialog: '',
            MessageString: '',
            MessageUrl: '',
            BetPromotionalMsg: '',
            Share_Show_Msg: '',
            dialogVisible: false,
            isDateTimePickerVisible: false,
            minimumDate: new Date(),
            imagezoom: false,
            isSettle: false,
            selectedPoolItem: {},
            result_status: '',
            betDetailData: '',
            BlackDialog: false,
            blackdialogDate: '',
            blackdialogSettleDate: '',
            BlackDialogSettle: false,
            imagezoomqr: false,
            imagezoomqrlink: '',
        };
    }

    async componentDidMount() {
        if (this.props.navigation.state.params) {
            let navigation = this.props.navigation;
            let item = navigation.getParam('item');
            let result_status = navigation.getParam('result_status');
            if (result_status == 0) {
                this.getCreatePoolList(item.custom_pool_id, result_status);
            } else {
                this.customPoolDetail(item.bet_id);
            }

            await this.setState({ selectedPoolItem: item, result_status: result_status });
        }

        console.log(this.props);

    }

    componentWillUnmount() {

        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();


    }


    componentWillMount() {
        //  alert('hi')
        console.log("componentwillmount");
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }

    handleKeyboardDidShow = (event: any) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight + fieldHeight + fieldHeight) || 0;
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

    // ----------------------------------------------- POOL API calling ---------------------------------------

    getCreatePoolList(custom_pool_id: any, result_status: any) {

        this.setState({ loader: true });
        this.setState({ uploadurl: '' });
        this.setState({ poollink: '' });
        this.setState({ imagebase: '' });

        var params: any = {
            //'custom_pool_id': item.custom_pool_id,
            'custom_pool_id': custom_pool_id,
            'result_status': result_status
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        console.log('token', this.authorisationToken);

        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/Custom_PoolGaming/custom_pools_list', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('vreate pool response :   ' + JSON.stringify(responseJson));
                this.setState({ pooldate: '' })
                this.setState({ poolanswer: '' })
                this.setState({ loader: false });
                this.setState({ pooldata: responseJson.data[0].custom_pools });



                console.log('Success openplay' + JSON.stringify(this.state.pooldata));
                // this.setState({ dialogVisible: true });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    // LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }

    customPoolDetail(bet_id: any) {

        this.setState({ loader: true });


        var params: any = {
            //'custom_pool_id': item.custom_pool_id,
            'bet_id': bet_id,

        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        console.log('token', this.authorisationToken);

        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/Custom_PoolGaming/pool_contest_settled_bet_detail', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('vreate pool responsev :   ' + JSON.stringify(responseJson));
                this.setState({ pooldate: '' })
                this.setState({ poolanswer: '' })
                this.setState({ loader: false });
                this.setState({ betDetailData: responseJson.data });



                console.log('betDetailData' + JSON.stringify(this.state.betDetailData));
                // this.setState({ dialogVisible: true });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    // LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }








    // ----------------------------------------------- Methods ---------------------------------------


    shareNow = async () => {

        try {
            var Message = this.state.MessageString + " " + this.state.MessageUrl;
            const result = await Share.share({
                message: Message,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    this.setState({ shareDialog: false });
                    console.log('shared in activity');
                    // shared with activity type of result.activityType
                } else {
                    this.setState({ shareDialog: false });
                    console.log('shared');
                    // shared
                    RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
                }
            } else if (result.action === Share.dismissedAction) {
                this.setState({ shareDialog: false });
                console.log('share  in dismiss');
                // dismissed
                RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
            }

        } catch (error) {
            this.setState({ shareDialog: false });
            console.log('share error in catch ' + JSON.stringify(error));
            //alert(error.message);
            RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
        }

    };

    closeShareDialog() {
        this.setState({ shareDialog: false });
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
        // setTimeout(function () { AlertUtil.show("Bet Placed Successfully") }, 2000)
    }
    onChangeShareMsg(val: any) {
        this.setState({ MessageString: val });
    }
    accountNameTapped() {
        this.props.navigation!.navigate(AppScreens.G_ProfileView);
    }

    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {
       // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
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



    goBacktoSetting() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }
    goBackToPrivateContests() {
        this.props.navigation!.navigate(AppScreens.G_YourPrivateContest);
    }
    /* 
       Image zoom 
    */

    imageZoom(url: any, callback: any) {
        this.setState({ imageurl: url })
        this.setState({ imagezoom: true })

    }
    closeImage = () => {
        this.setState({ imagezoom: false })
    }
    /*
        Select Photo 
    */
    selectPhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                this.setState({ uploadurl: source.uri })
                let data = 'data:image/jpeg;base64,' + response.data
                console.log('basse 64 image : ' + data)
                this.setState({ imagebase: data })




            }
        });
    }

    logiccheck() {
        var regex = "^\s+$"
        if (this.state.pooldata.my_answer_type == '1') {
            // if(this.state.poollink.toString().trim() == '' && this.state.uploadurl=='' || this.state.pooldate=='')
            if (this.state.pooldate == '') {
                alert('Please enter all valid details.')
            } else {
                // alert('false')
                this.publishPool()
            }

        } else {
            // if(this.state.poolanswer.toString().trim()=='' || (this.state.poollink.toString().trim() == '' && this.state.uploadurl==''))
            if (this.state.poolanswer.toString().trim() == '') {
                alert('Please enter all valid details.')
            } else {
                // alert('second false')
                this.publishPool()
            }
        }
    }
    changeanswertext(text: any) {
        let message = [];
        message = this.state.pooldata
        message.my_answer_text = text;

        this.setState({ poolanswer: text })
        // this.setState({pooldata:message})


    }
    publishPool() {
        this.setState({ loader: true });

        var that = this;
        var params: any = {
            'custom_pool_id': this.state.pooldata.id,
            'publish_result_text': this.state.pooldata.my_answer_type == '1' ? '' : this.state.poolanswer,
            'publish_result_link': this.state.uploadurl ? '' : this.state.poollink,
            'publish_result_date': this.state.pooldata.my_answer_type == '1' ? this.state.pooldate : '',
            'publish_result_image': this.state.poollink ? '' : this.state.imagebase
        };

        console.log('params of pool : ', params)
        // my_answere_type ==1 date 2=text
        // result_type ==1 link 2=image
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/Custom_PoolGaming/creator_publish_custom_pool_result', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('Success openplay' + JSON.stringify(responseJson));
                this.setState({ poollink: '' });

                // this.setState({ dialogVisible: true });
                //   alert(responseJson.message);
               // RouterBuilder.replaceRouteTo(AppScreens.G_YourPrivateContest, this.props);
               this.props.navigation!.replace(AppScreens.G_UddaContests,{params:{bet_id:'ashish'}});
               
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    // LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => {
                that.setState({ loader: false });
                console.log(error);
            })
        //  }
    }

    showDateTimePicker = () => {

        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });

    };
    handleStartDatePicked = (date: any) => {
        console.log('ashish pool date : ', date)
        console.log('ashish pool data : ', JSON.stringify(this.state.pooldata))
        var formated_date = moment(date).format('MM-DD-YYYY');
        let message = [];
        message = this.state.pooldata
        // message.my_answer_date = formated_date
        this.setState({ pooldate: formated_date })
        // this.setState({pooldata:message})
        this.hideDateTimePicker();
    }

    async shareOption(item: any) {
        var MessageString: any;
        var oddsString: any;
        var teamName: any;
        var teamName2: any;
        var url: any;
        var amount: any;
        var referStr: any;
        
       
            url = "http://bet.udda.com/index.php?t=poolbet&i=" + item.encryptor_bet_id;
            // url = "https://bet.udda.com/coming-soon/"

            url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
            referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up. ";
          
            var new_time_stampExp = item.pool_expired_on_time_stamp * 1000;
       
            var formated_timeExp = moment(new_time_stampExp).format('LT');
            var batdateExp: any = moment(new_time_stampExp).format('LL');
            var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
            var zonevalueExp: any = Match_dateExp[6].toString();
            var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);
            var betTimeExpr: any = formated_timeExp + " " + zoneExp;
            var betDateExpr: any = batdateExp;
        var myBetOn = ''
        if(item.my_answer_type =='2')
            {
              myBetOn =item.my_answer_text;
            }
            else{
                myBetOn =item.my_answer_date
            }
        try {
  
          var extraDetails = '\n';
          if(item.bet_near_type)
            {
                extraDetails += 'Exact: "Yes", wins'
            }
            else 
            {
                extraDetails +='Closest: "Yes", wins'
             
            }
          if(item.bet_play_type)
          {
           // extraDetails +="Don’t Show Pick:"
           // extraDetails += ' "Yes", '
          }
          else 
          {
            //extraDetails += 'Show Pick: "Yes", '
          }
          if(item.bet_type)
          {
            //extraDetails +='Private: "Yes"'
            extraDetails +='\n'
          }
          else 
          {
           // extraDetails += 'Public: "Yes"'
            extraDetails +='\nYou can invite your friends'
          }
          if(!item.bet_play_type)
          {
           // extraDetails+=', '
          }
          if(item.multiple_winners)
          {
           // extraDetails +='\n'
          }
          else 
          {
           // extraDetails += 'Multiple Winner: "Yes" \n'
          }
         // extraDetails += { !this.state.bet_near_type? 'Exact':'Closest' }
  
          //MessageString = 'I just bet a ' + this.state.betammount + ' UDDA Bucks that  \n"' + this.state.customBetTest + extraDetails+'My answer "' + myBetOn + '" .\nWould you like to accept the Bet? ' +'\nThe pool closes at "' + myBetOn 
          if(item.bet_play_type)
          {
            MessageString = 'I created a pool that "' + item.question+'"\nIt costs "'+ item.bet_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks to join, "winner take all" ' + extraDetails+'\nThe pool closes at "' + betTimeExpr + ', ' + batdateExp  +'" .\nWould you like to accept the Bet? '
          }
          else{
            MessageString = 'I created a pool that "' + item.question+'"\nIt costs "'+ item.bet_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks to join, "winner take all" ' + extraDetails+'\nThe pool closes at "' + betTimeExpr + ', ' + batdateExp  +'"\nMy answer "' + myBetOn+ '" .\nWould you like to accept the Bet? '
          }
         
  
        }
        catch (e) {
  
        }
        MessageString += referStr + "\n" + url;

        

        console.log('private url ' + JSON.stringify(MessageString));
        Share.share({
            message: MessageString,
        })
            .then(result => {
                console.log(result)
                this.closePopover();
            })
            .catch(errorMsg => {
                console.log(errorMsg)
                this.closePopover();

            });
    }
    async shareOptionSettle(item: any) {
        var MessageString: any;
        var oddsString: any;
        var teamName: any;
        var teamName2: any;
        var url: any;
        var amount: any;
        var referStr: any;
        
       
            url = "http://bet.udda.com/index.php?t=poolbet&i=" + item.encryptor_bet_id;
            // url = "https://bet.udda.com/coming-soon/"

            url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
            referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up. ";
          
            var new_time_stampExp = item.pool_expired_on_time_stamp * 1000;
       
            var formated_timeExp = moment(new_time_stampExp).format('LT');
            var batdateExp: any = moment(new_time_stampExp).format('LL');
            var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
            var zonevalueExp: any = Match_dateExp[6].toString();
            var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);
            var betTimeExpr: any = formated_timeExp + " " + zoneExp;
            var betDateExpr: any = batdateExp;
            var myBetOn = ''
            if(item.my_answer_type =='2')
            {
              myBetOn =item.my_answer_text;
            }
            else{
                myBetOn =item.my_answer_date
            }
            try {
      
              var extraDetails = '';
              if(item.bet_near_type)
            {
                extraDetails += 'Exact: "Yes", wins'
            }
            else 
            {
                extraDetails +='Closest: "Yes", wins'
             
            }
              if(item.bet_play_type)
              {
               // extraDetails +="Don’t Show Pick:"
               // extraDetails += ' "Yes", '
              }
              else 
              {
                //extraDetails += 'Show Pick: "Yes", '
              }
              if(item.bet_type)
              {
                //extraDetails +='Private: "Yes"'
               // extraDetails +='\n'
              }
              else 
              {
               // extraDetails += 'Public: "Yes"'
                extraDetails +='\nYou can invite your friends'
              }
              if(!item.bet_play_type)
              {
               // extraDetails+=', '
              }
              if(item.multiple_winners)
              {
               // extraDetails +='\n'
              }
              else 
              {
               // extraDetails += 'Multiple Winner: "Yes" \n'
              }
             // extraDetails += { !this.state.bet_near_type? 'Exact':'Closest' }
      
              //MessageString = 'I just bet a ' + this.state.betammount + ' UDDA Bucks that  \n"' + this.state.customBetTest + extraDetails+'My answer "' + myBetOn + '" .\nWould you like to accept the Bet? ' +'\nThe pool closes at "' + myBetOn 
              if(item.bet_play_type)
              {
                MessageString = 'I created a pool that "' + item.question+'"\nIt costs "'+ item.bet_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks to join, "winner take all" ' + extraDetails+'\nThe pool closes at "' + betTimeExpr + ', ' + batdateExp  +'" .\nWould you like to accept the Bet? '
              }
              else{
                MessageString = 'I created a pool that "' + item.question+'"\nIt costs "'+ item.bet_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks to join, "winner take all" ' + extraDetails+'\nThe pool closes at "' + betTimeExpr + ', ' + batdateExp  +'"\nMy answer "' + myBetOn + '" .\nWould you like to accept the Bet? '
              }
             
      
            }
            catch (e) {
      
            }
            MessageString += referStr + "\n" + url;


        console.log('private url ' + JSON.stringify(MessageString));
        Share.share({
            message: MessageString,
        })
            .then(result => {
                console.log(result)
                this.closePopover();
            })
            .catch(errorMsg => {
                console.log(errorMsg)
                this.closePopover();

            });
    }


    showPopover() {
        var new_time_stamp = this.state.betDetailData.bet_time_stamp * 1000;
        var formated_time = moment(new_time_stamp).format('MMMM DD,YYYY');
        this.setState({ blackdialogDate: formated_time });
        this.setState({ BlackDialog: true });
    }

    closePopover() {
        this.setState({ BlackDialog: false });
    }
    getblackDialog() {
        return (
            <Popover
            isVisible={true}
           // fromView={touchableRef}
          // backgroundStyle={{position:'absolute', top:100, paddingTop:hp(20), backgroundColor: '#fff' }}
        //   mode={'rn-modal'}
        // // mode={{'js-modal'
           popoverStyle ={{  marginLeft:-10,  marginTop:hp(8)}}
            onRequestClose={() => this.closePopover()}>
               
            <View style={{ height:hp(87), margin:0, backgroundColor: '#fff', padding: 10, width: '100%', maxHeight: '100%', }}>
            <TouchableOpacity onPress={() => { this.closePopover() }} style={{ width:50}}>
                    <View >
                        {/* <Image source={require('../../../../images/back_icon.png')} style={{ height: 10, width: 10, alignSelf: 'flex-start', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image> */}
                        <Icons name="arrow-back" size={30} color="black" style={{marginLeft:2}} 
            onPress={() => { this.closePopover() }}
          />
                    </View>
                </TouchableOpacity>
            <View style={{position:'absolute',top:5,right:0, justifyContent: 'center', alignItems: 'center' ,width:'80%' }}>
                        <Text style={{ width: '100%', color:'#68bcbc',  fontSize: 18,marginTop:5, fontFamily: 'Montserrat-Bold',  textAlign: 'left',paddingLeft:'6%' }}>PARTICIPANTS </Text>
                    </View>
                {/* <TouchableWithoutFeedback onPress={() => { this.closePopover() }} >
                    <View>
                        <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10, alignSelf: 'flex-end', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image>
                    </View>
                </TouchableWithoutFeedback> */}


                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={{ width: '40%', fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Bet Date:</Text>

                        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.blackdialogDate}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={{ width: '40%', fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Creator</Text>

                        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.betDetailData.creator}</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#777777', marginVertical: 5, width: '95%', height: 2, alignItems: 'center' }}>
                        </View>
                    </View>

                    {this.state.betDetailData.share_info.length > 0 ?
                    <View style={{height:hp(63)}}>
                        <FlatList
                            extraData={this.state}
                            data={this.state.betDetailData.share_info}
                            keyExtractor={(item: any, index) => index.toString()}
                            bounces={false}
                            renderItem={({ item, index }: any) => {
                                return (
                                    item.status == 1 ? <View>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' ,height:40,alignContent:'center',alignItems:'center'}}>
                                            <View style={{ width: '50%' }}><Text style={{ fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center' }}>{item.username}</Text></View>

                                            <View style={{ flexDirection: 'row', height: 20, width: '30%' }}>
                                                <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{item.amount}</Text>
                                            </View>
                                            <View style={{ width: '20%' }}><Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textAlign: "right" }}>{item.settled_status}</Text></View>
                                        </View>
                                        <View style={styles.hrline1} />
                                    </View> : <View >
                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between',height:40,alignContent:'center',alignItems:'center' }}>
                                                <View style={{ width: '50%' }}> <Text style={{ color: '#808080', fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.username}</Text></View>

                                                <View style={{ flexDirection: 'row', height: 20, width: '30%' }}>
                                                    <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                                    <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.amount}</Text>
                                                </View>
                                                <View style={{ width: '20%', }}> <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textAlign: "right" }}>{item.settled_status}</Text></View>
                                            </View>
                                            <View style={styles.hrline1} />
                                        </View>
                                )
                            }}
                        />
                        </View>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ width: '100%', fontSize: 12, fontFamily: 'Montserrat-Bold', height: hp(63), textAlign: 'center' }}>No record found</Text>
                        </View>

                    }
                    {this.state.betDetailData.settlement_status == 'Settlement In-Progress' ? this.state.betDetailData.bet_type == 2 && this.state.betDetailData.creator_index == '0'&& this.state.betDetailData.result_type == '0' ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.betDetailData) }}>
                            <View style={{ backgroundColor: '#68bcbc', paddingVertical: 7, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, alignItems: 'center' }}> Invite More Friends</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : this.state.betDetailData.bet_type == 1 && this.state.betDetailData.result_type == '0'? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.betDetailData) }}>
                            <View style={{ backgroundColor: '#68bcbc', paddingVertical: 7, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, alignItems: 'center' }}> Invite More Friends</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        </View> : null : <View />
                    }


                </View>
            </Popover>

        )
    }
    showPopoverBeforSettle() {
        var new_time_stamp = this.state.pooldata.bet_time_stamp * 1000;
        var formated_time = moment(new_time_stamp).format('MMMM DD,YYYY');
        this.setState({ blackdialogSettleDate: formated_time });
        this.setState({ BlackDialogSettle: true });
    }

    closePopoverBeforSettle() {
        this.setState({ BlackDialogSettle: false });
    }
    getblackDialogBeforSettle() {
        return (
            <Popover
            isVisible={true}
           // fromView={touchableRef}
          // backgroundStyle={{position:'absolute', top:100, paddingTop:hp(20), backgroundColor: '#fff' }}
        //   mode={'rn-modal'}
        // // mode={{'js-modal'
           popoverStyle ={{  marginLeft:-10,  marginTop:hp(8)}}
            onRequestClose={() => this.closePopoverBeforSettle()}>
               
            <View style={{ height:hp(87), margin:0, backgroundColor: '#fff', padding: 10, width: '100%', maxHeight: '100%', }}>
            <TouchableOpacity onPress={() => { this.closePopoverBeforSettle() }} style={{ width:50}}>
                    <View >
                        {/* <Image source={require('../../../../images/back_icon.png')} style={{ height: 10, width: 10, alignSelf: 'flex-start', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image> */}
                        <Icons name="arrow-back" size={30} color="black" style={{marginLeft:2}} 
            onPress={() => { this.closePopoverBeforSettle() }}
          />
                    </View>
                </TouchableOpacity>
            <View style={{position:'absolute',top:5,right:0, justifyContent: 'center', alignItems: 'center' ,width:'80%' }}>
                        <Text style={{ width: '100%', color:'#68bcbc',  fontSize: 18,marginTop:5, fontFamily: 'Montserrat-Bold',  textAlign: 'left',paddingLeft:'6%' }}>PARTICIPANTS </Text>
                    </View>
                {/* <TouchableWithoutFeedback onPress={() => { this.closePopover() }} >
                    <View>
                        <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10, alignSelf: 'flex-end', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image>
                    </View>
                </TouchableWithoutFeedback> */}


                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={{ width: '40%', fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Bet Date:</Text>

                        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.blackdialogSettleDate}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={{ width: '40%', fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Creator</Text>

                        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.pooldata.creator}</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#777777', marginVertical: 5, width: '95%', height: 2, alignItems: 'center' }}>
                        </View>
                    </View>

                    {this.state.pooldata.share_info.length > 0 ?
                    <View style={{height:hp(63)}}>
                        <FlatList
                            extraData={this.state}
                            data={this.state.pooldata.share_info}
                            keyExtractor={(item: any, index) => index.toString()}
                            bounces={false}
                            renderItem={({ item, index }: any) => {
                                return (
                                    item.status == 1 ? <View>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' ,height:40,alignContent:'center',alignItems:'center'}}>
                                            <View style={{ width: '50%' }}><Text style={{ fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center' }}>{item.username}</Text></View>

                                            <View style={{ flexDirection: 'row', height: 20, width: '30%' }}>
                                                <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{item.amount}</Text>
                                            </View>
                                            <View style={{ width: '20%' }}><Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textAlign: "right" }}>{item.settled_status}</Text></View>
                                        </View>
                                        <View style={styles.hrline1} />
                                    </View> : <View >
                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' ,height:40,alignContent:'center',alignItems:'center'}}>
                                                <View style={{ width: '50%' }}> <Text style={{ color: '#808080', fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.username}</Text></View>

                                                <View style={{ flexDirection: 'row', height: 20, width: '30%' }}>
                                                    <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                                    <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.amount}</Text>
                                                </View>
                                                <View style={{ width: '20%', }}> <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textAlign: "right" }}>{item.settled_status}</Text></View>
                                            </View>
                                            <View style={styles.hrline1} />
                                        </View>
                                )
                            }}
                        />
                        </View>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ width: '100%', fontSize: 12, fontFamily: 'Montserrat-Bold', height: hp(63), textAlign: 'center' }}>No record found</Text>
                        </View>

                    }
                    {this.state.pooldata.settlement_status == 'Settlement In-Progress' ? this.state.pooldata.bet_type == 2 && this.state.pooldata.creator_index == '0' ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => { this.shareOptionSettle(this.state.pooldata) }}>
                            <View style={{ backgroundColor: '#68bcbc', paddingVertical: 5, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}> Invite More Friends</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : this.state.pooldata.bet_type == 1 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableWithoutFeedback onPress={() => { this.shareOptionSettle(this.state.pooldata) }}>
                            <View style={{ backgroundColor: '#68bcbc', paddingVertical: 5, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}> Invite More Friends</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : null : <View />
                    }


                </View>
            </Popover>

        )
    }


    cancelPool() {
        this.setState({ dialogVisible: false });
        this.setState({ loader: true });

        var that = this;
        var params: any = {
            'custom_pool_id': this.state.pooldata.id
        };

        console.log('params of pool : ', params)
        // my_answere_type ==1 date 2=text
        // result_type ==1 link 2=image
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/Custom_PoolGaming/cancel_custom_pool', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('Success openplay' + JSON.stringify(responseJson));
                this.setState({ poollink: '' });

                // this.setState({ dialogVisible: true });
                //   alert(responseJson.message);
              //  RouterBuilder.replaceRouteTo(AppScreens.G_YourPrivateContest, this.props);
              this.props.navigation!.replace(AppScreens.G_UddaContests,{params:{bet_id:'ashish'}});
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    // LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => {
                that.setState({ loader: false });
                console.log(error);
            })
      }
    // -----------------------------------------------Design and Design Methods---------------------------------------
    openQrModel(link:any){
        this.setState({imagezoomqrlink:link})
        this.setState({imagezoomqr:true})
        }
    render() {

        const images = [{

            url: this.state.imageurl,

        }];


        return (
            <Container
                title={(this.state.result_status == '0') ? 'SETTLE POOL' : 'POOL DETAIL'}
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                showIndicator={this.serviceRequestInProgress}
                menuIconListener={this}
                LogoIconListener={this}
                accountNameListener={this}
                availableBalanceListener={this}
                coveredPlaysListener={this}
                openPlaysListener={this}
                isSetting={false} >

{/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
< Dialog
            visible={this.state.dialogVisible}
            title=""
            onTouchOutside={() => this.setState({ dialogVisible: false })
            } >
            <View style={{ backgroundColor: "transparent", width: '100%', paddingTop: 10, paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => { this.setState({ dialogVisible: false }) }}>
                <View style={{ alignItems: 'flex-end', width: '100%', paddingRight: wp(2) }}>
                  <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                </View>
              </TouchableOpacity>

              <View style={{ justifyContent: "center", alignItems: "center", marginTop: 8, width: '100%' }} >
                <Text style={{ fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: wp(4), color: '#222' }}>
                  Are you sure you want to cancel this bet?
</Text>
                <BigButton title="CONFIRM" style={[styles.verify_button, { backgroundColor: '#68bcbc' }]} textStyle={styles.verify_button_text_style}
                  listener={() => {this.cancelPool();}} />
              </View>
            </View>
          </Dialog >
                <View style={styles.maincontainercustom}>
                    <ProgressLoader
                        visible={this.state.loader}
                        isModal={true} isHUD={true}
                        hudColor={"#68bcbc"}
                        color={"#FFFFFF"} />
                        {this.state.BlackDialog && this.getblackDialog()}
                    {this.state.BlackDialogSettle && this.getblackDialogBeforSettle()}
                    {/* <View style={styles.customhead}>
                        <View style={{ width: '10%' }}>
                            <Icons name="arrow-back" size={30} color="white" style={{ marginTop: 2 }}
                                onPress={() => this.goBackToPrivateContests()}
                            />
                        </View>
                        <View style={{ width: '90%', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.headerTitle}> {this.state.result_status == '0' ?'SETTLE POOL':'POOL DETAIL'}</Text>
                        </View>
                    </View> */}
                    <ScrollView>
                        <DateTimePicker
                            // onDateChange={this.setDate}
                            isVisible={this.state.isDateTimePickerVisible}
                            // customConfirmButtonIOS={this.handleStartDatePicked}
                            onConfirm={this.handleStartDatePicked}
                            onCancel={this.hideDateTimePicker}
                            minimumDate={this.state.minimumDate}
                            mode="date"
                        />
                        <Modal visible={this.state.imagezoom} transparent={true}>
                            <View style={styles.imageclose}>
                                <TouchableOpacity style={{ marginTop: 20, marginRight: 20 }} onPress={() => this.closeImage()}>
                                    <View style={[styles.CloseView,]}>
                                        <Icon name="close" size={20} color="white" />
                                        {/* <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12,tintColor:'white' }}></Image> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <ImageViewer
                                // saveToLocalByLongPress={true}
                                imageUrls={images} />
                        </Modal>
                        <Modal visible={this.state.imagezoomqr} transparent={false}>
            <View>
            <SafeAreaView>
              <View style={{justifyContent:'flex-end',alignItems:'flex-end',alignContent:'flex-end',padding:10}}>
              <Icon onPress={() => { 
              this.setState({
                imagezoomqr: false
              });
            }} name="close" size={26} color="Black"/>
              </View>

              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',height:100}}>
          <Text style={{fontSize: hp(3.4), fontFamily: 'Montserrat-SemiBold',textAlign:'center'}}>Scan <Text style={{fontSize: hp(3.4), fontFamily: 'Montserrat-Bold',}}> QR Code </Text> {'\n'}to join the contest</Text>
              </View>
              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:20,height:250}}>
              <Image
                     style={{ width: 250, height: 250 }}
                    //  source={require('../../../../images/winner_trophy.png')} 
                    source={{uri:this.state.imagezoomqrlink}}
                     >
                     </Image>
              </View>
         </SafeAreaView>
            </View>
            
         
        </Modal>
        <View style={{width:'100%',justifyContent:'center',flexDirection:'row'}}>
        <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'30%' }}>             
              <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 5,marginTop:5 }}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>
              <View style={{ alignContent: 'flex-start', alignItems: 'flex-start', width:'70%' }}>
                <Text style={[styles.customheadtext,{color:'#68bcbc'}]}>{(this.state.result_status == '0') ? 'SETTLE POOL' : 'POOL DETAIL'}</Text>
              </View>
        </View>
                        <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>
                       {this.state.result_status == '0'?  this.state.pooldata.qr_code!='' && <View style={{justifyContent:'center',flexDirection:'row',alignContent:'center',alignItems:'center',paddingLeft:'5%',paddingRight:'5%'}}>
                             
                              <TouchableOpacity onPress={()=>{this.openQrModel(this.state.result_status == '0' ?this.state.pooldata.qr_code:this.state.betDetailData.qr_code)}}>
                              <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../../../../images/magnifying_glass_qrcode_icon.png')}
                                // source={{uri:this.state.result_status == '0' ?this.state.betDetailData.qr_code:this.state.betDetailData.qr_code}}
                                 >
                                </Image>
                              </TouchableOpacity>
                            </View>:this.state.betDetailData.qr_code !='' && <View style={{justifyContent:'center',flexDirection:'row',alignContent:'center',alignItems:'center',paddingLeft:'5%',paddingRight:'5%'}}>
                             
                             <TouchableOpacity onPress={()=>{this.openQrModel(this.state.result_status == '0' ?this.state.pooldata.qr_code:this.state.betDetailData.qr_code)}}>
                             <Image
                               style={{ width: 40, height: 40 }}
                               source={require('../../../../images/magnifying_glass_qrcode_icon.png')}
                               // source={{uri:this.state.result_status == '0' ?this.state.betDetailData.qr_code:this.state.betDetailData.qr_code}}
                                >
                               </Image>
                             </TouchableOpacity>
                           </View>}
                           {this.state.betDetailData.settlement_status == 'Settlement In-Progress' && <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:5}}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>{this.state.betDetailData.settlement_status == 'Settlement In-Progress' ? this.state.betDetailData.settlement_status :null}</Text>                                
                                </View>}
                           
                            {this.state.result_status == '0' ? <View style={{ flex: 1, padding: '5%' }}>
                                <View style={{ maxHeight: hp(10) }}>
                                    <ScrollView>

                                        <Text style={{ textAlign: 'justify', color: '#222', fontFamily: 'Montserrat-Bold', fontSize: hp(2.1) }}>{this.state.pooldata.question}</Text>
                                    </ScrollView>
                                </View>
                                <View>

                                    <Text style={{ textAlign: 'justify', color: 'black', paddingTop: 3, fontSize: hp(2) }}>Result:</Text>

                                    {this.state.pooldata.my_answer_type == '1' ? <View style={styles.customtextinputpool}>
                                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.showDateTimePicker() }}>
                                            <View style={{ width: '100%', height: hp(8), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, borderRadius: 3, backgroundColor: '#eeeeee' }}>

                                                <View style={{ width: '90%', justifyContent: 'center', alignContent: 'center' }}>
                                                    <Text style={[styles.datetimetext, { color: 'black' }]}>{this.state.pooldate ? this.state.pooldate : 'Choose Date'}</Text>
                                                </View>

                                                <View style={styles.datetimeicon}>
                                                    <Image source={require('../../../../images/calendar.png')}
                                                        style={{ height: 20, width: 20, marginRight: 8 }}
                                                        resizeMode="contain" />
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                    </View> : <View style={styles.customtextinputpool}>
                                            <TextInput
                                                value={this.state.poolanswer}
                                                clearTextOnFocus={true}
                                                style={{ paddingLeft: 10, height: hp(8), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                                                placeholder='My answer is...'
                                                placeholderTextColor={'#c3c3c3'}
                                                onChangeText={(text) => { this.changeanswertext(text) }}
                                            // onChangeText={(text) => { this.state.customProbBetList[index].custom_pools.my_answer_text = text }}
                                            //lololololololol.o
                                            // editable={this.state.customBetDate?false:true}
                                            // onBlur={Keyboard.dismiss}
                                            />
                                        </View>}
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                </View>
                                <View>
                                    <View style={styles.customtextinputpool}>
                                        <Dash dashColor={'#cfcfcf'} style={{ width: '100%' }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Dash dashColor={'#cfcfcf'} style={{ width: 1, height: hp(11), flexDirection: 'column' }} />
                                            <TouchableOpacity style={{ width: '100%' }}
                                                onPress={() => { this.state.poollink ? AlertUtil.show('You can either upload image or enter external link.') : this.state.uploadurl != '' ? this.imageZoom(this.state.uploadurl, '2') : this.selectPhoto() }}
                                            // onPress={()=>{alert('dialog photo')}}
                                            >
                                                <View style={{ width: '100%', height: hp(11), flexDirection: 'row', backgroundColor: 'white', }}>
                                                    <View style={{ width: '90%', justifyContent: 'center', alignContent: 'center' }}>
                                                        <Text style={[styles.datetimetext, { color: 'c3c3c3' }]}>{'Upload Image'}</Text>
                                                    </View>
                                                    <View style={styles.datetimeicon}>
                                                        {this.state.uploadurl ? <View style={{ marginRight: 8, flexDirection: 'row' }}>
                                                            <View>
                                                            <CircleImage width={wp(20)} imageFilePath={this.state.uploadurl} />
                                                            </View>
                                                            <View style={{ marginLeft: 10, width: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 3 }}>
                                                            <Icon name="close" size={20} color="black" onPress={() => { this.setState({ uploadurl: '' }) }} /></View></View> : <Image source={require('../../../../images/upload_image_icon.png')}
                                                                style={{ height: 30, width: 30, marginRight: 8 }}
                                                                resizeMode="contain" />}
                                                        {/* <Image source={ this.state.uploadurlstatus? { uri: this.state.uploadurl }:require('../../../../images/upload_image_icon.png')}
                                style={{ height: 30, width: 30, marginRight: 8 }}
                                resizeMode="contain" /> */}

                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <Dash dashColor={'#cfcfcf'} style={{ width: 1, height: hp(11), flexDirection: 'column' }} />
                                        </View>
                                        <Dash dashColor={'#cfcfcf'} style={{ width: '100%' }} />
                                    </View>
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 10 }} />
                                <View style={{ paddingTop: 10, width: '100%', paddingBottom: 10 }}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: '#cfcfcf', textAlign: 'center' }}> ──────  OR  ──────</Text>
                                </View>

                                <Text style={{ textAlign: 'justify', fontFamily: 'Montserrat-Bold', fontSize: hp(2), color: '#888888' }}>External Link</Text>

                                <View style={styles.customtextinputpool}>

                                    <TextInput
                                        value={this.state.poollink}
                                        // clearTextOnFocus={true}
                                        // numberOfLines={10}  
                                        editable={this.state.uploadurl == '' ? true : false}
                                        style={{ paddingLeft: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4), height: hp(8), width: '80%' }}
                                        placeholder='Enter URL'
                                        placeholderTextColor={'#c3c3c3'}
                                        onChangeText={(text) => { this.setState({ poollink: text }) }}
                                    // onBlur={Keyboard.dismiss}
                                    />
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Bet Amount:</Text>

                                    <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'grey', textAlign: 'justify' }}>
                                        {this.state.pooldata.bet_amount}</Text>
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Pool Amount:</Text>

                                    <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'grey', textAlign: 'justify' }}>
                                        {this.state.pooldata.pool_amount}</Text>
                                    <View style={{ padding: 10, marginRight: 2 }}>
                                        <TouchableHighlight ref={ref => this.touchable = ref} onPress={() => this.showPopoverBeforSettle()}>
                                            <Image source={require('../../../../images/Bet_Share.png')} style={{ height: 20, width: 20, tintColor: "#68bcbc" }} resizeMode='contain' tintColor="#68bcbc" />


                                        </TouchableHighlight>

                                    </View>
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />


                                <View style={{flexDirection:'row',width:'100%'}}>
                                    <View style={[styles.customtextinputpool1,{width:'49%'}]}>
                                        {/* <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.publishPool()}}> */}
                                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.logiccheck() }}>
                                            <View style={{ width: '100%', height: hp(8), flexDirection: 'row', borderColor: '#cfcfcf', borderWidth: 1, backgroundColor: '#68bcbc' }}>
                                                <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        fontFamily: 'Montserrat-Bold',
                                                        fontSize: hp(2.8),
                                                    }}>Settle Pool</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{width:'2%'}}></View>
                                    {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} /> */}
                                    
                                    <View style={[styles.customtextinputpool1,{width:'49%'}]}>
                                        {/* <TouchableOpacity style={{ width: '100%' }} onPress={()=>{this.publishPool()}}> */}
                                        <TouchableOpacity style={{ width: '100%' }} onPress={() => {
                                            this.setState({dialogVisible:true})
                                            //  this.cancelPool() 
                                             }}>
                                            <View style={{ width: '100%', height: hp(8), flexDirection: 'row', borderColor: '#68bcbc', borderWidth: 1, backgroundColor: 'white' }}>
                                                <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                                                    <Text style={{
                                                        color: '#68bcbc',
                                                        textAlign: 'center',
                                                        fontFamily: 'Montserrat-Bold',
                                                        fontSize: hp(2.8),
                                                    }}>Cancel Pool</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View> :
                                <View style={{ flex: 1, padding: '5%' }}>
                                    <View>
                                        <Text style={{ textAlign: 'justify', color: '#222', fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), paddingBottom: 10 }}>
                                            {this.state.betDetailData.question}
                                        </Text>
                                    </View>
                                    <View style={{ backgroundColor: 'white' }}>
                                        <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: '#68bcbc', textAlign: 'justify' }}>
                                            {this.state.betDetailData.creator_name}
                                        </Text>
                                    </View>
                                 {/*    <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} /> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Result:</Text>
                                            <Text style={{ padding: 10, paddingLeft: 0, fontFamily: 'Montserrat-Regular', fontSize: hp(2.4), color: '#222', textAlign: 'justify' }}>
                                                {/*  {this.state.betDetailData.my_answer_type == "1" ? this.state.betDetailData.result_date : this.state.betDetailData.result_text} */}
                                                {this.state.betDetailData.publish_answer}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                    {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} /> */}
                                        {this.state.betDetailData.external_link ?
                                            <View>
                                                <Text style={{ textAlign: 'justify', fontFamily: 'Montserrat-Bold', fontSize: hp(2.1), color: '#888888' }}>External Link</Text>
                                                <View style={[styles.customtextinputpool, { padding: 0 }]}>
                                                    <TextInput
                                                        value={this.state.betDetailData.external_link}
                                                        clearTextOnFocus={true}
                                                        editable={false}
                                                        style={{ paddingLeft: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4), height: hp(8), width: '80%' }}
                                                        placeholderTextColor={'#c3c3c3'}
                                                    />
                                                </View>

                                                
                                            </View>
                                            :
                                            null

                                        }

                                        {this.state.betDetailData.result_image ?
                                            <View style={[styles.customtextinputpool, { backgroundColor: 'white' }]}>
                                                <Dash dashColor={'#cfcfcf'} style={{ width: '100%' }} />
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Dash dashColor={'#cfcfcf'} style={{ width: 1, height: hp(11), flexDirection: 'column' }} />
                                                    <TouchableOpacity style={{ width: '100%' }} onPress={() => this.imageZoom(this.state.betDetailData.result_image, '1')}>
                                                        <View style={{ width: '100%', height: hp(11), flexDirection: 'row', backgroundColor: 'white', }}>
                                                            <View style={{ width: '90%', justifyContent: 'center', alignContent: 'center' }}>
                                                                <Text style={[styles.datetimetext, { color: 'black' }]}>{'Uploaded Image'}</Text>
                                                            </View>
                                                            <View style={styles.datetimeicon}>
                                                                <View style={{ marginRight: 8 }}><CircleImage width={wp(20)} imageFilePath={this.state.betDetailData.result_image} /></View>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <Dash dashColor={'#cfcfcf'} style={{ width: 1, height: hp(11), flexDirection: 'column' }} />
                                                </View>
                                                <Dash dashColor={'#cfcfcf'} style={{ width: '100%' }} />
                                            </View>
                                            
                                            :
                                            null
                                        }
<View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 10 }} />


                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>My Answer:</Text>
                                            <Text style={{ padding: 10, paddingLeft: 0, fontFamily: 'Montserrat-Regular', fontSize: hp(2.4), color: '#222', textAlign: 'justify' }}>
                                                {/*  {this.state.betDetailData.my_answer_type == "1" ? this.state.betDetailData.result_date : this.state.betDetailData.result_text} */}
                                                {this.state.betDetailData.my_answer}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Bet Amount:</Text>
                                            <Text style={{ padding: 10, paddingLeft: 0, fontFamily: 'Montserrat-Regular', fontSize: hp(2.4), color: '#222', textAlign: 'justify' }}>
                                                {/*  {this.state.betDetailData.my_answer_type == "1" ? this.state.betDetailData.result_date : this.state.betDetailData.result_text} */}
                                                {this.state.betDetailData.bet_amount}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Pool Amount:</Text>
                                            <Text style={{ padding: 10, paddingLeft: 0, fontFamily: 'Montserrat-Regular', fontSize: hp(2.4), color: '#222', textAlign: 'justify' }}>
                                                {/*  {this.state.betDetailData.my_answer_type == "1" ? this.state.betDetailData.result_date : this.state.betDetailData.result_text} */}
                                                {this.state.betDetailData.pool_amount}
                                            </Text>
                                            <View style={{ padding: 10,marginRight: 2 }}>
                                                <TouchableHighlight ref={ref => this.touchable = ref} onPress={() => this.showPopover()}>
                                                    <Image source={require('../../../../images/Bet_Share.png')} style={{ height: 20, width: 20 , tintColor:"#68bcbc"}} resizeMode='contain' tintColor="#68bcbc" />


                                                </TouchableHighlight>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                    { <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Status:</Text>
                                            <Text style={{ padding: 10, paddingLeft: 0, fontFamily: 'Montserrat-Regular', fontSize: hp(2.4), color: '#222', textAlign: 'justify' }}>
                                                {/*  {this.state.betDetailData.my_answer_type == "1" ? this.state.betDetailData.result_date : this.state.betDetailData.result_text} */}
                                                {this.state.betDetailData.result_text}
                                            </Text>
                                            
                                        </View>
                                        
                                    </View>}
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                    <View style={{flexDirection:'row' }}>
                                       
                                       <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Amount To Win:</Text>
                                      
                                      <View style={{width:'50%'}}>
                                           <Text style={{ padding: 10, paddingLeft: 0, fontFamily: 'Montserrat-Regular', fontSize: hp(2.4), color: '#222', textAlign: 'justify' }} >
                                           {this.state.betDetailData.settlement_status == 'Settlement In-Progress' ? null : (this.state.betDetailData.winning_status == 'R' || this.state.betDetailData.winning_status == 'W') ? '+' + this.state.betDetailData.amount_to_win : '-' + this.state.betDetailData.amount_to_win}
                                           {this.state.betDetailData.settlement_status == 'Settlement In-Progress' ? '' : ((this.state.betDetailData.winning_status == 'R') ? '(Refunded)' : '')}
                                       </Text></View>
                                   
                               </View>

                                </View>
                            }
                        </Animated.View>
                    </ScrollView>

                </View>
            </Container >
        );

    }

}


const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
    error: state.serviceReducer.error,
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners,




})



export default connect(mapStateToProps)(G_SettlePoolInfoView);
