import Team from '../Objects/Team';
import { observable, action } from 'mobx';
import _ from 'underscore';
import * as TeamService from '../Services/TeamService';

class TeamStore {
    @observable teams = [];

    constructor() {
        this.getTeams((err) => { if(err) return console.error(err); });
    }

    getTeam(teamId, callback) {
        if(!teamId) return;
        let team =  _(this.teams).find((t) => { return t.id === teamId; });
        if(team) return callback(null, team); 

        TeamService.getTeam(teamId, (error, team) => {
            if(error) return callback(error);
            this.teams.push(new Team(team));
            return callback(null, team);
        });
    }

    getTeams(callback) {
        TeamService.getTeams(action((error, teams) => {
            if(error) callback(error);
            this.teams = teams;
            return callback(null, teams);
        }));
    }

    createTeam(team, callback) {
        TeamService.createTeam(team, action((err, team) => {
            if(err) return callback(err);
            this.teams.push(team);
            callback(null, team);
        }));
    }
}

const teamStore = new TeamStore();
export default teamStore;