import React, { Component } from 'react';
import { Link } from 'react-router';
import './ViewMatch.scss';

class ViewMatch extends Component {
    render() {
        return (
            <div>
                <div>This is a score</div>
                <div>{__SCOREPROCESSOR_URL__}</div>
            </div>
        );
    }
}

export default ViewMatch;
