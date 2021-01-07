import React from "react";
import { View, Text, ScrollView, FlatList,TouchableOpacity, BackHandler,Dimensions } from "react-native";
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
import UrlService from '../../../../Services/Core/ServiceURI';
import HTML from 'react-native-render-html';
import ProgressLoader from 'rn-progress-loader';
import Icons from 'react-native-vector-icons/MaterialIcons';
var update = require('immutability-helper');


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'TERMS OF USE',
}

interface G_TermsOfUseViewProps extends AppValidationComponentProps { }

interface G_TermsOfUseViewState extends AppValidationComponentState {
    DataList: any;
    Flag: any;
    loader: any;
    termsconditiondata: any;
    page_title: any;
}



export default class G_TermsOfUseView extends AppValidationComponent<G_TermsOfUseViewProps, G_TermsOfUseViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private FAQData: any
    private flatListRef: any
    private scroll: any
    constructor(props: G_TermsOfUseViewProps) {
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
                RouterBuilder.replaceRouteTo(AppScreens.G_ProfileView, this.props)
                return true; 
            }

            return false;
        })
    }
    callTermsConditionMethod(itemData) {

       

        this.setState({ loader: true });
       
                var params: any = {
                    'page_name': this.props.navigation.state.params.params.type,
                      };
              
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


    Backtotop() { 
        this.scroll.scrollTo({x: 0, y: 0, animated: true});
     }


    // ----------------------------------------------------------------- Design and Design Methods ----------------------------------------------------------
    render() {
        return (
            <Container
                title={this.state.page_title}
                isHeader={true}
                isSubHeader={false}
                isTitle={false}
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
                <View style={[styles.customhead,{backgroundColor:'white'}]}> 
          <View style={{ alignContent: 'flex-start', alignItems:'flex-start', width:'30%' }}>             
              <Icons name="arrow-back" size={30} color="black" style={{ marginLeft: 5,marginTop:5 }}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>
              <View style={{ alignContent: 'flex-start', alignItems: 'flex-start', width:'70%' }}>
                <Text style={[styles.customheadtext,{color:'#68bcbc'}]}>{this.state.page_title}</Text>
              </View>
             
              
             
           </View>
                    <ScrollView bounces={false} style={styles.scrollviewstyle} ref={(c) => {this.scroll = c}}>

                    <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',padding:10}}>
                        <HTML emSize={2} html={this.state.termsconditiondata} imagesMaxWidth={Dimensions.get('window').width-10} />
                            {/* <FlatList
                             ref={(ref) => { this.flatListRef = ref; }}
                            
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
