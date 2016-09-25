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
                    <ScoreButton btnText={1} />
                    <ScoreButton btnText={2} />
                    <ScoreButton btnText={3} />
                    <ScoreButton btnText={5} />
                </div>
                <div className="runsContainer">
                    <ScoreButton btnText={4} btnStyle="large"/>
                    <ScoreButton btnText={6} btnStyle="large"/>
                </div>
                <div>
                    <h3> Dismissals </h3>
                    <div className="runsContainer">
                        <ScoreButton btnText={"caught"} btnStyle="inverse-large"/>
                        <ScoreButton btnText={"bowled"} btnStyle="large"/>
                        <ScoreButton btnText={"lbw"} btnStyle="large"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScoreMatch;
