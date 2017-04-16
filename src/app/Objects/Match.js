import Team from './Team';
import { observable, action, computed } from 'mobx';
import _ from 'underscore';
import teamStore from '../Stores/TeamStore';
import * as MatchService from '../Services/MatchService';

export default class Match {
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

    constructor(match, matchService) {
        this.id = match.id;
        this.startDate = match.startDate;
        this.limitedOvers = match.limitedOvers;
        this.numberOfInnings = match.numberOfInnings;

        if(match.homeTeam) teamStore.getTeam(match.homeTeam.id, (err, team) => {
            if(err) return console.log('Unable to retrieve Home team');
            this.homeTeam = team;
        });
        if(match.awayTeam) teamStore.getTeam(match.awayTeam.id, (err, team) => {
            if(err) return console.log('Unable to retrieve Away team');
            this.awayTeam = team;
        });
    }
    
    @computed get currentInnings() {
        if(!this.nextMatchEvent || !this.innings) return null;
        return this.innings[this.nextMatchEvent.ball.innings - 1];
    }
    @computed get fieldingTeam() {
        if(!this.currentInnings) return null;
        let battingTeamId = this.currentInnings.battingTeam.id;
        if(battingTeamId === this.homeTeam.id) return this.awayTeam;
        else return this.homeTeam;
    }
    @computed get battingTeam() {
        if(!this.currentInnings) return null;
        let battingTeamId = this.currentInnings.battingTeam.id;
        if(battingTeamId === this.homeTeam.id) return this.homeTeam;
        else return this.awayTeam;
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


    @action setMatchType(numberOfInnings, limitedOvers) {
        this.limitedOvers = limitedOvers;
        this.numberOfInnings = numberOfInnings;
    }

    @action getScore(callback) {
        this.loadingScore = true;
        MatchService.getScore(this.id, action((error, score) => {
            if (error) return callback(error);
            else if (!score) return console.warn('No score exists for this match');
            this.updateScore({ score: score });
            this.loadingScore = false;
            return callback();
        }));
    }

    getNextMatchEvent(callback) {
        MatchService.getNextMatchEvent(this.id, action((error, matchEvent) => {
            if (error) return callback(error);
            console.debug('New MatchEvent received');
            this.nextMatchEvent = matchEvent;
            return callback();
        }));
    }

    subscribe(callback) {
        MatchService.subscribeToMatchEvents(
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