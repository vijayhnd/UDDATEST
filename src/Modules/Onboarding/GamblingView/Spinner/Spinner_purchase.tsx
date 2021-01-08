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
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';
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
import SettingsStyles from "./styles";
import Modals from 'react-native-modal';

var update = require('immutability-helper');
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;


interface G_SpinnerViewProps extends AppValidationComponentProps {


    serviceKey?: string
    listeners?: any
}

interface G_SpinnerViewState extends AppValidationComponentState {
   
    spinner_price:any,
    loader:any,
    purchase_dialog:any,
    item:any,
}

class G_SpinnerView extends AppValidationComponent<G_SpinnerViewProps, G_SpinnerViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
      private authorisationToken = Application.sharedApplication().user!.authenticationToken;
    public child;
    private referralservice = new ReferralService(); //Vijay

    constructor(props: G_SpinnerViewProps) {
        super(props);
        this.child = createRef();
        this.state = {
           item:[],
            spinner_price:[],
            loader:false,
            purchase_dialog:false,

        };
    }

  
    accountNameTapped() {
        this.props.navigation!.navigate(AppScreens.G_ProfileView);
    }
    

    iconDidTapped() {
      
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
            }

    LogoiconDidTapped() {
     
			RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
			
    }


    availableBalanceTapped() {
    }

    openPlaysTapped() {
     RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props)

    }

    coveredPlaysTapped() {
      RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props)
    }
     componentDidMount() {
     console.log('spinner_purchase_alldata',this.props.navigation.state.params.spinner_data)

     this.setState({spinner_price:this.props.navigation.state.params.spinner_data.spin_paid_plans})
      
    }

 


    // -----------------------------------------------Design and Design Methods---------------------------------------
confirmToBuySpin(itemData:any)
{
   
  this.setState({item:itemData})
  this.setState({purchase_dialog:true})
  

}

    startSpin(item : any){
      this.setState({ purchase_dialog: false })
//  alert('hello working')
console.log('purchase item : ',item)

this.setState({ loader: true });

// alert(winnetAmount+'>>>>'+index+'>>>'+this.props.navigation.state.params.params.spin_alldata);
var params: any = {
  'spin_plan_id': item.id,
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
fetch(UrlService.CONSTURI + 'index.php/'+ UrlService.APIVERSION3 +'/Spin/plan_purchase', {
  method: 'POST',
  headers: headers,
  body:formData

}).then((response) => response.json())
  .then((responseJson) => {
    var that=this;
//alert(UrlService.APPVERSION_iOS +'>>>>'+ responseJson.data.ios_version);
if (responseJson.message == "Access Expired.") {
// AlertUtil.show("Session Expired ! Please login again");
console.log("Footer comp ---->" + responseJson.message);
this.setState({ loader: false });
//this.logoutButtonPressed();
}
else{
if(responseJson.error == 0)
{
  this.referralservice.getProfile().then((res: any) => {
    if (res) {
      this.setState({ loader: false });
      this.props.navigation!.replace(AppScreens.G_Spinner);
    }

});
  
}else
{
  AlertUtil.showSingleActionMessage(responseJson.message,function(){

    that.setState({ loader: false });
  })
}

// AlertUtil.showSingleActionMessage( responseJson.message,function(){ 
//    that.setState({ loader: false }); RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, that.props);});

}

  })
  .catch(error => {
   // AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
    console.log(error);
  })
  
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
                            <Text style={{ color: '#68bcbc', fontSize: hp(2.4), fontFamily: 'Montserrat-Bold' ,width:'80%' ,fontSize: hp(2.4),textAlign:'center', fontFamily: 'Montserrat-Bold' ,justifyContent:'center',alignContent:'center',alignItems:'center'}}>UDDA WINNER</Text>
                            <TouchableOpacity onPress={() => { this.setState({ purchase_dialog: false }) }}>
                                <Image source={require('../../../../images/close.png')} style={{ width: wp(4), height: wp(4), marginRight: wp(5), tintColor: 'grey', marginTop: 4 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                         <View style={{ width: '100%',padding:8,backgroundColor:'#fff',marginTop:5,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                          {/* <Text style={{color: '#424242', fontFamily: 'Montserrat-Bold', fontSize: hp(2.0)}}>Hey!! your free spin is over.</Text> */}
                          <Text style={{color: '#424242', fontFamily: 'Montserrat-Bold', fontSize: hp(2.0)}}>Are you sure want to proceed to buy more Spins? </Text>
                  
                        </View>

                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%'}}>
                      <TouchableOpacity onPress={()=>{this.startSpin(this.state.item)}} style={{width:'90%',backgroundColor:'#68bcbc',padding:6,marginTop:5,paddingBottom:10,paddingTop:10}}>
                      <Text style={{color: '#fff', fontFamily: 'Montserrat-Bold', fontSize: hp(2.0),textAlign:'center' }}>Proceed</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{this.setState({ purchase_dialog: false })}} style={{width:'90%',backgroundColor:'#fff',padding:6,marginTop:5,marginBottom:8,paddingBottom:10,paddingTop:10}}>
                      <Text style={{color: '#72bfbf', fontFamily: 'Montserrat-Bold', fontSize: hp(2.0),textAlign:'center' }}>Not Now</Text>
                      </TouchableOpacity>
                      </View>
                     
                        

                    </View>


                </Dialog>

{/* <Modals 
            isVisible={this.state.spinner_dialog}
            // isVisible={true}
            style={{ justifyContent: 'flex-end', margin: 0,padding:0}}
            
            // onBackButtonPress={this.dismissScreen() }
            // onBackdropPress={this.dismissScreen() }
            
          >

          
          <View style={{ backgroundColor: "#fff",width:'100%',height:'auto',maxHeight:'80%',borderRadius:10,borderTopWidth:1,borderColor:'#fff' }}>

<View style={{ width: '100%' }}>
                 <View style={{height:'20%'}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={{ color: '#68bcbc', fontSize: hp(3.0), fontFamily: 'Montserrat-Bold' }}>SPIN & WIN</Text>
                            <TouchableOpacity onPress={() => { this.setState({ spinner_dialog: false }) }}>
                                <Image source={require('../../../../images/close.png')} style={{ width: wp(4), height: wp(4), marginRight: wp(5), tintColor: 'grey', marginTop: 4 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                         <View style={{ width: '100%',padding:8,backgroundColor:'#dddddd',marginTop:5,justifyContent:'center',alignContent:'center',alignItems:'center',flexDirection:'row'}}>
                          <Text style={{color: '#494949', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.5)}}>Get more <Text style={{color: 'black', fontFamily: 'Montserrat-Bold', fontSize: hp(2.5) }}>{'spins & earns'}</Text> big !! </Text>
                  
                        </View>
                        </View>
                      <View style={{height:'80%'}}>
                      <FlatList
                  data={this.state.spinner_price}
                  extraData={this.state}
                  keyExtractor={(item: any, index) => index.toString()}
                  bounces={false}
                  renderItem={({ item, index }: any) => {
                   
                    return (
                      <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginTop:5,marginBottom:5,padding:5}}>
                      <View style={{width:'45%',height:70}}>
                        <ImageBackground source={require('../../../../images/spin_bg.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: '100%',justifyContent:'center' }}>
                                  <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                  <Text style={{color: '#494949', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.8),textAlign:'center'}}>{'For'}</Text>
                                  <Text style={{color: 'Black', fontFamily: 'Montserrat-Bold', fontSize: hp(3.2),textAlign:'center'}}>{item.spin} Spin</Text>
                                  </View>
                        </ImageBackground>
                      </View>
                      <TouchableOpacity onPress={()=>{AlertUtil.show('You pay Index : '+ index)}} style={{width:'45%',backgroundColor:'#d0edeb',height:70,justifyContent:'center',borderRadius:10,borderWidth:1,borderColor:'#fff'}}>
                      <View style={{width:'100%',justifyContent:'center'}}>

                      <Text style={{color: '#494949', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.8),textAlign:'center'}}>You Pay</Text>
                                  <Text style={{color: 'Black', fontFamily: 'Montserrat-Bold', fontSize: hp(3.2),textAlign:'center'}}> <Image source={require('../../../../images/buck_dark.png')} style={{ width: wp(4), height: wp(4),tintColor:'#71c0c0' }} resizeMode='contain' /> {item.pay}</Text>
                      </View>
                      </TouchableOpacity>
                      </View>
                    )
                  }}
                />
               
                      
                      </View>
                     
                        

                    </View>

         </View>
                  </Modals> */}
{/*Re-enter Dialog Design end */}


                   <ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />

<View style={{height:'100%',backgroundColor:'#dddddd'}}>
  <View style={{width:'100%',height:'7%',backgroundColor:'#fff',flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
<View style={{width:'35%'}}>
<Icon name="long-arrow-left" size={30} color="black" style={{marginLeft:8}}
onPress={()=>this.props.navigation.goBack(null)}
/>
</View>
<View style={{width:'65%' }}>
<Text style={{width:'100%', color:'#63bbbb' , fontSize:20, fontWeight:'bold'}} >{'SPIN & WIN'}</Text>
</View>
  </View>
 
      <View style={[{height:'93%',backgroundColor:'#eeeeee',width:'100%'}]}>
      <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',paddingTop:5,paddingBottom:5}}>
      <Text style={{color: '#494949', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.5)}}>Get more <Text style={{color: 'black', fontFamily: 'Montserrat-Bold', fontSize: hp(2.5) }}>{'spins & earns'}</Text> big !! </Text>
      </View>
      <View style={{height:'90%',alignContent:'center',alignItems:'center',width:'100%'}}>
      {this.state.spinner_price.map((item,index)=>{
        var showprice = item.spin_amount.split(".");
          return(
            <TouchableOpacity style={{width:'95%',borderRadius: 10, borderColor: '#68bcbc',
            borderWidth:  0,shadowColor: '#666666', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 2.0,elevation:15}} onPress={()=>{this.confirmToBuySpin(item)}}>
            <View style={{width:'100%',flexDirection:'row',marginBottom:5,marginTop:5}}>
               
            <View style={{width:'50%',backgroundColor:'#fff',height:60,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            {/* <Text style={{color: '#494949', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0),textAlign:'center'}}>{'For'}</Text> */}
          <Text style={{color: 'Black', fontFamily: 'Montserrat-Bold', fontSize: hp(3.0),textAlign:'center'}}>{item.spin_count} Spin{item.spin_count > 1?'s':''}</Text>
            </View>
            
            <View style={{width:'50%',backgroundColor:'#daeeef',height:60,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            <Text style={{color: '#494949', fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.0),textAlign:'center',marginLeft:10}}>You Pay</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../../images/buck_dark.png')} style={{ width: wp(4), height: wp(4),tintColor:'#71c0c0' }} resizeMode='contain' />
                <Text style={{ color: 'black', fontSize: hp(3.0), textAlign: 'center', fontFamily: 'Montserrat-Bold',marginLeft:5 }}>{showprice[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.</Text>
                  <Text style={{ color: 'black', fontSize: hp(2.1), textAlign: 'center', fontFamily: 'Montserrat-Bold', marginBottom: 7 }}>{showprice[1]}</Text>
                </View>
                                  {/* <Text style={{color: 'Black', fontFamily: 'Montserrat-Bold', fontSize: hp(2.5),textAlign:'center'}}> {item.pay}</Text>
                                  <Text style={{color: 'Black', fontFamily: 'Montserrat-Bold', fontSize: 8,marginBottom:25}}>00</Text> */}
            </View>
            
             </View>
             </TouchableOpacity>
            
          )
      })}
                      {/* <FlatList
                  data={this.state.spinner_price}
                  extraData={this.state}
                  keyExtractor={(item: any, index) => index.toString()}
                  bounces={false}
                  renderItem={({ item, index }: any) => {
                   
                    return (
                      <View style={{width:'100%',flexDirection:'row',margin:8}}>
                     <View style={{width:'50%',backgroundColor:'red',height:20}}></View>
                     <View style={{width:'50%',backgroundColor:'green',height:20}}></View>
                      </View>
                    )
                  }}
                /> */}
               
                      
                      </View>
      </View>

     
      </View>
   
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