import Match from '../Objects/Match';
import { observable, action } from 'mobx';
import _ from 'underscore';
import * as MatchService from '../Services/MatchService';

class MatchStore {
    @observable matches = [];

    @action getMatch(matchId, callback) {
        if (!matchId) return;
        let match = _(this.matches).find((m) => { return m.id === matchId; });
        if (match) return callback(null, match);

        MatchService.getMatch(matchId, (error, match) => {
            if (error) return callback(error);

            let newMatch = new Match(match, this.matchService);
            this.matches.push(newMatch);
            newMatch.subscribe((err) => { if (err) return callback(err); })
            newMatch.getScore((err) => { if (err) return callback(err); })
            return callback(null, newMatch);
        });
    }

    @action createMatch(match, callback) {
      match.startDate = new Date(match.startDate.setHours(0, 0, 0)); // Remove time component

       let newMatch = {
           homeTeam: match.homeTeam.id, 
           awayTeam: match.awayTeam.id, 
           startDate:  new Date(match.startDate),
           numberOfOvers: match.numberOfOvers,
           numberOfInnings: match.numberOfInnings,
           loading: true
       };

        MatchService.createMatch(newMatch, action((err, match) => {
            if (err) return callback(err);
            this.matches.push(match);
            callback(null, match);
        }));
    }
}

const matchStore = new MatchStore();
export default matchStore;