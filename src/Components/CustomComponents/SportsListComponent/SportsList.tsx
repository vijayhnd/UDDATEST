import React, { Component } from "react";
import styles, { screenWidth } from "./styles";
import { View, ScrollView, TouchableWithoutFeedback, Image, AsyncStorage } from "react-native";
import SportsItemView from "./SportItem";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IComponentProps, IComponentState } from "../../IProps";
import Application from "../../../Entities/Application";
import LogoutUtill from "../../../Util/LogoutUtill";
import UrlService from "../../../Services/Core/ServiceURI"

interface SportListProps extends IComponentProps {
    sportsList: any
    weight: number
    leagueid: any
    tapAction: (sport: any) => void
}

interface SportListState extends IComponentState {
    topsport: any;
    normalsport: any;
}
export default class SportsListComponent extends Component<SportListProps, SportListState> {
    private authorisationToken = Application.sharedApplication().user!.authenticationToken;

    private _scrollView?: any;
    private currentIndex: number
    private isLastElement?: Boolean
    private isFromGambling?: Boolean
    private _defaultSelectedIndex: number

    constructor(props: SportListProps) {
        super(props);
        this.state = {
            topsport: [],
            normalsport: []
        }

        this.currentIndex = 0
        this._defaultSelectedIndex = 0
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
        }
        else {
            this.isFromGambling = false;
        }
    }

    componentDidMount() {
        this._scrollView.scrollTo({ x: this._defaultSelectedIndex * (screenWidth / 5) });
        this.callMethod()

    }


    callMethod() {
        fetch(UrlService.CONSTURI + 'index.php/'+UrlService.APIVERSION3+'/apiGaming/get_leagues_new', {
            method: 'GET',
            headers: {
                'authorisation': this.authorisationToken
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->" + responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                }
                else{
                    console.log("Footer comp ---->" + JSON.stringify(responseJson.data));
               // console.log('Success Sports league' + JSON.stringify(responseJson));
                AsyncStorage.setItem('defaultLeagueId', responseJson.data.defaultSelection);
                this.setState({
                    topsport: responseJson.data.topSports.map((x: any) => ({
                        title: x.title,
                        type: x.type,
                        color: x.color,
                        league_id: x.league_id,
                        selected: false
                    }))
                });
                // let custombet = {
                //     title: "BINGO",
                //     type: "bingo",
                //     color: "#564736",
                //     league_id: "bingo",
                //     selected: false
                // }
                // var newSports = this.state.topsport;
                // newSports.unshift(custombet);
                // this.setState({ topsport: newSports }); 
                /* let custombet = {
                    title: "CUSTOM BET",
                    type: "custom",
                    color: "#564736",
                    league_id: "",
                    selected: false
                }
                var newSports = this.state.topsport;
                newSports.unshift(custombet);
                this.setState({ topsport: newSports }); */
               // this.setState({ normalsport: responseJson.data.normalSports });
                // for(let i=0; i<=this.state.normalsport.length;i++)
                // {
                //     this.state.topsport.push({"title":this.state.normalsport[i].title,"type":this.state.normalsport[i].type,
                //     "color":this.state.normalsport[i].color,"league_id":this.state.normalsport[i].league_id,
                // "selected":false})
                // }
                // console.log('hello ashish topsport'+ JSON.stringify(this.state.topsport))
                this.setState({
                    normalsport: responseJson.data.normalSports.map((x: any) => ({
                        title: x.title,
                        type: x.type,
                        color: x.color,
                        league_id: x.league_id,
                        selected: false
                    }))
                });
                var that = this;
               // alert(JSON.stringify(responseJson.data.topSports))
                AsyncStorage.setItem('leagueArrayData', JSON.stringify(responseJson.data.topSports));
                //     console.log('hello ashish topsport',this.state.topsport)
                // this.setState({normalsport : responseJson.data.normalSports});
                this.callselectMethod(responseJson.data.defaultSelection);
                
                }
            })
            .catch(error => console.log('error'))
    }

    callselectMethod(leagueId:any) {
        
        for (let i = 0; i < this.state.topsport.length; i++) {
            if (this.state.topsport[i].league_id == leagueId) {
                this.state.topsport[i].selected = true;
                this.setState({ topsport: this.state.topsport });
            }
            else {
                this.state.topsport[i].selected = false;
                this.setState({ topsport: this.state.topsport });
            }
        }

        for (let j = 0; j < this.state.normalsport.length; j++) {
            if (this.state.normalsport[j].league_id == this.props.leagueid) {
                this.state.normalsport[j].selected = true;
                this.setState({ topsport: this.state.topsport });
            }
            else {
                this.state.normalsport[j].selected = false;
                this.setState({ normalsport: this.state.normalsport });
            }
        }
    }
    private isCloseToEndElement(nativeElement: any) {
        this.isLastElement = (nativeElement.layoutMeasurement.width + nativeElement.contentOffset.x) >=
            nativeElement.contentSize.width;
    };

    private scrollRight() {
        if (!this.isLastElement) {
            this.currentIndex++;
            this._scrollView.scrollTo({ x: this.currentIndex * (screenWidth / 2) });
        }
    }

    private scrollLeft() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this._scrollView.scrollTo({ x: this.currentIndex * (screenWidth / 2) });
        }
    }

    selectSport(sport: any) {
        console.log('in soprts ---->', sport);
        let topSports = this.state.topsport;
        let bottomSports = this.state.normalsport;
        for (let i = 0; i < topSports.length; i++) {
            topSports[i]['selected'] = false
        }

        for (let j = 0; j < bottomSports.length; j++) {
            bottomSports[j]['selected'] = false
        }
        sport['selected'] = true
        this.props.tapAction(sport)
        this.setState({})
    }

    getSportItemView(sport: any, index: number, isTopElement?: boolean) {
        return (
            <SportsItemView sport={sport} key={index + ""} tapAction={this.selectSport.bind(this)} smallFont={isTopElement ? false : true}></SportsItemView>
        )
    }



    render() {

        let topSports = this.state.topsport;
        var topSportsViews = []
        for (let i = 0; i < topSports.length; i++) {
            topSportsViews.push(this.getSportItemView(topSports[i], i, true)) 
        }

        let bottomSports = this.state.normalsport;
        var bottomSportsViews = []
     
        for (let i = 0; i < bottomSports.length; i++) {
            bottomSportsViews.push(this.getSportItemView(bottomSports[i], i, true))
        }
       
        
        this._defaultSelectedIndex = this.props.sportsList.defaultSelection;
        topSportsViews.push(bottomSportsViews)//ashish
      
        
        return (
            <View style={[styles.mainContainer]}>
                {/* <View style={[styles.mainContainer,{ backgroundColor: this.isFromGambling == true ? '#68bcbc' : '#e2211c'}]}> */}
                <ScrollView
                    automaticallyAdjustContentInsets={true}
                    contentInset={{ top: 0, bottom: 0 }}
                    scrollEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={view => this._scrollView = view}
                    onScroll={({ nativeEvent }) => {
                        this.isCloseToEndElement(nativeEvent);
                    }}>

                    <View style={styles.innerSportContainer}>

                        <View style={[styles.topSportListContainer, { height: hp(13 * this.props.weight) }]}>
                            {topSportsViews}
                        </View>

                        {/* <View style={[styles.bottomSportListContainer, { height: hp(4 * this.props.weight) }]}>
                            {bottomSportsViews}
                        </View> //ashish */}

                    </View>

                </ScrollView>


                {/* <TouchableWithoutFeedback onPress={this.scrollLeft.bind(this)}>
                    <View style={[styles.leftArrowContainerStyle, styles.arrowContainerStyle]}>
                        {/* {this.isFromGambling == true ?
                            <Image source={require('../../../images/red-shadow_G.png')} style={[styles.arrowBGImageStyle]} resizeMode='contain' />
                            :
                            <Image source={require('../../../images/red-shadow.png')} style={[styles.arrowBGImageStyle]} resizeMode='contain' />
                        } 
                        <Image source={require('../../../images/white-arrow.png')} style={[styles.leftArrowIconStyle, { height: hp(5) * this.props.weight, alignSelf: 'center' }]} resizeMode='contain' />

                    </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback onPress={this.scrollRight.bind(this)}>
                    <View style={[styles.rightArrowContainerStyle, styles.arrowContainerStyle]}>
                    {/* {this.isFromGambling == true ? 
                        <Image source={require('../../../images/red-shadow-right_G.png')} style={[styles.arrowBGImageStyle]} resizeMode='contain' />
                        :
                        <Image source={require('../../../images/red-shadow-right.png')} style={[styles.arrowBGImageStyle]} resizeMode='contain' />
                        } 
                        <Image source={require('../../../images/white-arrow-right.png')} style={[styles.rightArrowIconStyle, { height: hp(5) * this.props.weight, alignSelf: 'center' }]} resizeMode='contain' />

                    </View>
                </TouchableWithoutFeedback> */}
            </View>
        );
    }
}


































