import React,{ Component } from "react";
import { IComponentProps, IComponentState } from "../../IProps";
import { IMatch } from "../../../Entities/Match";
import TeamVersusStyles from "./TeamVersusStyles";
import { View } from "react-native";
import { Text } from "react-native-elements";

interface TeamVersusComponentProps extends IComponentProps{
    viewModel: IMatch
    title?:any;
}

interface TeamVersusComponentState extends IComponentState{

}

export class TeamVersusComponent extends Component<TeamVersusComponentProps, TeamVersusComponentState>{
    
    constructor(props: TeamVersusComponentProps){
        super(props)
    }

    render(){
        return(
            <View style={[TeamVersusStyles.container]}>
                
                <Text style={[TeamVersusStyles.teamName,{textAlign:'center'}]}
                      numberOfLines={1} 
                      ellipsizeMode={'tail'}>{this.props.viewModel.team1.name == "" ? "No Data Available" : this.props.viewModel.team1.name}
                {this.props.title != 'Current Contests' ? <Text style={[TeamVersusStyles.versusText]}>{this.props.viewModel.team1.name == "" ?null: " v/s " }</Text> : null}
                <Text style={[TeamVersusStyles.teamName]} 
                      numberOfLines={1} 
                      ellipsizeMode={'tail'}>{this.props.viewModel.team2.name}</Text>
               </Text>
                      
            </View>
        )
    }
}