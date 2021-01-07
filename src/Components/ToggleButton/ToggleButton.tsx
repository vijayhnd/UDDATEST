import React, { Component } from "react";
import INavigationProps from "..";
import styles from "../Button/LongButton/styles";
import { Dimensions, View, Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ThemeProvider, CheckBox } from "react-native-elements";

const screenWidth = Dimensions.get('window').width - wp(2);

interface ToggleButtonProps extends INavigationProps {
    isChecked?: boolean,
    content?: string,
    styledContent?: Array<any>,
    link?: Array<string>
    style?: any
}

interface ToggleButtonState {
    isChecked: boolean,
    label: string
}

export default class ToggleButton extends Component<ToggleButtonProps,ToggleButtonState> {

    constructor(props: ToggleButtonProps) {
        super(props);
        this.state = { isChecked: props.isChecked!, label: props.content! };
    }

    render() {

        const toggleButtonStyle = [
            styles.togglebutton
        ];

        const theme = {
            CheckBox: {
                titleProps: {
                    style:{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        padding: 0,                        
                        fontSize : hp(1.6),
                        paddingVertical: 0,
                        marginRight: wp(20),
                        color: '#333333',
                        fontFamily: 'Montserrat-Regular',
                    }
                },
            },
        };

        return (
            <View style={[styles.container,{width: screenWidth}]}>
                <ThemeProvider theme = {theme}>
                    <CheckBox
                        title={this.state.label}                        
                        checkedIcon={<Image source={require('../../images/toggle_off.png')} style={{ width: wp(20), height:wp(10) }} resizeMode='contain' />}
                        uncheckedIcon={<Image source={require('../../images/toggle_off.png')} style={{ width: wp(20), height:wp(10) }} resizeMode='contain' />}
                        checked={this.state.isChecked}
                        onPress={() => this.setState({ isChecked: !this.state.isChecked })}
                    />
                </ThemeProvider>
                
            </View>
        );
    }
}