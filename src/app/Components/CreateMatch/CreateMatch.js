import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import TeamPicker from '../TeamPicker/TeamPicker';
import MatchTypePicker from '../MatchTypePicker/MatchTypePicker';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import Match from '../../Objects/Match';

@inject('teamStore', 'uiStateStore', 'matchStore')
@observer class CreateMatch extends Component {
    @observable stepIndex = 0;
    @observable newMatch = new Match({
        homeTeam: null,
        awayTeam: null, 
        startDate: new Date(),
        numberOfInnings: 1,
        limitedOvers: 20
    }, this.props.matchStore.matchService);

    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.createMatch = this.createMatch.bind(this);
        this.handleHomeTeamChange = this.handleHomeTeamChange.bind(this);
        this.handleAwayTeamChange = this.handleAwayTeamChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    createMatch(){
        if(!this.newMatch.homeTeam) {
            this.props.uiStateStore.displayError('Please select a home team');
            return this.setStepIndex(0);
        }
        else if(!this.newMatch.awayTeam) {
            this.props.uiStateStore.displayError('Please select an away team');
            return this.setStepIndex(1);
        } 

        this.props.matchStore.createMatch(this.newMatch, (err, match) => {
            if(err) return this.props.uiStateStore.displayError(err);
            console.info('Match created');
            console.debug(match);
            browserHistory.push('/score/' + match.id);
        })
    }

    @action handleHomeTeamChange(team) {
        this.newMatch.homeTeam = team;
        if(team) this.handleNext();
    }

    @action handleAwayTeamChange(team) {
        this.newMatch.awayTeam = team;
        if(team) this.handleNext();
    }

    @action handleNext() { if(this.stepIndex < 3) this.stepIndex += 1; }
    @action handlePrev() { if(this.stepIndex > 0) this.stepIndex -= 1; }
    @action setStepIndex(index) { this.stepIndex = index; }
    @action handleDateChange(e, date) { this.newMatch.startDate = date; }

    formatDate(date) {
        return moment(date).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'DD/MM/YYYY'
        });
    };

    render() {
        return (
            <Stepper
                activeStep={this.stepIndex}
                linear={false}
                orientation="vertical">
                <Step>
                    <StepButton onTouchTap={action(() => { this.stepIndex = 0; })}>
                        Who is playing at home?
                    </StepButton>
                    <StepContent>
                        <TeamPicker
                            hint="Home team"
                            selectedTeam={this.newMatch.homeTeam}
                            onTeamPicked={this.handleHomeTeamChange}/>
                        <RaisedButton label="Next" primary={true} onTouchTap={this.handleNext}></RaisedButton>
                    </StepContent>
                </Step>
                <Step>
                    <StepButton onTouchTap={action(() => { this.stepIndex = 1; })}>
                        Who is playing away?
                    </StepButton>
                    <StepContent>
                        <TeamPicker 
                            hint="Away team" 
                            selectedTeam={this.newMatch.awayTeam}
                            onTeamPicked={this.handleAwayTeamChange} />
                        <FlatButton label="Back" style={{ marginRight: 12 }} onTouchTap={this.handlePrev}></FlatButton>
                        <RaisedButton label="Next" primary={true} onTouchTap={this.handleNext}></RaisedButton>
                    </StepContent>
                </Step>
                <Step>
                    <StepButton onTouchTap={action(() => { this.stepIndex = 2; })}>
                        What type of match?
                    </StepButton>
                    <StepContent>
                        <MatchTypePicker match={this.newMatch} />
                        <FlatButton label="Back" style={{ marginRight: 12 }} onTouchTap={this.handlePrev}></FlatButton>
                        <RaisedButton label="Next" primary={true} onTouchTap={this.handleNext}></RaisedButton>
                    </StepContent>
                </Step>
                <Step>
                    <StepButton onTouchTap={action(() => { this.stepIndex = 3; })}>
                        When are they playing?
                    </StepButton>
                    <StepContent>
                        <DatePicker hintText="Start of match" defaultDate={this.newMatch.startDate} formatDate={this.formatDate} onChange={this.handleDateChange} />
                        <FlatButton label="Back" style={{ marginRight: 12 }} onTouchTap={this.handlePrev}></FlatButton>
                        <RaisedButton label="Create" primary={true} onTouchTap={this.createMatch}></RaisedButton>
                    </StepContent>
                </Step>
            </Stepper>
        );
    }
}

export default CreateMatch;