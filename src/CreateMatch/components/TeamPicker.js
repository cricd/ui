import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import moment from 'moment';

class TeamPicker extends Component {
    constructor() {
        super();
        this.state = { };
    }

    render() {
        return (
            <div>
                <AutoComplete
                    hintText={this.props.hint}
                    dataSource={this.props.teams}
                    filter={AutoComplete.fuzzyFilter}
                    maxSearchResults={5}
                />
            </div>
        );
    }
}

export default TeamPicker;
