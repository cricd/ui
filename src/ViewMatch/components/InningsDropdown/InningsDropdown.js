import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ordinal from 'ordinal-number-suffix';

class InningsDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) { 
        if(this.props.onChange) this.props.onChange(event, index, value);
    }

    render() {
        var menuItems = [];
        if(this.props.innings) for(var i = 0; i < this.props.innings.length; i++) {
            var label = ordinal(i + 1) + ' innings';
            var primaryText = label + ' (' + this.props.innings[i].battingTeam.name + ')';
            menuItems.push((<MenuItem key={i} value={i} label={label} primaryText={primaryText} />));
        }

        return (
            <DropDownMenu value={this.props.selectedInnings} onChange={this.handleChange}>
                {menuItems}
            </DropDownMenu>
        )
    }
}

export default InningsDropdown;
