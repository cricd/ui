import React, { Component } from 'react';
import './MatchEventList.scss';
import MatchEvent from '../MatchEvent/MatchEvent';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import InningsDropdown from '../InningsDropdown/InningsDropdown';

class MatchEventList extends Component {
    render() {
        var items;
        if(this.props.events) items = this.props.events.map((e, i) => {
            return (<MatchEvent {...e} key={i} />);
        }).reverse();

        return (
            <div className="cricd-matchEventList">
                <ul>{items}</ul>
            </div>
        );
    }
}

export default MatchEventList;
