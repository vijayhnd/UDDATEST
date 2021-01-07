import React, { Component } from "react";
import INavigationProps from "../..";
import styles from './styles';
import { View,Text, Alert, TouchableOpacity } from "react-native";
import { ThemeProvider,Button, colors } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FacebookIcon, GoogleIcon, TwitterIcon } from "../../Icons/SocialIcon";

interface SocialButtonProps extends INavigationProps{
    title?: string,
    buttonType?: ButtonType
    style?: any,
    pointerEvents?: any,
    tapAction?:()=>void
}

export enum ButtonType {
    FACEBOOK = 1,
    TWITTER = 2,
    GOOGLE = 3
}

export default class SocialButton extends Component<SocialButtonProps>{

    private socialButtonStyle: string

    constructor(props: SocialButtonProps){
        super(props);
        this.socialButtonStyle = this.getButtonStyle(this.props.buttonType!);
    }

    getButtonStyle(type: ButtonType){
        
        switch(type){
            case ButtonType.FACEBOOK:
                return styles.facebookButtonStyle;
            case ButtonType.TWITTER:
                return styles.twitterButtonStyle;
            case ButtonType.GOOGLE:
                return styles.googleButtonStyle;
        }
    }

    buttonPressed(){
        if(this.props.tapAction){
            this.props.tapAction()
        }
    }

    render() {
 
        const theme = {
            Button: {
                buttonStyle: [styles.buttonStyle, this.props.style, this.socialButtonStyle],
                titleStyle: [styles.text, this.props.style]
            }
        };
 
         return (
             <View style={{ flexDirection:'row', alignItems:'center'}} pointerEvents={this.props.pointerEvents}>                 
                 <View style={styles.background_button}>
                    <ThemeProvider theme={theme}>
                        <Button onPress={()=>this.buttonPressed()}
                        />
                    </ThemeProvider>
                </View>
                <View style={styles.overlay_icon_text} pointerEvents='none'>
                    <View style={{padding:hp(2), paddingLeft: wp(5)}}>
                        { this.props.buttonType === ButtonType.FACEBOOK ? <FacebookIcon /> : <View />}
                        { this.props.buttonType === ButtonType.GOOGLE ? <GoogleIcon /> : <View />}
                        { this.props.buttonType === ButtonType.TWITTER ? <TwitterIcon /> : <View />}
                    </View>
                    <View style={{padding:hp(2)}}>
                        <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                </View>
             </View>
         );
     }
}