import React from 'react';
import './Stat.scss';
import { observer } from 'mobx-react';
import classNames from 'classnames'

const Stat = observer( ({ children, units, loading }) => {
    return (
        <span className="cricd-stat">
            <span className={classNames("cricd-stat-value", {'loading': loading})}>{children}</span>
            <span className={classNames("cricd-stat-units", {'loading': loading})}>{units}</span>
        </span>
    );
});

Stat.propTypes = {
    units: React.PropTypes.string,
    loading: React.PropTypes.bool
}

Stat.defaultProps = {
    loading: false
}

export default Stat;