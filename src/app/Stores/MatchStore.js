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

    getOrFollowMatch(matchId, callback) {
        let match = this.getMatch(matchId);
        if(match) callback(null, match); 
        else this.followMatch(matchId, callback);
    }

    getMatch(matchId) {
        if(!matchId) return;
        return _(this.matches).find((m) => { return m.id === matchId; });
    }

    @action followMatch(matchId, callback) {
        this.matchService.getMatchInfo(matchId, (error, match) => {
            if(error) callback(error);

            let newMatch = new Match(match, this.matchService);
            this.matches.push(newMatch);
            newMatch.subscribe((err) => { if(err) callback(err); }) 
            newMatch.getScore((err) => { if(err) callback(err); })
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