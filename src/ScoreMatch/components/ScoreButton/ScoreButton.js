import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import './ScoreButton.scss';


class ScoreButton extends Component {
    render() {
        return (
            <Button label={this.props.buttonText} />
        );
    }
}

export default ScoreButton;
