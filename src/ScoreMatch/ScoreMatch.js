import React, { Component } from 'react';
import './ScoreMatch.scss';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import MatchInfo from '../Shared/MatchInfo/MatchInfo';
import InningsStats from '../Shared/InningsStats/InningsStats';
import TeamSelectDialog from './components/TeamSelectDialog';
import io from 'socket.io-client';
import _ from 'underscore';

class ScoreMatch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            battingTeam: {},
            bowlingTeam: {},
            currentInnings: 1,
            striker: null,
            nonStriker: null,
            bowler: null,
            dialogOpen: false,
            selectedTeam: {},
            batsmen: [],
            bowlers: [],
            ballType: "scored",
            runsScored: 0,
            howDismissed: "",
            runType: "runs",
            isDismissal: false,
            dismissalType: "caught",
        }

        this.getBatsmen = this.getBatsmen.bind(this);
        this.getBowlers = this.getBowlers.bind(this);
        this.handleBattingTeamChange = this.handleBattingTeamChange.bind(this);
        this.handleStrikerChange = this.handleStrikerChange.bind(this);
        this.handleBallTypeChange = this.handleBallTypeChange.bind(this);
        this.handleBattingTeamDialogClose = this.handleBattingTeamDialogClose.bind(this);
        this.handleRunsScored = this.handleRunsScored.bind(this);
        this.handleRunType = this.handleRunType.bind(this);
    }

    getTeams() {
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
    getPlayers() {
        this.getBatsmen();
        this.getBowlers();
    }

    getBatsmen() {
        console.log("calling getBatsmen")
        var matchId = this.props.params.matchId
        var entitiesUrl = 'http://' + __ENTITYSTORE_URL__
        var battingTeamId = _.isEmpty(this.state.battingTeam) ? 0 : this.state.battingTeam.id
        if (battingTeamId != 0) {
            fetch(entitiesUrl + '/teams/' + battingTeamId + "/players/")
                .then(response => { return response.json(); })
                .then(json => {
                    console.log(json)
                    this.setState({
                        batsmen: json,
                        striker: json[0]
                    })
                })
                .catch(error => { console.log(error); });
        }
    }

    getBowlers() {
        console.log("calling getBowlers")
        var matchId = this.props.params.matchId
        var entitiesUrl = 'http://' + __ENTITYSTORE_URL__
        var bowlingTeamId = _.isEmpty(this.state.bowlingTeam) ? 0 : this.state.bowlingTeam.id
        if (bowlingTeamId != 0) {
            fetch(entitiesUrl + '/teams/' + bowlingTeamId + "/players/")
                .then(response => { return response.json(); })
                .then(json => {
                    console.log(json)
                    this.setState({
                        bowlers: json
                    })
                })
                .catch(error => { console.log(error); });
        }

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
        //this.getBatsmen();
        //        this.getScore();
        //      this.subscribeToMatchEvents();
    }

    handleBattingTeamChange(event, index, value) {
        this.setState({
            battingTeam: value,
            bowlingTeam: _(this.state.teams).without(value)[0],
            selectedTeam: value
        }, this.getPlayers)
    }

    handleBattingTeamDialogClose() {
        this.setState({
            dialogOpen: false
        })
    }

    handleStrikerChange(event, index, value) {
        this.setState({
            striker: value
        })
    }

    handleBowlerChange(event, index, value) {
        this.setState({
            bowler: value
        })
    }

    handleBallTypeChange(event, index, value) {
        this.setState({
            ballType: value,
            isDismissal: (value === "was dismissed")
        })
    }

    handleRunsScored(event, index, value) {
        this.setState({
            runsScored: value
        })
    }

    handleRunType(event, index, value) {
        this.setState({
            runType: value
        })
    }
    handleDismissalType(event, index, value) {
        this.setState({
            dismissalType: value
        })
    }


    render() {
        // [Batsman] scored [0-9] [runs/leg byes/wides] off the bowling of [Bowler]
        // [Batsman] was dismissed by [run out/bowled/lbw...]  [by fielder] off the bowling of [Bowler]
        // var innings;
        // if (this.state.innings) {
        //     var lastInnings  = this.state.innings.length
        //     innings =  <InningsStats  sm={12} md={6} {...this.state.innings[lastInnings - 1]} key={lastInnings} innings={lastInnings} />;
        // }


        const styles = {
            customWidth: {
             width: 50,
            },
        };

        const ballType = ["scored", "was dismissed"]
        var ballTypeItems = ballType.map((ballType, key) => { return <MenuItem value={ballType} primaryText = {ballType} key={key} /> });

        const runsScored = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        var runsScoredItems = runsScored.map((runs, key) => { return <MenuItem value={runs} primaryText = {runs} key={key} /> });

        const runType = ["runs", "byes", "leg byes", "no balls"]
        var runTypeItems = runType.map((runType, key) => { return <MenuItem value={runType} primaryText = {runType} key={key} /> });

        const dismissalType = ["caught", "bowled", "LBW", "caught and bowled", "stumped"]
        var dismissalTypeItems = dismissalType.map((dismissalType, key) => { return <MenuItem value={dismissalType} primaryText = {dismissalType} key={key} /> });

        var batsmanItems = _.isEmpty(this.state.batsmen) ? [] : this.state.batsmen.map((batsman, key) => { return <MenuItem value={batsman} primaryText={batsman.name} key={key} />})

        var bowlerItems = _.isEmpty(this.state.bowlers) ?  [] : this.state.bowlers.map((bowler, key) => { return <MenuItem value={bowler} primaryText={bowler.name} key={key}/> }) ;

        return (
            <div>
                <TeamSelectDialog
                    title="Select batting team"
                    open={this.state.dialogOpen}
                    update={this.handleBattingTeamChange}
                    teams={this.state.teams}
                    selectedTeam={this.state.selectedTeam}
                    dialogClose={this.handleBattingTeamDialogClose}
                    />
                <MatchInfo  {...this.state.matchInfo} />
                <Divider/>
                <div className="cricd-scoreMatch-scoreSentence">
                    <SelectField value={this.state.striker} onChange={this.handleStrikerChange} hintText={"Batsman"} className="cricd-scoreMatch-scoreSentenceItem">
                        {batsmanItems}
                    </SelectField>
                    <SelectField value={this.state.ballType} onChange={this.handleBallTypeChange} className="cricd-scoreMatch-scoreSentenceItem" >
                        {ballTypeItems}
                    </SelectField>
                    {!this.state.isDismissal ?
                    <SelectField  value={this.state.runsScored} onChange={this.handleRunsScored} style={styles.customWidth} className="cricd-scoreMatch-scoreSentenceItem">
                        {runsScoredItems}
                    </SelectField> : null }
                    {!this.state.isDismissal ?
                    <SelectField value={this.state.runType} onChange={this.handleRunType} className="cricd-scoreMatch-scoreSentenceItem" >
                        {runTypeItems}
                    </SelectField> : null }
                    { this.state.isDismissal ? <p className="cricd-scoreMatch-scoreSentenceItem"> by being </p> : null }
                    { this.state.isDismissal ? <SelectField value={this.state.dismissalType} onChange={this.handleDismissalType} className="cricd-scoreMatch-scoreSentenceItem" >
                        {dismissalTypeItems}
                    </SelectField> : null }
                    <p className="cricd-scoreMatch-scoreSentenceItem"> off the bowling of</p>
                    <SelectField value={this.state.bowler} onChange={this.handleBowlerChange} hintText={"Bowler"} className="cricd-scoreMatch-scoreSentenceItem" >
                        {bowlerItems}
                    </SelectField>
                </div>

            </div>
        );
    }
}

export default ScoreMatch;
