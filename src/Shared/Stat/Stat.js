import React from 'react';
import './Stat.scss';

function Stat(props) {
    return (
        <span className="cricd-stat">
            <span className="cricd-stat-value">{props.children}</span>
            <span className="cricd-stat-units">{props.units}</span>
        </span>
    );
}

Stat.propTypes = {
    units: React.PropTypes.string
}

export default Stat;