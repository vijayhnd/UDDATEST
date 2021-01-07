import React, { Component } from "react";
import INavigationProps from "../..";
import { View, TextInput } from "react-native";
import styles from "./styles";

export interface TextInputListener{
    onTextChange(text: string, tag: number): void
    onFocus(tag: number): void
    onEndEditing(tag: number): void
}

interface InputBoxMobileProps extends INavigationProps {
    tag?: number
    tintColor?: string,
    placeHolderText?: string
    text? : string
    listener?: TextInputListener
    multiline?: boolean
}

interface InputBoxMobileState {
    text? :string
}

export default class InputBoxMobile extends Component<InputBoxMobileProps,InputBoxMobileState> {

    constructor(props: InputBoxMobileProps) {
        super(props);
        
    }

    onTextChange(text: string, tag: number){
        this.setState({text})
        if(this.props.listener){
            this.props.listener.onTextChange(text,tag)
        }
    }

    onFocus(tag: number): void{
        if(this.props.listener){
            this.props.listener.onFocus(tag)
        }
    }

    onEndEditing(tag: number): void{
        if(this.props.listener){
            this.props.listener.onEndEditing(tag)
        }
    }

    render() {
        this.state = { text: this.props.text };
        return (
            <View>
                <View style={styles.mobile_text_wrapper}>
                    <TextInput
                        style={styles.mobile_text}
                        placeholder = {this.props.placeHolderText}
                        placeholderTextColor = "#666666"
                        onChangeText={(text) =>this.onTextChange(text,this.props.tag!)}
                        onFocus={() =>this.onFocus(this.props.tag!)}
                        onEndEditing={() =>this.onEndEditing(this.props.tag!)}
                        value={this.state.text}
                        keyboardType={'phone-pad'}
                        multiline={this.props.multiline}
                    />
                </View>
            </View>
        );
    }
}