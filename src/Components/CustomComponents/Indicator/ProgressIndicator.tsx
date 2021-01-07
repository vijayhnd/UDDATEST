import React, { ReactNode, Component } from "react";
import styles from "./styles";
import INavigationProps from "../..";
import { ActivityIndicator, View, Image } from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


interface ContainerProps extends INavigationProps {
    
}

export class ProgressIndicator extends Component<ContainerProps> {

    constructor(props: ContainerProps) {
        super(props);
    }

    render() {
        
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color={styles.$indicatorColor} />
            </View>
        );
    }
}