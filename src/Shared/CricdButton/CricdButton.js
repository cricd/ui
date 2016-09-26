import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class CricdButton extends Component {
    render() {
        return (
            <div>
                <RaisedButton label={this.props.btnText} />
            </div>
        )
    }
};
export default CricdButton;
