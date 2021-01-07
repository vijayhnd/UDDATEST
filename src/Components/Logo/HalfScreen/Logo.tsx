import React, { Component } from "react";
import INavigationProps from "../..";
import { View, Image, Dimensions, ImageStyle } from "react-native";
import styles from "./styles";
import Application from "../../../Entities/Application";

const screenWidth = Dimensions.get('window').width;
const logoWidth = screenWidth*2/3; 
const logoHeight = logoWidth*2/3;

interface HalfPageLogoProps extends INavigationProps {
    tintColor?: string
}

export class HalfPageLogo extends Component<HalfPageLogoProps> {
    isFromGambling: any;
    constructor(props: HalfPageLogoProps) {
        super(props);
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true; 
        }
        else {
            this.isFromGambling = false; 
        }
    }

    render() {
        const imageStyle: ImageStyle = 
            {
                alignSelf: 'center',
                justifyContent: 'center',
                width: logoWidth, 
                height: logoHeight
            }
        ;
        return (
            <View style={[styles.container,{width: screenWidth}]} >
                <Image
                        resizeMode="contain"
                        style={{
                            width: logoWidth, 
                            height: logoHeight,
                        }}
                        source={this.isFromGambling == true ? require('../../../images/logo_G.png') : require('../../../images/logo.png')}
                    />
            </View>
        );
    }
}