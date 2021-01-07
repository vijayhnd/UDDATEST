import React, { ReactNode, Component } from "react";
import styles from "./styles";
import INavigationProps from "../..";
import { ActivityIndicator, View, Image } from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


interface OverlayBackgroundProps extends INavigationProps {
    
}

export class OverlayBackground extends Component<OverlayBackgroundProps> {

    constructor(props: OverlayBackgroundProps) {
        super(props);
    }

    render() {
        
        return (
            <View style={styles.container}/>
        );
    }
}