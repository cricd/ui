import React, { Component } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client';
import './ViewMatch.scss';
import MatchEvent from './components/MatchEvent/MatchEvent';
import Innings from './components/Innings/Innings';
import MatchResult from './components/MatchResult/MatchResult';

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
            .then(json => { this.setState({ innings: json.innings, matchEvents: json.matchEvents, result: json.result }); })
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

        var matchEvents; 
        if(this.state.matchEvents) matchEvents = this.state.matchEvents.map((e, i) => {
            return (<MatchEvent {...e} key={i} />);
        });

        return (
            <div>
                <div>This is a score</div>
                <MatchResult {...this.state.result}/>
                <div>{innings}</div>
                <div>{matchEvents}</div>
            </div>
        );
    }
}

export default ViewMatch;
