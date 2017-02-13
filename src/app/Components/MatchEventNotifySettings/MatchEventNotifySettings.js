import React, { Component } from 'react';
import AlertIcon from 'material-ui/svg-icons/alert/add-alert';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
import './MatchEventNotifySettings.scss';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';

@observer class MatchEventNotifySettings extends Component {
    @observable open = false;

    constructor(props) {
        super(props);
        this.toggleSettingAll = this.toggleSettingAll.bind(this);
        this.toggleSettingBoundary = this.toggleSettingBoundary.bind(this);
        this.toggleSettingWickets = this.toggleSettingWickets.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    @action toggleSettingAll(object, checked) {
        this.props.settings.all = true;
        this.props.settings.wickets = false;
        this.props.settings.boundary = false;
    }

    @action toggleSettingBoundary(object, checked) {
        let settings;
        if(this.props.settings.all) {
            this.props.settings.all = false;
            this.props.settings.boundary = true;
            this.props.settings.wickets = false;
        }
        else {
            this.props.settings.all = false;
            this.props.settings.boundary = checked;
            this.props.settings.wickets = this.props.settings.wickets;
        }
    }

    @action toggleSettingWickets(object, checked) {
        if(this.props.settings.all) {
            this.props.settings.all = false;
            this.props.settings.boundary = false;
            this.props.settings.wickets = true;
        }
        else {
            this.props.settings.all = false;
            this.props.settings.boundary = this.props.settings.boundary;
            this.props.settings.wickets = checked;
        }
    }

    @action handleOpen() { this.open = true; }
    @action handleClose() { this.open = false; }

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
                    open={this.open}
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
};

MatchEventNotifySettings.defaultProps = {
    settings: { all: false, wickets: false, boundary: false },
}

export default MatchEventNotifySettings;