import React, { Component } from "react";
import { IComponentProps, IComponentState } from "../../IProps";
import { SingleMatchScheduleWithTitleViewModel } from "./SingleMatchScheduleWithTitleViewModel";
import { View } from "react-native";
import SingleMatchScheduleWithTitleStyles from "./SingleMatchScheduleWithTitleStyles";
import { GrayRedTitleComponent } from "./GrayRedTitleComponent";
import { GrayRedTitleViewModel } from "./GrayRedTitleViewModel";
import { SingleMatchScheduleViewModel } from "./SingleMatchScheduleViewModel";
import { SingleMatchScheduleComponent } from "./SingleMatchScheduleComponent";
import { IComponentLister } from "../../../Components/IComponentListener";

export interface FooterListner extends IComponentLister {
    HighlightTapped(): void
    MostOpenActionTapped(): void
    ContesetJoinTapped():void

}

interface SingleMatchScheduleWithTitleComponentProps extends IComponentProps {
    viewModel: SingleMatchScheduleWithTitleViewModel
    HighLightListner?: FooterListner
    MostOpenedListener?: FooterListner
    ContesetJoinListner?: FooterListner
}

interface SingleMatchScheduleWithTitleComponentState extends IComponentState {

}



export class SingleMatchScheduleWithTitleComponent extends Component<SingleMatchScheduleWithTitleComponentProps, SingleMatchScheduleWithTitleComponentState>{

    constructor(props: SingleMatchScheduleWithTitleComponentProps) {
        super(props)
    }

    HighlightTapped(){
   
        if (this.props.HighLightListner){
            this.props.HighLightListner.HighlightTapped()
        }
    }
    
    MostOpenActionTapped(){
        if (this.props.MostOpenedListener){
            this.props.MostOpenedListener.MostOpenActionTapped()
        }
    }

     ContesetJoinTapped() {
        if (this.props.ContesetJoinListner) {
            this.props.ContesetJoinListner.ContesetJoinTapped()
        }
    }


    render() {
        var titleViewModel = new GrayRedTitleViewModel(this.props.viewModel.title)
        var matchViewModel = new SingleMatchScheduleViewModel(this.props.viewModel.match)
        return (
            <View style={[SingleMatchScheduleWithTitleStyles.container]}>
                <View style={[SingleMatchScheduleWithTitleStyles.titleContainer]}>
                    <GrayRedTitleComponent viewModel={titleViewModel} />
                </View>

                   <View style={[SingleMatchScheduleWithTitleStyles.matchContainer]}>
                        <SingleMatchScheduleComponent viewModel={matchViewModel} title={this.props.viewModel.title} HighLightListner={this} MostOpenedListener={this} ContesetJoinListner={this}/>
                    </View>
              

            </View>
        )
    }
}