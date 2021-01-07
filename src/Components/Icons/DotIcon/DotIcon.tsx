import React, { Component } from "react";
import INavigationProps from "../..";
import { View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


interface DotIconProps extends INavigationProps{
    isFilled?: boolean
    color? : string
}

interface DotIconState{
    isFilled?: boolean
}
export default class DotIcon extends Component<DotIconProps,DotIconState>{

    constructor(props: DotIconProps){
        super(props);
        this.state = { isFilled: props.isFilled };
    }

    render() {
        
        const backgroundColor = this.state.isFilled ? this.props.color : 'transparent' ;
        const borderColor = this.props.color;
        
        return (
            <View>
                <View style={{width: hp(1.5), height: hp(1.5), borderRadius: hp(1) , borderWidth: 1, backgroundColor:backgroundColor, borderColor: borderColor, margin: wp(1) }}></View>
            </View>
                
        );
    }
}