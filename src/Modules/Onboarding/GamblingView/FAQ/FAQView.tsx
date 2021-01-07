import React from "react";
import { View, Text, ScrollView, AsyncStorage, FlatList, TouchableWithoutFeedback, TouchableOpacity, BackHandler, Alert } from "react-native";
import styles from './styles';
import Container from '../../../../Components/Container';
import AppScreens from "../../../../Util/AppScreens";
import AppValidationComponent, { AppValidationComponentState, AppValidationComponentProps } from "../../../../Util/AppValidationComponent";
import RouterBuilder from "../../../../Router"
import { MenuIconListener } from "../../../../Components/Icons/MenuIcon/MenuIcon";
import { ISubheaderListener } from "../../../../Components/CustomComponents/SubHeader/SubHeader";
import { LogoIconListener } from "../../../../Components/Icons/LogoIcon/LogoIcon";
import AlertUtil from "../../../../Util/AlertUtil";
import Application from "../../.../../../../Entities/Application";
import LogoutUtill from "../../../../Util/LogoutUtill";
import UrlService from "../../../../Services/Core/ServiceURI"
var update = require('immutability-helper');
import { SliderBox } from "react-native-image-slider-box";


const ProfilePageContent = {
    key: 'somethun',
    page_title: 'FAQ',
}

interface G_FAQViewProps extends AppValidationComponentProps { }

interface G_FAQViewState extends AppValidationComponentState {
    DataList: any;
    Flag: any;
    loader: any;
    image_array: any;
    slider_image_array: any;
    tab: any;
}



export default class G_FAQView extends AppValidationComponent<G_FAQViewProps, G_FAQViewState>
    implements MenuIconListener, ISubheaderListener, LogoIconListener {
    private FAQData: any
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;

    constructor(props: G_FAQViewProps) {
        super(props);
        this.state = {
            DataList: '',
            Flag: 'A',
            loader: false,
            tab: false,
            image_array: [],
            slider_image_array: []
        }
    }

    // ---------------------------------------------------------------------API Calling----------------------------------------------------------
    async componentDidMount() {
        let banner = '';
        let video = '';
        let a;
        var b = []
        try {
            banner = await AsyncStorage.getItem('banner_data');
            // video = await AsyncStorage.getItem('banner_video_data');
            a = JSON.parse(banner)
            this.setState({ slider_image_array: a })
            a.map((item, index) => {
                b.push(item.banner_image)
            })
            this.setState({ image_array: b })
            console.log('banner response', banner)
            console.log('video response', video)

        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.getAllFaq();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        Alert.alert(
            'Exit App',
            'Are You Sure You Want to Exit the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
        }
        )
        return true;
    }

    private loadMatches(week: number) {
        switch (week) {
            case 1: {
                this.FAQData = '';
                this.setState({
                    DataList: this.FAQData.content.map((x: any) => ({
                        question_id: x.question_id,
                        question: x.question,
                        answer: x.answer,
                        isselected: false,

                    }))
                });
            }
                break;
        }
        this.setState({})
    }



    getAllFaq() {
        fetch(UrlService.CONSTURI + 'index.php/' + UrlService.APIVERSION3 + '/apiNew/getAllFaq', {
            method: 'POST',
            headers: {//Header Defination
                'Content-Type': 'multipart/form-data',
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('getAllFaq ' + JSON.stringify(responseJson));
                this.setState({
                    DataList: responseJson.map((x: any) => ({
                        faq_id: x.faq_id,
                        f_question: x.f_question,
                        f_answer: x.f_answer,
                        isselected: false,

                    }))
                });
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                }
            })
            .catch(error => {
                AlertUtil.show("getAllFaq Error " + JSON.stringify(error));
                console.log(error);
            })
    }




    // --------------------------------------------------------------------- Methods ----------------------------------------------------------
    accountNameTapped() {
        this.props.navigation!.navigate(AppScreens.G_ProfileView);

    }

    iconDidTapped() {
        this.props.navigation!.navigate(AppScreens.G_Settings_2_View);
    }

    LogoiconDidTapped() {
        //RouterBuilder.replaceRouteTo(AppScreens.G_DashboardView, this.props)
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


    SelectedQuestion(items: any, index: any) {
        items.isselected = !items.isselected;

        const newstate = update(this.state.DataList, { $splice: [[index, 1, items]] });
        this.setState({ DataList: newstate });

    }

    gotoQuickGuide() {
        RouterBuilder.replaceRouteTo(AppScreens.G_FAQ_QuickGuide, this.props)
    }

    pressSlider(index) {


        if (this.state.slider_image_array[index].banner_title == 'Refer & Earn ') {
            this.props.navigation!.navigate(AppScreens.G_ReferEarnView)
        } else if (this.state.slider_image_array[index].banner_title == 'Video Tutorial') {
            this.props.navigation!.navigate(AppScreens.G_VideoList)
        } else {
            // alert(this.state.slider_image_array[index].banner_title)
        }

    }
    // ----------------------------------------------------------------- Design and Design Methods ----------------------------------------------------------
    render() {
        return (
            <Container
                title={ProfilePageContent.page_title}
                isHeader={true}
                isSubHeader={true}
                isTitle={false}
                menuIconListener={this}
                LogoIconListener={this}
                accountNameListener={this}
                isSetting={false}
                availableBalanceListener={this}
                openPlaysListener={this}
                coveredPlaysListener={this}
            >
                <View style={styles.scrollContent}>
                    {/* <View style={{ height: 50, width: '100%', }}>
          <SliderBox
          dotStyle={{height:0,width:0}}
          autoplay={true}
            images={this.state.image_array}
            sliderBoxHeight={50}
            imageLoadingColor={'transparent'}
            circleLoop={true}
            onCurrentImagePressed={index => this.pressSlider(index)}
            // currentImageEmitter={index => this.pressSlider(index)}
            />
            </View> */}
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between',marginBottom:'2%' }}>
                    
		      <View style={{ backgroundColor: '#FFF', width: '50%',borderRightWidth:1,  justifyContent: 'center', padding: '2%',borderRightColor:'#68bcbc'}}>
                            <TouchableOpacity onPress={() => { this.setState({ tab: false }) }} >
                                <Text style={[styles.customheadtext1, { color: '#68bcbc', textAlign: 'center' }]}>{ProfilePageContent.page_title}</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ backgroundColor:'#c3c3c3', width: '50%', borderRightWidth: 1, justifyContent: 'center', padding: '2%',borderRightColor:'#68bcbc' }}>
                        <TouchableOpacity onPress={()=>{this.setState({tab:true}), this.props.navigation!.navigate(AppScreens.G_VideoList)}}>
                                <Text style={[styles.customheadtext1, { color: '#68bcbc', textAlign: 'center' }]}>{'TUTORIALS'}</Text>
                            </TouchableOpacity>



                        </View>
                    </View>
                    <ScrollView bounces={false} style={styles.scrollviewstyle}>

                        <View>
                            <FlatList
                                data={this.state.DataList}
                                extraData={this.state}
                                keyExtractor={(item: any, index) => index.toString()}
                                renderItem={({ item, index }: any) => {

                                    return (
                                        <View style={styles.Main_Container}>
                                            <View style={styles.Second_Container}>
                                                <TouchableWithoutFeedback onPress={() => { this.SelectedQuestion(item, index) }}>
                                                    <View style={styles.question_container}>
                                                        <Text style={styles.text_container}>{item.f_question}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>

                                                {item.isselected == true ?
                                                    <View style={styles.Answer_Container}>
                                                        <Text style={styles.text_answer}>{item.f_answer}</Text>
                                                    </View>
                                                    :
                                                    null}


                                            </View>
                                        </View>

                                    )
                                }} />
                        </View>


                    </ScrollView>

                   {/*  <View style={{ width: '100%', height: 1.5, backgroundColor: '#000000' }}>
                    </View> */}
                    <View style={{ width: '100%', height: '15%', justifyContent: 'center', alignItems: 'center' }}>

                        {/* <TouchableWithoutFeedback onPress={() => { this.gotoQuickGuide() }}>
                            <View style={{ width: '90%', height: 45, backgroundColor: '#68bcbc', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Montserrat-Bold' }}>
                                    View the Quick Guide
                            </Text>
                            </View>
                        </TouchableWithoutFeedback> */}
                    </View>

                </View>

            </Container>
        );



    }
}
