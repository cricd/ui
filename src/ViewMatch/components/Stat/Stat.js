import React, { Component } from 'react';
import './Stat.scss';

class Stat extends Component {

    render() {
        return (
            <span className="stat">
                <span className="value">{this.props.children}</span>
                <span className="units">{this.props.units}</span>
            </span>
        );
    }
}

export default Stat;
