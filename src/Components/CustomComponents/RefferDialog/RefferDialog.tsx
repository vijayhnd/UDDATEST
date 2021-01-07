
// import styles from "./styles";
import React, { createRef, Component } from "react";
import INavigationProps from "../../";
import { Dialog } from 'react-native-simple-dialogs';

import BigButton from "../../../Components/Button/BigButton";
import AppScreens from "../../../Util/AppScreens";
import Modals from 'react-native-modal';
import Container from './../../../Components/Container';
import Application from "../../../Entities/Application";
import RouterBuilder from '../../../Router'

import {
  View,
  ScrollView,
  Text,
  ToastAndroid,
  Clipboard,
  Image,
  Share,
  Platform,
  AsyncStorage,
  ImageBackground,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReferralService from "../../../Services/Referral/ReferralService";
import {
  IComponentProps,
  IComponentState,
} from "../../IProps";
interface GuestComponentProps extends IComponentProps {
  detailmodel: Boolean;
  encrypted_bingo_id: string;
  onDismiss: any;
  onClick: any;
  gotorefree: any;
}

interface GuestComponentState extends IComponentState {
    guestUserDialog:any
}
export default class GuestComponent extends Component<
  GuestComponentProps,
  GuestComponentState
> {
    private referralservice = new ReferralService(); 
    private my_referral_code = Application.sharedApplication().user!.profile.my_referral_code;
    private total_earn_by_referral = Application.sharedApplication().user!.profile.total_earn_by_referral;

    constructor(props: GuestComponentProps) {
        super(props);
        this.state = {
            guestUserDialog: false,
           
        }
    }
    async shareNow() {
        // this.setState({ guestUserDialog: false });
    this.dismissScreen()
        // if (Application.sharedApplication().user!.profile.userType == 'Guest') {
        //     this.setState({ guestUserDialog: true });
        // }
        // else {
        // var message1 = " I’m giving you 5,000 FREE UDDA Bucks which can be used to make up to 5 FREE bets in the UDDA App. To accept, use code " + this.my_referral_code
        var message1 = "I’m inviting you to join UDDA. To accept, use code " + this.my_referral_code
        var url = "http://bet.udda.com/index.php"; 
        var referralurl = await this.referralservice.getReferralUrl(url, this.my_referral_code,"U");
		console.log(referralurl);
        var message2 = " to sign up. Enjoy! Details: "+referralurl
        var Message = message1 + message2;
        Share.share({
            message: Message
        }).then(result => {
            // this.setState({ guestUserDialog: true });
            console.log('share result' + JSON.stringify(result));
        }).catch(errorMsg => {
            // this.setState({ guestUserDialog: true });
            console.log('share error ' + JSON.stringify(errorMsg));
        });
        
    // }
    }


    copyText() {
        if (Application.sharedApplication().user!.profile.userType != 'Guest') {
        Clipboard.setString(this.my_referral_code);
        ToastAndroid.show('Referral Code Copied !', ToastAndroid.SHORT);
        }
    }
    goToMyReferees(){
        this.dismissScreen()
        const gotodashboard = this.props.gotorefree;
        gotodashboard();
    }








    async closecurrent(){
      // this.setState({overlaycurrent:'true'})
      // this.setState({imagezoom:false})
      try {
        await AsyncStorage.setItem('reffer_dialog', 'true');
       
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }
    async closecurrentall(){
        // this.setState({overlaycurrent:'true'})
        // this.setState({imagezoom:false})
        try {
          await AsyncStorage.setItem('reffer_dialogall', 'true');
         
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }
    dismissScreen() {
     this.closecurrent()
        this.setState({ guestUserDialog: false })
        const dismissAction = this.props.onDismiss;
        dismissAction();
      }

      dismissScreenall() {
        this.closecurrentall()
           this.setState({ guestUserDialog: false })
           const dismissAction = this.props.onDismiss;
           dismissAction();
         }


      loginScreen() {
       this.closecurrent()
        this.setState({ guestUserDialog: false })
        const dismissAction = this.props.onClick;
        dismissAction();
      }
    componentDidMount() {
        this.setState({ guestUserDialog: this.props.detailmodel });
      }
    loginButtonPressed() {
        this.setState({ guestUserDialog: false });
        // this.props.navigation!.navigate(AppScreens.G_LoginPage,this.props);
        RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
    }

    render() {
       
        return (
           <View>
            


                {/* <Dialog
                        visible={this.state.guestUserDialog}
                        title=""
                        dialogStyle={{margin:0,padding:0}}
                        // onTouchOutside={() => this.dismissScreen()} 
                        contentStyle={{padding:0,margin:0,backgroundColor:'white'}}
                        // onTouchOutside={() => this.setState({ guestUserDialog: false })} 
                        > */}
                        <Dialog
                        visible={this.state.guestUserDialog}
                        // visible={true}
                        title=""
                        contentStyle={{margin:0,padding:0,paddingTop:0,borderRadius:20,borderWidth:1}}
                        dialogStyle={{maxHeight:'90%',borderRadius:20,borderWidth:1}}
                        >
 <View style={{height:'100%'}}>
   <View style={styles.subHeader}>
                            <View style={styles.rightContainer}>
                                    <Image source={require('../../../images/udda_logo.png')} style={{ width: wp(20), height: wp(13), marginLeft: 10 }} resizeMode='contain' />
                                </View>
                                <View style={styles.leftContainer}>
                                    <TouchableOpacity onPress={() => {
                                        //  this.gotoPreviousScreen()
                                        this.dismissScreen()
                                         }}>
                                        <Image source={require('../../../images/close.png')} style={{ width: wp(5), height: wp(5), marginRight: wp(5),tintColor:'white' }} resizeMode='contain'  />
                                    </TouchableOpacity>
                                 
                                </View>

                               
                            </View>
<ScrollView indicatorStyle={'white'}
bounces={false} style={styles.scrollviewstyle}>
                <View style={styles.scrollContent}>
                    
                    <View style={styles.mainHeader}>
                           
                            <View style={styles.middleElement}>
                                <Image source={require('../../../images/f_i_t_icon.png')} style={{ width: '100%', height: wp(55), marginLeft: 0,marginTop:20 }} resizeMode='contain' />
                            </View>
                        </View>


                        <View style={styles.referSection}>
                            <View >
                                <Text style={[styles.firstMsg]}>Refer a Friend
                            {'\n'}
                            <Text style={[styles.firstMsg,{fontSize:hp(2.4)}]}>Earn 5,000 FREE UDDA Bucks</Text></Text>
                            </View>
                            <View >
                                <Text style={[styles.secondMsg,{fontSize:hp(1.7)}]}>You will receive 5,000 UDDA BUCKS </Text>
                            </View>
                            <View >
                                <Text style={styles.thirdMsg}>* Minimum Bet is 1,000 UDDA BUCKS</Text>
                            </View>
                        </View>

                        <View style={styles.referCode}>
                            <ImageBackground source={require('../../../images/box_border.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: 60 }}>
                                <View style={styles.ReferralCodeSection}>
                                    <View style={styles.leftRefer}>
                                        <Text style={[styles.textCode, { textAlign: 'left' }]}>
                                            Referral Code :
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', }}>
                                        <Text style={styles.code}>
                                        {Application.sharedApplication().user!.profile.my_referral_code}
                                        </Text></View>
                                    <View style={styles.rightRefeer}>
                                        <TouchableOpacity onPress={() => {
                                             this.copyText()
                                        }}>
                                            <Image source={require('../../../images/copy_icon.png')} style={{ width: wp(6), height: wp(6), marginLeft: wp(2) }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                </View>


                            </ImageBackground>



                        </View>


                       

                         {/* total earned section*/}
                         
                         <View style={styles.totalEarned}>
                            <View style={[styles.totalLeft]}>
                                <Text style={{ color: '#000', fontSize: wp(4), fontFamily: 'Montserrat-Medium' }}>Total earned from referrals</Text>
                                <View style={{ flexDirection: 'row', marginTop: wp(4) }}>
                                    <Image source={require('../../../images/udda.png')} style={{ width: wp(7), height: wp(7) }} resizeMode='contain' />
                                    <View style={{flexDirection:'row'}}>
                                    <Text style={{ color: '#67BCBE', fontSize: wp(5), letterSpacing: 2, fontFamily: 'Montserrat-Medium', marginLeft: wp(5) }}>
                                        {this.total_earn_by_referral}</Text>
                                        {this.total_earn_by_referral > 0 ?<TouchableOpacity onPress={() => { this.goToMyReferees() }}>
                                        <Image  source={require('../../../images/Bet_Share.png')} style={{ height: 20, width: 20 , tintColor:"#68bcbc",marginLeft:5}} resizeMode='contain' tintColor="#68bcbc" />
                                        </TouchableOpacity>:null}
                                    </View>
                                    
                                </View>
                                <Text style={{ color: '#67BCBE', fontSize: wp(4), letterSpacing: 2, fontFamily: 'Montserrat-Medium', marginLeft: wp(5) }}>
                                        UDDA Bucks</Text>
                            </View>
                            <View style={[styles.rightImage,{position:'absolute',right:3}]}>

                                <Image source={require('../../../images/prize.png')} style={{ width: wp(25), height: wp(25) }} resizeMode='contain' />
                            </View>

                        </View>

                       
                      
                       </View>

                       
                       </ScrollView>
                     
                       <View style={{margin:5}}>
                                <Text style={[styles.thirdMs,{fontSize:wp(3.0),color:'grey',fontFamily: 'Montserrat-Bold',textAlign:'center'}]}>* You can access this screen from setting also</Text>
                            </View>
                       <View style={{ width: '100%', height: 60,  marginBottom: 0,flexDirection:'row',justifyContent:'space-between' }}>
                    <View style={{width:'100%',marginRight:'1%'}}>
                        <TouchableWithoutFeedback onPress={() => { 
                            this.shareNow() 
                            }}>
                            <View style={{ width: '100%', height: 60, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Image source={require('../../../images/reffer_share.png')} style={{ width: wp(6), height: wp(6) }} resizeMode='contain' />
                                <Text style={{ color: 'white', fontSize: wp(5), fontFamily: 'Montserrat-Bold', marginLeft: wp(3) }}>
                                    Refer a Friend
    </Text>
                            </View>
                        </TouchableWithoutFeedback>    
                    </View>
                    {/* <View style={{ width: '49%', }}>
                        <TouchableWithoutFeedback onPress={() => { this.goToMyReferees() }}>
                            <View style={{ width: '100%', height: 60, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                               <Text style={{ color: 'white', fontSize: wp(5), fontFamily: 'Montserrat-Bold' }}>
                                    My Referees
    </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> */}
                  
                </View>

                <View>
                <Text onPress={()=>{this.dismissScreenall()}} style={{ padding: 3, fontSize: hp(2.2), color:'#68bcbc', fontFamily: 'Montserrat-Bold', textDecorationLine: 'underline' ,textAlign:'center'}}>{'Don'}'{'t show again'}</Text>
                </View>
                           
                       </View>
                       </Dialog>
                    {/* </Dialog> */}
           </View>
        );
        
    }
}



