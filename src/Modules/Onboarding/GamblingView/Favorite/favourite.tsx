import React from "react";
import { View, Text, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
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
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import ICON from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-material-dropdown';
// import SegmentedControlTab from 'react-native-segmented-control-tab';
// import { Dropdown } from 'react-native-material-dropdown';

var update = require('immutability-helper');

const ProfilePageContent = {
    key: 'somethun',
    page_title: 'MY FAVORITES',
}

interface G_MyFavoriteViewProps extends AppValidationComponentProps {
}

interface G_MyFavoriteViewState extends AppValidationComponentState {
    DataList?: any;
    isshow: any;
    loader: any;
    CoveredPlaySwitchAccepted: any;
    contentoftoggle: any;
    MenuList: any;
    MyTeamSelect: any;
    MyTeamData: any;
    legueArrayTeamData: any;
    TeamForFavSelect: any;
    ConfirmDialog: any;
    NoData: any;
    customStyleIndex: any;
    teamList: any;
    selected_team:any;
    LeagueList:any;
    selected_League:any;
    activeSections:any;
    dataSource:any;
    multipleSelect:any;
    AllSports: any;
    isHidden:any;
    ArrayLength:any;
    league_id:any;
    dropdown:any;
    dropdownvalue:any;
    data:any;
    i:any;
    index:any;
    status:any;
}


export default class G_MyFavoriteView extends AppValidationComponent<G_MyFavoriteViewProps, G_MyFavoriteViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    constructor(props: G_MyFavoriteViewProps) {
        super(props);
        this.state = {
            DataList: [],
            isshow: true,
            loader: false,
            CoveredPlaySwitchAccepted: false,
            contentoftoggle: 'Show Private',
            MenuList: [],
            MyTeamSelect: 'MY TEAMS',
            MyTeamData: [],
            legueArrayTeamData: [],
            TeamForFavSelect: [],
            ConfirmDialog: false,
            NoData: true,
            customStyleIndex: 0,
            teamList: [],
            selected_team: 'Select Team',
            LeagueList: [],
            selected_League: 'Select League',
            activeSections: [],
            dataSource:[],
            multipleSelect:false,
            AllSports: [],
            isHidden: true,
            ArrayLength: 0,
            league_id: '',
            dropdown:[],
            dropdownvalue:'SELECT',
            data:{},
            i:0,
            index:0,
            status:'',
        };
    }

    componentDidMount() {
        this.callSports();
    }

    // ----------------------------------------------- API calling ---------------------------------------

    callSports() {
        this.setState({ loader: true });
        // fetch('http://uddadev.triazinesoft.com/index.php/v5/api/get_favourite_sports', {
            fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/api/get_favourite_sports', {
        // fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_leagues', {
            method: 'GET',
            headers: {
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('Success Sports league' + JSON.stringify(responseJson));
                var topSports = responseJson.data.topSports;
                var normalSports = responseJson.data.normalSports;
                var AllSports = topSports.concat(normalSports);
                this.getIconByType(AllSports);
                this.setState({
                    AllSports: topSports.map((x: any) => ({
                        title: x.title,
                        type: x.type,
                        color: x.color,
                        league_id: x.league_id,
                        league_name: x.league_name,
                        value: x.title,
                        src: x.src,
                        ishidden:false,
                        FavoriteTeamArray:x.FavoriteTeamArray
                    }))
                });
                this.setState({ loader: false });
                console.log('AllSports ' + JSON.stringify(this.state.AllSports));
            })
            .catch(error => {
                console.log(error);
                this.setState({ loader: false });
            })
    }

    getIconByType(AllSports){
        AllSports.forEach(element => {
                if(element.title == 'FIGHTING'){
                    element["src"] = require('../../../../images/fighting.png');
                } else if(element.title == 'PRO BASKETBALL'){
                    element["src"] = require('../../../../images/basketball_icon.png');
                } else if(element.title == 'SOCCER'){
                    element["src"] = require('../../../../images/soccer_fav.png');
                } else if(element.title == 'AUTO RACING'){
                    element["src"] = require('../../../../images/car-racing.png');
                } else if(element.title == 'PRO FOOTBALL'){
                    element["src"] = require('../../../../images/football_iconfav.png');
                } else if(element.title == 'PRO BASEBALL'){
                    element["src"] = require('../../../../images/baseball_icon.png');
                } else if(element.title == 'COLLEGE BASKETBALL'){
                    element["src"] = require('../../../../images/basketball_icon.png');
                } else if(element.title == 'GOLF'){
                    element["src"] = require('../../../../images/golf_fav.png');
                } else if(element.title == 'PRO HOCKEY'){
                    element["src"] = require('../../../../images/my_hockey_team.png');
                } else if(element.title == 'COLLEGE FOOTBALL'){
                    element["src"] = require('../../../../images/football_iconfav.png');
                } else if(element.title == 'HORSE RACING'){
                    element["src"] = require('../../../../images/horse-racing_fav.png');
                } else if(element.title == 'PRO TENNIS'){
                    element["src"] = require('../../../../images/pro_tennis.png');
                }
        });
    }

    call_team_list_by_league(league_id: any,items,index,ArrayLength) {
        console.log('league id by ashish',league_id)
        if(league_id==10||league_id==9||league_id==14||league_id==22
            ||league_id==2||league_id==4||league_id==3||league_id==8)
            { //this.setState({ NoData: false });
                if(items){
                    this.setState({legueArrayTeamData: []})
                    for (let i = 0; i < ArrayLength; i++) {
                        if (i == index) {
                        this.state.AllSports[index].ishidden = !items.ishidden;
                
                        }
                        else {
                        this.state.AllSports[i].ishidden = false;
                        
                        }
                    }
                }else{}
        this.call_team_list_by_leaguenew(league_id)

            }else{


                if(items){
                    this.setState({legueArrayTeamData: []})
                    for (let i = 0; i < ArrayLength; i++) {
                        if (i == index) {
                        this.state.AllSports[index].ishidden = !items.ishidden;
                
                        }
                        else {
                        this.state.AllSports[i].ishidden = false;
                        
                        }
                    }
                }else{}
                this.setState({ loader: true, league_id:  league_id}); 
        
                var params: any = {
                    'league_id': league_id,
                    'group_type':''
                };
                console.log('normal params',params)
                var formData = new FormData();
        
                for (var k in params) {
                    formData.append(k, params[k]);
                }
        
                fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/api/team_list_by_league', {
                    method: 'POST',
                    headers: {
                        'authorisation': this.authorisationToken
                    },
                    body: formData,
                }).then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({ loader: false }); 
                        console.log('Success team_list_by_league' + JSON.stringify(responseJson.data.leagues_array));
                        if (responseJson.data.leagues_array) {
                            this.setState({ legueArrayTeamData: responseJson.data.leagues_array });
                            if(this.state.legueArrayTeamData.length !=0){
                                this.setState({ NoData: false });
                            }else {
                                this.setState({ NoData: true });
                            }
                        }
                        if (responseJson.message == "Access Expired.") {
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
       
    }

    callbydropdown(league_id:any,value:any){
        this.setState({ loader: true, league_id:  league_id}); 
        
                var params: any = {
                    'league_id': league_id,
                    'group_type':value
                };
        console.log('dropdown params',params)
                var formData = new FormData();
        
                for (var k in params) {
                    formData.append(k, params[k]);
                }
        
                fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/api/team_list_by_league', {
                    method: 'POST',
                    headers: {
                        'authorisation': this.authorisationToken
                    },
                    body: formData,
                }).then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({ loader: false }); 
                        console.log('Success team_list_by_league' + JSON.stringify(responseJson.data.leagues_array));
                        if (responseJson.data.leagues_array) {
                            this.setState({ legueArrayTeamData: responseJson.data.leagues_array });
                            if(this.state.legueArrayTeamData.length !=0){
                                this.setState({ NoData: false });
                            }else {
                                this.setState({ NoData: true });
                            }
                        }
                        if (responseJson.message == "Access Expired.") {
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
    favourite_status_change(team_id: any,ArrayLength,league_id) {
        this.setState({ ConfirmDialog: false });
        this.setState({ loader: true });

        var params: any = {
            'team_id': team_id,
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/api/favourite_status_change', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('Success favourite_status_change' + JSON.stringify(responseJson.data));
                if (responseJson.message = "success") {
                    var that = this;

                  //  AlertUtil.showSingleActionMessage(JSON.stringify(responseJson.data),function(){ that.call_team_list_by_league(league_id,'','',ArrayLength)});
                   
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
                AlertUtil.show('error ' + JSON.stringify(error));
            }) 
    }




    favourite_status_changenew(item: any,ArrayLength,league_id,status) {
         this.setState({ ConfirmDialog: false });
        this.setState({ loader: true });

        var params: any = {
            'team_id': item.team_id,
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/api/favourite_status_change', {
            method: 'POST',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('Success favourite_status_change' + JSON.stringify(responseJson.data));
                if (responseJson.message = "success") {
                    var that = this;
                    this.setState({ loader: false });
                    if(status=='a')
                    {
                        this.calladdfav(item,ArrayLength,league_id)
                    }else{
                        this.calldelfav(item,ArrayLength,league_id)
                    }

                  //  AlertUtil.showSingleActionMessage(JSON.stringify(responseJson.data),function(){ that.call_team_list_by_league(league_id,'','',ArrayLength)});
                   
                }
                else {

                    this.setState({ loader: false });
                    AlertUtil.show('Please Try again...');
                }
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    this.setState({ loader: false });
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => {
                console.log(error);
                AlertUtil.show('error ' + JSON.stringify(error));
            }) 
    }

    // selectsubtitle=(data:any)=>{
    //     console.log('data---->',data);
    //     this.setState({legueArrayTeamData: [],selected_League: 'Select League'})
    //     this.setState({selected_team: data.sport_id});
    //     console.log('selected_team---->',this.state.selected_team);
    //     this.setState({ NoData: true, customStyleIndex: 1 });
    //     this.onChangeTeam(data.sport_id);
    //     // var id;
    //     // this.state.MenuList[0].isSelect = false;
    //     // for(let i=1;i<this.state.MenuList.length;i++)
    //     // { 
    //     // //      console.log('hello sports ashish',data)
    //     // // console.log('hello sports MenuList',this.state.MenuList[i].sport_id)
    //     //     if(this.state.MenuList[i].sport_id==data.sport_id)
    //     //     {
    //     //         this.state.MenuList[i].SubTitle[0].isSelect=true
    //     //         id=this.state.MenuList[i].SubTitle[0].league_id
    //     //     }
    //     // }
    //     //           this.setState({ MyTeamSelect: 'Team' });
    //     //                 this.call_team_list_by_league(id);
    // }

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

    clickforFavTeam(item: any, index: any,ArrayLength,league_id) {
        console.log(league_id + '----' + index);
        for (let i = 0; i < this.state.legueArrayTeamData.length; i++) {
            if (i == index) {
                this.setState({ ConfirmDialog: true });
                this.setState({ TeamForFavSelect: item });
                this.setState({ArrayLength: ArrayLength});
            }
            else {

            }
        }
    }

    goBacktoSetting() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    // removeFavTeam(item: any, index: any,ArrayLength,league_id) {

    //     for (let i = 0; i < this.state.MyTeamData.length; i++) {
    //         if (i == index) {
    //             item["isMyFavorite"] = true;
    //             console.log('check',item);
    //             this.setState({ ConfirmDialog: true });
    //             this.setState({ TeamForFavSelect: item });
    //             this.setState({ArrayLength: ArrayLength});
    //         }
    //         else {

    //         }
    //     }
    // }

    // handleCustomIndexSelect = (index: number) => {
    //     this.setState(prevState => ({ ...prevState, customStyleIndex: index }));
    //     // if(index === 0){
    //     //     this.callMethod();
    //     // }
    // };

    // onChangeTeam(val){
    //     this.setState({legueArrayTeamData: [],selected_League: 'Select League',NoData: true})
    //     this.state.MenuList.forEach(element => {
    //         if(element.sport_id === val){
    //             this.setState({
    //                 LeagueList: element.SubTitle.map((x: any) => ({
    //                     label: x.league_name,
    //                     value: x.league_id
    //                 }))
    //             })
    //         }
    //     });
    //     console.log(JSON.stringify(this.state.LeagueList));
    // }

    // onChangeLeague(val){
    //     this.setState({selected_League: val});
    //     this.setState({ legueArrayTeamData: [] });
    //     this.call_team_list_by_league(val);
    // }

    // -----------------------------------------------Design and Design Methods---------------------------------------
    call_team_list_by_leaguenew(league_id: any) {
        var that = this;
        that.setState({ loader: true });
    //    return new Promise(function (resolve, reject) {
      
         var params: any = {
           'league_id': league_id,
         };
   
         var formData = new FormData();
   
         for (var k in params) {
           formData.append(k, params[k]);
         }
      
         fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/college_team_list_by_league', {
           method: 'POST',
           headers: {
             'authorisation': that.authorisationToken
           },
           body: formData,
         }).then((response) => response.json())
           .then((responseJson) => {
             that.setState({ loader: false });
             console.log('Success team_list_by_league' + JSON.stringify(responseJson.data.leagues_array));
             if (responseJson.data.leagues_array) {
   
               const drop_down_data = responseJson.data.leagues_array.map((element: any) => ({
                 value: element.group_type,
                 label: element.group_name
               }));

               console.log(drop_down_data);
               this.setState({dropdown:drop_down_data});
            //    if(league_id==3||league_id==8)
               if(league_id==3||league_id==4)
               {
                this.callbydropdown(league_id,'')
               }else{
                this.callbydropdown(league_id,drop_down_data[0].value)
               }
               this.setState({dropdownvalue:drop_down_data[0].value})
               //resolve(drop_down_data);
   
             }
   
   
           })
           .catch(error => {
             that.setState({ loader: false });
             console.log(error);
            // reject(error);
             //AlertUtil.show('error ' + JSON.stringify(error));
           })
   
    //    })
     }

     changecustomdrop(value:any,league_id:any){
         this.setState({dropdownvalue:value});
        //  if(value==3||value==8)
var that = this;
        setTimeout(function(){
         if(value==3||value==4)
         {
            that.callbydropdown(league_id,'')
         } else{
            that.callbydropdown(league_id,value)
         }    
        },500) 
     }

     calladdfav(item,index,i){
         console.log('data of team in add',item)
         console.log('index of team in add',index)
         console.log('main index of team in add',i)
         var array = this.state.legueArrayTeamData;
        // var index = array.indexOf(item); // Let's say it's Bob.
         // delete array[index];
         
           array.splice(index, 1);
       
         this.setState({ legueArrayTeamData: array });
         var a =this.state.AllSports
         a[i].FavoriteTeamArray.push({
            league_name: "",
            team_id: item.team_id,
            isMyFavorite: "1",
            team_name: item.team_name,
            team_full_name: item.team_full_name
        },)
        a[i].FavoriteTeamArray.sort(this.dynamicSort("team_full_name"));
       console.log('sorting data favourite',a)
        this.setState({AllSports:a});
       // this.favourite_status_change(item.team_id,'','')
//AllSports
//legueArrayTeamData
     }
    //  calldelfav(item,index,i){
    //     console.log('data of team in add',item)
    //     console.log('index of team in add',index)
    //     console.log('main index of team in add',i)
    //     var array = this.state.AllSports;
    //    // var index = array.indexOf(item); // Let's say it's Bob.
    //     // delete array[index];
        
    //     array[i].FavoriteTeamArray.splice(index, 1);
      
    //     this.setState({ AllSports: array });
    //     var a =this.state.legueArrayTeamData
    //     a.push({
    //         team_id: item.team_id,
    //         team_name: item.team_name,
    //         dashboard_team_id: "",
    //         team_full_name: item.team_full_name,
    //         isMyFavorite: "0"
    //    },)

    //    a.sort(this.dynamicSort("team_full_name"));
    //    console.log('sorting data',a)
    //    this.setState({legueArrayTeamData:a});
    //   // this.favourite_status_change(item.team_id,'','')
    // }
    calldelfav(item,index,i){
        console.log('data of team in add',item)
        console.log('index of team in add',index)
        console.log('main index of team in add',i)
        var array = this.state.AllSports;
       // var index = array.indexOf(item); // Let's say it's Bob.
        // delete array[index];
        
        array[i].FavoriteTeamArray.splice(index, 1);
      
        this.setState({ AllSports: array });
        if(array[i].ishidden==true)
       { var a =this.state.legueArrayTeamData
        a.push({
            team_id: item.team_id,
            team_name: item.team_name,
            dashboard_team_id: "",
            team_full_name: item.team_full_name,
            isMyFavorite: "0"
       },)

       a.sort(this.dynamicSort("team_full_name"));
       console.log('sorting data',a)
       this.setState({legueArrayTeamData:a});
    }else{
        console.log('data hidden is false', array[i].ishidden)
    }
      // this.favourite_status_change(item.team_id,'','')
    }


    calldialog(data,i,index,status){
        this.setState({data:data});
        this.setState({i:i});
        this.setState({index:index});
        this.setState({status:status});
        this.setState({ConfirmDialog:true});

    }
    dynamicSort(property) {
        var sortOrder = 1;
    
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
    
        return function (a,b) {
            if(sortOrder == -1){
                return b[property].localeCompare(a[property]);
            }else{
                return a[property].localeCompare(b[property]);
            }        
        }
    }
    render() {
        const { multipleSelect, activeSections } = this.state;
        let pool = [{
            value: 'NFC',//'CREATE CUSTOM',
          }, {
            value: 'BOXING',
          }
        ];
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
                <View style={styles.hrline}/>
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
                                {this.state.status == 'd' ?
                                    'Are you sure you want to remove this team from your favorite?' : 'Are you sure you want to set this team as your favorite?'}
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
                                    listener={() => { 
                                        this.favourite_status_changenew(this.state.data,this.state.i,this.state.index,this.state.status)
                                       // this.favourite_status_change(this.state.TeamForFavSelect.team_id,this.state.ArrayLength,this.state.league_id)
                                         }} />
                            </View>
                        </View>
                    </View>
                </Dialog>


                <View style={styles.mainContent} >
                    {/* <View style={styles.scrollContent}> */}
                        <ProgressLoader
                            visible={this.state.loader}
                            isModal={true} isHUD={true}
                            hudColor={"#68bcbc"}
                            color={"#FFFFFF"} />
                            <View style={{ height: '98%' }}>
                                <ScrollView>

                                    {this.state.AllSports.map((item,index)=>{
                                        var ArrayLength = this.state.AllSports.length;
                                        // var b = [];//[{team_full_name:'a'},{team_full_name:'b'},{team_full_name:'c'}];
                                        //  b=item.FavoriteTeamArray
                                         
                                        // for (let i = 0; i < animals.length; i++) {
                                        return(
                                            <View style={{ justifyContent:'center',alignContent:'center',alignItems:'center',borderBottomColor:'#DDDDDD',borderBottomWidth:5}}>
                                            <TouchableOpacity onPress={()=> this.call_team_list_by_league(item.league_id,item,index,ArrayLength)} style={{ width: '100%', borderBottomColor: '#eee', borderBottomWidth: 1, paddingVertical: '1%', paddingTop: '4%'}}>
                                                {/* <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}> */}
                                                <View style={{ width: '100%',flexDirection: 'row', paddingLeft: '3%'}}>
                                                    <Image source = {item.src} style={{width: 20,height: 20, marginTop: '1%',marginRight: wp(2),paddingTop: wp(2)}}/>
                                                    <Text style={{ color:'#68bcbc',fontFamily: 'Montserrat-Bold', fontSize: hp(2.4),width: '80%' }}>{item.title}</Text>
                                                    {item.ishidden ?<ICON style={{marginLeft:5}} name="upcircle" size={22} color="#68bcbc"/>: <ICON style={{marginLeft:5}} name="downcircle" size={22} color="#68bcbc"/>}
                                                </View>
                                               
                                            </TouchableOpacity>
                                             {/* <View style={{padding:5,backgroundColor:'#b8d9d1', paddingLeft: '3%',marginBottom:5,marginTop:5,width:'90%',borderRadius:7,borderWidth:1,borderColor:'#b8d9d1',flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={{ color:'black',fontFamily: 'Montserrat-Bold', fontSize: hp(2.4),width: '85%' }}>{'data.team_full_name'}</Text>
                                                <ICON style={{ }} name="closecircleo" size={22} color="#68bcbc"/>
                                                </View> */}
                                                {item.FavoriteTeamArray.map((data,i)=>{
                                                    return(
                                                        // <TouchableOpacity onPress={()=>{this.calldelfav(data,i,index)}}>
                                                        <TouchableOpacity onPress={()=>{this.calldialog(data,i,index,'d')}}>
                                                        <View style={{padding:5,backgroundColor:'#d0edeb', paddingVertical: '3%',marginBottom:5,marginTop:5,width:'90%',borderRadius:4,borderWidth:1,borderColor:'#d0edeb',flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={{ color:'#212121',fontFamily: 'Montserrat-Bold', fontSize: hp(2.2),width: '85%' }}>{data.team_full_name}</Text>
                                                <ICON style={{ marginLeft:20}} name="closecircleo" size={22} color="#68bcbc"/>
                                                </View></TouchableOpacity>
                                                    )
                                                })}
                                            {item.ishidden?item.league_id==10||item.league_id==9||item.league_id==14||item.league_id==22
                                               ||item.league_id==2||item.league_id==4||item.league_id==3||item.league_id==8? <View style={{width:'100%'}}>
                                                 <View style={ {width:'50%',padding:5,margin:10}}>
                                               <Dropdown
                                                dropdownOffset={{ top: 0, left: 0 }}
                                                dropdownMargins={{ min: 0, max: 0 }}
                                                 dropdownPosition={item.league_id==3?-3.2:item.league_id==9 || item.league_id==4 || item.league_id==2?-5.2:item.league_id==14?-4.2:-3.2}
                                                itemTextStyle={[styles.Input_TextStyle, { padding: 5, fontFamily: 'Montserrat-Bold', fontSize: hp(1.2), color: '#333333', margin: 0, paddingBottom: 0, width: '100%' }]}
                                                data={this.state.dropdown}
                                                // data={this.dataAutoRacing}
                                                 value={this.state.dropdownvalue}
                                                 onChangeText={value =>{ this.changecustomdrop(value,item.league_id)}}
                                                fontSize={hp(2.2)}

                                                />
                                                </View></View>:null:null}
                                            {item.ishidden?!this.state.NoData?
                                                <View style={{flex: 1}}>
                                            <View style={{height:hp(40),paddingHorizontal: '3%'}}>
                                                <ScrollView nestedScrollEnabled={true}>
                                                
                                                {this.state.legueArrayTeamData.map((data,i)=>{
                                                return(
                                                    // <TouchableWithoutFeedback onPress={() => { this.clickforFavTeam(data, i,ArrayLength,this.state.league_id) }}>
                                                    // <TouchableWithoutFeedback onPress={() => { this.calladdfav(data, i,index) }}>
                                                    <TouchableWithoutFeedback onPress={() => { this.calldialog(data, i,index,'a') }}>
                                                    <View style={{ width: '100%', borderColor: '#68bcbc', borderWidth: 1, paddingVertical: '2%',marginTop:5,marginBottom:5,borderRadius:4}}>
                                                        <View style={{ flexDirection: 'row', paddingHorizontal: '2%', paddingRight: '0%', paddingVertical: '1%'}}>
                                                        {/* <Image source = {item.src} style={{width: 15,height: 15, marginTop: '1%',marginRight: wp(2),paddingTop: wp(2),tintColor:'red'}}/> */}
                                                            <Text style={{ color:'#666',fontFamily: 'Montserrat-Bold', fontSize: hp(2.2),width: wp(83) }}>{data.team_full_name}</Text>
                                                            {data.isMyFavorite == true ? null:<TouchableOpacity onPress={() => { this.calldialog(data, i,index,'a') }}>
                                                                <View style={{width:50,alignItems: 'center'}}>
                                                                <ICON name="pluscircleo" size={17} color="#68bcbc" style={{marginRight:10}}/>
                                                                    {/* <Image style={{ width: 22,height: 22,paddingLeft: wp(3),paddingTop: wp(2),marginRight:5 }} source={require('../../../../images/close_icon_noti.png')} /> */}
                                                                </View>
                                                            </TouchableOpacity>}
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                )
                                            })}</ScrollView></View></View>:<View style={{ justifyContent: 'center' }}>
                                                <Text style={{ fontSize: hp(1.8), fontFamily: 'Montserrat-SemiBold', color: '#adadad', textAlign: 'center' }}>
                                                    No Teams Available
                                                    </Text>
                                            </View>:null}
                                           
                                            </View>
                                        )
                                    })}
                                    {/* <FlatList
                                        data={this.state.AllSports}
                                        extraData={this.state}
                                        bounces={false}
                                        keyExtractor={(item: any, index) => index.toString()}
                                        renderItem={({ item, index }: any) => {
                                            var ArrayLength = this.state.AllSports.length;
                                        return (
                                            <View style={{ }}>
                                                <TouchableOpacity onPress={()=> this.call_team_list_by_league(item.league_id,item,index,ArrayLength)} style={{ width: '100%', borderBottomColor: '#eee', borderBottomWidth: 1, paddingVertical: '1%', paddingTop: '4%'}}>
                                                    <View style={{ width: '100%',flexDirection: 'row', paddingLeft: '3%'}}>
                                                        <Image source = {item.src} style={{width: 20,height: 20, marginTop: '1%',marginRight: wp(2),paddingTop: wp(2)}}/>
                                                        <Text style={{ color:'#68bcbc',fontFamily: 'Montserrat-Bold', fontSize: hp(2.4),width: '85%' }}>{item.title}</Text>
                                                        {item.ishidden ? <ICON style={{ }} name="minuscircle" size={22} color="#68bcbc"/> : <ICON style={{ }} name="pluscircle" size={22} color="#68bcbc"/>}
                                                    </View>
                                                </TouchableOpacity>

                                               {item.ishidden && <View style={{flex: 1}}>
                                               {!this.state.NoData?<ScrollView bounces={false} style={{}}>
                                                <View style={{ paddingHorizontal: '3%' }}>
                                                        <FlatList
                                                            data={this.state.legueArrayTeamData}
                                                            extraData={this.state}
                                                            bounces={false}
                                                            keyExtractor={(item: any, index) => index.toString()}
                                                            renderItem={({ item, index }: any) => {
                                                                //console.log(item);
                                                            return (
                                                                <TouchableWithoutFeedback onPress={() => { this.clickforFavTeam(item, index,ArrayLength,this.state.league_id) }}>
                                                                    <View style={{ width: '100%', borderBottomColor: '#eee', borderBottomWidth: 1, paddingVertical: '2%'}}>
                                                                        <View style={{ flexDirection: 'row', borderLeftWidth: 3,  borderLeftColor: item.isMyFavorite == true ? '#68bcbc': '#e8e8e8', paddingHorizontal: '2%', paddingRight: '0%', paddingVertical: '1%'}}>
                                                                            <Text style={{ color:'#666',fontFamily: 'Montserrat-Bold', fontSize: hp(2.2),width: wp(83) }}>{item.team_full_name}</Text>
                                                                            {item.isMyFavorite == true ? <TouchableOpacity onPress={() => { this.clickforFavTeam(item, index,ArrayLength,this.state.league_id) }}>
                                                                                <View style={{width:50,alignItems: 'center'}}>
                                                                                    <Image style={{ width: 22,height: 22,paddingLeft: wp(3),paddingTop: wp(2) }} source={require('../../../../images/close_icon_noti.png')} />
                                                                                </View>
                                                                            </TouchableOpacity>:null}
                                                                        </View>
                                                                    </View>
                                                                </TouchableWithoutFeedback>
                                                            )
                                                        }}/>    
                                                    </View>
                                                </ScrollView>:<View style={{ justifyContent: 'center' }}>
                                                <Text style={{ fontSize: hp(1.8), fontFamily: 'Montserrat-SemiBold', color: '#adadad', textAlign: 'center' }}>
                                                    No Teams Available
                                                    </Text>
                                            </View>}</View>
                                         }
                                            </View>
                                        )
                                    }} />     */}
                                </ScrollView>
                            </View>
                        {/* <SegmentedControlTab
                            values={['My Teams', 'Select Favorite']}
                            selectedIndex={customStyleIndex}
                            onTabPress={this.handleCustomIndexSelect}
                            borderRadius={2}
                            tabsContainerStyle={{ height: 45, backgroundColor: '#fff', width: '94%', marginHorizontal: '3%' }}
                            tabStyle={{
                                backgroundColor: '#e7e7e7',
                                borderWidth: 1.5,
                                borderColor: '#68bcbc',
                            }}
                            activeTabStyle={{ backgroundColor: '#68bcbc' }}
                            tabTextStyle={{ color: '#adadad', fontSize: wp(4), fontFamily: 'Montserrat-Bold' }}
                            activeTabTextStyle={{ color: '#fff', fontFamily: 'Montserrat-SemiBold' }}
                        /> */}
                        {/* {customStyleIndex === 0 && (
                            <View style={{ height: '98%', paddingBottom: '5%' }}>
                                <ScrollView style={{marginBottom: hp(5)}}>
                                    <FlatList
                                        data={this.state.MyTeamData}
                                        extraData={this.state}
                                        bounces={false}
                                        keyExtractor={(item: any, index) => index.toString()}
                                        renderItem={({ item, index }: any) => {

                                        return (
                                            <View style={{ }}>
                                                <View style={{ width: '100%', borderBottomColor: '#eee', borderBottomWidth: 1, paddingVertical: '1%', paddingTop: '4%'}}>
                                                    {item.label == 'My Auto Racing Teams'?<View style={{ width: '100%',flexDirection: 'row', paddingLeft: '3%'}}>
                                                        {/* <Icons style={{ width: '6%', marginTop: '1%' }} name="football-ball" size={16} color="#666"/>
                                                        <Image source = {item.src} style={{width: 20,height: 12, marginTop: '2%',marginRight: wp(2)}}/>
                                                        <Text style={{ color:'#68bcbc',fontFamily: 'Montserrat-Bold', fontSize: hp(2.4),width: '85%' }}>{item.label}</Text>
                                                        <ICON style={{ }} name="pluscircle" size={22} color="#68bcbc" onPress={() => { this.selectsubtitle(item) }}/>
                                                    </View>:
                                                    <View style={{ width: '100%',flexDirection: 'row', paddingLeft: '3%'}}>
                                                    {/* <Icons style={{ width: '6%', marginTop: '1%' }} name="football-ball" size={16} color="#666"/>
                                                    <Image source = {item.src} style={{width: 20,height: 20, marginTop: '1%',marginRight: wp(2),paddingTop: wp(2)}}/>
                                                    <Text style={{ color:'#68bcbc',fontFamily: 'Montserrat-Bold', fontSize: hp(2.4),width: '85%' }}>{item.label}</Text>
                                                    <ICON style={{ }} name="pluscircle" size={22} color="#68bcbc" onPress={() => { this.selectsubtitle(item) }}/>
                                                    </View>}
                                                </View>
                                                {item.FavoriteTeamArray ?
                                                    <View style={{ width: '94%',marginHorizontal: '3%', paddingVertical: '1%'}}>
                                                        <FlatList
                                                            data={item.FavoriteTeamArray}
                                                            extraData={this.state}
                                                            keyExtractor={(item: any, index) => index.toString()}
                                                            renderItem={({ item, index }: any) => {
                                                            return (
                                                                <View style={{ width: '100%',flexDirection: 'row', paddingLeft: '7%', padding: '2%',borderBottomColor: '#eee', borderBottomWidth: 1}}>
                                                                    <Text style={{ color:'#666',fontFamily: 'Montserrat-Bold', fontSize: hp(2.2),width: '92%' }}>{item.team_name}</Text>
                                                                    <TouchableOpacity onPress={() => { this.removeFavTeam(item, index) }}>
                                                                    <View style={{width:50,alignItems: 'center'}}>
                                                                        <Image style={{ width: 22,height: 22,paddingLeft: wp(3),paddingTop: wp(2) }} source={require('../../../../images/close_icon_noti.png')} />
                                                                    </View>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )
                                                        }} />
                                                    </View>
                                                :
                                                    <View>
                                                        <Text style={{ fontSize: hp(1.8), fontFamily: 'Montserrat-SemiBold', color: '#adadad', textAlign: 'center', paddingVertical: 10 }}>
                                                            No favorite team available here
                                                        </Text>
                                                    </View>
                                                }
                                                
                                            </View>
                                        )
                                    }} />    
                                </ScrollView>
                            </View>
                        )}
                        {customStyleIndex === 1 && (
                            <View>
                                <View style={[styles.ThirdContainer, { flexDirection: 'row', }]}>
                                    <View style={{ width: '49%', marginRight: '2%' }}>
                                        <View style={[styles.Input_Container, styles.inputPadding]}>
                                            <Dropdown
                                                dropdownOffset={{ top: 0, left: 0 }}
                                                dropdownMargins={{ min: 0, max: 0 }}
                                                containerStyle={{  borderBottomWidth: 0, justifyContent: "center", paddingLeft: '1%' }}
                                                inputContainerStyle={{ borderBottomColor: '#000' }}
                                                selectedItemColor={'black'}
                                                itemTextStyle={[{ fontSize: hp(2.2), paddingLeft: '1%', fontFamily: 'Montserrat-Regular', }]}
                                                textColor='#000'
                                                data={this.state.teamList}
                                                value={this.state.selected_team}
                                                onChangeText={value => this.onChangeTeam(value)}
                                                fontSize={hp(2.2)}
                                                dropdownPosition={this.state.teamList.length > 3 ? -5.2 : this.state.teamList.length == 3 ? -4.2 : this.state.teamList.length == 1 ? -2.2: -3.2}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ width: '49%' }}>
                                        <View style={[styles.Input_Container, styles.inputPadding]}>
                                            <Dropdown
                                                dropdownOffset={{ top: 0, left: 0 }}
                                                dropdownMargins={{ min: 0, max: 0 }}
                                                containerStyle={{  borderBottomWidth: 0, justifyContent: "center", paddingLeft: '1%' }}
                                                inputContainerStyle={{ borderBottomColor: '#000' }}
                                                selectedItemColor={'black'}
                                                itemTextStyle={[{ fontSize: hp(2.2), paddingLeft: '1%', fontFamily: 'Montserrat-Regular', }]}
                                                textColor='#000'
                                                data={this.state.LeagueList}
                                                value={this.state.selected_League}
                                                onChangeText={value => this.onChangeLeague(value)}
                                                fontSize={hp(2.2)}
                                                dropdownPosition={this.state.LeagueList.length > 3 ? -5.2 : this.state.LeagueList.length == 3 ? -4.2 : this.state.LeagueList.length == 1 ? -2.2: -3.2}
                                            />
                                        </View>
                                    </View>
                                </View>

                                {!this.state.NoData?<ScrollView style={{marginBottom: hp(25)}}>
                                    <View style={{ paddingHorizontal: '3%' }}>
                                        <FlatList
                                            data={this.state.legueArrayTeamData.leagues_array}
                                            extraData={this.state}
                                            bounces={false}
                                            keyExtractor={(item: any, index) => index.toString()}
                                            renderItem={({ item, index }: any) => {
                                                return (
                                                    <TouchableWithoutFeedback onPress={() => { this.clickforFavTeam(item, index) }}>
                                                        <View style={{ width: '98%', borderBottomColor: '#eee', borderBottomWidth: 1, paddingVertical: '2%'}}>
                                                            <View style={{ flexDirection: 'row', borderLeftWidth: 3,  borderLeftColor: item.isMyFavorite == true ? '#68bcbc': '#e8e8e8', paddingHorizontal: '2%', paddingRight: '0%', paddingVertical: '1%'}}>
                                                                <Text style={{ color:'#666',fontFamily: 'Montserrat-Bold', fontSize: hp(2.2),width: wp(82) }}>{item.team_full_name}</Text>
                                                                {item.isMyFavorite == true ? <Icon style={{ paddingRight:5, justifyContent: 'flex-end', alignItems: 'flex-end' }} name="ios-checkmark-circle" size={26} color="#68bcbc"/>:null}
                                                            </View>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                            }}/>    
                                    </View>
                                </ScrollView>:<View style={{ justifyContent: 'center', height: '60%' }}>
                                                <Text style={{ fontSize: hp(1.8), fontFamily: 'Montserrat-SemiBold', color: '#68bcbc', textAlign: 'center' }}>
                                                    No Favorite Team Available
                                                    </Text>
                                            </View>}
                            </View>
                        )} */}
                    </View>
            </Container >
        );

    }

}

