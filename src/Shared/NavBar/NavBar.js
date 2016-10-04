import React, { Component } from 'react';
import './NavBar.scss';
import AppBar from 'material-ui/AppBar';
import ActionHome from 'material-ui/svg-icons/action/home';
import SvgIcon from 'material-ui/SvgIcon';

class NavBar extends Component {

  render() {
    var cricdIcon = (<SvgIcon>
      <path  className="cricd-navbar-cricdIcon" d="m 18.75,971.11203 c -4.166667,4.16667 -4.166667,8.33333 -4.166667,8.33333 L 56.25,1021.1119 l 6.25,-2.0833 16.666667,16.6666 c 1.317833,1.318 2.109375,2.0834 3.776042,2.0834 0.520833,0 1.171875,0 1.822916,-0.6509 0.65125,-0.6512 0.651042,-1.302 0.651042,-1.8229 0,-1.6666 -0.907833,-2.6008 -2.083333,-3.7762 L 66.666667,1014.862 68.75,1008.612 27.083333,966.94537 c 0,0 -4.166667,0 -8.333333,4.16666 z m 14.583333,37.49997 c -3.451792,0 -6.25,2.7983 -6.25,6.25 0,3.4516 2.798208,6.2499 6.25,6.2499 3.451792,0 6.25,-2.7983 6.25,-6.2499 0,-3.4517 -2.798208,-6.25 -6.25,-6.25 z" />
    </SvgIcon>);
    
    return (
      <AppBar
        title="cricd"
        iconElementLeft={<cricdIcon />}
        >
        <p className="cricd-navbar-subtitle">Open platform for cricket scoring</p>
      </AppBar>

    );
  }
}

export default NavBar;
