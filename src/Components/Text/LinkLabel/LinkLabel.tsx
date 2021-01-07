import React, { Component } from "react";
import INavigationProps from "../..";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import styles from './styles';

interface LinkLabelProps extends INavigationProps{
    text?: any
    style?: any
    listener?:()=>void
    textColor?: string
}

interface LinkLabelState {
    text?: any
}

export default class LinkLabel extends Component<LinkLabelProps,LinkLabelState> {

    constructor(props: LinkLabelProps) {
        super(props);
        this.state = { text: this.props.text };
    }

    linkPressed(){
        if(this.props.listener){
            this.props.listener!();
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>{this.linkPressed()}}>
                <Text
                    style={[styles.link_label,this.props.style]}
                >
                    {this.state.text}
                </Text>
                </TouchableOpacity>
            </View>
        );
    }
}