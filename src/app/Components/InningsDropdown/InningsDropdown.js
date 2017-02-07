import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ordinal from 'ordinal-number-suffix';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';


@inject('uiStateStore')
@observer class InningsDropdown extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    @action handleChange(event, key, value) {
        this.props.uiStateStore.selectedInnings = value + 1;
    }

    render() {
        let menuItems = this.props.innings.map((innings, i) => {
            let label = ordinal(i + 1) + ' innings';
            let primaryText = label + ' (' + innings.battingTeam.name + ')';
            return (<MenuItem key={i} value={i} label={label} primaryText={primaryText} />);
        });

        return (
            <DropDownMenu value={this.props.selectedInnings - 1} onChange={this.handleChange}>
                {menuItems}
            </DropDownMenu>
        )
    }
};

InningsDropdown.propTypes = {
    innings: React.PropTypes.object.isRequired
};

InningsDropdown.defaultProps = {
    innings: []
};

export default InningsDropdown;
