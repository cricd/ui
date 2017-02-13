import Team from './Team';
import { observable, action } from 'mobx';
import _ from 'underscore';

export default class Match {
    matchService;
    id;
    @observable homeTeam;
    @observable awayTeam;
    @observable startDate;
    @observable limitedOvers;
    @observable numberOfInnings;
    @observable matchEvents = [];
    @observable innings = [];
    @observable result;
    @observable lastMatchEvent;

    constructor(match, matchService) {
        this.id = match.id;
        this.homeTeam = new Team(match.homeTeam);
        this.awayTeam = new Team(match.awayTeam);
        this.startDate = match.startDate;
        this.limitedOvers = match.limitedOvers;
        this.numberOfInnings = match.numberOfInnings;
        this.matchService = matchService;
    }

    @action getScore(callback) {
        this.matchService.getScore(this.id, (error, score) => {
            if(error) return callback(error);
            else if(!score) return callback('No score exists for this match');
            this.updateScore({ score: score });
            return callback();
        });
    }

    subscribe(callback) {
        this.matchService.subscribeToMatchEvents(
            this.id,
            this.updateScore,
            (err) => { callback(err); }
        );
    }

    @action updateScore(newScore) {
        this.lastMatchEvent = newScore.event;
        this.result = newScore.score.result;
        this.matchEvents = newScore.score.matchEvents;
        this.innings = newScore.score.innings;
    };
}