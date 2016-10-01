import React, { Component } from 'react';
import './NavBar.scss';
import AppBar from 'material-ui/AppBar';

class NavBar extends Component {

  render() {
    return (
      <AppBar
        title="cricd"
        className="navBar"
        >
          <p className="cricd-navbar-subtitle">Open platform for cricket scoring</p>
      </AppBar>

    );
  }
}

export default NavBar;
