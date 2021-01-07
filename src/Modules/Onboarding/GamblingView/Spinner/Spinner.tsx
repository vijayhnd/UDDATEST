import React, { createRef, useState } from 'react';
import { View, Text, Image,StyleSheet,Button, FlatList,ImageBackground,Alert, Platform,TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, TextInput, TouchableHighlight, Animated, Keyboard, Dimensions, UIManager, Share, Modal } from "react-native"; 

// import styles from './settlepoolinfostyles';
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
import { ScrollView } from "react-native-gesture-handler";
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import ServiceAction from "../../../../ReduxStore/Generic/GenericeServiceAction";
import ServiceKeys from "../../../../Services/Core/ServiceKeys";
import { ServiceType } from "../../../../Services/Core/ServiceFactory";
import { connect } from 'react-redux';
import { UDDAError } from "../../../../Entities";
import { ServiceRequestStatus } from "../../../../ReduxStore/ServiceState";
import { GlobalAppState } from "../../../../ReduxStore";
import ReferralService from "../../../../Services/Referral/ReferralService";
import WheelOfFortune from 'react-native-wheel-of-fortune';
import SettingsStyles from "./styles";
import Modals from 'react-native-modal';

//let participants = ['100','200','300' ]
//let rewards = participants.map(e => ({ uri: 'https://trueconnect.jio.com/assets/img/graph-chart.jpg' }))
var update = require('immutability-helper');
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;


interface G_SpinnerViewProps extends AppValidationComponentProps {


    serviceKey?: string
    listeners?: any
}

interface G_SpinnerViewState extends AppValidationComponentState {
    winnerValue: any,
    winnerIndex: any,
    spinData:any,
    showspin:any,
    backwork:any,
    loader: any,
    windialog: any,
    winner_message:any,
    spinner_dialog:any,
    spinner_price:any,
    purchase_dialog:any,
    Bought_spin:any,
    Udda_spin:any,
    show_popup:any,
    Spinneralldata:any,
    boarddata:any,
    
    winnerIndexValue:any,

}

class G_SpinnerView extends AppValidationComponent<G_SpinnerViewProps, G_SpinnerViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
      private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    public child;

    constructor(props: G_SpinnerViewProps) {
        super(props);
        this.child = createRef();
        this.state = {
            winnerValue: null,
            winnerIndex: null,
            //  spinData:["12345"],
           spinData:["Pack",'Back',"Phones",'Head',"Tracker",'Activity',"",'Bike',"Chair",'Folding',' ','Bottle','','HAT','W/wheels','Cooler','Grill','Gas','Speaker','Portable',],
            showspin:false,
            backwork:false,
            loader: false,
            windialog: false,
            winner_message:'',
            Bought_spin:'',
            Udda_spin:'',
            show_popup:'',
            spinner_dialog:false,
            purchase_dialog:false,
            spinner_price:[],
            boarddata:[],
            Spinneralldata:{},
            winnerIndexValue:0,

        };
    }

  
    accountNameTapped() {
      if(this.state.backwork==false)
      {  this.props.navigation!.navigate(AppScreens.G_ProfileView);}
    }

    iconDidTapped() {
      if(this.state.backwork==false)
       { this.props.navigation!.navigate(AppScreens.G_Settings_2_View);}
    }

    LogoiconDidTapped() {
      if(this.state.backwork==false)
        {
			//RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
			RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
			}
    }


    availableBalanceTapped() {
    }

    openPlaysTapped() {
      if(this.state.backwork==false)
        {RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)}

    }

    coveredPlaysTapped() {
      if(this.state.backwork==false)
        {RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)}
    }
     componentDidMount() {
       this.getSpinData();
    //  console.log('spinner_alldata',this.props.navigation.state.params.params.spinner_alldata)
    //  this.setState({Bought_spin:this.props.navigation.state.params.params.spinner_alldata.bought_spin})
    //  this.setState({Udda_spin:this.props.navigation.state.params.params.spinner_alldata.udda_spin})
    //  this.setState({show_popup:this.props.navigation.state.params.params.popup})
    //  if(this.props.navigation.state.params.params.popup == '0')
    //  {
    //   this.setState({purchase_dialog:false})
    //  }else{
    //   this.setState({purchase_dialog:true})
    //  }
     
      
    }
    BuySpin() {
      // console.log('spinner_alldata',this.props.navigation.state.params.params.spinner_alldata)
      this.setState({purchase_dialog:false})
      this.props.navigation.push(AppScreens.G_SpinnerPurchase, { spinner_data:this.state.Spinneralldata  })
       
     }

    getSpinData() {
      
    this.setState({loader:true})
    fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Spin/spin_info', {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorisation': this.authorisationToken
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        var that=this;
       
if (responseJson.message == "Access Expired.") {
    console.log("Footer comp ---->" + responseJson.message);
    //this.logoutButtonPressed();
    that.setState({loader:false})
  }
  else{

   console.log('spinData new ashish >>' +JSON.stringify(responseJson));
  

   
       
        var a = []
        responseJson.data.boardData.map((item)=>{
            a.push(item.product_title)
        })
        console.log('spinData product title >>' , a);
      var that = this;
        setTimeout(function(){  that.setState({loader:false}); that.setState({spinner_price:a})},500)
      
        this.setState({winnerIndexValue:responseJson.data.winner_index})
        
        this.setState({Spinneralldata:responseJson.data})
        this.setState({boarddata:responseJson.data.boardData})
        this.setState({Bought_spin:responseJson.data.bought_spin})
     this.setState({Udda_spin:responseJson.data.udda_spin})
     this.setState({show_popup:responseJson.show_plan_pop_up})

     setTimeout(function(){
     if(responseJson.show_plan_pop_up == '0')
     {
      that.setState({purchase_dialog:false})
     }else{
      that.setState({purchase_dialog:true})
     }
    },1000)
          // this.props.navigation!.navigate(AppScreens.G_Spinner, { params: { spinner_data: a,spinner_alldata: responseJson.data,popup:responseJson.show_plan_pop_up } });
   
 

    }

      })
      .catch(error => {
       // AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
        console.log(error);
      })
    }


    UpadteUserAmount(winnetAmount,index) {
      this.setState({spinData:this.state.spinner_price})
      this.setState({winnerIndexValue:''})
      this.setState({spinner_price:[]})
      
      if(this.state.show_popup == '0'){

        this.setState({ loader: true });
        if(this.state.Spinneralldata.display_on_board =='swag')
        {
          winnetAmount = this.state.Spinneralldata.boardData[index].product_id
        }
        else{
          winnetAmount = this.state.Spinneralldata.boardData[index].product_id
        }
       // alert(winnetAmount+'>>>>'+index+'>>>'+this.props.navigation.state.params.params.spin_alldata);
        var params: any = {
          'winning_prize': winnetAmount,
        };
  
        var formData = new FormData();
  
        for (var k in params) {
          formData.append(k, params[k]);
        }
        var headers: any = { authorisation: this.authorisationToken };
        if (
          typeof Application.sharedApplication().currentUserLocation != "undefined"
        ) {
          headers[
            "latitude"
          ] = Application.sharedApplication().currentUserLocation!.latitude;
          headers[
            "longitude"
          ] = Application.sharedApplication().currentUserLocation!.longitude;
        }
        console.log("Headers in aceept bingo ", JSON.stringify(headers));
        fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/spin/play_spin', {
          method: 'POST',
          headers: headers,
          body:formData
  
        }).then((response) => response.json())
          .then((responseJson) => {
            console.log(JSON.stringify(responseJson))
            // this.setState({spinner_price:this.state.spinData})
            this.setState({backwork:false})
           
           // this.setState({ loader: false });
            var that=this;
    if (responseJson.message == "Access Expired.") {
        // AlertUtil.show("Session Expired ! Please login again");
        console.log("Footer comp ---->" + responseJson.message);
        this.setState({ loader: false });
        //this.logoutButtonPressed();
      }
      else{
       
        // this.setState({Bought_spin:responseJson.bought_spin})
        // this.setState({Udda_spin:responseJson.udda_spin})
        // this.setState({show_popup:responseJson.show_plan_pop_up})
       this.setState({winner_message:responseJson.message})
      
       if(responseJson.response_code == '1')
       {
         console.log('yes')
        this.setState({ loader: false });
       this.setState({windialog:true})
       }
       else{
        console.log('no')
       
       ///AlertUtil.showSingleActionMessage( responseJson.message,function(){  that.setState({ loader: false }); RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, that.props);});
     AlertUtil.showSingleActionMessage( responseJson.message,function(){  that.setState({ loader: false });  that.getSpinData()});
    
      }
      // that.setState({ spinData: responseJson.data.udda_bucks });
      
   
        }
    
          })
          .catch(error => {
           // AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
            console.log(error);
          })

      }else{
        this.setState({purchase_dialog:true})
      }

     
    }

    // -----------------------------------------------Design and Design Methods---------------------------------------
startSpin(){
 
  var that = this;
  
  if(that.state.show_popup == '0'){
 
  this.child._onPress()

  }
  else
  {
   setTimeout(function(){ that.setState({purchase_dialog:true })},100) ;
  }
   //this.props.navigation.push(AppScreens.G_SpinnerPurchase)
  // var that = this;
  // console.log(this.props.navigation.state.params.params.spinner_alldata.joinning_type );
  // if(this.props.navigation.state.params.params.spinner_alldata.joinning_type == 'paid'){
  //   Alert.alert(
  //       'Alert',
  //       that.props.navigation.state.params.params.spinner_alldata.joining_fess_msg,
  //       [
  //           { text: 'Continue', 
  //           onPress: () => {
  //             this.setState({backwork:true}),
  //           this.child._onPress() } 
  //       },
  //           {
  //               text: 'Cancel',
  //               onPress: () => {   console.log('No Thanks Pressed');},
  //               style: 'cancel',
  //           },
  //       ],
  //       { cancelable: false }
  //   );
  //   }else{
  //     this.setState({backwork:true})
  //     this.child._onPress()
  //   }
  
}
    render() {

        


        return (
            <Container
                title={'SPIN & WIN'}
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                showIndicator={false}
                menuIconListener={this}
                LogoIconListener={this}
                accountNameListener={this}
                availableBalanceListener={this}
                coveredPlaysListener={this}
                openPlaysListener={this}
                isSetting={false} >
<Dialog
                      // visible={true}
                    visible={this.state.purchase_dialog}
                    contentStyle={{ margin: 0, padding: 0, paddingTop: 0, borderRadius: 10, borderWidth: 1, backgroundColor: 'white' }}
                    dialogStyle={{ maxHeight: '90%', borderRadius: 10, borderWidth: 1 }}
                    onTouchOutside={() => this.setState({ purchase_dialog: false })} >
                    <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10,paddingLeft:20 }}>
                            <Text style={{ color: '#68bcbc' ,width:'80%' ,fontSize: hp(2.4),textAlign:'center', fontFamily: 'Montserrat-Bold' ,justifyContent:'center',alignContent:'center',alignItems:'center'}}>UDDA WINNER</Text>
                            <TouchableOpacity onPress={() => { this.setState({ purchase_dialog: false }) }}>
                                <Image source={require('../../../../images/close.png')} style={{ width: wp(4), height: wp(4), marginRight: wp(5), tintColor: 'grey', marginTop: 4 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                         <View style={{ width: '100%',padding:8,backgroundColor:'#fff',marginTop:5,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                          <Text style={{color: '#424242', fontFamily: 'Montserrat-Bold', fontSize: hp(2.0)}}>Hey!! your free spin is over.</Text>
                          <Text style={{color: '#424242', fontFamily: 'Montserrat-Bold', fontSize: hp(2.0)}}>You can still spin & win more.. </Text>
                  
                        </View>

                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%'}}>
                      <TouchableOpacity onPress={()=>{this.BuySpin()}} style={{width:'90%',backgroundColor:'#68bcbc',padding:6,marginTop:5,paddingBottom:10,paddingTop:10}}>
                      <Text style={{color: '#fff', fontFamily: 'Montserrat-Bold', fontSize: hp(2.0),textAlign:'center' }}>View Options</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{this.setState({ purchase_dialog: false })}} style={{width:'90%',backgroundColor:'#fff',padding:6,marginTop:5,marginBottom:8,paddingBottom:10,paddingTop:10}}>
                      <Text style={{color: '#72bfbf', fontFamily: 'Montserrat-Bold', fontSize: hp(2.0),textAlign:'center' }}>Not Now</Text>
                      </TouchableOpacity>
                      </View>
                     
                        

                    </View>


                </Dialog>

<Dialog
                        visible={this.state.windialog}
                        title=""
                        // onTouchOutside={() => this.setState({windialog:false})} 
                        contentStyle={{padding:0,margin:0,backgroundColor:'white'}}
                        // onTouchOutside={() => this.setState({ guestUserDialog: false })} 
                        >

                        <View style={{ backgroundColor: "white" }}>

                            <View style={{ justifyContent: "center", padding: 0,paddingTop:0, alignItems: 'center' }}>
                                {/* <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.8), marginTop: 0, color: '#5b5b5b',textAlign:'center' }}>
                                congratulation
                                 </Text> */}
                                 <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                 {/* <Image source={require('../../../../images/buck_dark.png')} style={{height:20,width:20,marginTop:-1 }}></Image> */}
                                 <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(3.4), textAlign:'center', color: '#68bcbc',fontWeight:'bold' }}>Congratulations!</Text>
                                
                                 </View>
                                 <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#68bcbc",
                        marginBottom: 3,
                        marginTop: 15,
                        marginBottom: 15,
                        width:'100%'
                      }}
                    />
                                 <Text style={{ fontFamily: 'Montserrat-Semibold', fontSize: hp(2.5),  color: '#5b5b5b',textAlign:'center', padding:5}}>
                                {this.state.winner_message} 
                                 {/* <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.5), color: '#68bcbc' }}>{'FREE'}</Text> */}
                                 </Text> 
                                 <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#68bcbc",
                        marginBottom: 3,
                        marginTop: 20,
                        marginBottom: 20,
                        width:'100%'
                      }}
                    />
                    {/* <Image source={require('../../../images/no-credit.png')} style={{height:20,width:20 ,marginRight:5}}></Image> */}
                               
                                 {/* <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#d4d4d4",
                        marginBottom: 15,
                        marginTop: 3,
                        width:'100%'
                      }}
                    /> */}
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                                {/* <View style={{ width: '46%' }}>
                                    <BigButton title="Cancel" style={{ backgroundColor: '#68bcbc',height:50 }} textStyle={SettingsStyles.verify_button_text_style}
                                        listener={() => {this.setState({windialog:false}) }} />
                                </View> */}
                                <View style={{ width: '4%' }}></View>
                                <View style={{ width: '46%' }}>
                                    <BigButton title="OK" style={{ backgroundColor: '#68bcbc',height:50 }} textStyle={SettingsStyles.verify_button_text_style}
                                        listener={() => { 
                                          this.getSpinData()
                                          this.setState({windialog:false})
                      // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
                                          }} />
                                </View>
                            </View>
                        </View>
                    </Dialog>

{/*Re-enter Dialog Design start */}





{/*Re-enter Dialog Design end */}


                   <ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />
{this.state.spinData?
<View style={{height:'100%',backgroundColor:'#6bbfbe'}}>
  <View style={{width:'100%',height:'7%',backgroundColor:'#dddddd',flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
<View style={{width:'40%'}}>
<Icon name="long-arrow-left" size={30} color="black" style={{marginLeft:8}}
onPress={()=>this.state.backwork == false?this.props.navigation.replace(AppScreens.G_DashboardView):null}
/>
</View>
<View style={{width:'60%' }}>
<Text style={{width:'100%', color:'black' , fontSize:20, fontWeight:'bold'}} >{'SPIN & WIN'}</Text>
</View>
  </View>
  <ImageBackground source={require('../../../../images/spin-bg.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: '100%' }}>
      <View style={[styles.container,{height:'85%'}]}>
      <View style={{height:'5%',flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
<Text style={{color: 'Black', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.5)}} >{' Purchased Spins :'}<Text style={{color: 'Black', fontFamily: 'Montserrat-Bold', fontSize: hp(2.5)}}>{' '+this.state.Bought_spin}</Text></Text>
      <Text style={{color: 'Black', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.5)}} >{'Free Spins :'}<Text style={{color: 'Black', fontFamily: 'Montserrat-Bold', fontSize: hp(2.5)}}>{' '+this.state.Udda_spin} </Text></Text>
      </View>
        {this.state.spinner_price.length==0?<View style={{height:'70%'}}></View>:<WheelOfFortune
          onRef={ref => (this.child = ref)}
          clickevent={this.startSpin.bind(this)}
          //onPress={this.child._onPress()}
          //  rewards={this.props.navigation.state.params.params.spinner_data}
           rewards={this.state.spinner_price}  
          fontsize = {this.state.Spinneralldata.display_on_board =='swag' ? 16 :22}       
          knobSize={40}
          borderWidth={0}
          borderColor={"#fff"}
          innerRadius={50}
          duration={10000}
          backgroundColor={"#fff"}
          textColor={"#000"}
         

          winner={this.state.winnerIndexValue}
          getWinner={(value, index) => {
            console.log('spinner value :  ',value)
             console.log('spinner index :  ',index)
            
            this.UpadteUserAmount(value,index),
            this.setState({ winnerValue: value, winnerIndex: index })

          }}
        />}
        {/* <Button title="Press me" onPress={() => { this.child._onPress() }} /> */}
        <View style={{height:'5%'}}>
      <Text style={{width:'100%', color:'black' , fontSize:20, fontWeight:'bold'}} >{'Tap on center to spin'}</Text>
      </View>
      </View>
      </ImageBackground>
     
      </View>
    :null}
            </Container >
        );

    }

}


const mapStateToProps = (state: GlobalAppState) => ({
    requestStatus: state.serviceReducer.requestStatus,
    error: state.serviceReducer.error,
    serviceKey: state.serviceReducer.serviceKey,
    listeners: state.serviceReducer.listeners,




})



export default connect(mapStateToProps)(G_SpinnerView);
const styles = StyleSheet.create({
    container: {
       
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: '#E74C3C'
    },
    winner: {
      width: '100%',
      position: 'absolute',
      padding: 10,
      backgroundColor: '#fff',
      bottom: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    winnerText: {
      fontSize: 26,
      color: '#666'
    },
    tapToStart: {
      fontSize: 20,
      color: '#000',
      fontWeight: 'bold'
    }
  });