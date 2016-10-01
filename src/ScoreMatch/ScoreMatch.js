import React, { Component } from 'react';
import './ScoreMatch.scss';
import Divider from 'material-ui/Divider';

class ScoreMatch extends Component {

    componentWillReceiveProps(nextProps) {
        console.log("here")
    }

    render() {
        return (
            <div>
                <h1>
                    Score Game
                </h1>
                <Divider />
                <h3> Runs </h3>
                <div className="runsContainer">

                </div>
                <div className="runsContainer">
                </div>
                <div>
                    <h3> Dismissals </h3>
                    <div className="runsContainer">
                    </div>
                </div>
            </div>
        );
    }
}

export default ScoreMatch;
