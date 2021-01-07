import React from "react";
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import UpdateProfileResponse from "../../../../Services/Profile/UpdateProfileResponse";
import Application from "../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { UDDAError } from "../../../../Entities";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import { Dialog } from 'react-native-simple-dialogs';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
const ProfilePageContent = {
  key: 'somethun',
  page_title: 'PROFILE',
  change_photo: 'Change Photo',
  username_placeholder: 'EMAIL ADDRESS',
  firstName_placeholder: 'FIRST NAME',
  lastName_placeholder: 'LAST NAME',
  email_placeholder: 'EMAIL ADDRESS',
  mobile_placeholder: 'MOBILE NUMBER',
  save_changes_button: 'Save Changes',
  settings: {
    shipping_address: 'Shipping Address',
    social_media_accounts: 'Social Media Accounts',
    my_wallet: 'My Wallet',
    my_bets: 'My Bets',
    transaction_history: 'Transaction History',
    terms_of_use: 'Terms of Use',
    privacy_policy: 'Privacy Policy',
    private_bet_messeges: 'Private Bet Messeges'
  },
  log_out_button: 'LOG OUT',
  profile_save_success_message: 'Profile successfully saved',
  page: 1
}

interface G_RedeemHistoryProps extends AppValidationComponentProps {
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
  contentInsetBottom?: any
  firstName?: Field
  lastName?: Field
  email?: Field
  mobile?: Field
  photo?: Field
  imageFilePath?: string
  AddressDialog: any;
  address_line_1: any,
  address_line_2: any,
  city: any,
  state: any,
  zipCode: any,
  country: any,
  RedeemBucks: any,
  dialogVisible: boolean,
  OrderSummaryDialog: boolean,
  SelectedItemDetail: any
  NoData : boolean,
}

enum ProfileScreenComponents {
  FirstNameInput = 1,
  LastNameInput,
  EmailInput,
  MobileInput
}

const bottom_initial = 0;
const arbitrary_move_value = 100;

export class G_RedeemHistory extends AppValidationComponent<G_RedeemHistoryProps, ProflieViewState>
  implements MenuIconListener, ISubheaderListener {

private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  private UserId = Application.sharedApplication().user!.id;
  private UserName = Application.sharedApplication().user!.profile.firstName + " " + Application.sharedApplication().user!.profile.lastName;

  private NoData =false;
  private firstNameFieldName = 'First name'
  private lastNameFieldName = 'Last name'
  private emailFieldName = 'Email'
  private mobileFieldName = 'Mobile'
  private photoFieldName = 'Photo'
  private serviceRequestInProgress = false

  constructor(props: G_RedeemHistoryProps) {
    super(props);
    this.state = {
      firstName: { name: this.firstNameFieldName, value: Application.sharedApplication().user!.profile.firstName },
      lastName: { name: this.lastNameFieldName, value: Application.sharedApplication().user!.profile.lastName! },
      email: { name: this.emailFieldName, value: Application.sharedApplication().user!.profile.email! },
      mobile: { name: this.mobileFieldName, value: Application.sharedApplication().user!.profile.phone! },
      photo: { name: this.photoFieldName, value: Application.sharedApplication().user!.profile.profilePic! },
      imageFilePath: Application.sharedApplication().user!.profile.profilePic!,
      contentInsetBottom: bottom_initial,
      AddressDialog: false,
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      RedeemBucks: '',
      dialogVisible: false,
      OrderSummaryDialog: false,
      SelectedItemDetail: ''
    }
  }
  componentDidMount() {
    this.callMethod();
    
  }

 callMethod() {
    this.setState({ loader: true }); 
    fetch(UrlService.CONSTURI +'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_redeem_product_history', {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loader: false }); 
        console.log('Udda Reedem Products Data ' + JSON.stringify(responseJson));
        if (responseJson.data != []) {
          this.setState({ RedeemBucks: responseJson.data.redeem_product_history_array });
          this.setState({ NoData: false });
        }
        else {
          this.setState({ NoData: true });
          this.setState({ RedeemBucks: [] });

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


  openPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
  }

  coveredPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
  }

  availableBalanceTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_InvitationToJoin, this.props)
  }

  logoutButtonPressed() {
    Application.sharedApplication().logout()
    RouterBuilder.resetRouteTo(AppScreens.OnboardingStack, this.props)
  }





  OrderSummaryDialog(isShow: any, item: any) {
    this.setState({ SelectedItemDetail: item })
    this.setState({ OrderSummaryDialog: isShow });
  }




  render() {
    return (
      <Container title={ProfilePageContent.page_title}
        isHeader={true}
        isSubHeader={true}
        isTitle={false}
        showIndicator={this.serviceRequestInProgress}
        menuIconListener={this}
        LogoIconListener={this}
        accountNameListener={this}
        availableBalanceListener={this}
        openPlaysListener={this}
        coveredPlaysListener={this}
        isSetting={false}>

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.scrollContent}
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 0, bottom: this.state.contentInsetBottom }}
          scrollEnabled={true}
          bounces={false}>


          {/* ------------------------------------------------------Dialog Design------------------------------------------------------------ */}


          <Dialog
            visible={this.state.OrderSummaryDialog}
            title=""
            dialogStyle={{ maxHeight: '90%' }}
            contentStyle={{ maxHeight: '90%' }}
            onTouchOutside={() => this.setState({ OrderSummaryDialog: false })} >

            <View style={styles.Dialog_Container}>
              <View style={{ width: '90%', }}>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '85%', }}>
                    <Text style={styles.Order_Summary_Text}>ORDER SUMMARY</Text>
                  </View>
                  <View style={{ width: '15%', }}>
                    <Text style={styles.Item_Text}>1 Item</Text>
                  </View>
                </View>

                <View style={styles.Detail_Container}>
                  <View style={{ width: '25%', margin: 5, borderColor: '#dddddd', borderWidth: 1 }}>
                    <Image
                      resizeMode="contain"
                      style={{ width: "100%", height: 80 }}
                      source={this.state.SelectedItemDetail.Image}></Image>
                  </View>
                  <View style={{ width: '75%', justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ color: '#666666', fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>
                      {this.state.SelectedItemDetail.Product_Name}
                    </Text>
                    <Text style={{ color: '#999999', fontSize: 12, fontFamily: 'Montserrat-Medium' }}>
                      {this.state.SelectedItemDetail.Product_Code}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
                      <Image
                        resizeMode="contain"
                        style={{ height: hp(1.3), width: hp(1.5) }}
                        source={require('../../../../images/BucksGreenColor.png')}></Image>
                      <Text style={{ color: '#68bcbc', fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginLeft: 2 }}>
                        {this.state.SelectedItemDetail.Product_Price}
                      </Text>
                    </View>
                  </View>
                </View>


                <View style={{ marginTop: 20 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: '85%' }}>
                      <Text style={styles.Shipping_Address_Text}>SHIPPING ADDRESS</Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 10, borderColor: '#cccccc', borderWidth: 1 }}>
                    <View style={{ padding: 10 }}>
                      <Text style={styles.Address_Name_Text}>John Doherty</Text>
                      <Text style={styles.Address_Text}>4352 Tyler Avenue Miami.Florida 33128</Text>
                    </View>
                  </View>
                </View>
                <View style={{ paddingTop: 0, backgroundColor: '#bde0e0', marginTop: 20 }}>
                  <View style={{ padding: 8 }}>
                    <Text style={styles.Order_Review}>ORDER REVIEW</Text>
                    <View style={{ flexDirection: 'row', padding: 8 }}>
                      <View style={{ width: '50%', }}>
                        <Text >Subtotal</Text>
                      </View>
                      <View style={{ width: '50%', }}>
                        <Text style={{ textAlign: 'right' }}>  {this.state.SelectedItemDetail.Product_Price}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 8, paddingTop: 0 }}>
                      <View style={{ width: '50%', }}>
                        <Text>Free Shipping</Text>
                      </View>
                      <View style={{ width: '50%', }}>
                        <Text style={{ textAlign: 'right' }}>0</Text>
                      </View>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#999999' }}>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 8 }}>
                      <View style={{ width: '50%', }}>
                        <Text style={{ fontFamily: 'MOntserrat-SemiBold', fontSize: 14, color: 'black' }}>Total</Text>
                      </View>
                      <View style={{ width: '50%', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          resizeMode="contain"
                          style={{ height: hp(1.3), width: hp(1.5) }}
                          source={require('../../../../images/bucks.png')}></Image>
                        <Text style={{ color: 'black', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>  {this.state.SelectedItemDetail.Product_Price}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{ width: '100%', height: 50, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <View style={{ width: '100%', height: 50, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 16 }}>CHECK OUT</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Dialog>





          <View style={styles.mainContent}>
            <View style={styles.White_Container}>
              <Text style={{ color: '#68bcbc', fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>
                REDEEM HISTORY
              </Text>
            </View>
            {this.state.NoData == true ?
                
                <View style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#000', fontSize: hp(2.5), paddingVertical: 5, justifyContent: 'center', fontFamily: 'Montserrat-Bold' }}>
                    No Record Found
                    </Text>
                    
                 
                </View>
                : null}
            <FlatList
              data={this.state.RedeemBucks}
              extraData={this.state}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={({ item, index }: any) => {
                var subindex = index;
                return (
                  <View style={{ width: '100%', alignItems: 'center', marginTop: 10, padding: 5 }}>
                    
                    
                    <View
                      style={{
                        width: '95%', backgroundColor: 'white', flexDirection: 'row',
                      }}>
                      <View style={{ width: '25%', padding: 5, }}>
                        <View style={{ borderColor: '#dddddd', borderWidth: 1 }}>
                       <Image
                              resizeMode="contain"
                              style={{ width: "100%", height: 80 }}
                              source={{ uri: item.product_image }}></Image>
                        </View>
                      </View>
                      <View style={{ width: '70%', justifyContent: 'center', marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                          <View style={{ width: '70%' }}>
                            <Text style={{ color: '#666666', fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>{item.product_name}</Text>
                          </View>
                          <View style={{ justifyContent: 'space-between', width: '30%' }}>
                            <Text style={{ color: '#999999', fontSize: 10, fontFamily: 'Montserrat-Medium', textAlign: 'right' }}>{item.redeem_date}</Text>
                          </View>
                        </View>
                        <Text style={{ color: '#999999', fontSize: 12, fontFamily: 'Montserrat-Medium' }}>{item.product_code}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                          <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center', width: '60%' }}>
                            <Image
                              resizeMode="contain"
                              style={{ height: hp(1.3), width: hp(1.5) }}
                              source={require('../../../../images/BucksGreenColor.png')}></Image>
                            <Text style={{ color: '#68bcbc', fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginLeft: 2 }}>{item.product_value}</Text>
                          </View>
                          <View style={{ justifyContent: 'space-between', width: '40%' }}>
                            <Text style={{ color: '#68bcbc', fontSize: 14, fontFamily: 'Montserrat-Bold', textAlign: 'right' }}>{item.Product_Typed}</Text>
                          </View>
                        </View>
                      </View>

                    </View>
              </View>
                )
              }} />
          </View>
        </KeyboardAwareScrollView>

      </Container>
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

export default connect(mapStateToProps)(G_RedeemHistory);