import React, { Component } from 'react';
import { Link } from 'react-router';
import './ScoreMatch.scss';
import ScoreButton from './components/ScoreButton/ScoreButton.js'

class ScoreMatch extends Component {
    render() {
        return (
            <div>
                <h3> Runs </h3>
                <ScoreButton buttonText={1} />
                <ScoreButton buttonText={2} />
                <ScoreButton buttonText={3} />
                <ScoreButton buttonText={5} />
                <ScoreButton buttonText={4} />
                <ScoreButton buttonText={6} />
                <h3> Dismissals </h3>

                <ScoreButton buttonText={"Caught"} />
                <ScoreButton buttonText={"Bowled"} />
                <ScoreButton buttonText={"LBW"} />
            </div>
        );
    }
}

export default ScoreMatch;
