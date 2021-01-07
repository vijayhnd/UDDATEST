import React, { Component } from "react";
import { IComponentProps, IComponentState } from "../../../../Components/IProps";
import SettingsTableCellHeaderStyles from "./SettingsTableCellHeaderStyles";
import { View, Image, Platform, TouchableWithoutFeedback } from "react-native";
import { Text } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SettingsTableCellHeaderViewModel } from "./SettingsTableCellHeaderViewModel";
import AlertUtil from "../../../../Util/AlertUtil";

interface SettingsTableCellHeaderProps extends IComponentProps{
    titleStyle?: any
    viewModel?: SettingsTableCellHeaderViewModel
}

interface SettingsTableCellHeaderState extends IComponentState{

}


export class SettingsTableCellHeader extends Component<SettingsTableCellHeaderProps, SettingsTableCellHeaderState>{

    constructor(props: SettingsTableCellHeaderProps){
        super(props)
    }

    render(){
        var icon = this.props.viewModel!.icon
        //AlertUtil.show(this.props.viewModel!.title+'selected: '+this.props.viewModel!.selected)
        return(
            
            <TouchableWithoutFeedback onPress = {() => this.props.viewModel!.onPress(this.props.viewModel!.index)}> 
            <View style={[SettingsTableCellHeaderStyles.mainContent,(this.props.viewModel!.selected ? SettingsTableCellHeaderStyles.selectedBackgroundStyle : SettingsTableCellHeaderStyles.unselectedBackgroundStyle) ]}>
             
                <View style={[SettingsTableCellHeaderStyles.cellIcon]}>
                    <Image source={icon} style={{ width: wp(10), height: wp(10), borderRadius: Platform.OS==='ios' ? wp(10)/2 : wp(10), backgroundColor:'transparent' }} resizeMode='contain' />
                </View>
                <Text style={[SettingsTableCellHeaderStyles.titleStyle, this.props.titleStyle,(this.props.viewModel!.selected ? SettingsTableCellHeaderStyles.selectedTitleStyle : SettingsTableCellHeaderStyles.unselectedTitleStyle)]}>{this.props.viewModel!.title}</Text>
                <View style={[SettingsTableCellHeaderStyles.nextIcon]}>
                    <Image source={require('../../../../images/next_icon_transparent.png')} style={{ width: wp(5), height: wp(8), borderRadius: Platform.OS==='ios' ? wp(10)/2 : wp(10), backgroundColor:'transparent' }} resizeMode='contain' />
                </View>
            
            </View>
            </TouchableWithoutFeedback>
        )
    }
}