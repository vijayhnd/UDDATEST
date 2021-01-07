import React, { Component } from "react";
import INavigationProps from "../..";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Dimensions, Alert } from "react-native";
import styles from "./styles";
import { Button,ThemeProvider } from 'react-native-elements';

const screenWidth = Dimensions.get('window').width - wp(4);

interface LongButtonProps extends INavigationProps {
    tintColor?: string,
    title?: string,
    enabled?: boolean
    buttonStyle?: any,
    listener?:()=>void
}

export default class LongButton extends Component<LongButtonProps> {

    constructor(props: LongButtonProps) {
        super(props);
    }

    buttonPressed(){
        if(this.props.listener){
            this.props.listener()
        }
    }

    render() {
        const theme = {
            Button: {
                buttonStyle: {
                    backgroundColor: '#E2211C',
                    padding: hp(1)
                },
                titleStyle: {
                    fontSize: hp(2),
                    fontFamily: 'Montserrat-Bold'
                }
            },
        };

        return (
            <View>
                <View >
                    <ThemeProvider theme={theme}>
                        <Button disabled={!this.props.enabled}
                                title={this.props.title}
                                buttonStyle = {this.props.buttonStyle}
                                onPress={()=>this.buttonPressed()}
                        />
                    </ThemeProvider>
                </View>
            </View>
        );
    }

}