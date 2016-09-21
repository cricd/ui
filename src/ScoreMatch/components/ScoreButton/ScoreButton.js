import React, { Component } from 'react';
import './ScoreButton.scss';

class ScoreButton extends Component {
    render() {
        return (
            <a href="" className="scoreButton"> {this.props.buttonText} </a>
        );
    }
}

export default ScoreButton;
