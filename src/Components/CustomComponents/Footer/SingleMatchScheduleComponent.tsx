import React, { Component } from "react";
import { IComponentProps, IComponentState } from "../../IProps";
import { SingleMatchScheduleViewModel } from "./SingleMatchScheduleViewModel";
import { View, TouchableOpacity } from "react-native";
import SingleMatchScheduleStyles from "./SingleMatchScheduleStyles";
import { Text } from "react-native-elements";
import { TeamVersusComponent } from "./TeamVersusComponent";
import { IComponentLister } from "../../../Components/IComponentListener";
import Application from "../../../Entities/Application";


export interface FooterListner extends IComponentLister {
    HighlightTapped(): void
    MostOpenActionTapped(): void
    ContesetJoinTapped(): void
}

interface SingleMatchScheduleComponentProps extends IComponentProps {
    viewModel: SingleMatchScheduleViewModel
    title: any
    HighLightListner?: FooterListner
    MostOpenedListener?: FooterListner
    ContesetJoinListner?: FooterListner
}

interface SingleMatchScheduleComponentState extends IComponentState {

}

export class SingleMatchScheduleComponent extends Component<SingleMatchScheduleComponentProps, SingleMatchScheduleComponentState>{
    isFromGambling: any;
    constructor(props: SingleMatchScheduleComponentProps) {
        super(props)
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
        }
        else {
            this.isFromGambling = false;
        }
    }

    private HighLightDidTapped() {
        if (this.props.HighLightListner) {
            this.props.HighLightListner.HighlightTapped()
        }
    }

    private MostOpendDidTapped() {
        if (this.props.MostOpenedListener) {
            this.props.MostOpenedListener.MostOpenActionTapped()
        }
    }

    private ContesetJoinTapped() {
        if (this.props.ContesetJoinListner) {
            this.props.ContesetJoinListner.ContesetJoinTapped()
        }
    }


    render() {
        var dateString:any;
        dateString = this.props.viewModel.match.timestamp;
        if(this.props.title == 'Current Contests')
        {
            dateString = this.props.viewModel.match.timestamp;
        }
        return (
            <View>
                <TouchableOpacity  onPress={() => { this.props.title === 'Highlighted Matchups' ? this.HighLightDidTapped() : this.props.title === 'Most Open Action' ? this.MostOpendDidTapped() : this.ContesetJoinTapped() }}>
            <View style={[SingleMatchScheduleStyles.container]}>
                <View style={[{ flexGrow: 0.3 }, { backgroundColor: 'white' }, { justifyContent: 'center' }, { alignItems: 'center' }, { alignSelf: 'stretch' }]}>
                    <TeamVersusComponent viewModel={this.props.viewModel.match} title={this.props.title} />
                    {this.props.title != 'Current Contests' ?
                        <Text style={[SingleMatchScheduleStyles.matchDateTime]}>{dateString}</Text>
                        :
                        <Text style={[SingleMatchScheduleStyles.matchDateTime]} >{dateString == "" ? null : "Open untill " + dateString} </Text>
                    }
                </View>

                <View style={[{ flexGrow: 0.3 }, { backgroundColor: 'white' }, { justifyContent: 'flex-start' }]}>

                    <TouchableOpacity onPress={() => { this.props.title === 'Highlighted Matchups' ? this.HighLightDidTapped() : this.props.title === 'Most Open Action' ? this.MostOpendDidTapped() : this.ContesetJoinTapped() }}>
                        {this.props.title != 'Current Contests' ?
                            <Text style={SingleMatchScheduleStyles.viewMore} > VIEW MORE </Text>
                            :
                            <Text style={SingleMatchScheduleStyles.viewMore} > VIEW MORE </Text>
                            
                        }
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableOpacity></View>
        )
    }

}
// <Text style={SingleMatchScheduleStyles.viewMore} > VIEW CURRENT CONTESTS </Text>