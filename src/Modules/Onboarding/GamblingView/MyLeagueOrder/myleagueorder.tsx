import React from "react";
import { View, Text, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage } from "react-native";
import { Divider } from 'react-native-elements';
import styles from './styles';
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
import SortableList from 'react-native-sortable-list';
import  Row  from "./row";
import { ScrollView } from "react-native-gesture-handler";
var update = require('immutability-helper');

const ProfilePageContent = {
    key: 'somethun',
    page_title: 'MY LEAGUE ORDER',
}

interface G_MyLeagueOrderViewProps extends AppValidationComponentProps {
}

interface G_MyLeagueOrderViewState extends AppValidationComponentState {
    DataList?: any;
    isshow: any;
    loader: any;
    CoveredPlaySwitchAccepted: any;
    contentoftoggle: any;
    MenuList: any;
    MyTeamSelect: any;
    responseData: any;
    legueArrayTeamData: any;
    TeamForFavSelect: any;
    ConfirmDialog: any;
    NoData: any;
    scrollenabled:any;
    leagueArr:any;
    newSortKeyArr:any;

}


export default class G_MyLeagueOrderView extends AppValidationComponent<G_MyLeagueOrderViewProps, G_MyLeagueOrderViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    constructor(props: G_MyLeagueOrderViewProps) {
        super(props);
        this.state = {
            DataList: [
                
            ],
            isshow: true,
            loader: false,
            CoveredPlaySwitchAccepted: false,
            contentoftoggle: 'Show Private',
            MenuList: [],
            MyTeamSelect: 'MY TEAMS',
            responseData: [],
            legueArrayTeamData: [],
            TeamForFavSelect: [],
            ConfirmDialog: false,
            NoData: '',
            scrollenabled:true,
            leagueArr:[],
            newSortKeyArr:[]
        };
    }

    componentDidMount() {
        this.callMethod();
    }



    // ----------------------------------------------- API calling ---------------------------------------


    callMethod() {
        this.setState({ DataList: [] });
        this.setState({ loader: true }); 
        // var url =UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/api/favorite_menu_team'
        // console.log('ashish',url)
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 +'/apiGaming/get_leagues_new', {
            method: 'get',
            headers: {
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false }); 
                console.log('Success Favourite Menu' + JSON.stringify(responseJson.data));
                AsyncStorage.setItem('defaultLeagueId', responseJson.data.defaultSelection)
                if (responseJson.data.topSports.length > 0) {
                    var topsports = responseJson.data.topSports;
                     topsports.shift();
                    this.setState({ responseData: topsports });
                    this.setState({ leagueArr: responseJson.data.leagueArray });
                    this.setState({
                        DataList: topsports.map((x: any) => ({
                            sport_id: x.sport_id,
                            title: x.title,
                            league_order: x.league_order,
                            league_id: x.league_id,
                            league_name: x.league_name,
                            icon: this.getIconByType(x.type),
                            isSelect: false,
                        }))
                    });
                }
                console.log("datalist ---->" + JSON.stringify(this.state.DataList));;
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                this.setState({ loader: false }); 
                console.log(error);
                AlertUtil.show('error ' + JSON.stringify(error));
            }) 
    }
     getIconByType(type:any){
         
         switch (type) {
             case 'Football':
                 return require('../../../../images/slice_icon/Football.png');
                 break;
             case 'Basketball':
                 return require('../../../../images/slice_icon/Basketball.png');
                 break;
             case 'Baseball':
                 return require('../../../../images/slice_icon/Baseball.png');
                 break;
             case 'Hockey':
                 return require('../../../../images/slice_icon/Hockey.png');
                 break;
             case 'Soccer':
                 return require('../../../../images/slice_icon/Soccer.png');
                 break;
             case 'Boxing':
                 return require('../../../../images/slice_icon/Boxing.png');
                 break;
             case 'Golf':
                 return require('../../../../images/slice_icon/golf.png');
                 break;
             case 'Auto Racing':
                 return require('../../../../images/slice_icon/auto_racing.png');
                 break;
             case 'Tennis':
                 return require('../../../../images/slice_icon/pro_tennis.png');
                 break;
             case 'Other':
                 return require('../../../../images/slice_icon/horse_racing.png');
                 break;
             
              
         }
     }

    


    saveUserPreference() {
        this.setState({ loader: true }); 
       console.log('previous Arr',this.state.leagueArr);
        console.log('new Arr',this.state.newSortKeyArr);
        var newLeagueOrder =[]
        var newsortedArr = this.state.newSortKeyArr;
        if (newsortedArr.length>0){
            var leagueArr = this.state.leagueArr;
            newsortedArr.forEach(function (item) {
                newLeagueOrder.push(leagueArr[item])
            });  
        }else{
            newLeagueOrder = this.state.leagueArr;
        }
       
        console.log('finsal arr', newLeagueOrder);
        var params: any = {
            'leagueArr': JSON.stringify(newLeagueOrder),
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/user_update_league_order', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('Success favourite_status_change' + JSON.stringify(responseJson));
                this.setState({ loader: false }); 
                if (responseJson.message = "success") {
                   // AlertUtil.show(responseJson.data);
                    this.callMethod();
                   setTimeout(function(){AlertUtil.show(responseJson.data); },1500) 
                }
                else {
                    AlertUtil.show('Please Try again...');
                }
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                console.log(error);
                this.setState({ loader: false }); 
                AlertUtil.show('error ' + JSON.stringify(error));
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

    _renderRow = ({ data, active }) => {
        return <View style={{height:hp(5.8)}}>
        <Row data={data} active={active} key={data.league_id}/>
        </View>
    }

    // -----------------------------------------------Design and Design Methods---------------------------------------

    render() {
        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={true}
                isTitle={true}
                showIndicator={false}
                menuIconListener={this}
                LogoIconListener={this}
                accountNameListener={this}
                availableBalanceListener={this}
                coveredPlaysListener={this}
                openPlaysListener={this} 
                isSetting={false} >
                <View style={styles.hrline} />
               <View style={{flex:1}}>
                    <ProgressLoader
                        visible={this.state.loader}
                        isModal={true} isHUD={true}
                        hudColor={"#68bcbc"}
                        color={"#FFFFFF"} />
                    <ScrollView scrollEnabled={this.state.scrollenabled} style={{ flex: 1,marginBottom:5}}>
                    <SortableList
                        style={styles.list}
                        
                        contentContainerStyle={styles.contentContainer}
                       // autoscrollAreaSize={100}
                        
                        onActivateRow={key => {
                            this.setState({ scrollenabled: false })
                        }}
                        onReleaseRow={(key, currentOrder) => {
                            console.log('mycuurent order', currentOrder);
                            this.setState({ scrollenabled: true, newSortKeyArr: currentOrder})
                        }}
                        onChangeOrder={(nextOrder) => {
                            console.log('nextOrder order', nextOrder);
                            this.setState({ scrollenabled: true })
                        }}
                        data={this.state.DataList}
                        renderRow={this._renderRow} />
            </ScrollView>
                    {this.state.DataList.length > 0 && <View style={{ backgroundColor: '#68bcbc', height:'7%', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 20, right: 20, bottom: 20 }}>
                        
                            <TouchableWithoutFeedback onPress={() => { this.saveUserPreference() }} >
                             
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: hp(3.0), textAlign: 'center' }}>Save</Text>
                              
                            </TouchableWithoutFeedback>
                           
                      
                    </View>}
               </View>
            </Container >
        );

    }

}

