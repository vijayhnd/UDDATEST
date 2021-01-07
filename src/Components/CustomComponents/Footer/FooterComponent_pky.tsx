import React, { Component } from "react";
import { IComponentProps, IComponentState } from "../../IProps";
import styles from "./styles";
import { View} from "react-native";
import { SingleMatchScheduleWithTitleComponent, FooterListner } from "./SingleMatchScheduleWithTitleComponent";
import { SingleMatchScheduleWithTitleViewModel } from "./SingleMatchScheduleWithTitleViewModel";
import { Team } from "../../../Entities/Team";
import { Match } from "../../../Entities/Match";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Application from "../../../Entities/Application";
import moment from 'moment';
import LogoutUtill from "../../../Util/LogoutUtill";
import UrlService from "../../../Services/Core/ServiceURI"


interface FooterComponentProps extends IComponentProps {
    HighLightListner?: FooterListner
    MostOpenedListener?: FooterListner
    ContesetJoinListner?:FooterListner
    authorisationToken: any
    InIf:any
    legue_id:any
    Footer_function?:any
}

interface FooterComponentState extends IComponentState {
    Highlight: any;
    MostOpen: any;
    current_contest_array: any;
    HighlightTeam1:any;
    HighlightTeam2:any;
    HighlightMatchDate:any;
    MostOpenTeam1:any;
    MostOpenTeam2:any;
    MostOpenMatchDate:any;
    FooterData:any;
    ContestTeam1:any;
    ContestTeam2:any;
    ContestDate:any;
}

export class FooterComponent extends Component<FooterComponentProps, FooterComponentState>{
    HighlightTeam1:any;
    HighlightTeam2:any;
    HighlightMatchDate:any;
    MostOpenTeam1:any;
    MostOpenTeam2:any;
    MostOpenMatchDate:any;
  
    isFromGambling:any;

    constructor(props: FooterComponentProps) {
        super(props)
       
        this.state = {
            Highlight: '',
            MostOpen: '',
            current_contest_array:'',
            HighlightTeam1:'',
            HighlightTeam2:'',
            HighlightMatchDate:'',
            MostOpenTeam1:'',
            MostOpenTeam2:'',
            MostOpenMatchDate:'',
            ContestTeam1:'',
            ContestTeam2:'',
            ContestDate:'',
            FooterData:'',
        }

    }

     componentDidMount() {
        if (this.props.InIf == true) {
            this.callMethod(this.props.legue_id);
        }
        else
        {
            this.callMethod(this.props.legue_id);
        }
        
       
    }

    componentWillMount() {
        if (this.props.InIf == true) {
            this.callMethod(this.props.legue_id);
        }
        else
        {
            this.callMethod(this.props.legue_id);
        }
       
    }


    


    HighlightTapped() {

        if (this.props.HighLightListner) {
            this.props.HighLightListner.HighlightTapped()
        }
    }

    MostOpenActionTapped() {
        if (this.props.MostOpenedListener) {
            this.props.MostOpenedListener.MostOpenActionTapped()
        }
    }

    ContesetJoinTapped() {
        if (this.props.ContesetJoinListner) {
            this.props.ContesetJoinListner.ContesetJoinTapped()
        }
    }



    callMethod(league_id: any) {

        
        var params: any = {
            'leagueId': this.props.legue_id,
        };

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        console.log('Footer Input'+JSON.stringify(params));

        fetch(UrlService.CONSTURI +'index.php/v1/apiNew/getUpcomingMatches', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorisation': this.props.authorisationToken
            },
            body: formData,

        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == "Access Expired.") {
                    // AlertUtil.show("Session Expired ! Please login again");
                    console.log("Footer comp ---->"+responseJson.message);
                    LogoutUtill.logoutButtonPressed(this.props);
                   }
                   else{
                console.log('Footer '+JSON.stringify(responseJson));
                if(responseJson.highlights.length>0){
                    this.setState({
                        Highlight: responseJson.highlights.map((x: any) => ({
                          events_id:x.events_id ,
                          event_order: x.event_order,
                          event_name:x.event_name.split(' vs '),
                          league_id: x.league_id,
                          ondate:x.ondate ,
                          ontime: x.ontime,
                          match_time_stamp:x.match_time_stamp
                        }))
                      }); 
                }
                

                  this.setState({
                    MostOpen: responseJson.matchups.map((x: any) => ({
                      events_id:x.events_id ,
                      event_order: x.event_order,
                      event_name:x.event_name.split(' vs '),
                      league_id: x.league_id,
                      ondate:x.ondate ,
                      ontime: x.ontime,
                      match_time_stamp:x.match_time_stamp

                    }))
                  });

                  this.setState({
                    current_contest_array: responseJson.current_contest_array.map((x: any) => ({
                        contest_id: x.contest_id,
                        contest_name: x.contest_name,
                        registration_end_date: x.registration_end_date,
                        contest_start_date:x.contest_start_date,
                        contest_end_date:x.contest_end_date,
                        join_fee: x.join_fee,
                        league_id:x.league_id
                    }))
                  });

                  console.log(this.state);
                  console.log(this.state);
                  console.log(this.state.current_contest_array);
                  var new_time_stamp_h = this.state.Highlight[0].match_time_stamp * 1000;
                  var formated_time_h = moment(new_time_stamp_h).format('LT');  
                  var Match_date_h: any = new Date(new_time_stamp_h).toString().split(' ');
                  var zonevalue_h:any=Match_date_h[6].toString();
                  var zone_h: any = zonevalue_h.substr(1,zonevalue_h.length-2);

                  var new_time_stamp_m = this.state.MostOpen[0].match_time_stamp * 1000;
                  var formated_time_m = moment(new_time_stamp_m).format('LT');  
                  var Match_date_m: any = new Date(new_time_stamp_m).toString().split(' ');
                  var zonevalue_m:any=Match_date_h[6].toString();
                  var zone_m: any = zonevalue_h.substr(1,zonevalue_h.length-2);

          
               this.setState({HighlightTeam1 : this.state.Highlight[0].event_name[0]});
               this.setState({HighlightTeam2 : this.state.Highlight[0].event_name[1]});
               this.setState({HighlightMatchDate:Match_date_h[0] + " "+Match_date_h[1]+" "+Match_date_h[2] + ", " + formated_time_h +" "+zone_h});
               
               this.setState({MostOpenTeam1 : this.state.MostOpen[0].event_name[0]});
               this.setState({MostOpenTeam2 : this.state.MostOpen[0].event_name[1]});
               this.setState({MostOpenMatchDate:Match_date_m[0] + " "+Match_date_m[1]+" "+Match_date_m[2] + ", " + formated_time_m +" "+zone_m});
               
               var contest_date : any;
                  if(this.state.current_contest_array != [] )
                  {
                    contest_date = moment(this.state.current_contest_array[0].contest_end_date).format("Do MMM");
                  }
              

               this.setState({ContestTeam1 :this.state.current_contest_array[0].contest_name});
               this.setState({ContestTeam2 :'' });
               this.setState({ContestDate:contest_date});
                }

            })
            .catch(error => console.log(error)) 

    }


    render() {

        var team1 = new Team(this.state.HighlightTeam1)
        var team2 = new Team(this.state.HighlightTeam2)
    
        var match1 = new Match(team1, team2, this.state.HighlightMatchDate)
        var matchSchedule1 = new SingleMatchScheduleWithTitleViewModel('Highlighted Matchups', match1)

        var match2: any;
        var matchSchedule2:any;
      
        if (Application.sharedApplication().FromGambling == true) {
            this.isFromGambling = true;
             team1 = new Team(this.state.ContestTeam1)
            team2 = new Team(this.state.ContestTeam2)
            match2 = new Match(team1, team2, this.state.ContestDate)
            matchSchedule2 = new SingleMatchScheduleWithTitleViewModel('Current Contests', match2)

        }
        else {
            this.isFromGambling = false;
            team1 = new Team(this.state.MostOpenTeam1)
            team2 = new Team(this.state.MostOpenTeam2)
            match2 = new Match(team1, team2, this.state.MostOpenMatchDate)
             matchSchedule2 = new SingleMatchScheduleWithTitleViewModel('Most Open Action', match2)
        }
        
        return (
            <View style={[styles.container]}>
                <View style={{ width: widthPercentageToDP(50), backgroundColor: 'gray' }}>
                    <SingleMatchScheduleWithTitleComponent viewModel={matchSchedule1} HighLightListner={this} />
                </View>
                <View style={{ width: widthPercentageToDP(1), backgroundColor: '#D5D5D5' }} />
                <View style={{ width: widthPercentageToDP(49), backgroundColor: 'gray' }}>
                    <SingleMatchScheduleWithTitleComponent viewModel={matchSchedule2} MostOpenedListener={this} ContesetJoinListner={this} />
                </View>
            </View>
        )
    }
}

