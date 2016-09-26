import React, { Component } from 'react';
import './TeamSuggest.scss'
import AutoComplete from 'material-ui/AutoComplete';

const teams = [
    'Australia',
    'New Zealand',
    'England',
    'Sri Lanka',
    'Pakistan',
    'India',
    'South Africa'
]


class TeamSelect extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AutoComplete
                    hintText="Select your team"
                    dataSource={teams}
                    filter={AutoComplete.fuzzyFilter}
                    onUpdateInput={this.handleUpdateInput}
                    />
            </div>
        );
    }
}

export default TeamSelect;
