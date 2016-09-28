import React, { Component } from 'react';
import './MatchEvents.scss';
import MatchEvent from '../MatchEvent/MatchEvent';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class MatchEvents extends Component {
    constructor(){
        super();
        this.state = {};
        this.state.value = 1;
    }

    render() {
        var items;
        if(this.props.events) items = this.props.events.map((e, i) => {
            return (<MatchEvent {...e} key={i} />);
        }).reverse();

        return (
            <div className="cricd-matchEvents">
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value="{this.state.value}">
                            <MenuItem value={1} primaryText="All Broadcasts" />
                            <MenuItem value={2} primaryText="All Voice" />
                            <MenuItem value={3} primaryText="All Text" />
                            <MenuItem value={4} primaryText="Complete Voice" />
                            <MenuItem value={5} primaryText="Complete Text" />
                            <MenuItem value={6} primaryText="Active Voice" />
                            <MenuItem value={7} primaryText="Active Text" />
                        </DropDownMenu>
                    </ToolbarGroup>
                </Toolbar>
                <ul>{items}</ul>
            </div>
        );
    }
}

export default MatchEvents;
