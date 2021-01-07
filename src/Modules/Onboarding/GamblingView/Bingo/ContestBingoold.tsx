import React, { createRef, useState } from "react";
import { View, Text, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, TextInput, TouchableHighlight, Animated, Keyboard, Dimensions, UIManager, Share,Modal,ImageBackground } from "react-native";
import { Divider } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import Container from '../../../../Components/Container';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import AlertUtil from "../../../../Util/AlertUtil";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import RouterBuilder from "../../../../Router";
import AppScreens from "../../../../Util/AppScreens";
import Application from "../../../../Entities/Application";
import ProgressLoader from 'rn-progress-loader';
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import { Dialog } from 'react-native-simple-dialogs';
import BigButton from "../../../../Components/Button/BigButton";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from "../../../../Services/Core/ServiceURI"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleSwitch from 'toggle-switch-react-native'
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment';
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";

import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { connect } from 'react-redux';
import { UDDAError } from "../../../../Entities";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import ReferralService from "../../../../Services/Referral/ReferralService";
import DateTimePicker from "react-native-modal-datetime-picker";
import BingoDetailComponent from './bingoDetailComponent'
var update = require('immutability-helper');
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
    key: 'somethun',
    page_title: 'CREATE BINGO',
}

interface G_ContestBingoViewProps extends AppValidationComponentProps {
    getProfileRequestStatus?: ServiceRequestStatus
    getProfileResponse?: GetProfileResponse
    getProfileError?: UDDAError

    serviceKey?: string
    listeners?: any
}

interface G_ContestBingoViewState extends AppValidationComponentState {
    
    shift: any;
    loader: any;
    data: any;
    bingodata: any;
    detailmodel: any;
    contestdata: any;
    bingoid: any;
    selectedgift: any;
    selectedCard:any;
    
}

class G_ContestBingoView extends AppValidationComponent<G_ContestBingoViewProps, G_ContestBingoViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    public keyboardDidShowSub: any;
    public keyboardDidHideSub: any;
    public keyBoardType = 'decimal-pad';
    private serviceRequestInProgress = false
    public touchable;
    private referralservice = new ReferralService(); //Vijay
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    focusListener: any;
    
    constructor(props: G_ContestBingoViewProps) {
        super(props);
        this.touchable = createRef();
        this.state = {
           
            
            shift: new Animated.Value(0),
            loader: false,
            detailmodel: false,
            contestdata: {},
            data:['1','2','3','4','5'],
            bingodata:['1','2','3','4','5','1','2','3','4','5','1','2','3','4','5','1','2','3','4','5','1','2','3','4','5'],
            bingoid:'',
            selectedgift:[],
            selectedCard:[]
        };
    }

    
   async componentDidMount() {
       // console.log(this.props.navigation.state.params.bingo_data);
       this.getcontestDetail(this.props.navigation.state.params.bingo_data);
        
    }
   
    componentWillUnmount() {
        
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();

    }


    componentWillMount() {
      //  alert('hi')
        console.log("componentwillmount");
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }

    handleKeyboardDidShow = (event: any) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField() || 0;
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight + fieldHeight + fieldHeight) || 0;
            if (gap >= 0) {
                return;
            }
            Animated.timing(
                this.state.shift,
                {
                    toValue: gap,
                    duration: 300,
                    useNativeDriver: true,
                }
            ).start();
        });
    }

    handleKeyboardDidHide = () => {
        Animated.timing(
            this.state.shift,
            {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }
        ).start();
    }

    // ----------------------------------------------- API calling ---------------------------------------







  
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
    componentWillReceiveProps(nextProps: G_ContestBingoViewProps) {
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
            else if (nextProps.serviceKey === ServiceKeys.CustomSquareName) {  // Custom bet response 
                switch (nextProps.requestStatus) {
                    case ServiceRequestStatus.FinishedWithSuccess:
                        this.serviceRequestInProgress = false;
                        // console.log("betaFriendResponse " + JSON.stringify(nextProps.CustomSquareResponse));
                        var response = nextProps.CustomSquareResponse!.response;
                        if (response.message == 'success') {
                            // this.getProfile();
                            console.log("custom bet success");

                            //this.onChangeQuarter('3');

                          //  this.shareOption(response, 'CUSTOMSQUARE');
                        }
                        else {
                            AlertUtil.show('Unsuccesful :' + response.message);
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
    // ----------------------------------------------- Api calling ---------------------------------------
    getcontestDetail(value:any) {

        this.setState({ loader: true });           
        fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/custom_bingo/contest_view_bingo_info/'+ value.id, {
          method: 'GET',
          headers: {
            'authorisation': this.authorisationToken
          },
         
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log('bingo_gift contest response : ' + JSON.stringify(responseJson)); 
            this.setState({ loader: false });
            
              this.setState({ contestdata: responseJson.data.custom_bingo_info });
              this.setState({ bingoid: responseJson.data.custom_bingo_info.id });
              // var card = responseJson.data.user_bingo_cards;

              // card.splice(12,0,{
              //   "gift_id": "1000",
              //   "gift_name": "ashish"
              // });
              // console.log('splice data : ',card)
              this.setState({ bingodata: responseJson.data.user_bingo_cards });

            //   var a =  moment(this.state.gamedetail.game_start_time_stamp * 1000).format('LT') +' '+ new Date(this.state.gamedetail.game_start_time_stamp * 1000).toString().split(' ')[6].toString().substr(1, new Date(this.state.gamedetail.game_start_time_stamp * 1000).toString().split(' ')[6].length - 2) +' '+ moment(this.state.gamedetail.game_start_time_stamp * 1000).format('LL')
            //   this.setState({gamedetailtime:a})
            //   this.setState({detailmodel:true})

    
    
            // console.log('Success openplay gamedetail :  ',JSON.stringify(this.state.data));
            // this.setState({ dialogVisible: true });
            if (responseJson.message == "Access Expired.") {
               AlertUtil.show("Session Expired ! Please login again");
              console.log("Footer comp ---->" + responseJson.message);
              // LogoutUtill.logoutButtonPressed(this.props);
            }
          })
          .catch(error => {
            this.setState({ loader: false });
            console.log(error);
          })           
      }

      Statusupdate(value:any){
        this.setState({loader:true})
      
      var params: any = {
          'bingo_id':this.state.bingoid,     
          'match_status':value,     
        };
        //1 for start
        //2 for close
        //3 for cancel
    console.log('create bingo paramete',params)
        var formData = new FormData();
    
        for (var k in params) {
          formData.append(k, params[k]);
        }
    
        fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Custom_bingo/match_status_update_by_host', {
          method: 'POST',
          headers: {
            'authorisation': this.authorisationToken
          },
          body: formData,
        }).then((response) => response.json())
          .then((responseJson) => {
            var that = this;
           
          //   this.setState({ customProbBetList: responseJson.data });
        
              AlertUtil.showSingleActionMessage(responseJson.message,function()
              {
                that.setState({ loader: false });
                that.getcontestDetail(that.props.navigation.state.params.bingo_data)
              });
             
          
    
    
            console.log('create bingo response' + JSON.stringify(responseJson));
            // this.setState({ dialogVisible: true });
            if (responseJson.message == "Access Expired.") {
              // AlertUtil.show("Session Expired ! Please login again");
              console.log("Footer comp ---->" + responseJson.message);
              // LogoutUtill.logoutButtonPressed(this.props);
            }
          })
          .catch(error => {
            this.setState({ loader: false });
            console.log(error);
          })
    }


    CancelBingo(){
        this.setState({loader:true})
      
      var params: any = {
          'bingo_id':this.state.bingoid,     
        };
    console.log('create bingo paramete',params)
        var formData = new FormData();
    
        for (var k in params) {
          formData.append(k, params[k]);
        }
    
        fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Custom_bingo/bingo_cancelled_by_host', {
          method: 'POST',
          headers: {
            'authorisation': this.authorisationToken
          },
          body: formData,
        }).then((response) => response.json())
          .then((responseJson) => {
            that.setState({ loader: false });
          //   this.setState({ customProbBetList: responseJson.data });
          var that = this;
          that.getcontestDetail(that.props.navigation.state.params.bingo_data)

              AlertUtil.showSingleActionMessage(responseJson.message,function(){

                that.setState({ loader: false }); 
                that.getcontestDetail(that.props.navigation.state.params.bingo_data)
              });
             
          
    
    
            console.log('create bingo response' + JSON.stringify(responseJson));
            // this.setState({ dialogVisible: true });
            if (responseJson.message == "Access Expired.") {
              // AlertUtil.show("Session Expired ! Please login again");
              console.log("Footer comp ---->" + responseJson.message);
              // LogoutUtill.logoutButtonPressed(this.props);
            }
          })
          .catch(error => {
            this.setState({ loader: false });
            console.log(error);
          })
    }


    GiftAnnouncementByHost(index:any)
    {


      if(false)
      {
          AlertUtil.show('Please select gift !')
      }else{ this.setState({loader:true})
   //  console.log('gift ig'+this.state.selectedgift.toString())
     var params: any = {
       'bingo_id':this.state.bingoid,     
       'gift_id':index ,     
     };
 console.log('create bingo paramete',params)
     var formData = new FormData();
 
     for (var k in params) {
       formData.append(k, params[k]);
     }
 
     fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Custom_bingo/gift_announcement_by_host', {
         method: 'POST',
         headers: {
           'authorisation': this.authorisationToken
         },
         body: formData,
       }).then((response) => response.json())
         .then((responseJson) => {
          // this.setState({ loader: false })
          var that = this;;
         //   this.setState({ customProbBetList: responseJson.data });
       // this.getcontestDetail(this.props.navigation.state.params.bingo_data)
       if(responseJson.error =='1'){
            // AlertUtil.show(responseJson.message);
             AlertUtil.showSingleActionMessage(responseJson.message,function(){that.setState({ loader: false });})
       }
       else
       {
        this.setState({ loader: false });
       }

           console.log('create bingo response' + JSON.stringify(responseJson));
           // this.setState({ dialogVisible: true });
           if (responseJson.message == "Access Expired.") {
             // AlertUtil.show("Session Expired ! Please login again");
             console.log("Footer comp ---->" + responseJson.message);
             // LogoutUtill.logoutButtonPressed(this.props);
           }
         })
         .catch(error => {
           this.setState({ loader: false });
           console.log(error);
         })}




    }


    SubmitBingo(){
        if(this.state.selectedgift.length == 0)
       {
           AlertUtil.show('Please select gift !')
       }else{ 
      console.log('gift ig'+this.state.selectedgift.toString())
      console.log('gift card'+this.state.selectedCard.toString())
     // return;
      this.setState({loader:true})
      var params: any = {
        'bingo_id':this.state.bingoid,     
        'bingo_gift_ids':this.state.selectedgift.toString(),     
      };
  console.log('create bingo paramete',params)
      var formData = new FormData();
  
      for (var k in params) {
        formData.append(k, params[k]);
      }
  
      fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Custom_bingo/bingo_api', {
          method: 'POST',
          headers: {
            'authorisation': this.authorisationToken
          },
          body: formData,
        }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ loader: false });
          //   this.setState({ customProbBetList: responseJson.data });
         this.getcontestDetail(this.props.navigation.state.params.bingo_data)
              AlertUtil.show(responseJson.message);

            console.log('create bingo response' + JSON.stringify(responseJson));
            // this.setState({ dialogVisible: true });
            if (responseJson.message == "Access Expired.") {
              // AlertUtil.show("Session Expired ! Please login again");
              console.log("Footer comp ---->" + responseJson.message);
              // LogoutUtill.logoutButtonPressed(this.props);
            }
          })
          .catch(error => {
            this.setState({ loader: false });
            console.log(error);
          })}
    }
    // ----------------------------------------------- Methods ---------------------------------------

    accountNameTapped() {
        this.props.navigation!.navigate(AppScreens.G_ProfileView);
    }

    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View, { gameList: true });
    }

    LogoiconDidTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
    }


    availableBalanceTapped() {
    }

    openPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)

    }

    coveredPlaysTapped() {
        RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }



    goBacktoSetting() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }
    
    closeModal() {
        this.setState({ detailmodel: !this.state.detailmodel });
        
    }
   
 


    acceptGift(index,m:any,n:any) {
      if(this.state.contestdata.creator_index==0){
      this.GiftAnnouncementByHost(index);
      }
        this.state.selectedgift.push(index),
        this.state.selectedCard.push(m+'_'+n),
        this.setState({ selectedgift: this.state.selectedgift });
        this.setState({ selectedCard: this.state.selectedCard });

      }

      removeGift(e,m:any,n:any) {
        var array = this.state.selectedgift;
        var array1 = this.state.selectedCard;
        var  index1 = array.indexOf(m+'_'+n);
        var index = array.indexOf(e); // Let's say it's Bob.
        // delete array[index];
        if (index > -1) {
          array.splice(index, 1);
        }
        if (index1 > -1) {
          array1.splice(m+'_'+n, 1);
        }
        this.setState({ selectedCard: array1 });
        this.setState({ selectedgift: array });
      }



 
    // -----------------------------------------------Design and Design Methods---------------------------------------

    render() {


        return (
            <Container
                title={this.props.navigation.state.params.bingo_data.name}
                isHeader={true}
                isSubHeader={true}
                isTitle={true}
                showIndicator={this.serviceRequestInProgress}
                menuIconListener={this}
                LogoIconListener={this}
                accountNameListener={this}
                availableBalanceListener={this}
                coveredPlaysListener={this}
                openPlaysListener={this}
                isSetting={false} >


                <View style={{ flex: 1 }}>
                    <ProgressLoader
                        visible={this.state.loader}
                        isModal={true} isHUD={true}
                        hudColor={"#68bcbc"}
                        color={"#FFFFFF"} />

                   <View style={{ width: '100%', backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap'}}>
                              {this.state.bingodata.map((item,i)=>{

                                var m:any ;
                                var n:any;
                               
 

                                {i== 0 ?   m=1:m=m }
                                {i== 1 ?   m=1: m=m }
                                {i== 2 ?  m=1: m=m }
                                {i== 3 ?  m=1: m=m }
                                {i== 4 ?  m=1 : m=m }
                                
                               
                                {i== 5 ?   m=2: m=m }
                                {i== 6 ?   m=2 : m=m }
                                {i== 7 ?  m=2 : m=m }
                                {i== 8 ?  m=2: m=m }
                                {i== 9 ?  m=2 : m=m }

                                {i== 10 ?   m=3:m=m }
                                {i== 11 ?   m=3: m=m }
                                {i== 12 ?  m=3: m=m }
                                {i== 13 ?  m=3: m=m }
                                {i== 14 ?  m=3 : m=m }
                                
                               
                                {i== 15 ?   m=4: m=m }
                                {i== 16 ?   m=4 : m=m }
                                {i== 17 ?  m=4 : m=m }
                                {i== 18 ?  m=4: m=m }
                                {i== 19 ?  m=4 : m=m }
                                
                                {i== 20 ?   m=5: m=m }
                                {i== 21 ?   m=5 : m=m }
                                {i== 22 ?  m=5 : m=m }
                                {i== 23 ?  m=5: m=m }
                                {i== 24 ?  m=5 : m=m }









                                
 

                                {i== 0 ?   n=1: m=m }
                                {i== 1 ?   n=2 : m=m }
                                {i== 2 ?  n=3 : m=m }
                                {i== 3 ?  n=4 : m=m }
                                {i== 4 ?  n=5 : m=m }
                                
                               
                                {i== 5 ?   n=1: m=m }
                                {i== 6 ?   n=2 : m=m }
                                {i== 7 ?  n=3 : m=m }
                                {i== 8 ?  n=4 : m=m }
                                {i== 9 ?  n=5 : m=m }

                                {i== 10 ?   n=1: m=m }
                                {i== 11 ?   n=2 : m=m }
                                {i== 12 ?  n=3 : m=m }
                                {i== 13 ?  n=4: m=m }
                                {i== 14 ?  n=5 : m=m }
                                {i== 15 ?   n=1: m=m }
                                {i== 16 ?   n=2 : m=m }
                                {i== 17 ?  n=3 : m=m }
                                {i== 18 ?  n=4 : m=m }
                                {i== 19 ?  n=5 : m=m }

                                {i== 20 ?   n=1: m=m }
                                {i== 21 ?   n=2 : m=m }
                                {i== 22 ?  n=3 : m=m }
                                {i== 23 ?  n=4 : m=m }
                                {i== 24 ?  n=5 : m=m }
 


                               

                                console.log('mat'+ m+'_'+n);

                                // console.log('myindex-----',i)
                                  return(
                                    <View style={[styles.squareBox,{backgroundColor:this.state.selectedgift.includes(item.gift_id)? '#d0edeb':'#fff'}]}>
                                    <ImageBackground source={( i == 12)?require('../../../../images/gifts_bg/bingo.png'):require('../../../../images/gifts_bg/Baby-Book.png')}
                                  resizeMode="stretch"
                                  style={[styles.itemCenter,{ width: '100%', height: '100%'}]}>
                                              <TouchableOpacity style={[styles.itemCenter, { width: '100%', height: '100%', }]}
                                            //    onPress={() => {(i == 12) ?null:AlertUtil.show('Click Work: ' + item.gift_name)}}
                                               //onPress={() => {(i == 12) ?null:this.state.contestdata.bingo_match_status==1?this.state.selectedgift.includes(item.gift_id)?this.removeGift(item.gift_id) : this.acceptGift(item.gift_id):null}}
                                               onPress={() => {(i == 12) ?null:this.state.selectedgift.includes(item.gift_id)?this.removeGift(item.gift_id,m,n) : this.acceptGift(item.gift_id,m,n)}}
                                               >
                                      <View>
                                                      <Text style={{ color: '#44a3bb',textAlign:'center'}}>{(i == 12) ? '' : item.gift_name}</Text>
                                      </View>
                                      </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                                  )
                              })}
                              </View>     
                  {(this.state.contestdata.creator_index==0 && this.state.contestdata.bingo_match_status==0 )? <View style={[ { justifyContent:'center',alignItems:'center',marginTop:15 ,flexDirection:'row'}]}>
                        <TouchableHighlight
                            style={[styles.createsquaare, { width: '46%',height: hp(8.0),marginRight:10 }]}
                        onPress={() => this.Statusupdate('1')}
                        // onPress={() => AlertUtil.show('Button Work')}
                            underlayColor='#fff'>
                            <View>
                          {  this.state.contestdata.is_bet == '0'?
                           <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>START{'\n'}BINGO</Text>     
                           :
                        <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>START & PLAY {'\n'}BINGO </Text>    
                      }                         
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={[styles.createsquaare, { width: '46%',height: hp(8.0), }]}
                        onPress={() => this.CancelBingo()}
                        // onPress={() => AlertUtil.show('Button Work')}
                            underlayColor='#fff'>
                            <View>
                            <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>CANCEL{'\n'}BINGO</Text>                            
                            </View>
                        </TouchableHighlight>
                        </View>:(this.state.contestdata.creator_index==0 && this.state.contestdata.bingo_match_status==1 )? <View style={[ { justifyContent:'center',alignItems:'center',marginTop:15 ,flexDirection:'row'}]}>
                        <TouchableHighlight
                            style={[styles.createsquaare, { width: '45%',height: hp(8.0),marginRight:10 }]}
                        onPress={() => this.Statusupdate('2')}
                        // onPress={() => AlertUtil.show('Button Work')}
                            underlayColor='#fff'>
                            <View>
                            <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>CLOSE{'\n'}BINGO</Text>                            
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={[styles.createsquaare, { width: '45%',height: hp(8.0), }]}
                        onPress={() => this.SubmitBingo()}
                        // onPress={() => AlertUtil.show('Button Work')}
                            underlayColor='#fff'>
                            <View>
                            <Text style={[styles.createsquaaretext,{fontSize:hp(2.7)}]}>SUBMIT{'\n'}BINGO</Text>                            
                            </View>
                        </TouchableHighlight>
                        </View>:null}

                        {(this.state.contestdata.creator_index==0 && this.state.contestdata.bingo_match_status==0 )?<View style={[ { justifyContent:'center',alignItems:'center',marginTop:15 }]}>
                        
                <Text style={[styles.createsquaaretext,{fontSize:hp(2.0),color:'grey'}]}>{'Hit START to start the game'}</Text>                            
                            
                        </View>:null}


                        <View style={[styles.ThirdContainer,styles.itemCenter,]}>
                        <TouchableOpacity style={{width:'40%'}} onPress={()=>{this.setState({detailmodel:true})}}>
                        <View style={[styles.itemCenter,{flexDirection:'row'}]}>
                        <Text style={[styles.createsquaaretext,{fontSize:hp(2.0),color:'#d8480f',textDecorationLine:'underline'}]}>Bingo Details</Text>
                        <View style={[styles.table_title_info_container,{marginBottom:8,marginRight:10,marginLeft: 3}]}>                                            
                                                <Text style={styles.table_title_info_text}> i </Text>                                              
                                                </View>
                        </View>
                        </TouchableOpacity>
                        </View>
                          
                </View>
                {this.state.detailmodel && <BingoDetailComponent detailmodel={this.state.detailmodel} encrypted_bingo_id={this.props.navigation.state.params.bingo_data.id} onDismiss={() => { this.closeModal(); }} />}
            </Container >
        );

    }

}


const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
    error: state.serviceReducer.error,
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners,
    getProfileRequestStatus: state.serviceReducer.requestStatus,
    getProfileResponse: state.serviceReducer.response,
    getProfileError: state.serviceReducer.error,



})



export default connect(mapStateToProps)(G_ContestBingoView);
