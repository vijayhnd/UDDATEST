import React, { Component } from "react";
import INavigationProps from "../..";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Application from "../../../Entities/Application";

interface CheckBoxIconProps extends INavigationProps {
    isChecked?: boolean
}

interface CheckBoxIconState {
    isChecked?: boolean
}
export default class CheckBoxIcon extends Component<CheckBoxIconProps, CheckBoxIconState>{
    isFromGambling = false;
    constructor(props: CheckBoxIconProps) {
        super(props);
       
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
        }
        else {
            this.isFromGambling = false;
        }
    }

    render() {
        this.state = { isChecked: this.props.isChecked };
        return (
            <View>
                {this.state.isChecked == true ?
                    this.isFromGambling == true ?
                        <Image source={require('../../../images/checked_G.png')} style={{ width: wp(5), height: wp(5) }} resizeMode='contain' />
                        :
                        <Image source={require('../../../images/checked.png')} style={{ width: wp(5), height: wp(5) }} resizeMode='contain' />
                    :
                    this.isFromGambling == true ?
                        <Image source={require('../../../images/unchecked_G.png')} style={{ width: wp(5), height: wp(5) }} resizeMode='contain' />
                        :
                        <Image source={require('../../../images/unchecked.png')} style={{ width: wp(5), height: wp(5) }} resizeMode='contain' />}
            
            </View>

        );
    }
}