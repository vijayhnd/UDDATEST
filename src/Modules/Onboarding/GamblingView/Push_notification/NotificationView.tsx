import React from "react";
import { View, Text, ScrollView,AsyncStorage, FlatList, TouchableWithoutFeedback, TouchableOpacity, BackHandler, Alert, Image } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppScreens from "../../../../Util/AppScreens";
import {AppEventsLogger} from 'react-native-fbsdk'; 
import AppValidationComponent, {  AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import RouterBuilder from "../../../../Router"
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import AlertUtil from "../../../../Util/AlertUtil";
import Application from "../../.../../../../Entities/Application";
import Icons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import UrlService from '../../../../Services/Core/ServiceURI';
import ProgressLoader from 'rn-progress-loader';
//import Hyperlink from 'react-native-hyperlink';
import { Dialog } from 'react-native-simple-dialogs';
import BigButton from "../../../../Components/Button/BigButton";
import moment from 'moment';
import ReferralService from "../../../../Services/Referral/ReferralService";
const CleverTap = require('clevertap-react-native');
var update = require('immutability-helper');


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'Notifications',
}

interface G_NotificationViewProps extends AppValidationComponentProps { }

interface G_NotificationViewState extends AppValidationComponentState {
    DataList: any;
    Flag: any;
    loader: any;
    expandText: boolean;
    textShown:boolean;
    setTextShown:boolean;
    lengthMore:boolean;
    notificationList:any;
    showIndexWise:any;
    ConfirmDialog: any;
    notificationForDelete: any;
}

export default class G_NotificationView extends AppValidationComponent<G_NotificationViewProps, G_NotificationViewState>
    implements MenuIconListener, LogoIconListener {
    private FAQData: any
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private referralservice = new ReferralService();
    constructor(props: G_NotificationViewProps) {
        super(props);
        this.state = {
            DataList: '',
            Flag: 'A',
            loader: false,
            expandText: false,
            textShown: false,
            setTextShown: false,
            lengthMore: false,
            notificationList: [],
            showIndexWise: '0',
            ConfirmDialog: false,
            notificationForDelete: []
        }
    }

    // ---------------------------------------------------------------------API Calling----------------------------------------------------------
    componentDidMount() {
        if(UrlService.isLiveApp == '1'){
        this.referralservice.logEvent('Notification_Click', {});
        AppEventsLogger.logEvent('Notification_Click');
        CleverTap.recordEvent('Notification_Click');
        
        }
        
        Application.sharedApplication().user!.profile.total_unread_push_notification = '';
        this.setState({ loader: true });
        this.getNotificationList();
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    // handleBackButton() {
    //     Alert.alert(
    //         'Exit App',
    //         'Are You Sure You Want to Exit the application?', [{
    //             text: 'Cancel',
    //             onPress: () => console.log('Cancel Pressed'),
    //             style: 'cancel'
    //         }, {
    //             text: 'OK',
    //             onPress: () => BackHandler.exitApp()
    //         },], {
    //         cancelable: false
    //     }
    //     )
    //     return true;
    // }

    // --------------------------------------------------------------------- Methods ----------------------------------------------------------
    accountNameTapped() {
        this.props.navigation!.navigate(AppScreens.G_ProfileView);

    }

    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {
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

    getNotificationList() {
        this.setState({ loader: true });
        var params: any = {
            'start': 1,
            'per_page': 10
        };
        
        var formData = new FormData();
    
        for (var k in params) {
            formData.append(k, params[k]);
        }
        fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/PushNotification/list_push_notifications', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == "Access Expired.") {
                    console.log("notification page ---->" + responseJson.message);
                }
                else{
                    this.setState({ notificationList: responseJson.data });

                    console.log('notification: ', JSON.stringify(this.state.notificationList));
                }
               

              
                this.setState({ loader: false });
            })
        .catch(error => {
            this.setState({ loader: false });
            console.log(error); 
        })
    }

    deleteNotificationList(noti_id) {
        this.setState({ ConfirmDialog: false });
        if(noti_id != null){
            var params: any = {
                'push_notification_id': noti_id
            };
        }else{
            var params: any = {
                'push_notification_id': ''
            };
        }
        
        var formData = new FormData();
    
        for (var k in params) {
            formData.append(k, params[k]);
        }
        fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/PushNotification/delete_push_notification', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.getNotificationList();
            })
        .catch(error => {
            this.setState({ loader: false });
            console.log(error); 
        })
    }

    deleteNotification(item: any, index: any){
        if(item != null){
            this.setState({ ConfirmDialog: true });
            this.setState({ notificationForDelete: item });
        }else{
            this.setState({ notificationForDelete: item });
            this.setState({ ConfirmDialog: true });
        }
    }
    goToAcceptCounterBet(routeId){
       
        Application.sharedApplication().DeeplinkName = 'custombet/';
        Application.sharedApplication().EncId = routeId;
        Application.sharedApplication().DeeplinkStatus = true;
        this.props.navigation!.navigate(AppScreens.G_PrivateBetView);
    }
    clickPushNotificationNav(item)
   {
console.log(item.page_name);
// const a = 'G_Highlighted_Matchups_View'

// this.props.navigation!.replace(AppScreens.G_ProfileView , this.props);


switch (item.page_name) {
    case 'highlighted_match':
        if (item.action_id != '3') {
            AsyncStorage.multiSet([
              ["league_id", item.action_id]
            ]);
          } else {
            AsyncStorage.multiSet([
              ["league_id", '3']
            ])
          }
        this.props.navigation!.replace(AppScreens.G_Highlighted_Matchups_View, this.props);
              break;
    case 'bet_history':
        this.props.navigation!.replace(AppScreens.G_HistoryView,this.props);
                break;
    case 'prop_bet_history':
        this.props.navigation!.replace(AppScreens.G_HistoryView,{params:{bet_id:'private'}});
                break;
    case 'dashboard':
        this.props.navigation!.replace(AppScreens.G_DashboardView, this.props);
        // this.props.navigation!.replace(AppScreens.Gambling_ApplicationStack, this.props);
              break;
    case 'free_to_play_contest_subscriber':
        // this.props.navigation!.navigate(AppScreens.G_UddaContests,{params:{bet_id:'free'}});
        this.props.navigation!.navigate(AppScreens.G_UddaContests);
            break;
    case 'buy_udda_bucks':
        // this.props.navigation!.replace(AppScreens.G_InAPPPurchaseView, this.props);
        this.props.navigation!.navigate(AppScreens.G_InAPPPurchaseViewIOS ,{params:{callFrom:'sideMenu'}});
            break;
    case 'private_bet_list':
        this.props.navigation!.replace(AppScreens.G_GamingBetView,{params:{bet_id:'private'}});
            break;
    case 'f2p_winners':
       this.props.navigation!.replace(AppScreens.G_FtpCurrentStanding , {params:{bet_id:item.action_id,type:'free_to_play_contest'}});
           break;
           case 'private_contest_winners':
       this.props.navigation!.replace(AppScreens.G_FtpCurrentStanding , {params:{bet_id:item.action_id,type:'private_contest'}});
           break;
           case 'public_contest_winners':
       this.props.navigation!.replace(AppScreens.G_FtpCurrentStanding , {params:{bet_id:item.action_id,type:'public_contest'}});
           break;
    case 'profile':
        this.props.navigation!.replace(AppScreens.G_ProfileView , this.props);
         break;
    case 'square_detail':
         this.props.navigation!.replace(AppScreens.G_ContestviewSquare,{params:{bet_id:item.action_id}})
        break;
    case 'square_box_info':
         this.props.navigation!.replace(AppScreens.G_ContestviewSquare,{params:{bet_id:item.action_id}})
        break;
    case 'accepted_private_contest':
         this.props.navigation!.replace(AppScreens.G_UddaContests,{params:{bet_id:'accepted_private_contest'}});
        break;
    case 'created_private_contest':
         this.props.navigation!.replace(AppScreens.G_UddaContests,{params:{bet_id:'created_private_contest'}});
        break;
        case 'settle_custom_bet':
            this.props.navigation!.navigate(AppScreens.G_CustomBetResult, { params: { bet_id: item.action_id } })
           break;
           case 'settle_pool':
            this.props.navigation!.navigate(AppScreens.G_Settlepool, { params: { bet_id: item.action_id } })
           break;
           case 'counter_custom_bet':
            this.goToAcceptCounterBet(item.action_id)
           break;
           case 'tutorial':
            this.props.navigation!.navigate(AppScreens.G_VideoList)
           break;
           case 'summary_notification':
            this.props.navigation!.navigate(AppScreens.G_SummaryNotificationView, { summary_date: item.summary_date })
           break;
           case 'contest_reentry':

           if(item.contest_type=='private_contest')
           {
            AsyncStorage.multiSet([
                ["league_id", item.league_id],
                ["contest_id", item.action_id],
                ["private_contest_id", item.action_id],
                ["from_private_contest", "1"],
                ["contest_type", 'private_contest'],
                ["contest_version", item.version_number]
            ])
           }else {
            AsyncStorage.multiSet([
                ["league_id", item.league_id],
                ["contest_id", item.action_id],
                ["from_private_contest", "0"],
                ["contest_type", item.contest_type],
                ["contest_version", item.version_number],
            ])           
           
           }
            if(item.version_number>2.7)
            {
                this.props.navigation!.push(AppScreens.G_FtpContestDashboard);
            }else{
                this.props.navigation!.push(AppScreens.G_ContestDashboardView);
            }

            // this.props.navigation!.navigate(AppScreens.G_SummaryNotificationView, { summary_date: item.summary_date })
           break;

    }


   }
    // ----------------------------------------------------------------- Design and Design Methods ----------------------------------------------------------
    render() {  
        const toggleNumberOfLines = (index) => { //To toggle the show text or hide it
            if(this.state.showIndexWise == index){
                this.setState({showIndexWise: '0'})
                this.setState({textShown: !this.state.textShown})
                this.setState({expandText: !this.state.expandText})
            }else{
                this.setState({showIndexWise: index})
                this.setState({textShown: !this.state.textShown})
                this.setState({expandText: !this.state.expandText})
            }
        }
        const onTextLayout = e =>{
            //console.log(e.nativeEvent.lines.length);
            if(e.nativeEvent.lines.length > 8){
                this.setState({lengthMore: true})
            }else{
                this.setState({lengthMore: false}) 
            }
        };
        
        const Space = ({ children }) => <Text>{children}</Text>
        const Link = ({ children }) => <Text
            onPress={toggleNumberOfLines}
            style={{ textAlignVertical: 'bottom',justifyContent: 'flex-end',color:'#67bcbc',fontFamily: 'Montserrat-Bold', fontSize: hp(2),paddingRight: '5%',textDecorationLine: 'underline' }}>{children}</Text>
            
        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                menuIconListener={this}
                LogoIconListener={this}
                accountNameListener={this}
                isSetting={false}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}
            >
                {/* -------------------------------- Alert confirm Dialogue --------------------------------*/}
                <Dialog
                    visible={this.state.ConfirmDialog}
                    title=""
                    onTouchOutside={() => this.setState({ ConfirmDialog: false })} >
                    <View style={{ backgroundColor: "white", padding: 10 }}>
                        <TouchableOpacity onPress={() => { this.setState({ ConfirmDialog: false }) }}>
                            <View style={{ alignItems: 'flex-end', width: '100%' }}>
                                <Image source={require('../../../../images/close.png')} style={{ height: 15, width: 15 }}></Image>
                            </View>
                        </TouchableOpacity>

                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} >
                            <Text style={{ padding: 1, fontFamily: 'Montserrat-semibold', textAlign: "center", fontSize: hp(1.8), color: 'black' }}>
                            {!this.state.notificationForDelete?'Are you sure you want to delete all notifications ?':'Are you sure you want to delete this notification ?'}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
                            <View style={{ width: '46%' }}>
                                <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.setState({ ConfirmDialog: false }) }} />
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ width: '46%' }}>
                                <BigButton title="OK" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                    listener={() => { {this.state.notificationForDelete == null?this.deleteNotificationList(null):this.deleteNotificationList(this.state.notificationForDelete.notification_id)} }} />
                            </View>
                        </View>
                    </View>
                </Dialog>

            <ProgressLoader
            visible={this.state.loader}
            isModal={true} isHUD={true}
            hudColor={"#68bcbc"}
            color={"#FFFFFF"} />
                <View style={styles.scrollContent}>
                    <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'white', height: '8%' }}>
                        <View style={{ alignContent: 'center', alignItems: 'center',width: '80%', paddingLeft: this.state.notificationList.length > 0? 80 : 0}}>
                            <Text style={styles.customheadtext}>NOTIFICATIONS</Text>
                        </View>
                        {this.state.notificationList.length > 0 ?
                        <TouchableOpacity onPress={()=>this.deleteNotification(null,null)}>
                            <Text style={{ color: '#f26522', fontSize: hp(2), fontFamily: 'Montserrat-Bold', textAlign: 'right', padding: '2%', paddingRight: '4%'}}>Clear All</Text>
                        </TouchableOpacity>:null}
                    </View>
                    
                    {this.state.notificationList.length > 0 ?<ScrollView bounces={false}>
                        <View style={styles.mainContent}>
                            <View style={styles.scrollContent}>
                                
                                    <FlatList
                                        extraData={this.state}
                                        data={this.state.notificationList}
                                        keyExtractor={(item: any, index) => index.toString()}
                                        bounces={false}
                                        renderItem={({ item, index }: any) => {
                                        var itemindex = '';
                                        itemindex = item.result_index;

                                        return (
                                            <View style={[styles.listItem,{marginBottom: '4%',paddingBottom: '2%'}]}>
                                                
                                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                                    <Text style={{color:'#67bcbc',fontFamily: 'Montserrat-Bold', fontSize: hp(2.4),width:'85%'}}>{item.notification_title}</Text>
                                                    
                                                        <TouchableOpacity onPress={()=>this.deleteNotification(item,index)}>
                                                        <View style={{width:50,alignItems: 'center'}}>
                                                            <Image style={{ width: 30,height: 30,paddingLeft: wp(2),paddingTop: wp(2) }} source={require('../../../../images/close_icon_noti.png')} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    
                                                </View>
                                                <View style={{ borderLeftWidth: 1, borderLeftColor: '#ccc' }}>
                                                
                                                    <View style={{flexDirection: 'row', marginTop: '1%'}}>
                                                    <TouchableOpacity onPress={() => {
                                                           item.action_required == 0 ?  null : this.clickPushNotificationNav(item)
                                                        }}>
                                                        {this.state.expandText?
                                                            <View style={{ paddingHorizontal: '2%', paddingVertical: '3%', width: '90%', paddingRight: '0%'}}>
                                                                {/* <Hyperlink linkStyle={{ color: '#2980b9', fontSize: hp(2), textDecorationLine: 'underline' }}> */}
                                                                    <Text style={{color:'#666',fontFamily: 'Montserrat-Bold', fontSize: hp(2)}}>{item.notification_desc}
                                                                        <Space>  </Space><Link>Less</Link>
                                                                    </Text>
                                                                {/* </Hyperlink> */}
                                                            </View>
                                                        :
                                                            <View style={{flex: 1,flexDirection: 'row', flexWrap: 'nowrap' }}>
                                                                {/* <Hyperlink  onTextLayout={onTextLayout} linkStyle={{ color: '#2980b9', fontSize: hp(2), textDecorationLine: 'underline' }}> */}
                                                                    <Text  numberOfLines={this.state.textShown? null : 8 } style={{flexShrink: 1,color:'#666',fontFamily: 'Montserrat-Bold', fontSize: hp(2), paddingHorizontal: '2%', paddingVertical: '0%', paddingRight: '5%'}}>{item.notification_desc}</Text>
                                                                {/* </Hyperlink> */}
                                                                {this.state.lengthMore?<Text
                                                                onPress={()=>toggleNumberOfLines(index)}
                                                                style={{ textAlignVertical: 'bottom',textAlign: 'left' ,color:'#67bcbc',fontFamily: 'Montserrat-Bold', fontSize: hp(2),textDecorationLine: 'underline' }}>More</Text>:null}
                                                            </View>
                                                        }
                                                        </TouchableOpacity>
                                                    </View>
                                                    
                                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    {/* <Text style={{color:'#b5b5b5',fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.8), paddingHorizontal: '2%', paddingVertical: '1%'}}>{moment(item.notification_date ).format('MM/DD/YYYY hh:mm:ss')}</Text> */}
                                                    <Text style={{color:'#b5b5b5',fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.8), paddingHorizontal: '2%', paddingVertical: '1%'}}>{moment(item.notification_timestamp * 1000).format('LT') +' '+ new Date(item.notification_timestamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(item.notification_timestamp * 1000).toString().split(' ')[6].length - 2) +' '+ moment(item.notification_timestamp * 1000).format('LL')}</Text>
                                                       
                                                 {/*    {item.action_required==0?null:<Text style={[styles.viewMore,{paddingHorizontal: '2%', paddingVertical: '1%'}]} onPress={()=>{item.action_type=='pool'?this.props.navigation!.navigate(AppScreens.G_Settlepool,{params:{bet_id:item.action_id}}):this.props.navigation!.navigate(AppScreens.G_CustomBetResult,{params:{bet_id:item.action_id}})}}>{item.action_type=='pool'?'Settle Pool':'Settle Bet'}</Text>} */}
                                                        {/* {item.action_required == 0 ?  null : <Text style={[styles.viewMore, { paddingHorizontal: '2%', paddingVertical: '1%' }]} onPress={() => {
                                                            this.clickPushNotificationNav(item)
                                                        }}>{item.button_name}</Text>} */}
                                                </View>
                                                {item.action_required == 0 ?  null : <Text style={[styles.viewMore, { paddingHorizontal: '2%', paddingVertical: '1%' ,textAlign:'right',textDecorationLine:item.page_name==''?'none':'underline'}]} onPress={() => {
                                                            this.clickPushNotificationNav(item)
                                                        }}>{item.button_name}</Text>}
                                                </View>
                                                
                                            </View>
                                        )
                                    }}/>
                                
                            </View>
                        </View>
                    </ScrollView>
                    :
                        <View style={{ height: '70%', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Text style={[styles.Current_Text_Style, { textAlign: 'center' }]}>No Data Found</Text>
                        </View>
                    }
                </View>
            </Container>
        );



    }
}
