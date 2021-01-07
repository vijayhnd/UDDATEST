import React from "react";
import { View, Text,  ScrollView, FlatList,TouchableOpacity, BackHandler } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppConstants from "../../../../Util/Constants";
import AppScreens from "../../../../Util/AppScreens";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, {  AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import RouterBuilder from "../../../../Router"
import { PrivacyPolicyTable } from "./PrivacyPolicyTable";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
var update = require('immutability-helper');


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'PRIVACY POLICY',
}

interface G_PrivacyPolicyViewProps extends AppValidationComponentProps { }

interface G_PrivacyPolicyViewState extends AppValidationComponentState {
    DataList: any;
    Flag: any;
}



export default class G_PrivacyPolicyView extends AppValidationComponent<G_PrivacyPolicyViewProps, G_PrivacyPolicyViewState>
    implements MenuIconListener, ISubheaderListener,LogoIconListener {
    private FAQData: any
    public scroll:any
    constructor(props: G_PrivacyPolicyViewProps) {
        super(props);
        this.state = {
            DataList: '',
            Flag: 'A'
        }
    }

    // ---------------------------------------------------------------------API Calling----------------------------------------------------------
    componentDidMount() {
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

    // --------------------------------------------------------------------- Methods ----------------------------------------------------------
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
        RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
      }
    
      coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
      }

    SelectedQuestion(items: any, index: any) {
        items.isselected = !items.isselected;

        const newstate = update(this.state.DataList, { $splice: [[index, 1, items]] }); 
        this.setState({ DataList: newstate });

    }


    Backtotop() {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }

    // ----------------------------------------------------------------- Design and Design Methods ----------------------------------------------------------
    render() {
        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={false}
                isTitle={true}
                menuIconListener={this}
                LogoIconListener={this}
                accountNameListener={this}
                isSetting={false}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}
            >
                <View style={styles.scrollContent}>
                <ScrollView bounces={false} style={styles.scrollviewstyle} ref={(c) => {this.scroll = c}}>

                        <View>
                            <FlatList
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
                                }} />
                        </View>
                    </ScrollView>

                    {/* Bottom_Navigation */}
                    <View style={{ width: '100%',height: 'auto'}}>
                        <Text style={[styles.text_answer,{ paddingBottom: 0}]}>If you have any questions or suggestions about our Privacy Policy.do not hesitate to contct us at</Text>
                        <Text style={[styles.text_answer, { textDecorationLine: 'underline', color: '#68bcbc' }]}>support@udda.com</Text>
                    </View>

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
