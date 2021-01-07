import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback, BackHandler } from "react-native";
import styles from './styles';
import Container from '../../../../../Components/Container';
import AppScreens from "../../../../../Util/AppScreens";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../../Util/AppValidationComponent";
import { MenuIconListener } from "../../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../../Components/Icons/LogoIcon/LogoIcon";
import { ISubheaderListener } from "../../../../../Components/CustomComponents/SubHeader/SubHeader";
import RouterBuilder from "../../../../../Router";
import { Dialog } from 'react-native-simple-dialogs';


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'WITHDRAW',
}

interface ProfileViewProps extends AppValidationComponentProps {
}

interface ProflieViewState extends AppValidationComponentState {

    PaymentType: any
    DialogCharity: boolean
    CardDetailShow: any
    BankDetailShow: any


}



export default class G_WithdrawMoneyView extends AppValidationComponent<ProfileViewProps, ProflieViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private playtableData: any
    constructor(props: ProfileViewProps) {
        super(props);
        this.state = {
            PaymentType: 'B',
            DialogCharity: false,
            CardDetailShow: false,
            BankDetailShow: false,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props) {
                RouterBuilder.replaceRouteTo(AppScreens.G_Settings_2_View, this.props)
                return true; 
            }

            return false;
        });

    }


    showMoreDialog(isShow: any) {
        this.setState({ DialogCharity: isShow });
    }

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
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }

    selectPaymentType(p_Type: any) {
        this.setState({ PaymentType: p_Type });
    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_CoveredPlaysView, this.props)
    }

    showCardDetails() {
        this.setState({ CardDetailShow: !this.state.CardDetailShow });
    }

    showBankDeatils() {
        this.setState({ BankDetailShow: !this.state.BankDetailShow });
    }

    render() {
        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={true}
                isTitle={true}
                menuIconListener={this}
                LogoIconListener={this}
                isSetting={false}
                accountNameListener={this}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}
                showIndicator={false}>
                <View style={styles.scrollContent}>
                    <ScrollView bounces={false} style={styles.scrollviewstyle}>

                        <View
                            style={styles.Main_Container_payment}>
                            <View style={styles.payment_type_main_container}>


                                <View style={styles.Payment_Type_card}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableWithoutFeedback onPress={() => { this.selectPaymentType('V') }}>
                                            <View style={[styles.Payment_Image, { borderColor: this.state.PaymentType == 'V' ? '#68bcbc' : '#bfbfbf' }]}>
                                                <Image source={require('../../../../../images/venmo_logo.png')} style={styles.Venom_Image_Size} resizeMode='contain' />
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <TouchableWithoutFeedback onPress={() => { this.selectPaymentType('S') }}>
                                            <View style={[styles.Payment_Image, { borderColor: this.state.PaymentType == 'S' ? '#68bcbc' : '#bfbfbf' }]}>
                                                <Image source={require('../../../../../images/square-payments-logo.png')} style={styles.Square_Image_Size} resizeMode='contain' />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>


                                    <TouchableWithoutFeedback onPress={() => { this.selectPaymentType('B') }}>
                                        <View style={[styles.ACH_Main_Layout, { borderColor: this.state.PaymentType == 'B' ? '#68bcbc' : '#bfbfbf' }]}>
                                            <View style={styles.ach_image}>
                                                <Image source={require('../../../../../images/ach-by-cliq.png')} style={styles.ACH_Image_Size} resizeMode='contain' />
                                            </View>
                                            <View style={styles.ach_text}>
                                                <Text style={styles.direct_text_style}>Direct Bank Transfer</Text>
                                                <Text style={styles.automated_text_style}>AUTOMATED CLEARNING HOUSE</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>


                                    <TouchableWithoutFeedback onPress={() => { this.selectPaymentType('D') }}>
                                        <View style={[styles.ACH_Main_Layout2, { borderColor: this.state.PaymentType == 'D' ? '#68bcbc' : '#bfbfbf' }]}>
                                            <View style={styles.ach_image}>
                                                <Image source={require('../../../../../images/Donation_Image.png')} style={styles.ACH_Image_Size} resizeMode='contain' />
                                            </View>
                                            <View style={styles.ach_text}>
                                                <Text style={styles.share_text_style}>Share The Love</Text>
                                                <Text style={styles.make_text_style}>MAKE A DONATION</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>







                                {/* ------------------------------------------------------Venmo Click Design------------------------------------------------------------ */}


                                {this.state.PaymentType == 'V' || this.state.PaymentType == 'S' ?

                                    <View style={[styles.Payment_Detail_card, { marginTop: 10 }]}>
                                        <View style={{ flexDirection: 'row', width: '100%', padding: 2 }}>
                                            <Text style={{ color: '#7a7a7a', fontSize: 10, width: '77%', fontFamily: 'Montserrat-Bold', }}>
                                                Card Type
                                            </Text>
                                            <Text style={{ fontSize: 10, color: '#999999', justifyContent: 'flex-end', fontFamily: 'Montserrat-Bold' }}>
                                                Expires
                                            </Text>
                                        </View>

                                        <View style={{ borderColor: '#bfbfbf', borderWidth: 1, borderRadius: 5, marginTop: 5 }}>
                                            <View style={[styles.card_detail, { height: 40, backgroundColor: this.state.CardDetailShow == true ? '#eeeeee' : 'white' }]}>
                                                <View style={styles.Card_Image}>
                                                    <Image source={require('../../../../../images/visa_image.png')}
                                                        style={styles.visa_image}
                                                        resizeMode='contain' />
                                                </View>
                                                <View style={styles.Card_No}>
                                                    <Text style={styles.text_no}>  Mastercard </Text>
                                                    <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                    </View>
                                                    <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                    </View>
                                                    <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                    </View>
                                                    <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                    </View>
                                                    <Text style={styles.text_no}> 1234</Text>
                                                </View>
                                                <View style={styles.Date}>
                                                    <Text style={styles.text_date}> 02/2020 </Text>
                                                </View>
                                                <View style={styles.Spinner}>
                                                    <TouchableWithoutFeedback onPress={() => { this.showCardDetails() }}>
                                                        <Image source={this.state.CardDetailShow == true ? require('../../../../../images/Arrow_Up_Icon.png') : require('../../../../../images/Wallet_More_Icon.png')}
                                                            style={styles.spinner_image}
                                                            resizeMode='contain' />
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            </View>

                                            {this.state.CardDetailShow == true ?
                                                <View>
                                                    <View style={styles.More_Card_Detail}>
                                                        <View style={styles.Name_On_Card}>
                                                            <Text style={styles.text_name_on_card}> Name on card</Text>
                                                            <Text style={styles.text_name}>John Doherty</Text>
                                                        </View>
                                                        <View style={styles.Billing_Addresss}>
                                                            <Text style={styles.text_name_on_card}> Billing Address </Text>
                                                            <Text style={[styles.text_name, { fontFamily: 'Montserrat-Bold' }]}>John Doherty </Text>
                                                            <Text style={styles.text_name}>898 Lowland Drive,Lena,illinois 61048,USA</Text>
                                                            <Text style={[styles.text_name, { color: '#68bcbc' }]}>815 369 0042</Text>
                                                            <View style={styles.Main_Button_Container}>
                                                                <View style={styles.Button_Container}>
                                                                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}> Remove </Text>
                                                                </View>
                                                                <View style={styles.Button_Edit_Container}>
                                                                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}> Edit </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View> : null}

                                        </View>






                                    </View>
                                    : null
                                }











                                {/* ------------------------------------------------------Bank  Click Design------------------------------------------------------------ */}






                                {this.state.PaymentType == 'B' ?

                                    <View style={[styles.Payment_Detail_card, { marginTop: 10 }]}>
                                        <View style={{ flexDirection: 'row', width: '100%', padding: 2 }}>
                                            <Text style={{ color: '#7a7a7a', fontSize: 10, width: '77%', fontFamily: 'Montserrat-Bold', }}>
                                                Card Type
                                            </Text>
                                            <Text style={{ fontSize: 10, color: '#999999', justifyContent: 'flex-end', fontFamily: 'Montserrat-Bold' }}>
                                                Expires
                                            </Text>
                                        </View>

                                        <View style={{ width: '100%', height: 'auto', borderRadius: 5, borderWidth: 1, marginTop: 2, borderColor: '#bfbfbf' }}>
                                            <View style={{ height: 40, backgroundColor: this.state.BankDetailShow == true ? '#eeeeee' : 'white', width: '100%', justifyContent: 'center', flexDirection: 'row', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                                                <View style={styles.Card_Image}>
                                                    <Image source={require('../../../../../images/BankOfAmerica_Card.png')}
                                                        style={styles.visa_image}
                                                        resizeMode='contain' />
                                                </View>
                                                <View style={[styles.Card_No, { width: '75%' }]}>
                                                    <Text style={styles.text_no}>  Bank of America </Text>
                                                    <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                    </View>
                                                    <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                    </View>
                                                    <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                    </View>
                                                    <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                    </View>
                                                    <Text style={styles.text_no}> 1234 </Text>
                                                </View>

                                                <View style={styles.Spinner}>
                                                    <TouchableWithoutFeedback onPress={() => { this.showBankDeatils() }}>
                                                        <Image source={this.state.BankDetailShow == true ? require('../../../../../images/Arrow_Up_Icon.png') : require('../../../../../images/Wallet_More_Icon.png')}
                                                            style={styles.spinner_image}
                                                            resizeMode='contain' />
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            </View>

                                            {this.state.BankDetailShow == true ?
                                                <View>
                                                    <View style={{ borderColor: '#999999', width: '100%', height: 'auto', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10, borderRadius: 1 }}>
                                                        <View style={{ width: '48%', height: 'auto', }}>
                                                            <Text style={{ color: '#666666', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>
                                                                Account Name
                                                            </Text>
                                                            <Text style={{ color: '#666666', fontSize: 14, fontFamily: 'Montserrat-Medium' }}>
                                                                John Doherty
                                                            </Text>
                                                        </View>
                                                        <View style={{ width: '48%', height: 'auto', }}>
                                                            <Text style={{ color: '#666666', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>
                                                                Account Number
                                                            </Text>
                                                            <View style={[styles.Card_No, { width: '100%', flexDirection: 'row' }]}>
                                                                <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                                </View>
                                                                <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                                </View>
                                                                <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                                </View>
                                                                <View style={[{ width: hp(0.8), height: hp(0.8), backgroundColor: '#666666', borderRadius: hp(1), marginLeft: 3 }]}>
                                                                </View>
                                                                <Text style={styles.text_no}>
                                                                    1234
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    <View style={{ borderColor: '#999999', width: '100%', height: 'auto', flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10, borderRadius: 1 }}>
                                                        <View style={{ width: '48%', height: 'auto', }}>
                                                            <Text style={{ color: '#666666', fontSize: 12, fontFamily: 'Montserrat-Bold' }}> Account Type</Text>
                                                            <Text style={{ color: '#666666', fontSize: 14, fontFamily: 'Montserrat-Medium' }}>Business Checking </Text>
                                                        </View>
                                                        <View style={{ width: '48%', height: 'auto', }}>
                                                            <Text style={{ color: '#666666', fontSize: 12, fontFamily: 'Montserrat-Bold' }}>Routing Number</Text>
                                                            <Text style={{ color: '#666666', fontSize: 14, fontFamily: 'Montserrat-Medium' }}> 026946783 </Text>

                                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                                <View style={styles.Button_Container}>
                                                                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}>  Remove</Text>
                                                                </View>
                                                                <View style={styles.Button_Edit_Container}>
                                                                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}> Edit </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View> : null}
                                        </View>
                                    </View>
                                    : null
                                }










                                {/* ------------------------------------------------------Share The Love Click Design------------------------------------------------------------ */}


                                {this.state.PaymentType == 'D' ?
                                    <View style={[styles.Payment_Detail_card, { marginTop: 10, marginBottom: 10 }]}>
                                        <View style={styles.row_style}>
                                            <Text style={styles.make_a_donation_text}> Make a donation to this charity</Text>
                                            <TouchableWithoutFeedback onPress={() => { this.showMoreDialog(true) }}>
                                                <Text style={styles.learn_more_text_style}>Learn More </Text>
                                            </TouchableWithoutFeedback>
                                        </View>

                                        <View style={{ width: '98%', height: 70, flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '49%', height: 'auto', justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: '#bfbfbf', borderWidth: 1 }}>
                                                <Image source={require('../../../../../images/American_Red_Cross.png')}
                                                    style={{ width: '90%', height: 70 }}
                                                    resizeMode='contain' />
                                            </View>
                                            <View style={{ width: '49%', height: 'auto', justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: '#bfbfbf', borderWidth: 1, marginLeft: 4 }}>
                                                <Image source={require('../../../../../images/Hustle_Image.png')}
                                                    style={{ width: '90%', height: 70 }}
                                                    resizeMode='contain' />
                                            </View>
                                        </View>

                                    </View>
                                    : null
                                }


                                {/* ------------------------------------------------------Dialog Design------------------------------------------------------------ */}


                                <Dialog
                                    visible={this.state.DialogCharity}
                                    title=""
                                    dialogStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
                                    contentStyle={{ maxHeight: '90%', backgroundColor: 'white' }}
                                    onTouchOutside={() => this.setState({ DialogCharity: false })} >


                                    <View style={styles.DialogMain}>
                                        <TouchableOpacity onPress={() => { this.showMoreDialog(false) }}>
                                            <View style={[styles.CloseView,]}>
                                                <Image source={require('../../../../../images/close.png')} style={{ height: 12, width: 12 }}></Image>
                                            </View>
                                        </TouchableOpacity>


                                        <View style={{ width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '90%', height: 'auto' }}>
                                                <View style={{ width: '100%', height: 70, }}>
                                                    <Image source={require('../../../../../images/American_Red_Cross.png')}
                                                        style={{ width: 170, height: 70 }}
                                                        resizeMode='contain' />
                                                </View>
                                                <View style={{ width: '100%', height: 20, marginTop: 10 }}>
                                                    <Text style={{ color: '#333333', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>
                                                        AMERICAN RED CROSS
                                                    </Text>
                                                </View>
                                                <View style={{ width: '100%', height: 'auto', marginTop: 10 }}>
                                                    <Text style={{ color: '#999999', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>
                                                        Lorem ipsum dolor sit amet Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                    </Text>
                                                </View>
                                                <View style={{ width: '100%', height: 20, marginTop: 10 }}>
                                                    <Text style={{ color: '#0564FF', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>
                                                        WWW.redcross.org
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '100%', marginTop: 10 }}>
                                                <View style={{ width: '100%', height: 2, margin: 2, backgroundColor: '#999999' }}>
                                                </View>
                                            </View>


                                            <View style={{ width: '90%', height: 'auto' }}>
                                                <View style={{ width: '100%', height: 70, }}>
                                                    <Image source={require('../../../../../images/Dialog_Hustle.png')}
                                                        style={{ width: 200, height: 70 }}
                                                        resizeMode='contain' />
                                                </View>
                                                <View style={{ width: '100%', marginTop: 5 }}>
                                                    <Text style={{ color: '#333333', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>
                                                        PRISON REFORM
                                                    </Text>
                                                    <Text style={{ color: '#333333', fontFamily: 'Montserrat-Bold', fontSize: 10 }}>
                                                        hustle 2.0 x/o PVBA
                                                            <Text style={{ color: '#999999', fontFamily: 'Montserrat-Regular', fontSize: 9 }}>
                                                            (Pelican Bay Volunteer Alliance)
                                                            </Text>
                                                    </Text>
                                                </View>
                                                <View style={{ width: '100%', height: 'auto', marginTop: 10 }}>
                                                    <Text style={{ color: '#999999', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>
                                                        Lorem ipsum dolor sit amet Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                                                    </Text>
                                                </View>
                                                <View style={{ width: '100%', height: 20, marginTop: 10 }}>
                                                    <Text style={{ color: '#0564FF', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>
                                                        WWW.hustle20.com
                                                    </Text>
                                                </View>
                                            </View>

                                        </View>


                                    </View>
                                </Dialog>





                                {/* ------------------------------------------------------Enter The Amount Design------------------------------------------------------------ */}



                                <Text style={styles.payment_details}>ENTER AMOUNT</Text>
                                <View style={styles.Enter_Amount_Style}>
                                    <Text style={styles.dollar_text_style}>$</Text>
                                    <Text style={styles.money_text}> 0.00 </Text>
                                </View>


                                <View style={{ width: '100%', height: 35, backgroundColor: '#68bcbc', marginTop: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                    <Text style={styles.send_money_text}> SEND MONEY </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => this.props.navigation!.navigate(AppScreens.G_DashboardView)}
                                    style={styles.cancel_text}>
                                     <View >
                                        <Text style={{ color: '#e2201d', fontSize: 12, fontFamily: 'Montserrat-Regular' }}> Cancel </Text>
                                    
                                    </View>
                                </TouchableOpacity>






                            </View>

                        </View>
                    </ScrollView>
                    {/* Bottom_Navigation */}
                    <View style={styles.Withdraw_Main_Container}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation!.navigate(AppScreens.G_AddMoneyView)}
                            style={styles.Text_Container}>
                            <View style={styles.Text_Container}>
                                <Text style={styles.text_style}> Add Money</Text>
                                <Image source={require('../../../../../images/gray-arrow-right.png')} style={[styles.texticon_style]} resizeMode='contain' />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.line_style}>
                        </View>
                    </View>

                </View>
            </Container>
        );
    }
}

