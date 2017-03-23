import Match from '../Objects/Match';
import { observable, action } from 'mobx';
import _ from 'underscore';
import MatchService from '../Services/MatchService';

class MatchStore {
    matchService;
    @observable matches = [];

    constructor(matchService) {
        this.matchService = matchService;
    }

    @action getMatch(matchId, callback) {
        if(!matchId) return;
        let match =  _(this.matches).find((m) => { return m.id === matchId; });
        if(match) return callback(null, match); 

        this.matchService.getMatchInfo(matchId, (error, match) => {
            if(error) return callback(error);

            let newMatch = new Match(match, this.matchService);
            this.matches.push(newMatch);
            newMatch.subscribe((err) => { if(err) return callback(err); }) 
            newMatch.getScore((err) => { if(err) return callback(err); })
            return callback(null, newMatch);
        });
    }

    createMatch(match, callback) {
        this.matchService.createMatch(match, action((err, match) => {
            if(err) return callback(err);
            this.matches.push(match);
            callback(null, match);
        }));
    }
}

const matchService = new MatchService();
const matchStore = new MatchStore(matchService);
export default matchStore;