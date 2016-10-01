import React, { Component } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client';
import './ViewMatch.scss';
import MatchEvent from './components/MatchEvent/MatchEvent';
import Innings from './components/Innings/Innings';
import MatchResult from './components/MatchResult/MatchResult';
import MatchInfo from './components/MatchInfo/MatchInfo';
import MatchEvents from './components/MatchEvents/MatchEvents';
import Divider from 'material-ui/Divider';
import { Flex } from 'reflexbox';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

class ViewMatch extends Component {
    constructor() {
        super();
        this.state = {};
        this.onMatchEvent = this.onMatchEvent.bind(this);
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
        this.setState(newScore.score);
    }

    componentDidMount() {
        this.getScore();
        this.subscribeToMatchEvents();
    }

    render() {
        var i = 1, innings = [];
        for(var i = 0; i < this.state.length; i++) {
            innings.push((<Innings  sm={12} md={6} {...this.state.innings[i]} key={i} innings={i} />));
        }

        return (
            <div>
                <MatchInfo {...this.state.matchInfo} />
                <Divider />
                <MatchResult {...this.state.result} />
                <Flex wrap col={12}>{innings}</Flex>
                <Divider />
                <Paper zDepth={2}>
                    <Tabs>
                        <Tab label="Ball by ball">
                            <MatchEvents events={this.state.matchEvents} />
                        </Tab>
                        <Tab label="Batsmen">
                        </Tab>
                        <Tab label="Bowlers">
                        </Tab>
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

export default ViewMatch;
