import React, { Component } from 'react';
import './MatchEvents.scss';
import MatchEvent from '../MatchEvent/MatchEvent';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class MatchEvents extends Component {
    constructor(){
        super();
        this.state = { value: 1 };
    }

    render() {
        var items;
        if(this.props.events) items = this.props.events.map((e, i) => {
            return (<MatchEvent {...e} key={i} />);
        }).reverse();

        return (
            <div className="cricd-matchEvents">
                <ul>{items}</ul>
            </div>
        );
    }
}

export default MatchEvents;
