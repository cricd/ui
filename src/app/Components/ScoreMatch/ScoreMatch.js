import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react';
import { action, autorun } from 'mobx';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import MatchResult from '../MatchResult/MatchResult';
import MatchInfo from '../MatchInfo/MatchInfo';

@inject('matchStore', 'uiStateStore')
@observer class ScoreMatch extends Component {

    componentDidMount() {
        this.props.matchStore.getOrFollowMatch(
            this.props.params.matchId,
            (err, match) => {
                if(err) return this.props.uiStateStore.displayError(err);
                this.changeSelectedMatch(match);
                match.getNextMatchEvent((err) => { if(err) this.props.uiStateStore.displayError(err) });
            });
    }
    @action changeSelectedMatch(match) { this.props.uiStateStore.selectedMatch = match; }

    render() {
        if(!this.props.uiStateStore.selectedMatch) { // If loading, show spinner
            return <div><CircularProgress size={100} thickness={10} className="cricd-viewMatch-spinner" /></div>
        }

        return (
            <div>
                <MatchInfo {...this.props.uiStateStore.selectedMatch} />
                <Divider />
                {JSON.stringify(this.props.uiStateStore.selectedMatch.nextMatchEvent)}
            </div>
        )
    }
}

export default ScoreMatch