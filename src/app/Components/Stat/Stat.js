import React from 'react';
import './Stat.scss';
import { observer } from 'mobx-react';

const Stat = observer( ({ children, units }) => {
    return (
        <span className="cricd-stat">
            <span className="cricd-stat-value">{children}</span>
            <span className="cricd-stat-units">{units}</span>
        </span>
    );
});

Stat.propTypes = {
    units: React.PropTypes.string
}

export default Stat;