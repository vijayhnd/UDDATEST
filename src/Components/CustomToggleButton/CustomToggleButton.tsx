import React, {Component} from 'react';
import INavigationProps from '..';
import {View, ViewStyle, TouchableOpacity, Alert } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import styles from './styles';
import CheckBoxIcon from '../Icons/CheckBoxIcon';
import ToggleIcon from '../Icons/ToggleIcon';

interface CustomToggleButtonProps extends INavigationProps {
    isChecked?: boolean,
    content?: string,
    buttonStyle?:any,
    styledContent?: Array<any>,
    link?: Array<string>,
    formattingText?: Array<any>
    isCheckboxIcon?: boolean
    style?: ViewStyle
    listener?:(isOn:boolean)=>void
}

interface CustomToggleButtonState {
    isChecked?: boolean,
    label?: string,
    styledContent?: Array<any>,
    link?: Array<any>,
    formattingText?: Array<any>
}

export default class CustomToggleButton extends Component<CustomToggleButtonProps,CustomToggleButtonState> {

    constructor(props: CustomToggleButtonProps){
        super(props);
        this.state = {isChecked: this.props.isChecked, label: this.props.content}   
    }

    iconPressed() {
        var isChecked = !this.state.isChecked
        this.setState({isChecked: isChecked})
        if(this.props.listener){
            this.props.listener!(isChecked!) 
        }
    }

    render() {
        this.state = {isChecked: this.props.isChecked, label: this.props.content}   
        const formattingText = this.props.formattingText;
        var contentStyle:ViewStyle = {};
        if(this.props.isCheckboxIcon){

        }
        else{
            contentStyle = {alignSelf:'flex-start', flex:1, flexDirection:'row', alignItems:'stretch', paddingLeft:5};
        }
        var isChecked = this.state.isChecked;
        return (
            
            <View style={{flexDirection: 'row' , alignSelf: 'center' }} >
                <View  style={{alignSelf: 'flex-start', paddingRight:5  }}>
                    <TouchableOpacity onPress={()=>{this.iconPressed()}}>
                        {this.props.isCheckboxIcon ? <CheckBoxIcon isChecked={isChecked} /> : <ToggleIcon isChecked={isChecked}  buttonStyle={[this.props.buttonStyle]}/>}
                    </TouchableOpacity>
                </View>
                <View  style={contentStyle}>
                    <ParsedText
                        style={[styles.toggleTextStyle, this.props.style]}
                        parse={formattingText}
                        childrenProps={{ allowFontScaling: false }}
                    >
                        {this.state.label}   
                    </ParsedText>
                </View>
            </View>
        );
    }
}