import React, { Component } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client';
import './ViewMatch.scss';
import MatchEvent from './components/MatchEvent/MatchEvent';

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
            .then(score => { this.setState({ score: score }); })
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
        return (
            <div>
                <div>This is a score</div>
                <div>{JSON.stringify(this.state.score) }</div>
            </div>
        );
    }
}

export default ViewMatch;
