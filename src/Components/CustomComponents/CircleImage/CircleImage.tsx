import React, { Component } from "react";
import styles from "./styles";
import INavigationProps from "../..";
import {  View, Image } from "react-native";
import { IComponentState } from "../../IProps";


interface ContainerProps extends INavigationProps {
    width: number
    imageFilePath?: string
}

interface ContainerState extends IComponentState{
}

export default class CircleImage extends Component<ContainerProps, ContainerState> {

    constructor(props: ContainerProps) {
        super(props);
    }

    render() {
        const imageWidth = this.props.width;
        var icon = this.props.imageFilePath ? {uri: this.props.imageFilePath} : require('./images/profile.png')
        return (
            <View style={styles.circleImageMainContent}>
                <Image source={icon} style={{borderRadius: this.props.width/2, width:imageWidth ,height:imageWidth}} resizeMode='cover' />
            </View>
        );
        
    }
}