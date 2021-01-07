import React from "react";
import { View, Text, FlatList, TextInput, Platform, Alert, TouchableOpacity, ScrollView, AsyncStorage, Animated, UIManager, TouchableWithoutFeedback, AppState, Share, BackHandler, Keyboard, Dimensions, KeyboardAvoidingView } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppValidationComponent, { Field, AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import { FooterComponent } from "../../../../Components/CustomComponents/Footer/FooterComponent";
import { AdMobBanner } from 'react-native-admob';
import AlertUtil from "../../../../Util/AlertUtil";
import AppConstants from "../../../../Util/Constants";
import SportsListComponent from "../../../../Components/CustomComponents/SportsListComponent";
import AppScreens from "../../../../Util/AppScreens";
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import PlayResponse from "../../../../Services/Dashboard/PlayResponse";
import Application from "../../.../../../../Entities/Application";
import BigButton from "../../../../Components/Button/BigButton";
import RouterBuilder from "../../../../Router";
import SearchBox from '../../../../Components/CustomComponents/SearchBox/SearchBox';
import GetProfileResponse from "../../../../Services/Profile/GetProfileResponse";
import GetProfileRequest from "../../../../Services/Profile/GetProfileRequest";
import GetProfileResponseParser from "../../../../Services/Profile/GetProfileResponseParser";
import ProgressLoader from 'rn-progress-loader';
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { OverlayBackground } from '../../../../Components/CustomComponents/OverlayBackground/OverlayBackground';
import { CheckBox, Image, } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { UDDAError } from "../../../../Entities";
import { FooterListner } from "../../../../Components/CustomComponents/Footer/SingleMatchScheduleWithTitleComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import { Dialog } from 'react-native-simple-dialogs';
import moment from 'moment';
import FeedbackRequest from "../../../../Services/Feedback/FeedbackRequest";
import FeedbackResponseParser from "../../../../Services/Feedback/FeedbackResponseParser";
import FeedbackResponse from "../../../../Services/Feedback/FeedbackResponse";
import PlaceBetRequest from "../../../../Services/Bets/PlaceBetRequest";
import PlaceBetResponseParser from "../../../../Services/Bets/PlaceBetResponseParser";
import PlaceBetResponse from "../../../../Services/Bets/PlaceBetResponse";
import BetAFriendRequest from "../../../../Services/Bets/BetAFriendRequest";
import BetAFriendResponseParser from "../../../../Services/Bets/BetAFriendResponseParser";
import BetAFriendResponse from "../../../../Services/Bets/BetAFriendResponse";
import UrlService from '../../../../Services/Core/ServiceURI';
import DateTimePicker from "react-native-modal-datetime-picker";
import ReferralService from "../../../../Services/Referral/ReferralService";
import LinearGradient from 'react-native-linear-gradient';
import CustomBetAFriendRequest from "../../../../Services/Bets/CustomBetAFriendRequest";
import CustomBetAFriendResponseParser from "../../../../Services/Bets/CustomBetAFriendResponseParser";
import CustomBetAFriendResponse from "../../../../Services/Bets/CustomBetAFriendResponse";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const { State: TextInputState } = TextInput;
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';


export default class CustomPropBet extends React.Component {
    constructor(props: any) {
        super(props);
    
        this.state = {
        isDateTimePickerVisible:false,
        isTimePickerVisible:false,
        customBetDate:'',
        customBetTime:'',
    }}

   
    
    

    render() {
        let BetFilterData = [{
            value: 'Date ',
          }, {
            value: 'Match ',
          },
          {
            value: 'Player ',
          },
          {
            value: 'Player',
          },
          {
            value: ' Added',
          }, {
            value: ' Game',
          },
          {
            value: ' Name',
          },
          {
            value: 'Player',
          }];
        return (
           
            <View style={{flexDirection:'column'}}>
                <View style={{height:60,backgroundColor:'#009c9d',flexDirection:'row',width:'100%',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
               
                   <Icons name="arrow-back" size={30} color="white" style={{marginTop:2}} 
                   onPress={() => alert('go back function not work')}
                    />
                  
               
                      <View style={{alignContent:'center',alignItems:'center',paddingRight:90}}>
                      <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.6),color:'white',textAlign:'center',marginTop:7,alignContent:'center' }}> SETTLE CUSTOM BETS </Text>
                       </View>
                         </View>

                         <View style={{ flexDirection:'row', width: '100%',alignContent:'center',alignItems:'center' }}> 
                         <Icon name="search" size={18} color="grey" style={{marginLeft:8}} />          
                         <TextInput
                           // value={this.state.customBetTest}
                           // numberOfLines={10}
                           // multiline={true}
                            style={{  height:40, fontFamily: 'Montserrat-Semibold', fontSize: hp(2), }}
                            placeholder=' Search'
                            placeholderTextColor={'#888888'}
                           // onChangeText={(text) => { this.setState({ customBetTest: text }) }}
                        />
                        </View>

                     <FlatList
                      extraData={this.state}
                      data={BetFilterData}
                      keyExtractor={(item: any, index) => index.toString()}
                      bounces={true}
                      renderItem={({ item, index }: any) => {
                        var itemindex = '';
                      //  itemindex = item.result_index;

                        return (
                            <View style={{marginBottom:0}}>
                            <View style={{ backgroundColor: 'white',flexDirection:'column',borderWidth:1,width:wp(100),borderColor:'#EEEEEE' ,paddingBottom:5,paddingTop:5,marginBottom:5,marginTop:5,flex:1,borderBottomWidth :5,borderBottomColor: '#d1caca',}} >
                        <Text style={[styles.paragraph,{paddingLeft: wp(3),paddingRight: wp(3),paddingTop:3,paddingBottom:3}]}>saw someone sharing a post recently stating that you now support two spaces after a period, falling in line with AP style. Is this correct?</Text>
                            
                              <View style={{flexDirection:'column',marginTop: 3}}>
                              <View style={{ flexDirection: 'row', marginTop: 0, marginBottom: 0, paddingLeft: wp(3),justifyContent:'space-between' }}>
                                {/* {(item.custom_props.custom_prop_state == 'FINAL') ?
                                  <RadioForm
                                    radio_props={[{ label: item.my_answer + '    ', value: item.my_answer }, { label: item.other_answer + '    ', value: item.other_answer }]}
                                    initial={itemindex}
                                    formHorizontal={true}
                                    // labelHorizontal={true}
                                    buttonColor={'#ACACAC'}
                                    buttonSize={10}
                                    buttonOuterSize={20}

                                    selectedButtonColor={'#68bcbc'}
                                    buttonWrapStyle={{ marginLeft: 15 }}
                                    labelWrapStyle={{ marginRight: 10 }}
                                    animation={true}
                                    disabled={true}
                                    onPress={(value) => { this.setState({ result: value }) }}
                                  />
                                  :  */}
                                 <View style={{paddingBottom:5,paddingTop:5,width:'50%'}}>
                                 <RadioForm
                                    radio_props={[{ label: 'Yes,he will' + '    ', value: 'item.my_answer' }, { label: 'No ,he wont '+ '    ', value: 'item.other_answer' }]}
                                    initial={-1}
                                    formHorizontal={false}
                                     labelHorizontal={true}
                                    buttonColor={'#ACACAC'}
                                    buttonSize={6}
                                    buttonOuterSize={19}
                                    selectedButtonColor={'#68bcbc'}
                                    buttonWrapStyle={{ marginBottom:10}}
                                    labelWrapStyle={{ marginBottom:10}}
                                    // buttonStyle={{marginTop:5,borderWidth:50}}
                                    labelStyle={{fontSize:hp(2.2), fontFamily: 'Montserrat-Semibold',}}
                                    animation={true}

                                    onPress={(value) => { this.setState({ result: value }) }}
                                  />
                                 </View>
                              
                                 <View
                                    style={{
                                    borderLeftWidth: 1,
                                    borderLeftColor: '#efefef',
                                    }}
                                    />
                                   {/* onPress={() => { this.publishCustomBet(item) }} */}
                                   <TouchableOpacity style={{marginRight:wp(3),marginTop:wp(2), width:'20%', height: '70%', backgroundColor: '#68bcbc',justifyContent:'center',alignContent:'center',borderRadius:4,alignItems:'center' }} onPress={() => { alert('Hello New Ui Settle Custom Bets:  ' + item.value)}} >
                                    <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                      <Text style={{
                                        color: 'white',
                                        fontFamily: 'Montserrat-Bold',
                                        fontSize: hp(2.0),
                                        padding: 3,
                                        textAlign:'center'
                                      }} >Publish Result</Text>
                                    </View>
                                  </TouchableOpacity>
                                  
                                 
                            
                             
                              </View>
                              <View style={{ alignItems: 'center', justifyContent: 'flex-end', alignContent: 'flex-end',flexDirection:'row' ,paddingTop:3,paddingBottom:3,marginRight:wp(3),marginTop:wp(2),marginBottom:wp(2),}}>
                                    <Text style={{
                                      fontFamily: 'Montserrat-Regular',
                                      color: 'black',
                                      fontSize: hp(1.8),
                                    }} > Result published on </Text>
                                    <Text style={{color: 'black', fontFamily: 'Montserrat-Semibold', fontSize: hp(2), textAlign: 'justify'}} >11:00 AM , 04-04-2020 EDT</Text>
                                  </View>
                             </View>
                              </View>
                              </View>
                         
                        )
                      }}
                    />

             

                             
          </View>
        );
    }
}