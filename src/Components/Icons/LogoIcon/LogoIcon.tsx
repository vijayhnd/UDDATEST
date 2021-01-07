import React, { Component } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Image,TouchableWithoutFeedback } from "react-native";
import { IComponentLister } from "../../../Components/IComponentListener";
import { IComponentProps } from "../../../Components/IProps";
import { IComponentState } from "../../../Components/IProps";


export interface LogoIconListener extends IComponentLister{
    LogoiconDidTapped():void
}

interface LogoIconProps extends IComponentProps{
    LogoIconlistner?: LogoIconListener
}

interface LogoIconState extends IComponentState{

}


export class LogoIcon extends  Component<LogoIconProps, LogoIconState> {

    constructor(props: LogoIconProps){
        super(props)
    }

    private LogoiconDidTapped(){
        if(this.props.LogoIconlistner){
            this.props.LogoIconlistner.LogoiconDidTapped()
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>this.LogoiconDidTapped()}>
            <View>
                <Image source={require('../../../images/logo_icon.png')} style={{ width:wp(35), height:wp(8) }} resizeMode='contain' /> 
            </View>
            </TouchableWithoutFeedback> 
        );
    }
}