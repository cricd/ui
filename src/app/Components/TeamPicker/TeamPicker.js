import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import moment from 'moment';
import { inject, observer } from 'mobx-react';

@inject('teamStore')
@observer class TeamPicker extends Component {
    
    constructor(props) {
        super(props);
        this.onTeamChanged = this.onTeamChanged.bind(this);
    }

    onTeamChanged = function(chosenTeam, index) {
        if(index === -1) { // New team
            let newTeam = { name: chosenTeam };
            this.props.teamStore.createTeam(newTeam, (err, team) => {
                if(err) return console.error(err);
                this.props.onTeamPicked(team);
            })
        }
        else this.props.onTeamPicked(chosenTeam);
    }

    render() {
        let teams = this.props.teamStore.teams.toJS(); // Autocomplete can recognise array type
        return (
            <div>
                <AutoComplete
                    hintText={this.props.hint}
                    dataSource={teams}
                    dataSourceConfig={{ text: 'name', value: 'id' }}
                    onNewRequest={this.onTeamChanged}
                    filter={AutoComplete.fuzzyFilter}
                    maxSearchResults={5}
                />
            </div>
        );
    }
}

TeamPicker.propTypes = {
    hintText: React.PropTypes.string,
    onTeamPicked: React.PropTypes.func.isRequired
}

TeamPicker.defaultProps = {
    hintText: 'Search for team',
    onTeamPicked: () => { console.log('Team changed') }
}

export default TeamPicker;