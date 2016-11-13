import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import './ExtrasGrid.scss';

class ExtrasGrid extends Component {
    render() {
        return (
            <div>
                <Subheader>Extras</Subheader>
                <GridList
                    cols={3}
                    padding={10}
                    className="cricd-extrasGrid"
                    style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        overflowX: 'auto',
                    }}>
                    <GridTile
                        title="Wide"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://newsimg.bbc.co.uk/media/images/40189000/gif/_40189704_umpire_signals_wide_298.gif" />
                    </GridTile>
                    <GridTile
                        title="No ball"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://newsimg.bbc.co.uk/media/images/40189000/gif/_40189708_umpire_signals_no_298.gif" />
                    </GridTile>
                    <GridTile
                        title="Byes"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://newsimg.bbc.co.uk/media/images/40189000/gif/_40189666_umpire_signals_bye_298.gif" />
                    </GridTile>
                    <GridTile
                        title="Leg byes"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://newsimg.bbc.co.uk/media/images/40189000/gif/_40189670_umpire_signals_leg_298.gif" />
                    </GridTile>
                </GridList>
            </div>
        );
    }
}

export default ExtrasGrid;
