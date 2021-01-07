import React, { Component } from "react";
import INavigationProps from "../..";
import styles from './styles';
import { View } from "react-native";
import { ThemeProvider, Button } from "react-native-elements";

interface BigButtonProps extends INavigationProps{
    title?: string
    style? :any
    textStyle?: any
    listener?:()=>void
}

export default class BigButton extends Component<BigButtonProps> {

    constructor(props: BigButtonProps) {
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
                buttonStyle: [styles.buttonStyle,this.props.style],
                titleStyle: [styles.text,this.props.textStyle]
            },
        };

        return (
            <View>
                <ThemeProvider theme={theme}>
                    <Button
                        title={this.props.title}
                        onPress={()=>this.buttonPressed()}
                    />
                </ThemeProvider>
            </View>
        );
    }
}