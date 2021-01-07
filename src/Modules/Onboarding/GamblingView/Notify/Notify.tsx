import React from "react";
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
} from "react-native";
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
import ReferralService from "../../../../Services/Referral/ReferralService";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
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
import CustomToggleButton from "../../../../Components/CustomToggleButton";
import Icons from 'react-native-vector-icons/MaterialIcons';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

var update = require("immutability-helper");
console.disableYellowBox = true;
const { State: TextInputState } = TextInput;
const ProfilePageContent = {
  key: "somethun",
  page_title: "Notifications",
};

interface G_NotifyViewProps extends AppValidationComponentProps {

}

interface G_NotifyViewState extends AppValidationComponentState {
  promotionalNotification: any;
  favouriteTeamsNotification: any;
  betsNotification: any;
  //contestNotification: any;
  allNotifications: any;
  noNotifications: any;
  oneNotification: any;
  isDisabled: any;
  isFlag: any;
  loader: any;

}

class G_NotifyView extends AppValidationComponent<G_NotifyViewProps, G_NotifyViewState>
  implements MenuIconListener, ISubheaderListener, LogoIconListener {
  private authorisationToken = Application.sharedApplication().user!
    .authenticationToken;
  public keyboardDidShowSub: any;
  public keyboardDidHideSub: any;
  public keyBoardType = "decimal-pad";
  private serviceRequestInProgress = false;
  private referralservice = new ReferralService(); //Vijay


  constructor(props: G_NotifyViewProps) {
    super(props);
    this.state = {
      promotionalNotification: Application.sharedApplication().user!.profile!.promotional_notification_flag ,
      favouriteTeamsNotification: Application.sharedApplication().user!.profile!.favourite_teams_notification ,
      betsNotification: Application.sharedApplication().user!.profile!.bets_notification ,
      //contestNotification: Application.sharedApplication().user!.profile!.contest_notification ,
      allNotifications: Application.sharedApplication().user!.profile!.allNotifications ,
      noNotifications: Application.sharedApplication().user!.profile!.noNotifications ,
      oneNotification: Application.sharedApplication().user!.profile!.oneNotification ,
      isDisabled: Application.sharedApplication().user!.profile!.isDisabled,
      isFlag: true,
      loader: false,
    };
  }



  async componentDidMount() {


  }

  componentWillUnmount() {

  }

  componentWillMount() {

  }

  // ----------------------------------------------- API calling ---------------------------------------

  accountNameTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_ProfileView, this.props);
  }

  iconDidTapped() {
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View, {
      gameList: true,
    });
  }

  LogoiconDidTapped() {
    // RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props);
    RouterBuilder.resetRouteTo(AppScreens.Gambling_ApplicationStack, this.props)
  }

  availableBalanceTapped() { }

  openPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_UddaContests, this.props);
  }

  coveredPlaysTapped() {
    RouterBuilder.replaceRouteTo(AppScreens.G_GamingBetView, this.props);
  }

  goBacktoSetting() {
    this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
  }

  switchValueChanged = async (attrName: any, value: any) => {
   await this.setState({ [attrName]: value });
    this.saveNotification();
  };

 async generalSettings(type: any) {
    if (type == 1) {
     await this.setState({ allNotifications: true, noNotifications: false, oneNotification: false })
    } else if (type == 2) {
      await this.setState({ allNotifications: false, noNotifications: true, oneNotification: false })
    } else {
      await this.setState({ allNotifications: false, noNotifications: false, oneNotification: true })
    }
    console.log('dsdsdsdsd');
    this.saveNotification();
  }

  componentDidUpdate() {
    console.log('call when update state');

  }

  
  saveNotification() {
       
    this.setState({ loader: true });
        var params: any = {
            "promotionalNotification": this.state.promotionalNotification,
            "favouriteTeamsNotification": this.state.favouriteTeamsNotification,
            "betsNotification": this.state.betsNotification,
            //"contestNotification": this.state.contestNotification,
            "allNotifications": this.state.allNotifications,
            "noNotifications": this.state.noNotifications,
            "oneNotification": this.state.oneNotification,
           
        };

        console.log('notification_state_change body param ' + JSON.stringify(params));
        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiGaming/user_notification_setting_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken
            },
            body: formData,

        }).then((response) => {
            console.log(response);
            return response.json()
        })
            .then((responseJson) => {
              this.setState({ loader: false });
                console.log('Dashboard Data ' + JSON.stringify(responseJson));
                if (responseJson.message == "success") {
                    this.referralservice.getProfile().then((res: any) => {
                        if (res) {
                           
                        }
    
                    });
                    //AlertUtil.show(responseJson.data);
                } else {
                    AlertUtil.show(JSON.stringify(responseJson.message));
                }

            })
            .catch(error => {
              this.setState({ loader: false });
                //console.log(error);
            })
    }
  // -----------------------------------------------Design and Design Methods---------------------------------------

  render() {
  
    return (
      <Container
        title={ProfilePageContent.page_title}
        isHeader={true}
        isSubHeader={true}
        isTitle={false}
        showIndicator={this.serviceRequestInProgress}
        menuIconListener={this}
        LogoIconListener={this}
        accountNameListener={this}
        availableBalanceListener={this}
        coveredPlaysListener={this}
        openPlaysListener={this}
        isSetting={false}
      >
         <ProgressLoader
            visible={this.state.loader}
            isModal={true} isHUD={true}
            hudColor={"#68bcbc"}
            color={"#FFFFFF"} />
        <View style={[styles.mainContent]}>
          <View style={{ flexDirection: 'row', marginBottom: '5%' }}>

            <Icons name="arrow-back" size={30} color="black" style={{ marginTop: 2 }}
              onPress={() => this.props.navigation?.goBack(null)}
            />
            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: hp(2.6), color: '#68bcbc', textAlign: 'center', marginTop: 7, alignContent: 'center' }}>Notifications </Text>
            </View>
          </View>

          <View style={[styles.blockContent,{marginBottom:'5%'}]}>

            <View style={styles.blockNotification}>
              <View style={styles.textBlockWidth}><Text style={styles.Text_Style}>PROMOTIONS & SPECIAL OFFERS </Text></View>
              <View style={styles.toggleBlockWidth}><CustomToggleButton

                isChecked={this.state.promotionalNotification}
                buttonStyle={[{ height: hp(3), width: hp(5) }]}
                listener={(isOn) => this.switchValueChanged('promotionalNotification', !this.state.promotionalNotification)}
              /></View>

            </View>
         {/*    <View style={[styles.blockContent, { paddingBottom: '5%' }]}>
              <Text style={styles.notifySubmenu}>Spin And Win</Text>
              <Text style={styles.notifySubmenu}>Contest Deadlines</Text>
              <Text style={styles.notifySubmenu}>Low Threshold</Text>
              <Text style={styles.notifySubmenu}>Refer & Earn</Text>
              <Text style={styles.notifySubmenu}>UDDA Promotional</Text>
              <Text style={styles.notifySubmenu}>Bankroll Updates</Text>
            </View> */}

          </View>
          <View style={[styles.blockContent, { paddingBottom: '3%' }]}>
            <Text style={styles.Text_Style}>
              NOTIFICATION PREFERENCES
             </Text>
          </View>
          <View style={styles.blockContent}>

            <View style={[styles.blockNotification, styles.paddingLeft,]}>
              <View style={styles.textBlockWidth}><Text style={styles.notifytext}>Favorite Team</Text></View>
              <View style={styles.toggleBlockWidth}><CustomToggleButton

                isChecked={this.state.favouriteTeamsNotification}
                buttonStyle={[{ height: hp(3), width: hp(5) }]}
                listener={(isOn) => this.switchValueChanged('favouriteTeamsNotification', !this.state.favouriteTeamsNotification)}
              /></View>

            </View>
          </View>
          <View style={[styles.blockContent,{marginBottom:'5%'}]}>

            <View style={[styles.blockNotification, styles.paddingLeft,]}>
              <View style={styles.textBlockWidth}><Text style={styles.notifytext}>My Bets</Text></View>
              <View style={styles.toggleBlockWidth}><CustomToggleButton

                isChecked={this.state.betsNotification}
                buttonStyle={[{ height: hp(3), width: hp(5) }]}
                listener={(isOn) => this.switchValueChanged('betsNotification', !this.state.betsNotification)}
              /></View>

            </View>

          </View>
         {/*  <View style={styles.blockContent}>

            <View style={[styles.blockNotification, styles.paddingLeft,]}>
              <View style={styles.textBlockWidth}><Text style={styles.notifytext}>My Contests</Text></View>
              <View style={styles.toggleBlockWidth}><CustomToggleButton

                isChecked={this.state.contestNotification}
                buttonStyle={[{ height: hp(3), width: hp(5) }]}
                listener={(isOn) => this.switchValueChanged('contestNotification', !this.state.contestNotification)}
              /></View>

            </View>

          </View> */}
          <View style={[styles.blockContent, { paddingBottom: '3%' }]}>
            <Text style={styles.Text_Style}>
              GENERAL SETTINGS
             </Text>
          </View>
          <View style={styles.blockContent}>
            <View style={[styles.blockNotification, styles.paddingLeft,]}>
              <View style={styles.textBlockWidth}><Text style={styles.notifytext}>All Notifications</Text></View>
              <View style={styles.toggleBlockWidth}><CustomToggleButton

                isChecked={this.state.allNotifications}
                buttonStyle={[{ height: hp(3), width: hp(5) }]}
                listener={(isOn) => !this.state.allNotifications && this.generalSettings(1)}
              /></View>

            </View>
          
            <View style={[styles.blockNotification, styles.paddingLeft,]}>
              <View style={styles.textBlockWidth}><Text style={styles.notifytext}>One Summary Notification Per Day</Text></View>
              <View style={styles.toggleBlockWidth}><CustomToggleButton

                isChecked={this.state.oneNotification}
                buttonStyle={[{ height: hp(3), width: hp(5) }]}
                listener={(isOn) => !this.state.oneNotification && this.generalSettings(3)}
              /></View>

            </View>
            <View style={[styles.blockNotification, styles.paddingLeft,]}>
              <View style={styles.textBlockWidth}><Text style={styles.notifytext}>No Notifications</Text></View>
              <View style={styles.toggleBlockWidth}><CustomToggleButton

                isChecked={this.state.noNotifications}
                buttonStyle={[{ height: hp(3), width: hp(5) }]}
                listener={(isOn) => !this.state.noNotifications && this.generalSettings(2)}
              /></View>

            </View>

          </View>


        </View>

      </Container>
    );
  }
}

const mapStateToProps = (state: GlobalAppState) => ({
  requestStatus: state.serviceReducer.requestStatus,
  error: state.serviceReducer.error,
  serviceKey: state.serviceReducer.serviceKey,
  listeners: state.serviceReducer.listeners,

});

export default connect(mapStateToProps)(G_NotifyView);
