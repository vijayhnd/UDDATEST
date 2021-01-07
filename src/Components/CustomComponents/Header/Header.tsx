
import React, {  Component } from "react";
import styles from "./styles";
import { Text, View, FlatList,TextInput,TouchableWithoutFeedback ,TouchableOpacity} from "react-native";
import MenuIcon from '../../Icons/MenuIcon';
import LogoIcon from '../../Icons/LogoIcon';
import { IComponentProps } from "../../IProps";
import { MenuIconListener } from "../../Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../Icons/LogoIcon/LogoIcon";
import AlertUtil from "../../../Util/AlertUtil";
import BackIcon from "../../Icons/BackIcon";
import { Image } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppValidationComponentState } from "../../../Util/AppValidationComponent";
import Application from "../../../Entities/Application";
import { Dropdown } from 'react-native-material-dropdown';
import { Dialog } from 'react-native-simple-dialogs';
import LogoutUtill from "../../../Util/LogoutUtill";
import UrlService from "../../../Services/Core/ServiceURI";
import Icon from 'react-native-vector-icons/FontAwesome';
import AppScreens from "../../../Util/AppScreens";
import Notification from "../Notification";
import RouterBuilder from "../../../Router";

interface ContainerProps extends IComponentProps {
    title: string
    listener?: MenuIconListener
    LogoIconlistner?: LogoIconListener
    isFromSetting?: any
    notificationPress?:any
}

interface ProflieViewState extends AppValidationComponentState {
    NoData: any;
    Dialog: any;
    BlackDialog: any;
    DataList: any;
    SearchText: any;
    DataListHeader: any;
    SelectedFilter: any;
    SelectedSortBy: any;
}


export default class Header extends Component<ContainerProps, ProflieViewState> {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    isFromGambling = false;
    constructor(props: ContainerProps) {
        super(props);
        this.state = {
            Dialog: false,
            NoData: '',
            BlackDialog: ' ',
            DataList: [],
            DataListHeader: [],
            SearchText: '',
            SelectedFilter: '',
            SelectedSortBy: ''
        }
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
        }
        else {
            this.isFromGambling = false;
        }
        
    }

    showMoreDialog(isShow: any) {
        
        if (isShow == true && this.state.SearchText != '') {
            this.setState({ Dialog: isShow });
            this.callMethod(this.state.SearchText);
            this.setState({SelectedFilter: ''});
            this.setState({SelectedSortBy: ''});
        }
        else {
            AlertUtil.show("Please enter search text");
        }
    }

    // ------------------------------------------------------------- API calling  ---------------------------------------------------

    callMethod(teamname: any) {
        if (this.state.SelectedFilter != '' && this.state.SelectedSortBy != '') {
            if (this.state.SelectedFilter == 'MY BETS') {
                var params: any = {
                    'searchTerm': teamname,
                    'user_id': Application.sharedApplication().user!.id,
                    'filter': 'bets',
                    'sort': this.state.SelectedSortBy
                };
            }
            else {
                var params: any = {
                    'searchTerm': teamname,
                    'sort': this.state.SelectedSortBy
                };
            }
        }
        else if (this.state.SelectedFilter != '') {
            if (this.state.SelectedFilter == 'MY BETS') {
                var params: any = {
                    'searchTerm': teamname,
                    'filter': 'bets',
                    'user_id': Application.sharedApplication().user!.id
                };
            }
            else {
                var params: any = {
                    'searchTerm': teamname,
                };
            }

        }
        else if (this.state.SelectedSortBy != '') {
            var params: any = {
                'searchTerm': teamname,
                'sort': this.state.SelectedSortBy
            };
        }
        else {
            var params: any = {
                'searchTerm': teamname
            };
        }


        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiNew/searchMatches', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken
            },
            body: formData,

        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again  ");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
                   else{

                   
                console.log('Search Result' + JSON.stringify(responseJson));
                if (responseJson.data.length > 0) {
                    this.setState({ DataList: responseJson.data })
                    this.setState({ DataListHeader: responseJson.top_results[0] })
                    this.setState({ NoData: false });
                    console.log('Search Result' + JSON.stringify(this.state.DataList));
                }
                else {
                    this.setState({ NoData: true });
                }
            }
            })
            .catch(error => console.log('search error' + error)) 
    }

    // -------------------------------------------------------------  Methods ---------------------------------------------------
    showNotifications() {
        this.props.navigation!.navigate(AppScreens.G_NotificationView);
    }

    SearchAgain() {
        this.setState({ SearchText: '' });
        this.setState({ Dialog: false });
        this.setState({SelectedFilter: ''});
        this.setState({SelectedSortBy: ''});
    }

    getDialogue2(BlackDialog: any) {
        this.setState({ BlackDialog: BlackDialog });
    }

    focus = () => {
        this.setState({ SearchText: '' });
    }

    onChangeFilter(value: any) {
        this.setState({ SelectedFilter: value });
    }

    onChangeSortby(value: any) {
        this.setState({ SelectedSortBy: value });
    }

    FilterMethod() {
    }



    // ------------------------------------------------------------- Design and Design Methods ---------------------------------------------------
    render() {
        let data = [{
            value: 'MY BETS',
        }, {
            value: 'Match / Game ',
        },
        {
            value: 'Date / Schedule ',
        },
        {
            value: 'Player Name ',
        }];

        let data2 = [{
            value: 'ASC',
        }, {
            value: 'DESC',
        },
        ];



        return (
            <View >
                <View style={styles.headerMainContainer}>
                    {this.props.isFromSetting == true ?
                        <View style={[styles.paddingForContainer, styles.menuButtonContainer]}>
                            <BackIcon listener={this.props.listener}></BackIcon>
                        </View>
                        :
                        <View style={[styles.paddingForContainer, styles.menuButtonContainer]}>
                            <MenuIcon listener={this.props.listener}></MenuIcon>
                            <Notification notificationPress={this.props.notificationPress}></Notification>
                        </View>
                    }

                    <View style={[styles.paddingForContainer, styles.searchBarContainer, { paddingLeft: 0 }]}>
                        <View style={styles.searchBoxMainContainer}>
                            <View style={styles.searchBoxContainer}>
                                <TextInput
                                    style={styles.inputTextStyle}
                                    placeholder={'SEARCH'}
                                    placeholderTextColor='#333333'
                                    value={this.state.SearchText}
                                    onFocus={this.focus}
                                    onChangeText={(SearchText) => this.setState({ SearchText })}
                                />
                            </View>
                            <View style={styles.searchIconContainer}>
                                <TouchableOpacity onPress={() => { this.showMoreDialog(true) }}>
                                    <Image source={require('../../../images/search_icon.png')} style={{ width: wp(5), height: wp(5) }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.paddingForContainer, styles.logoContainer, { paddingLeft: 0 }]}>
                        <LogoIcon LogoIconlistner={this.props.LogoIconlistner} />
                    </View>
                </View>


                {/* //------------------------------------------- Dialog design ---------------------------------------------- */}

                <Dialog
                    visible={this.state.Dialog}
                    title=""
                    dialogStyle={{ backgroundColor: 'white', }}
                    contentStyle={{ backgroundColor: 'white' }}
                    overlayStyle={{ width: '100%', marginTop: '20%', paddingTop: 0, }}
                    onTouchOutside={() => this.setState({ Dialog: false })} >


                    <View style={{ position: 'relative', backgroundColor: 'white', height: '100%', width: '100%' }} >
                        <View style={{ backgroundColor: 'white', }} >

                            <View style={{ width: '100%', height: '93%' }}>

                                <View style={{ width: '100%', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: this.isFromGambling == true ? '#68bcbc':'#e2211c', fontSize: 16, fontFamily: 'Montserrat-SemiBold', width: '95%' }}>
                                        Top Result
                                    </Text>

                                    <TouchableWithoutFeedback onPress={() => { this.SearchAgain() }}>
                                        <View style={[styles.CloseView]}>
                                            <Image source={require('../../../images/close.png')} style={{ height: 12, width: 12 }}></Image>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.Line}>
                                </View>

                                <Text style={{ color: '#000000', fontFamily: 'Montserrat-Bold', fontSize: 14, textDecorationLine: 'underline', padding: 10 }}>
                                    {this.state.DataListHeader.team_name} ({this.state.DataListHeader.league_name} Team)
                                        </Text>

                                <View style={styles.Line}>
                                </View>

                                <View style={[styles.Spinner_Container]}>
                                    <View style={styles.Filter_Container}>
                                        <Text style={{ color: '#333333', fontFamily: 'Montserrat-Regular', fontSize: 12,textAlign:'left' }}>
                                            Filter by:
                                                </Text>
                                        <View style={{ borderRadius: 5, width: 120, borderColor: '#cccccc', borderWidth: 1, marginLeft: 0, height: 27, alignItems: 'center', alignContent: 'center', justifyContent: 'center', }}>
                                            <Dropdown
                                                containerStyle={{ paddingLeft: 5, margin: 0, marginBottom: 8, borderBottomWidth: 0, justifyContent: "center", paddingBottom: 0, width: '100%' }}
                                                dropdownOffset={{ top: 0, left: 0 }}
                                                dropdownMargins={{ min: 0, max: 0 }}
                                                dropdownPosition={-5.2}
                                                onChangeText={value => this.onChangeFilter(value)}
                                                itemTextStyle={{ paddingLeft: 5, fontFamily: 'Montserrat-Bold', fontSize: 10, paddingBottom: 0, color: '#333333', margin: 0, width: '100%' }}
                                                data={data}
                                                fontSize={10}
                                                value={''}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.Sort_Container}>
                                        <View style={styles.Filter_Container}>
                                            <Text style={{ color: '#333333', fontFamily: 'Montserrat-Regular', fontSize: 12,textAlign:'left' }}>
                                                Sort by:
                                                      </Text>
                                                      <View style={{flexDirection:'row'}}>
                                            <View style={{ borderRadius: 5, width: 80, borderColor: '#cccccc', borderWidth: 1, marginLeft: 0, height: 27, alignItems: 'center', alignContent: 'center', justifyContent: 'center', }}>
                                                <Dropdown
                                                    containerStyle={{ paddingLeft: 3, margin: 0, marginBottom: 8, borderBottomWidth: 0, justifyContent: "center", paddingBottom: 0, width: '100%' }}
                                                    dropdownOffset={{ top: 0, left: 0, }}
                                                    dropdownMargins={{ min: 0, max: 0 }}
                                                    dropdownPosition={-3.2}
                                                    onChangeText={value => this.onChangeSortby(value)}
                                                    itemTextStyle={{ paddingLeft: 3, fontFamily: 'Montserrat-Bold', fontSize: 10, paddingBottom: 0, color: '#333333', margin: 0, width: '100%' }}
                                                    data={data2}
                                                    fontSize={10}
                                                    value={''}
                                                />

                                            </View>
                                            <TouchableWithoutFeedback onPress={() => this.callMethod(this.state.SearchText)}>
                                                <View style={{ width: 40, height: 25, backgroundColor: this.isFromGambling == true ? '#68bcbc':'#e2211c', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginLeft: 3 }}>
                                                    <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Montserrat-Bold' }}>
                                                        OK
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    </View>
                                </View>


                                {this.state.NoData == false ?

                                    <View style={{ height: '85%' }}>
                                        <View style={{ height: '93%' }}>
                                            <FlatList
                                                key={this.state.DataList.length}
                                                extraData={this.state}
                                                data={this.state.DataList}
                                                keyExtractor={(item: any, index) => index.toString()}
                                                bounces={false}
                                                renderItem={({ item, index }: any) => {
                                                    return (

                                                        <View style={{ padding: 10, }}>
                                                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                                                <Text style={{ color: '#333333', textDecorationColor: '#888888', textDecorationLine: 'underline', fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>{item.event_name}  </Text>
                                                            </View>

                                                            <Text style={{ color: '#333333', fontSize: 14, fontFamily: 'Montserrat-Regular' }}>
                                                                Week 7 - {item.ondate}, {item.ontime}
                                                            </Text>

                                                        </View>
                                                    )
                                                }} />
                                        </View>
                             


                                    </View>
                                    :
                                    <View >
                                        {this.state.NoData == true ?
                                            <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{
                                                    color: '#e2211c',
                                                    fontSize: hp(3.5),
                                                    justifyContent: 'center',
                                                    fontFamily: 'Montserrat-Bold',
                                                }}>
                                                    No Result Found
                                                </Text>
                                                <TouchableWithoutFeedback onPress={() => { this.SearchAgain() }}>
                                                    <Text style={{
                                                        color: '#e2211c',
                                                        fontSize: hp(1.6),
                                                        justifyContent: 'center',
                                                        fontFamily: 'Montserrat-Bold',
                                                        textDecorationLine: 'underline'
                                                    }}>
                                                        Search Again
                                                    </Text>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            : null}
                                    </View>
                                }

                            </View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: '5%' }}>
                                <Text style={{ color: this.isFromGambling == true ? '#68bcbc':'#e2211c', fontSize: 12, fontFamily: 'Montserrat-Bold', }}> 
                                </Text>
                            </View>
                        </View>
                    </View>
                </Dialog>
            </View>
        );
    }
}