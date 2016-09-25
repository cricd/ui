import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class CricdButton extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <RaisedButton label={this.props.btnText} />
                </MuiThemeProvider>
            </div>
        )
    }
};
export default CricdButton;
