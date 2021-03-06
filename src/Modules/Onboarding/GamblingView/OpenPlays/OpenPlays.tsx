import React, {  ReactInstance } from "react";
import { View, Text, Image, FlatList, TouchableWithoutFeedback, Share, BackHandler } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, {  AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import Application from "../../.../../../../Entities/Application";
import ProgressLoader from 'rn-progress-loader';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
var update = require('immutability-helper');

const ProfilePageContent = {
    key: 'somethun',
    page_title: 'OPEN PLAYS',
}

interface G_OpenPlaysViewProps extends AppValidationComponentProps {
}

interface G_OpenPlaysViewState extends AppValidationComponentState {
    DataList?: any;
    isshow: any;
    loader: any;
    OpenPlaySwitchAccepted: any;
    contentoftoggle: any;
}


const bottom_initial = 0;
export default class G_OpenPlaysView extends AppValidationComponent<G_OpenPlaysViewProps, G_OpenPlaysViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    constructor(props: G_OpenPlaysViewProps) {
        super(props);
        this.state = {
            DataList: [],
            isshow: true,
            loader: false,
            OpenPlaySwitchAccepted: false,
            contentoftoggle: 'Show Private'
        };
    }

    componentDidMount() {
        this.callMethod('1');

    BackHandler.addEventListener('hardwareBackPress', () => {
        if (this.props) {
            //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
			RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
            return true; 
        }
        return false;
    });
}

   
    // ----------------------------------------------- API calling ---------------------------------------


    callMethod(OpenPlayVersion: any) {

        this.setState({ loader: true }); 
        var url;
        if (OpenPlayVersion == 1) {
            url = UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/api/open_plays';
        }
        else {
            url = UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/api/open_plays/' + OpenPlayVersion;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false }); 
                this.setState({ DataList: responseJson.data });
                console.log('Success openplay' + JSON.stringify(this.state.DataList));
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
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
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
    }


    availableBalanceTapped() {
    }

    openPlaysTapped() {

    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }

    cellDidClicked(tag: number, tableViewCellReference: ReactInstance): void {
    }

    OpenPlaySwitchValueChanged() {

        if (this.state.OpenPlaySwitchAccepted === true) {
            this.setState({ OpenPlaySwitchAccepted: false });
            this.callMethod('1');
        }
        else {
            this.setState({ OpenPlaySwitchAccepted: true });
            this.callMethod('2');
        }
    }

    shareOption(item: any) {
        var MessageString: any;
        var oddsString: any;
        var teamName: any;
        var url: any;
        if (item.ttype == 'o') {
            if (item.bet_odds_type == 'ML') {
                oddsString = "Money Line";
            }
            else if (item.bet_odds_type == 'T') {
                oddsString = "Total";
            }
            else {
                oddsString = "Spread";
            }

            if (item.home.is_bet_team == 'true') {
                teamName = item.home.home_team_name
            } else {
                teamName = item.away.away_team_name
            }
            url = "http://ios-deeplink.cloudaccess.host/d-l-v1.php?t=oddsbet&i=" + item.encryptor_bet_id

            MessageString = "I just place a " + item.amount + " bet in the line " +
                oddsString + " for the team " + teamName + ". Accept the challenge and try to outrank me!. " + url
        }
        else {
            url = "http://ios-deeplink.cloudaccess.host/d-l-v1.php?t=propsbet&i=" + item.encryptor_bet_id;
            MessageString = item.question + " I just placed a " + item.amount + " bet on this. Would you accept the Bet? " + url;
        }

        Share.share({
            message: MessageString,
        })
            .then(result => {
                console.log(result)
            })
            .catch(errorMsg => {
                console.log(errorMsg)
            });
    }

    gotoDashboard() {
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
    }

    // -----------------------------------------------Design and Design Methods---------------------------------------

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

                <View style={styles.scrollContent} >
                    <View style={styles.mainContent}>
                        <ProgressLoader
                            visible={this.state.loader}
                            isModal={true} isHUD={true}
                            hudColor={"#68bcbc"}
                            color={"#FFFFFF"} />

                        <View style={{ flex: 1 }}>
                            <View style={{ flexShrink: 1, backgroundColor: 'white' }}>

                                <View style={styles.NameHeaderContainer}>
                                    <View style={{ width: '70%' }}>
                                        <Text style={styles.NameStyle}>OPEN PLAYS</Text>
                                    </View>
                                    <View style={{ width: '30%', alignItems: 'center', flexDirection: 'row', }}>

                                        <TouchableWithoutFeedback onPress={() => { this.OpenPlaySwitchValueChanged() }}>
                                            <Image source={this.state.OpenPlaySwitchAccepted == true ? require('../../../../images/toggle_on.png') : require('../../../../images/toggle_off.png')}
                                                style={{ height: 20, width: 40 }}
                                                resizeMode="contain"></Image>
                                        </TouchableWithoutFeedback>

                                        <View style={{ width: 'auto', height: 'auto', }}>
                                            <Text style={{ fontSize: hp(1.1), fontFamily: 'Montserrat-Regular', marginLeft: 2, marginRight: 5, textAlign: 'center' }}>Show Private</Text>
                                            <Text style={{ fontSize: hp(1.1), fontFamily: 'Montserrat-Regular', marginLeft: 2, marginRight: 5 }}>Bets only</Text>
                                        </View>


                                    </View>



                                </View>

                                <View style={[styles.titleContainer]} >
                                    <View style={{ width: '100%', height: 35, backgroundColor: '#666666', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

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
                                    </View>
                                </View>

                                {this.state.DataList.length > 0 ?
                                 
                                        <View>
                                            <FlatList
                                                data={this.state.DataList}
                                                extraData={this.state}
                                                keyExtractor={(item: any, index) => index.toString()}
                                                bounces={false}
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
                                                    var data_index = index;

                                                    return (

                                                        <View style={{ backgroundColor: 'white' }}>

                                                            {/* --------------------- Game Header ---------------- */}
                                                            <View style={styles.gameheader}>
                                                                <View style={{ width: '85%', flexDirection: 'row', }}>
                                                                    <View style={{ paddingLeft: 5, paddingRight: 10, justifyContent: "center" }}>
                                                                        <Image source={gameImage} style={{ height: 20, width: 20 }}></Image>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={styles.gameheadertext} >
                                                                            {item.sport_name}
                                                                        </Text>
                                                                    </View>
                                                                </View>

                                                                <View style={{ width: '15%' }}>
                                                                    <Text style={styles.gamecounttext}>( {item.bet_count} )</Text>
                                                                </View>
                                                            </View>

                                                            {/* --------------------- Games Arrray ---------------- */}
                                                            <FlatList
                                                                data={item.game_array}
                                                                extraData={this.state}
                                                                keyExtractor={(item: any, index) => index.toString()}
                                                                renderItem={({ item, index }: any) => {
                                                                    var game_arrayindex = index;
                                                                    var date = item.date_label.split(' ');
                                                                    return (
                                                                        <View>
                                                                            <View style={styles.gamedatetimecontainer}>
                                                                                <Text style={styles.datetext}> {date[0]}
                                                                                    <Text style={styles.daytext}> {date[1]}</Text>
                                                                                    <Text style={styles.daytext}> {date[2]} </Text>
                                                                                </Text>
                                                                            </View>

                                                                            {/* --------------------- dates Arrray and beted matches row ---------------- */}
                                                                            <FlatList
                                                                                data={item.date_array}
                                                                                extraData={this.state}
                                                                                keyExtractor={(item: any, index) => index.toString()}
                                                                                renderItem={({ item, index }: any) => {
                                                                                    var date_array_index = index;

                                                                                    return (
                                                                                        <View>
                                                                                            <View style={styles.gamelistcontainer}>
                                                                                                <TouchableWithoutFeedback>
                                                                                                    <View style={styles.gamelistindexcontainer}>
                                                                                                        <Text style={[styles.indextext]}> {item.data_index + 1} </Text>
                                                                                                    </View>
                                                                                                </TouchableWithoutFeedback>

                                                                                                {item.ttype == 'o' ?

                                                                                                    <View style={styles.gamelistteamcontainer}>

                                                                                                        <View style={styles.gamelistteam1container}>

                                                                                                            <View style={styles.gamelistmatchup}>
                                                                                                                <Text style={styles.teamtitletext}> {item.home.is_bet_team == 'true' ? item.home.home_team_name : item.away.away_team_name} </Text>
                                                                                                            </View>


                                                                                                            <View style={styles.gamelistamountbet}>
                                                                                                                <Text style={[styles.gamelisttotaldollertext, { fontSize: hp(1.1), marginLeft: 3 }]}>$</Text>
                                                                                                                <Text style={styles.teamoddstext}>{item.amount} </Text>
                                                                                                            </View>

                                                                                                            <View style={styles.gamelistline}>
                                                                                                                {item.bet_odds_type == 'ML' ?
                                                                                                                    <Text style={styles.teamoddstext}> {item.home.is_bet_team == 'true' ? (item.home.ml_home_price >= 0 ? '+' : '-') + Math.abs(item.home.ml_home_price) : (item.away.ml_away_price >= 0 ? '+' : '-') + Math.abs(item.away.ml_away_price)} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>ML </Text> </Text>
                                                                                                                    :
                                                                                                                    item.bet_odds_type == 'T' ?
                                                                                                                        <Text style={styles.teamoddstext}> {item.home.is_bet_team == 'true' ? item.home.total : item.away.total} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>T </Text></Text>
                                                                                                                        :
                                                                                                                        <Text style={styles.teamoddstext}> {item.home.is_bet_team == 'true' ? item.home.ps_home_spread : item.away.ps_away_spread} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>S </Text></Text>
                                                                                                                }

                                                                                                            </View>

                                                                                                        </View>

                                                                                                        <View style={styles.gamelistteam2container}>

                                                                                                            <View style={styles.gamelistmatchupteam2}>
                                                                                                                <Text style={styles.team2titletext}> {item.home.is_bet_team == 'true' ? item.away.away_team_name : item.home.home_team_name} </Text>
                                                                                                            </View>

                                                                                                            <View style={styles.gamelistamountbetteam2}>
                                                                                                                <Text style={styles.team2oddstext}> </Text>
                                                                                                            </View>

                                                                                                            <View style={styles.gamelistlineteam2}>
                                                                                                                {item.bet_odds_type == 'ML' ?
                                                                                                                    <Text style={styles.team2oddstext}> {item.home.is_bet_team == 'true' ? (item.away.ml_away_price >= 0 ? '+' : '-') + Math.abs(item.away.ml_away_price) : (item.home.ml_home_price >= 0 ? '+' : '-') + Math.abs(item.home.ml_home_price)} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>ML </Text></Text>
                                                                                                                    :
                                                                                                                    item.bet_odds_type == 'T' ?
                                                                                                                        <Text style={styles.team2oddstext}> {item.home.is_bet_team == 'true' ? item.away.total : item.home.total} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>T </Text></Text>
                                                                                                                        :
                                                                                                                        <Text style={styles.team2oddstext}> {item.home.is_bet_team == 'true' ? item.away.ps_away_spread : item.home.ps_home_spread} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>S </Text></Text>
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
                                                                                                                <Text style={styles.Proptitletext}> {item.ttype == 'p' ? 'PROP BET' : 'CUSTOM BET'} </Text>
                                                                                                            </View>

                                                                                                            <View style={styles.gamelistamountbet}>
                                                                                                                <Text style={[styles.gamelisttotaldollertext, { fontSize: hp(1.1), marginLeft: 3 }]}>$</Text>
                                                                                                                <Text style={styles.teamoddstext}>{item.amount} </Text>
                                                                                                            </View>

                                                                                                            <View style={styles.gamelistline}>
                                                                                                                {item.ttype == 'p' ?
                                                                                                                    <Text style={styles.teamoddstext}> {item.bet_team_type == 'under' ? 'U' : 'O'} {item.total}<Text style={{ fontFamily: 'Montserrat-SemiBold' }}> ({item.line})</Text> </Text>
                                                                                                                    :
                                                                                                                    <Text style={styles.teamoddstext}> {item.line} <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>ML </Text> </Text>
                                                                                                                }
                                                                                                            </View>

                                                                                                        </View>

                                                                                                    </View>
                                                                                                }



                                                                                                <View style={styles.gamelisttotalcontainer}>
                                                                                                    <Text style={styles.gamelisttotaldollertext}>$</Text>
                                                                                                    <Text style={styles.teamtotaltext}>{item.amount_to_win} </Text>
                                                                                                    {item.bet_type == 2 ?
                                                                                                        <View style={{ marginRight: 2 }}>
                                                                                                            <TouchableWithoutFeedback onPress={() => { this.shareOption(item) }}>
                                                                                                                <Image source={require('../../../../images/Bet_Share.png')} style={{ height: 15, width: 15 }} resizeMode='contain' />
                                                                                                            </TouchableWithoutFeedback>
                                                                                                        </View>
                                                                                                        : null
                                                                                                    }
                                                                                                </View>
                                                                                            </View>
                                                                                        </View>
                                                                                    )
                                                                                }} />
                                                                        </View>
                                                                    )
                                                                }} />
                                                        </View>
                                                    )
                                                }} />
                                        </View>
                                
                                    :
                                    <View style={styles.OtherTextContainer}>
                                        <View style={styles.OtherTextSubContainer}>
                                            <Text style={styles.UnderConstText}>You haven't placed</Text>
                                            <Text style={styles.UnderConstText}>a bet yet.</Text>
                                            <Text style={[styles.DescText, { marginTop: 15 }]}>Go to your favourite sport/team </Text>
                                            <Text style={styles.DescText}>to start betting. </Text>
                                            <TouchableWithoutFeedback onPress={() => { this.gotoDashboard() }}>
                                                <Text style={[styles.GotoDashboardText, { marginTop: 15 }]}>Back to Dashboard</Text>
                                            </TouchableWithoutFeedback>

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

