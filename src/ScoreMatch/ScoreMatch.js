import React, { Component } from 'react';
import './ScoreMatch.scss';
import Divider from 'material-ui/Divider';
import MatchInfo from '../ViewMatch/components/MatchInfo/MatchInfo.js'
import Innings from '../ViewMatch/components/Innings/Innings.js'
import io from 'socket.io-client';

class ScoreMatch extends Component {
    constructor(props) {
        super(props)
        //Get the match ID
        this.state = {}
    }

    getScore() {
        var matchId = this.props.params.matchId;
        var scoreProcessorUrl = 'http://' + __SCOREPROCESSOR_URL__;
        fetch(scoreProcessorUrl + '?match=' + matchId)
            .then(response => { return response.json(); })
            .then(json => { 
                console.log(json)
                this.setState(json) 
            })
            .catch(error => { console.log(error); });
    }

    subscribeToMatchEvents() {
        var matchId = this.props.params.matchId;
        var changePublisherUrl = 'http://' + __CHANGEPUBLISHER_URL__;
        var socket = io.connect(changePublisherUrl + '?match=' + matchId);
        socket.on('score-change', this.onMatchEvent);
    }

    onMatchEvent(matchEvent) {
        this.setState(newScore.score);
    }

    componentDidMount() {
        this.getScore();
        this.subscribeToMatchEvents();
    }


    render() {
        return (
            <div>
                <MatchInfo  {...this.state.matchInfo} />
                <Divider/>
                <h3> Runs </h3>
                <div className="cricd-scoreMatch-runsContainer">
                </div>
                <div className="cricd-scoreMatch-runsContainer">
                </div>
                <div>
                    <h3> Dismissals </h3>
                    <div className="cricd-scoreMatch-runsContainer">
                    </div>
                </div>
            </div>
        );
    }
}

export default ScoreMatch;
