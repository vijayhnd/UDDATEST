import React, { Component } from "react";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, Platform, TouchableWithoutFeedback, Image, FlatList } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import AlertUtil from "../../../../Util/AlertUtil";
import Application from "../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ProgressLoader from 'rn-progress-loader';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { UDDAError } from "../../../../Entities";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import moment from 'moment';
import * as RNIap from 'react-native-iap';

import SubscriptionRequest from "../../../../Services/Subscription/SubscriptionRequest";
import SubscriptionResponseParser from "../../../../Services/Subscription/SubscriptionResponseParser";
import SubscriptionResponse from "../../../../Services/Subscription/SubscriptionResponse";

import { Dialog } from 'react-native-simple-dialogs';
import BigButton from '../../../../Components/Button/BigButton';
import Messgae from "../../../../Services/Core/Messages"
import Message from "../../../../Services/Core/Messages";
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";


const items: any = Platform.select({
      ios: [
            '1R10000', '10000SUBUB', '6R10000', '0R10000'
      ],
      android: [
            'com.udda'
      ]
});


console.disableYellowBox = true;


const ProfilePageContent = {
      key: 'somethun',
      page_title: 'MONTHLY SUBSCRIPTION OPTIONS',
}


interface G_InAPPSubscriptionViewIOSProps extends AppValidationComponentProps {
      getProfileRequestStatus?: ServiceRequestStatus
      getProfileResponse?: GetProfileResponse
      getProfileError?: UDDAError
      subscriptionRequestStatus?: ServiceRequestStatus
      subscriptionResponse?: SubscriptionResponse
      subscriptionError?: UDDAError
      serviceKey?: string
      listeners?: any
}

interface G_InAPPSubscriptionViewIOSState extends AppValidationComponentState {
      showOverlayGameSelectionFlag: boolean
      loader: any;
      Datalist: any;
      ProductList: any;
      SelectedProduct: any;
      receipt: any;
      guestUserDialog: boolean;
}


class G_InAPPSubscriptionViewIOS extends AppValidationComponent<G_InAPPSubscriptionViewIOSProps, G_InAPPSubscriptionViewIOSState>
      implements MenuIconListener, ISubheaderListener, LogoIconListener {
      private serviceRequestInProgress = false;
      private authorisationToken = Application.sharedApplication().user!.authenticationToken;
      purchaseUpdateSubscription = null
      purchaseErrorSubscription = null

      constructor(props: any) {
            super(props);
            this.state = {
                  showOverlayGameSelectionFlag: false,
                  loader: false,
                  Datalist: [],
                  ProductList: [],
                  SelectedProduct: '',
                  receipt: [],
                  guestUserDialog: false,
            }
      }






      // --------------------------------------------------------- API calling ----------------------------------------------------------------------

      async componentDidMount() {
            this.setState({ ProductList: [] })
            console.log(this.state.ProductList);
            RNIap.initConnection().then((data: any) => {
                  console.log("data " + data);

                  this.getallproduct();
            }).catch((error: any) => {
                  console.log("error " + error.message);
            });

      }

      async getallproduct() {
            try {
                  this.setState({ loader: true });
                  const detail = await RNIap.getProducts(['1R10000', '10000SUBUB', '6R10000', '0R10000']);
                  //  this.setState({ ProductList: [] })
                  this.setState({ loader: false });
                  console.log("You purchased InAppBilling detail: " + JSON.stringify(detail));
                  var shorted: any = detail.sort((a: any, b: any) => a.price - b.price);
                  this.setState({ ProductList: shorted })

                  console.log("You purchased InAppBilling products: " + JSON.stringify(this.state.ProductList));
            } catch (error) {
                  console.log("You purchased InAppBilling error: " + error);
            }
      }
      GotoPurchaseProduct() {

            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                  this.setState({ guestUserDialog: true });
            } else {
                  RNIap.requestSubscription(this.state.SelectedProduct.productId, false).then((purchase: any) => {
                        this.setState({
                              receipt: purchase
                        });
                        console.log("getAvailablePurchases GotoPurchaseProduct " + JSON.stringify(purchase));

                        this.CallAPIToPurchasetransaction();

                  }).catch((error: any) => {
                        console.log("error GotoPurchaseProduct " + error.message);
                  });
            }
      }

      CallAPIToPurchasetransaction() {
            var price = this.state.SelectedProduct.title.split(" UDDA Bucks - ");
            var dateofPurchase = moment(new Date()).format('YYYY-MM-DD');
            var platfomr_name: any;

            if (Platform.OS === 'ios') {
                  platfomr_name = 'ios';
            } else if (Platform.OS === 'android') {
                  platfomr_name = 'android';
            }
            var purchaseRequset = new SubscriptionRequest(
                  this.state.SelectedProduct.productId,
                  this.state.SelectedProduct.productId,
                  price[0],
                  this.state.SelectedProduct.price,
                  this.state.receipt.transactionId,
                  platfomr_name,
                  "Subscription",
                  dateofPurchase,
                  platfomr_name + " - " + this.state.SelectedProduct.subscriptionPeriodUnitIOS

            )
            var serviceAction = new ServiceAction()
            var responseParser = new SubscriptionResponseParser()
            this.props.dispatch!(serviceAction.request(ServiceType.Subscription,
                  ServiceKeys.SubscriptionServiceName,
                  purchaseRequset,
                  [this.constructor.name],
                  responseParser))
      }


      getProfile() {
            //AlertUtil.show('Fetching profile')
            var profileRequest = new GetProfileRequest()
            var serviceAction = new ServiceAction()
            var responseParser = new GetProfileResponseParser()
            // AlertUtil.show(JSON.stringify(profileRequest));
            this.props.dispatch!(serviceAction.request(ServiceType.User,
                  ServiceKeys.GetProfileServiceName,
                  profileRequest,
                  [this.constructor.name],
                  responseParser))
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

      componentWillReceiveProps(nextProps: G_InAPPSubscriptionViewIOSProps) {
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
                  else if (nextProps.serviceKey === ServiceKeys.SubscriptionServiceName) {
                        switch (nextProps.requestStatus) {
                              case ServiceRequestStatus.FinishedWithSuccess:
                                    this.serviceRequestInProgress = false;
                                    console.log("betaFriendResponse " + JSON.stringify(nextProps.subscriptionResponse));
                                    var response = nextProps.subscriptionResponse!.response;
                                    if (response.message == 'success') {
                                          AlertUtil.show('Purchase done successfully.');
                                          this.getProfile();
                                    }
                                    else {
                                          AlertUtil.show('Unsuccesfull ' + response.message);

                                    }

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










      // ------------------------------------------------------- Methods ----------------------------------------------------------------------

      LogoiconDidTapped() {
            RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
      }

      accountNameTapped() {
            this.props.navigation!.navigate(AppScreens.G_ProfileView);
      }

      iconDidTapped() {
            this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
      }

      availableBalanceTapped() {
      }

      openPlaysTapped() {
            RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
      }

      coveredPlaysTapped() {
            RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
      }

      gotoDashboard() {
            RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
      }

      OnselectProduct(item: any, index: any) {
            for (let i = 0; i < this.state.ProductList.length; i++) {
                  if (i == index) {
                        this.state.ProductList[i].isselect = true;
                  }
                  else {
                        this.state.ProductList[i].isselect = false;
                  }
            }
            this.setState({ ProductList: this.state.ProductList });

            for (let i = 0; i < this.state.ProductList.length; i++) {
                  if (this.state.ProductList[i].isselect == true) {
                        this.setState({ SelectedProduct: this.state.ProductList[i] });
                  }
            }
            this.setState({ ProductList: this.state.ProductList });
      }













      // ------------------------------------------------------- Design and Design Methods  ---------------------------------------------------------


      render() {

            return (
                  <Container
                        title={ProfilePageContent.page_title}
                        isHeader={true}
                        isSubHeader={true}
                        isTitle={true}
                        showIndicator={false}
                        LogoIconListener={this}
                        menuIconListener={this}
                        accountNameListener={this}
                        availableBalanceListener={this}
                        openPlaysListener={this}
                        coveredPlaysListener={this}
                        showOverlay={this.state.showOverlayGameSelectionFlag}>

                        <ProgressLoader
                              visible={this.state.loader}
                              isModal={true} isHUD={true}
                              hudColor={"#68bcbc"}
                              color={"#FFFFFF"} />

                        <View style={styles.scrollContent}>
                              <View style={{ width: '100%', backgroundColor: '#eeeeee', height: '90%' }}>
                                    <Text style={{ color: '#666666', fontSize: hp(1.5), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginTop: 10 }}>
                                          Select a UDDA Bucks plan to subscribe.
                  </Text>
                                    <FlatList

                                          data={this.state.ProductList}
                                          extraData={this.state}
                                          keyExtractor={(item: any, index: any) => index.toString()}
                                          renderItem={({ item, index }: any) => {
                                                var subindex = index;
                                                // var price = item.title.split(" UDDA Bucks - ");
                                                // var reset: any = item.description.split(" - ");
                                                // var resetCount = reset[1].split(" ");
                                                // var localpriceicon: any = item.localizedPrice.toString().split("");

                                                // console.log(JSON.stringify(localpriceicon));
                                                // var showprice = item.price.split(".");.split(',').join("");

                                                //  var reset: any = item.description.split(" - ");
                                                //  var resetCount = reset[1].split(" ");
                                                var price = item.title.split("UDDA Bucks")[0].split(',').join("");
                                                var localpriceicon: any = item.localizedPrice.toString().split("");

                                                console.log(JSON.stringify(localpriceicon));
                                                var showprice = item.price.split(".");

                                                return (
                                                      <View style={{ backgroundColor: '#eeeeee', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                                                            {item.subscriptionPeriodNumberIOS != '0' ?
                                                                  <View style={{ width: '95%', justifyContent: 'center', marginVertical: 10, }}>
                                                                        <TouchableWithoutFeedback onPress={() => this.OnselectProduct(item, index)}>
                                                                              <View style={{
                                                                                    flexDirection: 'row', width: '100%', borderRadius: 10, borderColor: '#68bcbc',
                                                                                    borderWidth: item.isselect == true ? 5 : 0, shadowColor: '#666666', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 2.0
                                                                              }}>
                                                                                    <View style={{ width: '50%', backgroundColor: 'white', paddingVertical: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                                                                                          <Text style={{ color: '#666666', fontSize: hp(1.3), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>YOU GET - MONTHLY</Text>
                                                                                          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                                                                <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginRight: 2, marginBottom: 5 }} />

                                                                                                <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{parseInt(price).toLocaleString()} </Text>
                                                                                          </View>
                                                                                    </View>
                                                                                    <View style={{ width: '50%', backgroundColor: '#d9eeee', paddingVertical: 10, borderTopEndRadius: 5, borderBottomRightRadius: 5 }}>
                                                                                          <Text style={{ color: '#666666', fontSize: hp(1.3), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>YOU PAY</Text>

                                                                                          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                <Text style={{ color: '#666666', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginRight: 2, marginBottom: 5 }}>{localpriceicon[0]}</Text>
                                                                                                <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{showprice[0]}.</Text>
                                                                                                <Text style={{ color: 'black', fontSize: hp(2.1), textAlign: 'center', fontFamily: 'Montserrat-Bold', marginBottom: 7 }}>{!showprice[1] ? '00' : showprice[1]}</Text>
                                                                                          </View>
                                                                                    </View>

                                                                              </View>

                                                                        </TouchableWithoutFeedback>
                                                                  </View>
                                                                  : null}
                                                      </View>
                                                )
                                          }} />
                              </View>

                              <View style={{ width: '100%', backgroundColor: 'white', height: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableWithoutFeedback onPress={() => { this.GotoPurchaseProduct() }}>
                                          <Text style={{ color: '#68bcbc', fontSize: hp(2.2), textAlign: 'center', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline' }}>PROCEED TO CHECKOUT</Text>
                                    </TouchableWithoutFeedback>
                              </View>

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
                  </Container>


            )
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
      subscriptionRequestStatus: state.serviceReducer.requestStatus,
      subscriptionResponse: state.serviceReducer.response as SubscriptionResponse,
      subscriptionError: state.serviceReducer.error,
      serviceKey: state.serviceReducer.serviceKey,
      listeners: state.serviceReducer.listeners
})

export default connect(mapStateToProps)(G_InAPPSubscriptionViewIOS);
