import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import ListItem from 'material-ui/List/ListItem';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import './TeamPicker.scss';

@inject('teamStore')
@observer class TeamPicker extends Component {

    constructor(props) {
        super(props);
        this.onTeamChanged = this.onTeamChanged.bind(this);
        this.onSelectedTeamTap = this.onSelectedTeamTap.bind(this);
    }

    onTeamChanged = function (chosenTeam, index) {
        if (index === -1) { // New team
            let newTeam = { name: chosenTeam };
            this.props.teamStore.createTeam(newTeam, (err, team) => {
                if (err) return console.error(err);
                this.props.onTeamPicked(team);
            })
        }
        else this.props.onTeamPicked(chosenTeam);
    }
    
    onSelectedTeamTap = function () { this.props.onTeamPicked(null); }

    render() {
        if (this.props.selectedTeam) return (
            <div className="cricd-teamPicker-selectedTeam">
                <ListItem
                    onTouchTap={this.onSelectedTeamTap}
                    rightIcon={<ClearIcon />}>
                    {this.props.selectedTeam.name}
                </ListItem>
                <Divider />
            </div>
        );

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
    onTeamPicked: React.PropTypes.func.isRequired,
    selectedTeam: React.PropTypes.object
}

TeamPicker.defaultProps = {
    hintText: 'Search for team',
    onTeamPicked: () => { console.log('Team changed') }
}

export default TeamPicker;