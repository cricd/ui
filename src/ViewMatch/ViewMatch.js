import React, { Component } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client';
import './ViewMatch.scss';
import MatchEvent from './components/MatchEvent/MatchEvent';
import Innings from './components/Innings/Innings';
import MatchResult from './components/MatchResult/MatchResult';
import MatchInfo from './components/MatchInfo/MatchInfo';
import MatchEvents from './components/MatchEvents/MatchEvents';
import { Divider } from 'rebass';

class ViewMatch extends Component {
    constructor() {
        super();
        this.state = {};
    }

    getScore() {
        var matchId = this.props.params.matchId;
        var scoreProcessorUrl = 'http://' + __SCOREPROCESSOR_URL__;
        fetch(scoreProcessorUrl + '?match=' + matchId)
            .then(response => { return response.json(); })
            .then(json => { this.setState(json) })
            .catch(error => { console.log(error); });
    }

    subscribeToMatchEvents() {
        var matchId = this.props.params.matchId;
        var changePublisherUrl = 'http://' + __CHANGEPUBLISHER_URL__;
        var socket = io.connect(changePublisherUrl + '?match=' + matchId);
        socket.on('score-change', this.onMatchEvent);
    }

    onMatchEvent(matchEvent) {
        if(!this.state.matchEvents) this.setState({ matchEvents: [] });
        this.setState({ matchEvents: matchEvents.push(matchEvent) });
    }

    componentDidMount() {
        this.getScore();
        this.subscribeToMatchEvents();
    }

    render() {
        var i = 1, innings = [];
        while(this.state.innings && this.state.innings[i]) { 
            innings.push((<Innings {...this.state.innings[i]} key={i} innings={i} />)); 
            i++;
        }
        
        return (
            <div>
                <MatchInfo {...this.state.matchInfo} />
                <Divider />
                <MatchResult {...this.state.result} />
                <div>{innings}</div>
                <Divider />
                <MatchEvents events={this.state.matchEvents} />
            </div>
        );
    }
}

export default ViewMatch;
