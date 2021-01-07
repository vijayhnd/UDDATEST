import React, {Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import { Text,Image } from "react-native-elements";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Application from "../../../../Entities/Application";
import Icon from 'react-native-vector-icons/FontAwesome';

interface SportsItemProp {
    sport:any
    tapAction: (sport:any)=>void
    smallFont: boolean
}

export default class SportsItemView extends Component<SportsItemProp> {

    selectCurrenSport() {
        this.props.tapAction(this.props.sport)
    }

    render() {
        let FromGambling = Application.sharedApplication().FromGambling ;
        
        let sportSelectedTextStyle = {}
        let sportSelectedicon = {}
        let sportSelectedBackgroundStyle = {}
        let fontSizeStyle = {}
        let src ;
        let textstylefont ={}
        //console.log('in my props', this.props.sport)
        if (this.props.sport.selected) {


            switch (this.props.sport.type) {
                case 'Football':
                    src = require('../../../../images/slice_icon/Football_active.png');
                    break;
                case 'Basketball':
                    src = require('../../../../images/slice_icon/Basketball_active.png');
                    break;
                case 'Baseball':
                    src = require('../../../../images/slice_icon/Baseball_active.png');
                    break;
                case 'Hockey':
                    src = require('../../../../images/slice_icon/Hockey_active.png');
                    break;
                case 'Soccer':
                    src = require('../../../../images/slice_icon/Soccer_active.png');
                    break;
                case 'Boxing':
                    src = require('../../../../images/slice_icon/Boxing_active.png');
                    break;
                case 'Golf':
                     src = require('../../../../images/slice_icon/golf_active.png');
                     break;
                case 'Auto Racing':
                     src = require('../../../../images/slice_icon/auto_racing_active.png');
                     break;
                 case 'Other':
                     src = require('../../../../images/slice_icon/horse_racing_active.png');
                     break;
                 case 'custom':
                    src = require('../../../../images/slice_icon/custom_bet_active.png');
                    break;
                    case 'bingo':
                        src = require('../../../../images/slice_icon/bingo_active.png');
                        break;
                case 'Tennis':
                    src= require('../../../../images/slice_icon/pro_tennis_active.png');
                    break;
                }
                //Golf Auto Racing  custom_bet_active
            sportSelectedBackgroundStyle = {backgroundColor: 'white',shadowOpacity: 0.8,}
            sportSelectedTextStyle = {
                // color: 'black'
                color: FromGambling == true ? '#009c9d' : 'red'
            }
         
            sportSelectedicon =this.props.sport.type == 'Auto Racing' || this.props.sport.type == 'Other'?{width:50,height:30}:this.props.sport.type == 'Golf'?{width:30,height:30}:{width:30,height:30}
            textstylefont = {marginTop:5}
        } else {
            switch (this.props.sport.type) {
                case 'Football':
                    src = require('../../../../images/slice_icon/Football.png');
                    break;
                case 'Basketball':
                    src = require('../../../../images/slice_icon/Basketball.png');
                    break;
                case 'Baseball':
                    src = require('../../../../images/slice_icon/Baseball.png');
                    break;
                case 'Hockey':
                    src = require('../../../../images/slice_icon/Hockey.png');
                    break;
                case 'Soccer':
                    src = require('../../../../images/slice_icon/Soccer.png');
                    break;
                case 'Boxing':
                    src = require('../../../../images/slice_icon/Boxing.png');
                    break;
                case 'Golf':
                     src = require('../../../../images/slice_icon/golf.png');
                    break;
                case 'Auto Racing':
                     src = require('../../../../images/slice_icon/auto_racing.png');
                     break;
                 case 'Other':
                     src = require('../../../../images/slice_icon/horse_racing.png');
                     break;
                case 'custom':
                    src = require('../../../../images/slice_icon/custom_bet.png');
                    break;
                    case 'bingo':
                    src = require('../../../../images/slice_icon/bingo_default.png');
                    break;
                case 'Tennis':
                    src= require('../../../../images/slice_icon/pro_tennis.png');
                    break;
                }
            // sportSelectedBackgroundStyle = {backgroundColor: FromGambling == true ? '#BFBFBF':'#E49491'}
            sportSelectedBackgroundStyle = {}
            // sportSelectedBackgroundStyle = {backgroundColor: FromGambling == true ? '#b4dede':'#E49491'}
            sportSelectedTextStyle = { color: FromGambling == true ? 'black' : 'red' }
            sportSelectedicon =this.props.sport.type == 'Auto Racing' || this.props.sport.type == 'Other'?{width:50,height:30}:this.props.sport.type == 'Golf'?{width:30,height:30}:{width:30,height:30}
            textstylefont = {marginTop:5}
        }

        if(this.props.smallFont){
            fontSizeStyle = {fontSize: hp(1.5)}
            // fontSizeStyle = {fontSize: hp(1.2)}
        }
         var a ="PRO\nBASKETBALL"
         var b ="PRO\nHOCKEY"
        return (
            <TouchableWithoutFeedback onPress={this.selectCurrenSport.bind(this)}>
             <View style={[styles.sportItemContainer, sportSelectedBackgroundStyle]} >
           <View style={{height:30,justifyContent:'center',alignItems:'center',alignContent:'center',paddingTop:10}}>
             {this.props.sport.title == 'SOCCER' || this.props.sport.title == 'FIGHTING' || this.props.sport.title == 'Golf'?<View style={{marginTop:0}}><Image source = {src}  style = {[sportSelectedicon]}/></View>:this.props.sport.type == 'Auto Racing' || this.props.sport.type == 'Other' ?<View style={{marginTop:0}}><Image source = {src}  style = {[sportSelectedicon]}/></View>:<View style={{marginTop:0}}><Image source = {src}  style = {[sportSelectedicon]}/></View>}
             </View>
             <View style={{height:30,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
             {this.props.sport.title == 'PRO BASKETBALL'?<Text style={[styles.textStyle, sportSelectedTextStyle, fontSizeStyle]}>{a}</Text>:
              
        this.props.sport.title == 'PRO HOCKEY'? <Text style={[styles.textStyle, sportSelectedTextStyle, fontSizeStyle]}>{b}</Text>:
        <Text style={[styles.textStyle, sportSelectedTextStyle, fontSizeStyle]}>{this.props.sport.title}</Text>

             }
             </View>
                {/* <Text style={[styles.textStyle, sportSelectedTextStyle, fontSizeStyle]}>{this.props.sport.title}</Text> */}
             </View>
             </TouchableWithoutFeedback>
        );
    }
}