import React from 'react';
import './Stat.scss';
import { observer } from 'mobx-react';
import classNames from 'classnames'

const Stat = observer( ({ children, units, loading }) => {
    let ld = true
    return (
        <span className="cricd-stat">
            <span className={classNames("cricd-stat-value", {'loading': ld})}>{children}</span>
            <span className={classNames("cricd-stat-units", {'loading': ld})}>{units}</span>
        </span>
    );
});

Stat.propTypes = {
    units: React.PropTypes.string,
    loading: React.PropTypes.bool
}

export default Stat;