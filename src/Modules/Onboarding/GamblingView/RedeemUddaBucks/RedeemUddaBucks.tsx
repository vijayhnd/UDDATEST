import React from "react";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import UpdateProfileResponse from "../../../../Services/Profile/UpdateProfileResponse";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import AlertUtil from "../../../../Util/AlertUtil";
import Application from "../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ProgressLoader from 'rn-progress-loader';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { UDDAError } from "../../../../Entities";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import { Dialog } from 'react-native-simple-dialogs';
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
import BigButton from '../../../../Components/Button/BigButton';
import Messgae from "../../../../Services/Core/Messages"
import Message from "../../../../Services/Core/Messages";
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";

interface G_RedeemUddaBucksProps extends AppValidationComponentProps {
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
  RedeemBucks: any,
  dialogVisible: boolean,
  OrderSummaryDialog: boolean,
  SelectedItemDetail: any;
  loader: any;
  address_line_1: any,
  address_line_2: any,
  city: any,
  state: any,
  zipCode: any,
  country: any,
  guestUserDialog: boolean;
}

enum ProfileScreenComponents {
  FirstNameInput = 1,
  LastNameInput,
  EmailInput,
  MobileInput
}

const bottom_initial = 0;

export class G_RedeemUddaBucks extends AppValidationComponent<G_RedeemUddaBucksProps, ProflieViewState>
  implements MenuIconListener, ISubheaderListener {
  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  private UserId = Application.sharedApplication().user!.id;
  private UserName = Application.sharedApplication().user!.profile.firstName + " " + Application.sharedApplication().user!.profile.lastName;

  private serviceRequestInProgress = false

  constructor(props: G_RedeemUddaBucksProps) {
    super(props);
    this.state = {
      contentInsetBottom: bottom_initial,
      RedeemBucks: '',
      dialogVisible: false,
      OrderSummaryDialog: false,
      SelectedItemDetail: '',
      loader: false,
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      guestUserDialog: false,
    }
  }


  componentDidMount() {
    this.callMethod();
    this.getShippingAddress();
  }
  // -------------------------------------------------- API Calling ------------------------------------------------------
  callMethod() {
    this.setState({ loader: true });
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/get_products', {
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
          this.setState({ RedeemBucks: responseJson.data.product_array });
        }
        else {
          this.setState({ RedeemBucks: [] });

        }
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          LogoutUtill.logoutButtonPressed(this.props);
        }
      })
      .catch(error => {
        this.setState({ loader: false });
        console.log(error);
      })
  }

  getShippingAddress() {
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/get_shipping_address/' + this.UserId, {
      method: 'GET',
      headers: {
        'authorisation': this.authorisationToken
      },

    }).then((response) => response.json())
      .then((responseJson) => {

        console.log('Success get_shipping_address' + JSON.stringify(responseJson.data));

        if (responseJson.data.length != 0) {
          this.setState({ address_line_1: responseJson.data.shipping_address.address_line1 });
          this.setState({ address_line_2: responseJson.data.shipping_address.address_line2 });
          this.setState({ city: responseJson.data.shipping_address.city });
          this.setState({ state: responseJson.data.shipping_address.state });
          this.setState({ zipCode: responseJson.data.shipping_address.zipcode });
          this.setState({ country: responseJson.data.shipping_address.country });

        }
        else {
          this.setState({ address_line_1: '' });
          this.setState({ address_line_2: '' });
          this.setState({ city: '' });
          this.setState({ state: '' });
          this.setState({ zipCode: '' });
          this.setState({ country: '' });
        }

      })
      .catch(error => {
        console.log(error);
      })
  }

  callReedemRequestAPI(item: any) {
    var params: any = {
      'product_id': item.product_id,
    };

    var formData = new FormData();

    for (var k in params) {
      formData.append(k, params[k]);
    }
    console.log('redeem_product input' + JSON.stringify(params));

    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/apiGaming/redeem_product', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
      body: formData,

    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('redeem_product Data ' + JSON.stringify(responseJson));
        if (responseJson.message == "success") {
          this.getProfile();
          AlertUtil.show("You have redeemed the product successfully.");
        }
        else {
          AlertUtil.show(JSON.stringify(responseJson.message));
        }
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          LogoutUtill.logoutButtonPressed(this.props);
        }

      })
      .catch(error => {
        console.log(error);
      })


  }



  private getProfile() {
    var profileRequest = new GetProfileRequest()
    var serviceAction = new ServiceAction()
    var responseParser = new GetProfileResponseParser()
    this.props.dispatch!(serviceAction.request(ServiceType.User,
      ServiceKeys.GetProfileServiceName,
      profileRequest,
      [this.constructor.name],
      responseParser))
  }


  componentWillReceiveProps(nextProps: G_RedeemUddaBucksProps) {
    if (nextProps.listeners!.includes(this.constructor.name)) {
      if (nextProps.serviceKey === ServiceKeys.GetProfileServiceName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.FinishedWithError:
            this.serviceRequestInProgress = false
            var errorMessage = nextProps.error!.message
            AlertUtil.show(errorMessage)
            var serviceAction = new ServiceAction()
            nextProps.dispatch!(serviceAction.reset())
            break
          case ServiceRequestStatus.Started:
          case ServiceRequestStatus.InProgress:
            this.serviceRequestInProgress = true
            break
        }

      }
    }
  }


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

  availableBalanceTapped() {
  }

  openPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props);

  }

  coveredPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props);

  }

  logoutButtonPressed() {
    Application.sharedApplication().logout()
    RouterBuilder.resetRouteTo(AppScreens.OnboardingStack, this.props)
  }
  
  loginButtonPressed() {
    this.setState({ guestUserDialog: false });
    // this.props.navigation!.navigate(AppScreens.G_LocationConfirmation);
    // this.props.navigation!.navigate(AppScreens.G_LoginPage,this.props);
    RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
  }
  closeModal() {
    this.setState({ guestUserDialog: !this.state.guestUserDialog });
  }




  OrderSummaryDialog(isShow: any, item: any) {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
    }
    else {
      this.setState({ SelectedItemDetail: item })
      this.setState({ OrderSummaryDialog: isShow });
    }
  }

  checkout(item: any, isShow: any) {
    this.setState({ SelectedItemDetail: item })
    this.setState({ OrderSummaryDialog: false });
    this.callReedemRequestAPI(this.state.SelectedItemDetail);
  }

  gotoShippingaddress() {
    this.setState({ OrderSummaryDialog: false });
    this.props.navigation!.navigate(AppScreens.G_ProfileView);
  }

  SeletProduct(item: any, index: any) {

    for (let i = 0; i < this.state.RedeemBucks.length; i++) {
      if (i == index) {
        this.state.RedeemBucks[i].IsProductIsSelected = !this.state.RedeemBucks[i].IsProductIsSelected
      }
      else {
        this.state.RedeemBucks[i].IsProductIsSelected = false

      }
    }
    this.setState({ RedeemBucks: this.state.RedeemBucks })
  }

  render() {
    return (
      <Container title={'reedem udda bucks'}
        isHeader={true}
        isSubHeader={true}
        isTitle={false}
        showIndicator={this.serviceRequestInProgress}
        menuIconListener={this}
        LogoIconListener={this}
        availableBalanceListener={this}
        openPlaysListener={this}
        coveredPlaysListener={this}
        accountNameListener={this}
        isSetting={false}
      >
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.scrollContent}
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 0, bottom: this.state.contentInsetBottom }}
          scrollEnabled={true}
          bounces={false}>

          <ProgressLoader
            visible={this.state.loader}
            isModal={true} isHUD={true}
            hudColor={"#68bcbc"}
            color={"#FFFFFF"} />

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
                      source={{ uri: this.state.SelectedItemDetail.product_image }}></Image>
                  </View>
                  <View style={{ width: '75%', justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ color: '#666666', fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>
                      {this.state.SelectedItemDetail.product_name}
                    </Text>
                    <Text style={{ color: '#999999', fontSize: 12, fontFamily: 'Montserrat-Medium' }}>
                      {this.state.SelectedItemDetail.product_code}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
                      <Image
                        resizeMode="contain"
                        style={{ height: hp(1.3), width: hp(1.5) }}
                        source={require('../../../../images/BucksGreenColor.png')}></Image>
                      <Text style={{ color: '#68bcbc', fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginLeft: 2 }}>
                        {this.state.SelectedItemDetail.product_value}
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
                      <Text style={styles.Address_Name_Text}>{this.UserName}</Text>
                      {this.state.address_line_1 == '' || this.state.address_line_1 == null ?
                        <TouchableOpacity onPress={() => { this.gotoShippingaddress() }}>
                          <Text style={[styles.Address_Text, { marginVertical: 8, color: '#68bcbc' }]}>Add Shipping Address</Text>

                        </TouchableOpacity>
                        :
                        <Text style={styles.Address_Text}>{this.state.address_line_1}, {this.state.address_line_2}, {this.state.city}, {this.state.state}, {this.state.zipCode} {this.state.country}.</Text>
                      }
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
                        <Text style={{ textAlign: 'right' }}>  {this.state.SelectedItemDetail.product_value}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 8, paddingTop: 0 }}>
                      <View style={{ width: '50%', }}>
                        <Text>{this.state.SelectedItemDetail.shipping == "0" ? 'Free Shipping' : 'Shipping Charge'}</Text>
                      </View>
                      <View style={{ width: '50%', }}>
                        <Text style={{ textAlign: 'right' }}>{this.state.SelectedItemDetail.shipping}</Text>
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
                        <Text style={{ color: 'black', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>  {this.state.SelectedItemDetail.product_value}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{ width: '100%', height: 50, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { this.checkout(this.state.SelectedItemDetail, true) }}
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
                REDEEM UDDA BUCKS
              </Text>
            </View>
            <FlatList
              data={this.state.RedeemBucks}
              extraData={this.state}
              keyExtractor={(item: any, index: any) => index.toString()}
              renderItem={({ item, index }: any) => {
                var subindex = index;
                return (
                  <View style={{ width: '100%', alignItems: 'center', marginTop: 10, padding: 5 }}>
                    <TouchableOpacity
                      onPress={() => { this.SeletProduct(item, index) }}
                    >
                      <View
                        style={{ width: '95%', backgroundColor: 'white', flexDirection: 'row', borderColor: item.IsProductIsSelected == true ? '#bde0e0' : 'white', borderWidth: item.IsProductIsSelected == true ? 6 : 0 }}>
                        <View style={{ width: '25%', padding: 5, }}>
                          <View style={{ borderColor: '#dddddd', borderWidth: 1 }}>
                            <Image
                              resizeMode="contain"
                              style={{ width: "100%", height: 80 }}
                              source={{ uri: item.product_image }}></Image>
                          </View>
                        </View>
                        <View style={{ width: '75%', justifyContent: 'center', marginLeft: 10 }}>
                          <Text style={{ color: '#666666', fontSize: 16, fontFamily: 'Montserrat-SemiBold' }}>{item.product_name}</Text>
                          <Text style={{ color: '#999999', fontSize: 12, fontFamily: 'Montserrat-Medium' }}>{item.product_code}</Text>
                          <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
                            <Image
                              resizeMode="contain"
                              style={{ height: hp(1.3), width: hp(1.5) }}
                              source={require('../../../../images/BucksGreenColor.png')}></Image>
                            <Text style={{ color: '#68bcbc', fontFamily: 'Montserrat-SemiBold', fontSize: 14, marginLeft: 2 }}>{item.product_value}</Text>
                          </View>
                        </View>
                      </View>

                    </TouchableOpacity>


                    {item.IsProductIsSelected == true ?
                      <View style={{ width: '96%', height: 'auto', padding: 4, paddingTop: 0 }}>
                        <View style={{ paddingTop: 0, backgroundColor: '#bde0e0', }}>
                          <View style={{ padding: 8 }}>
                            <Text style={{ color: 'black', fontFamily: 'Montserrat-SemiBold', fontSize: 16, padding: 8 }}>
                              ORDER SUMMARY
                            </Text>

                            <View style={{ flexDirection: 'row', padding: 8 }}>
                              <View style={{ width: '50%', }}>
                                <Text>Subtotal</Text>
                              </View>
                              <View style={{ width: '50%', }}>
                                <Text style={{ textAlign: 'right' }}>{item.product_value}</Text>
                              </View>
                            </View>

                            <View style={{ flexDirection: 'row', padding: 8, paddingTop: 0 }}>
                              <View style={{ width: '50%', }}>
                                <Text>{item.shipping == "0" ? 'Free Shipping' : 'Shipping Charge'} </Text>
                              </View>
                              <View style={{ width: '50%', }}>
                                <Text style={{ textAlign: 'right' }}>{item.shipping}</Text>
                              </View>
                            </View>


                            <View style={{ width: '100%', height: 1, backgroundColor: '#999999' }}>
                            </View>


                            <View style={{ flexDirection: 'row', padding: 8 }}>
                              <View style={{ width: '50%', }}>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 14, color: 'black' }}>Total</Text>
                              </View>
                              <View style={{ width: '50%', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                  resizeMode="contain"
                                  style={{ height: hp(1.3), width: hp(1.5) }}
                                  source={require('../../../../images/bucks.png')}></Image>
                                <Text style={{ color: 'black', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>{item.product_value}</Text>
                              </View>
                            </View>


                          </View>

                          <TouchableOpacity
                            style={{ width: '100%', height: 50, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => { this.OrderSummaryDialog(true, item) }}>
                            <View style={{ width: '100%', height: 50, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>
                                REDEEM NOW
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>

                      </View>
                      : null}
                  </View>
                )
              }} />
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
          {this.state.guestUserDialog?<Guestdialog detailmodel={this.state.guestUserDialog} onDismiss={() => {
                  this.closeModal();
                }} onClick={() => {
                    this.loginButtonPressed();
                  }}/>:null}
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

export default connect(mapStateToProps)(G_RedeemUddaBucks);