import React, { Component } from "react";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, Platform, TouchableWithoutFeedback, Image, FlatList ,TouchableOpacity} from "react-native";
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
import Icon from 'react-native-vector-icons/FontAwesome';
 
// const items: any = Platform.select({
//       // ios: [
//       //       '10000UDDA', '30000UDDA', '70000UDDA', '160000UDDA', '360000UDDA', '1000000UDDA'// 'UB200K', 'UB85K', 'UB32K', 'UB15K', 'UB6K'//  'UB100K' 
//       // ],

//       ios: [
//         'UB100K' ,'UB25K','UB500K','UB1000K'
//            ],
//       android: [
//             'com.udda'
//       ]
// });



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
      SelectedProduct: any;
      receipt: any;
      guestUserDialog: boolean;
      requsetCount:any;
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
                  levelExpiry:' '


            }
      }







      // ------------------------------------------------------- API calling ----------------------------------------------------------------------

      componentDidMount() {
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
            try {
                 // this.pushErrorMSG('this is error')
                  this.setState({ loader: true });
                  //const details = await RNIap.getProducts(['10000UDDA', '30000UDDA', '70000UDDA', '160000UDDA', '360000UDDA', '1000000UDDA']);
                 // const details = await RNIap.getProducts(['10000UDDA', '30000UDDA', '70000UDDA', '160000UDDA', '6000UDDA']);
                 // const details = await RNIap.getProducts(['UB200K', 'UB85K', 'UB32K', 'UB15K', 'UB6K']);
                 var details :any;
                 if(Application.sharedApplication().user!.profile.level_array.promotional_flag == '1'){
                  details = await RNIap.getProducts([ 'UB100K' ,'UB25K','UB500K','UB1000K']);
                 }
                 else{
                  details = await RNIap.getProducts([ 'UB100KWP' ,'UB25KWP','UB500KWP','UB1000KWP']);  
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

      CallAPIToPurchasetransaction() {
            var price = this.state.SelectedProduct.title.split(" UDDA Bucks - ");
            var dateofPurchase = moment(new Date()).format('YYYY-MM-DD');
            var platfomr_name: any;

            if (Platform.OS === 'ios') {
                  platfomr_name = 'ios';
            } else if (Platform.OS === 'android') {
                  platfomr_name = 'android';
            }
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
                                          var price = that.state.SelectedProduct.title.split(" UDDA Bucks - ");
                                          var name = that.getName(parseInt(price[0]))
                                          that.setState({ SelectedProduct: ''})
                                          that.setState({ requsetCount: 0 })
                                          AlertUtil.showSingleActionMessage('Congratulations!'+ parseInt(price[0])+'UDDA bucks added successfully and you are upgraded to ' +name,function(){ that.setState({ loader: false });});
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
                                   // AlertUtil.show(errorMessage)
                                   var that = this;
                                    AlertUtil.showSingleActionMessage(errorMessage,function(){ that.setState({ loader: false }); }); 
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
                AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
                console.log(error);
              })
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


showInfoPopup(level:any)
{
    
     // alert(level);
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


checkLevelProduct(level:any)
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
   
      if(level < currPrice || level == currPrice )
      {
            return true;
           //  alert('false'+level+'>>>'+currPrice)
      }
      else
      {
            return false;
       alert('true'+level+'>>>'+currPrice)
      }
      //return;
}



      // ----------------------------------------------------------- Design and Design Methods  ---------------------------------------------------------


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
                                    <Text   style={{ color: '#666666', fontSize: hp(1.5), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginTop: 10 }}>
                                          Select a UDDA Bucks to Upgrade.
                  </Text>
                  {/* <View style={{justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                    <View style={{width:'95%',backgroundColor:'white',marginTop:5,marginBottom:5,flexDirection:'row'}}>
                                     <View style={{width:'50%',padding:10,justifyContent:'center',alignItems:'center'}}>
                                           <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold',}}>YOU GET</Text>
                                           <View style={{flexDirection:'row',marginTop:2}}>
                                           <Image source={require('../../../../images/BucksDark.png')} style={{ height: 10, width: 10, marginTop: 4 }} />
                                           <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold',}}> 2000</Text>
                                           </View>
                                     </View>

                                    <View style={{zIndex:9999, width:'30%',marginLeft:'25%',padding:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                    <Image source={require('../../../../images/goat.png')} style={{ height: 50, width: 50}} />
                                    </View>


                                    <View style={{width:'50%',padding:5,backgroundColor:'#d0edeb'}}>
                                          <View style={{justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end'}}>
                                          <View style={[styles.table_title_info_container]}>
                                          <TouchableOpacity 
                                          onPress={() => { this.setState({infoDialog:true})}}
                                          // onPress={() => { AlertUtil.show('Only Creator can invite') }}
                                           >
                                                <Text style={styles.table_title_info_text}> i </Text>
                                                </TouchableOpacity>
                                           </View>
                                          </View>
                                          <View style={{justifyContent:'center',alignItems:'center'}}>
                                           <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold',}}>YOU PAY</Text>
                                          </View>
                                          <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                                          <Image source={require('../../../../images/BucksDark.png')} style={{ height: 10, width: 10, marginTop: 4 }} />
                                           <Text style={{fontSize: hp(2), fontFamily: 'Montserrat-SemiBold',}}> 2000</Text>
                                          </View>
                                    </View>



                                          </View>                                       
                                    </View> */}
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
                                                var isDisable = this.checkLevel(parseInt(price[0]));
                                                var isLevelProduct = this.checkLevelProduct(parseInt(price[0]));
                                                return (
                                                      <View style={{ opacity: isDisable == true ? 0.5:1, backgroundColor: '#eeeeee', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                                            {isLevelProduct == true ?
                                                                  <View style={{ width: '95%', justifyContent: 'center', marginVertical: 10, }}>
                                                                      
                                                                        <TouchableWithoutFeedback onPress={() => {isDisable== true ? null: this.OnselectProduct(item, index)}}>
                                                                              <View style={{
                                                                                    flexDirection: 'row', width: '100%', borderRadius: 10, borderColor: '#68bcbc',
                                                                                    borderWidth: item.isselect == true ? 5 : 0, shadowColor: '#666666', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 2.0
                                                                              }}>
                                                                                    <View style={{ width: '50%', backgroundColor: 'white', paddingVertical: 10, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                                                                                          <Text style={{ color: '#666666', fontSize: hp(1.3), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>YOU GET</Text>

                                                                                          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                                                                                                <Image source={require('../../../../images/bucks.png')} style={{ height: 12, width: 12, marginRight: 2, marginBottom: 5 }} />

                                                                                                <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{parseInt(price[0]).toLocaleString()} </Text>
                                                                                          </View>
                                                                                    </View>
                                                                                    {parseInt(price[0]) == 10000  ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'27%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                     <Image source={{ uri: this.state.imageBadgel1}} style={{ height: 40, width: 40,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      }   
                                                                                        {parseInt(price[0]) == 25000 ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'25%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                    <Image source={{ uri: this.state.imageBadgel2}}  style={{ height: 40, width: 40,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      } 
                                                                                        {parseInt(price[0]) == 100000 ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'25%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                   <Image source={{ uri: this.state.imageBadgel3}} style={{ height: 40, width: 40,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      } 
                                                                                        {parseInt(price[0]) == 500000 ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'25%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                    <Image source={{ uri: this.state.imageBadgel4}} style={{ height: 40, width: 40,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      }  
                                                                                        {parseInt(price[0]) == 1000000 ?
                                                                                    <View style={{zIndex:9999, width:'30%',marginLeft:'26%',marginVertical:10,justifyContent:'center',alignItems:'center',position:"absolute"}}>
                                                                                   <Image source={{ uri: this.state.imageBadgel5}} style={{ height: 40, width: 40,resizeMode:'contain'}} />
                                                                                    
                                                                                    </View>
                                                                                    :null
                                                                                      }         
                                                                                    <View style={{ width: '50%', backgroundColor: '#d9eeee', paddingVertical: 10, borderTopEndRadius: 5, borderBottomRightRadius: 5 }}>
                                                                                 
                                                                                          <Text style={{ color: '#666666', fontSize: hp(1.3), textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>YOU PAY</Text>

                                                                                          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                <Text style={{ color: '#666666', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-SemiBold', marginRight: 2, marginBottom: 5 }}>{localpriceicon[0]}</Text>
                                                                                                <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>{showprice[0]}.</Text>
                                                                                                <Text style={{ color: 'black', fontSize: hp(2.1), textAlign: 'center', fontFamily: 'Montserrat-Bold', marginBottom: 7 }}>{!showprice[1] ? '00' : showprice[1]}</Text>
                                                                                          </View>
                                                                                    </View>
                                                                                    <TouchableOpacity 
                                                                                    onPress={() =>{isDisable == true?null: this.showInfoPopup(parseInt(price[0]))}}
                                                                                    // onPress={() => { AlertUtil.show('Only Creator can invite') }}
                                                                                    >
                                                                                    <View style={styles.table_title_info_container}> 
                                                                                   
                                                                                         <Text style={styles.table_title_info_text}> i </Text>
                                                                                         
                                                                                          
                                                                                          </View>
                                                                                          </TouchableOpacity>
                                                                                         
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
                                          <Text style={{ color: '#68bcbc', fontSize: hp(1.9), textAlign: 'center', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline' }}>PROCEED TO CHECKOUT</Text>
                                    </TouchableWithoutFeedback>
                              </View>

                        </View>

                        <Dialog
          visible={this.state.infoDialog}
          title=""
         dialogStyle={{ backgroundColor: '#fff',borderRadius:4,height: 'auto',padding:0 }}
         contentStyle={{ padding:0, backgroundColor: '#fff' }}
          onTouchOutside={() => this.setState({ infoDialog: false })} >

         <View style={{padding:0}}>
          
            <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',paddingBottom:10}}>
            <View style={{width:'25%',paddingLeft:20,backgroundColor:'white'}}>
             <Image source={{ uri: this.state.imageBadge}} style={{ height: 50, width: 50,resizeMode:'contain'}} />
     
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
                              {/* i dialog ui */}


                        {/* -------------------------------- Guest User Dialogue --------------------------------*/}
                        <Dialog
                              visible={this.state.guestUserDialog}
                              title=""
                              onTouchOutside={() => this.setState({ guestUserDialog: false })} >

                              <View style={{ backgroundColor: "white" }}>

                                    <View style={{ justifyContent: "center", padding: 15, alignItems: 'center' }}>
                                          <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(1.6), marginTop: 10, color: 'black' }}>
                                          Please register/login to use UDDA app
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
