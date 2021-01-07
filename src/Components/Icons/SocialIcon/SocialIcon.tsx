import React, { Component } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Image } from "react-native";

export class FacebookIcon extends Component {

    render() {
        return (
            <View>
                <Image source={require('../../../images/fb_icon.png')} style={{ width: wp(6), height:wp(6) }} resizeMode='contain' /> 
            </View>
                
        );
    }
}

export class TwitterIcon extends Component {

    render() {
        return (
            <View>
                <Image source={require('../../../images/appleicon.png')} style={{ width: wp(6), height:wp(6) }} resizeMode='contain' /> 
            </View>
                
        );
    }
}

export class GoogleIcon extends Component {

    render() {
        return (
            <View>
                <Image source={require('../../../images/google_icon.png')} style={{ width: wp(7), height:wp(7) }} resizeMode='contain' /> 
            </View>
                
        );
    }
}