import React, { Component } from 'react';
import AlertIcon from 'material-ui/svg-icons/alert/add-alert';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import './MatchEventNotifySettings.scss';

class MatchEventNotifySettings extends Component {
    constructor(props) {
        super(props);
        this.state = { values: [], previousValues: [] };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, values) { 
        var wasAllSelected = this.state.previousValues.includes('all');
        var isAllSelected = values.includes('all');
        var allIndex = values.indexOf('all');
        
        if(wasAllSelected && isAllSelected) values.splice(allIndex, 1);
        else if(!wasAllSelected && isAllSelected) values = ['all'];
        
        this.setState({ previousValues: [...this.state.values], values: values });
        if(this.props.onChange) this.props.onChange(event, values);
    }

    render() {
        return (
            <div  className="cricd-matchEventNotifySettings">
                <IconMenu
                    iconButtonElement={
                        <FloatingActionButton mini={true} >
                            <AlertIcon/>
                        </FloatingActionButton>
                    }
                    onChange={this.handleChange}
                    value={this.state.values}
                    multiple={true}
                    >
                    <MenuItem disabled={true}><span className="cricd-matchEventNotifySettings-notifyMe">Notify me...</span></MenuItem>
                    <MenuItem value="all" primaryText="about every ball" />
                    <MenuItem value="wickets" primaryText="when a wicket falls" />
                    <MenuItem value="boundary" primaryText="when a boundary is scored" />
                </IconMenu>
            </div>
        );
    }
}

export default MatchEventNotifySettings;