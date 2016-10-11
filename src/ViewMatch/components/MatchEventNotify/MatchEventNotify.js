import React, { Component } from 'react';
import Notification  from 'react-web-notification';
import { describeEvent } from '../../../Shared/Helpers/describeEvent.js';

class MatchEventNotify extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var commentary = this.props.newEvent ? describeEvent(this.props.newEvent) : '';
        var teams = this.props.newEvent ? this.props.newEvent.ball.battingTeam.name + ' vs ' + this.props.newEvent.ball.fieldingTeam.name : 'cricd';
        var over = this.props.newEvent ? this.props.newEvent.ball.over + '.' + this.props.newEvent.ball.ball : '';

        // Determine whether to notify
        var ignore = true;
        var isBoundary = this.props.newEvent ? this.props.newEvent.runs == 4 || this.props.newEvent.runs == 6 : false;
        var isWicket = this.props.newEvent ? (this.props.newEvent.eventType != "delivery" 
                                            && this.props.newEvent.eventType != "noBall"
                                            && this.props.newEvent.eventType != "wide"
                                            && this.props.newEvent.eventType != "bye"
                                            && this.props.newEvent.eventType != "legBye") : false;
        if(this.props.settings.includes('all')) ignore = false;
        else if(this.props.settings.includes('wickets') && isWicket) ignore = false;
        else if(this.props.settings.includes('boundary') && isBoundary) ignore = false;
        
        if(this.props.settings)
        var options = {
            tag: Date.now(),
            body: over + '-  ' + commentary,
            lang: 'en',
            dir: 'ltr'
        };

        return (
            <Notification
                ignore={!this.props.notify || ignore}
                timeout={5000}
                title={teams}
                options={options}
                />
        );
    }
}

export default MatchEventNotify;
