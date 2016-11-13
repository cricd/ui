import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import './WicketsGrid.scss';

class WicketsGrid extends Component {
    render() {
        return (
            <div>
                <Subheader>Dismissals</Subheader>
                <GridList
                    cols={3}
                    padding={10}
                    className="cricd-wicketsGrid"
                    style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        overflowX: 'auto',
                    }}>
                    <GridTile
                        title="Bowled"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://media.gettyimages.com/videos/super-slow-motion-hd-cricket-stumps-hit-by-ball-video-id486206171?s=640x640" />
                    </GridTile>
                    <GridTile
                        title="Caught"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://us.123rf.com/450wm/mikeehrman/mikeehrman1212/mikeehrman121200257/16812174-white-cricket-ball-caught-in-wicket-keepers-glove.jpg?ver=6" />
                    </GridTile>
                    <GridTile
                        title="LBW"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://fscomps.fotosearch.com/compc/STK/STK032/din1593.jpg" />
                    </GridTile>
                    <GridTile
                        title="Run out"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://cache4.asset-cache.net/xc/131714413.jpg?v=2&c=IWSAsset&k=2&d=tJMoOKBzWDginZJoG6nIsDAUPsOWvJkpGiUcfImB744F2qIeaUTBUQKt8PD91rXd0" />
                    </GridTile>
                    <GridTile
                        title="Stumped"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://media.gettyimages.com/photos/england-cricketer-haseeb-hameed-is-stumped-not-out-by-bangladesh-xi-picture-id615125964?s=594x594" />
                    </GridTile>
                    <GridTile
                        title="Hit wicket"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://l7.alamy.com/zooms/f8b897c17bcb47a79f91c09a56206394/ball-hits-wicket-in-a-game-of-cricket-cc4t2a.jpg" />
                    </GridTile>
                    <GridTile
                        title="Double hit"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://res.cloudinary.com/jpress/image/fetch/w_300,f_auto,ar_3:2,c_fill/http://www.miltonkeynes.co.uk/webimage/1.7407399.1472836047!/image/image.jpg" />
                    </GridTile>
                    <GridTile
                        title="Timed out"
                        titlePosition="top"
                        cols={1}
                        rows={1}>
                        <img src="http://media.gettyimages.com/videos/batsmen-walk-out-towards-cricket-square-cotswolds-video-id1B05569_0030?s=640x640" />
                    </GridTile>
                </GridList>
            </div>
        );
    }
}

export default WicketsGrid;
