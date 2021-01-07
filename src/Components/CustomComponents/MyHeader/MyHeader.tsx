import React, { ReactNode, Component } from "react";
//import styles from "./styles";
import INavigationProps from "../..";
import { ActivityIndicator, View, Image, TouchableWithoutFeedback} from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

interface ContainerProps extends INavigationProps {
    
}

export default class MyHeader extends Component<ContainerProps> {

    constructor(props) {
		  console.log(props);
        super(props);
    }

    private iconDidTapped() {
		//this.props.navigation.goBack(null); 
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.backBtnPress}> 
                <View>
                    {this.isFromGambling == true ?
                        <Image source={require('../../../images/back_btn.png')} style={{ width: wp(8), height: wp(8) }} resizeMode='contain' />
                        :
                        <Image source={require('../../../images/back_btn.png')} style={{ width: wp(8), height: wp(8) }} resizeMode='contain' />
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }
  
}