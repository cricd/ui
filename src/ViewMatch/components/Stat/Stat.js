import React, { Component } from 'react';
import './Stat.scss';

class Stat extends Component {

    render() {
        return (
            <span className="cricd-stat">
                <span className="cricd-stat-value">{this.props.children}</span>
                <span className="cricd-stat-units">{this.props.units}</span>
            </span>
        );
    }
}

export default Stat;
