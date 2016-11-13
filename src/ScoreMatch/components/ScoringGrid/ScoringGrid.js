import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import './ScoringGrid.scss';

class ScoringGrid extends Component {
    render() {
        return (
            <div>
                <GridList cols={4}
                    cellHeight={200}
                    padding={10}
                    className="cricd-scoringGrid"
                    >
                    <Subheader>Runs</Subheader>
                    <GridTile
                        key={0}
                        title="Dot ball"
                        titlePosition="top"
                        cols={2}
                        rows={1}>
                        <img src="http://efectivitat.com/wp-content/uploads/2014/11/Inbox-0.jpg" />
                    </GridTile>
                    <GridTile
                        key={1}
                        title="1 run"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="https://c1.staticflickr.com/3/2504/3820205934_5f47363e85_b.jpg" />
                    </GridTile>
                    <GridTile
                        key={2}
                        title="2 runs"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://farm3.static.flickr.com/2634/3820205354_24ae19ed48.jpg" />
                    </GridTile>
                    <GridTile
                        key={3}
                        title="3 runs"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="https://farm3.staticflickr.com/2557/3819399921_b70783b1e9_b.jpg" />
                    </GridTile>
                    <GridTile
                        key={4}
                        title="4 runs"
                        titlePosition="top"
                        cols={2}
                        rows={1}>
                        <img src="http://spiritual-success.com/wp-content/uploads/2015/08/46.jpg" />
                    </GridTile>
                    <GridTile
                        key={6}
                        title="6 runs"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="https://s-media-cache-ak0.pinimg.com/236x/3f/0d/e4/3f0de4aca00c05e3b4ec703151060f21.jpg" />
                    </GridTile>
                </GridList>
            </div>
        );
    }
}

export default ScoringGrid;
