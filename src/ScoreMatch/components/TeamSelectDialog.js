import React, { Component } from 'react';
import _ from 'underscore';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class TeamSelectDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedTeam: {}
        }
    }

    render () {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.dialogClose}
                />,
        ];
        var menuItems = this.props.teams ? this.props.teams.map((team, key) => { return <MenuItem value={team} primaryText={team.name} key={key}/> }) : [];
        return (
            <div>
                <Dialog
                    title={this.props.title}
                    open={this.props.open}
                    modal={false}
                    actions={actions}
                    >
                    <SelectField value={this.props.selectedTeam} onChange={this.props.update}>
                        {menuItems}
                    </SelectField>
                </Dialog>
            </div>
        )
    }
}

TeamSelectDialog.propTypes = {
    teams: React.PropTypes.array.isRequired,
    update: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    selectedTeam: React.PropTypes.object,
    dialogClose: React.PropTypes.func.isRequired
}

export default TeamSelectDialog;
