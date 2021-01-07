import React from "react";
import { View, Text, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity, TextInput, BackHandler, Alert } from "react-native";
import styles from './styles';
import Container from '../../../../../Components/Container';
import AppScreens from "../../../../../Util/AppScreens";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../../Util/AppValidationComponent";
import { MenuIconListener } from "../../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../../Components/Icons/LogoIcon/LogoIcon";
import { ISubheaderListener } from "../../../../../Components/CustomComponents/SubHeader/SubHeader";
import RouterBuilder from "../../../../../Router";


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'ADD MONEY',
}

interface ProfileViewProps extends AppValidationComponentProps { }

interface ProflieViewState extends AppValidationComponentState {

    PaymentType: any
    CardDetailShow: any
    BankDetailShow: any
    NameOnCard: any
    date: any
    AddNewCardstate: any
    AddNewBankstate: any
}




export default class G_AddMoneyView extends AppValidationComponent<ProfileViewProps, ProflieViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private playtableData: any
    constructor(props: ProfileViewProps) {
        super(props);
        this.state = {
            PaymentType: 'B',
            CardDetailShow: false,
            BankDetailShow: false,
            AddNewCardstate: false,
            AddNewBankstate: false,
            NameOnCard: '',
            date: 'Jan',
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

  

    // ------------------------------------------------- Api caliing ---------------------------------------------------------




    // -------------------------------------------------  Methods ---------------------------------------------------------

    GotoPlay(PaymentType: any) {
        this.setState({ PaymentType: PaymentType });
    }

    accountNameTapped() {
        this.props.navigation!.navigate(AppScreens.G_ProfileView);
    }

    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {
      //  RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
	  RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
    }

    availableBalanceTapped() {
    }

    openPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }

    selectPaymentType(p_Type: any) {
        this.setState({ PaymentType: p_Type });
        this.setState({ CardDetailShow: false });
        this.setState({ BankDetailShow: false });
        this.setState({ AddNewCardstate: false });
        this.setState({ AddNewBankstate: false });

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







    // ------------------------------------------------- Design and Design Methods ---------------------------------------------------------

    addnewCard() {
        return (
            <View style={styles.Add_Details_Container}>
                <View style={styles.Second_Container}>
                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                Name on card
            </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto' }}>
                            <TextInput
                                value={this.state.NameOnCard}
                                clearTextOnFocus={true}
                                keyboardType='numeric'
                                returnKeyType='done'
                                style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '100%', height: 35, backgroundColor: 'white', borderRadius: 5 }}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                Card number
            </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto' }}>
                            <TextInput
                                value={this.state.NameOnCard}
                                clearTextOnFocus={true}
                                keyboardType='numeric'
                                returnKeyType='done'
                                style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '100%', height: 35, backgroundColor: 'white', borderRadius: 5 }}
                                editable={true}
                            />
                        </View>
                    </View>


                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                Expiration date
            </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto', flexDirection: 'row' }}>
                            <View style={{ width: '38%', height: 35, backgroundColor: 'white', borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                              
                                <View style={{ width: '60%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#3A3A3A', fontSize: 14, fontFamily: 'Montserrat-Bold', }}>
                                        Jan
                        </Text>
                                </View>
                                <View style={{ width: '40%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../../../../images/Wallet_More_Icon.png')}
                                        style={styles.spinner_image}
                                        resizeMode='contain' />
                                </View>

                            </View>
                            <View style={{ width: '58%', height: 35, backgroundColor: 'white', borderRadius: 5, marginLeft: 6, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <View style={{ width: '60%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#3A3A3A', fontSize: 14, fontFamily: 'Montserrat-Bold', }}>
                                        2019
                        </Text>
                                </View>
                                <View style={{ width: '40%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../../../../images/Wallet_More_Icon.png')}
                                        style={styles.spinner_image}
                                        resizeMode='contain' />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                cvv
                    <Text style={{ color: '#0564FF', textDecorationColor: '#0564FF', textDecorationLine: 'underline', fontSize: 7, marginLeft: 4, fontFamily: 'Montserrat-Medium' }}>
                                    What's this?
            </Text>
                            </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto' }}>
                            <TextInput
                                value={this.state.NameOnCard}
                                clearTextOnFocus={true}
                                keyboardType='numeric'
                                returnKeyType='done'
                                style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '100%', height: 35, backgroundColor: 'white', borderRadius: 5 }}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 'auto', marginTop: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <View style={{ width: '60%', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#68bcbc', borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Montserrat-Bold' }}> ADD CARD </Text>
                        </View>
                        <View style={{ width: '60%', height: 35, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#68bcbc', fontSize: 12, fontFamily: 'Montserrat-Regular', textDecorationLine: 'underline', textDecorationColor: '#68bcbc' }}>  Cancel </Text>
                        </View>
                    </View>


                    <View style={styles.Card_View}>
                        <View style={{ width: '80%', height: 'auto', flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
                            <Image source={require('../../../../../images/Amex_Card.png')}
                                style={styles.Card_Image_Style}
                                resizeMode='contain' />
                            <Image source={require('../../../../../images/Discover_Card.png')}
                                style={[styles.Card_Image_Style, {}]}
                                resizeMode='contain' />
                            <Image source={require('../../../../../images/Visa_Card.png')}
                                style={[styles.Card_Image_Style, {}]}
                                resizeMode='contain' />
                        </View>
                        <View style={{ width: '80%', height: 'auto', flexDirection: 'row', justifyContent: 'center', marginTop: 2 }}>
                            <Image source={require('../../../../../images/Master_Card.png')}
                                style={styles.Card_Image_Style}
                                resizeMode='contain' />
                            <Image source={require('../../../../../images/Echeck_Card.png')}
                                style={[styles.Card_Image_Style, {}]}
                                resizeMode='contain' />
                        </View>
                    </View>
                </View>
            </View>


        )
    }

    addnewBankAccount() {
        return (
            <View style={styles.Add_Details_Container}>
                <View style={styles.Second_Container}>
                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                Account Name
                </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto' }}>
                            <TextInput
                                value={this.state.NameOnCard}
                                clearTextOnFocus={true}
                                keyboardType='numeric'
                                returnKeyType='done'
                                style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '100%', height: 35, backgroundColor: 'white', borderRadius: 5 }}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                Account Number
                </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto' }}>
                            <TextInput
                                value={this.state.NameOnCard}
                                clearTextOnFocus={true}
                                keyboardType='numeric'
                                returnKeyType='done'
                                style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '100%', height: 35, backgroundColor: 'white', borderRadius: 5 }}
                                editable={true}
                            />
                        </View>
                    </View>


                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                Confirm Account Number
                </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto' }}>
                            <TextInput
                                value={this.state.NameOnCard}
                                clearTextOnFocus={true}
                                keyboardType='numeric'
                                returnKeyType='done'
                                style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '100%', height: 35, backgroundColor: 'white', borderRadius: 5 }}
                                editable={true}
                            />
                        </View>
                    </View>


                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                Account Type
                </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto', flexDirection: 'row', backgroundColor: 'white', borderRadius: 5 }}>
                            <View style={{ width: '80%', height: 'auto', justifyContent: 'center' }}>
                                <Text style={{ color: '#3A3A3A', fontSize: 14, fontFamily: 'Montserrat-Bold', marginLeft: 8 }}>
                                    Savings
                            </Text>
                            </View>
                            <View style={{ width: '20%', height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../../../../../images/Wallet_More_Icon.png')}
                                    style={styles.spinner_image}
                                    resizeMode='contain' />
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                Routing Number
                </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto' }}>
                            <TextInput
                                value={this.state.NameOnCard}
                                clearTextOnFocus={true}
                                keyboardType='numeric'
                                returnKeyType='done'
                                style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '100%', height: 35, backgroundColor: 'white', borderRadius: 5 }}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: '40%', height: 'auto', justifyContent: 'center' }}>
                            <Text style={{ color: '#3A3A3A', fontFamily: 'Montserrat-SemiBold', fontSize: 12 }}>
                                Check Number
                </Text>
                        </View>
                        <View style={{ width: '60%', height: 'auto' }}>
                            <TextInput
                                value={this.state.NameOnCard}
                                clearTextOnFocus={true}
                                keyboardType='numeric'
                                returnKeyType='done'
                                style={{ padding: 8, fontFamily: 'Montserrat-Bold', fontSize: hp(1.4), width: '100%', height: 35, backgroundColor: 'white', borderRadius: 5 }}
                                editable={true}
                            />
                        </View>
                    </View>



                    <View style={{ width: '100%', height: 'auto', marginTop: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <View style={{ width: '60%', height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#68bcbc', borderRadius: 5 }}>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Montserrat-Bold' }}>
                                NEXT
                   </Text>
                        </View>
                        <View style={{ width: '60%', height: 35, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#68bcbc', fontSize: 12, fontFamily: 'Montserrat-Regular', textDecorationLine: 'underline', textDecorationColor: '#68bcbc' }}>
                                Cancel
                   </Text>
                        </View>
                    </View>

                </View>
            </View>


        )
    }


// ------------------------------------------------------Designs------------------------------------------------------------------------------------


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

                                <Text style={styles.payment_type}>PAYMENT TYPE</Text>

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
                                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Regular' }}>Direct Bank Transfer</Text>
                                                <Text style={{ fontSize: 8, color: '#7a7a7a', fontFamily: 'Montserrat-Regular', }}>AUTOMATED CLEARNING HOUSE</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                </View>





                                {/* --------------------------------------------------- Venmo Click Open This Design--------------------------------------------------------------- */}


                                {this.state.PaymentType == 'V' && this.state.AddNewCardstate == false ?
                                    <View>
                                        <Text style={styles.payment_details}>PAYMENT METHOD</Text>
                                        <View style={[styles.Payment_Detail_card,]}>


                                            <View style={{ flexDirection: 'row', width: '100%', padding: 2 }}>
                                                <Text style={{ color: '#7a7a7a', fontSize: 10, width: '77%', fontFamily: 'Montserrat-Bold', }}>
                                                    Card Type
</Text>
                                                <Text style={{ fontSize: 10, color: '#999999', justifyContent: 'flex-end', fontFamily: 'Montserrat-Bold' }}>
                                                    Expires
</Text>
                                            </View>

                                            <View style={{ borderColor: '#bfbfbf', borderWidth: 1, borderRadius: 5 }}>
                                                <View style={[styles.card_detail, { height: 40, backgroundColor: this.state.CardDetailShow == true ? '#eeeeee' : 'white' }]}>
                                                    <View style={styles.Card_Image}>
                                                        <Image source={require('../../../../../images/visa_image.png')}
                                                            style={styles.visa_image}
                                                            resizeMode='contain' />
                                                    </View>
                                                    <View style={styles.Card_No}>
                                                        <Text style={styles.text_no}> Visa </Text>
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
                                            <View style={styles.Main_Add_New_Container}>
                                                <TouchableWithoutFeedback onPress={() => { this.setState({ AddNewCardstate: !this.state.AddNewCardstate }) }}>
                                                    <View style={styles.add_new_container}>
                                                        <Text style={styles.text_add}>Add New Payment Method</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>

                                        </View>

                                    </View>

                                    : null
                                }





                                {/* ---------------------------------------------------Bank Click Open This Design--------------------------------------------------------------- */}



                                {this.state.PaymentType == 'B' && this.state.AddNewBankstate == false ?
                                    <View>
                                        <Text style={styles.payment_details}>PAYMENT METHOD</Text>
                                        <View style={[styles.Payment_Detail_card,]}>
                                            <View style={{ width: '100%', padding: 2 }}>
                                                <Text style={{ color: '#7a7a7a', fontSize: 10, width: '77%', fontFamily: 'Montserrat-Bold', }}>
                                                    Bank
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



                                            <View style={styles.Main_Add_New_Container}>
                                                <TouchableWithoutFeedback onPress={() => { this.setState({ AddNewBankstate: !this.state.AddNewBankstate }) }}>
                                                    <View style={styles.add_new_container}>
                                                        <Text style={styles.text_add}> Add New Payment Method</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>



                                        </View>
                                    </View>
                                    : null
                                }




                                {/* --------------------------------------------------- Square Click Open This Design--------------------------------------------------------------- */}


                                {this.state.PaymentType == 'S' && this.state.AddNewCardstate == false ?
                                    <View>
                                        <Text style={styles.payment_details}>PAYMENT METHOD</Text>
                                        <View style={[styles.Payment_Detail_card,]}>
                                            <View style={{ flexDirection: 'row', width: '100%', padding: 2 }}>
                                                <Text style={{ color: '#7a7a7a', fontSize: 10, width: '77%', fontFamily: 'Montserrat-Bold', }}>
                                                    Card Type
                                                 </Text>
                                                <Text style={{ fontSize: 10, color: '#999999', justifyContent: 'flex-end', fontFamily: 'Montserrat-Bold' }}>
                                                    Expires
                                                  </Text>
                                            </View>

                                            <View style={{ borderColor: '#bfbfbf', borderWidth: 1, borderRadius: 5 }}>
                                                <View style={[styles.card_detail, { height: 40, backgroundColor: this.state.CardDetailShow == true ? '#eeeeee' : 'white' }]}>
                                                    <View style={styles.Card_Image}>
                                                        <Image source={require('../../../../../images/visa_image.png')}
                                                            style={styles.visa_image}
                                                            resizeMode='contain' />
                                                    </View>
                                                    <View style={styles.Card_No}>
                                                        <Text style={styles.text_no}> Visa </Text>
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
                                                                        <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}>
                                                                            Remove
                                                    </Text>
                                                                    </View>
                                                                    <View style={styles.Button_Edit_Container}>
                                                                        <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}>
                                                                            Edit
                                                    </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>

                                                    </View> : null}

                                            </View>
                                            <View style={styles.Main_Add_New_Container}>
                                                <TouchableWithoutFeedback onPress={() => { this.setState({ AddNewCardstate: !this.state.AddNewCardstate }) }}>
                                                    <View style={styles.add_new_container}>
                                                        <Text style={styles.text_add}>Add New Payment Method</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>

                                        </View>
                                    </View>
                                    : null
                                }

                                {/* --------------------------------------------------- Add card or Bank --------------------------------------------------------------- */}

                                {this.state.AddNewCardstate == true ? this.addnewCard() : null}

                                {this.state.AddNewBankstate == true ? this.addnewBankAccount() : null}


                                {/* ---------------------------------------------------Enter Amount Design--------------------------------------------------------------- */}



                                <Text style={styles.payment_details}>ENTER AMOUNT</Text>
                                <View style={styles.Enter_Amount_Style}>
                                    <Text style={{ color: '#686868', fontSize: 20, fontFamily: 'Montserrat-Bold' }}>
                                        $
                                </Text>
                                    <Text style={{ color: '#686868', fontSize: 20, fontFamily: 'Montserrat-Bold', marginLeft: 4 }}>
                                        0.00
                                </Text>
                                </View>


                                <View style={{ width: '100%', height: 35, backgroundColor: '#68bcbc', marginTop: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                    <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}>
                                        DEPOSIT NOW
                              </Text>
                                </View>

                                <View style={{ width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation!.navigate(AppScreens.G_DashboardView)}>
                                        <Text style={{ color: '#e2201d', fontSize: 12, fontFamily: 'Montserrat-Regular' }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                  
                                </View>




                            </View>

                        </View>
                    </ScrollView>


                    {/* Bottom_Navigation */}

                    <View style={styles.Withdraw_Main_Container}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation!.navigate(AppScreens.G_WithdrawMoneyView)}
                            style={styles.Text_Container}>
                            <View style={styles.Text_Container}>
                                <Text style={styles.text_style}> Withdraw</Text>
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
