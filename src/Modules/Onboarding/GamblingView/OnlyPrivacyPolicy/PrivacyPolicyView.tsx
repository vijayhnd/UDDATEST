import React from "react";
import { View, Text, ScrollView,Dimensions, FlatList, TouchableOpacity, BackHandler} from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppConstants from "../../../../Util/Constants";
import AppScreens from "../../../../Util/AppScreens";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import RouterBuilder from "../../../../Router"
import { PrivacyPolicyTable } from "./PrivacyPolicyTable";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import UrlService from '../../../../Services/Core/ServiceURI';
import HTML from 'react-native-render-html';
import ProgressLoader from 'rn-progress-loader'
var update = require('immutability-helper');


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'PRIVACY POLICY',
}

interface G_OnlyPrivacyPolicyViewProps extends AppValidationComponentProps { }

interface G_OnlyPrivacyPolicyViewState extends AppValidationComponentState {
    DataList: any;
    Flag: any;
    loader: any;
    termsconditiondata: any;
}



export default class G_OnlyPrivacyPolicyView extends AppValidationComponent<G_OnlyPrivacyPolicyViewProps, G_OnlyPrivacyPolicyViewState>
    implements MenuIconListener, ISubheaderListener,LogoIconListener {
    private FAQData: any
    public scroll: any
    constructor(props: G_OnlyPrivacyPolicyViewProps) {
        super(props);
        this.state = {
            DataList: '',
            Flag: 'A',
            loader:false,
            termsconditiondata:''
        }
    }

    // ---------------------------------------------------------------------API Calling----------------------------------------------------------
    componentDidMount() {
        this.callTermsConditionMethod('')
        setTimeout(() => {
            this.loadMatches(1)
        }, AppConstants.ZeroDelay)
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props) {
                RouterBuilder.resetRouteTo(AppScreens.SplashLandingView, this.props)
                return true; 
            }

            return false;
        })
    }
    callTermsConditionMethod(itemData) {

       

        this.setState({ loader: true });
           var params: any = {
            'contest_id': '',
              };
              var formData = new FormData();

              for (var k in params) {
                formData.append(k, params[k]);
              }
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/GuestUser/terms_and_condition', {
       // fetch('http://uddadev.triazinesoft.com/index.php/v2_5/apiGaming/free_to_play_contest_terms', {
   
            method: 'GET',
                headers: {
                  'Content-Type': 'multipart/form-data',
                  //'authorisation': this.authorisationToken
                },
               // body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
               
                    console.log('callTermsConditionMethod ' + JSON.stringify(responseJson));
                    // if (responseJson.data != '') {
                    //     // const regex = /(<([^>]+)>)/ig;
                    //     // const result = responseJson.data.replace(regex, '');
                    //     // console.log('remove html tags ' + result);
                        this.setState({ termsconditiondata: responseJson.data });

                    // }
                    // else {

                    // }
                }).catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress',() =>{}); 
    }
    private loadMatches(week: number) {
        switch (week) {
            case 1: {
                this.FAQData = PrivacyPolicyTable.content;
                this.setState({ DataList: this.FAQData });
            }
                break;
        }
        this.setState({})
    }

    Backtotop() {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }


    // --------------------------------------------------------------------- Methods ----------------------------------------------------------
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

    SelectedQuestion(items: any, index: any) {
        items.isselected = !items.isselected;

        const newstate = update(this.state.DataList, { $splice: [[index, 1, items]] }); // array.splice(start, deleteCount, item1)
        this.setState({ DataList: newstate });

    }

    goBackRegistration()
    {
        RouterBuilder.replaceRouteTo(AppScreens.G_RegistrationView, this.props)
    }

    // ----------------------------------------------------------------- Design and Design Methods ----------------------------------------------------------
    render() {
        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={false}
                isSubHeader={false}
                isMyHeader={true}
                isTitle={true}
                menuIconListener={this}
                LogoIconListener={this}
                accountNameListener={this}
                isSetting={false}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}
            >


                <ProgressLoader
                    visible={this.state.loader}
                    isModal={true} isHUD={true}
                    hudColor={"#68bcbc"}
                    color={"#FFFFFF"} />
                <View style={styles.scrollContent}>
                <ScrollView bounces={false} style={styles.scrollviewstyle} ref={(c) => {this.scroll = c}}>

                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',padding:10}}>
                        <HTML emSize={2} html={this.state.termsconditiondata} imagesMaxWidth={Dimensions.get('window').width-10} />
                            {/* <FlatList
                                data={this.state.DataList}
                                extraData={this.state}
                                bounces={false}
                                keyExtractor={(item: any, index) => index.toString()}
                                renderItem={({ item, index }: any) => {

                                    return (
                                        <View style={styles.Main_Container}>
                                            <View style={styles.Second_Container}>
                                                <View style={styles.question_container}>
                                                    <Text style={styles.text_container}>{item.label}</Text>
                                                </View>
                                                <View style={styles.Answer_Container}>
                                                    <Text style={[styles.text_answer]}>{item.Content}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    )
                                }} /> */}
                        </View>
                    </ScrollView>
{/* 
                    <View style={{ width: '100%',height: 'auto',marginBottom:5}}>
                        <Text style={[styles.text_answer,{ paddingBottom: 0}]}>If you have any questions or suggestions about our Privacy Policy.do not hesitate to contct us at</Text>
                        <Text style={[styles.text_answer, { textDecorationLine: 'underline', color: '#68bcbc' }]}>support@udda.com</Text>
                    </View> */}

                    <View style={{ width: '100%', height: '5%' }}>
                        <View style={{ flexDirection: 'column' }}>
                               <TouchableOpacity onPress={() => { this.Backtotop() }}>
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#68bcbc', fontSize: hp(1.5), textDecorationLine: 'underline', fontFamily: 'Montserrat-Medium' }}>Back to Top</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Container>
        );



    }
}
