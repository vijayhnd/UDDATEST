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

import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from "../../../../Services/Core/ServiceURI"

import CircleImage from "../../../../Components/CustomComponents/CircleImage";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
var update = require('immutability-helper');

const ProfilePageContent = {
    key: 'somethun',
    page_title: 'MY PARTICIPANTS',
}

interface G_MyRefereesViewProps extends AppValidationComponentProps {
}

interface G_MyRefereesViewState extends AppValidationComponentState {
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
    scrollenabled: any;
    leagueArr: any;
    newSortKeyArr: any;
    imageFilePath:any;

}


export default class G_MyRefereesView extends AppValidationComponent<G_MyRefereesViewProps, G_MyRefereesViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    constructor(props: G_MyRefereesViewProps) {
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
            scrollenabled: true,
            leagueArr: [],
            newSortKeyArr: [],
            imageFilePath:'http://uddadev.triazinesoft.com/assets/photos/default-user.jpg'
        };
    }

    componentDidMount() {
        this.callMethod();
    }



    // ----------------------------------------------- API calling ---------------------------------------


    callMethod() {
        this.setState({ DataList: [] });
        this.setState({ loader: true });
        // var params: any = {
        //     'my_referral_code': this.my_referral_code,
        // };

        var params: any = {
            'my_referral_code': 'BOTVA3QO',
        };
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/referral/list_referee', {
            method: 'post',
            headers: {
                'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
               console.log('Success my referrr' + JSON.stringify(responseJson.data));
                this.setState({ DataList: responseJson.data });
               // console.log("datalist ---->" + JSON.stringify(this.state.DataList));;
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => {
                this.setState({ loader: false });
                console.log(error);
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

    goToProfile(){
        this.props.navigation!.navigate(AppScreens.G_ProfileView);
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
                     <ProgressLoader
                        visible={this.state.loader}
                        isModal={true} isHUD={true}
                        hudColor={"#68bcbc"}
                        color={"#FFFFFF"} />
             {/*    <View style={styles.hrline} /> */}
                <View style={{  }}>
                   <View style={{height:'90%',backgroundColor:'red'}}>
                    <ScrollView style={{ flex: 1, paddingHorizontal:'3%'}}>
                        <FlatList
                            data={this.state.DataList}
                            extraData={this.state}
                            keyExtractor={(item: any, index) => index.toString()}
                            bounces={false}
                            renderItem={({ item, index }: any) => {
                               
                                return (
                                    <View style={{ flex: 1 }}>

                                  
                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />

                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />
                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />
                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />
                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />
                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />
                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />
                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />
                        <View style={styles.listContainer}>                            
                            <View style={styles.username}>
                                <Text style={styles.name}>
                                   {item.name}
                               </Text>
                            </View>                          
                        </View>
                        <View style={styles.hrline1} />


                                    </View>
                          )
                            }}
                        />
                    </ScrollView>
</View>
<View style={{height:'10%',backgroundColor:'yellow',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
    <Text style={styles.name}>Invite More</Text>
</View>
                </View>
            </Container >
        );

    }

}

