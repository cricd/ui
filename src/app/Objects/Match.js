import Team from './Team';
import { observable, action, computed } from 'mobx';
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
    @observable nextMatchEvent;
    @observable loadingScore = true;

    @computed get currentInnings() {
        if(!this.nextMatchEvent || !this.innings) return null;
        return this.innings[this.nextMatchEvent.ball.innings - 1];
    }
    @computed get batsmen() {
        if(!this.nextMatchEvent || !this.currentInnings) return null;
        let batsmen = this.nextMatchEvent.batsmen;
        return {
            striker: _(this.currentInnings.batting).find((b) => { return b.batsman.id === batsmen.striker.id; }),
            nonStriker: _(this.currentInnings.batting).find((b) => { return b.batsman.id === batsmen.nonStriker.id; })
        }
    }
    @computed get bowler() {
        if(!this.nextMatchEvent || !this.currentInnings) return null;
        let bowler = this.nextMatchEvent.bowler;
        return _(this.currentInnings.bowling).find((b) => { return b.bowler.id === bowler.id; })
    }

    constructor(match, matchService) {
        this.id = match.id;
        if(match.homeTeam) this.homeTeam = new Team(match.homeTeam);
        if(match.awayTeam) this.awayTeam = new Team(match.awayTeam);
        this.startDate = match.startDate;
        this.limitedOvers = match.limitedOvers;
        this.numberOfInnings = match.numberOfInnings;
        this.matchService = matchService;
    }

    @action setMatchType(numberOfInnings, limitedOvers) {
        this.limitedOvers = limitedOvers;
        this.numberOfInnings = numberOfInnings;
    }

    @action getScore(callback) {
        this.loadingScore = true;
        this.matchService.getScore(this.id, action((error, score) => {
            if (error) return callback(error);
            else if (!score) return console.warn('No score exists for this match');
            this.updateScore({ score: score });
            this.loadingScore = false;
            return callback();
        }));
    }

    getNextMatchEvent(callback) {
        this.matchService.getNextMatchEvent(this.id, action((error, matchEvent) => {
            if (error) return callback(error);
            console.debug('New MatchEvent received');
            this.nextMatchEvent = matchEvent;
            return callback();
        }));
    }

    subscribe(callback) {
        this.matchService.subscribeToMatchEvents(
            this.id,
            this.updateScore,
            (err) => { return callback(err); }
        );
    }

    @action updateScore(newScore) {
        console.debug('Score updated detected');
        this.lastMatchEvent = newScore.event;
        this.result = newScore.score.result;
        this.matchEvents = newScore.score.matchEvents;
        this.innings = newScore.score.innings;

        this.getNextMatchEvent((err) => { if(err) console.error('Failed to get next match event'); });
    };
}