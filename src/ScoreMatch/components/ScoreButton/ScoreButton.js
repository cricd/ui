import React, { Component } from 'react';
import Button from 'grommet/components/Button';
import './ScoreButton.scss';
import 'grommet/scss/vanilla/index.scss';

class ScoreButton extends Component {
    render() {
        return (
            <Button label={this.props.buttonText} onClick={function(){console.log("click")}} />
        );
    }
}

export default ScoreButton;
