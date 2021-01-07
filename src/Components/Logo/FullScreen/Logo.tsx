import React, { Component } from "react";
import INavigationProps from "../..";
import styles from "./styles";
import { View, Dimensions,ImageStyle } from "react-native";
import { Image } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Application from "../../../Entities/Application";

const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth - wp(10);
const imageHeight = screenWidth - wp(40);

interface FullPageLogoProps extends INavigationProps {
    tintColor?: string
}

export class FullPageLogo extends Component<FullPageLogoProps> {
    isFromGambling: any;
    constructor(props: FullPageLogoProps) {
        super(props);
            if (Application.sharedApplication().FromGambling == true) {
                this.isFromGambling = true; 
            }
            else {
                this.isFromGambling = false; 
            }
    }

    render(){
        const imageStyle: ImageStyle = 
            {
                alignSelf: 'center',
                justifyContent: 'center',
                width: imageWidth, 
                height: imageHeight
            }
        ;
        return (
            <View style={[styles.container,{width: screenWidth}]}>
                <Image
                    resizeMode="contain"
                    style={{width: imageWidth, height: imageHeight}}
                    source={this.isFromGambling == true ? require('../../../images/logo_G.png') : require('../../../images/logo.png')}
                />
            </View>
        );
    }
}