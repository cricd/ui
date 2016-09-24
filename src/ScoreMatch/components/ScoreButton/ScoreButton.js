import React, { Component } from 'react';
import './ScoreButton.scss';
import { Button } from 'rebass';

class ScoreButton extends Component {
    render() {
        return (
            <div>
                <Button
                    backgroundColor="secondary"
                    color="white"
                    inverted
                    rounded
                    >
                    {this.props.buttonText}
                </Button>
            </div>
        )
    }
};
export default ScoreButton;
