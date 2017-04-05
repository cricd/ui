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
import { action, autorun, observable } from 'mobx';
import _ from 'underscore';

@inject('matchStore', 'uiStateStore')
@observer class ViewMatch extends Component {
    @observable loadingMatch = true;

    componentDidMount() {
        this.props.matchStore.getMatch(
            this.props.params.matchId,
            action((err, match) => {
                if (err) return this.props.uiStateStore.displayError(err);
                this.props.uiStateStore.changeSelectedMatch(match);
                this.loadingMatch = false;
            }));
    }

    render() {
        if (this.loadingMatch) return <CircularProgress size={100} thickness={10} className="cricd-viewMatch-spinner" />

        let innings = []; // Innings controls
        let batsmen = []; // Batsmen during selected innings
        let bowlers = []; // Bowlers during selected innings
        let filteredEvents = []; // Match Events filtered by selected innings

        // Create innings controls
        this.props.uiStateStore.selectedMatch.innings.map((inning, index) => {
            return innings.push((<InningsStats sm={12} md={6} {...inning} key={index} innings={index} loading={this.props.uiStateStore.selectedMatch.loadingScore} />));
        });

        // Extract batsmen and bowlers
        if (!this.props.uiStateStore.selectedMatch.loadingScore) {
            batsmen = this.props.uiStateStore.selectedMatch.innings[this.props.uiStateStore.selectedInnings - 1].batting;
            bowlers = this.props.uiStateStore.selectedMatch.innings[this.props.uiStateStore.selectedInnings - 1].bowling;

            filteredEvents = _(this.props.uiStateStore.selectedMatch.matchEvents).filter((e) => {
                return e.ball.innings === this.props.uiStateStore.selectedInnings;
            });
        }

        return (
            <div>
                <MatchEventNotify
                    notify={this.props.uiStateStore.notify}
                    matchEvent={this.props.uiStateStore.notificationMatchEvent}
                    settings={this.props.uiStateStore.notifySettings} />
                <MatchEventNotifySettings settings={this.props.uiStateStore.notificationSettings} />
                <MatchInfo {...this.props.uiStateStore.selectedMatch} loading={this.loadingMatch} />
                <Divider />
                <MatchResult {...this.props.uiStateStore.selectedMatch.result} />
                <Flex wrap col={12}>{innings}</Flex>
                <div>
                    <Divider />
                    <Paper zDepth={2} className="cricd-viewMatch-statsTab">
                        <Tabs>
                            <Tab label="Ball by ball">
                                {this.props.uiStateStore.selectedMatch.loadingScore && <CircularProgress size={100} thickness={10} className="cricd-viewMatch-spinner" />}
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
            </div>
        );
    }
}

export default ViewMatch;
