import React from "react";
import { View, Text,TouchableWithoutFeedback,Dimensions,Image,  ScrollView, FlatList ,TouchableOpacity, BackHandler} from "react-native";
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
import Application from "../../../../Entities/Application";
import UrlService from '../../../../Services/Core/ServiceURI';
import HTML from 'react-native-render-html';
import ProgressLoader from 'rn-progress-loader';
var update = require('immutability-helper');


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'TERMS OF USE',
}

interface G_OnlyTermsOfUseViewProps extends AppValidationComponentProps { }

interface G_OnlyTermsOfUseViewState extends AppValidationComponentState {
    DataList: any;
    Flag: any;
    loader: any;
    termsconditiondata: any;
    page_title: any;
    
}



export default class G_OnlyTermsOfUseView extends AppValidationComponent<G_OnlyTermsOfUseViewProps, G_OnlyTermsOfUseViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
       // private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private FAQData: any
    public scroll: any
    constructor(props: G_OnlyTermsOfUseViewProps) {
        super(props);
        this.state = {
            DataList: '',
            Flag: 'A',
            loader:false,
            termsconditiondata:'',
            page_title:'',
        }

    }

    // ---------------------------------------------------------------------API Calling----------------------------------------------------------
    componentDidMount() {
        console.log('terms condition : ',this.props.navigation.state.params.params.type)
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
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress',() =>{}); 
    }
    private loadMatches(week: number) {
        switch (week) {
            case 1: {
                this.FAQData = TermsTable.content;
                this.setState({ DataList: this.FAQData });
            }
                break;
        }
        this.setState({})
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

    goBackRegistration() {
        RouterBuilder.replaceRouteTo(AppScreens.G_RegistrationView, this.props)
    }

    Backtotop() {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }

    goBackToDashboard() {
       
            RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack, this.props);
         
      }


      callTermsConditionMethod(itemData) {

       

        this.setState({ loader: true });
        if(this.props.navigation.state.params.params.type=='terms & conditions')
         {
               var params: any = {
            'page_name': 'terms_and_conditions',
              };
            }else if(this.props.navigation.state.params.params.type=='privacy policy')
            {
                  var params: any = {
               'page_name': 'privacy_policy',
                 };
               }else{
                var params: any = {
                    'page_name': 'contest_rules',
                      };
               }
              var formData = new FormData();

              for (var k in params) {
                formData.append(k, params[k]);
              }
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/GuestUser/page_details', {
       // fetch('http://uddadev.triazinesoft.com/index.php/v2_5/apiGaming/free_to_play_contest_terms', {
   
            method: 'POST',
                headers: {
                  'Content-Type': 'multipart/form-data',
                  //'authorisation': this.authorisationToken
                },
                body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ loader: false });
               
                    console.log('callTermsConditionMethod ' + JSON.stringify(responseJson));
                    // if (responseJson.data != '') {
                    //     // const regex = /(<([^>]+)>)/ig;
                    //     // const result = responseJson.data.replace(regex, '');
                    //     // console.log('remove html tags ' + result);
                       this.setState({ page_title: responseJson.data.title });
                       this.setState({ termsconditiondata: responseJson.data.content });

                    // }
                    // else {

                    // }
                }).catch(error => {
                this.setState({ loader: false });
                console.log(error);
            })
    }

    // ----------------------------------------------------------------- Design and Design Methods ----------------------------------------------------------
    render() {
        return (
            <Container
                title={this.state.page_title}
                isHeader={false}
                isSubHeader={false}
                isMyHeader={true}
                isTitle={true}
                menuIconListener={this}
                isSetting={false}
                LogoIconListener={this}
                accountNameListener={this}
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
                {/* <TouchableWithoutFeedback onPress={() => this.goBackToDashboard()}>

<Image source={require('../../../../images/back_btn.png')} style={{ width: wp(8), height: wp(8) }} resizeMode='contain' />


</TouchableWithoutFeedback> */}
                    <ScrollView bounces={false} style={styles.scrollviewstyle} ref={(c) => { this.scroll = c }}>

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
                                                    <Text style={styles.text_answer}>{item.Content}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    )
                                }} /> */}
                        </View>


                    </ScrollView>


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
