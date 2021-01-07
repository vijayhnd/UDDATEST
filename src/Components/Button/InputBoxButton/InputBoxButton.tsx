import React, {Component} from 'react';
import INavigationProps from '../..';
import styles from './styles';
import { Dimensions, View, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width - wp(8);

interface InputBoxButtonProps extends INavigationProps {
    placeHolderText?: string
}
export default class InputBoxButton extends Component<InputBoxButtonProps> {

    constructor(props: InputBoxButtonProps){
        super(props);
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>{this.props.placeHolderText}</Text>
                </View>
            </View>
        );
    }
}