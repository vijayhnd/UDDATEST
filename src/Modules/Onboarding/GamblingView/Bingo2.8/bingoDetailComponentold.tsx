import React, {  Component } from "react";

import { View, Text, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage, TextInput, TouchableHighlight, Animated, Keyboard, Dimensions, UIManager, Share,Modal,ImageBackground, SafeAreaView, ScrollView } from "react-native";
import styles from './styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AlertUtil from "../../../../Util/AlertUtil";
import { IComponentProps, IComponentState } from "../../../../Components/IProps";
import Application from "../../../../Entities/Application";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from "../../../../Services/Core/ServiceURI"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressLoader from 'rn-progress-loader';
import moment from 'moment';
interface BingoDetailComponentProps extends IComponentProps {
    detailmodel: Boolean
    encrypted_bingo_id:string
    onDismiss:any;
}

interface BingoDetailComponentState extends IComponentState {
    bingoDetail:any;
    detailmodel:any;
    loader: any,
    winners: any,
    gamedetailtime: any,
}
export default class BingoDetailComponent extends Component<BingoDetailComponentProps, BingoDetailComponentState> {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;

  

    constructor(props: BingoDetailComponentProps) {
        super(props);
        this.state = {
            bingoDetail:'',
            detailmodel: this.props.detailmodel,
            loader: false,
            winners: [],
            gamedetailtime: '',
          
        }
		console.log(this.props);

    }

    componentDidMount() {
        this.callMethod()

    }
 

     callMethod() {
         this.setState({ loader: true });
         var url = UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/custom_bingo/bingo_detail/' + this.props.encrypted_bingo_id ;
          
        fetch(url, {
            method: 'GET',
            headers: {
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
               console.log('bingoDetail' + JSON.stringify(responseJson));
                this.setState({ loader: false });
                this.setState({ bingoDetail: responseJson.data.custom_bingo_info });
                this.setState({ winners: responseJson.data.winners });
                var dateTime = this.state.bingoDetail.bingo_expired_on_time_stamp;
                var gamedetailtime = moment(dateTime * 1000).format('LT') + ' ' + new Date(dateTime * 1000).toString().split(' ')[6].toString().substr(1, new Date(dateTime * 1000).toString().split(' ')[6].length - 2) + ' ' + moment(dateTime * 1000).format('LL')
                this.setState({ gamedetailtime: gamedetailtime })
               
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

    render() {
       
      

        return (
            <View style={{flex:1}}>
                <ProgressLoader
                    visible={this.state.loader}
                    isModal={true} isHUD={true}
                    hudColor={"#68bcbc"}
                    color={"#FFFFFF"} />
            {/* <View style={[styles.mainContainer,{ backgroundColor: this.isFromGambling == true ? '#68bcbc' : '#e2211c'}]}> */}
                <ScrollView>
{/* create ui of game details */}
<Modal visible={this.state.detailmodel} transparent={false}>
           <SafeAreaView>
         <View style={[styles.customhead,{backgroundColor:'#68bcbc'}]}>
              
              <View style={{ alignContent:'flex-end', alignItems: 'flex-end',justifyContent:'flex-end',width:'65%' }}>
                <Text style={[styles.customheadtext,{color:'white'}]}>BINGO DETAILS</Text>
              </View>
              <View style={{  alignContent:'flex-end', alignItems: 'flex-end',justifyContent:'flex-end',width:'35%',flexDirection:'row' }}>
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
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Bingo Title</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.bingoDetail.bingo_title}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Gift Selected</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: 'black', fontFamily: 'Montserrat-Bold' }}>{this.state.bingoDetail.total_gift_selected}</Text>
                      
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:10}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Date & Time</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.gamedetailtime}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/>
                       <Text style={{padding:3, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Contest fee</Text>
                                        <Text style={{ padding: 3, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.bingoDetail.joining_fees}</Text>
                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:5}}/>                  
                       <Text style={{padding:5, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}>Status</Text>
                       <View style={{flexDirection:'row'}}>
                                            <Text style={{ padding: 5, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{this.state.bingoDetail.settlement_status}</Text>
                       <View style={{ padding: 10 }}>
                                                <TouchableHighlight 
                                                 //onPress={() => this.showPopover()}
                                                 >
                                                    <Image ref={ref => this.touchable = ref} source={require('../../../../images/Bet_Share.png')} style={{ height: 20, width: 20 , tintColor:"#68bcbc"}} resizeMode='contain' tintColor="#68bcbc" />

                                                </TouchableHighlight>

                                            </View>
                       </View>

                       <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:15}}/>
                       {/* <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:15}}/> */}
                       <Text style={{padding:5, fontSize: hp(2), color: 'grey', fontFamily: 'Montserrat-Bold' }}></Text>
                       <Text style={{padding:5, fontSize: hp(2.2), color: '#373737', fontFamily: 'Montserrat-Bold' }}>{''}</Text>
                       
                       
                   </View>
               </View>
               </ScrollView>
               </SafeAreaView>
               {/* {this.state.BlackDialog && this.getblackDialog()} */}
            </Modal>

 

                </ScrollView>

            </View>
        );
    }
}


































