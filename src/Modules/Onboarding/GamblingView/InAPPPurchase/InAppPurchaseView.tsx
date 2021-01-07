import React from "react";
import { View, Text, Platform, FlatList,AsyncStorage, TouchableWithoutFeedback, Image, BackHandler,ImageBackground,Modal,SafeAreaView } from "react-native";
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
import UrlService from '../../../../Services/Core/ServiceURI'
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
import SubscriptionRequest from "../../../../Services/Subscription/SubscriptionRequest";
import SubscribeContestResponseParser from "../../../../Services/Contest/SubscribeContestResponseParser";
import SubscriptionResponse from "../../../../Services/Subscription/SubscriptionResponse";

import { Dialog } from 'react-native-simple-dialogs';
import BigButton from '../../../../Components/Button/BigButton';
import Messgae from "../../../../Services/Core/Messages"
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';

//const InAppBilling = require("react-native-billing");
import * as RNIap from 'react-native-iap';
import Message from "../../../../Services/Core/Messages";
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";

const items: any = Platform.select({
      ios: [
            '10000UDDA', '30000UDDA'
      ],
      android: [
            '10000udda', '30000udda'
      ]
});



var update = require('immutability-helper');
console.disableYellowBox = true;



const ProfilePageContent = {
      key: 'somethun',
      page_title: 'BUY UDDA BUCKS',
}


interface G_InAPPPurchaseViewProps extends AppValidationComponentProps {
      getProfileRequestStatus?: ServiceRequestStatus
      getProfileResponse?: GetProfileResponse
      getProfileError?: UDDAError
      serviceKey?: string
      listeners?: any
      subscribeRequestStatus?: ServiceRequestStatus
      subscribeResponse?: SubscriptionResponse
      subscribeError?: UDDAError
}

interface G_InAPPPurchaseViewState extends AppValidationComponentState {
      showOverlayGameSelectionFlag: boolean
      loader: any;
      Datalist: any;
      ProductList: any;
      SelectedProduct: any;
      receipt: any;
      guestUserDialog: boolean;
      imageoverlay: any;
}


class G_InAPPPurchaseView extends AppValidationComponent<G_InAPPPurchaseViewProps, G_InAPPPurchaseViewState>
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
                  SelectedProduct: '',
                  receipt: '',
                  guestUserDialog: false,
                  imageoverlay: false,
            }
      }


      async saveoverlay(){
            try {
              await AsyncStorage.setItem('purchaseuddaoverlay', 'true');
              this.setState({imageoverlay:false})
            } catch (error) {
              // Error retrieving data
              console.log(error.message);
            }
          }

      // ------------------------------------------------------- API calling ----------------------------------------------------------------------

     async componentDidMount() {

           var that = this;
           RNIap.initConnection().then((data: any) => {
                 console.log("data " + data);
                 that.getallproduct();

           }).catch((error: any) => {
                 console.log("error " + error.message);
           });

      }
      async getallproduct() {
            //return;
            try {
                  const details = await RNIap.getProducts(['ub6k', 'ub15k', 'ub32k', 'ub85k', 'ub200k']);

                  console.log("You purchased InAppBilling detail: " + JSON.stringify(details));

            } catch (error) {


                  var errMSG = JSON.stringify(error)
                  // var errMSG =  JSON.stringify('this is error')


                  // AlertUtil.show(errMSG);
            }
      }
    /*   async getallproduct() {
            try {
                  this.setState({ loader: true });
                  //const details = await RNIap.getProducts(['10000UDDA', '30000UDDA', '70000UDDA', '160000UDDA', '360000UDDA', '1000000UDDA']);
                  const details = await RNIap.getProducts(['10000udda', '30000udda', '70000udda', '160000udda', '360000udda', '1000000udda']);
                  this.setState({ loader: false });
                  console.log("You purchased InAppBilling detail: " + JSON.stringify(details));
                  var shorted: any = details.sort((a: any, b: any) => a.price - b.price);
                  this.setState({ ProductList: shorted })

                  console.log("You purchased InAppBilling products: " + JSON.stringify(this.state.ProductList));
            } catch (error) {
                  console.log("You purchased InAppBilling error: " + error);
            }
      } */


      async buyGoogleProduct() {
            console.log("By google product call ", this.state.SelectedProduct.productId);
            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                  this.setState({ guestUserDialog: true });
            }
            else {
                  /*try {
                        await InAppBilling.open();
                        const details = await InAppBilling.purchase(this.state.SelectedProduct.productId);
                        console.log("You purchased: ", details);
                        this.setState({ receipt: details.receiptData })
                        this.CallAPIToPurchasetransaction();
                  } catch (err) {
                        console.log("IBB ERR: " + err);
                  } finally {
                        await InAppBilling.close();
                  }*/
                  this.setState({ loader: true });
                  var that = this;
                  setTimeout(function () { that.setState({ loader: false }); }, 8000)
                  RNIap.getAvailablePurchases().then((purchase: any) => {
                        this.setState({
                              receipt: purchase
                        });
                        RNIap.requestPurchase('10000udda', false).then((purchase: any) => {
                              console.log("getAvailablePurchases GotoPurchaseProduct " + JSON.stringify(purchase));

                              this.CallAPIToPurchasetransaction();
                        })
                        this.setState({ loader: false });
                        console.log("getAvailablePurchases GotoPurchaseProduct " + JSON.stringify(purchase));
                  }).catch((error: any) => {
                        this.setState({ loader: false });
                        console.log("error GotoPurchaseProduct " + error.message);
                  });
            }
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
      CallAPIToPurchasetransaction() {

            console.log("CallAPIToPurchasetransaction call ");
            console.log("Price " + price);

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
                  this.state.receipt.purchaseToken,
                  platfomr_name,
                  "Consumable",
                  dateofPurchase,
                  platfomr_name + " - " + this.state.SelectedProduct.subscriptionPeriodUnitIOS

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

      componentWillReceiveProps(nextProps: G_InAPPPurchaseViewProps) {
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

                                    console.log("purchaseResponse " + JSON.stringify(nextProps.subscribeResponse));
                                    var response = nextProps.subscribeResponse!.response;


                                    console.log('transaction responseJson' + JSON.stringify(response));
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
            //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
			RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
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


                                {/* overlay ui start */}
                {UrlService.OVERLAY==0?<Modal visible={this.state.imageoverlay} transparent={true}>
<View style={{height:'100%', width:'100%',flex:1}}>
<SafeAreaView>
         <ImageBackground source={require('../../../../images/buy-udda-bucks-overlay.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: '100%' }}>
                                  <View  style={{  position: 'absolute',  justifyContent: 'center', bottom: '2%' ,width:'100%',alignContent:'center',alignItems:'center'}}>
                                <View style={{width:'90%',justifyContent:'space-between',flexDirection:'row'}}>
                                <Text 
                                  style={{marginTop:15,fontFamily: 'Montserrat-Bold', fontSize: hp(2.0), textDecorationLine:  'underline',color:'#68bcbc'}}
                                   onPress={()=>{this.saveoverlay()}}
                                   >Don't show again</Text>
                                   <TouchableWithoutFeedback  onPress={()=>{this.setState({imageoverlay:false})}}>
                       <Image source={require('../../../../images/close_overlay.png')}  style={{height:50,width:50 }}></Image>
                       </TouchableWithoutFeedback>

                                </View>
                                  </View>

                                </ImageBackground>
                                </SafeAreaView>
         </View>
          
        </Modal>:null}
                {/* overlay ui end */}


                        <ProgressLoader
                              visible={this.state.loader}
                              isModal={true} isHUD={true}
                              hudColor={"#68bcbc"}
                              color={"#FFFFFF"} />

                        <View style={styles.scrollContent}>
                              <View style={{ width: '100%', backgroundColor: '#eeeeee', height: '90%' }}>
                                    <Text style={{ color: '#666666', fontSize: hp(1.5), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginTop: 10 }}>
                                          Select a UDDA Bucks plan to purchase.
                  </Text>
                                    
                              </View>

                              <View style={{ width: '100%', backgroundColor: 'white', height: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableWithoutFeedback onPress={() => { this.buyGoogleProduct() }}>
                                          <Text style={{ color: '#68bcbc', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline' }}>PROCEED TO CHECKOUT</Text>
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
                                                      listener={() => { this.loginButtonPressed() }} />
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

export default connect(mapStateToProps)(G_InAPPPurchaseView);

