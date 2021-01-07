import React, { Component } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Image } from "react-native";
export class GrayPrevIcon extends Component {

    render() {
        return (
            <View>
                <Image source={require('../../../images/gray-arrow.png')} style={{ width: wp(4), height:wp(4) }} resizeMode='contain' /> 
            </View>
                
        );
    }
}