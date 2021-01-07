import React, { ReactNode, Component } from "react";
//import styles from "./styles";
import INavigationProps from "../..";
import { ActivityIndicator, View, Image, TouchableWithoutFeedback} from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Fontisto';
import { Avatar, Badge, withBadge } from 'react-native-elements'
import Application from "../../../Entities/Application";

interface ContainerProps extends INavigationProps {
    notificationPress:any
}

export default class Notification extends Component<ContainerProps> {
    private badgeCount = '';

    constructor(props: ContainerProps) {
        super(props);
    }

    private iconDidTapped() {
		//this.props.navigation.goBack(null); 
    }

    render() {
        // this.badgeCount = Application.sharedApplication().user!.profile.total_unread_push_notification
        try{
            this.badgeCount = Application.sharedApplication().user!.profile.total_unread_push_notification
        }
        catch(e)
        {
            
            this.badgeCount = '0';//Application.sharedApplication().user!.profile.total_unread_push_notification
        }
        
        //console.log('badge',this.badgeCount)
        return (
            <TouchableWithoutFeedback onPress={this.props.notificationPress}>
                <View>
                    <Icon name='bell' size={30} color='#67bcbc' style={{paddingVertical: wp(0.5),paddingLeft: wp(3),paddingRight: this.badgeCount?wp(2.5):wp(1.0)}}/>
                    {this.badgeCount?<Badge value={this.badgeCount} status="error" containerStyle={{position: 'absolute', top: 0, right: 7}}/>:null}
                </View>
            </TouchableWithoutFeedback>
        );
    }
  
}