import React, {  Component,createRef } from "react";

import { View, Text, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, TextInput, TouchableHighlight, Animated, Keyboard, Dimensions, UIManager, Share,Modal,ImageBackground, SafeAreaView, ScrollView } from "react-native";
import styles from './styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AlertUtil from "./../../../Util/AlertUtil";
import { IComponentProps, IComponentState } from "./../../../Components/IProps";
import Application from "./../../../Entities/Application";
import RouterBuilder from "./../../../Router";
import AppScreens from "./../../../Util/AppScreens";
import LogoutUtill from "./../../../Util/LogoutUtill";
import UrlService from "./../../../Services/Core/ServiceURI"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressLoader from 'rn-progress-loader';
import moment from "moment";
import Popover from "react-native-popover-view";
import Icons from "react-native-vector-icons/MaterialIcons";
import ReferralService from "./../../../Services/Referral/ReferralService";
interface FreetoplayDetailComponentProps extends IComponentProps {
    detailmodel: Boolean
    encrypted_contest_id:string
    onDismiss:any;
    goinfo:any;
    join_type:any;
}

interface FreetoplayDetailComponentState extends IComponentState {
    contestDetail:any;
    detailmodel:any;
    loader: any,
    winners: any,
    gamedetailtime: any,
    blackdialogDate: any;
  BlackDialog: any;
}
export default class FreetoplayDetailComponent extends Component<FreetoplayDetailComponentProps, FreetoplayDetailComponentState> {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    public touchable;
    private referralservice = new ReferralService();
    private Username =Application.sharedApplication().user!.profile.firstName == null?Application.sharedApplication().user!.profile.displayName: Application.sharedApplication().user!.profile.firstName + " " + Application.sharedApplication().user!.profile.lastName;
    private my_referral_code = Application.sharedApplication().user!.profile
      .my_referral_code;

  

    constructor(props: FreetoplayDetailComponentProps) {
        super(props);
        this.touchable = createRef()
        this.state = {
            contestDetail:'',
            detailmodel: this.props.detailmodel,
            loader: false,
            winners: [],
            gamedetailtime: '',
            blackdialogDate: "",
             BlackDialog: false,
          
        }
		console.log(this.props);

    }
    showPopover() {
        // var new_time_stamp = this.state.contestDetail.bingo_created_at_time_stamp * 1000;
        // var formated_time = moment(new_time_stamp).format("MMMM DD,YYYY");
        // this.setState({ blackdialogDate: formated_time });
        this.setState({ BlackDialog: true });
      }
    
      closePopover() {
        this.setState({ BlackDialog: false });
      }
      getblackDialog() {
        return (
          <Popover
            isVisible={true}
            // fromView={touchableRef}
            // backgroundStyle={{position:'absolute', top:100, paddingTop:hp(20), backgroundColor: '#fff' }}
            //   mode={'rn-modal'}
            // // mode={{'js-modal'
            popoverStyle={{ marginLeft: -10, marginTop: hp(8) }}
            onRequestClose={() => this.closePopover()}
          >
            <View
              style={{
                height: hp(87),
                margin: 0,
                backgroundColor: "#fff",
                padding: 10,
                width: "100%",
                maxHeight: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.closePopover();
                }}
                style={{ width: 50 }}
              >
                <View>
                  {/* <Image source={require('../../../../images/back_icon.png')} style={{ height: 10, width: 10, alignSelf: 'flex-start', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image> */}
                  <Icons
                    name="arrow-back"
                    size={30}
                    color="black"
                    style={{ marginLeft: 2 }}
                    onPress={() => {
                      this.closePopover();
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  top: 5,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80%",
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    color: "#68bcbc",
                    fontSize: 18,
                    marginTop: 5,
                    fontFamily: "Montserrat-Bold",
                    textAlign: "left",
                    paddingLeft: "6%",
                  }}
                >
                  PARTICIPANTS{" "}
                </Text>
              </View>
              {/* <TouchableWithoutFeedback onPress={() => { this.closePopover() }} >
                      <View>
                          <Image source={require('../../../../images/close.png')} style={{ height: 10, width: 10, alignSelf: 'flex-end', marginRight: 2, marginVertical: 5, marginBottom: 8 }}></Image>
                      </View>
                  </TouchableWithoutFeedback> */}
              <View style={{ width: "100%", flexDirection: "row" }}>
                <Text
                  style={{
                    width: "40%",
                    fontSize: 12,
                    fontFamily: "Montserrat-Regular",
                    height: 20,
                    alignItems: "center",
                  }}
                >
                  Bet Date:
                </Text>
    
                <View
                  style={{
                    flexDirection: "row",
                    width: "60%",
                    justifyContent: "flex-end",
                    height: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat-Bold",
                      fontSize: 12,
                      alignItems: "center",
                    }}
                  >
                    {this.state.contestDetail.contest_start_date}
                  </Text>
                </View>
              </View>
    
              <View style={{ width: "100%", flexDirection: "row" }}>
                <Text
                  style={{
                    width: "40%",
                    fontSize: 12,
                    fontFamily: "Montserrat-Regular",
                    height: 20,
                    alignItems: "center",
                  }}
                >
                  Creator
                </Text>
    
                <View
                  style={{
                    flexDirection: "row",
                    width: "60%",
                    justifyContent: "flex-end",
                    height: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat-Bold",
                      fontSize: 12,
                      alignItems: "center",
                    }}
                  >
                    {this.state.contestDetail.creator}
                  </Text>
                </View>
              </View>
    
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "#777777",
                    marginVertical: 5,
                    width: "95%",
                    height: 2,
                    alignItems: "center",
                  }}
                ></View>
              </View>
    
              {this.state.contestDetail.share_info.length > 0 ? (
                <View style={{ height: hp(63) }}>
                  <FlatList
                    extraData={this.state}
                    data={this.state.contestDetail.share_info}
                    keyExtractor={(item: any, index) => index.toString()}
                    bounces={false}
                    renderItem={({ item, index }: any) => {
                      return item.status == 1 ? (
                        <View>
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              height: 40,
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <View style={{ width: "50%" }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontFamily: "Montserrat-Bold",
                                  height: 20,
                                  alignItems: "center",
                                }}
                              >
                                {item.username}
                              </Text>
                            </View>
    
                            <View
                              style={{
                                flexDirection: "row",
                                height: 20,
                                width: "30%",
                                justifyContent: "flex-end",
                                alignContent: "flex-end",
                                alignItems: "flex-end",
                              }}
                            >
                              <Image
                                source={require("../../../images/BucksWhite.png")}
                                style={{
                                  height: 8,
                                  width: 8,
                                  alignItems: "center",
                                  marginRight: 2,
                                  marginTop: 3,
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: "Montserrat-Bold",
                                  fontSize: 12,
                                  alignItems: "center",
                                }}
                              >
                                {item.amount}
                              </Text>
                            </View>
                            {/* <View style={{ width: '20%' }}><Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center', textAlign: "right"}}>{item.settled_status}</Text></View> */}
                          </View>
                          <View
                            style={{
                              borderBottomColor: "#EEEEEE",
                              borderBottomWidth: hp(0.3),
                            }}
                          />
                        </View>
                      ) : (
                        <View>
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              height: 40,
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View style={{ width: "50%" }}>
                              
                              <Text
                                style={{
                                  color: "#808080",
                                  fontSize: 12,
                                  fontFamily: "Montserrat-Bold",
                                  height: 20,
                                  alignItems: "center",
                                  textDecorationLine: "line-through",
                                }}
                              >
                                {item.username}
                              </Text>
                            </View>
    
                            <View
                              style={{
                                flexDirection: "row",
                                height: 20,
                                width: "30%",
                                justifyContent: "flex-end",
                                alignContent: "flex-end",
                                alignItems: "flex-end",
                              }}
                            >
                              <Image
                                source={require("../../../images/BucksWhite.png")}
                                style={{
                                  height: 8,
                                  width: 8,
                                  alignItems: "center",
                                  marginRight: 2,
                                  marginTop: 3,
                                }}
                              />
                              <Text
                                style={{
                                  color: "#808080",
                                  fontFamily: "Montserrat-Bold",
                                  fontSize: 12,
                                  alignItems: "center",
                                  textDecorationLine: "line-through",
                                }}
                              >
                                {item.amount}
                              </Text>
                            </View>
                            {/* <View style={{ width: '20%', }}> <Text style={{ color: '#808080', fontFamily: 'Montserrat-Bold', fontSize: 12, alignItems: 'center',textAlign:"right" }}>{item.settled_status}</Text></View> */}
                          </View>
                          <View
                            style={{
                              borderBottomColor: "#EEEEEE",
                              borderBottomWidth: hp(0.3),
                            }}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
              ) : (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text
                    style={{
                      width: "100%",
                      fontSize: 12,
                      fontFamily: "Montserrat-Bold",
                      height: hp(63),
                      textAlign: "center",
                    }}
                  >
                    No record found
                  </Text>
                </View>
              )}
    
              {this.state.contestDetail.settlement_status ==
              "In-Progress" ? 
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.shareOption(this.state.contestDetail);
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#68bcbc",
                          paddingVertical: 7,
                          marginVertical: 10,
                          width: "95%",
                          alignItems: "center",
                          borderRadius: 3,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Montserrat-Bold",
                            fontSize: 15,
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          Invite More Friends
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                : (
                <View />
              )}
            </View>
          </Popover>
        );
      }
    
      async shareOption(item: any) {

        var MessageString: any;
        var ShowString: any;
        var url: any;
        var referStr: any;

        url = "http://bet.udda.com/index.php?t=contestbetnew&i=" + item.encryptor_private_contest_id;
        url = await this.referralservice.getReferralUrl(url, this.my_referral_code, "U"); // Getting Dynamic Share Link From Firebase
        referStr = "\n Use Referral Code " + this.my_referral_code + " to sign up. ";
        MessageString = "You have been invited to a private contest through UDDA by " + this.Username + "." + referStr+" Open Link : " + url;


        // ShowString = <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: hp(1.4), }}>
        //     You have been invited to a private contest through UDDA by <Text style={{ fontFamily: 'Montserrat-SemiBold' }}> {this.Username}</Text>{referStr}
        // </Text>


        // this.setState({ MessageString: MessageString });
        // this.setState({ Share_Show_Msg: ShowString });
        // this.setState({ MessageUrl: url });
        // console.log("Private Contest " + JSON.stringify(MessageString));
        // this.setState({ shareDialog: true });
       
    
        console.log("private url " + JSON.stringify(MessageString));
        Share.share({
          message: MessageString ,
        })
          .then((result) => {
            console.log(result);
            this.closePopover();
          })
          .catch((errorMsg) => {
            console.log(errorMsg);
            this.closePopover();
          });
      }
    componentDidMount() {
        this.callMethod()

    }
 

    async callMethod() {
         this.setState({ loader: true });
         if(this.props.join_type=='private_contest')
          {

            //var data = await AsyncStorage.getItem('private_contest_id')
            //console.log('private id : ',data)
            var params: any = {
               'private_contest_id':  this.props.encrypted_contest_id,
             };
            }else{
              console.log('private id : blank',)
              var params: any = {
                'contest_id': this.props.encrypted_contest_id,
              };
            }
         
         console.log('params of freetoplay : ',params)
    
          var formData = new FormData();
    
          for (var k in params) {
            formData.append(k, params[k]);
          }
          var url;
          if(this.props.join_type=='public_contest')
          {
            console.log('ashish public')
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PublicContest/get_public_contest_details'  ;
          }else if(this.props.join_type=='private_contest')
          {
            console.log('ashish private_contest')
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/PrivateContest/get_private_contest_details'  ;
          }else{
            console.log('ashish f2p')
            url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/get_free_to_play_contest_details'  ;
          }
          // PrivateContest/get_private_contest_details
        //  this.props.encrypted_contest_id
        fetch(url, {
            method: 'POST',
            headers: {
              'authorisation': this.authorisationToken
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseJson) => {
               console.log('contestDetail' + JSON.stringify(responseJson));
                this.setState({ loader: false });
                if(this.props.join_type=='public_contest')
                {
                  this.setState({ contestDetail: responseJson.data.public_contest_details });
                 this.setState({ winners: responseJson.data.public_contest_details.share_info });
                }else if(this.props.join_type=='private_contest')
                {
                  this.setState({ contestDetail: responseJson.data.private_contest_details });
                 this.setState({ winners: responseJson.data.private_contest_details.share_info });
                }else{
                  this.setState({ contestDetail: responseJson.data.free_to_play_contest_details });                
                  this.setState({ winners: responseJson.data.free_to_play_contest_details.share_info });
                }
               
                // var dateTime = this.state.contestDetail.bingo_expired_on_time_stamp;
                // var gamedetailtime = moment(dateTime * 1000).format('LT') + ' ' + new Date(dateTime * 1000).toString().split(' ')[6].toString().substr(1, new Date(dateTime * 1000).toString().split(' ')[6].length - 2) + ' ' + moment(dateTime * 1000).format('LL')
                // this.setState({ gamedetailtime: gamedetailtime })
               
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => { this.setState({ loader: false });console.log('error')})
    }


    dismissScreen() {
        const dismissAction = this.props.onDismiss;
        dismissAction();
    }
    gotoinfo(){
      this.dismissScreen()
      const dismissAction = this.props.goinfo;
      dismissAction();
      // this.props.navigation!.navigate(AppScreens.G_InfochartView, this.props)
      // RouterBuilder.replaceRouteTo(AppScreens.G_InfochartView, this.props)
    }
    render() {
       
      

        return (
            <View style={{flex:1}}>
                
            {/* <View style={[styles.mainContainer,{ backgroundColor: this.isFromGambling == true ? '#68bcbc' : '#e2211c'}]}> */}
                <ScrollView>
{/* create ui of game details */}
<Modal visible={this.state.detailmodel} transparent={false}>
<ProgressLoader
                    visible={this.state.loader}
                    isModal={true} isHUD={true}
                    hudColor={"#68bcbc"}
                    color={"#FFFFFF"} />
           <SafeAreaView>
         <View style={[styles.customhead,{backgroundColor:'#68bcbc'}]}>
              
              <View style={{ alignContent:'flex-end', alignItems: 'flex-end',justifyContent:'flex-end',width:'75%' }}>
                <Text style={[styles.customheadtext,{color:'white'}]}>{this.props.join_type=='public_contest'?'PUBLIC CONTEST DETAILS':this.props.join_type=='private_contest'?'PRIVATE CONTEST DETAILS':'FREE TO PLAY DETAILS'}</Text>
              </View>
              <View style={{  alignContent:'flex-end', alignItems: 'flex-end',justifyContent:'flex-end',width:'25%',flexDirection:'row' }}>
                                    <TouchableOpacity onPress={() => { this.dismissScreen(); }}>
              <View style={[styles.CloseView,]}>
              <Icon name="close" size={25} color="white"/>
              </View>
            </TouchableOpacity>                
              </View>
            </View>
            <ScrollView>
               <View style={{width:'100%',justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:5}}>
                   <View style={{width:'95%'}}>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Contest Name</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.contest_name}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Max Users</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.max_user}</Text>
                      
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:10}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Min Picks</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.min_picks}</Text>
                      
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:10}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Max Picks</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.max_picks}</Text>
                      
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:10}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Contest Type</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.contest_type}</Text>

                                        <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:10}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Sports/Leagues</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.league_name}</Text>
                      
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:10}}/>

                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Winning Type</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.winning_type}</Text>
                      
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:10}}/>

        <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>{this.props.join_type=='public_contest'?'Guaranteed Winning Amount':this.props.join_type=='private_contest'?'Guaranteed Winning Amount':'Prize'}</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.winning_type=='UDDA Bucks'?<Image source={require('../../../images/buck_dark.png')} style={{ width: wp(4), height: wp(4),marginTop:0}} resizeMode='contain' />:null} {this.state.contestDetail.winning_amount}</Text>
                      
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:10}}/>

                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Prize Type</Text>
                       <TouchableOpacity onPress={()=>{this.state.contestDetail.prize_type=='Winner Takes All'?null:this.gotoinfo()}}>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color:this.state.contestDetail.prize_type=='Winner Takes All'? 'black':'#68bcbc', fontFamily: 'Montserrat-Bold', textDecorationLine: this.state.contestDetail.prize_type=='Winner Takes All'?  'none':'underline' }}>{this.state.contestDetail.prize_type}</Text>
                                        </TouchableOpacity>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:10}}/>



                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Contest Fee</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.join_fee}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>First Game Date</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.contest_start_date}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/>                  
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Last Game Date</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.contest_end_date}</Text>
                                        <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Last Date to Register</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.last_date_to_register}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/>
                      { this.state.contestDetail.bankroll=='Y'?<View>  
                       {/* <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Min Bankroll Amount</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.min_bankroll_amount}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/>  */}
                       {/* <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Max Bankroll Amount</Text> */}
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Bankroll Amount</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.bankroll_amount}</Text>
                                        {/* <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.max_bankroll_amount}</Text> */}
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/> 
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Min Bet Bankroll</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.min_bet_bankroll}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/> 
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Max Bet Bankroll</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.max_bet_bankroll}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/> 
                       </View> :null     }             



                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Status</Text>
                                             
                       <View style={{flexDirection:'row'}}>
                                            <Text style={{ padding: 5, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.settlement_status}</Text>
                      {this.props.join_type=='private_contest' && <View style={{ padding: 10 }}>
                                                <TouchableHighlight 
                                                 onPress={() => this.showPopover()}
                                                 >
                                                    <Image ref={ref => this.touchable = ref} source={require('./../../../images/Bet_Share.png')} style={{ height: 20, width: 20 , tintColor:"#68bcbc"}} resizeMode='contain' tintColor="#68bcbc" />

                                                </TouchableHighlight>

                                            </View>}
                       </View>

                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:15}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Winner Declared By</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.contestDetail.winner_decleared_by}</Text>
                           
                       {/* <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:15}}/> */}
                       <Text style={{padding:5, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}></Text>
                       <Text style={{padding:5, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{''}</Text>
                       
                       
                   </View>
               </View>
               </ScrollView>
               </SafeAreaView>
               {this.state.BlackDialog && this.getblackDialog()}
            </Modal>

 

                </ScrollView>

            </View>
        );
    }
}


































