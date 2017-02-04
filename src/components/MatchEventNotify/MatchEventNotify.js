import React from 'react';
import Notification from 'react-web-notification';
import { describeEvent } from '../../Shared/Helpers/describeEvent.js';

function MatchEventNotify(props) {
    var commentary = describeEvent(props.matchEvent);
    var teams = props.matchEvent.ball.battingTeam.name + ' vs ' + props.matchEvent.ball.fieldingTeam.name;
    var over = props.matchEvent.ball.over + '.' + props.matchEvent.ball.ball;

    // Determine whether to notify
    var ignore = true;
    var isBoundary = props.matchEvent.runs == 4 || props.matchEvent.runs == 6;
    var isWicket = (props.matchEvent.eventType != "delivery"
        && props.matchEvent.eventType != "noBall"
        && props.matchEvent.eventType != "wide"
        && props.matchEvent.eventType != "bye"
        && props.matchEvent.eventType != "legBye");
    if(props.settings.all) ignore = false;
    else if(props.settings.wickets && isWicket) ignore = false;
    else if(props.settings.boundary && isBoundary) ignore = false;

    if(props.settings)
        var options = {
            tag: Date.now(),
            body: over + '-  ' + commentary,
            lang: 'en',
            dir: 'ltr'
        };

    return (
        <Notification
            ignore={!props.notify || ignore}
            timeout={5000}
            title={teams}
            options={options}
            />
    );
}

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
