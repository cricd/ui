import React, { Component } from 'react';
import './ScoreMatch.scss';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MatchInfo from '../Shared/MatchInfo/MatchInfo';
import InningsStats from '../Shared/InningsStats/InningsStats';
import io from 'socket.io-client';

class ScoreMatch extends Component {
    constructor(props) {
        super(props)
        //Get the match ID
        this.state = {
            teams: [],
            battingTeam: {},
            bowlingTeam: {},
            currentInnings: 1,
            striker: {},
            nonStriker: {},
            bowler: {},
            dialogOpen: false,
            selectedTeam: 0,
    }
    this.handleBattingTeamChange = this.handleBattingTeamChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleDialogOpen() {
        this.setState({ dialogOpen: true });
    };

    handleDialogClose() {
        this.setState({ dialogOpen: false });
    };


    getTeams() {
        console.log(this.props)
        var matchId = this.props.params.matchId
        var entitiesUrl = 'http://' + __ENTITYSTORE_URL__
        fetch(entitiesUrl + '/matches/' + matchId)
            .then(response => { return response.json(); })
            .then(json => {
                this.setState({
                    teams: [json.awayTeam, json.homeTeam],
                    dialogOpen: true
                })
                console.log(json)
            })
            .catch(error => { console.log(error); });
    }

    getBatsmen() {
        //  team/id/players/
    }

    getScore() {
        var matchId = this.props.params.matchId;
        var scoreProcessorUrl = 'http://' + __SCOREPROCESSOR_URL__;
        fetch(scoreProcessorUrl + '?match=' + matchId)
            .then(response => { return response.json(); })
            .then(json => {
                console.log(json)
                this.setState(json)
            })
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
        this.getTeams();
        //        this.getScore();
        //      this.subscribeToMatchEvents();
    }

        handleBattingTeamChange(event, index, value) {
            this.setState({selectedTeam: value});
        }

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleDialogClose}
                />,
        ];
        var menuItems = this.state.teams ? this.state.teams.map((team, key) => {return  <MenuItem value={team} primaryText={team.name} key={key}/>}) : [];

        // [Batsman] scored [0-9] [runs/leg byes/wides] off the bowling of [Bowler]
        // [Batsman] was dismissed by [run out/bowled/lbw...]  [by fielder] off the bowling of [Bowler]
        // var innings;
        // if (this.state.innings) {
        //     var lastInnings  = this.state.innings.length
        //     innings =  <InningsStats  sm={12} md={6} {...this.state.innings[lastInnings - 1]} key={lastInnings} innings={lastInnings} />;
        // }
        return (
            <div>
                <Dialog
                    title="Select batting team"
                    open={this.state.dialogOpen}
                    actions={actions}
                    modal={false}
                    >
                    <SelectField value={this.state.selectedTeam} onChange={this.handleBattingTeamChange}>
                        {menuItems}
                    </SelectField>
                </Dialog>
                <MatchInfo  {...this.state.matchInfo} />
                <Divider/>
                <h3> Runs </h3>
                <div className="cricd-scoreMatch-runsContainer">
                </div>
                <div className="cricd-scoreMatch-runsContainer">
                </div>
                <div>
                    <h3> Dismissals </h3>
                    <div className="cricd-scoreMatch-runsContainer">
                    </div>
                </div>
            </div>
        );
    }
}

export default ScoreMatch;
