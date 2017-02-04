import React, { Component } from 'react';
import AlertIcon from 'material-ui/svg-icons/alert/add-alert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
import './MatchEventNotifySettings.scss';

class MatchEventNotifySettings extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false };
        this.toggleSettingAll = this.toggleSettingAll.bind(this);
        this.toggleSettingBoundary = this.toggleSettingBoundary.bind(this);
        this.toggleSettingWickets = this.toggleSettingWickets.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    toggleSettingAll(object, checked) {
        var settings = { all: checked, boundary: false, wickets: false };
        this.props.onChange(settings);
    };

    toggleSettingBoundary(object, checked) {
        var settings;
        if(this.props.settings.all) settings = { all: false, boundary: true, wickets: false };
        else settings = { all: false, boundary: checked, wickets: this.props.settings.wickets };
        this.props.onChange(settings);
    };

    toggleSettingWickets(object, checked) {
        var settings;
        if(this.props.settings.all) settings = { all: false, boundary: false, wickets: true };
        else settings = { all: false, boundary: this.props.settings.boundary, wickets: checked };
        this.props.onChange(settings);
    };

    handleOpen() { this.setState({ open: true }) };
    handleClose() { this.setState({ open: false }) };

    render() {
        return (
            <div className="cricd-matchEventNotifySettings">
                <FloatingActionButton onTouchTap={this.handleOpen}>
                    <AlertIcon />
                </FloatingActionButton>
                <Dialog
                    title="Notify me when..."
                    actions={
                        <FlatButton
                            label="Close"
                            primary={true}
                            keyboardFocused={false}
                            onTouchTap={this.handleClose}
                        />
                    }
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <Checkbox
                        className="cricd-matchEventNotifySettings-checkBox"
                        onCheck={this.toggleSettingAll}
                        label="about every ball"
                        checked={this.props.settings.all}
                    />
                    <Checkbox
                        className="cricd-matchEventNotifySettings-checkBox"
                        onCheck={this.toggleSettingWickets}
                        label="when a wicket falls"
                        checked={this.props.settings.wickets}
                    />
                    <Checkbox
                        className="cricd-matchEventNotifySettings-checkBox"
                        onCheck={this.toggleSettingBoundary}
                        label="when a boundary is scored"
                        checked={this.props.settings.boundary}
                    />
                </Dialog>
            </div>
        );
    }
}

MatchEventNotifySettings.propTypes = {
    settings: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
};

MatchEventNotifySettings.defaultProps = {
    settings: { all: false, wickets: false, boundary: false },
    onChange: function(){}
}

export default MatchEventNotifySettings;