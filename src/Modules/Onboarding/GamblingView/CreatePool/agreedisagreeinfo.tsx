import React, { createRef, useState } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback,SafeAreaView, TouchableOpacity, AsyncStorage, TextInput, TouchableHighlight, Animated, Keyboard, Dimensions, UIManager, Share, Modal } from "react-native";

import styles from './agreedisagreestyles';
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
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
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
import Popover from "react-native-popover-view";
var update = require('immutability-helper');
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
    key: 'somethun',
    page_title: 'CUSTOM POOL RESULT',
}

interface G_AgreeDisagreeInfoViewProps extends AppValidationComponentProps {

    getProfileRequestStatus?: ServiceRequestStatus
    getProfileResponse?: GetProfileResponse
    getProfileError?: UDDAError
    serviceKey?: string
    listeners?: any
}

interface G_AgreeDisagreeInfoViewState extends AppValidationComponentState {
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
    agreedata: any;
    selectedPoolItem: any;
    result_status:any;
    BlackDialog: any;
    blackdialogDate: any;
    imagezoomqr: any;
    imagezoomqrlink: any;
    
}

class G_AgreeDisagreeInfoView extends AppValidationComponent<G_AgreeDisagreeInfoViewProps, G_AgreeDisagreeInfoViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    public keyboardDidShowSub: any;
    public keyboardDidHideSub: any;
    public keyBoardType = 'decimal-pad';
    private serviceRequestInProgress = false
    private referralservice = new ReferralService(); //Vijay
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    public touchable;


    constructor(props: G_AgreeDisagreeInfoViewProps) {
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
            agreedata: '',
            selectedPoolItem:{},
            result_status:'',
            BlackDialog: false,
            imagezoomqr: false,
            imagezoomqrlink: '',
            blackdialogDate: ''
        };
    }

  async componentDidMount() {
        if (this.props.navigation.state.params) {
            let navigation = this.props.navigation;
            let item = navigation.getParam('item');
            let result_status = navigation.getParam('result_status');
          
                this.showPoolResultDialog(item.bet_id);
           
           
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


    componentWillReceiveProps(nextProps: G_AgreeDisagreeInfoViewProps) {
        if (nextProps.listeners!.includes(this.constructor.name)) {
            if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
                switch (nextProps.requestStatus) {
                    case ServiceRequestStatus.FinishedWithSuccess:
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
                        break
                }

            }
           
        }

    }

    showPopover() {
        var new_time_stamp = this.state.agreedata.bet_time_stamp * 1000;
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
                        <Text style={[MasterCss.Text_Style_Label_Medium,{ width: '40%', height: 20, alignItems: 'center' }]}>Bet Date:</Text>

                        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                            <Text style={[MasterCss.Text_Style_Value,{  alignItems: 'center' }]}>{this.state.blackdialogDate}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={[MasterCss.Text_Style_Label_Medium,{ width: '40%', height: 20, alignItems: 'center' }]}>Creator</Text>

                        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                            <Text style={[MasterCss.Text_Style_Value,{  alignItems: 'center' }]}>{this.state.agreedata.creator}</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#777777', marginVertical: 5, width: '95%', height: 2, alignItems: 'center' }}>
                        </View>
                    </View>

                    {this.state.agreedata.share_info.length > 0 ?
                    <View style={{height:hp(63)}}>

                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row',width:'100%'}}>
                                  <View style={{justifyContent:'flex-start',alignContent:'flex-start',alignItems:'flex-start',width:'40%'}} >
                                      <Text style={[MasterCss.Text_Style_Label_Large]}>Name</Text>
                                  </View>
                                  <View style={{justifyContent:'flex-start',alignContent:'flex-start',alignItems:'flex-start',width:'35%'}} >
                                      <Text style={[MasterCss.Text_Style_Label_Large,{}]} >Amount</Text>
                                 </View>
                                 <View style={{justifyContent:'flex-start',alignContent:'flex-start',alignItems:'flex-start',width:'25%'}} >
                                      <Text style={[MasterCss.Text_Style_Label_Large]}>Status</Text>
                                </View>
                        </View>
                        
                        <FlatList
                            extraData={this.state}
                            data={this.state.agreedata.share_info}
                            keyExtractor={(item: any, index) => index.toString()}
                            bounces={false}
                            renderItem={({ item, index }: any) => {
                                return (
                                    item.status == 1 ? <View>
                                      
                                        <View style={{ width: '100%', flexDirection: 'row', height:60,paddingTop:5}}>
                                            
                                            <View style={{ width: '40%',alignContent:'flex-start',alignItems:'flex-start',justifyContent:'flex-start',marginRight:'1%' }}>
                                                <View style={{flexDirection:'row',width:'100%'}}>
                                                 <View style={{width:'70%'}}>
                                                <Text style={[MasterCss.Text_Style_Value,{  }]}>{item.username}</Text>
                                                </View>
                                                <View style={{width:'30%'}}>
                                                <Image source={require('../../../../images/ftpprize_icon.png')} style={{ width: 20, height: 20 }}
                                                            resizeMode={'contain'} />
                                                </View>
                                                </View>
                                               
                                                <Text style={[MasterCss.Text_Style_Label_Small,{width:'99%'}]}>My Answer: <Text style={[MasterCss.Text_Style_Value,{  }]} >{item.username}</Text></Text>
                                                
                                               
                                                </View>
                                                <View style={{  width: '35%' }}>
                                            <View style={{ flexDirection: 'row',  width: '100%' }}>
                                                <Image source={require('../../../../images/BucksDark.png')} style={{ height: 8, width: 8, marginRight: 2, marginTop: 6 }} />
                                                <Text style={[MasterCss.Text_Style_Value,{  }]}>{item.amount}</Text>
                                                
                                            </View>
                                            <Text style={[MasterCss.Text_Style_Label_Small]}>Win Amount:</Text>
                                            {/* <Text style={[MasterCss.Text_Style_Value,{  }]}>{item.amount}</Text> */}
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <Text style={[MasterCss.Text_Style_Value,{  }]}>{item.settled_status}</Text>
                                                 <Text style={[MasterCss.Text_Style_Value,{  }]}>{item.amount}</Text>
                                            </View>
                                          
                                        </View>
                                        <View style={styles.hrline1} />

                                       
                                        
                                    </View> : <View >


                                    <View style={{ width: '100%', flexDirection: 'row', height:60,paddingTop:5}}>
                                            
                                            <View style={{ width: '40%',alignContent:'flex-start',alignItems:'flex-start',justifyContent:'flex-start',marginRight:'1%' }}>
                                                <View style={{flexDirection:'row',width:'100%'}}>
                                                 <View style={{width:'70%'}}>
                                                <Text style={[MasterCss.Text_Style_Value,{ textDecorationLine: 'line-through' }]}>{item.username}</Text>
                                                </View>
                                                <View style={{width:'30%'}}>
                                                <Image source={require('../../../../images/ftpprize_icon.png')} style={{ width: 20, height: 20 }}
                                                            resizeMode={'contain'} />
                                                </View>
                                                </View>
                                               
                                                <Text style={[MasterCss.Text_Style_Label_Small,{width:'99%'}]}>My Answer: <Text style={[MasterCss.Text_Style_Value,{  }]} >{item.username}</Text></Text>
                                                
                                               
                                                </View>
                                                <View style={{  width: '35%' }}>
                                            <View style={{ flexDirection: 'row',  width: '100%' }}>
                                                <Image source={require('../../../../images/BucksDark.png')} style={{ height: 8, width: 8, marginRight: 2, marginTop: 6 }} />
                                                <Text style={[MasterCss.Text_Style_Value,{textDecorationLine: 'line-through'  }]}>{item.amount}</Text>
                                                
                                            </View>
                                            <Text style={[MasterCss.Text_Style_Label_Small]}>Win Amount:</Text>
                                            {/* <Text style={[MasterCss.Text_Style_Value,{  }]}>{item.amount}</Text> */}
                                            </View>
                                            <View style={{ width: '25%' }}>
                                                <Text style={[MasterCss.Text_Style_Value,{  }]}>{item.settled_status}</Text>
                                                 <Text style={[MasterCss.Text_Style_Value,{  }]}>{item.amount}</Text>
                                            </View>
                                          
                                        </View>



                                            {/* <View style={{ height:40,width: '100%', flexDirection: 'row', justifyContent: 'space-between',alignContent:'center',alignItems:'center' }}>
                                                <View style={{ width: '50%' }}> <Text style={{ color: '#808080', fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.username}</Text></View>

                                                <View style={{ flexDirection: 'row', height: 20, width: '30%'}}>
                                                    <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                                    <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.amount}</Text>
                                                </View>
                                                <View style={{ width: '20%', }}> <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center',textAlign:"right" }}>{item.settled_status}</Text></View>
                                            </View> */}
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
                    {this.state.agreedata.result_type == 4 ?null:this.state.agreedata.settlement_status == 'Settlement In-Progress' ? this.state.agreedata.bet_type == 2 && this.state.agreedata.creator_index == '0' && this.state.agreedata.result_type == '0'? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.agreedata) }}>
                            <View style={{ backgroundColor: '#68bcbc', paddingVertical: 7, marginVertical: 10, width: '95%', alignItems: 'center', borderRadius: 3 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 15, alignItems: 'center' }}> Invite More Friends</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : this.state.agreedata.bet_type == 1 && this.state.agreedata.result_type == '0' ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => { this.shareOption(this.state.agreedata) }}>
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
    async shareOption(item: any) {
        var MessageString: any;
        var oddsString: any;
        var teamName: any;
        var teamName2: any;
        var url: any;
        var amount: any;
        var referStr: any;


        url = "http://bet.udda.com/index.php?t=poolbet&i=" + item.encryptor_bet_id;
        // url = "https://bet.udda.com/coming-soon/" pool_expired_on_time_stamp

        url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
        referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up. ";

        //this.setState({ dateTimeValue: this.state.poolexpiredate.split('-').join('/') + ' ' + this.state.poolexpiretime });
        // alert(item.pool_expired_on_time_stamp);
        // var new_time_stampExp = item.pool_expired_on_time_stamp*100;// new Date(this.state.dateTimeValue).getTime();//1587290498417*1000;//new Date(this.state.dateTimeValue).getTime() * 1000;
        // var formated_timeExp = moment(new_time_stampExp).format('LT');
        // var batdateExp: any = moment(new_time_stampExp).format('LL');
        // var Match_dateExp: any = new Date(new_time_stampExp).toString().split(' ');
        // var zonevalueExp: any = Match_dateExp[6].toString();
        // var zoneExp: any = zonevalueExp.substr(1, zonevalueExp.length - 2);
        // var betTimeExpr: any = formated_timeExp + " " + zoneExp;
        // var betDateExpr: any = batdateExp;

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
            MessageString = 'I created a pool that "' + item.question+'"\nIt costs "'+ item.bet_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' UDDA" bucks to join, "winner take all" ' + extraDetails+'\nThe pool closes at "' + betTimeExpr + ', ' + batdateExp  +'"\nMy answer "' +myBetOn + '" .\nWould you like to accept the Bet? '
          }
         
  
        }
        catch (e) {
  
        }
        MessageString += referStr + "\n" + url;


        // var extraDetails = '"\n';
        // if (item.bet_near_type == '2') {
        //     extraDetails += 'Closest: "Yes", '
        // }
        // else {
        //     extraDetails += 'Exact: "Yes", '
        // }
        // if (item.bet_play_type == '1') {
        //     extraDetails += "Don’t Show Pick:"
        //     extraDetails += ' "Yes", '
        // }
        // else {
        //     extraDetails += 'Show Pick: "Yes", '
        // }
        // if (item.bet_type == '2') {
        //     extraDetails += 'Private: "Yes"'
        // }
        // else {
        //     extraDetails += 'Public: "Yes"'
        // }
        // if (item.bet_play_type == '1') {
        //     extraDetails += ', '
        // }
        // if (item.multiple_winners != '1') {
        //     extraDetails += '\n'
        // }
        // else {
        //     extraDetails += 'Multiple Winner: "Yes" \n'
        // }

        // try {
        //     MessageString = 'I just bet a ' + item.bet_amount + ' UDDA Bucks that  \n"' + item.question + extraDetails + 'My answer  "' + item.my_answer + '" .\nWould you like to accept the Bet? '

        // }
        // catch (e) {

        // }
        // MessageString += referStr + "\n" + url;


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



    goBacktoSetting() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }
    /* 
       Image zoom 
    */

    imageZoom(url: any, callback: any) {
        this.setState({ imageurl: url })
      

        this.setState({ imagezoom: true })
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

    }
    changeanswertext(text: any) {
        /*  let message = [];
         message = this.state.pooldata
         message.my_answer_text = text;
 
         this.setState({ poolanswer: text })
         // this.setState({pooldata:message})
 
         //this.state.customProbBetList[index].custom_pools.my_answer_text */
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

   /* agree and disagree popupdata */
    showPoolResultDialog(id: any) {

        this.setState({ loader: true });


        var params: any = {
            'bet_id': id,
            
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

       // fetch(UrlService.CONSTURI + UrlService.APIVERSION3 + '/Custom_PoolGaming/custom_pool_result_publish_info', {
        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 + '/Custom_PoolGaming/pool_contest_settled_bet_detail', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
                this.setState({ agreedata: responseJson.data });
                console.log('Success openplay' + JSON.stringify(this.state.agreedata));
               
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })

    }

    /* agree and disagree result */

    PoolBetResultAgreeDisagree(id: any, bet_status: any) {
        this.setState({ loader: true });
        var that = this;
        //setTimeout(function(){that.setState({ loader: false });},4000)
        var params: any = {
            'bet_id': id,
            'bet_status': bet_status
        };
        console.log('disagree parameter', JSON.stringify(params));
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }
       
        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 + '/Custom_PoolGaming/acceptor_publish_custom_pool_result', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                //that.hideLoader()
                this.setState({ loader: false });
                 this.getProfile();
               // RouterBuilder.replaceRouteTo(AppScreens.G_YourPrivateContest, this.props);
               this.props.navigation!.replace(AppScreens.G_UddaContests,{params:{bet_id:'ashish'}});
               // AlertUtil.show(responseJson.message);

                this.setState({ dialogVisible: false });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }
    closeImage = () => {
         this.setState({ imagezoom: false })
    }
    goBackToPrivateContests() {
     //   this.props.navigation!.navigate(AppScreens.G_YourPrivateContest);
    }
    // -----------------------------------------------Design and Design Methods---------------------------------------
    openQrModel(link:any){
        this.setState({imagezoomqrlink:link})
        this.setState({imagezoomqr:true})
        }
    render() {
        const images = [{

            url: this.state.imageurl,

        }]

        return (
            <Container
                title={(this.state.result_status == '0') ? 'POOL DETAIL' : 'CUSTOM POOL RESULT'}
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


                <View style={styles.maincontainercustom}>
                    <ProgressLoader
                        visible={this.state.loader}
                        isModal={true} isHUD={true}
                        hudColor={"#68bcbc"}
                        color={"#FFFFFF"} />
                    {this.state.BlackDialog && this.getblackDialog()}
                   {/*  <View style={styles.customhead}>
                        <View style={{ width: '10%' }}>
                            <Icons name="arrow-back" size={30} color="white" style={{ marginTop: 2 }}
                                onPress={() => this.goBackToPrivateContests()}
                            />
                        </View>
                        <View style={{ width: '90%', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.headerTitle}>CUSTOM POOL RESULT</Text>
                        </View>
                    </View> */}
                    <ScrollView>
                      
                        <Animated.View style={[{ flex: 1 }, { transform: [{ translateY: this.state.shift }] }]}>
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
                <Text style={[styles.customheadtext,{color:'#68bcbc'}]}>{(this.state.result_status == '0') ? 'POOL DETAIL' : 'CUSTOM POOL RESULT'}</Text>
              </View> 
        </View>
        
                            {this.state.agreedata.qr_code != '' &&<View style={{justifyContent:'center',flexDirection:'row',alignContent:'center',alignItems:'center',paddingLeft:'5%',paddingRight:'5%'}}>
                             
                              <TouchableOpacity onPress={()=>{this.openQrModel(this.state.agreedata.qr_code)}}>
                              <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../../../../images/magnifying_glass_qrcode_icon.png')}
                               // source={{uri:this.state.agreedata.qr_code}}
                                 >
                                </Image>
                              </TouchableOpacity>
                            </View>}

                            {this.state.agreedata.settlement_status == 'Settlement In-Progress' && <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:5}}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>{this.state.agreedata.settlement_status == 'Settlement In-Progress' ? this.state.agreedata.settlement_status :null}</Text>                                
                                </View>}
                            <View style={{ flex: 1, padding: '5%' }}>
                                <View>
                                    <View style={{ backgroundColor: 'white' }} >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Pool Name:</Text>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: '#222', textAlign: 'justify' }}>
                                                {this.state.agreedata.pool_name}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Question:</Text>

                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: '#222', textAlign: 'justify' }}>
                                                {this.state.agreedata.question}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>My Answer:</Text>

                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'grey', textAlign: 'justify' }}>
                                                {this.state.agreedata.my_answer}</Text>
                                        </View>
                                       {this.state.agreedata.publish_answer != '' &&  <View style={{ backgroundColor: '#eeeeee' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'grey', textAlign: 'justify' }}>
                                                {this.state.agreedata.creator_name}</Text>
                                        </View>}
                                        {this.state.agreedata.publish_answer != '' && <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />}

                                        {this.state.agreedata.publish_answer!='' && <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify' }}>Result:</Text>
                                                <Text style={{ padding: 10, paddingLeft: 0, fontFamily: 'Montserrat-Regular', fontSize: hp(2.4), color: '#222', textAlign: 'justify' }}>
                                                    {this.state.agreedata.publish_answer}</Text>
                                            </View>
                                        </View>}
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Bet Amount:</Text>

                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'grey', textAlign: 'justify' }}>
                                                {this.state.agreedata.bet_amount}</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Pool Amount:</Text>

                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'grey', textAlign: 'justify' }}>
                                                {this.state.agreedata.pool_amount}</Text>
                                            <View style={{ padding: 10, marginRight: 2 }}>
                                                <TouchableHighlight ref={ref => this.touchable = ref} onPress={() => this.showPopover()}>
                                                    <Image source={require('../../../../images/Bet_Share.png')} style={{ height: 20, width: 20 , tintColor:"#68bcbc"}} resizeMode='contain' tintColor="#68bcbc" />


                                                </TouchableHighlight>

                                            </View>
                                        </View>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Bold', fontSize: hp(2.4), color: '#222', textAlign: 'justify', paddingLeft: 0 }}>Amount To Win:</Text>

                                           <View style={{width:'50%'}}>
                                            <Text style={{ padding: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), color: 'grey', textAlign: 'justify' }}>
                                                {this.state.agreedata.settlement_status == 'Settlement In-Progress' ? null : (this.state.agreedata.winning_status == 'R' || this.state.agreedata.winning_status == 'W') ? '+' + this.state.agreedata.amount_to_win : '-' + this.state.agreedata.amount_to_win}
                                                {this.state.agreedata.settlement_status == 'Settlement In-Progress' ? '' : ((this.state.agreedata.winning_status == 'R') ? '(Refunded)' : '')}

                                            </Text>
                                            </View>
                                        </View>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#c3c3c3', marginBottom: 5, marginTop: 0 }} />
                                        {this.state.agreedata.show_image_link == '1' &&  <View>
                                            {this.state.agreedata.result_type == '1' ? <View style={[styles.customtextinputpool]}>
                                                <TextInput
                                                    value={this.state.agreedata.external_link}
                                                    clearTextOnFocus={true}
                                                    // numberOfLines={10}  
                                                    editable={false}
                                                    style={{ paddingLeft: 10, fontFamily: 'Montserrat-Semibold', fontSize: hp(2.4), height: hp(8), width: '80%', color: 'black' }}
                                                    placeholder='Enter URL'
                                                    placeholderTextColor={'#c3c3c3'}
                                                // onChangeText={(text) => { this.setState({poollink:text}) }}
                                                // onBlur={Keyboard.dismiss}
                                                />
                                            </View> : <View style={[styles.customtextinputpool, { padding: 10, backgroundColor: 'white' }]}>
                                                    <Dash dashColor={'#cfcfcf'} style={{ width: '100%' }} />
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Dash dashColor={'#cfcfcf'} style={{ width: 1, height: hp(11), flexDirection: 'column' }} />
                                                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.imageZoom(this.state.agreedata.result_image, '1') }}>
                                                            <View style={{ width: '100%', height: hp(11), flexDirection: 'row', backgroundColor: 'white', }}>
                                                                <View style={{ width: '90%', justifyContent: 'center', alignContent: 'center' }}>
                                                                    <Text style={[styles.datetimetext, { color: 'black' }]}>{'Uploaded Image'}</Text>
                                                                </View>
                                                                <View style={styles.datetimeicon}>
                                                                    <View style={{ marginRight: 8 }}><CircleImage width={wp(20)} imageFilePath={this.state.agreedata.result_image} /></View>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <Dash dashColor={'#cfcfcf'} style={{ width: 1, height: hp(11), flexDirection: 'column' }} />
                                                    </View>
                                                    <Dash dashColor={'#cfcfcf'} style={{ width: '100%' }} />
                                                </View>}
                                        </View>}

                                        {(this.state.agreedata.result_type != '0' && this.state.agreedata.result_text=='') && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                            <TouchableOpacity style={{ width: wp(24) }} onPress={() => { this.PoolBetResultAgreeDisagree(this.state.agreedata.bet_id, 2) }} >
                                                <View style={{ borderRadius: 3, height: 50, alignItems: 'center', backgroundColor: '#68bcbc', justifyContent: 'center', alignContent: 'center' }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontFamily: 'Montserrat-Bold',
                                                        fontSize: hp(2.1),

                                                        padding: 3
                                                    }} >Disagree</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ width: wp(24), marginLeft: 5 }} onPress={() => { this.PoolBetResultAgreeDisagree(this.state.agreedata.bet_id, 1) }} >
                                                <View style={{ borderRadius: 3, height: 50, alignItems: 'center', backgroundColor: '#68bcbc', justifyContent: 'center', alignContent: 'center' }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        fontFamily: 'Montserrat-Bold',

                                                        fontSize: hp(2.1),
                                                        padding: 3
                                                    }} >Agree</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>}

                                    </View>
                                </View>



                            </View>
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



export default connect(mapStateToProps)(G_AgreeDisagreeInfoView);
