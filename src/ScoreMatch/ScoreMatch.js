import React, { Component } from 'react';
import { Link } from 'react-router';
import './ScoreMatch.scss';
import ScoreButton from '../Shared/CricdButton/CricdButton.js';
import { Divider, Heading } from 'rebass';

class ScoreMatch extends Component {

    render() {
        return (
            <div>
                <Heading level={2}>
                    Score Game
                </Heading>
                <Divider />
                <h3> Runs </h3>
                <div className="runsContainer">
                    <ScoreButton buttonText={1} />
                    <ScoreButton buttonText={2} />
                    <ScoreButton buttonText={3} />
                    <ScoreButton buttonText={5} />
                </div>
                <div className="runsContainer">
                    <ScoreButton buttonText={4} className="cricdButton-large"/>
                    <ScoreButton buttonText={6} className="cricdButton-large"/>
                </div>
                <div>
                    <h3> Dismissals </h3>
                    <div className="runsContainer">
                        <ScoreButton buttonText={"Caught"} className="cricdButton-inverse-large"/>
                        <ScoreButton buttonText={"Bowled"} className="cricdButton-large"/>
                        <ScoreButton buttonText={"LBW"} className="cricdButton-large"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScoreMatch;
