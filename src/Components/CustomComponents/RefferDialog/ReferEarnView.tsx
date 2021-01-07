import React from "react";
import { View, Text, ToastAndroid, ScrollView, Image, Share, Clipboard, ImageBackground, FlatList, TouchableWithoutFeedback, TouchableOpacity, BackHandler, Alert } from "react-native";

import styles from './styles';
import Container from '../../Container';
import AppScreens from "../../../Util/AppScreens";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../Util/AppValidationComponent";
import RouterBuilder from "../../../Router"
import { MenuIconListener } from "../../Icons/MenuIcon/MenuIcon";
import { ISubheaderListener } from "../SubHeader/SubHeader";
import { LogoIconListener } from "../../Icons/LogoIcon/LogoIcon";
import AlertUtil from "../../../Util/AlertUtil";
import Application from "../../../Entities/Application";
import LogoutUtill from "../../../Util/LogoutUtill";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var update = require('immutability-helper');
import ReferralService from "../../../Services/Referral/ReferralService";
import { Dialog } from 'react-native-simple-dialogs';
import BigButton from '../../Button/BigButton';
import Messgae from "../../../Services/Core/Messages"
import Message from "../../../Services/Core/Messages";
import Guestdialog from "../Gues_dialog/Guest_dialog";
const ProfilePageContent = {
    key: 'somethun',
    page_title: '',
}

interface G_ReferEarnViewProps extends AppValidationComponentProps { }

interface G_ReferEarnViewState extends AppValidationComponentState {
    DataList: any;
    Flag: any;
    loader: any;
    guestUserDialog: boolean;
}



export default class G_ReferEarnView extends AppValidationComponent<G_ReferEarnViewProps, G_ReferEarnViewState>
{
    private FAQData: any
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    private total_earn_by_referral = Application.sharedApplication().user!.profile.total_earn_by_referral;
    private referralservice = new ReferralService(); 
    constructor(props: G_ReferEarnViewProps) {
        super(props);
        this.state = {
            DataList: '',
            Flag: 'A',
            loader: false,
            guestUserDialog: false,
        }
    }

    // ---------------------------------------------------------------------API Calling----------------------------------------------------------
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        //this.getAllFaq();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        Alert.alert(
            'Exit App',
            'Are You Sure You Want to Exit the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }

    //garima
    async shareNow() {
        if (Application.sharedApplication().user!.profile.userType == 'Guest') {
            this.setState({ guestUserDialog: true });
        }
        else {
        // var message1 = " I’m giving you 5,000 FREE UDDA Bucks which can be used to make up to 5 FREE bets in the UDDA App. To accept, use code " + this.my_referral_code
        var message1 = "I’m inviting you to join UDDA. To accept, use code " + this.my_referral_code
        var url = "http://bet.udda.com/index.php"; 
        var referralurl = await this.referralservice.getReferralUrl(url, this.my_referral_code,"U");
		console.log(referralurl);
        var message2 = " to sign up. Enjoy! Details: "+referralurl
        var Message = message1 + message2;
        Share.share({
            message: Message
        }).then(result => {

            console.log('share result' + JSON.stringify(result));
        }).catch(errorMsg => {

            console.log('share error ' + JSON.stringify(errorMsg));
        });
    }
    }


    loginButtonPressed() {
        this.setState({ guestUserDialog: false });
        // this.props.navigation!.navigate(AppScreens.G_LoginPage,this.props);
        RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
    }

    closeModal() {
        this.setState({ guestUserDialog: !this.state.guestUserDialog });
      }

    gotoPreviousScreen() {
        // this.props.navigation!.goBack(null);
        // return true;
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
    }

    copyText() {
        if (Application.sharedApplication().user!.profile.userType != 'Guest') {
        Clipboard.setString(this.my_referral_code);
        ToastAndroid.show('Referral Code Copied !', ToastAndroid.SHORT);
        }
    }
    goToMyReferees(){
       // this.props.navigation!.navigate(AppScreens.G_MyRefereesView);
    }

    // ----------------------------------------------------------------- Design and Design Methods ----------------------------------------------------------
    render() {
        return (
            <Dialog>
            <Container>
                <View style={styles.scrollContent}>
                    <ScrollView bounces={false} style={styles.scrollviewstyle}>
                        <View style={styles.mainHeader}>
                            <View style={styles.subHeader}>
                                <View style={styles.leftContainer}>
                                    <TouchableOpacity onPress={() => { this.gotoPreviousScreen() }}>
                                        <Image source={require('../../../images/back_icon.png')} style={{ width: wp(6), height: wp(6), marginLeft: wp(5) }} resizeMode='contain' />
                                    </TouchableOpacity>
                                    <Text style={styles.headerText}>
                                        Refer & Earn
                            </Text>
                                </View>

                                <View style={styles.rightContainer}>
                                    <Image source={require('../../../images/udda_logo.png')} style={{ width: wp(20), height: wp(20), marginLeft: 0 }} resizeMode='contain' />
                                </View>
                            </View>
                            <View style={styles.middleElement}>
                                <Image source={require('../../../images/f_i_t_icon.png')} style={{ width: '100%', height: wp(70), marginLeft: 0 }} resizeMode='contain' />
                            </View>
                        </View>

                        <View style={styles.referSection}>
                            <View >
                                <Text style={styles.firstMsg}>Refer a Friend
                            {'\n'}
                                    earn 5 Free bets</Text>
                            </View>
                            <View >
                                <Text style={styles.secondMsg}>You will receive 5,000 UDDA BUCKS </Text>
                            </View>
                            <View >
                                <Text style={styles.thirdMsg}>* Minimum Bet is 1,000 UDDA BUCKS</Text>
                            </View>
                        </View>

                        <View style={styles.referCode}>
                            <ImageBackground source={require('../../../images/box_border.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: 60 }}>
                                <View style={styles.ReferralCodeSection}>
                                    <View style={styles.leftRefer}>
                                        <Text style={[styles.textCode, { textAlign: 'left' }]}>
                                            Referral Code :
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', }}>
                                        <Text style={styles.code}>
                                            {this.my_referral_code}
                                        </Text></View>
                                    <View style={styles.rightRefeer}>
                                        <TouchableOpacity onPress={() => {this.copyText()}}>
                                            <Image source={require('../../../images/copy_icon.png')} style={{ width: wp(6), height: wp(6), marginLeft: wp(5) }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                </View>


                            </ImageBackground>



                        </View>
                        {/* total earned section*/}
                        <View style={styles.totalEarned}>
                            <View style={styles.totalLeft}>
                                <Text style={{ color: '#000', fontSize: wp(4), fontFamily: 'Montserrat-Medium' }}>Total earned from referrals</Text>
                                <View style={{ flexDirection: 'row', marginTop: wp(4) }}>
                                    <Image source={require('../../../images/udda_bucks_icon.png')} style={{ width: wp(7), height: wp(7) }} resizeMode='contain' />
                                    <View style={{flexDirection:'row'}}>
                                    <Text style={{ color: '#67BCBE', fontSize: wp(5), letterSpacing: 2, fontFamily: 'Montserrat-Medium', marginLeft: wp(5) }}>
                                        {this.total_earn_by_referral}</Text>
                                        {this.total_earn_by_referral > 0 ?<TouchableOpacity onPress={() => { this.goToMyReferees() }}>
                                        <Image  source={require('../../../images/Bet_Share.png')} style={{ height: 20, width: 20 , tintColor:"#68bcbc",marginLeft:5}} resizeMode='contain' tintColor="#68bcbc" />
                                        </TouchableOpacity>:null}
                                    </View>
                                    
                                </View>
                                <Text style={{ color: '#67BCBE', fontSize: wp(5), letterSpacing: 2, fontFamily: 'Montserrat-Medium', marginLeft: wp(5) }}>
                                        UDDA Bucks</Text>
                            </View>
                            <View style={styles.rightImage}>

                                <Image source={require('../../../images/prize.png')} style={{ width: wp(25), height: wp(25) }} resizeMode='contain' />
                            </View>

                        </View>



                    </ScrollView>
                </View>
                
                <View style={{ width: '100%', height: 60,  marginBottom: 0,flexDirection:'row',justifyContent:'space-between' }}>
                    <View style={{width:'100%',marginRight:'1%'}}>
                        <TouchableWithoutFeedback onPress={() => { this.shareNow() }}>
                            <View style={{ width: '100%', height: 60, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Image source={require('../../../images/share_icon.png')} style={{ width: wp(6), height: wp(6) }} resizeMode='contain' />
                                <Text style={{ color: 'white', fontSize: wp(5), fontFamily: 'Montserrat-Bold', marginLeft: wp(3) }}>
                                    Refer a Friend
    </Text>
                            </View>
                        </TouchableWithoutFeedback>    
                    </View>
                    {/* <View style={{ width: '49%', }}>
                        <TouchableWithoutFeedback onPress={() => { this.goToMyReferees() }}>
                            <View style={{ width: '100%', height: 60, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                               <Text style={{ color: 'white', fontSize: wp(5), fontFamily: 'Montserrat-Bold' }}>
                                    My Referees
    </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> */}
                  
                </View>
                {/* -------------------------------- Guest User Dialogue --------------------------------*/}
                <Dialog
                   // visible={this.state.guestUserDialog}
                    title=""
                    onTouchOutside={() => this.setState({ guestUserDialog: false })} >

                    <View style={{ backgroundColor: "white" }}>

                        <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
                            {Message.Guest_Msg}
                  </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                            <View style={{ width: '46%' }}>
                                <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.setState({ guestUserDialog: false }) }} />
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ width: '46%' }}>
                                <BigButton title="OK" style={{ backgroundColor: '#68bcbc' }} textStyle={styles.verify_button_text_style}
                                    listener={() => { this.loginButtonPressed(this) }} />
                            </View>
                        </View>
                    </View>
                </Dialog>
                {/* {this.state.guestUserDialog?<Guestdialog detailmodel={this.state.guestUserDialog} onDismiss={() => {
                  this.closeModal();
                }} onClick={() => {
                    this.loginButtonPressed();
                  }}/>:null} */}
            </Container>
            </Dialog>
        );



    }
}
