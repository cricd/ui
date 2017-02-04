import React from 'react';
import './MatchEventList.scss';
import MatchEvent from '../MatchEvent/MatchEvent';

function MatchEventList(props) {
    var items = props.events.map((e, i) => {
        return (<MatchEvent {...e} key={i} />);
    }).reverse();

    return (
        <div className="cricd-matchEventList">
            <ul>{items}</ul>
        </div>
    );
};

MatchEvent.propTypes = {
    events: React.PropTypes.array
};

MatchEvent.defaultProps = {
    events: []
};

export default MatchEventList;
