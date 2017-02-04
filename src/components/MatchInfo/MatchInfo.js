import React from 'react';
import './MatchInfo.scss';
import moment from 'moment';
import { Flex } from 'reflexbox';

/*
"matchInfo": {
    "homeTeam": {
    "name": "New Zealand",
    "id": 4,
    "createdAt": "2016-09-12T09:10:48.000Z",
    "updatedAt": "2016-09-12T09:10:48.000Z"
    },
    "awayTeam": {
    "name": "Sri Lanka",
    "id": 8,
    "createdAt": "2016-09-12T09:10:48.000Z",
    "updatedAt": "2016-09-12T09:10:48.000Z"
    },
    "startDate": "2009-06-16T00:00:00.000Z",
    "numberOfInnings": 1,
    "limitedOvers": 20,
    "id": 4,
    "createdAt": "2016-09-12T09:10:48.000Z",
    "updatedAt": "2016-09-12T09:10:48.000Z"
}
*/
function MatchInfo(props) {
    var typeOfMatch;
    if(props.numberOfInnings == 2 && !props.limitedOvers) typeOfMatch = "Test match";
    else if(props.numberOfInnings == 1 && props.limitedOvers == 50) typeOfMatch = "50 Over match";
    else if(props.numberOfInnings == 1 && props.limitedOvers == 20) typeOfMatch = "Twenty20";
    else if(!props.limitedOvers) typeOfMatch = props.numberOfInnings + " innings each side. Unlimited overs";
    else typeOfMatch = props.numberOfInnings + " innings each side. Restricted to " + limitedOvers + " overs";

    return (
        <div className="matchInfo">
            <h1 className="teamNames">
                <Flex wrap>
                    <span>{props.homeTeam.name}</span>
                    <span className="vs">vs</span>
                    <span>{props.awayTeam.name}</span>
                </Flex>
            </h1>
            <div className="typeOfMatch">{typeOfMatch}</div>
            <div>{moment(props.startDate).format("dddd, MMMM Do YYYY")}</div>
        </div>
    );
}

MatchInfo.propTypes = {
    numberOfInnings: React.PropTypes.number.isRequired,
    limitedOvers: React.PropTypes.number,
    homeTeam: React.PropTypes.object.isRequired,
    awayTeam: React.PropTypes.object.isRequired
};

MatchInfo.defaultProps = {
    numberOfInnings: 1, 
    limitedOvers: 20,
    homeTeam: { name: 'Team A' },
    awayTeam: { name: 'Team B' }
}
export default MatchInfo;
