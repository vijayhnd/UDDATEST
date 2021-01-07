import React, { Component } from "react";
import styles from "./styles";
import INavigationProps from "../..";
import { Text, View } from "react-native";
import Application from "../../../Entities/Application";

interface ContainerProps extends INavigationProps {
    title: string
}

export default class Title extends Component<ContainerProps> {
    isFromGambling=false;
    constructor(props: ContainerProps) {
        super(props);
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
        }
        else {
            this.isFromGambling = false;
        }
    }

    render() {
        return (
            <View style={styles.titleContainer}>
                <Text style={[styles.textStyle,{color: this.isFromGambling == true ? '#68bcbc' : '#e2211c'}]}>{this.props.title}</Text>
            </View>
        );
    }
}