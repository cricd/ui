import React, { Component} from 'react';
import { observer } from 'mobx-react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

@observer class MatchTypePicker extends Component {
    
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e, value) {
        if(value === "Test") this.props.match.setMatchType(2, null);
        else if(value === "50") this.props.match.setMatchType(1, 50);
        else if(value === "20") this.props.match.setMatchType(1, 20);
    }

    render() {
        let matchType = "Test";
        if(this.props.match.numberOfOvers === 50) matchType = "50";
        else if(this.props.match.numberOfOvers === 20) matchType = "20";

        return (
            <RadioButtonGroup name="type" defaultSelected={matchType} onChange={this.onChange}>
                <RadioButton
                    value="Test"
                    label="Test match"
                    style={{ margin: 10 }}
                />
                <RadioButton
                    value="50"
                    label="50 Overs"
                    style={{ margin: 10 }}
                />
                <RadioButton
                    value="20"
                    label="Twenty 20"
                    style={{ margin: 10 }}
                />
            </RadioButtonGroup>
        )
    }
}

MatchTypePicker.propTypes = {
    match: React.PropTypes.object.isRequired
}

MatchTypePicker.defaultProps = {
    match: { numberOfOvers: 20, numberOfInnings: 1 }
}

export default MatchTypePicker;