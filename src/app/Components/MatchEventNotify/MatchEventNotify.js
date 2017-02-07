import React from 'react';
import Notification from 'react-web-notification';
import { observer } from 'mobx-react';

const MatchEventNotify = observer( ({ matchEvent, settings, notify })  => {
    let commentary = describeEvent(matchEvent);
    let teams = matchEvent.ball.battingTeam.name + ' vs ' + matchEvent.ball.fieldingTeam.name;
    let over = matchEvent.ball.over + '.' + matchEvent.ball.ball;

    // Determine whether to notify
    let ignore = true;
    let isBoundary = matchEvent.runs === 4 || matchEvent.runs === 6;
    let isWicket = (matchEvent.eventType !== "delivery"
        && matchEvent.eventType !== "noBall"
        && matchEvent.eventType !== "wide"
        && matchEvent.eventType !== "bye"
        && matchEvent.eventType !== "legBye");
    if(settings.all) ignore = false;
    else if(settings.wickets && isWicket) ignore = false;
    else if(settings.boundary && isBoundary) ignore = false;

    let options;
    if(settings) options = {
        tag: Date.now(),
        body: over + '-  ' + commentary,
        lang: 'en',
        dir: 'ltr'
    };

    return (
        <Notification
            ignore={!notify || ignore}
            timeout={5000}
            title={teams}
            options={options}
        />
    );
});

function describeEvent(e) {
    switch(e.eventType) {
        case "delivery":
            if(e.runs === 0) return 'Dot ball';
            if(e.runs === 1) return '1 run to ' + e.batsmen.striker.name;
            else return e.runs + ' runs to ' + e.batsmen.striker.name;
        case "noBall":
            if(e.runs === 1) return 'No ball and ' + e.runs + ' run';
            if(e.runs > 1) return 'No ball and ' + e.runs + ' runs';
            else return 'No ball';
        case "wide":
            if(e.runs > 0) return 'Wide and the batsmen have run ' + e.runs;
            else return 'Wide';
        case "bye":
            if(e.runs === 1) return '1 bye';
            return e.runs + ' byes';
        case "legBye":
            if(e.runs === 1) return '1 leg bye';
            return e.runs + ' leg byes';
        case "bowled":
            return e.batsmen.striker.name + ' has been bowled';
        case "timedOut":
            return e.batsman.name + ' was timed out';
        case "handledBall":
            return e.batsmen.striker.name + ' has been dismissed for handled ball';
        case "doubleHit":
            return e.batsmen.striker.name + ' has been dismissed for a double hit';
        case "hitWicket":
            return e.batsmen.striker.name + ' has hit his wickets';
        case "lbw":
            return e.batsmen.striker.name + ' out leg before wicket';
        case "obstruction":
            return e.batsman.name + ' has been dismissed for obstructing a fielder';
        case "caught":
            if(e.fielder) return e.batsmen.striker.name + ' has been caught by ' + e.fielder.name;
            else return e.batsmen.striker.name + ' has been caught out';
        case "runOut":
            if(e.fielder) return e.batsman.name + ' has been run out by ' + e.fielder.name + ' attempting to run the ' + ordinal(e.runs + 1);
            else return e.batsman.name + ' has been run out attempting to run the ' + ordinal(e.runs + 1);
        case "stumped":
            if(e.fielder) return e.batsmen.striker.name + ' has been stumped by ' + e.fielder.name;
            else return e.batsmen.striker.name + ' has been stumped';
        default: return '';
    }
};

MatchEventNotify.propTypes = {
    matchEvent: React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired
};

MatchEventNotify.defaultProps = {
    matchEvent: {
        eventType: 'delivery',
        ball: {
            fieldingTeam: { name: 'Fielding team' },
            battingTeam: { name: 'Batting team' },
            over: 0,
            ball: 0
        },
        runs: 0
    },
    settings: { all: false, wickets: false, boundary: false }
};

export default MatchEventNotify;
