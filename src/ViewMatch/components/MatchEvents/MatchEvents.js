import React, { Component } from 'react';
import './MatchEvents.scss';
import MatchEvent from '../MatchEvent/MatchEvent';
import {List} from 'material-ui/List';

class MatchEvents extends Component {

    render() {
        var items; 
        if(this.props.events) items = this.props.events.map((e, i) => {
            return (<MatchEvent {...e} key={i} />);
        }).reverse();

        return (
            <ul>{items}</ul>
        );
    }
}

export default MatchEvents;
