import React, { Component } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client';
import './ViewMatch.scss';
import InningsStats from '../Shared/InningsStats/InningsStats';
import MatchResult from './components/MatchResult/MatchResult';
import MatchInfo from '../Shared/MatchInfo/MatchInfo';
import MatchEventList from './components/MatchEventList/MatchEventList';
import BattingCard from './components/BattingCard/BattingCard';
import BowlingCard from './components/BowlingCard/BowlingCard';
import InningsDropdown from './components/InningsDropdown/InningsDropdown';
import MatchEventNotify  from './components/MatchEventNotify/MatchEventNotify';
import MatchEventNotifySettings  from './components/MatchEventNotifySettings/MatchEventNotifySettings';
import Divider from 'material-ui/Divider';
import { Flex } from 'reflexbox';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import _ from 'underscore';

class ViewMatch extends Component {
    constructor() {
        super();
        this.state = { selectedInnings: 0, notify: false, notifySettings: [] };
        this.onMatchEvent = this.onMatchEvent.bind(this);
        this.handleInningsChange = this.handleInningsChange.bind(this);
        this.handleNotifySettingsChange = this.handleNotifySettingsChange.bind(this);
        this.getFilteredEvents = this.getFilteredEvents.bind(this);
    }

    handleNotifySettingsChange(event, values) {
        this.setState({ notifySettings: values });
    }

    handleInningsChange(event, key, value) {
        this.setState({ selectedInnings: value });
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

    onMatchEvent(incoming) {
        this.setState(incoming.score);
        this.setState({ notify: true, newEvent: incoming.event });
        this.setState({ notify: false });
    }

    componentDidMount() {
        this.getScore();
        this.subscribeToMatchEvents();
    }

    getFilteredEvents(selectedInnings) {
        var filtered = _(this.state.matchEvents).filter(function(e) {
            if(e.ball && e.ball.innings == selectedInnings + 1) return true;
            else return false;
        });
        return filtered;
    }

    render() {
        var i = 1, innings = [];
        var numberOfInnings = this.state.innings ? this.state.innings.length : 0;
        for(var i = 0; i < numberOfInnings; i++) {
            innings.push((<InningsStats  sm={12} md={6} {...this.state.innings[i]} key={i} innings={i} />));
        }
        var events = this.state.matchEvents ? this.getFilteredEvents(this.state.selectedInnings) : [];
        var batsmen = this.state.innings ? this.state.innings[this.state.selectedInnings].batting : [];
        var bowlers = this.state.innings ? this.state.innings[this.state.selectedInnings].bowling : [];

        return (
            <div>
                <MatchEventNotify
                    notify={this.state.notify}
                    newEvent={this.state.newEvent} 
                    settings={this.state.notifySettings} />
                <MatchEventNotifySettings onChange={this.handleNotifySettingsChange} />
                <MatchInfo {...this.state.matchInfo} />
                <Divider />
                <MatchResult {...this.state.result} />
                <Flex wrap col={12}>{innings}</Flex>
                <Divider />
                <Paper zDepth={2} className="cricd-viewMatch-statsTab">
                    <Tabs>
                        <Tab label="Ball by ball">
                            <InningsDropdown
                                selectedInnings={this.state.selectedInnings}
                                innings={this.state.innings}
                                onChange={this.handleInningsChange} />
                            <MatchEventList events={events} />
                        </Tab>
                        <Tab label="Batting">
                            <InningsDropdown
                                selectedInnings={this.state.selectedInnings}
                                innings={this.state.innings}
                                onChange={this.handleInningsChange} />
                            <BattingCard batsmen={batsmen} />
                        </Tab>
                        <Tab label="Bowling">
                            <InningsDropdown
                                selectedInnings={this.state.selectedInnings}
                                innings={this.state.innings}
                                onChange={this.handleInningsChange} />
                            <BowlingCard bowlers={bowlers} />
                        </Tab>
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

export default ViewMatch;
