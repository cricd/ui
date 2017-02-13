import Team from '../Objects/Team';
import { observable, action } from 'mobx';
import _ from 'underscore';
import TeamService from '../Services/TeamService';

class TeamStore {
    teamService;
    @observable teams = [];

    constructor(teamService) {
        this.teamService = teamService;
        this.getTeams((err) => { if(err) return console.error(err); });
    }

    getTeams(callback) {
        this.teamService.getTeams(action((error, teams) => {
            if(error) callback(error);
            this.teams = teams;
            return callback(null, teams);
        }));
    }

    createTeam(team, callback) {
        this.teamService.createTeam(team, action((err, team) => {
            if(err) return callback(err);
            this.teams.push(team);
            callback(null, team);
        }));
    }
}

const teamService = new TeamService();
const teamStore = new TeamStore(teamService);
export default teamStore;