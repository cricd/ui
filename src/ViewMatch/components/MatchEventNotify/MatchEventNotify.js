import React from 'react';
import Notification from 'react-web-notification';
import { describeEvent } from '../../../Shared/Helpers/describeEvent.js';

function MatchEventNotify(props) {
    var commentary = describeEvent(props.newEvent);
    var teams = props.newEvent.ball.battingTeam.name + ' vs ' + props.newEvent.ball.fieldingTeam.name;
    var over = props.newEvent.ball.over + '.' + props.newEvent.ball.ball;

    // Determine whether to notify
    var ignore = true;
    var isBoundary = props.newEvent.runs == 4 || props.newEvent.runs == 6;
    var isWicket = (props.newEvent.eventType != "delivery"
        && props.newEvent.eventType != "noBall"
        && props.newEvent.eventType != "wide"
        && props.newEvent.eventType != "bye"
        && props.newEvent.eventType != "legBye");
    if(props.settings.includes('all')) ignore = false;
    else if(props.settings.includes('wickets') && isWicket) ignore = false;
    else if(props.settings.includes('boundary') && isBoundary) ignore = false;

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
    newEvent: React.PropTypes.object.isRequired, 
    settings: React.PropTypes.array.isRequired
};

MatchEventNotify.defaultProps = {
    newEvent: {
        eventType: 'delivery',
        ball: {
            fieldingTeam: { name: 'Fielding team' },
            battingTeam: { name: 'Batting team' },
            over: 0,
            ball: 0
        },
        runs: 0
    },
    settings: []
};

export default MatchEventNotify;
