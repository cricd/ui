import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ordinal from 'ordinal-number-suffix';


function InningsDropdown(props) {
    var menuItems = props.innings.map((innings, i) => {
        var label = ordinal(i + 1) + ' innings';
        var primaryText = label + ' (' + innings.battingTeam.name + ')';
        return (<MenuItem key={i} value={i} label={label} primaryText={primaryText} />);
    });

    return (
        <DropDownMenu value={props.selectedInnings} onChange={props.onChange}>
            {menuItems}
        </DropDownMenu>
    )
}

InningsDropdown.propTypes = {
    innings: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
};

InningsDropdown.defaultProps = {
    innings: []
};

export default InningsDropdown;
