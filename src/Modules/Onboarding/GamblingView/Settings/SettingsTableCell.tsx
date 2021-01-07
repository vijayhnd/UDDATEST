import React, { Component } from "react";
import { IComponentProps, IComponentState } from "../../../../Components/IProps";
import { View, Text, Image, Platform, Alert, TouchableWithoutFeedback } from "react-native";
import SettingsTableCellStyles from "./SettingsTableCellStyles";
import { SettingsTableCellViewModel } from "./SettingsTableCellViewModel";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomToggleButton from "../../../../Components/CustomToggleButton";
import AlertUtil from "../../../../Util/AlertUtil";

interface SettingsTableCellProps extends IComponentProps{
    viewModel?: SettingsTableCellViewModel,
    titleStyle?: any
}

interface SettingsTableCellState extends IComponentState{

}

export class SettingsTableCell extends Component<SettingsTableCellProps, SettingsTableCellState>{

    constructor(props: SettingsTableCellProps){
        super(props)
    }

    switchValueChanged(isOn: boolean){
        
        if(this.props.viewModel!.switchHandler){
            //AlertUtil.show('Switch value changed')
            this.props.viewModel!.switchHandler(isOn)
        }
    }

    render(){

        if(this.props.viewModel!.switchCell){
            return(
                <TouchableWithoutFeedback onPress = {() => this.props.viewModel!.onPress(this.props.viewModel!.sectionIndex,this.props.viewModel!.index)}> 
                <View style={[SettingsTableCellStyles.mainContent]}>
                    <Text style={[SettingsTableCellStyles.titleStyle, this.props.titleStyle]}>{this.props.viewModel!.title}</Text>
                    <View style={[SettingsTableCellStyles.switch]}>
                        <CustomToggleButton isChecked = {this.props.viewModel!.selected}
                                            buttonStyle= {[{flexGrow: 1}]}
                                            listener={(isOn)=>this.switchValueChanged(isOn)}/>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            )
        }else{
            return(
                <TouchableWithoutFeedback onPress = {this.props.viewModel!.onPress}> 
                <View style={[SettingsTableCellStyles.mainContent]}>
                    <Text style={[SettingsTableCellStyles.titleStyle, this.props.titleStyle]}>{this.props.viewModel!.title}</Text>
                </View>
                </TouchableWithoutFeedback>
            )
        }
        
    }
}