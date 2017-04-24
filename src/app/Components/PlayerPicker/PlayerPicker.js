import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import _ from 'underscore';
import { inject, observer } from 'mobx-react';

@observer class PlayerPicker extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) { 
        let selected = _(this.props.players).find(p => { return p.id === value; });
        this.props.onChange(selected); 
    }

    render() {
        let menuItems = [];

        // Add suggested players
        if(this.props.suggestedPlayers.length > 0) {
            menuItems.push(<Subheader key='others'>Suggested players</Subheader>);
            menuItems.push(this.props.suggestedPlayers.map(p => { return <MenuItem value={p.id} primaryText={p.name} key={p.id} /> }));
        }

        // Remove suggested players from all players list to avoid key clashes
        let allPlayers = _(this.props.players).pluck('id');
        let suggestedPlayers = _(this.props.suggestedPlayers).pluck('id');
        let otherPlayers = _(allPlayers).difference(suggestedPlayers);
        otherPlayers = otherPlayers.map(id => { return this.props.players.find(p => { return p.id === id }) });

        if(this.props.suggestedPlayers.length > 0) menuItems.push(<Subheader key='all'>All players</Subheader>);
        menuItems.push(otherPlayers.map((p, i) => { return <MenuItem value={p.id} primaryText={p.name} key={p.id} /> }));

        let selectedId = this.props.selectedPlayer ? this.props.selectedPlayer.id : -1;
        return (
            <div>
                <SelectField
                    autoWidth={true}
                    maxHeight={200}
                    floatingLabelText={this.props.label}
                    floatingLabelFixed={true}
                    value={selectedId}
                    onChange={this.handleChange} 
                    errorText={selectedId === -1 && this.props.isRequiredError} >
                    {menuItems}
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
    onChange: React.PropTypes.func.isRequired,
    isRequiredError: React.PropTypes.string
}

PlayerPicker.defaultProps = {
    label: 'Player',
    players: [],
    suggestedPlayers: [],
    onChange: () => { console.log('Player picked'); }
}

export default PlayerPicker;