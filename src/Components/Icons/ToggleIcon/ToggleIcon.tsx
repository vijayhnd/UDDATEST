import React, { Component } from "react";
import INavigationProps from "../..";
import { View, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Application from "../../../Entities/Application";

interface ToggleIconProps extends INavigationProps {
    isChecked?: boolean
    buttonStyle?:any
}

interface ToggleIconState {
    isChecked?: boolean
   
}
export default class ToggleIcon extends Component<ToggleIconProps, ToggleIconState>{
    isFromGambling: any;
    constructor(props: ToggleIconProps) {
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
                { this.state.isChecked && this.isFromGambling == true ?
                        <Image source={require('../../../images/toggle_on_G.png')} style={[{ width: wp(18), height: wp(9) },this.props.buttonStyle]}                        resizeMode='contain' />
                        : 
                        this.state.isChecked && this.isFromGambling == false ? 
                        <Image source={require('../../../images/toggle_on.png')} style={[{ width: wp(18), height: wp(9) },this.props.buttonStyle]}                        resizeMode='contain' />

                    : <Image source={require('../../../images/toggle_off.png')} style={[{ width: wp(18), height: wp(9) },this.props.buttonStyle]}                    resizeMode='contain' />}
            </View>

        );
    }

}