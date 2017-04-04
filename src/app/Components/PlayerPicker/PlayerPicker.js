import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

class PlayerPicker extends Component {

    constructor(props) {
        super(props);
    }

    handleChange(event, index, value) { this.props.onChange(value); }

    render() {
        let players = [];
        if(this.props.suggestedPlayers.length > 0) { 
            players.push(<Subheader>Suggested players</Subheader>)
            players.push(this.props.suggestedPlayers.map((p, i) => { return <MenuItem value={p} primaryText={p.name}/> }));
            players.push(<Subheader>All players</Subheader>)
        }
        players.push(this.props.players.map((p, i) => { return <MenuItem value={p} primaryText={p.name}/> }));

        return (
            <div>
                <SelectField
                    floatingLabelText={this.props.label}
                    floatingLabelFixed={true}
                    value={this.props.selectedPlayer}
                    onChange={this.handleChange} >
                    {players}
                </SelectField>
            </div>
        );
    }
}

PlayerPicker.propTypes = {
    label: React.PropTypes.string,
    players: React.PropTypes.array.isRequired, 
    suggestedPlayers: React.PropTypes.array,
    selectedPlayer: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired
}

PlayerPicker.defaultProps = {
    label: 'Player',
    players: [],
    suggestedPlayers: [],
    onChange: () => { console.log('Player picked'); }
}

export default PlayerPicker;