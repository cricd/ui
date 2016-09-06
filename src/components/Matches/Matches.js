import React, { Component } from 'react';
import { Link } from 'react-router';

class Matches extends Component {
    render() {
        return (
            <div>
                <h2> Matches </h2>
                <ul>
                    <li><Link to="/matches/1">Match 1</Link></li>
                    <li><Link to="/matches/2">Match 2</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default Matches;
