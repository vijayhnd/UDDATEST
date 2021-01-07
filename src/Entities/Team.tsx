export interface ITeam{
    name: string
}

export class Team implements ITeam{
    name: string

    constructor(name: string){
        this.name = name
    }

    static createTeam(name: string): ITeam{
        var team = new Team(name)
        return team
    }
}