import React, { Component } from 'react';
import './CreateMatch.scss';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import AutoComplete from 'material-ui/AutoComplete';
import TeamPicker from './components/TeamPicker';
import moment from 'moment';

class CreateMatch extends Component {
    constructor() {
        super();
        this.state = { stepIndex: 0, teams: [] };
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
    }

    handleTeamChange(){
    }

    handleNext() {
        const {stepIndex} = this.state;
        if(stepIndex < 3) {
            this.setState({ stepIndex: stepIndex + 1 });
        }
    };

    handlePrev() {
        const {stepIndex} = this.state;
        if(stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

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
        var today = new Date();
        today.setHours(0, 0, 0);

        return (
            <Stepper
                activeStep={this.state.stepIndex}
                linear={false}
                orientation="vertical">
                <Step>
                    <StepButton onTouchTap={() => this.setState({ stepIndex: 0 })}>
                        Who is playing at home?
                    </StepButton>
                    <StepContent>
                        <TeamPicker hint="Home team" teams={this.state.teams} />
                        <RaisedButton label="Next" primary={true} onTouchTap={this.handleNext}></RaisedButton>
                    </StepContent>
                </Step>
                <Step>
                    <StepButton onTouchTap={() => this.setState({ stepIndex: 1 })}>
                        Who is playing away?
                    </StepButton>
                    <StepContent>
                        <TeamPicker hint="Away team" teams={this.state.teams} />
                        <FlatButton label="Back" style={{ marginRight: 12 }} onTouchTap={this.handlePrev}></FlatButton>
                        <RaisedButton label="Next" primary={true} onTouchTap={this.handleNext}></RaisedButton>
                    </StepContent>
                </Step>
                <Step>
                    <StepButton onTouchTap={() => this.setState({ stepIndex: 2 })}>
                        What type of match?
                    </StepButton>
                    <StepContent>
                        <RadioButtonGroup name="type" defaultSelected="Test">
                            <RadioButton
                                value="Test"
                                label="Test match"
                                style= {{ margin: 10 }}
                            />
                            <RadioButton
                                value="50"
                                label="50 Overs"
                                style= {{ margin: 10 }}
                            />
                            <RadioButton
                                value="20"
                                label="Twenty 20"
                                style= {{ margin: 10 }}
                            />
                        </RadioButtonGroup>
                        <FlatButton label="Back" style={{ marginRight: 12 }} onTouchTap={this.handlePrev}></FlatButton>
                        <RaisedButton label="Next" primary={true} onTouchTap={this.handleNext}></RaisedButton>
                    </StepContent>
                </Step>
                <Step>
                    <StepButton onTouchTap={() => this.setState({ stepIndex: 3 })}>
                        When are they playing?
                    </StepButton>
                    <StepContent>
                        <DatePicker hintText="Start of match" defaultDate={today} formatDate={this.formatDate} />
                        <FlatButton label="Back" style={{ marginRight: 12 }} onTouchTap={this.handlePrev}></FlatButton>
                        <RaisedButton label="Create" primary={true}></RaisedButton>
                    </StepContent>
                </Step>
            </Stepper>
        );
    }
}

export default CreateMatch;
