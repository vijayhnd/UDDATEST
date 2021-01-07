import React, { Component } from "react";
import { IComponentProps, IComponentState } from "../../IProps";
import { View } from "react-native";
import GrayRedTitleStyles from "./GrayRedTitleStyles";
import { Text } from "react-native-elements";
import { GrayRedTitleViewModel } from "./GrayRedTitleViewModel";
import Application from "../../../Entities/Application";



interface GrayRedTitleComponentProps extends IComponentProps {
    viewModel: GrayRedTitleViewModel
   
}

interface GrayRedTitleComponentState extends IComponentState {

}

export class GrayRedTitleComponent extends Component<GrayRedTitleComponentProps, GrayRedTitleComponentState>{
    isFromGambling = false;
    constructor(props: GrayRedTitleComponentProps) {
       
        super(props)
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
        }
        else {
            this.isFromGambling = false;
        }
    }

  

    render() {
        return (
            <View style={[GrayRedTitleStyles.container]}>
                    <Text style={[GrayRedTitleStyles.title,{color : this.isFromGambling ? '#68bcbc' : '#e2211c'}]}>
                    {this.props.viewModel.title.toUpperCase()=='CURRENT CONTESTS'?'FREE TO PLAY CONTESTS':this.props.viewModel.title.toUpperCase()}
                    </Text>
            </View>
        )
    }
}
// {this.props.viewModel.title.toUpperCase()=='CURRENT CONTESTS'?'FREE TO PLAY CONTESTS':this.props.viewModel.title.toUpperCase()}