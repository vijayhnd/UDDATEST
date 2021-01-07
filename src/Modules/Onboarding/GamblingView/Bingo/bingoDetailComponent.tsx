import React, { createRef, Component } from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
  Animated,
  Keyboard,
  Dimensions,
  UIManager,
  Share,
  Modal,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AlertUtil from "../../../../Util/AlertUtil";
import {
  IComponentProps,
  IComponentState,
} from "../../../../Components/IProps";
import Application from "../../../../Entities/Application";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from "../../../../Services/Core/ServiceURI";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProgressLoader from "rn-progress-loader";
import moment from "moment";
import Popover from "react-native-popover-view";
import Icons from "react-native-vector-icons/MaterialIcons";
import ReferralService from "../../../../Services/Referral/ReferralService";
interface BingoDetailComponentProps extends IComponentProps {
  detailmodel: Boolean;
  encrypted_bingo_id: string;
  onDismiss: any;
}

interface BingoDetailComponentState extends IComponentState {
  bingoDetail: any;
  detailmodel: any;
  loader: any;
  winners: any;
  gamedetailtime: any;
  blackdialogDate: any;
  BlackDialog: any;
  imagezoom: any;
}
export default class BingoDetailComponent extends Component<
  BingoDetailComponentProps,
  BingoDetailComponentState
> {
  private authorisationToken = Application.sharedApplication().user!
    .authenticationToken;
  public touchable;
  private referralservice = new ReferralService();
  private my_referral_code = Application.sharedApplication().user!.profile
    .my_referral_code;

  constructor(props: BingoDetailComponentProps) {
    super(props);
    this.touchable = createRef();
    this.state = {
      bingoDetail: "",
      detailmodel: false,
      loader: false,
      winners: [],
      gamedetailtime: "",
      blackdialogDate: "",
      BlackDialog: false,
      imagezoom: false,
    };
    console.log(this.props);
  }

  showPopover() {
    var new_time_stamp =
      this.state.bingoDetail.bingo_created_at_time_stamp * 1000;
    var formated_time = moment(new_time_stamp).format("MMMM DD,YYYY");
    this.setState({ blackdialogDate: formated_time });
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
                {this.state.blackdialogDate}
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
                {this.state.bingoDetail.creator}
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

          {this.state.bingoDetail.share_info.length > 0 ? (
            <View style={{ height: hp(63) }}>
              <FlatList
                extraData={this.state}
                data={this.state.bingoDetail.share_info}
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
                            source={require("../../../../images/BucksWhite.png")}
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
                          {" "}
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
                            source={require("../../../../images/BucksWhite.png")}
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

          {this.state.bingoDetail.settlement_status ==
          "Settlement In-Progress" ? (
            this.state.bingoDetail.bingo_share_type == 1 &&
            this.state.bingoDetail.creator_index == "0" ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.shareOption(this.state.bingoDetail);
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
            ) : this.state.bingoDetail.bingo_share_type == 0 ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.shareOption(this.state.bingoDetail);
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
            ) : null
          ) : (
            <View />
          )}
        </View>
      </Popover>
    );
  }

  async shareOption(item: any) {
    var MessageString: any;
    var ShowString: any;
    var oddsString: any;
    var teamName: any;
    var teamName2: any;
    var url: any;
    var selectedData: any;
    var referStr: any;

    url =
      "http://bet.udda.com/index.php?t=bingo&i=" +
      this.props.encrypted_bingo_id;
    //url = "https://bet.udda.com/coming-soon/"

    url = await this.referralservice.getReferralUrl(
      url,
      this.my_referral_code,
      "U"
    ); // Getting Dynamic Share Link From Firebase
    referStr = "\nUse Referral Code " + this.my_referral_code + " to sign up.";

    // MessageString += referStr+ "\n" + url;
    MessageString = "You have been invited to a Bingo through UDDA.";
    MessageString += referStr;

    console.log("private url " + JSON.stringify(MessageString));
    Share.share({
      message: MessageString + url,
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
    this.callMethod();
  }

  callMethod() {
    this.setState({ loader: true });
    var url =
      UrlService.CONSTURI +
      "index.php/" +
      UrlService.APIVERSION3 +
      "/custom_bingo/bingo_detail/" +
      this.props.encrypted_bingo_id;

    fetch(url, {
      method: "GET",
      headers: {
        authorisation: this.authorisationToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("bingoDetail" + JSON.stringify(responseJson));
        this.setState({ loader: false });
        this.setState({ detailmodel: this.props.detailmodel });
        this.setState({ bingoDetail: responseJson.data.custom_bingo_info });
        this.setState({ winners: responseJson.data.winners });
        var dateTime = this.state.bingoDetail.bingo_expired_on_time_stamp;
        var gamedetailtime =
          moment(dateTime * 1000).format("LT") +
          " " +
          new Date(dateTime * 1000)
            .toString()
            .split(" ")[6]
            .toString()
            .substr(
              1,
              new Date(dateTime * 1000).toString().split(" ")[6].length - 2
            ) +
          " " +
          moment(dateTime * 1000).format("LL");
        this.setState({ gamedetailtime: gamedetailtime });

        if (responseJson.message == "Access Expired.") {
          // AlertUtil.show("Session Expired ! Please login again");
          console.log("Footer comp ---->" + responseJson.message);
          LogoutUtill.logoutButtonPressed(this.props);
        }
      })
      .catch((error) => {
        this.setState({ loader: false });
        console.log("error");
      });
  }

  dismissScreen() {
    const dismissAction = this.props.onDismiss;
    dismissAction();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ProgressLoader
          visible={this.state.loader}
          isModal={true}
          isHUD={true}
          hudColor={"#68bcbc"}
          color={"#FFFFFF"}
        />
        {/* <View style={[styles.mainContainer,{ backgroundColor: this.isFromGambling == true ? '#68bcbc' : '#e2211c'}]}> */}
        <ScrollView>
          {/* create ui of game details */}
          <Modal visible={this.state.detailmodel} transparent={false}>
          <Modal visible={this.state.imagezoom} transparent={false}>
            <View>
            <SafeAreaView>
              <View style={{justifyContent:'flex-end',alignItems:'flex-end',alignContent:'flex-end',padding:10}}>
              <Icon onPress={() => { 
              this.setState({
                imagezoom: false
              });
            }} name="close" size={26} color="Black"/>
              </View>

              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',height:100}}>
          <Text style={{fontSize: hp(3.4), fontFamily: 'Montserrat-SemiBold',textAlign:'center'}}>Scan <Text style={{fontSize: hp(3.4), fontFamily: 'Montserrat-Bold',}}> QR Code </Text> {'\n'}to join the contest</Text>
              </View>
              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:20,height:250}}>
              <Image
                     style={{ width: 250, height: 250 }}
                     source={{uri:this.state.bingoDetail.qr_code}} >
                     </Image>
              </View>
         </SafeAreaView>
            </View>
            
         
        </Modal>
            <SafeAreaView>

           
                   
              <View style={[styles.customhead, { backgroundColor: "#68bcbc" }]}>
                <View
                  style={{
                    alignContent: "flex-end",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    width: "65%",
                  }}
                >
                  <Text style={[styles.customheadtext, { color: "white" }]}>
                    BINGO DETAILS
                  </Text>
                </View>
                
                <View
                  style={{
                    alignContent: "flex-end",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    width: "35%",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.dismissScreen();
                    }}
                  >
                    <View style={[styles.CloseView]}>
                      <Icon name="close" size={25} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView>
             
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <View style={{ width: "95%" }}>
                    
                   {this.state.bingoDetail.qr_code &&<View style={{width:'100%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>{this.setState({imagezoom:true})}}>
                  <Image
                     style={{ width: 40, height: 40 }}
                     source={require('../../../../images/magnifying_glass_qrcode_icon.png')}
                    //  source={{uri:this.state.bingoDetail.qr_code}}
                      >
                     </Image>
                  </TouchableOpacity>
                   </View>}
                   {this.state.bingoDetail.qr_code &&
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#c3c3c3",
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    />}


                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2),
                        color: "grey",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      Bingo Title
                    </Text>
                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2.2),
                        color: "black",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      {this.state.bingoDetail.bingo_title}
                    </Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#c3c3c3",
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    />
                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2),
                        color: "grey",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      Gift Selected
                    </Text>
                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2.2),
                        color: "black",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      {this.state.bingoDetail.total_gift_selected}
                    </Text>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#c3c3c3",
                        marginBottom: 5,
                        marginTop: 10,
                      }}
                    />
                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2),
                        color: "grey",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      Date & Time
                    </Text>
                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2.2),
                        color: "#373737",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      {this.state.gamedetailtime}
                    </Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#c3c3c3",
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    />
                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2),
                        color: "grey",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      Contest fee
                    </Text>
                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2.2),
                        color: "#373737",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      {this.state.bingoDetail.joining_fees}
                    </Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#c3c3c3",
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    />
                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2),
                        color: "grey",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      Wining amount
                    </Text>
                    <Text
                      style={{
                        padding: 3,
                        fontSize: hp(2.2),
                        color: "#373737",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      {this.state.bingoDetail.winning_amount}
                    </Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#c3c3c3",
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    />
                    <Text
                      style={{
                        padding: 5,
                        fontSize: hp(2),
                        color: "grey",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      Status
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          padding: 5,
                          fontSize: hp(2.2),
                          color: "#373737",
                          fontFamily: "Montserrat-Bold",
                        }}
                      >
                        {this.state.bingoDetail.settlement_status}
                      </Text>
                      <View style={{ padding: 10 }}>
                        <TouchableHighlight onPress={() => this.showPopover()}>
                          <Image
                            ref={(ref) => (this.touchable = ref)}
                            source={require("../../../../images/Bet_Share.png")}
                            style={{
                              height: 20,
                              width: 20,
                              tintColor: "#68bcbc",
                            }}
                            resizeMode="contain"
                            tintColor="#68bcbc"
                          />
                        </TouchableHighlight>
                      </View>
                    </View>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#c3c3c3",
                        marginBottom: 5,
                        marginTop: 15,
                      }}
                    />
                    {/* <View style={{borderBottomWidth:1,borderBottomColor:'#c3c3c3',marginBottom:5,marginTop:15}}/> */}
                    <Text
                      style={{
                        padding: 5,
                        fontSize: hp(2),
                        color: "grey",
                        fontFamily: "Montserrat-Bold",
                      }}
                    ></Text>
                    <Text
                      style={{
                        padding: 5,
                        fontSize: hp(2.2),
                        color: "#373737",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      {""}
                    </Text>
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
