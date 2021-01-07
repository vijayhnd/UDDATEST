import React, { ReactInstance } from "react";
import { View, Text, Image, FlatList, TouchableWithoutFeedback, BackHandler,TouchableOpacity } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import Application from "../../../../Entities/Application";
import ProgressLoader from 'rn-progress-loader';
import Popover from 'react-native-popover-view'
import LogoutUtill from "../../../../Util/LogoutUtill";
import moment from 'moment';
import UrlService from '../../../../Services/Core/ServiceURI'
import Icons from 'react-native-vector-icons/MaterialIcons';
import AlertUtil from "../../../../Util/AlertUtil";
var update = require('immutability-helper');

const ProfilePageContent = {
    key: 'somethun',
    page_title: 'MY BETS HISTORY',
}

interface G_HistoryViewProps extends AppValidationComponentProps {
}

interface G_HistoryViewState extends AppValidationComponentState {
    DataList?: any;
    isshow: any;
    kname: any;
    NoData: any;
    Loader: any;
    FromOdds: any;
    OpenPropSwitchAccepted: any;
    people_list: any;
    BlackDialog: any;
    selected_bet: any;
    blackdialogDate: any;
    morearchive: any;
}



const bottom_initial = 0;
export default class G_HistoryView extends AppValidationComponent<G_HistoryViewProps, G_HistoryViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private playtableData: any
    private listdata: any
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    constructor(props: G_HistoryViewProps) {
        super(props);
        this.state = {
            DataList: [],
            isshow: true,
            kname: '',
            NoData: '',
            Loader: false,
            FromOdds: '',
            OpenPropSwitchAccepted: '',
            people_list: [],
            BlackDialog: false,
            selected_bet: '',
            blackdialogDate: '',
            morearchive: '',

        };
    }

    componentDidMount() {
        if(this.props.navigation.state.params)
        {
            if(this.props.navigation.state.params.params){
                this.setState({ OpenPropSwitchAccepted: true });
          this.callPropHistory('c');
            }else{
                this.callMethod('c');
            }
          
 
            console.log('true data')
        }else{
            this.callMethod('c');
     }
        // this.callMethod('c');
        BackHandler.addEventListener('hardwareBackPress', ()=>  this.props.navigation!.replace(AppScreens.G_DashboardView) );
        // BackHandler.addEventListener('hardwareBackPress', ()=> this.props.navigation!.goBack(null) );
    }



    // ----------------------------------------------- API calling ---------------------------------------


    callMethod(value:any) {
        this.setState({ Loader: true });
        this.setState({ morearchive: '' });
        this.setState({ DataList: [] });
        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/history/'+value, {
            method: 'GET',
            headers: {
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ Loader: false });
                console.log('Success ' + JSON.stringify(responseJson));
                this.setState({ FromOdds: true });
                this.setState({ morearchive: responseJson.more_archive });
                this.setState({ DataList: responseJson.data });
                // this.setState({ DataList: datatableHistory.datalist });
                this.setState({ NoData: responseJson.error });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => console.log(error))
    }


callPropHistory(value:any) {
        this.setState({ Loader: true });
        this.setState({ morearchive: '' });
        this.setState({ DataList: [] });
        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_props_history/'+value, {
            method: 'GET',
            headers: {
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ Loader: false });
                console.log('Success ' + JSON.stringify(responseJson));
                this.setState({ FromOdds: false });
                this.setState({ morearchive: responseJson.more_archive });
                this.setState({ DataList: responseJson.data });
                this.setState({ NoData: responseJson.error });
           
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => console.log(error))
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
        this.props.navigation!.navigate(AppScreens.G_UddaContests);
    }

    coveredPlaysTapped() {
        this.props.navigation!.navigate(AppScreens.G_GamingBetView);
    }


    cellDidClicked(tag: number, tableViewCellReference: ReactInstance): void {
    }

    toggleSubview(item: any, index1: any, index2: any, index3: any) {
        item.isselected = !item.isselected;
        let newState = update(this.state.DataList, {
            [index1]: {
                game_array: {
                    [index2]: {
                        date_array: {
                            [index3]: { $set: item }
                        }
                    }
                }
            }
        });
        this.setState({ DataList: newState });

    }

    OpenPropSwitchValueChanged() {

        if (this.state.OpenPropSwitchAccepted === true) {
            this.setState({ OpenPropSwitchAccepted: false });
            this.callMethod('c');
        }
        else {
            this.setState({ OpenPropSwitchAccepted: true });
            this.callPropHistory('c');
        }
    }

    blackdialogOpen(item: any, index: any, index2: any, index3: any) {
        var new_time_stamp = item.bet_time_stamp * 1000;
        var formated_time = moment(new_time_stamp).format('MMMM DD,YYYY');
        this.setState({ blackdialogDate: formated_time });

        for (let i = 0; i < this.state.DataList.length; i++) {
            for (let j = 0; j < this.state.DataList[i].game_array.length; j++) {
                for (let k = 0; k < this.state.DataList[i].game_array[j].game_array.length; k++) {
                    if (i == index && j == index2 && k == index3) {
                        this.state.DataList[i].game_array[j].game_array[k].BlackDialog = true
                        this.setState({ people_list: this.state.DataList[i].game_array[j].game_array[k].share_info });
                        this.setState({ selected_bet: item });
                    }
                    else {
                        this.state.DataList[i].game_array[j].game_array[k].BlackDialog = false
                    }
                }
            }
        }

        this.setState({ DataList: this.state.DataList });
        console.log(JSON.stringify(this.state.DataList));
    }

    closePopover() {
        for (let i = 0; i < this.state.DataList.length; i++) {
            for (let j = 0; j < this.state.DataList[i].game_array.length; j++) {
                for (let k = 0; k < this.state.DataList[i].game_array[j].game_array.length; k++) {
                    this.state.DataList[i].game_array[j].game_array[k].BlackDialog = false
                }
            }
        }
        this.setState({ DataList: this.state.DataList });
    }



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


    // ---------------------------------------------------- Design and Design Methods -------------------------------------------

    getblackDialog(touchableRef: any) {
        return (
            <Popover
            isVisible={true}
           // fromView={touchableRef}
          // backgroundStyle={{position:'absolute', top:100, paddingTop:hp(20), backgroundColor: '#fff' }}
        //   mode={'rn-modal'}
        // // mode={{'js-modal'
        popoverStyle ={{ marginLeft:-10, marginTop:hp(6)}}
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
                    {/*garima */}
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={{ width: '40%', color: 'black', fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Bet Date:</Text>

                        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                            <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.blackdialogDate}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={{ width: '40%', color: 'black', fontSize: 12, fontFamily: 'Montserrat-Regular', height: 20, alignItems: 'center' }}>Creator</Text>

                        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'flex-end', height: 20 }}>
                            <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{this.state.selected_bet.creator}</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#777777', marginVertical: 5, width: '95%', height: 2, alignItems: 'center' }}>
                        </View>
                    </View>
                       {/*garima ends */}
                    {this.state.people_list.length > 0 ?
                    <View style={{height:hp(65)}}>
                        <FlatList
                            extraData={this.state}
                            data={this.state.people_list}
                            keyExtractor={(item: any, index) => index.toString()}
                            bounces={false}
                            renderItem={({ item, index }: any) => {
                                return (
                                    item.status == 1 ? <View>
                                    <View style={{ width: '100%', flexDirection: 'row' ,height:40,alignContent:'center',alignItems:'center'}}>
                                        <Text style={{ width: '70%', color: 'black', fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center' }}>{item.username}</Text>

                                        <View style={{ flexDirection: 'row', width: '30%', justifyContent: 'flex-end', height: 20 }}>
                                            <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                            <Text style={{ color: 'black', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center' }}>{item.amount}</Text>
                                        </View>
                                    </View>
                                    <View style={{borderBottomColor: '#EEEEEE',borderBottomWidth: hp(.3),}} />
                                </View> : <View >
                                        <View style={{ width: '100%', flexDirection: 'row' ,height:40,alignContent:'center',alignItems:'center'}}>
                                            <Text style={{ width: '70%', color: '#808080', fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.username}</Text>

                                            <View style={{ flexDirection: 'row', width: '30%', justifyContent: 'flex-end', height: 20 }}>
                                                <Image source={require('../../../../images/BucksWhite.png')} style={{ height: 8, width: 8, alignItems: 'center', marginRight: 2, marginTop: 3 }} />
                                                <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textDecorationLine: 'line-through' }}>{item.amount}</Text>
                                            </View>
                                        </View>
                                        <View style={{borderBottomColor: '#EEEEEE',borderBottomWidth: hp(.3),}} />
                                    </View>
                                )
                            }}
                        />
                        </View>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ width: '100%', color: 'black', fontSize: 12, fontFamily: 'Montserrat-Bold', height: 20, textAlign: 'center' }}>No record found</Text>
                        </View>
                    }
                </View>
            </Popover>

        )
    }


    render() {
        var a = "\n Cancelled \n Refund"
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
                openPlaysListener={this}
                coveredPlaysListener={this}>

                <ProgressLoader
                    visible={this.state.Loader}
                    isModal={true} isHUD={true}
                    hudColor={"#68bcbc"}
                    color={"#FFFFFF"} />

                <View style={styles.scrollContent} >
                    <View style={styles.mainContent}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexShrink: 1, backgroundColor: 'white' }}>

                                <View style={styles.NameHeaderContainer}>
                                    <View style={{ width: '60%' }}>
                                        <Text style={styles.NameStyle}>MY BETS HISTORY</Text>
                                    </View>
                                    <View style={{ width: '40%', alignItems: 'center', flexDirection: 'row', paddingRight: 5 }}>

                                        <View style={{ width: 'auto', height: 'auto', }}>
                                            <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 2, marginRight: 5, textAlign: 'right', color: this.state.OpenPropSwitchAccepted == false ? 'black' : '#888888' }}>Standard</Text>
                                            <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 2, marginRight: 5, textAlign: 'right', color: this.state.OpenPropSwitchAccepted == false ? 'black' : '#888888' }}>Bets</Text>
                                        </View>

                                        <TouchableWithoutFeedback onPress={() => { this.OpenPropSwitchValueChanged() }}>
                                            <Image source={this.state.OpenPropSwitchAccepted == true ? require('../../../../images/toggle_on_G.png') : require('../../../../images/toggle-off-button.png')}
                                                style={{ height: 20, width: 40 }}
                                                resizeMode="contain"></Image>
                                        </TouchableWithoutFeedback>

                                        <View style={{ width: 'auto', height: 'auto', }}>
                                            <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPropSwitchAccepted == true ? 'black' : '#888888' }}>Prop</Text>
                                            <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, marginRight: 2, color: this.state.OpenPropSwitchAccepted == true ? 'black' : '#888888' }}>Bets</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.titleContainer]} >
                                    <View style={{ width: '100%', height: 35, backgroundColor: '#666666', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                                        <View style={{ width: '36%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), fontFamily: 'Montserrat-Bold', textAlign: 'center' }}>
                                                MATCH UP
                                            </Text>
                                        </View>
                                        <View style={{ width: '16%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>
                                                AMOUNT {"\n"} BET
                                            </Text>
                                        </View>
                                        <View style={{ width: '24%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold', }}>
                                                LINE
                                            </Text>
                                        </View>
                                        <View style={{ width: '24%', height: '100%', justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: hp(1.4), textAlign: 'center', fontFamily: 'Montserrat-Bold', }}>
                                                AMOUNT {"\n"} WIN/LOSS
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {this.state.DataList.length > 0 ?
                                    <FlatList
                                        data={this.state.DataList}
                                        extraData={this.state}
                                        keyExtractor={(item: any, index) => index.toString()}
                                        bounces={false}
                                        renderItem={({ item, index }: any) => {
                                            var date = item.date_label.split(' ');
                                            var data_index = index;

                                            return (

                                                <View style={{ backgroundColor: 'white' }}>

                                                    {/* --------------------- Game Header ---------------- */}
                                                    <View style={styles.gameheader}>
                                                        <View style={{ width: '80%', flexDirection: 'row', }}>
                                                            <View>
                                                                <Text style={styles.gameheadertext} >
                                                                    {date[0]}
                                                                    <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {date[1]} {date[2]} </Text>
                                                                </Text>
                                                            </View>
                                                        </View>

                                                        {/* <View style={{ width: '20%',alignItems: 'flex-end' }}>
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
                                                            return (
                                                                <View>
                                                                    <View style={[styles.gamedatetimecontainer, { flexDirection: 'row' }]}>

                                                                        <View style={{ paddingLeft: 5, paddingRight: 10, justifyContent: "center" }}>
                                                                            <Image source={{ uri: item.sport_icon }} style={{ height: 15, width: 15 }} tintColor='white'></Image>
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
                                                                            var sign_spread_home: any;
                                                                            var sign_spread_away: any;
                                                                            var sign_total_home: any;
                                                                            var sign_total_away: any;
                                                                            var index3 = index;
                                                                            var dateTimeObj: any;
                                                                            if (item.bet_odds_type == 'PS') {
                                                                                sign_spread_home = item.home.ps_home_spread.split(' ');
                                                                                sign_spread_away = item.away.ps_away_spread.split(' ');
                                                                            }
                                                                            else if (item.bet_odds_type == 'T') {
                                                                                sign_total_home = item.home.total.split(' ');
                                                                                sign_total_away = item.away.total.split(' ');
                                                                            }
                                                                            if (item.ttype == 'c') {
                                                                                dateTimeObj = this.getDateTimeFromTimeZone(item.bet_expired_on_time_stamp);
                                                                                //console.log('mytimeObj', dateTimeObj);
                                                                            } else if (item.ttype == 'o') {
                                                                                dateTimeObj = this.getDateTimeFromTimeZone(item.match_time_stamp);
                                                                                //console.log('mytimeObj', dateTimeObj);
                                                                            } else if (item.ttype == 'p') {
                                                                                dateTimeObj = this.getDateTimeFromTimeZone(item.match_time_stamp);
                                                                                //console.log('mytimeObj', dateTimeObj);
                                                                            }  
                                                                            return (
                                                                                <View>
                                                                                    {item.ttype == 'c' && <View style={[styles.timecontainer]}>
                                                                                        <Text style={[styles.betclosetext]} >Bet closes at 
                                                                                        <Text style={[styles.daystext]}> {dateTimeObj.Match_date[0]}</Text>
                                                                                            <Text style={[styles.timetext]}> {dateTimeObj.Match_date[1]} {dateTimeObj.Match_date[2]} {dateTimeObj.formated_time} {dateTimeObj.zone} </Text>
                                                                                        </Text>

                                                                                    </View>}
                                                                                    {item.ttype == 'o' && <View style={[styles.timecontainer]}>
                                                                                        <Text style={[styles.daystext]}> {dateTimeObj.Match_date[0]} <Text style={[styles.timetext]}> {dateTimeObj.Match_date[1]} {dateTimeObj.Match_date[2]} {dateTimeObj.formated_time} {dateTimeObj.zone} </Text>
                                                                                        </Text>


                                                                                    </View>}
                                                                                    {item.ttype == 'p' && <View style={[styles.timecontainer]}>
                                                                                        <Text style={[styles.daystext]}> {dateTimeObj.Match_date[0]} <Text style={[styles.timetext]}> {dateTimeObj.Match_date[1]} {dateTimeObj.Match_date[2]} {dateTimeObj.formated_time} {dateTimeObj.zone} </Text>
                                                                                        </Text>


                                                                                    </View>}
                                                                                    <View style={styles.gamelistcontainer}>
                                                                                        <TouchableWithoutFeedback>
                                                                                            <View style={styles.gamelistindexcontainer}>
                                                                                            </View>
                                                                                        </TouchableWithoutFeedback>

                                                                                        {this.state.FromOdds == true ?

                                                                                            <View style={styles.gamelistteamcontainer}>

                                                                                                <View style={[styles.gamelistteam1container, { position: 'relative'}]}>

                                                                                                    <View style={[styles.gamelistmatchup, { flexDirection: 'row', alignItems: 'center' }]}>
                                                                                                        <Text style={[styles.teamtitletext, { width: '80%', flexWrap: 'wrap', color: item.away.is_bet_team == 'true' ? '#68bcbc' : '#888888' }]}>{item.league_id == '2' || item.league_id == '4' ? item.away.t : item.away.t}<Text style={[item.away.is_bet_team == 'true' ? styles.teamtitletext : styles.team2titletext, { fontFamily: 'Montserrat-Regular' }]}>({item.away.result_text})</Text> </Text>
                                                                                                        <Text style={[styles.flatlist_matchup_count_text_style, { fontFamily: item.away.is_bet_team == 'true' ? 'Montserrat-SemiBold' : 'Montserrat-Regular' }]}>
                                                                                                            {item.away.result}
                                                                                                        </Text>
                                                                                                    </View>


                                                                                                    <View style={item.away.is_bet_team == 'true' ? styles.gamelistamountbet : styles.gamelistamountbetteam2}>
                                                                                                        {item.away.is_bet_team == 'true' ? <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} /> : null}
                                                                                                        <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.away.is_bet_team == 'true' ? parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</Text>
                                                                                                    </View>

                                                                                                    <View style={item.away.is_bet_team == 'true' ? styles.gamelistline : styles.gamelistlineteam2}>

                                                                                                        {item.bet_odds_type == 'ML' ?
                                                                                                            <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(item.away.ml_away_price > 0 ? '+' : item.away.ml_away_price == 0 ? '' : '-') + Math.abs(item.away.ml_away_price)} </Text>
                                                                                                            :
                                                                                                            item.bet_odds_type == 'T' ?
                                                                                                                <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.away.total}</Text>
                                                                                                                :
                                                                                                                <Text style={item.away.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(sign_spread_away[0] > 0 ? '+' : '') + item.away.ps_away_spread}</Text>
                                                                                                        }

                                                                                                    </View>
                                                                                                </View>
                                                                                                {item.ml_draw_price && <View style={[{ flexDirection: 'row', position: 'absolute', top: '35%', width: '100%', left: '53%', height: '33%', zIndex: 1, }]}>



                                                                                                    <View style={[item.draw.is_bet_team == 'true' ? styles.gamelistamountbet : styles.gamelistamountbetteam2, { width: '25%' }]}>
                                                                                                        {item.draw.is_bet_team == 'true' ? <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} /> : null}
                                                                                                        <Text style={item.draw.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.draw.is_bet_team == 'true' ? parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</Text>
                                                                                                    </View>

                                                                                                    <View style={[item.draw.is_bet_team == 'true' ? styles.gamelistline : styles.gamelistlineteam2, { width: '26%' }]}>

                                                                                                        {item.bet_odds_type == 'ML' &&
                                                                                                            <Text style={[item.draw.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext, { textAlign: 'center' }]}>D {(item.draw.ml_draw_price > 0 ? '+' : item.draw.ml_draw_price == 0 ? '' : '-') + Math.abs(item.draw.ml_draw_price)}</Text>


                                                                                                        }

                                                                                                    </View>

                                                                                                </View>}

                                                                                                <View style={styles.gamelistteam2container}>

                                                                                                    <View style={[styles.gamelistmatchupteam2, { flexDirection: 'row', alignItems: 'center' }]}>
                                                                                                        <Text style={[styles.team2titletext, { width: '80%', flexWrap: 'wrap', color: item.home.is_bet_team == 'true' ? '#68bcbc' : '#888888' }]}>{item.league_id == '2' || item.league_id == '4' ? item.home.t : item.home.t}<Text style={[item.home.is_bet_team == 'true' ? styles.teamtitletext : styles.team2titletext, { fontFamily: 'Montserrat-Regular' }]}>({item.home.result_text})</Text> </Text>

                                                                                                        <Text style={[styles.flatlist_matchup_count_text_style, { fontFamily: item.home.is_bet_team == 'true' ? 'Montserrat-SemiBold' : 'Montserrat-Regular' }]}>
                                                                                                            {item.home.result}
                                                                                                        </Text>
                                                                                                    </View>

                                                                                                    <View style={item.home.is_bet_team == 'true' ? styles.gamelistamountbet : styles.gamelistamountbetteam2}>
                                                                                                        {item.home.is_bet_team == 'true' ? <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} /> : null}
                                                                                                        <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.home.is_bet_team == 'true' ? parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null}</Text>
                                                                                                    </View>

                                                                                                    <View style={item.home.is_bet_team == 'true' ? styles.gamelistline : styles.gamelistlineteam2}>

                                                                                                        {item.bet_odds_type == 'ML' ?
                                                                                                            <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(item.home.ml_home_price > 0 ? '+' : item.home.ml_home_price == 0 ? '' : '-') + Math.abs(item.home.ml_home_price)}</Text>
                                                                                                            :
                                                                                                            item.bet_odds_type == 'T' ?
                                                                                                                <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{item.home.total} </Text>
                                                                                                                :
                                                                                                                <Text style={item.home.is_bet_team == 'true' ? styles.teamoddstext : styles.team2oddstext}>{(sign_spread_home[0] > 0 ? '+' : '') + item.home.ps_home_spread} </Text>
                                                                                                        }

                                                                                                    </View>

                                                                                                </View>

                                                                                            </View>
                                                                                            :
                                                                                            <View style={styles.gamelistteamcontainer}>

                                                                                                <View style={[styles.QuestionContainer]}>
                                                                                                    <Text style={styles.Quetitletext}> {item.question} </Text>
                                                                                                </View>

                                                                                                <View style={styles.gamelistteam2container}>

                                                                                                    <View style={[styles.gamelistmatchupteam2, { backgroundColor: '#888888' }]}>
                                                                                                        <Text style={styles.Proptitletext}> {item.ttype == 'p' ? 'PROP BET' : item.ttype == 'cp' ?'CUSTOM POOL BET':'CUSTOM BET'} </Text>
                                                                                                    </View>

                                                                                                    <View style={styles.gamelistamountbet}>
                                                                                                        <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 8, width: 8, marginRight: 3 }} />

                                                                                                        <Text style={styles.teamoddstext}>{parseInt(item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                                                                                    </View>

                                                                                                    <View style={styles.gamelistline}>
                                                                                                        {item.ttype == 'p' ?
                                                                                                            <Text style={styles.teamoddstext}> {item.bet_team_type == 'under' ? 'U' : 'O'} {item.total}<Text style={{ fontFamily: 'Montserrat-SemiBold' }}> ({item.line})</Text> </Text>
                                                                                                            :
                                                                                                            item.ttype == 'cp' ?null:<Text style={styles.teamoddstext}> {item.line} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {item.odds}</Text> </Text>
                                                                                                            // <Text style={styles.teamoddstext}> {item.line} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {item.ttype == 'p'  ? 'ML' : ' '}</Text> </Text>
                                                                                                        }
                                                                                                    </View>

                                                                                                </View>

                                                                                            </View>
                                                                                        }



                                                                                        {/* <View style={[styles.gamelisttotalcontainer, { backgroundColor: item.winning_status == "W"  ? "#68bcbc" : "#BBBBBB" }]}> */}
                                                                                        {item.settlement_status=='Settlement In-Progress'?<View style={[styles.gamelisttotalcontainer, { backgroundColor: "#68bcbc"}]}>
                                                                                        <Text style={[styles.teamtotaltext, { color: "white",width:'90%'}]}>{item.settlement_status} </Text>
                                                                                        </View>:<View style={[styles.gamelisttotalcontainer, { backgroundColor:this.state.OpenPropSwitchAccepted == true? item.result_text != 'Disagree' && item.winning_status != "L" ? "#68bcbc" : "#BBBBBB":item.winning_status == "W"  ? "#68bcbc" : "#BBBBBB" }]}>
                                                                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                { this.state.OpenPropSwitchAccepted == true?item.ttype == 'cp' ?item.result_text == 'Disagree'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>+</Text>:item.result_text == 'Agree' && (item.winning_status=='W'||item.winning_status=='R')?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>+</Text>:<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>-</Text>:
                                                                                                item.result_text == 'Disagree'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>+</Text>:
                                                                                                <Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{item.winning_status == "W" ||item.winning_status == "R" ? "+" : "-"} </Text>:item.winning_status == "R" ?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>+</Text>:
                                                                                                <Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{item.winning_status == "W" || item.winning_status == "R"? "+" : "-"} </Text>}
                                                                                                
                                                                                                <Image source={item.winning_status == "W" ? require('../../../../images/White_Bucks.png') : require('../../../../images/Buckscut.png')} style={{ height: 10, width: 10, marginRight: 3 }} />
                                                                                                <Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{parseInt(item.amount_to_win).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                                                                                            
                                                                                            {item.bet_type == 2 ?
                                                                                                <TouchableWithoutFeedback onPress={() => { this.blackdialogOpen(item, data_index, index2, index3) }}>
                                                                                                    <View style={{ marginRight: 2 }}>
                                                                                                        <Image ref={ref => item.touchable = ref} source={item.winning_status == "W" ? require('../../../../images/Bet_Share.png') : require('../../../../images/Bet_Share_icon_new.png')} style={{ height: 15, width: 15 }} resizeMode='contain' />
                                                                                                    </View>
                                                                                                </TouchableWithoutFeedback>
                                                                                                :item.ttype == 'cp'?<TouchableWithoutFeedback onPress={() => { this.blackdialogOpen(item, data_index, index2, index3) }}>
                                                                                                <View style={{ marginRight: 2 }}>
                                                                                                    <Image ref={ref => item.touchable = ref} source={item.winning_status == "W" ? require('../../../../images/Bet_Share.png') : require('../../../../images/Bet_Share_icon_new.png')} style={{ height: 15, width: 15 }} resizeMode='contain' />
                                                                                                </View>
                                                                                            </TouchableWithoutFeedback>: null
                                                                                            }
                                                                                            </View>
                                                                                           {  this.state.OpenPropSwitchAccepted == true?item.ttype == 'cp' ?<View style={{justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
                                                                                        {item.result_text == 'Disagree'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{'\n'}Disagree{'\n'}Refund</Text>:item.result_text == 'Agree'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{'\n'}Agree{item.winning_status == "R"?'\n Refund':null}</Text>:null}
                                                                                           </View>:<View style={{justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
                                                                                        {/* {item.ttype == 'p'?item.winning_status == 'R'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{a}</Text>:null:item.result_text == 'Agree'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{'\n'}Agree</Text>:<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{'\n'}Disagree</Text>} */}
                                                                                        {item.ttype == 'p'?item.winning_status == 'R'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{a}</Text>:null:<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{'\n'}{item.result_text}</Text>}
                                                                                        {item.ttype == 'p'?null:item.winning_status=='R'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>Refund</Text>:null}
                                                                                        {/* {item.ttype == 'p'?null:item.winning_status=='R'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>Refund</Text>:null} */}
                                                                                       </View>:<View style={{justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
                                                                                           {item.winning_status == 'R'?<Text style={[styles.teamtotaltext, { color: item.winning_status == "W" ? "white" : "#666666" }]}>{'\n'+item.refund_event_state + '\n Refund'}</Text>:null}                                                                                           
                                                                                           </View>}
                                                                                        </View>}
                                                                                        
                                                                                        {item.BlackDialog == true ? this.getblackDialog(item.touchable) : null}

                                                                                    </View>
                                                                                </View>
                                                                            )
                                                                        }} />
                                                                </View>
                                                            )
                                                        }} />
                                                        {this.state.morearchive=='0'?null: index == parseInt(this.state.DataList.length) - 1 ?<View style={{padding:10,paddingBottom:20,justifyContent:'center',alignItems:'center',alignContent:'center'}}><Text onPress={()=>{this.state.OpenPropSwitchAccepted === true?this.callMethod('a'):this.callPropHistory('a')}} style={[{fontSize: hp(2.0),fontFamily: 'Montserrat-Bold',color:'#f26522',textDecorationLine:'underline',textDecorationColor:'#f26522'}]}>More</Text></View>:null}
                                                </View>
                                            )
                                        }} />
                                    :

                                    <View style={styles.OtherTextContainer}>
                                        <View style={styles.OtherTextSubContainer}>
                                            <Text style={styles.UnderConstText}>You have no settled bets</Text>
                                        </View>
                                    </View>
                                }
                                

                            </View>
                        </View>
                    </View>
                </View>
            </Container>
        );

    }

}

