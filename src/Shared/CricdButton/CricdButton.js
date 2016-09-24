import React, { Component } from 'react';
import './CricdButton.scss';

class CricdButton extends Component {
    render() {
        return (
            <div>
                <a className={this.props.className ? this.props.className : "cricdButton"}>
                    {this.props.buttonText}
                </a>
            </div>
        )
    }
};
export default CricdButton;
