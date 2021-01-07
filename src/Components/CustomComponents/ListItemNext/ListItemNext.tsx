import React, { ReactNode, Component } from "react";
import styles from "./styles";
import INavigationProps from "../..";
import { Text, View, Keyboard } from "react-native";
import NextIcon from '../../Icons/NextIcon';

interface ContainerProps extends INavigationProps {
    title? : string
}

export default class ListItemNext extends Component<ContainerProps> {

    constructor(props: ContainerProps) {
        super(props);
    }

    render() {
        return(
            <View style={styles.listItemMainContainer}> 
                <View style={styles.listItemTextContainer}>
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                </View>
                <View style={styles.listItemIconContainer}>
                    <NextIcon />
                </View>
            </View>
        );
    }
}