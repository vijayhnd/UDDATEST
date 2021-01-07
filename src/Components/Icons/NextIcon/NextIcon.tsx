import React, { Component } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Image } from "react-native";
export class NextIcon extends Component {

    render() {
        return (
            <View>
                <Image source={require('../../../images/next_icon.png')} style={{ width: wp(8), height:wp(8) }} resizeMode='contain' /> 
            </View>
                
        );
    }
}