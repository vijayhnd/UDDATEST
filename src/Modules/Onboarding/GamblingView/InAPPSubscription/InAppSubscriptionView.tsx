import React from "react";
import { View, Text, Platform, FlatList, TouchableWithoutFeedback, Image, BackHandler } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import AppScreens from "../../../../Util/AppScreens";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { UDDAError } from "../../../../Entities";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import { connect } from 'react-redux';
import AlertUtil from "../../../../Util/AlertUtil";
import { GlobalAppState } from "../../../../ReduxStore";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import ProgressLoader from 'rn-progress-loader';
import Application from "../../../../Entities/Application";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import RouterBuilder from "../../../../Router";
import moment from 'moment';



import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import SubscriptionRequest from "../../../../Services/Subscription/SubscriptionRequest";
import SubscribeContestResponseParser from "../../../../Services/Contest/SubscribeContestResponseParser";
import SubscriptionResponse from "../../../../Services/Subscription/SubscriptionResponse";
import { Dialog } from 'react-native-simple-dialogs';
import Messgae from "../../../../Services/Core/Messages"
import BigButton from '../../../../Components/Button/BigButton';
import Message from "../../../../Services/Core/Messages";
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";
//const InAppBilling = require("react-native-billing");


const items: any = Platform.select({
      ios: [
            //  'com.udda.uddaapp'
            '10000UDDA', '30000UDDA'
      ],
      android: ['10000r1', '10000r3', '10000r6', '10000r0']
});



var update = require('immutability-helper');
console.disableYellowBox = true;



const ProfilePageContent = {
      key: 'somethun',
      page_title: 'MONTHLY SUBSCRIPTION OPTIONS',
}


interface G_InAPPSubscriptionViewProps extends AppValidationComponentProps {
      getProfileRequestStatus?: ServiceRequestStatus
      getProfileResponse?: GetProfileResponse
      getProfileError?: UDDAError
      serviceKey?: string
      listeners?: any
      subscribeRequestStatus?: ServiceRequestStatus
      subscribeResponse?: SubscriptionResponse
      subscribeError?: UDDAError
}

interface G_InAPPSubscriptionViewState extends AppValidationComponentState {
      showOverlayGameSelectionFlag: boolean
      loader: any;
      Datalist: any;
      ProductList: any;
      details: any;



      SelectedProduct: any;
      receipt: any;
      guestUserDialog: boolean;

}

class G_InAPPSubscriptionView extends AppValidationComponent<G_InAPPSubscriptionViewProps, G_InAPPSubscriptionViewState>
      implements MenuIconListener, ISubheaderListener, LogoIconListener {
      private serviceRequestInProgress = false;
      private authorisationToken = Application.sharedApplication().user!.authenticationToken;

      constructor(props: any) {
            super(props);
            this.state = {
                  showOverlayGameSelectionFlag: false,
                  loader: false,
                  Datalist: [],
                  ProductList: [],

                  details: '',
                  SelectedProduct: '',
                  receipt: '',
                  guestUserDialog: false,
            }
      }

      // ------------------------------------------------------- API calling ----------------------------------------------------------------------

      async componentDidMount() {
            BackHandler.addEventListener('hardwareBackPress', () => {
                  if (this.props) {
                        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
                        return true;
                  }

                  return false;
            });
           //// this.getallproduct();
      }


    /*   async getallproduct() {
            try {
                  await InAppBilling.close();
                  await InAppBilling.open();
                  const detail = await InAppBilling.getSubscriptionDetailsArray(['10000r1', '10000r3', '10000r6', '10000r0']);

                  console.log("You purchased InAppBilling detail: " + JSON.stringify(detail));
                  var shorted: any = detail.sort((a: any, b: any) => a.priceValue - b.priceValue);
                  this.setState({ ProductList: shorted })

                  console.log("You purchased InAppBilling products: " + JSON.stringify(this.state.ProductList));
            } catch (error) {
                  console.log("You purchased InAppBilling error: " + error);
            } finally {
                  await InAppBilling.close();
            }
      }
 */
    /*   async checkSubscription() {
            try {
                  await InAppBilling.open();
                  await InAppBilling.loadOwnedPurchasesFromGoogle();
                  const isSubscribed = await InAppBilling.purchase(this.state.SelectedProduct.productId);
                  console.log("Customer subscribed: ", isSubscribed);
                  this.CallAPIToPurchasetransaction();
            } catch (err) {
                  console.log(err);

            } finally {
                  await InAppBilling.close();
            }
      } */

   /*    async buyGoogleProduct() {
            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                  this.setState({ guestUserDialog: true });
            }
            else {
                  try {
                        await InAppBilling.open();
                        const details = await InAppBilling.subscribe(this.state.SelectedProduct.productId);
                        this.CallAPIToPurchasetransaction();
                        console.log("You purchased: ", details);


                  } catch (err) {
                        console.log("IBB ERR: " + err);
                  } finally {
                        await InAppBilling.close();
                  }
            }
      } */


      CallAPIToPurchasetransaction() {
            console.log("CallAPIToPurchasetransaction ");

            var price = this.state.SelectedProduct.title.split(" Udda Bucks - ");

            var dateofPurchase = moment(new Date()).format('YYYY-MM-DD');

            var platfomr_name: any;

            if (Platform.OS === 'ios') {
                  platfomr_name = 'ios';
            } else if (Platform.OS === 'android') {
                  platfomr_name = 'android';
            }




            var subscriptionRequest = new SubscriptionRequest(


                  this.state.SelectedProduct.productId,
                  this.state.SelectedProduct.productId,
                  price[0],
                  this.state.SelectedProduct.priceValue,
                  this.state.receipt.transactionId,
                  platfomr_name,
                  "Subscription",
                  dateofPurchase,
                  platfomr_name + " - " + this.state.SelectedProduct.subscriptionPeriod



            )
            var serviceAction = new ServiceAction()
            var responseParser = new SubscribeContestResponseParser()
            this.props.dispatch!(serviceAction.request(ServiceType.Subscription,
                  ServiceKeys.SubscriptionServiceName,
                  subscriptionRequest,
                  [this.constructor.name],
                  responseParser))
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

      componentWillReceiveProps(nextProps: G_InAPPSubscriptionViewProps) {
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
                                    this.serviceRequestInProgress = false

                                    console.log("subscriptionResponse " + JSON.stringify(nextProps.subscribeResponse));
                                    var response = nextProps.subscribeResponse!.response;


                                    console.log('transaction final responseJson' + JSON.stringify(response));
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
      loginButtonPressed() {
            this.setState({ guestUserDialog: false });
            // this.props.navigation!.navigate(AppScreens.G_LocationConfirmation);
            // this.props.navigation!.navigate(AppScreens.G_LoginPage,this.props);
            RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
      }
      closeModal() {
            this.setState({ guestUserDialog: !this.state.guestUserDialog });
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
                                                var price = item.title.split(" Udda Bucks - ");
                                                var reset = item.description.split(" - ");
                                                var resetCount = reset[1].split(" ");
                                                var showprice = item.priceText.split(".");




                                                console.log('Parse' + parseInt(price[0]).toLocaleString())
                                                return (
                                                      <View style={{ backgroundColor: '#eeeeee', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                                            <View style={{ width: '95%', justifyContent: 'center', marginVertical: 10, }}>
                                                                  <TouchableWithoutFeedback onPress={() => this.OnselectProduct(item, index)}>
                                                                        <View style={{
                                                                              flexDirection: 'row', width: '100%', borderRadius: 10, borderColor: '#68bcbc',
                                                                              borderWidth: item.isselect == true ? 5 : 0, shadowColor: 'black', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5.0
                                                                        }}>
                                                                              <View style={{ width: '50%', backgroundColor: 'white', paddingVertical: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                                                                                    <Text style={{ color: '#666666', fontSize: hp(1.3), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>YOU GET - MONTHLY</Text>

                                                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                                                          <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginRight: 2, marginBottom: 5 }} />

                                                                                          <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{price[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                                                                    </View>
                                                                              </View>
                                                                              <View style={{ width: '50%', backgroundColor: '#d9eeee', paddingVertical: 10, borderTopEndRadius: 5, borderBottomRightRadius: 5 }}>
                                                                                    <Text style={{ color: '#666666', fontSize: hp(1.3), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>YOU PAY</Text>

                                                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                          <Text style={{ color: '#666666', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginRight: 2, marginBottom: 5 }}>{showprice[0].charAt(0)}</Text>
                                                                                          <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{showprice[0].substr(1)}.</Text>
                                                                                          <Text style={{ color: 'black', fontSize: hp(2.1), textAlign: 'center', fontFamily: 'Montserrat-Bold', marginBottom: 7 }}>{!showprice[1] ? '00' : showprice[1]}</Text>
                                                                                    </View>
                                                                              </View>
                                                                        </View>
                                                                  </TouchableWithoutFeedback>
                                                            </View>
                                                      </View>
                                                )
                                          }} />
                              </View>

                              <View style={{ width: '100%', backgroundColor: 'white', height: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableWithoutFeedback onPress={() => { this.buyGoogleProduct() }}>
                                          <Text style={{ color: '#68bcbc', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline' }}>PROCEED TO CHECKOUT</Text>
                                    </TouchableWithoutFeedback>
                              </View>

                        </View>
                        {/* -------------------------------- Guest User Dialogue --------------------------------*/}
                        <Dialog
                              //visible={this.state.guestUserDialog}
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
      response: state.serviceReducer.response as PlayResponse,
      error: state.serviceReducer.error,
      serviceKey: state.serviceReducer.serviceKey,
      listeners: state.serviceReducer.listeners,
      getProfileRequestStatus: state.serviceReducer.requestStatus,
      getProfileResponse: state.serviceReducer.response,
      getProfileError: state.serviceReducer.error,
      updateProfileRequestStatus: state.serviceReducer.requestStatus,
      updateProfileResponse: state.serviceReducer.response,
      updateProfileError: state.serviceReducer.error,

      subscribeStatus: state.serviceReducer.requestStatus,
      subscribeResponse: state.serviceReducer.response as SubscriptionResponse,
      subscribeError: state.serviceReducer.error,

})

export default connect(mapStateToProps)(G_InAPPSubscriptionView);

