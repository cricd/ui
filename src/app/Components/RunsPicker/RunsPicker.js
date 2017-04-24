import React from 'react';
import { observer } from 'mobx-react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const RunsPicker = observer(({ onChange, runs }) => {
    return (
        <SelectField
            floatingLabelText="Runs"
            floatingLabelFixed={true}
            onChange={(e, k, runs) => onChange(runs)}
            value={runs}
            errorText={runs == null && 'How many runs were taken?'}
        >
            <MenuItem value={0} primaryText="No runs" />
            <MenuItem value={1} primaryText="1 run" />
            <MenuItem value={2} primaryText="2 runs" />
            <MenuItem value={3} primaryText="3 runs" />
            <MenuItem value={4} primaryText="4 runs" />
            <MenuItem value={6} primaryText="6 runs" />
        </SelectField>
    );
});

RunsPicker.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    runs: React.PropTypes.number
};

RunsPicker.defaultProps = {
    onChange: (runs) => console.log('Runs changed: ' + runs),
};

export default RunsPicker;