import { ITeam} from "./Team";

export interface IMatch{
    team1: ITeam
    team2: ITeam
    timestamp: string
}

export class Match implements IMatch{
    team1: ITeam
    team2: ITeam
    timestamp: string

    constructor(team1: ITeam, team2: ITeam, date: string){
        this.team1 = team1
        this.team2 = team2
        this.timestamp = date
    }

    static createMatch(team1: ITeam, team2: ITeam, date: string): IMatch {
        var match =  new Match(team1,team2,date)
        return match
    }
}