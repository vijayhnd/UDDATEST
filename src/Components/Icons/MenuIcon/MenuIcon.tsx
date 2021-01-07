import React, { Component } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Image, TouchableWithoutFeedback } from "react-native";
import { IComponentProps, IProps, IComponentState } from "../../IProps";
import { IComponentLister } from "../../IComponentListener";
import Application from "../../../Entities/Application";

export interface MenuIconListener extends IComponentLister {
    iconDidTapped(): void
}

interface MenuIconProps extends IComponentProps {
    listener?: MenuIconListener
}

interface MenuIconState extends IComponentState {

}

export class MenuIcon extends Component<MenuIconProps, MenuIconState> {
    isFromGambling = false;
    constructor(props: MenuIconProps) {
        super(props)
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
        }
        else {
            this.isFromGambling = false;
        }

    }

    private iconDidTapped() {
        if (this.props.listener) {
            this.props.listener.iconDidTapped()
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.iconDidTapped()}>
                <View>
                    {this.isFromGambling == true ?
                        <Image source={require('../../../images/menu_icon_G.png')} style={{ width: wp(8), height: wp(8) }} resizeMode='contain' />
                        :
                        <Image source={require('../../../images/menu_icon.png')} style={{ width: wp(8), height: wp(8) }} resizeMode='contain' />
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }
}