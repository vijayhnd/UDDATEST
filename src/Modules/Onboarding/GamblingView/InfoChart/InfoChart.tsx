import React, { Component, ReactInstance } from "react";
import { View, Text, ScrollView, FlatList,TouchableWithoutFeedback } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppConstants from "../../../../Util/Constants";
import AppScreens from "../../../../Util/AppScreens";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import RouterBuilder from "../../../../Router"
import { TermsTable } from "./TermsTable";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import GrayPrevIcon from "../../../../Components/Icons/GrayIconPrev";
import GrayNextIcon from "../../../../Components/Icons/GrayIconNext";
import Application from "../../../../Entities/Application";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
import Icons from 'react-native-vector-icons/MaterialIcons';



const ProfilePageContent = {
    key: 'somethun',
    page_title: 'INFO',
}

interface G_InfoChartViewProps extends AppValidationComponentProps { }

interface G_InfoChartViewState extends AppValidationComponentState {
    DataList: any;
    Flag: any;
    RealDataList: any;
    PageIndex:any;
}



export default class G_InfoChartView extends AppValidationComponent<G_InfoChartViewProps, G_InfoChartViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private FAQData: any
    private flatListRef: any
    private scroll: any
    public authorisationToken = Application.sharedApplication().user!.authenticationToken;

    constructor(props: G_InfoChartViewProps) {
        super(props);
        this.state = {
            RealDataList: '',
            DataList: '',
            Flag: 'A',
            PageIndex:1,
        }

    }










    // ----------------------------------------------------- API Calling ----------------------------------------------------------
    componentDidMount() {
        this.getchartAPIcall(this.state.PageIndex);

    }


    getchartAPIcall(index:any) {

        var params: any = {
            'pageno': index,
        };

        console.log('getchartAPIcall body param ' + JSON.stringify(params));
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/price_chart', {
            method: 'POST',
            headers: {
                //garima
               // 'Content-Type': 'application/x-www-form-urlencoded',
               'Content-Type' :'multipart/form-data',
                'authorisation': this.authorisationToken
            },
            body: formData,

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("getchartAPIcall response " + JSON.stringify(responseJson));
                if(responseJson.message == "success")
                {
                    this.setState({DataList:responseJson.data.datalist})
                }
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
            })
            .catch(error => console.log(error))

    }









    // --------------------------------------------------------------------- Methods ----------------------------------------------------------
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


    Backtotop() {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }

    prevnext(index: any, flag: any) {
        var newindex;
        if(this.state.PageIndex > 0)
        {
            if (flag == 'p' && this.state.PageIndex != 1) {
                newindex = this.state.PageIndex - 1;
                this.setState({PageIndex : newindex});
                this.getchartAPIcall(newindex);
            } else if (flag == 'n' && this.state.DataList.next_title != " - ") {
                newindex = this.state.PageIndex + 1;
                this.setState({PageIndex : newindex});
                this.getchartAPIcall(newindex);
            }
            else{

            }
            
        }
        
    }



    // ----------------------------------------------------------------- Design and Design Methods ----------------------------------------------------------
    render() {
        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={false}
                isTitle={false}
                menuIconListener={this}
                isSetting={false}
                LogoIconListener={this}
                accountNameListener={this}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}>



                <View style={styles.scrollContent}>
                    <View style={{ width:'100%',height:'5%' }}>
                    <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 5,marginTop:5 }}
                onPress={() => this.props.navigation?.goBack(null)}
              /> 
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPress={() => { this.prevnext(this.state.DataList.index,'p') }}>
                            <View style={{ width: '35%', flexDirection: 'row', alignItems: 'center' }}>
                                <GrayPrevIcon />
                                <Text style={[styles.textStyle, { textAlign: 'left', fontSize: hp(1.5),color:this.state.DataList.index == 0 ? '#999999' : 'black' }]}> {this.state.DataList.prev_title} </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={[styles.titleContainer, { width: '30%', justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={[styles.textStyle, { color: '#68bcbc' }]}>INFO</Text>
                        </View>

                        <TouchableWithoutFeedback onPress={() => { this.prevnext(this.state.DataList.index,'n') }}>
                            <View style={{ width: '35%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Text style={[styles.textStyle, { textAlign: 'right', fontSize: hp(1.5) }]}> {this.state.DataList.next_title} </Text>
                                <GrayNextIcon />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>



                    <View style={{ width: '100%' }}>
                        <FlatList
                            data={this.state.DataList.playersArray}
                            extraData={this.state}
                            bounces={false}
                            numColumns={6}
                            keyExtractor={(item: any, index) => index.toString()}
                            renderItem={({ item, index }: any) => {
                                return (
                                    <View style={{ flex: 1 }}>
                                        <View style={[{ backgroundColor: '#68bcbc' }, styles.bg_flatlist_2]}>
                                            <Text style={[styles.textFlatlistStyle, { color: 'black' }]}>{item.value}</Text>
                                        </View>
                                    </View>
                                )
                            }} />
                    </View>

                    <View style={{ width: '100%' }}>
                        <FlatList
                            data={this.state.DataList.paidArray}
                            extraData={this.state}
                            bounces={false}
                            numColumns={6}
                            keyExtractor={(item: any, index) => index.toString()}
                            renderItem={({ item, index }: any) => {
                                return (
                                    <View style={{ flex: 1 }}>
                                        <View style={[{ backgroundColor: '#33a2a2' }, styles.bg_flatlist]}>
                                            <Text style={[styles.textFlatlistStyle, { color: 'white' }]}>{item.value}</Text>
                                        </View>
                                    </View>
                                )
                            }} />
                    </View>

                    
                        <FlatList
                            data={this.state.DataList.valuesArray}
                            extraData={this.state}
                            bounces={false}
                            keyExtractor={(item: any, index) => index.toString()}
                            renderItem={({ item, index }: any) => {
                                var j = index;
                                return (
                                    <FlatList
                                        data={item.values}
                                        extraData={this.state}
                                        bounces={false}
                                        numColumns={6}
                                        keyExtractor={(item: any, index) => index.toString()}
                                        renderItem={({ item, index }: any) => {
                                            var i = index;
                                            return (
                                                <View style={{ flex: 1 }}>
                                                    <View style={[{ backgroundColor: j % 2 == 0 ? 'white' : '#eeeeee' }, styles.bg_flatlist]}>
                                                        <Text style={[styles.textFlatlistStyle, { color: 'black', fontFamily: i == 0 ? 'Montserrat-SemiBold' : 'Montserrat-Regular' }]}>{item.values}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }} />

                                )
                            }} />
                   


                </View>
            </Container>
        );



    }
}
