import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';

@inject('teamStore')
@observer class TeamPicker extends Component {
    @observable filterText = '';
    @computed get filteredTeams() {
        let teams = this.props.teamStore.teams.toJS();
        let filtered = teams.filter((team) => { return team.name.toLowerCase().includes(this.filterText.toLowerCase()) });
        let numberOfItems = Math.min(5, filtered.length);
        filtered = filtered.sort((team) => { return team.name });
        return filtered.slice(0, numberOfItems);
    };

    constructor(props) {
        super(props);
        this.onTeamChanged = this.onTeamChanged.bind(this);
        this.onFilterChanged = this.onFilterChanged.bind(this);
    }

    @action onFilterChanged = function(object, filter) { this.filterText = filter; }
    @action onTeamChanged = function(chosenTeam, index) {
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
        let teamItems = this.filteredTeams.map((t, i) => {
            return <ListItem
                value={t.id}
                key={i}
                primaryText={t.name}
                leftAvatar={<Avatar>{t.name.substring(0, 2)}</Avatar>}
            />
        });
        if(this.filterText.length > 3) teamItems.push(<ListItem
                key={-1}
                value={-1}
                primaryText={'Add ' + this.filterText + '...'}
                leftAvatar={<Avatar>+</Avatar>}
            />)
        let SelectableList = makeSelectable(List);

        return (
            <div>
                <TextField
                    hintText={this.props.hint}
                    defaultValue={this.filterText}
                    onChange={this.onFilterChanged}
                />
                <SelectableList>
                    {teamItems}
                </SelectableList>
            </div>
        );
    }
}

TeamPicker.propTypes = {
    hintText: React.PropTypes.string,
    onTeamPicked: React.PropTypes.func.isRequired
}

TeamPicker.defaultProps = {
    hintText: 'Search for team...',
    onTeamPicked: () => { console.log('Team changed') }
}

export default TeamPicker;