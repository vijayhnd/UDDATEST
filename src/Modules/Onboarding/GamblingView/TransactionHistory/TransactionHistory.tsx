import React from "react";
import AppValidationComponent, {  AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, Image,  FlatList,  } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import UpdateProfileResponse from "../../../../Services/Profile/UpdateProfileResponse";
import Application from "../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { UDDAError } from "../../../../Entities";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import ProgressLoader from 'rn-progress-loader';
import moment from 'moment';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'TRANSACTION HISTORY'
}

interface G_TransactionHistoryViewProps extends AppValidationComponentProps {
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
    dialogVisible: boolean;
    OrderSummaryDialog: boolean;
    JoinNowSelected: any;
    Dialog: boolean;
    TransactionList: any;
    IsSelected: any;
    loader: any;
    RegisterDate: any;
    ChallengeName: any;
    EndDate: any;
    Nodata: any;
    selectedheader: any;
    OpenPropSwitchAccepted: any;
}



const bottom_initial = 0;

class G_TransactionHistoryView extends AppValidationComponent<G_TransactionHistoryViewProps, ProflieViewState>
    implements MenuIconListener, ISubheaderListener {

    private serviceRequestInProgress = false
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;

    constructor(props: G_TransactionHistoryViewProps) {
        super(props);
        this.state = {
            contentInsetBottom: bottom_initial,
            dialogVisible: false,
            OrderSummaryDialog: false,
            JoinNowSelected: '',
            Dialog: false,
            TransactionList: '',
            IsSelected: '',
            loader: false,
            RegisterDate: '',
            ChallengeName: '',
            EndDate: '',
            Nodata: '',
            selectedheader: 'I',
            OpenPropSwitchAccepted: ''
        }
    }
    componentDidMount() {
        this.callMethod();
    }



    // -------------------------------------------------- API Calling ------------------------------------------------------
    callMethod() {
        this.setState({ loader: true }); 

        this.setState({ loader: true }); 
        fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_transaction_history', {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false }); 
                console.log('Udda get_transaction_history Data ' + JSON.stringify(responseJson));
                if (responseJson.data.transaction_history_array != []) {
                    this.setState({ TransactionList: responseJson.data.transaction_history_array });

                }
                else {

                }
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



    // ----------------------------------------------------- Methods -----------------------------------------------

    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {
        //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
		RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
    }

    accountNameTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_ProfileView, this.props)
    }

    openPlaysTapped() {
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
        for (let i = 0; i < this.state.TransactionList.length; i++) {
            if (i == index) {
                this.state.TransactionList[i].IsSelected = !this.state.TransactionList[i].IsSelected
            }
            else {
                this.state.TransactionList[i].IsSelected = false

            }
        }
        this.setState({ IsSelected: item })
    }

    headerclicked(flag: any) {
        this.setState({ selectedheader: flag });
    }



    OpenPropSwitchValueChanged() {
        if (this.state.OpenPropSwitchAccepted === true) {
            this.setState({ OpenPropSwitchAccepted: false });
            this.callMethod();
        }
        else {
            this.setState({ OpenPropSwitchAccepted: true });
            this.callSubscriptionHistory();
        }
    }

    callSubscriptionHistory() {

    }



    
    // ----------------------------------------------------- Design -----------------------------------------------
    render() {
        return (
            <Container title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={true}
                isTitle={true}
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
                   
                    {this.state.TransactionList.length > 0 ?

                        <View style={styles.Flatlist_Style}>
                            <FlatList
                                bounces={false}
                                data={this.state.TransactionList}
                                extraData={this.state}
                                keyExtractor={(item: any, index: any) => index.toString()}
                                renderItem={({ item, index }: any) => {
                                    var subindex = index;
                                    var formatted_date = moment(item.created_date).format("MMM DD");
                                    return (
                                        <View style={styles.Flatlist_Main_Container}>

                                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                                    <View style={{ width: '17%', paddingVertical: 5, justifyContent: 'center' }}>
                                                        <Text style={[styles.date_Style, { paddingLeft: 5 }]}>{formatted_date}</Text>
                                                    </View>
                                                    <View style={{ width: '30%', paddingVertical: 5, justifyContent: 'center' }}>
                                                        <Text style={styles.label_Style}> {item.product_reference_name}</Text>
                                                    </View>
                                                    <View style={{ width: '27%', paddingVertical: 5, marginRight: '1%' }}>
                                                        <View style={{ flexDirection: 'row', borderColor: '#68bcbc', borderWidth: 1, backgroundColor: '#68bcbc', margin: 2, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Image source={require('../../../../images/White_Bucks.png')} style={{ height: 10, width: 10, marginRight: 3, }} />
                                                            <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.8) }}>{item.udda_bucks}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '24%', paddingVertical: 5, marginRight: '1%' }}>
                                                        <View style={{ flexDirection: 'row', borderColor: '#666666', borderWidth: 1, margin: 2, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ color: '#666666', fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.2), marginBottom: 5 }}>$</Text>
                                                            <Text style={{ color: '#666666', fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.8) }}>{item.amount}</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                        </View>

                                    )
                                }} />
                          
                        </View>
                        :
                        <View style={{ height: '85%', backgroundColor: '#eeeeee', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                            <Text style={[styles.Current_Text_Style, { textAlign: 'center' }]}>No Data Found</Text>
                        </View>}

                </View>

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

export default connect(mapStateToProps)(G_TransactionHistoryView);