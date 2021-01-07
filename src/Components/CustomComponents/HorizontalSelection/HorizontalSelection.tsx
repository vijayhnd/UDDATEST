import React, { Component } from "react";
import { IComponentProps, IComponentState } from "../../IProps";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import GrayPrevIcon from "../../Icons/GrayIconPrev";
import GrayNextIcon from "../../Icons/GrayIconNext";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AlertUtil from "../../../Util/AlertUtil";

interface HorizontalSelectionProps extends IComponentProps{
    totalWeeks?: number,
    currentWeek?: number,
    filterDataForWeek: (selectedWeek: number) => void
}

interface HorizontalSelectionState extends IComponentState{

}

const HorizontalPageContent = {
    pastResult: "PAST RESULTS",
    upcomingGames: "UPCOMING GAMES",
    weekTitle: "WEEK"
}

export class HorizontalSelection extends Component<HorizontalSelectionProps,HorizontalSelectionState>{

    private selectedWeek?: number
    private pastWeekTitle: String
    private currentWeekTitle: String
    private upcomingGameTitle: String

    constructor(props: HorizontalSelectionProps){
        super(props)
        this.selectedWeek = props.currentWeek
        this.pastWeekTitle = HorizontalPageContent.pastResult
        this.upcomingGameTitle = HorizontalPageContent.upcomingGames 
        this.currentWeekTitle = HorizontalPageContent.weekTitle + " " + props.currentWeek
    }

    private updateWeekTitles() {
        if (this.selectedWeek == this.props.currentWeek) {
            this.pastWeekTitle = HorizontalPageContent.pastResult
            this.upcomingGameTitle = HorizontalPageContent.upcomingGames
        } else {
            this.upcomingGameTitle = HorizontalPageContent.weekTitle + " " + (this.selectedWeek! + 1)
            if (this.selectedWeek! > 1) {
            this.pastWeekTitle = HorizontalPageContent.weekTitle + " " + (this.selectedWeek! - 1)
            }
        }
        this.currentWeekTitle = HorizontalPageContent.weekTitle + " " + this.selectedWeek
    }

    private pastResultClicked() {

        if (this.selectedWeek! > 1) {
            this.selectedWeek = this.selectedWeek! - 1
            this.updateWeekTitles()
            this.props.filterDataForWeek(this.selectedWeek!)
        }
        if (this.selectedWeek == 0) {
            this.pastWeekTitle = ""
        }
        this.setState({})
    }

    private upcomingGamesClicked() {
        if (this.selectedWeek! < this.props.totalWeeks!) {
            this.selectedWeek! += 1
            this.updateWeekTitles()
            this.props.filterDataForWeek(this.selectedWeek!)
        }
        if (this.selectedWeek == this.props.totalWeeks) {
            this.upcomingGameTitle = ""
        }
        this.setState({})
    }
    renderPastWeekTitleView() {
        return (
            <View style={{ paddingRight: hp(1),  flexDirection: 'row', alignContent: 'center' }}>
                <GrayPrevIcon />
                <Text style={styles.boldTextStyle}> {this.pastWeekTitle}</Text>
            </View>
        )
    }

    renderUpomingWeekTitleView() {
        return (
            <View style={{ paddingLeft: hp(1),  flexDirection: 'row', alignContent: 'center' }}>
                <Text style={styles.boldTextStyle}>{this.upcomingGameTitle} </Text>
                <GrayNextIcon />
            </View>
        )
    }

    render(){
        return(
            <View style={[styles.container]}>
                        
            <View style={{position:'absolute', flexGrow:1, width:wp(100), flexDirection:'column', alignSelf:'center', alignContent:'center'}}>
            <View style={styles.centerContainerTitleStyle}>
                <Text style={styles.centerTitleTextStyle}>{this.currentWeekTitle}</Text>
            </View>
            </View>
            <TouchableWithoutFeedback onPress={this.pastResultClicked.bind(this)}>
            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', alignContent:'center'}}>
                
                {
                    this.pastWeekTitle.length > 0 ? this.renderPastWeekTitleView()  : <View />
                }
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.upcomingGamesClicked.bind(this)}> 
            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', alignContent:'center'}}>
                {
                    this.upcomingGameTitle.length > 0 ? this.renderUpomingWeekTitleView()  : <View />
                }
                </View>
            </TouchableWithoutFeedback>
            
            </View>
        )
    }
}