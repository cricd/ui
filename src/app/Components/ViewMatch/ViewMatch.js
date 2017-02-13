import React, { Component } from 'react';
import { Link } from 'react-router';
import './ViewMatch.scss';
import InningsStats from '../InningsStats/InningsStats';
import MatchResult from '../MatchResult/MatchResult';
import MatchInfo from '../MatchInfo/MatchInfo';
import MatchEventList from '../MatchEventList/MatchEventList';
import BattingCard from '../BattingCard/BattingCard';
import BowlingCard from '../BowlingCard/BowlingCard';
import InningsDropdown from '../InningsDropdown/InningsDropdown';
import MatchEventNotify from '../MatchEventNotify/MatchEventNotify';
import MatchEventNotifySettings from '../MatchEventNotifySettings/MatchEventNotifySettings';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import { action, autorun } from 'mobx';
import _ from 'underscore';

@inject('matchStore', 'uiStateStore')
@observer class ViewMatch extends Component {

    componentDidMount() {
        this.props.matchStore.getOrFollowMatch(
            this.props.params.matchId,
            (err, match) => {
                if(err) return this.props.uiStateStore.displayError(err);
                this.changeSelectedMatch(match);
            });
    }

    notify = autorun(() => {
        if(this.props.uiStateStore.selectedMatch) this.props.uiStateStore.notificationMatchEvent = this.props.uiStateStore.selectedMatch.latestMatchEvent;
        this.props.uiStateStore.notify = true;
    });

    @action changeSelectedMatch(match) { this.props.uiStateStore.selectedMatch = match; }

    render() {
        if(!this.props.uiStateStore.selectedMatch) { // If loading, show spinner
            return <div><CircularProgress size={100} thickness={10} className="cricd-viewMatch-spinner" /></div>
        }

        let innings = []; // Innings controls
        let batsmen = []; // Batsmen during selected innings
        let bowlers = []; // Bowlers during selected innings
        if(this.props.uiStateStore.selectedMatch.innings.length > 0) {
            // Create innings controls
            this.props.uiStateStore.selectedMatch.innings.map((inning, index) => {
                return innings.push((<InningsStats sm={12} md={6} {...inning} key={index} innings={index} />));
            });

            // Extract batsmen and bowlers
            batsmen = this.props.uiStateStore.selectedMatch.innings[this.props.uiStateStore.selectedInnings - 1].batting;
            bowlers = this.props.uiStateStore.selectedMatch.innings[this.props.uiStateStore.selectedInnings - 1].bowling;
        }

        let filteredEvents = []; // Match Events filtered by selected innings
        if(this.props.uiStateStore.selectedMatch.matchEvents) filteredEvents = _(this.props.uiStateStore.selectedMatch.matchEvents).filter((e) => {
            return e.ball.innings === this.props.uiStateStore.selectedInnings;
        });

        return (
            <div>
                <MatchEventNotify
                    notify={this.props.uiStateStore.notify}
                    matchEvent={this.props.uiStateStore.notificationMatchEvent}
                    settings={this.props.uiStateStore.notifySettings} />
                <MatchEventNotifySettings settings={this.props.uiStateStore.notificationSettings} />
                <MatchInfo {...this.props.uiStateStore.selectedMatch} />
                <Divider />
                {this.props.uiStateStore.selectedMatch.result && <MatchResult {...this.props.uiStateStore.selectedMatch.result} />}
                <Flex wrap col={12}>{innings}</Flex>
                {this.props.uiStateStore.selectedMatch.matchEvents && this.props.uiStateStore.selectedMatch.matchEvents.length > 0 &&
                    <div>
                        <Divider />
                        <Paper zDepth={2} className="cricd-viewMatch-statsTab">
                            <Tabs>
                                <Tab label="Ball by ball">
                                    <InningsDropdown
                                        selectedInnings={this.props.uiStateStore.selectedInnings}
                                        innings={this.props.uiStateStore.selectedMatch.innings} />
                                    <MatchEventList events={filteredEvents} />
                                </Tab>
                                <Tab label="Batting">
                                    <InningsDropdown
                                        selectedInnings={this.props.uiStateStore.selectedInnings}
                                        innings={this.props.uiStateStore.selectedMatch.innings} />
                                    <BattingCard batsmen={batsmen} />
                                </Tab>
                                <Tab label="Bowling">
                                    <InningsDropdown
                                        selectedInnings={this.props.uiStateStore.selectedInnings}
                                        innings={this.props.uiStateStore.selectedMatch.innings} />
                                    <BowlingCard bowlers={bowlers} />
                                </Tab>
                            </Tabs>
                        </Paper>
                    </div>
                }
            </div>
        );
    }
}

export default ViewMatch;
