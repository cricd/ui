import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import moment from 'moment';

function TeamPicker(props) {
    return (
        <div>
            <AutoComplete
                hintText={props.hint}
                dataSource={props.teams}
                filter={AutoComplete.fuzzyFilter}
                maxSearchResults={5}
                />
        </div>
    );
}

export default TeamPicker;
