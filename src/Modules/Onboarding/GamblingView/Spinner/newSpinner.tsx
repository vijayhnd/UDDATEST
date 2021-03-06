import React, { createRef, useState } from 'react';
import { View, Text, Image,StyleSheet,Button, FlatList,ImageBackground,Alert, Platform,TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, TextInput, TouchableHighlight, Animated, Keyboard, Dimensions, UIManager, Share, Modal } from "react-native"; 

import SettingsStyles from "./styles";
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
// import WheelOfFortune from './react-native-wheel-of-fortune/src/index';
import WheelOfFortune from './SpinnerComponent';


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



    UpadteUserAmount(winnetAmount,index) {

      this.setState({ loader: true });
      if(this.props.navigation.state.params.params.spinner_alldata.display_on_board =='swag')
      {
        winnetAmount = this.props.navigation.state.params.params.spinner_alldata.boardData[index].product_id
      }
      else{
        winnetAmount = this.props.navigation.state.params.params.spinner_alldata.boardData[index].product_id
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
          this.setState({backwork:false})
          this.setState({ loader: false });
          var that=this;
  //alert(UrlService.APPVERSION_iOS +'>>>>'+ responseJson.data.ios_version);
  if (responseJson.message == "Access Expired.") {
      // AlertUtil.show("Session Expired ! Please login again");
      console.log("Footer comp ---->" + responseJson.message);
      this.setState({ loader: false });
      //this.logoutButtonPressed();
    }
    else{
     console.log('udaaAmount added >>' +JSON.stringify(responseJson));
     this.setState({windialog:true})
    //  AlertUtil.showSingleActionMessage( responseJson.message,function(){  that.setState({ loader: false }); RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, that.props);});
   
    // that.setState({ spinData: responseJson.data.udda_bucks });
    
 
      }
  
        })
        .catch(error => {
         // AlertUtil.show("GETPromotionalMSG Error " + JSON.stringify(error));
          console.log(error);
        })
    }

    // -----------------------------------------------Design and Design Methods---------------------------------------
startSpin(){
  console.log(this.props.navigation.state.params.params.spinner_alldata.joinning_type );
  if(this.props.navigation.state.params.params.spinner_alldata.joinning_type == 'paid'){
    Alert.alert(
        'Alert',
        this.props.navigation.state.params.params.spinner_alldata.joinning_fees+' UDDA Bucks will be deducted for joining this contest.',
        [
            { text: 'Continue', 
            onPress: () => {
              this.setState({backwork:true}),
            this.child._onPress() } 
        },
            {
                text: 'Cancel',
                onPress: () => {   console.log('No Thanks Pressed');},
                style: 'cancel',
            },
        ],
        { cancelable: false }
    );
    }else{
      this.setState({backwork:true})
      this.child._onPress()
    }
  
}
    render() {

        


        return (
            <Container
                title={'Spin & Win'}
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
                        visible={this.state.windialog}
                        title=""
                        onTouchOutside={() => this.setState({windialog:false})} 
                        contentStyle={{padding:0,margin:0,backgroundColor:'white'}}
                        // onTouchOutside={() => this.setState({ guestUserDialog: false })} 
                        >

                        <View style={{ backgroundColor: "white" }}>

                            <View style={{ justifyContent: "center", padding: 0,paddingTop:0, alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: hp(2.8), marginTop: 0, color: '#5b5b5b',textAlign:'center' }}>
                             Register Now & Receive
                                 </Text>
                                 <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                 <Image source={require('../../../../images/buck_dark.png')} style={{height:20,width:20,marginTop:-1 }}></Image>
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
                                  <Image source={require('../../../../images/no-credit.png')} style={{height:25,width:25 ,marginRight:5}}></Image> 
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
                                        listener={() => {this.setState({windialog:false}) }} />
                                </View>
                                <View style={{ width: '4%' }}></View>
                                <View style={{ width: '46%' }}>
                                    <BigButton title="OK" style={{ backgroundColor: '#68bcbc',height:50 }} textStyle={SettingsStyles.verify_button_text_style}
                                        listener={() => { this.setState({windialog:false}) }} />
                                </View>
                            </View>
                        </View>
                    </Dialog>




                   <ProgressLoader
          visible={this.state.loader}
          isModal={true} isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"} />
{
<View style={{height:'100%',backgroundColor:'#6bbfbe'}}>
  <View style={{width:'100%',height:'7%',backgroundColor:'#dddddd',flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
<View style={{width:'40%'}}>
<Icon name="long-arrow-left" size={30} color="black" style={{marginLeft:8}}
onPress={()=>this.state.backwork == false?this.props.navigation.goBack(null):null}
/>
</View>
<View style={{width:'60%' }}>
<Text style={{width:'100%', color:'black' , fontSize:20, fontWeight:'bold'}} >{'Spin & Win'}</Text>
</View>
  </View>
  <ImageBackground source={require('../../../../images/spin-bg.png')}
                                resizeMode="stretch"
                                style={{ width: '100%', height: '100%' }}>
      <View style={[styles.container,{height:'85%'}]}>
      <WheelOfFortune
          onRef={ref => (this.child = ref)}
           clickevent={this.startSpin.bind(this)}
          //onPress={this.child._onPress()}
          rewards={this.props.navigation.state.params.params.spinner_data}
          // rewards={this.state.spinData}         
          knobSize={40}
          borderWidth={0}
          borderColor={"#fff"}
          innerRadius={50}
          duration={10000}
          backgroundColor={"#fff"}
          textColor={"#000"}
         

            winner={this.props.navigation.state.params.params.spinner_alldata.winner_index}
          getWinner={(value, index) => {
            // this.UpadteUserAmount(value,index),
            // this.setState({ winnerValue: value, winnerIndex: index })
            alert(value+'sxxsx'+ index)

          }}
        />
       
        
       
      </View>
      </ImageBackground>
      </View>
    }
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