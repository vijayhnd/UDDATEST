import React, { Component } from "react";
import styles_input from "../styles_input";
import styles from './styles';
import { View, TextInput } from "react-native";
import INavigationProps from "../..";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInputListener } from "../Mobile/InputBoxMobile";

interface InputBoxTextProps extends INavigationProps{
    tag?: number
    style?: any
    tintColor?: string,
    placeHolderText?: string
    contentType?: string
    keyboardType?: string
    listener?: TextInputListener
    initialValue?: string
    editable?: boolean   //shashi
    selectTextOnFocus?: boolean  //shashi
}

interface InputBoxTextState {
    text? :string
}

export default class InputBoxText extends Component<InputBoxTextProps,InputBoxTextState> {
    isPassword: boolean = false;

    constructor(props: InputBoxTextProps) {
        super(props);
        this.state = { text: this.props.initialValue };

        if(this.props.contentType){
            switch(this.props.contentType){
                case 'password':
                    this.isPassword = true
                    break;
            }
        }

    }   

    onTextChange(text: string, tag: number){
        this.setState({text})
        if(this.props.listener){
            this.props.listener.onTextChange(text,tag)
        }
    }

    

    render() {

        var textColor  = styles_input.$textColor;
        var placeholdertextColor  = styles_input.$placeholderTextColor;

        if(this.props.style && this.props.style.color){
            textColor = this.props.style.color;
        }

        const textStyle = [
            { textAlign: 'left', color: textColor, fontSize: hp(2), fontFamily: 'Montserrat-SemiBold', paddingBottom:hp(1)}
        ];
        
        if(this.props.style){
            textStyle.push(this.props.style);
        }


        return (
            <View style={styles.container} >
                <View style={{ borderBottomColor: '#BBBBBB', borderBottomWidth: 1 , flex:1 }}>
                    <TextInput
                        {...this.props.style}
                        style={textStyle}
                        placeholder = {this.props.placeHolderText}
                        placeholderTextColor = {placeholdertextColor}
                        onChangeText={(text) =>this.onTextChange(text,this.props.tag!)}
                        value={this.state.text}
                        secureTextEntry={this.isPassword}
                        keyboardType = {this.props.keyboardType}

                        editable = {this.props.editable}  
                        selectTextOnFocus = {this.props.selectTextOnFocus}
                    />
                </View>
            </View>
        );
    }
}