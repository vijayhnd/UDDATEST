import React, { Component } from "react";
import INavigationProps from "../..";
import { View, TextInput, TextInputChangeEventData, Alert } from "react-native";
import styles from "./styles";
var OtpInputs = require('react-native-otp-inputs').default;
import AlertUtil from "../../../Util/AlertUtil";


export interface TextInputListener {
    onTextChange(text: string, tag: number): void
    onFocus(tag: number): void
    onEndEditing(tag: number): void
}

interface InputBoxOTPProps extends INavigationProps {
    tag?: number
    tintColor?: string,
    placeHolderText?: string
    text?: string
    listener?: TextInputListener
    multiline?: boolean
}

interface InputBoxOTPState {
    text?: string
}

export default class InputBoxOTP extends Component<InputBoxOTPProps, InputBoxOTPProps> {

    constructor(props: InputBoxOTPProps) {
        super(props);

    }

    onTextChange(text: string, tag: number) {
        this.setState({ text })
        if (this.props.listener) {
            this.props.listener.onTextChange(text, tag)
        }
    }

    onFocus(tag: number): void {
        if (this.props.listener) {
            this.props.listener.onFocus(tag)
        }
    }

    onEndEditing(tag: number): void {
        if (this.props.listener) {
            this.props.listener.onEndEditing(tag)
        }
    }

    render() {
        this.state = { text: this.props.text };
        return (

            <View>
                <OtpInputs handleChange={(code: string) => this.onTextChange(code,this.props.tag!)} numberOfInputs={4} containerStyles={{ alignItems:'center', alignContent:'center'}} inputContainerStyles={styles.mobile_text_wrapper} inputStyles={styles.mobile_text} focusedBorderColor="transparent" />
            </View>

        );
    }
}