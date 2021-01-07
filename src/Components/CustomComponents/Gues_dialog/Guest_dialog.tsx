
// import styles from "./styles";
import React, { createRef, Component } from "react";
import INavigationProps from "../../";
import { Dialog } from 'react-native-simple-dialogs';

import BigButton from "../../../Components/Button/BigButton";
import AppScreens from "../../../Util/AppScreens";
import Modals from 'react-native-modal';
import RouterBuilder from '../../../Router'

import {
  View,
  Text,
  Image,
  Platform,
  AsyncStorage,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import SettingsStyles from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  IComponentProps,
  IComponentState,
} from "../../IProps";
interface GuestComponentProps extends IComponentProps {
  detailmodel: Boolean;
  encrypted_bingo_id: string;
  onDismiss: any;
  onClick: any;
}

interface GuestComponentState extends IComponentState {
    guestUserDialog:any
}
export default class GuestComponent extends Component<
  GuestComponentProps,
  GuestComponentState
> {
  

    constructor(props: GuestComponentProps) {
        super(props);
        this.state = {
            guestUserDialog: false,
           
        }
    }
    async closecurrent(){
      // this.setState({overlaycurrent:'true'})
      // this.setState({imagezoom:false})
      try {
        await AsyncStorage.setItem('guest_dialog', 'true');
       
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
        RouterBuilder.resetRouteTo(AppScreens.LoggedOutStack,this.props);
    }

    render() {
       
        return (
           <View>
            <Modals 
            isVisible={this.state.guestUserDialog}
            // isVisible={true}
            style={{ justifyContent: 'flex-end', margin: 0,padding:0}}
            
            // onBackButtonPress={this.dismissScreen() }
            // onBackdropPress={this.dismissScreen() }
            
          >

          
          <View style={{ backgroundColor: "transparent",height:Platform.OS === 'ios' ?370:340,
              width:'100%' }}>

          <View style={{ justifyContent: "center", padding: 0,paddingTop:0, alignItems: 'center' ,width:'100%'}}>
            <View style={{flexDirection:'row',backgroundColor:'#68bcbc',width:'100%',height:60,borderTopLeftRadius:15,borderTopRightRadius:15,justifyContent:'center',alignContent:'center',alignItems:'center' }}>
            <View style={{ width: Platform.OS === 'ios' ?'85%':'75%',justifyContent:'flex-end',alignContent:'flex-end',alignItems:'flex-end' }}>
              <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.5), marginTop: 0, color: 'white',textAlign:'center' }}>
          Register Now & Receive
              </Text>
              </View>
              <View style={{ width:Platform.OS === 'ios' ? '5%':'15%'}}></View>
              <View style={{ width: '10%' }}>
                          <TouchableWithoutFeedback 
                           onPress={() => { this.dismissScreen() }}
                          >
                            <View>
                            <Icon name="close" size={25} color="white"/>
                            
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
          </View>
          <View style={{ backgroundColor: "white",height:310,
              width:'100%' }}>
              <View style={{flexDirection:'row',marginTop:15,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
              <Image source={require('../../../images/buck_dark.png')} style={{height:20,width:20,marginTop:-1 }}></Image>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(3.8), textAlign:'center', color: '#5b5b5b',fontWeight:'bold' }}>{'10,000'}</Text>
              
              </View>
              <View style={{marginTop:1}}>
              <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.0),  color: '#5b5b5b',textAlign:'center' }}>
                UDDA Bucks for <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0), color: '#5b5b5b' }}>{'FREE'}</Text>
              </Text> 
              </View>
              <View style={{marginTop:10}}>
              <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.0),  color: '#5b5b5b',textAlign:'center' }}>
                 Registration is easy, UDDA just needs{'\n'}a phone number & user name.
              </Text> 
              </View>
              
              <View style={{marginTop:5}}>
              <View
          style={{
          borderBottomWidth: 1,
          borderBottomColor: "#d4d4d4",
          marginBottom: 3,
          marginTop: 8,
          width:'100%'
          }}
          />

              <View style={{flexDirection:'row',width:'100%'}}>
                <View style={{width:Platform.OS === 'ios' ?'28%':'33%',alignContent:'flex-end',justifyContent:'flex-end',alignItems:'flex-end'}}>
                <Image source={require('../../../images/no-credit.png')} style={{height:25,width:25 ,marginRight:5}}></Image> 
                </View>
              <View style={{width:Platform.OS === 'ios' ?'72%':'67%',justifyContent:'center'}}>
              <Text style={{ fontFamily: 'Montserrat-Bold', width:'100%',fontSize: hp(1.8), marginTop: 0, color: '#68bcbc' }}>
              {'No credit card necessary'}
              </Text>
              </View>
              </View>
              <View
          style={{
          borderBottomWidth: 1,
          borderBottomColor: "#d4d4d4",
          marginBottom: 8,
          marginTop: 3,
          width:'100%'
          }}
          />
          </View>

          <View style={{marginTop:5}}>
              <Text onPress={()=>{this.dismissScreen()}} style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(1.8) ,color:'#f26522',textDecorationLine:'underline',textDecorationColor:'#f26522',textAlign:'center' }}>
                Continue as Guest User
              </Text> 
              </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15,marginTop:15 }}>
            
              <View style={{ width: '95%' }}>
                  <BigButton title="Register" style={{ backgroundColor: '#68bcbc',height:50 }} textStyle={styles.verify_button_text_style}
                      listener={() => {
                       // this.setState({guest2:false})
                         this.loginScreen()
                       // this.dismissScreen()
                          }} />
              </View>
          </View>
          </View>
          </View>
          </View>
                  </Modals>


                {/* <Dialog
                        visible={this.state.guestUserDialog}
                        title=""
                        onTouchOutside={() => this.dismissScreen()} 
                        contentStyle={{padding:0,margin:0,backgroundColor:'white'}}
                        // onTouchOutside={() => this.setState({ guestUserDialog: false })} 
                        >

                        <View style={{ backgroundColor: "white" }}>

                            <View style={{ justifyContent: "center", padding: 0,paddingTop:0, alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.8), marginTop: 0, color: '#5b5b5b',textAlign:'center' }}>
                             Register Now & Receive
                                 </Text>
                                 <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                 <Image source={require('../../../images/buck_dark.png')} style={{height:20,width:20,marginTop:-1 }}></Image>
                                 <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(3.8), textAlign:'center', color: '#5b5b5b',fontWeight:'bold' }}>{'10,000'}</Text>
                                
                                 </View>
                                 <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.5),  color: '#5b5b5b',textAlign:'center' }}>
                                  UDDA Bucks For <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.5), color: '#68bcbc' }}>{'FREE'}</Text>
                                 </Text> 
                                 <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#d4d4d4",
                        marginBottom: 3,
                        marginTop: 15,
                        width:'100%'
                      }}
                    />
                    
                                <View style={{flexDirection:'row',width:'100%'}}>
                                  <View style={{width:Platform.OS === 'ios' ?'20%':'25%',alignContent:'flex-end',justifyContent:'flex-end',alignItems:'flex-end'}}>
                                  <Image source={require('../../../images/no-credit.png')} style={{height:25,width:25 ,marginRight:5}}></Image> 
                                  </View>
                                <View style={{width:Platform.OS === 'ios' ?'80%':'75%',justifyContent:'center'}}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', width:'100%',fontSize: hp(1.8), marginTop: 0, color: '#68bcbc' }}>
                                 {'No credit card necessary'}
                                 </Text>
                                </View>
                                </View>
                                 <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#d4d4d4",
                        marginBottom: 15,
                        marginTop: 3,
                        width:'100%'
                      }}
                    />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                                <View style={{ width: '46%' }}>
                                    <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc',height:50 }} textStyle={SettingsStyles.verify_button_text_style}
                                        listener={() => {this.dismissScreen() }} />
                                </View>
                                <View style={{ width: '4%' }}></View>
                                <View style={{ width: '46%' }}>
                                    <BigButton title="OK" style={{ backgroundColor: '#68bcbc',height:50 }} textStyle={SettingsStyles.verify_button_text_style}
                                        listener={() => { this.loginScreen() }} />
                                </View>
                            </View>
                        </View>
                    </Dialog> */}
           </View>
        );
        
    }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    backgroundColor: '#E0F7FA'

  },

  bottomNavigationView: {

    backgroundColor: '#fff',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'

  },

  text: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20

  }

});

