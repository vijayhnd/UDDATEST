import React from "react";
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { View, Text, TouchableWithoutFeedback, Platform, TouchableOpacity, BackHandler, Alert, Image, TextInput,TouchableHighlight, ImageBackground } from "react-native";
import styles from './styles';
import ImagePicker from "react-native-image-picker";
import Container from '../../../../Components/Container';
import LinkLabel from "../../../../Components/Text";
import InputBoxText from '../../../../Components/InputBox/Text';
import BigButton from '../../../../Components/Button/BigButton';
import CircleImage from "../../../../Components/CustomComponents/CircleImage";
import ListItemNext from "../../../../Components/CustomComponents/ListItemNext";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import UpdateProfileResponse from "../../../../Services/Profile/UpdateProfileResponse";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import LongButton from '../../../../Components/Button/LongButton';
import AlertUtil from "../../../../Util/AlertUtil";
import Application from "../../../../Entities/Application";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import UpdateProfileRequest from "../../../../Services/Profile/UpdateProfileRequest";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import UpdateProfileResponseParser from "../../../../Services/Profile/UpdateProfileResponseParser";
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInputListener } from "../../../../Components/InputBox/Mobile/InputBoxMobile";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { UDDAError } from "../../../../Entities";
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import { Dialog } from 'react-native-simple-dialogs';
import { Dropdown } from "react-native-material-dropdown"
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from '../../../../Services/Core/ServiceURI'
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/EvilIcons';
import Iconss from 'react-native-vector-icons/FontAwesome';
import Iconsm from 'react-native-vector-icons/MaterialIcons';
import Messgae from "../../../../Services/Core/Messages"
import Message from "../../../../Services/Core/Messages";
import Guestdialog from "../../../../Components/CustomComponents/Gues_dialog/Guest_dialog";

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
    my_bets: 'My Bets History',
    transaction_history: 'Transaction History',
    terms_of_use: 'Terms of Use',
    privacy_policy: 'Privacy Policy',
    private_bet_messeges: 'Private Bet Messeges'
  },
  log_out_button: 'LOG OUT',
  profile_save_success_message: 'Profile successfully saved',
  page: 1,
  update_button_text:'Upgrade Status',
  displayName_placeholder: 'USER NAME',
}

interface G_ProfileViewProps extends AppValidationComponentProps {
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
  displayName?: Field
  imageFilePath?: string
  AddressDialog: any;
  address_line_1: any,
  address_line_2: any,
  city: any,
  state: any,
  zipCode: any,
  country: any,
  loader: boolean,
  badgePath?: string
  guestUserDialog: boolean;
  levelNo:any;
  images:any;
  imageindex:any;
  shippingshow:any;
  leaguedata:any;
  allleaguedata:any;
  backimage:any;
  infoDialog:any;
  infoDataArray:any;
  shipping_address:any;
  profileChange:any;
  

}

enum ProfileScreenComponents {
  FirstNameInput = 1,
  LastNameInput,
  EmailInput,
  MobileInput,
 DisplayNameInput
}

const bottom_initial = 0;

export class G_ProfileView extends AppValidationComponent<G_ProfileViewProps, ProflieViewState> implements TextInputListener, ISubheaderListener, MenuIconListener {


  private firstNameFieldName = 'First name'
  private lastNameFieldName = 'Last name'
  private emailFieldName = 'Email'
  private mobileFieldName = 'Mobile'
  private photoFieldName = 'Photo'
  private displayNameFieldName = 'Display name'
  private serviceRequestInProgress = false
  private authorisationToken = Application.sharedApplication().user!.authenticationToken;
  private UserId = Application.sharedApplication().user!.id;

  constructor(props: G_ProfileViewProps) {
    super(props);
    this.state = {
      firstName: { name: this.firstNameFieldName, value: Application.sharedApplication().user!.profile.firstName },
      lastName: { name: this.lastNameFieldName, value: Application.sharedApplication().user!.profile.lastName! },
      email: { name: this.emailFieldName, value: Application.sharedApplication().user!.profile.email! },
      mobile: { name: this.mobileFieldName, value: Application.sharedApplication().user!.profile.phone! },
      photo: { name: this.photoFieldName, value: Application.sharedApplication().user!.profile.profilePic! },
      displayName: { name: this.displayNameFieldName, value: Application.sharedApplication().user!.profile.displayName! },
      imageFilePath: Application.sharedApplication().user!.profile.profilePic!,
      badgePath:Application.sharedApplication().user!.profile.level_array.status_badge,
      levelNo:Application.sharedApplication().user!.profile.level_array.level_id,
      contentInsetBottom: bottom_initial,
      AddressDialog: false,
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      loader: false,
      guestUserDialog: false,
      shippingshow: false,
      infoDialog: false,
      images:[
        'https://placeimg.com/640/640/nature',
        'https://placeimg.com/640/640/beer',
      ],
      imageindex:0,
      leaguedata:[],
      infoDataArray:[],
      allleaguedata:[],
      shipping_address:Application.sharedApplication().user!.profile.shipping_address,
      backimage:require('../../../../images/current-level-selected-bg.png'),
      profileChange:false,
    }
  }

  componentDidMount() {
    this.getProfile()
    this.getleauge()
   /// this.getShippingAddress()

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props) {
        RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
        return true;
      }

      return false;
    });

  }


  componentWillReceiveProps(nextProps: G_ProfileViewProps) {
    if (nextProps.listeners!.includes(this.constructor.name)) {
      if (nextProps.serviceKey === ServiceKeys.UpdateProfileServiceName) {
        switch (nextProps.requestStatus) {
          case ServiceRequestStatus.FinishedWithSuccess:
            this.serviceRequestInProgress = false
            AlertUtil.show(ProfilePageContent.profile_save_success_message)
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

  onTextChange(text: string, tag: number) {
    switch (tag) {
      case ProfileScreenComponents.FirstNameInput:
        this.setState({ firstName: { name: this.firstNameFieldName, value: text } })
        break
      case ProfileScreenComponents.LastNameInput:
        this.setState({ lastName: { name: this.lastNameFieldName, value: text } })
        break
      case ProfileScreenComponents.EmailInput:
        this.setState({ email: { name: this.emailFieldName, value: text } })
        break
      case ProfileScreenComponents.MobileInput:
        this.setState({ mobile: { name: this.mobileFieldName, value: text } })
        break
      case ProfileScreenComponents.DisplayNameInput:
        this.setState({ displayName: { name: this.displayNameFieldName, value: text } })
        break
    }
  }

  onFocus(tag: number) {

  }

  onEndEditing(tag: number) {

  }

  saveChangesButtonClicked() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
      console.log('454545');

    } else {
      var isRequestValid = this.validate({
        firstName: { required: true },
        lastName: { required: true },
       // email: { required: true, email: true },
       // mobile: { required: true, numbers: true }
      })
      if (isRequestValid) {
        var profileRequest = new UpdateProfileRequest()
        profileRequest.firstname = this.state.firstName!.value
        profileRequest.lastname = this.state.lastName!.value
        profileRequest.email = this.state.email!.value
        profileRequest.mobile = this.state.mobile!.value
        profileRequest.photo = this.state.profileChange? this.state.photo!.value:''
        profileRequest.displayname = this.state.displayName!.value
        profileRequest.address_line1 = this.state.shipping_address.address_line1
        profileRequest.address_line2 = this.state.shipping_address.address_line2
        profileRequest.city = this.state.shipping_address.city
        profileRequest.state = this.state.shipping_address.state
        // profileRequest.zipcode = '201301'
        profileRequest.zipcode = this.state.shipping_address.zipcode
        profileRequest.country = this.state.country
        // profileRequest.country = this.state.shipping_address.country

        var serviceAction = new ServiceAction()
        var responseParser = new UpdateProfileResponseParser()

        this.props.dispatch!(serviceAction.request(ServiceType.User,
          ServiceKeys.UpdateProfileServiceName,
          profileRequest,
          [this.constructor.name],
          responseParser))


      } else {
        AlertUtil.show(this.getErrorMessages())
      }
    }
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

  selectPhoto() {
    if (Application.sharedApplication().user!.profile.userType == 'Guest') {
      this.setState({ guestUserDialog: true });
      console.log('454545');

    } else {

      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
          this.setState({ photo: { name: this.photoFieldName, value: response.data }, imageFilePath: source.uri });
          this.setState({profileChange:true})
        }
      });
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

  }

  availableBalanceTapped() {

  }

  openPlaysTapped() {
    // this.props.navigation!.navigate(AppScreens.G_UddaContests);
    RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)
  }

  coveredPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
  }

  logoutButtonPressed() {
    Application.sharedApplication().logout();
    RouterBuilder.resetRouteTo(AppScreens.SplashLandingView, this.props) //garima

    // RouterBuilder.resetRouteTo(AppScreens.OnboardingStack, this.props)

  }

  gotoHistory() {
    RouterBuilder.replaceRouteTo(AppScreens.G_HistoryView, this.props)
  }

  gotoTermsOfUse() {
    this.props.navigation!.push(AppScreens.G_TermsOfUseView, {params:{type:'terms_and_conditions'}});
  }

  gotoPrivacyPolicy() {
    // this.props.navigation!.navigate(AppScreens.G_PrivacyPolicyView);
    this.props.navigation!.push(AppScreens.G_TermsOfUseView, {params:{type:'privacy_policy'}});
  }
  gotoContestRule() {
    // this.props.navigation!.navigate(AppScreens.G_PrivacyPolicyView);
    this.props.navigation!.push(AppScreens.G_TermsOfUseView, {params:{type:'contest_rules'}});
  }
  gotoPrivateBetMsg() {
    RouterBuilder.replaceRouteTo(AppScreens.G_PrivateBetMessgesView, this.props)
  }

  OpenAddressDialog() {
    this.setState({ AddressDialog: true });
  }

  saveUserAddress() {

  }

  ContesetJoinTapped() {

    this.props.navigation!.navigate(AppScreens.G_UddaContests);

  }

  // getShippingAddress() {
  //   fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/get_shipping_address/' + this.UserId, {
  //     method: 'GET',
  //     headers: {
  //       'authorisation': this.authorisationToken
  //     },

  //   }).then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({ loader: false });
  //       console.log('Success get_shipping_address' + JSON.stringify(responseJson.data));

  //       if (responseJson.data.length != 0) {
  //         this.setState({ address_line_1: responseJson.data.shipping_address.address_line1 });
  //         this.setState({ address_line_2: responseJson.data.shipping_address.address_line2 });
  //         this.setState({ city: responseJson.data.shipping_address.city });
  //         this.setState({ state: responseJson.data.shipping_address.state });
  //         this.setState({ zipCode: responseJson.data.shipping_address.zipcode });
  //         this.setState({ country: responseJson.data.shipping_address.country });
  //       }
  //       else {
  //         this.setState({ address_line_1: '' });
  //         this.setState({ address_line_2: '' });
  //         this.setState({ city: '' });
  //         this.setState({ state: '' });
  //         this.setState({ zipCode: '' });
  //         this.setState({ country: '' });
  //       }
  //       if (responseJson.message == "Access Expired.") {
  //         // AlertUtil.show("Session Expired ! Please login again");
  //         console.log("Footer comp ---->" + responseJson.message);
  //         LogoutUtill.logoutButtonPressed(this.props);
  //       }
  //     })
  //     .catch(error => {
  //       this.setState({ loader: false });
  //       console.log(error);
  //       AlertUtil.show('error ' + JSON.stringify(error));
  //     })
  // }

  getleauge() {
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/level/get_all_levels', {
    // fetch('http://uddadev.triazinesoft.com/index.php/v2_1/level/get_all_levels', {
      method: 'GET',
      headers: {
        'authorisation': this.authorisationToken
      },

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loader: false });
        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          LogoutUtill.logoutButtonPressed(this.props);
        }
        else{
        console.log('Success getleauge' + JSON.stringify(responseJson.data));

        if (responseJson.data.length != 0) {
          this.setState({allleaguedata:responseJson.data.level_array})
          this.setState({
            leaguedata: responseJson.data.level_array.map((x: any) => ({
              img: x.profile_badge,
              value: x.level_name,
            }))
          });
          console.log('league state data', this.state.leaguedata)
            responseJson.data.level_array.map((x: any,index) => {
             if(x.status_badge==this.state.badgePath)
             {
               this.setState({imageindex:index})
             }
            })
          // this.setState({ address_line_1: responseJson.data.shipping_address.address_line1 });
          // this.setState({ address_line_2: responseJson.data.shipping_address.address_line2 });
          // this.setState({ city: responseJson.data.shipping_address.city });
          // this.setState({ state: responseJson.data.shipping_address.state });
          // this.setState({ zipCode: responseJson.data.shipping_address.zipcode });
          // this.setState({ country: responseJson.data.shipping_address.country });
        }
        else {
          // this.setState({ address_line_1: '' });
          // this.setState({ address_line_2: '' });
          // this.setState({ city: '' });
          // this.setState({ state: '' });
          // this.setState({ zipCode: '' });
          // this.setState({ country: '' });
        }
      }
      })
      .catch(error => {
        this.setState({ loader: false });
        console.log(error);
        AlertUtil.show('error ' + JSON.stringify(error));
      })
  }

  // saveShippingAddress() {

  //   this.setState({ AddressDialog: false });   //garima

  //   if (Application.sharedApplication().user!.profile.userType == 'Guest') {
  //     this.setState({ guestUserDialog: true });

  //   } else {


  //     if (this.state.address_line_1 == "") {
  //       Alert.alert("Please Enter Address Line 1");
  //       return false;
  //     }
  //     else if (this.state.address_line_2 == "") {
  //       Alert.alert("Please Enter Address Line 2");
  //       return false;
  //     }
  //     else if (this.state.city == "") {
  //       Alert.alert("Please Enter City");
  //       return false;
  //     }
  //     else if (this.state.state == "") {
  //       Alert.alert("Please Enter State");
  //       return false;
  //     }
  //     else if (this.state.zipCode == "") {
  //       Alert.alert("Please Enter Zip Code");
  //       return false;
  //     }
  //     else if (this.state.country == "") {
  //       Alert.alert("Please Enter Country ");
  //       return false;
  //     }

  //     var params: any = {
  //       'address_line1': this.state.address_line_1,
  //       'address_line2': this.state.address_line_2,
  //       'city': this.state.city,
  //       'state': this.state.state,
  //       'zipcode': this.state.zipCode,
  //       'country': this.state.country
  //     };

  //     var formData = new FormData();

  //     for (var k in params) {
  //       formData.append(k, params[k]);
  //     }


  //     fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/api/shipping_address', {
  //       method: 'POST',
  //       headers: {
  //         'authorisation': this.authorisationToken
  //       },
  //       body: formData,
  //     }).then((response) => response.json())
  //       .then((responseJson) => {

  //         console.log('Success shipping_address' + JSON.stringify(responseJson));
  //         if (responseJson.message == 'success') {
  //           // AlertUtil.show('Shipping address updated successfully');
  //           AlertUtil.show('Shipping address updated successfully');
  //           // this.setState({AddressDialog: false })
  //           this.getShippingAddress()
  //         }
  //         if (responseJson.message == "Access Expired.") {
  //           // AlertUtil.show("Session Expired ! Please login again");
  //           console.log("Footer comp ---->" + responseJson.message);
  //           LogoutUtill.logoutButtonPressed(this.props);
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         AlertUtil.show('error ' + JSON.stringify(error));
  //       })

  //   }
  // }
  onChangeFilter(value: any) {
   
      // var a = this.state.shipping_address
      // a.country = value
      // this.setState({shipping_address:a})
    
   this.setState({ country: value });
  }

  goToInappPage() {
   // this.setState({ userStatusDialog: false });

    // this.props.navigation!.navigate(AppScreens.G_LoginPage);

     //this.props.navigation!.navigate(AppScreens.G_InAppPurchaseUpdateIOS);
     this.props.navigation!.replace(AppScreens.G_InAPPPurchaseViewIOS,{params:{callFrom:'userLevel'}});
    //this.props.navigation!.navigate(AppScreens.G_ParticipantList);
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

  infodialog(){
    this.setState({infoDataArray:this.state.allleaguedata[this.state.imageindex].access_bets})
    this.setState({infoDialog:true})
  }
  render() {

    let data2 = [ {
      value: 'USA',
    }];
    // const images = [
      
    //   {img:this.state.badgePath,value:'hall of flame'},
    //   {img:'https://placeimg.com/640/640/nature',value:'Hello'},
    //   {img:this.state.badgePath,value:'All Flame'},
    //   {img:'https://placeimg.com/640/640/beer',value:'Tuborg'},
    // ];
    const images =this.state.leaguedata
    return (
      <Container title={ProfilePageContent.page_title}
        isHeader={true}
        isSubHeader={true}
        isTitle={false}
        showIndicator={this.serviceRequestInProgress}
        menuIconListener={this}
        LogoIconListener={this}
        isSetting={false}
        accountNameListener={this}
        availableBalanceListener={this}
        coveredPlaysListener={this}
        openPlaysListener={this}>

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.scrollContent}
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 0, bottom: this.state.contentInsetBottom }}
          scrollEnabled={true}
          bounces={false}
        >

<Dialog
          visible={this.state.infoDialog}
          title=""
         dialogStyle={{ backgroundColor: '#fff',borderRadius:4,height: 'auto',padding:0 }}
         contentStyle={{ padding:0, backgroundColor: '#fff' }}
          onTouchOutside={() => this.setState({ infoDialog: false })} >

         <View style={{padding:0}}>
          
            <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',paddingBottom:10}}>
            <View style={{width:'25%',paddingLeft:20,backgroundColor:'white'}}>
             <Image source={{ uri:images.length==0?null:images[this.state.imageindex].img}} style={{ height: this.state.imageindex==0? 80:50, width:this.state.imageindex==0? 80: 50,resizeMode:'contain'}} />
     
            </View>
                    <View style={{width:'75%',justifyContent:'center',paddingLeft:3}}>
                          <View style={{alignContent:'flex-end',alignItems:'flex-end',paddingRight:3}}>
                          <TouchableOpacity onPress={() => this.setState({ infoDialog: false })}>
              <View style={[styles.CloseView,{paddingRight:10}]}>
              <Icons name="close" size={20} color="grey"/>
                {/* <Image source={require('../../../../images/close.png')} style={{ height: 12, width: 12,tintColor:'white' }}></Image> */}
              </View>
            </TouchableOpacity>
                          </View>
                          <View style={{marginBottom:15}}>
                          <Text style={{fontSize: hp(2.2), fontFamily: 'Montserrat-SemiBold',color:'#222'}}>{this.state.allleaguedata.length==0?null:this.state.allleaguedata[this.state.imageindex].expiration_date? 'Valid until:':null} <Text style={{fontSize: hp(2.6), fontFamily: 'Montserrat-Bold',color:'#222'}}>{this.state.allleaguedata.length==0?null: this.state.allleaguedata[this.state.imageindex].expiration_date}</Text> </Text>
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
          {/* -------------------------------- Address Dialog --------------------------------*/}
          <Dialog
            visible={this.state.AddressDialog}
            title=""
            onTouchOutside={() => this.setState({ AddressDialog: false })} >
            <View style={{ backgroundColor: "white", borderRadius: 7 }}>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ width: '85%', paddingHorizontal: 17, paddingTop: 10 }}>
                  <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0), color: 'black' }}>SHIPPING ADDRESS</Text>
                </View>
                <View style={{ width: '15%', padding: 10 }}>
                  <TouchableWithoutFeedback onPress={() => { this.setState({ AddressDialog: false }) }}>
                    <Image source={require('../../../../images/close_icon.png')} style={{ height: 15, width: 15, alignSelf: 'center' }}></Image>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              <View style={{ padding: 6, }}>
                <View style={{ padding: 6 }}>
                  <TextInput
                    value={this.state.address_line_1}
                    onChangeText={(text) => this.setState({ address_line_1: text })}
                    returnKeyType='done'
                    style={{ padding: 6, fontFamily: 'Montserrat-Bold', fontSize: hp(1.5), width: '100%', borderColor: '#a6a6a6', borderWidth: 1 }}
                    placeholder='Address Line 1'
                    placeholderTextColor={'#a6a6a6'}
                  />
                  <Text style={{ paddingHorizontal: 10, fontFamily: 'Montserrat-Regular', fontSize: hp(1.2), color: '#a6a6a6' }}>Street Address, PO Box</Text>
                </View>

                <View style={{ padding: 6 }}>
                  <TextInput
                    value={this.state.address_line_2}
                    onChangeText={(text) => this.setState({ address_line_2: text })}
                    returnKeyType='done'
                    style={{ padding: 6, fontFamily: 'Montserrat-Bold', fontSize: hp(1.5), width: '100%', borderColor: '#a6a6a6', borderWidth: 1 }}
                    placeholder='Address Line 2'
                    placeholderTextColor={'#a6a6a6'}
                  />
                  <Text style={{ paddingHorizontal: 10, fontFamily: 'Montserrat-Regular', fontSize: hp(1.2), color: '#a6a6a6' }}>Apartment, Suite, Unit, Building, Floor, etc.</Text>
                </View>

                <View style={{ padding: 6 }}>
                  <TextInput
                    value={this.state.city}
                    onChangeText={(text) => this.setState({ city: text })}
                    returnKeyType='done'
                    style={{ padding: 6, fontFamily: 'Montserrat-Bold', fontSize: hp(1.5), width: '100%', borderColor: '#a6a6a6', borderWidth: 1 }}
                    placeholder='City'
                    placeholderTextColor={'#a6a6a6'}
                  />
                </View>

                <View style={{ padding: 6 }}>
                  <TextInput
                    value={this.state.state}
                    onChangeText={(text) => this.setState({ state: text })}
                    returnKeyType='done'
                    style={{ padding: 6, fontFamily: 'Montserrat-Bold', fontSize: hp(1.5), width: '100%', borderColor: '#a6a6a6', borderWidth: 1 }}
                    placeholder='State/ Province/ Region'
                    placeholderTextColor={'#a6a6a6'}
                  />
                </View>

                <View style={{ padding: 6 }}>
                  <TextInput
                    value={this.state.zipCode}
                    onChangeText={(text) => this.setState({ zipCode: text })}
                    returnKeyType='done'
                    style={{ padding: 6, fontFamily: 'Montserrat-Bold', fontSize: hp(1.5), width: '100%', borderColor: '#a6a6a6', borderWidth: 1 }}
                    placeholder='ZIP'
                    placeholderTextColor={'#a6a6a6'}
                  />
                </View>

                <View style={{ padding: 6 }}>
                  <View style={{ flexDirection: 'row', width: "100%", borderColor: '#a6a6a6', borderWidth: 1 }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(1.5), color: '#a6a6a6', width: '70%', alignSelf: 'center', paddingHorizontal: 8 }}>
                      Country
                    </Text>
                    <Dropdown
                      containerStyle={{ paddingLeft: 10, width: '30%' }}
                      dropdownOffset={{ top: 0, left: 0, }}
                      dropdownMargins={{ min: 0, max: 0 }}
                      dropdownPosition={-4.2}
                      itemTextStyle={{ paddingLeft: 10, fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: hp(1.5), width: '100%', marginTop: 7 }}
                      data={data2}
                      value={this.state.country}
                      onChangeText={value => this.onChangeFilter(value)}
                      fontSize={hp(1.6)}
                    />
                  </View>
                </View>

                <View style={{ marginVertical: 15, paddingHorizontal: 7 }}>
                  <LongButton title='SAVE'
                    enabled={true}
                    buttonStyle={{ backgroundColor: '#68bcbc' }}
                   // listener={this.saveShippingAddress.bind(this)}
                    />
                </View>


              </View>


            </View>
          </Dialog>

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

          <View style={styles.mainContent}>
          <View style={[{width:'100%',justifyContent:'center',flexDirection:'row'}]}>
          <View style={{width:'10%',justifyContent:'center'}}>
          <Iconsm name="arrow-back" size={30} color="black" style={{ marginLeft: 5,marginTop:5 }}
                onPress={() => this.props.navigation?.goBack(null)}
              />
              </View>
          

            <View style={[styles.NameHeaderContainer,{width:'90%'}]}>
              <View style={{}}>
                <Text style={styles.NameStyle}>PROFILE</Text>
              </View>

              {/* <View style={{ width: '40%', flexDirection: 'row', paddingRight: 10  }}>
                <Text style={styles.levelStyle}>User Level:</Text>
                <Text style={styles.levelAnsStyle}>BEGINNER</Text>
              </View> */}
            </View>
            </View>


            <View style={styles.profileDetailsContainer}>
              <View >
              <TouchableWithoutFeedback onPress={() => {
                this.selectPhoto()
              }}>
                <View style={styles.profilePhotoContainer}>
                  <View style={styles.photoContainer}>
                    <CircleImage width={wp(25)} imageFilePath={this.state.imageFilePath} />
                  </View>
                  <View style={styles.changePhotoTextWrapper}>
                  <Text  style={{ color: '#68bcbc', fontSize: hp(1.4), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}> {ProfilePageContent.change_photo}</Text>
                    {/* <LinkLabel text={ProfilePageContent.change_photo} style={styles.change_photo_text} /> */}
                  </View>
                </View>
              </TouchableWithoutFeedback>
{ this.state.levelNo == '5'?
  <TouchableWithoutFeedback >  
    <View  >
      <View style={{alignContent:'center',alignItems:'center',flexDirection:'row',marginLeft:5}} >
        <View style={{justifyContent:'center',alignContent:'center',width:20}}>
        {this.state.imageindex == 0?null:<Icon onPress={()=>{
          if(this.state.imageindex == 0)
         {
          //AlertUtil.show('icons are working!')
         }else{
          
            var a = this.state.imageindex - 1 
          this.setState({imageindex:a})
          if(this.state.badgePath==images[a].img)
          {
            this.setState({backimage:require('../../../../images/current-level-selected-bg.png')})
          }else{
            this.setState({backimage:require('../../../../images/level-name-gray-bg.png')})
          }
         // alert(this.state.imageindex)
        }}}
          name="chevron-thin-left" size={20} style={{marginTop:6}} color="#68bcbc"/>}
          </View> 
      
    {images[this.state.imageindex]?   <Image source={{ uri: images.length==0?null: images[this.state.imageindex].img}} style={{ height: 50, width: 80,resizeMode:'contain'}} />   :null}   
      <View style={{justifyContent:'center',alignContent:'center',width:24}}>
     {this.state.leaguedata.length-1 == this.state.imageindex?null: <Icon onPress={()=>{
          if(this.state.leaguedata.length-1 == this.state.imageindex)
        {
          //  AlertUtil.show('icons are working!')
      }else {
        // alert('length :'+ this.state.leaguedata.length + 'index : '+ this.state.imageindex)
           var a = this.state.imageindex + 1 
          this.setState({imageindex:a})
          if(this.state.badgePath==images[a].img)
          {
            this.setState({backimage:require('../../../../images/current-level-selected-bg.png')})
          }else{
            this.setState({backimage:require('../../../../images/level-name-gray-bg.png')})
          }
          
         }
        }} name="chevron-thin-right" size={20}style={{marginTop:6}} color="#68bcbc"/>}
          </View> 
      </View>
      <ImageBackground source={this.state.backimage}
        resizeMode="stretch"
        style={{ width: '100%', height: 30, marginTop: 10 }}>
          <TouchableOpacity onPress={() => { this.infodialog() }}style={{  marginTop: 1 }} >
 <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:5}}>
      <Text style={{color: '#68bcbc', fontSize:this.state.imageindex==3? hp(1.5): hp(2.0), fontFamily: 'Montserrat-Bold',textAlign:'center'}}>{images.length==0?null:images[this.state.imageindex].value}</Text>
      <View style={[styles.table_title_info_container,{marginBottom:5,marginLeft:5}]}>
                  
                      <Text style={styles.table_title_info_text}> i </Text>
                     
                    </View>
      </View>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  </TouchableWithoutFeedback>
:
              <TouchableWithoutFeedback 
              // onPress={() => {this.goToInappPage()}}
              >

              {}  
                <View >
                <View style={{alignContent:'center',alignItems:'center',flexDirection:'row',marginLeft:5}} >
        <View style={{justifyContent:'center',alignContent:'center',width:20}}>
        {this.state.imageindex == 0?null:<Icon onPress={()=>{
          if(this.state.imageindex==0)
         {
          //AlertUtil.show('icons are working!')
         }else{ var a = this.state.imageindex - 1 
          this.setState({imageindex:a})
          if(this.state.badgePath==images[a].img)
          {
            this.setState({backimage:require('../../../../images/current-level-selected-bg.png')})
          }else{
            this.setState({backimage:require('../../../../images/level-name-gray-bg.png')})
          }
        
        }
        }} name="chevron-thin-left" size={20} style={{marginTop:8}} color="#68bcbc"/>}
          </View> 
      
      <Image
      //  source={{  uri:this.state.badgePath}} 
       source={{  uri:images.length==0?null: images[this.state.imageindex].img}} 
       style={{ height: 50, width: 80,resizeMode:'contain'}} />      
      <View style={{justifyContent:'center',alignContent:'center',width:24}}>

      {this.state.leaguedata.length-1 == this.state.imageindex?null:<Icon onPress={()=>{
         if(this.state.leaguedata.length-1 == this.state.imageindex)
         {
           //  AlertUtil.show('icons are working!')
         }else{
           var a = this.state.imageindex + 1 
          this.setState({imageindex:a})
          if(this.state.badgePath==images[a].img)
          {
            this.setState({backimage:require('../../../../images/current-level-selected-bg.png')})
          }else{
            this.setState({backimage:require('../../../../images/level-name-gray-bg.png')})
          }
          
         }
          }} name="chevron-thin-right" size={20}style={{marginTop:8}} color="#68bcbc"/>}

          </View> 
      </View>
      <ImageBackground source={this.state.backimage}
        resizeMode="stretch"
        style={{ width: '100%', height: 30, marginTop: 10 }}>
          <TouchableOpacity onPress={() => { this.infodialog() }} >
 <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:5}}>
      <Text style={{color: '#68bcbc', fontSize:this.state.imageindex==3? hp(1.5): hp(2.0), fontFamily: 'Montserrat-Bold',textAlign:'center'}}>{images.length==0?null:images[this.state.imageindex].value}</Text>
      <View style={[styles.table_title_info_container,{marginBottom:5,marginLeft:5}]}>
                  
                      <Text style={styles.table_title_info_text}> i </Text>
                     
                    </View>
      </View>
      </TouchableOpacity>
      </ImageBackground>
                  <View style={styles.changePhotoTextWrapper}>
                    {/* <LinkLabel  text={ProfilePageContent.update_button_text} style={styles.change_photo_text} /> */}
            <Text onPress={() => {this.goToInappPage()}}  style={{ color: '#68bcbc', fontSize: hp(1.4), fontFamily: 'Montserrat-Bold', textAlign: 'center', textDecorationLine: 'underline' }}> {ProfilePageContent.update_button_text}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
 }
              </View>
              

              <View style={styles.profileFieldsContainer}>
                <View style={styles.inputBoxesWrapper}>
                  <View style={styles.inputBoxWrapper}>
                    <InputBoxText placeHolderText={ProfilePageContent.firstName_placeholder}
                      style={styles.inputBoxTextStyle}
                      tag={ProfileScreenComponents.FirstNameInput}
                      listener={this}
                      initialValue={this.state.firstName!.value} />
                  </View>




                  <View style={styles.inputBoxWrapper}>
                    <InputBoxText placeHolderText={ProfilePageContent.lastName_placeholder}
                      style={styles.inputBoxTextStyle}
                      tag={ProfileScreenComponents.LastNameInput}
                      listener={this}
                      initialValue={this.state.lastName!.value} />
                  </View>
                  <View style={styles.inputBoxWrapper}>
                    <InputBoxText placeHolderText={ProfilePageContent.displayName_placeholder}
                      style={styles.inputBoxTextStyle}
                      tag={ProfileScreenComponents.DisplayNameInput}
                      listener={this}
                      initialValue={this.state.displayName!.value} />
                  </View>
                  <View style={styles.inputBoxWrapper}>
                    <InputBoxText placeHolderText={ProfilePageContent.email_placeholder}
                      style={styles.inputBoxTextStyle}
                      keyboardType={'email-address'}
                      tag={ProfileScreenComponents.EmailInput}
                      listener={this}
                      editable={Application.sharedApplication().user!.profile.email=='' || Application.sharedApplication().user!.profile.email==null?true:false}
                      selectTextOnFocus={false}
                      initialValue={this.state.email!.value} />
                  </View>
                  <View style={styles.inputBoxWrapper}>
                    <InputBoxText placeHolderText={ProfilePageContent.mobile_placeholder}
                      style={styles.inputBoxTextStyle}
                      keyboardType={'phone-pad'}
                      tag={ProfileScreenComponents.MobileInput}
                      listener={this}
                      editable={Application.sharedApplication().user!.profile.phone=='' || Application.sharedApplication().user!.profile.phone==null ?true:false}
                      selectTextOnFocus={false}
                      initialValue={this.state.mobile!.value} />
                  </View>
                  {/* <View style={styles.inputBoxWrapper}>
                    <InputBoxText placeHolderText={ProfilePageContent.displayName_placeholder}
                      style={styles.inputBoxTextStyle}
                      tag={ProfileScreenComponents.DisplayNameInput}
                      listener={this}
                      initialValue={this.state.displayName!.value} />
                  </View> */}
                  <View style={[styles.inputBoxWrapper,{justifyContent:'flex-end',alignItems:'flex-end',alignContent:'flex-end',paddingTop:10,flexDirection:'row'}]}>
                   <TouchableOpacity onPress={()=>{this.setState({shippingshow:!this.state.shippingshow})}}>
                     <View style={{flexDirection:'row'}}>
                     <Text style={{ fontSize: hp(2.0), fontFamily: 'Montserrat-SemiBold', color:'#68bcbc'}}>More</Text>
                   {this.state.shippingshow?<Iconss onPress={()=>{this.setState({shippingshow:!this.state.shippingshow})}} name="caret-up" size={30} style={{paddingLeft:5,marginTop:-5}} color="#68bcbc"/>:<Iconss onPress={()=>{this.setState({shippingshow:!this.state.shippingshow})}} name="caret-down" size={30} style={{paddingLeft:5,marginTop:-5}} color="#68bcbc"/>}
                     </View>
                   </TouchableOpacity>
                  </View>

                  
                </View>
                
              </View>
              
            </View>
            <View style={{backgroundColor:'#EEEEEE'}}>
            {this.state.shippingshow ?<View style={{marginLeft:10,marginRight:10}}>
            <View style={[{justifyContent:'center',alignItems:'center',alignContent:'center',paddingTop:5}]}>
                   <Text style={{ fontSize: hp(1.8), fontFamily: 'Montserrat-SemiBold', color:'black'}}>Shipping Address</Text>
                  </View>
                  <View style={[styles.customtextinput,{width: '98%'}]}>
                <TextInput
                  value={this.state.shipping_address.address_line1}
                  clearTextOnFocus={true}
                  style={{ paddingLeft:10,height:hp(6), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                  placeholder='Address Line 1'
                  placeholderTextColor={'#c3c3c3'}
                   onChangeText={(text) => {
                     var a = this.state.shipping_address
                     a.address_line1 = text
                     this.setState({shipping_address:a})
                    }}
                  // editable={this.state.customBetDate?false:true}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
              <View style={{width: '98%'}}>
                <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', color:'grey',paddingTop:5,paddingBottom:5}}>Street Address, PO BOX</Text>
              </View>
              <View style={[styles.customtextinput,{width: '98%'}]}>
                <TextInput
                  value={this.state.shipping_address.address_line2}
                  clearTextOnFocus={true}
                  style={{ paddingLeft:10,height:hp(6), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                  placeholder='Address Line 2'
                  placeholderTextColor={'#c3c3c3'}
                  onChangeText={(text) => {
                    var a = this.state.shipping_address
                    a.address_line2 = text
                    this.setState({shipping_address:a})
                   }}
                  // onChangeText={(text) => { this.onchangeanswere(text) }}
                  // editable={this.state.customBetDate?false:true}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
              <View style={{width: '98%'}}>
                <Text style={{ fontSize: hp(1.5), fontFamily: 'Montserrat-SemiBold', color:'grey',paddingTop:5,paddingBottom:5}}>Apartment, Suite, Unit, Buiding, Floor, etc</Text>
              </View>
              <View style={{width:'98%',flexDirection:'row'}}>
              <View style={[styles.customtextinput,{width: '49%'}]}>
                <TextInput
                  value={this.state.shipping_address.city}
                  clearTextOnFocus={true}
                  style={{ paddingLeft:10,height:hp(6), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                  placeholder='City'
                  placeholderTextColor={'#c3c3c3'}
                  onChangeText={(text) => {
                    var a = this.state.shipping_address
                    a.city = text
                    this.setState({shipping_address:a})
                   }}
                  // onChangeText={(text) => { this.onchangeanswere(text) }}
                  // editable={this.state.customBetDate?false:true}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
              <View style={{width: '2%'}}></View>
              <View style={[styles.customtextinput,{width: '49%'}]}>
                <TextInput
                  value={this.state.shipping_address.state}
                  clearTextOnFocus={true}
                  style={{ paddingLeft:10,height:hp(6), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                  placeholder='State/Province/Region'
                  placeholderTextColor={'#c3c3c3'}
                  onChangeText={(text) => {
                    var a = this.state.shipping_address
                    a.state = text
                    this.setState({shipping_address:a})
                   }}
                  // onChangeText={(text) => { this.onchangeanswere(text) }}
                  // editable={this.state.customBetDate?false:true}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
              </View>
              <View style={{width:'98%',flexDirection:'row'}}>
              <View style={[styles.customtextinput,{width: '49%'}]}>
                <TextInput
                  value={this.state.shipping_address.zipcode}
                  clearTextOnFocus={true}
                  style={{ paddingLeft:10,height:hp(6), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                  placeholder='Zip'
                  placeholderTextColor={'#c3c3c3'}
                  onChangeText={(text) => {
                    var a = this.state.shipping_address
                    a.zipcode = text
                    this.setState({shipping_address:a})
                   }}
                  // onChangeText={(text) => { this.onchangeanswere(text) }}
                  // editable={this.state.customBetDate?false:true}
                  // onBlur={Keyboard.dismiss}
                />
              </View>
              <View style={{width: '2%'}}></View>
              <View style={[styles.customtextinput,{width: '49%',justifyContent:'center',alignItems:'center',alignContent:'center'}]}>
              <Dropdown
                      containerStyle={{ paddingLeft: 10, width: '90%' }}
                      dropdownOffset={{ top: 0, left: 0, }}
                      dropdownMargins={{ min: 0, max: 0 }}
                      dropdownPosition={-4.2}
                      itemTextStyle={{ paddingLeft: 10, fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: hp(1.5), width: '100%', marginTop: 7 }}
                      data={data2}
                      value={this.state.country}
                      onChangeText={value => this.onChangeFilter(value)}
                      fontSize={hp(1.6)}
                    />
                {/* <TextInput
                  value={this.state.country}
                  clearTextOnFocus={true}
                  style={{ paddingLeft:10,height:hp(6), fontFamily: 'Montserrat-Semibold', fontSize: hp(2.1), }}
                  placeholder='Country'
                  placeholderTextColor={'#c3c3c3'}
                  // onChangeText={(text) => { this.onchangeanswere(text) }}
                  // editable={this.state.customBetDate?false:true}
                  // onBlur={Keyboard.dismiss}
                /> */}
              </View>
              </View>
            </View>:null}
                <View style={[styles.buttonWrapper,{marginLeft:10,marginRight:10}]} >
                  <LongButton title={ProfilePageContent.save_changes_button}
                    buttonStyle={{ backgroundColor: '#68bcbc' }}
                    enabled={true}
                    listener={this.saveChangesButtonClicked.bind(this)} />
                </View>
            </View>
            <View style={styles.profileSettingsContainer}>
              <View style={styles.settingsItemsWrapper}>


                {/* <View style={styles.settingsItem}>
                  <TouchableOpacity style={{ height: 'auto', width: '100%' }} onPress={() => { this.OpenAddressDialog() }}>
                    <ListItemNext title={ProfilePageContent.settings.shipping_address}></ListItemNext>
                  </TouchableOpacity>
                </View> */}

                <View style={styles.settingsItem}>
                  <TouchableOpacity style={{ height: 'auto', width: '100%' }} onPress={() => { this.gotoHistory() }}>
                    <ListItemNext title={ProfilePageContent.settings.my_bets}></ListItemNext>
                  </TouchableOpacity>
                </View>

                {/* <View style={styles.settingsItem}>
                  <TouchableOpacity style={{ height: 'auto', width: '100%' }} onPress={() => { this.gotoPrivateBetMsg() }}>
                    <ListItemNext title={ProfilePageContent.settings.private_bet_messeges}></ListItemNext>
                  </TouchableOpacity>
                </View> */}

                <View style={styles.settingsItem}>
                  <TouchableOpacity style={{ height: 'auto', width: '100%' }} onPress={() => { this.gotoTermsOfUse() }}>
                    <ListItemNext title={ProfilePageContent.settings.terms_of_use}></ListItemNext>
                  </TouchableOpacity>
                </View>

                <View style={styles.settingsItem}>
                  <TouchableOpacity style={{ height: 'auto', width: '100%' }} onPress={() => { this.gotoPrivacyPolicy() }}>
                    <ListItemNext title={ProfilePageContent.settings.privacy_policy}></ListItemNext>
                  </TouchableOpacity>
                </View>

                <View style={styles.settingsItem}>
                  <TouchableOpacity style={{ height: 'auto', width: '100%' }} onPress={() => { this.gotoContestRule() }}>
                    <ListItemNext title={'Contest Rules'}></ListItemNext>
                  </TouchableOpacity>
                </View>

              </View>
              <View style={styles.log_out_wrapper}>
                {Application.sharedApplication().user!.profile.userType != 'Guest' ?
                  <View style={styles.log_out_button_wrapper}>
                    <BigButton title={ProfilePageContent.log_out_button}
                      style={[styles.log_out_button, { backgroundColor: '#68bcbc' }]}
                      textStyle={styles.log_out_button_text_style}
                      listener={this.logoutButtonPressed.bind(this)} />
                  </View> : <View style={styles.log_out_button_wrapper}>
                    <BigButton title='REGISTER'
                      style={[styles.log_out_button, { backgroundColor: '#68bcbc' }]}
                      textStyle={styles.log_out_button_text_style}
                      listener={this.loginButtonPressed.bind(this)} />
                  </View>
                }
              </View>
            </View>
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

export default connect(mapStateToProps)(G_ProfileView);