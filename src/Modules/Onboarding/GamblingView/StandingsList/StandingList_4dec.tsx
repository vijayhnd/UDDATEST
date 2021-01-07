import React from "react";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, Image, FlatList, AsyncStorage, TouchableOpacity, ImageBackground } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import UpdateProfileResponse from "../../../../Services/Profile/UpdateProfileResponse";
import Application from "../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import { connect } from 'react-redux';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { UDDAError } from "../../../../Entities";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import ProgressLoader from 'rn-progress-loader';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import DetailComponent from "../../../../Components/CustomComponents/Free2Play/Freetoplaydetail";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'PROFILE'
}

interface G_StandingListProps extends AppValidationComponentProps {
    updateProfileRequestStatus?: ServiceRequestStatus
    updateProfileResponse?: UpdateProfileResponse
    updateProfileError?: UDDAError
    getProfileRequestStatus?: ServiceRequestStatus
    getProfileResponse?: GetProfileResponse
    getProfileError?: UDDAError
    serviceKey?: string
    listeners?: any
}

interface ProflieViewState extends AppValidationComponentState {
    contentInsetBottom: any;
    dialogVisible: boolean,
    OrderSummaryDialog: boolean,
    JoinNowSelected: any,
    Dialog: boolean,
    StandlingList: any,
    IsSelected: any,
    loader: any,
    RegisterDate: any,
    ChallengeName: any,
    EndDate: any
    Nodata: any
    contestdetail: any
    contestdetailid: any
    contestid: any
    responsedata: any
    contesttype: any
}


const bottom_initial = 0;

class G_StandingList extends AppValidationComponent<G_StandingListProps, ProflieViewState>
    implements MenuIconListener, ISubheaderListener {

    private serviceRequestInProgress = false
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;

    constructor(props: G_StandingListProps) {
        super(props);
        this.state = {
            contentInsetBottom: bottom_initial,
            dialogVisible: false,
            OrderSummaryDialog: false,
            JoinNowSelected: '',
            Dialog: false,
            StandlingList: '',
            IsSelected: '',
            loader: false,

            RegisterDate: '',
            ChallengeName: '',
            EndDate: '',
            Nodata: '',
            contestdetail: false,
            contestdetailid: '',
            contestid: '',
            responsedata: {},
            contesttype: '',
        }
    }


    componentDidMount() {
        // console.log('props statnding : ', this.props)
        if (this.props.navigation.state.params) {
            this.setState({ contesttype: this.props.navigation.state.params.params.type })
            this.callMethodf2p();
        } else {
            AsyncStorage.getItem('contest_Type').then((data) => {
                this.setState({ contesttype: data })


                if (data != 'free_to_play_contest') {
                    AsyncStorage.getItem('Standing_Type').then((data) => {
                        // this.setState({contestid:data})
                        if (data == "1") {
                            this.callMethodPrivate();
                        }
                        else {
                            this.callMethod();
                        }
                    });
                } else {
                    this.callMethodf2p();
                }

            });
        }


        // this.callMethod();
    }



    // -------------------------------------------------- API Calling ------------------------------------------------------
    callMethod() {

        this.setState({ loader: true });

        AsyncStorage.getItem('Standing_contest_id').then((data) => {
            var params: any = {
                'contest_id': data,
            };

            var formData = new FormData();

            for (var k in params) {
                formData.append(k, params[k]);
            }
            console.log('Standing_contest input' + JSON.stringify(params));

            fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/contest_standing_list', {
                method: 'POST',
                headers: {
                    //   'Content-Type': 'application/x-www-form-urlencoded', //garima
                    'authorisation': this.authorisationToken
                },
                body: formData,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loader: false });

                    var new_ContestStartTimestamp = responseJson.data.contest_start_date_timestamp * 1000;
                    var new_ContestStartDate = moment(new_ContestStartTimestamp).format('YY-MM-DD');
        
                    console.log("RegisterDate " + JSON.stringify(new_ContestStartDate));
        
                    var new_ContestEndTimestamp = responseJson.data.contest_end_date_timestamp * 1000;
                    var new_ContestEndDate = moment(new_ContestEndTimestamp).format('YY-MM-DD');
        
                    console.log("EndDate " + JSON.stringify(new_ContestEndDate));
                    //garima
                    // var newStartDate = new_ContestStartDate.split('-');
                    // var newEndDate = new_ContestEndDate.split('-');
                    var newStartDate = responseJson.data.contest_start_date.split('-');
                    var newEndDate = responseJson.data.contest_end_date.split('-');
                    var new_Start_Date = '';
                    var new_End_Date = '';
                    if (newStartDate[0] == newEndDate[0]) {
                      new_Start_Date = newStartDate[1] + "/" + newStartDate[2];
                      new_End_Date = newEndDate[1] + "/" + newEndDate[2] + "/" + newEndDate[0];
                    }
        
                    else {
                      new_Start_Date = newStartDate[1] + "/" + newStartDate[2] + newStartDate[0];
                      new_End_Date = newEndDate[1] + "/" + newEndDate[2] + "/" + newEndDate[0];
                    }
                    this.setState({ RegisterDate: new_Start_Date });
                    this.setState({ EndDate: new_End_Date });

                    console.log('Standing_contest Data ' + JSON.stringify(responseJson));

                    this.setState({ StandlingList: responseJson.data.StandlingList });
                    this.setState({ responsedata: responseJson.data });
                    this.setState({ ChallengeName: responseJson.data.ChallengeName });
                    // this.setState({ RegisterDate: responseJson.data.contest_start_date });
                    // this.setState({ EndDate: responseJson.data.contest_end_date });
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
        })
    }


    callMethodf2p() {

        this.setState({ loader: true });

        AsyncStorage.getItem('Standing_contest_id').then((data) => {

            if (this.props.navigation.state.params) {
                this.setState({ contestid: this.props.navigation.state.params.params.bet_id })
                var params: any = {
                    'contest_id': this.props.navigation.state.params.params.bet_id,
                };
            } else {
                this.setState({ contestid: data })
                var params: any = {
                    'contest_id': data,
                };
            }

            var formData = new FormData();

            for (var k in params) {
                formData.append(k, params[k]);
            }
            console.log('Standing_contest input' + JSON.stringify(params));

            fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/free_to_play_contest_standing_list', {
                method: 'POST',
                headers: {
                    //   'Content-Type': 'application/x-www-form-urlencoded', //garima
                    'authorisation': this.authorisationToken
                },
                body: formData,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loader: false });


                    console.log('free_to_play_contest_standing_list Data ' + JSON.stringify(responseJson));
                    if (responseJson.data.length != 0) {


                        var new_ContestStartTimestamp = responseJson.data.contest_start_date_timestamp * 1000;
            var new_ContestStartDate = moment(new_ContestStartTimestamp).format('YY-MM-DD');

            console.log("RegisterDate " + JSON.stringify(new_ContestStartDate));

            var new_ContestEndTimestamp = responseJson.data.contest_end_date_timestamp * 1000;
            var new_ContestEndDate = moment(new_ContestEndTimestamp).format('YY-MM-DD');

            console.log("EndDate " + JSON.stringify(new_ContestEndDate));
            //garima
            // var newStartDate = new_ContestStartDate.split('-');
            // var newEndDate = new_ContestEndDate.split('-');
            var newStartDate = responseJson.data.contest_start_date.split('-');
            var newEndDate = responseJson.data.contest_end_date.split('-');
            var new_Start_Date = '';
            var new_End_Date = '';
            if (newStartDate[0] == newEndDate[0]) {
              new_Start_Date = newStartDate[1] + "/" + newStartDate[2];
              new_End_Date = newEndDate[1] + "/" + newEndDate[2] + "/" + newEndDate[0];
            }

            else {
              new_Start_Date = newStartDate[1] + "/" + newStartDate[2] + newStartDate[0];
              new_End_Date = newEndDate[1] + "/" + newEndDate[2] + "/" + newEndDate[0];
            }
            this.setState({ RegisterDate: new_Start_Date });
            this.setState({ EndDate: new_End_Date });





                        this.setState({ StandlingList: responseJson.data.StandlingList });
                        this.setState({ responsedata: responseJson.data });
                        this.setState({ ChallengeName: responseJson.data.ChallengeName });
                        // this.setState({ RegisterDate: responseJson.data.contest_start_date });
                        // this.setState({ EndDate: responseJson.data.contest_end_date });
                    }
                    else if (responseJson.message == "Access Expired.") {
                        // AlertUtil.show("Session Expired ! Please login again");
                        console.log("Footer comp ---->" + responseJson.message);
                        LogoutUtill.logoutButtonPressed(this.props);
                    }
                })
                .catch(error => {
                    this.setState({ loader: false });
                    console.log(error);
                })
        })
    }


    callMethodPrivate() {

        this.setState({ loader: true });

        AsyncStorage.getItem('Standing_contest_id').then((data) => {
            var params: any = {
                'private_contest_id': data,
            };

            var formData = new FormData();

            for (var k in params) {
                formData.append(k, params[k]);
            }
            console.log('Standing_contest input' + JSON.stringify(params));

            fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/private_contest_standing_list', {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'authorisation': this.authorisationToken
                },
                body: formData,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ loader: false });

                    var new_ContestStartTimestamp = responseJson.data.contest_start_date_timestamp * 1000;
                    var new_ContestStartDate = moment(new_ContestStartTimestamp).format('YY-MM-DD');
        
                    console.log("RegisterDate " + JSON.stringify(new_ContestStartDate));
        
                    var new_ContestEndTimestamp = responseJson.data.contest_end_date_timestamp * 1000;
                    var new_ContestEndDate = moment(new_ContestEndTimestamp).format('YY-MM-DD');
        
                    console.log("EndDate " + JSON.stringify(new_ContestEndDate));
                    //garima
                    // var newStartDate = new_ContestStartDate.split('-');
                    // var newEndDate = new_ContestEndDate.split('-');
                    var newStartDate = responseJson.data.contest_start_date.split('-');
                    var newEndDate = responseJson.data.contest_end_date.split('-');
                    var new_Start_Date = '';
                    var new_End_Date = '';
                    if (newStartDate[0] == newEndDate[0]) {
                      new_Start_Date = newStartDate[1] + "/" + newStartDate[2];
                      new_End_Date = newEndDate[1] + "/" + newEndDate[2] + "/" + newEndDate[0];
                    }
        
                    else {
                      new_Start_Date = newStartDate[1] + "/" + newStartDate[2] + newStartDate[0];
                      new_End_Date = newEndDate[1] + "/" + newEndDate[2] + "/" + newEndDate[0];
                    }
                    this.setState({ RegisterDate: new_Start_Date });
                    this.setState({ EndDate: new_End_Date });

                    console.log('Standing_contest Data ' + JSON.stringify(responseJson));

                    this.setState({ StandlingList: responseJson.data.StandlingList });
                    this.setState({ responsedata: responseJson.data });
                    this.setState({ ChallengeName: responseJson.data.ChallengeName });
                    // this.setState({ RegisterDate: responseJson.data.contest_start_date });
                    // this.setState({ EndDate: responseJson.data.contest_end_date });
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
        })
    }



    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {
        // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
        RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
    }

    accountNameTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_ProfileView, this.props)
    }

    openPlaysTapped() {
        //AsyncStorage.removeItem('page_Type')
        RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }

    availableBalanceTapped() {
    }


    logoutButtonPressed() {
        Application.sharedApplication().logout()
        RouterBuilder.resetRouteTo(AppScreens.OnboardingStack, this.props)
    }


    IsSelectedMore(item: any, index: any) {

        for (let i = 0; i < this.state.StandlingList.length; i++) {
            if (i == index) {
                this.state.StandlingList[i].IsSelected = !this.state.StandlingList[i].IsSelected
            }
            else {
                this.state.StandlingList[i].IsSelected = false

            }
        }
        this.setState({ IsSelected: item })
    }

    closeDetailModal() {
        this.setState({ contestdetail: !this.state.contestdetail });
    }

    openDetailmodel(value: any) {
        this.setState({ contestdetailid: value });
        this.setState({ contestdetail: !this.state.contestdetail });
    }

    goinfo() {
        this.props.navigation!.navigate(AppScreens.G_InfochartView, this.props)
    }
    goToBetList(user_id,type) {
        this.props.navigation!.navigate(AppScreens.G_BetInfo, {contest_id:this.state.contestid,user_id:user_id,result_bet_type:type,contest_name:this.state.ChallengeName,register:this.state.RegisterDate,end:this.state.EndDate})
    }
//    async goToBack() {
//         var data ;
//         data = await AsyncStorage.getItem('page_Type')
//         if(data=='contest')
//         {AsyncStorage.removeItem('page_Type')
//               RouterBuilder.replaceRouteTo(AppScreens.G_ContestDashboardView, this.props)
//             }else{
//                 this.props.navigation.goBack(null)
//             }
        
//     }
    render() {
        return (
            <Container title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                showIndicator={this.serviceRequestInProgress}
                menuIconListener={this}
                LogoIconListener={this}
                accountNameListener={this}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}
                isSetting={false}>


                <ProgressLoader
                    visible={this.state.loader}
                    isModal={true} isHUD={true}
                    hudColor={"#68bcbc"}
                    color={"#FFFFFF"} />





                <View style={styles.mainContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:this.state.contesttype == 'free_to_play_contest' ?0:'3%' }}>
                      {this.state.contesttype == 'free_to_play_contest' ?null:  <View style={{ width: '15%' }}>
                            <Icons name="arrow-back" size={30} color="black" 
                            // onPress={() => RouterBuilder.replaceRouteTo(AppScreens.G_ContestDashboardView, this.props)}
                             onPress={() => this.props.navigation.goBack(null)}
                            //  onPress={() => this.goToBack()}
                             />
                        </View>}
                        <View style={{ width:this.state.contesttype == 'free_to_play_contest' ?'100%':'85%' }}>
                            {this.state.contesttype == 'free_to_play_contest' ? <View style={{  width: '100%', flexDirection: 'row',backgroundColor:'#CCCCCC' }}>
                                <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center',flexDirection:'row'}}>
                               <View style={{width:'15%',paddingLeft:5}}>
                               <Icons name="arrow-back" size={30} color="black" 
                            // onPress={() => RouterBuilder.replaceRouteTo(AppScreens.G_ContestDashboardView, this.props)}
                            onPress={() => this.props.navigation.goBack(null)}
                            // onPress={() => this.goToBack()}
                             />
                               </View>
                                    <View style={{width:'85%'}}>
                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: hp(1.7), textAlign:'center' }}>{this.state.ChallengeName}</Text>
                                    <Text style={{ color: 'black', fontFamily: 'Montserrat-Medium', fontSize: hp(1.2), textAlign:'center' }}>{this.state.RegisterDate}-{this.state.EndDate}</Text>
                                  </View>
                                </View>
                                <View style={{ width: '15%'}}>
                                    <TouchableOpacity onPress={() => {
                                        this.openDetailmodel(this.state.contestid)
                                    }} style={{ width: '100%'}}>
                                        <ImageBackground source={require('../../../../images/freetoplay.png')}
                                            resizeMode='stretch'
                                            style={{ width: '100%', height: 40 }}
                                        >

                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            </View> : <View style={{  width: '85%',justifyContent: 'center', alignItems: 'center'}}><Text style={styles.NFL_Text_Style}>{this.state.ChallengeName}</Text>
                            <Text style={[styles.NFL_Text_Style,{color: 'black'}]}>{this.state.RegisterDate}-{this.state.EndDate}</Text></View>}

                        </View>

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center',padding:'3%'}}>{this.state.contesttype == 'free_to_play_contest'?<Text style={styles.Current_Text_Style}>{this.state.responsedata.contest_result=='FINAL'?'FINAL STANDINGS':'CURRENT STANDINGS'}</Text>:<Text style={styles.Current_Text_Style}>CURRENT STANDINGS</Text>}
                        {/* <Text style={styles.Date_Text_Style}>{this.state.RegisterDate}-{this.state.EndDate}</Text> */}
                        </View>

                    {this.state.StandlingList.length > 0 ?
                        <View style={[styles.Flatlist_Style,{backgroundColor:(this.state.contesttype == 'free_to_play_contest')?'#FFF':'#dddddd'}]}>
                            {this.state.contesttype == 'free_to_play_contest'?this.state.responsedata.contest_result=='FINAL'?<View style={{width:'100%',flexDirection:'row',backgroundColor: '#666666',height:'15%'}}>
                                <View style={{width:'40%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={[styles.titleStyle]}>PARTICIPANT </Text>
                                </View>
                                {this.state.responsedata.bankroll=='Y'?null:<View style={{width:'26%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={[styles.titleStyle,{marginRight:this.state.responsedata.bankroll=='Y'?5:0}]}>{this.state.responsedata.bankroll=='Y'?'WON PICKS':'WON PICKS'} </Text>
                                </View>}
                                {this.state.responsedata.bankroll=='Y'&&<View style={{width:'26%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={[styles.titleStyle]}>BANKROLL AMOUNT</Text>
                                </View>}
                                {<View style={{width:'34%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={[styles.titleStyle,{textAlign:this.state.responsedata.bankroll=='Y'?'right':'auto'}]}>PRIZE LIST </Text>
                                </View>}
                            </View>:<View style={{width:'100%',flexDirection:'row',backgroundColor: '#666666',height:'15%'}}>
                                <View style={{width:this.state.responsedata.bankroll=='Y'&&this.state.responsedata.contest_result=='FINAL'?'33%':'40%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={[styles.titleStyle]}>PARTICIPANT </Text>
                                </View>
                                <View style={{width:this.state.responsedata.bankroll=='Y'&&this.state.responsedata.contest_result=='FINAL'?'19%':'26%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={[styles.titleStyle,{marginRight:this.state.responsedata.bankroll=='Y'?5:0}]}>{this.state.responsedata.bankroll=='Y'?'OPEN PICKS':'OPEN PICKS'} </Text>
                                </View>
                                {/* {this.state.responsedata.bankroll=='Y'&&<View style={{width:'21%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={[styles.titleStyle]}>BANKROLL AMOUNT </Text>
                                </View>} */}
                                {this.state.responsedata.bankroll=='Y'?<View style={{width:this.state.responsedata.bankroll=='Y'&&this.state.responsedata.contest_result=='FINAL'?'27%':'34%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={[styles.titleStyle,{textAlign:this.state.responsedata.bankroll=='Y'?'right':'auto'}]}>BANKROLL AMOUNT </Text>
                                </View>:<View style={{width:this.state.responsedata.bankroll=='Y'&&this.state.responsedata.contest_result=='FINAL'?'27%':'34%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text style={[styles.titleStyle,{textAlign:this.state.responsedata.bankroll=='Y'?'right':'auto'}]}>WON PICKS </Text>
                                </View>}
                            </View>:null}
                            {this.state.contesttype == 'free_to_play_contest' ?
                            <FlatList
                                data={this.state.StandlingList}
                                extraData={this.state}
                                keyExtractor={(item: any, index: any) => index.toString()}
                                renderItem={({ item, index }: any) => {
                                    var subindex = index;
                                    return (
                                        <View>
                                            {/* <TouchableOpacity style={{width:'100%'}} onPress={()=>{ this.goToBetList(item.userId)}}> */}
                                       {this.state.responsedata.contest_result=='FINAL'? <View style={{backgroundColor:'white',flexDirection:'row',borderBottomWidth:0.5,borderTopWidth: subindex==0?0.5:0,borderColor:'#dddddd'}}>
                                           <View style={{width:'40%',justifyContent:'flex-start',alignContent:'center',alignItems:'center',flexDirection:'row',borderRightWidth:0.5,borderColor:'#dddddd',padding:3}}> 
                                            <View style={[styles.Detail_Container1, { backgroundColor: 'white',width:'24%' }]}>
                                                    <View style={{  }}>
                                                        <Image
                                                            style={{ width: 30, height: 30, borderRadius: 100, borderWidth: 1 ,borderColor: 'white' }}
                                                            source={{ uri: item.Image }} >
                                                        </Image>
                                                    </View>
                                                </View>
                                                <View style={[styles.Name_Container1, { backgroundColor: 'white',width:item.is_win==0?'76%':'53%',flexDirection:'row',paddingLeft:'2%'}]}>
                                           <View style={{width:item.type!=''&&item.is_win==0?'48%':'98%',justifyContent:'center',alignContent:'center'}}>  
                                      <Text style={[styles.Count_Style,{color:item.is_win==0?'':'#68bcbc'}]} ellipsizeMode={'tail'} numberOfLines={1}>{item.Name}</Text>  
                                      </View>
                                      {item.type!=''&&item.is_win==0?<View style={{width:'50%',justifyContent:'center',alignContent:'center'}}>
                                                    <Text style={[styles.Count_Style,{color:item.is_win==0?'':'#68bcbc'}]}>{item.type!='' && <Text style={{fontSize:hp(1.6),color:item.is_win==0?'':'#68bcbc'}}>({item.type})</Text>}</Text>
                                                    </View>:null }                       
                                                </View>
                                                {item.is_win==0?null:<View style={{width:'23%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                                <Image
                                                            style={{ width: 30, height: 30 }}
                                                            resizeMode={'contain'}
                                                            source={require('../../../../images/ftpprize_icon.png')} >
                                                        </Image>
                                                </View>}
                                                {/* {item.is_win==0?null:<Image
                                                            style={{ width: 30, height: 30 }}
                                                            source={require('../../../../images/prize.png')} >
                                                        </Image>}                                               */}

                                                </View>

                                                {this.state.responsedata.bankroll=='Y'?null:<View style={{width:'26%',justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row',borderRightWidth:0.5,borderColor:'#dddddd'}}>
                                                <TouchableOpacity onPress={()=>{item.won_picks=='0'?null: this.goToBetList(item.userId,'won')}} style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={[styles.Count_Style,{color:item.is_win==0?'#666666':'#68bcbc',textDecorationLine:item.won_picks=='0'?'none':'underline'}]}><Text style={[styles.Name_Style,,{color:item.is_win==0?'#666666':'#68bcbc'}]}> {this.state.responsedata.bankroll=='Y'?item.won_picks:item.won_picks}</Text>
                                                    </Text>
                                                </TouchableOpacity>
                                                </View>}


                                                {this.state.responsedata.bankroll=='Y'?<View style={{width:'26%',justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row',borderRightWidth:0.5,borderColor:'#dddddd'}}>
                                                <TouchableOpacity onPress={()=>{ this.goToBetList(item.userId,'won')}} style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={[styles.Count_Style,{color:item.is_win==0?'#666666':'#68bcbc',textDecorationLine:'underline'}]}><Text style={[styles.Name_Style,,{color:item.is_win==0?'#666666':'#68bcbc'}]}> {item.available_bankroll}</Text>
                                                    </Text>
                                                </TouchableOpacity>
                                                </View>:null}
                                                {/* {item.is_win==0?null:<View style={{marginRight:20,justifyContent:'center',alignItems:'center',alignContent:'center',width:'10%'}}>
                                                <Image
                                                            style={{ width: 40, height: 40 }}
                                                            source={require('../../../../images/winner_trophy.png')} >
                                                        </Image>
                                                </View>} */}
                                                <View style={{width:'34%',justifyContent:'center',backgroundColor: item.Price == 'Lost'? '#bbbbbb':'#d2ebeb',alignContent:'center',alignItems:'center',flexDirection:'row',borderRightWidth:0.5,borderColor:'#dddddd'}}>
                                                    <TouchableOpacity style={{width:'100%'}} 
                                                    //  onPress={()=>{this.goToBetList(item.userId,'won')}}
                                                    >
                                                 <View style={[styles.Price_Container1, { flexDirection:'row' ,width:'100%' }]}>
                                                 {item.winning_type == 1 && <Image source={require('../../../../images/BucksGreenColor.png')} style={{ height: 15, width: 15, marginRight: 3 }} />}
                                                 {this.state.responsedata.bankroll=='Y' ? <Text style={[styles.Price_Text, { color:item.is_win==0?'#666666': '#68bcbc',textDecorationLine:'none' }]}>{item.Price}</Text>:<Text style={[styles.Price_Text, { color: item.is_win==0?'#666666':'#68bcbc',textDecorationLine:'none' }]}>{item.Price}</Text>}
                                                </View>
                                                </TouchableOpacity>
                                                </View>
                                               
                                        </View>: <View style={{backgroundColor:'white',flexDirection:'row',borderBottomWidth:0.5,borderTopWidth: subindex==0?0.5:0,borderColor:'#dddddd'}}>
                                           <View style={{width:this.state.responsedata.bankroll=='Y'&&this.state.responsedata.contest_result=='FINAL'?'33%':'40%',justifyContent:'flex-start',alignContent:'center',alignItems:'center',flexDirection:'row',borderRightWidth:0.5,borderColor:'#dddddd',padding:5}}> 
                                            <View style={[styles.Detail_Container1, { backgroundColor: 'white',width:'24%' }]}>
                                                    <View style={{}}>
                                                        <Image
                                                            style={{ width: 30, height: 30, borderRadius: 100, borderWidth: 1,borderColor: 'white' }}
                                                            source={{ uri: item.Image }} >
                                                        </Image>
                                                    </View>
                                                </View>
                                                <View style={[styles.Name_Container1, { backgroundColor: 'white',width:'76%',flexDirection:'row'}]}>
                                                {/* <TouchableOpacity onPress={() => {item.is_win==0?null:
                                        this.goToBetList(item.userId)
                                    }} > */}
                                    <View style={{width:item.type!=''?'70%':'98%'}}>
                                      <Text style={[styles.Count_Style,{color:item.is_win==0?'':'#68bcbc',width:'100%'}]} ellipsizeMode={'tail'}numberOfLines={1}>{item.Name}</Text>
                                                    </View>
                                                    {item.type!='' &&<View style={{width:'28%'}}>
                                      <Text style={[styles.Count_Style,{color:item.is_win==0?'':'#68bcbc',width:'100%'}]}>{item.type!='' && <Text style={{fontSize:hp(1.6),color:item.is_win==0?'':'#68bcbc'}}>({item.type})</Text>}
                                                    </Text>
                                                    </View>}
                                                   
                                    {/* </TouchableOpacity>  */}
                                                </View>
                                                {/* {<Image
                                                            style={{ width: 30, height: 30 }}
                                                            source={require('../../../../images/prize.png')} >
                                                        </Image>} */}

                                                </View>

                                                {<View style={{width:this.state.responsedata.bankroll=='Y'&&this.state.responsedata.contest_result=='FINAL'?'19%':'26%',justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row',borderRightWidth:0.5,borderColor:'#dddddd'}}>
                                                <TouchableOpacity onPress={()=>{item.open_picks!='0'&&item.picks!='0'? this.goToBetList(item.userId,'open'):null}} style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={[styles.Count_Style,{color:item.is_win==0&&item.type==''?'#666666':'#68bcbc',textDecorationLine:item.open_picks!='0'&&item.picks!='0'?'underline':'none'}]}><Text style={[styles.Name_Style,,{color:item.is_win==0&&item.type==''?'':'#68bcbc'}]}> {this.state.responsedata.bankroll=='Y'?item.picks:item.open_picks}</Text>
                                                    </Text>
                                                </TouchableOpacity>
                                                </View>}


                                                {this.state.responsedata.bankroll=='Y'?this.state.responsedata.contest_result=='FINAL'?<View style={{width:'21%',justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row',borderRightWidth:0.5,borderColor:'#dddddd'}}>
                                                <TouchableOpacity  style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={[styles.Count_Style,{color:item.is_win==0&&item.type==''?'#666666':'#68bcbc',textDecorationLine:item.type!=''?'underline':'none'}]}><Text style={[styles.Name_Style,,{color:item.is_win==0&&item.type==''?'':'#68bcbc'}]}> {item.available_bankroll}</Text>
                                                    </Text>
                                                </TouchableOpacity>
                                                </View>:null:null}
                                                {/* {item.is_win==0?null:<View style={{marginRight:20,justifyContent:'center',alignItems:'center',alignContent:'center',width:'10%'}}>
                                                <Image
                                                            style={{ width: 40, height: 40 }}
                                                            source={require('../../../../images/winner_trophy.png')} >
                                                        </Image>
                                                </View>} */}
                                                <View style={{width:this.state.responsedata.bankroll=='Y'&&this.state.responsedata.contest_result=='FINAL'?'27%':'34%',justifyContent:'center',backgroundColor: item.Price == 'Lost'? '#bbbbbb':'#d2ebeb',alignContent:'center',alignItems:'center',flexDirection:'row',borderRightWidth:0.5,borderColor:'#dddddd'}}>
                                                    <TouchableOpacity style={{width:'100%'}} onPress={()=>{item.won_picks=='0'?null:this.goToBetList(item.userId,'won')}}>
                                                 <View style={[styles.Price_Container1, { flexDirection:'row' ,width:'100%' }]}>
                                                 {this.state.responsedata.bankroll=='Y' && item.winning_type == 1 && <Image source={require('../../../../images/BucksGreenColor.png')} style={{ height: 15, width: 15, marginRight: 3 }} />}
                                                 {this.state.responsedata.bankroll=='Y' ? <Text style={[styles.Price_Text, { color: item.is_win==0&&item.type==''?'#666666':'#68bcbc',textDecorationLine:'underline' }]}>{item.available_bankroll}</Text>:<Text style={[styles.Price_Text, { color: item.is_win==0&&item.type==''?'#666666':'#68bcbc',textDecorationLine:item.won_picks=='0'?'none':'underline' }]}>{item.won_picks}</Text>}
                                                </View>
                                                </TouchableOpacity>
                                                </View>
                                               
                                        </View>}
                                        {/* </TouchableOpacity> */}
                                        </View>
                                    )
                                }} />:
                                <FlatList
                                data={this.state.StandlingList}
                                extraData={this.state}
                                keyExtractor={(item: any, index: any) => index.toString()}
                                renderItem={({ item, index }: any) => {
                                    var subindex = index;
                                    return (
                                        <View>
                                            <View style={styles.Flatlist_Main_Container}>
                                                <View style={[styles.Detail_Container, { backgroundColor: item.IsSelected == true ? '#f0f0f0' : 'white' }]}>
                                                    <View style={{  }}>
                                                        <Image
                                                            style={{ width: 40, height: 40,borderRadius: 100, borderWidth: 1,borderColor: 'white' }}
                                                            source={{ uri: item.Image }} >
                                                        </Image>
                                                    </View>
                                                </View>
                                                <View style={[styles.Name_Container, { backgroundColor: item.IsSelected == true ? '#f0f0f0' : 'white' }]}>
                                                    <Text style={styles.Count_Style}>{item.Id}. <Text style={styles.Name_Style}> {item.Name}</Text>
                                                    </Text>
                                                </View>
                                                <View style={[styles.Price_Container, { backgroundColor: item.IsSelected == true ? '#68bcbc' : '#d2ebeb' }]}>
                                                    <Text style={[styles.Price_Text, { color: item.IsSelected == true ? 'white' : '#68bcbc', }]}>{item.Price}</Text>
                                                </View>
                                            </View>

                                            {item.IsSelected == true ?
                                                <View>
                                                    <View style={styles.Line}></View>
                                                    <FlatList
                                                        data={item.TeamContest}
                                                        extraData={this.state}
                                                        keyExtractor={(item: any, index: any) => index.toString()}
                                                        renderItem={({ item, index }: any) => {
                                                            var subindex = index;
                                                            return (
                                                                <View>
                                                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                        <View style={{ width: '75%', backgroundColor: '#f0f0f0', height: 55, justifyContent: 'center' }}>
                                                                            <View style={{ marginLeft: 20, }}>
                                                                                <Text style={styles.Date_Text}>{item.Date}</Text>
                                                                                <View style={{ flexDirection: 'row' }}>
                                                                                    <Text style={item.away.iswin == true ? styles.Team2_Text : styles.Team1_Text}>{item.away.title}</Text>
                                                                                    <Text style={styles.Verses_Text}>v</Text>
                                                                                    <Text style={item.home.iswin == true ? styles.Team2_Text : styles.Team1_Text}>{item.home.title}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                        <View style={styles.Team_Price_Container}>
                                                                            <Text style={styles.Team_Price_Text}>{item.Price}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={styles.Line}>
                                                                    </View>
                                                                </View>
                                                            )
                                                        }} />
                                                </View>
                                                : null}


                                            {item.IsSelected == true ?
                                                <View style={{ flexDirection: 'row', }}>
                                                    <View style={{ width: '75%', backgroundColor: '#f0f0f0', height: 35, justifyContent: 'center' }}>
                                                    </View>
                                                    <View style={{ width: '25%', backgroundColor: '#d2d2d2', justifyContent: 'center', paddingRight: 20 }}>

                                                        <Text style={{ color: '#606060', fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'right' }}>{item.Price}</Text>
                                                    </View>
                                                </View>
                                                : null}
                                        </View>
                                    )
                                }} />
                            }

                        </View>
                        
                        :
                        <View style={{ width: '100%', height: '75%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                            <Text style={{ color: '#68bcbc', fontSize: 16, fontFamily: 'Montserrat-Bold' }}>No Data Found</Text>
                        </View>
                    }
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
                    />
                )}
            </Container >
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

export default connect(mapStateToProps)(G_StandingList);