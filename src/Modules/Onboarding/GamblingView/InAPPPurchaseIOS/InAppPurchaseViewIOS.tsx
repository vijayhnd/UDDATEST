import React, { Component } from "react";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, Platform, TouchableWithoutFeedback, TouchableOpacity,Image, FlatList,ImageBackground,Modal ,AsyncStorage} from "react-native";
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
import UrlService from '../../../../Services/Core/ServiceURI';
import * as RNIap from 'react-native-iap';
import SubscriptionRequest from "../../../../Services/Subscription/SubscriptionRequest";
import SubscriptionResponseParser from "../../../../Services/Subscription/SubscriptionResponseParser";
import SubscriptionResponse from "../../../../Services/Subscription/SubscriptionResponse";
import { Dialog } from 'react-native-simple-dialogs';
import BigButton from '../../../../Components/Button/BigButton';
import { SafeAreaView } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import Message from "../../../../Services/Core/Messages";
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";
const CleverTap = require('clevertap-react-native');
const items: any = Platform.select({
      // ios: [
      //       '10000UDDA', '30000UDDA', '70000UDDA', '160000UDDA', '360000UDDA', '1000000UDDA'// 'UB200K', 'UB85K', 'UB32K', 'UB15K', 'UB6K'
      // ], 'UB200KN', 'UB85K', 'UB32KN', 'UB15KN', 'UB6K'

      ios: [
            'UB300K', 'UB60K', 'UB10K', 'UB25KN', 'UB5K'
           ],
      android: [
            'ub300k', 'ub60k', 'ub10k', 'ub25kn', 'ub5k'
      ]
});



console.disableYellowBox = true;

const ProfilePageContent = {
      key: 'somethun',
      page_title: 'BUY UDDA BUCKS',
}


interface G_InAPPPurchaseViewIOSProps extends AppValidationComponentProps {
      getProfileRequestStatus?: ServiceRequestStatus
      getProfileResponse?: GetProfileResponse
      getProfileError?: UDDAError

      subscriptionRequestStatus?: ServiceRequestStatus
      subscriptionResponse?: SubscriptionResponse
      subscriptionError?: UDDAError

      serviceKey?: string
      listeners?: any
}

interface G_InAPPPurchaseViewIOSState extends AppValidationComponentState {
      showOverlayGameSelectionFlag: boolean
      loader: any;
      Datalist: any;
      ProductList: any;
      ProductListUserLevel:any;
      SelectedProduct: any;
      receipt: any;
      guestUserDialog: boolean;
      userlevelClick:boolean;
      requsetCount:any;
      imageoverlay:any;
      infoDialog: boolean;
      userLevelData:any;
      imageBadge:any;
      imageBadgel1:any;
      imageBadgel2:any;
      imageBadgel3:any;
      imageBadgel4:any;
      imageBadgel5:any;
      infoDataArray:any;
      levelExpiry:any;
      

}



class G_InAPPPurchaseViewIOS extends AppValidationComponent<G_InAPPPurchaseViewIOSProps, G_InAPPPurchaseViewIOSState>
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
                  userlevelClick:false,
                  imageoverlay: false,
                  requsetCount:0,
                  infoDialog: false,
                  userLevelData:[],
                  imageBadge:'',
                  imageBadgel1:'',
                  imageBadgel2:'',
                  imageBadgel3:'',
                  imageBadgel4:'',
                  imageBadgel5:'',
                  infoDataArray:[],
                  levelExpiry:' ',
                  ProductListUserLevel: [
                        {
                              "productId": "UB6K",
                              "description": "10000 Udda Bucks - 4.99 $",
                              "introductoryPriceSubscriptionPeriodIOS": "",
                              "subscriptionPeriodNumberIOS": "0",
                              "introductoryPriceNumberOfPeriodsIOS": "",
                              "discounts": [],
                              "type": "Do not use this. It returned sub only before",
                              "title": "10000 Udda Bucks- 4.99 $",
                              "localizedPrice": "₹ Amateur",
                              "price": "Amateur",
                              "introductoryPricePaymentModeIOS": "",
                              "subscriptionPeriodUnitIOS": "DAY",
                              "introductoryPrice": "",
                              "currency": "INR"
                        },
                        {
                        "productId": "UB6K",
                        "description": "25000 Udda Bucks - 4.99 $",
                        "introductoryPriceSubscriptionPeriodIOS": "",
                        "subscriptionPeriodNumberIOS": "0",
                        "introductoryPriceNumberOfPeriodsIOS": "",
                        "discounts": [],
                        "type": "Do not use this. It returned sub only before",
                        "title": "25000 Udda Bucks- 4.99 $",
                        "localizedPrice": "₹ Pro",
                        "price": "Pro",
                        "introductoryPricePaymentModeIOS": "",
                        "subscriptionPeriodUnitIOS": "DAY",
                        "introductoryPrice": "",
                        "currency": "INR"
                  },
                  {
                        "productId": "UB15K",
                        "description": "100000 Udda Bucks - 9.99 $",
                        "introductoryPriceSubscriptionPeriodIOS": "",
                        "subscriptionPeriodNumberIOS": "0",
                        "introductoryPriceNumberOfPeriodsIOS": "",
                        "discounts": [],
                        "type": "Do not use this. It returned sub only before",
                        "title": "100000 Udda Bucks - 9.99 $",
                        "localizedPrice": "₹ 799.00",
                        "price": "All Star",
                        "introductoryPricePaymentModeIOS": "",
                        "subscriptionPeriodUnitIOS": "DAY",
                        "introductoryPrice": "",
                        "currency": "INR"
                  },
                  {
                        "productId": "UB32K",
                        "description": "500000 Udda Bucks - 19.99 $",
                        "introductoryPriceSubscriptionPeriodIOS": "",
                        "subscriptionPeriodNumberIOS": "0",
                        "introductoryPriceNumberOfPeriodsIOS": "",
                        "discounts": [],
                        "type": "Do not use this. It returned sub only before",
                        "title": "500000 Udda Bucks - 19.99 $",
                        "localizedPrice": "₹ 1,599.00",
                        "price": "Hall of Fame",
                        "introductoryPricePaymentModeIOS": "",
                        "subscriptionPeriodUnitIOS": "DAY",
                        "introductoryPrice": "",
                        "currency": "INR"
                  }, {
                        "productId": "UB85K",
                        "description": "1000000 Udda Bucks- 49.99 $",
                        "introductoryPriceSubscriptionPeriodIOS": "",
                        "subscriptionPeriodNumberIOS": "0",
                        "introductoryPriceNumberOfPeriodsIOS": "",
                        "discounts": [],
                        "type": "Do not use this. It returned sub only before",
                        "title": "1000000 Udda Bucks - 49.99 $",
                        "localizedPrice": "₹ 3,999.00",
                        "price": "GOAT",
                        "introductoryPricePaymentModeIOS": "",
                        "subscriptionPeriodUnitIOS": "DAY",
                        "introductoryPrice": "",
                        "currency": "INR"
                  }
            ]
                  
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
console.log('props data',this.props.navigation.state.params.params.callFrom);
            // let userId = '';
            // try {
            //   userId = await AsyncStorage.getItem('purchaseuddaoverlay');
            //   console.log('purchaseuddaoverlay response',userId)
            //   if(userId == 'true')
            //   {
            //     this.setState({imageoverlay:false})
            //   }else{
            //     this.setState({imageoverlay:true})
            //   }
            // } catch (error) {
            //   // Error retrieving data
            //   console.log(error.message);
            // }


            this.setState({ ProductList: [] })
            console.log(this.state.ProductList);
            RNIap.initConnection().then((data: any) => {
                  console.log("data " + data);

            }).catch((error: any) => {
                  console.log("error " + error.message);
            });
            this.getallproduct();
            this.GETPAllUserLevel();
      }




      async getallproduct() {
            //return;
            try {
                 // this.pushErrorMSG('this is error')
                  this.setState({ loader: true });
                  //const details = await RNIap.getProducts(['10000UDDA', '30000UDDA', '70000UDDA', '160000UDDA', '360000UDDA', '1000000UDDA']);
                 // const details = await RNIap.getProducts(['10000UDDA', '30000UDDA', '70000UDDA', '160000UDDA', '6000UDDA']);
                 // const details = await RNIap.getProducts(['UB200KN', 'UB85K', 'UB32K', 'UB15K', 'UB6K']);
                // const details = await RNIap.getProducts([' ']);
                  
                   var details;
                  if (Platform.OS === 'ios') {
                        details = await RNIap.getProducts(['UB300K', 'UB60K', 'UB10K', 'UB25KN', 'UB5K']);
                  } else {
                        try {
                              details = await RNIap.getProducts(['ub300k', 'ub60k', 'ub10k', 'ub25kn', 'ub5k']);     
                        } catch (error) {
                              console.log("catch error: " , JSON.stringify(error));  
                        }
                       

                  } 
                  this.setState({ loader: false });
                  console.log("You purchased InAppBilling detail: " + JSON.stringify(details));
                  var shorted: any = details.sort((a: any, b: any) => a.price - b.price);
                  this.setState({ ProductList: shorted })

                  console.log("You purchased InAppBilling products: " + JSON.stringify(this.state.ProductList));
            } catch (error) {
                  
                  this.setState({ loader: false });
                 var errMSG =  JSON.stringify(error)
               // var errMSG =  JSON.stringify('this is error')
                  this.pushErrorMSG(errMSG)
                  
                 // AlertUtil.show(errMSG);
            }
      }
      checkLevelProduct(level:any)
{
    //  var  currIndex = parseInt( Application.sharedApplication().user!.profile.level_array.level_id)-1;
      var levelArray  = [ 10000,25000,100000,500000,1000000]
 
      var currIndex= levelArray.indexOf(level) ;// [currIndex];
      console.log(currIndex+'>>>'+level)
      if(currIndex < 0)
      {
            return true;
      }
      else
      {
            //return false ; 
            return true;
      }
}

      pushErrorMSG(e_msg:any)
      {

            var params: any = {
                  'error_msg': e_msg
                  
                };
            
                var formData = new FormData();
            
                for (var k in params) {
                  formData.append(k, params[k]);
                }
            
                fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/app_logs_purchase', {
                  method: 'POST',
                  headers: {
                    'authorisation': this.authorisationToken
                  },
                  body: formData,
                }).then((response) => response.json())
                  .then((responseJson) => {
                  
                  })
                  .catch(error => {
                    
                  })
      }

      buySubscription() {
            RNIap.requestSubscription(items).then((purchase: any) => {
                  console.log("buySubscription " + JSON.stringify(purchase));
            }).catch((error: any) => {
                  console.log(error.message);
            })
      }


      GotoPurchaseProduct() {
            
            

            //RNIap.getAvailablePurchases(this.state.SelectedProduct.productId, false).then((purchase: any) => {
            if (Application.sharedApplication().user!.profile.userType == 'Guest') {
                  this.setState({ guestUserDialog: true });
            } else {
                  if(this.state.SelectedProduct.productId){
                  this.setState({ loader: true });
                  var that = this ;
                 // setTimeout(function(){that.setState({ loader: false }); },8000)
                  RNIap.getAvailablePurchases().then((purchase: any) => {
                       
                        RNIap.requestPurchase(this.state.SelectedProduct.productId, false).then((purchase: any) => {
                              console.log(" GotoPurchaseProduct " + JSON.stringify(purchase));
                              this.setState({
                                    receipt: purchase
                              });
                              that.CallAPIToPurchasetransaction(); 
                              
                        }).catch((error: any) => {
                              that.setState({ loader: false });
                              console.log("error1 GotoPurchaseProduct " + error.message);
                        });
                       // this.setState({ loader: false });  
                        console.log("getAvailablePurchases  " + JSON.stringify(purchase));
                  }).catch((error: any) => {
                        that.setState({ loader: false });
                        console.log("error2 GotoPurchaseProduct " + error.message);
                  });
            }
            else{
                  
                  AlertUtil.show('Please select a product')

            }
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
            var price = this.state.SelectedProduct.title.split(" UDDA Bucks - ");
            var dateofPurchase = moment(new Date()).format('YYYY-MM-DD');
            var platfomr_name: any;

            if (Platform.OS === 'ios') {
                  platfomr_name = 'ios';
            } else if (Platform.OS === 'android') {
                  platfomr_name = 'android';
            }
            CleverTap.recordEvent('Charged',{'Amount': this.state.SelectedProduct.price });
            this.setState({ loader: true });
            var purchaseRequset = new SubscriptionRequest(
                  this.state.SelectedProduct.productId,
                  this.state.SelectedProduct.productId,
                  price[0],
                  this.state.SelectedProduct.price,
                  this.state.receipt.transactionId,
                  platfomr_name,
                  "Consumable",
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
            var profileRequest = new GetProfileRequest()
            var serviceAction = new ServiceAction()
            var responseParser = new GetProfileResponseParser()
            this.props.dispatch!(serviceAction.request(ServiceType.User,
                  ServiceKeys.GetProfileServiceName,
                  profileRequest,
                  [this.constructor.name],
                  responseParser))
      }

      componentWillReceiveProps(nextProps: G_InAPPPurchaseViewIOSProps) {
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
                                    var that = this;
                                    if (response.message == 'success') {
                                         
                                          that.setState({ requsetCount: 0 })
                                          AlertUtil.showSingleActionMessage('Purchase done successfully.',function(){ that.setState({ loader: false });});
                                        //
                                         this.getProfile();

                                    }
                                    else if(this.state.requsetCount == 0 ){
                                          that.setState({ requsetCount: 1 })
                                          that.CallAPIToPurchasetransaction()
                                         // AlertUtil.showSingleActionMessage(response.message,function(){ that.setState({ loader: false });});
                                    }
                                    else if(this.state.requsetCount == 1) {
                                          that.setState({ requsetCount: 2 })
                                          AlertUtil.showSingleActionMessage('Something went wrong while processing request. Please try again.',function(){ that.CallAPIToPurchasetransaction() }); 
                                    }
                                    else
                                    {
                                          that.setState({ requsetCount: 0})
                                          AlertUtil.showSingleActionMessage('We could not process your purchase request at the moment. Please contact UDDA support with this transaction id: ' + that.state.receipt.transactionId,function(){ that.setState({ loader: false });});
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
     
      showInfoPopup(level:any)
      {
          
         //  alert(level);
           if(level == 10000)
           {
            this.setState({imageBadge:this.state.userLevelData.level_array[0].status_badge})
            this.setState({infoDataArray:this.state.userLevelData.level_array[0].access_bets})
            this.setState({levelExpiry:this.state.userLevelData.level_array[0].expiration_date})
            
      
           }
           else if(level == 25000)
           {
            this.setState({imageBadge:this.state.userLevelData.level_array[1].status_badge})   
            this.setState({infoDataArray:this.state.userLevelData.level_array[1].access_bets})
            this.setState({levelExpiry:this.state.userLevelData.level_array[1].expiration_date})
           }
           else if(level == 100000){
            this.setState({imageBadge:this.state.userLevelData.level_array[2].status_badge}) 
            this.setState({infoDataArray:this.state.userLevelData.level_array[2].access_bets})
            this.setState({levelExpiry:this.state.userLevelData.level_array[2].expiration_date})
           }
           else if( level == 500000)
           {
            this.setState({imageBadge:this.state.userLevelData.level_array[3].status_badge}) 
            this.setState({infoDataArray:this.state.userLevelData.level_array[3].access_bets})
            this.setState({levelExpiry:this.state.userLevelData.level_array[3].expiration_date})
           }
           else if( level == 1000000)
           {
            this.setState({imageBadge:this.state.userLevelData.level_array[4].status_badge})   
            this.setState({infoDataArray:this.state.userLevelData.level_array[4].access_bets})  
            this.setState({levelExpiry:this.state.userLevelData.level_array[4].expiration_date})
           }
            this.setState({infoDialog:true})
      }
      
      getName(level:any)
      {
          
           // alert(level);
           if(level == 10000)
           {
            return this.state.userLevelData.level_array[0].level_name;
            }
           else if(level == 25000)
           {
            return this.state.userLevelData.level_array[1].level_name;
           }
           else if(level == 100000){
            return this.state.userLevelData.level_array[2].level_name;
           }
           else if( level == 500000)
           {
            return this.state.userLevelData.level_array[3].level_name;
           }
           else if( level == 1000000)
           {
            return this.state.userLevelData.level_array[4].level_name;
           }
           // this.setState({infoDialog:true})
      }
      
      
      checkLevelProductUpdate(level:any)
      {
          //  var  currIndex = parseInt( Application.sharedApplication().user!.profile.level_array.level_id)-1;
            var levelArray  = [10000,25000,100000,500000,1000000]
       
            var currIndex= levelArray.indexOf(level) ;// [currIndex];
            console.log(currIndex+'>>>'+level)
            if(currIndex < 0)
            {
                  return false;
            }
            else
            {
                  return true; 
            }
      }
      
      checkLevel(level:any)
      {
           console.log( Application.sharedApplication().user!.profile.level_array)
           console.log('check pky')
            var  currIndex = parseInt( Application.sharedApplication().user!.profile.level_array.level_id)-1;
            let levelArray:any  = [ '10000','25000','100000','500000','1000000']
       
            var currPrice = levelArray[currIndex];
         
            if( level == currPrice )
            {
                  return false;
                 //  alert('false'+level+'>>>'+currPrice)
            }
            else
            {
                  return true;
                
             alert('true'+level+'>>>'+currPrice)
            }
            //return;
      }

      GETPAllUserLevel() {
            fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/level/get_all_levels', {
              method: 'GET',
              headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken
              },
            }).then((response) => response.json())
              .then((responseJson) => {
                console.log('all user level  ' + JSON.stringify(responseJson));

                this.setState({ userLevelData: responseJson.data });
                this.setState({imageBadge:responseJson.data.level_array[0].status_badge})
                this.setState({imageBadgel1:responseJson.data.level_array[0].status_badge})
                this.setState({imageBadgel2:responseJson.data.level_array[1].status_badge})
                this.setState({imageBadgel3:responseJson.data.level_array[2].status_badge})
                this.setState({imageBadgel4:responseJson.data.level_array[3].status_badge})
                this.setState({imageBadgel5:responseJson.data.level_array[4].status_badge})

                console.log(this.state.userLevelData.level_array[0].status_badge
                  )
                if (responseJson.message = "success promotional message") {
                 // this.setState({ BetPromotionalMsg: responseJson.data.promotional_array[0].gaming_promotional_message })
                } else {
                 // this.setState({ BetPromotionalMsg: responseJson.message });
                }
                if (responseJson.message == "Access Expired.") {
                  // AlertUtil.show("Session Expired ! Please login again");
                  console.log("Footer comp ---->" + responseJson.message);
                 // this.logoutButtonPressed();
                }
        
              })
              .catch(error => {
               // AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
                console.log(error);
              })
          }
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
            var that = this;
           setTimeout(() => {
            that.GotoPurchaseProduct()    
           }, 500); 
      }









      // ----------------------------------------------------------- Design and Design Methods  ---------------------------------------------------------


      render() {

            return (
                  <Container
                        title={this.state.userlevelClick ? 'USER STATUS': ProfilePageContent.page_title }
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
{this.state.userlevelClick?
 <Icon  onPress={()=>{this.setState({userlevelClick:false})}}  style={{position:'absolute',top:-35,right:20,zIndex:99999}} name="close" size={25} color="black"/>
               
:null}         

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
                                   {this.props.navigation.state.params.params.callFrom == 'sideMenu'?
                                    <Text style={{ color: '#666666', fontSize: hp(1.5), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginTop: 10 }}>
                                          Select a UDDA Bucks plan to purchase.
                  </Text>
                  :

                  <Text style={{ color: '#666666', fontSize: hp(1.5), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginTop: 10 }}>
                 Select a UDDA Bucks to Upgrade.
</Text>
      }

                  {!this.state.userlevelClick?
                                    <FlatList
                                          data={this.state.ProductList}
                                          extraData={this.state}
                                          keyExtractor={(item: any, index: any) => index.toString()}
                                          renderItem={({ item, index }: any) => {
                                                var subindex = index;
                                                var price = item.title.split(" UDDA Bucks - ");
                                                var localpriceicon: any = item.localizedPrice.toString().split("");

                                                console.log(JSON.stringify(localpriceicon));
                                                var showprice = item.price.split(".");
                                                var isLevelProduct = this.checkLevelProduct(parseInt(price[0]));
                                                return (
                                                      <View style={{ backgroundColor: '#eeeeee', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                                            {isLevelProduct == true?
                                                                  <View style={{ width: '95%', justifyContent: 'center', marginVertical: 10, }}>
                                                                        <TouchableWithoutFeedback onPress={() => this.OnselectProduct(item, index)}>
                                                                              <View style={{
                                                                                    flexDirection: 'row', width: '100%', borderRadius: 10, borderColor: '#68bcbc',
                                                                                    borderWidth: item.isselect == true ? 5 : 0, shadowColor: '#666666', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 2.0,elevation:10
                                                                              }}>
                                                                                    <View style={{ width: '50%', backgroundColor: 'white', paddingVertical: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                                                                                          <Text style={{ color: '#666666', fontSize: hp(1.3), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>YOU GET</Text>

                                                                                          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                                                                <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginRight: 2, marginBottom: 5 }} />

                                                                                                <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{parseInt(price[0]).toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </Text>
                                                                                          </View>
                                                                                    </View>
                                                                                    <View style={{ width: '50%', backgroundColor: '#d9eeee', paddingVertical: 10, borderTopEndRadius: 5, borderBottomRightRadius: 5 }}>
                                                                                          <Text style={{ color: '#666666', fontSize: hp(1.3), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>YOU PAY</Text>

                                                                                          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                <Text style={{ color: '#666666', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginRight: 2, marginBottom: 5 }}>{localpriceicon[0]}</Text>
                                                                                                <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{showprice[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.</Text>
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

                                          :
                                          <View style={{position:'absolute',backgroundColor:'#fff',height:hp(100),width:wp(100)}}>
                                           <FlatList
                                          data={this.state.ProductListUserLevel}
                                          extraData={this.state}
                                          keyExtractor={(item: any, index: any) => index.toString()}
                                          renderItem={({ item, index }: any) => {
                                                var subindex = index;
                                                var price = item.title.split(" UDDA Bucks - ");
                                                var localpriceicon: any = item.localizedPrice.toString().split("");

                                                console.log(JSON.stringify(localpriceicon));
                                                var showprice = item.price.split(".");
                                                var isDisable = this.checkLevel(parseInt(price[0]));
                                                var isLevelProduct = true;//this.checkLevelProduct(parseInt(price[0]));
                                                return (
                                                      <View style={{ opacity: isDisable == true ? 1:1, backgroundColor: '#eeeeee', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                                            {isLevelProduct == true ?
                                                                  <View style={{ width: '95%', justifyContent: 'center', marginVertical: 10, }}>
                                                                      
                                                                        <TouchableWithoutFeedback onPress={() => {isDisable== true ? null: null}}>
                                                                              <View style={{
                                                                                    flexDirection: 'row', width: '100%', borderRadius: 10, borderColor: '#68bcbc' ,
                                                                                    borderWidth: item.isselect == true ? 5 : 0, shadowColor: '#666666', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 2.0,elevation:10
                                                                              }}>
                                                                                    <View style={{ width: '30%', backgroundColor: 'white', paddingVertical: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                                                                                          {/* <Text style={{ color: '#666666', fontSize: hp(.7), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}></Text> */}

                                                                                          {/* <View style={{ height:40,flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                                                                <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginRight: 2, marginBottom: 5 }} />

                                                                                                <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{parseInt(price[0]).toLocaleString()} </Text>
                                                                                          </View> */}
                                                                                          {/* <Text style={{ color: '#666666', fontSize: hp(.7), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}></Text> */}
                                                                                    </View>
                                                                                    {parseInt(price[0]) == 10000  ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'.25%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                     <Image source={{ uri: this.state.imageBadgel1}} style={{ height: 50, width: 80,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      }   
                                                                                        {parseInt(price[0]) == 25000 ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'.25%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                    <Image source={{ uri: this.state.imageBadgel2}}  style={{ height: 40, width: 40,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      } 
                                                                                        {parseInt(price[0]) == 100000 ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'.25%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                   <Image source={{ uri: this.state.imageBadgel3}} style={{ height: 40, width: 40,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      } 
                                                                                        {parseInt(price[0]) == 500000 ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'.25%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                    <Image source={{ uri: this.state.imageBadgel4}} style={{ height: 40, width: 40,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      }  
                                                                                        {parseInt(price[0]) == 1000000 ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'.25%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                   <Image source={{ uri: this.state.imageBadgel5}} style={{ height: 40, width: 40,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      }         
                                                                                    <View style={{ width: '70%', backgroundColor: isDisable == true ? '#EEE':'#d9eeee', paddingVertical: 12, borderTopEndRadius: 5, borderBottomRightRadius: 5 }}>
                                                                                 
                                                                                          {/* <Text style={{ color: '#666666', fontSize: hp(.7), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}> </Text> */}

                                                                                          <View style={{ height:40,flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                                                {/* <Text style={{ color: '#666666', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginRight: 2, marginBottom: 5 }}>{localpriceicon[0]}</Text> */}
                                                                                                <Text style={{ color: isDisable == true ? '#BBB':'#68bcbc', fontSize: hp(2.3),paddingLeft:10, textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{showprice[0]}</Text>
                                                                                                {/* <Text style={{ color: 'black', fontSize: hp(2.1), textAlign: 'center', fontFamily: 'Montserrat-Bold', marginBottom: 7 }}>{!showprice[1] ? '00' : showprice[1]}</Text> */}
                                                                                          </View>
                                                                                          {/* <Text style={{ color: '#666666', fontSize: hp(.7), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}> </Text> */}
                                                                                    </View>
                                                                                    <TouchableWithoutFeedback 
                                                                                    onPress={() =>{isDisable == true?this.showInfoPopup(parseInt(price[0])): this.showInfoPopup(parseInt(price[0]))}}
                                                                                    // onPress={() => { AlertUtil.show('Only Creator can invite') }}
                                                                                    >
                                                                                    <View style={[styles.table_title_info_container,{backgroundColor: isDisable == true ? '#BBB':'#68bcbc'}]}> 
                                                                                   
                                                                                         <Text style={styles.table_title_info_text}> i </Text>
                                                                                         
                                                                                          
                                                                                          </View>
                                                                                          </TouchableWithoutFeedback>
                                                                                         
                                                                              </View>
                                                                              
                                                                        </TouchableWithoutFeedback>
                                                                  </View>
                                                                  : null}
                                                      </View>
                                                )
                                          }} />
                                          </View>
      }
                             </View>
                                    
                              {/* <View style={{ width: '100%', backgroundColor: 'white', height: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableWithoutFeedback onPress={() => { this.GotoPurchaseProduct() }}>
                                          <Text style={{ color: '#68bcbc', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline' }}>PROCEED TO CHECKOUT</Text>
                                    </TouchableWithoutFeedback>
                              </View> */}
                              {!this.state.userlevelClick && this.props.navigation.state.params.params.callFrom != 'sideMenu'?
                               <View style={{ width: '100%', backgroundColor: 'white', height: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableWithoutFeedback  onPress={()=>{this.setState({userlevelClick:true})}} >
                                          <Text style={{ color: '#68bcbc', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline' }}>VIEW USER STATUS</Text>
                                    </TouchableWithoutFeedback>
                              </View>
      :null}

                        </View>

                        <Dialog
          visible={this.state.infoDialog}
          title=""
         dialogStyle={{ backgroundColor: '#fff',borderRadius:4,height: 'auto',padding:0 }}
         contentStyle={{ padding:0, backgroundColor: '#fff' }}
          onTouchOutside={() => this.setState({ infoDialog: false })} >

         <View style={{padding:0}}>
          
            <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',paddingBottom:10}}>
            <View style={{width:'25%',paddingLeft:10,backgroundColor:'white'}}>
             <Image source={{ uri: this.state.imageBadge}} style={{ height: 50, width: 80,resizeMode:'contain'}} />
     
            </View>
                    <View style={{width:'75%',justifyContent:'center',paddingLeft:3}}>
                          <View style={{alignContent:'flex-end',alignItems:'flex-end',paddingRight:3}}>
                          <TouchableOpacity onPress={() => this.setState({ infoDialog: false })}>
              <View style={[styles.CloseView,{paddingRight:10}]}>
              <Icon name="close" size={20} color="grey"/>
                {/* <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12,tintColor:'white' }}></Image> */}
              </View>
            </TouchableOpacity>
                          </View>
                          <View style={{marginBottom:15}}>
                          <Text style={{fontSize: hp(2.2), fontFamily: 'Montserrat-SemiBold',color:'#222'}}>{this.state.levelExpiry? 'Valid until:':null} <Text style={{fontSize: hp(2.6), fontFamily: 'Montserrat-Bold',color:'#222'}}>{this.state.levelExpiry}</Text> </Text>
                                </View>                    
            
                      </View>             
            </View>             
         

            <View style={[styles.poolmaincontainer,{backgroundColor:'white',paddingBottom:10}]}>
                  <View style={{padding:10,backgroundColor:'#d0edeb'}}>
                  <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-Bold',color:'black',padding:5}}>Available Features</Text>
                  </View>
                  {/* <View style={{padding:10,backgroundColor:'white',paddingTop:5,paddingBottom:0}}>
                  <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold',color:'black',padding:5}}>Money Line</Text>
                  <View style={{borderBottomWidth:1,borderBottomColor:'grey'}}/>
                  </View> */}

                {this.state.infoDataArray.map((item,index)=>{
                      return(
                        <View style={{padding:10,backgroundColor:'white',paddingTop:5,paddingBottom:0}}>
                        <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold',color:'#222 ',padding:5}}>{item.label}</Text>
                        <View style={{borderBottomWidth:1,borderBottomColor:'lightgrey'}}/>
                        </View> 
                      )
                })}


                  </View>
          



          </View>
         
        </Dialog>
                        {/* -------------------------------- Guest User Dialogue --------------------------------*/}
                        <Dialog
                            //  visible={this.state.guestUserDialog}
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

export default connect(mapStateToProps)(G_InAPPPurchaseViewIOS);
