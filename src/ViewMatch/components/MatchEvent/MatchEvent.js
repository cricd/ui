import React, { Component } from 'react';
import './MatchEvent.scss';

class MatchEvent extends Component {
    /*
    {
    "match": 1,
    "eventType": "delivery",
    "timestamp": "2009-06-21",
    "ball": {
        "battingTeam": {
        "id": 1,
        "name": "Pakistan"
        },
        "fieldingTeam": {
        "id": 5,
        "name": "Sri Lanka"
        },
        "innings": 2,
        "over": 18,
        "ball": 2
    },
    "runs": 4,
    "batsmen": {
        "striker": {
        "id": 37,
        "name": "Shoaib Malik"
        },
        "nonStriker": {
        "id": 30,
        "name": "Shahid Afridi"
        }
    },
    "bowler": {
        "id": 53,
        "name": "SL Malinga"
    }
    }
    */
    getCommentary() {
        return {
            delivery: function(e) {
                if(e.runs == 0) return 'Dot ball';
                else return e.runs + ' runs';
            },
            noBall: function(e) {
                if(e.runs > 0) return 'No ball and the batsmen have run ' + e.runs;
                else return 'No ball';
            },
            wide: function(e){
                if(e.runs > 0) return 'Wide and the batsmen have run ' + e.runs;
                else return 'Wide';
            },
            bye: function(e){
                return e.runs + ' byes';
            },
            legBye: function(e){
                return e.runs + ' leg byes';
            },
            bowled: function(e){
                return e.batsmen.striker.name + ' has been bowled';
            },
            timedOut: function(e){
                return e.batsman.name + ' was timed out';
            },
            handledBall: function(e){
                return e.batsmen.striker.name + ' has been dismissed for handled ball';
            },
            doubleHit: function(e){
                return e.batsmen.striker.name + ' has been dismissed for a double hit';
            },
            hitWicket: function(e){
                return e.batsmen.striker.name + ' has hit his wickets';
            },        
            lbw: function(e){
                return e.batsmen.striker.name + ' out leg before wicket';
            },         
            ostruction: function(e){
                return e.batsman.name + ' has been dismissed for obstructing a fielder';
            },
            runs: function(e){
                return e.batsman.name + ' has been runout attempting to run ' + e.runs;
            },
            stumped: function(e){
                return e.batsmen.striker.name + ' has been stumped';
            },         
        };
    }

    render() {
        var overAndBall = this.props.ball ? this.props.ball.over + '.' + this.props.ball.ball : '0.0';
        var bowlerToBatsman = (this.props.bowler && this.props.batsmen) ? this.props.bowler.name + ' to ' + this.props.batsmen.striker.name : '';
        var commentary = this.props.eventType ? this.getCommentary()[this.props.eventType](this.props) : '';
        return (
            <div>
                <span className="overAndBall">{overAndBall}</span>
                <span className="bowlerToBatsman">{bowlerToBatsman}</span>
                {commentary}
            </div>
        );
    }
}

export default MatchEvent;
